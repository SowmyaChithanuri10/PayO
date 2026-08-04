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


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
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

// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Feather';
// import { WebView } from 'react-native-webview';
// import styles from './KycFilesReviewStyles';

// // API imports
// import api from '../../api/axios';
// import RNFS from 'react-native-fs';

// const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

// export default function KycFilesReview({ navigation, route }) {
//   const [isLoading, setIsLoading] = useState(false);
  
//   // State for universal preview modal
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewFile, setPreviewFile] = useState({ uri: "", type: "", name: "" });

//   // Get all files passed from the KYCVerification screen
//   const { existingFiles } = route.params || {};

//   // --- Consolidated API Batch Upload Function ---
//   const uploadAllDocuments = async () => {
//     try {
//       const aadharBase64 = await RNFS.readFile(existingFiles.aadhaarFile?.uri, 'base64');
//       const selfieBase64 = await RNFS.readFile(existingFiles.faceFile?.uri, 'base64');
//       const panBase64 = await RNFS.readFile(existingFiles.panFile?.uri, 'base64');
//       const passbookBase64 = await RNFS.readFile(existingFiles.passbookFile?.uri, 'base64');

//       const payload = {
//         "documents": [
//           { 
//             "documentType": "AADHAAR",
//             "frontImage": `data:${existingFiles.aadhaarFile?.type};base64,${aadharBase64}`,
//             "backImage": ""
//           },
//           {   
//             "documentType": "PAN",
//             "frontImage": `data:${existingFiles.panFile?.type};base64,${panBase64}`,
//             "backImage": ""
//           },
//           {     
//             "documentType": "BANK",
//             "frontImage": `data:${existingFiles.passbookFile?.type};base64,${passbookBase64}`,
//             "backImage": ""
//           },
//           {    
//             "documentType": "SELFIE",
//             "frontImage": `data:${existingFiles.faceFile?.type};base64,${selfieBase64}`,
//             "backImage": "" 
//           }
//         ]
//       };

//       console.log('Sending unified payload to /api/kyc/upload-document:', payload);
//       const response = await api.post('/api/kyc/upload-document', payload);
//       console.log('Upload Response:', response.data);
//       return response.data;
//     } catch (error) { 
//       console.error('Batch upload error details:', error);
//       throw error; 
//     }
//   };

//   const handleSubmitKyc = async () => {
//     // Validating presence of properties within existingFiles container before starting stream parsing
//     if (!existingFiles?.aadhaarFile) {
//       Alert.alert('Aadhaar Required', 'Please upload your Aadhaar card');
//       return;
//     }
//     if (!existingFiles?.panFile) {
//       Alert.alert('PAN Card Required', 'Please upload your PAN card');
//       return;
//     }
//     if (!existingFiles?.passbookFile) {
//       Alert.alert('Passbook Required', 'Please upload your Bank Passbook');
//       return;
//     }
//     if (!existingFiles?.faceFile) {
//       Alert.alert('Selfie Required', 'Please capture your selfie');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // Execute only the primary collection endpoint transaction as requested
//       await uploadAllDocuments();

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
          
//           {/* Content Window Container */}
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

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
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

// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Feather';
// import { WebView } from 'react-native-webview';
// import styles from './KycFilesReviewStyles';

// // API imports
// import api from '../../api/axios';
// import RNFS from 'react-native-fs';

// const { width: windowWidth } = Dimensions.get('window');

// export default function KycFilesReview({ navigation, route }) {
//   const [isLoading, setIsLoading] = useState(false);
  
//   // State for universal full-screen preview modal
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewFile, setPreviewFile] = useState({ uri: "", type: "", name: "" });

//   // Get all files passed from the KYCVerification screen
//   const { existingFiles } = route.params || {};
//   console.log(existingFiles,"existingFiles")

