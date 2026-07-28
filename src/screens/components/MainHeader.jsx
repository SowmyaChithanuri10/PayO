import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

// Import your custom theme and responsiveness utilities
import { theme } from '../../MainTheme/theme'; // Adjust path based on your folder structure
import { moderateScale } from '../../utils/responsive'; // Adjust path based on your folder structure

const MainHeader = ({ title, subtitle, onHelpPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FeatherIcon 
          name="chevron-left" 
          size={moderateScale(20)} 
          color={theme.colors.primaryBlue} 
        />
      </TouchableOpacity>
      
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={onHelpPress} style={styles.helpButton}>
        <FeatherIcon 
          name="help-circle" 
          size={moderateScale(22)} 
          color={theme.colors.primaryBlue} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Ensures the title container is centered
    paddingVertical: moderateScale(16),
    backgroundColor: theme.colors.bgSurface, 
  },
  backButton: {
    position: 'absolute',
    left: moderateScale(16), 
    padding: moderateScale(8),
    zIndex: 10,
    backgroundColor: theme.colors.bgSurface, 
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    ...theme.shadows.sm, // Adds the subtle shadow shown in your design
  },
  helpButton: {
    position: 'absolute',
    right: moderateScale(16), 
    padding: moderateScale(8),
    zIndex: 10,
  },
  headerTitleContainer: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(60), // Prevents text from overlapping the absolute buttons
  },
  headerTitle: {
    fontSize: moderateScale(theme.typography.size.base), 
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
    marginBottom: moderateScale(4),
  },
  headerSubtitle: {
    fontSize: moderateScale(theme.typography.size.xs),
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});

export default MainHeader;