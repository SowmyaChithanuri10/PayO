// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Platform,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';

// import api from '../api/axios';
// import * as Keychain from 'react-native-keychain';
// import Icon from 'react-native-vector-icons/Feather';

// export default function OtpVerificationScreen({ route, navigation }) {
//   const { mobile, mode = 'register' } = route.params;

//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [timer, setTimer] = useState(30);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const inputs = useRef([]);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     startTimer();

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);

//   const startTimer = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }

//     setTimer(30);

//     intervalRef.current = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(intervalRef.current);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleChange = (text, index) => {
//     const numericText = text.replace(/[^0-9]/g, '');

//     const newOtp = [...otp];
//     newOtp[index] = numericText;
//     setOtp(newOtp);

//     if (error) setError('');

//     if (numericText && index < 3) {
//       inputs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   const saveToken = async (token) => {
//     try {
//       await Keychain.setGenericPassword('user', token);
//     } catch (e) {
//       console.log('Token save error:', e);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     const finalOtp = otp.join('');

//     if (finalOtp.length < 4) {
//       setError('Enter valid OTP');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');

//       let response;

//       if (mode === 'login') {
//         response = await api.post('/api/auth/verify-login-otp', {
//           mobile,
//           otp: finalOtp,
//         });
//       } else {
//         response = await api.post('/api/auth/verify-otp', {
//           mobile,
//           otp: finalOtp,
//         });
//       }

//       if (response.data.token) {
//         await saveToken(response.data.token);

//         if (mode === 'login') {
//           navigation.replace('Main');
//         } else {
//           navigation.replace('Profile');
//         }
//       } else {
//         setError('Invalid OTP');
//       }
//     } catch (error) {
//       console.log('VERIFY ERROR:', error?.response?.data || error.message);
//       setError(error?.response?.data?.message || 'Enter valid OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setError('');
//     setOtp(['', '', '', '']);

//     if (inputs.current[0]) {
//       inputs.current[0].focus();
//     }

//     try {
//       if (mode === 'login') {
//         await api.post('/api/auth/login-otp', { mobile });
//       } else {
//         await api.post('/api/auth/send-otp', { mobile });
//       }

//       startTimer();
//     } catch (error) {
//       console.log('RESEND ERROR:', error);
//       setError('Resend failed');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#F3F3F3" barStyle="dark-content" />

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
//                   color="#000"
//                 />
//               </TouchableOpacity>

//               <Text style={styles.titleCentered}>Verify Your Number</Text>
//             </View>

//             <Text style={styles.sub}>
//               Enter the 4 digit code sent to{"\n"}
//               <Text style={styles.sub}>+91 {mobile}</Text>
//             </Text>

//             <View style={styles.otpContainer}>
//               {otp.map((digit, index) => (
//                 <TextInput
//                   key={index}
//                   ref={(ref) => (inputs.current[index] = ref)}
//                   style={styles.box}
//                   keyboardType="number-pad"
//                   maxLength={1}
//                   value={digit}
//                   onChangeText={(text) => handleChange(text, index)}
//                   onKeyPress={(e) => handleKeyPress(e, index)}
//                 />
//               ))}
//             </View>

//             {error ? <Text style={styles.errorText}>{error}</Text> : null}

//             <Text style={styles.timer}>
//               Code expires in : 00:{timer < 10 ? `0${timer}` : timer}
//             </Text>

//             <Text style={styles.resend}>
//               Didn’t receive code?{' '}
//               <Text style={styles.link} onPress={handleResendOTP}>
//                 Resend Code
//               </Text>
//             </Text>

//             <TouchableOpacity
//               style={styles.button}
//               onPress={handleVerifyOTP}
//               disabled={loading}>
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>Verify OTP</Text>
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
//     backgroundColor: '#F3F3F3',
//   },

//   container: {
//     flex: 1,
//     backgroundColor: '#F3F3F3',
//     paddingHorizontal: wp('5%'),
//     paddingTop: hp('2%'),
//     paddingBottom: hp('3%'),
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: hp('1%'),
//     marginBottom: hp('3%'),
//   },

//   titleCentered: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: moderateScale(20),
//     fontWeight: '700',
//     color: '#000',
//     marginRight: wp('7%'),
//   },

//   sub: {
//     textAlign: 'center',
//     marginTop: hp('2%'),
//     color: '#666',
//     fontSize: moderateScale(13),
//     lineHeight: moderateScale(20),
//     paddingHorizontal: wp('5%'),
//   },