//   const isPdfFile = (file) => {
//     if (!file) return false;
//     return (
//       file.type?.toLowerCase().includes('pdf') ||
//       file.uri?.toLowerCase().endsWith('.pdf') ||
//       file.name?.toLowerCase().endsWith('.pdf')
//     );
//   };

//   // Helper component to render inline file thumbnails inside cards
//   const renderThumbnail = (file) => {
//     if (!file?.uri) {
//       return (
//         <View style={localStyles.placeholderContainer}>
//           <Icon name="file" size={32} color="#999" />
//         </View>
//       );
//     }

//     if (isPdfFile(file)) {
//       return (
//         <View pointerEvents="none" style={localStyles.thumbnailWrapper}>
//           <WebView
//             source={{ uri: file.uri }}
//             style={localStyles.pdfThumbnail}
//             scrollEnabled={false}
//             originWhitelist={['*']}
//             allowFileAccess={true}
//             allowUniversalAccessFromFileURLs={true}
//             allowFileAccessFromFileURLs={true}
//             scalesPageToFit={true}
//           />
//         </View>
//       );
//     }

//     return (
//       <View style={localStyles.thumbnailWrapper}>
//         <Image
//           source={{ uri: file.uri }}
//           style={localStyles.imageThumbnail}
//           resizeMode="cover"
//         />
//       </View>
//     );
//   };

//   const uploadAllDocuments = async () => {
//     try {
//       const aadharBase64 = await RNFS.readFile(existingFiles.aadhaarFile?.uri, 'base64');
//       const selfieBase64 = await RNFS.readFile(existingFiles.faceFile?.uri, 'base64');
//       const panBase64 = await RNFS.readFile(existingFiles.panFile?.uri, 'base64');
//       const passbookBase64 = await RNFS.readFile(existingFiles.passbookFile?.uri, 'base64');

//       const payload = {
//         "documents": [
//           { 
//             "documentType": "AADHAAR",
//             "frontImage": `data:${existingFiles.aadhaarFile?.type};base64,${aadharBase64}`,
//             "backImage": ""
//           },
//           {   
//             "documentType": "PAN",
//             "frontImage": `data:${existingFiles.panFile?.type};base64,${panBase64}`,
//             "backImage": ""
//           },
//           {     
//             "documentType": "BANK",
//             "frontImage": `data:${existingFiles.passbookFile?.type};base64,${passbookBase64}`,
//             "backImage": ""
//           },
//           {    
//             "documentType": "SELFIE",
//             "frontImage": `data:${existingFiles.faceFile?.type};base64,${selfieBase64}`,
//             "backImage": "" 
//           }
//         ]
//       };

//       const response = await api.post('/api/kyc/upload-document', payload);
//       return response.data;
//     } catch (error) { 
//       console.error('Batch upload error details:', error);
//       throw error; 
//     }
//   };

//   const handleSubmitKyc = async () => {
//     if (!existingFiles?.aadhaarFile) {
//       Alert.alert('Aadhaar Required', 'Please upload your Aadhaar card');
//       return;
//     }
//     if (!existingFiles?.panFile) {
//       Alert.alert('PAN Card Required', 'Please upload your PAN card');
//       return;
//     }
//     if (!existingFiles?.passbookFile) {
//       Alert.alert('Passbook Required', 'Please upload your Bank Passbook');
//       return;
//     }
//     if (!existingFiles?.faceFile) {
//       Alert.alert('Selfie Required', 'Please capture your selfie');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await uploadAllDocuments();

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

//     const isPdf = isPdfFile(file);

//     if (Platform.OS === 'android' && isPdf && file.uri.startsWith('content://')) {
//       try {
//         const cacheFileName = `preview_${Date.now()}_${file.name || 'document.pdf'}`;
//         const destPath = `${RNFS.CachesDirectoryPath}/${cacheFileName}`;

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
//             {renderThumbnail(existingFiles?.aadhaarFile)}
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
//             {renderThumbnail(existingFiles?.faceFile)}
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
//             {renderThumbnail(existingFiles?.panFile)}
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
//             {renderThumbnail(existingFiles?.passbookFile)}
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

