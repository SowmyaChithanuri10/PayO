import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';

export default function Header2({ onSkip }) {
  return (
    <View style={styles.container}>
      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        {/* Step 1 dot (now inactive/standard size) */}
        <View style={styles.dot} />
        {/* Step 2 dot (now active/wide) */}
        <View style={[styles.dot, styles.activeDot]} />
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
    backgroundColor: '#3B5998', // In the new design, both seem to be blue
    marginRight: moderateScale(6),
    opacity: 0.5, // Make the inactive one slightly faded
  },
  activeDot: {
    width: moderateScale(20),
    opacity: 1, // Full opacity for the active step
    backgroundColor: '#2962FF', // Matches PAYO brand blue
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