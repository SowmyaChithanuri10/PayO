// import { useState, useEffect, useRef, useCallback } from 'react';
// import { AppState, Linking } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { InAppBrowser } from 'react-native-inappbrowser-reborn';

// const STATUS_POLL_INTERVAL = 3000;
// const MAX_POLL_TIMEOUT = 90000;

// export const useDigiLockerKyc = () => {
//   const [kycStatus, setKycStatus] = useState('NOT_STARTED');
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const pollTimerRef = useRef(null);
//   const pollStartRef = useRef(null);
//   const appState = useRef(AppState.currentState);

//   const checkInitialStatus = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('/api/v1/kyc/status');
//       if (res.data?.status) {
//         setKycStatus(res.data.status);
//       }
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || 'Failed to fetch KYC status');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const initiateDigiLocker = async () => {
//     try {
//       setLoading(true);
//       setErrorMessage(null);
      
//       const res = await axios.post('/api/v1/kyc/digilocker/initiate', {
//         kycType: 'DIGILOCKER',
//         purpose: 'PAYO_KYC',
//         returnContext: 'mobile', 
//       });

//       const { requestId, authorizationUrl } = res.data;
//       if (authorizationUrl && requestId) {
//         await AsyncStorage.setItem('payo_kyc_request_id', requestId);
//         setKycStatus('INITIATED');
        
//         // Open DigiLocker in a secure in-app browser
//         if (await InAppBrowser.isAvailable()) {
//           InAppBrowser.open(authorizationUrl, {
//             // Android properties
//             showTitle: true,
//             toolbarColor: '#6200EE',
//             secondaryToolbarColor: 'black',
//             enableUrlBarHiding: true,
//             enableDefaultShare: false,
//             forceCloseOnRedirection: false,
//             // iOS properties
//             dismissButtonStyle: 'cancel',
//             preferredBarTintColor: '#6200EE',
//             preferredControlTintColor: 'white',
//             readerMode: false,
//             animated: true,
//             modalPresentationStyle: 'fullScreen',
//             modalTransitionStyle: 'coverVertical',
//             modalEnabled: true,
//             enableBarCollapsing: false,
//           });
//         } else {
//           // Fallback to system browser
//           Linking.openURL(authorizationUrl);
//         }
        
//         startPolling(requestId);
//       }
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || 'Unable to initiate DigiLocker session');
//       setKycStatus('FAILED');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startPolling = useCallback((activeRequestId) => {
//     if (!activeRequestId) return;
//     setKycStatus('PROCESSING');
//     pollStartRef.current = Date.now();

//     pollTimerRef.current = setInterval(async () => {
//       if (Date.now() - pollStartRef.current > MAX_POLL_TIMEOUT) {
//         clearInterval(pollTimerRef.current);
//         setKycStatus('RETRY_REQUIRED');
//         setErrorMessage('Verification timed out. Please try again.');
//         InAppBrowser.close();
//         return;
//       }

//       try {
//         const res = await axios.get(`/api/v1/kyc/digilocker/status/${activeRequestId}`);
//         const status = res.data?.status;

//         if (status === 'VERIFIED') {
//           clearInterval(pollTimerRef.current);
//           await AsyncStorage.removeItem('payo_kyc_request_id');
//           setKycStatus('VERIFIED');
//           InAppBrowser.close(); 
//         } else if (status === 'FAILED' || status === 'EXPIRED') {
//           clearInterval(pollTimerRef.current);
//           await AsyncStorage.removeItem('payo_kyc_request_id');
//           setKycStatus('FAILED');
//           setErrorMessage(res.data?.failureReason || 'Verification failed');
//           InAppBrowser.close(); 
//         }
//       } catch (err) {
//         if (err.response?.status === 404 || err.response?.status === 400) {
//           clearInterval(pollTimerRef.current);
//           setKycStatus('FAILED');
//           setErrorMessage(err.response?.data?.message || 'Invalid verification session');
//           InAppBrowser.close();
//         }
//       }
//     }, STATUS_POLL_INTERVAL);
//   }, []);

//   const retryKyc = async () => {
//     try {
//       setLoading(true);
//       await axios.post('/api/v1/kyc/retry');
//       await AsyncStorage.removeItem('payo_kyc_request_id');
//       setKycStatus('NOT_STARTED');
//       setErrorMessage(null);
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || 'Retry initiation failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', async (nextAppState) => {
//       if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//         const savedReqId = await AsyncStorage.getItem('payo_kyc_request_id');
//         if (savedReqId && (kycStatus === 'INITIATED' || kycStatus === 'PROCESSING')) {
//           startPolling(savedReqId);
//         }
//       }
//       appState.current = nextAppState;
//     });

//     return () => {
//       subscription.remove();
//       if (pollTimerRef.current) clearInterval(pollTimerRef.current);
//     };
//   }, [kycStatus, startPolling]);

//   return { kycStatus, loading, errorMessage, initiateDigiLocker, retryKyc, checkInitialStatus };
// };




import { useState, useCallback } from 'react';

export const useDigiLockerKyc = () => {
  const [kycStatus, setKycStatus] = useState('NOT_STARTED');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Simulate checking the initial status when the screen loads
  const checkInitialStatus = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      // Change 'NOT_STARTED' to 'VERIFIED' or 'FAILED' to test those specific screens on load
      setKycStatus('NOT_STARTED');
      setLoading(false);
    }, 1000);
  }, []);

  // 2. Simulate the full DigiLocker flow
  const initiateDigiLocker = () => {
    setLoading(true);
    setErrorMessage(null);

    // Step A: Simulate API call to get the URL
    setTimeout(() => {
      setLoading(false);
      setKycStatus('INITIATED'); // Triggers the 'KycUnderReview' screen

      // Step B: Simulate the user being inside the DigiLocker browser for 3 seconds
      setTimeout(() => {
        setKycStatus('PROCESSING'); // Triggers background polling state

        // Step C: Simulate the backend finally returning success after 2 seconds
        setTimeout(() => {
          // TIP: Change 'VERIFIED' to 'FAILED' here to test the error screen
          setKycStatus('VERIFIED');
          // Uncomment the line below if you want to test the error message display:
          // setErrorMessage('Identity mismatch. Please try again.'); 
        }, 2000);

      }, 3000);

    }, 1000);
  };

  // 3. Simulate the retry button action
  const retryKyc = () => {
    setLoading(true);
    setTimeout(() => {
      setKycStatus('NOT_STARTED');
      setErrorMessage(null);
      setLoading(false);
    }, 800);
  };

  return {
    kycStatus,
    loading,
    errorMessage,
    initiateDigiLocker,
    retryKyc,
    checkInitialStatus,
  };
};