import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../MainTheme/theme';
import { scale, verticalScale } from '../../utils/responsive';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(30),
  },
  
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  backButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.bgSurface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  titleWrapper: {
    flex: 1,
    paddingHorizontal: scale(15),
    alignItems: 'center',
  },
  heading: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  subText: {
    fontSize: theme.typography.size.sm,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: scale(18),
  },
  helpIcon: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(30),
  },

  sectionTitle: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.textMain,
    marginBottom: verticalScale(8),
    marginTop: verticalScale(16),
  },

  reviewCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.lg,
    padding: scale(20),
    borderWidth: 1,
    borderColor: theme.colors.borderLight || '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    marginBottom: verticalScale(8),
  },
  fileName: {
    fontSize: theme.typography.size.base,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.textMain,
    marginBottom: verticalScale(4),
  },
  clickToReplace: {
    fontSize: scale(12),
    color: theme.colors.textMuted,
  },

  bottomContainer: {
    paddingTop: verticalScale(10),
    paddingBottom: Platform.OS === 'ios' ? verticalScale(15) : verticalScale(12), 
    backgroundColor: theme.colors.bgApp,
  },
  submitBtn: {
    backgroundColor: theme.colors.primaryIndigo,
    borderRadius: theme.borderRadius.md,
    height: scale(52),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: theme.typography.size.base,
    fontWeight: theme.typography.weight.semibold,
    marginRight: scale(8),
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    alignSelf: 'center',
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    borderRadius: theme.borderRadius.full,
  },
  secureIcon: {
    width: scale(16),
    height: scale(16),
    resizeMode: 'contain',
    marginRight: scale(6),
  },
  secureText: {
    fontSize: scale(12),
    color: theme.colors.textMuted,
    fontWeight: theme.typography.weight.medium,
  },
});

export default styles;