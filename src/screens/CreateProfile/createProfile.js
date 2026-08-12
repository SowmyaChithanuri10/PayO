
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   StatusBar,
//   Platform,
//   Image,
//   ActivityIndicator,
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Feather';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';
// import api from '../../api/axios';
// import { verticalScale, windowWidth } from '../../utils/responsive';
// import { useAuth } from '../../context/AuthContext';


// export default function ProfileScreen({ route, navigation }) {
//   const { userId } = useAuth();
//   console.log(userId,"userId")
  
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [referral, setReferral] = useState('');
//   const [message, setMessage] = useState('');
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const isNameValid = name.trim().length >= 3;
//   const isEmailValid = !email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const isFormValid = isNameValid && isEmailValid;

//   useEffect(() => {
//     navigation.setOptions({
//       gestureEnabled: false,
//     });

//     const unsubscribe = navigation.addListener('beforeRemove', (e) => {
//       if (e.data.action.type === 'GO_BACK') {
//         e.preventDefault();
//       }
//     });

//     return unsubscribe;
//   }, [navigation]);

//   const validateOnBlur = (field) => {
//     let err = { ...errors };

//     if (field === 'name') {
//       if (!name?.trim()) {
//         err.name = 'Full name is required';
//       } else if (name.trim().length < 3) {
//         err.name = 'Minimum 3 characters required';
//       } else {
//         delete err.name;
//       }
//     }

//     if (field === 'email') {
//       if (email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         err.email = 'Invalid email format';
//       } else {
//         delete err.email;
//       }
//     }

//     setErrors(err);
//   };

//   const handleChange = (field, value) => {
//     if (field === 'name') {
//       const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
//       setName(filteredValue);
//       if (filteredValue.trim().length >= 3 && errors.name) {
//         setErrors(prev => { const { name, ...rest } = prev; return rest; });
//       }
//     }
    
//     if (field === 'email') {
//       setEmail(value);
//       if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && errors.email) {
//         setErrors(prev => { const { email, ...rest } = prev; return rest; });
//       }
//     }
    
//     if (field === 'referral') setReferral(value);
//   };

//   const handleContinue = async () => {
//     if (!isFormValid || loading) return;
//     setMessage('');
    
//     try {
//       setLoading(true);
      
//       const response = await api.post('/api/auth/register', {
//         userId: userId || "", 
//         name: name.trim(),
//         email: email.trim() || " ", 
//         referralCode: referral.trim() || " " 
//       });

//       if (response?.data?.status === "200" || response?.status === 200) {
//         navigation.navigate('TransactionPin');
//       } else {
//         setMessage(response?.data?.message || 'Failed to update registration profiles.');
//       }
//     } catch (error) {
//       console.log('PROFILE UPDATE API ERROR:', error?.response?.data || error.message);
//       setMessage(error?.response?.data?.message || 'Something went wrong while updates processing.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#F9FBF9" barStyle="dark-content" />

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
//             <View style={styles.header}>
//               <Image 
//                 source={require('../../../assets/images/LogoContainer.png')} 
//                 style={styles.logoImage}
//                 resizeMode="contain"
//               />
//             </View>

//             <View style={styles.illustrationContainer}>
//               <Image 
//                 source={require('../../../assets/images/Header Image.png')} 
//                 style={styles.heroImage}
//                 resizeMode="contain"
//               />
//             </View>

//             <View style={styles.stepBadgeContainer}>
//               <View style={styles.stepBadge}>
//                 <Text style={styles.stepBadgeText}>Step 1 of 3</Text>
//               </View>
//             </View>

//             <Text style={styles.mainTitle}>
//               Complete Your <Text style={styles.titleAccent}>Profile!</Text>
//             </Text>
//             <Text style={styles.subTitle}>
//               Just a few details to personalize your PAYO account
//             </Text>

//             {message ? <Text style={styles.errorCenter}>{message}</Text> : null}

