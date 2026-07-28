// // homeStyling.js — PART 1

// import { StyleSheet } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { moderateScale } from 'react-native-size-matters';

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#3B0A6B',
//   },

//   scrollContent: {
//     paddingBottom: hp('15%'),
//   },

//   /* HEADER */
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: wp('6%'),
//     paddingTop: hp('1.5%'),
//     paddingBottom: hp('1%'),
//   },

//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: wp('3%'),
//   },

//   profileIcon: {
//     width: wp('9%'),
//     height: wp('9%'),
//     borderRadius: wp('4.5%'),
//     backgroundColor: '#FFD700',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   walletNumber: {
//     color: '#fff',
//     fontSize: moderateScale(11),
//   },

//   /* CARD */
//   cardContainer: {
//     paddingHorizontal: wp('5%'),
//     marginTop: hp('2%'),
//     marginBottom: hp('1%'),
//   },

//   card: {
//     backgroundColor: '#1C1C1E',
//     borderRadius: moderateScale(20),
//     padding: wp('5%'),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     overflow: 'hidden',
//     minHeight: hp('18%'),
//   },

//   topRightCurve: {
//     position: 'absolute',
//     top: hp('-2%'),
//     right: wp('-5%'),
//     width: wp('22%'),
//     height: wp('24%'),
//     borderRadius: moderateScale(50),
//     backgroundColor: '#F59E0B',
//   },

//   bottomLeftCurve: {
//     position: 'absolute',
//     bottom: hp('-2%'),
//     left: wp('-5%'),
//     width: wp('22%'),
//     height: wp('22%'),
//     borderRadius: moderateScale(40),
//   },

//   balanceLabel: {
//     color: '#d8d4d4',
//     fontSize: moderateScale(13),
//     marginBottom: hp('0.7%'),
//     fontWeight: '700',
//   },

//   balanceRow: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//     flexWrap: 'wrap',
//   },

//   balanceAmount: {
//     color: '#fff',
//     fontSize: moderateScale(22),
//     fontWeight: 'bold',
//     letterSpacing: 2,
//   },

//   payoLabel: {
//     color: '#22c55e',
//     fontSize: moderateScale(10),
//     marginLeft: wp('3%'),
//     marginBottom:hp('10%')
//   },
  

//   cardRight: {
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
    
//   },

//   walletRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   walletText: {
//     color: '#ccc',
//     marginRight: wp('2%'),
//     fontSize: moderateScale(12),
//   },

