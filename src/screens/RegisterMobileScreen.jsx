// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import api from '../api/axios';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';

// export default function RegisterMobileScreen({ navigation, route }) {
//   const { mode = 'register' } = route.params || {};

//   const [mobile, setMobile] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const isValidMobile = mobile?.length === 10;

//   const handleSendOTP = async () => {
//     if (!mobile || mobile.length !== 10) {
//       setError('Enter valid mobile number');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');

//       let response;

//       if (mode === 'login') {
//         response = await api.post('/api/auth/send-login-otp', { mobile });
//       } else {
//         response = await api.post('/api/auth/send-otp', { mobile });
//       }

//       console.log('OTP RESPONSE:', response.data);

//       if (response.data?.message === 'OTP sent') {
//         navigation.navigate('OTP', { mobile, mode });
//       } else {
//         setError(response.data?.message || 'Something went wrong');
//       }
//     } catch (error) {
//       console.log('ERROR:', error?.response?.data || error.message);

//       setError(error.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#F2F2F2" barStyle="dark-content" />

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.container}>
//             <View style={styles.header}>
//               <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Icon
//                   name="chevron-left"
//                   size={moderateScale(28)}
//                   color="#000000"
//                 />
//               </TouchableOpacity>

//               <Text style={styles.titleCentered}>
//                 {mode === 'login'
//                   ? 'Login with Mobile'
//                   : 'Enter Your Mobile Number'}
//               </Text>
//             </View>

//             <Text style={styles.desc}>
//               We will send a one time code to verify your number. Standard rates
//               may apply
//             </Text>

//             {error ? <Text style={styles.errorText}>{error}</Text> : null}

//             <Text style={styles.label}>Mobile Number</Text>

//             <View style={styles.inputRow}>
//               <View style={styles.codeBox}>
//                 <Text style={styles.codeText}>+91</Text>
//               </View>

//               <TextInput
//                 style={styles.input}
//                 placeholder="9876543210"
//                 placeholderTextColor="#999"
//                 keyboardType="phone-pad"
//                 value={mobile}
//                 onChangeText={(text) => {
//                   const numeric = text.replace(/[^0-9]/g, '');
//                   setMobile(numeric);
//                   setError('');
//                 }}
//                 maxLength={10}
//               />
//             </View>

//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 {
//                   backgroundColor: isValidMobile ? '#4E00C2' : '#ccc',
//                 },
//               ]}
//               onPress={handleSendOTP}
//               disabled={!isValidMobile || loading}>
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>Send OTP</Text>
//               )}
//             </TouchableOpacity>

//             {mode === 'login' ? (
//               <Text style={styles.registerText}>
//                 Don’t have an account?{' '}
//                 <Text
//                   style={styles.link}
//                   onPress={() =>
//                     navigation.navigate('RegisterMobile', {
//                       mode: 'register',
//                     })
//                   }>
//                   Register
//                 </Text>
//               </Text>
//             ) : (
//               <Text style={styles.loginText}>
//                 Already have an account?{' '}
//                 <Text
//                   style={styles.link}
//                   onPress={() => navigation.navigate('Login')}>
//                   Login
//                 </Text>
//               </Text>
//             )}

//             <Text style={styles.footer}>
//               By Continuing, you agree to our{' '}
//               <Text style={styles.link}>Privacy Policy</Text>
//             </Text>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },

//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F2F2F2',
//   },

//   container: {
//     flex: 1,
//     backgroundColor: '#F2F2F2',
//     paddingHorizontal: wp('6%'),
//     paddingTop: hp('2%'),
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: hp('1%'),
//   },

//   titleCentered: {
//     flex: 1,
//     fontSize: moderateScale(20),
//     fontWeight: '700',
//     marginLeft: wp('3%'),
//     color: '#000',
//   },

//   errorText: {
//     color: 'red',
//     fontSize: moderateScale(13),
//     marginBottom: hp('1.2%'),
//     textAlign: 'center',
//   },

//   desc: {
//     textAlign: 'center',
//     color: '#555',
//     marginTop: hp('2%'),
//     marginBottom: hp('4%'),
//     fontSize: moderateScale(14),
//     lineHeight: moderateScale(20),
//     paddingHorizontal: wp('3%'),
//   },

//   label: {
//     fontSize: moderateScale(12),
//     marginBottom: hp('0.8%'),
//     marginTop: hp('0.5%'),
//     fontWeight: '700',
//     color: '#000',
//   },

//   inputRow: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: moderateScale(10),
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//   },

//   codeBox: {
//     paddingHorizontal: wp('4%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#cfcdcd',
//   },

//   codeText: {
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//     color: '#000',
//   },

//   input: {
//     flex: 1,
//     paddingVertical: hp('1.8%'),
//     paddingHorizontal: wp('4%'),
//     fontSize: moderateScale(15),
//     color: '#000',
//   },

//   button: {
//     paddingVertical: hp('2%'),
//     borderRadius: moderateScale(8),
//     alignItems: 'center',
//     marginTop: hp('4%'),
//   },

//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: moderateScale(15),
//   },

//   link: {
//     color: '#5A00D1',
//     textDecorationLine: 'underline',
//     fontWeight: '600',
//   },

//   loginText: {
//     marginTop: hp('3%'),
//     textAlign: 'center',
//     color: '#555',
//     fontSize: moderateScale(14),
//   },

//   registerText: {
//     textAlign: 'center',
//     marginTop: hp('3%'),
//     color: '#555',
//     fontSize: moderateScale(14),
//   },

//   footer: {
//     marginTop: hp('1.5%'),
//     textAlign: 'center',
//     color: '#555',
//     fontSize: moderateScale(12),
//     lineHeight: moderateScale(18),
//     paddingHorizontal: wp('5%'),
//   },
// });



// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   Keyboard,
//   Image,
//   ScrollView,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import api from '../api/axios';
// import Icon from 'react-native-vector-icons/Feather';

// // Using your custom responsive utility
// import { moderateScale, verticalScale, windowWidth } from '../utils/responsive';
// import { useAuth } from '../context/AuthContext';


// export default function RegisterMobileScreen({ navigation }) {
//   const [mobile, setMobile] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [modalVisible, setModalVisible] = useState(false); 
//   const { setUserId } = useAuth();

//   const isValidMobile = mobile?.length === 10;

//   // 🚨 Helper function to dismiss keyboard and open modal safely
//   const openModal = () => {
//     Keyboard.dismiss();
//     setModalVisible(true);
//   };

//   const handleSendOTP = async () => {
//     if (!mobile || mobile.length !== 10) {
//       setError('Enter valid mobile number');
//       return;
//     }
//   navigation.navigate('OTP')
//     // try {
//     //   setLoading(true);
//     //   setError('');

//     //   const response = await api.post('/api/auth/send-otp', {
//     //     mobile,
//     //     countryCode: '+91',
//     //   });

//     //   if (
//     //     response.data?.status === '200' ||
//     //     response.data?.message === 'OTP Sent Successfully'
//     //   ) {
//     //     navigation.navigate('OTP', {
//     //       mobile,
//     //       countryCode: '+91',
//     //       userId: response.data?.userId,
//     //       type: 'register', 
//     //     });

//     //     setUserId(response.data.userId);
//     //   } else {
//     //     setError(response.data?.message || 'Something went wrong');
//     //   }
//     // } catch (error) {
//     //   setError(error.response?.data?.message || 'Something went wrong');
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <ScrollView 
//           contentContainerStyle={styles.scrollContent} 
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
          
//           {/* Header Section */}
//           <View style={styles.header}>
//             <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//               <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
//             </TouchableOpacity>
            
//             <Image 
//               source={require('../../assets/images/LogoContainer.png')} 
//               style={styles.logo}
//             />
//           </View>

//           {/* Hero Illustration */}
//           <Image 
//             source={require('../../assets/images/registerscreen.png')} 
//             style={styles.heroImage}
//           />

//           {/* Title & Subtitle */}
//           <View style={styles.titleContainer}>
//              <Text style={styles.titleBlack}>
//                Enter Your <Text style={styles.titleBlue}>Mobile Number</Text>
//              </Text>
           
//             <Text style={styles.desc}>
//               We will send a one time code to verify your number. Standard rates may apply.
//             </Text>
//           </View>

//           {error ? <Text style={styles.errorText}>{error}</Text> : null}

//           {/* Input Section */}
//           <View style={styles.inputSection}>
//             <Text style={styles.label}>Mobile Number</Text>

//             <View style={styles.inputContainerRow}>
//               {/* Country Code Box */}
//               <View style={styles.countryCodeBox}>
//                 <Text style={styles.flagEmoji}>🇮🇳</Text> 
//                 <Text style={styles.countryCodeText}>+91</Text>
//                 <Icon name="chevron-down" size={moderateScale(16)} color="#333" />
//               </View>

