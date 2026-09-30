import { StyleSheet } from 'react-native';
import { theme } from '../../../MainTheme/theme';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp || '#F8FAFC',
  },
  scrollContent: {
    padding: moderateScale(14),
    paddingBottom: verticalScale(30),
  },
  centerContainer: {
    paddingVertical: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: verticalScale(8),
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted || '#64748B',
  },
  errorText: {
    color: theme.colors.statusError || '#EF4444',
    textAlign: 'center',
    fontSize: theme.typography.size.xs,
  },
  retryText: {
    color: theme.colors.primaryIndigo || '#4F46E5',
    fontWeight: '600',
    fontSize: theme.typography.size.xs,
  },

  // Table Container
  tableContainer: {
    borderRadius: theme.borderRadius.md || 8,
    borderWidth: 1,
    borderColor: theme.colors.borderLight || '#E2E8F0',
    backgroundColor: theme.colors.bgSurface || '#FFFFFF',
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight || '#E2E8F0',
    alignItems: 'stretch', // Crucial for full height vertical lines
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight || '#E2E8F0',
    backgroundColor: theme.colors.bgSurface || '#FFFFFF',
    alignItems: 'stretch', // Crucial for full height vertical lines
  },

  // Active Row Style
  activeRow: {
    backgroundColor: '#EEF2FF',
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primaryIndigo || '#4F46E5',
  },

  // Base style for all columns to ensure seamless vertical lines
  colBase: {
    paddingVertical: verticalScale(10),
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderRightWidth: 1,
    borderRightColor: theme.colors.borderLight || '#E2E8F0',
  },

  // Column Flex Dimensions & Padding
  col1: {
    flex: 1.6,
    paddingLeft: scale(8),
    paddingRight: scale(4),
  },
  col2: {
    flex: 1.4,
    paddingHorizontal: scale(4),
  },
  col3: {
    flex: 0.8,
    paddingHorizontal: scale(2),
    alignItems: 'center',
  },
  col4: {
    flex: 1.4,
    paddingHorizontal: scale(4),
  },
  col5: {
    flex: 1.4,
    paddingLeft: scale(4),
    paddingRight: scale(8),
    borderRightWidth: 0, // Last column doesn't need a right border
  },

  milestoneNameWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  headerText: {
    fontSize: theme.typography.size.xs - 1,
    fontWeight: theme.typography.weight.bold || '700',
    color: '#334155',
    fontFamily: theme.typography.fontFamily,
    lineHeight: verticalScale(13),
  },
  cellText: {
    fontSize: theme.typography.size.xs - 1,
    color: theme.colors.textMuted || '#64748B',
    fontFamily: theme.typography.fontFamily,
    lineHeight: verticalScale(14),
  },
  milestoneTitle: {
    fontWeight: '600',
    color: '#1E293B',
  },
  centerText: {
    textAlign: 'center',
  },
  activeCellText: {
    color: theme.colors.primaryIndigo || '#4F46E5',
    fontWeight: '700',
  },

  // Bottom Info Box
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: theme.borderRadius.md || 8,
    padding: moderateScale(12),
    marginTop: verticalScale(16),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  infoIconContainer: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },
  infoText: {
    flex: 1,
    fontSize: theme.typography.size.xs - 1,
    color: '#334155',
    lineHeight: verticalScale(16),
    fontFamily: theme.typography.fontFamily,
  },
});