//   arrowCircle: {
//     width: wp('7%'),
//     height: wp('7%'),
//     borderRadius: wp('3.5%'),
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   addBankButton: {
//     position: 'absolute',
//     bottom: hp('2%'),
//     left: wp('4%'),
//     backgroundColor: '#fff',
//     paddingHorizontal: wp('4%'),
//     paddingVertical: hp('1%'),
//     borderRadius: moderateScale(20),
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   bankIcon: {
//     marginRight: wp('1.5%'),
//   },

//   addBankText: {
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//     color: '#000',
//   },

//   /* ACTIONS */
//   actionsContainer: {
//     marginTop: hp('1.8%'),
//     paddingHorizontal: wp('5%'),
//   },

//    actionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },

//   actionTitle: {
//     color: '#fff',
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//   },

//   actions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FDE68A',
//     paddingHorizontal: wp('4%'),
//     paddingVertical: hp('1.2%'),
//     borderRadius: moderateScale(30),
//     zIndex: 2,
//   },

//   iconCircle: {
//     width: wp('7%'),
//     height: wp('7%'),
//     borderRadius: wp('3.5%'),
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   label: {
//     marginLeft: wp('2%'),
//     fontWeight: '600',
//     fontSize: moderateScale(12),
//     color: '#000',
//   },

//   connector: {
//     height: hp('1.4%'),
//     width: wp('5%'),
//     backgroundColor: '#FDE68A',
//     marginHorizontal: wp('-0.5%'),
//     zIndex: 1,
//   },
 

//   statsContainer: {
//     marginTop: hp('2.5%'),
//     paddingHorizontal: wp('5%'),
//   },

//   statsCard: {
//     backgroundColor: '#1C1C1E',
//     borderRadius: moderateScale(16),
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('5%'),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   statItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   textBlock: {
//     marginLeft: wp('2.5%'),
//   },

//   statLabel: {
//     color: '#aaa',
//     fontSize: moderateScale(11),
//   },

//   amountRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//   },


// //   quickSummaryCard: {
// //   marginHorizontal: 16,
// //   marginTop: 18,
// //   backgroundColor: '#251a46',
// //   borderRadius: 26,
// //   paddingVertical: 22,
// //   paddingHorizontal: 18,

// //   borderWidth: 1,
// //   borderColor: 'rgba(255,255,255,0.06)',

// //   shadowColor: '#000',
// //   shadowOpacity: 0.35,
// //   shadowRadius: 12,
// //   elevation: 10,
// // },

// // actionHeader: {
// //   marginBottom: 18,
// // },

// // actionTitle: {
// //   fontSize: 22,
// //   fontWeight: '700',
// //   color: '#fff',
// // },

// // // actions: {
// // //   flexDirection: 'row',
// // //   alignItems: 'center',
// // //   justifyContent: 'space-between',
// // // },

// // // button: {
// // //   flex: 1,
// // //   height: 58,
// // //   backgroundColor: '#FFE88A',
// // //   borderRadius: 30,

// // //   flexDirection: 'row',
// // //   justifyContent: 'center',
// // //   alignItems: 'center',
// // // },

// // // iconCircle: {
// // //   width: 32,
// // //   height: 32,
// // //   borderRadius: 16,
// // //   backgroundColor: '#111',

// // //   justifyContent: 'center',
// // //   alignItems: 'center',

// // //   marginRight: 8,
// // // },

// // // label: {
// // //   fontWeight: '700',
// // //   color: '#111',
// // //   fontSize: 15,
// // // },

// // // connector: {
// // //   width: 22,
// // //   height: 6,
// // //   backgroundColor: '#FFE88A',
// // // },

// // actions: {
// //   flexDirection: 'row',
// //   alignItems: 'center',
// //   justifyContent: 'center',
// //   marginBottom: 18,
// // },

// // actionButton: {
// //   width: 100,
// //   height: 46,
// //   backgroundColor: '#FFE88A',

// //   borderRadius: 15,

// //   flexDirection: 'row',
// //   alignItems: 'center',
// //   justifyContent: 'center',

// //   elevation: 3,
// // },

// // actionIcon: {
// //   width: 25,
// //   height: 25,
// //   borderRadius: 12,
// //   backgroundColor: '#181818',

// //   justifyContent: 'center',
// //   alignItems: 'center',

// //   marginRight: 8,
// // },

// // actionText: {
// //   color: '#111',
// //   fontSize: 16,
// //   fontWeight: '700',
// // },

// // actionConnector: {
// //     height: hp('1%'),
// //     width: wp('5%'),
// //   backgroundColor: '#FFE88A',
// // },


// summaryDivider: {
//   height: 1,
//   backgroundColor: 'rgba(255,255,255,0.08)',
//   marginVertical: 22,
// },

// summaryRow: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'space-between',
// },

// summaryItem: {
//   flex: 1,
//   flexDirection: 'row',
//   alignItems: 'center',
// },

// verticalDivider: {
//   width: 1,
//   height: 65,
//   backgroundColor: 'rgba(255,255,255,0.15)',
// },

// summaryIconGreen: {
//   width: 52,
//   height: 52,
//   borderRadius: 26,
//   backgroundColor: 'rgba(83,210,88,0.15)',

//   justifyContent: 'center',
//   alignItems: 'center',

//   marginRight: 12,
// },

// summaryIconRed: {
//   width: 52,
//   height: 52,
//   borderRadius: 26,
//   backgroundColor: 'rgba(255,107,107,0.15)',

//   justifyContent: 'center',
//   alignItems: 'center',

//   marginRight: 12,
// },

// summaryLabel: {
//   color: '#A7A7B5',
//   fontSize: 14,
// },

// summaryValue: {
//   color: '#fff',
//   fontSize: 26,
//   fontWeight: '700',
// },

// summaryUnit: {
//   marginLeft: 5,
//   color: '#53D258',
//   fontWeight: '700',
//   alignSelf: 'flex-end',
//   marginBottom: 4,
// },

// amountRow: {
//   flexDirection: 'row',
//   alignItems: 'flex-end',
// },

//   statValue: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: moderateScale(17),
//   },

//   unit: {
//     color: '#53D258',
//     fontSize: moderateScale(9),
//     marginLeft: wp('1%'),
//   },

//   divider: {
//     width: 1,
//     height: hp('4.5%'),
//     backgroundColor: '#444',
//   },

//   expertContainer: {
//     paddingHorizontal: wp('5%'),
//     marginTop: hp('4%'),
//   },

//   expertHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: hp('1.5%'),
//   },

//   expertTitle: {
//     color: '#fff',
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//   },

//   viewAllText: {
//     color: '#FDE68A',
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//   },

//   expertCard: {
//     width: wp('42%'),
//     backgroundColor: '#fff',
//     borderRadius: moderateScale(16),
//     padding: wp('3.5%'),
//     marginRight: wp('3%'),
//   },

//   expertTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   coinInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   coinImage: {
//     width: wp('6.5%'),
//     height: wp('6.5%'),
//     marginRight: wp('1.5%'),
//   },

//   coinSymbol: {
//     fontWeight: '700',
//     fontSize: moderateScale(13),
//   },

//   badge: {
//     paddingHorizontal: wp('2%'),
//     paddingVertical: hp('0.5%'),
//     borderRadius: moderateScale(6),
//   },

//   longBadge: {
//     backgroundColor: '#22c55e',
//   },

//   shortBadge: {
//     backgroundColor: '#ef4444',
//   },

//   badgeText: {
//     color: '#fff',
//     fontSize: moderateScale(10),
//     fontWeight: '600',
//   },

//   entryLabel: {
//     marginTop: hp('1.5%'),
//     color: '#6b7280',
//     fontSize: moderateScale(11),
//   },

//   entryPrice: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//   },

//   profitBox: {
//     marginTop: hp('1.5%'),
//     backgroundColor: '#ecfdf5',
//     padding: wp('2%'),
//     borderRadius: moderateScale(8),
//   },

//   profitText: {
//     color: '#16a34a',
//     fontWeight: '700',
//     fontSize: moderateScale(10),
//   },

//   marketCardsContainer: {
//     marginTop: hp('3%'),
//     paddingHorizontal: wp('4%'),
//   },

//   marketCard: {
//     width: '100%',
//     backgroundColor: '#fcf2bd',
//     borderRadius: moderateScale(28),
//     padding: wp('5%'),
//     elevation: 5,
//     marginBottom: hp('2%'),
//   },

//   marketHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   marketCoinRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   marketCoinImage: {
//     width: wp('14%'),
//     height: wp('14%'),
//     borderRadius: wp('7%'),
//     marginRight: wp('3%'),
//   },

//   marketCoinName: {
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     color: '#111',
//   },

//   marketCoinSymbol: {
//     fontSize: moderateScale(13),
//     color: '#888',
//     marginTop: hp('0.3%'),
//   },

//   marketBadge: {
//     paddingHorizontal: wp('3.5%'),
//     paddingVertical: hp('1%'),
//     borderRadius: moderateScale(30),
//   },

//   priceSection: {
//     marginTop: hp('2%'),
//   },

//   marketPrice: {
//     fontSize: moderateScale(24),
//     fontWeight: '800',
//     color: '#000',
//   },

//   marketChange: {
//     marginTop: hp('1%'),
//     fontSize: moderateScale(15),
//     fontWeight: '700',
//   },

//   chartStyle: {
//     marginTop: hp('2%'),
//     borderRadius: moderateScale(20),
//   },


//   // Add these to your existing styles
// // Add these to your existing styles
// chartControls: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginTop: 12,
//   paddingTop: 8,
//   borderTopWidth: 1,
//   borderTopColor: '#2A2F3E',
// },
// zoomResetButton: {
//   backgroundColor: '#2A2F3E',
//   paddingHorizontal: 12,
//   paddingVertical: 4,
//   borderRadius: 6,
// },
// zoomResetText: {
//   color: '#FCD535',
//   fontSize: 11,
//   fontWeight: '600',
// },
// chartHint: {
//   color: '#6B7280',
//   fontSize: 10,
// },
// globalTooltip: {
//   backgroundColor: '#1A1F2E',
//   borderRadius: 8,
//   padding: 6,
//   minWidth: 80,
//   alignItems: 'center',
//   borderWidth: 1,
//   borderColor: '#FCD535',
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 2 },
//   shadowOpacity: 0.25,
//   shadowRadius: 4,
//   elevation: 5,
// },
// globalTooltipText: {
//   color: '#FCD535',
//   fontSize: 12,
//   fontWeight: 'bold',
// },
// globalTooltipArrow: {
//   position: 'absolute',
//   bottom: -6,
//   left: '50%',
//   marginLeft: -6,
//   width: 0,
//   height: 0,
//   borderLeftWidth: 6,
//   borderRightWidth: 6,
//   borderTopWidth: 6,
//   borderLeftColor: 'transparent',
//   borderRightColor: 'transparent',
//   borderTopColor: '#FCD535',
// },
// zoomIndicator: {
//   position: 'absolute',
//   bottom: 5,
//   right: 10,
//   backgroundColor: 'rgba(0,0,0,0.7)',
//   paddingHorizontal: 8,
//   paddingVertical: 2,
//   borderRadius: 4,
// },
// zoomIndicatorText: {
//   color: '#FCD535',
//   fontSize: 10,
//   fontWeight: '600',
// },
// centerContent: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
// },

// newsContainer: {
//  marginTop: hp('4%'),
//   // marginBottom: hp('2%'),
//   paddingHorizontal: 18,
// },

// newsHeader: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginBottom: 18,
// },

// newsTitle: {
//   color: '#fff',
//   fontSize: 18,
//   fontWeight: '700',
// },

// newsCard: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: '#1C1C1E',
//   borderRadius: 16,
//   padding: 14,
//   marginBottom: 14,
// },

// newsLeft: {
//   flex: 1,
//   paddingRight: 12,
// },

// newsSource: {
//   color: '#8B8B8B',
//   fontSize: 13,
//   marginBottom: 5,
// },

// newsHeadline: {
//   color: '#fff',
//   fontSize: 16,
//   fontWeight: '600',
//   lineHeight: 22,
// },

// newsDate: {
//   marginTop: 8,
//   color: '#999',
//   fontSize: 12,
// },

// newsImage: {
//   width: 80,
//   height: 80,
//   borderRadius: 12,
//   backgroundColor: '#2A2A2A',
// },
// });



import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale, windowWidth } from '../../utils/responsive'; 

// 1. Import the centralized theme
import { theme } from '../../MainTheme/theme'; 

export default StyleSheet.create({
  container: {
    flex: 1,
    // 2. Replace local colors with theme.colors
    backgroundColor: theme.colors.bgApp, 
  },
  scrollContent: {
    paddingBottom: verticalScale(130),
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(15),
  },
  iconButton: {
    width: scale(35), 
    height: scale(35), 
    backgroundColor: '#fff',
    borderRadius: scale(20),
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerNotificationIcon: {
    width: scale(18), 
    height: scale(18), 
  },
  logo: {
    width: scale(110),
    height: verticalScale(30),
    marginLeft: scale(40), 
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  badge: {
    position: 'absolute',
    top: -2, 
    right: -2, 
    backgroundColor: theme.colors.statusDanger, // Updated to theme
    width: scale(16),
    height: scale(16),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    zIndex: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: moderateScale(9),
    fontWeight: 'bold',
  },
  profileIconContainer: {
    width: scale(32), 
    height: scale(32), 
    borderRadius: scale(16), 
    backgroundColor: theme.colors.primaryBlue, // Updated to theme
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerProfileImg: {
    width: scale(18), 
    height: scale(18), 
  },

  /* WALLET CARD */
  // walletCard: {
  //   marginHorizontal: scale(20),
  //   marginTop: verticalScale(5),
  //   borderRadius: moderateScale(20),
  //   padding: scale(20),
  //   position: 'relative',
  //   elevation: 8,
  //   shadowColor: theme.colors.primaryIndigo, // Updated to theme
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 8,
  // },
  // walletHeaderRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: verticalScale(15),
  // },
  // rowCenter: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // walletLabel: {
  //   color: 'rgba(255, 255, 255, 0.9)',
  //   fontSize: moderateScale(14),
  //   fontWeight: '500',
  // },
  // viewWalletBtn: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(255,255,255,0.15)',
  //   paddingHorizontal: scale(10),
  //   paddingVertical: verticalScale(4),
  //   borderRadius: scale(20),
  // },
  // viewWalletText: {
  //   color: '#fff',
  //   fontSize: moderateScale(12),
  //   marginRight: scale(4),
  // },
  // balanceRow: {
  //   flexDirection: 'row',
  //   alignItems: 'baseline',
  // },
  // balanceAmount: {
  //   color: '#fff',
  //   fontSize: moderateScale(32),
  //   fontWeight: 'bold',
  // },
  // balanceCurrency: {
  //   color: 'rgba(255,255,255,0.8)',
  //   fontSize: moderateScale(16),
  //   marginLeft: scale(8),
  //   fontWeight: '600',
  // },
  // fiatAmount: {
  //   color: 'rgba(255,255,255,0.7)',
  //   fontSize: moderateScale(14),
  //   marginTop: verticalScale(4),
  // },
  // addMoneyBtn: {
  //   position: 'absolute',
  //   bottom: scale(20),
  //   right: scale(20),
  //   backgroundColor: '#fff',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingHorizontal: scale(14),
  //   paddingVertical: verticalScale(8),
  //   borderRadius: scale(20),
  //   elevation: 2,
  // },
  // addMoneyIcon: {
  //   width: scale(14),
  //   height: scale(14),
  // },
  // addMoneyText: {
  //   color: theme.colors.primaryBlue, // Updated to theme
  //   fontWeight: '600',
  //   marginLeft: scale(6),
  //   fontSize: moderateScale(13),
  // },

  walletCard: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(5),
    borderRadius: moderateScale(24),
    padding: scale(20),
    position: 'relative',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  cardLightHighlight: {
    position: 'absolute',
    width: scale(180),
    height: scale(180),
    borderRadius: scale(90),
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    top: -scale(30),
    right: -scale(20),
  },
  // walletHeaderRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   width: '100%',
  // },
  walletHeaderRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start', // Changed from 'center' to allow top alignment
  width: '100%',
},
viewWalletBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.4)',
  paddingHorizontal: scale(14),
  paddingVertical: verticalScale(6),
  borderRadius: theme.borderRadius.full,
  marginTop: verticalScale(16), // Add this to push it down
},
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: moderateScale(13),
    fontWeight: '500',
  },
  // viewWalletBtn: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: 'transparent',
  //   borderWidth: 1,
  //   borderColor: 'rgba(255,255,255,0.4)',
  //   paddingHorizontal: scale(14),
  //   paddingVertical: verticalScale(6),
  //   borderRadius: theme.borderRadius.full,
    
   
  // },
  viewWalletText: {
    color: '#fff',
    fontSize: moderateScale(15),
    marginRight: scale(4),
    fontWeight: '500',
  },
  balanceContainer: {
    marginTop: verticalScale(-15),
    alignItems: 'flex-start',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  balanceAmount: {
    color: '#fff',
    fontSize: moderateScale(36),
    fontWeight: '700',
  },
  balanceCurrency: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: moderateScale(15),
    marginLeft: scale(8),
    fontWeight: '600',
  },
  fiatAmount: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: moderateScale(15),
    marginTop: verticalScale(6),
    fontWeight: '700',
  },
  bottomActionRow: {
    width: '100%',
    alignItems: 'flex-end', // Aligns the button smoothly to the right edge
    marginTop: verticalScale(1), 
  },
  addMoneyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    borderRadius: scale(24),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  addMoneyText: {
    color: '#1e40af', // Deep blue tint text matching the mockup accent
    fontWeight: '700',
    fontSize: moderateScale(15),
  },

  /* COMMON SECTIONS */
  sectionContainer: {
    marginTop: verticalScale(24),
    paddingHorizontal: scale(20),
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  sectionHeading: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: theme.colors.textMain, // Updated to theme
    
  },
  viewAllText: {
    fontSize: moderateScale(14),
    color: theme.colors.primaryBlue, // Updated to theme
    fontWeight: '500',
  },

  /* QUICK ACTIONS */
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(10),
  },
  actionItem: {
    alignItems: 'center',
  },
  actionIconBtn: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(16),
    backgroundColor: theme.colors.primaryBlue, // Updated to theme
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    marginHorizontal: scale(1),
    elevation: 3,
    shadowColor: theme.colors.primaryBlue, // Updated to theme
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  actionImageFormat: {
    width: scale(20),
    height: scale(20),
  },
  actionLabel: {
    fontSize: moderateScale(13),
    color: theme.colors.textMain, // Updated to theme
    fontWeight: '500',
  },

  /* CAROUSEL / BANNERS */
  carouselContainer: {
    marginTop: verticalScale(24),
    marginHorizontal: scale(20), 
    position: 'relative', 
    overflow: 'hidden', 
  },
  bannerWrapper: {
    width: windowWidth * 0.78, 
    marginRight: 6, 
  },
  bannerCard: {
    width: '100%',
    height: verticalScale(130), 
    // borderRadius: moderateScale(16),
    // backgroundColor: '#e5e7eb',
    overflow: 'hidden',
  },
  
  /* OVERLAID PAGINATION */
  bannerPagination: {
    position: 'absolute',
    bottom: verticalScale(14), 
    left: scale(20), 
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    marginRight: 6,
  },
  dotActive: {
    width: 18, 
    backgroundColor: '#ffffff', 
  },

  /* COMMON CARD (Crypto Market & News uses this base) */
  card: {
    backgroundColor: theme.colors.bgSurface, // Updated to theme
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    padding: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  /* CRYPTO MARKET TABLE */
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    marginBottom: verticalScale(8),
  },
  tableHeaderText: {
    color: theme.colors.textMuted, // Updated to theme
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  tableCell: {
    fontSize: moderateScale(14),
  },
  coinIcon: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },
  coinIconText: {
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  coinSymbol: {
    color: theme.colors.textMain, // Updated to theme
    fontWeight: '700',
    fontSize: moderateScale(14),
  },
  coinName: {
    color: theme.colors.textMuted, // Updated to theme
    fontSize: moderateScale(11),
    marginTop: verticalScale(2),
  },
  coinPrice: {
    fontWeight: '600',
    color: theme.colors.textMain, // Updated to theme
  },

  /* CRYPTO NEWS */
  newsCard: {
    flexDirection: 'row',
    padding: scale(12),
    marginBottom: verticalScale(12),
    alignItems: 'center',
  },
  newsImage: {
    width: scale(70),
    height: scale(70),
    borderRadius: moderateScale(10),
    backgroundColor: '#e5e7eb',
  },
  newsContent: {
    flex: 1,
    marginLeft: scale(14),
  },
  newsHeadline: {
    color: theme.colors.textMain, // Updated to theme
    fontSize: moderateScale(14),
    fontWeight: '600',
    lineHeight: verticalScale(20),
    marginBottom: verticalScale(8),
  },
  newsMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsTime: {
    color: theme.colors.textMuted, // Updated to theme
    fontSize: moderateScale(11),
  },
  tagPill: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: scale(12),
  },
  tagText: {
    fontSize: moderateScale(10),
    fontWeight: '600',
  },

//   bottomNav: {
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   right: 0,

//   backgroundColor: '#2E1065',

//   borderTopLeftRadius: moderateScale(30),
//   borderTopRightRadius: moderateScale(30),

//   flexDirection: 'row',
//   justifyContent: 'space-around',
//   alignItems: 'center',

//   paddingHorizontal: wp('2%'),

//   elevation: 20,
//   zIndex: 999,
// },

//   navItem: {
//   alignItems: 'center',
//   justifyContent: 'center',
//   flex: 1,
//   paddingTop: hp('1%'),
// },

//   navLabel: {
//     fontSize: moderateScale(9),
//     marginTop: hp('0.5%'),
//     fontWeight: '600',
//   },

//   navActive: {
//     color: '#F472B6',
//   },

//   navInactive: {
//     color: '#aaa',
//   },

//   centerIcon: {
//     position: 'absolute',
//     top: hp('-4.2%'),
//     width: wp('18%'),
//     height: wp('18%'),
//     borderRadius: wp('9%'),
//     backgroundColor: '#7C3AED',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     elevation: 25,
//     zIndex: 1000,
//   },
});

