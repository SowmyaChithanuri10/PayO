// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   Platform,
//   Share,
//   ToastAndroid,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';

// import LinearGradient from 'react-native-linear-gradient';
// import styles from './ReferEarnStyles';
// import api from '../../api/axios';
// import Clipboard from '@react-native-clipboard/clipboard';
// import BottomNav from '../components/bottomNav';
// import Icon from 'react-native-vector-icons/Feather';

// export default function ReferEarn({ navigation }) {
//   const [data, setData] = useState({
//     referralCode: '',
//     totalUsers: 0,
//     successfulReferrals: 0,
//     totalRewards: 0,
//     rewardPerUser: 50,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchReferral();
//   }, []);

//   const fetchReferral = async () => {
//     try {
//       const res = await api.get('/api/wallet/refer');

//       console.log(res.data, 'REFERRAL DATA');

//       setData(res.data);
//     } catch (err) {
//       console.log(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyCode = () => {
//     const code = data.referralCode;

//     Clipboard.setString(code);

//     if (Platform.OS === 'android') {
//       ToastAndroid.show(
//         'Referral code copied',
//         ToastAndroid.SHORT,
//       );
//     } else {
//       Alert.alert(
//         'Copied',
//         'Referral code copied',
//       );
//     }
//   };

//   const shareReferral = async () => {
//     try {
//       await Share.share({
//         message: `Join PayO using my referral code: ${data.referralCode}`,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (loading) {
//     return (
//       <LinearGradient
//         colors={['#1e0a3c', '#5b21b6']}
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Text
//           style={{
//             color: '#fff',
//             fontSize: 16,
//           }}>
//           Loading...
//         </Text>
//       </LinearGradient>
//     );
//   }

//   return (
//     <LinearGradient
//       colors={['#1e0a3c', '#5b21b6']}
//       style={{ flex: 1 }}>
//       <SafeAreaView
//         style={{ flex: 1 }}
//         edges={['top']}>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           contentContainerStyle={[
//             styles.container,
//             {
//               flexGrow: 1,
//               paddingBottom: 160,
//             },
//           ]}>
//           {/* HEADER */}
//           <View style={styles.headerRow}>
//             <TouchableOpacity
//               style={styles.backBtn}
//               onPress={() =>
//                 navigation.goBack()
//               }>
//               <Text style={styles.back}>
//                 <Icon
//                   name="chevron-left"
//                   size={28}
//                   color="#ffffff"
//                 />
//               </Text>
//             </TouchableOpacity>

//             <Text style={styles.header}>
//               Refer & Earn
//             </Text>
//           </View>

//           {/* CARD */}
//           <View style={styles.card}>
//             <Text style={styles.icon}>
//               👥
//             </Text>

//             <Text style={styles.earn}>
//               Earn {data.rewardPerUser || 50}{' '}
//               PAYO
//             </Text>

//             <Text style={styles.desc}>
//               Invite your friends to PayO and
//               earn rewards when they complete
//               their first transaction.
//             </Text>
//           </View>

//           {/* REFERRAL CODE */}
//           <View style={styles.codeBox}>
//             <Text style={styles.codeLabel}>
//               Your Referral Code
//             </Text>

//             <Text style={styles.code}>
//               {data.referralCode}
//             </Text>
//           </View>

//           {/* BUTTONS */}
//           <View style={styles.buttonRow}>
//             <TouchableOpacity
//               style={styles.btn}
//               onPress={copyCode}>
//               <Text style={styles.btnText}>
//                 Copy Code
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.btn}
//               onPress={shareReferral}>
//               <Text style={styles.btnText}>
//                 Share Link
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* STATS */}
//           <View style={styles.statsRow}>
//             <View style={styles.statBox}>
//               <Text style={styles.statValue}>
//                 {data.totalUsers || 0}
//               </Text>

//               <Text style={styles.statLabel}>
//                 Total Users
//               </Text>
//             </View>

//             <View style={styles.statBox}>
//               <Text
//                 style={
//                   styles.statValueGreen
//                 }>
//                 {data.totalRewards || 0}
//               </Text>

