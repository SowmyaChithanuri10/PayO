// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Platform,
//   ScrollView,
// } from 'react-native';

// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// import api from '../api/axios';
// import * as Keychain from 'react-native-keychain';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';

// export default function LoginScreen({ navigation }) {
//   const insets = useSafeAreaInsets();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState('');

//   const [errors, setErrors] = useState({
//     email: '',
//     password: '',
//   });

//   const validate = () => {
//     let valid = true;
//     let newErrors = {
//       email: '',
//       password: '',
//     };

//     if (!email.trim()) {
//       newErrors.email = 'Email is required';
//       valid = false;
//     }

//     if (!password.trim()) {
//       newErrors.password = 'Password is required';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     try {
//       const response = await api.post('/api/auth/login', {
//         email,
//         password,
//       });

//       if (response?.data?.message === 'Login success') {
//         const token = response?.data?.token;

//         await Keychain.setGenericPassword('userToken', token);

//         setMessage('');
//         navigation.navigate('Main');
//       } else {
//         setMessage(response?.data?.message || 'Login failed');
//       }
//     } catch (error) {
//       setMessage(
//         error?.response?.data?.message ||
//           error?.message ||
//           'Something went wrong',
//       );
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
//       <StatusBar backgroundColor="#EAEAEA" barStyle="dark-content" />

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <ScrollView
//             contentContainerStyle={[
//               styles.scrollContent,
//               {
//                 paddingBottom:
//                   insets.bottom > 0
//                     ? insets.bottom + moderateScale(20)
//                     : moderateScale(25),
//               },
//             ]}
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//           >
//             <View style={styles.header}>
//               <TouchableOpacity
//                 onPress={() => navigation.goBack()}
//                 style={styles.backButton}
//               >
//                 <Icon
//                   name="chevron-left"
//                   size={moderateScale(28)}
//                   color="#000"
//                 />
//               </TouchableOpacity>

//               <Text style={styles.titleCentered}>Login to Payo</Text>
//             </View>

//             <Text style={styles.sub}>
//               Welcome back! Please enter your details.
//             </Text>

//             {message ? (
//               <Text style={styles.messageText}>{message}</Text>
//             ) : null}

//             <Text style={styles.label}>Email ID</Text>

//             <TextInput
//               style={[styles.input, errors.email && styles.errorInput]}
//               placeholder="your@email.com"
//               placeholderTextColor="#999"
//               value={email}
//               autoCapitalize="none"
//               keyboardType="email-address"
//               onChangeText={(text) => {
//                 setEmail(text);
//                 setErrors((prev) => ({
//                   ...prev,
//                   email: '',
//                 }));
//               }}
//             />

//             {errors.email ? (
//               <Text style={styles.errorText}>{errors.email}</Text>
//             ) : null}

//             <Text style={styles.label}>Password</Text>

//             <View
//               style={[
//                 styles.passwordContainer,
//                 errors.password && styles.errorInput,
//               ]}
//             >
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Your password"
//                 placeholderTextColor="#999"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={(text) => {
//                   setPassword(text);
//                   setErrors((prev) => ({
//                     ...prev,
//                     password: '',
//                   }));
//                 }}
//               />

//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Icon
//                   name={showPassword ? 'eye' : 'eye-off'}
//                   size={moderateScale(18)}
//                   color="#555"
//                 />
//               </TouchableOpacity>
//             </View>

//             {errors.password ? (
//               <Text style={styles.errorText}>{errors.password}</Text>
//             ) : null}

//             <TouchableOpacity
//               onPress={() => navigation.navigate('ForgotPasswordScreen')}
//             >
//               <Text style={styles.forgot}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.button}
//               onPress={handleSubmit}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.buttonText}>Submit</Text>
//             </TouchableOpacity>

//             <View style={styles.orRow}>
//               <View style={styles.line} />
//               <Text style={styles.or}>OR</Text>
//               <View style={styles.line} />
//             </View>

//             <TouchableOpacity
//               style={styles.otpBtn}
//               onPress={() =>
//                 navigation.navigate('RegisterMobile', {
//                   mode: 'login',
//                 })
//               }
//               activeOpacity={0.8}
//             >
//               <Text style={styles.otpText}>Login with OTP</Text>
//             </TouchableOpacity>

//             <Text style={styles.registerText}>
//               Don’t have an account?{' '}
//               <Text
//                 style={styles.link}
//                 onPress={() =>
//                   navigation.navigate('RegisterMobile', {
//                     mode: 'register',
//                   })
//                 }
//               >
//                 Register
//               </Text>
//             </Text>
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
//     backgroundColor: '#EAEAEA',
//   },

//   scrollContent: {
//     paddingHorizontal: wp('5%'),
//     paddingTop: hp('2%'),
//     flexGrow: 1,
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: hp('1%'),
//     marginBottom: hp('2%'),
//   },

//   backButton: {
//     padding: moderateScale(4),
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
//     marginTop: hp('1%'),
//     marginBottom: hp('4%'),
//     color: '#666',
//     fontSize: moderateScale(13),
//     lineHeight: moderateScale(20),
//     paddingHorizontal: wp('3%'),
//   },

//   messageText: {
//     color: 'red',
//     marginBottom: hp('1.5%'),
//     textAlign: 'center',
//     fontSize: moderateScale(12),
//   },

//   label: {
//     fontSize: moderateScale(12),
//     color: '#333',
//     marginBottom: hp('0.7%'),
//     fontWeight: '700',
//     paddingLeft: wp('1%'),
//   },

//   input: {
//     backgroundColor: '#fff',
//     borderRadius: moderateScale(12),
//     paddingVertical: hp('1.8%'),
//     paddingHorizontal: wp('4%'),
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     fontSize: moderateScale(14),
//     color: '#000',
//     marginBottom: hp('1%'),
//   },