//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: hp('4%'),
//   },

//   box: {
//     width: wp('15%'),
//     height: hp('7%'),
//     borderWidth: 1,
//     borderColor: '#DADADA',
//     marginHorizontal: wp('1.2%'),
//     textAlign: 'center',
//     fontSize: moderateScale(20),
//     borderRadius: moderateScale(12),
//     backgroundColor: '#fff',
//     color: '#000',
//   },

//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     marginTop: hp('1.5%'),
//     fontSize: moderateScale(12),
//   },

//   timer: {
//     marginTop: hp('3%'),
//     textAlign: 'center',
//     fontSize: moderateScale(13),
//     color: '#444',
//   },

//   resend: {
//     marginTop: hp('1.5%'),
//     textAlign: 'center',
//     fontSize: moderateScale(13),
//     color: '#555',
//   },

//   link: {
//     color: '#5A00D1',
//     fontWeight: '600',
//   },

//   button: {
//     backgroundColor: '#5A00D1',
//     paddingVertical: hp('2%'),
//     borderRadius: moderateScale(12),
//     marginTop: hp('4%'),
//     alignItems: 'center',
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//   },

//   loginText: {
//     marginTop: hp('3%'),
//     textAlign: 'center',
//     fontSize: moderateScale(13),
//     color: '#555',
//   },

//   registerText: {
//     textAlign: 'center',
//     marginTop: hp('3%'),
//     color: '#555',
//     fontSize: moderateScale(13),
//   },

//   footer: {
//     marginTop: hp('1.5%'),
//     textAlign: 'center',
//     color: '#555',
//     fontSize: moderateScale(12),
//     lineHeight: moderateScale(18),
//     paddingHorizontal: wp('4%'),
//   },
// });
/////////////////////////////////////////////////////////
//updated code otp popup


// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Platform,
//   Image,
//   ScrollView,
//   Modal, // Modal for the resend popup
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import api from '../api/axios';
// import * as Keychain from 'react-native-keychain';
// import Icon from 'react-native-vector-icons/Feather';

// // Using your custom responsive utility
// import { moderateScale, verticalScale, windowWidth } from '../utils/responsive';
// import { NetworkInfo } from 'react-native-network-info';
// import DeviceInfo from 'react-native-device-info';

// export default function OtpVerificationScreen({ route, navigation }) {
//   const { mobile, type, userId, countryCode } = route.params || {};
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [timer, setTimer] = useState(45); 
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [focusedIndex, setFocusedIndex] = useState(0); 

//   // --- TESTING STAGE STATES (Only for Resend) ---
//   const [testOtp, setTestOtp] = useState('');
//   const [showOtpPopup, setShowOtpPopup] = useState(false);
//   // ----------------------------------------------

//   const inputs = useRef([]);
//   const intervalRef = useRef(null);

//   const maskedMobile = mobile ? `${mobile.substring(0, 1)}*******${mobile.substring(8)}` : '';
  
//   // Validation check: returns true only when all 4 slots contain a valid digit
//   const isOtpComplete = otp.join('').length === 4;

//   useEffect(() => {
//     startTimer();
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);

//   const startTimer = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//     setTimer(45);
//     intervalRef.current = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(intervalRef.current);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleChange = (text, index) => {
//     const numericText = text.replace(/[^0-9]/g, '');
//     const newOtp = [...otp];
//     newOtp[index] = numericText;
//     setOtp(newOtp);

//     if (error) setError('');

//     if (numericText && index < 3) {
//       inputs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
//       const newOtp = [...otp];
//       newOtp[index - 1] = ''; // Clears the number in the previous box
//       setOtp(newOtp);
//       inputs.current[index - 1]?.focus(); // Moves focus to the previous box
//     }
//   };

//   const saveToken = async (token) => {
//     try {
//       await Keychain.setGenericPassword('user', token);
//     } catch (e) {
//       console.log('Token save error:', e);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     const finalOtp = otp.join('');

//     if (finalOtp.length < 4) {
//       setError('Enter valid OTP');
//       return;
//     }

//       // if (type === 'login') {
//       //     //navigation.replace('Main');
//       //     navigation.replace('KYCVerification');
//       //   } else {
//       //     navigation.replace('OtpVerified');
//       //   }
    
//     try {
//       setLoading(true);
//       setError('');

//       let response;

