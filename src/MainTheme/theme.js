import { StyleSheet, Platform } from 'react-native';

export const theme = {
  colors: {
    primaryBlue: '#285CE0', 
    primaryIndigo: '#4f46e5',
    primaryPurple: '#7C3AED', 
    bgApp: '#ffffff', 
    bgSurface: '#ffffff',
    bgLightPurple: '#F5F7FF',
    borderLight: '#E5E7EB',
    borderPurple: '#C7D2FE',
    textMain: '#05070D',  ////// profile 
    textMuted: '#414141', 
    statusSuccess: '#03B244',  ////// profile 
    statusDanger: '#ef4444',
    // Custom Tag Colors
    tagBtcBg: '#fff7ed',
    tagBtcText: '#ea580c',
    tagEthBg: '#eff6ff',
    tagEthText: '#2563eb',
    tagPayoBg: '#f3e8ff',
    tagPayoText: '#9333ea',
    grey:'#64748B',
   white: '#fff',
  },
  typography: {
    // React Native handles font families differently, falling back to system defaults
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', 
    size: {
      xs: 12,   // 0.75rem
      sm: 14,   // 0.875rem
      base: 16, // 1rem
      lg: 18,   // 1.125rem
      xl: 20,   // 1.25rem
      xxxl: 30  // 1.875rem
    },
    weight: {
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2, // Required for Android shadow
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    }
  }
};

export const globalStyles = StyleSheet.create({
  sectionHeading: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.textMain,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textMuted: {
    color: theme.colors.grey, 
    fontSize: theme.typography.size.sm,
  },
  textSuccess: {
    color: theme.colors.statusSuccess,
  },
  textDanger: {
    color: theme.colors.statusDanger,
  },
  card: {
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.borderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    ...theme.shadows.sm,
    marginBottom: 16,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionIconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    backgroundColor: theme.colors.primaryBlue,
    borderRadius: theme.borderRadius.lg,
  },
  tagPill: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Tag specific styles
  tagBtc: { backgroundColor: theme.colors.tagBtcBg },
  tagBtcText: { color: theme.colors.tagBtcText, fontSize: theme.typography.size.xs, fontWeight: theme.typography.weight.medium },
  
  tagEth: { backgroundColor: theme.colors.tagEthBg },
  tagEthText: { color: theme.colors.tagEthText, fontSize: theme.typography.size.xs, fontWeight: theme.typography.weight.medium },
  
  tagPayo: { backgroundColor: theme.colors.tagPayoBg },
  tagPayoText: { color: theme.colors.tagPayoText, fontSize: theme.typography.size.xs, fontWeight: theme.typography.weight.medium },
});














//////////////////////////////////////////////
//new code for white and dark theme

// import { StyleSheet, Platform, Appearance } from 'react-native';

// // --- Shared Tokens (Same for both themes) ---
// const typography = {
//   fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', 
//   size: {
//     xs: 12,
//     sm: 14,
//     base: 16,
//     lg: 18,
//     xl: 20,
//     xxxl: 30
//   },
//   weight: {
//     medium: '500',
//     semibold: '600',
//     bold: '700',
//   }
// };

// const borderRadius = {
//   sm: 8,
//   md: 12,
//   lg: 16,
//   xl: 24,
//   full: 9999,
// };

// // ==========================================
// // ☀️ LIGHT THEME
// // ==========================================
// const lightTheme = {
//   colors: {
//     primaryBlue: '#285CE0', 
//     primaryIndigo: '#4f46e5',
//     primaryPurple: '#7C3AED', 
//     bgApp: '#F9FFFB', 
//     bgSurface: '#ffffff',
//     bgLightPurple: '#F5F7FF',
//     borderLight: '#E5E7EB',
//     borderPurple: '#C7D2FE',
//     borderCard: 'rgba(0,0,0,0.05)',
//     textMain: '#05070D',  
//     textMuted: '#414141', 
//     statusSuccess: '#03B244',  
//     statusDanger: '#ef4444',
//     tagBtcBg: '#fff7ed',
//     tagBtcText: '#ea580c',
//     tagEthBg: '#eff6ff',
//     tagEthText: '#2563eb',
//     tagPayoBg: '#f3e8ff',
//     tagPayoText: '#9333ea',
//     grey: '#64748B'
//   },
//   typography,
//   borderRadius,
//   shadows: {
//     sm: {
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 1 },
//       shadowOpacity: 0.05,
//       shadowRadius: 2,
//       elevation: 2, 
//     },
//     md: {
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 4 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 4,
//     }
//   }
// };

