

import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { moderateScale } from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  authenticateWithBiometrics,
  setBiometricsEnabled,
  checkBiometrics,
} from '../../utils/biometric';

const IMAGES = {
  backArrow: require('../../../assets/images/biomatric/Flash Icon.png'),
  logo: require('../../../assets/images/LogoContainer.png'), // Shared container asset
  heroIllustration: require('../../../assets/images/biomatric/Header_Image.png'),
  iconShield: require('../../../assets/images/biomatric/shield-check.png'),
  iconFlash: require('../../../assets/images/biomatric/Flash Icon.png'),
  iconPerson: require('../../../assets/images/biomatric/Person Icon.png'),
  iconFingerprint: require('../../../assets/images/biomatric/Biometric Icon.png'),
  iconClock: require('../../../assets/images/biomatric/timer (1).png'),
  iconArrowRightWhite: require('../../../assets/images/biomatric/Arrow Icon.png'),
  iconArrowRightBlue: require('../../../assets/images/biomatric/arrow_left_alt.png'),
  iconLockPurple: require('../../../assets/images/biomatric/Security Icon Vector.png'),
};

export default function BiometricScreen({ navigation }) {
  const [loading, setLoading] = React.useState(false);

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

  const handleEnableBiometric = async () => {
    setLoading(true);

    const { available, biometryType } = await checkBiometrics();
    if (!available) {
      Alert.alert(
        'Biometrics Unavailable',
        'Your device does not support biometrics or no biometrics are enrolled. Please set up a fingerprint or face in your device settings.',
        [{ text: 'OK' }]
      );
      setLoading(false);
      return;
    }

    const { success, error } = await authenticateWithBiometrics({
      promptMessage: `Enable ${biometryType || 'Biometric'} login for faster access`,
      allowDeviceCredential: true, 
      fallbackTitle: 'Use Device Passcode',
    });

    setLoading(false);

    if (success) {
      await setBiometricsEnabled(true);
      navigation.navigate('WelcomeProfile');
    } else {
      if (error) {
        Alert.alert('Authentication Failed', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FBF9" />
      
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
                  source={IMAGES.logo} 
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.illustrationContainer}>
              <Image source={IMAGES.heroIllustration} style={styles.heroImage} resizeMode="contain" />
            </View>

            <View style={styles.stepBadgeContainer}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>Step 3 of 3</Text>
              </View>
            </View>
            <Text style={styles.mainTitle}>
              Quick & Secure <Text style={styles.titleAccent}>Login</Text>
            </Text>
            <Text style={styles.subTitle}>
              Use Face ID or Fingerprint to login securely without entering your PIN every time
            </Text>
            <View style={styles.featuresCard}>
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Image source={IMAGES.iconShield} style={styles.featureIcon} />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>More Secure</Text>
                  <Text style={styles.featureDescription}>
                    Biometrics are unique to you and can't be shared.
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Image source={IMAGES.iconFlash} style={styles.featureIcon} />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Faster Access</Text>
                  <Text style={styles.featureDescription}>
                    Login in a second. No need to remember your PIN
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Image source={IMAGES.iconPerson} style={styles.featureIcon} />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>100% Private</Text>
                  <Text style={styles.featureDescription}>
                    Your biometric data stays on your device only
                  </Text>
                </View>
              </View>
            </View>


            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={handleEnableBiometric}
                style={styles.primaryButton}
                activeOpacity={0.8}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#6342E8', '#3D52E6']}
                  style={styles.primaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View style={styles.buttonInnerContent}>
                    {loading ? (
                      <ActivityIndicator color="#fff" style={{ flex: 1 }} />
                    ) : (
                      <>
                        <Image source={IMAGES.iconFingerprint} style={styles.btnLeftIcon} />
                        <Text style={styles.primaryButtonText}>Enable Biometric</Text>
                        <Image source={IMAGES.iconArrowRightWhite} style={styles.btnRightIcon} />
                      </>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.7}
                onPress={() => navigation.replace('WelcomeProfile')}
              >
                <View style={styles.buttonInnerContent}>
                  <Image source={IMAGES.iconClock} style={styles.btnLeftIcon} />
                  <Text style={styles.secondaryButtonText}>Not Now</Text>
                  <Image source={IMAGES.iconArrowRightBlue} style={styles.btnRightIcon} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('WelcomeProfile')}>
                <Text style={styles.skipButtonText}>Skip for now</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerContainer}>
              <Image source={IMAGES.iconLockPurple} style={styles.footerLockIcon} />
              <Text style={styles.footerText}>
                You can change this later in <Text style={styles.footerTextLink}>Settings</Text>
              </Text>
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
  heroImage: { 
    width: '85%', 
    height: '100%' 
  },
  stepBadgeContainer: { 
    alignItems: 'center', 
    marginBottom: hp('2%') 
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
    fontSize: moderateScale(11) 
  },
  mainTitle: { 
    textAlign: 'center', 
    fontSize: moderateScale(20), 
    fontWeight: '500', 
    color: '#111827' 
  },
  titleAccent: { 
    color: '#285CE0' 
  },
  subTitle: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: moderateScale(12.5),
    marginTop: hp('0.8%'),
    marginBottom: hp('2.5%'),
    paddingHorizontal: wp('6%'),
    lineHeight: moderateScale(18),
  },
  featuresCard: {
    width: '100%',
    backgroundColor: '#F4F3FF', 
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginVertical: hp('2%'),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
  },
  featureTextContainer: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  featureTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#374151',
  },
  featureDescription: {
    fontSize: moderateScale(11),
    color: '#6B7280',
    marginTop: hp('0.2%'),
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: hp('1.2%'),
  },
  buttonsContainer: {
    width: '100%',
    marginTop: hp('2%'),
  },
  primaryButton: {
    height: hp('6.2%'),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    marginBottom: hp('1.5%'),
  },
  primaryGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInnerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: wp('4%'),
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: moderateScale(15),
    flex: 1,
    textAlign: 'center',
  },
  secondaryButton: {
    height: hp('6.2%'),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  secondaryButtonText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: moderateScale(15),
    flex: 1,
    textAlign: 'center',
  },
  btnLeftIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  btnRightIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  skipButtonText: {
    color: '#9CA3AF',
    fontSize: moderateScale(13),
    fontWeight: '500',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
  footerLockIcon: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: 'contain',
  },
  footerText: {
    fontSize: moderateScale(11),
    color: '#6B7280',
    marginLeft: wp('1.5%'),
    fontWeight: '500',
  },
  footerTextLink: {
    color: '#5145E5',
    fontWeight: '700',
  },
});