


// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   ScrollView,
// //   ActivityIndicator,
// //   ToastAndroid,
// //   Platform,
// // } from 'react-native';

// // import LinearGradient from 'react-native-linear-gradient';
// // import Icon from 'react-native-vector-icons/Feather';
// // import api from '../../api/axios';
// // import styles from './WalletScreenStyles';
// // import Header from '../components/header';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import Clipboard from '@react-native-clipboard/clipboard';
// // import Share from 'react-native-share';
// // import RNFS from 'react-native-fs';

// // // 1. Import the AddMoneyModal
// // import AddMoneyModal from '../components/AddMoneyModal'; 

// // export default function WalletScreen({
// //   navigation,
// // }) {
// //   const [wallet, setWallet] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [qr, setQr] = useState(null);
// //   const [address, setAddress] = useState('');
  
// //   // 2. Add state to control modal visibility
// //   const [isModalVisible, setModalVisible] = useState(false);

// //   useEffect(() => {
// //     fetchWallet();
// //   }, []);

// //   const fetchWallet = async () => {
// //     try {
// //       const res = await api.get('/api/wallet/getwalletdashboard');
// //       setWallet(res?.data);
// //     } catch (error) {
// //       console.log(
// //         'Wallet API error:',
// //         error?.response || error.message,
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const progress =
// //     wallet?.dailyLimit > 0
// //       ? ((wallet?.dailyUsed || 0) / wallet?.dailyLimit) * 100
// //       : 0;

// //   const fetchQr = async () => {
// //     try {
// //       const res = await api.get('api/wallet/generate-address');
// //       const data = res.data;

// //       const qrImage = data.qr?.startsWith('data:image')
// //         ? data.qr
// //         : `data:image/png;base64,${data.qr}`;

// //       setQr(qrImage);
// //       setAddress(data.address);

// //       return {
// //         qrImage,
// //         address: data.address,
// //       };
// //     } catch (err) {
// //       console.log('QR ERROR:', err.message);
// //       return null;
// //     }
// //   };

// //   const handleCopy = () => {
// //     const walletAddress = wallet?.id;

// //     if (!walletAddress) return;

// //     Clipboard.setString(walletAddress);

// //     if (Platform.OS === 'android') {
// //       ToastAndroid.show('Address copied', ToastAndroid.SHORT);
// //     }
// //   };

// //   const handleShare = async () => {
// //     try {
// //       const result = await fetchQr();

// //       if (!result) return;

// //       const { qrImage, address } = result;

// //       const base64Data = qrImage.replace(
// //         /^data:image\/png;base64,/,
// //         '',
// //       );

// //       const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

// //       await RNFS.writeFile(filePath, base64Data, 'base64');

// //       await Share.open({
// //         url: 'file://' + filePath,
// //         message: `Send PAYO to this address:\n${address}`,
// //       });
// //     } catch (error) {
// //       console.log('Share error:', error);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <LinearGradient
// //         colors={['#ffffff', '#1C0033']}
// //         style={styles.loader}>
// //         <ActivityIndicator size="large" color="#fff" />
// //       </LinearGradient>
// //     );
// //   }

// //   return (
// //     <LinearGradient
// //       colors={['#7B2CFF', '#1C0033']}
// //       style={{ flex: 1 }}>
// //       <SafeAreaView style={{ flex: 1 }} edges={['top']}>
// //         <ScrollView
// //           showsVerticalScrollIndicator={false}
// //           keyboardShouldPersistTaps="handled"
// //           contentContainerStyle={styles.scrollContent}>
// //           <View style={styles.walletHeader}>
// //             <View style={styles.headerLeft}>
// //               <TouchableOpacity
// //                 style={styles.cancelContainer}
// //                 activeOpacity={0.8}
// //                 onPress={() => navigation.goBack()}>
// //                 <Icon name="chevron-left" size={28} color="#ffffff" />
// //               </TouchableOpacity>

// //               <View>
// //                 <Text style={styles.walletTitle}>My Wallet</Text>
// //                 <Text style={styles.walletId} numberOfLines={1}>
// //                   {wallet?.id}
// //                 </Text>
// //               </View>
// //             </View>

// //             <Header type="" />
// //           </View>

// //           <View style={styles.card}>
// //             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
// //               <Text style={[styles.active, { marginBottom: 0 }]}>
// //                 • Active Wallet
// //               </Text>
              
// //               <TouchableOpacity
// //                 activeOpacity={0.8}
// //                 style={{
// //                   backgroundColor: 'rgba(116, 255, 163, 0.15)',
// //                   paddingHorizontal: 12,
// //                   paddingVertical: 6,
// //                   borderRadius: 20,
// //                 }}
// //                 onPress={() => {
// //                   // 3. Open the modal when pressed
// //                   setModalVisible(true);
// //                 }}>
// //                 <Text style={{ color: '#74FFA3', fontSize: 13, fontWeight: '600' }}>
// //                   + Add Money
// //                 </Text>
// //               </TouchableOpacity>
// //             </View>

// //             <Text style={styles.label}>Total Balance</Text>

// //             <Text style={styles.balance}>
// //               {wallet?.balance?.toLocaleString()}
// //               <Text style={{ fontSize: 16, color: '#74FFA3' }}>
// //                 {' '}
// //                 PAYO
// //               </Text>
// //             </Text>

// //             <View style={styles.actions}>
// //               <TouchableOpacity
// //                 style={styles.btnWhite}
// //                 activeOpacity={0.8}
// //                 onPress={handleCopy}>
// //                 <Text>Copy Address</Text>
// //               </TouchableOpacity>

// //               <TouchableOpacity
// //                 style={styles.btnOutline}
// //                 activeOpacity={0.8}
// //                 onPress={handleShare}>
// //                 <Text style={{ color: '#fff' }}>Share QR</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>

// //           <View style={styles.rowBetween}>
// //             <Text style={styles.sectionTitle}>Token Holdings</Text>
// //           </View>

// //           <View style={styles.box}>
// //             <View style={styles.rowBetween}>
// //               <Text style={styles.boxTitle}>Referral Rewards</Text>

// //               <View style={{ alignItems: 'flex-end' }}>
// //                 <Text style={styles.amount}>
// //                   {wallet?.referralRewards || 0} PAYO
// //                 </Text>

// //                 <Text
// //                   style={[
// //                     styles.pending,
// //                     {
// //                       color:
// //                         wallet?.referralStatus === 'Unlocked'
// //                           ? '#22c55e'
// //                           : '#facc15',
// //                     },
// //                   ]}>
// //                   {wallet?.referralStatus}
// //                 </Text>
// //               </View>
// //             </View>

// //             {wallet?.referralStatus === 'Locked' ? (
// //               <Text style={styles.locked}>
// //                 • Unlocks in {wallet?.unlockInDays} days
// //               </Text>
// //             ) : (
// //               <Text style={[styles.locked, { color: '#22c55e' }]}>
// //                 • Rewards Available
// //               </Text>
// //             )}
// //           </View>

// //           <View style={styles.box}>
// //             <Text style={styles.boxTitle}>Daily Transaction Limit</Text>

// //             <View style={styles.rowBetween}>
// //               <Text style={styles.subText}>
// //                 Used {wallet?.dailyUsed || 0}
// //               </Text>

// //               <Text style={styles.subText}>
// //                 Limit: {wallet?.dailyLimit || 0}
// //               </Text>
// //             </View>

// //             <View style={styles.progressBg}>
// //               <View
// //                 style={[
// //                   styles.progressFill,
// //                   {
// //                     width: `${Math.min(progress, 100)}%`,
// //                   },
// //                 ]}
// //               />
// //             </View>
// //           </View>

// //           <View style={styles.bottomButtons}>
// //             <TouchableOpacity style={styles.freezeBtn} />

// //             <TouchableOpacity
// //               style={styles.sendBtn}
// //               activeOpacity={0.8}
// //               onPress={() => navigation.navigate('SendScreen')}>
// //               <Text style={styles.sendText}>Send PAYO</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </ScrollView>
// //       </SafeAreaView>

// //       {/* 4. Mount the Modal component at the root of the screen */}
// //       <AddMoneyModal 
// //         visible={isModalVisible}
// //         onClose={() => setModalVisible(false)}
// //         onPaymentSuccess={() => {
// //           // Re-fetch the wallet dashboard to update the balance automatically
// //           fetchWallet();
// //         }}
// //       />
// //     </LinearGradient>
// //   );
// // }








