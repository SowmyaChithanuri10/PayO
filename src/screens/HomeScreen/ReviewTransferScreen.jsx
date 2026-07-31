// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Switch,
//   ScrollView,
//     Alert,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import api from '../../api/axios';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';

// export default function ReviewTransferScreen({
//   route,
//   navigation,
// }) {
//   const {
//     receiver,
//     amount,
//     address,
//     sender,
//     show,
//     isRecent,
//   } = route.params;
//   console.log(amount,"amount")

//   console.log(
//           receiver,
//           address,sender,"7676")

//   const [save, setSave] =
//     useState(false);

//   const [selfUser, setSelfUser] =
//     useState('');

//   useEffect(() => {
//     const fetchQr = async () => {
//       try {
//         const res = await api.get(
//           'api/wallet/generate-address',
//         );

//         const data = res.data;

//         setSelfUser(
//           data || 'No Address',
//         );
//       } catch (err) {
//         console.log(
//           'QR ERROR:',
//           err.response?.data ||
//             err.message,
//         );

//         setSelfUser('');
//       }
//     };

//     fetchQr();
//   }, []);

// //  const handleConfirm = async () => {
// //   try {
// //     // Save recent receiver if enabled
// //     if (save) {
// //       await api.post(
// //         '/api/wallet/recent-toggle-add',
// //         {
// //           receiverName: receiver?.name,
// //           walletAddress: address,
// //         },
// //       );
// //     }

// //     // Fetch transaction history
// //     const transactionRes = await api.get(
// //       '/api/wallet/transaction-list',
// //     );

// //     const transactions =
// //       transactionRes?.data?.transactions || [];

// //     // Filter only sent transactions
// //     const sentTransactions = transactions.filter(
// //       txn => txn?.type === 'sent' &&
// //       txn?.status === 'success',
// //     );

// //     // If no sent transactions, navigate to TransactionPin
// //     if (sentTransactions?.length < 1) {
// //       navigation.navigate(
// //         'TransactionPin',
// //         {
// //           amount,
// //           name: receiver?.name,
// //           address,
// //           sender,
// //         },
// //       );
// //       return;
// //     }

// //     // Otherwise navigate to SendPin
// //     navigation.navigate(
// //       'SendPin',
// //       {
// //         amount,
// //         name: receiver?.name,
// //         address,
// //         sender,
// //       },
// //     );
// //   } catch (error) {
// //     console.log(
// //       'Handle confirm error:',
// //       error?.response?.data || error?.message,
// //     );
// //   }
// // };

// const handleConfirm = async () => {
//   try {
//     // Save recent receiver if enabled
//     if (save) {
//       await api.post(
//         '/api/wallet/recent-toggle-add',
//         {
//           receiverName: receiver?.name,
//           walletAddress: address,
//         },
//       );
//     }

//     // Fetch transaction history
//     const transactionRes = await api.get(
//       '/api/wallet/transaction-list',
//     );

//     const transactions =
//       transactionRes?.data?.transactions || [];

//     // Check if user has at least one successful sent transaction
//     const hasSuccessfulSentTransaction =
//       transactions.some(
//         txn =>
//           txn?.type === 'sent' &&
//           txn?.status === 'success',
//       );

//     // If no successful sent transaction
//     if (!hasSuccessfulSentTransaction) {
//       // Check if Transaction PIN is already created
//       if (!sender?.transactionPinSet) {
//         Alert.alert(
//           'Transaction PIN Not Created',

//           'Please set your Transaction PIN to continue.',
//           [
//             {
//               text: 'Cancel',
//               style: 'cancel',
//             },
//             {
//               text: 'Set PIN',
//               onPress: () =>
//                 navigation.navigate(
//                   'TransactionPin', 
//                    {
//           amount,
//           name: receiver?.name,
//           address,
//           sender,
//         },// Replace with your screen name
//                 ),
//             },
//           ],
//         );
//         return;
//       }

//       // Transaction PIN exists
//       navigation.navigate(
//         'TransactionPin',
//         {
//           amount,
//           name: receiver?.name,
//           address,
//           sender,
//         },
//       );
//       return;
//     }

//     // User has already made a successful sent transaction
//     navigation.navigate(
//       'SendPin',
//       {
//         amount,
//         name: receiver?.name,
//         address,
//         sender,
//       },
//     );
//   } catch (error) {
//     console.log(
//       'Handle confirm error:',
//       error?.response?.data || error?.message,
//     );

//     Alert.alert(
//       'Error',
//       'Something went wrong. Please try again.',
//     );
//   }
// };