//               {/* Mobile Input Box */}
//               <View style={[styles.mobileInputBox, isValidMobile && styles.mobileInputBoxValid]}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter Mobile Number"
//                   placeholderTextColor="#999"
//                   keyboardType="phone-pad"
//                   value={mobile}
//                   onChangeText={(text) => {
//                     const numeric = text.replace(/[^0-9]/g, '');
//                     setMobile(numeric);
//                     setError('');
//                   }}
//                   maxLength={10}
//                 />
//                 {/* Green checkmark appears when valid */}
//                 {isValidMobile && (
//                   <Icon name="check-circle" size={moderateScale(20)} color="#28A745" />
//                 )}
//               </View>
//             </View>
//           </View>

//           {/* Terms & Conditions Check */}
//           <View style={styles.termsRow}>
//             <Image 
//               source={require('../../assets/images/shield-check1.png')} 
//               style={styles.termsShieldIcon} 
//             />
//             <View style={styles.termsTextContainer}>
//               <Text style={styles.termsText}>By continuing you agree to PAYO's </Text>
              
//               <TouchableOpacity onPress={openModal} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
//                 <Text style={[styles.link, { fontSize: moderateScale(11) }]}>Terms of Service</Text>
//               </TouchableOpacity>
              
//               <Text style={styles.termsText}> & </Text>
              
//               <TouchableOpacity onPress={openModal} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
//                 <Text style={[styles.link, { fontSize: moderateScale(11) }]}>Privacy Policy</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Primary Button */}
//           <TouchableOpacity
//             style={[styles.primaryBtn, { opacity: isValidMobile ? 1 : 0.6 }]}
//             onPress={handleSendOTP}
//             disabled={!isValidMobile || loading}
//             activeOpacity={0.8}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <View style={styles.btnContent}>
//                 <Text style={styles.buttonText}>Send OTP</Text>
//                 <Icon name="arrow-right" size={moderateScale(18)} color="#FFF" style={styles.btnArrow} />
//               </View>
//             )}
//           </TouchableOpacity>

//           {/* Divider */}
//           <View style={styles.dividerRow}>
//             <View style={styles.line} />
//             <Text style={styles.orText}>OR</Text>
//             <View style={styles.line} />
//           </View>

//           {/* Bottom Links */}
//           <View style={styles.bottomLinksContainer}>
//             <View style={styles.bottomRow}>
//               <Text style={styles.accountText}>Already have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Login')} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
//                 <Text style={[styles.link, { fontSize: moderateScale(13) }]}>Login</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.bottomRow}>
//               <Text style={styles.privacyText}>By Continuing, you agree to our </Text>
//               <TouchableOpacity onPress={openModal} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
//                 <Text style={[styles.link, { fontSize: moderateScale(12) }]}>Privacy Policy</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Security Badge */}
//           <View style={styles.badgeContainer}>
//             <Image 
//               source={require('../../assets/images/vector.png')} 
//               style={styles.badgeShieldIcon} 
//             />
//             <Text style={styles.badgeText}>100% Secure & Encrypted</Text>
//           </View>

//         </ScrollView>
//       </KeyboardAvoidingView>

//       {/* 🚨 REPLACED NATIVE MODAL WITH FOOLPROOF ABSOLUTE OVERLAY */}
//       {modalVisible && (
//         <View style={styles.absoluteOverlay}>
//           <View style={styles.modalContent}>
//             {/* Modal Header */}
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Terms & Privacy Policy</Text>
//               <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
//                 <Icon name="x" size={moderateScale(24)} color="#333" />
//               </TouchableOpacity>
//             </View>
            
//             {/* Modal Scrollable Content */}
//             <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
//               <Text style={styles.modalBodyText}>
//                 <Text style={styles.modalSectionTitle}>1. Terms of Service{'\n'}</Text>
//                 Welcome to PAYO. By using our application, you agree to comply with and be bound by the following terms and conditions of use. Please review them carefully.{'\n\n'}
                
//                 • You must provide accurate and complete information when creating an account.{'\n'}
//                 • You are responsible for maintaining the confidentiality of your account credentials.{'\n'}
//                 • Any misuse of the application or violation of these terms may result in account termination.{'\n\n'}
                
//                 <Text style={styles.modalSectionTitle}>2. Privacy Policy{'\n'}</Text>
//                 We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information.{'\n\n'}
                
//                 • Data Collection: We collect information you provide directly to us, such as your mobile number and transaction details.{'\n'}
//                 • Data Usage: Your information is used to provide, maintain, and improve our services, as well as to process transactions securely.{'\n'}
//                 • Data Protection: We implement strict security measures to ensure your data is encrypted and protected against unauthorized access.
//               </Text>
//             </ScrollView>
//           </View>
//         </View>
//       )}

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#ffffff', 
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: verticalScale(30),
//   },
  
//   // Header
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: verticalScale(100),
//     width: '100%',
//     position: 'relative',
//   },
//   backBtn: {
//     position: 'absolute',
//     left: moderateScale(25),
//     width: moderateScale(40),
//     height: moderateScale(40),
//     borderRadius: moderateScale(20),
//     backgroundColor: '#FFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   logo: {
//     width: moderateScale(120),
//     height: moderateScale(40),
//     resizeMode: 'contain',
//   },

//   // Hero Image
//   heroImage: {
//     width: windowWidth * 0.85,
//     height: verticalScale(175),
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     marginTop: verticalScale(10),
//   },

//   // Typography
//   titleContainer: {
//     alignItems: 'center',
//     marginTop: verticalScale(10),
//   },
//   titleBlack: {
//     fontSize: moderateScale(22),
//     fontWeight: '800',
//     color: '#000',
//   },
//   titleBlue: {
//     color: '#2962FF',
//   },
//   desc: {
//     textAlign: 'center',
//     color: '#666',
//     fontSize: moderateScale(13),
//     lineHeight: moderateScale(20),
//     marginTop: verticalScale(10),
//     paddingHorizontal: moderateScale(40),
//   },
//   errorText: {
//     color: '#FF3B30',
//     fontSize: moderateScale(13),
//     textAlign: 'center',
//     marginTop: verticalScale(10),
//   },

//   // Inputs
//   inputSection: {
//     paddingHorizontal: moderateScale(25),
//     marginTop: verticalScale(20),
//   },
//   label: {
//     fontSize: moderateScale(13),
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: verticalScale(10),
//   },
//   inputContainerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   countryCodeBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     borderWidth: 1,
//     borderColor: '#D0D5DD',
//     borderRadius: moderateScale(10),
//     height: verticalScale(50),
//     width: '28%',
//     backgroundColor: '#FFF',
//   },
//   flagEmoji: {
//     fontSize: moderateScale(16),
//   },
//   countryCodeText: {
//     fontSize: moderateScale(14),
//     fontWeight: '600',
//     color: '#333',
//   },
//   mobileInputBox: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: moderateScale(15),
//     borderWidth: 1,
//     borderColor: '#D0D5DD',
//     borderRadius: moderateScale(10),
//     height: verticalScale(50),
//     paddingHorizontal: moderateScale(15),
//     backgroundColor: '#FFF',
//   },
//   mobileInputBoxValid: {
//     borderColor: '#2962FF',
//   },
//   input: {
//     flex: 1,
//     fontSize: moderateScale(14),
//     color: '#000',
//     letterSpacing: 1,
//   },

//   // Terms Check Styles
//   termsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(40),
//     marginTop: verticalScale(20),
//   },
//   termsShieldIcon: {
//     width: moderateScale(20),
//     height: moderateScale(20),
//     resizeMode: 'contain',
//     marginRight: moderateScale(10),
//   },
//   termsTextContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//   },
//   termsText: {
//     fontSize: moderateScale(11),
//     color: '#666',
//     lineHeight: moderateScale(18),
//   },
//   link: {
//     color: '#2962FF',
//     fontWeight: '700',
//   },

//   // Button
//   primaryBtn: {
//     backgroundColor: '#5655FF',
//     borderRadius: moderateScale(12),
//     height: verticalScale(50),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: moderateScale(25),
//     marginTop: verticalScale(25),
//     elevation: 3,
//     shadowColor: '#5655FF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   btnContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//   },
//   btnArrow: {
//     position: 'absolute',
//     right: moderateScale(20),
//   },

//   // Divider
//   dividerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: verticalScale(25),
//     paddingHorizontal: moderateScale(40),
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#E0E0E0',
//   },
//   orText: {
//     marginHorizontal: moderateScale(15),
//     color: '#888',
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//   },

//   // Bottom Area Styles
//   bottomLinksContainer: {
//     alignItems: 'center',
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//     marginBottom: verticalScale(5),
//   },
//   accountText: {
//     fontSize: moderateScale(13),
//     color: '#555',
//   },
//   privacyText: {
//     fontSize: moderateScale(12),
//     color: '#777',
//   },
  
