import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

// Import your custom theme and responsiveness utilities
import { theme } from '../../MainTheme/theme'; 
import { moderateScale } from '../../utils/responsive'; 

const MainSideHeader = ({ 
  title, 
  subtitle, 
  onHelpPress, 
  onNotificationPress, 
  notificationCount = 3 // Defaulted to 3 to match your reference image
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* --- LEFT SECTION: Back Button & Titles --- */}
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <FeatherIcon 
            name="chevron-left" 
            size={moderateScale(20)} 
            color={theme.colors.primaryBlue || '#2F54EB'} 
          />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle ? (
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
          ) : null}
        </View>
      </View>

      {/* --- RIGHT SECTION: Bell & Help Buttons --- */}
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
          <Image 
            source={require('../../../assets/images/Icon (4).png')}
            style={styles.bellIcon}
            resizeMode="contain"
          />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount > 99 ? '99+' : notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onHelpPress} style={[styles.iconButton, styles.helpButton]}>
          <FeatherIcon 
            name="help-circle" 
            size={moderateScale(22)} 
            color={theme.colors.primaryBlue || '#2F54EB'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    backgroundColor: theme.colors.bgSurface || '#FFFFFF', 
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, 
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.bgSurface || '#F6F6F6', 
    borderRadius: theme.borderRadius?.full || 50,
    ...theme.shadows?.sm, 
    // Fallback shadow in case theme.shadows.sm isn't perfectly matching the image
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  helpButton: {
    marginLeft: moderateScale(12), 
  },
  bellIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#FF3B30', 
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.bgSurface || '#FFFFFF',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: moderateScale(9),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerTitleContainer: {
    marginLeft: moderateScale(12),
    justifyContent: 'center',
    flexShrink: 1, // Prevents long text from pushing right section off screen
  },
  headerTitle: {
    fontSize: moderateScale(18), 
    fontWeight: 'bold',
    color: theme.colors.textMain || '#000000',
    marginBottom: moderateScale(2),
  },
  headerSubtitle: {
    fontSize: moderateScale(13),
    color: theme.colors.textMuted || '#5A5A5A',
  },
});

export default MainSideHeader;