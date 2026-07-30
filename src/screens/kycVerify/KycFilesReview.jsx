// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Alert,
//   ActivityIndicator,
//   Image,
//   Modal,
//   StyleSheet,
//   Dimensions,
//   Platform,
// } from 'react-native';

// import Icon from 'react-native-vector-icons/Feather';
// import { WebView } from 'react-native-webview';
// import styles from './KycFilesReviewStyles';

// // API imports
// import api, { getToken } from '../../api/axios';
// import RNFS from 'react-native-fs';

// const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

// export default function KycFilesReview({ navigation, route }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [token, setToken] = useState("");
  
//   // State for universal preview modal
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewFile, setPreviewFile] = useState({ uri: "", type: "", name: "" });

//   // Get all files passed from the KYCVerification screen
//   const { existingFiles } = route.params || {};

//   useEffect(() => {
//     const fetchToken = async () => {
//       const storedToken = await getToken();
//       setToken(storedToken);
//     };
//     fetchToken();
//   }, []);

//   // --- API upload functions ---
//   const uploadAadhar = async () => {
//     try {
//       const aadharBase64 = await RNFS.readFile(existingFiles.aadhaarFile?.uri, 'base64');
//       const selfieBase64 = await RNFS.readFile(existingFiles.faceFile?.uri, 'base64');
//       const payload = {
//         aadharFront: `data:${existingFiles.aadhaarFile?.type};base64,${aadharBase64}`,
//         selfie: `data:${existingFiles.faceFile.type};base64,${selfieBase64}`,
//       };
//       const response = await api.post('/api/kyc/upload-aadhar-documents', payload);
//       return response.data;
//     } catch (error) { throw error; }
//   };

//   const uploadPan = async () => {
//     try {
//       const panBase64 = await RNFS.readFile(existingFiles.panFile?.uri, 'base64');
//       const payload = { panCard: `data:${existingFiles.panFile?.type};base64,${panBase64}` };
//       const response = await api.post('/api/kyc/upload-pan-documents', payload);
//       return response.data;
//     } catch (error) { throw error; }
//   };

//   const uploadPassbook = async () => {
//     try {
//       const passbookBase64 = await RNFS.readFile(existingFiles.passbookFile?.uri, 'base64');
//       const payload = { passbook: `data:${existingFiles.passbookFile?.type};base64,${passbookBase64}` };
//       const response = await api.post('/api/kyc/upload-passbook-documents', payload);
//       return response.data;
//     } catch (error) { throw error; }
//   };

//   const submitForReview = async () => {
//     const payload = { token: token };
//     await api.post('/api/kyc/submit-for-review', payload);
//   };

//   const handleSubmitKyc = async () => {
//     setIsLoading(true);
//     try {
//       await uploadAadhar();
//       await uploadPan();
//       await uploadPassbook();
//       await submitForReview();

//       Alert.alert('Success', 'All documents uploaded successfully', [
//         {
//           text: 'OK',
//           onPress: () => navigation.reset({
//             index: 0,
//             routes: [{ name: 'KycUnderReview' }],
//           }),
//         },
//       ]);
//     } catch (error) {
//       Alert.alert('Upload Failed', error.message || 'Failed to upload documents. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleReplace = (tabName) => {
//     navigation.navigate('KYCVerification', {
//       replaceTab: tabName,
//       existingFiles: existingFiles
//     });
//   };

//   const handleOpenPreview = async (file, fallbackName) => {
//     if (!file?.uri) {
//       Alert.alert('Preview Unavailable', 'Document file path is missing.');
//       return;
//     }

//     const isPdf = 
//       file.type?.toLowerCase().includes('pdf') || 
//       file.uri?.toLowerCase().endsWith('.pdf') || 
//       file.name?.toLowerCase().endsWith('.pdf');

//     if (Platform.OS === 'android' && isPdf && file.uri.startsWith('content://')) {
//       try {
//         const cacheFileName = `preview_${Date.now()}_${file.name || 'document.pdf'}`;
//         const destPath = `${RNFS.CachesDirectoryPath}/${cacheFileName}`;

//         // Stream from content provider safely to local app cache path
//         await RNFS.copyFile(file.uri, destPath);
//         const safeLocalUri = `file://${destPath}`;

