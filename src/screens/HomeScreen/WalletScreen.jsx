// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
//   ToastAndroid,
//   Platform,
// } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather';
// import api from '../../api/axios';
// import styles from './WalletScreenStyles';
// import Header from '../components/header';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Clipboard from '@react-native-clipboard/clipboard';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';

// // 1. Import the AddMoneyModal
// import AddMoneyModal from '../components/AddMoneyModal'; 

// export default function WalletScreen({
//   navigation,
// }) {
//   const [wallet, setWallet] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [qr, setQr] = useState(null);
//   const [address, setAddress] = useState('');
  
//   // 2. Add state to control modal visibility
//   const [isModalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     fetchWallet();
//   }, []);

//   const fetchWallet = async () => {
//     try {
//       const res = await api.get('/api/wallet/getwalletdashboard');
//       setWallet(res?.data);
//     } catch (error) {
//       console.log(
//         'Wallet API error:',
//         error?.response || error.message,
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const progress =
//     wallet?.dailyLimit > 0
//       ? ((wallet?.dailyUsed || 0) / wallet?.dailyLimit) * 100
//       : 0;

//   const fetchQr = async () => {
//     try {
//       const res = await api.get('api/wallet/generate-address');
//       const data = res.data;

//       const qrImage = data.qr?.startsWith('data:image')
//         ? data.qr
//         : `data:image/png;base64,${data.qr}`;

//       setQr(qrImage);
//       setAddress(data.address);

//       return {
//         qrImage,
//         address: data.address,
//       };
//     } catch (err) {
//       console.log('QR ERROR:', err.message);
//       return null;
//     }
//   };

//   const handleCopy = () => {
//     const walletAddress = wallet?.id;

//     if (!walletAddress) return;

//     Clipboard.setString(walletAddress);

//     if (Platform.OS === 'android') {
//       ToastAndroid.show('Address copied', ToastAndroid.SHORT);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       const result = await fetchQr();

//       if (!result) return;

//       const { qrImage, address } = result;

//       const base64Data = qrImage.replace(
//         /^data:image\/png;base64,/,
//         '',
//       );

//       const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

//       await RNFS.writeFile(filePath, base64Data, 'base64');

//       await Share.open({
//         url: 'file://' + filePath,
//         message: `Send PAYO to this address:\n${address}`,
//       });
//     } catch (error) {
//       console.log('Share error:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <LinearGradient
//         colors={['#ffffff', '#1C0033']}
//         style={styles.loader}>
//         <ActivityIndicator size="large" color="#fff" />
//       </LinearGradient>
//     );
//   }

//   return (
//     <LinearGradient
//       colors={['#7B2CFF', '#1C0033']}
//       style={{ flex: 1 }}>
//       <SafeAreaView style={{ flex: 1 }} edges={['top']}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           contentContainerStyle={styles.scrollContent}>
//           <View style={styles.walletHeader}>
//             <View style={styles.headerLeft}>
//               <TouchableOpacity
//                 style={styles.cancelContainer}
//                 activeOpacity={0.8}
//                 onPress={() => navigation.goBack()}>
//                 <Icon name="chevron-left" size={28} color="#ffffff" />
//               </TouchableOpacity>

//               <View>
//                 <Text style={styles.walletTitle}>My Wallet</Text>
//                 <Text style={styles.walletId} numberOfLines={1}>
//                   {wallet?.id}
//                 </Text>
//               </View>
//             </View>

//             <Header type="" />
//           </View>

