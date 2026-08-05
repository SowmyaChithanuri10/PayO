// import { StyleSheet } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { moderateScale } from 'react-native-size-matters';

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: wp('5%'),
//     paddingBottom: hp('16%'),
//     paddingTop: hp('5%'),
//   },

//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//      justifyContent: 'start',
//      gap: "5%",
//     marginBottom: hp('2.5%'),
//   },

//   back: {
//     color: '#fff',
//     marginRight: wp('3%'),
//   },

//   header: {
//     color: '#fff',
//     fontSize: moderateScale(21),
//     fontWeight: '700',
//     justifyContent: 'center',
//   },

//   filterRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//     flexWrap: 'wrap',
//   },

//   activeFilter: {
//     backgroundColor: '#22c55e',
//     color: '#fff',
//     paddingVertical: hp('0.8%'),
//     paddingHorizontal: wp('4%'),
//     borderRadius: moderateScale(20),
//     marginRight: wp('2.5%'),
//     fontSize: moderateScale(12),
//     fontWeight: '600',
//     marginBottom: hp('1%'),
//   },

//   dropdown: {
//     minWidth: wp('28%'),
//     height: hp('4.5%'),
//     backgroundColor: '#4c1d95',
//     borderRadius: moderateScale(20),
//     paddingHorizontal: wp('3%'),
//     marginRight: wp('2.5%'),
//     marginBottom: hp('1%'),
//     justifyContent: 'center',
//   },

//   dropdownText: {
//     color: '#fff',
//     fontSize: moderateScale(11),
//   },

//   section: {
//     color: '#c4b5fd',
//     marginTop: hp('2%'),
//     marginBottom: hp('1.2%'),
//     fontWeight: '600',
//     fontSize: moderateScale(13),
//   },

//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },

//   left: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     paddingRight: wp('2%'),
//   },

//   avatar: {
//     width: wp('11%'),
//     height: wp('11%'),
//     borderRadius: wp('5.5%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: wp('3%'),
//   },

//   name: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: moderateScale(14),
//     maxWidth: wp('45%'),
//   },

//   time: {
//     color: '#9ca3af',
//     fontSize: moderateScale(11),
//     marginTop: hp('0.3%'),
//   },

//   right: {
//     alignItems: 'flex-end',
//     maxWidth: wp('30%'),
//   },

//   amount: {
//     fontWeight: '700',
//     fontSize: moderateScale(14),
//   },

//   status: {
//     color: '#9ca3af',
//     fontSize: moderateScale(10),
//     marginTop: hp('0.3%'),
//     textTransform: 'capitalize',
//   },

//   historySection: {
//     color: '#6b7280',
//     marginTop: hp('3%'),
//     marginBottom: hp('2%'),
//     fontWeight: '700',
//     fontSize: moderateScale(14),
//     letterSpacing: 2,
//     textTransform: 'uppercase',
//   },

//   historyCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: hp('1.5%'),
//     paddingHorizontal: wp('2%'),
//     borderBottomWidth: 1,
//     borderBottomColor: '#ececec',
//   },

//   historyLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     paddingRight: wp('2%'),
//   },

//   historyIconBox: {
//     width: wp('12%'),
//     height: wp('12%'),
//     borderRadius: moderateScale(16),
//     backgroundColor: '#f7faff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: wp('4%'),
//   },

//   historyUserInfo: {
//     flex: 1,
//   },

//   historyTypeText: {
//     color: '#c6cedd',
//     fontSize: moderateScale(11),
//     marginBottom: hp('0.2%'),
//   },

//   historyUserName: {
//     color: '#fafafa',
//     fontSize: moderateScale(15),
//     fontWeight: '500',
//   },

//   historyDateText: {
//     color: '#9ca3af',
//     fontSize: moderateScale(11),
//     marginTop: hp('0.8%'),
//   },

//   historyAmountContainer: {
//     alignItems: 'flex-end',
//     maxWidth: wp('32%'),
//   },

//   historyAmountText: {
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//   },