//   passwordContainer: {
//     backgroundColor: '#fff',
//     borderRadius: moderateScale(12),
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     paddingHorizontal: wp('4%'),
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   passwordInput: {
//     flex: 1,
//     paddingVertical: hp('1.8%'),
//     fontSize: moderateScale(14),
//     color: '#000',
//   },

//   errorInput: {
//     borderColor: 'red',
//   },

//   errorText: {
//     color: 'red',
//     marginBottom: hp('1%'),
//     fontSize: moderateScale(11),
//   },

//   forgot: {
//     textAlign: 'right',
//     marginTop: hp('1%'),
//     color: '#5A00D1',
//     fontSize: moderateScale(12),
//   },

//   button: {
//     backgroundColor: '#5A00D1',
//     paddingVertical: hp('2%'),
//     borderRadius: moderateScale(10),
//     alignItems: 'center',
//     marginTop: hp('3%'),
//   },

//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: moderateScale(15),
//   },

//   orRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: hp('3%'),
//   },

//   line: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#ccc',
//   },

//   or: {
//     marginHorizontal: wp('3%'),
//     color: '#777',
//     fontSize: moderateScale(13),
//   },

//   otpBtn: {
//     borderWidth: 2,
//     borderColor: '#5A00D1',
//     paddingVertical: hp('2%'),
//     borderRadius: moderateScale(10),
//     alignItems: 'center',
//   },

//   otpText: {
//     color: '#5A00D1',
//     fontWeight: '600',
//     fontSize: moderateScale(15),
//   },

//   registerText: {
//     textAlign: 'center',
//     marginTop: hp('3%'),
//     color: '#555',
//     fontSize: moderateScale(13),
//   },

//   link: {
//     color: '#5A00D1',
//     fontWeight: '600',
//   },
// });


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Platform,
//   ScrollView,
//   Image,
// } from 'react-native';

// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// import NetInfo from '@react-native-community/netinfo';
// import api from '../api/axios';
// import * as Keychain from 'react-native-keychain';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { scale, verticalScale, moderateScale, windowWidth } from '../utils/responsive';

// export default function LoginScreen({ navigation }) {
//   const insets = useSafeAreaInsets();

//   // --- UI STATE ---
//   const [mobile, setMobile] = useState('');

//   // --- EXISTING STATE ---
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState('');
//   const [isConnected, setIsConnected] = useState(true);

//   const [errors, setErrors] = useState({
//     email: '',
//     password: '',
//   });

//   // Validation Rule: Checks if the input contains exactly 10 characters
//   const isMobileValid = mobile?.length === 10;

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//     });
//     return () => unsubscribe();
//   }, []);

//   // --- SUBMIT HANDLE ROUTINE ---
//   // const handleLoginWithOTP = () => {
//   //   if (!isConnected || !isMobileValid) return;
    
//   //   // Navigates directly to your generic OTP verification screen payload route
//   // //   navigation.navigate('OTP', { 
//   // //     mobile, 
//   // //     type: 'login' 
//   // //   });
//   // // };

//   // // --- EXISTING VALIDATE FUNCTION (Preserved) ---
//   // const validate = () => {
//   //   let valid = true;
//   //   let newErrors = {
//   //     email: '',
//   //     password: '',
//   //   };
//   //   if (!email.trim()) {
//   //     newErrors.email = 'Email is required';
//   //     valid = false;
//   //   }
//   //   if (!password.trim()) {
//   //     newErrors.password = 'Password is required';
//   //     valid = false;
//   //   }
//   //   setErrors(newErrors);
//   //   return valid;
//   // };

//   // --- EXISTING SUBMIT FUNCTION (Preserved) ---
//   const handleLoginWithOTP = async () => {
//     if (!isConnected) {
//       setMessage('No internet connection');
//       return;
//     }
//     // if (!validate()) return;
//     try {
//       const response = await api.post('/api/auth/login', {
//         email,
//         password,
//       });
//       if (response?.data?.message === 'Login success') {
//         const token = response?.data?.token;

//         // Save token
//         await Keychain.setGenericPassword('userToken', token);
//         setMessage('');

//         if (response.data.kycStatus === 'approved') {
//           navigation.navigate('Main');
//           await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
//         } else if (response.data.kycStatus === 'not_started') {
//           navigation.navigate('KycNotStarted');
//         } else if (response.data.kycStatus === "under_review") {
//           navigation.navigate('KycUnderReview');
//         } else {
//           setMessage(response?.data?.message || 'Login failed');
//         }
//       } else {
//         setMessage(response?.data?.message || 'Login failed');
//       }
//     } catch (error) {
//       if (error?.response?.data?.kycStatus == "rejected") {
//         navigation.navigate('KycFail');
//       } else {
//         setMessage(
//           error?.response?.data?.message ||
//             error?.message ||
//             'Something went wrong',
//         );
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
//       <StatusBar backgroundColor="#F9FBF9" barStyle="dark-content" />

//       {!isConnected && (
//         <View style={styles.internetBar}>
//           <Text style={styles.internetText}>No Internet Connection</Text>
//         </View>
//       )}

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.flex}>
            
//             <ScrollView
//               contentContainerStyle={[
//                 styles.scrollContent,
//                 {
//                   paddingBottom: insets.bottom > 0 ? insets.bottom + moderateScale(20) : moderateScale(25),
//                 },
//               ]}
//               keyboardShouldPersistTaps="handled"
//               showsVerticalScrollIndicator={false}
//             >
              
//               {/* Top Logo Container */}
//               <View style={styles.logoWrapper}>
//                 <Image 
//                   source={require('../../assets/images/LogoContainer.png')} 
//                   style={styles.logoImage} 
//                   resizeMode="contain" 
//                 />
//               </View>

//               {/* Welcome Section */}
//               <View style={styles.welcomeContainer}>
//                 <View style={styles.welcomeRow}>
//                   <Text style={styles.welcomeTitle}>Welcome Back!</Text>
//                   <Image 
//                     source={require('../../assets/images/HandIcon.png')} 
//                     style={styles.handIcon} 
//                     resizeMode="contain" 
//                   />
//                 </View>
//                 <Text style={styles.welcomeSub}>Login to access your PAYO wallet</Text>
//               </View>

//               {/* Input Section */}
//               <View style={styles.inputSection}>
//                 <Text style={styles.inputLabel}>Mobile Number</Text>
//                 <View style={[
//                   styles.inputContainer,
//                   !isMobileValid && styles.inputContainerInvalid
//                 ]}>
//                   {/* Country Code */}
//                   <View style={styles.countryCodeBox}>
//                     <Text style={styles.flagEmoji}>🇮🇳</Text>
//                     <Text style={styles.countryCodeText}>+91</Text>
//                     <Icon name="chevron-down" size={moderateScale(16)} color="#111827" />
//                   </View>
                  
//                   {/* Divider */}
//                   <View style={styles.verticalDivider} />
                  
//                   {/* Text Input */}
//                   <TextInput
//                     style={styles.textInput}
//                     placeholder="Enter mobile number"
//                     placeholderTextColor="#9CA3AF"
//                     keyboardType="phone-pad"
//                     value={mobile}
//                     onChangeText={(text) => {
//                       const numeric = text.replace(/[^0-9]/g, '');
//                       setMobile(numeric);
//                     }}
//                     maxLength={10}
//                   />
//                 </View>
//               </View>

//               {/* Primary Action Button -> Modified to route directly to OTP screen */}
//               <TouchableOpacity
//                 style={[
//                   styles.primaryButton, 
//                   (!isConnected || !isMobileValid) && styles.disabledButton
//                 ]}
//                 onPress={handleLoginWithOTP}
//                 activeOpacity={0.8}
//                 disabled={!isConnected || !isMobileValid}
//               >
//                 <View style={styles.btnContentLeft}>
//                   <Image 
//                     source={require('../../assets/images/OTPIcon.png')} 
//                     style={styles.btnIconLeft} 
//                     resizeMode="contain" 
//                     tintColor="#FFFFFF"
//                   />
//                   <Text style={styles.primaryButtonText}>Login with OTP</Text>
//                 </View>
//                 <Icon name="arrow-right" size={moderateScale(20)} color="#FFF" style={styles.btnIconRight} />
//               </TouchableOpacity>

//               {/* Security Trust Banner */}
//               <View style={styles.securityBanner}>
//                 <Image 
//                   source={require('../../assets/images/locksecure.png')} 
//                   style={styles.bannerBgIcon} 
//                   resizeMode="cover" 
//                 />
                