//             <View style={styles.labelRow}>
//               <Image 
//                 source={require('../../../assets/images/person.png')}
//                 style={styles.labelIconImage}
//                 resizeMode="contain"
//               />
//               <Text style={styles.label}>Full Name <Text style={styles.requiredAsterisk}>*</Text></Text>
//             </View>
//             <View style={[styles.inputWrapper, errors.name && styles.errorInput]}>
//               <TextInput
//                 style={styles.inputField}
//                 value={name}
//                 editable={!loading}
//                 onChangeText={(text) => handleChange('name', text)}
//                 onBlur={() => validateOnBlur('name')}
//                 placeholder="Enter your Full name"
//                 placeholderTextColor="#9CA3AF"
//               />
//               {isNameValid ? (
//                 <Icon name="check-circle" size={moderateScale(18)} color="#10B981" />
//               ) : null}
//             </View>
//             {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

//             <View style={styles.labelRow}>
//               <Image 
//                 source={require('../../../assets/images/Mail Icon.png')}
//                 style={styles.labelIconImage}
//                 resizeMode="contain"
//               />
//               <Text style={styles.label}>Email Address <Text style={styles.optionalText}>(Optional)</Text></Text>
//             </View>
//             <View style={[styles.inputWrapper, errors.email && styles.errorInput]}>
//               <TextInput
//                 style={styles.inputField}
//                 value={email}
//                 editable={!loading}
//                 onChangeText={(text) => handleChange('email', text)}
//                 onBlur={() => validateOnBlur('email')}
//                 placeholder="Enter your Email address"
//                 placeholderTextColor="#9CA3AF"
//                 autoCapitalize="none"
//                 keyboardType="email-address"
//               />
//               {email.trim() && isEmailValid ? (
//                 <Icon name="check-circle" size={moderateScale(18)} color="#10B981" />
//               ) : null}
//             </View>
//             {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

//             <View style={styles.labelRow}>
//               <Image 
//                 source={require('../../../assets/images/Gift Box Icon.png')}
//                 style={styles.labelIconImage}
//                 resizeMode="contain"
//               />
//               <Text style={styles.label}>Referral Code <Text style={styles.optionalText}>(Optional)</Text></Text>
//             </View>
//             <View style={styles.inputWrapper}>
//               <TextInput
//                 style={styles.inputField}
//                 value={referral}
//                 editable={!loading}
//                 onChangeText={(text) => handleChange('referral', text)}
//                 placeholder="Enter referral code"
//                 placeholderTextColor="#9CA3AF"
//               />
//               {referral.trim().length > 0 ? (
//                 <Icon name="check-circle" size={moderateScale(18)} color="#10B981" />
//               ) : null}
//             </View>

//             <View style={styles.trustBannerContainer}>
//               <View style={styles.trustItem}>
//                 <View style={styles.trustIconContainer}>
//                   <Image 
//                     source={require('../../../assets/images/vector.png')} 
//                     style={styles.trustIconImage} 
//                     resizeMode="contain"
//                   />
//                 </View>
//                 <View style={styles.trustTextContainer}>
//                   <Text style={styles.trustTitle}>100% Secure</Text>
//                   <Text style={styles.trustSub}>Your data is safe with us</Text>
//                 </View>
//               </View>
              
//               <View style={styles.trustDivider} />
              
//               <View style={styles.trustItem}>
//                 <View style={styles.trustIconContainer}>
//                   <Image 
//                     source={require('../../../assets/images/vector1.png')} 
//                     style={styles.trustIconImage} 
//                     resizeMode="contain"
//                   />
//                 </View>
//                 <View style={styles.trustTextContainer}>
//                   <Text style={styles.trustTitle}>Quick Setup</Text>
//                   <Text style={styles.trustSub}>Take less than a minute</Text>
//                 </View>
//               </View>
              
//               <View style={styles.trustDivider} />
              
//               <View style={styles.trustItem}>
//                 <View style={styles.trustIconContainer}>
//                   <Image 
//                     source={require('../../../assets/images/Rewards Icon.png')} 
//                     style={styles.trustIconImage} 
//                     resizeMode="contain"
//                   />
//                 </View>
//                 <View style={styles.trustTextContainer}>
//                   <Text style={styles.trustTitle}>Exciting Rewards</Text>
//                   <Text style={styles.trustSub}>Earn rewards on every transaction</Text>
//                 </View>
//               </View>
//             </View>