//       // Conditional payload execution matching the verified postman format
//       if (type === 'login') {
//          const fetchedIp = await NetworkInfo.getIPAddress();
//          const uniqueId = await DeviceInfo.getUniqueId();
//          const deviceModel = await DeviceInfo.getModel();
//          const systemName = DeviceInfo.getSystemName();     
//          const systemVersion = DeviceInfo.getSystemVersion(); 
        
//         response = await api.post('/api/auth/verify-login-otp', {
//           mobile,
//           otp: finalOtp,
//           ipAddress: fetchedIp,      
//           deviceId: uniqueId, 
//           deviceName: deviceModel,
//           userAgent: `${systemName} ${systemVersion}`, 
//           location: "Hyderabad", 
//           country_code: countryCode
//         });
//       } else {
//         // Aligned with backend requirements from structural screenshot: uses userId and otp
//         response = await api.post('/api/auth/verify-otp', {
//           userId: userId,
//           otp: finalOtp,
//         });
//       }

//       console.log("response.data.token")
//       // Explicit status structural fallback matching image response status "200"
//       if (response.data?.token || response.data?.status === "200") {
//         if (response.data.token) {
//           await saveToken(response.data.token);
//         }
        
//         // Navigation branches dynamically based on flow initiation
//         if (type === 'login') {
//           navigation.replace('Main');
//         } else {
//           navigation.replace('OtpVerified');
//         }
//       } else {
//         setError(response.data?.message || 'Invalid OTP');
//       }
//     } catch (error) {
//       console.log('VERIFY ERROR:', error?.response?.data || error.message);
//       setError(error?.response?.data?.message || 'Enter valid OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     // Extra safety guard: prevents execution if clicked prematurely 
//     if (timer > 0) return;

//     setError('');
//     setOtp(['', '', '', '']);

//     if (inputs.current[0]) {
//       inputs.current[0].focus();
//     }

//     try {
//       let response;
//       if (type === 'login') {
//         response = await api.post('/api/auth/resend-login-otp', { mobile , mobile_cont_code: '+91', });
//       } else {
//         response = await api.post('/api/auth/resend-otp', { mobile , countryCode});
//       }
      
//       // Restarts the 45 seconds countdown timer and sets link state back to inactive
//       startTimer();

//       // --- TESTING STAGE ONLY: Capture OTP from Resend response and show popup ---
//       const receivedOtp = response.data?.otp || response.data?.data?.otp;
//       if (receivedOtp) {
//         setTestOtp(String(receivedOtp));
//         setShowOtpPopup(true);
//       }
//       // ---------------------------------------------------------------------------

//     } catch (error) {
//       console.log('RESEND ERROR:', error);
//       setError('Resend failed');
//     }
//   };
  
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />

//       {/* --- RESEND TESTING STAGE POPUP --- */}
//       <Modal
//         visible={showOtpPopup}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setShowOtpPopup(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalIconContainer}>
//               <Icon name="message-circle" size={moderateScale(28)} color="#2962FF" />
//             </View>
//             <Text style={styles.modalTitle}>Test OTP Received</Text>
//             <Text style={styles.modalOtpText}>{testOtp}</Text>
//             <Text style={styles.modalSubText}>Use this code to verify your number. (Testing Mode Only)</Text>
            
//             <TouchableOpacity
//               style={styles.modalCloseBtn}
//               onPress={() => setShowOtpPopup(false)}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.modalCloseBtnText}>Close & Enter OTP</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       {/* ---------------------------------- */}

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

//             {/* Title & Graphic Row */}
//             <View style={styles.heroRow}>
//               <View style={styles.titleCol}>
//                 <Text style={styles.titleBlack}>
//                   Verify Your <Text style={styles.titleBlue}>Number</Text>
//                 </Text>
//                 <Text style={styles.sub}>
//                   Enter the 4 digit code sent to{'\n'}
//                   <Text style={styles.subBlue}>+91 {maskedMobile}</Text>
//                 </Text>
//               </View>
              
//               <Image
//                 source={require('../../assets/images/Headerimg.png')} 
//                 style={styles.heroImg}
//               />
//             </View>