//                 <View style={styles.bannerContent}>
//                   <Image 
//                     source={require('../../assets/images/Security-Icon.png')} 
//                     style={styles.securityShield} 
//                     resizeMode="contain" 
//                   />
//                   <View style={styles.securityTextContainer}>
//                     <Text style={styles.securityTitle}>Secure & Trusted</Text>
//                     <Text style={styles.securitySub}>Your account is protected with bank -grade security.</Text>
//                   </View>
//                 </View>
//               </View>

//             </ScrollView>

//             {/* Bottom Footer */}
//             <View style={[styles.footer, { paddingBottom: insets.bottom || moderateScale(20) }]}>
//               <Text style={styles.footerText}>
//                 New to PAYO ?{' '}
//                 <Text 
//                   style={styles.footerLink} 
//                   onPress={() => isConnected && navigation.navigate('RegisterMobile', { mode: 'register' })}
//                 >
//                   Create an account
//                 </Text>
//               </Text>
//             </View>

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
//     backgroundColor: '#ffffff',
//   },
//   internetBar: {
//     width: '100%',
//     backgroundColor: '#EF4444',
//     paddingVertical: hp('1%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   internetText: {
//     color: '#fff',
//     fontSize: moderateScale(12),
//     fontWeight: '700',
//   },
//   scrollContent: {
//     paddingHorizontal: wp('6%'),
//     flexGrow: 1,
//   },
//   logoWrapper: {
//     alignItems: 'center',
//     marginTop: verticalScale(30),
//     marginBottom: verticalScale(30),
//   },
//   logoImage: {
//     width: moderateScale(160),
//     height: moderateScale(55),
//   },
//   welcomeContainer: {
//     marginBottom: verticalScale(30),
//   },
//   welcomeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(6),
//   },
//   welcomeTitle: {
//     fontSize: moderateScale(26),
//     fontWeight: '800',
//     color: '#111827',
//   },
//   handIcon: {
//     width: moderateScale(24),
//     height: moderateScale(24),
//     marginLeft: moderateScale(10),
//   },
//   welcomeSub: {
//     fontSize: moderateScale(14),
//     color: '#4B5563',
//     fontWeight: '500',
//   },
//   inputSection: {
//     marginBottom: verticalScale(25),
//   },
//   inputLabel: {
//     fontSize: moderateScale(13),
//     color: '#374151',
//     fontWeight: '600',
//     marginBottom: verticalScale(10),
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1.5,
//     borderColor: '#4F46E5', 
//     borderRadius: moderateScale(12),
//     height: verticalScale(55),
//     paddingHorizontal: moderateScale(15),
//   },
//   inputContainerInvalid: {
//     borderColor: '#D1D5DB', // Muted container border color if number input criteria isn't met
//   },
//   countryCodeBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flagEmoji: {
//     fontSize: moderateScale(16),
//   },
//   countryCodeText: {
//     fontSize: moderateScale(14),
//     color: '#111827',
//     fontWeight: '500',
//     marginHorizontal: moderateScale(6),
//   },
//   verticalDivider: {
//     width: 1,
//     height: '50%',
//     backgroundColor: '#D1D5DB',
//     marginHorizontal: moderateScale(10),
//   },
//   textInput: {
//     flex: 1,
//     fontSize: moderateScale(14.5),
//     color: '#111827',
//     fontWeight: '500',
//     padding: 0, 
//   },
//   primaryButton: {
//     backgroundColor: '#4F46E5',
//     borderRadius: moderateScale(12),
//     height: verticalScale(55),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#4F46E5',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   disabledButton: {
//     opacity: 0.5,
//   },
//   btnContentLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'absolute',
//     left: '30%',
//   },
//   btnIconLeft: {
//     width: moderateScale(18),
//     height: moderateScale(18),
//     marginRight: moderateScale(10),
//   },
//   primaryButtonText: {
//     color: '#FFFFFF',
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//   },
//   btnIconRight: {
//     position: 'absolute',
//     right: moderateScale(20),
//   },
//   securityBanner: {
//     backgroundColor: '#F4F3FF',
//     borderRadius: moderateScale(14),
//     marginTop: verticalScale(40),
//     height: verticalScale(90),
//     overflow: 'hidden',
//     justifyContent: 'center',
//   },
//   bannerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(16),
//     zIndex: 2,
//   },
//   securityShield: {
//     width: moderateScale(34),
//     height: moderateScale(34),
//     marginRight: moderateScale(12),
//   },
//   securityTextContainer: {
//     flex: 1,
//     paddingRight: moderateScale(40), 
//   },
//   securityTitle: {
//     fontSize: moderateScale(12),
//     fontWeight: '700',
//     color: '#374151',
//     marginBottom: verticalScale(3),
//   },
//   securitySub: {
//     fontSize: moderateScale(10.5),
//     color: '#6B7280',
//     lineHeight: moderateScale(14),
//   },
//   bannerBgIcon: {
//     position: 'absolute',
//     right: moderateScale(-20),
//     top: moderateScale(-10),
//     width: moderateScale(160),
//     height: moderateScale(110),
//     opacity: 0.5,
//     zIndex: 1,
//   },
//   footer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: verticalScale(10),
//   },
//   footerText: {
//     fontSize: moderateScale(14),
//     color: '#4B5563',
//     fontWeight: '500',
//   },
//   footerLink: {
//     color: '#2563EB',
//     fontWeight: '700',
//   },
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Platform,
//   ScrollView,
//   Image,
// } from 'react-native';

// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// import NetInfo from '@react-native-community/netinfo';
// import api from '../api/axios';
// import * as Keychain from 'react-native-keychain';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { scale, verticalScale, moderateScale, windowWidth } from '../utils/responsive';

// export default function LoginScreen({ navigation }) {
//   const insets = useSafeAreaInsets();

//   // --- UI STATE ---
//   const [mobile, setMobile] = useState('');
//   const [message, setMessage] = useState('');
//   const [isConnected, setIsConnected] = useState(true);

//   // Validation Rule: Checks if the input contains exactly 10 characters
//   const isMobileValid = mobile?.length === 10;
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);

//     useEffect(() => {
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

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//     });
//     return () => unsubscribe();
//   }, []);



//   // --- SUBMIT FUNCTION ---
//   const handleLoginWithOTP = async () => {
//     if (!isConnected) {
//       setMessage('No internet connection');
//       return;
//     }

//     if (!isMobileValid) return;

//     try {
//       // API call matching requested mobile & countryCode payload criteria
//       const response = await api.post('/api/auth/login', {
//         mobile,
//         mobile_cont_code: '+91',
//       });

//       if (response?.data?.Message === 'Login OTP generated') {

//           navigation.navigate('OTP', { 
//       mobile, 
//       type: 'login' 
//     });
  
//         // const token = response?.data?.token;

//         // // Save token
//         // await Keychain.setGenericPassword('userToken', token);
//         // setMessage('');

