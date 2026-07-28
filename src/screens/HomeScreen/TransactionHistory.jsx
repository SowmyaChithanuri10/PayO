// // TransactionHistory.jsx

// import React, {
//   useCallback,
//   useState,
// } from 'react';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';

// import LinearGradient from 'react-native-linear-gradient';
// import { Dropdown } from 'react-native-element-dropdown';
// import Icon from 'react-native-vector-icons/Feather';
// import {
//   useFocusEffect,
// } from '@react-navigation/native';

// import styles from './TransactionHistoryStyles';
// import api from '../../api/axios';

// export default function TransactionHistory({
//   navigation,
// }) {
//   const [transactions, setTransactions] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [dateFilter, setDateFilter] =
//     useState(null);

//   const [
//     statusFilter,
//     setStatusFilter,
//   ] = useState(null);

//   const fetchTransactions =
//     async () => {
//       setLoading(true);

//       try {
//         const res = await api.get(
//           '/api/wallet/transaction-list',
//         );

//         setTransactions(
//           res?.data?.transactions || [],
//         );
//       } catch (err) {
//         console.log(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//   useFocusEffect(
//     useCallback(() => {
//       fetchTransactions();
//     }, []),
//   );

//   const dateOptions = [
//     {
//       label: 'Today',
//       value: 'today',
//     },
//     {
//       label: 'Yesterday',
//       value: 'yesterday',
//     },
//     {
//       label: 'This Week',
//       value: 'week',
//     },
//   ];

//   const statusOptions = [
//     {
//       label: 'Sent',
//       value: 'sent',
//     },
//     {
//       label: 'Received',
//       value: 'received',
//     },
//   ];

//   const filteredData =
//     transactions.filter((item) => {
//       if (
//         item.status === 'failed' &&
//         item.type === 'received'
//       )
//         return false;

//       if (
//         statusFilter === 'sent' &&
//         item.type !== 'sent'
//       )
//         return false;

//       if (
//         statusFilter ===
//           'received' &&
//         item.type !== 'received'
//       )
//         return false;

//       const itemDate =
//         new Date(
//           item.createdAt,
//         ).toDateString();

//       const today =
//         new Date().toDateString();

//       const yesterday =
//         new Date(
//           Date.now() - 86400000,
//         ).toDateString();

//       if (
//         dateFilter === 'today' &&
//         itemDate !== today
//       )
//         return false;

//       if (
//         dateFilter ===
//           'yesterday' &&
//         itemDate !== yesterday
//       )
//         return false;

//       return true;
//     });

//   const sortedData = [
//     ...filteredData,
//   ].sort(
//     (a, b) =>
//       new Date(b.createdAt) -
//       new Date(a.createdAt),
//   );

//   const groupByDate = (data) => {
//     const today =
//       new Date().toDateString();

//     const yesterday =
//       new Date(
//         Date.now() - 86400000,
//       ).toDateString();

//     const groups = {
//       today: [],
//       yesterday: [],
//       week: [],
//     };

//     data.forEach((item) => {
//       const d = new Date(
//         item.createdAt,
//       ).toDateString();

//       if (d === today)
//         groups.today.push(item);
//       else if (d === yesterday)
//         groups.yesterday.push(item);
//       else groups.week.push(item);
//     });

//     return groups;
//   };

//   const grouped =
//     groupByDate(sortedData);

//   const formatDate = (date) =>
//     new Date(
//       date,
//     ).toLocaleDateString('en-GB', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//     });

//   const formatTime = (date) =>
//     new Date(
//       date,
//     ).toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//     });

//   const getTitle = (
//     type,
//     data,
//   ) => {
//     if (!data.length) return '';

//     const d = formatDate(
//       data[0].createdAt,
//     );

//     if (type === 'today')
//       return `Today, ${d}`;

//     if (type === 'yesterday')
//       return `Yesterday, ${d}`;

//     return `This week, ${d}`;
//   };

//   return (
//     <LinearGradient
//       colors={['#6A00F4', '#1A0033']}
//       style={{ flex: 1 }}>
//       <SafeAreaView
//         style={styles.container}>
//         <View style={styles.headerRow}>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() =>
//               navigation.goBack()
//             }>
//             <Icon
//               name="chevron-left"
//               size={28}
//               color="#fff"
//             />
//           </TouchableOpacity>

