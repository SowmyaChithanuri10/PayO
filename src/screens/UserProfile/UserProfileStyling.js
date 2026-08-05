import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { theme } from '../../MainTheme/theme'; 

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, 
    paddingHorizontal: scale(16),
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },
  backButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: theme.colors.bgSurface, 
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderLight, 
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: scale(12),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: theme.colors.textMain, 
  },
  subtitle: {
    fontSize: moderateScale(11),
    color: theme.colors.textMuted, 
    marginTop: verticalScale(2),
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: theme.colors.bgSurface, 
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: theme.colors.statusDanger, 
    width: scale(14),
    height: scale(14),
    borderRadius: scale(7),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.bgSurface, 
  },
  badgeText: {
    color: '#fff',
    fontSize: moderateScale(8),
    fontWeight: 'bold',
  },
  
  // --- Profile Card ---
  // profileCard: {
  //   backgroundColor: localColors.bgLightPurple, 
  //   borderRadius: scale(16),
  //   padding: scale(16),
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: verticalScale(16),
  //   borderWidth: 1,
  //   borderColor: '#E0E7FF',
  //   shadowColor: theme.colors.primaryIndigo, 
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowOpacity: 0.05,
  //   shadowRadius: 8,
  //   elevation: 2,
  //   overflow: 'hidden',
  // },
  profileImageContainer: {
    position: 'relative',
    width: scale(76),
    height: scale(76),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
  // We remove the solid purple background color here
  borderRadius: scale(16),
  padding: scale(16),
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: verticalScale(16),
  borderWidth: 1,
  borderColor: '#E0E7FF',
  shadowColor: theme.colors.primaryIndigo, 
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 2,
  overflow: 'hidden', // Required so the background image respects the border radius
},

// Style property explicitly for the underlying background image component
profileCardBgImage: {
  resizeMode: 'cover',
  borderRadius: scale(16), // Symmetrical rounded crop
},
  profileArcBorder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: scale(38),
    borderWidth: 3,
    borderColor: '#3B60C4', 
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  profileCircle: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    fontSize: moderateScale(28),
  },
  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.bgSurface, 
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileInfo: {
    marginLeft: scale(22),
    flex: 1,
  },
  profileName: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: theme.colors.textMain, 
  },
  profilePhone: {
    fontSize: moderateScale(13),
    color: theme.colors.textMuted, 
    marginTop: verticalScale(2),
  },
  // kycBadge: {
  //   backgroundColor: '#ff000023', // Soft green color matching successful verification layout style
  //   alignSelf: 'flex-start',
  //   paddingHorizontal: scale(8),
  //   paddingVertical: verticalScale(4),
  //   borderRadius: scale(4),
  //   marginTop: verticalScale(6),
  // },
  // kycText: {
  //   color: theme.colors.statusDanger, 
  //   fontSize: moderateScale(11),
  //   fontWeight: '700',
  //   letterSpacing: 0.5,
  // },

  kycBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(4),
    marginTop: verticalScale(6),
  },
  kycBadgeSuccess: {
    backgroundColor: '#D1FAE5', // Soft green background
  },
  kycBadgeDanger: {
    backgroundColor: '#FEE2E2', // Soft red background
  },
  kycText: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  kycTextSuccess: {
    color: '#10B981', // Emerald / Green text
  },
  kycTextDanger: {
    color: theme.colors.statusDanger, // Red text
  },

  // --- List Text Styles ---
  dangerText: {
    fontSize: moderateScale(13),
    color: theme.colors.statusDanger, 
    fontWeight: '500',
  },
  successText: {
    fontSize: moderateScale(13),
    color: '#10B981', // Green text for list item
    fontWeight: '500',
  },

  // --- Balance & Transactions ---
  balanceContainer: {
    flexDirection: 'row',
    // backgroundColor: theme.colors.bgSurface, 
    backgroundColor:'#F0EEFB99',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: theme.colors.borderPurple,
  },
  balanceHalf: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconWrapper: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(8),
    backgroundColor: '#EEF2FF', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },
  statIconWrapperRed: {
    backgroundColor: '#FEE2E2',
  },
  statIcon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  statLabel: {
    fontSize: moderateScale(11),
    color: theme.colors.textMuted, 
  },
  statValue: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: theme.colors.textMain, 
    marginTop: verticalScale(2),
  },
  token: {
    fontSize: moderateScale(10),
    color: theme.colors.statusSuccess, 
    fontWeight: '600',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: theme.colors.borderLight, 
    marginHorizontal: scale(12),
  },

  // --- Referral Card ---
  referralCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#C4B5FD', 
    borderStyle: 'dashed',
    borderRadius: scale(12),
    padding: scale(12),
    backgroundColor: theme.colors.bgSurface, 
    marginBottom: verticalScale(16),
  },
  rewardIcon: {
    width: scale(30),
    height: scale(30),
    marginRight: scale(20),
    resizeMode: 'contain',
  },
  referralLabel: {
    fontSize: moderateScale(11),
    color: theme.colors.primaryPurple, 
    fontWeight: '400',
  },
  referralCode: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: theme.colors.textMain, 
    marginTop: verticalScale(2),
    
  },

  shareIcon: {
    width: scale(18),
    height: scale(18),
    marginLeft: scale(20),
    resizeMode: 'contain',
  },
  copyIcon: {
    width: scale(18),
    height: scale(18),
    marginLeft: scale(20),
    resizeMode: 'contain',
  },

  // --- Action Buttons ---
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
  },
  actionBtnOutline: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.bgLightPurple, 
    borderWidth: 1,
    borderColor: theme.colors.borderPurple, 
    paddingVertical: verticalScale(10),
    borderRadius: scale(8),
  },
  actionBtnText: {
    fontSize: moderateScale(12),
    color: theme.colors.textMain, 
    fontWeight: '500',
    marginRight: scale(8),
  },
 addBankPrimaryBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', // Centers the text block inside the button
  backgroundColor: theme.colors.primaryIndigo, 
  borderRadius: scale(10),
  paddingVertical: verticalScale(14),
  paddingHorizontal: scale(16),
  marginTop: verticalScale(14),
  marginBottom: verticalScale(24),
  position: 'relative', // Necessary to anchor the absolute icons properly
},
addBankPrimaryText: {
  color: '#ffffff',
  fontSize: moderateScale(14),
  fontWeight: '600',
  textAlign: 'center', // Centers the text line internally
},
leftIcon: {
  position: 'absolute',
  left: scale(16), // Pins the icon to the left inner padding edge
},
rightIcon: {
  position: 'absolute',
  right: scale(16), // Pins the icon to the right inner padding edge
},

