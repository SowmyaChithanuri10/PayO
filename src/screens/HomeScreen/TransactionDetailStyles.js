// import { StyleSheet } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { moderateScale } from 'react-native-size-matters';

// export default StyleSheet.create({
//   gradient: {
//     flex: 1,
//   },

//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   container: {
//     flex: 1,
//     paddingTop: hp('5%'),
//     paddingHorizontal: wp('5%'),
//   },

//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: hp('5%'),
//   },

//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: hp('1%'),
//     marginBottom: hp('2.5%'),
//   },

//   header: {
//     color: '#fff',
//     fontSize: moderateScale(20),
//     fontWeight: '700',
//     marginLeft: wp('3%'),
//     flex: 1,
//   },

//   receiptCard: {
//     backgroundColor: '#1E1E2D',
//     borderRadius: moderateScale(18),
//     padding: wp('4.5%'),
//   },

//   section: {
//     marginBottom: hp('1.5%'),
//   },

//   smallLabel: {
//     color: '#bbb',
//     fontSize: moderateScale(12),
//     marginBottom: hp('1%'),
//   },

//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },

//   userRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     paddingRight: wp('3%'),
//   },

//   iconBox: {
//     width: moderateScale(34),
//     height: moderateScale(34),
//     borderRadius: moderateScale(17),
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   name: {
//     color: '#fff',
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//     marginLeft: wp('3%'),
//     maxWidth: wp('42%'),
//     textTransform: 'capitalize',
//   },

//   timeText: {
//     color: '#ddd',
//     fontSize: moderateScale(10),
//     marginTop: hp('0.4%'),
//     marginLeft: wp('3%'),
//     maxWidth: wp('45%'),
//   },

//   amount: {
//     color: '#fff',
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//     textAlign: 'right',
//     maxWidth: wp('30%'),
//   },

//   payo: {
//     color: '#bbb',
//     fontSize: moderateScale(11),
//   },

//   divider: {
//     height: 1,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     marginVertical: hp('2%'),
//   },

//   paymentHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('1.2%'),
//   },

//   paymentTitle: {
//     color: '#ddd',
//     fontSize: moderateScale(14),
//     marginLeft: wp('2%'),
//     fontWeight: '600',
//   },

//   label: {
//     color: '#f1e7e7',
//     fontSize: moderateScale(12),
//     marginTop: hp('1%'),
//   },

//   valueRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: hp('0.7%'),
//   },

//   value: {
//     color: '#0fe93e',
//     fontSize: moderateScale(13),
//     flex: 1,
//     marginRight: wp('3%'),
//   },

//   actionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginTop: hp('3%'),
//     paddingTop: hp('2.5%'),
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(255,255,255,0.15)',
//   },

//   actionItem: {
//     alignItems: 'center',
//     flex: 1,
//     paddingHorizontal: wp('1%'),
//   },

//   circle: {
//     width: moderateScale(48),
//     height: moderateScale(48),
//     borderRadius: moderateScale(24),
//     backgroundColor: '#F2F2F2',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp('1%'),
//   },

//   actionText: {
//     color: '#fff',
//     fontSize: moderateScale(10),
//     textAlign: 'center',
//     lineHeight: moderateScale(14),
//   },
// });



// import { StyleSheet } from 'react-native';

// // 1. Importing responsive utilities
// import {
//   scale,
//   verticalScale,
//   moderateScale,
// } from '../../utils/responsive';

// // 2. Importing theme
// import { theme } from '../../MainTheme/theme';

// export default StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: theme.colors.bgApp, // Clean white background
//   },

//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: theme.colors.bgApp,
//   },

//   container: {
//     flex: 1,
//     paddingHorizontal: scale(16),
//   },

//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: verticalScale(40),
//     paddingTop: verticalScale(16),
//   },

//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(24),
//   },

//   backBtn: {
//     paddingRight: scale(12),
//   },

//   header: {
//     color: theme.colors.textMain,
//     fontSize: moderateScale(18),
//     fontWeight: theme.typography.weight.semibold || '600',
//     flex: 1,
//   },

//   receiptCard: {
//     backgroundColor: '#ffffff', // White card
//     borderRadius: theme.borderRadius.lg || 16,
//     padding: scale(20),
//     borderWidth: 1,
//     borderColor: '#e5e7eb', // Light border
//     ...theme.shadows.sm, // Subtle shadow
//   },

//   section: {
//     marginBottom: verticalScale(12),
//   },

//   smallLabel: {
//     color: theme.colors.textMuted,
//     fontSize: moderateScale(12),
//     marginBottom: verticalScale(12),
//     textTransform: 'uppercase',
//     fontWeight: theme.typography.weight.medium || '500',
//   },

//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },

//   userRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     paddingRight: scale(12),
//   },

//   iconBox: {
//     width: scale(44),
//     height: scale(44),
//     borderRadius: scale(22),
//     backgroundColor: '#f3f4f6', // Light gray background for icon
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   name: {
//     color: theme.colors.textMain,
//     fontSize: moderateScale(16),
//     fontWeight: theme.typography.weight.semibold || '600',
//     marginLeft: scale(12),
//     maxWidth: scale(160),
//     textTransform: 'capitalize',
//   },

//   timeText: {
//     color: theme.colors.textMuted,
//     fontSize: moderateScale(11),
//     marginTop: verticalScale(4),
//     marginLeft: scale(12),
//   },

//   amountContainer: {
//     alignItems: 'flex-end',
//   },

//   amount: {
//     color: theme.colors.textMain,
//     fontSize: moderateScale(18),
//     fontWeight: theme.typography.weight.bold || '700',
//   },

//   payo: {
//     color: theme.colors.statusSuccess || '#10b981', // Green PAYO text
//     fontSize: moderateScale(13),
//     fontWeight: theme.typography.weight.semibold || '600',
//   },

//   divider: {
//     height: 1,
//     backgroundColor: '#e5e7eb',
//     marginVertical: verticalScale(20),
//   },

//   paymentHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(12),
//   },

//   paymentTitle: {
//     color: theme.colors.textMain,
//     fontSize: moderateScale(15),
//     marginLeft: scale(8),
//     fontWeight: theme.typography.weight.semibold || '600',
//   },

//   label: {
//     color: theme.colors.textMuted,
//     fontSize: moderateScale(13),
//     marginTop: verticalScale(12),
//   },

//   valueRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: verticalScale(6),
//   },

//   value: {
//     color: theme.colors.textMain, // Dark text for readability
//     fontSize: moderateScale(14),
//     fontWeight: theme.typography.weight.medium || '500',
//     flex: 1,
//     marginRight: scale(12),
//   },

//   actionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginTop: verticalScale(32),
//     paddingTop: verticalScale(24),
//     borderTopWidth: 1,
//     borderTopColor: '#e5e7eb', // Light border top
//   },

//   actionItem: {
//     alignItems: 'center',
//     flex: 1,
//     paddingHorizontal: scale(4),
//   },

//   circle: {
//     width: scale(52),
//     height: scale(52),
//     borderRadius: scale(26),
//     backgroundColor: '#f3f4f6', // Light gray button circle
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: verticalScale(8),
//   },

//   actionText: {
//     color: theme.colors.textMain,
//     fontSize: moderateScale(12),
//     textAlign: 'center',
//     fontWeight: theme.typography.weight.medium || '500',
//   },
// });

import { StyleSheet } from 'react-native';

// 1. Importing responsive utilities
import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';

// 2. Importing theme
import { theme } from '../../MainTheme/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.bgApp,
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(16),
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(40),
    paddingTop: verticalScale(16),
  },

  // --- Header Styles ---
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },

  backBtn: {
    paddingRight: scale(8),
  },

  headerCenter: {
    flex: 1,
    paddingHorizontal: scale(8),
  },

  headerTitle: {
    color: theme.colors.textMain,
    fontSize: moderateScale(theme.typography.size.lg), // 18
    fontWeight: theme.typography.weight.semibold,
  },

  headerSubtitle: {
    color: theme.colors.grey,
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
  },

  helpBtn: {
    paddingLeft: scale(8),
  },

  // --- Capture / Card Section ---
  captureContainer: {
    backgroundColor: 'transparent',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },

  bannerCard: {
    backgroundColor: theme.colors.bgLightPurple,
    borderRadius: theme.borderRadius.lg,
    padding: scale(18),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: theme.colors.borderPurple,
  },

  bannerLeft: {
    marginRight: scale(14),
  },

  statusCircle: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },

  bannerRight: {
    flex: 1,
  },

  bannerStatusText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.semibold,
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: verticalScale(2),
  },

  bannerAmountText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(22),
    fontWeight: theme.typography.weight.bold,
  },

  bannerCurrencyText: {
    color: theme.colors.primaryPurple,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.bold,
  },

  bannerSubText: {
    color: theme.colors.grey,
    fontSize: moderateScale(12),
  },

  // --- Details Card ---
  detailsCard: {
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.borderRadius.lg,
    padding: scale(16),
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },

  detailLabel: {
    color: theme.colors.grey,
    fontSize: moderateScale(theme.typography.size.sm), // 14
    fontWeight: theme.typography.weight.medium,
  },

  detailValueBold: {
    color: theme.colors.textMain,
    fontSize: moderateScale(theme.typography.size.sm), // 14
    fontWeight: theme.typography.weight.semibold,
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: scale(8),
  },

  statusValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailStatusText: {
    fontSize: moderateScale(theme.typography.size.sm), // 14
    fontWeight: theme.typography.weight.semibold,
  },

  // --- Bottom Action Row ---
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(28),
    paddingTop: verticalScale(20),
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },

  actionItem: {
    alignItems: 'center',
    flex: 1,
  },

  actionSquare: {
    width: scale(48),
    height: scale(48),
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    ...theme.shadows.sm,
  },

  actionText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(11),
    textAlign: 'center',
    fontWeight: theme.typography.weight.medium,
  },
});