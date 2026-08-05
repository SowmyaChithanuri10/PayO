import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { verticalScale, windowWidth } from '../../../../utils/responsive';

export default function HeroIllustration2() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05, // Zoom in by 5%
          duration: 1500, // 2.5 seconds
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Zoom back to original size
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../../../../assets/images/ob2.png')}
        style={[
          styles.mainIllustration,
          { transform: [{ scale: scaleAnim }] } // Apply animation here
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: verticalScale(260),
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(20),
  },
  mainIllustration: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    zIndex: 1,
  },
});