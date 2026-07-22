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


// api.js
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { navigate } from '../navigation/navigationRef';
// import { navigate } from './navigation/navigationRef'; // Import navigate helper

const api = axios.create({
  baseURL: 'https://purr-expediter-doorway.ngrok-free.dev',
  timeout: 60000,
  headers: {
    'Accept': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      config.headers.Authorization = `Bearer ${credentials.password}`;
    }

    console.log('REQUEST URL =>', `${config.baseURL}${config.url}`);
    console.log('METHOD =>', config.method);
    console.log('HEADERS =>', config.headers);

    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ ADDED: Response Interceptor for Global Errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. Internet / Network Error (No response received)
    if (!error.response) {
      console.log('Network/Internet Error:', error.message);
      navigate('NotFound', { errorType: 'NETWORK_ERROR' });
      return Promise.reject(error);
    }

    const { status } = error.response;

    // 2. Global API Errors (404 Not Found or Server 500s)
    if (status === 404 || status >= 500) {
      console.log(`API Error [Status ${status}]: Navigating to 404 screen`);
      navigate('NotFound', { errorType: status });
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

// ✅ REQUEST INTERCEPTOR (no change needed, just safe)
// api.interceptors.request.use(
//   async (config) => {
//     try {
//       const credentials = await Keychain.getGenericPassword();

//       if (credentials) {
//         const token = credentials.password;
//         config.headers.Authorization = `Bearer ${token}`;
//       }

//       return config;
//     } catch (error) {
//       console.log('Interceptor error:', error);
//       return config;
//     }
//   },
//   (error) => Promise.reject(error)
// );

// export default api;