//         setPreviewFile({
//           uri: safeLocalUri,
//           type: 'application/pdf',
//           name: file.name || fallbackName
//         });
//         setPreviewVisible(true);
//       } catch (error) {
//         console.error('Failed to resolve Android content URI:', error);
//         Alert.alert('Preview Error', 'Could not open this PDF safely.');
//       }
//     } else {
//       setPreviewFile({
//         uri: file.uri,
//         type: file.type || '',
//         name: file.name || fallbackName
//       });
//       setPreviewVisible(true);
//     }
//   };

//   const isPdfFile = (file) => {
//     return (
//       file.type?.toLowerCase().includes('pdf') ||
//       file.uri?.toLowerCase().endsWith('.pdf') ||
//       file.name?.toLowerCase().endsWith('.pdf')
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#F9FFFB" barStyle="dark-content" />
//       <View style={styles.container}>
        
//         {/* Header */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//             <Icon name="chevron-left" size={20} color="#285CE0" />
//           </TouchableOpacity>
//           <View style={styles.titleWrapper}>
//             <Text style={styles.heading}>Review Your Information</Text>
//             <Text style={styles.subText}>
//               Please review all the information before submitting your KYC application.
//             </Text>
//           </View>
//           <TouchableOpacity>
//             <Image source={require('../../../assets/images/kycscreens/Help Icon.png')} style={styles.helpIcon} />
//           </TouchableOpacity>
//         </View>

//         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
//           {/* Aadhaar Details Card */}
//           <Text style={styles.sectionTitle}>• Aadhar Details</Text>
//           <TouchableOpacity 
//             style={styles.reviewCard} 
//             onPress={() => handleOpenPreview(existingFiles?.aadhaarFile, 'Aadhar.png')}
//             activeOpacity={0.9}
//           >
//             <Icon name={isPdfFile(existingFiles?.aadhaarFile || {}) ? "file-text" : "camera"} size={32} color="#03B244" style={localStyles.centeredIcon} />
//             <Text style={styles.fileName}>{existingFiles?.aadhaarFile?.name || 'Aadhar.png'}</Text>
//             <TouchableOpacity onPress={() => handleReplace('aadhaar')}>
//               <Text style={styles.clickToReplace}>Click to replace</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>

//           {/* Selfie Details Card */}
//           <Text style={styles.sectionTitle}>• Selfie Photo</Text>
//           <TouchableOpacity 
//             style={styles.reviewCard} 
//             onPress={() => handleOpenPreview(existingFiles?.faceFile, 'Selfie.png')}
//             activeOpacity={0.9}
//           >
//             <Icon name="user" size={32} color="#03B244" style={localStyles.centeredIcon} />
//             <Text style={styles.fileName}>{existingFiles?.faceFile?.name || 'Selfie.png'}</Text>
//             <TouchableOpacity onPress={() => handleReplace('aadhaar')}>
//               <Text style={styles.clickToReplace}>Click to replace</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>

//           {/* PAN Details Card */}
//           <Text style={styles.sectionTitle}>• PAN Details</Text>
//           <TouchableOpacity 
//             style={styles.reviewCard} 
//             onPress={() => handleOpenPreview(existingFiles?.panFile, 'PAN.png')}
//             activeOpacity={0.9}
//           >
//             <Icon name={isPdfFile(existingFiles?.panFile || {}) ? "file-text" : "camera"} size={32} color="#03B244" style={localStyles.centeredIcon} />
//             <Text style={styles.fileName}>{existingFiles?.panFile?.name || 'PAN.png'}</Text>
//             <TouchableOpacity onPress={() => handleReplace('pan')}>
//               <Text style={styles.clickToReplace}>Click to replace</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>

//           {/* Passbook Details Card */}
//           <Text style={styles.sectionTitle}>• Cancel Cheque or Passbook Details</Text>
//           <TouchableOpacity 
//             style={styles.reviewCard} 
//             onPress={() => handleOpenPreview(existingFiles?.passbookFile, 'Passbook.png')}
//             activeOpacity={0.9}
//           >
//             <Icon name={isPdfFile(existingFiles?.passbookFile || {}) ? "file-text" : "camera"} size={32} color="#03B244" style={localStyles.centeredIcon} />
//             <Text style={styles.fileName}>{existingFiles?.passbookFile?.name || 'Passbook.png'}</Text>
//             <TouchableOpacity onPress={() => handleReplace('passbook')}>
//               <Text style={styles.clickToReplace}>Click to replace</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>

//         </ScrollView>