//         // if (response.data.kycStatus === 'approved') {
//         //   navigation.navigate('Main');
//         //   await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
//         // } else if (response.data.kycStatus === 'not_started') {
//         //   navigation.navigate('KycNotStarted');
//         // } else if (response.data.kycStatus === "under_review") {
//         //   navigation.navigate('KycUnderReview');
//         // } else {
//         //   setMessage(response?.data?.message || 'Login failed');
//         // }
//       } else {
//         setMessage(response?.data?.message || 'Login failed');
//       }
//     } catch (error) {
//       if (error?.response?.data?.kycStatus == "rejected") {
//         navigation.navigate('KycFail');
//       } else {
//         setMessage(
//           error?.response?.data?.message ||
//             error?.message ||
//             'Something went wrong',
//         );
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
//       <StatusBar backgroundColor="#F9FBF9" barStyle="dark-content" />

//       {!isConnected && (
//         <View style={styles.internetBar}>
//           <Text style={styles.internetText}>No Internet Connection</Text>
//         </View>
//       )}

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.flex}>
            
//             <ScrollView
//               contentContainerStyle={[
//                 styles.scrollContent,
//                 {
//                   paddingBottom: insets.bottom > 0 ? insets.bottom + moderateScale(20) : moderateScale(25),
//                 },
//               ]}
//               keyboardShouldPersistTaps="handled"
//               showsVerticalScrollIndicator={false}
//             >
              
//               {/* Top Logo Container */}
//               <View style={styles.logoWrapper}>
//                 <Image 
//                   source={require('../../assets/images/LogoContainer.png')} 
//                   style={styles.logoImage} 
//                   resizeMode="contain" 
//                 />
//               </View>

//               {/* Welcome Section */}
//               <View style={styles.welcomeContainer}>
//                 <View style={styles.welcomeRow}>
//                   <Text style={styles.welcomeTitle}>Welcome Back!</Text>
//                   <Image 
//                     source={require('../../assets/images/HandIcon.png')} 
//                     style={styles.handIcon} 
//                     resizeMode="contain" 
//                   />
//                 </View>
//                 <Text style={styles.welcomeSub}>Login to access your PAYO wallet</Text>
//               </View>

//               {/* Input Section */}
//               <View style={styles.inputSection}>
//                 <Text style={styles.inputLabel}>Mobile Number</Text>
//                 <View style={[
//                   styles.inputContainer,
//                   !isMobileValid && styles.inputContainerInvalid
//                 ]}>
//                   {/* Country Code */}
//                   <View style={styles.countryCodeBox}>
//                     <Text style={styles.flagEmoji}>🇮🇳</Text>
//                     <Text style={styles.countryCodeText}>+91</Text>
//                     <Icon name="chevron-down" size={moderateScale(16)} color="#111827" />
//                   </View>
                  
//                   {/* Divider */}
//                   <View style={styles.verticalDivider} />
                  
//                   {/* Text Input */}
//                   <TextInput
//                     style={styles.textInput}
//                     placeholder="Enter mobile number"
//                     placeholderTextColor="#9CA3AF"
//                     keyboardType="phone-pad"
//                     value={mobile}
//                     onChangeText={(text) => {
//                       const numeric = text.replace(/[^0-9]/g, '');
//                       setMobile(numeric);
//                     }}
//                     maxLength={10}
//                   />
//                 </View>
//                 {message ? <Text style={styles.errorText}>{message}</Text> : null}
//               </View>

//               {/* Primary Action Button -> Keeps disabled active state context bound strictly to mobile evaluation */}
//               <TouchableOpacity
//                 style={[
//                   styles.primaryButton, 
//                   (!isConnected || !isMobileValid) && styles.disabledButton
//                 ]}
//                 onPress={handleLoginWithOTP}
//                 activeOpacity={0.8}
//                 disabled={!isConnected || !isMobileValid}
//               >
//                 <View style={styles.btnContentLeft}>
//                   <Image 
//                     source={require('../../assets/images/OTPIcon.png')} 
//                     style={styles.btnIconLeft} 
//                     resizeMode="contain" 
//                     tintColor="#FFFFFF"
//                   />
//                   <Text style={styles.primaryButtonText}>Login with OTP</Text>
//                 </View>
//                 <Icon name="arrow-right" size={moderateScale(20)} color="#FFF" style={styles.btnIconRight} />
//               </TouchableOpacity>

//               {/* Security Trust Banner */}
//               <View style={styles.securityBanner}>
//                 <Image 
//                   source={require('../../assets/images/locksecure.png')} 
//                   style={styles.bannerBgIcon} 
//                   resizeMode="cover" 
//                 />
                
//                 <View style={styles.bannerContent}>
//                   <Image 
//                     source={require('../../assets/images/Security-Icon.png')} 
//                     style={styles.securityShield} 
//                     resizeMode="contain" 
//                   />
//                   <View style={styles.securityTextContainer}>
//                     <Text style={styles.securityTitle}>Secure & Trusted</Text>
//                     <Text style={styles.securitySub}>Your account is protected with bank -grade security.</Text>
//                   </View>
//                 </View>
//               </View>

//             </ScrollView>