//             {/* OTP Input Boxes */}
//             <View style={styles.otpContainer}>
//               {otp.map((digit, index) => (
//                 <TextInput
//                   key={index}
//                   ref={(ref) => (inputs.current[index] = ref)}
//                   style={[
//                     styles.box,
//                     focusedIndex === index && styles.boxFocused,
//                     digit && styles.boxFilled, 
//                   ]}
//                   keyboardType="number-pad"
//                   maxLength={1}
//                   value={digit}
//                   onChangeText={(text) => handleChange(text, index)}
//                   onKeyPress={(e) => handleKeyPress(e, index)}
//                   onFocus={() => setFocusedIndex(index)}
//                   onBlur={() => setFocusedIndex(-1)}
//                 />
//               ))}
//             </View>

//             {error ? <Text style={styles.errorText}>{error}</Text> : null}

//             {/* Timer Row */}
//             <View style={styles.timerRow}>
//               <Image 
//                 source={require('../../assets/images/schedule.png')} 
//                 style={styles.clockIcon} 
//               />
//               <Text style={styles.timerText}>
//                 Code expires in : <Text style={styles.timerBlue}>00:{timer < 10 ? `0${timer}` : timer}</Text>
//               </Text>
//             </View>

//             {/* Resend Link Box */}
//             <View style={styles.resendContainer}>
//               <Text style={styles.resendText}>Didn't receive code? </Text>
//               <TouchableOpacity
//                 onPress={handleResendOTP}
//                 disabled={timer > 0}
//                 activeOpacity={0.7}
//                 style={[
//                   styles.resendBtn,
//                   timer > 0 && styles.resendBtnDisabled
//                 ]}
//               >
//                 <Text style={[
//                   styles.resendBtnText,
//                   timer > 0 && styles.resendBtnTextDisabled
//                 ]}>
//                   Resend OTP
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Secure & Private Banner */}
//             <View style={styles.secureBanner}>
//               <View style={styles.secureIconContainer}>
//                 <Image
//                   source={require('../../assets/images/vector.png')} 
//                   style={styles.secureShield}
//                 />
//               </View>
//               <View>
//                 <Text style={styles.secureTitle}>Secure & Private</Text>
//                 <Text style={styles.secureSubtitle}>We never share your details with anyone.</Text>
//               </View>
//             </View>

//             {/* Verify Button */}
//             <TouchableOpacity
//               style={[
//                 styles.primaryBtn, 
//                 { opacity: isOtpComplete && !loading ? 1 : 0.5 } 
//               ]}
//               onPress={handleVerifyOTP}
//               disabled={!isOtpComplete || loading} 
//               activeOpacity={0.8}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <View style={styles.btnContent}>
//                   <Text style={styles.buttonText}>Verify OTP</Text>
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

//             {/* Bottom Login/Register Link */}
//             {type === 'login' ? (
//               <Text style={styles.accountText}>
//                 Don't have an account?{' '}
//                 <Text
//                   style={styles.link}
//                   onPress={() =>
//                     navigation.navigate('RegisterMobile', {
//                       mode: 'register',
//                     })
//                   }
//                 >
//                   Register
//                 </Text>
//               </Text>
//             ) : (
//               <Text style={styles.accountText}>
//                 Already have an account?{' '}
//                 <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
//                   Login
//                 </Text>
//               </Text>
//             )}

//             {/* Spacer to push badge to bottom */}
//             <View style={{ flex: 1, minHeight: verticalScale(20) }} />

//             {/* Security Badge */}
//             <View style={styles.badgeContainer}>
//               <Image 
//                 source={require('../../assets/images/securelock.png')} 
//                 style={styles.lockIcon} 
//               />
//               <Text style={styles.badgeText}>100% Secure & Encrypted</Text>
//             </View>

//           </ScrollView>
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
//     backgroundColor: '#ffffff',
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingHorizontal: moderateScale(25),
//     paddingBottom: verticalScale(20),
//   },

//   // --- Modal Styles ---
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(20),
//   },
//   modalContent: {
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
//   modalIconContainer: {
//     width: moderateScale(60),
//     height: moderateScale(60),
//     borderRadius: moderateScale(30),
//     backgroundColor: '#E8EFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: verticalScale(15),
//   },
//   modalTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: verticalScale(10),
//   },
//   modalOtpText: {
//     fontSize: moderateScale(32),
//     fontWeight: '800',
//     color: '#2962FF',
//     letterSpacing: moderateScale(8),
//     marginBottom: verticalScale(10),
//   },
//   modalSubText: {
//     fontSize: moderateScale(13),
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: verticalScale(25),
//   },
//   modalCloseBtn: {
//     backgroundColor: '#5655FF',
//     width: '100%',
//     paddingVertical: verticalScale(12),
//     borderRadius: moderateScale(10),
//     alignItems: 'center',
//   },
//   modalCloseBtnText: {
//     color: '#FFF',
//     fontSize: moderateScale(15),
//     fontWeight: '700',
//   },
//   // --------------------

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
//     left: moderateScale(0),
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

