



// import React, { useEffect, useRef, useState } from 'react'; // 🚨 Added useState
// import { View, StyleSheet, StatusBar, Image, Dimensions, Animated, ScrollView } from 'react-native'; // 🚨 Added ScrollView
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { verticalScale } from '../../../utils/responsive'; // 🚨 Import verticalScale

// // Import Components
// import Logo from './components/Logo3';
// import HeroIllustration from './components/HeroIllustration3';
// import Typography from './components/Typography3';
// import ActionButtons from './components/ActionButtons3';

// const { width, height } = Dimensions.get('window');

// export default function Onboarding3({ navigation }) {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
  
//   // 🚨 State to track current slide
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);
  
//   // 🚨 Detects swipe position and updates the dot index
//   const handleScroll = (event) => {
//     const scrollPosition = event.nativeEvent.contentOffset.x;
//     const index = Math.round(scrollPosition / width);
//     setActiveIndex(index);
//   };

//   const handleCreateAccount = () => {
//     navigation.navigate('RegisterMobile'); 
//   };

//   const handleLogin = () => {
//     navigation.navigate('Login'); 
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
//       <Image 
//         source={require('../../../../assets/images/waves.png')} 
//         style={styles.backgroundImage} 
//       />
      
//       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
//         <Logo />
//         <HeroIllustration />
        
//         {/* 🚨 ScrollView Wrapper for the Typography */}
//         <View style={{ height: verticalScale(130) }}>
//           <ScrollView
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onScroll={handleScroll}
//             scrollEventThrottle={16} 
//           >
//             {/* Slide 1 */}
//             <View style={{ width: width }}>
//               <Typography 
//                 title="Welcome!"
//                 subtitlePurple="Scan. "
//                 subtitleBlue="Pay. Earn Payo."
//                 description={"Join millions who trust PAYO for fast,\nsecure, and rewarding digital payments."}
//               />
//             </View>

//             {/* Slide 2 */}
//             <View style={{ width: width }}>
//               <Typography 
//                 title="Pay Instantly"
//                 subtitlePurple="Scan. "
//                 subtitleBlue="Send. Done."
//                 description={"Scan any QR code or send money instantly with\nsecure, lightning-fast wallet-to-wallet transfers."}
//               />
//             </View>
//           </ScrollView>
//         </View>

//         {/* 🚨 Pass the state to the ActionButtons component */}
//         <ActionButtons 
//           onCreateAccount={handleCreateAccount} 
//           onLogin={handleLogin} 
//           activeIndex={activeIndex}
//         />
//       </Animated.View>
      
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   backgroundImage: {
//     position: 'absolute',
//     bottom: 0,
//     width: width,
//     height: height,
//     resizeMode: 'cover',
//     zIndex: 0,
//   },
//   content: {
//     flex: 1,
//     zIndex: 1, 
//   },
// });


import React, { useEffect, useRef, useState } from 'react'; 
import { View, StyleSheet, StatusBar, Image, Dimensions, Animated, ScrollView, BackHandler } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale } from '../../../utils/responsive'; 

// Import Components
import Logo from './components/Logo3';
import HeroIllustration from './components/HeroIllustration3';
import Typography from './components/Typography3';
import ActionButtons from './components/ActionButtons3';

const { width, height } = Dimensions.get('window');

export default function Onboarding3({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  const [activeIndex, setActiveIndex] = useState(0);

  // 🚨 EXIT APP ON BACK NAVIGATION
  useEffect(() => {
    // 1. Enable gesture so the user can trigger the back gesture, which we will intercept
    navigation.setOptions({
      gestureEnabled: true,
    });

    // 2. Intercept the standard React Navigation back actions (like gestures or header back button)
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault(); // Stops the screen from going back
        BackHandler.exitApp(); // Closes the app instead
      }
    });

    // 3. Explicitly handle the Android hardware back button
    const backAction = () => {
      BackHandler.exitApp();
      return true; // Prevents default behavior
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
        
        <View style={{ height: verticalScale(130) }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16} 
          >
            {/* Slide 1 */}
            <View style={{ width: width }}>
              <Typography 
                title="Welcome!"
                subtitlePurple="Scan. "
                subtitleBlue="Pay. Earn Payo."
                description={"Join millions who trust PAYO for fast,\nsecure, and rewarding digital payments."}
              />
            </View>

            {/* Slide 2 */}
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

// import React, { useEffect, useRef, useState } from 'react'; 
// import { View, StyleSheet, StatusBar, Image, Dimensions, Animated, ScrollView } from 'react-native'; 
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { verticalScale } from '../../../utils/responsive'; 

// // Import Components
// import Logo from './components/Logo3';
// import HeroIllustration from './components/HeroIllustration3';
// import Typography from './components/Typography3';
// import ActionButtons from './components/ActionButtons3';

// const { width, height } = Dimensions.get('window');

// export default function Onboarding3({ navigation }) {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
  
//   const [activeIndex, setActiveIndex] = useState(0);

//   // 🚨 PREVENT GOING BACK TO OB2
//   useEffect(() => {
//     // 1. Disable the iOS swipe-to-go-back gesture
//     navigation.setOptions({
//       gestureEnabled: false,
//     });

//     // 2. Block the Android hardware back button and standard back actions
//     const unsubscribe = navigation.addListener('beforeRemove', (e) => {
//       if (e.data.action.type === 'GO_BACK') {
//         e.preventDefault(); // Stops the screen from going back
//       }
//     });

//     return unsubscribe;
//   }, [navigation]);

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);
  
//   const handleScroll = (event) => {
//     const scrollPosition = event.nativeEvent.contentOffset.x;
//     const index = Math.round(scrollPosition / width);
//     setActiveIndex(index);
//   };

//   const handleCreateAccount = () => {
//     navigation.navigate('RegisterMobile'); 
//   };

//   const handleLogin = () => {
//     navigation.navigate('Login'); 
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
//       <Image 
//         source={require('../../../../assets/images/waves.png')} 
//         style={styles.backgroundImage} 
//       />
      
//       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
//         <Logo />
//         <HeroIllustration />
        
//         <View style={{ height: verticalScale(130) }}>
//           <ScrollView
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onScroll={handleScroll}
//             scrollEventThrottle={16} 
//           >
//             {/* Slide 1 */}
//             <View style={{ width: width }}>
//               <Typography 
//                 title="Welcome!"
//                 subtitlePurple="Scan. "
//                 subtitleBlue="Pay. Earn Payo."
//                 description={"Join millions who trust PAYO for fast,\nsecure, and rewarding digital payments."}
//               />
//             </View>

//             {/* Slide 2 */}
//             <View style={{ width: width }}>
//               <Typography 
//                 title="Pay Instantly"
//                 subtitlePurple="Scan. "
//                 subtitleBlue="Send. Done."
//                 description={"Scan any QR code or send money instantly with\nsecure, lightning-fast wallet-to-wallet transfers."}
//               />
//             </View>
//           </ScrollView>
//         </View>

//         <ActionButtons 
//           onCreateAccount={handleCreateAccount} 
//           onLogin={handleLogin} 
//           activeIndex={activeIndex}
//         />
//       </Animated.View>
      
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   backgroundImage: {
//     position: 'absolute',
//     bottom: 0,
//     width: width,
//     height: height,
//     resizeMode: 'cover',
//     zIndex: 0,
//   },
//   content: {
//     flex: 1,
//     zIndex: 1, 
//   },
// });