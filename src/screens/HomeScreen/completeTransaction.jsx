// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   StatusBar,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather';
// import { globalStyles, theme } from '../../MainTheme/theme';
// import { verticalScale, scale, moderateScale } from '../../utils/responsive'; // Imported scale and moderateScale for deep responsiveness
// import { useAppSelector } from '../../redux/hooks';

// const { width: windowWidth } = Dimensions.get('window');

// export default function PaymentCompleteDetails({ route, navigation }) {
//   // Extract dynamic parameters passed down from previous transaction stacks
//   const { amount = '300', recipient = 'User 2',transactionId , wallet_id} = route.params || {};

//   const handleBackToHome = () => {
//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'Main', state: { routes: [{ name: 'Home' }] } }],
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
//       <StatusBar backgroundColor={theme.colors.bgApp} barStyle="dark-content" />

//       {/* HEADER ROW */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.backButton} 
//           onPress={handleBackToHome}
//           activeOpacity={0.7}
//         >
//           <Icon name="chevron-left" size={moderateScale(24)} color={theme.colors.textMain} />
//         </TouchableOpacity>
        
//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle}>Transaction Details</Text>
//           <Text style={styles.headerSubtitle}>View your transaction information</Text>
//         </View>

//         <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
//           <Icon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView 
//         showsVerticalScrollIndicator={false} 
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* SUCCESS GRADIENT BANNER CARD */}
//         <LinearGradient
//           colors={['#6366f1', '#4f46e5', '#3b82f6']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.gradientCard}
//         >
//           {/* Decorative Circle Elements */}
//           <Image 
//             source={require('../../../assets/images/transactionScreen/Image Container.png')} 
//             style={styles.bgGlowOverlay}
//             resizeMode="cover"
//           />

//           <View style={styles.gradientCardContent}>
//             {/* Success Check Icon Frame */}
//             <Image 
//               source={require('../../../assets/images/transactionScreen/Wallet Icon Container.png')}
//               style={styles.statusCheckImage}
//               resizeMode="contain"
//             />
            
//             <View style={styles.statusTextContainer}>
//               <Text style={styles.paymentStatusText}>Payment Successful</Text>
//               <View style={styles.amountContainer}>
//                 <Text style={styles.amountText}>{amount}</Text>
//                 <Text style={styles.currencyText}>PAYO</Text>
//               </View>
//               <Text style={styles.recipientText}>Paid to {recipient}</Text>
//             </View>

//             {/* Wallet Visual illustration */}
//             <Image 
//               source={require('../../../assets/images/transactionScreen/Wallet image 1.png')} 
//               style={styles.walletIllustration}
//               resizeMode="contain"
//             />
//           </View>
//         </LinearGradient>

//         {/* METRICS & RECEIPT DETAILS CARD */}
//         <View style={[globalStyles.card, styles.detailsCard]}>
//           <View style={styles.detailRow}>
//             <Text style={globalStyles.textMuted}>Transaction ID</Text>
//             <Text style={styles.detailValueBold}>{transactionId}</Text>
//           </View>
//           <View style={styles.divider} />

//           <View style={styles.detailRow}>
//             <Text style={globalStyles.textMuted}>Paid via</Text>
//             <Text style={styles.detailValue}>Wallet : {wallet_id}</Text>
//           </View>
//           <View style={styles.divider} />

//           <View style={styles.detailRow}>
//             <Text style={globalStyles.textMuted}>Date & Time</Text>
//             <Text style={styles.detailValue}>8 July 2026 09:42 AM</Text>
//           </View>
//           <View style={styles.divider} />

//           <View style={styles.detailRow}>
//             <Text style={globalStyles.textMuted}>Status</Text>
//             <View style={styles.statusPillContainer}>
//               <Text style={[globalStyles.textSuccess, styles.statusLabel]}>Completed</Text>
//               <Icon name="check-circle" size={moderateScale(16)} color={theme.colors.statusSuccess} />
//             </View>
//           </View>
//           <View style={styles.divider} />