//   // Security Badge
//   badgeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: moderateScale(20),
//     borderRadius: moderateScale(20),
//     alignSelf: 'center',
//     marginTop: verticalScale(25),
//   },
//   badgeShieldIcon: {
//     width: moderateScale(14),
//     height: moderateScale(14),
//     resizeMode: 'contain',
//   },
//   badgeText: {
//     fontSize: moderateScale(11),
//     color: '#666',
//     marginLeft: moderateScale(8),
//     fontWeight: '600',
//   },

//   // 🚨 CUSTOM OVERLAY MODAL STYLES (Replaced native Modal)
//   absoluteOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 9999,      // Ensures it renders above everything else
//     elevation: 100,    // Ensures it renders above on Android
//   },
//   modalContent: {
//     width: windowWidth * 0.85,
//     maxHeight: '80%',
//     backgroundColor: '#FFF',
//     borderRadius: moderateScale(15),
//     padding: moderateScale(20),
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: verticalScale(15),
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     paddingBottom: verticalScale(10),
//   },
//   modalTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     color: '#333',
//   },
//   closeButton: {
//     padding: moderateScale(5),
//   },
//   modalScroll: {
//     marginTop: verticalScale(5),
//   },
//   modalSectionTitle: {
//     fontSize: moderateScale(15),
//     fontWeight: '700',
//     color: '#2962FF',
//   },
//   modalBodyText: {
//     fontSize: moderateScale(14),
//     color: '#555',
//     lineHeight: moderateScale(22),
//   },
// });




///////////////////////////////////////
//updated code for otp popup
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Image,
//   ScrollView,
//   Modal,
//   FlatList,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import api from '../api/axios';
// import Icon from 'react-native-vector-icons/Feather';

// // Using your custom responsive utility
// import { moderateScale, verticalScale, windowWidth } from '../utils/responsive';
// import { useAuth } from '../context/AuthContext';

// // Helper function to convert ISO short codes (like 'IN', 'US') into unicode flag emojis
// const getFlagEmoji = (countryShortCode) => {
//   if (!countryShortCode) return '🏳️';
//   const codePoints = countryShortCode
//     .toUpperCase()
//     .split('')
//     .map((char) => 127397 + char.charCodeAt(0));
//   return String.fromCodePoint(...codePoints);
// };

// export default function RegisterMobileScreen({ navigation }) {
//   const [mobile, setMobile] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { setUserId } = useAuth();

//   // API Integration States
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);
  
//   // Country Picker Modal State
//   const [modalVisible, setModalVisible] = useState(false);

//   // Terms & Privacy Policy Overlay
//   const [termsModalVisible, setTermsModalVisible] = useState(false);

//   // --- TESTING STAGE STATES ---
//   const [testOtp, setTestOtp] = useState('');
//   const [showOtpPopup, setShowOtpPopup] = useState(false);
//   const [navParams, setNavParams] = useState(null); // Temporarily stores navigation data
//   // ----------------------------

//   const isValidMobile = mobile?.length === 10;

//   // Helper function to safely open the Terms Modal
//   const openTermsModal = () => {
//     Keyboard.dismiss();
//     setTermsModalVisible(true);
//   };

//   // Fetch countries list on mount
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await api.get('/api/countries');
//         if (response.data?.status === '200' && response.data?.data) {
//           setCountries(response.data.data);
          
//           // Default selection to India (IN) if available, otherwise fallback to the first element
//           const defaultCountry = response.data.data.find(c => c.country_short_code === 'IN') || response.data.data[0];
//           setSelectedCountry(defaultCountry);
//         }
//       } catch (err) {
//         console.error('Failed to fetch countries', err);
//         // Clean fallback so UI doesn't crash if network fails completely on mount
//         setSelectedCountry({
//           country_calling_code: '91',
//           country_short_code: 'IN',
//           country_name: 'India'
//         });
//       }
//     };

//     fetchCountries();
//   }, []);

//   const handleSendOTP = async () => {
//     if (!mobile || mobile.length !== 10) {
//       setError('Enter valid mobile number');
//       return;
//     }

//     const computedCountryCode = `${selectedCountry?.country_calling_code || '91'}`;

//     try {
//       setLoading(true);
//       setError('');

//       const response = await api.post('/api/auth/send-otp', {
//         mobile,
//         countryCode: computedCountryCode,
//       });

//       if (
//         response.data?.status === '200' ||
//         response.data?.message === 'OTP Sent Successfully'
//       ) {
        
//         const params = {
//           mobile,
//           countryCode: computedCountryCode,
//           userId: response.data?.userId,
//           type: 'register', // identifies the flow
//         };

//         setUserId(response.data.userId);

//         // --- TESTING STAGE: Capture OTP and show popup before navigating ---
//         // Adjust 'response.data.otp' if your backend structure is different (e.g. response.data.data.otp)
//         const receivedOtp = response.data?.otp || response.data?.data?.otp;
        
//         if (receivedOtp) {
//           setTestOtp(String(receivedOtp));
//           setNavParams(params);
//           setShowOtpPopup(true);
//         } else {
//           // Fallback if no OTP is returned from backend, just navigate normally
//           navigation.navigate('OTP', params);
//         }
//         // -------------------------------------------------------------------

//       } else {
//         setError(response.data?.message || 'Something went wrong');
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- TESTING STAGE: Function to navigate after viewing the OTP popup ---
//   const handleProceedToVerify = () => {
//     setShowOtpPopup(false);
//     if (navParams) {
//       // Pass the testOtp to the OTP screen so it can also show its popup if needed
//       navigation.navigate('OTP', { ...navParams, testOtp }); 
//     }
//   };
//   // -----------------------------------------------------------------------

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />

//       {/* --- TESTING STAGE POPUP --- */}
//       <Modal
//         visible={showOtpPopup}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={handleProceedToVerify}
//       >
//         <View style={styles.testModalOverlay}>
//           <View style={styles.testModalContent}>
//             <View style={styles.testModalIconContainer}>
//               <Icon name="message-circle" size={moderateScale(28)} color="#2962FF" />
//             </View>
//             <Text style={styles.testModalTitle}>Test OTP Received</Text>
//             <Text style={styles.testModalOtpText}>{testOtp}</Text>
//             <Text style={styles.testModalSubText}>Use this code to verify your number. (Testing Mode Only)</Text>
            
//             <TouchableOpacity
//               style={styles.testModalCloseBtn}
//               onPress={handleProceedToVerify}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.testModalCloseBtnText}>Continue to Verify</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       {/* --------------------------- */}

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView 
//             contentContainerStyle={styles.scrollContent} 
//             showsVerticalScrollIndicator={false}
//             keyboardShouldPersistTaps="handled"
//           >
            
//             {/* Header Section */}
//             <View style={styles.header}>
//               <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//                 <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
//               </TouchableOpacity>
              
//               <Image 
//                 source={require('../../assets/images/LogoContainer.png')} 
//                 style={styles.logo}
//               />
//             </View>

//             {/* Hero Illustration */}
//             <Image 
//               source={require('../../assets/images/registerscreen.png')} 
//               style={styles.heroImage}
//             />

//             {/* Title & Subtitle */}
//             <View style={styles.titleContainer}>
//                <Text style={styles.titleBlack}>
//                  Enter Your <Text style={styles.titleBlue}>Mobile Number</Text>
//                </Text>
             
//               <Text style={styles.desc}>
//                 We will send a one time code to verify your number. Standard rates may apply.
//               </Text>
//             </View>

//             {error ? <Text style={styles.errorText}>{error}</Text> : null}

//             {/* Input Section */}
//             <View style={styles.inputSection}>
//               <Text style={styles.label}>Mobile Number</Text>

//               <View style={styles.inputContainerRow}>
//                 {/* Dynamic Country Code Select Button */}
//                 <TouchableOpacity 
//                   style={styles.countryCodeBox} 
//                   onPress={() => setModalVisible(true)}
//                   activeOpacity={0.7}
//                 >
//                   <Text style={styles.flagEmoji}>
//                     {getFlagEmoji(selectedCountry?.country_short_code)}
//                   </Text> 
//                   <Text style={styles.countryCodeText}>
//                   {selectedCountry?.country_calling_code || '91'}
//                   </Text>
//                   <Icon name="chevron-down" size={moderateScale(16)} color="#333" />
//                 </TouchableOpacity>

//                 {/* Mobile Input Box */}
//                 <View style={[styles.mobileInputBox, isValidMobile && styles.mobileInputBoxValid]}>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter Mobile Number"
//                     placeholderTextColor="#999"
//                     keyboardType="phone-pad"
//                     value={mobile}
//                     onChangeText={(text) => {
//                       const numeric = text.replace(/[^0-9]/g, '');
//                       setMobile(numeric);
//                       setError('');
//                     }}
//                     maxLength={10}
//                   />
//                   {/* Green checkmark appears when valid */}
//                   {isValidMobile && (
//                     <Icon name="check-circle" size={moderateScale(20)} color="#28A745" />
//                   )}
//                 </View>
//               </View>
//             </View>

