// import { StyleSheet } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { moderateScale } from 'react-native-size-matters';


// export default StyleSheet.create({
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   scrollContent: {
//     paddingBottom: hp('18%'),
//     flexGrow: 1,
//   },

//   walletHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     paddingHorizontal: wp('5%'),
//     marginBottom: hp('2%'),
//     marginTop: hp('1%'),
//   },

//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     flex: 1,
//     paddingRight: wp('3%'),
//   },

//   cancelContainer: {
//     marginRight: wp('3%'),
//     paddingTop: hp('0.3%'),
//   },

//   walletTitle: {
//     color: '#fff',
//     fontSize: moderateScale(20),
//     fontWeight: '700',
//   },

//   walletId: {
//     color: '#d1d5db',
//     fontSize: moderateScale(11),
//     marginTop: hp('0.4%'),
//     maxWidth: wp('52%'),
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: wp('4%'),
//   },

//   walletNumber: {
//     color: '#fff',
//     fontSize: moderateScale(13),
//     marginTop: hp('0.4%'),
//   },

//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   avatar: {
//     width: wp('8%'),
//     height: wp('8%'),
//     borderRadius: wp('4%'),
//     backgroundColor: '#fff',
//     marginLeft: wp('2.5%'),
//   },

//   card: {
//     backgroundColor: '#6A1B9A',
//     marginHorizontal: wp('5%'),
//     marginBottom: hp('2.5%'),
//     padding: wp('5%'),
//     borderRadius: moderateScale(22),
//   },

//   active: {
//     color: '#00E5FF',
//     marginBottom: hp('1%'),
//     fontSize: moderateScale(13),
//   },

//   label: {
//     color: '#ccc',
//     fontSize: moderateScale(12),
//   },

//   balance: {
//     color: '#fff',
//     fontSize: moderateScale(26),
//     fontWeight: 'bold',
//     marginTop: hp('0.8%'),
//     flexWrap: 'wrap',
//   },

//   actions: {
//     flexDirection: 'row',
//     marginTop: hp('2%'),
//     flexWrap: 'wrap',
//   },

//   btnWhite: {
//     backgroundColor: '#fff',
//     paddingVertical: hp('1.2%'),
//     paddingHorizontal: wp('5%'),
//     borderRadius: moderateScale(10),
//     marginRight: wp('3%'),
//     marginBottom: hp('1%'),
//   },

//   btnOutline: {
//     borderWidth: 1,
//     borderColor: '#fff',
//     paddingVertical: hp('1.2%'),
//     paddingHorizontal: wp('5%'),
//     borderRadius: moderateScale(10),
//     marginBottom: hp('1%'),
//   },

//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginHorizontal: wp('5%'),
//     marginTop: hp('1%'),
//   },

//   sectionTitle: {
//     color: '#fff',
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//   },

//   history: {
//     color: '#00E5FF',
//     fontSize: moderateScale(13),
//   },

//   box: {
//     backgroundColor: '#eee',
//     marginHorizontal: wp('5%'),
//     marginTop: hp('2%'),
//     padding: wp('4.5%'),
//     borderRadius: moderateScale(14),
//   },

//   boxTitle: {
//     fontWeight: '600',
//     fontSize: moderateScale(14),
//     color: '#111',
//   },

//   amount: {
//     textAlign: 'right',
//     fontWeight: 'bold',
//     fontSize: moderateScale(14),
//     color: '#111',
//   },

//   pending: {
//     fontSize: moderateScale(10),
//     textAlign: 'right',
//     marginTop: hp('0.4%'),
//   },

//   locked: {
//     marginTop: hp('1%'),
//     color: '#777',
//     fontSize: moderateScale(12),
//   },

//   limit: {
//     color: '#16a34a',
//     fontWeight: '600',
//   },

//   progressBg: {
//     height: hp('0.8%'),
//     backgroundColor: '#ccc',
//     borderRadius: moderateScale(10),
//     marginVertical: hp('1.2%'),
//     overflow: 'hidden',
//   },

//   progressFill: {
//     height: '100%',
//     backgroundColor: '#16a34a',
//     borderRadius: moderateScale(10),
//   },

//   subText: {
//     fontSize: moderateScale(11),
//     color: '#666',
//   },

//   bottomButtons: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginHorizontal: wp('5%'),
//     marginTop: hp('3%'),
//     marginBottom: hp('4%'),
//   },

//   freezeBtn: {},

//   freezeText: {
//     color: '#fff',
//     fontWeight: '600',
//   },

//   sendBtn: {
//     borderWidth: 1,
//     borderColor: '#fff',
//     paddingVertical: hp('1.5%'),
//     paddingHorizontal: wp('6%'),
//     borderRadius: moderateScale(12),
//   },

//   sendText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: moderateScale(13),
//   },
// });

////////////////////////////////////////////////////////////////////



// import { StyleSheet } from 'react-native';
// import { theme } from '../../MainTheme/theme';

// import { scale, verticalScale, moderateScale } from '../../utils/responsive'; 

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.bgApp,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: theme.colors.bgApp,
//   },
//   scrollContent: {
//     flexGrow: 1, 
//   },
//   innerContainer: {
//     paddingHorizontal: scale(20),
//     paddingTop: verticalScale(16),
//     paddingBottom: verticalScale(100),
//   },
  
//   // Header Styles
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: verticalScale(20),
//   },
//   headerIconBtn: {
//     width: moderateScale(40),
//     height: moderateScale(40),
//     borderRadius: moderateScale(20),
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     ...theme.shadows.sm,
//   },
//   headerActionBtn: {
//     width: moderateScale(40),
//     height: moderateScale(40),
//     borderRadius: moderateScale(20),
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     ...theme.shadows.sm,
//   },
//   customHeaderIcon: {
//     width: moderateScale(20),
//     height: moderateScale(20),
//     resizeMode: 'contain',
//   },
//   headerTitleContainer: {
//     flex: 1,
//     marginLeft: scale(12),
//   },
//   headerTitle: {
//     fontSize: theme.typography.size.lg,
//     fontWeight: theme.typography.weight.bold,
//     color: theme.colors.textMain,
//   },
//   headerSubtitle: {
//     fontSize: theme.typography.size.xs,
//     color: theme.colors.textMuted,
//     marginTop: verticalScale(2),
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   badge: {
//     position: 'absolute',
//     top: -2,
//     right: -2,
//     backgroundColor: theme.colors.statusDanger,
//     borderRadius: 10,
//     width: 16,
//     height: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#fff',
//   },
//   badgeText: {
//     color: '#fff',
//     fontSize: 9,
//     fontWeight: 'bold',
//   },

//   // Main Card Styles
//   mainCard: {
//     borderRadius: moderateScale(24),
//     padding: moderateScale(20),
//     marginBottom: verticalScale(20),
//     overflow: 'hidden', // Ensures colors don't bleed out of bounds
//     ...theme.shadows.md,
//   },
//   cardTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: verticalScale(16),
//   },
//   activePill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffff20',
//     paddingHorizontal: scale(12),
//     paddingVertical: verticalScale(6),
//     borderRadius: theme.borderRadius.full,
//   },
//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#4ade80',
//     marginRight: scale(6),
//   },
//   activePillText: {
//     color: '#4ade80',
//     fontSize: theme.typography.size.xs,
//     fontWeight: theme.typography.weight.semibold,
//   },
//   balanceSection: {
//     marginTop: verticalScale(10),
//   },
//   balanceLabelRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   balanceLabel: {
//     color: '#e5e7eb',
//     fontSize: theme.typography.size.sm,
//   },
//   balanceValueRow: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//     marginTop: verticalScale(8),
//   },
//   balanceText: {
//     color: '#fff',
//     fontSize: moderateScale(36),
//     fontWeight: theme.typography.weight.bold,
//   },
//   currencyText: {
//     color: '#fff',
//     fontSize: theme.typography.size.lg,
//     fontWeight: theme.typography.weight.semibold,
//     marginLeft: scale(8),
//   },
//   bottomCardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: verticalScale(12),
//   },
//   addMoneyBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: scale(14),
//     paddingVertical: verticalScale(8),
//     borderRadius: theme.borderRadius.full,
//   },
//   addMoneyIcon: {
//     width: moderateScale(14),
//     height: moderateScale(14),
//     resizeMode: 'contain',
//   },
//   addMoneyText: {
//     color: theme.colors.statusSuccess,
//     fontWeight: theme.typography.weight.semibold,
//     marginLeft: scale(6),
//     fontSize: theme.typography.size.sm,
//   },
//   fiatText: {
//     color: '#d1d5db',
//     fontSize: theme.typography.size.sm,
//   },

//   // Action Buttons row explicitly side-by-side
//   actionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: verticalScale(20),
//     alignItems: 'center',
//   },
//   actionBtn: {
//     flex: 1, // Changed to 1 so they dynamically take 50% minus margin
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     paddingVertical: verticalScale(14),
//     marginHorizontal: scale(6), 
//     borderRadius: moderateScale(12),
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     ...theme.shadows.sm,
//   },
//   actionBtnText: {
//     color: theme.colors.textMain,
//     fontWeight: theme.typography.weight.medium,
//     marginRight: scale(8),
//     fontSize: theme.typography.size.sm,
//   },
//   actionIcon: {
//     width: moderateScale(18),
//     height: moderateScale(18),
//     resizeMode: 'contain',
//   },

//   // Promo Banner
//   promoBanner: {
//     borderRadius: moderateScale(16),
//     padding: moderateScale(16),
//     marginBottom: verticalScale(24),
//   },
//   promoContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   promoEmoji: {
//     fontSize: moderateScale(28),
//   },
//   promoTextContainer: {
//     flex: 1, 
//     marginLeft: scale(12)
//   },
//   promoTitle: {
//     color: '#fff',
//     fontWeight: theme.typography.weight.bold,
//     fontSize: theme.typography.size.sm,
//   },
//   promoSub: {
//     color: '#e0f2fe',
//     fontSize: theme.typography.size.xs,
//     marginTop: verticalScale(2),
//   },
//   promoBtn: {
//     backgroundColor: '#fff',
//     paddingHorizontal: scale(12),
//     paddingVertical: verticalScale(6),
//     borderRadius: theme.borderRadius.full,
//   },
//   promoBtnText: {
//     color: theme.colors.primaryPurple,
//     fontSize: theme.typography.size.xs,
//     fontWeight: theme.typography.weight.semibold,
//   },

//   // Section Headers
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: verticalScale(12),
//   },
//   sectionTitle: {
//     fontSize: theme.typography.size.base,
//     fontWeight: theme.typography.weight.bold,
//     color: theme.colors.textMain,
//   },
//   historyText: {
//     color: theme.colors.statusSuccess,
//     fontWeight: theme.typography.weight.semibold,
//     fontSize: theme.typography.size.sm,
//   },

//   // Data Cards
//   dataCard: {
//     padding: moderateScale(16),
//     marginBottom: verticalScale(16),
//     ...theme.shadows.sm,
//     borderColor: '#e5e7eb', 
//   },
//   dataCardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cardTitleText: {
//     color: theme.colors.textMain,
//     fontWeight: theme.typography.weight.semibold,
//     fontSize: theme.typography.size.sm,
//   },
//   cardAmountText: {
//     color: theme.colors.textMain,
//     fontWeight: theme.typography.weight.bold,
//     fontSize: theme.typography.size.base,
//   },
//   cardStatusTextPending: {
//     color: theme.colors.textMuted,
//     fontSize: 10,
//     marginTop: verticalScale(2),
//   },
//   cardStatusTextLocked: {
//     color: theme.colors.statusDanger,
//     fontSize: theme.typography.size.xs,
//     marginTop: verticalScale(4),
//   },
//   cardSubText: {
//     color: theme.colors.textMuted,
//     fontSize: theme.typography.size.xs,
//     marginTop: verticalScale(4),
//   },
//   limitHighlightText: {
//     color: theme.colors.statusSuccess,
//     fontWeight: theme.typography.weight.medium,
//     fontSize: theme.typography.size.xs,
//   },
//   progressBarBg: {
//     height: verticalScale(8),
//     backgroundColor: '#e5e7eb',
//     borderRadius: theme.borderRadius.full,
//     marginVertical: verticalScale(12),
//     overflow: 'hidden',
//   },
//   progressBarFill: {
//     height: '100%',
//     backgroundColor: theme.colors.statusSuccess,
//     borderRadius: theme.borderRadius.full,
//   },

//   // Send Button
//   sendPrimaryBtn: {
//     backgroundColor: theme.colors.primaryIndigo,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: verticalScale(16),
//     borderRadius: theme.borderRadius.md,
//     marginTop: verticalScale(8),
//     marginBottom: verticalScale(20),
//     ...theme.shadows.sm,
//   },
//   sendPrimaryBtnText: {
//     color: '#fff',
//     fontSize: theme.typography.size.base,
//     fontWeight: theme.typography.weight.semibold,
//     marginRight: scale(8),
//   },

//   // Bottom Promos
//   bottomPromoCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: moderateScale(16),
//     borderRadius: theme.borderRadius.md,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     marginBottom: verticalScale(12),
//   },
//   transparentIconBg: {
//     width: moderateScale(40),
//     height: moderateScale(40),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: scale(12),
//   },
//   promoImageLarge: {
//     width: moderateScale(32),
//     height: moderateScale(32),
//     resizeMode: 'contain',
//   },
//   bottomPromoTextContainer: {
//     flex: 1,
//   },
//   bottomPromoTitle: {
//     color: theme.colors.textMain,
//     fontWeight: theme.typography.weight.semibold,
//     fontSize: theme.typography.size.sm,
//   },
//   bottomPromoSub: {
//     color: theme.colors.textMuted,
//     fontSize: 10,
//     marginTop: verticalScale(2),
//   },
//   bottomPromoAction: {
//     fontWeight: theme.typography.weight.semibold,
//     fontSize: theme.typography.size.xs,
//   },
//   bonusTag: {
//     backgroundColor: '#d1fae5',
//     paddingHorizontal: scale(8),
//     paddingVertical: verticalScale(4),
//     borderRadius: theme.borderRadius.sm,
//   },
//   bonusTagText: {
//     color: theme.colors.statusSuccess,
//     fontSize: 10,
//     fontWeight: theme.typography.weight.bold,
//   },
// });

import { StyleSheet } from 'react-native';
import { theme } from '../../MainTheme/theme';
import { scale, verticalScale, moderateScale } from '../../utils/responsive'; 

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.bgApp,
  },
  scrollContent: {
    flexGrow: 1, 
    paddingBottom: 20,
  },
  innerContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(100),
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  headerIconBtn: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  headerActionBtn: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  customHeaderIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: scale(12),
  },
  headerTitle: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },
  headerSubtitle: {
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMain,
    marginTop: verticalScale(2),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: theme.colors.statusDanger,
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },

  // Restructured Main Card (Two-Column Layout)
  mainCard: {
    borderRadius: moderateScale(24),
    padding: moderateScale(20),
    paddingBottom:moderateScale(30),
     paddingTop:moderateScale(30),
    marginBottom: verticalScale(20),
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  mainCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainCardLeft: {
    flex: 1.2,
    justifyContent: 'center',
  },
  mainCardRight: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F4', // Transparent white tint backdrop
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: verticalScale(16),
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ade80',
    marginRight: scale(6),
  },
  activePillText: {
    color: '#4ade80',
    fontSize: theme.typography.size.xs,
    fontWeight: theme.typography.weight.semibold,
  },
  balanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  balanceLabel: {
    color: '#e5e7eb',
    fontSize: theme.typography.size.sm,
  },
  balanceValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  balanceText: {
    color: '#fff',
    fontSize: moderateScale(30),
    fontWeight: theme.typography.weight.bold,
  },
  currencyText: {
    color: '#fff',
    fontSize: theme.typography.size.base,
    fontWeight: theme.typography.weight.semibold,
    marginLeft: scale(6),
  },
  fiatText: {
    color: '#d1d5db',
    fontSize: theme.typography.size.sm,
    marginTop: verticalScale(4),
  },
  wallet3dImage: {
    width: moderateScale(110),
    height: moderateScale(100),
    resizeMode: 'contain',
    marginBottom: verticalScale(10),
  },
  addMoneyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
    borderRadius: theme.borderRadius.full,
    ...theme.shadows.sm,
     marginTop:verticalScale(8),
  },
  addMoneyText: {
    color: '#4f46e5',
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.sm,
  },

  // Symmetrical Row Actions
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
    alignItems: 'center',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: verticalScale(14),
    marginHorizontal: scale(6), 
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#285CE0',
    ...theme.shadows.sm,
  },
  actionBtnText: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium,
    marginRight: scale(8),
    fontSize: theme.typography.size.sm,
  },
  actionIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
    resizeMode: 'contain',
  },

  // Promo Banner
  promoBanner: {
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: verticalScale(24),
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoEmoji: {
    fontSize: moderateScale(28),
  },
  promoTextContainer: {
    flex: 1, 
    marginLeft: scale(12)
  },
  promoTitle: {
    color: '#fff',
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.sm,
    marginTop:verticalScale(6),
    marginBottom:verticalScale(6),
  },
  promoSub: {
    color: '#e0f2fe',
    fontSize: theme.typography.size.xs,
    marginTop: verticalScale(2),
  },
  promoBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: theme.borderRadius.md,
    marginTop:verticalScale(50),
  },
  promoBtnText: {
    color: theme.colors.primaryPurple,
    fontSize: theme.typography.size.xs,
    fontWeight: theme.typography.weight.semibold,
  },

  // Section Headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  sectionTitle: {
    fontSize: theme.typography.size.base,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },
  historyText: {
    color: theme.colors.statusSuccess,
    fontWeight: theme.typography.weight.semibold,
    fontSize: theme.typography.size.sm,
  },

  // Data Cards
  dataCard: {
    padding: moderateScale(16),
    marginBottom: verticalScale(16),
    ...theme.shadows.sm,
    borderColor: '#e5e7eb', 
  },
  dataCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitleText: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.semibold,
    fontSize: theme.typography.size.sm,
  },
  cardAmountText: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.base,
  },
  cardStatusTextPending: {
    color: theme.colors.textMuted,
    fontSize: 10,
    marginTop: verticalScale(2),
    fontWeight: '500',
  },
  cardStatusTextLocked: {
    color: theme.colors.statusDanger,
    fontSize: theme.typography.size.xs,
    marginTop: verticalScale(2),
    fontWeight: '700',
  },
  cardSubText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.size.xs,
  },
  limitHighlightText: {
    color: theme.colors.statusSuccess,
    fontWeight: theme.typography.weight.medium,
    fontSize: theme.typography.size.xs,
  },
  progressBarBg: {
    height: verticalScale(8),
    backgroundColor: '#e5e7eb',
    borderRadius: theme.borderRadius.full,
    marginVertical: verticalScale(12),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.statusSuccess,
    borderRadius: theme.borderRadius.full,
  },

  // Full-Width Primary Action Buttons
  sendPrimaryBtn: {
    backgroundColor: theme.colors.primaryIndigo,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(16),
    borderRadius: theme.borderRadius.md,
    marginTop: verticalScale(8),
    marginBottom: verticalScale(20),
    position: 'relative',
    ...theme.shadows.sm,
  },
  sendPrimaryBtnText: {
    color: '#fff',
    fontSize: theme.typography.size.base,
    fontWeight: theme.typography.weight.semibold,
    textAlign: 'center',
  },
  rightIconAbsolute: {
    position: 'absolute',
    right: scale(20),
  },

  // Bottom Promos
  bottomPromoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: verticalScale(12),
  },
  transparentIconBg: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  promoImageLarge: {
    width: moderateScale(32),
    height: moderateScale(32),
    resizeMode: 'contain',
  },
  bottomPromoTextContainer: {
    flex: 1,
  },
  bottomPromoTitle: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.semibold,
    fontSize: theme.typography.size.sm,
  },
  bottomPromoSub: {
    color: theme.colors.textMuted,
    fontSize: 10,
    marginTop: verticalScale(2),
  },
  bottomPromoAction: {
    fontWeight: theme.typography.weight.semibold,
    fontSize: theme.typography.size.xs,
  },
  bonusTag: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: theme.borderRadius.sm,
  },
  bonusTagText: {
    color: theme.colors.statusSuccess,
    fontSize: 10,
    fontWeight: theme.typography.weight.bold,
  },
});