//   return (
//     <LinearGradient
//       colors={[
//         '#6A00F4',
//         '#1A0033',
//       ]}
//       style={styles.container}>
//       <SafeAreaView
//         style={styles.safeArea}
//         edges={['top', 'bottom']}>
//         <ScrollView
//           showsVerticalScrollIndicator={
//             false
//           }
//           keyboardShouldPersistTaps="handled"
//           contentContainerStyle={
//             styles.scrollContent
//           }>
//           {/* HEADER */}
//           <View
//             style={
//               styles.header
//             }>
//             <TouchableOpacity
//               style={
//                 styles.cancelContainer
//               }
//               onPress={() =>
//                 navigation.goBack()
//               }>
//               <Icon
//                 name="chevron-left"
//                 size={moderateScale(
//                   28,
//                 )}
//                 color="#ffffff"
//               />
//             </TouchableOpacity>

//             <Text
//               style={
//                 styles.headerTitle
//               }>
//               Review your Detail
//               Transfer
//             </Text>
//           </View>

//           {/* AVATAR */}
//           <View
//             style={
//               styles.avatar
//             }>
//             <Text
//               style={
//                 styles.avatarText
//               }>
//               {receiver?.name?.[0] ||
//                 'U'}
//             </Text>
//           </View>

//           {/* AMOUNT */}
//           <Text
//             style={
//               styles.labelCenter
//             }>
//             Total Tokens
//           </Text>

//           <Text
//             style={
//               styles.amount
//             }>
//             {amount}{' '}
//             <Text
//               style={
//                 styles.payo
//               }>
//               PAYO
//             </Text>
//           </Text>

//           {/* FROM */}
//           <View
//             style={
//               styles.section
//             }>
//             <Text
//               style={
//                 styles.small
//               }>
//               From
//             </Text>

//             <View
//               style={
//                 styles.rowBetween
//               }>
//               <Text
//                 style={
//                   styles.name
//                 }
//                 numberOfLines={
//                   1
//                 }>
//                 {sender?.name}
//               </Text>

//               <Text
//                 style={
//                   styles.wallet
//                 }
//                 numberOfLines={
//                   2
//                 }>
//                 {sender?.wallet}
//               </Text>
//             </View>
//           </View>

//           <View
//             style={
//               styles.divider
//             }
//           />

//           {/* TO */}
//           <View
//             style={
//               styles.section
//             }>
//             <Text
//               style={
//                 styles.small
//               }>
//               To
//             </Text>

//             <View
//               style={
//                 styles.rowBetween
//               }>
//               <Text
//                 style={
//                   styles.name
//                 }
//                 numberOfLines={
//                   1
//                 }>
//                 {receiver?.name}
//               </Text>

//               <Text
//                 style={
//                   styles.wallet
//                 }
//                 numberOfLines={
//                   2
//                 }>
//                 {address}
//               </Text>
//             </View>
//           </View>

//           <View
//             style={
//               styles.divider
//             }
//           />

//           {/* SAVE */}
//           <View
//             style={[
//               styles.rowBetween,
//               isRecent && {
//                 opacity: 0.5,
//               },
//             ]}>
//             <Text
//               style={
//                 styles.saveText
//               }>
//               Save to Recents
//             </Text>

//             <Switch
//               value={save}
//               onValueChange={
//                 setSave
//               }
//               disabled={
//                 isRecent
//               }
//               trackColor={{
//                 false:
//                   '#999',
//                 true:
//                   '#fff',
//               }}
//               thumbColor={
//                 save
//                   ? '#6A00F4'
//                   : '#fff'
//               }
//             />
//           </View>

//           <View
//             style={
//               styles.divider
//             }
//           />

//           {/* BUTTON */}
//           <TouchableOpacity
//             style={
//               styles.button
//             }
//             onPress={
//               handleConfirm
//             }>
//             <Text
//               style={
//                 styles.buttonText
//               }>
//               Confirm and send
//             </Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// }

// const styles =
//   StyleSheet.create({
//     container: {
//       flex: 1,
//     },

//     safeArea: {
//       flex: 1,
//     },

//     scrollContent: {
//       flexGrow: 1,
//       paddingHorizontal:
//         wp('5%'),
//       paddingBottom:
//         hp('5%'),
//     },

//     header: {
//       marginTop:
//         hp('1%'),
//       marginBottom:
//         hp('4%'),
//       justifyContent:
//         'center',
//       alignItems:
//         'center',
//       minHeight:
//         hp('6%'),
//       position:
//         'relative',
//     },

//     cancelContainer: {
//       position:
//         'absolute',
//       left: 0,
//     },

//     headerTitle: {
//       color: '#fff',
//       fontWeight: '700',
//       fontSize:
//         moderateScale(
//           18,
//         ),
//       textAlign:
//         'center',
//       maxWidth: '75%',
//     },