//           <View style={styles.card}>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
//               <Text style={[styles.active, { marginBottom: 0 }]}>
//                 • Active Wallet
//               </Text>
              
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 style={{
//                   backgroundColor: 'rgba(116, 255, 163, 0.15)',
//                   paddingHorizontal: 12,
//                   paddingVertical: 6,
//                   borderRadius: 20,
//                 }}
//                 onPress={() => {
//                   // 3. Open the modal when pressed
//                   setModalVisible(true);
//                 }}>
//                 <Text style={{ color: '#74FFA3', fontSize: 13, fontWeight: '600' }}>
//                   + Add Money
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <Text style={styles.label}>Total Balance</Text>

//             <Text style={styles.balance}>
//               {wallet?.balance?.toLocaleString()}
//               <Text style={{ fontSize: 16, color: '#74FFA3' }}>
//                 {' '}
//                 PAYO
//               </Text>
//             </Text>

//             <View style={styles.actions}>
//               <TouchableOpacity
//                 style={styles.btnWhite}
//                 activeOpacity={0.8}
//                 onPress={handleCopy}>
//                 <Text>Copy Address</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.btnOutline}
//                 activeOpacity={0.8}
//                 onPress={handleShare}>
//                 <Text style={{ color: '#fff' }}>Share QR</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.rowBetween}>
//             <Text style={styles.sectionTitle}>Token Holdings</Text>
//           </View>

//           <View style={styles.box}>
//             <View style={styles.rowBetween}>
//               <Text style={styles.boxTitle}>Referral Rewards</Text>

//               <View style={{ alignItems: 'flex-end' }}>
//                 <Text style={styles.amount}>
//                   {wallet?.referralRewards || 0} PAYO
//                 </Text>

//                 <Text
//                   style={[
//                     styles.pending,
//                     {
//                       color:
//                         wallet?.referralStatus === 'Unlocked'
//                           ? '#22c55e'
//                           : '#facc15',
//                     },
//                   ]}>
//                   {wallet?.referralStatus}
//                 </Text>
//               </View>
//             </View>

//             {wallet?.referralStatus === 'Locked' ? (
//               <Text style={styles.locked}>
//                 • Unlocks in {wallet?.unlockInDays} days
//               </Text>
//             ) : (
//               <Text style={[styles.locked, { color: '#22c55e' }]}>
//                 • Rewards Available
//               </Text>
//             )}
//           </View>

//           <View style={styles.box}>
//             <Text style={styles.boxTitle}>Daily Transaction Limit</Text>

//             <View style={styles.rowBetween}>
//               <Text style={styles.subText}>
//                 Used {wallet?.dailyUsed || 0}
//               </Text>

//               <Text style={styles.subText}>
//                 Limit: {wallet?.dailyLimit || 0}
//               </Text>
//             </View>

//             <View style={styles.progressBg}>
//               <View
//                 style={[
//                   styles.progressFill,
//                   {
//                     width: `${Math.min(progress, 100)}%`,
//                   },
//                 ]}
//               />
//             </View>
//           </View>

//           <View style={styles.bottomButtons}>
//             <TouchableOpacity style={styles.freezeBtn} />

//             <TouchableOpacity
//               style={styles.sendBtn}
//               activeOpacity={0.8}
//               onPress={() => navigation.navigate('SendScreen')}>
//               <Text style={styles.sendText}>Send PAYO</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </SafeAreaView>

//       {/* 4. Mount the Modal component at the root of the screen */}
//       <AddMoneyModal 
//         visible={isModalVisible}
//         onClose={() => setModalVisible(false)}
//         onPaymentSuccess={() => {
//           // Re-fetch the wallet dashboard to update the balance automatically
//           fetchWallet();
//         }}
//       />
//     </LinearGradient>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
//   ToastAndroid,
//   Platform,
//   Image
// } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather'; 
// import api from '../../api/axios';
// import styles from './WalletScreenStyles';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Clipboard from '@react-native-clipboard/clipboard';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';

// import { theme, globalStyles } from '../../MainTheme/theme'; 
// import AddMoneyModal from '../components/AddMoneyModal';

// export default function WalletScreen({ navigation }) {
//   const [wallet, setWallet] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [qr, setQr] = useState(null);
//   const [address, setAddress] = useState('');
  
//   const [isModalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     fetchWallet();
//   }, []);

//   const fetchWallet = async () => {
//     try {
//       const res = await api.get('/api/wallet/getwalletdashboard');
//       setWallet(res?.data);
//     } catch (error) {
//       console.log('Wallet API error:', error?.response || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const progress = wallet?.dailyLimit > 0
//     ? ((wallet?.dailyUsed || 0) / wallet?.dailyLimit) * 100
//     : 0;

//   const fetchQr = async () => {
//     try {
//       const res = await api.get('api/wallet/generate-address');
//       const data = res.data;

//       const qrImage = data.qr?.startsWith('data:image')
//         ? data.qr
//         : `data:image/png;base64,${data.qr}`;

//       setQr(qrImage);
//       setAddress(data.address);

//       return { qrImage, address: data.address };
//     } catch (err) {
//       console.log('QR ERROR:', err.message);
//       return null;
//     }
//   };

//   const handleCopy = () => {
//     const walletAddress = wallet?.id;
//     if (!walletAddress) return;

//     Clipboard.setString(walletAddress);
//     if (Platform.OS === 'android') {
//       ToastAndroid.show('Address copied', ToastAndroid.SHORT);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       const result = await fetchQr();
//       if (!result) return;

//       const { qrImage, address } = result;
//       const base64Data = qrImage.replace(/^data:image\/png;base64,/, '');
//       const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

//       await RNFS.writeFile(filePath, base64Data, 'base64');

//       await Share.open({
//         url: 'file://' + filePath,
//         message: `Send PAYO to this address:\n${address}`,
//       });
//     } catch (error) {
//       console.log('Share error:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color={theme.colors.primaryPurple} />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={styles.scrollContent}
//         >
        
//         {/* INNER CONTAINER enforces strict padding so items don't touch screen edges */}
//         <View style={styles.innerContainer}>
          
//           {/* HEADER */}
//           <View style={styles.header}>
//             <TouchableOpacity
//               style={styles.headerIconBtn}
//               activeOpacity={0.8}
//               onPress={() => navigation.goBack()}>
//               <Icon name="chevron-left" size={24} color={theme.colors.textMain} />
//             </TouchableOpacity>

//             <View style={styles.headerTitleContainer}>
//               <Text style={styles.headerTitle}>Wallet ID</Text>
//               <Text style={styles.headerSubtitle} numberOfLines={1}>
//                 {wallet?.id || 'PXYZ6273849A'}
//               </Text>
//             </View>

//             <View style={styles.headerRight}>
//               <TouchableOpacity style={styles.headerActionBtn} activeOpacity={0.8}>
//                 <Image 
//                   source={require('../../../assets/images/walletscr/Icon (4).png')} 
//                   style={styles.customHeaderIcon} 
//                 />
//                 <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
//               </TouchableOpacity>
              
//               <TouchableOpacity style={[styles.headerActionBtn, { marginLeft: 8 }]} activeOpacity={0.8}>
//                 <Image 
//                   source={require('../../../assets/images/walletscr/Settings Icon.png')} 
//                   style={styles.customHeaderIcon} 
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* MAIN WALLET CARD */}
//           <LinearGradient
//             colors={[theme.colors.primaryPurple, theme.colors.primaryBlue]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.mainCard}>
            
//             <View style={styles.cardTopRow}>
//               <View style={styles.activePill}>
//                 <View style={styles.dot} />
//                 <Text style={styles.activePillText}>Active Wallet</Text>
//               </View>
//               <Icon name="credit-card" size={32} color="#ffffff80" />
//             </View>

//             <View style={styles.balanceSection}>
//               <View style={styles.balanceLabelRow}>
//                 <Text style={styles.balanceLabel}>Total Wallet Balance</Text>
//                 <Icon name="eye-off" size={16} color="#d1d5db" style={{ marginLeft: 6 }} />
//               </View>
              
//               <View style={styles.balanceValueRow}>
//                 <Text style={styles.balanceText}>{wallet?.balance?.toLocaleString() || '12,450'}</Text>
//                 <Text style={styles.currencyText}>PAYO</Text>
//               </View>
              
//               <View style={styles.bottomCardRow}>
//                 <Text style={styles.fiatText}>≈ ₹8,71,500</Text>
//                 <TouchableOpacity
//                   activeOpacity={0.9}
//                   style={styles.addMoneyBtn}
//                   onPress={() => navigation.navigate('AddMoneytoWallet')}>
//                   <Image 
//                     source={require('../../../assets/images/walletscr/icon-container.png')} 
//                     style={styles.addMoneyIcon} 
//                   />
//                   <Text style={styles.addMoneyText}>Add Money</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </LinearGradient>

//           {/* COPY & SHARE BUTTONS */}
//           <View style={styles.actionRow}>
//             <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={handleCopy}>
//               <Text style={styles.actionBtnText}>Copy address</Text>
//               <Image 
//                 source={require('../../../assets/images/walletscr/Content Copy Icon.png')} 
//                 style={styles.actionIcon} 
//               />
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={handleShare}>
//               <Text style={styles.actionBtnText}>Share address</Text>
//               <Image 
//                 source={require('../../../assets/images/walletscr/Share Icon.png')} 
//                 style={styles.actionIcon} 
//               />
//             </TouchableOpacity>
//           </View>

//           {/* REFERRAL PROMO BANNER */}
//           <LinearGradient
//             colors={['#2563eb', '#38bdf8']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.promoBanner}>
//             <View style={styles.promoContent}>
//               <Text style={styles.promoEmoji}>🚀</Text>
//               <View style={styles.promoTextContainer}>
//                 <Text style={styles.promoTitle}>Invite Friends & Earn PAYO</Text>
//                 <Text style={styles.promoSub}>Get ₹500 for every referral</Text>
//               </View>
//               <TouchableOpacity style={styles.promoBtn}>
//                 <Text style={styles.promoBtnText}>Refer Now {'>'}</Text>
//               </TouchableOpacity>
//             </View>
//           </LinearGradient>

//           {/* TOKEN HOLDINGS HEADER */}
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Token Holdings</Text>
//             <TouchableOpacity>
//               <Text style={styles.historyText}>History</Text>
//             </TouchableOpacity>
//           </View>

//           {/* REFERRAL REWARDS CARD */}
//           <View style={[globalStyles.card, styles.dataCard]}>
//             <View style={styles.dataCardRow}>
//               <Text style={styles.cardTitleText}>Referral rewards</Text>
//               <View style={{ alignItems: 'flex-end' }}>
//                 <Text style={styles.cardAmountText}>{wallet?.referralRewards || '200.0'}</Text>
//                 <Text style={styles.cardStatusTextPending}>Pending</Text>
//               </View>
//             </View>
//             <View style={styles.dataCardRow}>
//               <Text style={styles.cardSubText}>• Unlocks in {wallet?.unlockInDays || 3} days</Text>
//               <Text style={styles.cardStatusTextLocked}>Locked</Text>
//             </View>
//           </View>

//           {/* DAILY LIMIT CARD */}
//           <View style={[globalStyles.card, styles.dataCard]}>
//             <View style={styles.dataCardRow}>
//               <Text style={styles.cardTitleText}>Daily Transaction Limit</Text>
//               <Text style={styles.limitHighlightText}>
//                 {wallet?.dailyUsed?.toLocaleString() || '6,200'} /{wallet?.dailyLimit?.toLocaleString() || '10,000'}
//               </Text>
//             </View>
            
//             <View style={styles.progressBarBg}>
//               <View style={[styles.progressBarFill, { width: `${Math.min(progress, 100)}%` }]} />
//             </View>

//             <View style={styles.dataCardRow}>
//               <Text style={styles.cardSubText}>Used {wallet?.dailyUsed?.toLocaleString() || '6,200'}</Text>
//               <Text style={styles.cardSubText}>Limit: {wallet?.dailyLimit?.toLocaleString() || '10,000'}</Text>
//             </View>
//           </View>

//           {/* SEND PAYO BUTTON */}
//           <TouchableOpacity
//             style={styles.sendPrimaryBtn}
//             activeOpacity={0.8}
//             onPress={() => navigation.navigate('SendScreen')}>
//             <Text style={styles.sendPrimaryBtnText}>Send PAYO</Text>
//             <Icon name="arrow-right" size={20} color="#fff" />
//           </TouchableOpacity>

//           {/* BOTTOM PROMOS */}
//           <View style={[styles.bottomPromoCard, { backgroundColor: '#ecfdf5' }]}>
//             <View style={styles.transparentIconBg}>
//               <Image 
//                 source={require('../../../assets/images/walletscr/Promo Icon.png')} 
//                 style={styles.promoImageLarge} 
//               />
//             </View>
//             <View style={styles.bottomPromoTextContainer}>
//               <Text style={styles.bottomPromoTitle}>Have a promo code?</Text>
//               <Text style={styles.bottomPromoSub}>Apply code and get exciting rewards</Text>
//             </View>
//             <Text style={[styles.bottomPromoAction, { color: '#8b5cf6' }]}>Apply Now {'>'}</Text>
//           </View>

//           <View style={[styles.bottomPromoCard, { backgroundColor: '#fff7ed' }]}>
//             <View style={styles.transparentIconBg}>
//               <Image 
//                 source={require('../../../assets/images/walletscr/Frame (1).png')} 
//                 style={styles.promoImageLarge} 
//               />
//             </View>
//             <View style={styles.bottomPromoTextContainer}>
//               <Text style={styles.bottomPromoTitle}>Rewards You'll Earn</Text>
//               <Text style={styles.bottomPromoSub}>You will earn 10 PAYO as a bonus on this deposit</Text>
//             </View>
//             <View style={styles.bonusTag}>
//               <Text style={styles.bonusTagText}>+10 PAYO</Text>
//             </View>
//           </View>

//         </View>
//       </ScrollView>

//       <AddMoneyModal 
//         visible={isModalVisible}
//         onClose={() => setModalVisible(false)}
//         onPaymentSuccess={() => {
//           fetchWallet();
//         }}
//       />
//     </SafeAreaView>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  Image
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'; 
import api from '../../api/axios';
import styles from './WalletScreenStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

import { theme, globalStyles } from '../../MainTheme/theme'; 
import AddMoneyModal from '../components/AddMoneyModal';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchWalletDetails, setWalletData } from '../../redux/features/depositSlice';

