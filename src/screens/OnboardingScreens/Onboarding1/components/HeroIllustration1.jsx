
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { moderateScale, verticalScale, windowWidth } from '../../../../utils/responsive';

export default function HeroIllustration1() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1500, 
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, 
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../../../../assets/images/ob1.png')}
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
    width: '85%',
    height: '85%',
    resizeMode: 'contain',
    zIndex: 1,
  },
});