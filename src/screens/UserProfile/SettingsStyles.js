// import { StyleSheet, Platform, StatusBar } from 'react-native';
// import { scale, verticalScale, moderateScale } from '../../utils/responsive';
// import { theme } from '../../MainTheme/theme'; 

// export default StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: theme.colors.bgApp, 
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: scale(16),
//     // Add dynamic padding for Android status bar
//     //paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + verticalScale(0) : 0,
//   },
  
//   // --- Header ---
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: verticalScale(16),
//   },
//   backButton: {
//       width: scale(36),
//       height: scale(36),
//       borderRadius: scale(18),
//       backgroundColor: theme.colors.bgSurface, 
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderWidth: 1,
//       borderColor: theme.colors.borderLight, 
//     },
//   headerTextContainer: {
//     flex: 1,
//     marginLeft: scale(12),
//   },
//   title: {
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     color: theme.colors.textMain,
//   },
//   subtitle: {
//     fontSize: moderateScale(11),
//     color: theme.colors.textMuted,
//     marginTop: verticalScale(2),
//   },

//   // --- Profile Card ---
//   profileImageContainer: {
//       position: 'relative',
//       width: scale(76),
//       height: scale(76),
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     profileCard: {
//     // We remove the solid purple background color here
//     borderRadius: scale(16),
//     padding: scale(16),
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(16),
//     borderWidth: 1,
//     borderColor: '#E0E7FF',
//     shadowColor: theme.colors.primaryIndigo, 
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//     overflow: 'hidden', 
//   },
//   profileCardBgImage: {
//     resizeMode: 'cover',
//     borderRadius: scale(16), 
//   },
//     profileArcBorder: {
//       position: 'absolute',
//       width: '100%',
//       height: '100%',
//       borderRadius: scale(38),
//       borderWidth: 3,
//       borderColor: '#3B60C4', 
//       borderRightColor: 'transparent',
//       borderBottomColor: 'transparent',
//       transform: [{ rotate: '45deg' }],
//     },
//     profileCircle: {
//       width: scale(64),
//       height: scale(64),
//       borderRadius: scale(32),
//       backgroundColor: '#E5E7EB',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     profileAvatarText: {
//       fontSize: moderateScale(28),
//     },
//     editIconBadge: {
//       position: 'absolute',
//       bottom: 0,
//       right: 0,
//       backgroundColor: theme.colors.bgSurface, 
//       width: scale(24),
//       height: scale(24),
//       borderRadius: scale(12),
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderWidth: 1,
//       borderColor: theme.colors.borderLight,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 1 },
//       shadowOpacity: 0.1,
//       shadowRadius: 2,
//       elevation: 2,
//     },
//     profileInfo: {
//       marginLeft: scale(22),
//       flex: 1,
//     },
//     profileName: {
//       fontSize: moderateScale(18),
//       fontWeight: '700',
//       color: theme.colors.textMain, 
//     },
//     profilePhone: {
//       fontSize: moderateScale(13),
//       color: theme.colors.textMuted, 
//       marginTop: verticalScale(2),
//     },
//     kycBadge: {
//       backgroundColor: '#ff000023',
//       alignSelf: 'flex-start',
//       paddingHorizontal: scale(8),
//       paddingVertical: verticalScale(4),
//       borderRadius: scale(4),
//       marginTop: verticalScale(6),
//     },
//     kycText: {
//       color: theme.colors.statusDanger, 
//       fontSize: moderateScale(9),
//       fontWeight: '700',
//       letterSpacing: 0.5,
//     },
//   card: {
//     backgroundColor: theme.colors.bgLightPurple,
//     borderRadius: scale(12),
//     padding: scale(16),
//     marginBottom: verticalScale(16),
//     borderWidth: 1,
//     borderColor: '#C4B5FD',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.03,
//     shadowRadius: 4,
//     elevation: 1,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(16),
//   },
//   sectionTitle: {
//     fontSize: moderateScale(15),
//     fontWeight: '700',
//     color: theme.colors.textMain,
//     marginLeft: scale(8),
//   },

//   inputLabel: {
//     fontSize: moderateScale(12),
//     color: theme.colors.primaryBlue,
//     fontWeight: '500',
//     marginBottom: verticalScale(6),
//     marginTop: verticalScale(8),
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: theme.colors.bgLightPurple,
//     borderRadius: scale(8),
//     paddingHorizontal: scale(12),
//     height: verticalScale(46),
//     borderWidth: 1,
//     borderColor: theme.colors.borderLight,
//   },
//   inputIcon: {
//     marginRight: scale(10),
//   },
//   input: {
//     flex: 1,
//     fontSize: moderateScale(13),
//     color: theme.colors.textMain,
//   },

//   limitRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: verticalScale(20),
//     marginBottom: verticalScale(6),
//   },
//   limitLabel: {
//     fontSize: moderateScale(12),
//     color: theme.colors.textMain,
//   },
//   limitValue: {
//     fontSize: moderateScale(12),
//     color: theme.colors.textMain,
//     fontWeight: '500',
//   },
//   progressBarBg: {
//     height: verticalScale(8),
//     backgroundColor: '#10B981', // Green background track
//     borderRadius: scale(3),
//     width: '100%',
//     overflow: 'hidden',
//   },
//   progressBarFill: {
//     height: '100%',
//     backgroundColor: theme.colors.primaryPurple, // Purple overlay
//     borderRadius: scale(3),
//   },
//   primaryBtn: {
//     backgroundColor: theme.colors.primaryIndigo,
//     borderRadius: scale(8),
//     paddingVertical: verticalScale(14),
//     alignItems: 'center',
//     marginTop: verticalScale(20),
//   },
//   primaryBtnText: {
//     color: '#ffffff',
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//   },

//   // --- Lists & Toggles ---
//   listItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: verticalScale(12),
//   },
//   listTextContainer: {
//     flex: 1,
//     paddingRight: scale(16),
//   },
//   listTitle: {
//     fontSize: moderateScale(13),
//     color: theme.colors.textMain,
//     fontWeight: '500',
//   },
//   listSubtitle: {
//     fontSize: moderateScale(11),
//     color: theme.colors.textMuted,
//     marginTop: verticalScale(2),
//   },

//   // --- Dropdown Mock (Appearance) ---
//   dropdownBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//     paddingHorizontal: scale(10),
//     paddingVertical: verticalScale(6),
//     borderRadius: scale(6),
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   dropdownText: {
//     fontSize: moderateScale(12),
//     color: theme.colors.textMain,
//     fontWeight: '500',
//   },

//   // --- Logout Button ---
//   logoutBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#DC2626', 
//     borderRadius: scale(10),
//     paddingVertical: verticalScale(14),
//     marginBottom: verticalScale(16),
//   },
//   logoutIcon: {
//     marginRight: scale(8),
//   },
//   logoutText: {
//     color: '#ffffff',
//     fontSize: moderateScale(14),
//     fontWeight: '600',
//   },

//   // --- Security Banner ---
//   securityBanner: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: '#F5F6FE', // Clean lavender background tint from image
//   borderRadius: scale(16),   // Slightly rounder corners matching mockup
//   paddingVertical: verticalScale(20),
//   paddingHorizontal: scale(16),
//   marginBottom: verticalScale(16),
//   position: 'relative',
//   overflow: 'hidden',
//   borderWidth: 1,
//   borderColor: '#EBEFFF',
// },
// bannerIcon: {
//   width: scale(40),
//   height: scale(40),
//   marginRight: scale(16),
//   resizeMode: 'contain',
// },
// bannerTextContainer: {
//   flex: 1,
//   zIndex: 2, // Keeps text above background vectors
//   paddingRight: scale(60), // Prevents text from running over the shield watermark
// },
// bannerTitle: {
//   fontSize: moderateScale(15),
//   fontWeight: '700',
//   color: theme.colors.textMain,
// },
// bannerSub: {
//   fontSize: moderateScale(13),
//   color: theme.colors.textMuted,
//   marginTop: verticalScale(4),
//   lineHeight: 18,
// },
// watermarkIcon: {
//   position: 'absolute',
//   right: 0,
//   bottom: 0,
//   top: 20, 
//   width: scale(110), // Increased width to match full-height display structure from image
//   height: '100%',
//   opacity: 0.9,
//   resizeMode: 'cover',
//   zIndex: 1,
// },
// });



import { StyleSheet, Platform, StatusBar } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { theme } from '../../MainTheme/theme'; 

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, 
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    // Add dynamic padding for Android status bar
    //paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + verticalScale(0) : 0,
  },
  
  // --- Header ---
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

  // --- Profile Card ---
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
    overflow: 'hidden', 
  },
  profileCardBgImage: {
    resizeMode: 'cover',
    borderRadius: scale(16), 
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

    // --- KYC Styles Updated ---
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
      fontSize: moderateScale(9),
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    kycTextSuccess: {
      color: '#10B981', // Emerald / Green text
    },
    kycTextDanger: {
      color: theme.colors.statusDanger, // Red text
    },

  card: {
    backgroundColor: theme.colors.bgLightPurple,
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: '#C4B5FD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: theme.colors.textMain,
    marginLeft: scale(8),
  },

  inputLabel: {
    fontSize: moderateScale(12),
    color: theme.colors.primaryBlue,
    fontWeight: '500',
    marginBottom: verticalScale(6),
    marginTop: verticalScale(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.bgLightPurple,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    height: verticalScale(46),
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  inputIcon: {
    marginRight: scale(10),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(13),
    color: theme.colors.textMain,
  },

  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(6),
  },
  limitLabel: {
    fontSize: moderateScale(12),
    color: theme.colors.textMain,
  },
  limitValue: {
    fontSize: moderateScale(12),
    color: theme.colors.textMain,
    fontWeight: '500',
  },
  progressBarBg: {
    height: verticalScale(8),
    backgroundColor: '#10B981', // Green background track
    borderRadius: scale(3),
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primaryPurple, // Purple overlay
    borderRadius: scale(3),
  },
  primaryBtn: {
    backgroundColor: theme.colors.primaryIndigo,
    borderRadius: scale(8),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: moderateScale(13),
    fontWeight: '600',
  },

  // --- Lists & Toggles ---
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
  },
  listTextContainer: {
    flex: 1,
    paddingRight: scale(16),
  },
  listTitle: {
    fontSize: moderateScale(13),
    color: theme.colors.textMain,
    fontWeight: '500',
  },
  listSubtitle: {
    fontSize: moderateScale(11),
    color: theme.colors.textMuted,
    marginTop: verticalScale(2),
  },

  // --- Dropdown Mock (Appearance) ---
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dropdownText: {
    fontSize: moderateScale(12),
    color: theme.colors.textMain,
    fontWeight: '500',
  },

  // --- Logout Button ---
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626', 
    borderRadius: scale(10),
    paddingVertical: verticalScale(14),
    marginBottom: verticalScale(16),
  },
  logoutIcon: {
    marginRight: scale(8),
  },
  logoutText: {
    color: '#ffffff',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },

  // --- Security Banner ---
  securityBanner: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F5F6FE', // Clean lavender background tint from image
  borderRadius: scale(16),   // Slightly rounder corners matching mockup
  paddingVertical: verticalScale(20),
  paddingHorizontal: scale(16),
  marginBottom: verticalScale(16),
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
});