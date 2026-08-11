
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';
import { navigate, resetRoot } from '../navigation/navigationRef';

const api = axios.create({
  baseURL: 'https://subtitle-outscore-collapse.ngrok-free.dev',
  timeout: 60000,
  headers: {
    'Accept': 'application/json',
  },
});


let isShowingSessionAlert = false;


api.interceptors.request.use(
  async (config) => {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      config.headers.Authorization = `Bearer ${credentials.password}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      console.log('Network/Internet Error:', error.message);
      navigate('NotFound', { errorType: 'NETWORK_ERROR' });
      return Promise.reject(error);
    }

    const { status } = error.response;

  if (status === 401) {
  console.log('Session Expired [401]: Clearing credentials');

  await Keychain.resetGenericPassword();

  if (!isShowingSessionAlert) {
    isShowingSessionAlert = true;

    Alert.alert(
      'Session Expired',
      'Your session has expired. Please Login again to continue.',
      [
        {
          text: 'OK',
          onPress: () => {
            isShowingSessionAlert = false;
            resetRoot('Login');
          },
        },
      ],
      { cancelable: false }
    );
  }

  return Promise.reject(error);
}

    return Promise.reject(error);
  },
);

export default api;

export const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    console.log('GetToken error:', error);
    return null;
  }
};