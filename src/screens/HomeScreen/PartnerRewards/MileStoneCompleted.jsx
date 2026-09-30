import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Dimensions, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import Feather from 'react-native-vector-icons/Feather';

import { theme } from '../../../MainTheme/theme'; 
import { styles } from './MileStoneCompletedStyles'; 

const { width, height } = Dimensions.get('window');

// Custom Particle Component for 360-degree blast, fall, and fade out
const ConfettiParticle = ({ color, angle, distance, size }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Blast outwards instantly
      Animated.timing(anim, {
        toValue: 1,
        duration: 500, 
        useNativeDriver: true,
      }),
      // 2. Tiny pause to hold the blast shape
      Animated.delay(100),
      // 3. Fall to the bottom and fade out
      Animated.timing(anim, {
        toValue: 2,
        duration: 1500, // How long it takes to fall down
        useNativeDriver: true,
      })
    ]).start();
  }, [anim]);

  // Trigonometry to calculate outward X and Y trajectories based on the random angle
  const translateX = anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, Math.cos(angle) * distance, Math.cos(angle) * distance] // Stays at blasted X position
  });
  
  const translateY = anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, Math.sin(angle) * distance, Math.sin(angle) * distance + height] // Falls down by adding screen height
  });

  const scale = anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 1] // Start invisible, pop to full size, stay full size while falling
  });

  const rotate = anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', `${Math.random() * 360}deg`, `${Math.random() * 720}deg`] // Keeps spinning while falling
  });

  const opacity = anim.interpolate({
    inputRange: [0, 1, 1.8, 2],
    outputRange: [1, 1, 1, 0] // Stays visible until the very end of the fall, then fades out
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size * 2.5,
        backgroundColor: color,
        borderRadius: size / 2,
        transform: [{ translateX }, { translateY }, { scale }, { rotate }],
        opacity, // Now uses the animated opacity
      }}
    />
  );
};

const MileStoneCompleted = ({ navigation }) => {
  // Generate a static array of 50 confetti particles wrapping 360 degrees
  const particles = useMemo(() => {
    const colors = ['#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#3B82F6'];
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 2 * Math.PI, // Random angle between 0 and 360 degrees (in radians)
      distance: Math.random() * 120 + 130, // Pushes them completely outside the radius of the coin
      size: Math.random() * 6 + 6, // Random width between 6 and 12
    }));
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      
      <LinearGradient
        colors={['#0B1930', '#020617']} 
        style={styles.gradientBackground}
      >
        {/* Header Text - Elevated to front */}
        <Text style={[styles.title, { zIndex: 10, elevation: 10 }]}>Congratulations!</Text>
        
        <View style={[styles.subtitleContainer, { zIndex: 10, elevation: 10 }]}>
          <Text style={styles.subtitleText}>You have achieved</Text>
          <Text style={styles.partnerText}>Silver Partner</Text>
        </View>

        {/* Coin & Explosion Wrapper */}
        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 40, zIndex: 5 }}>
          
          {/* Confetti rendered behind everything - pushed to the absolute back */}
          <View style={{ position: 'absolute', zIndex: -1, elevation: -1, alignItems: 'center', justifyContent: 'center' }}>
            {particles.map((p) => (
              <ConfettiParticle key={p.id} {...p} />
            ))}
          </View>

          {/* Giant Silver Coin Placeholder - Elevated above confetti */}
          <View style={[styles.coinContainer, { marginBottom: 0, zIndex: 10, elevation: 10 }]}>
            <View style={styles.coinInnerRing}>
              <Text style={styles.coinText}>S</Text>
            </View>
          </View>
          
        </View>

        {/* White Reward Highlight Card - Elevated to front */}
        <View style={[styles.rewardCard, { zIndex: 10, elevation: 10 }]}>
          <View style={styles.iconWrapper}>
            <Feather name="gift" size={30} color={theme.colors.primaryIndigo} />
          </View>
          <View style={styles.rewardTextContainer}>
            <Text style={styles.rewardLabel}>Milestone Reward Unlocked</Text>
            <Text style={styles.rewardValue}>Silver Coin</Text>
          </View>
        </View>

        {/* Floating Footer Text - Elevated to front */}
        <Text style={[styles.footerText, { zIndex: 10, elevation: 10 }]}>
          Keep growing to unlock{'\n'}bigger rewards!
        </Text>

        {/* Bottom Button */}
        <View style={[styles.buttonContainer, { zIndex: 10, elevation: 10 }]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('RewardHistory')}
          >
            <LinearGradient
              colors={[theme.colors.primaryIndigo, theme.colors.primaryBlue]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientBtn}
            >
              <Text style={styles.gradientBtnText}>View My Rewards</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
      </LinearGradient>
    </View>
  );
};

export default MileStoneCompleted;

