// import React, { useCallback, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
//   StatusBar,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Dropdown } from 'react-native-element-dropdown';
// import Icon from 'react-native-vector-icons/Feather';
// import { useFocusEffect } from '@react-navigation/native';

// import styles from './TransactionHistoryStyles';
// import api from '../../api/axios';
// import { theme } from '../../MainTheme/theme';
// import MainSideHeader from '../../screens/components/MainSideHeader'; 

// const parseSafeDate = (dateVal) => {
//   if (!dateVal) return null;
//   const formattedStr = typeof dateVal === 'string' ? dateVal.replace(' ', 'T') : dateVal;
//   const parsed = new Date(formattedStr);
//   return isNaN(parsed.getTime()) ? null : parsed;
// };

// export default function TransactionHistory({ navigation }) {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dateFilter, setDateFilter] = useState(null);
//   const [statusFilter, setStatusFilter] = useState(null);

//   const fetchTransactions = async () => {
//     setLoading(true);

//     try {
//       const res = await api.get('/api/wallet/deposit-history');
//       const rawList = res?.data?.Transactions || [];
//       const formattedData = rawList.map((item) => {
//         const isApproved = item.Payment_Status === 'Payment Approved';
//         const isFailed = item.Payment_Status === 'Payment Failed';
//         const isInProgress = item.Payment_Status === 'Payment Verification In-Progress';
//         const isBonus = item.Payment_Status === 'Bonus Credited'; 

//         let type = 'received';
//         if (isFailed) type = 'failed';
//         else if (isInProgress) type = 'progress';
//         else if (isBonus) type = 'bonus'; 

//         return {
//           id: item.Transaction_UID,
//           gatewayOrderId: item.Transaction_UID,
//           depositUid: item.Deposit_UID,
//           amount: parseFloat(item.Requested_Amount || 0),
//           status: item.Payment_Status,
//           createdAt: item.Payment_Date,
//           name: item.Transaction_UID || item.Transaction_UID,
//           type: type,
//           isApproved,
//           isFailed,
//           isInProgress,
//           isBonus, 
//         };
//       });

//       setTransactions(formattedData);
//     } catch (err) {
//       console.log('Transaction fetch error:', err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchTransactions();
//     }, []),
//   );

//   const dateOptions = [
//     { label: 'Today', value: 'today' },
//     { label: 'Yesterday', value: 'yesterday' },
//     { label: 'This Week', value: 'week' },
//   ];

//   const statusOptions = [
//     { label: 'Approved', value: 'approved' },
//     { label: 'In-Progress', value: 'progress' },
//     { label: 'Failed', value: 'failed' },
//   ];

//   const filteredData = transactions.filter((item) => {
//     if (statusFilter === 'approved' && !item.isApproved) return false;
//     if (statusFilter === 'failed' && !item.isFailed) return false;
//     if (
//       statusFilter === 'progress' &&
//       (item.isApproved || item.isFailed || item.isBonus)
//     ) {
//       return false;
//     }

//     const parsedDate = parseSafeDate(item.createdAt);
//     if (!parsedDate && dateFilter) return false;

//     const itemDate = parsedDate ? parsedDate.toDateString() : '';
//     const today = new Date().toDateString();
//     const yesterday = new Date(Date.now() - 86400000).toDateString();

//     if (dateFilter === 'today' && itemDate !== today) return false;
//     if (dateFilter === 'yesterday' && itemDate !== yesterday) return false;

//     return true;
//   });

//   const sortedData = [...filteredData].sort((a, b) => {
//     const dateA = parseSafeDate(a.createdAt);
//     const dateB = parseSafeDate(b.createdAt);
//     if (!dateA) return 1;
//     if (!dateB) return -1;
//     return dateB - dateA;
//   });

//   const groupByDate = (data) => {
//     const today = new Date().toDateString();
//     const yesterday = new Date(Date.now() - 86400000).toDateString();

//     const groups = {
//       today: [],
//       yesterday: [],
//       week: [],
//     };

//     data.forEach((item) => {
//       const parsedDate = parseSafeDate(item.createdAt);
//       if (!parsedDate) {
//         groups.week.push(item);
//         return;
//       }
//       const d = parsedDate.toDateString();
//       if (d === today) groups.today.push(item);
//       else if (d === yesterday) groups.yesterday.push(item);
//       else groups.week.push(item);
//     });

//     return groups;
//   };

