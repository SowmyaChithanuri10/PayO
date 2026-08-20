import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  Image,
  StatusBar,
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
import { PAYO_EXCHANGE_RATE } from '../../api/mainValuables';

export default function WalletScreen({ navigation }) {
  const [wallet, setWallet] = useState(null);
  const [avbRuppee, setAvbRuppee] = useState(0);
  const [payoBalance, setPayoBalance] = useState('0.00');
  const [loading, setLoading] = useState(true);
  const [qr, setQr] = useState(null);
  const [address, setAddress] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  
  // NEW STATE: Toggle balance visibility
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  // Toggle balance visibility
  const [balanceVisible, setBalanceVisible] = useState(true);

  const dispatch = useAppDispatch();
  const walletData = useAppSelector((state) => state.deposit.walletData);

  const progress = wallet?.dailyLimit > 0
    ? ((wallet?.dailyUsed || 0) / wallet?.dailyLimit) * 100
    : 0;

  const fetchWallet = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/wallet/wallet-details');
      
      if (res?.data?.success && res?.data?.data?.[0]) {
        const data = res.data.data[0];
        setWallet(data);

        // Extract available INR balance
        const rupeeBalance = parseFloat(data.Available_Balance || 0);
        setAvbRuppee(rupeeBalance);

        // Convert INR to PAYO dynamically
        const rate = PAYO_EXCHANGE_RATE || 0.00012; // Uses fallback exchange rate if undefined
        const calculatedPayo = (rupeeBalance * rate).toFixed(3);
        setPayoBalance(calculatedPayo);
        dispatch(setWalletData(data));
      }
    } catch (error) {
      console.log('Wallet API error:', error?.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchWallet();
    }, []),
  );

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
    const walletAddress = wallet?.Wallet_ID;
    if (!walletAddress) return;

    Clipboard.setString(walletAddress);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Wallet ID copied to clipboard', ToastAndroid.SHORT);
    }
  };

  // const handleShare = async () => {
  //   try {
  //     const result = await fetchQr();
  //     if (!result) return;

  //     const { qrImage, address: sharedAddress } = result;
  //     const base64Data = qrImage.replace(/^data:image\/png;base64,/, '');
  //     const filePath = `${RNFS.CachesDirectoryPath}/payo_qr.png`;

  //     await RNFS.writeFile(filePath, base64Data, 'base64');

  //     await Share.open({
  //       url: 'file://' + filePath,
  //       message: `Send PAYO to this Wallet ID:\n${wallet?.Wallet_ID || sharedAddress}`,
  //     });
  //   } catch (error) {
  //     console.log('Share error:', error);
  //   }
  // };

    const paymentAddress = walletData?.Wallet_ID; // Fallback / actual variable
  const qrCodePaymentUrl = walletData?.QR_Code_Link_Payments;

  const handleShare = async () => {
    try {
      let localImagePath = null;
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

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={theme.colors.primaryPurple || '#6366f1'} />
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
                {wallet?.Wallet_ID}
              </Text>
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.headerActionBtn}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Notifications')}
              >
                <Image
                  source={require('../../../assets/images/walletscr/Icon (4).png')}
                  style={styles.customHeaderIcon}
                />
                {/* <View style={styles.badge}>
                  <Text style={styles.badgeText}></Text>
                </View> */}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.headerActionBtn, { marginLeft: 8 }]}
                activeOpacity={0.8}
                 onPress={() => navigation.navigate('Settings')}
                

              >
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
                  <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
                    <Icon
                      // name={balanceVisible ? 'eye-off' : 'eye'}
                      name={balanceVisible ? 'eye' : 'eye-off'}
                      size={18}
                      color="#ffffffb3"
                      style={{ marginLeft: 10,padding:14 }}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.balanceValueRow}>
                  <Text style={styles.balanceText}>
                    {balanceVisible ? payoBalance : '****'}
                  </Text>
                  <Text style={styles.currencyText}>PAYO</Text>
                </View>

                <Text style={styles.fiatText}>
                  {balanceVisible ? `₹ ${avbRuppee.toLocaleString('en-IN')}` : ''}
                </Text>
              </View>

              {/* RIGHT SIDE: GRAPHIC & ADD MONEY */}
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
                  <Icon name="plus" size={16} color="#11f00e" style={{ marginRight: 4 }} />
                  <Text style={styles.addMoneyText}>Add Money</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* COPY & SHARE ACTIONS */}
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
                <Text style={styles.promoSub}>
                  Referral Code: {wallet?.Referral_Code || 'N/A'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ReferEarn')}
                style={styles.promoBtn}
              >
                <Text style={styles.promoBtnText}>Refer Now {'>'}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* TOKEN HOLDINGS SECTION */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Token Holdings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
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
                <Text style={styles.cardAmountText}>
                  {wallet?.referralRewards || '200.0'}
                </Text>
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
                {wallet?.dailyUsed?.toLocaleString() || '6,200'} /
                {wallet?.dailyLimit?.toLocaleString() || '10,000'}
              </Text>
            </View>

            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${Math.min(progress, 100)}%` },
                ]}
              />
            </View>

            <View style={styles.dataCardRow}>
              <Text style={styles.cardSubText}>
                Used {wallet?.dailyUsed?.toLocaleString() || '6,200'}
              </Text>
              <Text style={styles.cardSubText}>
                Limit: {wallet?.dailyLimit?.toLocaleString() || '10,000'}
              </Text>
            </View>
          </View>

          {/* SEND PAYO BUTTON */}
          <TouchableOpacity
            style={styles.sendPrimaryBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SendScreen')}
          >
            <Text style={styles.sendPrimaryBtnText}>Send PAYO</Text>
            <Icon
              name="arrow-right"
              size={20}
              color="#fff"
              style={styles.rightIconAbsolute}
            />
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
              <Text style={styles.bottomPromoSub}>
                Apply code and get exciting rewards
              </Text>
            </View>
            <Text style={[styles.bottomPromoAction, { color: '#8b5cf6' }]}>
              Apply Now {'>'}
            </Text>
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
              <Text style={styles.bottomPromoSub}>
                You will earn 10 PAYO as a bonus on this deposit
              </Text>
            </View>
            <View style={styles.bonusTag}>
              <Text style={styles.bonusTagText}>+10 PAYO</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
