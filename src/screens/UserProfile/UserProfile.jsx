



// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,

//   BackHandler,
//   ScrollView,
//   ToastAndroid,
//   Platform,
//   Image
// } from 'react-native';


// import { SafeAreaView } from 'react-native-safe-area-context';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import * as Keychain from 'react-native-keychain'; // ✅ added
// import styles from './UserProfileStyling';
// import api from '../../api/axios';
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Clipboard from "@react-native-clipboard/clipboard";
// import Share from "react-native-share";
// import RNFS from "react-native-fs";
// import Icon from "react-native-vector-icons/Feather";
// import { useFocusEffect } from '@react-navigation/native';
// import BottomNav from '../components/bottomNav';

// export default function UserProfile({ navigation }) {

//   const [profiledata, setProfileData] = useState({});
//   const [bankData, setBankData] = useState([]);
//   const [address, setAddress] = useState("");
//   const [qr, setQr] = useState(null);

//   useEffect(() => {
//     const backAction = () => {
//       if (navigation.canGoBack()) {
//         navigation.goBack();
//       }
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backAction
//     );

//     return () => backHandler.remove();

//   }, [navigation]);

//   const fetchQr = async () => {
//     try {
//       const res = await api.get("api/wallet/generate-address");

//       const data = res.data;

//       const qrImage = data.qr?.startsWith("data:image")
//         ? data.qr
//         : `data:image/png;base64,${data.qr}`;

//       setQr(qrImage);
//       setAddress(data.address);

//       return { qrImage, address: data.address };

//     } catch (err) {
//       console.log("QR ERROR:", err.message);
//       return null;
//     }
//   };

//   const fetchProfileData = async () => {
//     try {
//       const res = await api.get('/api/wallet/profile');
//       setProfileData(res?.data?.data);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchBankDetails = async () => {
//     try {
//       const res = await api.get('/api/bank/all-banks');
//       setBankData(res?.data?.data || []);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchProfileData();
//       fetchBankDetails();
//     }, [])
//   );

//   const maskAccount = (acc) => {
//     if (!acc) return "";
//     return acc.slice(-4);
//   };

//   const handleCopy = () => {
//     const walletAddress = profiledata?.walletAddress;

//     if (!walletAddress) return;

//     Clipboard.setString(walletAddress);

//     if (Platform.OS === "android") {
//       ToastAndroid.show("WalletID copied", ToastAndroid.SHORT);
//     }
//   };

//   const handleShare = async () => {
//     try {

//       const result = await fetchQr();
//       if (!result) return;

//       const { qrImage, address } = result;

//       const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
//       const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

//       await RNFS.writeFile(filePath, base64Data, "base64");

//       await Share.open({
//         url: "file://" + filePath,
//         message: `Send PAYO to this WalletID:\n${address}`,
//       });

//     } catch (error) {
//       console.log("Share error:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {

//       await Keychain.resetGenericPassword();

//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Login' }],
//       });

//     } catch (error) {
//       console.log('Logout error:', error);
//     }
//   };

//   return (
//     <SafeAreaView
//       style={{ flex: 1 }}
//       edges={['top', 'bottom']}>

//       <View style={styles.container}>

//         {/* HEADER */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("Main")}
//           >
//             <Icon
//               name="chevron-left"
//               size={28}
//               color="#ffffff"
//             />
//           </TouchableOpacity>

//           <Text style={styles.title}>Profile</Text>

//           <TouchableOpacity
//             onPress={() => navigation.navigate("HelpCenter")}
//             style={styles.helpButton}
//           >
//             <Image
//               source={require('../../../assets/images/helpdesk.png')}
//               style={styles.helpImage}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>
//         {/* PROFILE */}
//         <View style={styles.profileSection}>
//           <View style={styles.profileCircle}>
//             <Text style={styles.profileText}>👤</Text>
//           </View>

//           <Text style={styles.phone}>+91 {profiledata?.mobile}</Text>
//           <Text style={styles.verified}>• KYC VERIFIED</Text>
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           contentContainerStyle={{ paddingBottom: hp('0%') }}
//         >

//           {/* BALANCE CARD */}
//           <View style={styles.balanceCard}>
//             <View style={{ marginLeft: 8 }}>
//               <Text style={styles.label}>Balance</Text>
//               <Text style={styles.balance}>
//                 {profiledata?.balance} <Text style={styles.token}>PAYO</Text>
//               </Text>
//             </View>

//             <View style={styles.divider} />

//             <View style={styles.transactionRow}>
//               <Icon name="arrow-up" size={30} color="#E25C5C" />

//               <View style={{ marginLeft: 8 }}>
//                 <Text style={styles.label}>Transactions</Text>
//                 <Text style={styles.transactions}>
//                   {profiledata?.transactionCount}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           {/* REFERRAL */}
//           <View style={styles.referralBox}>
//             <Text style={styles.refLabel}>Your Referral code</Text>
//             <Text style={styles.refCode}>{profiledata?.referralCode}</Text>
//           </View>

//           {/* BUTTONS */}
//           <View style={styles.buttonRow}>
//             <TouchableOpacity style={styles.btn} onPress={handleCopy}>
//               <Text style={styles.btnText}>Copy WalletID</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.btn} onPress={handleShare}>
//               <Text style={styles.btnText}>Share WalletID</Text>
//             </TouchableOpacity>
//           </View>



