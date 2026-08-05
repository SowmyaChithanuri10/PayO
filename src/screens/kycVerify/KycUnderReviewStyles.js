import { StyleSheet, Platform, Dimensions } from 'react-native';
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
  },
  
  container: {
    flex: 1,
    paddingHorizontal: scale(24),
    backgroundColor: theme.colors.bgApp,
    paddingBottom: verticalScale(30),
  },
  
  header: {
    marginBottom: verticalScale(30),
    marginTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(20),
  },
  
  loaderWrapper: {
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  
  loaderOuter: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    borderWidth: scale(10),
    borderColor: theme.colors.borderLight || '#F3F4F6', // Light grey track
    borderTopColor: '#C4C4C4', // Darker grey indicator
    transform: [{ rotate: '-45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  kycStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },

  kycStatusDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: theme.colors.statusSuccess,
    marginRight: scale(6),
  },

  kycText: {
    color: theme.colors.statusSuccess,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
  },
  
  title: {
    color: theme.colors.textMain,
    fontSize: theme.typography.size.xl || scale(24),
    textAlign: 'center',
    fontWeight: theme.typography.weight.bold,
    marginTop: verticalScale(20),
  },
  
  subTitle: {
    color: theme.colors.textMuted,
    textAlign: 'center',
    fontSize: theme.typography.size.sm,
    lineHeight: scale(22),
    marginTop: verticalScale(12),
    paddingHorizontal: scale(20),
  },
  
  card: {
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.borderRadius.xl || 24,
    padding: scale(24),
    marginTop: verticalScale(40),
    marginBottom: verticalScale(20),
    // Drop shadow matching the Figma design
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
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
    backgroundColor: theme.colors.primaryPurple,
    marginRight: scale(10),
  },
  
  leftText: {
    color: theme.colors.textMain,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
  },
  
  completedText: {
    color: theme.colors.statusSuccess,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
  },
  
  pendingText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
  },
});
  
export default styles;