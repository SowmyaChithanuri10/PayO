import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';

export default function Header1({ onSkip }) {
  return (
    <View style={styles.container}>
      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>

      {/* Top Right Skip Button */}
      <TouchableOpacity onPress={onSkip} style={styles.skipButton} activeOpacity={0.8}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(10),
    zIndex: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: moderateScale(4),
    width: moderateScale(12),
    borderRadius: moderateScale(2),
    backgroundColor: '#E0E0E0',
    marginRight: moderateScale(6),
  },
  activeDot: {
    width: moderateScale(20),
    backgroundColor: '#2962FF', // 🚨 Updated to match your brand blue
  },
  skipButton: {
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(14),
    backgroundColor: '#F5F5F5',
    borderRadius: moderateScale(20),
  },
  skipText: {
    fontSize: moderateScale(14),
    color: '#666',
    fontWeight: '500',
  },
});