//       {/* Universal Fullscreen Preview Modal */}
//       <Modal
//         visible={previewVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setPreviewVisible(false)}
//       >
//         <SafeAreaView style={localStyles.modalBackground}>
//           <View style={localStyles.modalHeader}>
//             <Text style={localStyles.modalTitle} numberOfLines={1}>{previewFile.name}</Text>
//             <TouchableOpacity 
//               style={localStyles.closeButton} 
//               onPress={() => setPreviewVisible(false)}
//             >
//               <Icon name="x" size={24} color="#FFF" />
//             </TouchableOpacity>
//           </View>
          
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
//   thumbnailWrapper: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#f2f2f2',
//     marginBottom: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageThumbnail: {
//     width: '100%',
//     height: '100%',
//   },
//   pdfThumbnail: {
//     width: windowWidth - 60,
//     height: 150,
//     backgroundColor: '#fff',
//   },
//   placeholderContainer: {
//     width: '100%',
//     height: 120,
//     borderRadius: 8,
//     backgroundColor: '#f2f2f2',
//     justify: 'center',
//     alignItems: 'center',
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



import React, { useState, useEffect } from 'react';
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
import Pdf from 'react-native-pdf';
import styles from './KycFilesReviewStyles';

// API imports
import api from '../../api/axios';
import RNFS from 'react-native-fs';

const { width: windowWidth } = Dimensions.get('window');