//           {/* PERSONAL INFO */}

//           <Text style={styles.sectionTitle}>Personal Information</Text>

//           <View style={styles.card}>

//             <View style={styles.row}>
//               <Text style={styles.labelItem}>Name</Text>
//               <Text style={styles.value}>
//                 {profiledata?.name || "N/A"}
//               </Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.labelItem}>Email</Text>
//               <Text style={styles.value}>
//                 {profiledata?.email || "N/A"}
//               </Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.labelItem}>Linked Mobile</Text>
//               <Text style={styles.value}>+91 {profiledata?.mobile}</Text>
//             </View>

//           </View>

//           {/* ACCOUNT */}

//           {/* ================= BANK SECTION ================= */}

//           <Text style={styles.sectionTitle}>Linked Bank Accounts</Text>

//           {bankData && bankData.length > 0 ? (
//             <>
//               {bankData.map((bank, index) => (
//                 <View key={index} style={styles.bankCard}>
//                   <View style={styles.bankLeft}>
//                     <View style={styles.bankIcon}>
//   <MaterialCommunityIcons
//     name="bank"
//     size={22}
//     color="#fff"
//   />
// </View>

//                     <View>
//                       <Text style={styles.bankName}>
//                         {bank.bankName} - {maskAccount(bank.accountNumber)}
//                       </Text>

//                       <Text style={styles.bankSub}>
//                         Bank Account
//                       </Text>
//                     </View>
//                   </View>

//                   <Icon name="chevron-right" size={20} color="#fff" />
//                 </View>
//               ))}

//               <TouchableOpacity
//                 style={styles.addBankBtn}
//                 onPress={() => navigation.navigate("AddBankHome")}
//               >
//                 <Icon name="plus-circle" size={20} color="#fff" />

//                 <Text style={styles.addBankText}>
//                   Add Bank Account
//                 </Text>

//                 <Icon name="chevron-right" size={20} color="#fff" />
//               </TouchableOpacity>
//             </>
//           ) : (
//             <TouchableOpacity
//               style={styles.addBankBtn}
//               onPress={() => navigation.navigate("AddBankHome")}
//             >
//               <Icon name="plus-circle" size={20} color="#fff" />

//               <Text style={styles.addBankText}>
//                 Add Bank Account
//               </Text>

//               <Icon name="chevron-right" size={20} color="#fff" />
//             </TouchableOpacity>
//           )}

//           <Text style={styles.sectionTitle}>Account</Text>

//           <View style={styles.card}>

//             <View style={styles.row}>
//               <Text style={styles.labelItem}>Wallet Address</Text>
//               <Text style={styles.value}>{profiledata?.walletAddress}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.labelItem}>Wallet ID</Text>
//               <Text style={styles.value}>{profiledata?.walletId}</Text>
//             </View>

//           </View>

//                      <Text style={styles.sectionTitle}>Security</Text>

//            <View style={styles.card}>
//              <View style={styles.row}>
//                  <Text style={styles.item}>KYC Verification</Text>
//          <Text style={styles.green}>Approved ›</Text>
//        </View>

//            <View style={styles.row}>
//            <Text style={styles.item}>Linked Mobile</Text>
//               <Text style={styles.value}>+91 {profiledata?.mobile}</Text>
//            </View>
//          </View> 

//           {/* LOGOUT */}

//           <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//             <Text style={styles.logoutText}>Logout</Text>
//           </TouchableOpacity>

//         </ScrollView>
//       </View>

//       <BottomNav
//         navigation={navigation}
//         currentRoute="Scan"
//       />

//     </SafeAreaView>
//   );
// }



import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  ToastAndroid,
  Platform,
  Image,
  Switch,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './UserProfileStyling';
import api from '../../api/axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import BottomNav from '../components/bottomNav';
import { verticalScale } from '../../utils/responsive';