// import { StyleSheet } from 'react-native';
// import { scale, verticalScale, moderateScale, windowWidth } from '../../utils/responsive'; // Adjust relative path as needed

// // Values extracted from main.css variables
// const colors = {
//   primaryBlue: '#3b82f6',
//   primaryIndigo: '#4f46e5',
//   primaryPurple: '#7c3aed',
//   bgApp: '#f4f6f9',
//   bgSurface: '#ffffff',
//   textMain: '#1f2937',
//   textMuted: '#6b7280',
//   success: '#10b981',
//   danger: '#ef4444',
// };

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.bgApp,
//   },
//   scrollContent: {
//     paddingBottom: verticalScale(100),
//   },

//   /* HEADER */
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: scale(20),
//     paddingTop: verticalScale(40),
//     paddingBottom: verticalScale(15),
//   },
//   iconButton: {
//     padding: scale(5),
//     backgroundColor: '#fff',
//     borderRadius: scale(20),
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//   },
//   logo: {
//     width: scale(110),
//     height: verticalScale(30),
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: scale(10),
//   },
//   badge: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     backgroundColor: colors.danger,
//     width: scale(16),
//     height: scale(16),
//     borderRadius: scale(8),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#fff',
//   },
//   // badgeText: {
//   //   color: '#fff',
//   //   fontSize: moderateScale(9),
//   //   fontWeight: 'bold',
//   // },
//   profileIcon: {
//     width: scale(36),
//     height: scale(36),
//     borderRadius: scale(18),
//     backgroundColor: colors.primaryBlue,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   /* WALLET CARD */
//   walletCard: {
//     marginHorizontal: scale(20),
//     marginTop: verticalScale(5),
//     borderRadius: moderateScale(20),
//     padding: scale(20),
//     position: 'relative',
//     elevation: 8,
//     shadowColor: colors.primaryIndigo,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//   },
//   walletHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: verticalScale(15),
//   },
//   rowCenter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   walletLabel: {
//     color: 'rgba(255, 255, 255, 0.9)',
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//   },
//   viewWalletBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(4),
//     borderRadius: scale(20),
//   },
//   viewWalletText: {
//     color: '#fff',
//     fontSize: moderateScale(12),
//     marginRight: scale(4),
//   },
//   balanceRow: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//   },
//   balanceAmount: {
//     color: '#fff',
//     fontSize: moderateScale(32),
//     fontWeight: 'bold',
//   },
//   balanceCurrency: {
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: moderateScale(16),
//     marginLeft: scale(8),
//     fontWeight: '600',
//   },
//   fiatAmount: {
//     color: 'rgba(255,255,255,0.7)',
//     fontSize: moderateScale(14),
//     marginTop: verticalScale(4),
//   },
//   addMoneyBtn: {
//     position: 'absolute',
//     bottom: scale(20),
//     right: scale(20),
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: scale(14),
//     paddingVertical: verticalScale(8),
//     borderRadius: scale(20),
//     elevation: 2,
//   },
//   addMoneyText: {
//     color: colors.primaryBlue,
//     fontWeight: '600',
//     marginLeft: scale(4),
//     fontSize: moderateScale(13),
//   },

