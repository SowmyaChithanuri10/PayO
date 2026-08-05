import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';

export default function Typography3({ title, subtitlePurple, subtitleBlue, description }) {
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
      <Text style={styles.titleBlack}>{title}</Text>
      
      <Text style={styles.titleRow}>
        <Text style={styles.titlePurple}>{subtitlePurple}</Text>
        <Text style={styles.titleBlue}>{subtitleBlue}</Text>
      </Text>
      
      <Text style={styles.description}>
        {description}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(30),
    marginTop: verticalScale(-5),
  },
  titleBlack: {
    fontSize: moderateScale(36),
    fontWeight: '800',
    color: '#000000',
    textAlign: 'center',
  },
  titleRow: {
    textAlign: 'center',
    marginBottom: verticalScale(15),
    marginTop: verticalScale(5),
  },
  titlePurple: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#8A2BE2', // Purple shade from design
  },
  titleBlue: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#2962FF', // Brand blue
  },
  description: {
    fontSize: moderateScale(15),
    color: '#555555',
    textAlign: 'center',
    lineHeight: moderateScale(15) * 1.4,
  },
});