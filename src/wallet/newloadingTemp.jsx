import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../screens/HomeScreen/loadingScreenStyling.js';

export default function PaymentLoadingTemp({
  route,
  navigation,
}) {
  const {
    amount,
    name,
    toAddress,
    pin,
    transactionId,
    wallet_id
  } = route?.params || {};

  console.log(transactionId,"transactionId")

  const dot1 = useRef(
    new Animated.Value(0),
  ).current;

  const dot2 = useRef(
    new Animated.Value(0),
  ).current;

  useEffect(() => {
    startAnimation();

    // ✅ Changed timer to 3000ms (3 seconds)
    const timer = setTimeout(() => {
      processPayment();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(dot1, {
            toValue: -8,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 8,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(dot1, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  };

  const processPayment = async () => {
    // ✅ Replaces loading screen with the success screen after 3 seconds
    // navigation.replace('successloadingtemp', {
    //   amount,
    //   name,
    //   toAddress,
    // });

    navigation.replace('successloadingtemp', { transactionId: transactionId ,amount:amount ,wallet_id: wallet_id}
);
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}>
      <LinearGradient
        colors={[
          '#6A11CB',
          '#2575FC',
          '#12D8FA',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        {/* DOT LOADER */}
        <View style={styles.loaderRow}>
          <Animated.View
            style={[
              styles.dot,
              {
                transform: [
                  {
                    translateX: dot1,
                  },
                ],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.dot,
              {
                transform: [
                  {
                    translateX: dot2,
                  },
                ],
              },
            ]}
          />
        </View>

        <Text
          style={styles.title}
          numberOfLines={2}>
          Proceeding payment of{' '}
          {amount} PAYO
        </Text>

        <Text
          style={styles.subtitle}
          numberOfLines={2}>
          {new Date().toLocaleString()}
        </Text>
      </LinearGradient>
    </SafeAreaView>
  );
}