//               <Text style={styles.statLabel}>
//                 Total Rewards
//               </Text>
//             </View>
//           </View>

//           {/* REFERRAL PROGRESS */}
//           <View style={styles.info}>
//             <Text style={styles.infoTitle}>
//               Referral Progress
//             </Text>

//             <Text style={styles.infoText}>
//               Successful Referrals:{' '}
//               {data.successfulReferrals || 0}
//             </Text>

//             <Text style={styles.infoText}>
//               Reward Per User:{' '}
//               {data.rewardPerUser || 50}{' '}
//               PAYO
//             </Text>
//           </View>

//           {/* HOW IT WORKS */}
//           <View style={styles.info}>
//             <Text style={styles.infoTitle}>
//               How it works :
//             </Text>

//             <Text style={styles.infoText}>
//               1. Share your referral code with
//               friends.
//             </Text>

//             <Text style={styles.infoText}>
//               2. Friend signs up using your
//               code.
//             </Text>

//             <Text style={styles.infoText}>
//               3. Friend completes their first
//               successful transaction.
//             </Text>

//             <Text style={styles.infoText}>
//               4. You earn{' '}
//               {data.rewardPerUser || 50} PAYO
//               instantly.
//             </Text>
//           </View>
//         </ScrollView>

//         <BottomNav navigation={navigation} />
//       </SafeAreaView>
//     </LinearGradient>
//   );
// }




// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   Platform,
//   Share,
//   ToastAndroid,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import styles from './ReferEarnStyles';
// import api from '../../api/axios';
// import Clipboard from '@react-native-clipboard/clipboard';
// import BottomNav from '../components/bottomNav';
// import Icon from 'react-native-vector-icons/Feather';
// import { theme } from '../../MainTheme/theme';

// export default function ReferEarn({ navigation }) {
//   const [data, setData] = useState({
//     referralCode: '',
//     totalUsers: 0,
//     successfulReferrals: 0,
//     totalRewards: 0,
//     rewardPerUser: 50,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchReferral();
//   }, []);

//   const fetchReferral = async () => {
//     try {
//       const res = await api.get('/api/wallet/refer');
//       console.log(res.data, 'REFERRAL DATA');
//       setData(res.data);
//     } catch (err) {
//       console.log(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyCode = () => {
//     const code = data.referralCode;

//     if (!code) return;

//     Clipboard.setString(code);

//     if (Platform.OS === 'android') {
//       ToastAndroid.show('Referral code copied', ToastAndroid.SHORT);
//     } else {
//       Alert.alert('Copied', 'Referral code copied');
//     }
//   };

