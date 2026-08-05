import { StyleSheet } from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';
import { theme } from '../../MainTheme/theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, // Clean white background
  },

  container: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },

  backBtn: {
    paddingRight: scale(12),
  },

  header: {
    fontSize: moderateScale(18),
    fontWeight: theme.typography.weight.semibold || '600',
    color: theme.colors.textMain,
    marginLeft: scale(8),
  },
  card: {
    backgroundColor: '#eff6ff', // Light blue background
    borderColor: '#93c5fd', // Blue border
    borderWidth: 1,
    paddingVertical: verticalScale(32),
    paddingHorizontal: scale(24),
    borderRadius: theme.borderRadius.xl || 24,
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },

  iconBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    width: scale(48),
    height: scale(48),
    borderRadius: theme.borderRadius.md || 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },

  earn: {
    color: theme.colors.textMain,
    fontSize: moderateScale(18),
    fontWeight: theme.typography.weight.semibold || '600',
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },

  desc: {
    color: theme.colors.textMain,
    textAlign: 'center',
    fontWeight: theme.typography.weight.medium || '500',
    lineHeight: moderateScale(22),
    fontSize: moderateScale(13),
  },
  codeBox: {
    backgroundColor: '#f0f9ff', // Very light blue fill
    borderWidth: 1,
    borderColor: theme.colors.primaryBlue, // Blue dashed border
    borderStyle: 'dashed',
    padding: scale(16),
    borderRadius: theme.borderRadius.md || 12,
    marginBottom: verticalScale(24),
  },

  codeLabel: {
    color: theme.colors.primaryBlue,
    marginBottom: verticalScale(8),
    fontSize: moderateScale(11),
    fontWeight: theme.typography.weight.semibold || '600',
  },

  code: {
    color: theme.colors.textMain,
    fontSize: moderateScale(16),
    fontWeight: theme.typography.weight.semibold || '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
    gap: scale(12),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.textMuted || '#6b7280',
    borderStyle: 'dashed',
    paddingVertical: verticalScale(14),
    borderRadius: theme.borderRadius.md || 12,
    flex: 1,
  },

  btnText: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    fontSize: moderateScale(13),
    marginRight: scale(8),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: verticalScale(32),
    gap: scale(16),
  },
  statBox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#93c5fd',
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
    borderRadius: theme.borderRadius.md || 12,
    width: '40%',
    alignItems: 'center',
  },
  statValue: {
    color: theme.colors.textMain,
    fontSize: moderateScale(20),
    fontWeight: theme.typography.weight.bold || '700',
  },

  statValueGreen: {
    color: theme.colors.statusSuccess || '#10b981', // Green text for rewards
    fontSize: moderateScale(20),
    fontWeight: theme.typography.weight.bold || '700',
  },

  statLabel: {
    color: theme.colors.textMain,
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
    textAlign: 'center',
    fontWeight: theme.typography.weight.medium || '500',
  },

  info: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(24),
  },

  infoTitle: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    marginBottom: verticalScale(16),
    fontSize: moderateScale(15),
  },

  infoText: {
    color: theme.colors.textMain,
    marginBottom: verticalScale(12),
    lineHeight: moderateScale(22),
    fontSize: moderateScale(13),
  },
});