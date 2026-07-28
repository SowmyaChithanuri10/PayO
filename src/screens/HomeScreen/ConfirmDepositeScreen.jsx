// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   StatusBar,
//   StyleSheet
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import FeatherIcon from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import LinearGradient from 'react-native-linear-gradient';

// // Responsive scaling placeholders (Replace with your actual scaling utility imports if needed)
// const scale = (size) => size;
// const verticalScale = (size) => size;
// const moderateScale = (size, factor = 0.5) => size;

// export default function ConfirmDepositScreen({ navigation, route }) {
//   const {
//     amount = '1,000',
//     payoAmount = '14.265',
//     payoPrice = '70.12',
//     priceChange = '+2.41%',
//     processingFee = '0.00',
//     estimatedTime = 'INSTANT',
//     rewardsEarned = '10',
//   } = route?.params || {};

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const handleProceed = () => {
//     alert('Proceed to Payment');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F4F8F6" />

//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//           <FeatherIcon name="chevron-left" size={moderateScale(24)} color="#4A5568" />
//         </TouchableOpacity>
//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle}>Confirm Deposit</Text>
//           <Text style={styles.headerSubtitle}>Please review your deposit details </Text>
//           <Text style={styles.headerSubtitle}>before proceeding</Text>
//         </View>
//         <TouchableOpacity style={styles.helpButton}>
//           <FeatherIcon name="help-circle" size={moderateScale(22)} color="#3B82F6" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollBody}
//       >
//         {/* Deposit Summary Main Header */}
//         <View style={styles.summaryHeaderRow}>
//           <Text style={styles.depositSummaryTitle}>Deposit Summary</Text>
//           <View style={styles.secureBadge}>
//             <MaterialCommunityIcons name="shield-check" size={moderateScale(14)} color="#6366F1" />
//             <Text style={styles.secureText}>100% Secure</Text>
//           </View>
//         </View>

//         {/* Main Deposit Card */}
//         <View style={styles.summaryCard}>
//           {/* Conversion Visual Row */}
//           <View style={styles.conversionRow}>
//             <View style={styles.conversionColumn}>
//               <Text style={styles.conversionLabel}>You are adding</Text>
//               <Text style={styles.conversionValue}>₹{amount}</Text>
//               <View style={styles.viaBadge}>
//                 <Text style={styles.viaText}>via </Text>
//                 <Text style={styles.upiText}>UPI</Text>
//               </View>
//             </View>

//             <FeatherIcon name="arrow-right" size={moderateScale(22)} color="#6366F1" style={styles.arrowIcon} />

//             <View style={[styles.conversionColumn, { alignItems: 'flex-end' }]}>
//               <Text style={styles.conversionLabel}>You will receive <Text style={styles.labelSub}>({`approx`})</Text></Text>
//               <Text style={styles.receiveValue}>{payoAmount} PAYO</Text>
//               <Text style={styles.atCurrentRate}>at current rate</Text>
//             </View>
//           </View>

//           {/* Current Price Banner */}
//           <View style={styles.priceChip}>
//             <View style={styles.priceChipLeft}>
//               <View style={styles.payoLogoCircle}>
//                 <Text style={styles.payoLogoText}>P</Text>
//               </View>
//               <View>
//                 <Text style={styles.priceLabel}>Current PAYO Price</Text>
//                 <Text style={styles.priceValue}>₹{payoPrice}</Text>
//               </View>
//             </View>
//             <View style={styles.priceChipRight}>
//               <View style={styles.priceChangeBadge}>
//                 <Text style={styles.priceChangeText}>▲ {priceChange}</Text>
//               </View>
//               {/* Decorative mini chart simulation line */}
//               <View style={styles.miniChartLine} />
//             </View>
//           </View>

//           {/* Transaction Detailed Fields */}
//           <View style={styles.detailsList}>
//             {/* Processing Fee */}
//             <View style={styles.detailRow}>
//               <View style={styles.detailLabelContainer}>
//                 <FeatherIcon name="dollar-sign" size={moderateScale(16)} color="#6366F1" style={styles.rowIcon} />
//                 <Text style={styles.detailLabel}>Processing Fee</Text>
//               </View>
//               <Text style={styles.dottedDivider} numberOfLines={1}>....................................................................</Text>
//               <Text style={styles.feeValue}>₹{processingFee}</Text>
//             </View>

//             {/* Payment Method */}
//             <View style={styles.detailRow}>
//               <View style={styles.detailLabelContainer}>
//                 <FeatherIcon name="credit-card" size={moderateScale(16)} color="#6366F1" style={styles.rowIcon} />
//                 <Text style={styles.detailLabel}>Payment Method</Text>
//               </View>
//               <Text style={styles.dottedDivider} numberOfLines={1}>....................................................................</Text>
//               <Text style={styles.upiMethodText}>UPI</Text>
//             </View>

//             {/* Estimated Time */}
//             <View style={styles.detailRow}>
//               <View style={styles.detailLabelContainer}>
//                 <FeatherIcon name="clock" size={moderateScale(16)} color="#6366F1" style={styles.rowIcon} />
//                 <Text style={styles.detailLabel}>Estimated Time</Text>
//               </View>
//               <Text style={styles.dottedDivider} numberOfLines={1}>....................................................................</Text>
//               <Text style={styles.instantValue}>INSTANT ⚡</Text>
//             </View>

//             {/* Deposit To */}
//             <View style={styles.detailRow}>
//               <View style={styles.detailLabelContainer}>
//                 <FeatherIcon name="lock" size={moderateScale(16)} color="#6366F1" style={styles.rowIcon} />
//                 <Text style={styles.detailLabel}>Deposit to</Text>
//               </View>
//               <Text style={styles.dottedDivider} numberOfLines={1}>....................................................................</Text>
//               <View style={styles.walletTarget}>
//                 <View style={styles.miniWalletLogo}><Text style={styles.miniWalletLogoText}>P</Text></View>
//                 <Text style={styles.depositWalletValue}>Payo Wallet</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Promo Code Banner */}
//         <TouchableOpacity style={styles.promoCard} onPress={styles.handleApplyPromo}>
//           <View style={styles.promoLeft}>
//             <View style={styles.promoIconContainer}>
//               <MaterialCommunityIcons name="coins" size={moderateScale(20)} color="#FBBF24" />
//             </View>
//             <View>
//               <Text style={styles.promoTitle}>Have a promo code?</Text>
//               <Text style={styles.promoSubtitle}>Apply code and get exciting rewards</Text>
//             </View>
//           </View>
//           <View style={styles.promoRightAction}>
//             <Text style={styles.applyNowText}>Apply Now</Text>
//             <FeatherIcon name="chevron-right" size={moderateScale(14)} color="#6366F1" />
//           </View>
//         </TouchableOpacity>

//         {/* Rewards Section */}
//         <View style={styles.rewardsCard}>
//           <View style={styles.rewardsLeft}>
//             <View style={styles.giftIconContainer}>
//               <FeatherIcon name="gift" size={moderateScale(18)} color="#FFF" />
//             </View>
//             <View style={{ flex: 1, paddingRight: moderateScale(10) }}>
//               <Text style={styles.rewardsTitle}>Rewards You'll Earn</Text>
//               <Text style={styles.rewardsAmount}>You will earn {rewardsEarned} PAYO as a bonus on this deposit</Text>
//             </View>
//           </View>
//           <View style={styles.rewardBonusBadge}>
//             <Text style={styles.rewardBonusBadgeText}>+{rewardsEarned} PAYO</Text>
//           </View>
//         </View>

//         {/* Market Variance Disclaimer Container */}
//         <View style={styles.disclaimerContainer}>
//           <FeatherIcon name="info" size={moderateScale(16)} color="#6366F1" style={styles.infoIcon} />
//           <Text style={styles.disclaimerText}>
//             The PAYO amount you receive may vary slightly due to market fluctuations
//           </Text>
//           <MaterialCommunityIcons name="wallet-outline" size={moderateScale(28)} color="#A5B4FC" style={styles.disclaimerWalletArt} />
//         </View>

//         {/* Proceed Action Button */}
//         <TouchableOpacity style={styles.proceedButtonAction} onPress={handleProceed}>
//           <LinearGradient colors={['#6366F1', '#4F46E5']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.proceedGradient}>
//             <MaterialCommunityIcons name="shield-check-outline" size={moderateScale(20)} color="#FFF" style={{ marginRight: moderateScale(8) }} />
//             <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
//             <FeatherIcon name="arrow-right" size={moderateScale(18)} color="#FFF" style={{ marginLeft: moderateScale(8) }} />
//           </LinearGradient>
//         </TouchableOpacity>

//         {/* Absolute Footer Note */}
//         <View style={styles.secureNoteRow}>
//           <FeatherIcon name="lock" size={moderateScale(12)} color="#9CA3AF" />
//           <Text style={styles.secureNoteText}>Your payment details are 100% secure and encrypted</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F8F6',
//   },
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
//   summaryHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: moderateScale(15),
//     marginBottom: moderateScale(10),
//     paddingHorizontal: moderateScale(4),
//   },
//   depositSummaryTitle: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     color: '#1F2937',
//   },
//   secureBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   secureText: {
//     fontSize: moderateScale(11),
//     fontWeight: '600',
//     color: '#6366F1',
//     marginLeft: moderateScale(4),
//   },
//   summaryCard: {
//     backgroundColor: '#FFF',
//     borderRadius: moderateScale(16),
//     padding: moderateScale(16),
//     marginBottom: moderateScale(14),
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.04,
//     shadowRadius: 4,
//   },
//   conversionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: moderateScale(6),
//     marginBottom: moderateScale(16),
//   },
//   conversionColumn: {
//     flex: 1,
//   },
//   conversionLabel: {
//     fontSize: moderateScale(12),
//     color: '#6B7280',
//     marginBottom: moderateScale(4),
//   },
//   labelSub: {
//     fontSize: moderateScale(10),
//     color: '#9CA3AF',
//   },
//   conversionValue: {
//     fontSize: moderateScale(22),
//     fontWeight: '700',
//     color: '#1F2937',
//   },
//   receiveValue: {
//     fontSize: moderateScale(20),
//     fontWeight: '700',
//     color: '#6366F1',
//   },
//   viaBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: moderateScale(4),
//   },
//   viaText: {
//     fontSize: moderateScale(12),
//     color: '#9CA3AF',
//   },
//   upiText: {
//     fontSize: moderateScale(12),
//     fontWeight: '700',
//     color: '#374151',
//   },
//   arrowIcon: {
//     paddingHorizontal: moderateScale(10),
//     marginTop: moderateScale(10),
//   },
//   atCurrentRate: {
//     fontSize: moderateScale(12),
//     color: '#6B7280',
//     marginTop: moderateScale(4),
//   },
//   priceChip: {
//     backgroundColor: '#F5F3FF',
//     borderRadius: moderateScale(12),
//     padding: moderateScale(12),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: moderateScale(20),
//   },
//   priceChipLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   payoLogoCircle: {
//     width: moderateScale(32),
//     height: moderateScale(32),
//     borderRadius: moderateScale(16),
//     backgroundColor: '#6366F1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: moderateScale(10),
//   },
//   payoLogoText: {
//     color: '#FFF',
//     fontWeight: '700',
//     fontSize: moderateScale(14),
//   },
//   priceLabel: {
//     fontSize: moderateScale(11),
//     color: '#6B7280',
//   },
//   priceValue: {
//     fontSize: moderateScale(15),
//     fontWeight: '700',
//     color: '#1F2937',
//   },
//   priceChipRight: {
//     alignItems: 'flex-end',
//   },
//   priceChangeBadge: {
//     backgroundColor: '#DCFCE7',
//     paddingHorizontal: moderateScale(8),
//     paddingVertical: moderateScale(3),
//     borderRadius: moderateScale(20),
//   },
//   priceChangeText: {
//     fontSize: moderateScale(11),
//     fontWeight: '700',
//     color: '#15803D',
//   },
//   miniChartLine: {
//     // Simulated path line design
//     width: moderateScale(40),
//     height: moderateScale(2),
//     backgroundColor: '#A7F3D0',
//     marginTop: moderateScale(6),
//     transform: [{ rotate: '-5deg' }],
//   },
//   detailsList: {
//     marginTop: moderateScale(5),
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginVertical: moderateScale(8),
//   },
//   detailLabelContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     zIndex: 2,
//     backgroundColor: '#FFF',
//     paddingRight: moderateScale(4),
//   },
//   rowIcon: {
//     marginRight: moderateScale(8),
//     color: '#818CF8',
//   },
//   detailLabel: {
//     fontSize: moderateScale(13),
//     color: '#4B5563',
//   },
//   dottedDivider: {
//     flex: 1,
//     color: '#E5E7EB',
//     paddingHorizontal: moderateScale(2),
//     textAlign: 'center',
//     letterSpacing: 1.5,
//   },
//   feeValue: {
//     fontSize: moderateScale(13),
//     fontWeight: '700',
//     color: '#22C55E',
//     backgroundColor: '#FFF',
//     paddingLeft: moderateScale(4),
//     zIndex: 2,
//   },
//   upiMethodText: {
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//     color: '#374151',
//     backgroundColor: '#FFF',
//     paddingLeft: moderateScale(4),
//     zIndex: 2,
//   },
//   instantValue: {
//     fontSize: moderateScale(12),
//     fontWeight: '800',
//     color: '#22C55E',
//     backgroundColor: '#FFF',
//     paddingLeft: moderateScale(4),
//     zIndex: 2,
//   },
//   walletTarget: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     paddingLeft: moderateScale(4),
//     zIndex: 2,
//   },
//   miniWalletLogo: {
//     width: moderateScale(16),
//     height: moderateScale(16),
//     borderRadius: moderateScale(8),
//     backgroundColor: '#6366F1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: moderateScale(4),
//   },
//   miniWalletLogoText: {
//     color: '#FFF',
//     fontSize: moderateScale(9),
//     fontWeight: '700',
//   },
//   depositWalletValue: {
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//     color: '#374151',
//   },
//   promoCard: {
//     backgroundColor: '#ECFDF5',
//     borderWidth: 1,
//     borderColor: '#A7F3D0',
//     borderRadius: moderateScale(12),
//     padding: moderateScale(12),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: moderateScale(12),
//   },
//   promoLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   promoIconContainer: {
//     width: scale(36),
//     height: scale(36),
//     borderRadius: moderateScale(8),
//     backgroundColor: '#FEF3C7',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: moderateScale(12),
//   },
//   promoTitle: {
//     fontSize: moderateScale(13),
//     fontWeight: '700',
//     color: '#065F46',
//   },
//   promoSubtitle: {
//     fontSize: moderateScale(11),
//     color: '#047857',
//     marginTop: moderateScale(1),
//   },
//   promoRightAction: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   applyNowText: {
//     fontSize: moderateScale(12),
//     fontWeight: '700',
//     color: '#6366F1',
//     marginRight: moderateScale(2),
//   },
//   rewardsCard: {
//     backgroundColor: '#FFFDF2',
//     borderWidth: 1,
//     borderColor: '#FEF3C7',
//     borderRadius: moderateScale(12),
//     padding: moderateScale(14),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: moderateScale(14),
//   },
//   rewardsLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   giftIconContainer: {
//     width: scale(34),
//     height: scale(34),
//     borderRadius: moderateScale(8),
//     backgroundColor: '#F59E0B',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: moderateScale(12),
//   },
//   rewardsTitle: {
//     fontSize: moderateScale(13),
//     fontWeight: '700',
//     color: '#92400E',
//   },
//   rewardsAmount: {
//     fontSize: moderateScale(11),
//     color: '#B45309',
//     marginTop: moderateScale(1),
//   },
//   rewardBonusBadge: {
//     backgroundColor: '#D1FAE5',
//     paddingHorizontal: moderateScale(8),
//     paddingVertical: moderateScale(4),
//     borderRadius: moderateScale(6),
//   },
//   rewardBonusBadgeText: {
//     fontSize: moderateScale(11),
//     fontWeight: '700',
//     color: '#065F46',
//   },
//   disclaimerContainer: {
//     backgroundColor: '#EEF2F6',
//     borderRadius: moderateScale(12),
//     padding: moderateScale(14),
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: scale(25),
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   infoIcon: {
//     marginRight: moderateScale(10),
//     alignSelf: 'flex-start',
//     marginTop: moderateScale(2),
//   },
//   disclaimerText: {
//     flex: 1,
//     fontSize: moderateScale(12),
//     color: '#4B5563',
//     lineHeight: moderateScale(16),
//     paddingRight: moderateScale(20),
//   },
//   disclaimerWalletArt: {
//     position: 'absolute',
//     right: moderateScale(10),
//     bottom: moderateScale(8),
//     opacity: 0.6,
//   },
//   proceedButtonAction: {
//     borderRadius: moderateScale(12),
//     overflow: 'hidden',
//     marginBottom: moderateScale(15),
//   },
//   proceedGradient: {
//     flexDirection: 'row',
//     paddingVertical: moderateScale(16),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   proceedButtonText: {
//     fontSize: moderateScale(15),
//     fontWeight: '700',
//     color: '#FFF',
//   },
//   secureNoteRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: moderateScale(5),
//   },
//   secureNoteText: {
//     fontSize: moderateScale(11),
//     color: '#9CA3AF',
//     marginLeft: moderateScale(6),
//   },
// });



///////////////////////////////////////////////////////////////////////////////


// screens/ConfirmDepositScreen.js
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

// Responsive scaling (adjust path if needed)
const scale = (size) => size;
const verticalScale = (size) => size;
const moderateScale = (size, factor = 0.5) => size;

export default function ConfirmDepositScreen() {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();

  // Read all data from Redux
  const {
    amount,
    paymentMethod,        
    expectedCrypto,
    cryptoRate,
    processingFee,
    estimatedTime,
    rewardsEarned,
    upiId,
    qrCodeUrl,
    loading,
    error,
  } = useSelector((state) => state.deposit);

  

  // Derive values safely
  const formattedAmount = amount?.toLocaleString('en-IN') || '0';
  const methodTitle = paymentMethod?.title || 'N/A';
  const methodImage = paymentMethod?.imageSource || null; // asset reference
  const feeDisplay = processingFee?.toFixed(2) || '0.00';
  const rewardsDisplay = rewardsEarned || 0;
const displayEstimatedTime = paymentMethod?.tag || estimatedTime || 'INSTANT';


  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.warn('navigation is undefined in handleBack');
    }
  };

  const handleProceed = async () => {
    try {
      // dispatch(updatePaymentStatus('PENDING'));
        navigation.navigate('MakePayment'); 

      // Simulate deposit API call
      await new Promise((resolve) => setTimeout(resolve, 600));
      // dispatch(updatePaymentStatus('SUCCESS'));

      // if (Platform.OS === 'android') {
      //   ToastAndroid.show('Deposit successful!', ToastAndroid.SHORT);
      // }

      dispatch(resetDepositFlow());
      // Safely pop to top (or navigate to home)
      // if (navigation && navigation.popToTop) {
      //   navigation.popToTop();
      // } else if (navigation) {
      //   // navigation.navigate('MakePayment'); 
      // }
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
      <StatusBar barStyle="dark-content" backgroundColor="#F4F8F6" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <FeatherIcon name="chevron-left" size={moderateScale(24)} color="#4A5568" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Confirm Deposit</Text>
          <Text style={styles.headerSubtitle}>Please review your deposit details </Text>
          <Text style={styles.headerSubtitle}>before proceeding</Text>
        </View>
        <TouchableOpacity style={styles.helpButton}>
          <FeatherIcon name="help-circle" size={moderateScale(22)} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Deposit Summary Main Header */}
        <View style={styles.summaryHeaderRow}>
          <Text style={styles.depositSummaryTitle}>Deposit Summary</Text>
          <View style={styles.secureBadge}>
            <MaterialCommunityIcons name="shield-check" size={moderateScale(14)} color="#6366F1" />
            <Text style={styles.secureText}>100% Secure</Text>
          </View>
        </View>

        {/* Main Deposit Card */}
        <View style={styles.summaryCard}>
          {/* Conversion Visual Row – with payment method image */}
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

            <FeatherIcon name="arrow-right" size={moderateScale(22)} color="#6366F1" style={styles.arrowIcon} />

            <View style={[styles.conversionColumn, { alignItems: 'flex-end' }]}>
              <Text style={styles.conversionLabel}>You will receive <Text style={styles.labelSub}>(approx)</Text></Text>
              <Text style={styles.receiveValue}>{expectedCrypto?.toFixed(3) || '0.000'} PAYO</Text>
              <Text style={styles.atCurrentRate}>at current rate</Text>
            </View>
          </View>

          {/* Current Price Banner */}
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

          {/* Transaction Detailed Fields */}
          <View style={styles.detailsList}>
            {/* Processing Fee */}
            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <FeatherIcon name="dollar-sign" size={moderateScale(16)} color="#6366F1" style={styles.rowIcon} />
                <Text style={styles.detailLabel}>Processing Fee</Text>
              </View>
              <Text style={styles.dottedDivider} numberOfLines={1}>....................................................................</Text>
              <Text style={styles.feeValue}>₹{feeDisplay}</Text>
            </View>

            {/* Payment Method – with image */}
            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <FeatherIcon name="credit-card" size={moderateScale(16)} color="#6366F1" style={styles.rowIcon} />
                <Text style={styles.detailLabel}>Payment Method</Text>
              </View>
              <Text style={styles.dottedDivider} numberOfLines={1}>....................................................................</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingLeft: 4, zIndex: 2 }}>
                {methodImage && (
                  <Image source={methodImage} style={{ width: 20, height: 20, marginRight: 6 }} resizeMode="contain" />
                )}
                <Text style={styles.upiMethodText}>{methodTitle}</Text>
              </View>
            </View>

            {/* Estimated Time */}
            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <FeatherIcon name="clock" size={moderateScale(16)} color="#6366F1" style={styles.rowIcon} />
                <Text style={styles.detailLabel}>Estimated Time</Text>
              </View>
              <Text style={styles.dottedDivider} numberOfLines={1}>....................................................................</Text>
              {/* <Text style={styles.instantValue}>{estimatedTime || 'INSTANT'} ⚡</Text> */}
              <Text style={styles.instantValue}>
  {paymentMethod?.tag || estimatedTime || 'INSTANT'}