///////////////////////////////////////////////////////////

//new code (rajesh)


// import React, { useState, useEffect } from 'react';
// import {
//   View, Text, StyleSheet, TouchableOpacity, TextInput,
//   ScrollView, Image, Modal, Platform, ToastAndroid,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import { useDispatch, useSelector } from 'react-redux';

// import {
//   setAmount,
//   setPaymentMethod,
//   fetchConversionRates,
// } from '../../redux/features/depositSlice';

// import api from '../../api/axios';
// import { moderateScale } from '../../utils/responsive';
// import { theme } from '../../MainTheme/theme';

// import upiImg from '../../../assets/images/wallet/Payment Icon.png';
// import bankImg from '../../../assets/images/wallet/Payment Icon (1).png';
// import cardImg from '../../../assets/images/wallet/Payment Icon (2).png';
// import netBankingImg from '../../../assets/images/wallet/wallet.png';
// import wallet from '../../../assets/images/wallet/Wallet image 1.png';
// import cryptoImg from '../../../assets/images/wallet/cryptocurrency 1.png';

// export default function AddMoneytoWallet({ visible, onClose, navigation }) {
//   const dispatch = useDispatch();
//   const [localAmount, setLocalAmount] = useState('100');
//   const [walletData, setWalletData] = useState(null);
  
//   // New state to manage the crypto dropdown visibility
//   const [expandedMethod, setExpandedMethod] = useState(null);
  
//   const loading = useSelector((state) => state.deposit.loading);

//   useEffect(() => {
//     if (visible) fetchWalletBalance();
//   }, [visible]);

//   const fetchWalletBalance = async () => {
//     try {
//       const res = await api.get('/api/wallet/getwalletdashboard');
//       setWalletData(res?.data);
//     } catch (error) {
//       console.log('Error fetching wallet balance:', error?.response || error.message);
//     }
//   };

//   const presets = [
//     { label: '+ ₹ 100', value: '100' },
//     { label: '+ ₹ 1,000', value: '1,000' },
//     { label: '+ ₹ 2,500', value: '2,500' },
//     { label: '+ ₹ 5,500', value: '5,500' },
//   ];

//   const paymentMethods = [
//     {
//       id: 'upi',
//       title: 'UPI',
//       subtitle: 'Pay using any UPI app',
//       tag: '1-2 HOURS',
//       tagBg: '#E8EAF6',
//       tagColor: '#283593',
//       imageSource: upiImg,
//     },
//     {
//       id: 'bank_transfer',
//       title: 'Bank Transfer',
//       subtitle: 'IMPS, NEFT, RTGS',
//       tag: '1-2 HOURS',
//       tagBg: '#E8EAF6',
//       tagColor: '#283593',
//       imageSource: bankImg,
//     },
//     {
//       id: 'card',
//       title: 'Debit/Credit Card',
//       subtitle: 'Visa, Mastercard, RuPay',
//       tag: 'COMING SOON',
//       tagBg: '#E8F5E9',
//       tagColor: '#2E7D32',
//       imageSource: cardImg,
//     },
//     {
//       id: 'net_banking',
//       title: 'Net Banking',
//       subtitle: 'All major Indian banks',
//       tag: 'COMING SOON',
//       tagBg: '#E8F5E9',
//       tagColor: '#2E7D32',
//       imageSource: netBankingImg,
//     },
//     {
//       id: 'crypto',
//       title: 'Crypto Transfer',
//       subtitle: 'USDT',
//       tag: 'COMING SOON',
//       tagBg: '#E8EAF6',
//       tagColor: '#2E7D32',
//       imageSource: cryptoImg,
//     },
//   ];

//   const parseValueToString = (val) => {
//     const clean = val.replace(/[^0-9]/g, '');
//     return clean ? parseInt(clean, 10).toLocaleString('en-IN') : '';
//   };

//   const handlePaymentSelect = (method) => {
//     const numericalAmount = parseFloat(localAmount.replace(/[^0-9]/g, ''));

//     if (!numericalAmount || numericalAmount <= 0) {
//       if (Platform.OS === 'android') {
//         ToastAndroid.show('Please enter a valid amount', ToastAndroid.SHORT);
//       }
//       return;
//     }

//     // 1. Save to Redux (sync – instant)
//     dispatch(setAmount(numericalAmount));
//     dispatch(setPaymentMethod({
//       id: method.id,
//       title: method.title,
//       imageSource: method.imageSource,
//       tag: method.tag,
//     }));

//     // 2. Start the fetch – but DON'T await it
//     dispatch(fetchConversionRates({
//       amount: numericalAmount,
//       paymentMethod: method.id,
//     }));

//     // 3. ✅ NAVIGATE IMMEDIATELY – no delay!
//     navigation.navigate('ConfirmDeposite');
//   };

//   // Handler for row clicks
//   const handleRowPress = (method) => {
//     if (method.id === 'crypto') {
//       // Toggle dropdown for crypto
//       setExpandedMethod(expandedMethod === 'crypto' ? null : 'crypto');
//     } else {
//       handlePaymentSelect(method);
//     }
//   };

//   return (
//       <SafeAreaView style={styles.container}>
//         {/* Header – back button now calls onClose */}
//         <View style={styles.header}>
//           <TouchableOpacity  onPress={() => navigation.goBack()} style={styles.backButton}>
//             <FeatherIcon name="chevron-left" size={moderateScale(26)} color={theme.colors.primaryBlue} />
//           </TouchableOpacity>
//           <View style={styles.headerTitleContainer}>
//             <Text style={styles.headerTitle}>Add Money to Wallet</Text>
//             <Text style={styles.headerSubtitle}>Choose a payment method to add funds</Text>
//           </View>
//           <TouchableOpacity style={styles.helpButton}>
//             <FeatherIcon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue} />
//           </TouchableOpacity>
//         </View>

//         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
//           {/* Balance Card */}
//           <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.balanceCard}>
//             <View style={styles.balanceCardLeft}>
//               <View style={styles.balanceRow}>
//                 <Text style={styles.balanceLabel}>Total Wallet Balance</Text>
//                 <FeatherIcon name="eye" size={moderateScale(16)} color="#E0E7FF" style={{ marginLeft: moderateScale(6) }} />
//               </View>
//               <Text style={styles.cryptoBalance}>
//                 {walletData?.balance?.toLocaleString() || '0'}{' '}
//                 <Text style={styles.tokenTicker}>PAYO</Text>
//               </Text>
//               <Text style={styles.fiatBalance}>
//                 ≈ ₹{(walletData?.balance * 0).toLocaleString() || '0'}
//               </Text>
//             </View>
//             <View style={styles.walletIconContainer}>
//               <Image source={wallet} style={styles.walletHeaderImage} resizeMode="contain" />
//             </View>
//           </LinearGradient>

//           {/* Amount Input */}
//           <Text style={styles.sectionLabel}>ENTER AMOUNT</Text>
//           <View style={styles.amountInputContainer}>
//             <Text style={styles.currencySymbol}>₹</Text>
//             <TextInput
//               style={styles.amountInput}
//               value={localAmount}
//               onChangeText={(text) => setLocalAmount(parseValueToString(text))}
//               keyboardType="number-pad"
//             />
//             <View style={styles.currencySelector}>
//               <Text style={styles.currencySelectorText}>INR</Text>
//               <Icon name="keyboard-arrow-down" size={moderateScale(18)} color="#4A5568" />
//             </View>
//           </View>

//           {/* Presets */}
//           <View style={styles.presetsRow}>
//             {presets.map((item, index) => {
//               const formattedPresetValue = parseInt(item.value.replace(/[^0-9]/g, ''), 10).toLocaleString('en-IN');
//               const isSelected = localAmount === formattedPresetValue;
//               return (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => setLocalAmount(formattedPresetValue)}
//                   style={[styles.presetChip, isSelected && styles.presetChipActive]}
//                 >
//                   <Text style={[styles.presetChipText, isSelected && styles.presetChipTextActive]}>
//                     {item.label}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>

