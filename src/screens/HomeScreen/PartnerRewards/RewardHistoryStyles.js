// RewardHistoryStyles.js
import { StyleSheet } from 'react-native';
import { theme } from '../../../MainTheme/theme'; 
import { scale, verticalScale, moderateScale } from '../../../utils/responsive'; 

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
    paddingHorizontal: scale(16),
  },
  tabButton: {
    flex: 1,
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primaryBlue,
  },
  tabText: {
    fontSize: theme.typography.size.base,
    color: theme.colors.grey,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.weight.medium,
  },
  activeTabText: {
    color: theme.colors.primaryBlue,
    fontWeight: theme.typography.weight.bold,
  },
  contentContainer: {
    flex: 1,
    padding: moderateScale(16),
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.borderRadius.lg,
    padding: moderateScale(16),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    ...theme.shadows.sm,
  },
  iconWrapper: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(14),
  },
  coinIcon: {
    backgroundColor: '#E2E8F0',
    borderWidth: 2,
    borderColor: '#F8FAFC',
  },
  coinText: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  scratchPink: {
    backgroundColor: '#FDF2F8',
    borderRadius: theme.borderRadius.md,
  },
  scratchPinkInner: {
    width: scale(36),
    height: scale(36),
    backgroundColor: '#DB2777', // Pink color matching UI
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scratchBlue: {
    backgroundColor: '#EFF6FF',
    borderRadius: theme.borderRadius.md,
  },
  scratchBlueInner: {
    width: scale(36),
    height: scale(36),
    backgroundColor: '#2563EB', // Blue color matching UI
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: theme.typography.size.base,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
    marginBottom: verticalScale(2),
  },
  rewardSubtitle: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.grey,
    marginBottom: verticalScale(2),
  },
  rewardDate: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.grey,
  },
  statusPill: {
    backgroundColor: '#DCFCE7', // Light green
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    color: '#166534', // Dark green text
    fontSize: theme.typography.size.xs,
    fontWeight: theme.typography.weight.bold,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconContainer: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: theme.colors.bgLightPurple,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(16),
  },
  emptyText: {
    fontSize: theme.typography.size.base,
    color: theme.colors.textMuted,
    fontWeight: theme.typography.weight.medium,
  }
});


