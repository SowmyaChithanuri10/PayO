
// import { StyleSheet } from 'react-native';
// import { scale, verticalScale, moderateScale, windowWidth } from '../../utils/responsive'; 
// import { theme } from '../../MainTheme/theme'; 

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.bgApp, 
//   },
//   scrollContent: {
//     paddingBottom: verticalScale(130),
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: scale(20),
//     paddingTop: verticalScale(20),
//     paddingBottom: verticalScale(15),
//   },
//   iconButton: {
//     width: scale(35), 
//     height: scale(35), 
//     backgroundColor: '#fff',
//     borderRadius: scale(20),
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerNotificationIcon: {
//     width: scale(18), 
//     height: scale(18), 
//   },
//   logo: {
//     width: scale(110),
//     height: verticalScale(30),
//     marginLeft: scale(40), 
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: scale(10),
//   },
//   badge: {
//     position: 'absolute',
//     top: -2, 
//     right: -2, 
//     backgroundColor: theme.colors.statusDanger, // Updated to theme
//     width: scale(16),
//     height: scale(16),
//     borderRadius: scale(8),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#fff',
//     zIndex: 10,
//   },
//   badgeText: {
//     color: '#fff',
//     fontSize: moderateScale(9),
//     fontWeight: 'bold',
//   },
//   profileIconContainer: {
//     width: scale(32), 
//     height: scale(32), 
//     borderRadius: scale(16), 
//     backgroundColor: theme.colors.primaryBlue, 
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   headerProfileImg: {
//     width: scale(18), 
//     height: scale(18), 
//   },

//   walletCard: {
//     marginHorizontal: scale(20),
//     marginTop: verticalScale(5),
//     borderRadius: moderateScale(24),
//     padding: scale(20),
//     position: 'relative',
//     overflow: 'hidden',
//     elevation: 8,
//     shadowColor: '#4f46e5',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//   },
//   cardLightHighlight: {
//     position: 'absolute',
//     width: scale(180),
//     height: scale(180),
//     borderRadius: scale(90),
//     backgroundColor: 'rgba(255, 255, 255, 0.07)',
//     top: -scale(30),
//     right: -scale(20),
//   },
//   walletHeaderRow: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'flex-start', 
//   width: '100%',
// },
// viewWalletBtn: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: 'transparent',
//   borderWidth: 1,
//   borderColor: 'rgba(255,255,255,0.4)',
//   paddingHorizontal: scale(14),
//   paddingVertical: verticalScale(6),
//   borderRadius: theme.borderRadius.full,
//   marginTop: verticalScale(16), // Add this to push it down
// },
//   rowCenter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   walletLabel: {
//     color: 'rgba(255, 255, 255, 0.9)',
//     fontSize: moderateScale(13),
//     fontWeight: '500',
//   },
//   viewWalletText: {
//     color: '#fff',
//     fontSize: moderateScale(15),
//     marginRight: scale(4),
//     fontWeight: '500',
//   },
//   balanceContainer: {
//     marginTop: verticalScale(-15),
//     alignItems: 'flex-start',
//   },
//   balanceRow: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//   },
//   balanceAmount: {
//     color: '#fff',
//     fontSize: moderateScale(36),
//     fontWeight: '700',
//   },
//   balanceCurrency: {
//     color: 'rgba(255,255,255,0.9)',
//     fontSize: moderateScale(15),
//     marginLeft: scale(8),
//     fontWeight: '600',
//   },
//   fiatAmount: {
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: moderateScale(15),
//     marginTop: verticalScale(6),
//     fontWeight: '700',
//   },
//   bottomActionRow: {
//     width: '100%',
//     alignItems: 'flex-end', 
//     marginTop: verticalScale(1), 
//   },
//   addMoneyBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: scale(20),
//     paddingVertical: verticalScale(12),
//     borderRadius: scale(24),
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//   },
//   addMoneyText: {
//     color: '#1e40af', 
//     fontWeight: '700',
//     fontSize: moderateScale(15),
//   },

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
//     color: theme.colors.textMain, 
    
//   },
//   viewAllText: {
//     fontSize: moderateScale(14),
//     color: theme.colors.primaryBlue,
//     fontWeight: '500',
//   },

//   actionsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: scale(20),
//     marginTop: verticalScale(10),
//   },
//   actionItem: {
//     alignItems: 'center',
//   },
//   actionIconBtn: {
//     width: scale(50),
//     height: scale(50),
//     borderRadius: scale(16),
//     backgroundColor: theme.colors.primaryBlue,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: verticalScale(8),
//     marginHorizontal: scale(1),
//     elevation: 3,
//     shadowColor: theme.colors.primaryBlue, 
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   actionImageFormat: {
//     width: scale(20),
//     height: scale(20),
//   },
//   actionLabel: {
//     fontSize: moderateScale(13),
//     color: theme.colors.textMain, 
//     fontWeight: '500',
//   },
 
//   carouselContainer: {
//     marginTop: verticalScale(24),
//     marginHorizontal: scale(20), 
//     position: 'relative', 
//     overflow: 'hidden', 
//   },
//   bannerWrapper: {
//     width: scale(304), 
//     marginRight: scale(8), 
//   },
//   bannerCard: {
//     width: '100%',
//     height: verticalScale(102), 
//     borderRadius: moderateScale(16),
//     overflow: 'hidden',
//   },
  
//   /* OVERLAID PAGINATION */
//   bannerPagination: {
//     position: 'absolute',
//     bottom: verticalScale(14), 
//     left: scale(16), // Adjusted slightly since the parent container now has a margin
//     flexDirection: 'row',
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   dot: {
//     width: scale(6),
//     height: scale(6),
//     borderRadius: scale(3),
//     backgroundColor: 'rgba(255, 255, 255, 0.4)', 
//     marginRight: scale(6),
//   },
//   dotActive: {
//     width: scale(18), 
//     backgroundColor: '#ffffff', 
//   },

//   /* COMMON CARD (Crypto Market & News uses this base) */
//   card: {
//     backgroundColor: theme.colors.bgSurface, // Updated to theme
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
//     color: theme.colors.textMuted, // Updated to theme
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
//     color: theme.colors.textMain, // Updated to theme
//     fontWeight: '700',
//     fontSize: moderateScale(14),
//   },
//   coinName: {
//     color: theme.colors.textMuted, // Updated to theme
//     fontSize: moderateScale(11),
//     marginTop: verticalScale(2),
//   },
//   coinPrice: {
//     fontWeight: '600',
//     color: theme.colors.textMain, // Updated to theme
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
//     color: theme.colors.textMain, // Updated to theme
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
//     color: theme.colors.textMuted, // Updated to theme
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




import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale, windowWidth } from '../../utils/responsive'; 
import { theme } from '../../MainTheme/theme'; 

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, 
  },
  scrollContent: {
    paddingBottom: verticalScale(130),
  },

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
    backgroundColor: theme.colors.primaryBlue, 
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerProfileImg: {
    width: scale(18), 
    height: scale(18), 
  },

  // ------------- NEW KYC REMINDER STYLES -------------
  kycReminderContainer: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(3),
    padding: scale(8),
    borderWidth: 0.5,
    borderColor: '#0b0c0e2b', 
    borderRadius: moderateScale(14),
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kycReminderText: {
    flex: 1,
    fontSize: moderateScale(12),
    color: theme.colors.textMain,
    fontWeight: '500',
    marginRight: scale(10),
  },
  kycButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kycOkBtn: {
    backgroundColor: theme.colors.primaryBlue,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(6),
    marginRight: scale(6),
  },
  kycCloseBtn: {
    backgroundColor: 'transparent',
    padding: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(2),
  },
  kycBtnTextProceed: {
    color: '#fff',
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  kycBtnTextClose: {
    color: theme.colors.primaryBlue,
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  // ---------------------------------------------------

  walletCard: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(12), // Adjusted margin slightly so it breathes below header or KYC reminder
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
  walletHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
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
    marginTop: verticalScale(16), 
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
    alignItems: 'flex-end', 
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
    color: '#1e40af', 
    fontWeight: '700',
    fontSize: moderateScale(15),
  },

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
    color: theme.colors.textMain, 
  },
  viewAllText: {
    fontSize: moderateScale(14),
    color: theme.colors.primaryBlue,
    fontWeight: '500',
  },

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
    backgroundColor: theme.colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    marginHorizontal: scale(1),
    elevation: 3,
    shadowColor: theme.colors.primaryBlue, 
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
    color: theme.colors.textMain, 
    fontWeight: '500',
  },
 
  carouselContainer: {
    marginTop: verticalScale(24),
    marginHorizontal: scale(20), 
    position: 'relative', 
    overflow: 'hidden', 
  },
  bannerWrapper: {
    width: scale(304), 
    marginRight: scale(8), 
  },
  bannerCard: {
    width: '100%',
    height: verticalScale(102), 
    borderRadius: moderateScale(16),
    overflow: 'hidden',
  },
  
  /* OVERLAID PAGINATION */
  bannerPagination: {
    position: 'absolute',
    bottom: verticalScale(14), 
    left: scale(16), 
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    marginRight: scale(6),
  },
  dotActive: {
    width: scale(18), 
    backgroundColor: '#ffffff', 
  },

  /* COMMON CARD (Crypto Market & News uses this base) */
  card: {
    backgroundColor: theme.colors.bgSurface, 
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
    color: theme.colors.textMuted, 
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
    color: theme.colors.textMain, 
    fontWeight: '700',
    fontSize: moderateScale(14),
  },
  coinName: {
    color: theme.colors.textMuted, 
    fontSize: moderateScale(11),
    marginTop: verticalScale(2),
  },
  coinPrice: {
    fontWeight: '600',
    color: theme.colors.textMain, 
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
    color: theme.colors.textMain, 
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
    color: theme.colors.textMuted, 
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
});