import { StyleSheet, Dimensions, Platform } from 'react-native';
import { theme } from '../../MainTheme/theme';
import { scale, verticalScale } from '../../utils/responsive';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(30),
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(24),
    backgroundColor: theme.colors.bgApp,
  },

  header: {
    marginTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(20),
    marginBottom: verticalScale(30),
  },

  loaderWrapper: {
    alignItems: 'center',
  },

  loaderOuter: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    borderWidth: scale(8),
    borderColor: '#E5E7EB', 
    borderTopColor: theme.colors.primaryBlue, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  loaderInner: {
    width: scale(54),
    height: scale(54),
    borderRadius: scale(27),
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  kycStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(16),
  },

  kycStatusDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: '#F59E0B',
    marginRight: scale(6),
  },

  kycText: {
    color: '#F59E0B', 
    fontSize: theme.typography.size.sm || scale(14),
    fontWeight: theme.typography.weight.medium,
  },

  title: {
    color: theme.colors.textMain || '#05070D',
    fontSize: theme.typography.size.xl || scale(24),
    textAlign: 'center',
    fontWeight: theme.typography.weight.bold,
    marginTop: verticalScale(24),
  },

  subTitle: {
    color: theme.colors.textMuted || '#6B7280',
    textAlign: 'center',
    fontSize: theme.typography.size.sm || scale(14),
    lineHeight: scale(22),
    marginTop: verticalScale(12),
    paddingHorizontal: scale(10),
  },

  card: {
    backgroundColor: '#F0F4FF', 
    borderRadius: theme.borderRadius.xl || 24,
    padding: scale(24),
    marginTop: verticalScale(40),
    borderWidth: 1,
    borderColor: 'rgba(40, 92, 224, 0.1)',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(22),
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  listBullet: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: theme.colors.primaryBlue,
    marginRight: scale(10),
  },

  leftText: {
    color: theme.colors.textMain || '#05070D',
    fontSize: theme.typography.size.sm || scale(14),
    fontWeight: theme.typography.weight.medium,
  },

  completedText: {
    color: theme.colors.statusSuccess,
    fontSize: theme.typography.size.sm || scale(14),
    fontWeight: theme.typography.weight.semibold,
  },

  pendingText: {
    color: theme.colors.textMuted || '#6B7280',
    fontSize: theme.typography.size.sm || scale(14),
    fontWeight: theme.typography.weight.medium,
  },

  button: {
    backgroundColor: theme.colors.primaryBlue || '#285CE0', 
    height: scale(52),
    borderRadius: theme.borderRadius.md || 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(40),
    marginBottom: verticalScale(20),
  },

  buttonText: {
    color: '#ffffff',
    fontSize: theme.typography.size.base || scale(16),
    fontWeight: theme.typography.weight.semibold,
  },
});

export default styles;