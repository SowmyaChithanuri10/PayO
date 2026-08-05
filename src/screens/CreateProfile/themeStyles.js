import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { moderateScale, verticalScale } from 'react-native-size-matters';


export const COLORS = {
  primary: '#285CE0',
  secondary: '#5145E5',
  success: '#10B981',
  danger: '#EF4444',
  textMain: '#111827',
  textSecondary: '#414141',
  textMuted: '#9CA3AF',
  textDarkGrey: '#374151',
  textLightGrey: '#6B7280',
  bgContainer: '#ffffff',
  bgInput: '#F9FAFB',
  bgBadge: '#EEF2FF',
  borderDefault: '#D1D5DB',
  borderCircle: '#E5E7EB',
};

export const COMMON_STYLES = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bgContainer,
  },
  scrollContent: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('3%'),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(80),
    width: '100%',
    position: 'relative',
  },
  backButtonCircle: {
    position: 'absolute',
    left: moderateScale(25),
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderCircle,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logoImage: {
    width: moderateScale(120),
    height: moderateScale(40),
  },
  illustrationContainer: {
    width: wp('90%'),
    height: hp('24%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('1%'),
    alignSelf: 'center',
  },
  heroImage: {
    width: '82%',
    height: '100%',
  },
  stepBadgeContainer: {
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  stepBadge: {
    backgroundColor: COLORS.bgBadge,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.5%'),
    borderRadius: moderateScale(16),
  },
  stepBadgeText: {
    color: '#3B82F6',
    fontWeight: '700',
    fontSize: moderateScale(11),
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontWeight: '500',
    color: COLORS.textMain,
  },
  titleAccent: {
    color: COLORS.primary,
  },
  subTitle: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: moderateScale(12.5),
    marginTop: hp('1%'),
    marginBottom: hp('2.5%'),
    paddingHorizontal: wp('4%'),
    lineHeight: moderateScale(18),
  },
  errorCenter: {
    color: COLORS.danger,
    textAlign: 'center',
    marginBottom: hp('1%'),
    fontSize: moderateScale(12),
  },
  continueButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    height: hp('6.2%'),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
    position: 'relative',
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.textMuted,
    opacity: 0.6,
  },
  continueButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: moderateScale(15),
  },
  btnArrow: {
    position: 'absolute',
    right: wp('5%'),
  },
});