//           {/* Payment Methods */}
//           <Text style={styles.sectionLabel}>SELECT PAYMENT METHOD</Text>
//           <View style={styles.methodsWrapperCard}>
//             {paymentMethods.map((method, idx) => {
//               const isUnclickable = method.id === 'card' || method.id === 'net_banking';
//               const isLastItem = idx === paymentMethods.length - 1;
//               const isCryptoExpanded = expandedMethod === 'crypto' && method.id === 'crypto';

//               return (
//                 <View key={method.id}>
//                   <TouchableOpacity
//                     onPress={() => handleRowPress(method)}
//                     activeOpacity={0.7}
//                     style={[
//                       styles.methodRow, 
//                       // Add border if it's not the last item OR if crypto is expanded (adds top border to dropdown)
//                       (!isLastItem || isCryptoExpanded) && styles.methodBorder,
//                       isUnclickable && { opacity: 1 } // Visual cue that it is disabled
//                     ]}
//                     disabled={loading || isUnclickable} // Enforcing unclickable state
//                   >
//                     <View style={styles.methodIconWrapper}>
//                       <Image source={method.imageSource} style={styles.methodImage} resizeMode="contain" />
//                     </View>
//                     <View style={styles.methodMeta}>
//                       <Text style={styles.methodTitle}>{method.title}</Text>
//                       <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
//                     </View>
//                     <View style={styles.methodRight}>
//                       <View style={[styles.tagBadge, { backgroundColor: method.tagBg }]}>
//                         <Text style={[styles.tagBadgeText, { color: method.tagColor }]}>{method.tag}</Text>
//                       </View>
//                       <FeatherIcon 
//                         name={isCryptoExpanded ? "chevron-down" : "chevron-right"} 
//                         size={moderateScale(20)} 
//                         color="#9CA3AF" 
//                       />
//                     </View>
//                   </TouchableOpacity>

//                   {/* Dropdown Options for Crypto */}
//                   {isCryptoExpanded && (
//                     <View style={styles.dropdownContainer}>
//                       <TouchableOpacity
//                         style={[styles.dropdownItem, styles.methodBorder]} // Using standard border line here
//                         onPress={() => handlePaymentSelect({ ...method, id: 'crypto_erc20', subtitle: 'USDT (ERC20)' })}
//                         disabled={true} // Makes it unclickable
//                         activeOpacity={1} // Prevents click visual feedback
//                       >
//                         <Text style={styles.dropdownText}>ERC20</Text>
//                         <FeatherIcon name="chevron-right" size={moderateScale(16)} color="#9CA3AF" />
//                       </TouchableOpacity>
                      
//                       <TouchableOpacity
//                         style={styles.dropdownItem}
//                         onPress={() => handlePaymentSelect({ ...method, id: 'crypto_trc20', subtitle: 'USDT (TRC20)' })}
//                         disabled={true} // Makes it unclickable
//                         activeOpacity={1} // Prevents click visual feedback
//                       >
//                         <Text style={styles.dropdownText}>TRC20</Text>
//                         <FeatherIcon name="chevron-right" size={moderateScale(16)} color="#9CA3AF" />
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 </View>
//               );
//             })}
//           </View>

//           {/* Security Banner & Promo Card */}
//           <View style={styles.securityBanner}>
//             <View style={styles.shieldIconContainer}>
//               <Image source={require('../../../assets/images/wallet/Security Icon.png')} />
//             </View>
//             <View style={styles.securityMeta}>
//               <Text style={styles.securityTitle}>100% Secure & Encrypted</Text>
//               <Text style={styles.securitySubtitle}>Your money is safe with bank-grade security and encryption.</Text>
//             </View>
//             <View style={styles.checkIconContainer}>
//               <Image source={require('../../../assets/images/wallet/Shield Security Icon.png')} />
//             </View>
//           </View>

//           <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.promoCard}>
//             <View style={styles.promoLeft}>
//               <View style={styles.coinStackGraphic}>
//                 <Image source={require('../../../assets/images/wallet/Promo Icon.png')} />
//               </View>
//               <View style={styles.promoTexts}>
//                 <Text style={styles.promoTitle}>Have a promo code?</Text>
//                 <Text style={styles.promoSubtitle}>Apply code and get exciting rewards</Text>
//               </View>
//             </View>
//             <TouchableOpacity style={styles.applyActionBtn}>
//               <Text style={styles.applyActionText}>Apply Now</Text>
//               <FeatherIcon name="chevron-right" size={moderateScale(14)} color="#FFF" style={{ marginLeft: moderateScale(2) }} />
//             </TouchableOpacity>
//           </LinearGradient>
//         </ScrollView>
//       </SafeAreaView>
//   );
// }

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import {
  setAmount,
  setPaymentMethod,
  fetchConversionRates,
  setWalletData,
} from '../../redux/features/depositSlice';

import api from '../../api/axios';
import { moderateScale } from '../../utils/responsive';
import { theme } from '../../MainTheme/theme';
import { PAYO_EXCHANGE_RATE } from '../../api/mainValuables';
 // Ensure your styles import matches your file structure

