

import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Theme = {
  light: {
    screenBackground: '#F4F7F6', 
    navBackground: '#EFF3F5',    
    activeTabBg: '#1D4ED8',      
    activeText: '#1D4ED8',       
    inactiveText: '#556070', 
    shadowColor: '#000000',
  },
  dark: {
    // screenBackground: '#0F172A', 
    // navBackground: '#1E293B',    
    // activeTabBg: '#3B82F6',      
    // activeText: '#3B82F6',
    // inactiveText: '#9CA3AF',     
    // shadowColor: '#000000',
       screenBackground: '#F4F7F6', 
    navBackground: '#EFF3F5',    
    activeTabBg: '#1D4ED8',      
    activeText: '#1D4ED8',       
    inactiveText: '#556070', 
    shadowColor: '#000000',
  },
};

export const getThemeColors = (isDarkMode) => (isDarkMode ? Theme.dark : Theme.light);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 8,
  },
  tabBarButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: moderateScale(18),
    width: moderateScale(66),
    height: moderateScale(50),
     zIndex: 100,
  },
  circleBackgroundPatch: {
    position: 'absolute',
    width: moderateScale(66),
    height: moderateScale(66),
    borderRadius: moderateScale(33),
    zIndex: -100,
  },
  btnCircle: {
    width: moderateScale(58),
    height: moderateScale(58),
    borderRadius: moderateScale(29),
    borderWidth: moderateScale(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  navLabel: {
    fontSize: moderateScale(11), 
    textAlign: 'center',
    marginTop: moderateScale(4),
  },
  navActiveBg: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(19),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  navInactiveIconContainer: {
    width: moderateScale(38),
    height: moderateScale(38),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});