//             {/* Bottom Footer */}
//             <View style={[styles.footer, { paddingBottom: insets.bottom || moderateScale(20) }]}>
//               <Text style={styles.footerText}>
//                 New to PAYO ?{' '}
//                 <Text 
//                   style={styles.footerLink} 
//                   onPress={() => isConnected && navigation.navigate('RegisterMobile', { mode: 'register' })}
//                 >
//                   Create an account
//                 </Text>
//               </Text>
//             </View>

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
//     backgroundColor: '#ffffff',
//   },
//   internetBar: {
//     width: '100%',
//     backgroundColor: '#EF4444',
//     paddingVertical: hp('1%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   internetText: {
//     color: '#fff',
//     fontSize: moderateScale(12),
//     fontWeight: '700',
//   },
//   scrollContent: {
//     paddingHorizontal: wp('6%'),
//     flexGrow: 1,
//   },
//   logoWrapper: {
//     alignItems: 'center',
//     marginTop: verticalScale(30),
//     marginBottom: verticalScale(30),
//   },
//   logoImage: {
//     width: moderateScale(160),
//     height: moderateScale(55),
//   },
//   welcomeContainer: {
//     marginBottom: verticalScale(30),
//   },
//   welcomeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(6),
//   },
//   welcomeTitle: {
//     fontSize: moderateScale(26),
//     fontWeight: '800',
//     color: '#111827',
//   },
//   handIcon: {
//     width: moderateScale(24),
//     height: moderateScale(24),
//     marginLeft: moderateScale(10),
//   },
//   welcomeSub: {
//     fontSize: moderateScale(14),
//     color: '#4B5563',
//     fontWeight: '500',
//   },
//   inputSection: {
//     marginBottom: verticalScale(25),
//   },
//   inputLabel: {
//     fontSize: moderateScale(13),
//     color: '#374151',
//     fontWeight: '600',
//     marginBottom: verticalScale(10),
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1.5,
//     borderColor: '#4F46E5', 
//     borderRadius: moderateScale(12),
//     height: verticalScale(55),
//     paddingHorizontal: moderateScale(15),
//   },
//   inputContainerInvalid: {
//     borderColor: '#D1D5DB', // Muted container border color if number input criteria isn't met
//   },
//   countryCodeBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flagEmoji: {
//     fontSize: moderateScale(16),
//   },
//   countryCodeText: {
//     fontSize: moderateScale(14),
//     color: '#111827',
//     fontWeight: '500',
//     marginHorizontal: moderateScale(6),
//   },
//   verticalDivider: {
//     width: 1,
//     height: '50%',
//     backgroundColor: '#D1D5DB',
//     marginHorizontal: moderateScale(10),
//   },
//   textInput: {
//     flex: 1,
//     fontSize: moderateScale(14.5),
//     color: '#111827',
//     fontWeight: '500',
//     padding: 0, 
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: moderateScale(12),
//     marginTop: verticalScale(6),
//     fontWeight: '500',
//   },
//   primaryButton: {
//     backgroundColor: '#4F46E5',
//     borderRadius: moderateScale(12),
//     height: verticalScale(55),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#4F46E5',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   disabledButton: {
//     opacity: 0.5,
//     shadowOpacity: 0,
//     elevation: 0,
//   },
//   btnContentLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'absolute',
//     left: '30%',
//   },
//   btnIconLeft: {
//     width: moderateScale(18),
//     height: moderateScale(18),
//     marginRight: moderateScale(10),
//   },
//   primaryButtonText: {
//     color: '#FFFFFF',
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//   },
//   btnIconRight: {
//     position: 'absolute',
//     right: moderateScale(20),
//   },
//   securityBanner: {
//     backgroundColor: '#F4F3FF',
//     borderRadius: moderateScale(14),
//     marginTop: verticalScale(40),
//     height: verticalScale(90),
//     overflow: 'hidden',
//     justifyContent: 'center',
//   },
//   bannerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(16),
//     zIndex: 2,
//   },
//   securityShield: {
//     width: moderateScale(34),
//     height: moderateScale(34),
//     marginRight: moderateScale(12),
//   },
//   securityTextContainer: {
//     flex: 1,
//     paddingRight: moderateScale(40), 
//   },
//   securityTitle: {
//     fontSize: moderateScale(12),
//     fontWeight: '700',
//     color: '#374151',
//     marginBottom: verticalScale(3),
//   },
//   securitySub: {
//     fontSize: moderateScale(10.5),
//     color: '#6B7280',
//     lineHeight: moderateScale(14),
//   },
//   bannerBgIcon: {
//     position: 'absolute',
//     right: moderateScale(-20),
//     top: moderateScale(-10),
//     width: moderateScale(160),
//     height: moderateScale(110),
//     opacity: 0.5,
//     zIndex: 1,
//   },
//   footer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: verticalScale(10),
//   },
//   footerText: {
//     fontSize: moderateScale(14),
//     color: '#4B5563',
//     fontWeight: '500',
//   },
//   footerLink: {
//     color: '#2563EB',
//     fontWeight: '700',
//   },
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//new code with otp popup

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  Image,
  Modal,
  FlatList,
  ActivityIndicator, // Added ActivityIndicator
} from 'react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import NetInfo from '@react-native-community/netinfo';
import api from '../api/axios';
import * as Keychain from 'react-native-keychain';
import Icon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { scale, verticalScale, moderateScale, windowWidth } from '../utils/responsive';