export default function UserProfile({ route, navigation ,isEditable: propIsEditable}) {
 const isEditable = propIsEditable ?? route.params?.isEditable ?? false;
  
  console.log(isEditable, "isEditable", route?.params);
  const [profiledata, setProfileData] = useState({});
  const [bankData, setBankData] = useState([]);
  const [address, setAddress] = useState('');
  const [qr, setQr] = useState(null);
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

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

  const fetchProfileData = async () => {
    try {
      const res = await api.get('/api/wallet/profile');
      setProfileData(res?.data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchBankDetails = async () => {
    try {
      const res = await api.get('/api/bank/all-banks');
      setBankData(res?.data?.data || []);
    } catch (err) {
      console.log(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
      fetchBankDetails();
    }, [])
  );

  const handleCopy = () => {
    const walletAddress = profiledata?.walletAddress || '0xDummyAddress123';
    if (!walletAddress) return;
    Clipboard.setString(walletAddress);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Wallet Address copied', ToastAndroid.SHORT);
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
        message: `Send PAYO to this WalletID:\n${address}`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F6F9' }} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity 
        onPress={() => navigation.navigate('Main', { screen: 'Home' })}
          style={styles.backButton}>
            <Icon name="chevron-left" size={24} color="#285CE0" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>Manage your account and preferences</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}  onPress={() => navigation.navigate('Notifications')} >
              <Icon name="bell" size={20} color="#4F46E5" />
              {/* <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View> */}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconBtn}
              onPress={() => navigation.navigate('Settings')}
            >
              <Icon name="settings" size={20} color="#4F46E5" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: isEditable ? 120 : 50 }} 
        >
          {/* PROFILE CARD */}
          <ImageBackground
            source={require('../../../assets/images/profile/backbgdImage.png')} 
            style={styles.profileCard}
            imageStyle={styles.profileCardBgImage}
          >
            <View style={styles.profileImageContainer}>
              <View style={styles.profileArcBorder} />
              <View style={styles.profileCircle}>
                <Text style={styles.profileAvatarText}>👤</Text>
              </View>
              <View style={styles.editIconBadge}>
                <Icon name="edit-2" size={12} color="#4F46E5" />
              </View>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profiledata?.name || 'User 1'}</Text>
              <Text style={styles.profilePhone}>+91 {profiledata?.mobile || '1324 567 890'}</Text>
              <View style={styles.kycBadge}>
                <Text style={styles.kycText}>• KYC NOT VERIFIED</Text>
              </View>
            </View>
          </ImageBackground>

          {/* BALANCE & TRANSACTIONS */}
          <View style={styles.balanceContainer}>
            <View style={styles.balanceHalf}>
              <View style={styles.statIconWrapper}>
                <Image source={require('../../../assets/images/Wallet Icon.png')} style={styles.statIcon} />
              </View>
              <View>
                <Text style={styles.statLabel}>Balance</Text>
                <Text style={styles.statValue}>{profiledata?.balance || '100.0'} <Text style={styles.token}>PAYO</Text></Text>
              </View>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.balanceHalf}>
              <View style={[styles.statIconWrapper, styles.statIconWrapperRed]}>
                <Image source={require('../../../assets/images/Arrow_left.png')} style={styles.statIcon} />
              </View>
              <View>
                <Text style={styles.statLabel}>Transactions</Text>
                <Text style={styles.statValue}>{profiledata?.transactionCount || '0'}</Text>
              </View>
            </View>
          </View>

          {/* REFERRAL CODE */}
          <View style={styles.referralCard}>
            <View style={styles.statIconWrapper}>
              <Image source={require('../../../assets/images/Reward Icon.png')} style={styles.statIcon} />
            </View>
            <View>
              <Text style={styles.referralLabel}>Your Referral Code</Text>
              <Text style={styles.referralCode}>{profiledata?.referralCode || 'PAYO7630'}</Text>
            </View>
          </View>

          {/* ACTIONS */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtnOutline} onPress={handleCopy}>
              <Text style={styles.actionBtnText}>Copy address</Text>
              <Image source={require('../../../assets/images/profile/Content Copy Icon.png')} style={styles.copyIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtnOutline} onPress={handleShare}>
              <Text style={styles.actionBtnText}>Share address</Text>
              <Image source={require('../../../assets/images/profile/share.png')} style={styles.shareIcon} />
            </TouchableOpacity>
          </View>

          {/* ADD BANK BUTTON */}
          <TouchableOpacity
            style={styles.addBankPrimaryBtn}
            onPress={() => navigation.navigate('AddBankHome')}
          >
            <Icon name="plus-circle" size={18} color="#fff" style={styles.leftIcon} />
            <Text style={styles.addBankPrimaryText}>Add Bank Account</Text>
            <Icon name="chevron-right" size={18} color="#fff" style={styles.rightIcon} />
          </TouchableOpacity>

          {/* PERSONAL INFO */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View All {'>'}</Text></TouchableOpacity>
          </View>
          <View style={styles.listCard}>
            <View style={styles.listItem}>
              <Text style={styles.listLabel}>Name</Text>
              <Text style={styles.listValue}>{profiledata?.name || 'Raju'}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listLabel}>Email</Text>
              <Text style={styles.listValue}>{profiledata?.email || 'Raju@gmail.com'}</Text>
            </View>
            <View style={[styles.listItem, { borderBottomWidth: 0, paddingBottom: verticalScale(14)}]}>
              <Text style={styles.listLabel}>Linked Mobile</Text>
              <Text style={styles.listValue}>+91 {profiledata?.mobile || '8332 285 718'}</Text>
            </View>
          </View>

          {/* ACCOUNT */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View All {'>'}</Text></TouchableOpacity>
          </View>
          <View style={styles.listCard}>
            <TouchableOpacity style={styles.listItemTouch}>
              <Text style={styles.listLabel}>KYC Verification</Text>
              <Text style={styles.dangerText}>Not Approved {'>'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItemTouch}>
              <Text style={styles.listLabel}>Personal Information</Text>
              <Icon name="chevron-right" size={16} color="#9CA3AF" />
            </TouchableOpacity>
            <View style={[styles.listItem, { borderBottomWidth: 0, paddingBottom: verticalScale(14) }]}>
              <Text style={styles.listLabel}>Linked Mobile</Text>
              <Text style={styles.listValue}>+91 {profiledata?.mobile || '1324 567 890'}</Text>
            </View>
          </View>

          {/* SECURITY */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Security</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View All {'>'}</Text></TouchableOpacity>
          </View>
          <View style={styles.listCard}>
            <TouchableOpacity style={styles.listItemTouch}>
              <Text style={styles.listLabel}>Change PIN</Text>
              <Icon name="chevron-right" size={16} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItemTouch}>
              <Text style={styles.listLabel}>Change Password</Text>
              <Icon name="chevron-right" size={16} color="#9CA3AF" />
            </TouchableOpacity>
            <View style={styles.listItemTouch}>
              <Text style={styles.listLabel}>Biometric Login</Text>
              <Switch
                trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                thumbColor={'#ffffff'}
                onValueChange={() => setBiometricEnabled(!biometricEnabled)}
                value={biometricEnabled}
              />
            </View>
            <View style={[styles.listItem, { borderBottomWidth: 0, paddingBottom: verticalScale(14), paddingTop: 12 }]}>
              <Text style={styles.listLabel}>Change Mobile No.</Text>
              <Text style={styles.listValue}>+91 {profiledata?.mobile || '1324 567 890'}</Text>
            </View>
          </View>

          {/* SECURITY BANNER */}
          <View style={styles.securityBanner}>
            <Image source={require('../../../assets/images/Security-Icon.png')} style={styles.bannerIcon} />
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>Secure & Trusted</Text>
              <Text style={styles.bannerSub}>Your account is protected with bank-grade security.</Text>
            </View>
            <Image source={require('../../../assets/images/locksecure.png')} style={styles.watermarkIcon} />
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}





// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   BackHandler,
//   ScrollView,
//   ToastAndroid,
//   Platform,
//   Image,
//   Switch,
//   ImageBackground
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import * as Keychain from 'react-native-keychain';
// import styles from './UserProfileStyling';
// import api from '../../api/axios';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Clipboard from '@react-native-clipboard/clipboard';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';
// import Icon from 'react-native-vector-icons/Feather';
// import { useFocusEffect } from '@react-navigation/native';
// import BottomNav from '../components/bottomNav';
// import { verticalScale } from '../../utils/responsive';

// export default function UserProfile({ navigation }) {
//   const [profiledata, setProfileData] = useState({});
//   const [bankData, setBankData] = useState([]);
//   const [address, setAddress] = useState('');
//   const [qr, setQr] = useState(null);
//   const [biometricEnabled, setBiometricEnabled] = useState(true);

//   useEffect(() => {
//     const backAction = () => {
//       if (navigation.canGoBack()) {
//         navigation.goBack();
//       }
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
//     return () => backHandler.remove();
//   }, [navigation]);

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

//   const fetchProfileData = async () => {
//     try {
//       const res = await api.get('/api/wallet/profile');
//       setProfileData(res?.data?.data);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchBankDetails = async () => {
//     try {
//       const res = await api.get('/api/bank/all-banks');
//       setBankData(res?.data?.data || []);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchProfileData();
//       fetchBankDetails();
//     }, [])
//   );

//   const handleCopy = () => {
//     const walletAddress = profiledata?.walletAddress || '0xDummyAddress123';
//     if (!walletAddress) return;
//     Clipboard.setString(walletAddress);
//     if (Platform.OS === 'android') {
//       ToastAndroid.show('Wallet Address copied', ToastAndroid.SHORT);
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
//         message: `Send PAYO to this WalletID:\n${address}`,
//       });
//     } catch (error) {
//       console.log('Share error:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await Keychain.resetGenericPassword();
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Login' }],
//       });
//     } catch (error) {
//       console.log('Logout error:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F6F9' }} edges={['top', 'bottom']}>
//       <View style={styles.container}>
//         {/* HEADER */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.backButton}>
//             <Icon name="chevron-left" size={24} color="#1F2937" />
//           </TouchableOpacity>
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.title}>Profile</Text>
//             <Text style={styles.subtitle}>Manage your account and preferences</Text>
//           </View>
//           <View style={styles.headerIcons}>
//             <TouchableOpacity style={styles.iconBtn}>
//               <Icon name="bell" size={20} color="#4F46E5" />
//               <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
//             </TouchableOpacity>
//             <TouchableOpacity 
//   style={styles.iconBtn}
//   onPress={() => navigation.navigate('Settings')}
// >
//   <Icon name="settings" size={20} color="#4F46E5" />
// </TouchableOpacity>
//           </View>
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           contentContainerStyle={{ paddingBottom: 120 }} // Room for the sticky BottomNav overlay
//         >
//           {/* PROFILE CARD */}
//           {/* <View style={styles.profileCard}>
//             <View style={styles.profileImageContainer}>
              
//               <View style={styles.profileArcBorder} />
//               <View style={styles.profileCircle}>
//                 <Text style={styles.profileAvatarText}>👤</Text>
//               </View>
//               <View style={styles.editIconBadge}>
//                 <Icon name="edit-2" size={12} color="#4F46E5" />
//               </View>
//             </View>
//             <View style={styles.profileInfo}>
//               <Text style={styles.profileName}>{profiledata?.name || 'User 1'}</Text>
//               <Text style={styles.profilePhone}>+91 {profiledata?.mobile || '1324 567 890'}</Text>
//               <View style={styles.kycBadge}>
//                 <Text style={styles.kycText}>• KYC NOT VERIFIED</Text>
//               </View>
//             </View>
//           </View> */}