//             {/* Terms & Conditions Check */}
//             <View style={styles.termsRow}>
//               <Image 
//                 source={require('../../assets/images/shield-check1.png')} 
//                 style={styles.termsShieldIcon} 
//               />
//               <View style={styles.termsTextContainer}>
//                 <Text style={styles.termsText}>By continuing you agree to PAYO's </Text>
                
//                 <TouchableOpacity onPress={openTermsModal} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
//                   <Text style={[styles.link, { fontSize: moderateScale(11) }]}>Terms of Service</Text>
//                 </TouchableOpacity>
                
//                 <Text style={styles.termsText}> & </Text>
                
//                 <TouchableOpacity onPress={openTermsModal} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
//                   <Text style={[styles.link, { fontSize: moderateScale(11) }]}>Privacy Policy</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Primary Button */}
//             <TouchableOpacity
//               style={[styles.primaryBtn, { opacity: isValidMobile ? 1 : 0.6 }]}
//               onPress={handleSendOTP}
//               disabled={!isValidMobile || loading}
//               activeOpacity={0.8}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <View style={styles.btnContent}>
//                   <Text style={styles.buttonText}>Send OTP</Text>
//                   <Icon name="arrow-right" size={moderateScale(18)} color="#FFF" style={styles.btnArrow} />
//                 </View>
//               )}
//             </TouchableOpacity>

//             {/* Divider */}
//             <View style={styles.dividerRow}>
//               <View style={styles.line} />
//               <Text style={styles.orText}>OR</Text>
//               <View style={styles.line} />
//             </View>

//             {/* Bottom Links */}
//             <View style={styles.bottomLinksContainer}>
//               <View style={styles.bottomRow}>
//                 <Text style={styles.accountText}>Already have an account? </Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('Login')} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
//                   <Text style={[styles.link, { fontSize: moderateScale(13) }]}>Login</Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.bottomRow}>
//                 <Text style={styles.privacyText}>By Continuing, you agree to our </Text>
//                 <TouchableOpacity onPress={openTermsModal} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
//                   <Text style={[styles.link, { fontSize: moderateScale(12) }]}>Privacy Policy</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Security Badge */}
//             <View style={styles.badgeContainer}>
//               <Image 
//                 source={require('../../assets/images/vector.png')} 
//                 style={styles.badgeShieldIcon} 
//               />
//               <Text style={styles.badgeText}>100% Secure & Encrypted</Text>
//             </View>

//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>

//       {/* Country Selection Picker Sheet */}
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//           <View style={styles.modalOverlay}>
//             <TouchableWithoutFeedback>
//               <View style={styles.modalContent}>
//                 <View style={styles.modalHeader}>
//                   <Text style={styles.modalTitle}>Select Country</Text>
//                   <TouchableOpacity onPress={() => setModalVisible(false)}>
//                     <Icon name="x" size={moderateScale(20)} color="#666" />
//                   </TouchableOpacity>
//                 </View>

//                 <FlatList
//                   data={countries}
//                   keyExtractor={(item) => item.country_code.toString()}
//                   showsVerticalScrollIndicator={false}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity
//                       style={styles.countryOption}
//                       activeOpacity={0.6}
//                       onPress={() => {
//                         setSelectedCountry(item);
//                         setModalVisible(false);
//                       }}
//                     >
//                       <Text style={styles.modalFlag}>
//                         {getFlagEmoji(item.country_short_code)}
//                       </Text>
//                       <Text style={styles.modalCountryName}>{item.country_name}</Text>
//                       <Text style={styles.modalCallingCode}>{item.country_calling_code}</Text>
//                     </TouchableOpacity>
//                   )}
//                 />
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>

//       {/* Absolute Overlay for Terms & Privacy Policy */}
//       {termsModalVisible && (
//         <View style={styles.absoluteOverlay}>
//           <View style={styles.termsModalContent}>
//             {/* Modal Header */}
//             <View style={styles.termsModalHeader}>
//               <Text style={styles.termsModalTitle}>Terms & Privacy Policy</Text>
//               <TouchableOpacity onPress={() => setTermsModalVisible(false)} style={styles.closeButton}>
//                 <Icon name="x" size={moderateScale(24)} color="#333" />
//               </TouchableOpacity>
//             </View>
            
//             {/* Modal Scrollable Content */}
//             <ScrollView style={styles.termsModalScroll} showsVerticalScrollIndicator={false}>
//               <Text style={styles.termsModalBodyText}>
//                 <Text style={styles.termsModalSectionTitle}>1. Terms of Service{'\n'}</Text>
//                 Welcome to PAYO. By using our application, you agree to comply with and be bound by the following terms and conditions of use. Please review them carefully.{'\n\n'}
                
//                 • You must provide accurate and complete information when creating an account.{'\n'}
//                 • You are responsible for maintaining the confidentiality of your account credentials.{'\n'}
//                 • Any misuse of the application or violation of these terms may result in account termination.{'\n\n'}
                
//                 <Text style={styles.termsModalSectionTitle}>2. Privacy Policy{'\n'}</Text>
//                 We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information.{'\n\n'}
                
//                 • Data Collection: We collect information you provide directly to us, such as your mobile number and transaction details.{'\n'}
//                 • Data Usage: Your information is used to provide, maintain, and improve our services, as well as to process transactions securely.{'\n'}
//                 • Data Protection: We implement strict security measures to ensure your data is encrypted and protected against unauthorized access.
//               </Text>
//             </ScrollView>
//           </View>
//         </View>
//       )}

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#ffffff', 
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: verticalScale(30),
//   },

//   // --- Testing Stage Popup Styles ---
//   testModalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(20),
//   },
//   testModalContent: {
//     backgroundColor: '#FFF',
//     width: '100%',
//     borderRadius: moderateScale(20),
//     padding: moderateScale(25),
//     alignItems: 'center',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//   },
//   testModalIconContainer: {
//     width: moderateScale(60),
//     height: moderateScale(60),
//     borderRadius: moderateScale(30),
//     backgroundColor: '#E8EFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: verticalScale(15),
//   },
//   testModalTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: verticalScale(10),
//   },
//   testModalOtpText: {
//     fontSize: moderateScale(32),
//     fontWeight: '800',
//     color: '#2962FF',
//     letterSpacing: moderateScale(8),
//     marginBottom: verticalScale(10),
//   },
//   testModalSubText: {
//     fontSize: moderateScale(13),
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: verticalScale(25),
//   },
//   testModalCloseBtn: {
//     backgroundColor: '#5655FF',
//     width: '100%',
//     paddingVertical: verticalScale(12),
//     borderRadius: moderateScale(10),
//     alignItems: 'center',
//   },
//   testModalCloseBtnText: {
//     color: '#FFF',
//     fontSize: moderateScale(15),
//     fontWeight: '700',
//   },
//   // ---------------------------------
  
//   // Header
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: verticalScale(100),
//     width: '100%',
//     position: 'relative',
//   },
//   backBtn: {
//     position: 'absolute',
//     left: moderateScale(25),
//     width: moderateScale(40),
//     height: moderateScale(40),
//     borderRadius: moderateScale(20),
//     backgroundColor: '#FFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   logo: {
//     width: moderateScale(120),
//     height: moderateScale(40),
//     resizeMode: 'contain',
//   },

//   // Hero Image
//   heroImage: {
//     width: windowWidth * 0.85,
//     height: verticalScale(175),
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     marginTop: verticalScale(10),
//   },

//   // Typography
//   titleContainer: {
//     alignItems: 'center',
//     marginTop: verticalScale(10),
//   },
//   titleBlack: {
//     fontSize: moderateScale(22),
//     fontWeight: '800',
//     color: '#000',
//   },
//   titleBlue: {
//     color: '#2962FF',
//   },
//   desc: {
//     textAlign: 'center',
//     color: '#666',
//     fontSize: moderateScale(13),
//     lineHeight: moderateScale(20),
//     marginTop: verticalScale(10),
//     paddingHorizontal: moderateScale(40),
//   },
//   errorText: {
//     color: '#FF3B30',
//     fontSize: moderateScale(13),
//     textAlign: 'center',
//     marginTop: verticalScale(10),
//   },