//         {/* Action Tray */}
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity 
//             style={[styles.submitBtn, isLoading && { opacity: 0.7 }]} 
//             onPress={handleSubmitKyc} 
//             disabled={isLoading}>
//             {isLoading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <>
//                 <Text style={styles.submitBtnText}>Submit KYC</Text>
//                 <Icon name="arrow-right" size={20} color="#fff" />
//               </>
//             )}
//           </TouchableOpacity>

//           <View style={styles.secureBadge}>
//             <Image source={require('../../../assets/images/kycscreens/shield-check.png')} style={styles.secureIcon} />
//             <Text style={styles.secureText}>100% Secure & Encrypted</Text>
//           </View>
//         </View>

//       </View>

//       {/* Universal Document Preview Modal */}
//       <Modal
//         visible={previewVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setPreviewVisible(false)}
//       >
//         <SafeAreaView style={localStyles.modalBackground}>
//           {/* Modal Header */}
//           <View style={localStyles.modalHeader}>
//             <Text style={localStyles.modalTitle} numberOfLines={1}>{previewFile.name}</Text>
//             <TouchableOpacity 
//               style={localStyles.closeButton} 
//               onPress={() => setPreviewVisible(false)}
//             >
//               <Icon name="x" size={24} color="#FFF" />
//             </TouchableOpacity>
//           </View>
          
//           {/* Main Renderer viewport */}
//           <View style={localStyles.modalContentContainer}>
//             {previewFile.uri ? (
//               isPdfFile(previewFile) ? (
//                 <WebView
//                   source={{ uri: previewFile.uri }}
//                   style={localStyles.pdfWebView}
//                   originWhitelist={['*']}
//                   javaScriptEnabled={true}
//                   domStorageEnabled={true}
//                   allowFileAccess={true} 
//                   allowUniversalAccessFromFileURLs={true} 
//                   allowFileAccessFromFileURLs={true} 
//                   scalesPageToFit={true}
//                   startInLoadingState={true}
//                   renderLoading={() => <ActivityIndicator size="large" color="#FFF" style={StyleSheet.absoluteFill} />}
//                 />
//               ) : (
//                 <Image 
//                   source={{ uri: previewFile.uri }} 
//                   style={localStyles.fullScreenImage} 
//                   resizeMode="contain" 
//                 />
//               )
//             ) : (
//               <ActivityIndicator size="large" color="#FFF" />
//             )}
//           </View>
//         </SafeAreaView>
//       </Modal>

//     </SafeAreaView>
//   );
// }

// const localStyles = StyleSheet.create({
//   centeredIcon: {
//     alignSelf: 'center',
//     marginBottom: 10,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.95)',
//   },
//   modalHeader: {
//     height: 60,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     backgroundColor: 'rgba(0,0,0,0.8)',
//     zIndex: 10,
//   },
//   modalTitle: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '700',
//     flex: 1,
//     marginRight: 15,
//   },
//   closeButton: {
//     padding: 8,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 20,
//   },
//   modalContentContainer: {
//     flex: 1,
//     width: windowWidth,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//   },
//   fullScreenImage: {
//     width: '100%',
//     height: '85%',
//     alignSelf: 'center',
//   },
//   pdfWebView: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     width: windowWidth,
//   },
// });


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { WebView } from 'react-native-webview';
import styles from './KycFilesReviewStyles';