//           <ImageBackground
//   source={require('../../../assets/images/profile/backbgdImage.png')} // Adjust this path to where you saved the wavy grey image
//   style={styles.profileCard}
//   imageStyle={styles.profileCardBgImage}
// >
//   <View style={styles.profileImageContainer}>
//     {/* Dynamic status ring mockup */}
//     <View style={styles.profileArcBorder} />
//     <View style={styles.profileCircle}>
//       <Text style={styles.profileAvatarText}>👤</Text>
//     </View>
//     <View style={styles.editIconBadge}>
//       <Icon name="edit-2" size={12} color="#4F46E5" />
//     </View>
//   </View>
  
//   <View style={styles.profileInfo}>
//     <Text style={styles.profileName}>{profiledata?.name || 'User 1'}</Text>
//     <Text style={styles.profilePhone}>+91 {profiledata?.mobile || '1324 567 890'}</Text>
//     <View style={styles.kycBadge}>
//       <Text style={styles.kycText}>• KYC NOT VERIFIED</Text>
//     </View>
//   </View>
// </ImageBackground>

//           {/* BALANCE & TRANSACTIONS */}
//           <View style={styles.balanceContainer}>
//             <View style={styles.balanceHalf}>
//               <View style={styles.statIconWrapper}>
//                 <Image source={require('../../../assets/images/Wallet Icon.png')} style={styles.statIcon} />
//               </View>
//               <View>
//                 <Text style={styles.statLabel}>Balance</Text>
//                 <Text style={styles.statValue}>{profiledata?.balance || '100.0'} <Text style={styles.token}>PAYO</Text></Text>
//               </View>
//             </View>
//             <View style={styles.verticalDivider} />
//             <View style={styles.balanceHalf}>
//               <View style={[styles.statIconWrapper, styles.statIconWrapperRed]}>
//                 <Image source={require('../../../assets/images/Arrow_left.png')} style={styles.statIcon} />
//               </View>
//               <View>
//                 <Text style={styles.statLabel}>Transactions</Text>
//                 <Text style={styles.statValue}>{profiledata?.transactionCount || '0'}</Text>
//               </View>
//             </View>
//           </View>

//           {/* REFERRAL CODE */}
//           <View style={styles.referralCard}>
//              <View style={styles.statIconWrapper}>
//                 <Image source={require('../../../assets/images/Reward Icon.png')} style={styles.statIcon} />
//               </View>
//             {/* <Image source={require('../../../assets/images/Reward Icon.png')}style={styles.statIcon}/> */}
//             <View>
//               <Text style={styles.referralLabel}>Your Referral Code</Text>
//               <Text style={styles.referralCode}>{profiledata?.referralCode || 'PAYO7630'}</Text>
//             </View>
//           </View>

//           {/* ACTIONS */}
//           <View style={styles.actionRow}>
//             <TouchableOpacity style={styles.actionBtnOutline} onPress={handleCopy}>
//               <Text style={styles.actionBtnText}>Copy address</Text>
//               {/* <Icon name="copy" size={16} color="#4F46E5" /> */}
//               <Image source={require('../../../assets/images/profile/Content Copy Icon.png')} style={styles.copyIcon} />

//             </TouchableOpacity>
//             <TouchableOpacity style={styles.actionBtnOutline} onPress={handleShare}>
//               <Text style={styles.actionBtnText}>Share address</Text>
//               {/* <Icon name="share" size={16} color="#4F46E5" /> */}
//               <Image source={require('../../../assets/images/profile/share.png')} style={styles.shareIcon} />
//             </TouchableOpacity>
//           </View>

//           {/* ADD BANK BUTTON */}
//          <TouchableOpacity
//   style={styles.addBankPrimaryBtn}
//   onPress={() => navigation.navigate('AddBankHome')}
// >
//   <Icon name="plus-circle" size={18} color="#fff" style={styles.leftIcon} />
//   <Text style={styles.addBankPrimaryText}>Add Bank Account</Text>
//   <Icon name="chevron-right" size={18} color="#fff" style={styles.rightIcon} />
// </TouchableOpacity>

//           {/* PERSONAL INFO */}
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Personal Information</Text>
//             <TouchableOpacity><Text style={styles.viewAll}>View All {'>'}</Text></TouchableOpacity>
//           </View>
//           <View style={styles.listCard}>
//             <View style={styles.listItem}>
//               <Text style={styles.listLabel}>Name</Text>
//               <Text style={styles.listValue}>{profiledata?.name || 'Raju'}</Text>
//             </View>
//             <View style={styles.listItem}>
//               <Text style={styles.listLabel}>Email</Text>
//               <Text style={styles.listValue}>{profiledata?.email || 'Raju@gmail.com'}</Text>
//             </View>
//             <View style={[styles.listItem, { borderBottomWidth: 0, paddingBottom: verticalScale(14)}]}>
//               <Text style={styles.listLabel}>Linked Mobile</Text>
//               <Text style={styles.listValue}>+91 {profiledata?.mobile || '8332 285 718'}</Text>
//             </View>
//           </View>