//             <TouchableOpacity 
//               disabled={!isFormValid || loading}
//               style={[styles.continueButton, (!isFormValid || loading) && styles.continueButtonDisabled]} 
//               onPress={handleContinue}
//               activeOpacity={0.8}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#FFF" />
//               ) : (
//                 <>
//                   <Text style={styles.continueButtonText}>Continue</Text>
//                   <Icon name="arrow-right" size={moderateScale(16)} color="#FFF" style={styles.btnArrow} />
//                 </>
//               )}
//             </TouchableOpacity>
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
//     paddingHorizontal: wp('5%'),
//     paddingBottom: hp('3%'),
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: verticalScale(80), 
//     width: '100%',
//   },
//   logoImage: {
//     width: moderateScale(120),
//     height: moderateScale(40),
//   },
//   illustrationContainer: {
//     width: wp('90%'),
//     height: hp('24%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: hp('1%'),
//     alignSelf: 'center',
//   },
//   heroImage: {
//     width: '80%',
//     height: '100%',
//   },
//   stepBadgeContainer: {
//     alignItems: 'center',
//     marginBottom: hp('1.2%'),
//   },
//   stepBadge: {
//     backgroundColor: '#EEF2FF',
//     paddingHorizontal: wp('4%'),
//     paddingVertical: hp('0.5%'),
//     borderRadius: moderateScale(16),
//   },
//   stepBadgeText: {
//     color: '#3B82F6',
//     fontWeight: '700',
//     fontSize: moderateScale(11),
//   },
//   mainTitle: {
//     textAlign: 'center',
//     fontSize: moderateScale(20),
//     fontWeight: '500',
//     color: '#111827',
//   },
//   titleAccent: {
//     color: '#285CE0',
//   },
//   subTitle: {
//     textAlign: 'center',
//     color: '#414141',
//     fontSize: moderateScale(12.5),
//     marginTop: hp('1%'),
//     marginBottom: hp('2.5%'),
//     paddingHorizontal: wp('4%'),
//     lineHeight: moderateScale(18),
//   },
//   labelRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: hp('1.8%'),
//     marginBottom: hp('0.6%'),
//     marginLeft: wp('2%'),
//     marginRight: wp('2%'),
//   },
//   labelIconImage: {
//     width: moderateScale(16),
//     height: moderateScale(16),
//     marginRight: wp('1.8%'),
//     marginTop: Platform.OS === 'ios' ? -2 : 0,
//   },
//   label: {
//     fontSize: moderateScale(12.5),
//     color: '#1F2937',
//     fontWeight: '600',
//     marginLeft: wp('1%'),
//   },
//   requiredAsterisk: {
//     color: '#EF4444',
//   },
//   optionalText: {
//     color: '#9CA3AF',
//     fontWeight: '500',
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F9FAFB',
//     borderRadius: moderateScale(12),
//     borderWidth: 1.2,
//     borderColor: '#D1D5DB',
//     paddingHorizontal: wp('4%'),
//     height: hp('6.2%'),
//     marginLeft: wp('2%'),
//     marginRight: wp('2%'),
//     marginTop: hp('0.5%'),
//   },
//   inputField: {
//     flex: 1,
//     fontSize: moderateScale(13.5),
//     color: '#111827',
//     fontWeight: '500',
//     padding: 0,
//   },
//   errorInput: {
//     borderColor: '#EF4444',
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: moderateScale(11),
//     marginTop: hp('0.4%'),
//     marginLeft: wp('2%'),
//     marginRight: wp('2%'),
//   },
//   errorCenter: {
//     color: '#EF4444',
//     textAlign: 'center',
//     marginBottom: hp('1%'),
//     fontSize: moderateScale(12),
//   },
//   trustBannerContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#F0EEFB99',
//     borderRadius: moderateScale(16),
//     paddingVertical: hp('2%'),
//     marginTop: hp('2%'),
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//   },
//   trustItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingHorizontal: wp('1%'),
//   },
//   trustIconContainer: {
//     height: moderateScale(24),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp('0.8%'),
//   },
//   trustIconImage: {
//     width: moderateScale(22),
//     height: moderateScale(22),
//   },
//   trustTextContainer: {
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     width: '100%',
//   },
//   trustTitle: {
//     fontSize: moderateScale(11),
//     fontWeight: '700',
//     color: '#374151',
//     textAlign: 'center',
//   },
//   trustSub: {
//     fontSize: moderateScale(9.5),
//     color: '#6B7280',
//     textAlign: 'center',
//     marginTop: hp('0.4%'),
//     lineHeight: moderateScale(13),
//   },
//   trustDivider: {
//     width: 1,
//     height: hp('5%'),
//     backgroundColor: '#E5E7EB',
//     alignSelf: 'center',
//   },
//   continueButton: {
//     flexDirection: 'row',
//     backgroundColor: '#5145E5',
//     height: hp('6.2%'),
//     borderRadius: moderateScale(12),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: hp('3%'),
//     position: 'relative',
//   },
//   continueButtonDisabled: {
//     backgroundColor: '#9CA3AF',
//     opacity: 0.6,
//   },
//   continueButtonText: {
//     color: '#FFF',
//     fontWeight: '700',
//     fontSize: moderateScale(15),
//   },
//   btnArrow: {
//     position: 'absolute',
//     right: wp('5%'),
//   },
// });