//   /* COMMON SECTIONS */
//   sectionContainer: {
//     marginTop: verticalScale(24),
//     paddingHorizontal: scale(20),
//   },
//   sectionHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: verticalScale(12),
//   },
//   sectionHeading: {
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     color: colors.textMain,
//   },
//   viewAllText: {
//     fontSize: moderateScale(14),
//     color: colors.primaryBlue,
//     fontWeight: '500',
//   },

//   /* QUICK ACTIONS */
//   actionsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: scale(10),
//   },
//   actionItem: {
//     alignItems: 'center',
//   },
//   actionIconBtn: {
//     width: scale(56),
//     height: scale(56),
//     borderRadius: scale(16),
//     backgroundColor: colors.primaryBlue,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: verticalScale(8),
//     elevation: 3,
//     shadowColor: colors.primaryBlue,
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   actionLabel: {
//     fontSize: moderateScale(13),
//     color: colors.textMain,
//     fontWeight: '500',
//   },

//   /* CAROUSEL / BANNERS */
//   carouselContainer: {
//     marginTop: verticalScale(24),
//     // THIS creates the hard clipping boundary on the left and right!
//     marginHorizontal: scale(20), 
//     position: 'relative', 
//     overflow: 'hidden', // Ensures nothing bleeds past the margins during scroll
//   },
//   bannerWrapper: {
//     // Reduced from 0.85 to 0.78 because the container is now smaller
//     width: windowWidth * 0.78, 
//     marginRight: 16, // The gap between banners
//   },
//   bannerCard: {
//     width: '100%',
//     height: verticalScale(130), 
//     borderRadius: moderateScale(16),
//     backgroundColor: '#e5e7eb',
//     overflow: 'hidden',
//   },
  
//   /* OVERLAID PAGINATION */
//   bannerPagination: {
//     position: 'absolute',
//     bottom: verticalScale(14), 
//     // Reduced from 40 to 20 because the container is already shifted 20px inward
//     left: scale(20), 
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: 'rgba(255, 255, 255, 0.4)', 
//     marginRight: 6,
//   },
//   dotActive: {
//     width: 18, 
//     backgroundColor: '#ffffff', 
//   },

//   /* COMMON CARD (Crypto Market & News uses this base) */
//   card: {
//     backgroundColor: colors.bgSurface,
//     borderRadius: moderateScale(16),
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.05)',
//     padding: scale(16),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//     elevation: 2,
//   },