//   // Inputs
//   inputSection: {
//     paddingHorizontal: moderateScale(25),
//     marginTop: verticalScale(20),
//   },
//   label: {
//     fontSize: moderateScale(13),
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: verticalScale(10),
//   },
//   inputContainerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   countryCodeBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     borderWidth: 1,
//     borderColor: '#D0D5DD',
//     borderRadius: moderateScale(10),
//     height: verticalScale(50),
//     width: '32%', 
//     backgroundColor: '#FFF',
//   },
//   flagEmoji: {
//     fontSize: moderateScale(16),
//   },
//   countryCodeText: {
//     fontSize: moderateScale(14),
//     fontWeight: '600',
//     color: '#333',
//   },
//   mobileInputBox: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: moderateScale(12),
//     borderWidth: 1,
//     borderColor: '#D0D5DD',
//     borderRadius: moderateScale(10),
//     height: verticalScale(50),
//     paddingHorizontal: moderateScale(15),
//     backgroundColor: '#FFF',
//   },
//   mobileInputBoxValid: {
//     borderColor: '#2962FF',
//   },
//   input: {
//     flex: 1,
//     fontSize: moderateScale(14),
//     color: '#000',
//     letterSpacing: 1,
//   },

//   // Terms Check
//   termsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(40),
//     marginTop: verticalScale(20),
//   },
//   termsShieldIcon: {
//     width: moderateScale(20),
//     height: moderateScale(20),
//     resizeMode: 'contain',
//     marginRight: moderateScale(10),
//   },
//   termsTextContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//   },
//   termsText: {
//     fontSize: moderateScale(11),
//     color: '#666',
//     lineHeight: moderateScale(18),
//   },
//   link: {
//     color: '#2962FF',
//     fontWeight: '700',
//   },

//   // Button
//   primaryBtn: {
//     backgroundColor: '#5655FF',
//     borderRadius: moderateScale(12),
//     height: verticalScale(50),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: moderateScale(25),
//     marginTop: verticalScale(25),
//     elevation: 3,
//     shadowColor: '#5655FF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   btnContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//   },
//   btnArrow: {
//     position: 'absolute',
//     right: moderateScale(20),
//   },

//   // Divider
//   dividerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: verticalScale(25),
//     paddingHorizontal: moderateScale(40),
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#E0E0E0',
//   },
//   orText: {
//     marginHorizontal: moderateScale(15),
//     color: '#888',
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//   },

//   // Bottom Area
//   bottomLinksContainer: {
//     alignItems: 'center',
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//     marginBottom: verticalScale(5),
//   },
//   accountText: {
//     fontSize: moderateScale(13),
//     color: '#555',
//   },
//   privacyText: {
//     fontSize: moderateScale(12),
//     color: '#777',
//   },
  
//   // Security Badge
//   badgeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: moderateScale(20),
//     borderRadius: moderateScale(20),
//     alignSelf: 'center',
//     marginTop: verticalScale(25),
//   },
//   badgeShieldIcon: {
//     width: moderateScale(14),
//     height: moderateScale(14),
//     resizeMode: 'contain',
//   },
//   badgeText: {
//     fontSize: moderateScale(11),
//     color: '#666',
//     marginLeft: moderateScale(8),
//     fontWeight: '600',
//   },

//   // Country Picker Modal Engine Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: '#FFF',
//     borderTopLeftRadius: moderateScale(20),
//     borderTopRightRadius: moderateScale(20),
//     paddingHorizontal: moderateScale(24),
//     paddingTop: verticalScale(20),
//     paddingBottom: verticalScale(40),
//     maxHeight: '55%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: verticalScale(20),
//   },
//   modalTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: '800',
//     color: '#111',
//   },
//   countryOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(16),
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F2F5',
//   },
//   modalFlag: {
//     fontSize: moderateScale(18),
//     marginRight: moderateScale(14),
//   },
//   modalCountryName: {
//     flex: 1,
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//     color: '#333',
//   },
//   modalCallingCode: {
//     fontSize: moderateScale(15),
//     color: '#2962FF',
//     fontWeight: '700',
//   },

//   // Absolute Overlay Styles for Terms Modal
//   absoluteOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 9999,      
//     elevation: 100,    
//   },
//   termsModalContent: {
//     width: windowWidth * 0.85,
//     maxHeight: '80%',
//     backgroundColor: '#FFF',
//     borderRadius: moderateScale(15),
//     padding: moderateScale(20),
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//   },
//   termsModalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: verticalScale(15),
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     paddingBottom: verticalScale(10),
//   },
//   termsModalTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     color: '#333',
//   },
//   closeButton: {
//     padding: moderateScale(5),
//   },
//   termsModalScroll: {
//     marginTop: verticalScale(5),
//   },
//   termsModalSectionTitle: {
//     fontSize: moderateScale(15),
//     fontWeight: '700',
//     color: '#2962FF',
//   },
//   termsModalBodyText: {
//     fontSize: moderateScale(14),
//     color: '#555',
//     lineHeight: moderateScale(22),
//   },
// });





//////////////////////////////////////
//new code


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  Modal,
  FlatList,
  PermissionsAndroid, // 🚨 NEW: Added for Android Permissions
  Alert,              // 🚨 NEW: Added to show denial alerts
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/axios';
import Icon from 'react-native-vector-icons/Feather';

// Using your custom responsive utility
import { moderateScale, verticalScale, windowWidth } from '../utils/responsive';
import { useAuth } from '../context/AuthContext';

