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
    bottom:-75,
    left: 0,
    width: width,
    height: width * 2.5, 
    resizeMode: 'contain', 
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(24),
    paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(20),
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(20),
  },
  
  backButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: theme.colors.statusSuccess || '#03B244',
    fontSize: theme.typography.size.xl || scale(22),
    fontWeight: theme.typography.weight.bold,
    marginTop: verticalScale(10),
    textAlign: 'center',
  },

  illustration: {
    width: scale(280),
    height: scale(200),
    resizeMode: 'contain',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(30),
  },

  subTitle: {
    color: theme.colors.textMain || '#05070D',
    fontSize: theme.typography.size.sm || scale(14),
    textAlign: 'center',
    lineHeight: scale(22),
    paddingHorizontal: scale(10),
    fontWeight: theme.typography.weight.medium,
  },

  buttonContainer: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: verticalScale(40), 
  },

  homeBtn: {
    width: '100%',
    backgroundColor: theme.colors.primaryBlue || '#285CE0',
    borderRadius: theme.borderRadius.md || 12,
    height: scale(52),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },

  homeBtnText: {
    color: '#ffffff',
    fontSize: theme.typography.size.base || scale(16),
    fontWeight: theme.typography.weight.semibold,
  },

  backBtn: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.primaryBlue || '#285CE0',
    borderRadius: theme.borderRadius.md || 12,
    height: scale(52),
    justifyContent: 'center',
    alignItems: 'center',
  },

  backBtnText: {
    color: theme.colors.textMain || '#05070D',
    fontSize: theme.typography.size.base || scale(16),
    fontWeight: theme.typography.weight.medium,
  },
});

export default styles;