//           {/* ACCOUNT */}
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Account</Text>
//             <TouchableOpacity><Text style={styles.viewAll}>View All {'>'}</Text></TouchableOpacity>
//           </View>
//           <View style={styles.listCard}>
//             <TouchableOpacity style={styles.listItemTouch}>
//               <Text style={styles.listLabel}>KYC Verification</Text>
//               <Text style={styles.dangerText}>Not Approved {'>'}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.listItemTouch}>
//               <Text style={styles.listLabel}>Personal Information</Text>
//               <Icon name="chevron-right" size={16} color="#9CA3AF" />
//             </TouchableOpacity>
//             <View style={[styles.listItem, { borderBottomWidth: 0, paddingBottom: verticalScale(14) }]}>
//               <Text style={styles.listLabel}>Linked Mobile</Text>
//               <Text style={styles.listValue}>+91 {profiledata?.mobile || '1324 567 890'}</Text>
//             </View>
//           </View>

//           {/* SECURITY */}
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Security</Text>
//             <TouchableOpacity><Text style={styles.viewAll}>View All {'>'}</Text></TouchableOpacity>
//           </View>
//           <View style={styles.listCard}>
//             <TouchableOpacity style={styles.listItemTouch}>
//               <Text style={styles.listLabel}>Change PIN</Text>
//               <Icon name="chevron-right" size={16} color="#9CA3AF" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.listItemTouch}>
//               <Text style={styles.listLabel}>Change Password</Text>
//               <Icon name="chevron-right" size={16} color="#9CA3AF" />
//             </TouchableOpacity>
//             <View style={styles.listItemTouch}>
//               <Text style={styles.listLabel}>Biometric Login</Text>
//               <Switch
//                 trackColor={{ false: '#D1D5DB', true: '#10B981' }}
//                 thumbColor={'#ffffff'}
//                 onValueChange={() => setBiometricEnabled(!biometricEnabled)}
//                 value={biometricEnabled}
//               />
//             </View>
//             <View style={[styles.listItem, { borderBottomWidth: 0, paddingBottom: verticalScale(14), paddingTop: 12 }]}>
//               <Text style={styles.listLabel}>Change Mobile No.</Text>
//               <Text style={styles.listValue}>+91 {profiledata?.mobile || '1324 567 890'}</Text>
//             </View>
//           </View>

//           {/* SECURITY BANNER */}
//           {/* SECURITY BANNER */}
// <View style={styles.securityBanner}>
//   <Image source={require('../../../assets/images/Security-Icon.png')} style={styles.bannerIcon} />
//   <View style={styles.bannerTextContainer}>
//     <Text style={styles.bannerTitle}>Secure & Trusted</Text>
//     <Text style={styles.bannerSub}>Your account is protected with bank-grade security.</Text>
//   </View>
//   <Image source={require('../../../assets/images/locksecure.png')} style={styles.watermarkIcon} />
// </View>

// {/* LOGOUT BUTTON - IDENTICAL TO ADD BANK UI */}
// <TouchableOpacity style={styles.logoutPrimaryBtn} onPress={handleLogout}>
//   <Icon name="log-out" size={18} color="#fff" style={styles.leftIcon} />
//   <Text style={styles.logoutPrimaryText}>Logout Account</Text>
//   <Icon name="chevron-right" size={18} color="#fff" style={styles.rightIcon} />
// </TouchableOpacity>

//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }

///////////////////////////////////////////////////////// sowmya ///////////////////////////////////

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   BackHandler,
//   ScrollView,
//   ToastAndroid,
//   Platform,
//   Image,
//   Switch,
//   ImageBackground
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import * as Keychain from 'react-native-keychain';
// import styles from './UserProfileStyling';
// import api from '../../api/axios';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Clipboard from '@react-native-clipboard/clipboard';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';
// import Icon from 'react-native-vector-icons/Feather';
// import { useFocusEffect } from '@react-navigation/native';
// import BottomNav from '../components/bottomNav';
// import { verticalScale } from '../../utils/responsive';

// export default function UserProfile ({ navigation }) {
//   const [profiledata, setProfileData] = useState({});
//   const [bankData, setBankData] = useState([]);
//   const [address, setAddress] = useState('');
//   const [qr, setQr] = useState(null);
//   const [biometricEnabled, setBiometricEnabled] = useState(true);

//   useEffect(() => {
//     const backAction = () => {
//       if (navigation.canGoBack()) {
//         navigation.goBack();
//       }
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
//     return () => backHandler.remove();
//   }, [navigation]);

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

//   const fetchProfileData = async () => {
//     try {
//       const res = await api.get('/api/wallet/profile');
//       setProfileData(res?.data?.data);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchBankDetails = async () => {
//     try {
//       const res = await api.get('/api/bank/all-banks');
//       setBankData(res?.data?.data || []);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchProfileData();
//       fetchBankDetails();
//     }, [])
//   );