//     avatar: {
//       width:
//         moderateScale(
//           90,
//         ),
//       height:
//         moderateScale(
//           90,
//         ),
//       borderRadius:
//         moderateScale(
//           45,
//         ),
//       backgroundColor:
//         '#ddd',
//       alignSelf:
//         'center',
//       justifyContent:
//         'center',
//       alignItems:
//         'center',
//       marginBottom:
//         hp('2.5%'),
//       elevation: 5,
//     },

//     avatarText: {
//       fontSize:
//         moderateScale(
//           22,
//         ),
//       fontWeight:
//         '600',
//     },

//     labelCenter: {
//       color: '#ccc',
//       textAlign:
//         'center',
//       fontSize:
//         moderateScale(
//           13,
//         ),
//     },

//     amount: {
//       color: '#fff',
//       fontSize:
//         moderateScale(
//           30,
//         ),
//       fontWeight:
//         '700',
//       textAlign:
//         'center',
//       marginBottom:
//         hp('3%'),
//     },

//     payo: {
//       color: '#00FFAA',
//       fontSize:
//         moderateScale(
//           16,
//         ),
//     },

//     section: {
//       marginBottom:
//         hp('1%'),
//     },

//     small: {
//       color: '#aaa',
//       marginBottom:
//         hp('0.7%'),
//       fontSize:
//         moderateScale(
//           12,
//         ),
//     },

//     rowBetween: {
//       flexDirection:
//         'row',
//       justifyContent:
//         'space-between',
//       alignItems:
//         'flex-start',
//     },

//     name: {
//       color: '#fff',
//       fontSize:
//         moderateScale(
//           16,
//         ),
//       textTransform:
//         'capitalize',
//       width: '40%',
//     },

//     wallet: {
//       color: '#ccc',
//       width: '55%',
//       textAlign:
//         'right',
//       fontSize:
//         moderateScale(
//           12,
//         ),
//     },

//     divider: {
//       height: 1,
//       backgroundColor:
//         '#555',
//       marginVertical:
//         hp('2%'),
//     },

//     saveText: {
//       color: '#fff',
//       fontSize:
//         moderateScale(
//           15,
//         ),
//     },

//     button: {
//       backgroundColor:
//         '#0B8A2A',
//       paddingVertical:
//         hp('2%'),
//       borderRadius:
//         moderateScale(
//           12,
//         ),
//       alignItems:
//         'center',
//       marginTop:
//         hp('3%'),
//     },

//     buttonText: {
//       color: '#fff',
//       fontWeight:
//         '600',
//       fontSize:
//         moderateScale(
//           16,
//         ),
//     },
//   });




import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../api/axios';
import Icon from 'react-native-vector-icons/Feather';

// 1. Importing the responsive utilities
import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';

// 2. Importing your theme file
import { theme } from '../../MainTheme/theme';

