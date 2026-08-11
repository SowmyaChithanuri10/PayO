// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   BackHandler,
//   ScrollView,
// } from 'react-native';

// import { SafeAreaView , useSafeAreaInsets } from 'react-native-safe-area-context';

// import Icon from 'react-native-vector-icons/Feather';
// import styles from './KycUnderReviewStyles';

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
//     <SafeAreaView
//       style={[
//         styles.safeArea,
//         {
//           paddingTop: insets.top,
//           paddingBottom: insets.bottom,
//         },
//       ]}
//       edges={['top', 'bottom']}
//     >
//       <StatusBar backgroundColor="#F9FFFB" barStyle="dark-content" />

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
//         <View style={styles.container}>
          
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.replace('Onboarding3')}>
//               <Icon name="chevron-left" size={28} color="#05070D" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.loaderWrapper}>
//             <View style={styles.loaderOuter} />
            
//             <View style={styles.kycStatusRow}>
//               <View style={styles.kycStatusDot} />
//               <Text style={styles.kycText}>KYC Submitted</Text>
//             </View>
//           </View>

//           <Text style={styles.title}>Under Review</Text>

//           <Text style={styles.subTitle}>
//             Documents submitted.{'\n'}Our team is verifying documents.
//           </Text>

//           <View style={styles.card}>
            
//             <View style={styles.row}>
//               <View style={styles.leftContent}>
//                 <View style={styles.listBullet} />
//                 <Text style={styles.leftText}>Account Created</Text>
//               </View>
//               <Text style={styles.completedText}>Completed</Text>
//             </View>

//             <View style={styles.row}>
//               <View style={styles.leftContent}>
//                 <View style={styles.listBullet} />
//                 <Text style={styles.leftText}>Documents Uploaded</Text>
//               </View>
//               <Text style={styles.completedText}>Completed</Text>
//             </View>

//             <View style={styles.row}>
//               <View style={styles.leftContent}>
//                 <View style={styles.listBullet} />
//                 <Text style={styles.leftText}>KYC Verification</Text>
//               </View>
//               <Text style={styles.pendingText}>Pending</Text>
//             </View>

//             <View style={[styles.row, { marginBottom: 0 }]}>
//               <View style={styles.leftContent}>
//                 <View style={styles.listBullet} />
//                 <Text style={styles.leftText}>Wallet Activated</Text>
//               </View>
//               <Text style={styles.pendingText}>Pending</Text>
//             </View>

//           </View>

//         </View>
//       </ScrollView>
//     </SafeAreaView>
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

import { SafeAreaView , useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Feather';
import styles from './KycUnderReviewStyles';

export default function KycUnderReview({ navigation }) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const backAction = () => {
      // ✅ UPDATED: Route user back into the app instead of Onboarding
      navigation.navigate('Main'); 
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
      <StatusBar backgroundColor="#F9FFFB" barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          
          <View style={styles.header}>
            {/* ✅ UPDATED: Route user back into the app instead of Onboarding */}
            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
              <Icon name="chevron-left" size={28} color="#05070D" />
            </TouchableOpacity>
          </View>

          <View style={styles.loaderWrapper}>
            <View style={styles.loaderOuter} />
            
            <View style={styles.kycStatusRow}>
              <View style={styles.kycStatusDot} />
              <Text style={styles.kycText}>KYC Submitted</Text>
            </View>
          </View>

          <Text style={styles.title}>Under Review</Text>

          <Text style={styles.subTitle}>
            Documents submitted.{'\n'}Our team is verifying documents.
          </Text>

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