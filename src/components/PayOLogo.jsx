import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default function PayoLogo() {

  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>

      <View style={styles.centerContent}>
        <View style={styles.circle}>
          <Text style={styles.text}>PAYO</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.dot} />
      </View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerContent: {
    alignItems: 'center',
  },

  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#5A00D1',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 2,
  },

  line: {
    width: 2,
    height: height / 2,
    backgroundColor: 'white',
    marginTop: 8,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginTop: 6,
  },
});