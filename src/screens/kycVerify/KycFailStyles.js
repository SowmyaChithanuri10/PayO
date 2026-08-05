import { StyleSheet, Platform, Dimensions } from 'react-native';
import { theme } from '../../MainTheme/theme';
import { scale, verticalScale } from '../../utils/responsive';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp || '#ffffff',
  },

  mainWrapper: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },

  wavesBg: {
    position: 'absolute',
    bottom: -75,
    left: 0,
    width: width,
    height: width * 2.5, 
    resizeMode: 'contain', 
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(24),
    paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(20),
    backgroundColor: 'transparent',
  },

  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: verticalScale(40),
  },

  warningIcon: {
    width: scale(80),
    height: scale(80),
    resizeMode: 'contain',
    marginBottom: verticalScale(24),
  },

  title: {
    color: '#FF1F1F',
    fontSize: theme.typography.size.lg || scale(20),
    textAlign: 'center',
    fontWeight: theme.typography.weight.semibold,
    lineHeight: scale(28),
    marginBottom: verticalScale(24),
    paddingHorizontal: scale(10),
  },

  subTitle: {
    color: theme.colors.textMain || '#05070D',
    fontSize: theme.typography.size.sm || scale(14),
    textAlign: 'center',
    marginBottom: verticalScale(4),
  },

  instructions: {
    color: theme.colors.textMain || '#05070D',
    fontSize: theme.typography.size.sm || scale(14),
    textAlign: 'center',
    lineHeight: scale(22),
  },

  buttonContainer: {
    width: '100%',
    marginBottom: verticalScale(40),
  },

  retryBtn: {
    width: '100%',
    backgroundColor: theme.colors.statusSuccess || '#009933',
    height: scale(52),
    borderRadius: theme.borderRadius.md || 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },

  retryBtnText: {
    color: '#ffffff',
    fontSize: theme.typography.size.base || scale(16),
    fontWeight: theme.typography.weight.semibold,
  },

  supportBtn: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: theme.colors.statusSuccess || '#009933',
    height: scale(52),
    borderRadius: theme.borderRadius.md || 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  supportBtnText: {
    color: theme.colors.statusSuccess || '#009933',
    fontSize: theme.typography.size.base || scale(16),
    fontWeight: theme.typography.weight.medium,
  },
});

export default styles;