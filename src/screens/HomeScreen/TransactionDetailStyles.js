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
    backgroundColor: theme.colors.bgApp,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.bgApp,
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(16),
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(40),
    paddingTop: verticalScale(16),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },

  backBtn: {
    paddingRight: scale(8),
  },

  headerCenter: {
    flex: 1,
    paddingHorizontal: scale(8),
  },

  headerTitle: {
    color: theme.colors.textMain,
    fontSize: moderateScale(theme.typography.size.lg), // 18
    fontWeight: theme.typography.weight.semibold,
  },

  headerSubtitle: {
    color: theme.colors.grey,
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
  },

  helpBtn: {
    paddingLeft: scale(8),
  },
  captureContainer: {
    backgroundColor: 'transparent',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },

  bannerCard: {
    backgroundColor: theme.colors.bgLightPurple,
    borderRadius: theme.borderRadius.lg,
    padding: scale(18),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: theme.colors.borderPurple,
  },

  bannerLeft: {
    marginRight: scale(14),
  },

  statusCircle: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },

  bannerRight: {
    flex: 1,
  },

  bannerStatusText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.semibold,
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: verticalScale(2),
  },

  bannerAmountText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(22),
    fontWeight: theme.typography.weight.bold,
  },

  bannerCurrencyText: {
    color: theme.colors.primaryPurple,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.bold,
  },

  bannerSubText: {
    color: theme.colors.grey,
    fontSize: moderateScale(12),
  },
  detailsCard: {
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.borderRadius.lg,
    padding: scale(16),
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },

  detailLabel: {
    color: theme.colors.grey,
    fontSize: moderateScale(theme.typography.size.sm), // 14
    fontWeight: theme.typography.weight.medium,
  },

  detailValueBold: {
    color: theme.colors.textMain,
    fontSize: moderateScale(theme.typography.size.sm), // 14
    fontWeight: theme.typography.weight.semibold,
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: scale(8),
  },

  statusValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailStatusText: {
    fontSize: moderateScale(theme.typography.size.sm), // 14
    fontWeight: theme.typography.weight.semibold,
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(28),
    paddingTop: verticalScale(20),
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },

  actionItem: {
    alignItems: 'center',
    flex: 1,
  },

  actionSquare: {
    width: scale(48),
    height: scale(48),
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    ...theme.shadows.sm,
  },

  actionText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(11),
    textAlign: 'center',
    fontWeight: theme.typography.weight.medium,
  },
});