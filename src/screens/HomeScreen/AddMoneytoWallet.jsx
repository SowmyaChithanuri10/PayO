
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
  StatusBar,
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
import MainHeader from '../../screens/components/MainHeader'; 

import upiImg from '../../../assets/images/wallet/Payment Icon.png';
import bankImg from '../../../assets/images/wallet/Payment Icon (1).png';
import cardImg from '../../../assets/images/wallet/Payment Icon (2).png';
import netBankingImg from '../../../assets/images/wallet/wallet.png';
import wallet from '../../../assets/images/wallet/Wallet image 1.png';
import cryptoImg from '../../../assets/images/wallet/cryptocurrency 1.png';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function AddMoneytoWallet({ visible, onClose, navigation }) {
  const dispatch = useAppDispatch();
  const [localAmount, setLocalAmount] = useState('');
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [expandedMethod, setExpandedMethod] = useState(null);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  
  const loading = useSelector((state) => state.deposit.loading);
  const walletData = useAppSelector((state) => state.deposit.walletData);
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
      {/* <View style={styles.header}>
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
      </View> */}

       <MainHeader 
          title="Add Money to Wallet" 
          subtitle="Choose a payment method to add funds"
          onHelpPress={() => {
            console.log("Help pressed");
          }} 
        />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.balanceCard}>
          <View style={styles.balanceCardLeft}>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceLabel}>Total Wallet Balance</Text>
              <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
                <FeatherIcon
                  //name={balanceVisible ? 'eye-off' : 'eye'}
                  name={balanceVisible ? 'eye' : 'eye-off'}
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
              {balanceVisible ? `₹ ${inrBalance.toLocaleString('en-IN')}` : ''}
            </Text>
          </View>
          <View style={styles.walletIconContainer}>
            <Image source={wallet} style={styles.walletHeaderImage} resizeMode="contain" />
          </View>
        </LinearGradient>

        <Text style={styles.sectionLabel}>ENTER AMOUNT</Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.amountInput}
            value={localAmount}
            onChangeText={(text) => setLocalAmount(parseValueToString(text))}
            keyboardType="number-pad"
            placeholder='0'
            // maxLength={10} // Account for commas in formatted locale string (e.g., "1,00,000")
           />
          <View style={styles.currencySelector}>
            <Text style={styles.currencySelectorText}>INR</Text>
            <Icon name="keyboard-arrow-down" size={moderateScale(18)} color="#4A5568" />
          </View>
        </View>

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

  dropdownContainer: {
    backgroundColor: 'transparent',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(14),
    paddingRight: moderateScale(10), 
    paddingLeft: moderateScale(20), 
  },
  dropdownText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#374151',
  },

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