</Text>
            </View>

            {/* Deposit To */}
            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <FeatherIcon name="lock" size={moderateScale(16)} color="#6366F1" style={styles.rowIcon} />
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

        {/* Promo Code Banner */}
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
            <FeatherIcon name="chevron-right" size={moderateScale(14)} color="#6366F1" />
          </View>
        </TouchableOpacity>

        {/* Rewards Section */}
        <View style={styles.rewardsCard}>
          <View style={styles.rewardsLeft}>
            <View style={styles.giftIconContainer}>
              <FeatherIcon name="gift" size={moderateScale(18)} color="#FFF" />
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

        {/* Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <FeatherIcon name="info" size={moderateScale(16)} color="#6366F1" style={styles.infoIcon} />
          <Text style={styles.disclaimerText}>
            The PAYO amount you receive may vary slightly due to market fluctuations
          </Text>
          {/* <MaterialCommunityIcons name="wallet-outline" size={moderateScale(28)} color="#A5B4FC" style={styles.disclaimerWalletArt} /> */}
          <Image source={require('../../../assets/images/wallet/wallet.png')} size={moderateScale(28)} />
        </View>

        {/* Proceed Button */}
        <TouchableOpacity style={styles.proceedButtonAction} onPress={handleProceed} disabled={loading}>
          <LinearGradient colors={['#6366F1', '#4F46E5']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.proceedGradient}>
            <MaterialCommunityIcons name="shield-check-outline" size={moderateScale(20)} color="#FFF" style={{ marginRight: moderateScale(8) }} />
            <Text style={styles.proceedButtonText}>{loading ? 'Processing...' : 'Proceed to Payment'}</Text>
            <FeatherIcon name="arrow-right" size={moderateScale(18)} color="#FFF" style={{ marginLeft: moderateScale(8) }} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.secureNoteRow}>
          <FeatherIcon name="lock" size={moderateScale(12)} color="#9CA3AF" />
          <Text style={styles.secureNoteText}>Your payment details are 100% secure and encrypted</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ... (your styles remain unchanged) ...