//   const handleCopy = () => {
//     const walletAddress = profiledata?.walletAddress || '0xDummyAddress123';
//     if (!walletAddress) return;
//     Clipboard.setString(walletAddress);
//     if (Platform.OS === 'android') {
//       ToastAndroid.show('Wallet Address copied', ToastAndroid.SHORT);
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
//         message: `Send PAYO to this WalletID:\n${address}`,
//       });
//     } catch (error) {
//       console.log('Share error:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await Keychain.resetGenericPassword();
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Login' }],
//       });
//     } catch (error) {
//       console.log('Logout error:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F6F9' }} edges={['top', 'bottom']}>
//       <View style={styles.container}>
//         {/* HEADER */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Icon name="chevron-left" size={24} color="#1F2937" />
//           </TouchableOpacity>
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.title}>Profile</Text>
//             <Text style={styles.subtitle}>Manage your account and preferences</Text>
//           </View>
//           <View style={styles.headerIcons}>
//             <TouchableOpacity style={styles.iconBtn}>
//               <Icon name="bell" size={20} color="#4F46E5" />
//               <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.iconBtn}>
//               <Icon name="settings" size={20} color="#4F46E5" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           contentContainerStyle={{ paddingBottom: 120 }} // Room for the sticky BottomNav overlay
//         >
//           {/* PROFILE CARD */}
//           {/* <View style={styles.profileCard}>
//             <View style={styles.profileImageContainer}>
              
//               <View style={styles.profileArcBorder} />
//               <View style={styles.profileCircle}>
//                 <Text style={styles.profileAvatarText}>👤</Text>
//               </View>
//               <View style={styles.editIconBadge}>
//                 <Icon name="edit-2" size={12} color="#4F46E5" />
//               </View>
//             </View>
//             <View style={styles.profileInfo}>
//               <Text style={styles.profileName}>{profiledata?.name || 'User 1'}</Text>
//               <Text style={styles.profilePhone}>+91 {profiledata?.mobile || '1324 567 890'}</Text>
//               <View style={styles.kycBadge}>
//                 <Text style={styles.kycText}>• KYC NOT VERIFIED</Text>
//               </View>
//             </View>
//           </View> */}

//           <ImageBackground
//             source={require('../../../assets/images/profile/backbgdImage.png')} // Adjust this path to where you saved the wavy grey image
//             style={styles.profileCard}
//             imageStyle={styles.profileCardBgImage}
//           >
//             <View style={styles.profileImageContainer}>
//               {/* Dynamic status ring mockup */}
//               <View style={styles.profileArcBorder} />
//               <View style={styles.profileCircle}>
//                 <Text style={styles.profileAvatarText}>👤</Text>
//               </View>
//               <View style={styles.editIconBadge}>
//                 <Icon name="edit-2" size={12} color="#4F46E5" />
//               </View>
//             </View>

//             <View style={styles.profileInfo}>
//               <Text style={styles.profileName}>{profiledata?.name || 'User 1'}</Text>
//               <Text style={styles.profilePhone}>+91 {profiledata?.mobile || '1324 567 890'}</Text>
//               <View style={styles.kycBadge}>
//                 <Text style={styles.kycText}>• KYC NOT VERIFIED</Text>
//               </View>
//             </View>
//           </ImageBackground>

//           {/* BALANCE & TRANSACTIONS */}
//           <View style={styles.balanceContainer}>
//             <View style={styles.balanceHalf}>
//               <View style={styles.statIconWrapper}>
//                 <Image source={require('../../../assets/images/Wallet Icon.png')} style={styles.statIcon} />
//               </View>
//               <View>
//                 <Text style={styles.statLabel}>Balance</Text>
//                 <Text style={styles.statValue}>{profiledata?.balance || '100.0'} <Text style={styles.token}>PAYO</Text></Text>
//               </View>
//             </View>
//             <View style={styles.verticalDivider} />
//             <View style={styles.balanceHalf}>
//               <View style={[styles.statIconWrapper, styles.statIconWrapperRed]}>
//                 <Image source={require('../../../assets/images/icon-bg.png')} style={styles.statIcon} />
//               </View>
//               <View>
//                 <Text style={styles.statLabel}>Transactions</Text>
//                 <Text style={styles.statValue}>{profiledata?.transactionCount || '0'}</Text>
//               </View>
//             </View>
//           </View>

//           {/* REFERRAL CODE */}
//           <View style={styles.referralCard}>
//             <View style={styles.statIconWrapper}>
//               <Image source={require('../../../assets/images/Reward Icon.png')} style={styles.statIcon} />
//             </View>
//             {/* <Image source={require('../../../assets/images/Reward Icon.png')}style={styles.statIcon}/> */}
//             <View>
//               <Text style={styles.referralLabel}>Your Referral Code</Text>
//               <Text style={styles.referralCode}>{profiledata?.referralCode || 'PAYO7630'}</Text>
//             </View>
//           </View>

//           {/* ACTIONS */}
//           <View style={styles.actionRow}>
//             <TouchableOpacity style={styles.actionBtnOutline} onPress={handleCopy}>
//               <Text style={styles.actionBtnText}>Copy address</Text>
//               {/* <Icon name="copy" size={16} color="#4F46E5" /> */}
//               <Image source={require('../../../assets/images/profile/Content Copy Icon.png')} style={styles.copyIcon} />

