// import React, { useEffect } from 'react';

// import {

//   View,

//   Text,

//   StatusBar,

//   TouchableOpacity,

//   BackHandler,

//   ScrollView,

// } from 'react-native';
 
// import {

//   SafeAreaView,

//   useSafeAreaInsets,

// } from 'react-native-safe-area-context';
 
// import Icon from 'react-native-vector-icons/Feather';
 
// import styles from '../kycVerify/KycUnderReviewStyles';
 
// export default function KycUnderReview({ navigation }) {

//   const insets = useSafeAreaInsets();
 
//   useEffect(() => {

//     const backAction = () => {

//       navigation.replace('Onboarding3');

//       return true;

//     };
 
//     const backHandler = BackHandler.addEventListener(

//       'hardwareBackPress',

//       backAction,

//     );
 
//     return () => backHandler.remove();

//   }, [navigation]);
 
//   return (
// <SafeAreaView

//       style={[

//         styles.safeArea,

//         {

//           paddingTop: insets.top,

//           paddingBottom: insets.bottom,

//         },

//       ]}

//       edges={['top', 'bottom']}
// >
// <StatusBar

//         backgroundColor="#120022"

//         barStyle="light-content"

//       />
 
//       <ScrollView

//         showsVerticalScrollIndicator={false}

//         contentContainerStyle={styles.scrollContent}
// >
// <View style={styles.container}>

//           {/* Header */}
// <View style={styles.header}>
// <TouchableOpacity

//               onPress={() => navigation.replace('Onboarding3')}
// >
// <Icon

//                 name="chevron-left"

//                 size={28}

//                 color="#fff"

//               />
// </TouchableOpacity>
// </View>
 
//           {/* Loader */}
// <View style={styles.loaderWrapper}>
// <View style={styles.loaderOuter}>
// <View style={styles.loaderInner} />
// </View>
 
//             <Text style={styles.kycText}>

//               • KYC Submitted
// </Text>
// </View>
 
//           {/* Title */}
// <Text style={styles.title}>

//             Under Review
// </Text>
 
//           {/* Subtitle */}
// <Text style={styles.subTitle}>

//             Documents submitted.

//             {'\n'}

//             Our team is verifying

//             {'\n'}

//             your documents.
// </Text>
 
//           {/* Status Card */}
// <View style={styles.card}>
// <View style={styles.row}>
// <Text style={styles.leftText}>

//                 • Account Created
// </Text>
 
//               <Text style={styles.completedText}>

//                 Completed
// </Text>
// </View>
 
//             <View style={styles.row}>
// <Text style={styles.leftText}>

//                 • Documents Uploaded
// </Text>
 
//               <Text style={styles.completedText}>

//                 Completed
// </Text>
// </View>
 
//             <View style={styles.row}>
// <Text style={styles.leftText}>

//                 • KYC Verification
// </Text>
 
//               <Text style={styles.pendingText}>

//                 Pending
// </Text>
// </View>
 
//             <View

//               style={[

//                 styles.row,

//                 { marginBottom: 0 },

//               ]}
// >
// <Text style={styles.leftText}>

//                 • Wallet Activated
// </Text>
 
//               <Text style={styles.pendingText}>

//                 Pending
// </Text>
// </View>
// </View>
// </View>
// </ScrollView>
// </SafeAreaView>

//   );

// }
 


import React, { useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Feather';
import styles from './KycUnderReviewStyles';

export default function KycUnderReview({ navigation }) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const backAction = () => {
      navigation.replace('Onboarding3');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
      edges={['top', 'bottom']}
    >
      {/* Light theme status bar */}
      <StatusBar backgroundColor="#F9FFFB" barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.replace('Onboarding3')}>
              <Icon name="chevron-left" size={28} color="#05070D" />
            </TouchableOpacity>
          </View>

          {/* Loader */}
          <View style={styles.loaderWrapper}>
            <View style={styles.loaderOuter} />
            
            <View style={styles.kycStatusRow}>
              <View style={styles.kycStatusDot} />
              <Text style={styles.kycText}>KYC Submitted</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Under Review</Text>

          {/* Subtitle */}
          <Text style={styles.subTitle}>
            Documents submitted.{'\n'}Our team is verifying documents.
          </Text>

          {/* Status Card */}
          <View style={styles.card}>
            
            <View style={styles.row}>
              <View style={styles.leftContent}>
                <View style={styles.listBullet} />
                <Text style={styles.leftText}>Account Created</Text>
              </View>
              <Text style={styles.completedText}>Completed</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.leftContent}>
                <View style={styles.listBullet} />
                <Text style={styles.leftText}>Documents Uploaded</Text>
              </View>
              <Text style={styles.completedText}>Completed</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.leftContent}>
                <View style={styles.listBullet} />
                <Text style={styles.leftText}>KYC Verification</Text>
              </View>
              <Text style={styles.pendingText}>Pending</Text>
            </View>

            <View style={[styles.row, { marginBottom: 0 }]}>
              <View style={styles.leftContent}>
                <View style={styles.listBullet} />
                <Text style={styles.leftText}>Wallet Activated</Text>
              </View>
              <Text style={styles.pendingText}>Pending</Text>
            </View>

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}