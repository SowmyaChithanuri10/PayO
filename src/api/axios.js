// import axios from 'axios';
// import * as Keychain from 'react-native-keychain';

// const api = axios.create({
//   // baseURL: 'https://skyline-plated-casualty.ngrok-free.dev',
//    baseURL: 'https://purr-expediter-doorway.ngrok-free.dev',
//   //  baseURL: 'http://localhost:3001', //////local 
//   // baseURL :"http://10.0.2.2:3001", /////laptop 
//   // baseURL :"http://192.168.29.219:3001", ////// my mobile
//   timeout: 60000,
//    headers: {
//     'Accept': 'application/json',
//   }
// });



// api.interceptors.request.use(
//   async config => {
//     const credentials = await Keychain.getGenericPassword();

//     if (credentials) {
//       config.headers.Authorization = `Bearer ${credentials.password}`;
//     }

//     console.log('REQUEST URL =>', `${config.baseURL}${config.url}`);
//     console.log('METHOD =>', config.method);
//     console.log('HEADERS =>', config.headers);

//     return config;
//   },
//   error => Promise.reject(error),
// );

// export default api;

// // ✅ FIXED (async + no error)
// export const getToken = async () => {
//   try {
//     const credentials = await Keychain.getGenericPassword();
//     if (credentials) {
//       return credentials.password;
//     }
//     return null;
//   } catch (error) {
//     console.log('GetToken error:', error);
//     return null;

//   }
// };



// import axios from 'axios';
// import * as Keychain from 'react-native-keychain';
// import { Alert } from 'react-native';
// import { navigate } from '../navigation/navigationRef';

// const api = axios.create({
//   //baseURL: 'https://subtitle-outscore-collapse.ngrok-free.dev',
//   //baseURL: 'http://10.10.10.82:3001',
//   baseURL: 'https://music-remission-stark.ngrok-free.dev',
//   timeout: 60000,
//   headers: {
//     'Accept': 'application/json',
//   },
// });

// // Request Interceptor
// api.interceptors.request.use(
//   async (config) => {
//     const credentials = await Keychain.getGenericPassword();

//     if (credentials) {
//       config.headers.Authorization = `Bearer ${credentials.password}`;
//     }

//     console.log('REQUEST URL =>', `${config.baseURL}${config.url}`);
//     console.log('METHOD =>', config.method);
//     console.log('HEADERS =>', config.headers);

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // Response Interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // 1. Internet / Network Error (No response received)
//     if (!error.response) {
//       console.log('Network/Internet Error:', error.message);
//       navigate('NotFound', { errorType: 'NETWORK_ERROR' });
//       return Promise.reject(error);
//     }

//     const { status } = error.response;

//     // 2. Session Expired / Unauthorized (401)
//     if (status === 401) {
//       console.log('Session Expired [401]: Clearing credentials and redirecting to Login');

//       // Clear cached keychain tokens
//       await Keychain.resetGenericPassword();

//       // Show Session Expired Alert
//       Alert.alert(
//         'Session Expired',
//         'Your session has expired. Please Login again to continue.',
//         [
//           {
//             text: 'OK',
//             onPress: () => {
//               // Navigate to Login screen
//               navigate('Onboarding3');
//             },
//           },
//         ],
//         { cancelable: false }
//       );

//       return Promise.reject(error);
//     }


//     // if (status === 404 || status >= 500) {
//     //   console.log(`API Error [Status ${status}]: Navigating to NotFound screen`);
//     //   navigate('NotFound', { errorType: status });
//     // }

//     return Promise.reject(error);
//   },
// );

// export default api;

// export const getToken = async () => {
//   try {
//     const credentials = await Keychain.getGenericPassword();
//     if (credentials) {
//       return credentials.password;
//     }
//     return null;
//   } catch (error) {
//     console.log('GetToken error:', error);
//     return null;
//   }
// };


import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';
import { navigate, resetRoot } from '../navigation/navigationRef';

const api = axios.create({
  baseURL: 'https://music-remission-stark.ngrok-free.dev',
  timeout: 60000,
  headers: {
    'Accept': 'application/json',
  },
});

// Flag to prevent multiple session expired alerts from stacking
let isShowingSessionAlert = false;

// Request Interceptor
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

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 1. Internet / Network Error (No response received)
    if (!error.response) {
      console.log('Network/Internet Error:', error.message);
      navigate('NotFound', { errorType: 'NETWORK_ERROR' });
      return Promise.reject(error);
    }

    const { status } = error.response;

    // 2. Session Expired / Unauthorized (401)
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
            // Use resetRoot instead of navigate
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