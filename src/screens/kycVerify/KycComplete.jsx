// import React from 'react';

// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
// } from 'react-native';

// import Icon from 'react-native-vector-icons/Feather';

// import styles from '../kycVerify/KycCompleteStyles';

// export default function KycComplete({
//   navigation,
// }) {
//   return (
//     <SafeAreaView
//       style={styles.safeArea}>
//       <StatusBar
//         backgroundColor="#120022"
//         barStyle="light-content"
//       />

//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() =>
//               navigation.goBack()
//             }>
//             <Icon
//               name="chevron-left"
//               size={28}
//               color="#fff"
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Success Icon */}
//         <View style={styles.iconWrapper}>
//           <View style={styles.successCircle}>
//             <Icon
//               name="check"
//               size={70}
//               color="#444"
//             />
//           </View>
//         </View>

//         {/* Title */}
//         <Text style={styles.title}>
//           KYC Completed
//         </Text>

//         {/* Subtitle */}
//         <Text style={styles.subTitle}>
//           Thanks for submitting
//           your document we'll
//           verify it and complete
//           your KYC as soon as
//           possible
//         </Text>

//         {/* Buttons */}
//         <TouchableOpacity
//           style={styles.homeBtn}
//           onPress={() =>
//             navigation.navigate(
//               'Main',
//             )
//           }>
//           <Text
//             style={
//               styles.homeBtnText
//             }>
//             Go Home
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() =>
//             navigation.navigate(
//               'KYCVerification',
//             )
//           }>
//           <Text
//             style={
//               styles.backBtnText
//             }>
//             Back to Start
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }


import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import styles from './KycCompleteStyles'; 

export default function KycComplete({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F9FFFB" barStyle="dark-content" />

      {/* Added the mainWrapper here */}
      <View style={styles.mainWrapper}>
        
        {/* Waves Image - Placed at the top of the wrapper so it renders behind */}
        <Image 
          source={require('../../../assets/images/waves.png')} 
          style={styles.wavesBg} 
        />

        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-left" size={28} color="#05070D" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text style={styles.title}>
            KYC Submitted Successfully!
          </Text>

          {/* Illustration */}
          <Image 
            source={require('../../../assets/images/kycscreens/Bank added 1.png')} 
            style={styles.illustration} 
          />

          {/* Subtitle */}
          <Text style={styles.subTitle}>
            Thank you for submitting your{"\n"}document we'll verify it and complete{"\n"}your KYC as soon as possible
          </Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.homeBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Main')}
            >
              <Text style={styles.homeBtnText}>
                Go Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('KYCVerification')}
            >
              <Text style={styles.backBtnText}>
                Back to Start
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}



// import React from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   Image,
// } from 'react-native';

// import Icon from 'react-native-vector-icons/Feather';
// import styles from './KycCompleteStyles'; 

// export default function KycComplete({ navigation }) {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

//       {/* Bottom Waves Background */}
//       <Image 
//         source={require('../../../assets/images/waves.png')} 
//         style={styles.wavesBg} 
//       />

//       <View style={styles.container}>
        
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity 
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//           >
//             <Icon name="chevron-left" size={28} color="#05070D" />
//           </TouchableOpacity>
//         </View>

//         {/* Title */}
//         <Text style={styles.title}>
//           KYC Submitted Successfully!
//         </Text>

//         {/* Illustration */}
//         <Image 
//           source={require('../../../assets/images/kycscreens/Bank added 1.png')} 
//           style={styles.illustration} 
//         />

//         {/* Subtitle */}
//         <Text style={styles.subTitle}>
//           Thank you for submitting your{"\n"}document we'll verify it and complete{"\n"}your KYC as soon as possible
//         </Text>

//         {/* Action Buttons */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.homeBtn}
//             activeOpacity={0.8}
//             onPress={() => navigation.navigate('Main')}
//           >
//             <Text style={styles.homeBtnText}>
//               Go Home
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.backBtn}
//             activeOpacity={0.8}
//             onPress={() => navigation.navigate('KYCVerification')}
//           >
//             <Text style={styles.backBtnText}>
//               Back to Start
//             </Text>
//           </TouchableOpacity>
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// }