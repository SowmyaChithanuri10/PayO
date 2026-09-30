import { StyleSheet } from 'react-native';
import { theme } from '../../../MainTheme/theme'; // <-- Adjust this path
import { scale, verticalScale, moderateScale } from '../../../utils/responsive'; // <-- Adjust this path

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(30), // Padding for the bottom info card
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: verticalScale(32),
  },
  coinContainer: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    backgroundColor: '#E2E8F0', // Silver base
    borderWidth: 3,
    borderColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
    ...theme.shadows.sm,
  },
  coinText: {
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  rewardTitle: {
    fontSize: moderateScale(18),
    fontWeight: theme.typography.weight.bold,
    color: '#1E293B', // Dark slate color from UI
    marginBottom: verticalScale(4),
  },
  rewardSubtitle: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.grey,
    fontWeight: theme.typography.weight.medium,
  },
  detailsContainer: {
    marginBottom: verticalScale(20),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  detailLabel: {
    fontSize: theme.typography.size.sm,
    color: '#475569',
    fontWeight: theme.typography.weight.medium,
  },
  detailValue: {
    fontSize: theme.typography.size.sm,
    color: '#1E293B',
    fontWeight: theme.typography.weight.bold,
  },
  statusPill: {
    backgroundColor: '#DCFCE7', // Light green
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    color: '#166534', // Dark green text
    fontSize: theme.typography.size.xs,
    fontWeight: theme.typography.weight.bold,
  },
  spacer: {
    flex: 1, // Pushes the info card to the bottom
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F0F5FF', // Light blue tint
    borderRadius: theme.borderRadius.md,
    padding: moderateScale(16),
    alignItems: 'center',
  },
  infoIconWrapper: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  infoIconInner: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    borderWidth: 1.5,
    borderColor: theme.colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: theme.typography.size.sm,
    color: '#334155',
    lineHeight: verticalScale(20),
  }
});