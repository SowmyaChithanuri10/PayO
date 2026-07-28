// // TransactionDetailScreen.jsx

// import React, { useEffect, useState, useRef } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     ActivityIndicator,
//     Alert,
//     ToastAndroid,
//     Share,
//     Platform,
//     ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRoute } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather';
// import Clipboard from '@react-native-clipboard/clipboard';
// import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';

// import api from '../../api/axios';
// import styles from './TransactionDetailStyles';

// export default function TransactionDetailScreen({
//     navigation,
// }) {
//     const route = useRoute();
//     const { transaction_id } = route.params || {};

//     const [transaction, setTransaction] =
//         useState(null);

//     const [loading, setLoading] =
//         useState(true);

//     const viewShotRef = useRef();

//     useEffect(() => {
//         const fetchTransaction = async () => {
//             try {
//                 const res = await api.get(
//                     `/api/wallet/transactionById/${transaction_id}`,
//                 );

//                 setTransaction(res.data);
//             } catch (err) {
//                 console.log(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (transaction_id) {
//             fetchTransaction();
//         }
//     }, [transaction_id]);

//     const formatISTTime = (utcTime) => {
//         const date = new Date(utcTime);

//         const time =
//             new Intl.DateTimeFormat('en-IN', {
//                 timeZone: 'Asia/Kolkata',
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 hour12: true,
//             }).format(date);

//         const day =
//             new Intl.DateTimeFormat('en-IN', {
//                 timeZone: 'Asia/Kolkata',
//                 day: '2-digit',
//             }).format(date);

//         const month =
//             new Intl.DateTimeFormat('en-IN', {
//                 timeZone: 'Asia/Kolkata',
//                 month: 'short',
//             }).format(date);

//         const year =
//             new Intl.DateTimeFormat('en-IN', {
//                 timeZone: 'Asia/Kolkata',
//                 year: 'numeric',
//             }).format(date);

//         return `${time} on ${day} ${month} ${year}`;
//     };

//     const handleCopyWallet = (walletId) => {
//         Clipboard.setString(walletId);

//         if (Platform.OS === 'android') {
//             ToastAndroid.show(
//                 'Wallet copied',
//                 ToastAndroid.SHORT,
//             );
//         }
//     };

//     const handleCopyTransactionID = (id) => {
//         Clipboard.setString(id);

//         if (Platform.OS === 'android') {
//             ToastAndroid.show(
//                 'Transaction ID copied',
//                 ToastAndroid.SHORT,
//             );
//         }
//     };

//     const handleSendAgain = () => {
//         navigation.navigate('EnterAmount', {
//             name: transaction.name,
//             address: transaction.wallet,
//             amount: transaction.amount,
//             show: true,
//         });
//     };

//     const handleHistory = (id, name) => {
//         navigation.navigate(
//             'TnsHistorySingleUser',
//             {
//                 id,
//                 name,
//             },
//         );
//     };

//     const handleShare = async () => {
//         try {
//             await Share.share({
//                 message: `Transaction Receipt