//           <View style={styles.detailRow}>
//             <Text style={globalStyles.textMuted}>Transfer Fee</Text>
//             <Text style={styles.detailValueBold}>₹0.00</Text>
//           </View>
//         </View>

//         {/* REWARDS BANNER PILL */}
//         <TouchableOpacity style={styles.rewardsCard} activeOpacity={0.9}>
//           <Image 
//             source={require('../../../assets/images/transactionScreen/Image Container.png')} 
//             style={styles.rewardsBgGlow}
//             resizeMode="cover"
//           />
          
//           <View style={styles.rewardsContent}>
//             <View style={styles.giftIconContainer}>
//               {/* <Icon name="gift" size={moderateScale(24)} color="#ea580c" /> */}
//               <Image 
//             source={require('../../../assets/images/transactionScreen/Text (1).png')} 
//             style={styles.rewardsIcon}
//             resizeMode="cover"
//           />
//             </View>
//             <View style={styles.rewardsTextContainer}>
//               <Text style={styles.rewardsTitle}>Rewards Earned</Text>
//               <Text style={styles.rewardsSubtitle}>+ 20 PAYO points added to wallet</Text>
//             </View>
//           </View>
//           <Icon name="chevron-right" size={moderateScale(18)} color={theme.colors.primaryPurple} />
//         </TouchableOpacity>

//         {/* ACTION BUTTON FOOTER ROW */}
//         <View style={styles.actionRow}>
//   <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8}>
//     <Text style={styles.downloadBtnText}>Download Receipt</Text>
//     <Icon 
//       name="download" 
//       size={moderateScale(16)} 
//       color={theme.colors.primaryBlue} 
//       style={{ marginLeft: scale(8) }} 
//     />
//   </TouchableOpacity>

//   <TouchableOpacity style={styles.shareBtn} activeOpacity={0.8}>
//     <Text style={styles.shareBtnText}>Share</Text>
//     <Icon 
//       name="share-2" 
//       size={moderateScale(16)} 
//       color="#ffffff" 
//       style={{ marginLeft: scale(8) }} 
//     />
//   </TouchableOpacity>
// </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.bgApp,
//   },
//   scrollContent: {
//     paddingHorizontal: scale(16),
//     paddingBottom: verticalScale(32),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(12),
//     backgroundColor: theme.colors.bgApp,
//   },
//   backButton: {
//     width: moderateScale(40),
//     height: moderateScale(40),
//     borderRadius: theme.borderRadius.full,
//     backgroundColor: theme.colors.bgSurface,
//     alignItems: 'center',
//     justifyContent: 'center',
//     ...theme.shadows.sm,
//   },
//   headerTitleContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     fontSize: moderateScale(18), // Responsive text size
//     fontWeight: theme.typography.weight.bold,
//     color: theme.colors.textMain,
//   },
//   headerSubtitle: {
//     fontSize: moderateScale(12),
//     color: theme.colors.textMuted,
//     marginTop: verticalScale(2),
//   },
//   infoButton: {
//     width: moderateScale(40),
//     height: moderateScale(40),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   gradientCard: {
//     borderRadius: theme.borderRadius.lg,
//     marginTop: verticalScale(16),
//     marginBottom: verticalScale(24), // Reduced from 40 to avoid crowding standard/small screens
//     height: verticalScale(130), // Proportional height
//     position: 'relative',
//     overflow: 'hidden',
//     ...theme.shadows.md,
//   },
//   bgGlowOverlay: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     opacity: 0.15,
//   },
//   gradientCardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: scale(16),
//     height: '100%',
//   },
//   statusCheckImage: {
//     width: scale(64),
//     height: scale(64),
//   },
//   statusTextContainer: {
//     flex: 1,
//     marginLeft: scale(12),
//     justifyContent: 'center',
//   },
//   paymentStatusText: {
//     fontSize: moderateScale(15),
//     color: '#FFFFFF',
//     fontWeight: theme.typography.weight.medium,
//   },
//   amountContainer: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//     marginVertical: verticalScale(2),
//   },
//   amountText: {
//     fontSize: moderateScale(28),
//     fontWeight: theme.typography.weight.bold,
//     color: '#ffffff',
//   },
//   currencyText: {
//     fontSize: moderateScale(13),
//     color: '#ffffff',
//     fontWeight: theme.typography.weight.semibold,
//     marginLeft: scale(4),
//   },
//   recipientText: {
//     fontSize: moderateScale(12),
//     color: '#FFFFFF',
//   },
//   walletIllustration: {
//     width: scale(85),
//     height: scale(85),
//   },
//   detailsCard: {
//     paddingVertical: verticalScale(8),
//     borderWidth: 0,
//        backgroundColor: '#F2F4F4',
//     marginTop: verticalScale(20), // Fixed: passed explicit density value
//     marginBottom:verticalScale(20),
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: verticalScale(14),
//      borderBottomColor: '#9EA1A8',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#9EA1A8',
  
