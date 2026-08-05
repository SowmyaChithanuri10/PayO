

import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { moderateScale } from 'react-native-size-matters';
import { useRoute, useIsFocused } from "@react-navigation/native";
import { useAuth } from '../../context/AuthContext';
import Geolocation from 'react-native-geolocation-service';
import api from '../../api/axios';
import * as Keychain from 'react-native-keychain';


export default function TransactionPinScreen({ navigation }) {
  const route = useRoute();
  const isFocused = useIsFocused();
  const { amount, name, address, sender, senderData } = route.params || {};
  const { userId } = useAuth();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeInputField, setActiveInputField] = useState('pin');
  const [isKeyboardActive, setIsKeyboardActive] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const pinInputRef = useRef(null);
  const confirmPinInputRef = useRef(null);
  const is4Digits = pin?.length === 4;
  const isNotSequential = pin.length > 0 && !/^(0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210)$/.test(pin);
  const isNotRepeated = pin.length > 0 && !/^(.)\1{3}$/.test(pin) && !/(.)\1{1}(.)\2{1}/.test(pin); 
  const isNotEasyToGuess = pin.length > 0 && !/^(1234|1212|2525|1020|0000|1111|2222|3333|4444|5555|6666|7777|8888|9999)$/.test(pin);

  const isPinValidStructure = is4Digits && isNotSequential && isNotRepeated && isNotEasyToGuess;
  const isFormValid = isPinValidStructure && confirmPin.length === 4 && pin === confirmPin;

   const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve(`${latitude}, ${longitude}`); 
        },
        (error) => {
          console.warn("Error fetching location: ", error);
          resolve("Location Unavailable"); 
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

    const saveToken = async (token) => {
      try {
        await Keychain.setGenericPassword('user', token);
      } catch (e) {
        console.log('Token save error:', e);
      }
    };

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((visible) => !visible);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        if (activeInputField === 'pin') {
          pinInputRef.current?.focus();
        } else {
          confirmPinInputRef.current?.focus();
        }
      }, 200);
    }
  }, [isFocused, activeInputField]);

  const handleContinue = async () => {
    if (!isFormValid || loading) return;
    
    setError('');
    setLoading(true);
    //  navigation.navigate('Biometric');

    try {
      const fetchedIp = await NetworkInfo.getIPAddress();
      const uniqueId = await DeviceInfo.getUniqueId();
      const deviceModel = await DeviceInfo.getModel();
      const systemName = DeviceInfo.getSystemName();     
      const systemVersion = DeviceInfo.getSystemVersion(); 
      const dynamicLocation = await getCurrentLocation();


      const payload = {
        userId: userId,                      
        pin: pin,                                   
        ipAddress: fetchedIp,      
        deviceId: uniqueId, 
        deviceName: deviceModel,
        userAgent: `${systemName} ${systemVersion}`, 
        location: dynamicLocation,                      
      };

      console.log("Sending Dynamic Payload: ", payload);
      
      const response = await api.post(`/api/auth/set-pin`, payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data?.Status === "201") {
        Keyboard.dismiss();
        navigation.navigate('Biometric');
await saveToken((response?.data?.Token || response?.data?.token)?.trim());
      } else {
        setError(response.data?.Message || 'PIN validation check failed on backend.');
      }
    } catch (err) {
      console.error("API Call Interrupted:", err);
      setError(err.response?.data?.Message || 'Dynamic connection failed. Please check network setup.');
    } finally {
      setLoading(false);
    }
  };

  const focusPinInput = () => {
    setActiveInputField('pin');
    pinInputRef.current?.focus();
  };

  const focusConfirmPinInput = () => {
    setActiveInputField('confirmPin');
    confirmPinInputRef.current?.focus();
  };

  const renderPinBoxes = (value, isMasked, isSectionFocused, isTargetPinField) => {
    return Array(4).fill(0).map((_, index) => {
      const char = value[index];
      const isCurrentBoxActive = isSectionFocused && isKeyboardActive && index === value.length;

      const hasValidationError = isTargetPinField && pin.length === 4 && !isPinValidStructure;
      const hasMismatchError = !isTargetPinField && confirmPin.length === 4 && pin !== confirmPin;
      const isRedErrorState = hasValidationError || hasMismatchError;

      return (
        <View 
          key={index} 
          style={[
            styles.pinBox, 
            char ? styles.pinBoxFilled : null,
            isCurrentBoxActive ? styles.pinBoxActiveBorder : null,
            isRedErrorState ? styles.pinBoxErrorBorder : null
          ]}
        >
          {char ? (
            isMasked ? (
              <View style={[styles.filledBlueDot, isRedErrorState && styles.filledRedDot]} />
            ) : (
              <Text style={[styles.pinText, isRedErrorState && styles.pinTextError]}>{char}</Text>
            )
          ) : isCurrentBoxActive && cursorVisible ? (
            <View style={styles.cursorLine} />
          ) : null}
        </View>
      );
    });
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
            keyboardShouldPersistTaps="always"
          >
            <View style={styles.header}>

              <View style={styles.logoContainer}>
                <Image 
                  source={require('../../../assets/images/LogoContainer.png')} 
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.illustrationContainer}>
              <Image 
                source={require('../../../assets/images/Header Image (1).png')} 
                style={styles.heroImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.stepBadgeContainer}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>Step 2 of 3</Text>
              </View>
            </View>

            <Text style={styles.mainTitle}>
              Create a <Text style={styles.titleAccent}>4-digit Pin</Text>
            </Text>
            <Text style={styles.subTitle}>
              This pin protects your wallet and authorizes transactions
            </Text>

            {error ? (
              <Text style={styles.errorCenter}>{error}</Text>
            ) : null}

            {pin.length === 4 && !isPinValidStructure && (
              <Text style={styles.errorCenter}>PIN security requirement not met</Text>
            )}
            {confirmPin.length === 4 && pin !== confirmPin && (
              <Text style={styles.errorCenter}>PINs do not match</Text>
            )}

            <View style={styles.outerCenterContainer}>
              <TouchableOpacity activeOpacity={1} style={styles.sectionContainer} onPress={focusPinInput}>
                <Text style={styles.fieldLabel}>Create Pin</Text>
                <View style={styles.inputRowContainer}>
                  <View style={styles.pinBoxesWrapper}>
                    {renderPinBoxes(pin, !showPin, activeInputField === 'pin', true)}
                  </View>
                  
                  <TouchableOpacity style={styles.showButton} onPress={() => setShowPin(!showPin)}>
                    <Icon name={showPin ? "eye-off" : "eye"} size={moderateScale(18)} color="#2563EB" />
                    <Text style={styles.showText}>{showPin ? 'Hide' : 'Show'}</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  ref={pinInputRef}
                  style={styles.hiddenInput}
                  value={pin}
                  onChangeText={(text) => setPin(text.replace(/[^0-9]/g, '').slice(0, 4))}
                  keyboardType="number-pad"
                  maxLength={4}
                  onFocus={() => {
                    setActiveInputField('pin');
                    setIsKeyboardActive(true);
                  }}
                  onBlur={() => setIsKeyboardActive(false)}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={1} style={styles.sectionContainer} onPress={focusConfirmPinInput}>
                <Text style={styles.fieldLabel}>Confirm Pin</Text>
                <View style={styles.inputRowContainer}>
                  <View style={styles.pinBoxesWrapper}>
                    {renderPinBoxes(confirmPin, !showConfirmPin, activeInputField === 'confirmPin', false)}
                  </View>

                  <TouchableOpacity style={styles.showButton} onPress={() => setShowConfirmPin(!showConfirmPin)}>
                    <Icon name={showConfirmPin ? "eye-off" : "eye"} size={moderateScale(18)} color="#2563EB" />
                    <Text style={styles.showText}>{showConfirmPin ? 'Hide' : 'Show'}</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  ref={confirmPinInputRef}
                  style={styles.hiddenInput}
                  value={confirmPin}
                  onChangeText={(text) => setConfirmPin(text.replace(/[^0-9]/g, '').slice(0, 4))}
                  keyboardType="number-pad"
                  maxLength={4}
                  onFocus={() => {
                    setActiveInputField('confirmPin');
                    setIsKeyboardActive(true);
                  }}
                  onBlur={() => setIsKeyboardActive(false)}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.rulesCard}>
              <Image 
                source={require('../../../assets/images/shield-check.png')} 
                style={styles.shieldIcon}
                resizeMode="contain" 
              />
              
              <View style={styles.contentContainer}>
                <Text style={styles.rulesCardTitle}>PIN must have</Text>
                
                <View style={styles.gridContainer}>
                  <View style={styles.leftColumn}>

                    <View style={styles.gridItem}>
                      <Image 
                        source={require('../../../assets/images/Status Icon Container.png')} 
                        style={[styles.checkIcon, pin.length > 0 && !is4Digits && styles.tintIconRed]} 
                        resizeMode="contain"
                      />
                      <Text style={[
                        styles.ruleText, 
                        is4Digits && styles.ruleTextActive,
                        pin.length > 0 && !is4Digits && styles.ruleTextError
                      ]}>4 digits</Text>
                    </View>
                    
                    <View style={styles.gridItem}>
                      <Image 
                        source={require('../../../assets/images/Status Icon Container.png')} 
                        style={[styles.checkIcon, pin.length > 0 && !isNotEasyToGuess && styles.tintIconRed]} 
                        resizeMode="contain"
                      />
                      <Text style={[
                        styles.ruleText, 
                        isNotEasyToGuess && styles.ruleTextActive,
                        pin.length > 0 && !isNotEasyToGuess && styles.ruleTextError
                      ]}>Not easy to guess</Text>
                    </View>
                  </View>
                  
                  <View style={styles.rightColumn}>
                    <View style={styles.gridItem}>
                      <Image 
                        source={require('../../../assets/images/Status Icon Container.png')} 
                        style={[styles.checkIcon, pin.length > 0 && !isNotSequential && styles.tintIconRed]} 
                        resizeMode="contain"
                      />
                      <Text style={[
                        styles.ruleText, 
                        isNotSequential && styles.ruleTextActive,
                        pin.length > 0 && !isNotSequential && styles.ruleTextError
                      ]}>Not sequential (e.g. 1234)</Text>
                    </View>

                    <View style={styles.gridItem}>
                      <Image 
                        source={require('../../../assets/images/Status Icon Container.png')} 
                        style={[styles.checkIcon, pin.length > 0 && !isNotRepeated && styles.tintIconRed]} 
                        resizeMode="contain"
                      />
                      <Text style={[
                        styles.ruleText, 
                        isNotRepeated && styles.ruleTextActive,
                        pin.length > 0 && !isNotRepeated && styles.ruleTextError
                      ]}>Not repeated (e.g. 1122)</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              disabled={!isFormValid || loading}
              style={[styles.continueButton, (!isFormValid || loading) && styles.continueButtonDisabled]} 
              onPress={handleContinue}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <Text style={styles.continueButtonText}>Continue</Text>
                  <Icon name="arrow-right" size={moderateScale(16)} color="#FFF" style={styles.btnArrow} />
                </>
              )}
            </TouchableOpacity>

            <View style={styles.secureFooterContainer}>
              <Image 
                source={require('../../../assets/images/secure.png')} 
                style={styles.checkIcon} 
                resizeMode="contain"
              />
              <Text style={styles.secureFooterText}>Your PIN is Encrypted and stored securely.</Text>
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
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('3%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: hp('2%'),
    marginBottom: hp('1.5%'),
  },
  backButtonCircle: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: wp('28%'),
    height: hp('5%'),
  },
  illustrationContainer: {
    width: wp('90%'),
    height: hp('24%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('1%'),
    alignSelf: 'center',
  },
  heroImage: { width: '85%', height: '100%' },
  stepBadgeContainer: { alignItems: 'center', marginBottom: hp('2%') },
  stepBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.5%'),
    borderRadius: moderateScale(16),
  },
  stepBadgeText: { color: '#3B82F6', fontWeight: '700', fontSize: moderateScale(11) },
  mainTitle: { textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: '#111827' },
  titleAccent: { color: '#285CE0' },
  subTitle: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: moderateScale(12.5),
    marginTop: hp('0.8%'),
    marginBottom: hp('2.5%'),
    paddingHorizontal: wp('6%'),
    lineHeight: moderateScale(18),
  },
  outerCenterContainer: {
    alignItems: 'center',
    width: '100%',
  },
  sectionContainer: {
    marginBottom: hp('2.5%'),
    width: wp('75%'),
    paddingVertical: hp('0.5%'),
  },
  fieldLabel: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: '#000000',
    marginBottom: hp('1.2%'),
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: wp('1%'),
  },
  inputRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pinBoxesWrapper: {
    flexDirection: 'row',
    gap: wp('3%'),
    paddingVertical: hp('0.5%'),
  },
  pinBox: {
    width: wp('11.5%'),
    height: wp('11.5%'),
    borderWidth: 1.5,
    borderColor: '#D1D5DB', 
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  pinBoxActiveBorder: {
    borderColor: '#3B82F6', 
  },
  pinBoxFilled: {
    borderColor: '#2563EB',
  },
  pinBoxErrorBorder: {
    borderColor: '#EF4444',
  },
  filledBlueDot: {
    width: moderateScale(9),
    height: moderateScale(9),
    borderRadius: moderateScale(4.5),
    backgroundColor: '#2563EB',
  },
  filledRedDot: {
    backgroundColor: '#EF4444',
  },
  pinText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: '#2563EB',
  },
  pinTextError: {
    color: '#EF4444',
  },
  cursorLine: {
    width: 2,
    height: '45%',
    backgroundColor: '#3B82F6',
  },
  showButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('14%'),
    height: wp('11.5%'),
  },
  showText: {
    fontSize: moderateScale(9),
    color: '#2563EB',
    marginTop: hp('0.3%'),
    fontWeight: '500',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 0, 
    height: 0,
  },
  rulesCard: {
    backgroundColor: '#F4F3FF',
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginTop: hp('2.5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldIcon: {
    width: moderateScale(42),
    height: moderateScale(42),
    marginRight: wp('2%'),
    marginLeft: wp('-1%'),
  },
  contentContainer: {
    flex: 1,
  },
  rulesCardTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#374151',
    marginBottom: hp('0.8%'),
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '38%',
  },
  rightColumn: {
    width: '60%',
  },
  gridItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.8%'),
  },
  checkIcon: {
    width: moderateScale(16),  
    height: moderateScale(16),
  },
  tintIconRed: {
    tintColor: '#EF4444',
  },
  ruleText: {
    fontSize: moderateScale(10),
    color: '#9CA3AF',
    marginLeft: wp('1.5%'),      
    fontWeight: '500',
    flex: 1,
  },
  ruleTextActive: {
    color: '#10B981', 
  },
  ruleTextError: {
    color: '#EF4444', 
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
    marginHorizontal: wp('2%'),
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
  errorCenter: {
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: hp('1%'),
    fontSize: moderateScale(12),
    fontWeight: '600'
  },
  secureFooterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%'),
  },
  secureFooterText: {
    fontSize: moderateScale(10.5),
    color: '#6B7280',
    marginLeft: wp('1.5%'),
    fontWeight: '500',
  },
});
