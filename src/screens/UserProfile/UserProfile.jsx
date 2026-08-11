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
  StatusBar,
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
import { useAppSelector } from '../../redux/hooks';
import { capitalizeFirstLetter } from '../../api/mainValuables';

export default function UserProfile({ route, navigation ,isEditable: propIsEditable}) {
 const isEditable = propIsEditable ?? route.params?.isEditable ?? false;
  
  console.log(isEditable, "isEditable", route?.params);
  const [profiledata, setProfileData] = useState({});
  const profileDataRedux = useAppSelector((state) => state.deposit.profileData);
  const walletData = useAppSelector((state) => state.deposit.walletData);
  const dashboardStats = useAppSelector((state) => state.deposit.dashboardStats);

  const kycStatusText = dashboardStats?.kycStatus || 'KYC Pending';
  const isKycCompleted = kycStatusText === 'KYC Completed';

  console.log(profileDataRedux,"profileDataRedux",dashboardStats,walletData)
  
  const [bankData, setBankData] = useState([]);
  const [address, setAddress] = useState('');
  const [qr, setQr] = useState(null);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const isBankDisabled = true;

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


  const paymentAddress = walletData?.Wallet_ID  || 'Payo_9000000001'; // Fallback / actual variable
  const qrCodePaymentUrl = walletData?.QR_Code_Link_Payments;

  const handleCopy = () => {
    const walletAddress = walletData?.Wallet_ID || '0xDummyAddress123';
    if (!walletAddress) return;
    Clipboard.setString(walletAddress);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Wallet Address copied', ToastAndroid.SHORT);
    }
  };

  // const handleShare = async () => {
  //   try {
  //     const result = await fetchQr();
  //     if (!result) return;
  //     const { qrImage, address } = result;
  //     const base64Data = qrImage.replace(/^data:image\/png;base64,/, '');
  //     const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;
  //     await RNFS.writeFile(filePath, base64Data, 'base64');
  //     await Share.open({
  //       url: 'file://' + filePath,
  //       message: `Send PAYO to this WalletID:\n${address}`,
  //     });
  //   } catch (error) {
  //     console.log('Share error:', error);
  //   }
  // };

  const handleSharePaymentAddress = async () => {
    try {
      let localImagePath = null;

      // 1. Download QR Code image to cache if URL exists
      if (qrCodePaymentUrl) {
        const filePath = `${RNFS.CachesDirectoryPath}/payment_qr_${Date.now()}.png`;

        const downloadResult = await RNFS.downloadFile({
          fromUrl: qrCodePaymentUrl,
          toFile: filePath,
        }).promise;

        if (downloadResult.statusCode === 200) {
          localImagePath = Platform.OS === 'android' ? `file://${filePath}` : filePath;
        }
      }

      // 2. Format share text message
      const shareMessage = 
        `Here is my PAYO payment address:\n\n` +
        `Address: ${paymentAddress}\n\n` +
        `Scan the QR code or use the address above to send payments directly.`;

      // 3. Build share options
      const shareOptions = {
        title: 'Share Payment Address',
        message: shareMessage,
        ...(localImagePath && { url: localImagePath }),
        type: 'image/png',
      };

      // 4. Open share modal
      await Share.open(shareOptions);
    } catch (error) {
      // Ignore user-dismissed modal errors
      if (error?.message !== 'User did not share') {
        console.log('Share Payment Address Error:', error);
      }
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
<Text style={styles.profileName}>
  {capitalizeFirstLetter(profileDataRedux?.Full_Name)}
</Text>
              <Text style={styles.profilePhone}>{profileDataRedux?.Mobile_Number || '1324 567 890'}</Text>
             <View style={[styles.kycBadge, isKycCompleted ? styles.kycBadgeSuccess : styles.kycBadgeDanger]}>
                <Text style={[styles.kycText, isKycCompleted ? styles.kycTextSuccess : styles.kycTextDanger]}>
                  • {kycStatusText}
                </Text>
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
                <Text style={styles.statValue}>{walletData?.Available_Balance || '100.0'} <Text style={styles.token}>PAYO</Text></Text>
              </View>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.balanceHalf}>
              <View style={[styles.statIconWrapper, styles.statIconWrapperRed]}>
                <Image source={require('../../../assets/images/Arrow_left.png')} style={styles.statIcon} />
              </View>
              <View>
                <Text style={styles.statLabel}>Transactions</Text>
                <Text style={styles.statValue}>{dashboardStats?.totalTransactions || '0'}</Text>
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
              <Text style={styles.referralCode}>{profileDataRedux?.Referral_Code || 'PAYO7630'}</Text>
            </View>
          </View>

          {/* ACTIONS */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtnOutline} onPress={handleCopy}>
              <Text style={styles.actionBtnText}>Copy address</Text>
              <Image source={require('../../../assets/images/profile/Content Copy Icon.png')} style={styles.copyIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtnOutline} onPress={handleSharePaymentAddress}>
              <Text style={styles.actionBtnText}>Share address</Text>
              <Image source={require('../../../assets/images/profile/share.png')} style={styles.shareIcon} />
            </TouchableOpacity>
          </View>

          {/* ADD BANK BUTTON */}
          {/* <TouchableOpacity
            style={styles.addBankPrimaryBtn}
            onPress={() => navigation.navigate('AddBankHome')}
            disabled
          >
            <Icon name="plus-circle" size={18} color="#fff" style={styles.leftIcon} />
            <Text style={styles.addBankPrimaryText}>Add Bank Account</Text>
            <Icon name="chevron-right" size={18} color="#fff" style={styles.rightIcon} />
          </TouchableOpacity> */}
<TouchableOpacity
  style={[
    styles.addBankPrimaryBtn,
    isBankDisabled && styles.disabledBankBtn, // Dynamically applies disabled style
  ]}
  onPress={() => navigation.navigate('AddBankHome')}
  disabled={isBankDisabled} // Dynamically disables touch interactions
>
  <Icon
    name="plus-circle"
    size={18}
    color={isBankDisabled ? '#9CA3AF' : '#FFFFFF'} // Dynamic icon color
    style={styles.leftIcon}
  />
  
  <Text
    style={[
      styles.addBankPrimaryText,
      isBankDisabled && styles.disabledBankBtnText, // Dynamic text color/style
    ]}
  >
    Add Bank Account
  </Text>
  
  <Icon
    name="chevron-right"
    size={18}
    color={isBankDisabled ? '#9CA3AF' : '#FFFFFF'} // Dynamic icon color
    style={styles.rightIcon}
  />
</TouchableOpacity>

          {/* PERSONAL INFO */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View All {'>'}</Text></TouchableOpacity>
          </View>
          <View style={styles.listCard}>
            <View style={styles.listItem}>
              <Text style={styles.listLabel}>Name</Text>
              <Text style={styles.listValue}>{profileDataRedux?.Full_Name || 'Raju'}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listLabel}>Email</Text>
              <Text style={styles.listValue}>{profileDataRedux?.Email_Address || 'Raju@gmail.com'}</Text>
            </View>
            <View style={[styles.listItem, { borderBottomWidth: 0, paddingBottom: verticalScale(14)}]}>
              <Text style={styles.listLabel}>Linked Mobile</Text>
              <Text style={styles.listValue}> {profileDataRedux?.Mobile_Number || '8332 285 718'}</Text>
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
<Text style={[isKycCompleted ? styles.successText : styles.dangerText]}>
                {kycStatusText}  {'>'}
              </Text>
                          </TouchableOpacity>
            <TouchableOpacity style={styles.listItemTouch}>
              <Text style={styles.listLabel}>Personal Information</Text>
              <Icon name="chevron-right" size={16} color="#9CA3AF" />
            </TouchableOpacity>
            {/* <View style={[styles.listItem, { borderBottomWidth: 0, paddingBottom: verticalScale(14) }]}>
              <Text style={styles.listLabel}>Linked Mobile</Text>
              <Text style={styles.listValue}>{profileDataRedux?.Mobile_Number || '1324 567 890'}</Text>
            </View> */}
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
              <Text style={styles.listValue}>{profileDataRedux?.Mobile_Number || '1324 567 890'}</Text>
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