//   const grouped = groupByDate(sortedData);

//   const formatDate = (date) => {
//     const parsed = parseSafeDate(date);
//     if (!parsed) return 'N/A';
//     return parsed.toLocaleDateString('en-GB', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//     });
//   };

//   const formatTime = (date) => {
//     const parsed = parseSafeDate(date);
//     if (!parsed) return '--:--';
//     return parsed.toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const getTitle = (type, data) => {
//     if (!data.length) return '';
//     const d = formatDate(data[0].createdAt);

//     if (type === 'today') return `Today, ${d}`;
//     if (type === 'yesterday') return `Yesterday, ${d}`;
//     return `Earlier, ${d}`;
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
//       <MainSideHeader
//         title="Transaction Details"
//         subtitle="View your transaction information"
//         onHelpPress={() => console.log('Help Pressed')}
//         onNotificationPress={() => navigation.navigate('Notifications')}
//         notificationCount={0}
//       />

//       <View style={styles.contentContainer}>
//         <View style={styles.filterRow}>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => {
//               setDateFilter(null);
//               setStatusFilter(null);
//             }}
//           >
//             <Text style={styles.activeFilter}>All</Text>
//           </TouchableOpacity>

//           <Dropdown
//             style={styles.dropdown}
//             data={dateOptions}
//             labelField="label"
//             valueField="value"
//             placeholder="Date"
//             value={dateFilter}
//             onChange={(item) => setDateFilter(item.value)}
//             placeholderStyle={styles.dropdownText}
//             selectedTextStyle={styles.dropdownText}
//             iconColor={theme.colors.textMain}
//           />

//           <Dropdown
//             style={styles.dropdown}
//             data={statusOptions}
//             labelField="label"
//             valueField="value"
//             placeholder="Status"
//             value={statusFilter}
//             onChange={(item) => setStatusFilter(item.value)}
//             placeholderStyle={styles.dropdownText}
//             selectedTextStyle={styles.dropdownText}
//             iconColor={theme.colors.textMain}
//           />
//         </View>

//         {loading ? (
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator color={theme.colors.primaryBlue} size="large" />
//           </View>
//         ) : (
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ paddingBottom: 120 }}
//           >
//             {sortedData?.length === 0 ? (
//               <View style={styles.emptyContainer}>
//                 <Icon name="file-text" size={60} color={theme.colors.textMuted} />
//                 <Text style={styles.emptyTitle}>No Transactions Found</Text>
//                 <Text style={styles.emptySub}>
//                   Your transaction history will appear here
//                 </Text>
//               </View>
//             ) : (
//               <>
//                 {grouped.today.length > 0 && (
//                   <>
//                     <Text style={styles.section}>
//                       {getTitle('today', grouped.today)}
//                     </Text>
//                     {grouped.today.map((item, i) => (
//                       <Item
//                         key={i}
//                         item={item}
//                         formatTime={formatTime}
//                         navigation={navigation}
//                       />
//                     ))}
//                   </>
//                 )}

//                 {grouped?.yesterday?.length > 0 && (
//                   <>
//                     <Text style={styles.section}>
//                       {getTitle('yesterday', grouped.yesterday)}
//                     </Text>
//                     {grouped.yesterday.map((item, i) => (
//                       <Item
//                         key={i}
//                         item={item}
//                         formatTime={formatTime}
//                         navigation={navigation}
//                       />
//                     ))}
//                   </>
//                 )}

//                 {grouped.week.length > 0 && (
//                   <>
//                     <Text style={styles.section}>
//                       {getTitle('week', grouped.week)}
//                     </Text>
//                     {grouped.week.map((item, i) => (
//                       <Item
//                         key={i}
//                         item={item}
//                         formatTime={formatTime}
//                         navigation={navigation}
//                       />
//                     ))}
//                   </>
//                 )}
//               </>
//             )}
//           </ScrollView>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// export const Item = ({ item, formatTime, navigation }) => {
//   const isApproved = item.isApproved;
//   const isFailed = item.isFailed;
//   const isBonus = item.isBonus;

//   let statusColor = '#EAB308';
//   let iconName = 'clock';
//   let displayStatus = 'payment in progress';

//   if (isApproved) {
//     statusColor = theme.colors.statusSuccess || '#10B981';
//     iconName = 'arrow-down-left';
//     displayStatus = item.status;
//   } else if (isFailed) {
//     statusColor = theme.colors.statusDanger || '#EF4444';
//     iconName = 'x';
//     displayStatus = item.status;
//   } else if (isBonus) {
//     statusColor = theme.colors.statusSuccess || '#10B981';
//     iconName = 'gift';
//     displayStatus = item.status; 
//   }