disabledBankBtn: {
  backgroundColor: '#E5E7EB', // Neutral gray background
  borderColor: '#D1D5DB',
  elevation: 0,               // Remove Android shadow
  shadowOpacity: 0,           // Remove iOS shadow
},
disabledBankBtnText: {
  color: '#9CA3AF',           // Muted gray text
  fontSize: 16,
  fontWeight: '600',
},

  // --- New Primary Logout Button Style ---
  logoutPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EF4444', // Solid Crimson/Red UI color mapping
    borderRadius: scale(10),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(16),
  },
  logoutPrimaryText: {
    flex: 1,
    color: '#ffffff',
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginLeft: scale(12),
  },

  // --- Lists & Sections ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    paddingHorizontal: scale(4),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: theme.colors.textMain, 
  },
  viewAll: {
    fontSize: moderateScale(11),
    color: theme.colors.primaryBlue, 
    fontWeight: '500',
  },
  listCard: {
    backgroundColor:'#F2F4F4', 
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(4),
    marginBottom: verticalScale(20),
    borderWidth: 1,
    borderColor: theme.colors.borderLight, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(14),
    // borderBottomWidth: 1,
    // borderBottomColor: '#F3F4F6',
  },
  listItemTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  listLabel: {
    fontSize: moderateScale(13),
    color: theme.colors.textMain, 
    fontWeight: '400',
  },
  listLabelDark: {
    fontSize: moderateScale(13),
    color: theme.colors.textMain, 
    fontWeight: '500',
  },
  listValue: {
    fontSize: moderateScale(13),
    color: theme.colors.textMain, 
    fontWeight: '400',
  },
  // dangerText: {
  //   fontSize: moderateScale(13),
  //   color: theme.colors.statusDanger, 
  //   fontWeight: '400',
  // },

  // --- Security Banner ---
  // --- Security Banner (Updated for Precise Layout matching Image) ---
securityBanner: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F5F6FE', // Clean lavender background tint from image
  borderRadius: scale(16),   // Slightly rounder corners matching mockup
  paddingVertical: verticalScale(20),
  paddingHorizontal: scale(16),
  // marginBottom: verticalScale(16),
  position: 'relative',
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#EBEFFF',
},
bannerIcon: {
  width: scale(40),
  height: scale(40),
  marginRight: scale(16),
  resizeMode: 'contain',
},
bannerTextContainer: {
  flex: 1,
  zIndex: 2, // Keeps text above background vectors
  paddingRight: scale(60), // Prevents text from running over the shield watermark
},
bannerTitle: {
  fontSize: moderateScale(15),
  fontWeight: '700',
  color: theme.colors.textMain,
},
bannerSub: {
  fontSize: moderateScale(13),
  color: theme.colors.textMuted,
  marginTop: verticalScale(4),
  lineHeight: 18,
},
watermarkIcon: {
  position: 'absolute',
  right: 0,
  bottom: 0,
  top: 20, 
  width: scale(110), // Increased width to match full-height display structure from image
  height: '100%',
  opacity: 0.9,
  resizeMode: 'cover',
  zIndex: 1,
},

// --- Logout Primary Button (Mirrors centered Add Bank Layout) ---
logoutPrimaryBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', // Centers the text block perfectly
  backgroundColor: theme.colors.primaryIndigo, // Set to match Add Bank color theme
  borderRadius: scale(10),
  paddingVertical: verticalScale(14),
  paddingHorizontal: scale(16),
  marginBottom: verticalScale(24),
  position: 'relative', 
},
logoutPrimaryText: {
  color: '#ffffff',
  fontSize: moderateScale(14),
  fontWeight: '600',
  textAlign: 'center',
},

// --- Symmetrical Absolute Icon Anchors ---
leftIcon: {
  position: 'absolute',
  left: scale(16),
},
rightIcon: {
  position: 'absolute',
  right: scale(16),
},
});