// To: ${transaction?.name}
// Amount: ${transaction?.amount} PAYO
// Date: ${formatISTTime(
//                     transaction?.timestamp,
//                 )}
// Transaction ID: ${transaction?._id ||
//                     transaction?.id
//                     }`,
//             });
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const handleDownload = async () => {
//         try {
//             if (!viewShotRef.current) {
//                 Alert.alert('Error', 'Receipt not ready');
//                 return;
//             }

//             const uri = await viewShotRef.current.capture();

//             const fileName = `transaction_${Date.now()}.png`;

//             const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

//             await RNFS.copyFile(uri, path);

//             Alert.alert(
//                 'Success',
//                 `Receipt saved successfully!\n${path}`
//             );

//             console.log('Saved at:', path);

//         } catch (error) {
//             console.log(error);
//             Alert.alert('Error', error.message);
//         }
//     };

//     if (loading) {
//         return (
//             <LinearGradient
//                 colors={['#5B0FD1', '#14002B']}
//                 style={styles.loader}>
//                 <ActivityIndicator
//                     size="large"
//                     color="#fff"
//                 />
//             </LinearGradient>
//         );
//     }

//     return (
//         <LinearGradient
//             colors={['#5B0FD1', '#14002B']}
//             style={styles.gradient}>
//             <SafeAreaView
//                 style={styles.container}
//                 edges={['top', 'bottom']}>
//                 <ScrollView
//                     showsVerticalScrollIndicator={false}
//                     keyboardShouldPersistTaps="handled"
//                     contentContainerStyle={styles.scrollContent}>
//                     <View style={styles.headerRow}>
//                         <TouchableOpacity
//                             activeOpacity={0.8}
//                             onPress={() =>
//                                 navigation.goBack()
//                             }>
//                             <Icon
//                                 name="chevron-left"
//                                 size={28}
//                                 color="#fff"
//                             />
//                         </TouchableOpacity>

//                         <Text style={styles.header}>
//                             Transaction Details
//                         </Text>
//                     </View>          <ViewShot
//                         ref={viewShotRef}
//                         options={{
//                             format: 'png',
//                             quality: 1,
//                         }}>
//                         <View style={styles.receiptCard}>
//                             <View style={styles.section}>
//                                 <Text style={styles.smallLabel}>
//                                     {transaction?.status === 'failed'
//                                         ? 'Payment Failed'
//                                         : transaction?.type === 'sent'
//                                             ? 'Paid to'
//                                             : 'Received from'}
//                                 </Text>

//                                 <View style={styles.row}>
//                                     <View style={styles.userRow}>
//                                         <View style={styles.iconBox}>
//                                             {transaction?.status ===
//                                                 'failed' ? (
//                                                 <Icon
//                                                     name="x"
//                                                     size={16}
//                                                     color="red"
//                                                 />
//                                             ) : transaction?.type ===
//                                                 'sent' ? (
//                                                 <Icon
//                                                     name="arrow-up-right"
//                                                     size={14}
//                                                     color="#000"
//                                                 />
//                                             ) : (
//                                                 <Icon
//                                                     name="arrow-down-left"
//                                                     size={14}
//                                                     color="#000"
//                                                 />
//                                             )}
//                                         </View>

//                                         <View>
//                                             <Text style={styles.name}>
//                                                 {transaction?.name ||
//                                                     'User'}
//                                             </Text>

//                                             <Text
//                                                 style={
//                                                     styles.timeText
//                                                 }>
//                                                 {formatISTTime(
//                                                     transaction?.timestamp,
//                                                 )}
//                                             </Text>
//                                         </View>
//                                     </View>

//                                     <Text
//                                         style={styles.amount}>
//                                         {transaction?.amount}{' '}
//                                         <Text
//                                             style={
//                                                 styles.payo
//                                             }>
//                                             PAYO
//                                         </Text>
//                                     </Text>
//                                 </View>
//                             </View>

//                             <View
//                                 style={styles.divider}
//                             />

//                             <View style={styles.section}>
//                                 <View
//                                     style={
//                                         styles.paymentHeader
//                                     }>
//                                     <Icon
//                                         name="file-text"
//                                         size={16}
//                                         color="#ddd"
//                                     />

//                                     <Text
//                                         style={
//                                             styles.paymentTitle
//                                         }>
//                                         Payment Details
//                                     </Text>
//                                 </View>

//                                 <Text
//                                     style={styles.label}>
//                                     Paid Via
//                                 </Text>

//                                 <View
//                                     style={
//                                         styles.valueRow
//                                     }>
//                                     <Text
//                                         style={
//                                             styles.value
//                                         }
//                                         numberOfLines={2}>
//                                         Wallet:{' '}
//                                         {transaction?.wallet}
//                                     </Text>

//                                     <TouchableOpacity
//                                         onPress={() =>
//                                             handleCopyWallet(
//                                                 transaction?.wallet,
//                                             )
//                                         }>
//                                         <Icon
//                                             name="copy"
//                                             size={16}
//                                             color="#ccc"
//                                         />
//                                     </TouchableOpacity>
//                                 </View>

//                                 <Text
//                                     style={styles.label}>
//                                     Transaction ID
//                                 </Text>

//                                 <View
//                                     style={
//                                         styles.valueRow
//                                     }>
//                                     <Text
//                                         style={
//                                             styles.value
//                                         }
//                                         numberOfLines={2}>
//                                         {transaction?._id ||
//                                             transaction?.id}
//                                     </Text>

//                                     <TouchableOpacity
//                                         onPress={() =>
//                                             handleCopyTransactionID(
//                                                 transaction?._id ||
//                                                 transaction?.id,
//                                             )
//                                         }>
//                                         <Icon
//                                             name="copy"
//                                             size={16}
//                                             color="#ccc"
//                                         />
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </View>
//                     </ViewShot>

//                     <View
//                         style={styles.actionsRow}>
//                         <TouchableOpacity
//                             style={styles.actionItem}
//                             onPress={
//                                 handleSendAgain
//                             }>
//                             <View
//                                 style={styles.circle}>
//                                 <Icon
//                                     name="arrow-up-right"
//                                     size={18}
//                                     color="#000"
//                                 />
//                             </View>

//                             <Text
//                                 style={
//                                     styles.actionText
//                                 }>
//                                 Send again
//                             </Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={styles.actionItem}
//                             onPress={handleShare}>
//                             <View
//                                 style={styles.circle}>
//                                 <Icon
//                                     name="share-2"
//                                     size={18}
//                                     color="#000"
//                                 />
//                             </View>

//                             <Text
//                                 style={
//                                     styles.actionText
//                                 }>
//                                 Share
//                             </Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={styles.actionItem}
//                             onPress={() =>
//                                 handleHistory(
//                                     transaction?.wallet,
//                                     transaction?.name,
//                                 )
//                             }>
//                             <View
//                                 style={styles.circle}>
//                                 <Icon
//                                     name="clock"
//                                     size={18}
//                                     color="#000"
//                                 />
//                             </View>

//                             <Text
//                                 style={
//                                     styles.actionText
//                                 }>
//                                 History
//                             </Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={styles.actionItem}
//                             onPress={
//                                 handleDownload
//                             }>
//                             <View
//                                 style={styles.circle}>
//                                 <Icon
//                                     name="download"
//                                     size={18}
//                                     color="#000"
//                                 />
//                             </View>

//                             <Text
//                                 style={
//                                     styles.actionText
//                                 }>
//                                 Download
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         </LinearGradient>
//     );
// }



// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   ToastAndroid,
//   Share,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Feather';
// import Clipboard from '@react-native-clipboard/clipboard';
// import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';

// import api from '../../api/axios';
// import styles from './TransactionDetailStyles';
// import { theme } from '../../MainTheme/theme';

// export default function TransactionDetailScreen({ navigation }) {
//   const route = useRoute();
//   const { transaction_id } = route.params || {};

//   const [transaction, setTransaction] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const viewShotRef = useRef();

//   useEffect(() => {
//     const fetchTransaction = async () => {
//       try {
//         const res = await api.get(
//           `/api/wallet/transactionById/${transaction_id}`,
//         );

//         setTransaction(res.data);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (transaction_id) {
//       fetchTransaction();
//     }
//   }, [transaction_id]);

//   // const formatISTTime = (utcTime) => {
//   //   const date = new Date(utcTime);

//   //   const time = new Intl.DateTimeFormat('en-IN', {
//   //     timeZone: 'Asia/Kolkata',
//   //     hour: '2-digit',
//   //     minute: '2-digit',
//   //     hour12: true,
//   //   }).format(date);

//   //   const day = new Intl.DateTimeFormat('en-IN', {
//   //     timeZone: 'Asia/Kolkata',
//   //     day: '2-digit',
//   //   }).format(date);

//   //   const month = new Intl.DateTimeFormat('en-IN', {
//   //     timeZone: 'Asia/Kolkata',
//   //     month: 'short',
//   //   }).format(date);

//   //   const year = new Intl.DateTimeFormat('en-IN', {
//   //     timeZone: 'Asia/Kolkata',
//   //     year: 'numeric',
//   //   }).format(date);

//   //   return `${time} on ${day} ${month} ${year}`;
//   // };

//   // Inside TransactionDetailScreen.js
// const formatISTTime = (dateStr) => {
//   if (!dateStr) return 'N/A';
  
//   // Replace space with T for valid ISO format in React Native / Hermes
//   const formattedStr = typeof dateStr === 'string' ? dateStr.replace(' ', 'T') : dateStr;
//   const date = new Date(formattedStr);

//   if (isNaN(date.getTime())) {
//     return 'N/A'; // Prevents RangeError: Invalid time value
//   }

//   return date.toLocaleTimeString('en-IN', {
//     hour: '2-digit',
//     minute: '2-digit',
//     timeZone: 'Asia/Kolkata',
//   });
// };

//   const handleCopyWallet = (walletId) => {
//     Clipboard.setString(walletId);

//     if (Platform.OS === 'android') {
//       ToastAndroid.show('Wallet copied', ToastAndroid.SHORT);
//     }
//   };

//   const handleCopyTransactionID = (id) => {
//     Clipboard.setString(id);

//     if (Platform.OS === 'android') {
//       ToastAndroid.show('Transaction ID copied', ToastAndroid.SHORT);
//     }
//   };

//   const handleSendAgain = () => {
//     navigation.navigate('EnterAmount', {
//       name: transaction.name,
//       address: transaction.wallet,
//       amount: transaction.amount,
//       show: true,
//     });
//   };

//   const handleHistory = (id, name) => {
//     navigation.navigate('TnsHistorySingleUser', {
//       id,
//       name,
//     });
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `Transaction Receipt\n\nTo: ${transaction?.name}\nAmount: ${transaction?.amount} PAYO\nDate: ${formatISTTime(
//           transaction?.timestamp,
//         )}\nTransaction ID: ${transaction?._id || transaction?.id}`,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       if (!viewShotRef.current) {
//         Alert.alert('Error', 'Receipt not ready');
//         return;
//       }

//       const uri = await viewShotRef.current.capture();
//       const fileName = `transaction_${Date.now()}.png`;
//       const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

//       await RNFS.copyFile(uri, path);

//       Alert.alert('Success', `Receipt saved successfully!\n${path}`);
//       console.log('Saved at:', path);
//     } catch (error) {
//       console.log(error);
//       Alert.alert('Error', error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color={theme.colors.primaryBlue} />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={styles.scrollContent}
//       >
//         <View style={styles.container}>
//           <View style={styles.headerRow}>
//             <TouchableOpacity
//               style={styles.backBtn}
//               activeOpacity={0.8}
//               onPress={() => navigation.goBack()}
//             >
//               <Icon name="chevron-left" size={28} color={theme.colors.textMain} />
//             </TouchableOpacity>

//             <Text style={styles.header}>Transaction Details</Text>
//           </View>

//           <ViewShot
//             ref={viewShotRef}
//             options={{
//               format: 'png',
//               quality: 1,
//             }}
//           >
//             <View style={styles.receiptCard}>
//               <View style={styles.section}>
//                 <Text style={styles.smallLabel}>
//                   {transaction?.status === 'failed'
//                     ? 'Payment Failed'
//                     : transaction?.type === 'sent'
//                     ? 'Paid to'
//                     : 'Received from'}
//                 </Text>

//                 <View style={styles.row}>
//                   <View style={styles.userRow}>
//                     <View style={styles.iconBox}>
//                       {transaction?.status === 'failed' ? (
//                         <Icon name="x" size={18} color={theme.colors.statusDanger} />
//                       ) : transaction?.type === 'sent' ? (
//                         <Icon name="arrow-up-right" size={18} color={theme.colors.textMain} />
//                       ) : (
//                         <Icon name="arrow-down-left" size={18} color={theme.colors.statusSuccess} />
//                       )}
//                     </View>

//                     <View>
//                       <Text style={styles.name} numberOfLines={1}>
//                         {transaction?.name || 'User'}
//                       </Text>

//                       <Text style={styles.timeText}>
//                         {formatISTTime(transaction?.timestamp)}
//                       </Text>
//                     </View>
//                   </View>

//                   <View style={styles.amountContainer}>
//                     <Text style={styles.amount}>
//                       {transaction?.amount} <Text style={styles.payo}>PAYO</Text>
//                     </Text>
//                   </View>
//                 </View>
//               </View>

//               <View style={styles.divider} />

//               <View style={styles.section}>
//                 <View style={styles.paymentHeader}>
//                   <Icon name="file-text" size={16} color={theme.colors.textMuted} />
//                   <Text style={styles.paymentTitle}>Payment Details</Text>
//                 </View>

//                 <Text style={styles.label}>Paid Via</Text>

//                 <View style={styles.valueRow}>
//                   <Text style={styles.value} numberOfLines={2}>
//                     Wallet: {transaction?.wallet}
//                   </Text>

//                   <TouchableOpacity
//                     onPress={() => handleCopyWallet(transaction?.wallet)}
//                   >
//                     <Icon name="copy" size={18} color={theme.colors.textMuted} />
//                   </TouchableOpacity>
//                 </View>

//                 <Text style={styles.label}>Transaction ID</Text>

//                 <View style={styles.valueRow}>
//                   <Text style={styles.value} numberOfLines={2}>
//                     {transaction?._id || transaction?.id}
//                   </Text>

//                   <TouchableOpacity
//                     onPress={() =>
//                       handleCopyTransactionID(
//                         transaction?._id || transaction?.id,
//                       )
//                     }
//                   >
//                     <Icon name="copy" size={18} color={theme.colors.textMuted} />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </ViewShot>

//           <View style={styles.actionsRow}>
//             <TouchableOpacity
//               style={styles.actionItem}
//               onPress={handleSendAgain}
//               activeOpacity={0.7}
//             >
//               <View style={styles.circle}>
//                 <Icon name="arrow-up-right" size={20} color={theme.colors.textMain} />
//               </View>
//               <Text style={styles.actionText}>Send again</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionItem}
//               onPress={handleShare}
//               activeOpacity={0.7}
//             >
//               <View style={styles.circle}>
//                 <Icon name="share-2" size={20} color={theme.colors.textMain} />
//               </View>
//               <Text style={styles.actionText}>Share</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionItem}
//               onPress={() =>
//                 handleHistory(transaction?.wallet, transaction?.name)
//               }
//               activeOpacity={0.7}
//             >
//               <View style={styles.circle}>
//                 <Icon name="clock" size={20} color={theme.colors.textMain} />
//               </View>
//               <Text style={styles.actionText}>History</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionItem}
//               onPress={handleDownload}
//               activeOpacity={0.7}
//             >
//               <View style={styles.circle}>
//                 <Icon name="download" size={20} color={theme.colors.textMain} />
//               </View>
//               <Text style={styles.actionText}>Download</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   ToastAndroid,
//   Share,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Feather';
// import Clipboard from '@react-native-clipboard/clipboard';
// import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';

// import api from '../../api/axios';
// import styles from './TransactionDetailStyles';
// import { theme } from '../../MainTheme/theme';

// export default function TransactionDetailScreen({ navigation }) {
//   const route = useRoute();
//   const { transaction_id } = route.params || {};

//   const [transaction, setTransaction] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const viewShotRef = useRef();

//   useEffect(() => {
//     const fetchTransaction = async () => {
//       try {
//         const res = await api.get(
//           `/api/wallet/transactionById/${transaction_id}`,
//         );

//         const data = res?.data?.Transaction || res?.data || {};

//         // Normalizing backend keys to match history list attributes
//         const formatted = {
//           id: data.Transaction_UID || data._id || data.id || transaction_id,
//           gatewayOrderId: data.Gateway_Order_ID || data.gatewayOrderId,
//           depositUid: data.Deposit_UID,
//           amount: parseFloat(data.Requested_Amount || data.amount || 0),
//           status: data.Payment_Status || data.status,
//           createdAt: data.Payment_Date || data.createdAt || data.timestamp,
//           wallet: data.Wallet_Address || data.wallet || 'N/A',
//           name: data.Gateway_Order_ID || data.Transaction_UID || data.name || 'Top-up User',
//           type: data.type || 'received',
//         };

//         setTransaction(formatted);
//       } catch (err) {
//         console.log('Error fetching transaction detail:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (transaction_id) {
//       fetchTransaction();
//     }
//   }, [transaction_id]);

//   // Robust time formatter for IST converting potential space separators safely
//   const formatISTTime = (dateStr) => {
//     if (!dateStr) return 'N/A';

//     const formattedStr =
//       typeof dateStr === 'string' ? dateStr.replace(' ', 'T') : dateStr;
//     const date = new Date(formattedStr);

//     if (isNaN(date.getTime())) {
//       return 'N/A';
//     }

//     const time = date.toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//       timeZone: 'Asia/Kolkata',
//     });

//     const day = date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       timeZone: 'Asia/Kolkata',
//     });

//     return `${time} on ${day}`;
//   };

//   const isApproved = transaction?.status === 'Payment Approved';
//   const isFailed = transaction?.status === 'Payment Failed';

//   let statusColor = '#EAB308'; // Amber for in progress
//   let displayStatus = 'Payment Verification In-Progress';

//   if (isApproved) {
//     statusColor = theme.colors.statusSuccess || '#10B981';
//     displayStatus = 'Payment Approved';
//   } else if (isFailed) {
//     statusColor = theme.colors.statusDanger || '#EF4444';
//     displayStatus = 'Payment Failed';
//   }

//   const handleCopyWallet = (walletId) => {
//     if (!walletId) return;
//     Clipboard.setString(walletId);

//     if (Platform.OS === 'android') {
//       ToastAndroid.show('Wallet copied', ToastAndroid.SHORT);
//     }
//   };

//   const handleCopyTransactionID = (id) => {
//     if (!id) return;
//     Clipboard.setString(id);

//     if (Platform.OS === 'android') {
//       ToastAndroid.show('Transaction ID copied', ToastAndroid.SHORT);
//     }
//   };

//   const handleSendAgain = () => {
//     navigation.navigate('EnterAmount', {
//       name: transaction?.name,
//       address: transaction?.wallet,
//       amount: transaction?.amount,
//       show: true,
//     });
//   };

//   const handleHistory = (id, name) => {
//     navigation.navigate('TnsHistorySingleUser', {
//       id,
//       name,
//     });
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `Transaction Receipt\n\nOrder ID: ${
//           transaction?.gatewayOrderId || transaction?.id
//         }\nAmount: ₹${transaction?.amount}\nStatus: ${displayStatus}\nDate: ${formatISTTime(
//           transaction?.createdAt,
//         )}\nTransaction UID: ${transaction?.id}`,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       if (!viewShotRef.current) {
//         Alert.alert('Error', 'Receipt not ready');
//         return;
//       }

//       const uri = await viewShotRef.current.capture();
//       const fileName = `transaction_${Date.now()}.png`;
//       const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

//       await RNFS.copyFile(uri, path);

//       Alert.alert('Success', `Receipt saved successfully!\n${path}`);
//       console.log('Saved at:', path);
//     } catch (error) {
//       console.log(error);
//       Alert.alert('Error', error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color={theme.colors.primaryBlue} />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={styles.scrollContent}
//       >
//         <View style={styles.container}>
//           <View style={styles.headerRow}>
//             <TouchableOpacity
//               style={styles.backBtn}
//               activeOpacity={0.8}
//               onPress={() => navigation.goBack()}
//             >
//               <Icon name="chevron-left" size={28} color={theme.colors.textMain} />
//             </TouchableOpacity>

//             <Text style={styles.header}>Transaction Details</Text>
//           </View>

//           <ViewShot
//             ref={viewShotRef}
//             options={{
//               format: 'png',
//               quality: 1,
//             }}
//           >
//             <View style={styles.receiptCard}>
//               <View style={styles.section}>
//                 <Text style={[styles.smallLabel, { color: statusColor, fontWeight: '600' }]}>
//                   {displayStatus}
//                 </Text>

//                 <View style={styles.row}>
//                   <View style={styles.userRow}>
//                     <View style={styles.iconBox}>
//                       {isFailed ? (
//                         <Icon name="x" size={18} color={theme.colors.statusDanger} />
//                       ) : isApproved ? (
//                         <Icon name="arrow-down-left" size={18} color={theme.colors.statusSuccess} />
//                       ) : (
//                         <Icon name="clock" size={18} color="#EAB308" />
//                       )}
//                     </View>

//                     <View style={{ flex: 1 }}>
//                       <Text style={styles.name} numberOfLines={1}>
//                         {transaction?.gatewayOrderId || transaction?.id}
//                       </Text>

//                       <Text style={styles.timeText}>
//                         {formatISTTime(transaction?.createdAt)}
//                       </Text>
//                     </View>
//                   </View>

//                   <View style={styles.amountContainer}>
//                     <Text style={styles.amount}>
//                       +₹{Number(transaction?.amount || 0).toFixed(2)}
//                     </Text>
//                   </View>
//                 </View>
//               </View>

//               <View style={styles.divider} />

//               <View style={styles.section}>
//                 <View style={styles.paymentHeader}>
//                   <Icon name="file-text" size={16} color={theme.colors.textMuted} />
//                   <Text style={styles.paymentTitle}>Payment Details</Text>
//                 </View>

//                 {transaction?.depositUid && (
//                   <>
//                     <Text style={styles.label}>Deposit UID</Text>
//                     <View style={styles.valueRow}>
//                       <Text style={styles.value} numberOfLines={1}>
//                         {transaction?.depositUid}
//                       </Text>
//                     </View>
//                   </>
//                 )}

//                 <Text style={styles.label}>Wallet / Paid Via</Text>
//                 <View style={styles.valueRow}>
//                   <Text style={styles.value} numberOfLines={2}>
//                     {transaction?.wallet}
//                   </Text>

//                   <TouchableOpacity
//                     onPress={() => handleCopyWallet(transaction?.wallet)}
//                   >
//                     <Icon name="copy" size={18} color={theme.colors.textMuted} />
//                   </TouchableOpacity>
//                 </View>

//                 <Text style={styles.label}>Transaction ID</Text>

//                 <View style={styles.valueRow}>
//                   <Text style={styles.value} numberOfLines={2}>
//                     {transaction?.id}
//                   </Text>

//                   <TouchableOpacity
//                     onPress={() => handleCopyTransactionID(transaction?.id)}
//                   >
//                     <Icon name="copy" size={18} color={theme.colors.textMuted} />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </ViewShot>

//           <View style={styles.actionsRow}>
//             <TouchableOpacity
//               style={styles.actionItem}
//               onPress={handleSendAgain}
//               activeOpacity={0.7}
//             >
//               <View style={styles.circle}>
//                 <Icon name="arrow-up-right" size={20} color={theme.colors.textMain} />
//               </View>
//               <Text style={styles.actionText}>Send again</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionItem}
//               onPress={handleShare}
//               activeOpacity={0.7}
//             >
//               <View style={styles.circle}>
//                 <Icon name="share-2" size={20} color={theme.colors.textMain} />
//               </View>
//               <Text style={styles.actionText}>Share</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionItem}
//               onPress={() =>
//                 handleHistory(transaction?.wallet, transaction?.name)
//               }
//               activeOpacity={0.7}
//             >
//               <View style={styles.circle}>
//                 <Icon name="clock" size={20} color={theme.colors.textMain} />
//               </View>
//               <Text style={styles.actionText}>History</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionItem}
//               onPress={handleDownload}
//               activeOpacity={0.7}
//             >
//               <View style={styles.circle}>
//                 <Icon name="download" size={20} color={theme.colors.textMain} />
//               </View>
//               <Text style={styles.actionText}>Download</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   ToastAndroid,
//   Share,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Feather';
// import Clipboard from '@react-native-clipboard/clipboard';
// import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';

// import api from '../../api/axios';
// import styles from './TransactionDetailStyles';
// import { theme } from '../../MainTheme/theme';

// export default function TransactionDetailScreen({ navigation }) {
//   const route = useRoute();
//   const { transaction_id, item } = route.params || {};

//   const [transaction, setTransaction] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const viewShotRef = useRef();

//   useEffect(() => {
//     const fetchTransaction = async () => {
//       // If item is directly passed from history screen navigation, use it immediately
//       if (item) {
//         normalizeAndSetData(item);
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await api.get(
//           `/api/wallet/transactionById/${transaction_id}`,
//         );
//         const data = res?.data?.Transaction || res?.data || {};
//         normalizeAndSetData(data);
//       } catch (err) {
//         console.log('Error fetching transaction detail:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const normalizeAndSetData = (data) => {
//       const formatted = {
//         id: data.Transaction_UID || data._id || data.id || transaction_id,
//         gatewayOrderId: data.Gateway_Order_ID || data.gatewayOrderId || data.id,
//         depositUid: data.Deposit_UID || data.depositUid,
//         amount: parseFloat(data.Requested_Amount || data.amount || 0),
//         status: data.Payment_Status || data.status,
//         createdAt: data.Payment_Date || data.createdAt || data.timestamp,
//         wallet: data.Wallet_Address || data.wallet || 'PAYHOSKJDN45',
//         name: data.name || data.Gateway_Order_ID || 'User',
//         type: data.type || 'received',
//         isApproved:
//           data.Payment_Status === 'Payment Approved' ||
//           data.isApproved === true,
//         isFailed:
//           data.Payment_Status === 'Payment Failed' ||
//           data.isFailed === true,
//       };
//       setTransaction(formatted);
//     };

//     fetchTransaction();
//   }, [transaction_id, item]);

//   const formatDateTime = (dateStr) => {
//     if (!dateStr) return 'N/A';

//     const formattedStr =
//       typeof dateStr === 'string' ? dateStr.replace(' ', 'T') : dateStr;
//     const date = new Date(formattedStr);

//     if (isNaN(date.getTime())) return 'N/A';

//     const day = date.toLocaleDateString('en-GB', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//     });

//     const time = date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     });

//     return `${day} ${time}`;
//   };

//   const isApproved =
//     transaction?.isApproved || transaction?.status === 'Payment Approved';
//   const isFailed =
//     transaction?.isFailed || transaction?.status === 'Payment Failed';

//   let statusTitle = 'Payment In-Progress';
//   let statusBadgeText = 'In-Progress';
//   let statusColor = '#EAB308';

//   if (isApproved) {
//     statusTitle = 'Payment Successful';
//     statusBadgeText = 'Completed';
//     statusColor = '#10B981';
//   } else if (isFailed) {
//     statusTitle = 'Payment Failed';
//     statusBadgeText = 'Failed';
//     statusColor = '#EF4444';
//   }

//   const handleCopy = (text, label) => {
//     if (!text) return;
//     Clipboard.setString(text);
//     if (Platform.OS === 'android') {
//       ToastAndroid.show(`${label} copied`, ToastAndroid.SHORT);
//     }
//   };

//   const handleSendAgain = () => {
//     navigation.navigate('EnterAmount', {
//       name: transaction?.name,
//       address: transaction?.wallet,
//       amount: transaction?.amount,
//       show: true,
//     });
//   };

//   const handleHistory = () => {
//     navigation.navigate('TnsHistorySingleUser', {
//       id: transaction?.wallet,
//       name: transaction?.name,
//     });
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `Transaction Receipt\n\nTransaction ID: #${
//           transaction?.gatewayOrderId || transaction?.id
//         }\nAmount: ${transaction?.amount} PAYO\nStatus: ${statusBadgeText}\nDate: ${formatDateTime(
//           transaction?.createdAt,
//         )}`,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       if (!viewShotRef.current) {
//         Alert.alert('Error', 'Receipt capture not ready');
//         return;
//       }

//       const uri = await viewShotRef.current.capture();
//       const fileName = `transaction_${Date.now()}.png`;
//       const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

//       await RNFS.copyFile(uri, path);
//       Alert.alert('Success', `Receipt saved successfully!\n${path}`);
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#2563EB" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={styles.scrollContent}
//       >
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.headerRow}>
//             <TouchableOpacity
//               style={styles.backBtn}
//               activeOpacity={0.8}
//               onPress={() => navigation.goBack()}
//             >
//               <Icon name="chevron-left" size={22} color="#1F2937" />
//             </TouchableOpacity>

//             <View style={styles.headerCenter}>
//               <Text style={styles.headerTitle}>Transaction Details</Text>
//               <Text style={styles.headerSubtitle}>
//                 View your transaction information
//               </Text>
//             </View>

//             <TouchableOpacity style={styles.helpBtn} activeOpacity={0.8}>
//               <Icon name="help-circle" size={22} color="#2563EB" />
//             </TouchableOpacity>
//           </View>

//           {/* Capture Receipt Area */}
//           <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
//             <View style={styles.captureContainer}>
//               {/* Top Gradient/Solid Banner */}
//               <View style={styles.bannerCard}>
//                 <View style={styles.bannerLeft}>
//                   <View style={styles.statusCircle}>
//                     {isFailed ? (
//                       <Icon name="x" size={26} color="#6366F1" />
//                     ) : (
//                       <Icon name="check" size={26} color="#6366F1" />
//                     )}
//                   </View>
//                 </View>

//                 <View style={styles.bannerRight}>
//                   <Text style={styles.bannerStatusText}>{statusTitle}</Text>
//                   <View style={styles.amountRow}>
//                     <Text style={styles.bannerAmountText}>
//                       {transaction?.amount || 0}
//                     </Text>
//                     <Text style={styles.bannerCurrencyText}> PAYO</Text>
//                   </View>
//                   <Text style={styles.bannerSubText}>
//                     {transaction?.type === 'received' ? 'Received from ' : 'Paid to '}
//                     {transaction?.name || 'User'}
//                   </Text>
//                 </View>
//               </View>

//               {/* Transaction Details Card */}
//               <View style={styles.detailsCard}>
//                 {/* Transaction ID */}
//                 <TouchableOpacity
//                   activeOpacity={0.7}
//                   onPress={() =>
//                     handleCopy(
//                       transaction?.gatewayOrderId || transaction?.id,
//                       'Transaction ID',
//                     )
//                   }
//                   style={styles.detailRow}
//                 >
//                   <Text style={styles.detailLabel}>Transaction ID</Text>
//                   <Text style={styles.detailValueBold}>
//                     #{transaction?.gatewayOrderId || transaction?.id}
//                   </Text>
//                 </TouchableOpacity>

//                 {/* Paid via */}
//                 <TouchableOpacity
//                   activeOpacity={0.7}
//                   onPress={() => handleCopy(transaction?.wallet, 'Wallet')}
//                   style={styles.detailRow}
//                 >
//                   <Text style={styles.detailLabel}>Paid via</Text>
//                   <Text style={styles.detailValueBold} numberOfLines={1}>
//                     Wallet : {transaction?.wallet || 'N/A'}
//                   </Text>
//                 </TouchableOpacity>

//                 {/* Date & Time */}
//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Date & Time</Text>
//                   <Text style={styles.detailValueBold}>
//                     {formatDateTime(transaction?.createdAt)}
//                   </Text>
//                 </View>

//                 {/* Status */}
//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Status</Text>
//                   <View style={styles.statusValueContainer}>
//                     <Text
//                       style={[
//                         styles.detailStatusText,
//                         { color: statusColor },
//                       ]}
//                     >
//                       {statusBadgeText}
//                     </Text>
//                     {isApproved && (
//                       <Icon
//                         name="check-circle"
//                         size={16}
//                         color={statusColor}
//                         style={{ marginLeft: 6 }}
//                       />
//                     )}
//                   </View>
//                 </View>

//                 {/* Transfer Fee */}
//                 <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
//                   <Text style={styles.detailLabel}>Transfer Fee</Text>
//                   <Text style={styles.detailValueBold}>₹0.00</Text>
//                 </View>
//               </View>
//             </View>
//           </ViewShot>

//           {/* Action Row */}
//           <View style={styles.actionsRow}>
//             <TouchableOpacity
//               style={styles.actionItem}
//               onPress={handleSendAgain}
//               activeOpacity={0.8}
//             >
//               <View style={styles.actionSquare}>
//                 <Icon name="send" size={20} color="#FFFFFF" />
//               </View>
//               <Text style={styles.actionText}>Send Again</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionItem}
//               onPress={handleDownload}
//               activeOpacity={0.8}
//             >
//               <View style={styles.actionSquare}>
//                 <Icon name="download" size={20} color="#FFFFFF" />
//               </View>
//               <Text style={styles.actionText}>Download</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionItem}
//               onPress={handleShare}
//               activeOpacity={0.8}
//             >
//               <View style={styles.actionSquare}>
//                 <Icon name="share-2" size={20} color="#FFFFFF" />
//               </View>
//               <Text style={styles.actionText}>Share Receipt</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionItem}
//               onPress={handleHistory}
//               activeOpacity={0.8}
//             >
//               <View style={styles.actionSquare}>
//                 <Icon name="rotate-ccw" size={20} color="#FFFFFF" />
//               </View>
//               <Text style={styles.actionText}>History</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

///////////////////////////////////////////////////////////////////////static ////////////////////////////////////////////////////////////

// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   StatusBar,
//   StyleSheet,
//   Dimensions,
//   Alert,
//   Share,
//   Platform,
//   ToastAndroid,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather';
// import Clipboard from '@react-native-clipboard/clipboard';
// import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';

// import { globalStyles, theme } from '../../MainTheme/theme';
// import { verticalScale, scale, moderateScale } from '../../utils/responsive';

// const { width: windowWidth } = Dimensions.get('window');

// export default function TransactionDetailScreen({ route, navigation }) {
//   // Extract dynamic parameters passed down from previous transaction stacks
//   const { 
//     amount = '300', 
//     recipient = 'User 2', 
//     transactionId = 'PAY24827372', 
//     wallet_id = 'PAYHOSKJDN45',
//     date = '8 July 2026 09:42 AM',
//   } = route.params || {};

//   const viewShotRef = useRef();

//   const handleBackToHome = () => {
//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'Main', state: { routes: [{ name: 'Home' }] } }],
//     });
//   };

//   const handleCopy = (text, label) => {
//     if (!text) return;
//     Clipboard.setString(text);
//     if (Platform.OS === 'android') {
//       ToastAndroid.show(`${label} copied`, ToastAndroid.SHORT);
//     }
//   };

//   const handleSendAgain = () => {
//     navigation.navigate('EnterAmount', {
//       name: recipient,
//       address: wallet_id,
//       amount: amount,
//       show: true,
//     });
//   };

//   const handleDownload = async () => {
//     try {
//       if (!viewShotRef.current) {
//         Alert.alert('Error', 'Receipt capture not ready');
//         return;
//       }

//       const uri = await viewShotRef.current.capture();
//       const fileName = `receipt_${Date.now()}.png`;
//       const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

//       await RNFS.copyFile(uri, path);
//       Alert.alert('Success', `Receipt saved successfully!\n${path}`);
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `Transaction Receipt\n\nTransaction ID: #${transactionId}\nAmount: ${amount} PAYO\nStatus: Completed\nDate: ${date}`,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleHistory = () => {
//     navigation.navigate('TnsHistorySingleUser', {
//       id: wallet_id,
//       name: recipient,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
//       <StatusBar backgroundColor={theme.colors.bgApp} barStyle="dark-content" />

//       {/* HEADER ROW */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.backButton} 
//           onPress={handleBackToHome}
//           activeOpacity={0.7}
//         >
//           <Icon name="chevron-left" size={moderateScale(22)} color={theme.colors.textMain} />
//         </TouchableOpacity>
        
//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle}>Transaction Details</Text>
//           <Text style={styles.headerSubtitle}>View your transaction information</Text>
//         </View>

//         <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
//           <Icon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView 
//         showsVerticalScrollIndicator={false} 
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* VIEW SHOT WRAPPER FOR DOWNLOADING RECEIPT */}
//         <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
//           <View style={styles.captureCardWrapper}>
//             {/* GRADIENT BANNER CARD */}
//             <LinearGradient
//               colors={['#6366f1', '#4f46e5', '#3b82f6']}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.gradientCard}
//             >
//               {/* Decorative Glow Overlay */}
//               <Image 
//                 source={require('../../../assets/images/transactionScreen/Image Container.png')} 
//                 style={styles.bgGlowOverlay}
//                 resizeMode="cover"
//               />

//               <View style={styles.gradientCardContent}>
//                 {/* Status Check Icon Frame */}
//                 <Image 
//                   source={require('../../../assets/images/transactionScreen/Wallet Icon Container.png')}
//                   style={styles.statusCheckImage}
//                   resizeMode="contain"
//                 />
                
//                 <View style={styles.statusTextContainer}>
//                   <Text style={styles.paymentStatusText}>Payment Successful</Text>
//                   <View style={styles.amountContainer}>
//                     <Text style={styles.amountText}>{amount}</Text>
//                     <Text style={styles.currencyText}>PAYO</Text>
//                   </View>
//                   <Text style={styles.recipientText}>Paid to {recipient}</Text>
//                 </View>

//                 {/* Wallet Visual Illustration */}
//                 <Image 
//                   source={require('../../../assets/images/transactionScreen/Wallet image 1.png')} 
//                   style={styles.walletIllustration}
//                   resizeMode="contain"
//                 />
//               </View>
//             </LinearGradient>

//             {/* DETAILS CONTAINER CARD */}
//          <View style={styles.detailsCard}>
//   <TouchableOpacity
//     activeOpacity={0.7}
//     onPress={() => handleCopy(transactionId, 'Transaction ID')}
//     style={styles.detailRow}
//   >
//     <Text style={styles.detailLabel}>Transaction ID</Text>
//     <Text style={styles.detailValueBold}>#{transactionId}</Text>
//   </TouchableOpacity>

//   <TouchableOpacity
//     activeOpacity={0.7}
//     onPress={() => handleCopy(wallet_id, 'Wallet ID')}
//     style={styles.detailRow}
//   >
//     <Text style={styles.detailLabel}>Paid via</Text>
//     <Text style={styles.detailValueBold}>Wallet : {wallet_id}</Text>
//   </TouchableOpacity>

//   <View style={styles.detailRow}>
//     <Text style={styles.detailLabel}>Date & Time</Text>
//     <Text style={styles.detailValueBold}>{date}</Text>
//   </View>

//   <View style={styles.detailRow}>
//     <Text style={styles.detailLabel}>Status</Text>
//     <View style={styles.statusPillContainer}>
//       <Text style={styles.statusLabelCompleted}>Completed</Text>
//       <Icon name="check-circle" size={moderateScale(16)} color="#10B981" />
//     </View>
//   </View>

//   {/* LAST ROW: Added styles.noBorderRow */}
//   <View style={[styles.detailRow, styles.noBorderRow]}>
//     <Text style={styles.detailLabel}>Transfer Fee</Text>
//     <Text style={styles.detailValueBold}>₹0.00</Text>
//   </View>
// </View>
//           </View>
//         </ViewShot>

     
//         {/* <TouchableOpacity style={styles.rewardsCard} activeOpacity={0.9}>
//           <Image 
//             source={require('../../../assets/images/transactionScreen/Image Container.png')} 
//             style={styles.rewardsBgGlow}
//             resizeMode="cover"
//           />
          
//           <View style={styles.rewardsContent}>
//             <View style={styles.giftIconContainer}>
//               <Image 
//                 source={require('../../../assets/images/transactionScreen/Text (1).png')} 
//                 style={styles.rewardsIcon}
//                 resizeMode="cover"
//               />
//             </View>
//             <View style={styles.rewardsTextContainer}>
//               <Text style={styles.rewardsTitle}>Rewards Earned</Text>
//               <Text style={styles.rewardsSubtitle}>+ 20 PAYO points added to wallet</Text>
//             </View>
//           </View>
//           <Icon name="chevron-right" size={moderateScale(18)} color={theme.colors.primaryPurple} />
//         </TouchableOpacity> */}

//         {/* BOTTOM ACTION BUTTONS ROW */}
//         <View style={styles.actionRow}>
//           <TouchableOpacity style={styles.actionItem} onPress={handleSendAgain} activeOpacity={0.8}>
//             <View style={styles.actionSquare}>
//               <Icon name="send" size={moderateScale(18)} color="#FFFFFF" />
//             </View>
//             <Text style={styles.actionText}>Send Again</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionItem} onPress={handleDownload} activeOpacity={0.8}>
//             <View style={styles.actionSquare}>
//               <Icon name="download" size={moderateScale(18)} color="#FFFFFF" />
//             </View>
//             <Text style={styles.actionText}>Download</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionItem} onPress={handleShare} activeOpacity={0.8}>
//             <View style={styles.actionSquare}>
//               <Icon name="share-2" size={moderateScale(18)} color="#FFFFFF" />
//             </View>
//             <Text style={styles.actionText}>Share Receipt</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionItem} onPress={handleHistory} activeOpacity={0.8}>
//             <View style={styles.actionSquare}>
//               <Icon name="rotate-ccw" size={moderateScale(18)} color="#FFFFFF" />
//             </View>
//             <Text style={styles.actionText}>History</Text>
//           </TouchableOpacity>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFC',
//   },
//   scrollContent: {
//     paddingHorizontal: scale(16),
//     paddingBottom: verticalScale(32),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(12),
//     backgroundColor: '#FAFAFC',
//   },
//   backButton: {
//     width: moderateScale(38),
//     height: moderateScale(38),
//     borderRadius: theme.borderRadius.full,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     ...theme.shadows.sm,
//   },
//   headerTitleContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     fontSize: moderateScale(17),
//     fontWeight: theme.typography.weight.bold,
//     color: '#0D0E11',
//   },
//   headerSubtitle: {
//     fontSize: moderateScale(12),
//     color: '#414141',
//     marginTop: verticalScale(2),
//   },
//   infoButton: {
//     width: moderateScale(38),
//     height: moderateScale(38),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   captureCardWrapper: {
//     backgroundColor: '#FAFAFC',
//   },
//   gradientCard: {
//     borderRadius: scale(20),
//     marginTop: verticalScale(12),
//     marginBottom: verticalScale(50),
//     height: verticalScale(125),
//     position: 'relative',
//     overflow: 'hidden',
//     ...theme.shadows.md,
//   },
//   bgGlowOverlay: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     opacity: 0.15,
//   },
//   gradientCardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: scale(16),
//     height: '100%',
//   },
//   statusCheckImage: {
//     width: scale(58),
//     height: scale(58),
//   },
//   statusTextContainer: {
//     flex: 1,
//     marginLeft: scale(25),
//     justifyContent: 'center',
//   },
//   paymentStatusText: {
//     fontSize: moderateScale(13.5),
//     color: 'rgba(255, 255, 255, 0.9)',
//     fontWeight: '500',
//   },
//   amountContainer: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//     marginVertical: verticalScale(1),
//   },
//   amountText: {
//     fontSize: moderateScale(26),
//     fontWeight: '700',
//     color: '#ffffff',
//   },
//   currencyText: {
//     fontSize: moderateScale(13),
//     color: '#ffffff',
//     fontWeight: '600',
//     marginLeft: scale(4),
//   },
//   recipientText: {
//     fontSize: moderateScale(12),
//     color: 'rgba(255, 255, 255, 0.85)',
//   },
//   walletIllustration: {
//     width: scale(75),
//     height: scale(75),
//   },

//   // Details Container Box
//  detailsCard: {
//     backgroundColor: '#F2F4F4', // Matches light card tone from design
//     borderRadius: scale(20),
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(4),
//     borderWidth: 1,
//     borderColor: '#ECECF2',
//     marginBottom: verticalScale(16),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 2,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: verticalScale(16),
//     borderBottomWidth: 1,
//     borderBottomColor: '#9EA1A8', // Light gray divider line
//   },
//   noBorderRow: {
//     borderBottomWidth: 0, // Removes the bottom line for the last item
//   },
//   detailLabel: {
//     fontSize: moderateScale(13),
//     color: '#6B7280',
//     fontWeight: '500',
//   },
//   detailValueBold: {
//     fontSize: moderateScale(13),
//     color: '#111827',
//     fontWeight: '700',
//   },
//   statusPillContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statusLabelCompleted: {
//     fontSize: moderateScale(13),
//     fontWeight: '700',
//     color: '#10B981',
//     marginRight: scale(4),
//   },

//   // Rewards Pill
//   rewardsCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#F5F3FF',
//     borderWidth: 1,
//     borderColor: '#E9D5FF',
//     borderRadius: theme.borderRadius.md,
//     padding: scale(12),
//     marginBottom: verticalScale(20),
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   rewardsBgGlow: {
//     position: 'absolute',
//     right: 40,
//     bottom: 0,
//     width: scale(100),
//     opacity: 0.6,
//   },
//   rewardsContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   giftIconContainer: {
//     width: scale(36),
//     height: scale(36),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   rewardsIcon: {
//     width: 32,
//     height: 32,
//   },
//   rewardsTextContainer: {
//     marginLeft: scale(10),
//   },
//   rewardsTitle: {
//     fontSize: moderateScale(14),
//     color: theme.colors.primaryPurple,
//     fontWeight: '700',
//   },
//   rewardsSubtitle: {
//     fontSize: moderateScale(11.5),
//     color: theme.colors.primaryPurple,
//     marginTop: verticalScale(1),
//   },

//   // Action Bar Bottom
//   actionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: verticalScale(30),
//   },
//   actionItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   actionSquare: {
//     width: scale(48),
//     height: scale(48),
//     borderRadius: scale(14),
//     backgroundColor: '#2563EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: verticalScale(6),
//     ...theme.shadows.sm,
//   },
//   actionText: {
//     color: '#374151',
//     fontSize: moderateScale(11),
//     textAlign: 'center',
//     fontWeight: '500',
//   },
// });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  Alert,
  Share,
  Platform,
  ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';

import { theme } from '../../MainTheme/theme';
import { verticalScale, scale, moderateScale } from '../../utils/responsive';
import { useAppSelector } from '../../redux/hooks';

export default function TransactionDetailScreen({ route, navigation }) {
  // Extract dynamic parameters passed from TransactionHistory
  const { 
    amount = '0.00', 
    recipient = 'Wallet Top-up', 
    transactionId = 'N/A', 
    wallet_id = 'N/A',
    date = 'N/A',
    status = 'Completed',
    isApproved = true,
    isFailed = false,
  } = route.params || {};

  const viewShotRef = useRef();
  const walletData = useAppSelector((state) => state.deposit.walletData);

  // Dynamic Status Configurations
  let statusColor = '#10B981';
  let statusIcon = 'check-circle';
  let statusText = status || 'Completed';
  let bannerStatusTitle = 'Payment Successful';

  if (isFailed) {
    statusColor = '#EF4444';
    statusIcon = 'x-circle';
    bannerStatusTitle = 'Payment Failed';
  } else if (!isApproved && !isFailed) {
    statusColor = '#EAB308';
    statusIcon = 'clock';
    bannerStatusTitle = 'Payment In-Progress';
  }

  const handleBackToHome = () => {
    navigation.goBack();
  };

  const handleCopy = (text, label) => {
    if (!text || text === 'N/A') return;
    Clipboard.setString(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show(`${label} copied`, ToastAndroid.SHORT);
    }
  };

  const handleSendAgain = () => {
    navigation.navigate('EnterAmount', {
      name: recipient,
      address: wallet_id,
      amount: amount,
      show: true,
    });
  };

  const handleDownload = async () => {
    try {
      if (!viewShotRef.current) {
        Alert.alert('Error', 'Receipt capture not ready');
        return;
      }

      const uri = await viewShotRef.current.capture();
      const fileName = `receipt_${Date.now()}.png`;
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      await RNFS.copyFile(uri, path);
      Alert.alert('Success', `Receipt saved successfully!\n${path}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Transaction Receipt\n\nTransaction ID: #${transactionId}\nAmount: ₹${amount}\nStatus: ${statusText}\nDate: ${date}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const handleHistory = () => {
  //   navigation.navigate('TransactionHistory');
  // };


    const handleHistory = () => {
    navigation.navigate('TnsHistorySingleUser', {
      id: transaction?.wallet,
      name: transaction?.name,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar backgroundColor={theme.colors.bgApp} barStyle="dark-content" />

      {/* HEADER ROW */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackToHome}
          activeOpacity={0.7}
        >
          <Icon name="chevron-left" size={moderateScale(22)} color={theme.colors.textMain} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Transaction Details</Text>
          <Text style={styles.headerSubtitle}>View your transaction information</Text>
        </View>

        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <Icon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* VIEW SHOT WRAPPER FOR DOWNLOADING RECEIPT */}
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
          <View style={styles.captureCardWrapper}>
            {/* GRADIENT BANNER CARD */}
            <LinearGradient
              colors={['#6366f1', '#4f46e5', '#3b82f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientCard}
            >
              <Image 
                source={require('../../../assets/images/transactionScreen/Image Container.png')} 
                style={styles.bgGlowOverlay}
                resizeMode="cover"
              />

              <View style={styles.gradientCardContent}>
                <Image 
                  source={require('../../../assets/images/transactionScreen/Wallet Icon Container.png')}
                  style={styles.statusCheckImage}
                  resizeMode="contain"
                />
                
                <View style={styles.statusTextContainer}>
                  <Text style={styles.paymentStatusText}>{bannerStatusTitle}</Text>
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>₹{amount}</Text>
                  </View>
                  <Text style={styles.recipientText}>{recipient}</Text>
                </View>

                <Image 
                  source={require('../../../assets/images/transactionScreen/Wallet image 1.png')} 
                  style={styles.walletIllustration}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>

            {/* DETAILS CONTAINER CARD */}
            <View style={styles.detailsCard}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleCopy(transactionId, 'Transaction ID')}
                style={styles.detailRow}
              >
                <Text style={styles.detailLabel}>Transaction ID</Text>
                <Text style={styles.detailValueBold}>#{transactionId}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleCopy(wallet_id, 'Wallet ID')}
                style={styles.detailRow}
              >
                <Text style={styles.detailLabel}>Paid via</Text>
                <Text style={styles.detailValueBold}>Wallet : {walletData?.Wallet_ID}</Text>
              </TouchableOpacity>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValueBold}>{date}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status</Text>
                <View style={styles.statusPillContainer}>
                  <Text style={[styles.statusLabelCompleted, { color: statusColor }]}>
                    {statusText}
                  </Text>
                  <Icon name={statusIcon} size={moderateScale(16)} color={statusColor} />
                </View>
              </View>

              <View style={[styles.detailRow, styles.noBorderRow]}>
                <Text style={styles.detailLabel}>Transfer Fee</Text>
                <Text style={styles.detailValueBold}>₹0.00</Text>
              </View>
            </View>
          </View>
        </ViewShot>

        {/* BOTTOM ACTION BUTTONS ROW */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionItem} onPress={handleSendAgain} activeOpacity={0.8}>
            <View style={styles.actionSquare}>
              <Icon name="send" size={moderateScale(18)} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Send Again</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleDownload} activeOpacity={0.8}>
            <View style={styles.actionSquare}>
              <Icon name="download" size={moderateScale(18)} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleShare} activeOpacity={0.8}>
            <View style={styles.actionSquare}>
              <Icon name="share-2" size={moderateScale(18)} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Share Receipt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleHistory} activeOpacity={0.8}>
            <View style={styles.actionSquare}>
              <Icon name="rotate-ccw" size={moderateScale(18)} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: '#FAFAFC',
  },
  backButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: theme.borderRadius.full,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(17),
    fontWeight: theme.typography.weight.bold,
    color: '#0D0E11',
  },
  headerSubtitle: {
    fontSize: moderateScale(12),
    color: '#414141',
    marginTop: verticalScale(2),
  },
  infoButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureCardWrapper: {
    backgroundColor: '#FAFAFC',
  },
  gradientCard: {
    borderRadius: scale(20),
    marginTop: verticalScale(12),
    marginBottom: verticalScale(16),
    height: verticalScale(125),
    position: 'relative',
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  bgGlowOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.15,
  },
  gradientCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    height: '100%',
  },
  statusCheckImage: {
    width: scale(58),
    height: scale(58),
  },
  statusTextContainer: {
    flex: 1,
    marginLeft: scale(16),
    justifyContent: 'center',
  },
  paymentStatusText: {
    fontSize: moderateScale(13.5),
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: verticalScale(1),
  },
  amountText: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#ffffff',
  },
  recipientText: {
    fontSize: moderateScale(12),
    color: 'rgba(255, 255, 255, 0.85)',
  },
  walletIllustration: {
    width: scale(75),
    height: scale(75),
  },
  detailsCard: {
    backgroundColor: '#F2F4F4',
    borderRadius: scale(20),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(4),
    borderWidth: 1,
    borderColor: '#ECECF2',
    marginBottom: verticalScale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#9EA1A8',
  },
  noBorderRow: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: moderateScale(13),
    color: '#6B7280',
    fontWeight: '500',
  },
  detailValueBold: {
    fontSize: moderateScale(13),
    color: '#111827',
    fontWeight: '700',
  },
  statusPillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabelCompleted: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    marginRight: scale(4),
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionSquare: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(14),
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(6),
    ...theme.shadows.sm,
  },
  actionText: {
    color: '#374151',
    fontSize: moderateScale(11),
    textAlign: 'center',
    fontWeight: '500',
  },
});