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
  PermissionsAndroid, 
  Alert,              
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/axios';
import Icon from 'react-native-vector-icons/Feather';
import { moderateScale, verticalScale, windowWidth } from '../utils/responsive';
import { useAuth } from '../context/AuthContext';

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
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [testOtp, setTestOtp] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [navParams, setNavParams] = useState(null); // Temporarily stores navigation data

  const isValidMobile = mobile?.length === 10;

  const openTermsModal = () => {
    Keyboard.dismiss();
    setTermsModalVisible(true);
  };

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
    return true; 
  };

  const handleSendOTP = async () => {
    if (!mobile || mobile.length !== 10) {
      setError('Enter valid mobile number');
      return;
    }

    const hasLocationPermission = await requestLocationPermission();
    if (!hasLocationPermission) {
      Alert.alert(
        'Permission Denied',
        'Location access is mandatory to register. Please allow location access to continue.',
        [{ text: 'OK' }]
      );
      return; 
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
        response.data?.status === '200' &&
        response.data?.message === 'OTP Sent Successfully'
      ) {
        
        const params = {
          mobile,
          countryCode: computedCountryCode,
          userId: response.data?.userId,
          type: 'register',
        };

        setUserId(response.data.userId);

        const receivedOtp = response.data?.otp || response.data?.data?.otp;
        
        if (receivedOtp) {
          setTestOtp(String(receivedOtp));
          setNavParams(params);
          setShowOtpPopup(true);
        } else {
          navigation.navigate('OTP', params);
        }
      } 
      else if(response.data?.status === '202' &&
        response.data?.message === 'Registration already initiated for this mobile number. Please use RESEND_OTP to receive a new OTP.'){
           const params = {
          mobile,
          countryCode: computedCountryCode,
          userId: response.data?.userId,
          type: 'register',
          msg:"resend Otp"
        };
     setUserId(response?.data?.userId);
          navigation.navigate('OTP', params);
      }
      else if(response.data?.status === '202' &&
        response.data?.message === 'Mobile Verification Completed'){
          setUserId(response?.data?.userId);
          navigation.replace('Profile');
      }
        else if(response.data?.status === '202' &&
        response.data?.message === 'Profile is completed! TPIN Generation is pending'){
                                    
          setUserId(response?.data?.userId);
        navigation.navigate('TransactionPin');
      }
      
      else {
        setError(response.data?.message || 'Something went wrong');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToVerify = () => {
    setShowOtpPopup(false);
    if (navParams) {
      navigation.navigate('OTP', { ...navParams, testOtp }); 
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
      <Modal
        visible={showOtpPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={handleProceedToVerify}
      >
        <View style={styles.testModalOverlay}>
          <View style={styles.testModalContent}>
            <View style={styles.testModalIconContainer}>
              <Icon name="message-circle" size={moderateScale(28)} color="#2962FF" />
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
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
              </TouchableOpacity>
              
              <Image 
                source={require('../../assets/images/LogoContainer.png')} 
                style={styles.logo}
              />
            </View>

            <Image 
              source={require('../../assets/images/registerscreen.png')} 
              style={styles.heroImage}
            />

            <View style={styles.titleContainer}>
               <Text style={styles.titleBlack}>
                 Enter Your <Text style={styles.titleBlue}>Mobile Number</Text>
               </Text>
             
              <Text style={styles.desc}>
                We will send a one time code to verify your number. Standard rates may apply.
              </Text>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.inputSection}>
              <Text style={styles.label}>Mobile Number</Text>

              <View style={styles.inputContainerRow}>
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

                <View style={[styles.mobileInputBox, isValidMobile && styles.mobileInputBoxValid]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your Mobile number"
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
                  {isValidMobile && (
                    <Icon name="check-circle" size={moderateScale(20)} color="#28A745" />
                  )}
                </View>
              </View>
            </View>

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
    backgroundColor: '#E8EFFF',
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
    color: '#2962FF',
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
    backgroundColor: '#5655FF',
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