//   /* CRYPTO MARKET TABLE */
//   tableHeader: {
//     flexDirection: 'row',
//     paddingBottom: verticalScale(12),
//     borderBottomWidth: 1,
//     borderBottomColor: '#f3f4f6',
//     marginBottom: verticalScale(8),
//   },
//   tableHeaderText: {
//     color: colors.textMuted,
//     fontSize: moderateScale(11),
//     fontWeight: '600',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(12),
//     borderBottomWidth: 1,
//     borderBottomColor: '#f9fafb',
//   },
//   tableCell: {
//     fontSize: moderateScale(14),
//   },
//   coinIcon: {
//     width: scale(32),
//     height: scale(32),
//     borderRadius: scale(16),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: scale(10),
//   },
//   coinIconText: {
//     fontWeight: 'bold',
//     fontSize: moderateScale(14),
//   },
//   coinSymbol: {
//     color: colors.textMain,
//     fontWeight: '700',
//     fontSize: moderateScale(14),
//   },
//   coinName: {
//     color: colors.textMuted,
//     fontSize: moderateScale(11),
//     marginTop: verticalScale(2),
//   },
//   coinPrice: {
//     fontWeight: '600',
//     color: colors.textMain,
//   },

//   /* CRYPTO NEWS */
//   newsCard: {
//     flexDirection: 'row',
//     padding: scale(12),
//     marginBottom: verticalScale(12),
//     alignItems: 'center',
//   },
//   newsImage: {
//     width: scale(70),
//     height: scale(70),
//     borderRadius: moderateScale(10),
//     backgroundColor: '#e5e7eb',
//   },
//   newsContent: {
//     flex: 1,
//     marginLeft: scale(14),
//   },
//   newsHeadline: {
//     color: colors.textMain,
//     fontSize: moderateScale(14),
//     fontWeight: '600',
//     lineHeight: verticalScale(20),
//     marginBottom: verticalScale(8),
//   },
//   newsMetaRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   newsTime: {
//     color: colors.textMuted,
//     fontSize: moderateScale(11),
//   },
//   tagPill: {
//     paddingHorizontal: scale(8),
//     paddingVertical: verticalScale(2),
//     borderRadius: scale(12),
//   },
//   tagText: {
//     fontSize: moderateScale(10),
//     fontWeight: '600',
//   },
// });