//             </TouchableOpacity>
//             <TouchableOpacity style={styles.actionBtnOutline} onPress={handleShare}>
//               <Text style={styles.actionBtnText}>Share address</Text>
//               {/* <Icon name="share" size={16} color="#4F46E5" /> */}
//               <Image source={require('../../../assets/images/profile/share.png')} style={styles.shareIcon} />
//             </TouchableOpacity>
//           </View>

//           {/* ADD BANK BUTTON */}
//           <TouchableOpacity
//             style={styles.addBankPrimaryBtn}
//             onPress={() => navigation.navigate('AddBankHome')}
//           >
//             <Icon name="plus-circle" size={18} color="#fff" style={styles.leftIcon} />
//             <Text style={styles.addBankPrimaryText}>Add Bank Account</Text>
//             <Icon name="chevron-right" size={18} color="#fff" style={styles.rightIcon} />
//           </TouchableOpacity>

//           {/* PERSONAL INFO */}
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Personal Information</Text>
//             <TouchableOpacity><Text style={styles.viewAll}>View All {'>'}</Text></TouchableOpacity>
//           </View>
//           <View style={styles.listCard}>
//             <View style={styles.listItem}>
//               <Text style={styles.listLabel}>Name</Text>
//               <Text style={styles.listValue}>{profiledata?.name || 'Raju'}</Text>
//             </View>
//             <View style={styles.listItem}>
//               <Text style={styles.listLabel}>Email</Text>
//               <Text style={styles.listValue}>{profiledata?.email || 'Raju@gmail.com'}</Text>
//             </View>
//             <View style={[styles.listItem, { borderBottomWidth: 0, paddingBottom: verticalScale(14) }]}>
//               <Text style={styles.listLabel}>Linked Mobile</Text>
//               <Text style={styles.listValue}>+91 {profiledata?.mobile || '8332 285 718'}</Text>
//             </View>
//           </View>

//           {/* ACCOUNT */}
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Account</Text>
//             <TouchableOpacity><Text style={styles.viewAll}>View All {'>'}</Text></TouchableOpacity>
//           </View>
//           <View style={styles.listCard}>
//             <TouchableOpacity style={styles.listItemTouch}>
//               <Text style={styles.listLabel}>KYC Verification</Text>
//               <Text style={styles.dangerText}>Not Approved {'>'}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.listItemTouch}>
//               <Text style={styles.listLabel}>Personal Information</Text>
//               <Icon name="chevron-right" size={16} color="#9CA3AF" />
//             </TouchableOpacity>
//             <View style={[styles.listItem, { borderBottomWidth: 0, paddingBottom: verticalScale(14) }]}>
//               <Text style={styles.listLabel}>Linked Mobile</Text>
//               <Text style={styles.listValue}>+91 {profiledata?.mobile || '1324 567 890'}</Text>
//             </View>
//           </View>

//           {/* SECURITY */}
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Security</Text>
//             <TouchableOpacity><Text style={styles.viewAll}>View All {'>'}</Text></TouchableOpacity>
//           </View>
//           <View style={styles.listCard}>
//             <TouchableOpacity style={styles.listItemTouch}>
//               <Text style={styles.listLabel}>Change PIN</Text>
//               <Icon name="chevron-right" size={16} color="#9CA3AF" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.listItemTouch}>
//               <Text style={styles.listLabel}>Change Password</Text>
//               <Icon name="chevron-right" size={16} color="#9CA3AF" />
//             </TouchableOpacity>
//             <View style={styles.listItemTouch}>
//               <Text style={styles.listLabel}>Biometric Login</Text>
//               <Switch
//                 trackColor={{ false: '#D1D5DB', true: '#10B981' }}
//                 thumbColor={'#ffffff'}
//                 onValueChange={() => setBiometricEnabled(!biometricEnabled)}
//                 value={biometricEnabled}
//               />
//             </View>
//             <View style={[styles.listItem, { borderBottomWidth: 0, paddingBottom: verticalScale(14), paddingTop: 12 }]}>
//               <Text style={styles.listLabel}>Change Mobile No.</Text>
//               <Text style={styles.listValue}>+91 {profiledata?.mobile || '1324 567 890'}</Text>
//             </View>
//           </View>

//           {/* SECURITY BANNER */}
//           {/* SECURITY BANNER */}
//           <View style={styles.securityBanner}>
//             <Image source={require('../../../assets/images/Security-Icon.png')} style={styles.bannerIcon} />
//             <View style={styles.bannerTextContainer}>
//               <Text style={styles.bannerTitle}>Secure & Trusted</Text>
//               <Text style={styles.bannerSub}>Your account is protected with bank-grade security.</Text>
//             </View>
//             <Image source={require('../../../assets/images/locksecure.png')} style={styles.watermarkIcon} />
//           </View>

//           {/* LOGOUT BUTTON - IDENTICAL TO ADD BANK UI */}
//           <TouchableOpacity style={styles.logoutPrimaryBtn} onPress={handleLogout}>
//             <Icon name="log-out" size={18} color="#fff" style={styles.leftIcon} />
//             <Text style={styles.logoutPrimaryText}>Logout Account</Text>
//             <Icon name="chevron-right" size={18} color="#fff" style={styles.rightIcon} />
//           </TouchableOpacity>

//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }
