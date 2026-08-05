import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';

export default function FeatureGrid1() {
  // 1. Setup animation values
  const bounceAnim = useRef(new Animated.Value(30)).current; // Starts 30 pixels down
  const opacityAnim = useRef(new Animated.Value(0)).current; // Starts invisible

  // 2. Run the animation once on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 0, // Bounces up to its normal position
        speed: 12,
        bounciness: 8, // Minimal, subtle bounce
        useNativeDriver: true,
      }),
    ]).start();
  }, [bounceAnim, opacityAnim]);

  const features = [
    { id: 1, icon: require('../../../../../assets/images/flash.png'), label: 'Instant\nTransfers'},
    { id: 2, icon: require('../../../../../assets/images/shield.png'), label: 'Secure &\nTrusted' },
    { id: 3, icon: require('../../../../../assets/images/wallet.png'), label: 'Easy Wallet\nAccess'},
  ];

  return (
    // 3. Change View to Animated.View
    <Animated.View 
      style={[
        styles.container, 
        { opacity: opacityAnim, transform: [{ translateY: bounceAnim }] }
      ]}
    >
      {features.map((item) => (
        <View key={item.id} style={styles.featureItem}>
          <View style={styles.iconContainer}>
            <Image source={item.icon} style={styles.icon} />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(30),
    marginTop: verticalScale(30),
    width: '100%',
  },
  featureItem: {
    alignItems: 'center',
    width: moderateScale(90),
  },
  iconContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    backgroundColor: '#F5F5FF',
    borderRadius: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  icon: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
  },
  label: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    lineHeight: moderateScale(16),
  },
});