//   const parseSafeDate = (dateVal) => {
//     if (!dateVal) return null;
//     const formattedStr = typeof dateVal === 'string' ? dateVal.replace(' ', 'T') : dateVal;
//     const parsed = new Date(formattedStr);
//     return isNaN(parsed.getTime()) ? null : parsed;
//   };

//   const formattedDate = parseSafeDate(item.createdAt);
//   const dateString = formattedDate
//     ? `${formattedDate.toLocaleDateString('en-GB', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric',
//       })} ${formatTime(item.createdAt)}`
//     : 'N/A';

//   return (
//     <TouchableOpacity
//       style={styles.item}
//       activeOpacity={0.8}
//       onPress={() =>
//         navigation.navigate('TransactionDetailScreen', {
//           transactionId: item?.gatewayOrderId || item?.id || 'N/A',
//           wallet_id: item?.depositUid || item?.id || 'N/A',
//           amount: Number(item.amount || 0).toFixed(2),
//           recipient: item?.name || 'Wallet Top-up',
//           date: dateString,
//           status: item.status,
//           isApproved,
//           isFailed,
//           isBonus,
//           isInProgress: item.isInProgress, 
//         })
//       }
//     >
//       <View style={styles.left}>
//         <View style={styles.avatar}>
//           <Icon name={iconName} size={18} color={statusColor} />
//         </View>

//         <View style={{ flex: 1, paddingRight: 8 }}>
//           <Text style={styles.name} numberOfLines={1}>
//             {item.gatewayOrderId || item.id}
//           </Text>

//           <Text style={styles.time}>
//             Wallet Top-up · {formatTime(item.createdAt)}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.right}>
//         <Text style={styles.amount}>
//           +₹{Number(item.amount).toFixed(2)}
//         </Text>

//         <Text
//           style={[
//             styles.status,
//             { color: statusColor, fontWeight: '600' },
//           ]}
//           numberOfLines={1}
//         >
//           {displayStatus}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };




import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';

import styles from './TransactionHistoryStyles';
import api from '../../api/axios';
import { theme } from '../../MainTheme/theme';
import MainSideHeader from '../../screens/components/MainSideHeader'; 