//   const shareReferral = async () => {
//     try {
//       await Share.share({
//         message: `Join PayO using my referral code: ${data.referralCode}`,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.bgApp }}>
//         <Text style={{ color: theme.colors.textMain, fontSize: 16 }}>
//           Loading...
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={[
//           styles.container,
//           {
//             flexGrow: 1,
//             paddingBottom: 100, // padding for bottom nav
//           },
//         ]}
//       >
//         {/* HEADER */}
//         <View style={styles.headerRow}>
//           <TouchableOpacity
//             style={styles.backBtn}
//             onPress={() => navigation.goBack()}
//             activeOpacity={0.8}
//           >
//             <Icon name="chevron-left" size={28} color={theme.colors.textMain} />
//           </TouchableOpacity>
//           <Text style={styles.header}>Refer & earn</Text>
//         </View>

//         {/* MAIN CARD */}
//         <View style={styles.card}>
//           <View style={styles.iconBox}>
//             <Icon name="users" size={24} color={theme.colors.textMuted} />
//           </View>

//           <Text style={styles.earn}>
//             Earn {data.rewardPerUser || 50} PAYO
//           </Text>

//           <Text style={styles.desc}>
//             For every friend who joins payo and completes their first transaction
//           </Text>
//         </View>

//         {/* REFERRAL CODE BOX */}
//         <View style={styles.codeBox}>
//           <Text style={styles.codeLabel}>Your Referal code</Text>
//           <Text style={styles.code}>{data.referralCode || 'N/A'}</Text>
//         </View>

//         {/* ACTIONS (Copy / Share) */}
//         <View style={styles.buttonRow}>
//           <TouchableOpacity
//             style={styles.btn}
//             onPress={copyCode}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.btnText}>Copy Code</Text>
//             <Icon name="copy" size={16} color={theme.colors.textMain} />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.btn}
//             onPress={shareReferral}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.btnText}>Share Link</Text>
//             <Icon name="external-link" size={16} color={theme.colors.textMain} />
//           </TouchableOpacity>
//         </View>

//         {/* STATS */}
//         <View style={styles.statsRow}>
//           <View style={styles.statBox}>
//             <Text style={styles.statValue}>{data.totalUsers || 0}</Text>
//             <Text style={styles.statLabel}>Total Referrals</Text>
//           </View>

//           <View style={styles.statBox}>
//             <Text style={styles.statValueGreen}>{data.totalRewards || 0}</Text>
//             <Text style={styles.statLabel}>Total rewards</Text>
//           </View>
//         </View>

//         {/* HOW IT WORKS */}
//         <View style={styles.info}>
//           <Text style={styles.infoTitle}>How it works :</Text>

//           <Text style={styles.infoText}>
//             1. Share your code - friend sign's up with it.
//           </Text>

//           <Text style={styles.infoText}>
//             2. Friend completes kyc veriifcation.
//           </Text>

//           <Text style={styles.infoText}>
//             3. Friend makes first transaction - you earn {data.rewardPerUser || 50} payo instantly.
//           </Text>
//         </View>
//       </ScrollView>

//       <BottomNav navigation={navigation} />
//     </SafeAreaView>
//   );
// }


////////////////////////////////////////



import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';

// 1. Importing responsive utilities from your project structure


// 2. Importing theme
import { theme } from '../MainTheme/theme';
import { moderateScale, verticalScale, windowWidth, scale } from '../../utils/responsive';
import { useAppSelector } from '../../redux/hooks';
import RNFS from 'react-native-fs';
// Adjust import path as needed


const ReferEarn = ({ navigation }) => {
  const walletData = useAppSelector((state) => state.deposit.walletData);
  const referralCode = walletData?.Referral_Code;
  const qrCodeUrl = walletData?.QR_Code_Link_Referral;

  const totalReferrals = 6;
  const totalRewards = 100;

  const handleCopy = () => {
    if (referralCode) {
      Clipboard.setString(referralCode);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Referral code copied!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Copied', 'Referral code copied to clipboard');
      }
    }
  };

  // const handleShare = async () => {
  //   try {
  //     let imageFilePath = null;

  //     // 1. If QR code link exists, download it temporarily to device storage
  //     if (qrCodeUrl) {
  //       const localPath = `${RNFS.CachesDirectoryPath}/referral_qr_${Date.now()}.png`;

  //       const downloadResult = await RNFS.downloadFile({
  //         fromUrl: qrCodeUrl,
  //         toFile: localPath,
  //       }).promise;

  //       if (downloadResult.statusCode === 200) {
  //         // Prepend file:// for react-native-share compatibility
  //         imageFilePath = Platform.OS === 'android' ? `file://${localPath}` : localPath;
  //       }
  //     }

  //     // 2. Prepare share options
  //     const shareOptions = {
  //       title: 'Share Referral',
  //       message: `Join PAYO and earn rewards! Use my referral code: ${referralCode} to get started.`,
  //       ...(imageFilePath && { url: imageFilePath }), // Attach image if available
  //       type: 'image/png',
  //     };

  //     // 3. Trigger Share UI
  //     await Share.open(shareOptions);
  //   } catch (error) {
  //     // react-native-share throws an error if user dismisses share modal (User did not share)
  //     if (error?.message !== 'User did not share') {
  //       console.log('Share error:', error);
  //     }
  //   }
  // };


  const handleShareReferral = async () => {
    try {
      let localImagePath = null;

      // 1. Download QR Code image to cache if URL exists
      if (qrCodeUrl) {
        const filePath = `${RNFS.CachesDirectoryPath}/referral_qr_${Date.now()}.png`;

        const downloadResult = await RNFS.downloadFile({
          fromUrl: qrCodeUrl,
          toFile: filePath,
        }).promise;

        if (downloadResult.statusCode === 200) {
          localImagePath = Platform.OS === 'android' ? `file://${filePath}` : filePath;
        }
      }

      // 2. Format share text message
      const shareMessage =
        `Join PAYO and earn rewards!\n\n` +
        `Referral Code: ${referralCode}\n\n` +
        `Scan the QR code or use the code above to get started.`;

      // 3. Build share options
      const shareOptions = {
        title: 'Share Referral Code',
        message: shareMessage,
        ...(localImagePath && { url: localImagePath }),
        type: 'image/png',
      };

      // 4. Open share modal
      await Share.open(shareOptions);
    } catch (error) {
      // Ignore user-dismissed modal errors
      if (error?.message !== 'User did not share') {
        console.log('Share Referral Error:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#F4F8F6" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon
              name="chevron-left"
              size={moderateScale(24)}
              color="#285CE0"
            />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Refer and Earn</Text>
            <Text style={styles.headerSubtitle}>Refer PAYO and earn rewards</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile')}
            style={styles.profileBtn}
            activeOpacity={0.7}
          >
            <Icon name="user" size={moderateScale(20)} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Hero Banner Section */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../../assets/images/addBankdetails/Refer and earn 2 1.png')}
            style={styles.heroImage}
          />
        </View>

        {/* Earn Promo Banner Card */}
        <View style={styles.promoCard}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>Earn 50 PAYO</Text>
            <Text style={styles.promoSubtitle}>
              For every friend who joins payo and completes their first transaction
            </Text>
          </View>
          <View style={styles.giftIconContainer}>
            <Image
              source={require('../../../assets/images/addBankdetails/Text.png')}
              style={styles.heroImage}
            />
          </View>
        </View>

        {/* Referral Code Box */}
        <View style={styles.referralBox}>
          <View style={styles.giftBoxIconBg}>
            <Icon name="gift" size={moderateScale(22)} color="#7F3DFF" />
          </View>
          <View style={styles.referralCodeTextContainer}>
            <Text style={styles.referralLabel}>Your Referral Code</Text>
            <Text style={styles.referralCode}>{referralCode}</Text>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleCopy} activeOpacity={0.8}>
            <Text style={styles.actionBtnText}>Copy address</Text>
            <Icon name="copy" size={moderateScale(16)} color="#333" style={styles.actionBtnIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleShare} activeOpacity={0.8}>
            <Text style={styles.actionBtnText}>Share address</Text>
            <Icon name="external-link" size={moderateScale(16)} color="#333" style={styles.actionBtnIcon} />
          </TouchableOpacity>
        </View>

        {/* Statistics Row */}
        <View style={styles.statsCard}>
          <View style={styles.statsColumn}>
            <Image
              source={require('../../../assets/images/addBankdetails/wallet (2).png')}
              style={styles.statsIcon}
            />
            <View>
              <Text style={styles.statsLabel}>Total Referrals</Text>
              <Text style={styles.statsValue}>{totalReferrals}</Text>
            </View>
          </View>

          <View style={styles.statsDivider} />

          <View style={styles.statsColumn}>
            <Image
              source={require('../../../assets/images/addBankdetails/Coins.png')}
              style={styles.statsIcon}
            />
            <View>
              <Text style={styles.statsLabel}>Total Rewards</Text>
              <Text style={styles.statsValue}>{totalRewards}</Text>
            </View>
          </View>
        </View>

        {/* Instructions Panel "How it Works" */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsHeader}>How it works :</Text>

          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>1. Share your referral code:</Text>
            <Text style={styles.stepDesc}>Invite friends to join PAYO.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>2. Friend completes KYC:</Text>
            <Text style={styles.stepDesc}>Securely verify their account.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>3. First transaction completed:</Text>
            <Text style={styles.stepDesc}>Receive 50 PAYO instantly in your wallet.</Text>
          </View>
        </View>

        {/* Disclaimer Banner Card */}
        <View style={styles.disclaimerCard}>
          <Icon name="info" size={moderateScale(20)} color="#7F3DFF" />
          <Text style={styles.disclaimerText}>
            The PAYO amount you receive may vary slightly due to market fluctuations
          </Text>
          <Image
            source={require('../../../assets/images/addBankdetails/wallet (1).png')}
            style={styles.bottom}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReferEarn;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F8F6',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
  },

  // Header Setup
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(50),
    // marginTop: verticalScale(),
  },
  backBtn: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(21),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1A1D21',
  },
  headerSubtitle: {
    fontSize: moderateScale(12),
    color: '#848D9A',
    marginTop: verticalScale(2),
  },
  profileBtn: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(21),
    backgroundColor: '#285CE0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Hero Image Banner Frame
  heroContainer: {
    width: '100%',
    height: verticalScale(270),
    borderWidth: 0.1,
    // borderColor: '#2962FF',
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    marginTop: verticalScale(20),
    backgroundColor: '#FFF',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Promotion Information Banner Card
  promoCard: {
    backgroundColor: '#5655FF',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(17),
    ...Platform.select({
      ios: {
        shadowColor: '#5655FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  promoTextContainer: {
    flex: 0.8,
  },
  promoTitle: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: '#FFF',
    marginBottom: verticalScale(4),
  },
  promoSubtitle: {
    fontSize: moderateScale(12),
    color: '#E0E0FF',
    lineHeight: moderateScale(16),
  },
  giftIconContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Referral Code Input Container
  referralBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#adadad',
    borderStyle: 'dashed',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginTop: verticalScale(20),
  },
  giftBoxIconBg: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(12),
    backgroundColor: '#f3ecff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  referralCodeTextContainer: {
    flex: 1,
  },
  referralLabel: {
    fontSize: moderateScale(12),
    color: '#7F3DFF',
    fontWeight: '600',
  },
  referralCode: {
    fontSize: moderateScale(16),
    color: '#1A1D21',
    fontWeight: '800',
    marginTop: verticalScale(2),
  },

  // Action Buttons Setup
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(15),
  },
  actionBtn: {
    width: '48%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E4E8EE',
    borderRadius: moderateScale(12),
    height: verticalScale(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  actionBtnText: {
    fontSize: moderateScale(13),
    color: '#333333',
    fontWeight: '600',
  },
  actionBtnIcon: {
    marginLeft: moderateScale(8),
  },

  // Stats Breakdown Styling
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#b49dfb',
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(16),
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  statsColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsIcon: {
    marginRight: moderateScale(10),
  },
  statsLabel: {
    fontSize: moderateScale(11),
    color: '#6E7179',
    fontWeight: '500',
  },
  statsValue: {
    fontSize: moderateScale(15),
    color: '#285CE0',
    fontWeight: '800',
    marginTop: verticalScale(2),
  },
  statsDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E4DBFF',
  },

  // Instructions Setup
  instructionsCard: {
    backgroundColor: '#F7F8F9',
    borderWidth: 1,
    borderColor: '#E4E8EE',
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    marginTop: verticalScale(20),
  },
  instructionsHeader: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#7F3DFF',
    marginBottom: verticalScale(12),
  },
  stepContainer: {
    marginBottom: verticalScale(14),
  },
  stepTitle: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#1A1D21',
  },
  stepDesc: {
    fontSize: moderateScale(12),
    color: '#6E7179',
    marginTop: verticalScale(2),
    paddingLeft: moderateScale(14),
  },

  // Disclaimer Layout Area
  disclaimerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEBFF',
    borderWidth: 1,
    borderColor: '#D4C9FF',
    borderRadius: moderateScale(16),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
    marginTop: verticalScale(20),
  },
  disclaimerText: {
    flex: 1,
    fontSize: moderateScale(11),
    color: '#5E34BA',
    fontWeight: '500',
    lineHeight: moderateScale(16),
    marginHorizontal: moderateScale(12),
  },
  bottom: {
    width: 50,
    height: 50
  }
});