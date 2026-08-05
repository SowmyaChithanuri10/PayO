

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';
import { theme } from '../../MainTheme/theme'; 

export default function SendTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.tab,
          activeTab === 'scan' && styles.activeTab,
        ]}
        onPress={() => setActiveTab('scan')}
      >
        <Text
          style={
            activeTab === 'scan'
              ? styles.activeText
              : styles.text
          }
        >
          Scan QR
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.tab,
          activeTab === 'address' && styles.activeTab,
        ]}
        onPress={() => setActiveTab('address')}
      >
        <Text
          style={
            activeTab === 'address'
              ? styles.activeText
              : styles.text
          }
        >
          Enter Address
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.tab,
          activeTab === 'recents' && styles.activeTab,
        ]}
        onPress={() => setActiveTab('recents')}
      >
        <Text
          style={
            activeTab === 'recents'
              ? styles.activeText
              : styles.text
          }
        >
          Recents
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primaryBlue, 
    borderRadius: theme.borderRadius.md || 12,
    padding: scale(4),
    marginHorizontal: scale(16),
    marginBottom: verticalScale(16),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(8),
    borderRadius: theme.borderRadius.sm || 8,
  },
  activeTab: {
    backgroundColor: theme.colors.bgSurface, 
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  text: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: theme.typography.size.sm || moderateScale(12),
    fontWeight: theme.typography.weight.medium || '500',
    textAlign: 'center',
  },
  activeText: {
    color: theme.colors.textMain, 
    fontSize: theme.typography.size.sm || moderateScale(12),
    fontWeight: theme.typography.weight.semibold || '600',
    textAlign: 'center',
  },
});