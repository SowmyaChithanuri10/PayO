import React, { useEffect, useRef, useState } from 'react'; 
import { View, StyleSheet, StatusBar, Image, Dimensions, Animated, ScrollView, BackHandler } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale } from '../../../utils/responsive'; 
import Logo from './components/Logo3';
import HeroIllustration from './components/HeroIllustration3';
import Typography from './components/Typography3';
import ActionButtons from './components/ActionButtons3';

const { width, height } = Dimensions.get('window');

export default function Onboarding3({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: true,
    });
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault();
        BackHandler.exitApp(); 
      }
    });

    const backAction = () => {
      BackHandler.exitApp();
      return true; 
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      unsubscribe();
      backHandler.remove();
    };
  }, [navigation]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const handleCreateAccount = () => {
    navigation.navigate('RegisterMobile'); 
  };

  const handleLogin = () => {
    navigation.navigate('Login'); 
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      <Image 
        source={require('../../../../assets/images/waves.png')} 
        style={styles.backgroundImage} 
      />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Logo />
        <HeroIllustration />
        
        <View style={{ minHeight: verticalScale(120), justifyContent: 'center' }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16} 
          >
            <View style={{ width: width }}>
              <Typography 
                title="Welcome!"
                subtitlePurple="Scan. "
                subtitleBlue="Pay. Earn Payo."
                description={"Join millions who trust PAYO for fast,\nsecure, and rewarding digital payments."}
              />
            </View>

            <View style={{ width: width }}>
              <Typography 
                title="Pay Instantly"
                subtitlePurple="Scan. "
                subtitleBlue="Send. Done."
                description={"Scan any QR code or send money instantly with\nsecure, lightning-fast wallet-to-wallet transfers."}
              />
            </View>
          </ScrollView>
        </View>

        <ActionButtons 
          onCreateAccount={handleCreateAccount} 
          onLogin={handleLogin} 
          activeIndex={activeIndex}
        />
      </Animated.View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height,
    resizeMode: 'cover',
    zIndex: 0,
  },
  content: {
    flex: 1,
    zIndex: 1, 
  },
});