//           <Text style={styles.header}>
//             Transaction History
//           </Text>
//         </View>        
//         <View style={styles.filterRow}>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => {
//               setDateFilter(null);
//               setStatusFilter(null);
//             }}>
//             <Text style={styles.activeFilter}>
//               All
//             </Text>
//           </TouchableOpacity>

//           <Dropdown
//             style={styles.dropdown}
//             data={dateOptions}
//             labelField="label"
//             valueField="value"
//             placeholder="Date"
//             value={dateFilter}
//             onChange={(item) =>
//               setDateFilter(item.value)
//             }
//             placeholderStyle={
//               styles.dropdownText
//             }
//             selectedTextStyle={
//               styles.dropdownText
//             }
//           />

//           <Dropdown
//             style={styles.dropdown}
//             data={statusOptions}
//             labelField="label"
//             valueField="value"
//             placeholder="Status"
//             value={statusFilter}
//             onChange={(item) =>
//               setStatusFilter(
//                 item.value,
//               )
//             }
//             placeholderStyle={
//               styles.dropdownText
//             }
//             selectedTextStyle={
//               styles.dropdownText
//             }
//           />
//         </View>

//         {loading ? (
//           <View
//             style={{
//               flex: 1,
//               justifyContent:
//                 'center',
//               alignItems: 'center',
//             }}>
//             <ActivityIndicator
//               color="#fff"
//               size="large"
//             />
//           </View>
//         ) : (
//           <ScrollView
//             showsVerticalScrollIndicator={
//               false
//             }
//             contentContainerStyle={{
//               paddingBottom: 30,
//             }}>
//             {sortedData.length ===
//             0 ? (
//               <View
//                 style={{
//                   alignItems:
//                     'center',
//                   marginTop: 120,
//                 }}>
//                 <Icon
//                   name="file-text"
//                   size={60}
//                   color="#c4b5fd"
//                 />

//                 <Text
//                   style={{
//                     color: '#fff',
//                     fontSize: 18,
//                     fontWeight:
//                       '600',
//                     marginTop: 15,
//                   }}>
//                   No Transactions
//                   Found
//                 </Text>

//                 <Text
//                   style={{
//                     color:
//                       '#d1d5db',
//                     fontSize: 14,
//                     marginTop: 6,
//                   }}>
//                   Your transaction
//                   history will
//                   appear here
//                 </Text>
//               </View>
//             ) : (
//               <>
//                 {grouped.today
//                   .length > 0 && (
//                   <>
//                     <Text
//                       style={
//                         styles.section
//                       }>
//                       {getTitle(
//                         'today',
//                         grouped.today,
//                       )}
//                     </Text>

//                     {grouped.today.map(
//                       (
//                         item,
//                         i,
//                       ) => (
//                         <Item
//                           key={i}
//                           item={
//                             item
//                           }
//                           formatTime={
//                             formatTime
//                           }
//                           navigation={
//                             navigation
//                           }
//                         />
//                       ),
//                     )}
//                   </>
//                 )}

//                 {grouped
//                   .yesterday
//                   .length >
//                   0 && (
//                   <>
//                     <Text
//                       style={
//                         styles.section
//                       }>
//                       {getTitle(
//                         'yesterday',
//                         grouped.yesterday,
//                       )}
//                     </Text>

//                     {grouped.yesterday.map(
//                       (
//                         item,
//                         i,
//                       ) => (
//                         <Item
//                           key={i}
//                           item={
//                             item
//                           }
//                           formatTime={
//                             formatTime
//                           }
//                           navigation={
//                             navigation
//                           }
//                         />
//                       ),
//                     )}
//                   </>
//                 )}

//                 {grouped.week
//                   .length > 0 && (
//                   <>
//                     <Text
//                       style={
//                         styles.section
//                       }>
//                       {getTitle(
//                         'week',
//                         grouped.week,
//                       )}
//                     </Text>

//                     {grouped.week.map(
//                       (
//                         item,
//                         i,
//                       ) => (
//                         <Item
//                           key={i}
//                           item={
//                             item
//                           }
//                           formatTime={
//                             formatTime
//                           }
//                           navigation={
//                             navigation
//                           }
//                         />
//                       ),
//                     )}
//                   </>
//                 )}
//               </>
//             )}
//           </ScrollView>
//         )}
//       </SafeAreaView>
//     </LinearGradient>
//   );
// }

// export const Item = ({
//   item,
//   formatTime,
//   navigation,
// }) => {
//   const isReceived =
//     item.type ===
//     'received';

//   const isFailed =
//     item.status ===
//     'failed';