// // ==========================================
// // 🌙 DARK THEME
// // ==========================================
// const darkTheme = {
//   colors: {
//     primaryBlue: '#3B82F6', 
//     primaryIndigo: '#6366F1',
//     primaryPurple: '#8B5CF6', 
//     bgApp: '#121212', 
//     bgSurface: '#1E1E1E', 
//     bgLightPurple: '#2A273A',
//     borderLight: '#333333',
//     borderPurple: '#3A3459',
//     borderCard: 'rgba(255,255,255,0.05)', 
//     textMain: '#F8FAFC',  
//     textMuted: '#A3A3A3', 
//     statusSuccess: '#22C55E', 
//     statusDanger: '#F87171', 
//     tagBtcBg: '#3D1D0D', 
//     tagBtcText: '#FDBA74',
//     tagEthBg: '#16284C',
//     tagEthText: '#93C5FD',
//     tagPayoBg: '#2A1646',
//     tagPayoText: '#D8B4FE',
//     grey: '#9CA3AF'
//   },
//   typography,
//   borderRadius,
//   shadows: {
//     sm: {
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 1 },
//       shadowOpacity: 0.3, 
//       shadowRadius: 2,
//       elevation: 2, 
//     },
//     md: {
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 4 },
//       shadowOpacity: 0.4, 
//       shadowRadius: 4,
//       elevation: 4,
//     }
//   }
// };

// // ==========================================
// // ⚙️ AUTOMATIC THEME DETECTION
// // ==========================================
// // This checks the device's settings when the app starts
// const isDarkMode = Appearance.getColorScheme() === 'dark';

// // Export the correct theme based on device settings
// export const theme = isDarkMode ? darkTheme : lightTheme;

// // --- Global Classes ---
// export const globalStyles = StyleSheet.create({
//   sectionHeading: {
//     fontSize: theme.typography.size.lg,
//     fontWeight: theme.typography.weight.semibold,
//     color: theme.colors.textMain,
//     marginBottom: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   textMuted: {
//     color: theme.colors.grey, 
//     fontSize: theme.typography.size.sm,
//   },
//   textSuccess: {
//     color: theme.colors.statusSuccess,
//   },
//   textDanger: {
//     color: theme.colors.statusDanger,
//   },
//   card: {
//     backgroundColor: theme.colors.bgSurface,
//     borderRadius: theme.borderRadius.lg,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: theme.colors.borderCard, 
//     ...theme.shadows.sm,
//     marginBottom: 16,
//   },
//   flexRowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   actionIconBtn: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 56,
//     height: 56,
//     backgroundColor: theme.colors.primaryBlue,
//     borderRadius: theme.borderRadius.lg,
//   },
//   tagPill: {
//     paddingVertical: 2,
//     paddingHorizontal: 8,
//     borderRadius: theme.borderRadius.full,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tagBtc: { backgroundColor: theme.colors.tagBtcBg },
//   tagBtcText: { color: theme.colors.tagBtcText, fontSize: theme.typography.size.xs, fontWeight: theme.typography.weight.medium },
  
//   tagEth: { backgroundColor: theme.colors.tagEthBg },
//   tagEthText: { color: theme.colors.tagEthText, fontSize: theme.typography.size.xs, fontWeight: theme.typography.weight.medium },
  
//   tagPayo: { backgroundColor: theme.colors.tagPayoBg },
//   tagPayoText: { color: theme.colors.tagPayoText, fontSize: theme.typography.size.xs, fontWeight: theme.typography.weight.medium },
// });