// Helper function to convert ISO short codes (like 'IN', 'US') into unicode flag emojis
const getFlagEmoji = (countryShortCode) => {
  if (!countryShortCode) return '🏳️';
  const codePoints = countryShortCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function RegisterMobileScreen({ navigation }) {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUserId } = useAuth();

  // API Integration States
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  // Country Picker Modal State
  const [modalVisible, setModalVisible] = useState(false);

  // Terms & Privacy Policy Overlay
  const [termsModalVisible, setTermsModalVisible] = useState(false);

  const isValidMobile = mobile?.length === 10;

  const openTermsModal = () => {
    Keyboard.dismiss();
    setTermsModalVisible(true);
  };

  // Fetch countries list on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get('/api/countries');
        if (response.data?.status === '200' && response.data?.data) {
          setCountries(response.data.data);
          const defaultCountry = response.data.data.find(c => c.country_short_code === 'IN') || response.data.data[0];
          setSelectedCountry(defaultCountry);
        }
      } catch (err) {
        console.error('Failed to fetch countries', err);
        setSelectedCountry({
          country_calling_code: '91',
          country_short_code: 'IN',
          country_name: 'India'
        });
      }
    };

    fetchCountries();
  }, []);

  // 🚨 NEW: Function to request and check Location Permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'To complete your registration, PAYO requires access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    // Note: If you deploy to iOS, you'll need to use 'react-native-permissions' or Geolocation APIs here.
    return true; 
  };

  const handleSendOTP = async () => {
    if (!mobile || mobile.length !== 10) {
      setError('Enter valid mobile number');
      return;
    }

    // 🚨 NEW: Enforce location permission before making the API call
    const hasLocationPermission = await requestLocationPermission();
    if (!hasLocationPermission) {
      Alert.alert(
        'Permission Denied',
        'Location access is mandatory to register. Please allow location access to continue.',
        [{ text: 'OK' }]
      );
      return; // Stop the flow immediately if denied
    }

    const computedCountryCode = `${selectedCountry?.country_calling_code || '91'}`;

    try {
      setLoading(true);
      setError('');

      const response = await api.post('/api/auth/send-otp', {
        mobile,
        countryCode: computedCountryCode,
      });

      if (
        response.data?.status === '200' ||
        response.data?.message === 'OTP Sent Successfully'
      ) {
        navigation.navigate('OTP', {
          mobile,
          countryCode: computedCountryCode,
          userId: response.data?.userId,
          type: 'register',
        });

        setUserId(response.data.userId);
      } else {
        setError(response.data?.message || 'Something went wrong');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            
            {/* Header Section */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
              </TouchableOpacity>
              
              <Image 
                source={require('../../assets/images/LogoContainer.png')} 
                style={styles.logo}
              />
            </View>

            {/* Hero Illustration */}
            <Image 
              source={require('../../assets/images/registerscreen.png')} 
              style={styles.heroImage}
            />

            {/* Title & Subtitle */}
            <View style={styles.titleContainer}>
               <Text style={styles.titleBlack}>
                 Enter Your <Text style={styles.titleBlue}>Mobile Number</Text>
               </Text>
             
              <Text style={styles.desc}>
                We will send a one time code to verify your number. Standard rates may apply.
              </Text>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Input Section */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Mobile Number</Text>

              <View style={styles.inputContainerRow}>
                {/* Dynamic Country Code Select Button */}
                <TouchableOpacity 
                  style={styles.countryCodeBox} 
                  onPress={() => setModalVisible(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.flagEmoji}>
                    {getFlagEmoji(selectedCountry?.country_short_code)}
                  </Text> 
                  <Text style={styles.countryCodeText}>
                  {selectedCountry?.country_calling_code || '91'}
                  </Text>
                  <Icon name="chevron-down" size={moderateScale(16)} color="#333" />
                </TouchableOpacity>

                {/* Mobile Input Box */}
                <View style={[styles.mobileInputBox, isValidMobile && styles.mobileInputBoxValid]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Mobile Number"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={mobile}
                    onChangeText={(text) => {
                      const numeric = text.replace(/[^0-9]/g, '');
                      setMobile(numeric);
                      setError('');
                    }}
                    maxLength={10}
                  />
                  {/* Green checkmark appears when valid */}
                  {isValidMobile && (
                    <Icon name="check-circle" size={moderateScale(20)} color="#28A745" />
                  )}
                </View>
              </View>
            </View>

            {/* Terms & Conditions Check */}
            <View style={styles.termsRow}>
              <Image 
                source={require('../../assets/images/shield-check1.png')} 
                style={styles.termsShieldIcon} 
              />
              <View style={styles.termsTextContainer}>
                <Text style={styles.termsText}>By continuing you agree to PAYO's </Text>
                
                <TouchableOpacity onPress={openTermsModal} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                  <Text style={[styles.link, { fontSize: moderateScale(11) }]}>Terms of Service</Text>
                </TouchableOpacity>
                
                <Text style={styles.termsText}> & </Text>
                
                <TouchableOpacity onPress={openTermsModal} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                  <Text style={[styles.link, { fontSize: moderateScale(11) }]}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Primary Button */}
            <TouchableOpacity
              style={[styles.primaryBtn, { opacity: isValidMobile ? 1 : 0.6 }]}
              onPress={handleSendOTP}
              disabled={!isValidMobile || loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.btnContent}>
                  <Text style={styles.buttonText}>Send OTP</Text>
                  <Icon name="arrow-right" size={moderateScale(18)} color="#FFF" style={styles.btnArrow} />
                </View>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            {/* Bottom Links */}
            <View style={styles.bottomLinksContainer}>
              <View style={styles.bottomRow}>
                <Text style={styles.accountText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                  <Text style={[styles.link, { fontSize: moderateScale(13) }]}>Login</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.bottomRow}>
                <Text style={styles.privacyText}>By Continuing, you agree to our </Text>
                <TouchableOpacity onPress={openTermsModal} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                  <Text style={[styles.link, { fontSize: moderateScale(12) }]}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Security Badge */}
            <View style={styles.badgeContainer}>
              <Image 
                source={require('../../assets/images/vector.png')} 
                style={styles.badgeShieldIcon} 
              />
              <Text style={styles.badgeText}>100% Secure & Encrypted</Text>
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Country Selection Picker Sheet */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Country</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Icon name="x" size={moderateScale(20)} color="#666" />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={countries}
                  keyExtractor={(item) => item.country_code?.toString() || item.country_short_code}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.countryOption}
                      activeOpacity={0.6}
                      onPress={() => {
                        setSelectedCountry(item);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.modalFlag}>
                        {getFlagEmoji(item.country_short_code)}
                      </Text>
                      <Text style={styles.modalCountryName}>{item.country_name}</Text>
                      <Text style={styles.modalCallingCode}>{item.country_calling_code}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Absolute Overlay for Terms & Privacy Policy */}
      {termsModalVisible && (
        <View style={styles.absoluteOverlay}>
          <View style={styles.termsModalContent}>
            {/* Modal Header */}
            <View style={styles.termsModalHeader}>
              <Text style={styles.termsModalTitle}>Terms & Privacy Policy</Text>
              <TouchableOpacity onPress={() => setTermsModalVisible(false)} style={styles.closeButton}>
                <Icon name="x" size={moderateScale(24)} color="#333" />
              </TouchableOpacity>
            </View>
            
            {/* Modal Scrollable Content */}
            <ScrollView style={styles.termsModalScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.termsModalBodyText}>
                <Text style={styles.termsModalSectionTitle}>1. Terms of Service{'\n'}</Text>
                Welcome to PAYO. By using our application, you agree to comply with and be bound by the following terms and conditions of use. Please review them carefully.{'\n\n'}
                
                • You must provide accurate and complete information when creating an account.{'\n'}
                • You are responsible for maintaining the confidentiality of your account credentials.{'\n'}
                • Any misuse of the application or violation of these terms may result in account termination.{'\n\n'}
                
                <Text style={styles.termsModalSectionTitle}>2. Privacy Policy{'\n'}</Text>
                We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information.{'\n\n'}
                
                • Data Collection: We collect information you provide directly to us, such as your mobile number and transaction details.{'\n'}
                • Data Usage: Your information is used to provide, maintain, and improve our services, as well as to process transactions securely.{'\n'}
                • Data Protection: We implement strict security measures to ensure your data is encrypted and protected against unauthorized access.
              </Text>
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff', 
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(30),
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(100),
    width: '100%',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    left: moderateScale(25),
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  logo: {
    width: moderateScale(120),
    height: moderateScale(40),
    resizeMode: 'contain',
  },

  // Hero Image
  heroImage: {
    width: windowWidth * 0.85,
    height: verticalScale(175),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: verticalScale(10),
  },

  // Typography
  titleContainer: {
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  titleBlack: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#000',
  },
  titleBlue: {
    color: '#2962FF',
  },
  desc: {
    textAlign: 'center',
    color: '#666',
    fontSize: moderateScale(13),
    lineHeight: moderateScale(20),
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(40),
  },
  errorText: {
    color: '#FF3B30',
    fontSize: moderateScale(13),
    textAlign: 'center',
    marginTop: verticalScale(10),
  },

  // Inputs
  inputSection: {
    paddingHorizontal: moderateScale(25),
    marginTop: verticalScale(20),
  },
  label: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#333',
    marginBottom: verticalScale(10),
  },
  inputContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: moderateScale(10),
    height: verticalScale(50),
    width: '32%', 
    backgroundColor: '#FFF',
  },
  flagEmoji: {
    fontSize: moderateScale(16),
  },
  countryCodeText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#333',
  },
  mobileInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(12),
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: moderateScale(10),
    height: verticalScale(50),
    paddingHorizontal: moderateScale(15),
    backgroundColor: '#FFF',
  },
  mobileInputBoxValid: {
    borderColor: '#2962FF',
  },
  input: {
    flex: 1,
    fontSize: moderateScale(14),
    color: '#000',
    letterSpacing: 1,
  },

  // 🚨 UPDATED Terms Check
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(40),
    marginTop: verticalScale(20),
  },
  termsShieldIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginRight: moderateScale(10),
  },
  termsTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  termsText: {
    fontSize: moderateScale(11),
    color: '#666',
    lineHeight: moderateScale(18),
  },
  link: {
    color: '#2962FF',
    fontWeight: '700',
  },

  // Button
  primaryBtn: {
    backgroundColor: '#5655FF',
    borderRadius: moderateScale(12),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(25),
    marginTop: verticalScale(25),
    elevation: 3,
    shadowColor: '#5655FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  btnArrow: {
    position: 'absolute',
    right: moderateScale(20),
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(25),
    paddingHorizontal: moderateScale(40),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    marginHorizontal: moderateScale(15),
    color: '#888',
    fontSize: moderateScale(13),
    fontWeight: '600',
  },

  // 🚨 UPDATED Bottom Area
  bottomLinksContainer: {
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: verticalScale(5),
  },
  accountText: {
    fontSize: moderateScale(13),
    color: '#555',
  },
  privacyText: {
    fontSize: moderateScale(12),
    color: '#777',
  },
  
  // Security Badge
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(20),
    alignSelf: 'center',
    marginTop: verticalScale(25),
  },
  badgeShieldIcon: {
    width: moderateScale(14),
    height: moderateScale(14),
    resizeMode: 'contain',
  },
  badgeText: {
    fontSize: moderateScale(11),
    color: '#666',
    marginLeft: moderateScale(8),
    fontWeight: '600',
  },

  // Country Picker Modal Engine Styles (Kept intact)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingHorizontal: moderateScale(24),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(40),
    maxHeight: '55%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: '800',
    color: '#111',
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  modalFlag: {
    fontSize: moderateScale(18),
    marginRight: moderateScale(14),
  },
  modalCountryName: {
    flex: 1,
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: '#333',
  },
  modalCallingCode: {
    fontSize: moderateScale(15),
    color: '#2962FF',
    fontWeight: '700',
  },

  // 🚨 NEW Absolute Overlay Styles for Terms Modal
  absoluteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,      
    elevation: 100,    
  },
  termsModalContent: {
    width: windowWidth * 0.85,
    maxHeight: '80%',
    backgroundColor: '#FFF',
    borderRadius: moderateScale(15),
    padding: moderateScale(20),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  termsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: verticalScale(10),
  },
  termsModalTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#333',
  },
  closeButton: {
    padding: moderateScale(5),
  },
  termsModalScroll: {
    marginTop: verticalScale(5),
  },
  termsModalSectionTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#2962FF',
  },
  termsModalBodyText: {
    fontSize: moderateScale(14),
    color: '#555',
    lineHeight: moderateScale(22),
  },
});