import upiImg from '../../../assets/images/wallet/Payment Icon.png';
import bankImg from '../../../assets/images/wallet/Payment Icon (1).png';
import cardImg from '../../../assets/images/wallet/Payment Icon (2).png';
import netBankingImg from '../../../assets/images/wallet/wallet.png';
import wallet from '../../../assets/images/wallet/Wallet image 1.png';
import cryptoImg from '../../../assets/images/wallet/cryptocurrency 1.png';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function AddMoneytoWallet({ visible, onClose, navigation }) {
  const dispatch = useAppDispatch();
  const [localAmount, setLocalAmount] = useState('100');
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [expandedMethod, setExpandedMethod] = useState(null);

  const loading = useSelector((state) => state.deposit.loading);
  const walletData = useAppSelector((state) => state.deposit.walletData);

  // Fetch balance dynamically if redux state isn't populated
  const fetchWalletBalance = async () => {
    try {
      const res = await api.get('/api/wallet/wallet-details');
      if (res?.data?.success && res?.data?.data?.[0]) {
        dispatch(setWalletData(res.data.data[0]));
      }
    } catch (error) {
      console.log('Error fetching wallet balance:', error?.message);
    }
  };

  useEffect(() => {
    // if (!walletData?.Available_Balance) {
      fetchWalletBalance();
    // }
  }, []);

  // Compute live balance calculations from walletData
  const inrBalance = parseFloat(walletData?.Available_Balance || 0);
  const exchangeRate = PAYO_EXCHANGE_RATE || 0.00012;
  const payoBalance = (inrBalance * exchangeRate).toFixed(2);

  const presets = [
    { label: '+ ₹ 100', value: '100' },
    { label: '+ ₹ 1,000', value: '1,000' },
    { label: '+ ₹ 2,500', value: '2,500' },
    { label: '+ ₹ 5,500', value: '5,500' },
  ];

  const paymentMethods = [
    {
      id: 'upi',
      title: 'UPI',
      subtitle: 'Pay using any UPI app',
      tag: '1-2 HOURS',
      tagBg: '#E8EAF6',
      tagColor: '#283593',
      imageSource: upiImg,
    },
    {
      id: 'bank_transfer',
      title: 'Bank Transfer',
      subtitle: 'IMPS, NEFT, RTGS',
      tag: '1-2 HOURS',
      tagBg: '#E8EAF6',
      tagColor: '#283593',
      imageSource: bankImg,
    },
    {
      id: 'card',
      title: 'Debit/Credit Card',
      subtitle: 'Visa, Mastercard, RuPay',
      tag: 'COMING SOON',
      tagBg: '#E8F5E9',
      tagColor: '#2E7D32',
      imageSource: cardImg,
    },
    {
      id: 'net_banking',
      title: 'Net Banking',
      subtitle: 'All major Indian banks',
      tag: 'COMING SOON',
      tagBg: '#E8F5E9',
      tagColor: '#2E7D32',
      imageSource: netBankingImg,
    },
    {
      id: 'crypto',
      title: 'Crypto Transfer',
      subtitle: 'USDT',
      tag: 'COMING SOON',
      tagBg: '#E8EAF6',
      tagColor: '#2E7D32',
      imageSource: cryptoImg,
    },
  ];

  const parseValueToString = (val) => {
    const clean = val.replace(/[^0-9]/g, '');
    return clean ? parseInt(clean, 10).toLocaleString('en-IN') : '';
  };

  const handlePaymentSelect = (method) => {
    const numericalAmount = parseFloat(localAmount.replace(/[^0-9]/g, ''));

    if (!numericalAmount || numericalAmount <= 0) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please enter a valid amount', ToastAndroid.SHORT);
      }
      return;
    }

    dispatch(setAmount(numericalAmount));
    dispatch(
      setPaymentMethod({
        id: method.id,
        title: method.title,
        imageSource: method.imageSource,
        tag: method.tag,
      })
    );

    dispatch(
      fetchConversionRates({
        amount: numericalAmount,
        paymentMethod: method.id,
      })
    );

    navigation.navigate('ConfirmDeposite');
  };

  const handleRowPress = (method) => {
    if (method.id === 'crypto') {
      setExpandedMethod(expandedMethod === 'crypto' ? null : 'crypto');
    } else {
      handlePaymentSelect(method);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FeatherIcon name="chevron-left" size={moderateScale(26)} color={theme.colors.primaryBlue} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Add Money to Wallet</Text>
          <Text style={styles.headerSubtitle}>Choose a payment method to add funds</Text>
        </View>
        <TouchableOpacity style={styles.helpButton}>
          <FeatherIcon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Dynamic Balance Card */}
        <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.balanceCard}>
          <View style={styles.balanceCardLeft}>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceLabel}>Total Wallet Balance</Text>
              <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
                <FeatherIcon
                  name={balanceVisible ? 'eye-off' : 'eye'}
                  size={moderateScale(16)}
                  color="#E0E7FF"
                  style={{ marginLeft: moderateScale(16) }}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.cryptoBalance}>
              {balanceVisible ? payoBalance : '****'}{' '}
              <Text style={styles.tokenTicker}>PAYO</Text>
            </Text>

            <Text style={styles.fiatBalance}>
              {balanceVisible ? `₹ ${inrBalance.toLocaleString('en-IN')}` : '****'}
            </Text>
          </View>
          <View style={styles.walletIconContainer}>
            <Image source={wallet} style={styles.walletHeaderImage} resizeMode="contain" />
          </View>
        </LinearGradient>

        {/* Amount Input */}
        <Text style={styles.sectionLabel}>ENTER AMOUNT</Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.amountInput}
            value={localAmount}
            onChangeText={(text) => setLocalAmount(parseValueToString(text))}
            keyboardType="number-pad"
          />
          <View style={styles.currencySelector}>
            <Text style={styles.currencySelectorText}>INR</Text>
            <Icon name="keyboard-arrow-down" size={moderateScale(18)} color="#4A5568" />
          </View>
        </View>

        {/* Presets */}
        <View style={styles.presetsRow}>
          {presets.map((item, index) => {
            const formattedPresetValue = parseInt(item.value.replace(/[^0-9]/g, ''), 10).toLocaleString('en-IN');
            const isSelected = localAmount === formattedPresetValue;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setLocalAmount(formattedPresetValue)}
                style={[styles.presetChip, isSelected && styles.presetChipActive]}
              >
                <Text style={[styles.presetChipText, isSelected && styles.presetChipTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionLabel}>SELECT PAYMENT METHOD</Text>
        <View style={styles.methodsWrapperCard}>
          {paymentMethods.map((method, idx) => {
            const isUnclickable = method.id === 'card' || method.id === 'net_banking';
            const isLastItem = idx === paymentMethods.length - 1;
            const isCryptoExpanded = expandedMethod === 'crypto' && method.id === 'crypto';

            return (
              <View key={method.id}>
                <TouchableOpacity
                  onPress={() => handleRowPress(method)}
                  activeOpacity={0.7}
                  style={[
                    styles.methodRow,
                    (!isLastItem || isCryptoExpanded) && styles.methodBorder,
                    isUnclickable && { opacity: 1 },
                  ]}
                  disabled={loading || isUnclickable}
                >
                  <View style={styles.methodIconWrapper}>
                    <Image source={method.imageSource} style={styles.methodImage} resizeMode="contain" />
                  </View>
                  <View style={styles.methodMeta}>
                    <Text style={styles.methodTitle}>{method.title}</Text>
                    <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
                  </View>
                  <View style={styles.methodRight}>
                    <View style={[styles.tagBadge, { backgroundColor: method.tagBg }]}>
                      <Text style={[styles.tagBadgeText, { color: method.tagColor }]}>{method.tag}</Text>
                    </View>
                    <FeatherIcon
                      name={isCryptoExpanded ? 'chevron-down' : 'chevron-right'}
                      size={moderateScale(20)}
                      color="#9CA3AF"
                    />
                  </View>
                </TouchableOpacity>

                {/* Dropdown Options for Crypto */}
                {isCryptoExpanded && (
                  <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                      style={[styles.dropdownItem, styles.methodBorder]}
                      onPress={() =>
                        handlePaymentSelect({ ...method, id: 'crypto_erc20', subtitle: 'USDT (ERC20)' })
                      }
                      disabled={true}
                      activeOpacity={1}
                    >
                      <Text style={styles.dropdownText}>ERC20</Text>
                      <FeatherIcon name="chevron-right" size={moderateScale(16)} color="#9CA3AF" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() =>
                        handlePaymentSelect({ ...method, id: 'crypto_trc20', subtitle: 'USDT (TRC20)' })
                      }
                      disabled={true}
                      activeOpacity={1}
                    >
                      <Text style={styles.dropdownText}>TRC20</Text>
                      <FeatherIcon name="chevron-right" size={moderateScale(16)} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Security Banner & Promo Card */}
        <View style={styles.securityBanner}>
          <View style={styles.shieldIconContainer}>
            <Image source={require('../../../assets/images/wallet/Security Icon.png')} />
          </View>
          <View style={styles.securityMeta}>
            <Text style={styles.securityTitle}>100% Secure & Encrypted</Text>
            <Text style={styles.securitySubtitle}>Your money is safe with bank-grade security and encryption.</Text>
          </View>
          <View style={styles.checkIconContainer}>
            <Image source={require('../../../assets/images/wallet/Shield Security Icon.png')} />
          </View>
        </View>

        <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.promoCard}>
          <View style={styles.promoLeft}>
            <View style={styles.coinStackGraphic}>
              <Image source={require('../../../assets/images/wallet/Promo Icon.png')} />
            </View>
            <View style={styles.promoTexts}>
              <Text style={styles.promoTitle}>Have a promo code?</Text>
              <Text style={styles.promoSubtitle}>Apply code and get exciting rewards</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.applyActionBtn}>
            <Text style={styles.applyActionText}>Apply Now</Text>
            <FeatherIcon name="chevron-right" size={moderateScale(14)} color="#FFF" style={{ marginLeft: moderateScale(2) }} />
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ffff'
   },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(14),
    backgroundColor: 'transparent',
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: moderateScale(11),
    color: '#6B7280',
    marginTop: moderateScale(2),
    textAlign: 'center',
  },
  helpButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollBody: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(30),
  },
  balanceCard: {
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  balanceCardLeft: { flex: 1 },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(4),
  },
  balanceLabel: {
    color: '#E0E7FF',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
  cryptoBalance: {
    color: '#FFF',
    fontSize: moderateScale(26),
    fontWeight: '700',
  },
  tokenTicker: {
   fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.semibold,
    color: '#fff',
  },
  fiatBalance: {
   color: '#d1d5db',
    fontSize: moderateScale(13),
    marginTop: moderateScale(2),
  },
  walletIconContainer: {
    width: moderateScale(60),
    height: moderateScale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletHeaderImage: {
    width: '100%',
    height: '100%',
  },
  sectionLabel: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.5,
    marginTop: moderateScale(12),
    marginBottom: moderateScale(6),
    paddingHorizontal: moderateScale(4),
  },
  amountInputContainer: {
    backgroundColor: '#FFF',
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(10),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  currencySymbol: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#1F2937',
    marginRight: moderateScale(8),
  },
  amountInput: {
    flex: 1,
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#1F2937',
    paddingVertical: moderateScale(4),
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(6),
  },
  currencySelectorText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#4A5568',
    marginRight: moderateScale(4),
  },
  presetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(8),
  },
  presetChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(10),
    marginBottom: moderateScale(8),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  presetChipActive: {
    backgroundColor: '#6366F1',
    borderColor: '#4F46E5',
  },
  presetChipText: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    color: '#4B5563',
  },
  presetChipTextActive: {
    color: '#FFF',
  },
  methodsWrapperCard: {
    backgroundColor: '#F2F4F4',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(6),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: moderateScale(16),
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(10),
  },
  methodBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  methodIconWrapper: {
    width: moderateScale(44),
    height: moderateScale(44),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  methodImage: {
    width: moderateScale(32),
    height: moderateScale(32),
  },
  methodMeta: { flex: 1 },
  methodTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#1F2937',
  },
  methodSubtitle: {
    fontSize: moderateScale(12),
    color: '#6B7280',
    marginTop: moderateScale(2),
  },
  methodRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagBadge: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(12),
    marginRight: moderateScale(8),
  },
  tagBadgeText: {
    fontSize: moderateScale(10),
    fontWeight: '700',
  },
  // --- Updated Dropdown Styles ---
  dropdownContainer: {
    backgroundColor: 'transparent', // Removed bounding box styling
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(14),
    paddingRight: moderateScale(10), 
    paddingLeft: moderateScale(20), // Aligns perfectly with the text above it (10px padding + 44px icon + 12px margin)
  },
  dropdownText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#374151',
  },
  // ---------------------------
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: moderateScale(16),
  },
  shieldIconContainer: {
    marginRight: moderateScale(12),
  },
  securityMeta: { flex: 1 },
  securityTitle: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#1E3A8A',
  },
  securitySubtitle: {
    fontSize: moderateScale(11),
    color: '#3B82F6',
    marginTop: moderateScale(1),
  },
  checkIconContainer: {
    marginLeft: moderateScale(8),
  },
  promoCard: {
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinStackGraphic: {
    marginRight: moderateScale(12),
  },
  promoTexts: {
    flex: 1,
  },
  promoTitle: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#FFF',
  },
  promoSubtitle: {
    fontSize: moderateScale(11),
    color: '#BFDBFE',
    marginTop: moderateScale(2),
  },
  applyActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF33',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(20),
  },
  applyActionText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#FFF',
  },
});

