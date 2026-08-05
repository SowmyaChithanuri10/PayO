import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BIOMETRICS_ENABLED_KEY = '@biometrics_enabled';

const rnBiometrics = new ReactNativeBiometrics();

export const checkBiometrics = async () => {
  try {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();
    return { available, biometryType };
  } catch (error) {
    console.warn('Biometric check error:', error);
    return { available: false, biometryType: null };
  }
};

export const authenticateWithBiometrics = async (options = {}) => {
  const {
    promptMessage = 'Authenticate to enable biometric login',
    cancelTitle = 'Cancel',
    allowDeviceCredential = true,
    fallbackTitle = 'Use Passcode',
  } = options;

  try {
    const { success, error } = await rnBiometrics.simplePrompt({
      promptMessage,
      cancelButtonText: cancelTitle,
      deviceCredentialAllowed: allowDeviceCredential, // Android
      fallbackTitle, // iOS
    });

    if (success) {
      return { success: true };
    } else {
      return { success: false, error: error || 'Authentication failed' };
    }
  } catch (error) {
    console.error('Biometric authentication error:', error);
    return { success: false, error: error.message };
  }
};


export const setBiometricsEnabled = async (enabled = true) => {
  await AsyncStorage.setItem(BIOMETRICS_ENABLED_KEY, JSON.stringify(enabled));
};

export const getBiometricsEnabled = async () => {
  const value = await AsyncStorage.getItem(BIOMETRICS_ENABLED_KEY);
  return value ? JSON.parse(value) : false;
};