//   // Hero Row (Title + Image)
//   heroRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: verticalScale(20),
//   },
//   titleCol: {
//     flex: 1,
//   },
//   titleBlack: {
//     fontSize: moderateScale(22),
//     fontWeight: '800',
//     color: '#000',
//   },
//   titleBlue: {
//     color: '#2962FF',
//   },
//   sub: {
//     marginTop: verticalScale(8),
//     color: '#555',
//     fontSize: moderateScale(14),
//     lineHeight: moderateScale(22),
//   },
//   subBlue: {
//     color: '#2962FF',
//     fontWeight: '600',
//   },
//   heroImg: {
//     width: moderateScale(120),
//     height: moderateScale(120),
//     resizeMode: 'contain',
//   },

//   // OTP Boxes
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center', 
//     marginTop: verticalScale(30),
//     gap: moderateScale(15), 
//   },
//   box: {
//     width: moderateScale(55), 
//     height: moderateScale(55),
//     borderWidth: 1.5,
//     borderColor: '#D0D5DD', 
//     borderRadius: moderateScale(12),
//     backgroundColor: '#FFF',
//     textAlign: 'center',
//     fontSize: moderateScale(24),
//     fontWeight: '600',
//     color: '#000',
//   },
//   boxFocused: {
//     borderColor: '#5655FF', 
//     backgroundColor: '#F5F5FF',
//   },
//   boxFilled: {
//     borderColor: '#5655FF', 
//   },

//   // Error Text
//   errorText: {
//     color: '#FF3B30',
//     textAlign: 'center',
//     marginTop: verticalScale(10),
//     fontSize: moderateScale(13),
//   },

//   // Timer & Resend
//   timerRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: verticalScale(25),
//   },
//   clockIcon: {
//     width: moderateScale(16),
//     height: moderateScale(16),
//     resizeMode: 'contain',
//   },
//   timerText: {
//     fontSize: moderateScale(13),
//     color: '#333',
//     marginLeft: moderateScale(6),
//     fontWeight: '500',
//   },
//   timerBlue: {
//     color: '#2962FF',
//     fontWeight: '700',
//   },
//   resendContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: verticalScale(15),
//   },
//   resendText: {
//     fontSize: moderateScale(13),
//     color: '#555',
//   },
//   resendBtn: {
//     paddingVertical: moderateScale(4),
//     paddingHorizontal: moderateScale(8),
//     borderRadius: moderateScale(6),
//     backgroundColor: '#E8EFFF', 
//   },
//   resendBtnDisabled: {
//     backgroundColor: '#F2F4F7',
//   },
//   resendBtnText: {
//     color: '#2962FF', 
//     fontWeight: '700',
//     fontSize: moderateScale(13),
//     textDecorationLine: 'underline',
//   },
//   resendBtnTextDisabled: {
//     color: '#98A2B3', 
//     textDecorationLine: 'none',
//   },

//   // Secure Banner
//   secureBanner: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F5F3FF', 
//     paddingVertical: moderateScale(12),
//     paddingHorizontal: moderateScale(15),
//     borderRadius: moderateScale(18),
//     marginTop: verticalScale(25),
//   },
//   secureIconContainer: {
//     width: moderateScale(30),
//     height: moderateScale(30),
//     borderRadius: moderateScale(8),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: moderateScale(12),
//   },
//   secureShield: {
//     width: moderateScale(24),
//     height: moderateScale(24),
//     resizeMode: 'contain',
//   },
//   secureTitle: {
//     fontSize: moderateScale(12),
//     fontWeight: '700',
//     color: '#333',
//   },
//   secureSubtitle: {
//     fontSize: moderateScale(11),
//     color: '#666',
//     marginTop: verticalScale(2),
//   },

//   // Primary Button
//   primaryBtn: {
//     backgroundColor: '#5655FF',
//     borderRadius: moderateScale(12),
//     height: verticalScale(50),
//     justifyContent: 'center',
//     alignItems: 'center',
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