////////////////////////////////////////////////////////////////////////////



// screens/WalletScreen.js

// import React, { useState, useEffect } from 'react';
// import {
//   View, Text, StyleSheet, TouchableOpacity, TextInput,
//   ScrollView, Image, Modal, Platform, ToastAndroid,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import { useDispatch, useSelector } from 'react-redux';


// import {
//   setAmount,
//   setPaymentMethod,
//   fetchConversionRates,
// } from '../../redux/features/depositSlice';

// import api from '../../api/axios';
// import { moderateScale } from '../../utils/responsive';

// import upiImg from '../../../assets/images/wallet/Payment Icon.png';
// import bankImg from '../../../assets/images/wallet/Payment Icon (1).png';
// import cardImg from '../../../assets/images/wallet/Payment Icon (2).png';
// import netBankingImg from '../../../assets/images/wallet/wallet.png';
// import wallet from '../../../assets/images/wallet/Wallet image 1.png';
// import cryptoImg from '../../../assets/images/wallet/cryptocurrency 1.png';



// export default function AddMoneytoWallet({ visible, onClose, navigation }) {
//   const dispatch = useDispatch();
//   const [localAmount, setLocalAmount] = useState('100');
//   const [walletData, setWalletData] = useState(null);
//   const loading = useSelector((state) => state.deposit.loading);

//   useEffect(() => {
//     if (visible) fetchWalletBalance();
//   }, [visible]);

//   const fetchWalletBalance = async () => {
//     try {
//       const res = await api.get('/api/wallet/getwalletdashboard');
//       setWalletData(res?.data);
//     } catch (error) {
//       console.log('Error fetching wallet balance:', error?.response || error.message);
//     }


//     /////////////////////////////////



//   };


//   //   const fetchCountries = async () => {
//   //   try {
//   //     const response = await api.get('https://purr-expediter-doorway.ngrok-free.dev/api/countries'); // assuming baseURL is already set
//   //     console.log('Countries response:', response.data);
//   //   } catch (error) {
//   //     console.error('Error fetching countries:', error.response?.data || error.message);
//   //   }
//   // };

//   // fetchCountries()
  

//   const presets = [
//     { label: '+ ₹ 100', value: '100' },
//     { label: '+ ₹ 1,000', value: '1,000' },
//     { label: '+ ₹ 2,500', value: '2,500' },
//     { label: '+ ₹ 5,500', value: '5,500' },
//   ];

//   const paymentMethods = [
//     {
//       id: 'upi',
//       title: 'UPI',
//       subtitle: 'Pay using any UPI app',
//       tag: '1-2 HOURS',
//       tagBg: '#E8EAF6',
//       tagColor: '#283593',
//       imageSource: upiImg,
//     },
//     {
//       id: 'bank_transfer',
//       title: 'Bank Transfer',
//       subtitle: 'IMPS, NEFT, RTGS',
//       tag: '1-2 HOURS',
//       tagBg: '#E8EAF6',
//       tagColor: '#283593',
//       imageSource: bankImg,
//     },
//     {
//       id: 'card',
//       title: 'Debit/Credit Card',
//       subtitle: 'Visa, Mastercard, RuPay',
//       tag: 'COMING SOON',
//       tagBg: '#E8F5E9',
//       tagColor: '#2E7D32',
//       imageSource: cardImg,
//     },
//     {
//       id: 'net_banking',
//       title: 'Net Banking',
//       subtitle: 'All major Indian banks',
//       tag: 'COMING SOON',
//       tagBg: '#E8F5E9',
//       tagColor: '#2E7D32',
//       imageSource: netBankingImg,
//     },
//     {
//       id: 'crypto',
//       title: 'Crypto Transfer',
//       subtitle: 'USDT',
//       tag: '1-2 HOURS',
//       tagBg: '#E8EAF6',
//       tagColor: '#283593',
//       imageSource: cryptoImg,
//     },
//   ];

//   const parseValueToString = (val) => {
//     const clean = val.replace(/[^0-9]/g, '');
//     return clean ? parseInt(clean, 10).toLocaleString('en-IN') : '';
//   };

//   // const handlePaymentSelect = async (method) => {
//   //   const numericalAmount = parseFloat(localAmount.replace(/[^0-9]/g, ''));

//   //   if (!numericalAmount || numericalAmount <= 0) {
//   //     if (Platform.OS === 'android') {
//   //       ToastAndroid.show('Please enter a valid amount', ToastAndroid.SHORT);
//   //     }
//   //     return;
//   //   }

//   //   // Save amount & method
//   //   dispatch(setAmount(numericalAmount));
//   //   dispatch(setPaymentMethod({
//   //     id: method.id,
//   //     title: method.title,
//   //     imageSource: method.imageSource,
//   //     tag: method.tag,
//   //   }));

//   //   // Fetch rates & navigate
//   //   try {
//   //     console.log('🔵 Dispatching fetchConversionRates...');
//   //     const resultAction = await dispatch(fetchConversionRates({
//   //       amount: numericalAmount,
//   //       paymentMethod: method.id,
//   //     }));
//   //     console.log('🔵 Result action:', resultAction);

//   //     // Safely unwrap if available
//   //     if (resultAction && typeof resultAction.unwrap === 'function') {
//   //       await resultAction.unwrap();
//   //       console.log('✅ Unwrap succeeded');
//   //     } else {
//   //       console.warn('⚠️ unwrap not available, assuming success');
//   //     }

//   //     // Validate navigation before using it
//   //     if (!navigation || typeof navigation.navigate !== 'function') {
//   //       console.error('❌ Navigation prop is missing or invalid', navigation);
//   //       if (Platform.OS === 'android') {
//   //         ToastAndroid.show('Navigation error – please try again', ToastAndroid.SHORT);
//   //       }
//   //       return;
//   //     }

//   //     console.log('✅ Navigating to ConfirmDeposite');
//   //     navigation.navigate('ConfirmDeposite');
//   //   } catch (error) {
//   //     console.log('❌ Error in handlePaymentSelect:', error);
//   //     const message = typeof error === 'string' ? error : error.message;
//   //     if (Platform.OS === 'android') {
//   //       ToastAndroid.show(message || 'Failed to get rates', ToastAndroid.SHORT);
//   //     }
//   //   }
//   // };
// const handlePaymentSelect = (method) => {
//   const numericalAmount = parseFloat(localAmount.replace(/[^0-9]/g, ''));

