import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';

export default function Typography2() {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 7,
        tension: 90,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <Text style={styles.titleBlack}>Instant QR</Text>
      <Text style={styles.titleBlue}>Payments</Text>
      
      <Text style={styles.description}>
        Scan a QR code to send tokens in{'\n'}
        seconds. Safe, secure, and lightning –{'\n'}
        fast wallet-to-wallet transfers.
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