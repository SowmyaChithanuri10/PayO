import { StyleSheet } from 'react-native';
import { theme } from '../../../MainTheme/theme'; // <-- Adjust this path
import { scale, verticalScale, moderateScale } from '../../../utils/responsive'; // <-- Adjust this path

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(100), // Extra padding for the absolute bottom button
  },
  
  // Header Section
  topSection: {
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(24),
  },
  coinPlaceholder: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: '#E2E8F0',
    borderWidth: 4,
    borderColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
    marginBottom: verticalScale(12),
  },
  coinText: {
    fontSize: moderateScale(40),
    fontWeight: 'bold',
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  milestoneTitle: {
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
    marginBottom: verticalScale(4),
  },
  milestoneSubtitle: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
  },

  // Progress Bar Section
  progressContainer: {
    marginBottom: verticalScale(24),
  },
  progressBarBg: {
    height: verticalScale(12),
    backgroundColor: '#E2E8F0',
    borderRadius: theme.borderRadius.full,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: verticalScale(8),
  },
  progressBarFill: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
  progressLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressAmount: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },
  progressTotal: {
    color: theme.colors.textMuted,
    fontWeight: theme.typography.weight.medium,
  },
  progressPercent: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FDFBFF', // Very light purple/gray tint
    borderRadius: theme.borderRadius.lg,
    padding: moderateScale(14),
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
  statCardMargin: {
    marginRight: scale(12),
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  iconCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(8),
  },
  statLabel: {
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
    flex: 1,
  },
  statValue: {
    fontSize: moderateScale(22),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
    marginBottom: verticalScale(2),
  },
  statSubText: {
    fontSize: theme.typography.size.xs,
    color: theme.colors.grey,
  },

  // Reward Card
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5FF', // Light blue tint
    borderRadius: theme.borderRadius.lg,
    padding: moderateScale(16),
    marginBottom: verticalScale(24),
  },
  miniCoin: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(16),
  },
  miniCoinText: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  rewardTextCol: {
    flex: 1,
  },
  rewardLabel: {
    fontSize: theme.typography.size.xs,
    color: theme.colors.grey,
    marginBottom: verticalScale(2),
  },
  rewardTitle: {
    fontSize: theme.typography.size.base,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },

  // How to Earn
  howToEarnSection: {
    marginBottom: verticalScale(30),
  },
  howToEarnTitle: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
    marginBottom: verticalScale(16),
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: verticalScale(16),
    paddingRight: scale(20),
  },
  listNumberCircle: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: theme.colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
    marginTop: verticalScale(2),
  },
  listNumberText: {
    color: theme.colors.white,
    fontSize: theme.typography.size.xs,
    fontWeight: theme.typography.weight.bold,
  },
  listText: {
    flex: 1,
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
    lineHeight: verticalScale(20),
  },

  // Bottom Button
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    backgroundColor: theme.colors.bgApp,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  gradientBtn: {
    borderRadius: theme.borderRadius.full,
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBtnText: {
    color: theme.colors.white,
    fontSize: theme.typography.size.base,
    fontWeight: theme.typography.weight.bold,
  },
});