export default function WalletScreen({ navigation }) {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qr, setQr] = useState(null);
  const [address, setAddress] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  
  // NEW STATE: Toggle balance visibility
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const walletData = useAppSelector((state) => state.deposit.walletData);
  
  console.log(walletData,"walletData676")
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchWallet();
  //   }, [])
  // );

  // const fetchWallet = async () => {
  //   try {
  //     // 1. Call API only ONCE here
  //     const res = await api.get('/api/wallet/wallet-details');
      
  //     // 2. Set local state (if needed)
  //     console.log(res.data?.data?.[0],"9059729791")
  //     setWallet(res.data?.data?.[0]);
      
  //     // 3. Dispatch the response data straight to Redux
  //     dispatch(setWalletData(res.data?.data?.[0]));
  //   } catch (error) {
  //     console.log('Wallet API error:', error?.response || error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const progress = wallet?.dailyLimit > 0
    ? ((wallet?.dailyUsed || 0) / wallet?.dailyLimit) * 100
    : 0;

  const fetchQr = async () => {
    try {
      const res = await api.get('api/wallet/generate-address');
      const data = res.data;

      const qrImage = data.qr?.startsWith('data:image')
        ? data.qr
        : `data:image/png;base64,${data.qr}`;

      setQr(qrImage);
      setAddress(data.address);

      return { qrImage, address: data.address };
    } catch (err) {
      console.log('QR ERROR:', err.message);
      return null;
    }
  };

  const handleCopy = () => {
    const walletAddress = walletData?.Wallet_ID;
    if (!walletAddress) return;

    Clipboard.setString(walletAddress);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Address copied', ToastAndroid.SHORT);
    }
  };

  const handleShare = async () => {
    try {
      const result = await fetchQr();
      if (!result) return;

      const { qrImage, address } = result;
      const base64Data = qrImage.replace(/^data:image\/png;base64,/, '');
      const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

      await RNFS.writeFile(filePath, base64Data, 'base64');

      await Share.open({
        url: 'file://' + filePath,
        message: `Send PAYO to this address:\n${address}`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={theme.colors.primaryPurple} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerIconBtn}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-left" size={24} color={theme.colors.primaryBlue} />
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Wallet ID</Text>
              <Text style={styles.headerSubtitle} numberOfLines={1}>
                {walletData?.Wallet_ID}
              </Text>
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerActionBtn} activeOpacity={0.8}>
                <Image 
                  source={require('../../../assets/images/walletscr/Icon (4).png')} 
                  style={styles.customHeaderIcon} 
                />
                <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.headerActionBtn, { marginLeft: 8 }]} activeOpacity={0.8}>
                <Image 
                  source={require('../../../assets/images/walletscr/Settings Icon.png')} 
                  style={styles.customHeaderIcon} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* MAIN WALLET CARD */}
          <LinearGradient
            colors={['#6366f1', '#4f46e5']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mainCard}
          >
            <View style={styles.mainCardContent}>
              {/* LEFT SIDE: BALANCE AND METRICS */}
              <View style={styles.mainCardLeft}>
                <View style={styles.activePill}>
                  <View style={styles.dot} />
                  <Text style={styles.activePillText}>Active Wallet</Text>
                </View>

                <View style={styles.balanceLabelRow}>
                  <Text style={styles.balanceLabel}>Total Wallet Balance</Text>
                  {/* CHANGED: Made icon interactive and dynamic */}
                  <TouchableOpacity 
                    onPress={() => setIsBalanceVisible(!isBalanceVisible)} 
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Icon 
                      name={isBalanceVisible ? "eye" : "eye-off"} 
                      size={14} 
                      color="#ffffffb3" 
                      style={{ marginLeft: 6 }} 
                    />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.balanceValueRow}>
                  {/* CHANGED: Dynamic balance display */}
                  <Text style={styles.balanceText}>
                    {isBalanceVisible ? (wallet?.balance?.toLocaleString() || '0') : '****'}
                  </Text>
                  <Text style={styles.currencyText}>PAYO</Text>
                </View>
                
                {/* CHANGED: Dynamic fiat display */}
                <Text style={styles.fiatText}>
                  {isBalanceVisible ? '≈ ₹0.00' : '≈ ₹****'}
                </Text>
              </View>

              {/* RIGHT SIDE: 3D WALLET GRAPHIC & ACTION */}
              <View style={styles.mainCardRight}>
                <Image 
                  source={require('../../../assets/images/profile/wallet_design.png')} 
                  style={styles.wallet3dImage} 
                />
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.addMoneyBtn}
                  onPress={() => navigation.navigate('AddMoneytoWallet')}
                >
                  <Icon name="plus" size={16} color="#11f00e" style={{ marginRight: 4 ,}} />
                  <Text style={styles.addMoneyText}>Add Money</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* COPY & SHARE ACTIONS - BALANCED LAYOUT */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={handleCopy}>
              <Text style={styles.actionBtnText}>Copy address</Text>
              <Image 
                source={require('../../../assets/images/walletscr/Content Copy Icon.png')} 
                style={styles.actionIcon} 
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={handleShare}>
              <Text style={styles.actionBtnText}>Share address</Text>
              <Image 
                source={require('../../../assets/images/walletscr/Share Icon.png')} 
                style={styles.actionIcon} 
              />
            </TouchableOpacity>
          </View>

          {/* REFERRAL PROMO BANNER */}
          <LinearGradient
            colors={['#2563eb', '#38bdf8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.promoBanner}
          >
            <View style={styles.promoContent}>
              <Text style={styles.promoEmoji}>🚀</Text>
              <View style={styles.promoTextContainer}>
                <Text style={styles.promoTitle}>Invite Friends & Earn PAYO</Text>
                <Text style={styles.promoSub}>Get ₹500 for every referral</Text>
              </View>
              <TouchableOpacity onPress={()=>navigation.navigate('Receive')} style={styles.promoBtn}>
                <Text style={styles.promoBtnText}>Refer Now {'>'}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* TOKEN HOLDINGS SECTION */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Token Holdings</Text>
            <TouchableOpacity>
              <Text style={styles.historyText}>History</Text>
            </TouchableOpacity>
          </View>

          {/* REFERRAL REWARDS CARD */}
          <View style={[globalStyles.card, styles.dataCard]}>
            <View style={[styles.dataCardRow, { alignItems: 'flex-start' }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitleText}>Referral rewards</Text>
                <Text style={[styles.cardSubText, { marginTop: 12 }]}>
                  • Unlocks in {wallet?.unlockInDays || 3} days
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.cardAmountText}>{wallet?.referralRewards || '200.0'}</Text>
                <Text style={styles.cardStatusTextPending}>Pending</Text>
                <Text style={styles.cardStatusTextLocked}>Locked</Text>
              </View>
            </View>
          </View>

          {/* DAILY LIMIT CARD */}
          <View style={[globalStyles.card, styles.dataCard]}>
            <View style={styles.dataCardRow}>
              <Text style={styles.cardTitleText}>Daily Transaction Limit</Text>
              <Text style={styles.limitHighlightText}>
                {wallet?.dailyUsed?.toLocaleString() || '6,200'} /{wallet?.dailyLimit?.toLocaleString() || '10,000'}
              </Text>
            </View>
            
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${Math.min(progress, 100)}%` }]} />
            </View>

            <View style={styles.dataCardRow}>
              <Text style={styles.cardSubText}>Used {wallet?.dailyUsed?.toLocaleString() || '6,200'}</Text>
              <Text style={styles.cardSubText}>Limit: {wallet?.dailyLimit?.toLocaleString() || '10,000'}</Text>
            </View>
          </View>

          {/* SEND PAYO BUTTON - MATCHES SYMMETRICAL FULL WIDTH DESIGN WITH ABSOLUTE RIGHT ICON */}
          <TouchableOpacity
            style={styles.sendPrimaryBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SendScreen')}
          >
            <Text style={styles.sendPrimaryBtnText}>Send PAYO</Text>
            <Icon name="arrow-right" size={20} color="#fff" style={styles.rightIconAbsolute} />
          </TouchableOpacity>

          {/* BOTTOM PROMOS */}
          <View style={[styles.bottomPromoCard, { backgroundColor: '#ecfdf5' }]}>
            <View style={styles.transparentIconBg}>
              <Image 
                source={require('../../../assets/images/walletscr/Promo Icon.png')} 
                style={styles.promoImageLarge} 
              />
            </View>
            <View style={styles.bottomPromoTextContainer}>
              <Text style={styles.bottomPromoTitle}>Have a promo code?</Text>
              <Text style={styles.bottomPromoSub}>Apply code and get exciting rewards</Text>
            </View>
            <Text style={[styles.bottomPromoAction, { color: '#8b5cf6' }]}>Apply Now {'>'}</Text>
          </View>

          <View style={[styles.bottomPromoCard, { backgroundColor: '#fff7ed' }]}>
            <View style={styles.transparentIconBg}>
              <Image 
                source={require('../../../assets/images/walletscr/Frame (1).png')} 
                style={styles.promoImageLarge} 
              />
            </View>
            <View style={styles.bottomPromoTextContainer}>
              <Text style={styles.bottomPromoTitle}>Rewards You'll Earn</Text>
              <Text style={styles.bottomPromoSub}>You will earn 10 PAYO as a bonus on this deposit</Text>
            </View>
            <View style={styles.bonusTag}>
              <Text style={styles.bonusTagText}>+10 PAYO</Text>
            </View>
          </View>

        </View>
      </ScrollView>

      <AddMoneyModal 
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onPaymentSuccess={() => {
          fetchWallet();
        }}
      />
    </SafeAreaView>
  );
}

// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
//   ToastAndroid,
//   Platform,
//   Image
// } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather'; 
// import api from '../../api/axios';
// import styles from './WalletScreenStyles';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Clipboard from '@react-native-clipboard/clipboard';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';

// import { theme, globalStyles } from '../../MainTheme/theme'; 
// import AddMoneyModal from '../components/AddMoneyModal';
// import { useFocusEffect } from '@react-navigation/native';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { fetchWalletDetails, setWalletData } from '../../redux/features/depositSlice';

// export default function WalletScreen({ navigation }) {
//   const [wallet, setWallet] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [qr, setQr] = useState(null);
//   const [address, setAddress] = useState('');
//   const [isModalVisible, setModalVisible] = useState(false);

//   const walletData = useAppSelector((state) => state.deposit.walletData);
  
//   console.log(walletData,"walletData676")
//   // useFocusEffect(
//   //   useCallback(() => {
//   //     fetchWallet();
//   //   }, [])
//   // );

//   // const fetchWallet = async () => {
//   //   try {
//   //     // 1. Call API only ONCE here
//   //     const res = await api.get('/api/wallet/wallet-details');
      
//   //     // 2. Set local state (if needed)
//   //     console.log(res.data?.data?.[0],"9059729791")
//   //     setWallet(res.data?.data?.[0]);
      
//   //     // 3. Dispatch the response data straight to Redux
//   //     dispatch(setWalletData(res.data?.data?.[0]));
//   //   } catch (error) {
//   //     console.log('Wallet API error:', error?.response || error.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const progress = wallet?.dailyLimit > 0
//     ? ((wallet?.dailyUsed || 0) / wallet?.dailyLimit) * 100
//     : 0;

//   const fetchQr = async () => {
//     try {
//       const res = await api.get('api/wallet/generate-address');
//       const data = res.data;

//       const qrImage = data.qr?.startsWith('data:image')
//         ? data.qr
//         : `data:image/png;base64,${data.qr}`;

//       setQr(qrImage);
//       setAddress(data.address);

//       return { qrImage, address: data.address };
//     } catch (err) {
//       console.log('QR ERROR:', err.message);
//       return null;
//     }
//   };

//   const handleCopy = () => {
//     const walletAddress = walletData?.Wallet_ID;
//     if (!walletAddress) return;

//     Clipboard.setString(walletAddress);
//     if (Platform.OS === 'android') {
//       ToastAndroid.show('Address copied', ToastAndroid.SHORT);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       const result = await fetchQr();
//       if (!result) return;

//       const { qrImage, address } = result;
//       const base64Data = qrImage.replace(/^data:image\/png;base64,/, '');
//       const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

//       await RNFS.writeFile(filePath, base64Data, 'base64');

//       await Share.open({
//         url: 'file://' + filePath,
//         message: `Send PAYO to this address:\n${address}`,
//       });
//     } catch (error) {
//       console.log('Share error:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color={theme.colors.primaryPurple} />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* INNER CONTAINER enforces strict padding so items don't touch screen edges */}
//         <View style={styles.innerContainer}>
          
//           {/* HEADER */}
//           <View style={styles.header}>
//             <TouchableOpacity
//               style={styles.headerIconBtn}
//               activeOpacity={0.8}
//               onPress={() => navigation.goBack()}
//             >
//               <Icon name="chevron-left" size={24} color={theme.colors.primaryBlue} />
//             </TouchableOpacity>

//             <View style={styles.headerTitleContainer}>
//               <Text style={styles.headerTitle}>Wallet ID</Text>
//               <Text style={styles.headerSubtitle} numberOfLines={1}>
//                 {walletData?.Wallet_ID}
//               </Text>
//             </View>

//             <View style={styles.headerRight}>
//               <TouchableOpacity style={styles.headerActionBtn} activeOpacity={0.8}>
//                 <Image 
//                   source={require('../../../assets/images/walletscr/Icon (4).png')} 
//                   style={styles.customHeaderIcon} 
//                 />
//                 <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
//               </TouchableOpacity>
              
//               <TouchableOpacity style={[styles.headerActionBtn, { marginLeft: 8 }]} activeOpacity={0.8}>
//                 <Image 
//                   source={require('../../../assets/images/walletscr/Settings Icon.png')} 
//                   style={styles.customHeaderIcon} 
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* MAIN WALLET CARD */}
//           <LinearGradient
//             colors={['#6366f1', '#4f46e5']} 
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.mainCard}
//           >
//             <View style={styles.mainCardContent}>
//               {/* LEFT SIDE: BALANCE AND METRICS */}
//               <View style={styles.mainCardLeft}>
//                 <View style={styles.activePill}>
//                   <View style={styles.dot} />
//                   <Text style={styles.activePillText}>Active Wallet</Text>
//                 </View>

//                 <View style={styles.balanceLabelRow}>
//                   <Text style={styles.balanceLabel}>Total Wallet Balance</Text>
//                   <Icon name="eye-off" size={14} color="#ffffffb3" style={{ marginLeft: 6 }} />
//                 </View>
                
//                 <View style={styles.balanceValueRow}>
//                   <Text style={styles.balanceText}>{wallet?.balance?.toLocaleString() || '0'}</Text>
//                   <Text style={styles.currencyText}>PAYO</Text>
//                 </View>
                
//                 <Text style={styles.fiatText}>≈ ₹0.00</Text>
//               </View>

//               {/* RIGHT SIDE: 3D WALLET GRAPHIC & ACTION */}
//               <View style={styles.mainCardRight}>
//                 <Image 
//                   source={require('../../../assets/images/profile/wallet_design.png')} 
//                   style={styles.wallet3dImage} 
//                 />
//                 <TouchableOpacity
//                   activeOpacity={0.9}
//                   style={styles.addMoneyBtn}
//                   onPress={() => navigation.navigate('AddMoneytoWallet')}
//                 >
//                   <Icon name="plus" size={16} color="#11f00e" style={{ marginRight: 4 ,}} />
//                   <Text style={styles.addMoneyText}>Add Money</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </LinearGradient>

//           {/* COPY & SHARE ACTIONS - BALANCED LAYOUT */}
//           <View style={styles.actionRow}>
//             <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={handleCopy}>
//               <Text style={styles.actionBtnText}>Copy address</Text>
//               <Image 
//                 source={require('../../../assets/images/walletscr/Content Copy Icon.png')} 
//                 style={styles.actionIcon} 
//               />
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7} onPress={handleShare}>
//               <Text style={styles.actionBtnText}>Share address</Text>
//               <Image 
//                 source={require('../../../assets/images/walletscr/Share Icon.png')} 
//                 style={styles.actionIcon} 
//               />
//             </TouchableOpacity>
//           </View>

//           {/* REFERRAL PROMO BANNER */}
//           <LinearGradient
//             colors={['#2563eb', '#38bdf8']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.promoBanner}
//           >
//             <View style={styles.promoContent}>
//               <Text style={styles.promoEmoji}>🚀</Text>
//               <View style={styles.promoTextContainer}>
//                 <Text style={styles.promoTitle}>Invite Friends & Earn PAYO</Text>
//                 <Text style={styles.promoSub}>Get ₹500 for every referral</Text>
//               </View>
//               <TouchableOpacity onPress={()=>navigation.navigate('Receive')} style={styles.promoBtn}>
//                 <Text style={styles.promoBtnText}>Refer Now {'>'}</Text>
//               </TouchableOpacity>
//             </View>
//           </LinearGradient>

//           {/* TOKEN HOLDINGS SECTION */}
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Token Holdings</Text>
//             <TouchableOpacity>
//               <Text style={styles.historyText}>History</Text>
//             </TouchableOpacity>
//           </View>

//           {/* REFERRAL REWARDS CARD */}
//           <View style={[globalStyles.card, styles.dataCard]}>
//             <View style={[styles.dataCardRow, { alignItems: 'flex-start' }]}>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.cardTitleText}>Referral rewards</Text>
//                 <Text style={[styles.cardSubText, { marginTop: 12 }]}>
//                   • Unlocks in {wallet?.unlockInDays || 3} days
//                 </Text>
//               </View>
//               <View style={{ alignItems: 'flex-end' }}>
//                 <Text style={styles.cardAmountText}>{wallet?.referralRewards || '200.0'}</Text>
//                 <Text style={styles.cardStatusTextPending}>Pending</Text>
//                 <Text style={styles.cardStatusTextLocked}>Locked</Text>
//               </View>
//             </View>
//           </View>

//           {/* DAILY LIMIT CARD */}
//           <View style={[globalStyles.card, styles.dataCard]}>
//             <View style={styles.dataCardRow}>
//               <Text style={styles.cardTitleText}>Daily Transaction Limit</Text>
//               <Text style={styles.limitHighlightText}>
//                 {wallet?.dailyUsed?.toLocaleString() || '6,200'} /{wallet?.dailyLimit?.toLocaleString() || '10,000'}
//               </Text>
//             </View>
            
//             <View style={styles.progressBarBg}>
//               <View style={[styles.progressBarFill, { width: `${Math.min(progress, 100)}%` }]} />
//             </View>

//             <View style={styles.dataCardRow}>
//               <Text style={styles.cardSubText}>Used {wallet?.dailyUsed?.toLocaleString() || '6,200'}</Text>
//               <Text style={styles.cardSubText}>Limit: {wallet?.dailyLimit?.toLocaleString() || '10,000'}</Text>
//             </View>
//           </View>

//           {/* SEND PAYO BUTTON - MATCHES SYMMETRICAL FULL WIDTH DESIGN WITH ABSOLUTE RIGHT ICON */}
//           <TouchableOpacity
//             style={styles.sendPrimaryBtn}
//             activeOpacity={0.8}
//             onPress={() => navigation.navigate('SendScreen')}
//           >
//             <Text style={styles.sendPrimaryBtnText}>Send PAYO</Text>
//             <Icon name="arrow-right" size={20} color="#fff" style={styles.rightIconAbsolute} />
//           </TouchableOpacity>

//           {/* BOTTOM PROMOS */}
//           <View style={[styles.bottomPromoCard, { backgroundColor: '#ecfdf5' }]}>
//             <View style={styles.transparentIconBg}>
//               <Image 
//                 source={require('../../../assets/images/walletscr/Promo Icon.png')} 
//                 style={styles.promoImageLarge} 
//               />
//             </View>
//             <View style={styles.bottomPromoTextContainer}>
//               <Text style={styles.bottomPromoTitle}>Have a promo code?</Text>
//               <Text style={styles.bottomPromoSub}>Apply code and get exciting rewards</Text>
//             </View>
//             <Text style={[styles.bottomPromoAction, { color: '#8b5cf6' }]}>Apply Now {'>'}</Text>
//           </View>

//           <View style={[styles.bottomPromoCard, { backgroundColor: '#fff7ed' }]}>
//             <View style={styles.transparentIconBg}>
//               <Image 
//                 source={require('../../../assets/images/walletscr/Frame (1).png')} 
//                 style={styles.promoImageLarge} 
//               />
//             </View>
//             <View style={styles.bottomPromoTextContainer}>
//               <Text style={styles.bottomPromoTitle}>Rewards You'll Earn</Text>
//               <Text style={styles.bottomPromoSub}>You will earn 10 PAYO as a bonus on this deposit</Text>
//             </View>
//             <View style={styles.bonusTag}>
//               <Text style={styles.bonusTagText}>+10 PAYO</Text>
//             </View>
//           </View>

//         </View>
//       </ScrollView>

//       <AddMoneyModal 
//         visible={isModalVisible}
//         onClose={() => setModalVisible(false)}
//         onPaymentSuccess={() => {
//           fetchWallet();
//         }}
//       />
//     </SafeAreaView>
//   );
// }