//////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Image,
//   ScrollView,
//   Modal,
//   FlatList,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import api from '../api/axios';
// import Icon from 'react-native-vector-icons/Feather';

// // Using your custom responsive utility
// import { moderateScale, verticalScale, windowWidth } from '../utils/responsive';
// import { useAuth } from '../context/AuthContext';

// // Helper function to convert ISO short codes (like 'IN', 'US') into unicode flag emojis
// const getFlagEmoji = (countryShortCode) => {
//   if (!countryShortCode) return '🏳️';
//   const codePoints = countryShortCode
//     .toUpperCase()
//     .split('')
//     .map((char) => 127397 + char.charCodeAt(0));
//   return String.fromCodePoint(...codePoints);
// };

// export default function RegisterMobileScreen({ navigation }) {
//   const [mobile, setMobile] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { setUserId } = useAuth();

//   // API Integration States
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);
  
//   // Country Picker Modal State
//   const [modalVisible, setModalVisible] = useState(false);

//   // 🚨 New State for Terms & Privacy Policy Overlay
//   const [termsModalVisible, setTermsModalVisible] = useState(false);

//   const isValidMobile = mobile?.length === 10;

//   // 🚨 Helper function to safely open the Terms Modal
//   const openTermsModal = () => {
//     Keyboard.dismiss();
//     setTermsModalVisible(true);
//   };

//   // Fetch countries list on mount
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await api.get('/api/countries');
//         if (response.data?.status === '200' && response.data?.data) {
//           setCountries(response.data.data);
          
//           // Default selection to India (IN) if available, otherwise fallback to the first element
//           const defaultCountry = response.data.data.find(c => c.country_short_code === 'IN') || response.data.data[0];
//           setSelectedCountry(defaultCountry);
//         }
//       } catch (err) {
//         console.error('Failed to fetch countries', err);
//         // Clean fallback so UI doesn't crash if network fails completely on mount
//         setSelectedCountry({
//           country_calling_code: '91',
//           country_short_code: 'IN',
//           country_name: 'India'
//         });
//       }
//     };

//     fetchCountries();
//   }, []);

//   const handleSendOTP = async () => {
//     if (!mobile || mobile.length !== 10) {
//       setError('Enter valid mobile number');
//       return;
//     }

//     const computedCountryCode = `${selectedCountry?.country_calling_code || '91'}`;

//     try {
//       setLoading(true);
//       setError('');

//       const response = await api.post('/api/auth/send-otp', {
//         mobile,
//         countryCode: computedCountryCode,
//       });

//       if (
//         response.data?.status === '200' ||
//         response.data?.message === 'OTP Sent Successfully'
//       ) {
//         navigation.navigate('OTP', {
//           mobile,
//           countryCode: computedCountryCode,
//           userId: response.data?.userId,
//           type: 'register', // identifies the flow
//         });

//         setUserId(response.data.userId);
//       } else {
//         setError(response.data?.message || 'Something went wrong');
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView 
//             contentContainerStyle={styles.scrollContent} 
//             showsVerticalScrollIndicator={false}
//             keyboardShouldPersistTaps="handled"
//           >
            
//             {/* Header Section */}
//             <View style={styles.header}>
//               <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//                 <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
//               </TouchableOpacity>
              
//               <Image 
//                 source={require('../../assets/images/LogoContainer.png')} 
//                 style={styles.logo}
//               />
//             </View>

//             {/* Hero Illustration */}
//             <Image 
//               source={require('../../assets/images/registerscreen.png')} 
//               style={styles.heroImage}
//             />

//             {/* Title & Subtitle */}
//             <View style={styles.titleContainer}>
//                <Text style={styles.titleBlack}>
//                  Enter Your <Text style={styles.titleBlue}>Mobile Number</Text>
//                </Text>
             
//               <Text style={styles.desc}>
//                 We will send a one time code to verify your number. Standard rates may apply.
//               </Text>
//             </View>

//             {error ? <Text style={styles.errorText}>{error}</Text> : null}

//             {/* Input Section */}
//             <View style={styles.inputSection}>
//               <Text style={styles.label}>Mobile Number</Text>

//               <View style={styles.inputContainerRow}>
//                 {/* Dynamic Country Code Select Button */}
//                 <TouchableOpacity 
//                   style={styles.countryCodeBox} 
//                   onPress={() => setModalVisible(true)}
//                   activeOpacity={0.7}
//                 >
//                   <Text style={styles.flagEmoji}>
//                     {getFlagEmoji(selectedCountry?.country_short_code)}
//                   </Text> 
//                   <Text style={styles.countryCodeText}>
//                   {selectedCountry?.country_calling_code || '91'}
//                   </Text>
//                   <Icon name="chevron-down" size={moderateScale(16)} color="#333" />
//                 </TouchableOpacity>

//                 {/* Mobile Input Box */}
//                 <View style={[styles.mobileInputBox, isValidMobile && styles.mobileInputBoxValid]}>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter Mobile Number"
//                     placeholderTextColor="#999"
//                     keyboardType="phone-pad"
//                     value={mobile}
//                     onChangeText={(text) => {
//                       const numeric = text.replace(/[^0-9]/g, '');
//                       setMobile(numeric);
//                       setError('');
//                     }}
//                     maxLength={10}
//                   />
//                   {/* Green checkmark appears when valid */}
//                   {isValidMobile && (
//                     <Icon name="check-circle" size={moderateScale(20)} color="#28A745" />
//                   )}
//                 </View>
//               </View>
//             </View>

//             {/* 🚨 UPDATED Terms & Conditions Check */}
//             <View style={styles.termsRow}>
//               <Image 
//                 source={require('../../assets/images/shield-check1.png')} 
//                 style={styles.termsShieldIcon} 
//               />
//               <View style={styles.termsTextContainer}>
//                 <Text style={styles.termsText}>By continuing you agree to PAYO's </Text>
                
//                 <TouchableOpacity onPress={openTermsModal} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
//                   <Text style={[styles.link, { fontSize: moderateScale(11) }]}>Terms of Service</Text>
//                 </TouchableOpacity>
                
//                 <Text style={styles.termsText}> & </Text>
                
//                 <TouchableOpacity onPress={openTermsModal} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
//                   <Text style={[styles.link, { fontSize: moderateScale(11) }]}>Privacy Policy</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Primary Button */}
//             <TouchableOpacity
//               style={[styles.primaryBtn, { opacity: isValidMobile ? 1 : 0.6 }]}
//               onPress={handleSendOTP}
//               disabled={!isValidMobile || loading}
//               activeOpacity={0.8}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <View style={styles.btnContent}>
//                   <Text style={styles.buttonText}>Send OTP</Text>
//                   <Icon name="arrow-right" size={moderateScale(18)} color="#FFF" style={styles.btnArrow} />
//                 </View>
//               )}
//             </TouchableOpacity>

//             {/* Divider */}
//             <View style={styles.dividerRow}>
//               <View style={styles.line} />
//               <Text style={styles.orText}>OR</Text>
//               <View style={styles.line} />
//             </View>

//             {/* 🚨 UPDATED Bottom Links */}
//             <View style={styles.bottomLinksContainer}>
//               <View style={styles.bottomRow}>
//                 <Text style={styles.accountText}>Already have an account? </Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('Login')} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
//                   <Text style={[styles.link, { fontSize: moderateScale(13) }]}>Login</Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.bottomRow}>
//                 <Text style={styles.privacyText}>By Continuing, you agree to our </Text>
//                 <TouchableOpacity onPress={openTermsModal} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
//                   <Text style={[styles.link, { fontSize: moderateScale(12) }]}>Privacy Policy</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Security Badge */}
//             <View style={styles.badgeContainer}>
//               <Image 
//                 source={require('../../assets/images/vector.png')} 
//                 style={styles.badgeShieldIcon} 
//               />
//               <Text style={styles.badgeText}>100% Secure & Encrypted</Text>
//             </View>

//           </ScrollView>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>

//       {/* Country Selection Picker Sheet (Kept Intact) */}
//       <Modal
//         visible={modalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//           <View style={styles.modalOverlay}>
//             <TouchableWithoutFeedback>
//               <View style={styles.modalContent}>
//                 <View style={styles.modalHeader}>
//                   <Text style={styles.modalTitle}>Select Country</Text>
//                   <TouchableOpacity onPress={() => setModalVisible(false)}>
//                     <Icon name="x" size={moderateScale(20)} color="#666" />
//                   </TouchableOpacity>
//                 </View>