export default function ReviewTransferScreen({
  route,
  navigation,
}) {
  const {
    receiver,
    amount,
    address,
    sender,
    show,
    isRecent,
  } = route.params;

  console.log(amount, "amount");
  console.log(receiver, address, sender, "7676");

  const [save, setSave] = useState(false);
  const [selfUser, setSelfUser] = useState('');

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const res = await api.get('api/wallet/generate-address');
        const data = res.data;
        setSelfUser(data || 'No Address');
      } catch (err) {
        console.log(
          'QR ERROR:',
          err.response?.data || err.message,
        );
        setSelfUser('');
      }
    };

    fetchQr();
  }, []);

  const handleConfirm = async () => {
    try {
      // Save recent receiver if enabled
      if (save) {
        await api.post('/api/wallet/recent-toggle-add', {
          receiverName: receiver?.name,
          walletAddress: address,
        });
      }

      // Fetch transaction history
      const transactionRes = await api.get('/api/wallet/transaction-list');
      const transactions = transactionRes?.data?.transactions || [];

      // Check if user has at least one successful sent transaction
      const hasSuccessfulSentTransaction = transactions.some(
        (txn) => txn?.type === 'sent' && txn?.status === 'success',
      );

      // If no successful sent transaction
      if (!hasSuccessfulSentTransaction) {
        // Check if Transaction PIN is already created
        if (!sender?.transactionPinSet) {
          Alert.alert(
            'Transaction PIN Not Created',
            'Please set your Transaction PIN to continue.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Set PIN',
                onPress: () =>
                  navigation.navigate('TransactionPin', {
                    amount,
                    name: receiver?.name,
                    address,
                    sender,
                  }),
              },
            ],
          );
          return;
        }

        // Transaction PIN exists
        navigation.navigate('TransactionPin', {
          amount,
          name: receiver?.name,
          address,
          sender,
        });
        return;
      }

      // User has already made a successful sent transaction
      navigation.navigate('SendPin', {
        amount,
        name: receiver?.name,
        address,
        sender,
      });
    } catch (error) {
      console.log(
        'Handle confirm error:',
        error?.response?.data || error?.message,
      );

      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          
          {/* HEADER */}
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Icon name="x" size={moderateScale(20)} color={theme.colors.textMain} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Review Your Transfer Details</Text>

            <View style={styles.topProfileIcon}>
              <Image 
                source={require('../../../assets/images/Profile Icon.png')} 
                style={styles.profileImageSmall}
              />
            </View>
          </View>

          {/* AVATAR CENTER */}
          <View style={styles.avatarOuter}>
            <View style={styles.avatarInner}>
              <Image 
                source={require('../../../assets/images/Profile Icon.png')} 
                style={styles.profileImageLarge}
              />
            </View>
          </View>

          {/* TOTAL TOKENS */}
          <Text style={styles.totalTokensLabel}>Total Tokens</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amountValue}>
              {amount || '0.00'}
            </Text>
            <Text style={styles.payoText}>PAYO</Text>
          </View>

          {/* FROM SECTION */}
          <View style={styles.detailsSection}>
            <Text style={styles.detailLabel}>From</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailName} numberOfLines={1}>
                {sender?.name || 'User 1'}
              </Text>
              <Text style={styles.detailWallet} numberOfLines={1}>
                {sender?.wallet || 'PXY37488R'}
              </Text>
            </View>
            <View style={styles.divider} />
          </View>

          {/* TO SECTION */}
          <View style={styles.detailsSection}>
            <Text style={styles.detailLabel}>To</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailName} numberOfLines={1}>
                {receiver?.name || 'User 2'}
              </Text>
              <Text style={styles.detailWallet} numberOfLines={1}>
                {address || 'PXY21209E'}
              </Text>
            </View>
            <View style={styles.divider} />
          </View>

          {/* CONFIRM BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Confirm and send</Text>
            <Icon name="arrow-right" size={moderateScale(18)} color="#ffffff" style={styles.buttonIcon} />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, // Clean white background
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(40),
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
  },

  // --- Header ---
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },

  closeBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: theme.colors.bgSurface,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
    borderWidth: 1,
    borderColor: '#f3f4f6', // Slight border to define the circle
  },

  headerTitle: {
    fontSize: moderateScale(15),
    fontWeight: theme.typography.weight.semibold || '600',
    color: theme.colors.textMain,
  },

  topProfileIcon: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: theme.colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImageSmall: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
    tintColor: '#ffffff', // Ensures the icon is white
  },

  // --- Avatar ---
  avatarOuter: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    backgroundColor: '#f3f4f6', // Very light gray outer circle
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },

  avatarInner: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: theme.colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImageLarge: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
    tintColor: '#ffffff',
  },

  // --- Tokens / Amount ---
  totalTokensLabel: {
    textAlign: 'center',
    color: theme.colors.textMain,
    fontSize: moderateScale(15),
    fontWeight: theme.typography.weight.medium || '500',
    marginBottom: verticalScale(8),
  },

  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: verticalScale(40),
  },

  amountValue: {
    fontSize: moderateScale(34),
    fontWeight: theme.typography.weight.medium || '500',
    color: theme.colors.textMain,
  },

  payoText: {
    fontSize: moderateScale(14),
    color: theme.colors.statusSuccess || '#10b981', // Green text
    fontWeight: theme.typography.weight.semibold || '600',
    marginLeft: scale(8),
    marginBottom: verticalScale(4), // Aligns nicely with the baseline of the large number
  },

  // --- Details Section (From / To) ---
  detailsSection: {
    marginBottom: verticalScale(20),
  },

  detailLabel: {
    color: theme.colors.primaryBlue, // Small blue labels
    fontSize: moderateScale(11),
    fontWeight: theme.typography.weight.semibold || '600',
    marginBottom: verticalScale(8),
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailName: {
    fontSize: moderateScale(15),
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    flex: 1,
  },

  detailWallet: {
    fontSize: moderateScale(14),
    color: theme.colors.textMain,
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.textMuted || '#9ca3af',
    marginTop: verticalScale(12),
    opacity: 0.5, // Makes the line subtle like the design
  },

  // --- Button ---
  button: {
    backgroundColor: theme.colors.primaryIndigo || '#4f46e5', // Slightly purplish blue as per the figma button
    flexDirection: 'row',
    paddingVertical: verticalScale(16),
    borderRadius: theme.borderRadius.sm || 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(40),
  },

  buttonText: {
    color: '#ffffff',
    fontSize: moderateScale(15),
    fontWeight: theme.typography.weight.semibold || '600',
  },

  buttonIcon: {
    marginLeft: scale(12),
  },
});