//   if (!numericalAmount || numericalAmount <= 0) {
//     if (Platform.OS === 'android') {
//       ToastAndroid.show('Please enter a valid amount', ToastAndroid.SHORT);
//     }
//     return;
//   }

//   // 1. Save to Redux (sync – instant)
//   dispatch(setAmount(numericalAmount));
//   dispatch(setPaymentMethod({
//     id: method.id,
//     title: method.title,
//     imageSource: method.imageSource,
//     tag: method.tag,
//   }));

//   // 2. Start the fetch – but DON'T await it
//   dispatch(fetchConversionRates({
//     amount: numericalAmount,
//     paymentMethod: method.id,
//   }));

//   // 3. ✅ NAVIGATE IMMEDIATELY – no delay!
//   navigation.navigate('ConfirmDeposite');
// };


//   return (
//     // <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
//       <SafeAreaView style={styles.container}>
//         {/* Header – back button now calls onClose */}
//         <View style={styles.header}>
//           <TouchableOpacity  onPress={() => navigation.goBack()} style={styles.backButton}>
//             <FeatherIcon name="chevron-left" size={moderateScale(26)} color="#4a8cff" />
//           </TouchableOpacity>
//           <View style={styles.headerTitleContainer}>
//             <Text style={styles.headerTitle}>Add Money to Wallet</Text>
//             <Text style={styles.headerSubtitle}>Choose a payment method to add funds</Text>
//           </View>
//           <TouchableOpacity style={styles.helpButton}>
//             <FeatherIcon name="help-circle" size={moderateScale(22)} color="#3B82F6" />
//           </TouchableOpacity>
//         </View>

//         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
//           {/* Balance Card */}
//           <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.balanceCard}>
//             <View style={styles.balanceCardLeft}>
//               <View style={styles.balanceRow}>
//                 <Text style={styles.balanceLabel}>Total Wallet Balance</Text>
//                 <FeatherIcon name="eye" size={moderateScale(16)} color="#E0E7FF" style={{ marginLeft: moderateScale(6) }} />
//               </View>
//               <Text style={styles.cryptoBalance}>
//                 {walletData?.balance?.toLocaleString() || '0'}{' '}
//                 <Text style={styles.tokenTicker}>PAYO</Text>
//               </Text>
//               <Text style={styles.fiatBalance}>
//                 ≈ ₹{(walletData?.balance * 0).toLocaleString() || '0'}
//               </Text>
//             </View>
//             <View style={styles.walletIconContainer}>
//               <Image source={wallet} style={styles.walletHeaderImage} resizeMode="contain" />
//             </View>
//           </LinearGradient>

//           {/* Amount Input */}
//           <Text style={styles.sectionLabel}>ENTER AMOUNT</Text>
//           <View style={styles.amountInputContainer}>
//             <Text style={styles.currencySymbol}>₹</Text>
//             <TextInput
//               style={styles.amountInput}
//               value={localAmount}
//               onChangeText={(text) => setLocalAmount(parseValueToString(text))}
//               keyboardType="number-pad"
//             />
//             <View style={styles.currencySelector}>
//               <Text style={styles.currencySelectorText}>INR</Text>
//               <Icon name="keyboard-arrow-down" size={moderateScale(18)} color="#4A5568" />
//             </View>
//           </View>

//           {/* Presets */}
//           <View style={styles.presetsRow}>
//             {presets.map((item, index) => {
//               const formattedPresetValue = parseInt(item.value.replace(/[^0-9]/g, ''), 10).toLocaleString('en-IN');
//               const isSelected = localAmount === formattedPresetValue;
//               return (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => setLocalAmount(formattedPresetValue)}
//                   style={[styles.presetChip, isSelected && styles.presetChipActive]}
//                 >
//                   <Text style={[styles.presetChipText, isSelected && styles.presetChipTextActive]}>
//                     {item.label}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>

//           {/* Payment Methods */}
//           <Text style={styles.sectionLabel}>SELECT PAYMENT METHOD</Text>
//           <View style={styles.methodsWrapperCard}>
//             {paymentMethods.map((method, idx) => (
//               <TouchableOpacity
//                 key={method.id}
//                 onPress={() => handlePaymentSelect(method)}
                
//                 activeOpacity={0.7}
//                 style={[styles.methodRow, idx !== paymentMethods.length - 1 && styles.methodBorder]}
//                 disabled={loading}
//               >
//                 <View style={styles.methodIconWrapper}>
//                   <Image source={method.imageSource} style={styles.methodImage} resizeMode="contain" />
//                 </View>
//                 <View style={styles.methodMeta}>
//                   <Text style={styles.methodTitle}>{method.title}</Text>
//                   <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
//                 </View>
//                 <View style={styles.methodRight}>
//                   <View style={[styles.tagBadge, { backgroundColor: method.tagBg }]}>
//                     <Text style={[styles.tagBadgeText, { color: method.tagColor }]}>{method.tag}</Text>
//                   </View>
//                   <FeatherIcon name="chevron-right" size={moderateScale(20)} color="#9CA3AF" />
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>

//           {/* Security Banner & Promo Card – unchanged */}
//           <View style={styles.securityBanner}>
//             <View style={styles.shieldIconContainer}>
//               <Image source={require('../../../assets/images/wallet/Security Icon.png')} />
//             </View>
//             <View style={styles.securityMeta}>
//               <Text style={styles.securityTitle}>100% Secure & Encrypted</Text>
//               <Text style={styles.securitySubtitle}>Your money is safe with bank-grade security and encryption.</Text>
//             </View>
//             <View style={styles.checkIconContainer}>
//               <Image source={require('../../../assets/images/wallet/Shield Security Icon.png')} />
//             </View>
//           </View>

//           <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.promoCard}>
//             <View style={styles.promoLeft}>
//               <View style={styles.coinStackGraphic}>
//                 <Image source={require('../../../assets/images/wallet/Promo Icon.png')} />
//               </View>
//               <View style={styles.promoTexts}>
//                 <Text style={styles.promoTitle}>Have a promo code?</Text>
//                 <Text style={styles.promoSubtitle}>Apply code and get exciting rewards</Text>
//               </View>
//             </View>
//             <TouchableOpacity style={styles.applyActionBtn}>
//               <Text style={styles.applyActionText}>Apply Now</Text>
//               <FeatherIcon name="chevron-right" size={moderateScale(14)} color="#FFF" style={{ marginLeft: moderateScale(2) }} />
//             </TouchableOpacity>
//           </LinearGradient>
//         </ScrollView>
//       </SafeAreaView>
//     // </Modal>
//   );
// }

//////////////////////////////////////////// cashFreee ///////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import {
//   View, Text, StyleSheet, TouchableOpacity, TextInput,
//   ScrollView, Image, Platform, ToastAndroid, Alert, ActivityIndicator
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import { useDispatch } from 'react-redux';

// // Redux & API Integrations
// import { setAmount, setPaymentMethod } from '../../redux/features/depositSlice';
// import api from '../../api/axios';
// import { createOrder, verifyPayment } from '../../api/walletApi'; // Imported from walletApi
// import cashfreeService from '../../services/CashfreeService';     // Imported Cashfree service
// import { moderateScale } from '../../utils/responsive';

// // Assets
// import upiImg from '../../../assets/images/wallet/Payment Icon.png';
// import bankImg from '../../../assets/images/wallet/Payment Icon (1).png';
// import cardImg from '../../../assets/images/wallet/Payment Icon (2).png';
// import netBankingImg from '../../../assets/images/wallet/wallet.png';
// import wallet from '../../../assets/images/wallet/Wallet image 1.png';
// import cryptoImg from '../../../assets/images/wallet/cryptocurrency 1.png';
// import CashfreeService from '../../services/CashfreeService';

// export default function AddMoneytoWallet({ navigation }) {
//   const dispatch = useDispatch();
//   const [localAmount, setLocalAmount] = useState('100');
//   const [walletData, setWalletData] = useState(null);
//   const [loading, setLoading] = useState(false); // Controlled local loading state during payment processing

//   // 1. Initial balance fetch on mount
//   useEffect(() => {
//     fetchWalletBalance();
//   }, []);