//   return (
//     <TouchableOpacity
//       style={styles.item}
//       activeOpacity={0.8}
//       onPress={() =>
//         navigation.navigate(
//           'TransactionDetailScreen',
//           {
//             transaction_id:
//               item?.id,
//           },
//         )
//       }>
//       <View style={styles.left}>
//         <View
//           style={[
//             styles.avatar,
//             {
//               backgroundColor:
//                 '#e5e7eb',
//             },
//           ]}>
//           <Icon
//             name={
//               isFailed
//                 ? 'x'
//                 : isReceived
//                 ? 'arrow-down-left'
//                 : 'arrow-up-right'
//             }
//             size={18}
//             color={
//               isFailed
//                 ? '#ef4444'
//                 : '#000'
//             }
//           />
//         </View>

//         <View>
//           <Text
//             style={styles.name}
//             numberOfLines={1}>
//             {item.name}
//           </Text>

//           <Text
//             style={styles.time}>
//             {isFailed
//               ? 'Failed'
//               : isReceived
//               ? 'Received'
//               : 'Sent'}{' '}
//             ·{' '}
//             {formatTime(
//               item.createdAt,
//             )}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.right}>
//         <Text
//           style={[
//             styles.amount,
//             {
//               color: isFailed
//                 ? '#ef4444'
//                 : isReceived
//                 ? '#22c55e'
//                 : '#ef4444',
//             },
//           ]}>
//           {isReceived
//             ? `+${Number(
//                 item.amount,
//               ).toFixed(2)}`
//             : Number(
//                 item.amount,
//               ).toFixed(2)}
//         </Text>

//         <Text
//           style={[
//             styles.status,
//             {
//               color: isFailed
//                 ? '#ef4444'
//                 : '#9ca3af',
//             },
//           ]}>
//           {isFailed
//             ? 'failed'
//             : isReceived
//             ? 'received'
//             : 'sent'}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };


/////////////////////////////////////////////////////////////////////////////////////////

// import React, { useCallback, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Dropdown } from 'react-native-element-dropdown';
// import Icon from 'react-native-vector-icons/Feather';
// import { useFocusEffect } from '@react-navigation/native';

// import styles from './TransactionHistoryStyles';
// import api from '../../api/axios';
// import { theme } from '../../MainTheme/theme';

// export default function TransactionHistory({ navigation }) {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dateFilter, setDateFilter] = useState(null);
//   const [statusFilter, setStatusFilter] = useState(null);

//   const fetchTransactions = async () => {
//     setLoading(true);

//     try {
//       const res = await api.get('/api/wallet/transaction-list');
//       setTransactions(res?.data?.transactions || []);
//     } catch (err) {
//       console.log(err.message);
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
//     { label: 'Sent', value: 'sent' },
//     { label: 'Received', value: 'received' },
//   ];

//   const filteredData = transactions.filter((item) => {
//     if (item.status === 'failed' && item.type === 'received') return false;
//     if (statusFilter === 'sent' && item.type !== 'sent') return false;
//     if (statusFilter === 'received' && item.type !== 'received') return false;

//     const itemDate = new Date(item.createdAt).toDateString();
//     const today = new Date().toDateString();
//     const yesterday = new Date(Date.now() - 86400000).toDateString();

//     if (dateFilter === 'today' && itemDate !== today) return false;
//     if (dateFilter === 'yesterday' && itemDate !== yesterday) return false;

//     return true;
//   });

//   const sortedData = [...filteredData].sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//   );

//   const groupByDate = (data) => {
//     const today = new Date().toDateString();
//     const yesterday = new Date(Date.now() - 86400000).toDateString();

//     const groups = {
//       today: [],
//       yesterday: [],
//       week: [],
//     };

//     data.forEach((item) => {
//       const d = new Date(item.createdAt).toDateString();
//       if (d === today) groups.today.push(item);
//       else if (d === yesterday) groups.yesterday.push(item);
//       else groups.week.push(item);
//     });

//     return groups;
//   };

//   const grouped = groupByDate(sortedData);

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString('en-GB', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//     });

//   const formatTime = (date) =>
//     new Date(date).toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//     });

//   const getTitle = (type, data) => {
//     if (!data.length) return '';
//     const d = formatDate(data[0].createdAt);

//     if (type === 'today') return `Today ,${d}`;
//     if (type === 'yesterday') return `Yesterday ,${d}`;
//     return `This week ,${d}`;
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
//       <View style={styles.headerRow}>
//         <View style={styles.headerLeft}>
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => navigation.goBack()}
//           >
//             <Icon name="chevron-left" size={28} color={theme.colors.textMain} />
//           </TouchableOpacity>
//           <Text style={styles.header}>Transaction History</Text>
//         </View>

