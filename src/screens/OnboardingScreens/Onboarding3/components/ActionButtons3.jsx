import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ActionButtons3({ onCreateAccount, onLogin, activeIndex }) {
  const insets = useSafeAreaInsets();
  
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: 200, 
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 7,
        tension: 90,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <Animated.View style={[
      styles.container, 
      { paddingBottom: insets.bottom + verticalScale(20) },
      { opacity, transform: [{ translateY }] }
    ]}>
      
      <View style={styles.topSection}>
        <View style={styles.progressContainer}>
          <View style={[styles.dot, activeIndex === 0 && styles.activeDot]} />
          <View style={[styles.dot, activeIndex === 1 && styles.activeDot]} />
        </View>

        <TouchableOpacity onPress={onCreateAccount} style={styles.primaryBtn} activeOpacity={0.8}>
          <View style={styles.btnContent}>
            <Text style={styles.primaryBtnText}>Create Account</Text>
            <View style={styles.iconCircle}>
               <Image 
                 source={require('../../../../../assets/images/register.png')} 
                 style={styles.arrowIcon} 
               />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onLogin} style={styles.secondaryBtn} activeOpacity={0.8}>
          <View style={styles.btnContent}>
            <Text style={styles.secondaryBtnText}>Login</Text>
            <Image 
              source={require('../../../../../assets/images/register.png')} 
              style={styles.arrowIconSecondary} 
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.securityBadge}>
        <View style={styles.shieldIconContainer}>
          <Image 
            source={require('../../../../../assets/images/shield-check.png')} 
            style={styles.shieldIcon} 
          />
        </View>
        <View>
          <Text style={styles.securityTitle}>Bank-grade security</Text>
          <Text style={styles.securitySubtitle}>Your data is 100% protected</Text>
        </View>
      </View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: moderateScale(30),
    marginTop: verticalScale(25),
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start', // 🚨 FIX: Changed from 'space-between' to pull the badge UP
  },
  topSection: {
    width: '100%',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(25),
  },
  dot: {
    height: moderateScale(4),
    width: moderateScale(12),
    borderRadius: moderateScale(2),
    backgroundColor: '#E0E0E0',
    marginHorizontal: moderateScale(3),
  },
  activeDot: {
    backgroundColor: '#2962FF',
    width: moderateScale(20), 
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: '#5655FF', 
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(18),
    paddingHorizontal: moderateScale(20),
    marginBottom: verticalScale(15),
    elevation: 2,
    shadowColor: '#5655FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(12),
    borderWidth: 1.5,
    borderColor: '#A8A7FF', 
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(20),
    marginBottom: verticalScale(30), // 🚨 FIX: Reduced from 30 to 20 for a tighter gap above the badge
  },
  btnContent: {
    width: '100%', 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  secondaryBtnText: {
    color: '#2962FF',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  iconCircle: {
    position: 'absolute',
    right: 0, 
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: 'contain',
  },
  arrowIconSecondary: {
    position: 'absolute',
    right: moderateScale(5), 
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(12),
    width: '70%',
    justifyContent: 'center',
    elevation: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  shieldIconContainer: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(8),
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  shieldIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: 'contain',
  },
  securityTitle: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#777',
  },
  securitySubtitle: {
    fontSize: moderateScale(11),
    color: '#999',
    marginTop: verticalScale(2),
  },
});