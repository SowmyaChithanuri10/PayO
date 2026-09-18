import { StyleSheet } from 'react-native';
import { theme } from '../../../MainTheme/theme'; // <-- Adjust this path
import { scale, verticalScale, moderateScale } from '../../../utils/responsive'; // <-- Adjust this path

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#020617', 
  },
  gradientBackground: {
    flex: 1,
    paddingHorizontal: scale(20),
    alignItems: 'center',
    paddingTop: verticalScale(60), 
  },
  title: {
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: verticalScale(16),
    marginTop: verticalScale(20),
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  subtitleText: {
    fontSize: moderateScale(16),
    color: '#FFFFFF',
    marginBottom: verticalScale(4),
  },
  partnerText: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  
  // Coin Styling
  coinContainer: {
    width: scale(200),
    height: scale(200),
    borderRadius: scale(100),
    backgroundColor: '#E2E8F0', 
    borderWidth: 8,
    borderColor: '#F1F5F9', 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(40),
    shadowColor: '#60A5FA', 
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20, 
  },
  coinInnerRing: {
    width: scale(170),
    height: scale(170),
    borderRadius: scale(85),
    borderWidth: 1,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinText: {
    fontSize: moderateScale(90),
    fontWeight: 'bold',
    color: '#94A3B8',
    fontStyle: 'italic',
  },

  // Reward Card
  rewardCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.lg,
    padding: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  iconWrapper: {
    width: scale(56),
    height: scale(56),
    borderRadius: theme.borderRadius.md,
    backgroundColor: '#EEF2FF', 
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(16),
  },
  rewardTextContainer: {
    flex: 1,
  },
  rewardLabel: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.grey,
    marginBottom: verticalScale(2),
  },
  rewardValue: {
    fontSize: theme.typography.size.lg,
    fontWeight: 'bold',
    color: '#1E293B', 
  },

  // Bottom Area
  footerText: {
    fontSize: theme.typography.size.sm,
    color: '#E2E8F0', 
    textAlign: 'center',
    lineHeight: verticalScale(20),
    position: 'absolute',
    bottom: verticalScale(150),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: verticalScale(30),
    left: scale(20),
    right: scale(20),
  },
  gradientBtn: {
    borderRadius: theme.borderRadius.full,
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBtnText: {
    color: '#FFFFFF',
    fontSize: theme.typography.size.base,
    fontWeight: 'bold',
  },
});