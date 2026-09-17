import { StyleSheet } from 'react-native';
import { theme } from '../../../MainTheme/theme'; // <-- Adjust this path
import { scale, verticalScale, moderateScale } from '../../../utils/responsive'; // <-- Adjust this path

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },
  scrollContent: {
    padding: moderateScale(16),
    paddingBottom: verticalScale(40),
  },
  tableContainer: {
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    backgroundColor: theme.colors.bgSurface,
    overflow: 'hidden', // Keeps the border radius clean around the rows
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC', // Very light gray/blue background for the header
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
    paddingVertical: verticalScale(12),
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
    paddingVertical: verticalScale(12),
    backgroundColor: theme.colors.bgSurface,
  },
  activeRow: {
    backgroundColor: '#EEF2FF', // Light blue/indigo highlight matching the screenshot
  },
  
  // Specific Column flex ratios to match the visual layout in the screenshot
  col1: { flex: 1.5, paddingLeft: scale(10), justifyContent: 'center' }, // Milestone
  col2: { flex: 1.5, justifyContent: 'center', paddingHorizontal: scale(4) }, // Business Slab
  col3: { flex: 0.8, justifyContent: 'center', alignItems: 'center' }, // Rate
  col4: { flex: 1.5, justifyContent: 'center', paddingHorizontal: scale(4) }, // Completion Bonus
  col5: { flex: 1.5, paddingRight: scale(10), justifyContent: 'center' }, // Reward

  headerText: {
    fontSize: theme.typography.size.xs,
    fontWeight: theme.typography.weight.bold,
    color: '#334155', // Dark slate color
    fontFamily: theme.typography.fontFamily,
  },
  cellText: {
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
    fontFamily: theme.typography.fontFamily,
    lineHeight: verticalScale(16),
  },
  activeCellText: {
    color: theme.colors.primaryIndigo,
    fontWeight: theme.typography.weight.semibold,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: theme.borderRadius.md,
    padding: moderateScale(16),
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  infoIconContainer: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: theme.colors.primaryIndigo,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  infoText: {
    flex: 1,
    fontSize: theme.typography.size.sm,
    color: '#334155',
    lineHeight: verticalScale(20),
    fontFamily: theme.typography.fontFamily,
  },
});