// import React from 'react';

// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
// } from 'react-native';

// import Icon from 'react-native-vector-icons/Feather';

// import styles from '../kycVerify/KycFailStyles';

// export default function KycFail({
//   navigation,
// }) {
//   return (
//     <SafeAreaView
//       style={styles.safeArea}>
//       <StatusBar
//         backgroundColor="#F3F3F3"
//         barStyle="dark-content"
//       />

//       <View style={styles.container}>

//         {/* Warning Icon */}
//         <View style={styles.iconWrapper}>
//           <View style={styles.warningBox}>
//             <Icon
//               name="alert-triangle"
//               size={70}
//               color="#000"
//             />
//           </View>
//         </View>

//         {/* Title */}
//         <Text style={styles.title}>
//           Oops! Verification Didn’t Go Through
//         </Text>

//         {/* Subtitle */}
//         <Text style={styles.subTitle}>
//           Your verification was unsuccessful.
//         </Text>

//         {/* Instructions */}
//         <Text style={styles.instructions}>
//           Please ensure:{'\n'}
//           • Aadhaar & PAN details match exactly{'\n'}
//           • Images are clear and not cropped
//         </Text>

//         {/* Retry Button */}
//         <TouchableOpacity
//           style={styles.retryBtn}
//           onPress={() =>
//             navigation.navigate(
//               'KYCVerification',
//             )
//           }>
//           <Text
//             style={
//               styles.retryBtnText
//             }>
//             Retry
//           </Text>
//         </TouchableOpacity>

//         {/* Support Button */}
//         <TouchableOpacity
//           style={styles.supportBtn}>
//           <Text
//             style={
//               styles.supportBtnText
//             }>
//             Contact Support
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
import styles from './KycFailStyles';

export default function KycFail({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      {/* Main wrapper for the absolute background positioning */}
      <View style={styles.mainWrapper}>
        
        {/* Waves Image Background */}
        <Image 
          source={require('../../../assets/images/waves.png')} 
          style={styles.wavesBg} 
        />

        <View style={styles.container}>
          
          {/* Centered Content Area */}
          <View style={styles.contentWrapper}>
            {/* Warning Icon */}
            <Image 
              source={require('../../../assets/images/kycscreens/Warning Icon.png')} 
              style={styles.warningIcon} 
            />

            {/* Title */}
            <Text style={styles.title}>
              Oops! Verification Didn’t Go{'\n'}Through
            </Text>

            {/* Subtitle */}
            <Text style={styles.subTitle}>
              Your verification was unsuccessful.
            </Text>

            {/* Instructions */}
            <Text style={styles.instructions}>
              Please ensure:{'\n'}
              • Aadhaar & PAN details match exactly{'\n'}
              • Images are clear and not cropped
            </Text>
          </View>

          {/* Bottom Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.retryBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('KYCVerification')}
            >
              <Text style={styles.retryBtnText}>
                Retry
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.supportBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.supportBtnText}>
                Contact Support
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}