//   // 2. Manage Cashfree Callback Event Listeners throughout component lifecycle
//   useEffect(() => {
//     CashfreeService.initialize(
//       handleSuccessCallback,
//       handleFailureCallback
//     );
    
//     return () => {
//       CashfreeService.removeListeners();
//     };
//   }, []);

//   const fetchWalletBalance = async () => {
//     try {
//       const res = await api.get('/api/wallet/getwalletdashboard');
//       setWalletData(res?.data);
//     } catch (error) {
//       console.log('Error fetching wallet balance:', error?.response || error.message);
//     }
//   };

//   // Cashfree Verification Handlers
//   const handleSuccessCallback = async (orderId) => {
//     try {
//       setLoading(true);
//       const verificationResponse = await verifyPayment(orderId);
      
//       if (verificationResponse && verificationResponse.success) {
//         Alert.alert('Success', 'Money added successfully!');
//         fetchWalletBalance(); // Update balance dashboard instantly
//       } else {
//         Alert.alert('Payment Pending', verificationResponse.message || 'Your payment is being processed.');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to verify payment with the server.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFailureCallback = (error, orderId) => {
//     Alert.alert('Payment Failed', error?.message || 'Something went wrong during payment.');
//     setLoading(false);
//   };

//   const presets = [
//     { label: '+ ₹ 100', value: '100' },
//     { label: '+ ₹ 1,000', value: '1,000' },
//     { label: '+ ₹ 2,500', value: '2,500' },
//     { label: '+ ₹ 5,500', value: '5,500' },
//   ];

//   const paymentMethods = [
//     {
//       id: 'upi',
//       title: 'UPI',
//       subtitle: 'Pay using any UPI app',
//       tag: 'INSTANT',
//       tagBg: '#E8F5E9',
//       tagColor: '#2E7D32',
//       imageSource: upiImg,
//     },
//     {
//       id: 'card',
//       title: 'Debit/Credit Card',
//       subtitle: 'Visa, Mastercard, RuPay',
//       tag: 'INSTANT',
//       tagBg: '#E8F5E9',
//       tagColor: '#2E7D32',
//       imageSource: cardImg,
//     },
//     {
//       id: 'net_banking',
//       title: 'Net Banking',
//       subtitle: 'All major Indian banks',
//       tag: 'INSTANT',
//       tagBg: '#E8F5E9',
//       tagColor: '#2E7D32',
//       imageSource: netBankingImg,
//     },
//     {
//       id: 'bank_transfer',
//       title: 'Bank Transfer',
//       subtitle: 'IMPS, NEFT, RTGS',
//       tag: '1-2 HOURS',
//       tagBg: '#E8EAF6',
//       tagColor: '#283593',
//       imageSource: bankImg,
//     },
//     {
//       id: 'crypto',
//       title: 'Crypto Transfer',
//       subtitle: 'BTC, ETH, USDT',
//       tag: '1-2 HOURS',
//       tagBg: '#E8EAF6',
//       tagColor: '#283593',
//       imageSource: cryptoImg,
//     },
//   ];

//   const parseValueToString = (val) => {
//     const clean = val.replace(/[^0-9]/g, '');
//     return clean ? parseInt(clean, 10).toLocaleString('en-IN') : '';
//   };

//   // Modernized Core payment gateway logic
//   const handlePaymentSelect = async (method) => {
//     const numericalAmount = parseFloat(localAmount.replace(/[^0-9]/g, ''));

//     if (!numericalAmount || numericalAmount <= 0) {
//       if (Platform.OS === 'android') {
//         ToastAndroid.show('Please enter a valid amount', ToastAndroid.SHORT);
//       } else {
//         Alert.alert('Invalid Amount', 'Please enter a valid amount.');
//       }
//       return;
//     }

//     // 1. Sync values locally & to global Redux state
//     dispatch(setAmount(numericalAmount));
//     dispatch(setPaymentMethod({
//       id: method.id,
//       title: method.title,
//       imageSource: method.imageSource,
//       tag: method.tag,
//     }));

//     // If method is manual bank or crypto, you can handle separate navigation branches here
//     if (method.id === 'bank_transfer' || method.id === 'crypto') {
//       navigation.navigate('ConfirmDeposite');
//       return;
//     }

//     // 2. Direct Core Checkout Route via Cashfree Drop Component
//     setLoading(true);
//     try {
//       const orderData = await createOrder(numericalAmount);
//       const orderId = orderData.orderId;
//       const paymentSessionId = orderData.payment_session_id || orderData.paymentSessionId;

//       if (orderId && paymentSessionId) {
//         await CashfreeService.startPayment(orderId, paymentSessionId);
//       } else {
//         Alert.alert('Error', 'Invalid order data received from server.');
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log('Create Order Error:', error?.response?.data || error.message);
//       Alert.alert(
//         'Error',
//         error.response?.data?.message || error.message || 'Could not initiate payment.'
//       );
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Loading Overlay Spinner */}
//       {loading && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color="#4F46E5" />
//           <Text style={styles.loadingText}>Processing Payment securely...</Text>
//         </View>
//       )}

//       {/* Header Section */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <FeatherIcon name="chevron-left" size={moderateScale(26)} color="#4a8cff" />
//         </TouchableOpacity>
//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle}>Add Money to Wallet</Text>
//           <Text style={styles.headerSubtitle}>Choose a payment method to add funds</Text>
//         </View>
//         <TouchableOpacity style={styles.helpButton}>
//           <FeatherIcon name="help-circle" size={moderateScale(22)} color="#3B82F6" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
//         {/* Balance Card */}
//         <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.balanceCard}>
//           <View style={styles.balanceCardLeft}>
//             <View style={styles.balanceRow}>
//               <Text style={styles.balanceLabel}>Total Wallet Balance</Text>
//               <FeatherIcon name="eye" size={moderateScale(16)} color="#E0E7FF" style={{ marginLeft: moderateScale(6) }} />
//             </View>
//             <Text style={styles.cryptoBalance}>
//               {walletData?.balance?.toLocaleString() || '0'}{' '}
//               <Text style={styles.tokenTicker}>PAYO</Text>
//             </Text>
//             <Text style={styles.fiatBalance}>
//               ≈ ₹{(walletData?.balance * 1).toLocaleString() || '0'}
//             </Text>
//           </View>
//           <View style={styles.walletIconContainer}>
//             <Image source={wallet} style={styles.walletHeaderImage} resizeMode="contain" />
//           </View>
//         </LinearGradient>

//         {/* Amount Input */}
//         <Text style={styles.sectionLabel}>ENTER AMOUNT</Text>
//         <View style={styles.amountInputContainer}>
//           <Text style={styles.currencySymbol}>₹</Text>
//           <TextInput
//             style={styles.amountInput}
//             value={localAmount}
//             onChangeText={(text) => setLocalAmount(parseValueToString(text))}
//             keyboardType="number-pad"
//             editable={!loading}
//           />
//           <View style={styles.currencySelector}>
//             <Text style={styles.currencySelectorText}>INR</Text>
//             <Icon name="keyboard-arrow-down" size={moderateScale(18)} color="#4A5568" />
//           </View>
//         </View>

//         {/* Presets */}
//         <View style={styles.presetsRow}>
//           {presets.map((item, index) => {
//             const formattedPresetValue = parseInt(item.value.replace(/[^0-9]/g, ''), 10).toLocaleString('en-IN');
//             const isSelected = localAmount === formattedPresetValue;
//             return (
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => setLocalAmount(formattedPresetValue)}
//                 disabled={loading}
//                 style={[styles.presetChip, isSelected && styles.presetChipActive]}
//               >
//                 <Text style={[styles.presetChipText, isSelected && styles.presetChipTextActive]}>
//                   {item.label}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         {/* Payment Methods */}
//         <Text style={styles.sectionLabel}>SELECT PAYMENT METHOD</Text>
//         <View style={styles.methodsWrapperCard}>
//           {paymentMethods.map((method, idx) => (
//             <TouchableOpacity
//               key={method.id}
//               onPress={() => handlePaymentSelect(method)}
//               activeOpacity={0.7}
//               style={[styles.methodRow, idx !== paymentMethods.length - 1 && styles.methodBorder]}
//               disabled={loading}
//             >
//               <View style={styles.methodIconWrapper}>
//                 <Image source={method.imageSource} style={styles.methodImage} resizeMode="contain" />
//               </View>
//               <View style={styles.methodMeta}>
//                 <Text style={styles.methodTitle}>{method.title}</Text>
//                 <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
//               </View>
//               <View style={styles.methodRight}>
//                 <View style={[styles.tagBadge, { backgroundColor: method.tagBg }]}>
//                   <Text style={[styles.tagBadgeText, { color: method.tagColor }]}>{method.tag}</Text>
//                 </View>
//                 <FeatherIcon name="chevron-right" size={moderateScale(20)} color="#9CA3AF" />
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Security Banner & Promo Card */}
//         <View style={styles.securityBanner}>
//           <View style={styles.shieldIconContainer}>
//             <Image source={require('../../../assets/images/wallet/Security Icon.png')} />
//           </View>
//           <View style={styles.securityMeta}>
//             <Text style={styles.securityTitle}>100% Secure & Encrypted</Text>
//             <Text style={styles.securitySubtitle}>Your money is safe with bank-grade security and encryption.</Text>
//           </View>
//         </View>

