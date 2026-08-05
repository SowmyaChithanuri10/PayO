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

  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(24),
    paddingHorizontal: scale(40),
  },
  progressSegment: {
    height: scale(4),
    flex: 1,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.borderLight || '#E5E7EB',
    marginHorizontal: scale(3),
  },
  progressActive: {
    backgroundColor: theme.colors.primaryBlue,
  },

  tabsRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(12),
  },
  tabButton: {
    flex: 1,
    height: scale(44),
    borderRadius: theme.borderRadius.sm,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: theme.colors.primaryBlue,
  },
  tabText: {
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.primaryBlue,
  },
  activeTabText: {
    color: '#ffffff',
  },
  tabMarginRight: {
    marginRight: scale(10),
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(30),
  },

  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.lg,
    padding: scale(20),
    borderWidth: 1,
    borderColor: theme.colors.borderLight || '#E5E7EB',
    alignItems: 'center',
    marginBottom: verticalScale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardIcon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
    marginBottom: verticalScale(12),
  },
  cardTitle: {
    fontSize: theme.typography.size.base,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.textMain,
    marginBottom: verticalScale(6),
  },
  cardSub: {
    fontSize: scale(11),
    color: theme.colors.textMuted,
  },
  fileName: {
    marginTop: verticalScale(10),
    fontSize: theme.typography.size.sm,
    color: theme.colors.statusSuccess,
    fontWeight: theme.typography.weight.medium,
  },

  instructions: {
    marginTop: verticalScale(20),
    width: '100%',
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(12),
  },
  bulletSuccess: {
    color: theme.colors.statusSuccess,
    fontSize: scale(14),
    fontWeight: 'bold',
    marginRight: scale(10),
    marginTop: Platform.OS === 'ios' ? scale(1) : scale(2),
  },
  bulletDanger: {
    color: theme.colors.statusDanger,
    fontSize: scale(14),
    fontWeight: 'bold',
    marginRight: scale(10),
    marginTop: Platform.OS === 'ios' ? scale(1) : scale(2),
  },
  instructionText: {
    flex: 1,
    color: theme.colors.textMain,
    fontSize: scale(12),
    lineHeight: scale(18),
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(5),
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderColor: theme.colors.borderLight || '#E5E7EB',
    borderRadius: 4,
    marginRight: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.statusSuccess,
    borderColor: theme.colors.statusSuccess,
  },
  checkboxText: {
    flex: 1,
    fontSize: scale(12),
    color: theme.colors.textMuted,
    lineHeight: scale(18),
  },
  bottomContainer: {
    paddingTop: verticalScale(10),
    paddingBottom: Platform.OS === 'ios' ? verticalScale(15) : verticalScale(16), 
    backgroundColor: theme.colors.bgApp,
  },
  submitBtn: {
    backgroundColor: theme.colors.primaryIndigo,
    borderRadius: theme.borderRadius.md,
    height: scale(52),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12), // Reduced margin to bring the secure badge closer
  },
  submitBtnDisabled: {
    backgroundColor: '#A5B4FC',
    opacity: 0.7,
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
    backgroundColor: '#F8FAFC', // Lighter background 
    alignSelf: 'center',
    paddingVertical: scale(6),
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