//     width: '100%',
//   },
//   detailValue: {
//     fontSize: moderateScale(13),
//     color: theme.colors.textMain,
//     fontWeight: theme.typography.weight.medium,
//   },
//   detailValueBold: {
//     fontSize: moderateScale(13),
//     color: theme.colors.textMain,
//     fontWeight: theme.typography.weight.bold,
//   },
//   statusPillContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statusLabel: {
//     fontSize: moderateScale(13),
//     fontWeight: theme.typography.weight.semibold,
//     marginRight: scale(6),
//   },
//   rewardsCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#f5f3ff',
//     borderWidth: 1,
//     borderColor: '#e9d5ff',
//     borderRadius: theme.borderRadius.md,
//     padding: scale(14),
//     marginTop: verticalScale(20),
//     marginBottom: verticalScale(24),
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   rewardsBgGlow: {
//     position: 'absolute',
//     right: 50,
//     bottom: 0,
//     width: scale(100),
//     // height: '100%',
//     opacity: 1,
//   },
//   rewardsIcon:{
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//     width: 40,
//     height: 40,
//     opacity: 1,
    
//   },
//   rewardsContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
    
//   },
//   giftIconContainer: {
//     width: scale(40),
//     height: scale(40),
//     borderRadius: theme.borderRadius.sm,
//     // backgroundColor: '#ffedd5',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   rewardsTextContainer: {
//     marginLeft: scale(12),
//   },
//   rewardsTitle: {
//     fontSize: moderateScale(15),
//     color: theme.colors.primaryPurple,
//     fontWeight: theme.typography.weight.bold,
//   },
//   rewardsSubtitle: {
//     fontSize: moderateScale(12),
//     color: theme.colors.primaryPurple,
//     marginTop: verticalScale(2),
//   },
//  actionRow: {
//   flexDirection: 'row',
//   justifyContent: 'center', // Centers the buttons horizontally
//   alignItems: 'center',
//   marginTop: verticalScale(16), // Slightly increased spacing for a cleaner visual layout
// },
// downloadBtn: {
//   width: scale(150), // Decreased to a compact, responsive width
//   height: verticalScale(46),
//   borderRadius: theme.borderRadius.sm,
//   borderWidth: 1.5,
//   borderColor: theme.colors.primaryBlue,
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginRight: scale(12), // Gap between the buttons
//   backgroundColor: 'transparent',
// },
// downloadBtnText: {
//   color: theme.colors.primaryBlue,
//   fontSize: moderateScale(13),
//   fontWeight: theme.typography.weight.semibold,
// },
// shareBtn: {
//   width: scale(120), // Matches the download button width
//   height: verticalScale(46),
//   borderRadius: theme.borderRadius.sm,
//   backgroundColor: theme.colors.primaryBlue,
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   ...theme.shadows.sm,
// },
// shareBtnText: {
//   color: '#ffffff',
//   fontSize: moderateScale(13),
//   fontWeight: theme.typography.weight.semibold,
// },
// });




















import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  BackHandler, // Added BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { globalStyles, theme } from '../../MainTheme/theme';
import { verticalScale, scale, moderateScale } from '../../utils/responsive'; 
import { useAppSelector } from '../../redux/hooks';

const { width: windowWidth } = Dimensions.get('window');

export default function PaymentCompleteDetails({ route, navigation }) {
  const { amount = '300', recipient = 'User 2',transactionId , wallet_id} = route.params || {};

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main', state: { routes: [{ name: 'Home' }] } }],
    });
    return true; // Return true to indicate the back action was handled
  };

  // Listen for hardware back press (Android physical button or swipe gesture)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackToHome
    );

    // Cleanup the event listener on unmount
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar backgroundColor={theme.colors.bgApp} barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackToHome}
          activeOpacity={0.7}
        >
          <Icon name="chevron-left" size={moderateScale(24)} color={theme.colors.primaryBlue} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Transaction Details</Text>
          <Text style={styles.headerSubtitle}>View your transaction information</Text>
        </View>

        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <Icon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >

        <LinearGradient
          colors={['#6366f1', '#4f46e5', '#3b82f6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          <Image 
            source={require('../../../assets/images/transactionScreen/Image Container.png')} 
            style={styles.bgGlowOverlay}
            resizeMode="cover"
          />

          <View style={styles.gradientCardContent}>

            <Image 
              source={require('../../../assets/images/transactionScreen/Wallet Icon Container.png')}
              style={styles.statusCheckImage}
              resizeMode="contain"
            />
            
            <View style={styles.statusTextContainer}>
              <Text style={styles.paymentStatusText}>Payment Successful</Text>
              <View style={styles.amountContainer}>
                <Text style={styles.amountText}>{amount}</Text>
                <Text style={styles.currencyText}>PAYO</Text>
              </View>
              {/* <Text style={styles.recipientText}>Paid to {recipient}</Text> */}
            </View>

            <Image 
              source={require('../../../assets/images/transactionScreen/Wallet image 1.png')} 
              style={styles.walletIllustration}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>

        <View style={[globalStyles.card, styles.detailsCard]}>
          <View style={styles.detailRow}>
            <Text style={globalStyles.textMuted}>Transaction ID</Text>
            <Text style={styles.detailValueBold}>{transactionId}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={globalStyles.textMuted}>Paid via</Text>
            <Text style={styles.detailValue}>Wallet : {wallet_id}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={globalStyles.textMuted}>Date & Time</Text>
            <Text style={styles.detailValue}>8 July 2026 09:42 AM</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={globalStyles.textMuted}>Status</Text>
            <View style={styles.statusPillContainer}>
              <Text style={[globalStyles.textSuccess, styles.statusLabel]}>Completed</Text>
              <Icon name="check-circle" size={moderateScale(16)} color={theme.colors.statusSuccess} />
            </View>
          </View>
          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={globalStyles.textMuted}>Transfer Fee</Text>
            <Text style={styles.detailValueBold}>₹0.00</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.rewardsCard} activeOpacity={0.9}>
          <Image 
            source={require('../../../assets/images/transactionScreen/Image Container.png')} 
            style={styles.rewardsBgGlow}
            resizeMode="cover"
          />
          
          <View style={styles.rewardsContent}>
            <View style={styles.giftIconContainer}>
              <Image 
            source={require('../../../assets/images/transactionScreen/Text (1).png')} 
            style={styles.rewardsIcon}
            resizeMode="cover"
          />
            </View>
            <View style={styles.rewardsTextContainer}>
              <Text style={styles.rewardsTitle}>Rewards Earned</Text>
              <Text style={styles.rewardsSubtitle}>+ 20% PAYO's added to Wallet</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={moderateScale(18)} color={theme.colors.primaryPurple} />
        </TouchableOpacity>

        <View style={styles.actionRow}>
  <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8}>
    <Text style={styles.downloadBtnText}>Download Receipt</Text>
    <Icon 
      name="download" 
      size={moderateScale(16)} 
      color={theme.colors.primaryBlue} 
      style={{ marginLeft: scale(8) }} 
    />
  </TouchableOpacity>

  <TouchableOpacity style={styles.shareBtn} activeOpacity={0.8}>
    <Text style={styles.shareBtnText}>Share</Text>
    <Icon 
      name="share-2" 
      size={moderateScale(16)} 
      color="#ffffff" 
      style={{ marginLeft: scale(8) }} 
    />
  </TouchableOpacity>
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
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: theme.colors.bgApp,
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.bgSurface,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(18), 
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },
  headerSubtitle: {
    fontSize: moderateScale(12),
    color: theme.colors.textMuted,
    marginTop: verticalScale(2),
  },
  infoButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientCard: {
    borderRadius: theme.borderRadius.lg,
    marginTop: verticalScale(16),
    marginBottom: verticalScale(24), 
    height: verticalScale(130), 
    position: 'relative',
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  bgGlowOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.15,
  },
  gradientCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    height: '100%',
  },
  statusCheckImage: {
    width: scale(64),
    height: scale(64),
  },
  statusTextContainer: {
    flex: 1,
    marginLeft: scale(12),
    justifyContent: 'center',
  },
  paymentStatusText: {
    fontSize: moderateScale(15),
    color: '#FFFFFF',
    fontWeight: theme.typography.weight.medium,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: verticalScale(2),
  },
  amountText: {
    fontSize: moderateScale(28),
    fontWeight: theme.typography.weight.bold,
    color: '#ffffff',
  },
  currencyText: {
    fontSize: moderateScale(13),
    color: '#ffffff',
    fontWeight: theme.typography.weight.semibold,
    marginLeft: scale(4),
  },
  recipientText: {
    fontSize: moderateScale(12),
    color: '#FFFFFF',
  },
  walletIllustration: {
    width: scale(85),
    height: scale(85),
  },
  detailsCard: {
    paddingVertical: verticalScale(8),
    borderWidth: 0,
       backgroundColor: '#F2F4F4',
    marginTop: verticalScale(20), 
    marginBottom:verticalScale(20),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
     borderBottomColor: '#9EA1A8',
  },
  divider: {
    height: 1,
    backgroundColor: '#9EA1A8',
  
    width: '100%',
  },
  detailValue: {
    fontSize: moderateScale(13),
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium,
  },
  detailValueBold: {
    fontSize: moderateScale(13),
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.bold,
  },
  statusPillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.semibold,
    marginRight: scale(6),
  },
  rewardsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f3ff',
    borderWidth: 1,
    borderColor: '#e9d5ff',
    borderRadius: theme.borderRadius.md,
    padding: scale(14),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(24),
    position: 'relative',
    overflow: 'hidden',
  },
  rewardsBgGlow: {
    position: 'absolute',
    right: 50,
    bottom: 0,
    width: scale(100),
    // height: '100%',
    opacity: 1,
  },
  rewardsIcon:{
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    opacity: 1,
    
  },
  rewardsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    
  },
  giftIconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: theme.borderRadius.sm,
    // backgroundColor: '#ffedd5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardsTextContainer: {
    marginLeft: scale(12),
  },
  rewardsTitle: {
    fontSize: moderateScale(15),
    color: theme.colors.primaryPurple,
    fontWeight: theme.typography.weight.bold,
  },
  rewardsSubtitle: {
    fontSize: moderateScale(12),
    color: theme.colors.primaryPurple,
    marginTop: verticalScale(2),
  },
 actionRow: {
  flexDirection: 'row',
  justifyContent: 'center', 
  alignItems: 'center',
  marginTop: verticalScale(16), 
},
downloadBtn: {
  width: scale(150), 
  height: verticalScale(46),
  borderRadius: theme.borderRadius.sm,
  borderWidth: 1.5,
  borderColor: theme.colors.primaryBlue,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: scale(12),
  backgroundColor: 'transparent',
},
downloadBtnText: {
  color: theme.colors.primaryBlue,
  fontSize: moderateScale(13),
  fontWeight: theme.typography.weight.semibold,
},
shareBtn: {
  width: scale(120), 
  height: verticalScale(46),
  borderRadius: theme.borderRadius.sm,
  backgroundColor: theme.colors.primaryBlue,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  ...theme.shadows.sm,
},
shareBtnText: {
  color: '#ffffff',
  fontSize: moderateScale(13),
  fontWeight: theme.typography.weight.semibold,
},
});