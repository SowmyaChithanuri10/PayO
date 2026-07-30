// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { moderateScale, verticalScale } from '../../../../utils/responsive';

// export default function Typography3() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.titleBlack}>Welcome!</Text>
      
//       <Text style={styles.titleRow}>
//         <Text style={styles.titlePurple}>Scan. </Text>
//         <Text style={styles.titleBlue}>Pay. Earn Payo.</Text>
//       </Text>
      
//       <Text style={styles.description}>
//         Join millions who trust PAYO for fast,{'\n'}
//         secure, and rewarding digital payments.
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(30),
//     marginTop: verticalScale(0),
//   },
//   titleBlack: {
//     fontSize: moderateScale(26),
//     fontWeight: '800',
//     color: '#000000',
//     textAlign: 'center',
//   },
//   titleRow: {
//     textAlign: 'center',
//     marginBottom: verticalScale(15),
//     marginTop: verticalScale(5),
//   },
//   titlePurple: {
//     fontSize: moderateScale(26),
//     fontWeight: '800',
//     color: '#8A2BE2', // Purple shade from design
//   },
//   titleBlue: {
//     fontSize: moderateScale(26),
//     fontWeight: '800',
//     color: '#2962FF', // Brand blue
//   },
//   description: {
//     fontSize: moderateScale(15),
//     color: '#555555',
//     textAlign: 'center',
//     lineHeight: moderateScale(18),
//   },
// });






import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { moderateScale, verticalScale } from '../../../../utils/responsive';

// 🚨 Added props here
export default function Typography3({ title, subtitlePurple, subtitleBlue, description }) {
  // 🚨 1. Setup Animation Values
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  // 🚨 2. Trigger the bounce animation on mount
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
    // 🚨 3. Changed View to Animated.View and applied animated styles
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