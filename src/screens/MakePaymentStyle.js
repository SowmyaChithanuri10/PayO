
import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/responsive'; 
import { theme } from '../MainTheme/theme'; 

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },
  container: {
    padding: moderateScale(16),
    paddingBottom: moderateScale(40),
  },
  // Amount Card
  amountCard: {
    backgroundColor: theme.colors.bgLightPurple,
    borderRadius: theme.borderRadius.lg,
    padding: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },
  amountLeft: {
    flex: 1,
  },
  amountRight: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(16),
  },
  verticalDivider: {
    width: 1,
    height: '80%',
    backgroundColor: theme.colors.borderLight,
  },
  textMuted: {
    fontSize: moderateScale(12),
    color: theme.colors.textMuted,
    marginBottom: verticalScale(4),
  },
  amountText: {
    fontSize: moderateScale(22),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },
  cryptoText: {
    fontSize: moderateScale(18),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.primaryPurple,
  },
  walletIcon: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'contain',
  },
  // QR Card
  qrCard: {
    backgroundColor: theme.colors.bgLightPurple,
    borderRadius: theme.borderRadius.lg,
    padding: moderateScale(16),
    marginBottom: verticalScale(20),
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },
  qrHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  qrHeaderText: {
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.textMain,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: theme.borderRadius.sm,
  },
  clockIcon: {
    width: scale(14),
    height: scale(14),
    marginRight: scale(4),
    tintColor: theme.colors.primaryPurple,
  },
  timerText: {
    fontSize: moderateScale(12),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.primaryPurple,
  },
  qrWrapper: {
    alignSelf: 'center',
    width: scale(220),
    height: scale(220),
    borderWidth: 1,
    borderColor: theme.colors.primaryPurple,
    borderRadius: theme.borderRadius.md,
    padding: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  qrImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  qrLogoCenter: {
    position: 'absolute',
    width: scale(40),
    height: scale(40),
    backgroundColor: theme.colors.bgSurface,
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  qrCenterIcon: {
    width: scale(40),
    height: scale(40),
    resizeMode: 'contain',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  dividerText: {
    marginHorizontal: moderateScale(10),
    fontSize: moderateScale(12),
    color: theme.colors.textMuted,
  },
  upiInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#9ca3af',
    borderRadius: theme.borderRadius.sm,
    padding: moderateScale(12),
    marginBottom: verticalScale(16),
  },
  upiIdText: {
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.textMain,
  },
  copyButton: {
    backgroundColor: theme.colors.bgLightPurple,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.primaryPurple,
  },
  copyButtonText: {
    color: theme.colors.primaryPurple,
    fontSize: moderateScale(12),
    fontWeight: theme.typography.weight.semibold,
  },
  secureBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5', // Kept specific hex as lightGreen is not in the new theme
    padding: moderateScale(12),
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  shieldIcon: {
    width: scale(24),
    height: scale(24),
    marginRight: moderateScale(12),
  },
  secureTextContainer: {
    flex: 1,
  },
  secureTitle: {
    fontSize: moderateScale(12),
    fontWeight: theme.typography.weight.bold,
    color: '#065f46',
  },
  secureSubtitle: {
    fontSize: moderateScale(10),
    color: '#047857',
  },
  upiLogoSmall: {
    right: scale(15),
    width: scale(45),
    height: scale(30),
    resizeMode: 'contain',
  },
  // Apps Section
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
    marginBottom: verticalScale(12),
  },
  appsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  appCard: {
    backgroundColor: theme.colors.bgLightPurple,
    width: '22%',
    aspectRatio: 1,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm,
  },
  appIcon: {
    width: scale(32),
    height: scale(32),
    marginBottom: verticalScale(6),
    resizeMode: 'contain',
  },
  appName: {
    fontSize: moderateScale(10),
    color: theme.colors.textMuted,
    fontWeight: theme.typography.weight.medium,
  },
  // Info Banner
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.bgLightPurple, 
    padding: moderateScale(16),
    borderRadius: theme.borderRadius.md,
    marginBottom: verticalScale(20),
    overflow: 'hidden',
  },
  infoIcon: {
    width: scale(20),
    height: scale(20),
    marginRight: moderateScale(12),
    tintColor: theme.colors.primaryPurple,
  },
  infoText: {
    flex: 1,
    fontSize: moderateScale(12),
    color: theme.colors.textMain,
    lineHeight: moderateScale(18),
  },
  shieldWatermark: {
    position: 'absolute',
    right: scale(15),
    width: scale(60),
    height: scale(60),
    opacity: 1,
    resizeMode: 'contain',
  },
  // Complete Button
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.bgLightPurple,
    borderWidth: 1,
    borderColor: theme.colors.primaryBlue,
    borderRadius: theme.borderRadius.md,
    paddingVertical: moderateScale(16),
    marginBottom: verticalScale(24),
  },
  checkIcon: {
    width: scale(25),
    height: scale(25),
    marginRight: moderateScale(15),
  },
  completeButtonTitle: {
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.primaryBlue,
  },
  completeButtonSubtitle: {
    right: scale(-10),
    fontSize: moderateScale(10),
    color: theme.colors.textMuted,
    marginTop: verticalScale(2),
  },
  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: moderateScale(12),
    color: theme.colors.textMuted,
    marginRight: moderateScale(8),
  },
  footerLogo: {
    width: scale(50),
    height: scale(30),
    marginHorizontal: moderateScale(6),
  },

   proceedButtonAction: {
    borderRadius: moderateScale(16), // Smooth rounded corners
    overflow: 'hidden',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4, // Shadow for Android
  },
  proceedGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(20),
    gap: moderateScale(12), // Even spacing between icons and text
  },
  proceedButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  secureNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  secureNoteText: {
    fontSize: moderateScale(11),
    color: '#9CA3AF',
    marginLeft: moderateScale(6),
  },
});

export default styles;