//                 <FlatList
//                   data={countries}
//                   keyExtractor={(item) => item.country_code.toString()}
//                   showsVerticalScrollIndicator={false}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity
//                       style={styles.countryOption}
//                       activeOpacity={0.6}
//                       onPress={() => {
//                         setSelectedCountry(item);
//                         setModalVisible(false);
//                       }}
//                     >
//                       <Text style={styles.modalFlag}>
//                         {getFlagEmoji(item.country_short_code)}
//                       </Text>
//                       <Text style={styles.modalCountryName}>{item.country_name}</Text>
//                       <Text style={styles.modalCallingCode}>{item.country_calling_code}</Text>
//                     </TouchableOpacity>
//                   )}
//                 />
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>

//       {/* 🚨 NEW Absolute Overlay for Terms & Privacy Policy */}
//       {termsModalVisible && (
//         <View style={styles.absoluteOverlay}>
//           <View style={styles.termsModalContent}>
//             {/* Modal Header */}
//             <View style={styles.termsModalHeader}>
//               <Text style={styles.termsModalTitle}>Terms & Privacy Policy</Text>
//               <TouchableOpacity onPress={() => setTermsModalVisible(false)} style={styles.closeButton}>
//                 <Icon name="x" size={moderateScale(24)} color="#333" />
//               </TouchableOpacity>
//             </View>
            
//             {/* Modal Scrollable Content */}
//             <ScrollView style={styles.termsModalScroll} showsVerticalScrollIndicator={false}>
//               <Text style={styles.termsModalBodyText}>
//                 <Text style={styles.termsModalSectionTitle}>1. Terms of Service{'\n'}</Text>
//                 Welcome to PAYO. By using our application, you agree to comply with and be bound by the following terms and conditions of use. Please review them carefully.{'\n\n'}
                
//                 • You must provide accurate and complete information when creating an account.{'\n'}
//                 • You are responsible for maintaining the confidentiality of your account credentials.{'\n'}
//                 • Any misuse of the application or violation of these terms may result in account termination.{'\n\n'}
                
//                 <Text style={styles.termsModalSectionTitle}>2. Privacy Policy{'\n'}</Text>
//                 We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information.{'\n\n'}
                
//                 • Data Collection: We collect information you provide directly to us, such as your mobile number and transaction details.{'\n'}
//                 • Data Usage: Your information is used to provide, maintain, and improve our services, as well as to process transactions securely.{'\n'}
//                 • Data Protection: We implement strict security measures to ensure your data is encrypted and protected against unauthorized access.
//               </Text>
//             </ScrollView>
//           </View>
//         </View>
//       )}

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   flex: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#ffffff', 
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: verticalScale(30),
//   },
  
//   // Header
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: verticalScale(100),
//     width: '100%',
//     position: 'relative',
//   },
//   backBtn: {
//     position: 'absolute',
//     left: moderateScale(25),
//     width: moderateScale(40),
//     height: moderateScale(40),
//     borderRadius: moderateScale(20),
//     backgroundColor: '#FFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   logo: {
//     width: moderateScale(120),
//     height: moderateScale(40),
//     resizeMode: 'contain',
//   },

//   // Hero Image
//   heroImage: {
//     width: windowWidth * 0.85,
//     height: verticalScale(175),
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     marginTop: verticalScale(10),
//   },

//   // Typography
//   titleContainer: {
//     alignItems: 'center',
//     marginTop: verticalScale(10),
//   },
//   titleBlack: {
//     fontSize: moderateScale(22),
//     fontWeight: '800',
//     color: '#000',
//   },
//   titleBlue: {
//     color: '#2962FF',
//   },
//   desc: {
//     textAlign: 'center',
//     color: '#666',
//     fontSize: moderateScale(13),
//     lineHeight: moderateScale(20),
//     marginTop: verticalScale(10),
//     paddingHorizontal: moderateScale(40),
//   },
//   errorText: {
//     color: '#FF3B30',
//     fontSize: moderateScale(13),
//     textAlign: 'center',
//     marginTop: verticalScale(10),
//   },

//   // Inputs
//   inputSection: {
//     paddingHorizontal: moderateScale(25),
//     marginTop: verticalScale(20),
//   },
//   label: {
//     fontSize: moderateScale(13),
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: verticalScale(10),
//   },
//   inputContainerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   countryCodeBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//     borderWidth: 1,
//     borderColor: '#D0D5DD',
//     borderRadius: moderateScale(10),
//     height: verticalScale(50),
//     width: '32%', 
//     backgroundColor: '#FFF',
//   },
//   flagEmoji: {
//     fontSize: moderateScale(16),
//   },
//   countryCodeText: {
//     fontSize: moderateScale(14),
//     fontWeight: '600',
//     color: '#333',
//   },
//   mobileInputBox: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: moderateScale(12),
//     borderWidth: 1,
//     borderColor: '#D0D5DD',
//     borderRadius: moderateScale(10),
//     height: verticalScale(50),
//     paddingHorizontal: moderateScale(15),
//     backgroundColor: '#FFF',
//   },
//   mobileInputBoxValid: {
//     borderColor: '#2962FF',
//   },
//   input: {
//     flex: 1,
//     fontSize: moderateScale(14),
//     color: '#000',
//     letterSpacing: 1,
//   },

//   // 🚨 UPDATED Terms Check
//   termsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(40),
//     marginTop: verticalScale(20),
//   },
//   termsShieldIcon: {
//     width: moderateScale(20),
//     height: moderateScale(20),
//     resizeMode: 'contain',
//     marginRight: moderateScale(10),
//   },
//   termsTextContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//   },
//   termsText: {
//     fontSize: moderateScale(11),
//     color: '#666',
//     lineHeight: moderateScale(18),
//   },
//   link: {
//     color: '#2962FF',
//     fontWeight: '700',
//   },

//   // Button
//   primaryBtn: {
//     backgroundColor: '#5655FF',
//     borderRadius: moderateScale(12),
//     height: verticalScale(50),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: moderateScale(25),
//     marginTop: verticalScale(25),
//     elevation: 3,
//     shadowColor: '#5655FF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   btnContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//   },
//   btnArrow: {
//     position: 'absolute',
//     right: moderateScale(20),
//   },

//   // Divider
//   dividerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: verticalScale(25),
//     paddingHorizontal: moderateScale(40),
//   },
//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#E0E0E0',
//   },
//   orText: {
//     marginHorizontal: moderateScale(15),
//     color: '#888',
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//   },

//   // 🚨 UPDATED Bottom Area
//   bottomLinksContainer: {
//     alignItems: 'center',
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//     marginBottom: verticalScale(5),
//   },
//   accountText: {
//     fontSize: moderateScale(13),
//     color: '#555',
//   },
//   privacyText: {
//     fontSize: moderateScale(12),
//     color: '#777',
//   },
  
//   // Security Badge
//   badgeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: moderateScale(20),
//     borderRadius: moderateScale(20),
//     alignSelf: 'center',
//     marginTop: verticalScale(25),
//   },
//   badgeShieldIcon: {
//     width: moderateScale(14),
//     height: moderateScale(14),
//     resizeMode: 'contain',
//   },
//   badgeText: {
//     fontSize: moderateScale(11),
//     color: '#666',
//     marginLeft: moderateScale(8),
//     fontWeight: '600',
//   },

//   // Country Picker Modal Engine Styles (Kept intact)
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: '#FFF',
//     borderTopLeftRadius: moderateScale(20),
//     borderTopRightRadius: moderateScale(20),
//     paddingHorizontal: moderateScale(24),
//     paddingTop: verticalScale(20),
//     paddingBottom: verticalScale(40),
//     maxHeight: '55%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: verticalScale(20),
//   },
//   modalTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: '800',
//     color: '#111',
//   },
//   countryOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(16),
//     borderBottomWidth: 1,
//     borderBottomColor: '#F0F2F5',
//   },
//   modalFlag: {
//     fontSize: moderateScale(18),
//     marginRight: moderateScale(14),
//   },
//   modalCountryName: {
//     flex: 1,
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//     color: '#333',
//   },
//   modalCallingCode: {
//     fontSize: moderateScale(15),
//     color: '#2962FF',
//     fontWeight: '700',
//   },

//   // 🚨 NEW Absolute Overlay Styles for Terms Modal
//   absoluteOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 9999,      
//     elevation: 100,    
//   },
//   termsModalContent: {
//     width: windowWidth * 0.85,
//     maxHeight: '80%',
//     backgroundColor: '#FFF',
//     borderRadius: moderateScale(15),
//     padding: moderateScale(20),
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//   },
//   termsModalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: verticalScale(15),
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     paddingBottom: verticalScale(10),
//   },
//   termsModalTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     color: '#333',
//   },
//   closeButton: {
//     padding: moderateScale(5),
//   },
//   termsModalScroll: {
//     marginTop: verticalScale(5),
//   },
//   termsModalSectionTitle: {
//     fontSize: moderateScale(15),
//     fontWeight: '700',
//     color: '#2962FF',
//   },
//   termsModalBodyText: {
//     fontSize: moderateScale(14),
//     color: '#555',
//     lineHeight: moderateScale(22),
//   },
// });