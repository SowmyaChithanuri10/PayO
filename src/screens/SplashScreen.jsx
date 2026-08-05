import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  StatusBar,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({ navigation }) => {
  const [screenStep, setScreenStep] = useState(1);

  const dotFade = useRef(new Animated.Value(0)).current;
  const expandAnim = useRef(new Animated.Value(1)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;

  const blackOverlayScale = useRef(new Animated.Value(0)).current;

  const finalLogoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;

  const finalFadeOut = useRef(new Animated.Value(1)).current;

    const showWelcomeAnimation = () => {
  Animated.timing(blackOverlayScale, {
    toValue: 1,
    duration: 900,
    easing: Easing.out(Easing.exp),
    useNativeDriver: true,
  }).start(() => {
    setScreenStep(4);

    Animated.timing(finalLogoOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(welcomeOpacity, {
              toValue: 1,
              duration: 700,
              useNativeDriver: true,
            }).start(() => {
              setTimeout(() => {
                Animated.timing(loadingOpacity, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: true,
                }).start();

                // setTimeout(() => {
                //   Animated.timing(finalFadeOut, {
                //     toValue: 0,
                //     duration: 900,
                //     useNativeDriver: true,
                //   }).start(() => {
                //     navigation.reset({
                //       index: 0,
                //       routes: [{ name: 'Onboarding1' }],
                //     });
                //   });
                // }, 1400);
                setTimeout(() => {
  Animated.timing(finalFadeOut, {
    toValue: 0,
    duration: 900,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start(async () => {
    await checkUserFlow();
  });
}, 1400);
              }, 500);
            });
          }, 500);
        });
      }, 500);
    });
  });
};
  


const checkUserFlow = async () => {
  const hasCompletedOnboarding = await AsyncStorage.getItem(
    'hasCompletedOnboarding',
  );

  const value = await AsyncStorage.getItem('hasCompletedOnboarding');
console.log('Saved Value =', value);

  if (hasCompletedOnboarding === 'true') {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  } else {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Onboarding1' }],
    });
  }
};


useEffect(() => {
  const startSplash = async () => {
    const completed =
      (await AsyncStorage.getItem('hasCompletedOnboarding')) === 'true';

    Animated.timing(dotFade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setScreenStep(2);
      Animated.timing(expandAnim, {
        toValue: 80,
        duration: 1600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start(() => {
        // Returning user
        if (completed) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });

          return;
        }

        // First time user
        showWelcomeAnimation();
      });
    }, 1200);
  };

  startSplash();
}, []);

  if (screenStep === 1) {
    return (
      <SafeAreaView style={styles.whiteContainer}>
        <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />

        <Animated.View
          style={[
            styles.smallDot,
            {
              opacity: dotFade,
            },
          ]}
        />
      </SafeAreaView>
    );
  }

  if (screenStep === 2) {
    return (
      <SafeAreaView style={styles.whiteContainer}>
        <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />

        <Animated.View
          style={[
            styles.expandCircleWrapper,
            {
              transform: [{ scale: expandAnim }],
            },
          ]}>
          <LinearGradient
            colors={['#8427F7', '#0DB6E8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.expandCircle}
          />
        </Animated.View>
      </SafeAreaView>
    );
  }



  return (
    <SafeAreaView style={styles.safeAreaBlack}>
      <StatusBar backgroundColor="#02040D" barStyle="light-content" />

      <Animated.View
        style={[
          styles.blackContainer,
          {
            opacity: finalFadeOut,
          },
        ]}>
        <Animated.Image
          source={require('../../assets/images/icongroup.png')}
          resizeMode="contain"
          style={[
            styles.finalLogo,
            {
              opacity: finalLogoOpacity,
            },
          ]}
        />

        <Animated.Image
          source={require('../../assets/images/tag.png')}
          resizeMode="contain"
          style={[
            styles.tagLine,
            {
              opacity: taglineOpacity,
            },
          ]}
        />

        <Animated.Text
          style={[
            styles.welcomeText,
            {
              opacity: welcomeOpacity,
            },
          ]}>
          Welcome
        </Animated.Text>

        <Animated.View
          style={[
            styles.loaderContainer,
            {
              opacity: loadingOpacity,
            },
          ]}>
          <ActivityIndicator size="large" color="#8B5CF6" />
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  safeAreaGradient: {
    flex: 1,
    backgroundColor: '#8427F7',
  },

  safeAreaBlack: {
    flex: 1,
    backgroundColor: '#02040D',
  },

  whiteContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  blackContainer: {
    flex: 1,
    backgroundColor: '#02040D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  smallDot: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(100),
    backgroundColor: '#7B2CF4',
    shadowColor: '#00B7F1',
    shadowOpacity: 0.8,
    shadowRadius: moderateScale(10),
    elevation: 10,
  },

  expandCircleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  expandCircle: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(100),
  },

  logo: {
    width: wp('58%'),
    height: hp('14%'),
  },

  finalLogo: {
    width: wp('58%'),
    height: hp('14%'),
  },

  tagLine: {
    width: wp('55%'),
    height: hp('3%'),
    marginTop: hp('-2%'),
  },

  welcomeText: {
    position: 'absolute',
    bottom: hp('18%'),
    color: '#FFFFFF',
    fontSize: moderateScale(28),
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'lowercase',
  },

  loaderContainer: {
    position: 'absolute',
    bottom: hp('10%'),
  },

  blackTransition: {
    position: 'absolute',
    width: moderateScale(140),
    height: moderateScale(140),
    borderRadius: moderateScale(140),
    backgroundColor: '#02040D',
    bottom: hp('-7%'),
    left: wp('-15%'),
  },
});