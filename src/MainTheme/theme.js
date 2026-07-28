import { StyleSheet, Platform } from 'react-native';

// --- Design Tokens (Variables) ---
export const theme = {
  colors: {
    primaryBlue: '#285CE0', 
    primaryIndigo: '#4f46e5',
    primaryPurple: '#7C3AED', 
    bgApp: '#F9FFFB', 
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

// --- Global Classes ---
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