//   // Bottom Links
//   accountText: {
//     textAlign: 'center',
//     fontSize: moderateScale(13),
//     color: '#555',
//   },
//   link: {
//     color: '#2962FF',
//     fontWeight: '600',
//     textDecorationLine: 'underline',
//   },

//   // Security Badge
//   badgeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginTop: verticalScale(20),
//   },
//   lockIcon: {
//     width: moderateScale(12),
//     height: moderateScale(12),
//     resizeMode: 'contain',
//   },
//   badgeText: {
//     fontSize: moderateScale(11),
//     color: '#666',
//     marginLeft: moderateScale(6),
//     fontWeight: '500',
//   },
// });

//////////////////////////////////////////////////////////////
//new code
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/axios';
import * as Keychain from 'react-native-keychain';
import Icon from 'react-native-vector-icons/Feather';

// Using your custom responsive utility
import { moderateScale, verticalScale, windowWidth } from '../utils/responsive';
import { NetworkInfo } from 'react-native-network-info';
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';

export default function OtpVerificationScreen({ route, navigation }) {
  // Destructured userId from parameters to align with the upload image payload signature
  const { mobile, type, userId,countryCode } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(45); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0); 

  const inputs = useRef([]);
  const intervalRef = useRef(null);

  const maskedMobile = mobile ? `${mobile.substring(0, 1)}*******${mobile.substring(8)}` : '';
  
  // Validation check: returns true only when all 4 slots contain a valid digit
  const isOtpComplete = otp.join('').length === 4;

  const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve(`${latitude}, ${longitude}`); // Returns e.g., "17.3850, 78.4867"
      },
      (error) => {
        console.warn("Error fetching location: ", error);
        resolve("Location Unavailable"); // Fallback so the app doesn't crash
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimer(45);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (text, index) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = numericText;
    setOtp(newOtp);

    if (error) setError('');

    if (numericText && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      const newOtp = [...otp];
      newOtp[index - 1] = ''; // Clears the number in the previous box
      setOtp(newOtp);
      inputs.current[index - 1]?.focus(); // Moves focus to the previous box
    }
  };

  const saveToken = async (token) => {
    try {
      await Keychain.setGenericPassword('user', token);
    } catch (e) {
      console.log('Token save error:', e);
    }
  };

  const handleVerifyOTP = async () => {
    const finalOtp = otp.join('');

    if (finalOtp.length < 4) {
      setError('Enter valid OTP');
      return;
    }
    // navigation.replace('WalletScreen');
    //  if (type === 'login') {
    //       navigation.replace('Main');
    //       // navigation.replace('WalletScreen');
    //       // navigation.replace('KYCVerification')
    //     } else {
    //       navigation.replace('OtpVerified');
    //     }
    
    try {
      setLoading(true);
      setError('');

      let response;

      // Conditional payload execution matching the verified postman format
      if (type === 'login') {
         const fetchedIp = await NetworkInfo.getIPAddress();
              const uniqueId = await DeviceInfo.getUniqueId();
              const deviceModel = await DeviceInfo.getModel();
              const systemName = DeviceInfo.getSystemName();     
              const systemVersion = DeviceInfo.getSystemVersion(); 
              const dynamicLocation = await getCurrentLocation();
        

        response = await api.post('/api/auth/verify-login-otp', {
          mobile,
          otp: finalOtp,
           ipAddress: fetchedIp,      
        deviceId: uniqueId, 
        deviceName: deviceModel,
        userAgent: `${systemName} ${systemVersion}`, 
        location: dynamicLocation, 
        country_code: countryCode
        });
//         if(response.data?.token || response.data?.status === "200"){
// navigation.replace('Main');
//         }
        
      } else {
        // Aligned with backend requirements from structural screenshot: uses userId and otp
        response = await api.post('/api/auth/verify-otp', {
          userId: userId,
          otp: finalOtp,
          country_code: countryCode

        });
      }

      console.log("response.data.token")
      // Explicit status structural fallback matching image response status "200"
      if (response.data?.token || response.data?.status === "200") {
        if (response.data.token) {
          await saveToken(response.data.token);
        }
        
        // Navigation branches dynamically based on flow initiation
        if (type === 'login') {
          navigation.replace('Main');
          // navigation.replace('WalletScreen');
          // navigation.replace('KYCVerification')
        } else {
          navigation.replace('OtpVerified');
        }
      } else {
        setError(response.data?.message || 'Invalid OTP');
      }
    } catch (error) {
      console.log('VERIFY ERROR:', error?.response?.data || error.message);
      setError(error?.response?.data?.message || 'Enter valid OTP');
    } finally {
      setLoading(false);
    }
  };

  // const handleResendOTP = async () => {
  //   setError('');
  //   setOtp(['', '', '', '']);

  //   if (inputs.current[0]) {
  //     inputs.current[0].focus();
  //   }

  //   try {
  //     if (type === 'login') {
  //       await api.post('/api/auth/login-otp', { mobile });
  //     } else {
  //       await api.post('/api/auth/send-otp', { mobile });
  //     }
  //     startTimer();
  //   } catch (error) {
  //     console.log('RESEND ERROR:', error);
  //     setError('Resend failed');
  //   }
  // };


  const handleResendOTP = async () => {
    // Extra safety guard: prevents execution if clicked prematurely 
    if (timer > 0) return;

    setError('');
    setOtp(['', '', '', '']);

    if (inputs.current[0]) {
      inputs.current[0].focus();
    }

    try {
      if (type === 'login') {
        await api.post('/api/auth/resend-login-otp', { mobile , mobile_cont_code: '+91', });
      } else {
        await api.post('/api/auth/resend-otp', { mobile , countryCode});
      }
      // Restarts the 45 seconds countdown timer and sets link state back to inactive
      startTimer();
    } catch (error) {
      console.log('RESEND ERROR:', error);
      setError('Resend failed');
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

            {/* Title & Graphic Row */}
            <View style={styles.heroRow}>
              <View style={styles.titleCol}>
                <Text style={styles.titleBlack}>
                  Verify Your <Text style={styles.titleBlue}>Number</Text>
                </Text>
                <Text style={styles.sub}>
                  Enter the 4 digit code sent to{'\n'}
                  <Text style={styles.subBlue}>+91 {maskedMobile}</Text>
                </Text>
              </View>
              
              <Image
                source={require('../../assets/images/Headerimg.png')} 
                style={styles.heroImg}
              />
            </View>

            {/* OTP Input Boxes */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  style={[
                    styles.box,
                    focusedIndex === index && styles.boxFocused,
                    digit && styles.boxFilled, 
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(-1)}
                />
              ))}
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Timer Row */}
            <View style={styles.timerRow}>
              <Image 
                source={require('../../assets/images/schedule.png')} 
                style={styles.clockIcon} 
              />
              <Text style={styles.timerText}>
                Code expires in : <Text style={styles.timerBlue}>00:{timer < 10 ? `0${timer}` : timer}</Text>
              </Text>
            </View>

            {/* Resend Link */}
            {/* <Text style={styles.resendText}>
              Didn't receive code?{' '}
              <Text
                style={[styles.link, { opacity: timer === 0 ? 1 : 0.5 }]}
                onPress={timer === 0 ? handleResendOTP : null}
              >
                Resend Code
              </Text>
            </Text> */}

        {/* Resend Link Box */}