export default function KycFilesReview({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [resolvedFiles, setResolvedFiles] = useState({});
  const [isResolvingFiles, setIsResolvingFiles] = useState(true);

  // State for universal full-screen preview modal
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState({ uri: '', type: '', name: '' });

  const { existingFiles } = route.params || {};

  const isPdfFile = (file) => {
    if (!file) return false;
    return (
      file.type?.toLowerCase().includes('pdf') ||
      file.uri?.toLowerCase().endsWith('.pdf') ||
      file.name?.toLowerCase().endsWith('.pdf')
    );
  };

  // Convert content:// URIs to local cache file:// URIs for Android file access
  useEffect(() => {
    let isMounted = true;

    const prepareFiles = async () => {
      if (!existingFiles) {
        setIsResolvingFiles(false);
        return;
      }

      const updatedFiles = { ...existingFiles };

      for (const key of Object.keys(existingFiles)) {
        const file = existingFiles[key];
        if (file && file.uri) {
          if (Platform.OS === 'android' && file.uri.startsWith('content://')) {
            try {
              const fileExt = isPdfFile(file) ? '.pdf' : '.png';
              const cachePath = `${RNFS.CachesDirectoryPath}/preview_${Date.now()}_${key}${fileExt}`;
              await RNFS.copyFile(file.uri, cachePath);
              updatedFiles[key] = { ...file, uri: `file://${cachePath}` };
            } catch (err) {
              console.error(`Failed to cache ${key}:`, err);
            }
          }
        }
      }

      if (isMounted) {
        setResolvedFiles(updatedFiles);
        setIsResolvingFiles(false);
      }
    };

    prepareFiles();

    return () => {
      isMounted = false;
    };
  }, [existingFiles]);

  const renderThumbnail = (file, fallbackName) => {
    if (!file?.uri) {
      return (
        <View style={localStyles.placeholderContainer}>
          <Icon name="file" size={32} color="#999" />
        </View>
      );
    }

    // PDF Card Content Preview (Rendered native PDF page 1)
    if (isPdfFile(file)) {
      return (
        <View style={localStyles.pdfThumbnailContainer}>
          <View style={localStyles.pdfBadge}>
            <Text style={localStyles.pdfBadgeText}>PDF</Text>
          </View>
          
          <View pointerEvents="none" style={localStyles.pdfWrapper}>
            <Pdf
              source={{ uri: file.uri, cache: true }}
              page={1}
              singlePage={true}
              scale={1.0}
              fitPolicy={0}
              style={localStyles.pdfView}
              onError={(error) => console.log('PDF Preview error:', error)}
            />
          </View>
        </View>
      );
    }

    // Image Card Preview
    return (
      <View style={localStyles.thumbnailWrapper}>
        <Image
          source={{ uri: file.uri }}
          style={localStyles.imageThumbnail}
          resizeMode="cover"
        />
      </View>
    );
  };

  const uploadAllDocuments = async () => {
    try {
      const filesToUpload = Object.keys(resolvedFiles).length ? resolvedFiles : existingFiles;

      const aadharBase64 = await RNFS.readFile(filesToUpload.aadhaarFile?.uri, 'base64');
      const selfieBase64 = await RNFS.readFile(filesToUpload.faceFile?.uri, 'base64');
      const panBase64 = await RNFS.readFile(filesToUpload.panFile?.uri, 'base64');
      const passbookBase64 = await RNFS.readFile(filesToUpload.passbookFile?.uri, 'base64');

      const payload = {
        documents: [
          {
            documentType: 'AADHAAR',
            frontImage: `data:${filesToUpload.aadhaarFile?.type};base64,${aadharBase64}`,
            backImage: '',
          },
          {
            documentType: 'PAN',
            frontImage: `data:${filesToUpload.panFile?.type};base64,${panBase64}`,
            backImage: '',
          },
          {
            documentType: 'BANK',
            frontImage: `data:${filesToUpload.passbookFile?.type};base64,${passbookBase64}`,
            backImage: '',
          },
          {
            documentType: 'SELFIE',
            frontImage: `data:${filesToUpload.faceFile?.type};base64,${selfieBase64}`,
            backImage: '',
          },
        ],
      };

      const response = await api.post('/api/kyc/upload-document', payload);
      return response.data;
    } catch (error) {
      console.error('Batch upload error details:', error);
      throw error;
    }
  };

  const handleSubmitKyc = async () => {
    const currentFiles = Object.keys(resolvedFiles).length ? resolvedFiles : existingFiles;

    if (!currentFiles?.aadhaarFile) {
      Alert.alert('Aadhaar Required', 'Please upload your Aadhaar card');
      return;
    }
    if (!currentFiles?.panFile) {
      Alert.alert('PAN Card Required', 'Please upload your PAN card');
      return;
    }
    if (!currentFiles?.passbookFile) {
      Alert.alert('Passbook Required', 'Please upload your Bank Passbook');
      return;
    }
    if (!currentFiles?.faceFile) {
      Alert.alert('Selfie Required', 'Please capture your selfie');
      return;
    }

    setIsLoading(true);
    try {
      await uploadAllDocuments();

      Alert.alert('Success', 'All documents uploaded successfully', [
        {
          text: 'OK',
          onPress: () =>
            navigation.reset({
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
      existingFiles: existingFiles,
    });
  };

  const handleOpenPreview = (file, fallbackName) => {
    if (!file?.uri) {
      Alert.alert('Preview Unavailable', 'Document file path is missing.');
      return;
    }

    setPreviewFile({
      uri: file.uri,
      type: file.type || '',
      name: file.name || fallbackName,
    });
    setPreviewVisible(true);
  };

  const activeFiles = Object.keys(resolvedFiles).length ? resolvedFiles : existingFiles;

  if (isResolvingFiles) {
    return (
      <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#03B244" />
        <Text style={{ marginTop: 10, color: '#666' }}>Preparing preview files...</Text>
      </SafeAreaView>
    );
  }

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
            <Image
              source={require('../../../assets/images/kycscreens/Help Icon.png')}
              style={styles.helpIcon}
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Aadhaar Card */}
          <Text style={styles.sectionTitle}>• Aadhaar Details</Text>
          <TouchableOpacity
            style={styles.reviewCard}
            onPress={() => handleOpenPreview(activeFiles?.aadhaarFile, 'Aadhaar.png')}
            activeOpacity={0.9}
          >
            {renderThumbnail(activeFiles?.aadhaarFile, 'Aadhaar.png')}
            <Text style={styles.fileName}>{activeFiles?.aadhaarFile?.name || 'Aadhaar.png'}</Text>
            <TouchableOpacity onPress={() => handleReplace('aadhaar')}>
              <Text style={styles.clickToReplace}>Click to replace</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Selfie Card */}
          <Text style={styles.sectionTitle}>• Selfie Photo</Text>
          <TouchableOpacity
            style={styles.reviewCard}
            onPress={() => handleOpenPreview(activeFiles?.faceFile, 'Selfie.png')}
            activeOpacity={0.9}
          >
            {renderThumbnail(activeFiles?.faceFile, 'Selfie.png')}
            <Text style={styles.fileName}>{activeFiles?.faceFile?.name || 'Selfie.png'}</Text>
            <TouchableOpacity onPress={() => handleReplace('aadhaar')}>
              <Text style={styles.clickToReplace}>Click to replace</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* PAN Card */}
          <Text style={styles.sectionTitle}>• PAN Details</Text>
          <TouchableOpacity
            style={styles.reviewCard}
            onPress={() => handleOpenPreview(activeFiles?.panFile, 'PAN.pdf')}
            activeOpacity={0.9}
          >
            {renderThumbnail(activeFiles?.panFile, 'PAN.pdf')}
            <Text style={styles.fileName}>{activeFiles?.panFile?.name || 'PAN.pdf'}</Text>
            <TouchableOpacity onPress={() => handleReplace('pan')}>
              <Text style={styles.clickToReplace}>Click to replace</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Passbook Card */}
          <Text style={styles.sectionTitle}>• Cancel Cheque or Passbook Details</Text>
          <TouchableOpacity
            style={styles.reviewCard}
            onPress={() => handleOpenPreview(activeFiles?.passbookFile, 'Passbook.pdf')}
            activeOpacity={0.9}
          >
            {renderThumbnail(activeFiles?.passbookFile, 'Passbook.pdf')}
            <Text style={styles.fileName}>{activeFiles?.passbookFile?.name || 'Passbook.pdf'}</Text>
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
            disabled={isLoading}
          >
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
            <Image
              source={require('../../../assets/images/kycscreens/shield-check.png')}
              style={styles.secureIcon}
            />
            <Text style={styles.secureText}>100% Secure & Encrypted</Text>
          </View>
        </View>
      </View>

      {/* Fullscreen Preview Modal */}
      <Modal
        visible={previewVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPreviewVisible(false)}
      >
        <SafeAreaView style={localStyles.modalBackground}>
          <View style={localStyles.modalHeader}>
            <Text style={localStyles.modalTitle} numberOfLines={1}>
              {previewFile.name}
            </Text>
            <TouchableOpacity
              style={localStyles.closeButton}
              onPress={() => setPreviewVisible(false)}
            >
              <Icon name="x" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={localStyles.modalContentContainer}>
            {previewFile.uri ? (
              isPdfFile(previewFile) ? (
                <Pdf
                  source={{ uri: previewFile.uri, cache: true }}
                  style={localStyles.fullScreenPdf}
                  onError={(error) => console.log('Fullscreen PDF Error:', error)}
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
  thumbnailWrapper: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  },
  imageThumbnail: {
    width: '100%',
    height: '100%',
  },
  pdfThumbnailContainer: {
    width: '100%',
    height: 170,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    position: 'relative',
  },
  pdfBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#E53935',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    zIndex: 10,
  },
  pdfBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  pdfWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  pdfView: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  placeholderContainer: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
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
  fullScreenPdf: {
    flex: 1,
    width: windowWidth,
    backgroundColor: '#1E1E1E',
  },
});