// API imports
import api from '../../api/axios';
import RNFS from 'react-native-fs';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export default function KycFilesReview({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  
  // State for universal preview modal
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState({ uri: "", type: "", name: "" });

  // Get all files passed from the KYCVerification screen
  const { existingFiles } = route.params || {};

  // --- Consolidated API Batch Upload Function ---
  const uploadAllDocuments = async () => {
    try {
      const aadharBase64 = await RNFS.readFile(existingFiles.aadhaarFile?.uri, 'base64');
      const selfieBase64 = await RNFS.readFile(existingFiles.faceFile?.uri, 'base64');
      const panBase64 = await RNFS.readFile(existingFiles.panFile?.uri, 'base64');
      const passbookBase64 = await RNFS.readFile(existingFiles.passbookFile?.uri, 'base64');

      const payload = {
        "documents": [
          { 
            "documentType": "AADHAAR",
            "frontImage": `data:${existingFiles.aadhaarFile?.type};base64,${aadharBase64}`,
            "backImage": ""
          },
          {   
            "documentType": "PAN",
            "frontImage": `data:${existingFiles.panFile?.type};base64,${panBase64}`,
            "backImage": ""
          },
          {     
            "documentType": "BANK",
            "frontImage": `data:${existingFiles.passbookFile?.type};base64,${passbookBase64}`,
            "backImage": ""
          },
          {    
            "documentType": "SELFIE",
            "frontImage": `data:${existingFiles.faceFile?.type};base64,${selfieBase64}`,
            "backImage": "" 
          }
        ]
      };

      console.log('Sending unified payload to /api/kyc/upload-document:', payload);
      const response = await api.post('/api/kyc/upload-document', payload);
      console.log('Upload Response:', response.data);
      return response.data;
    } catch (error) { 
      console.error('Batch upload error details:', error);
      throw error; 
    }
  };

  const handleSubmitKyc = async () => {
    // Validating presence of properties within existingFiles container before starting stream parsing
    if (!existingFiles?.aadhaarFile) {
      Alert.alert('Aadhaar Required', 'Please upload your Aadhaar card');
      return;
    }
    if (!existingFiles?.panFile) {
      Alert.alert('PAN Card Required', 'Please upload your PAN card');
      return;
    }
    if (!existingFiles?.passbookFile) {
      Alert.alert('Passbook Required', 'Please upload your Bank Passbook');
      return;
    }
    if (!existingFiles?.faceFile) {
      Alert.alert('Selfie Required', 'Please capture your selfie');
      return;
    }

    setIsLoading(true);
    try {
      // Execute only the primary collection endpoint transaction as requested
      await uploadAllDocuments();

      Alert.alert('Success', 'All documents uploaded successfully', [
        {
          text: 'OK',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'KycUnderReview' }],
          }),
        },
      ]);
    } catch (error) {
      Alert.alert('Upload Failed', error.message || 'Failed to upload documents. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplace = (tabName) => {
    navigation.navigate('KYCVerification', {
      replaceTab: tabName,
      existingFiles: existingFiles
    });
  };

  const handleOpenPreview = async (file, fallbackName) => {
    if (!file?.uri) {
      Alert.alert('Preview Unavailable', 'Document file path is missing.');
      return;
    }

    const isPdf = 
      file.type?.toLowerCase().includes('pdf') || 
      file.uri?.toLowerCase().endsWith('.pdf') || 
      file.name?.toLowerCase().endsWith('.pdf');

    if (Platform.OS === 'android' && isPdf && file.uri.startsWith('content://')) {
      try {
        const cacheFileName = `preview_${Date.now()}_${file.name || 'document.pdf'}`;
        const destPath = `${RNFS.CachesDirectoryPath}/${cacheFileName}`;

        await RNFS.copyFile(file.uri, destPath);
        const safeLocalUri = `file://${destPath}`;

        setPreviewFile({
          uri: safeLocalUri,
          type: 'application/pdf',
          name: file.name || fallbackName
        });
        setPreviewVisible(true);
      } catch (error) {
        console.error('Failed to resolve Android content URI:', error);
        Alert.alert('Preview Error', 'Could not open this PDF safely.');
      }
    } else {
      setPreviewFile({
        uri: file.uri,
        type: file.type || '',
        name: file.name || fallbackName
      });
      setPreviewVisible(true);
    }
  };

  const isPdfFile = (file) => {
    return (
      file.type?.toLowerCase().includes('pdf') ||
      file.uri?.toLowerCase().endsWith('.pdf') ||
      file.name?.toLowerCase().endsWith('.pdf')
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F9FFFB" barStyle="dark-content" />
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color="#285CE0" />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.heading}>Review Your Information</Text>
            <Text style={styles.subText}>
              Please review all the information before submitting your KYC application.
            </Text>
          </View>
          <TouchableOpacity>
            <Image source={require('../../../assets/images/kycscreens/Help Icon.png')} style={styles.helpIcon} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Aadhaar Details Card */}
          <Text style={styles.sectionTitle}>• Aadhar Details</Text>
          <TouchableOpacity 
            style={styles.reviewCard} 
            onPress={() => handleOpenPreview(existingFiles?.aadhaarFile, 'Aadhar.png')}
            activeOpacity={0.9}
          >
            <Icon name={isPdfFile(existingFiles?.aadhaarFile || {}) ? "file-text" : "camera"} size={32} color="#03B244" style={localStyles.centeredIcon} />
            <Text style={styles.fileName}>{existingFiles?.aadhaarFile?.name || 'Aadhar.png'}</Text>
            <TouchableOpacity onPress={() => handleReplace('aadhaar')}>
              <Text style={styles.clickToReplace}>Click to replace</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Selfie Details Card */}
          <Text style={styles.sectionTitle}>• Selfie Photo</Text>
          <TouchableOpacity 
            style={styles.reviewCard} 
            onPress={() => handleOpenPreview(existingFiles?.faceFile, 'Selfie.png')}
            activeOpacity={0.9}
          >
            <Icon name="user" size={32} color="#03B244" style={localStyles.centeredIcon} />
            <Text style={styles.fileName}>{existingFiles?.faceFile?.name || 'Selfie.png'}</Text>
            <TouchableOpacity onPress={() => handleReplace('aadhaar')}>
              <Text style={styles.clickToReplace}>Click to replace</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* PAN Details Card */}
          <Text style={styles.sectionTitle}>• PAN Details</Text>
          <TouchableOpacity 
            style={styles.reviewCard} 
            onPress={() => handleOpenPreview(existingFiles?.panFile, 'PAN.png')}
            activeOpacity={0.9}
          >
            <Icon name={isPdfFile(existingFiles?.panFile || {}) ? "file-text" : "camera"} size={32} color="#03B244" style={localStyles.centeredIcon} />
            <Text style={styles.fileName}>{existingFiles?.panFile?.name || 'PAN.png'}</Text>
            <TouchableOpacity onPress={() => handleReplace('pan')}>
              <Text style={styles.clickToReplace}>Click to replace</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Passbook Details Card */}
          <Text style={styles.sectionTitle}>• Cancel Cheque or Passbook Details</Text>
          <TouchableOpacity 
            style={styles.reviewCard} 
            onPress={() => handleOpenPreview(existingFiles?.passbookFile, 'Passbook.png')}
            activeOpacity={0.9}
          >
            <Icon name={isPdfFile(existingFiles?.passbookFile || {}) ? "file-text" : "camera"} size={32} color="#03B244" style={localStyles.centeredIcon} />
            <Text style={styles.fileName}>{existingFiles?.passbookFile?.name || 'Passbook.png'}</Text>
            <TouchableOpacity onPress={() => handleReplace('passbook')}>
              <Text style={styles.clickToReplace}>Click to replace</Text>
            </TouchableOpacity>
          </TouchableOpacity>

        </ScrollView>

        {/* Action Tray */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={[styles.submitBtn, isLoading && { opacity: 0.7 }]} 
            onPress={handleSubmitKyc} 
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.submitBtnText}>Submit KYC</Text>
                <Icon name="arrow-right" size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.secureBadge}>
            <Image source={require('../../../assets/images/kycscreens/shield-check.png')} style={styles.secureIcon} />
            <Text style={styles.secureText}>100% Secure & Encrypted</Text>
          </View>
        </View>

      </View>

      {/* Universal Document Preview Modal */}
      <Modal
        visible={previewVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPreviewVisible(false)}
      >
        <SafeAreaView style={localStyles.modalBackground}>
          {/* Modal Header */}
          <View style={localStyles.modalHeader}>
            <Text style={localStyles.modalTitle} numberOfLines={1}>{previewFile.name}</Text>
            <TouchableOpacity 
              style={localStyles.closeButton} 
              onPress={() => setPreviewVisible(false)}
            >
              <Icon name="x" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          {/* Content Window Container */}
          <View style={localStyles.modalContentContainer}>
            {previewFile.uri ? (
              isPdfFile(previewFile) ? (
                <WebView
                  source={{ uri: previewFile.uri }}
                  style={localStyles.pdfWebView}
                  originWhitelist={['*']}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  allowFileAccess={true} 
                  allowUniversalAccessFromFileURLs={true} 
                  allowFileAccessFromFileURLs={true} 
                  scalesPageToFit={true}
                  startInLoadingState={true}
                  renderLoading={() => <ActivityIndicator size="large" color="#FFF" style={StyleSheet.absoluteFill} />}
                />
              ) : (
                <Image 
                  source={{ uri: previewFile.uri }} 
                  style={localStyles.fullScreenImage} 
                  resizeMode="contain" 
                />
              )
            ) : (
              <ActivityIndicator size="large" color="#FFF" />
            )}
          </View>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  centeredIcon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  modalHeader: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 10,
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 15,
  },
  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  modalContentContainer: {
    flex: 1,
    width: windowWidth,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '85%',
    alignSelf: 'center',
  },
  pdfWebView: {
    flex: 1,
    backgroundColor: '#FFF',
    width: windowWidth,
  },
});