// ─── Styles ──────────────────────────────────────────────────────────────────────

// ─── Styles ──────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
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
  summaryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(15),
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(4),
  },
  depositSummaryTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#1F2937',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secureText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: '#6366F1',
    marginLeft: moderateScale(4),
  },
  summaryCard: {
    backgroundColor: '#FFF',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: moderateScale(14),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
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
    color: '#6B7280',
    marginBottom: moderateScale(4),
  },
  labelSub: {
    fontSize: moderateScale(10),
    color: '#9CA3AF',
  },
  conversionValue: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: '#1F2937',
  },
  receiveValue: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#6366F1',
  },
  viaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(4),
  },
  viaText: {
    fontSize: moderateScale(12),
    color: '#9CA3AF',
  },
  upiText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#374151',
  },
  arrowIcon: {
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
  },
  atCurrentRate: {
    fontSize: moderateScale(12),
    color: '#6B7280',
    marginTop: moderateScale(4),
  },
  priceChip: {
    backgroundColor: '#F5F3FF',
    borderRadius: moderateScale(12),
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
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10),
  },
  payoLogoText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: moderateScale(14),
  },
  priceLabel: {
    fontSize: moderateScale(11),
    color: '#6B7280',
  },
  priceValue: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#1F2937',
  },
  priceChipRight: {
    alignItems: 'flex-end',
  },
  priceChangeBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(20),
  },
  priceChangeText: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: '#15803D',
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
    backgroundColor: '#FFF',
    paddingRight: moderateScale(4),
  },
  rowIcon: {
    marginRight: moderateScale(8),
    color: '#818CF8',
  },
  detailLabel: {
    fontSize: moderateScale(13),
    color: '#4B5563',
  },
  dottedDivider: {
    flex: 1,
    color: '#E5E7EB',
    paddingHorizontal: moderateScale(2),
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  feeValue: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#22C55E',
    backgroundColor: '#FFF',
    paddingLeft: moderateScale(4),
    zIndex: 2,
  },
  upiMethodText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#374151',
    backgroundColor: '#FFF',
    paddingLeft: moderateScale(4),
    zIndex: 2,
  },
  instantValue: {
    fontSize: moderateScale(12),
    fontWeight: '800',
    color: '#22C55E',
    backgroundColor: '#FFF',
    paddingLeft: moderateScale(4),
    zIndex: 2,
  },
  walletTarget: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingLeft: moderateScale(4),
    zIndex: 2,
  },
  miniWalletLogo: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(4),
  },
  miniWalletLogoText: {
    color: '#FFF',
    fontSize: moderateScale(9),
    fontWeight: '700',
  },
  depositWalletValue: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#374151',
  },
  promoCard: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: moderateScale(12),
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
    borderRadius: moderateScale(8),
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  promoTitle: {
    fontSize: moderateScale(13),
    fontWeight: '700',
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
    fontWeight: '700',
    color: '#6366F1',
    marginRight: moderateScale(2),
  },
  rewardsCard: {
    backgroundColor: '#FFFDF2',
    borderWidth: 1,
    borderColor: '#FEF3C7',
    borderRadius: moderateScale(12),
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
    borderRadius: moderateScale(8),
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  rewardsTitle: {
    fontSize: moderateScale(13),
    fontWeight: '700',
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
    borderRadius: moderateScale(6),
  },
  rewardBonusBadgeText: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: '#065F46',
  },
  disclaimerContainer: {
    backgroundColor: '#EEF2F6',
    borderRadius: moderateScale(12),
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
    color: '#4B5563',
    lineHeight: moderateScale(16),
    paddingRight: moderateScale(20),
  },
  disclaimerWalletArt: {
    position: 'absolute',
    right: moderateScale(10),
    bottom: moderateScale(8),
    opacity: 0.6,
  },
  proceedButtonAction: {
    borderRadius: moderateScale(12),
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
    fontWeight: '700',
    color: '#FFF',
  },
  secureNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(5),
  },
  secureNoteText: {
    fontSize: moderateScale(11),
    color: '#9CA3AF',
    marginLeft: moderateScale(6),
  },
});