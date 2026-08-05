

import { StyleSheet, Platform } from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';

import { theme } from '../../MainTheme/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(40),
  },

  label: {
    color: theme.colors.textMain,
    fontSize: theme.typography.size.sm || moderateScale(13),
    fontWeight: theme.typography.weight.medium || '500',
    marginBottom: verticalScale(8),
    marginLeft: scale(4),
  },

  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: theme.borderRadius.sm || 8,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    marginBottom: verticalScale(16),
    backgroundColor: theme.colors.bgSurface,
    color: theme.colors.textMain,
    fontSize: moderateScale(14),
  },

  infoText: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(12),
    marginTop: verticalScale(-8),
    marginBottom: verticalScale(16),
    marginLeft: scale(4),
  },
  
  userNameContainer: {
    marginTop: verticalScale(-8),
    marginBottom: verticalScale(16),
    marginLeft: scale(4),
  },

  userNameLabel: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(12),
  },

  successText: {
    color: theme.colors.statusSuccess || '#10b981',
    fontSize: moderateScale(12),
    fontWeight: theme.typography.weight.semibold || '600',
  },

  errorText: {
    color: theme.colors.statusDanger || '#ef4444',
    fontSize: moderateScale(12),
    marginTop: verticalScale(-8),
    marginBottom: verticalScale(16),
    marginLeft: scale(4),
  },

  errorAlert: {
    color: theme.colors.statusDanger || '#ef4444',
    textAlign: 'center',
    marginBottom: verticalScale(12),
    fontSize: moderateScale(13),
    marginTop: verticalScale(-10),
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: theme.borderRadius.sm || 8,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    marginBottom: verticalScale(20),
    backgroundColor: theme.colors.bgSurface,
  },

  amountInput: {
    flex: 1,
    fontSize: moderateScale(15),
    color: theme.colors.textMain,
    padding: 0, 
  },

  token: {
    color: theme.colors.statusSuccess || '#10b981', 
    fontSize: theme.typography.size.sm || moderateScale(13),
    fontWeight: theme.typography.weight.semibold || '600',
    marginLeft: scale(8),
  },

  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
  },

  quickBtn: {
    backgroundColor: '#e5e7eb', 
    paddingVertical: verticalScale(10),
    flex: 1,
    marginHorizontal: scale(4),
    borderRadius: theme.borderRadius.sm || 8,
    alignItems: 'center',
    ...theme.shadows.sm,
  },

  quickText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.medium || '500',
  },

  balanceBox: {
    backgroundColor: '#e0f2fe', 
    borderWidth: 1,
    borderColor: '#bae6fd', 
    borderRadius: theme.borderRadius.md || 12,
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(32),
    ...theme.shadows.sm,
  },

  balanceText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.medium || '500',
  },

  balanceAmount: {
    color: theme.colors.textMain,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.semibold || '600',
  },

  button: {
    backgroundColor: theme.colors.primaryBlue,
    paddingVertical: verticalScale(14),
    borderRadius: theme.borderRadius.sm || 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: moderateScale(16),
    fontWeight: theme.typography.weight.semibold || '600',
  },
});