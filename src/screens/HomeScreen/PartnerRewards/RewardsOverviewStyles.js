import { StyleSheet } from 'react-native';
import { theme, globalStyles } from '../../../MainTheme/theme'; // Adjust path as needed
import { scale, verticalScale, moderateScale } from '../../../utils/responsive'; // Adjust path as needed

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(16),
  },
  backButton: {
    padding: scale(8),
    marginRight: scale(16),
  },
  headerTitle: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
    fontFamily: theme.typography.fontFamily,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(40),
  },
  levelCard: {
    borderRadius: theme.borderRadius.lg,
    padding: moderateScale(20),
    marginTop: verticalScale(10),
    ...theme.shadows.md,
  },
  levelCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  coinIconContainer: {
    width: scale(50),
    height: scale(50),
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  currentLevelLabel: {
    color: '#E0E7FF', // Lightened text for dark bg
    fontSize: theme.typography.size.sm,
    fontFamily: theme.typography.fontFamily,
    marginBottom: verticalScale(4),
  },
  currentLevelTitle: {
    color: theme.colors.white,
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.fontFamily,
  },
  progressContainer: {
    marginBottom: verticalScale(12),
  },
  progressBarBg: {
    height: verticalScale(8),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#60A5FA', // Lighter blue for contrast
    borderRadius: theme.borderRadius.full,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressAmountText: {
    color: theme.colors.white,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.fontFamily,
  },
  progressPercentText: {
    color: theme.colors.white,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.fontFamily,
  },
  nextMilestoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(24),
  },
  nextMilestoneLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.size.sm,
    fontFamily: theme.typography.fontFamily,
  },
  nextMilestoneAmount: {
    color: theme.colors.textMain,
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.fontFamily,
    marginTop: verticalScale(4),
  },
  pillButton: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.primaryPurple,
    backgroundColor: theme.colors.bgLightPurple,
  },
  pillButtonText: {
    color: theme.colors.primaryPurple,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.bold,
    fontFamily: theme.typography.fontFamily,
  },
  journeyHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  journeyTitle: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
    fontFamily: theme.typography.fontFamily,
  },
  viewAllText: {
    color: theme.colors.primaryBlue,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
    fontFamily: theme.typography.fontFamily,
  },
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(30),
    paddingHorizontal: scale(8),
  },
  stepWrapper: {
    alignItems: 'center',
    width: scale(50),
    zIndex: 1,
  },
  stepCircle: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.bgSurface,
    zIndex: 2,
  },
  stepCircleCompleted: {
    backgroundColor: theme.colors.statusSuccess,
  },
  stepCircleActiveOuter: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: theme.colors.bgLightPurple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActiveInner: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    backgroundColor: theme.colors.primaryIndigo,
  },
  stepCircleLocked: {
    backgroundColor: theme.colors.borderLight,
  },
  stepLine: {
    position: 'absolute',
    top: scale(14),
    left: '50%',
    right: '-50%',
    height: 3,
    backgroundColor: theme.colors.borderLight,
    zIndex: 0,
  },
  stepLineCompleted: {
    backgroundColor: theme.colors.statusSuccess,
  },
  stepTitle: {
    marginTop: verticalScale(8),
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily,
  },
  stepTitleActive: {
    color: theme.colors.primaryIndigo,
    fontWeight: theme.typography.weight.bold,
  },
  stepAmount: {
    fontSize: theme.typography.size.xs,
    color: theme.colors.textMuted,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily,
  },
  stepAmountActive: {
    color: theme.colors.primaryIndigo,
    fontWeight: theme.typography.weight.bold,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.borderRadius.lg,
    padding: moderateScale(16),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  menuIconWrapper: {
    width: scale(48),
    height: scale(48),
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(16),
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: theme.typography.size.base,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
    fontFamily: theme.typography.fontFamily,
    marginBottom: verticalScale(2),
  },
  menuSubtitle: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.grey,
    fontFamily: theme.typography.fontFamily,
  },
});