//         {/* Share Icon placeholder as seen in design */}
//         <TouchableOpacity activeOpacity={0.8}>
//           <Icon name="share" size={22} color={theme.colors.textMain} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.filterRow}>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={() => {
//             setDateFilter(null);
//             setStatusFilter(null);
//           }}
//         >
//           <Text style={styles.activeFilter}>All</Text>
//         </TouchableOpacity>

//         <Dropdown
//           style={styles.dropdown}
//           data={dateOptions}
//           labelField="label"
//           valueField="value"
//           placeholder="Date"
//           value={dateFilter}
//           onChange={(item) => setDateFilter(item.value)}
//           placeholderStyle={styles.dropdownText}
//           selectedTextStyle={styles.dropdownText}
//           iconColor={theme.colors.textMain}
//         />

//         <Dropdown
//           style={styles.dropdown}
//           data={statusOptions}
//           labelField="label"
//           valueField="value"
//           placeholder="Status"
//           value={statusFilter}
//           onChange={(item) => setStatusFilter(item.value)}
//           placeholderStyle={styles.dropdownText}
//           selectedTextStyle={styles.dropdownText}
//           iconColor={theme.colors.textMain}
//         />
//       </View>

//       {loading ? (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator color={theme.colors.primaryBlue} size="large" />
//         </View>
//       ) : (
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 30 }}
//         >
//           {sortedData.length === 0 ? (
//             <View style={styles.emptyContainer}>
//               <Icon name="file-text" size={60} color={theme.colors.textMuted} />
//               <Text style={styles.emptyTitle}>No Transactions Found</Text>
//               <Text style={styles.emptySub}>
//                 Your transaction history will appear here
//               </Text>
//             </View>
//           ) : (
//             <>
//               {grouped.today.length > 0 && (
//                 <>
//                   <Text style={styles.section}>
//                     {getTitle('today', grouped.today)}
//                   </Text>
//                   {grouped.today.map((item, i) => (
//                     <Item
//                       key={i}
//                       item={item}
//                       formatTime={formatTime}
//                       navigation={navigation}
//                     />
//                   ))}
//                 </>
//               )}

//               {grouped.yesterday.length > 0 && (
//                 <>
//                   <Text style={styles.section}>
//                     {getTitle('yesterday', grouped.yesterday)}
//                   </Text>
//                   {grouped.yesterday.map((item, i) => (
//                     <Item
//                       key={i}
//                       item={item}
//                       formatTime={formatTime}
//                       navigation={navigation}
//                     />
//                   ))}
//                 </>
//               )}

//               {grouped.week.length > 0 && (
//                 <>
//                   <Text style={styles.section}>
//                     {getTitle('week', grouped.week)}
//                   </Text>
//                   {grouped.week.map((item, i) => (
//                     <Item
//                       key={i}
//                       item={item}
//                       formatTime={formatTime}
//                       navigation={navigation}
//                     />
//                   ))}
//                 </>
//               )}
//             </>
//           )}
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// }

// export const Item = ({ item, formatTime, navigation }) => {
//   const isReceived = item.type === 'received';
//   const isFailed = item.status === 'failed';

//   return (
//     <TouchableOpacity
//       style={styles.item}
//       activeOpacity={0.8}
//       onPress={() =>
//         navigation.navigate('TransactionDetailScreen', {
//           transaction_id: item?.id,
//         })
//       }
//     >
//       <View style={styles.left}>
//         <View style={styles.avatar}>
//           <Icon
//             name={isFailed ? 'x' : isReceived ? 'arrow-down-left' : 'arrow-up-right'}
//             size={18}
//             color={isFailed ? theme.colors.statusDanger : isReceived ? theme.colors.statusSuccess : theme.colors.statusDanger}
//           />
//         </View>

//         <View>
//           <Text style={styles.name} numberOfLines={1}>
//             {item.name}
//           </Text>

//           <Text style={styles.time}>
//             {isFailed ? 'Failed' : isReceived ? 'Received' : 'Sent'} ·{' '}
//             {formatTime(item.createdAt)}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.right}>
//         <Text style={styles.amount}>
//           {isReceived
//             ? `+${Number(item.amount).toFixed(2)}`
//             : `-${Number(item.amount).toFixed(2)}`}
//         </Text>

