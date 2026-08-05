import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Clipboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import styles from './MakePaymentStyle';
import { moderateScale } from '../../src/utils/responsive';
import api from '../api/axios';
import { useAppSelector } from '../redux/hooks';
import MainHeader from '../screens/components/MainHeader';

const MakePayment = ({ navigation }) => {

  const reduxAmount = useAppSelector((state) => state.deposit.amount);
  const reduxExpectedCrypto = useAppSelector((state) => state.deposit.expectedCrypto);
  const reduxUpiId = useAppSelector((state) => state.deposit.upiId);
  const reduxCurrency = useAppSelector((state) => state.deposit.currency) || 'INR';
  const walletData = useAppSelector((state) => state.deposit.walletData);

  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  const paymentSnapshot = useRef({
    amount: reduxAmount,
    expectedCrypto: reduxExpectedCrypto,
    upiId: reduxUpiId || 'payo@upi',
    currency: reduxCurrency,
    walletId: walletData?.Wallet_ID,
  }).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = useCallback((seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, []);

  const generateTransactionId = () => {
    const random10Digits = Math.floor(1000000000 + Math.random() * 9000000000);
    return `TXN${random10Digits}`;
  };

  const copyToClipboard = () => {
    Clipboard.setString(paymentSnapshot.upiId);
    Alert.alert('Copied', 'UPI ID copied to clipboard');
  };

  const handleAddMoney = async () => {
    if (loading) return;
    setLoading(true);
    const generatedTxnId = generateTransactionId();

    try {
      const response = await api.post('api/wallet/add-money', {
        amount: paymentSnapshot.amount ? paymentSnapshot.amount.toString() : '100',
        transactionId: generatedTxnId,
        paymentMode: 'UPI',
        gatewayName: 'Payo_Client',
        userWallet: paymentSnapshot.walletId,
      });

      if (response.status === 200 || response.status === 201) {
        navigation.navigate('loadingtemp', {
          transactionId: generatedTxnId,
          amount: paymentSnapshot.amount ? paymentSnapshot.amount.toString() : '100',
          wallet_id: paymentSnapshot.walletId,
        });
      } else {
        Alert.alert('Payment Failed', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.log('Add Money Error:', error.response?.data || error.message);
      Alert.alert(
        'Payment Failed',
        `${error.response?.data?.Message || 'Failed to process payment. Please try again.'}`
      );
      navigation.navigate("Main")
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainHeader 
        title="Make Payment" 
        subtitle="Complete your payment within the time" 
        onHelpPress={() => console.log("Help pressed on Make Payment")} 
      />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.amountCard}>
          <View style={styles.amountLeft}>
            <Text style={styles.textMuted}>Amount to Pay</Text>
            <Text style={styles.amountText}>
              {paymentSnapshot.currency === 'INR' ? '₹' : ''}
              {paymentSnapshot.amount ? paymentSnapshot.amount.toLocaleString() : '0'}
            </Text>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.amountRight}>
            <View>
              <Text style={styles.textMuted}>You will receive (approx.)</Text>
              <Text style={styles.cryptoText}>
                {paymentSnapshot.expectedCrypto ? paymentSnapshot.expectedCrypto.toFixed(3) : '0.000'} PAYO
              </Text>
            </View>
            <Image
              source={require('../../assets/images/Wallet image 12.png')}
              style={styles.walletIcon}
            />
          </View>
        </View>

        <View style={styles.qrCard}>
          <View style={styles.qrHeader}>
            <Text style={styles.qrHeaderText}>Scan & Pay using any UPI App</Text>
            <View style={styles.timerContainer}>
              <Image
                source={require('../../assets/images/clock1.png')}
                style={styles.clockIcon}
              />
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            </View>
          </View>

          <View style={styles.qrWrapper}>
            <Image
              source={require('../../assets/images/QR code image.png')}
              style={styles.qrImage}
            />
            <View style={styles.qrLogoCenter}>
              <Image
                source={require('../../assets/images/Container.png')}
                style={styles.qrCenterIcon}
              />
            </View>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or pay using UPI ID</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.upiInputContainer}>
            <Text style={styles.upiIdText}>{paymentSnapshot.upiId}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.secureBanner}>
            <Image
              source={require('../../assets/images/shield-check12.png')}
              style={styles.shieldIcon}
            />
            <View style={styles.secureTextContainer}>
              <Text style={styles.secureTitle}>This is a secure UPI payment</Text>
              <Text style={styles.secureSubtitle}>Your payment is protected.</Text>
            </View>
            <Image
              source={require('../../assets/images/Payment Method Image.png')}
              style={styles.upiLogoSmall}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Open in your preferred UPI App</Text>
        <View style={styles.appsGrid}>
          {[
            { name: 'Google Pay', icon: require('../../assets/images/Gpay Icon.png') },
            { name: 'PhonePe', icon: require('../../assets/images/PhonePe Icon.png') },
            { name: 'Paytm', icon: require('../../assets/images/Paytm Icon.png') },
            { name: 'BHIM', icon: require('../../assets/images/Payment Icon.png') },
          ].map((app, i) => (
            <TouchableOpacity key={i} style={styles.appCard}>
              <Image source={app.icon} style={styles.appIcon} />
              <Text style={styles.appName}>{app.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoBanner}>
          <Image
            source={require('../../assets/images/Info Icon.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            After successful payment, you will be {'\n'}
            redirected back to the app automatically.
          </Text>
          <Image
            source={require('../../assets/images/Shield Security Icon.png')}
            style={styles.shieldWatermark}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={loading || timeLeft === 0}
            style={styles.proceedButtonAction}
            onPress={handleAddMoney}
          >
            <LinearGradient
              colors={['#7C3AED', '#3B82F6']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.proceedGradient}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="shield-check-outline"
                    size={moderateScale(22)}
                    color="#FFFFFF"
                  />
                  <Text style={styles.proceedButtonText}>
                    {timeLeft === 0 ? 'Transaction Expired' : 'Make Payment'}
                  </Text>
                  <FeatherIcon
                    name="arrow-right"
                    size={moderateScale(20)}
                    color="#FFFFFF"
                  />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by</Text>
          <Image
            source={require('../../assets/images/Payment Method Image.png')}
            style={styles.footerLogo}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/images/Frame1.png')}
            style={styles.footerLogo}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MakePayment;