//         <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.promoCard}>
//           <View style={styles.promoLeft}>
//             <View style={styles.coinStackGraphic}>
//               <Image source={require('../../../assets/images/wallet/Promo Icon.png')} />
//             </View>
//             <View style={styles.promoTexts}>
//               <Text style={styles.promoTitle}>Have a promo code?</Text>
//               <Text style={styles.promoSubtitle}>Apply code and get exciting rewards</Text>
//             </View>
//           </View>
//           <TouchableOpacity style={styles.applyActionBtn}>
//             <Text style={styles.applyActionText}>Apply Now</Text>
//             <FeatherIcon name="chevron-right" size={moderateScale(14)} color="#FFF" style={{ marginLeft: moderateScale(2) }} />
//           </TouchableOpacity>
//         </LinearGradient>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ... your styles (unchanged) ...
// ─── Styles ──────────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     backgroundColor: '#ffff'
//    },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(16),
//     paddingVertical: moderateScale(14),
//     backgroundColor: 'transparent',
//   },
//   backButton: {
//     width: moderateScale(40),
//     height: moderateScale(40),
//     borderRadius: moderateScale(20),
//     backgroundColor: '#FFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.08,
//     shadowRadius: 2,
//   },
//   headerTitleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//     color: '#1F2937',
//   },
//   headerSubtitle: {
//     fontSize: moderateScale(11),
//     color: '#6B7280',
//     marginTop: moderateScale(2),
//     textAlign: 'center',
//   },
//   helpButton: {
//     width: moderateScale(40),
//     height: moderateScale(40),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scrollBody: {
//     paddingHorizontal: moderateScale(16),
//     paddingBottom: moderateScale(30),
//   },
//   balanceCard: {
//     borderRadius: moderateScale(16),
//     padding: moderateScale(16),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: moderateScale(20),
//   },
//   balanceCardLeft: { flex: 1 },
//   balanceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: moderateScale(4),
//   },
//   balanceLabel: {
//     color: '#E0E7FF',
//     fontSize: moderateScale(12),
//     fontWeight: '500',
//   },
//   cryptoBalance: {
//     color: '#FFF',
//     fontSize: moderateScale(26),
//     fontWeight: '700',
//   },
//   tokenTicker: {
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//     color: '#C7D2FE',
//   },
//   fiatBalance: {
//     color: '#C7D2FE',
//     fontSize: moderateScale(13),
//     marginTop: moderateScale(2),
//   },
//   walletIconContainer: {
//     width: moderateScale(60),
//     height: moderateScale(60),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   walletHeaderImage: {
//     width: '100%',
//     height: '100%',
//   },
//   sectionLabel: {
//     fontSize: moderateScale(12),
//     fontWeight: '600',
//     color: '#6B7280',
//     letterSpacing: 0.5,
//     marginTop: moderateScale(12),
//     marginBottom: moderateScale(6),
//     paddingHorizontal: moderateScale(4),
//   },
//   amountInputContainer: {
//     backgroundColor: '#FFF',
//     borderRadius: moderateScale(12),
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(16),
//     paddingVertical: moderateScale(10),
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   currencySymbol: {
//     fontSize: moderateScale(20),
//     fontWeight: '700',
//     color: '#1F2937',
//     marginRight: moderateScale(8),
//   },
//   amountInput: {
//     flex: 1,
//     fontSize: moderateScale(20),
//     fontWeight: '600',
//     color: '#1F2937',
//     paddingVertical: moderateScale(4),
//   },
//   currencySelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//     paddingHorizontal: moderateScale(10),
//     paddingVertical: moderateScale(4),
//     borderRadius: moderateScale(6),
//   },
//   currencySelectorText: {
//     fontSize: moderateScale(12),
//     fontWeight: '600',
//     color: '#4A5568',
//     marginRight: moderateScale(4),
//   },
//   presetsRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: moderateScale(10),
//     marginBottom: moderateScale(8),
//   },
//   presetChip: {
//     backgroundColor: '#F3F4F6',
//     paddingHorizontal: moderateScale(14),
//     paddingVertical: moderateScale(8),
//     borderRadius: moderateScale(20),
//     marginRight: moderateScale(10),
//     marginBottom: moderateScale(8),
//     borderWidth: 1,
//     borderColor: 'transparent',
//   },
//   presetChipActive: {
//     backgroundColor: '#6366F1',
//     borderColor: '#4F46E5',
//   },
//   presetChipText: {
//     fontSize: moderateScale(13),
//     fontWeight: '500',
//     color: '#4B5563',
//   },
//   presetChipTextActive: {
//     color: '#FFF',
//   },
//   methodsWrapperCard: {
//     backgroundColor: '#F2F4F4',
//     borderRadius: moderateScale(16),
//     paddingHorizontal: moderateScale(6),
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     marginBottom: moderateScale(16),
   
//   },
//   methodRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: moderateScale(14),
//     paddingHorizontal: moderateScale(10),
//   },
//   methodBorder: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//   },
//   methodIconWrapper: {
//     width: moderateScale(44),
//     height: moderateScale(44),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: moderateScale(12),
//   },
//   methodImage: {
//     width: moderateScale(32),
//     height: moderateScale(32),
//   },
//   methodMeta: { flex: 1 },
//   methodTitle: {
//     fontSize: moderateScale(14),
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   methodSubtitle: {
//     fontSize: moderateScale(12),
//     color: '#6B7280',
//     marginTop: moderateScale(2),
//   },
//   methodRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   tagBadge: {
//     paddingHorizontal: moderateScale(8),
//     paddingVertical: moderateScale(3),
//     borderRadius: moderateScale(12),
//     marginRight: moderateScale(8),
//   },
//   tagBadgeText: {
//     fontSize: moderateScale(10),
//     fontWeight: '700',
//   },
//   securityBanner: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#EFF6FF',
//     borderRadius: moderateScale(12),
//     padding: moderateScale(12),
//     marginBottom: moderateScale(16),
//   },
//   shieldIconContainer: {
//     marginRight: moderateScale(12),
//   },
//   securityMeta: { flex: 1 },
//   securityTitle: {
//     fontSize: moderateScale(13),
//     fontWeight: '700',
//     color: '#1E3A8A',
//   },
//   securitySubtitle: {
//     fontSize: moderateScale(11),
//     color: '#3B82F6',
//     marginTop: moderateScale(1),
//   },
//   checkIconContainer: {
//     marginLeft: moderateScale(8),
//   },
//   promoCard: {
//     borderRadius: moderateScale(12),
//     padding: moderateScale(14),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   promoLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   coinStackGraphic: {
//     marginRight: moderateScale(12),
//   },
//   promoTexts: {
//     flex: 1,
//   },
//   promoTitle: {
//     fontSize: moderateScale(13),
//     fontWeight: '700',
//     color: '#FFF',
//   },
//   promoSubtitle: {
//     fontSize: moderateScale(11),
//     color: '#BFDBFE',
//     marginTop: moderateScale(2),
//   },
//   applyActionBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF33',
//     paddingHorizontal: moderateScale(12),
//     paddingVertical: moderateScale(6),
//     borderRadius: moderateScale(20),
//   },
//   applyActionText: {
//     fontSize: moderateScale(12),
//     fontWeight: '600',
//     color: '#FFF',
//   },
// });