//         <Text
//           style={[
//             styles.status,
//             {
//               color: isFailed
//                 ? theme.colors.statusDanger
//                 : isReceived
//                 ? theme.colors.statusSuccess
//                 : theme.colors.statusDanger,
//             },
//           ]}
//         >
//           {isFailed ? 'failed' : isReceived ? 'received' : 'sent'}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };


//////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';

import styles from './TransactionHistoryStyles';
import api from '../../api/axios';
import { theme } from '../../MainTheme/theme';

export default function TransactionHistory({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);

    try {
      const res = await api.get('/api/wallet/deposit-history');
      const rawList = res?.data?.Transactions || [];

      // Map API fields into clean internal structure
      const formattedData = rawList.map((item) => {
        const isApproved = item.Payment_Status === 'Payment Approved';
        const isFailed = item.Payment_Status === 'Payment Failed';

        let type = 'received';
        if (isFailed) type = 'failed';

        return {
          id: item.Transaction_UID,
          gatewayOrderId: item.Gateway_Order_ID,
          depositUid: item.Deposit_UID,
          amount: parseFloat(item.Requested_Amount || 0),
          status: item.Payment_Status,
          createdAt: item.Payment_Date,
          name: item.Gateway_Order_ID || item.Transaction_UID,
          type: type, // 'received' or 'failed'
          isApproved,
          isFailed,
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
    // Status Dropdown Filter
    if (statusFilter === 'approved' && !item.isApproved) return false;
    if (statusFilter === 'failed' && !item.isFailed) return false;
    if (
      statusFilter === 'progress' &&
      (item.isApproved || item.isFailed)
    ) {
      return false;
    }

    // Date Filter
    const itemDate = new Date(item.createdAt).toDateString();
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (dateFilter === 'today' && itemDate !== today) return false;
    if (dateFilter === 'yesterday' && itemDate !== yesterday) return false;

    return true;
  });

  const sortedData = [...filteredData].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const groupByDate = (data) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    const groups = {
      today: [],
      yesterday: [],
      week: [],
    };

    data.forEach((item) => {
      const d = new Date(item.createdAt).toDateString();
      if (d === today) groups.today.push(item);
      else if (d === yesterday) groups.yesterday.push(item);
      else groups.week.push(item);
    });

    return groups;
  };

  const grouped = groupByDate(sortedData);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const getTitle = (type, data) => {
    if (!data.length) return '';
    const d = formatDate(data[0].createdAt);

    if (type === 'today') return `Today, ${d}`;
    if (type === 'yesterday') return `Yesterday, ${d}`;
    return `Earlier, ${d}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={28} color={theme.colors.textMain} />
          </TouchableOpacity>
          <Text style={styles.header}>Transaction History</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8}>
          <Icon name="share" size={22} color={theme.colors.textMain} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setDateFilter(null);
            setStatusFilter(null);
          }}
        >
          <Text style={styles.activeFilter}>All</Text>
        </TouchableOpacity>

        <Dropdown
          style={styles.dropdown}
          data={dateOptions}
          labelField="label"
          valueField="value"
          placeholder="Date"
          value={dateFilter}
          onChange={(item) => setDateFilter(item.value)}
          placeholderStyle={styles.dropdownText}
          selectedTextStyle={styles.dropdownText}
          iconColor={theme.colors.textMain}
        />

        <Dropdown
          style={styles.dropdown}
          data={statusOptions}
          labelField="label"
          valueField="value"
          placeholder="Status"
          value={statusFilter}
          onChange={(item) => setStatusFilter(item.value)}
          placeholderStyle={styles.dropdownText}
          selectedTextStyle={styles.dropdownText}
          iconColor={theme.colors.textMain}
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
          {sortedData.length === 0 ? (
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

              {grouped.yesterday.length > 0 && (
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
    </SafeAreaView>
  );
}

export const Item = ({ item, formatTime, navigation }) => {
  const isApproved = item.isApproved;
  const isFailed = item.isFailed;

  // Determine status color scheme
  let statusColor = '#EAB308'; // Default Amber/Warning for In-Progress
  let iconName = 'clock';

  if (isApproved) {
    statusColor = theme.colors.statusSuccess || '#10B981';
    iconName = 'arrow-down-left';
  } else if (isFailed) {
    statusColor = theme.colors.statusDanger || '#EF4444';
    iconName = 'x';
  }

  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('TransactionDetailScreen', {
          transaction_id: item?.id,
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
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};