import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';
import api from '../../api/axios';
import { verticalScale, windowWidth } from '../../utils/responsive';
import { useAuth } from '../../context/AuthContext';

// Flexible email validation regex matching standard formats (@gmail, @outlook, @yahoo, etc.)
// Only allows specific major email providers
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com)$/i;

export default function ProfileScreen({ route, navigation }) {
  const { userId } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [referral, setReferral] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const trimmedEmail = email.trim();
  const isNameValid = name.trim().length >= 3;
  // Optional field: valid if empty OR if it matches standard email structure
  const isEmailValid = !trimmedEmail || EMAIL_REGEX.test(trimmedEmail);
  const isFormValid = isNameValid && isEmailValid;

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const validateOnBlur = (field) => {
    let err = { ...errors };

    if (field === 'name') {
      if (!name?.trim()) {
        err.name = 'Full name is required';
      } else if (name.trim().length < 3) {
        err.name = 'Minimum 3 characters required';
      } else {
        delete err.name;
      }
    }

    if (field === 'email') {
      const trimmed = email?.trim();
      if (trimmed && !EMAIL_REGEX.test(trimmed)) {
        err.email = 'Enter a valid email address (e.g. name@gmail.com)';
      } else {
        delete err.email;
      }
    }

    setErrors(err);
  };

  const handleChange = (field, value) => {
    if (field === 'name') {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
      setName(filteredValue);
      if (filteredValue.trim().length >= 3 && errors.name) {
        setErrors(prev => { const { name, ...rest } = prev; return rest; });
      }
    }
    
    if (field === 'email') {
      setEmail(value);
      const trimmed = value.trim();
      if ((!trimmed || EMAIL_REGEX.test(trimmed)) && errors.email) {
        setErrors(prev => { const { email, ...rest } = prev; return rest; });
      }
    }
    
    if (field === 'referral') setReferral(value);
  };

  const handleContinue = async () => {
    if (!isFormValid || loading) return;
    setMessage('');
    
    try {
      setLoading(true);
      
      const response = await api.post('/api/auth/register', {
        userId: userId || "", 
        name: name.trim(),
        email: email.trim() || null, // Sent as null or empty string instead of " " to prevent API rejection
        referralCode: referral.trim() || null 
      });

      if (response?.data?.status === "200" || response?.status === 200) {
        navigation.navigate('TransactionPin');
      } else {
        setMessage(response?.data?.message || 'Failed to update registration profiles.');
      }
    } catch (error) {
      console.log('PROFILE UPDATE API ERROR:', error?.response?.data || error.message);
      setMessage(error?.response?.data?.message || 'Something went wrong while updates processing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F9FBF9" barStyle="dark-content" />

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
            <View style={styles.header}>
              <Image 
                source={require('../../../assets/images/LogoContainer.png')} 
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.illustrationContainer}>
              <Image 
                source={require('../../../assets/images/Header Image.png')} 
                style={styles.heroImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.stepBadgeContainer}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>Step 1 of 3</Text>
              </View>
            </View>

            <Text style={styles.mainTitle}>
              Complete Your <Text style={styles.titleAccent}>Profile!</Text>
            </Text>
            <Text style={styles.subTitle}>
              Just a few details to personalize your PAYO account
            </Text>

            {message ? <Text style={styles.errorCenter}>{message}</Text> : null}

            <View style={styles.labelRow}>
              <Image 
                source={require('../../../assets/images/person.png')}
                style={styles.labelIconImage}
                resizeMode="contain"
              />
              <Text style={styles.label}>Full Name <Text style={styles.requiredAsterisk}>*</Text></Text>
            </View>
            <View style={[styles.inputWrapper, errors.name && styles.errorInput]}>
              <TextInput
                style={styles.inputField}
                value={name}
                editable={!loading}
                onChangeText={(text) => handleChange('name', text)}
                onBlur={() => validateOnBlur('name')}
                placeholder="Enter your Full name"
                placeholderTextColor="#9CA3AF"
              />
              {isNameValid ? (
                <Icon name="check-circle" size={moderateScale(18)} color="#10B981" />
              ) : null}
            </View>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <View style={styles.labelRow}>
              <Image 
                source={require('../../../assets/images/Mail Icon.png')}
                style={styles.labelIconImage}
                resizeMode="contain"
              />
              <Text style={styles.label}>Email Address <Text style={styles.optionalText}>(Optional)</Text></Text>
            </View>
            <View style={[styles.inputWrapper, errors.email && styles.errorInput]}>
              <TextInput
                style={styles.inputField}
                value={email}
                editable={!loading}
                onChangeText={(text) => handleChange('email', text)}
                onBlur={() => validateOnBlur('email')}
                placeholder="Enter your Email address"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {trimmedEmail && EMAIL_REGEX.test(trimmedEmail) ? (
                <Icon name="check-circle" size={moderateScale(18)} color="#10B981" />
              ) : null}
            </View>
            {errors?.email && <Text style={styles.errorText}>{errors?.email}</Text>}

            <View style={styles.labelRow}>
              <Image 
                source={require('../../../assets/images/Gift Box Icon.png')}
                style={styles.labelIconImage}
                resizeMode="contain"
              />
              <Text style={styles.label}>Referral Code <Text style={styles.optionalText}>(Optional)</Text></Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                value={referral}
                editable={!loading}
                onChangeText={(text) => handleChange('referral', text)}
                placeholder="Enter Referral code"
                placeholderTextColor="#9CA3AF"
              />
              {referral.trim().length > 0 ? (
                <Icon name="check-circle" size={moderateScale(18)} color="#10B981" />
              ) : null}
            </View>

            <View style={styles.trustBannerContainer}>
              <View style={styles.trustItem}>
                <View style={styles.trustIconContainer}>
                  <Image 
                    source={require('../../../assets/images/vector.png')} 
                    style={styles.trustIconImage} 
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.trustTextContainer}>
                  <Text style={styles.trustTitle}>100% Secure</Text>
                  <Text style={styles.trustSub}>Your data is safe with us</Text>
                </View>
              </View>
              
              <View style={styles.trustDivider} />
              
              <View style={styles.trustItem}>
                <View style={styles.trustIconContainer}>
                  <Image 
                    source={require('../../../assets/images/vector1.png')} 
                    style={styles.trustIconImage} 
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.trustTextContainer}>
                  <Text style={styles.trustTitle}>Quick Setup</Text>
                  <Text style={styles.trustSub}>Take less than a minute</Text>
                </View>
              </View>
              
              <View style={styles.trustDivider} />
              
              <View style={styles.trustItem}>
                <View style={styles.trustIconContainer}>
                  <Image 
                    source={require('../../../assets/images/Rewards Icon.png')} 
                    style={styles.trustIconImage} 
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.trustTextContainer}>
                  <Text style={styles.trustTitle}>Exciting Rewards</Text>
                  <Text style={styles.trustSub}>Earn rewards on every transaction</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              disabled={!isFormValid || loading}
              style={[styles.continueButton, (!isFormValid || loading) && styles.continueButtonDisabled]} 
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <Text style={styles.continueButtonText}>Continue</Text>
                  <Icon name="arrow-right" size={moderateScale(16)} color="#FFF" style={styles.btnArrow} />
                </>
              )}
            </TouchableOpacity>
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
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('3%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(80), 
    width: '100%',
  },
  logoImage: {
    width: moderateScale(120),
    height: moderateScale(40),
  },
  illustrationContainer: {
    width: wp('90%'),
    height: hp('24%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('1%'),
    alignSelf: 'center',
  },
  heroImage: {
    width: '80%',
    height: '100%',
  },
  stepBadgeContainer: {
    alignItems: 'center',
    marginBottom: hp('1.2%'),
  },
  stepBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.5%'),
    borderRadius: moderateScale(16),
  },
  stepBadgeText: {
    color: '#3B82F6',
    fontWeight: '700',
    fontSize: moderateScale(11),
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontWeight: '500',
    color: '#111827',
  },
  titleAccent: {
    color: '#285CE0',
  },
  subTitle: {
    textAlign: 'center',
    color: '#414141',
    fontSize: moderateScale(12.5),
    marginTop: hp('1%'),
    marginBottom: hp('2.5%'),
    paddingHorizontal: wp('4%'),
    lineHeight: moderateScale(18),
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.8%'),
    marginBottom: hp('0.6%'),
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },
  labelIconImage: {
    width: moderateScale(16),
    height: moderateScale(16),
    marginRight: wp('1.8%'),
    marginTop: Platform.OS === 'ios' ? -2 : 0,
  },
  label: {
    fontSize: moderateScale(12.5),
    color: '#1F2937',
    fontWeight: '600',
    marginLeft: wp('1%'),
  },
  requiredAsterisk: {
    color: '#EF4444',
  },
  optionalText: {
    color: '#9CA3AF',
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: moderateScale(12),
    borderWidth: 1.2,
    borderColor: '#D1D5DB',
    paddingHorizontal: wp('4%'),
    height: hp('6.2%'),
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    marginTop: hp('0.5%'),
  },
  inputField: {
    flex: 1,
    fontSize: moderateScale(13.5),
    color: '#111827',
    fontWeight: '500',
    padding: 0,
  },
  errorInput: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: moderateScale(11),
    marginTop: hp('0.4%'),
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },
  errorCenter: {
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: hp('1%'),
    fontSize: moderateScale(12),
  },
  trustBannerContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0EEFB99',
    borderRadius: moderateScale(16),
    paddingVertical: hp('2%'),
    marginTop: hp('2%'),
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  trustItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: wp('1%'),
  },
  trustIconContainer: {
    height: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('0.8%'),
  },
  trustIconImage: {
    width: moderateScale(22),
    height: moderateScale(22),
  },
  trustTextContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  trustTitle: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
  },
  trustSub: {
    fontSize: moderateScale(9.5),
    color: '#6B7280',
    textAlign: 'center',
    marginTop: hp('0.4%'),
    lineHeight: moderateScale(13),
  },
  trustDivider: {
    width: 1,
    height: hp('5%'),
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
  },
  continueButton: {
    flexDirection: 'row',
    backgroundColor: '#5145E5',
    height: hp('6.2%'),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
    position: 'relative',
  },
  continueButtonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.6,
  },
  continueButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: moderateScale(15),
  },
  btnArrow: {
    position: 'absolute',
    right: wp('5%'),
  },
});
