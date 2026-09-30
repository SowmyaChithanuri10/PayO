// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   BackHandler,
//   ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Feather';

// import styles from './KycNotStartedStyles';
// import { theme } from '../../MainTheme/theme';

// export default function KycNotStarted({ navigation }) {
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
//       edges={['top', 'bottom']}
//       style={styles.safeArea}
//     >
//       <StatusBar
//         translucent={false}
//         backgroundColor="#ffffff"
//         barStyle="dark-content"
//       />

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.container}>
          
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity
//               onPress={() => navigation.replace('Onboarding3')}
//             >
//               <Icon
//                 name="chevron-left"
//                 size={28}
//                 color="#05070D" 
//               />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.loaderWrapper}>
//             <View style={styles.loaderOuter}>
//               <View style={styles.loaderInner}>
//                 <Icon
//                   name="file-text"
//                   size={24}
//                   color={theme.colors.primaryBlue || '#285CE0'} // Blue icon
//                 />
//               </View>
//             </View>

//             <View style={styles.kycStatusRow}>
//               <View style={styles.kycStatusDot} />
//               <Text style={styles.kycText}>KYC Not Started</Text>
//             </View>
//           </View>

//           <Text style={styles.title}>
//             Complete Your KYC
//           </Text>

//           <Text style={styles.subTitle}>
//             KYC verification has not been started yet.{'\n'}
//             Please complete the process and upload{'\n'}
//             the required documents.
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
//               <Text style={styles.pendingText}>Not Started</Text>
//             </View>

//             <View style={styles.row}>
//               <View style={styles.leftContent}>
//                 <View style={styles.listBullet} />
//                 <Text style={styles.leftText}>KYC Verification</Text>
//               </View>
//               <Text style={styles.pendingText}>Not Started</Text>
//             </View>

//             <View style={[styles.row, { marginBottom: 0 }]}>
//               <View style={styles.leftContent}>
//                 <View style={styles.listBullet} />
//                 <Text style={styles.leftText}>Wallet Activated</Text>
//               </View>
//               <Text style={styles.pendingText}>Pending</Text>
//             </View>

//           </View>

//           <TouchableOpacity
//             style={styles.button}
//             activeOpacity={0.8}
//             onPress={() => navigation.navigate('KYCVerification')}
//           >
//             <Text style={styles.buttonText}>
//               Complete KYC
//             </Text>
//           </TouchableOpacity>
          
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }



import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const KycnotStartedYet = ({ onInitiate, loading, error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Identity</Text>
      <Text style={styles.subtitle}>
        Complete your KYC instantly through government-authorized DigiLocker.
      </Text>

      <View style={styles.benefitContainer}>
        <Text style={styles.benefitItem}>✓ Instant automated verification</Text>
        <Text style={styles.benefitItem}>✓ No physical document uploads required</Text>
        <Text style={styles.benefitItem}>✓ Encrypted, end-to-end user consent</Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={onInitiate}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.buttonText}>Verify with DigiLocker</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.legalNotice}>
        You will be redirected to DigiLocker to grant consent to verify your identity.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  benefitContainer: {
    width: '100%',
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  benefitItem: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 4,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 13,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E40AF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#93C5FD',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  legalNotice: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    marginTop: 18,
    lineHeight: 18,
  },
});

export default KycnotStartedYet;