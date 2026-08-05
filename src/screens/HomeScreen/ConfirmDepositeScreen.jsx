
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { updatePaymentStatus, resetDepositFlow } from '../../redux/features/depositSlice';
import { theme } from '../../MainTheme/theme'; 
import { moderateScale, scale } from '../../utils/responsive'; 
import MainHeader from '../../screens/components/MainHeader'; 

export default function ConfirmDepositScreen() {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();

  const {
    amount,
    paymentMethod,        
    expectedCrypto,
    cryptoRate,
    processingFee,
    estimatedTime,
    rewardsEarned,
    loading,
  } = useSelector((state) => state.deposit);

  const formattedAmount = amount?.toLocaleString('en-IN') || '0';
  const methodTitle = paymentMethod?.title || 'N/A';
  const methodImage = paymentMethod?.imageSource || null; 
  const feeDisplay = processingFee?.toFixed(2) || '0.00';
  const rewardsDisplay = rewardsEarned || 0;

  const handleProceed = async () => {
    try {
      navigation.navigate('MakePayment'); 
      await new Promise((resolve) => setTimeout(resolve, 600));
      dispatch(resetDepositFlow());
      navigation.navigate('MakePayment'); 

    } catch (error) {
      dispatch(updatePaymentStatus('FAILED'));
      const msg = error.response?.data?.message || 'Deposit failed. Please try again.';
      if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      }
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bgApp} />
      <MainHeader 
        title="Confirm Deposit" 
        subtitle={"Please review deposit details before proceeding"}
        onHelpPress={() => {
          console.log("Help pressed");
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        <View style={styles.summaryHeaderRow}>
          <Text style={styles.depositSummaryTitle}>Deposit Summary</Text>
          <View style={styles.secureBadge}>
            <MaterialCommunityIcons name="shield-check" size={moderateScale(14)} color={theme.colors.primaryIndigo} />
            <Text style={styles.secureText}>100% Secure</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.conversionRow}>
            <View style={styles.conversionColumn}>
              <Text style={styles.conversionLabel}>You are adding</Text>
              <Text style={styles.conversionValue}>₹{formattedAmount}</Text>
              <View style={styles.viaBadge}>
                <Text style={styles.viaText}>via </Text>
                {methodImage && (
                  <Image source={methodImage} style={{ width: 20, height: 20, marginRight: 4 }} resizeMode="contain" />
                )}
                <Text style={styles.upiText}>{methodTitle}</Text>
              </View>
            </View>

            <FeatherIcon name="arrow-right" size={moderateScale(22)} color={theme.colors.primaryIndigo} style={styles.arrowIcon} />

            <View style={[styles.conversionColumn, { alignItems: 'flex-end' }]}>
              <Text style={styles.conversionLabel}>You will receive <Text style={styles.labelSub}>(approx)</Text></Text>
              <Text style={styles.receiveValue}>{expectedCrypto?.toFixed(3) || '0.000'} PAYO</Text>
              <Text style={styles.atCurrentRate}>at current rate</Text>
            </View>
          </View>

          <View style={styles.priceChip}>
            <View style={styles.priceChipLeft}>
              <View style={styles.payoLogoCircle}>
                <Text style={styles.payoLogoText}>P</Text>
              </View>
              <View>
                <Text style={styles.priceLabel}>Current PAYO Price</Text>
                <Text style={styles.priceValue}>{cryptoRate || 0}</Text>
              </View>
            </View>
            <View style={styles.priceChipRight}>
              <View style={styles.priceChangeBadge}>
                <Text style={styles.priceChangeText}>▲ +2.41%</Text>
              </View>
              <View style={styles.miniChartLine} />
            </View>
          </View>

          <View style={styles.detailsList}>
            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <FeatherIcon name="dollar-sign" size={moderateScale(16)} color={theme.colors.primaryIndigo} style={styles.rowIcon} />
                <Text style={styles.detailLabel}>Processing Fee</Text>
              </View>
              <Text style={styles.dottedDivider} numberOfLines={1}>....................................................................</Text>
              <Text style={styles.feeValue}>₹{feeDisplay}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <FeatherIcon name="credit-card" size={moderateScale(16)} color={theme.colors.primaryIndigo} style={styles.rowIcon} />
                <Text style={styles.detailLabel}>Payment Method</Text>
              </View>
              <Text style={styles.dottedDivider} numberOfLines={1}>....................................................................</Text>
              <View style={styles.methodValueContainer}>
                {methodImage && (
                  <Image source={methodImage} style={{ width: 20, height: 20, marginRight: 6 }} resizeMode="contain" />
                )}
                <Text style={styles.upiMethodText}>{methodTitle}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <FeatherIcon name="clock" size={moderateScale(16)} color={theme.colors.primaryIndigo} style={styles.rowIcon} />
                <Text style={styles.detailLabel}>Estimated Time</Text>
              </View>
              <Text style={styles.dottedDivider} numberOfLines={1}>....................................................................</Text>
              <Text style={styles.instantValue}>
                {paymentMethod?.tag || estimatedTime || 'INSTANT'}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <FeatherIcon name="lock" size={moderateScale(16)} color={theme.colors.primaryIndigo} style={styles.rowIcon} />
                <Text style={styles.detailLabel}>Deposit to</Text>
              </View>
              <Text style={styles.dottedDivider} numberOfLines={1}>....................................................................</Text>
              <View style={styles.walletTarget}>
                <View style={styles.miniWalletLogo}><Text style={styles.miniWalletLogoText}>P</Text></View>
                <Text style={styles.depositWalletValue}>Payo Wallet</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.promoCard} onPress={() => {}}>
          <View style={styles.promoLeft}>
            <View style={styles.promoIconContainer}>
              <MaterialCommunityIcons name="coins" size={moderateScale(20)} color="#FBBF24" />
            </View>
            <View>
              <Text style={styles.promoTitle}>Have a promo code?</Text>
              <Text style={styles.promoSubtitle}>Apply code and get exciting rewards</Text>
            </View>
          </View>
          <View style={styles.promoRightAction}>
            <Text style={styles.applyNowText}>Apply Now</Text>
            <FeatherIcon name="chevron-right" size={moderateScale(14)} color={theme.colors.primaryIndigo} />
          </View>
        </TouchableOpacity>

        <View style={styles.rewardsCard}>
          <View style={styles.rewardsLeft}>
            <View style={styles.giftIconContainer}>
              <FeatherIcon name="gift" size={moderateScale(18)} color={theme.colors.bgSurface} />
            </View>
            <View style={{ flex: 1, paddingRight: moderateScale(10) }}>
              <Text style={styles.rewardsTitle}>Rewards You'll Earn</Text>
              <Text style={styles.rewardsAmount}>You will earn {rewardsDisplay} PAYO as a bonus on this deposit</Text>
            </View>
          </View>
          <View style={styles.rewardBonusBadge}>
            <Text style={styles.rewardBonusBadgeText}>+{rewardsDisplay} PAYO</Text>
          </View>
        </View>

        <View style={styles.disclaimerContainer}>
          <FeatherIcon name="info" size={moderateScale(16)} color={theme.colors.primaryIndigo} style={styles.infoIcon} />
          <Text style={styles.disclaimerText}>
            The PAYO amount you receive may vary slightly due to market fluctuations
          </Text>
          <Image source={require('../../../assets/images/wallet/wallet.png')} size={moderateScale(28)} />
        </View>

        <TouchableOpacity style={styles.proceedButtonAction} onPress={handleProceed} disabled={loading}>
          <LinearGradient colors={[theme.colors.primaryIndigo, theme.colors.primaryBlue]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.proceedGradient}>
            <MaterialCommunityIcons name="shield-check-outline" size={moderateScale(20)} color={theme.colors.bgSurface} style={{ marginRight: moderateScale(8) }} />
            <Text style={styles.proceedButtonText}>{loading ? 'Processing...' : 'Proceed to Payment'}</Text>
            <FeatherIcon name="arrow-right" size={moderateScale(18)} color={theme.colors.bgSurface} style={{ marginLeft: moderateScale(8) }} />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.secureNoteRow}>
          <FeatherIcon name="lock" size={moderateScale(12)} color={theme.colors.grey} />
          <Text style={styles.secureNoteText}>Your payment details are 100% secure and encrypted</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, 
  },
  scrollBody: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(30),
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(15),
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(4),
  },
  depositSummaryTitle: {
    fontSize: moderateScale(theme.typography.size.sm),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secureText: {
    fontSize: moderateScale(11),
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.primaryIndigo,
    marginLeft: moderateScale(4),
  },
  summaryCard: {
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.borderRadius.lg,
    padding: moderateScale(16),
    marginBottom: moderateScale(14),
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm, // Applied theme shadow
  },
  conversionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(6),
    marginBottom: moderateScale(16),
  },
  conversionColumn: {
    flex: 1,
  },
  conversionLabel: {
    fontSize: moderateScale(12),
    color: theme.colors.grey,
    marginBottom: moderateScale(4),
  },
  labelSub: {
    fontSize: moderateScale(10),
    color: theme.colors.textMuted,
  },
  conversionValue: {
    fontSize: moderateScale(22),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },
  receiveValue: {
    fontSize: moderateScale(20),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.primaryIndigo,
  },
  viaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(4),
  },
  viaText: {
    fontSize: moderateScale(12),
    color: theme.colors.textMuted,
  },
  upiText: {
    fontSize: moderateScale(12),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },
  arrowIcon: {
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
  },
  atCurrentRate: {
    fontSize: moderateScale(12),
    color: theme.colors.grey,
    marginTop: moderateScale(4),
  },
  priceChip: {
    backgroundColor: theme.colors.bgLightPurple,
    borderRadius: theme.borderRadius.md,
    padding: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  priceChipLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payoLogoCircle: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: theme.colors.primaryIndigo,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10),
  },
  payoLogoText: {
    color: theme.colors.bgSurface,
    fontWeight: theme.typography.weight.bold,
    fontSize: moderateScale(14),
  },
  priceLabel: {
    fontSize: moderateScale(11),
    color: theme.colors.grey,
  },
  priceValue: {
    fontSize: moderateScale(15),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },
  priceChipRight: {
    alignItems: 'flex-end',
  },
  priceChangeBadge: {
    backgroundColor: '#DCFCE7', // Kept specific hex for precise green tint
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(20),
  },
  priceChangeText: {
    fontSize: moderateScale(11),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.statusSuccess,
  },
  miniChartLine: {
    width: moderateScale(40),
    height: moderateScale(2),
    backgroundColor: '#A7F3D0', 
    marginTop: moderateScale(6),
    transform: [{ rotate: '-5deg' }],
  },
  detailsList: {
    marginTop: moderateScale(5),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: moderateScale(8),
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: theme.colors.bgSurface,
    paddingRight: moderateScale(4),
  },
  rowIcon: {
    marginRight: moderateScale(8),
  },
  detailLabel: {
    fontSize: moderateScale(13),
    color: theme.colors.textMuted,
  },
  dottedDivider: {
    flex: 1,
    color: theme.colors.borderLight,
    paddingHorizontal: moderateScale(2),
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  feeValue: {
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.statusSuccess,
    backgroundColor: theme.colors.bgSurface,
    paddingLeft: moderateScale(4),
    zIndex: 2,
  },
  methodValueContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: theme.colors.bgSurface, 
    paddingLeft: 4, 
    zIndex: 2 
  },
  upiMethodText: {
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.textMain,
  },
  instantValue: {
    fontSize: moderateScale(12),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.statusSuccess,
    backgroundColor: theme.colors.bgSurface,
    paddingLeft: moderateScale(4),
    zIndex: 2,
  },
  walletTarget: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.bgSurface,
    paddingLeft: moderateScale(4),
    zIndex: 2,
  },
  miniWalletLogo: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: theme.colors.primaryIndigo,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(4),
  },
  miniWalletLogoText: {
    color: theme.colors.bgSurface,
    fontSize: moderateScale(9),
    fontWeight: theme.typography.weight.bold,
  },
  depositWalletValue: {
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.textMain,
  },
  promoCard: {
    backgroundColor: '#ECFDF5', 
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: theme.borderRadius.md,
    padding: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoIconContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: theme.borderRadius.sm,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  promoTitle: {
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.bold,
    color: '#065F46',
  },
  promoSubtitle: {
    fontSize: moderateScale(11),
    color: '#047857',
    marginTop: moderateScale(1),
  },
  promoRightAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applyNowText: {
    fontSize: moderateScale(12),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.primaryIndigo,
    marginRight: moderateScale(2),
  },
  rewardsCard: {
    backgroundColor: '#FFFDF2',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    borderRadius: theme.borderRadius.md,
    padding: moderateScale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(14),
  },
  rewardsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  giftIconContainer: {
    width: scale(34),
    height: scale(34),
    borderRadius: theme.borderRadius.sm,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  rewardsTitle: {
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.bold,
    color: '#92400E',
  },
  rewardsAmount: {
    fontSize: moderateScale(11),
    color: '#B45309',
    marginTop: moderateScale(1),
  },
  rewardBonusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: theme.borderRadius.sm,
  },
  rewardBonusBadgeText: {
    fontSize: moderateScale(11),
    fontWeight: theme.typography.weight.bold,
    color: '#065F46',
  },
  disclaimerContainer: {
    backgroundColor: '#EEF2F6',
    borderRadius: theme.borderRadius.md,
    padding: moderateScale(14),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(25),
    position: 'relative',
    overflow: 'hidden',
  },
  infoIcon: {
    marginRight: moderateScale(10),
    alignSelf: 'flex-start',
    marginTop: moderateScale(2),
  },
  disclaimerText: {
    flex: 1,
    fontSize: moderateScale(12),
    color: theme.colors.textMuted,
    lineHeight: moderateScale(16),
    paddingRight: moderateScale(20),
  },
  proceedButtonAction: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: moderateScale(15),
  },
  proceedGradient: {
    flexDirection: 'row',
    paddingVertical: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedButtonText: {
    fontSize: moderateScale(15),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.bgSurface,
  },
  secureNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(5),
  },
  secureNoteText: {
    fontSize: moderateScale(11),
    color: theme.colors.grey,
    marginLeft: moderateScale(6),
  },
});
