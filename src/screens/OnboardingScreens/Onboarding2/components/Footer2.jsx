import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated } from 'react-native';
import { moderateScale, verticalScale, windowWidth } from '../../../../utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Footer2({ onSkip, onNext }) {
  const insets = useSafeAreaInsets();
  
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: 200, // Final element to bounce in
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
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      
      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + verticalScale(45) }]}>
        
        {/* BOTTOM SKIP BUTTON */}
        <TouchableOpacity onPress={onSkip} style={styles.bottomSkipBtn}>
          <Text style={styles.bottomSkipText}>Skip</Text>
        </TouchableOpacity>

        {/* NEXT BUTTON */}
        <TouchableOpacity onPress={onNext} style={styles.nextBtn}>
           <View style={styles.nextIconContainer}>
             <Image 
               source={require('../../../../../assets/images/bluearrow.png')} 
               style={styles.nextIcon} 
             />
           </View>
        </TouchableOpacity>

      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    height: verticalScale(150),
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(35),
    paddingVertical: moderateScale(2),
    zIndex: 2,
  },
  bottomSkipBtn: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(25),
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: 'transparent',
  },
  bottomSkipText: {
    fontSize: moderateScale(15),
    color: '#333',
    fontWeight: '500',
  },
  nextBtn: {
    shadowColor: '#2962FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  nextIcon: {
    width: moderateScale(70), 
    height: moderateScale(70),
    resizeMode: 'contain',
  },
});