const parseSafeDate = (dateVal) => {
  if (!dateVal) return null;
  const formattedStr = typeof dateVal === 'string' ? dateVal.replace(' ', 'T') : dateVal;
  const parsed = new Date(formattedStr);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export default function TransactionHistory({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainFilter, setMainFilter] = useState('all'); // 'all' | 'transactions' | 'bonus'
  const [dateFilter, setDateFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);

    try {
      const res = await api.get('/api/wallet/deposit-history');
      const rawList = res?.data?.Transactions || [];
      const formattedData = rawList.map((item) => {
        const isApproved = item.Payment_Status === 'Payment Approved';
        const isFailed = item.Payment_Status === 'Payment Failed';
        const isInProgress = item.Payment_Status === 'Payment Verification In-Progress';
        const isBonus = item.Payment_Status === 'Bonus Credited'; 

        let type = 'received';
        if (isFailed) type = 'failed';
        else if (isInProgress) type = 'progress';
        else if (isBonus) type = 'bonus'; 

        return {
          id: item.Transaction_UID,
          gatewayOrderId: item.Transaction_UID,
          depositUid: item.Deposit_UID,
          amount: parseFloat(item.Requested_Amount || 0),
          status: item.Payment_Status,
          createdAt: item.Payment_Date,
          name: item.Transaction_UID || item.Transaction_UID,
          type: type,
          isApproved,
          isFailed,
          isInProgress,
          isBonus, 
        };
      });

      setTransactions(formattedData);
    } catch (err) {
      console.log('Transaction fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Reset all filters to default when screen is focused
      setMainFilter('all');
      setDateFilter(null);
      setStatusFilter(null);
      
      fetchTransactions();
    }, []),
  );

  const dateOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'This Week', value: 'week' },
  ];

  const statusOptions = [
    { label: 'Approved', value: 'approved' },
    { label: 'In-Progress', value: 'progress' },
    { label: 'Failed', value: 'failed' },
  ];

  const filteredData = transactions.filter((item) => {
    // Top-level Category Filter
    if (mainFilter === 'transactions' && item.isBonus) return false;
    if (mainFilter === 'bonus' && !item.isBonus) return false;

    // Status Dropdown Filter
    if (statusFilter === 'approved' && !item.isApproved) return false;
    if (statusFilter === 'failed' && !item.isFailed) return false;
    if (
      statusFilter === 'progress' &&
      (item.isApproved || item.isFailed || item.isBonus)
    ) {
      return false;
    }

    // Date Dropdown Filter
    const parsedDate = parseSafeDate(item.createdAt);
    if (!parsedDate && dateFilter) return false;

    const itemDate = parsedDate ? parsedDate.toDateString() : '';
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (dateFilter === 'today' && itemDate !== today) return false;
    if (dateFilter === 'yesterday' && itemDate !== yesterday) return false;

    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = parseSafeDate(a.createdAt);
    const dateB = parseSafeDate(b.createdAt);
    if (!dateA) return 1;
    if (!dateB) return -1;
    return dateB - dateA;
  });

  const groupByDate = (data) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    const groups = {
      today: [],
      yesterday: [],
      week: [],
    };

    data.forEach((item) => {
      const parsedDate = parseSafeDate(item.createdAt);
      if (!parsedDate) {
        groups.week.push(item);
        return;
      }
      const d = parsedDate.toDateString();
      if (d === today) groups.today.push(item);
      else if (d === yesterday) groups.yesterday.push(item);
      else groups.week.push(item);
    });

    return groups;
  };

  const grouped = groupByDate(sortedData);

  const formatDate = (date) => {
    const parsed = parseSafeDate(date);
    if (!parsed) return 'N/A';
    return parsed.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (date) => {
    const parsed = parseSafeDate(date);
    if (!parsed) return '--:--';
    return parsed.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTitle = (type, data) => {
    if (!data.length) return '';
    const d = formatDate(data[0].createdAt);

    if (type === 'today') return `Today, ${d}`;
    if (type === 'yesterday') return `Yesterday, ${d}`;
    return `Earlier, ${d}`;
  };

  // Dynamic widths to ensure active text remains on a single line
  const getDateDropdownWidth = () => {
    if (dateFilter === 'yesterday') return 125;
    if (dateFilter === 'week') return 115;
    return 100;
  };

  const getStatusDropdownWidth = () => {
    if (statusFilter === 'progress') return 135;
    if (statusFilter === 'approved') return 120;
    return 100;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <MainSideHeader
        title="Transaction Details"
        subtitle="View your transaction information"
        onHelpPress={() => console.log('Help Pressed')}
        onNotificationPress={() => navigation.navigate('Notifications')}
        notificationCount={0}
      />

      <View style={styles.contentContainer}>
        {/* Main Category Filter Buttons */}
        <View style={[styles.filterRow, { marginBottom: 16, justifyContent: 'flex-start' }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setMainFilter('all');
              setDateFilter(null);
              setStatusFilter(null);
            }}
            style={[styles.pillButton, mainFilter === 'all' ? styles.pillActive : styles.pillInactive]}
          >
            <Text style={mainFilter === 'all' ? styles.pillTextActive : styles.pillTextInactive}>
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setMainFilter('transactions');
              setDateFilter(null);
              setStatusFilter(null);
            }}
            style={[styles.pillButton, mainFilter === 'transactions' ? styles.pillActive : styles.pillInactive]}
          >
            <Text style={mainFilter === 'transactions' ? styles.pillTextActive : styles.pillTextInactive}>
              Transactions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setMainFilter('bonus');
              setDateFilter(null);
              setStatusFilter(null);
            }}
            style={[styles.pillButton, mainFilter === 'bonus' ? styles.pillActive : styles.pillInactive]}
          >
            <Text style={mainFilter === 'bonus' ? styles.pillTextActive : styles.pillTextInactive}>
              Bonus
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dropdown Filters (Date & Status) */}
        <View style={[styles.filterRow, { justifyContent: 'flex-start' }]}>
          <Dropdown
            style={[styles.dropdown, { width: getDateDropdownWidth() }]}
            data={dateOptions}
            labelField="label"
            valueField="value"
            placeholder="Date"
            value={dateFilter}
            onChange={(item) => setDateFilter(item.value)}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
            iconColor={theme.colors.textMain}
            selectedTextProps={{ numberOfLines: 1 }}
            containerStyle={{ width: 130, borderRadius: 8, overflow: 'hidden' }} 
            itemTextStyle={{ fontSize: 14, numberOfLines: 1 }}
          />

          <Dropdown
            style={[styles.dropdown, { width: getStatusDropdownWidth() }]}
            data={statusOptions}
            labelField="label"
            valueField="value"
            placeholder="Status"
            value={statusFilter}
            onChange={(item) => setStatusFilter(item.value)}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
            iconColor={theme.colors.textMain}
            selectedTextProps={{ numberOfLines: 1 }}
            containerStyle={{ width: 145, borderRadius: 8, overflow: 'hidden' }} 
            itemTextStyle={{ fontSize: 14, numberOfLines: 1 }}
          />
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={theme.colors.primaryBlue} size="large" />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {sortedData?.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Icon name="file-text" size={60} color={theme.colors.textMuted} />
                <Text style={styles.emptyTitle}>No Transactions Found</Text>
                <Text style={styles.emptySub}>
                  Your transaction history will appear here
                </Text>
              </View>
            ) : (
              <>
                {grouped.today.length > 0 && (
                  <>
                    <Text style={styles.section}>
                      {getTitle('today', grouped.today)}
                    </Text>
                    {grouped.today.map((item, i) => (
                      <Item
                        key={i}
                        item={item}
                        formatTime={formatTime}
                        navigation={navigation}
                      />
                    ))}
                  </>
                )}

                {grouped?.yesterday?.length > 0 && (
                  <>
                    <Text style={styles.section}>
                      {getTitle('yesterday', grouped.yesterday)}
                    </Text>
                    {grouped.yesterday.map((item, i) => (
                      <Item
                        key={i}
                        item={item}
                        formatTime={formatTime}
                        navigation={navigation}
                      />
                    ))}
                  </>
                )}

                {grouped.week.length > 0 && (
                  <>
                    <Text style={styles.section}>
                      {getTitle('week', grouped.week)}
                    </Text>
                    {grouped.week.map((item, i) => (
                      <Item
                        key={i}
                        item={item}
                        formatTime={formatTime}
                        navigation={navigation}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

export const Item = ({ item, formatTime, navigation }) => {
  const isApproved = item.isApproved;
  const isFailed = item.isFailed;
  const isBonus = item.isBonus;

  let statusColor = '#EAB308';
  let iconName = 'clock';
  let displayStatus = 'payment in progress';

  if (isApproved) {
    statusColor = theme.colors.statusSuccess || '#10B981';
    iconName = 'arrow-down-left';
    displayStatus = item.status;
  } else if (isFailed) {
    statusColor = theme.colors.statusDanger || '#EF4444';
    iconName = 'x';
    displayStatus = item.status;
  } else if (isBonus) {
    statusColor = theme.colors.statusSuccess || '#10B981';
    iconName = 'gift';
    displayStatus = item.status; 
  }

  const parseSafeDate = (dateVal) => {
    if (!dateVal) return null;
    const formattedStr = typeof dateVal === 'string' ? dateVal.replace(' ', 'T') : dateVal;
    const parsed = new Date(formattedStr);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const formattedDate = parseSafeDate(item.createdAt);
  const dateString = formattedDate
    ? `${formattedDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })} ${formatTime(item.createdAt)}`
    : 'N/A';

  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('TransactionDetailScreen', {
          transactionId: item?.gatewayOrderId || item?.id || 'N/A',
          wallet_id: item?.depositUid || item?.id || 'N/A',
          amount: Number(item.amount || 0).toFixed(2),
          recipient: item?.name || 'Wallet Top-up',
          date: dateString,
          status: item.status,
          isApproved,
          isFailed,
          isBonus,
          isInProgress: item.isInProgress, 
        })
      }
    >
      <View style={styles.left}>
        <View style={styles.avatar}>
          <Icon name={iconName} size={18} color={statusColor} />
        </View>

        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={styles.name} numberOfLines={1}>
            {item.gatewayOrderId || item.id}
          </Text>

          <Text style={styles.time}>
            Wallet Top-up · {formatTime(item.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>
          +₹{Number(item.amount).toFixed(2)}
        </Text>

        <Text
          style={[
            styles.status,
            { color: statusColor, fontWeight: '600' },
          ]}
          numberOfLines={1}
        >
          {displayStatus}
        </Text>
      </View>
    </TouchableOpacity>
  );
};