<View style={styles.resendContainer}>
  <Text style={styles.resendText}>Didn't receive code? </Text>
  <TouchableOpacity
    onPress={handleResendOTP}
    disabled={timer > 0}
    activeOpacity={0.7}
    style={[
      styles.resendBtn,
      timer > 0 && styles.resendBtnDisabled
    ]}
  >
    <Text style={[
      styles.resendBtnText,
      timer > 0 && styles.resendBtnTextDisabled
    ]}>
      Resend OTP
    </Text>
  </TouchableOpacity>
</View>

            {/* Secure & Private Banner */}
            <View style={styles.secureBanner}>
              <View style={styles.secureIconContainer}>
                <Image
                  source={require('../../assets/images/vector.png')} 
                  style={styles.secureShield}
                />
              </View>
              <View>
                <Text style={styles.secureTitle}>Secure & Private</Text>
                <Text style={styles.secureSubtitle}>We never share your details with anyone.</Text>
              </View>
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[
                styles.primaryBtn, 
                { opacity: isOtpComplete && !loading ? 1 : 0.5 } // Visual validation rule indicator
              ]}
              onPress={handleVerifyOTP}
              disabled={!isOtpComplete || loading} // Programmatic execution lock
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.btnContent}>
                  <Text style={styles.buttonText}>Verify OTP</Text>
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

            {/* Bottom Login/Register Link */}
            {type === 'login' ? (
              <Text style={styles.accountText}>
                Don't have an account?{' '}
                <Text
                  style={styles.link}
                  onPress={() =>
                    navigation.navigate('RegisterMobile', {
                      mode: 'register',
                    })
                  }
                >
                  Register
                </Text>
              </Text>
            ) : (
              <Text style={styles.accountText}>
                Already have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                  Login
                </Text>
              </Text>
            )}

            {/* Spacer to push badge to bottom */}
            <View style={{ flex: 1, minHeight: verticalScale(20) }} />

            {/* Security Badge */}
            <View style={styles.badgeContainer}>
              <Image 
                source={require('../../assets/images/securelock.png')} 
                style={styles.lockIcon} 
              />
              <Text style={styles.badgeText}>100% Secure & Encrypted</Text>
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    paddingHorizontal: moderateScale(25),
    paddingBottom: verticalScale(20),
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
    left: moderateScale(0),
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

  // Hero Row (Title + Image)
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  titleCol: {
    flex: 1,
  },
  titleBlack: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: '#000',
  },
  titleBlue: {
    color: '#2962FF',
  },
  sub: {
    marginTop: verticalScale(8),
    color: '#555',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
  },
  subBlue: {
    color: '#2962FF',
    fontWeight: '600',
  },
  heroImg: {
    width: moderateScale(120),
    height: moderateScale(120),
    resizeMode: 'contain',
  },

  // OTP Boxes
  otpContainer: {
    flexDirection: 'row',
    // 🚨 FIX: Changed from 'space-between' to 'center' to group them together
    justifyContent: 'center', 
    marginTop: verticalScale(30),
    // 🚨 FIX: Added a fixed gap to control the exact spacing between boxes
    gap: moderateScale(15), 
  },
  box: {
    // 🚨 FIX: Slightly increased size to match Figma
    width: moderateScale(55), 
    height: moderateScale(55),
    borderWidth: 1.5,
    borderColor: '#D0D5DD', 
    borderRadius: moderateScale(12),
    backgroundColor: '#FFF',
    textAlign: 'center',
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: '#000',
  },
  boxFocused: {
    borderColor: '#5655FF', 
    backgroundColor: '#F5F5FF',
  },
  boxFilled: {
    borderColor: '#5655FF', 
  },

  // Error Text
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: verticalScale(10),
    fontSize: moderateScale(13),
  },

  // Timer & Resend
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(25),
  },
  clockIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: 'contain',
  },
  timerText: {
    fontSize: moderateScale(13),
    color: '#333',
    marginLeft: moderateScale(6),
    fontWeight: '500',
  },
  timerBlue: {
    color: '#2962FF',
    fontWeight: '700',
  },
  // resendText: {
  //   textAlign: 'center',
  //   fontSize: moderateScale(13),
  //   color: '#555',
  //   marginTop: verticalScale(10),
  // },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  resendText: {
    fontSize: moderateScale(13),
    color: '#555',
  },
  resendBtn: {
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(6),
    backgroundColor: '#E8EFFF', // Light blue background when active
  },
  resendBtnDisabled: {
    backgroundColor: '#F2F4F7', // Gray background when disabled
  },
  resendBtnText: {
    color: '#2962FF', // High-contrast blue
    fontWeight: '700',
    fontSize: moderateScale(13),
    textDecorationLine: 'underline',
  },
  resendBtnTextDisabled: {
    color: '#98A2B3', // Muted gray text when disabled
    textDecorationLine: 'none',
  },

  // Secure Banner
  secureBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF', 
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(18),
    marginTop: verticalScale(25),
  },
  secureIconContainer: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  secureShield: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
  },
  secureTitle: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#333',
  },
  secureSubtitle: {
    fontSize: moderateScale(11),
    color: '#666',
    marginTop: verticalScale(2),
  },

  // Primary Button
  primaryBtn: {
    backgroundColor: '#5655FF',
    borderRadius: moderateScale(12),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
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

  // Bottom Links
  accountText: {
    textAlign: 'center',
    fontSize: moderateScale(13),
    color: '#555',
  },
  link: {
    color: '#2962FF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  // Security Badge
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },
  lockIcon: {
    width: moderateScale(12),
    height: moderateScale(12),
    resizeMode: 'contain',
  },
  badgeText: {
    fontSize: moderateScale(11),
    color: '#666',
    marginLeft: moderateScale(6),
    fontWeight: '500',
  },
});