//   historyStatusText: {
//     color: '#9ca3af',
//     fontSize: moderateScale(11),
//     marginTop: hp('0.8%'),
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
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, // Clean white background
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(5),
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
    flexWrap: 'wrap',
    gap: scale(8),
  },

  activeFilter: {
    backgroundColor: theme.colors.primaryBlue, // Blue pill for active
    color: '#ffffff',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    borderRadius: theme.borderRadius.full || 20,
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.medium || '500',
  },
  
  dropdownDate: {
    minWidth: scale(80),
    height: verticalScale(34),
    backgroundColor: '#f3f4f6', // Light gray pill matching the image
    borderRadius: theme.borderRadius.full || 20,
    paddingHorizontal: scale(12),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  dropdown: {
    minWidth: scale(100),
    height: verticalScale(34),
    backgroundColor: '#f3f4f6', // Light gray pill matching the image
    borderRadius: theme.borderRadius.full || 20,
    paddingHorizontal: scale(12),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  dropdownText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.medium || '500',
  },

  section: {
    color: theme.colors.textMain,
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
    fontWeight: theme.typography.weight.medium || '500',
    fontSize: moderateScale(15),
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: scale(12),
  },

  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
    borderWidth: 1,
    borderColor: '#e5e7eb', // Delicate light border as seen in the design
    backgroundColor: '#ffffff',
  },

  name: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    fontSize: moderateScale(15),
    maxWidth: scale(180),
  },

  time: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
  },

  right: {
    alignItems: 'flex-end',
    maxWidth: scale(100),
  },

  amount: {
    color: theme.colors.textMain, // Amounts are dark text in the new design
    fontWeight: theme.typography.weight.semibold || '600',
    fontSize: moderateScale(15),
  },

  status: {
    fontSize: moderateScale(10.5),
    marginTop: verticalScale(2),
    textTransform: 'capitalize',
    fontWeight: theme.typography.weight.medium || '500',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: verticalScale(120),
  },

  emptyTitle: {
    color: theme.colors.textMain,
    fontSize: moderateScale(18),
    fontWeight: theme.typography.weight.semibold || '600',
    marginTop: verticalScale(16),
  },

  emptySub: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(14),
    marginTop: verticalScale(6),
  },
});

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
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.bgApp, // Clean white background
//     paddingHorizontal: scale(16),
//     paddingTop: verticalScale(16),
//   },

//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: verticalScale(24),
//   },

//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: scale(12),
//   },

//   header: {
//     color: theme.colors.textMain,
//     fontSize: moderateScale(18),
//     fontWeight: theme.typography.weight.semibold || '600',
//   },

//   filterRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(24),
//     flexWrap: 'wrap',
//     gap: scale(8),
//   },

//   activeFilter: {
//     backgroundColor: theme.colors.primaryBlue, // Blue pill for active
//     color: '#ffffff',
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: scale(16),
//     borderRadius: theme.borderRadius.full || 20,
//     fontSize: moderateScale(13),
//     fontWeight: theme.typography.weight.medium || '500',
//   },
//   dropdownDate: {
//     minWidth: scale(80),
//     height: verticalScale(34),
//     backgroundColor: '#f3f4f6', // Light gray pill matching the image
//     borderRadius: theme.borderRadius.full || 20,
//     paddingHorizontal: scale(12),
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },

//   dropdown: {
//     minWidth: scale(100),
//     height: verticalScale(34),
//     backgroundColor: '#f3f4f6', // Light gray pill matching the image
//     borderRadius: theme.borderRadius.full || 20,
//     paddingHorizontal: scale(12),
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//   },

//   dropdownText: {
//     color: theme.colors.textMain,
//     fontSize: moderateScale(13),
//     fontWeight: theme.typography.weight.medium || '500',
//   },

//   section: {
//     color: theme.colors.textMain,
//     marginTop: verticalScale(16),
//     marginBottom: verticalScale(16),
//     fontWeight: theme.typography.weight.medium || '500',
//     fontSize: moderateScale(15),
//   },

//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: verticalScale(20),
//   },

//   left: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     paddingRight: scale(12),
//   },

//   avatar: {
//     width: scale(40),
//     height: scale(40),
//     borderRadius: scale(20),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: scale(12),
//     borderWidth: 1,
//     borderColor: '#e5e7eb', // Delicate light border as seen in the design
//     backgroundColor: '#ffffff',
//   },

//   name: {
//     color: theme.colors.textMain,
//     fontWeight: theme.typography.weight.medium || '500',
//     fontSize: moderateScale(15),
//     maxWidth: scale(180),
//   },

//   time: {
//     color: theme.colors.textMuted,
//     fontSize: moderateScale(12),
//     marginTop: verticalScale(2),
//   },

//   right: {
//     alignItems: 'flex-end',
//     maxWidth: scale(100),
//   },

//   amount: {
//     color: theme.colors.textMain, // Amounts are dark text in the new design
//     fontWeight: theme.typography.weight.semibold || '600',
//     fontSize: moderateScale(15),
//   },

//   status: {
//     fontSize: moderateScale(10.5),
//     marginTop: verticalScale(2),
//     textTransform: 'capitalize',
//     fontWeight: theme.typography.weight.medium || '500',
//   },

//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   emptyContainer: {
//     alignItems: 'center',
//     marginTop: verticalScale(120),
//   },

//   emptyTitle: {
//     color: theme.colors.textMain,
//     fontSize: moderateScale(18),
//     fontWeight: theme.typography.weight.semibold || '600',
//     marginTop: verticalScale(16),
//   },

//   emptySub: {
//     color: theme.colors.textMuted,
//     fontSize: moderateScale(14),
//     marginTop: verticalScale(6),
//   },
// });