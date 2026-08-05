import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';

export default function Typography1() {
  const bounceAnim = useRef(new Animated.Value(25)).current; 
  const opacityAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 0,
        speed: 12,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [bounceAnim, opacityAnim]);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity: opacityAnim, transform: [{ translateY: bounceAnim }] }
      ]}
    >
      <Text style={styles.titleBlack}>Your Digital Wallet,</Text>
      <Text style={styles.titleBlue}>Simplified</Text>
      
      <Text style={styles.description}>
        Store, send & receive Payo tokens {'\n'}
        instantly. No bank account needed – {'\n'}
        just your phone.
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(30),
    marginTop: verticalScale(0),
  },
  titleBlack: {
    fontSize: moderateScale(26),
    fontWeight: '800',
    color: '#000000',
    textAlign: 'center',
  },
  titleBlue: {
    fontSize: moderateScale(26),
    fontWeight: '800',
    color: '#2962FF', 
    textAlign: 'center',
    marginBottom: verticalScale(15),
  },
  description: {
    fontSize: moderateScale(15),
    color: '#555555',
    textAlign: 'center',
    lineHeight: moderateScale(18),
  },
});