// Helper function to convert ISO short codes (like 'IN', 'US') into unicode flag emojis
const getFlagEmoji = (countryShortCode) => {
  if (!countryShortCode) return '🏳️';
  const codePoints = countryShortCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // --- UI STATE ---
  const [mobile, setMobile] = useState('9000000001');
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(false); // Added loading state

  // Validation Rule: Checks if the input contains exactly 10 characters
  const isMobileValid = mobile?.length === 10;
  
  // Country Selector States
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // --- TESTING STAGE STATES ---
  const [testOtp, setTestOtp] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [navParams, setNavParams] = useState(null);
  // ----------------------------

  // Fetch countries list on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get('/api/countries');
        if (response.data?.status === '200' && response.data?.data) {
          setCountries(response.data.data);
          
          // Default selection to India (IN) if available, otherwise fallback to the first element
          const defaultCountry = response.data.data.find(c => c.country_short_code === 'IN') || response.data.data[0];
          setSelectedCountry(defaultCountry);
        }
      } catch (err) {
        console.error('Failed to fetch countries', err);
        // Clean fallback so UI doesn't crash if network fails completely on mount
        setSelectedCountry({
          country_calling_code: '91',
          country_short_code: 'IN',
          country_name: 'India'
        });
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  // --- SUBMIT FUNCTION ---
  const handleLoginWithOTP = async () => {
    if (!isConnected) {
      setMessage('No internet connection');
      return;
    }

    if (!isMobileValid) return;

    // Dynamically prefix the calling code with '+' for the API request
    const computedCountryCode = `${selectedCountry?.country_calling_code || '91'}`;

    try {
      setLoading(true); // Start loading
      setMessage(''); // Clear previous messages

      const response = await api.post('/api/auth/login', {
        mobile,
        mobile_cont_code: computedCountryCode,
      });

      console.log('LOGIN API RESPONSE:', response?.data); 

      if (response?.data?.Message === 'Login OTP generated' && response?.data?.Status === '200' ) {
        
        const params = { 
          mobile, 
          countryCode: computedCountryCode,
          type: 'login' 
        };

        // --- TESTING STAGE: Aggressively search for OTP in response payload ---
        const receivedOtp = 
          response?.data?.otp || 
          response?.data?.OTP || 
          response?.data?.data?.otp || 
          response?.data?.data?.OTP || 
          response?.data?.loginOtp;
        
        if (receivedOtp) {
          // If we found the OTP, show the popup and prevent instant navigation
          setTestOtp(String(receivedOtp));
          setNavParams(params);
          setShowOtpPopup(true); 
        } else {
          // If backend didn't send OTP, fallback to normal navigation
          console.log('⚠️ OTP value not found in response. Navigating directly.');
          navigation.navigate('OTP', params);
        }
        // ----------------------------------------------------------------------

      } else {
        setMessage(response?.data?.Message || 'Login failed');
      }
    } catch (error) {
      if (error?.response?.data?.kycStatus === "rejected") {
        navigation.navigate('KycFail');
      } else {
        setMessage(
          error?.response?.data?.message ||
            error?.message ||
            'Something went wrong',
        );
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // --- Navigate after viewing the OTP popup ---
  const handleProceedToVerify = () => {
    setShowOtpPopup(false);
    if (navParams) {
      navigation.navigate('OTP', { ...navParams, testOtp }); 
    }
  };
  // --------------------------------------------

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#F9FBF9" barStyle="dark-content" />

      {/* --- TESTING STAGE POPUP --- */}
      <Modal
        visible={showOtpPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={handleProceedToVerify}
      >
        <View style={styles.testModalOverlay}>
          <View style={styles.testModalContent}>
            <View style={styles.testModalIconContainer}>
              <Icon name="message-circle" size={moderateScale(28)} color="#4F46E5" />
            </View>
            <Text style={styles.testModalTitle}>Test OTP Received</Text>
            <Text style={styles.testModalOtpText}>{testOtp}</Text>
            <Text style={styles.testModalSubText}>Use this code to verify your number. (Testing Mode Only)</Text>
            
            <TouchableOpacity
              style={styles.testModalCloseBtn}
              onPress={handleProceedToVerify}
              activeOpacity={0.8}
            >
              <Text style={styles.testModalCloseBtnText}>Continue to Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* --------------------------- */}

      {!isConnected && (
        <View style={styles.internetBar}>
          <Text style={styles.internetText}>No Internet Connection</Text>
        </View>
      )}

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.flex}>
            
            <ScrollView
              contentContainerStyle={[
                styles.scrollContent,
                {
                  paddingBottom: insets.bottom > 0 ? insets.bottom + moderateScale(20) : moderateScale(25),
                },
              ]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              
              {/* Top Logo Container */}
              <View style={styles.logoWrapper}>
                <Image 
                  source={require('../../assets/images/LogoContainer.png')} 
                  style={styles.logoImage} 
                  resizeMode="contain" 
                />
              </View>

              {/* Welcome Section */}
              <View style={styles.welcomeContainer}>
                <View style={styles.welcomeRow}>
                  <Text style={styles.welcomeTitle}>Welcome Back!</Text>
                  <Image 
                    source={require('../../assets/images/HandIcon.png')} 
                    style={styles.handIcon} 
                    resizeMode="contain" 
                  />
                </View>
                <Text style={styles.welcomeSub}>Login to access your PAYO wallet</Text>
              </View>

              {/* Input Section */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Mobile Number</Text>
                <View style={[
                  styles.inputContainer,
                  !isMobileValid && styles.inputContainerInvalid
                ]}>
                  
                  {/* Dynamic Country Code Select Button */}
                  <TouchableOpacity 
                    style={styles.countryCodeBox}
                    onPress={() => {
                      Keyboard.dismiss();
                      setModalVisible(true);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.flagEmoji}>
                      {getFlagEmoji(selectedCountry?.country_short_code)}
                    </Text>
                    <Text style={styles.countryCodeText}>
                      {selectedCountry?.country_calling_code || '91'}
                    </Text>
                    <Icon name="chevron-down" size={moderateScale(16)} color="#111827" />
                  </TouchableOpacity>
                  
                  {/* Divider */}
                  <View style={styles.verticalDivider} />
                  
                  {/* Text Input */}
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter mobile number"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                    value={mobile}
                    onChangeText={(text) => {
                      const numeric = text.replace(/[^0-9]/g, '');
                      setMobile(numeric);
                    }}
                    maxLength={10}
                  />
                </View>
                {message ? <Text style={styles.errorText}>{message}</Text> : null}
              </View>

              {/* Primary Action Button */}
              <TouchableOpacity
                style={[
                  styles.primaryButton, 
                  (!isConnected || !isMobileValid) && styles.disabledButton
                ]}
                onPress={handleLoginWithOTP}
                activeOpacity={0.8}
                disabled={!isConnected || !isMobileValid || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <View style={styles.btnContentLeft}>
                      <Image 
                        source={require('../../assets/images/OTPIcon.png')} 
                        style={styles.btnIconLeft} 
                        resizeMode="contain" 
                        tintColor="#FFFFFF"
                      />
                      <Text style={styles.primaryButtonText}>Login with OTP</Text>
                    </View>
                    <Icon name="arrow-right" size={moderateScale(20)} color="#FFF" style={styles.btnIconRight} />
                  </>
                )}
              </TouchableOpacity>

              {/* Security Trust Banner */}
              <View style={styles.securityBanner}>
                <Image 
                  source={require('../../assets/images/locksecure.png')} 
                  style={styles.bannerBgIcon} 
                  resizeMode="cover" 
                />
                
                <View style={styles.bannerContent}>
                  <Image 
                    source={require('../../assets/images/Security-Icon.png')} 
                    style={styles.securityShield} 
                    resizeMode="contain" 
                  />
                  <View style={styles.securityTextContainer}>
                    <Text style={styles.securityTitle}>Secure & Trusted</Text>
                    <Text style={styles.securitySub}>Your account is protected with bank -grade security.</Text>
                  </View>
                </View>
              </View>

            </ScrollView>

            {/* Bottom Footer */}
            <View style={[styles.footer, { paddingBottom: insets.bottom || moderateScale(40) }]}>
              <Text style={styles.footerText}>
                New to PAYO ?{' '}
                <Text 
                  style={styles.footerLink} 
                  onPress={() => isConnected && navigation.navigate('RegisterMobile', { mode: 'register' })}
                >
                  Create an account
                </Text>
              </Text>
            </View>

          </View>
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
                  keyExtractor={(item) => item.country_code.toString()}
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

  // --- Testing Stage Popup Styles ---
  testModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  testModalContent: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: moderateScale(20),
    padding: moderateScale(25),
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  testModalIconContainer: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  testModalTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#333',
    marginBottom: verticalScale(10),
  },
  testModalOtpText: {
    fontSize: moderateScale(32),
    fontWeight: '800',
    color: '#4F46E5', 
    letterSpacing: moderateScale(8),
    marginBottom: verticalScale(10),
  },
  testModalSubText: {
    fontSize: moderateScale(13),
    color: '#666',
    textAlign: 'center',
    marginBottom: verticalScale(25),
  },
  testModalCloseBtn: {
    backgroundColor: '#4F46E5',
    width: '100%',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },
  testModalCloseBtnText: {
    color: '#FFF',
    fontSize: moderateScale(15),
    fontWeight: '700',
  },
  // ---------------------------------

  internetBar: {
    width: '100%',
    backgroundColor: '#EF4444',
    paddingVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  internetText: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: wp('6%'),
    flexGrow: 1,
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop: verticalScale(30),
    marginBottom: verticalScale(30),
  },
  logoImage: {
    width: moderateScale(140),
    height: moderateScale(60),
  },
  welcomeContainer: {
    marginBottom: verticalScale(30),
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  welcomeTitle: {
    fontSize: moderateScale(26),
    fontWeight: '800',
    color: '#111827',
  },
  handIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginLeft: moderateScale(10),
  },
  welcomeSub: {
    fontSize: moderateScale(14),
    color: '#4B5563',
    fontWeight: '500',
  },
  inputSection: {
    marginBottom: verticalScale(25),
  },
  inputLabel: {
    fontSize: moderateScale(13),
    color: '#374151',
    fontWeight: '600',
    marginBottom: verticalScale(10),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#4F46E5', 
    borderRadius: moderateScale(12),
    height: verticalScale(55),
    paddingHorizontal: moderateScale(15),
  },
  inputContainerInvalid: {
    borderColor: '#D1D5DB', 
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagEmoji: {
    fontSize: moderateScale(16),
  },
  countryCodeText: {
    fontSize: moderateScale(14),
    color: '#111827',
    fontWeight: '500',
    marginHorizontal: moderateScale(6),
  },
  verticalDivider: {
    width: 1,
    height: '50%',
    backgroundColor: '#D1D5DB',
    marginHorizontal: moderateScale(10),
  },
  textInput: {
    flex: 1,
    fontSize: moderateScale(14.5),
    color: '#111827',
    fontWeight: '500',
    padding: 0, 
  },
  errorText: {
    color: '#EF4444',
    fontSize: moderateScale(12),
    marginTop: verticalScale(6),
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
    borderRadius: moderateScale(12),
    height: verticalScale(55),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  btnContentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: '30%',
  },
  btnIconLeft: {
    width: moderateScale(18),
    height: moderateScale(18),
    marginRight: moderateScale(10),
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  btnIconRight: {
    position: 'absolute',
    right: moderateScale(20),
  },
  securityBanner: {
    backgroundColor: '#F4F3FF',
    borderRadius: moderateScale(14),
    marginTop: verticalScale(40),
    height: verticalScale(90),
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    zIndex: 2,
  },
  securityShield: {
    width: moderateScale(30),
    height: moderateScale(30),
    marginRight: moderateScale(12),
  },
  securityTextContainer: {
    flex: 1,
    paddingRight: moderateScale(40), 
  },
  securityTitle: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#374151',
    marginBottom: verticalScale(3),
  },
  securitySub: {
    fontSize: moderateScale(10.5),
    color: '#6B7280',
    lineHeight: moderateScale(14),
  },
  bannerBgIcon: {
    position: 'absolute',
    right: moderateScale(0),
    top: moderateScale(10),
    width: moderateScale(120),
    height: moderateScale(60),
    opacity: 1,
    zIndex: 1,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: verticalScale(10),
  },
  footerText: {
    fontSize: moderateScale(14),
    color: '#4B5563',
    fontWeight: '500',
  },
  footerLink: {
    color: '#2563EB',
    fontWeight: '700',
  },
  
  // Country Picker Modal Styles
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
});
////////////////////////////////////////////////////

//new code
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Platform,
//   ScrollView,
//   Image,
//   Modal,
//   FlatList,
//   ActivityIndicator, // Added ActivityIndicator here
// } from 'react-native';

// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// import NetInfo from '@react-native-community/netinfo';
// import api from '../api/axios';
// import * as Keychain from 'react-native-keychain';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { scale, verticalScale, moderateScale, windowWidth } from '../utils/responsive';

// // Helper function to convert ISO short codes (like 'IN', 'US') into unicode flag emojis
// const getFlagEmoji = (countryShortCode) => {
//   if (!countryShortCode) return '🏳️';
//   const codePoints = countryShortCode
//     .toUpperCase()
//     .split('')
//     .map((char) => 127397 + char.charCodeAt(0));
//   return String.fromCodePoint(...codePoints);
// };

// export default function LoginScreen({ navigation }) {
//   const insets = useSafeAreaInsets();

//   // --- UI STATE ---
//   const [mobile, setMobile] = useState('');
//   const [message, setMessage] = useState('');
//   const [isConnected, setIsConnected] = useState(true);
//   const [loading, setLoading] = useState(false); // Added loading state

//   // Validation Rule: Checks if the input contains exactly 10 characters
//   const isMobileValid = mobile?.length === 10;
  
//   // Country Selector States
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

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

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//     });
//     return () => unsubscribe();
//   }, []);

//   // --- SUBMIT FUNCTION ---
//   const handleLoginWithOTP = async () => {
//     if (!isConnected) {
//       setMessage('No internet connection');
//       return;
//     }

//     if (!isMobileValid) return;

//     // Dynamically prefix the calling code with '+' for the API request
//     const computedCountryCode = `${selectedCountry?.country_calling_code || '91'}`;

//     try {
//       setLoading(true); // Start loading
//       setMessage('');   // Clear previous errors

//       const response = await api.post('/api/auth/login', {
//         mobile,
//         mobile_cont_code: computedCountryCode,
//       });

//       if (response?.data?.Message === 'Login OTP generated') {
//         navigation.navigate('OTP', { 
//           mobile, 
//           countryCode: computedCountryCode,
//           type: 'login' 
//         });
//       } else {
//         setMessage(response?.data?.message || 'Login failed');
//       }
//     } catch (error) {
//       if (error?.response?.data?.kycStatus === "rejected") {
//         navigation.navigate('KycFail');
//       } else {
//         setMessage(
//           error?.response?.data?.message ||
//             error?.message ||
//             'Something went wrong',
//         );
//       }
//     } finally {
//       setLoading(false); // Stop loading regardless of success/fail
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
//       <StatusBar backgroundColor="#F9FBF9" barStyle="dark-content" />

//       {!isConnected && (
//         <View style={styles.internetBar}>
//           <Text style={styles.internetText}>No Internet Connection</Text>
//         </View>
//       )}

//       <KeyboardAvoidingView
//         style={styles.flex}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={styles.flex}>
            
//             <ScrollView
//               contentContainerStyle={[
//                 styles.scrollContent,
//                 {
//                   paddingBottom: insets.bottom > 0 ? insets.bottom + moderateScale(20) : moderateScale(25),
//                 },
//               ]}
//               keyboardShouldPersistTaps="handled"
//               showsVerticalScrollIndicator={false}
//             >
              
//               {/* Top Logo Container */}
//               <View style={styles.logoWrapper}>
//                 <Image 
//                   source={require('../../assets/images/LogoContainer.png')} 
//                   style={styles.logoImage} 
//                   resizeMode="contain" 
//                 />
//               </View>

//               {/* Welcome Section */}
//               <View style={styles.welcomeContainer}>
//                 <View style={styles.welcomeRow}>
//                   <Text style={styles.welcomeTitle}>Welcome Back!</Text>
//                   <Image 
//                     source={require('../../assets/images/HandIcon.png')} 
//                     style={styles.handIcon} 
//                     resizeMode="contain" 
//                   />
//                 </View>
//                 <Text style={styles.welcomeSub}>Login to access your PAYO wallet</Text>
//               </View>

//               {/* Input Section */}
//               <View style={styles.inputSection}>
//                 <Text style={styles.inputLabel}>Mobile Number</Text>
//                 <View style={[
//                   styles.inputContainer,
//                   !isMobileValid && styles.inputContainerInvalid
//                 ]}>
                  
//                   {/* Dynamic Country Code Select Button */}
//                   <TouchableOpacity 
//                     style={styles.countryCodeBox}
//                     onPress={() => {
//                       Keyboard.dismiss();
//                       setModalVisible(true);
//                     }}
//                     activeOpacity={0.7}
//                   >
//                     <Text style={styles.flagEmoji}>
//                       {getFlagEmoji(selectedCountry?.country_short_code)}
//                     </Text>
//                     <Text style={styles.countryCodeText}>
//                       {selectedCountry?.country_calling_code || '91'}
//                     </Text>
//                     <Icon name="chevron-down" size={moderateScale(16)} color="#111827" />
//                   </TouchableOpacity>
                  
//                   {/* Divider */}
//                   <View style={styles.verticalDivider} />
                  
//                   {/* Text Input */}
//                   <TextInput
//                     style={styles.textInput}
//                     placeholder="Enter mobile number"
//                     placeholderTextColor="#9CA3AF"
//                     keyboardType="phone-pad"
//                     value={mobile}
//                     onChangeText={(text) => {
//                       const numeric = text.replace(/[^0-9]/g, '');
//                       setMobile(numeric);
//                     }}
//                     maxLength={10}
//                   />
//                 </View>
//                 {message ? <Text style={styles.errorText}>{message}</Text> : null}
//               </View>

//               {/* Primary Action Button */}
//               <TouchableOpacity
//                 style={[
//                   styles.primaryButton, 
//                   (!isConnected || !isMobileValid) && styles.disabledButton
//                 ]}
//                 onPress={handleLoginWithOTP}
//                 activeOpacity={0.8}
//                 disabled={!isConnected || !isMobileValid || loading} // Disabled when loading
//               >
//                 {loading ? (
//                   <ActivityIndicator color="#FFFFFF" size="small" />
//                 ) : (
//                   <>
//                     <View style={styles.btnContentLeft}>
//                       <Image 
//                         source={require('../../assets/images/OTPIcon.png')} 
//                         style={styles.btnIconLeft} 
//                         resizeMode="contain" 
//                         tintColor="#FFFFFF"
//                       />
//                       <Text style={styles.primaryButtonText}>Login with OTP</Text>
//                     </View>
//                     <Icon name="arrow-right" size={moderateScale(20)} color="#FFF" style={styles.btnIconRight} />
//                   </>
//                 )}
//               </TouchableOpacity>

//               {/* Security Trust Banner */}
//               <View style={styles.securityBanner}>
//                 <Image 
//                   source={require('../../assets/images/locksecure.png')} 
//                   style={styles.bannerBgIcon} 
//                   resizeMode="cover" 
//                 />
                
//                 <View style={styles.bannerContent}>
//                   <Image 
//                     source={require('../../assets/images/Security-Icon.png')} 
//                     style={styles.securityShield} 
//                     resizeMode="contain" 
//                   />
//                   <View style={styles.securityTextContainer}>
//                     <Text style={styles.securityTitle}>Secure & Trusted</Text>
//                     <Text style={styles.securitySub}>Your account is protected with bank -grade security.</Text>
//                   </View>
//                 </View>
//               </View>

//             </ScrollView>

//             {/* Bottom Footer */}
//             <View style={[styles.footer, { paddingBottom: insets.bottom || moderateScale(40) }]}>
//               <Text style={styles.footerText}>
//                 New to PAYO ?{' '}
//                 <Text 
//                   style={styles.footerLink} 
//                   onPress={() => isConnected && navigation.navigate('RegisterMobile', { mode: 'register' })}
//                 >
//                   Create an account
//                 </Text>
//               </Text>
//             </View>

//           </View>
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
//   internetBar: {
//     width: '100%',
//     backgroundColor: '#EF4444',
//     paddingVertical: hp('1%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   internetText: {
//     color: '#fff',
//     fontSize: moderateScale(12),
//     fontWeight: '700',
//   },
//   scrollContent: {
//     paddingHorizontal: wp('6%'),
//     flexGrow: 1,
//   },
//   logoWrapper: {
//     alignItems: 'center',
//     marginTop: verticalScale(30),
//     marginBottom: verticalScale(30),
//   },
//   logoImage: {
//     width: moderateScale(140),
//     height: moderateScale(60),
//   },
//   welcomeContainer: {
//     marginBottom: verticalScale(30),
//   },
//   welcomeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: verticalScale(6),
//   },
//   welcomeTitle: {
//     fontSize: moderateScale(26),
//     fontWeight: '800',
//     color: '#111827',
//   },
//   handIcon: {
//     width: moderateScale(24),
//     height: moderateScale(24),
//     marginLeft: moderateScale(10),
//   },
//   welcomeSub: {
//     fontSize: moderateScale(14),
//     color: '#4B5563',
//     fontWeight: '500',
//   },
//   inputSection: {
//     marginBottom: verticalScale(25),
//   },
//   inputLabel: {
//     fontSize: moderateScale(13),
//     color: '#374151',
//     fontWeight: '600',
//     marginBottom: verticalScale(10),
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1.5,
//     borderColor: '#4F46E5', 
//     borderRadius: moderateScale(12),
//     height: verticalScale(55),
//     paddingHorizontal: moderateScale(15),
//   },
//   inputContainerInvalid: {
//     borderColor: '#D1D5DB', 
//   },
//   countryCodeBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flagEmoji: {
//     fontSize: moderateScale(16),
//   },
//   countryCodeText: {
//     fontSize: moderateScale(14),
//     color: '#111827',
//     fontWeight: '500',
//     marginHorizontal: moderateScale(6),
//   },
//   verticalDivider: {
//     width: 1,
//     height: '50%',
//     backgroundColor: '#D1D5DB',
//     marginHorizontal: moderateScale(10),
//   },
//   textInput: {
//     flex: 1,
//     fontSize: moderateScale(14.5),
//     color: '#111827',
//     fontWeight: '500',
//     padding: 0, 
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: moderateScale(12),
//     marginTop: verticalScale(6),
//     fontWeight: '500',
//   },
//   primaryButton: {
//     backgroundColor: '#4F46E5',
//     borderRadius: moderateScale(12),
//     height: verticalScale(55),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#4F46E5',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   disabledButton: {
//     opacity: 0.5,
//     shadowOpacity: 0,
//     elevation: 0,
//   },
//   btnContentLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'absolute',
//     left: '30%',
//   },
//   btnIconLeft: {
//     width: moderateScale(18),
//     height: moderateScale(18),
//     marginRight: moderateScale(10),
//   },
//   primaryButtonText: {
//     color: '#FFFFFF',
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//   },
//   btnIconRight: {
//     position: 'absolute',
//     right: moderateScale(20),
//   },
//   securityBanner: {
//     backgroundColor: '#F4F3FF',
//     borderRadius: moderateScale(14),
//     marginTop: verticalScale(40),
//     height: verticalScale(90),
//     overflow: 'hidden',
//     justifyContent: 'center',
//   },
//   bannerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(16),
//     zIndex: 2,
//   },
//   securityShield: {
//     width: moderateScale(30),
//     height: moderateScale(30),
//     marginRight: moderateScale(12),
//   },
//   securityTextContainer: {
//     flex: 1,
//     paddingRight: moderateScale(40), 
//   },
//   securityTitle: {
//     fontSize: moderateScale(12),
//     fontWeight: '700',
//     color: '#374151',
//     marginBottom: verticalScale(3),
//   },
//   securitySub: {
//     fontSize: moderateScale(10.5),
//     color: '#6B7280',
//     lineHeight: moderateScale(14),
//   },
//   bannerBgIcon: {
//     position: 'absolute',
//     right: moderateScale(0),
//     top: moderateScale(10),
//     width: moderateScale(120),
//     height: moderateScale(60),
//     opacity: 1,
//     zIndex: 1,
//   },
//   footer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: verticalScale(10),
//   },
//   footerText: {
//     fontSize: moderateScale(14),
//     color: '#4B5563',
//     fontWeight: '500',
//   },
//   footerLink: {
//     color: '#2563EB',
//     fontWeight: '700',
//   },
  
//   // Country Picker Modal Styles
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
// });

