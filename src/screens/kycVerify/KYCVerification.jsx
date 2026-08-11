// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
//   Alert,
//   PermissionsAndroid,
//   Image,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Feather';
// import { NativeModules } from 'react-native';
// import styles from './KYCVerificationStyles';
// import ImageCropPicker from 'react-native-image-crop-picker';
// import { pick } from '@react-native-documents/picker';


// export default function KYCVerification({
//   navigation, route
// }) {
//   // const [activeTab, setActiveTab] = useState('aadhaar');
//   const [isLoading, setIsLoading] = useState(false);
//   const existingFiles = route?.params?.existingFiles || {};
  
//   const [activeTab, setActiveTab] = useState(route.params?.replaceTab || 'aadhaar');

//   const [aadhaarFile, setAadhaarFile] = useState(existingFiles.aadhaarFile || null);
//   const [faceFile, setFaceFile] = useState(existingFiles.faceFile || null);
//   const [panFile, setPanFile] = useState(existingFiles.panFile || null);
//   const [passbookFile, setPassbookFile] = useState(existingFiles.passbookFile || null);
  
//   const [isConsentCheckedPan, setIsConsentCheckedPan] = useState(false);
//   const [isConsentCheckedPassbook, setIsConsentCheckedPassbook] = useState(false);

//   const handleDocumentUpload = () => {
//     Alert.alert('Upload Document', 'Choose file type', [
//       { text: 'Image', onPress: openImagePicker },
//       { text: 'PDF', onPress: openPdfPicker },
//       { text: 'Cancel', style: 'cancel' },
//     ]);
//   };

//   const saveSelectedFile = file => {
//     if (activeTab === 'aadhaar') {
//       setAadhaarFile(file);
//     } else if (activeTab === 'pan') {
//       setPanFile(file);
//     } else if (activeTab === 'passbook') {
//       setPassbookFile(file);
//     }
//   };

//   const openImagePicker = async () => {
//   try {
//     const image = await ImageCropPicker.openPicker({
//       mediaType: 'photo',
//       cropping: false,
//     });

//     const file = {
//       name: image.filename || `image_${Date.now()}.jpg`,
//       type: image.mime,
//       uri: image.path,
//       size: image.size,
//     };

//     console.log('IMAGE FILE:', file);
//     saveSelectedFile(file);
//   } catch (err) {
//     if (err.code !== 'E_PICKER_CANCELLED') {
//       console.log('Image Picker Error:', err);
//       Alert.alert('Error', 'Failed to pick image');
//     }
//   }
// };

//   const openPdfPicker = async () => {
//     try {
//       const result = await pick({ type: ['application/pdf'] });
//       if (result && result.length > 0) {
//         saveSelectedFile({
//           name: result[0].name,
//           type: result[0].type,
//           uri: result[0].uri,
//           size: result[0].size,
//         });
//       }
//     } catch (err) { console.log(err); }
//   };

//   const handleFaceUpload = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         ImageCropPicker.openCamera({
//           width: 800, height: 800, cropping: false, useFrontCamera: true, mediaType: 'photo',
//         }).then(image => {
//           setFaceFile({
//             uri: image.path, type: image.mime, name: image.filename || `selfie_${Date.now()}.jpg`, size: image.size,
//           });
//         }).catch(err => {
//           if (err.message !== 'User cancelled image selection') Alert.alert('Error', 'Failed to open camera');
//         });
//       } else {
//         Alert.alert("Permission Denied", "Camera access is required for selfie.");
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const uploadAadhar = async () => {
//     console.log(otherIdFile,"otherIdFile")
//     try {
//       const aadharBase64 = await RNFS.readFile(
//         aadhaarFile?.uri,
//         'base64'
//       );

//       const selfieBase64 = await RNFS.readFile(
//         faceFile?.uri,
//         'base64'
//       );
//        const panBase64 = await RNFS.readFile(
//         panFile?.uri,
//         'base64'
//       );
//        const passbookBase64 = await RNFS.readFile(
//         passbookFile?.uri,
//         'base64'
//       );

      
//       console.log(panFile?.uri, 'PAN URI');
//       console.log(aadhaarFile?.uri, "5656");

//       const payload = {
//          "documents": [
//        { "documentType": "AADHAAR",
//         "frontImage": `data:${aadhaarFile?.type};base64,${aadharBase64}`,
//          "backImage": "",
    
//          },
//           {   "documentType": "PAN",
//          "frontImage": `data:${panFile?.type};base64,${panBase64}`,
//          "backImage": "",
    
//          },
//           {     "documentType": "BANK",
//          "frontImage":  `data:${passbookFile?.type};base64,${passbookBase64}`,
//          "backImage": "",
    
//          },
//          {    "documentType": "SELFIE",
//          "frontImage": `data:${faceFile.type};base64,${selfieBase64}`,
//          "backImage": "", 
//          },


//   ]
// }

//       console.log('Payload:', payload);

//       const response = await api.post(
//         '/api/kyc/upload-document',
//         payload
//       );

//       console.log('Upload Response:', response.data);

//       return response.data;
//     } catch (error) {
//       console.error('Upload Error:', error);
//       throw error;
//     }
//   };

//   const isContinueEnabled = () => {
//     if (activeTab === 'aadhaar') return aadhaarFile !== null && faceFile !== null;
//     if (activeTab === 'pan') return panFile !== null && isConsentCheckedPan;
//     if (activeTab === 'passbook') return passbookFile !== null && isConsentCheckedPassbook;
//     return false;
//   };

//   const handleContinue = () => {
//     if (activeTab === 'aadhaar') {
//       setActiveTab('pan');
//     } else if (activeTab === 'pan') {
//       setActiveTab('passbook');
//     } else if (activeTab === 'passbook') {
//       // Navigate to Review Screen and pass all files
//       navigation.navigate('KycFilesReview', {
//         existingFiles: { aadhaarFile, faceFile, panFile, passbookFile }
//       });
//     }
//   };
//   const uploadCheque = async () => {
//     try {
//       const chequeBase64 = await RNFS.readFile(
//         chequeFile?.uri,
//         'base64'
//       );

//       const payload = {
//         cheque: `data:${chequeFile?.type};base64,${chequeBase64}`,
//       };

//       console.log('Cheque Payload:', payload);

//       const response = await api.post(
//         '/api/kyc/upload-cheque-documents',
//         payload
//       );

//       console.log('Cheque Upload Response:', response.data);

//       return response.data;
//     } catch (error) {
//       console.error('Cheque Upload Error:', error);
//       throw error;
//     }
//   };

//   const uploadStatement = async () => {
//     try {
//       const statementBase64 = await RNFS.readFile(
//         statementFile?.uri,
//         'base64'
//       );

//       const payload = {
//         statement: `data:${statementFile?.type};base64,${statementBase64}`,
//       };

//       console.log('Statement Payload:', payload);

//       const response = await api.post(
//         '/api/kyc/upload-statement-documents',
//         payload
//       );

//       console.log('Statement Upload Response:', response.data);

//       return response.data;
//     } catch (error) {
//       console.error('Statement Upload Error:', error);
//       throw error;
//     }
//   };

//   const submitForReview = async () => {
//     const payload = {
//       token: token
//     }
//     const response = await api.post(
//       '/api/kyc/submit-for-review',
//       payload
//     );
//   }

//   const handleSubmit = async () => {
  
//     if (!aadhaarFile) {
//       Alert.alert('Aadhaar Required', 'Please upload your Aadhaar card');
//       return;
//     }

//     if (!panFile) {
//       Alert.alert('PAN Card Required', 'Please upload your PAN card');
//       return;
//     }

//     if (!passbookFile) {
//       Alert.alert('Passbook Required', 'Please upload your Bank Passbook');
//       return;
//     }

//     if (!faceFile) {
//       Alert.alert('Selfie Required', 'Please capture your selfie');
//       return;
//     }
//     setIsLoading(true);

//     try {
//       console.log('Starting Aadhar upload...');
//       await uploadAadhar();
//       await submitForReview();


// Alert.alert(
//   'Success',
//   'All documents uploaded successfully',
//   [
//     {
//       text: 'OK',
//       onPress: () => navigation.reset({
//         index: 0,
//         routes: [{ name: 'KycUnderReview' }],
//       }),
//     },
//   ],
// );
//     } catch (error) {
//       console.error('Upload Error:', error);
//       Alert.alert(
//         'Upload Failed',
//         error.message || 'Failed to upload documents. Please try again.',
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getUploadTitle = () => {
//   if (activeTab === 'aadhaar') return 'Upload Aadhaar Card';
//   if (activeTab === 'pan') return 'Upload PAN Card';
//   if (activeTab === 'passbook')
//     return 'Upload Passbook / Cancel Cheque';

//   return 'Upload Document';
// };

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
//             <Text style={styles.heading}>Verify Your Identity</Text>
//             <Text style={styles.subText}>
//               Upload your documents to unlock full wallet features. KYC is reviewed within 5 minutes.
//             </Text>
//           </View>
//           <TouchableOpacity>
//             <Image source={require('../../../assets/images/kycscreens/Help Icon.png')} style={styles.helpIcon} />
//           </TouchableOpacity>
//         </View>

//         {/* Progress Bar (UPDATED TO 3 SEGMENTS) */}
//         <View style={styles.progressContainer}>
//           <View style={[styles.progressSegment, styles.progressActive]} />
//           <View style={[styles.progressSegment, (activeTab === 'pan' || activeTab === 'passbook') && styles.progressActive]} />
//           <View style={[styles.progressSegment, activeTab === 'passbook' && styles.progressActive]} />
//         </View>

//         {/* Tabs - Row 1 */}
//         <View style={styles.tabsRow}>
//           <TouchableOpacity
//             style={[styles.tabButton, styles.tabMarginRight, activeTab === 'aadhaar' && styles.activeTab]}
//             onPress={() => setActiveTab('aadhaar')}>
//             <Text style={[styles.tabText, activeTab === 'aadhaar' && styles.activeTabText]}>Aadhar</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.tabButton, activeTab === 'pan' && styles.activeTab]}
//             onPress={() => setActiveTab('pan')}>
//             <Text style={[styles.tabText, activeTab === 'pan' && styles.activeTabText]}>PAN Card</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Tabs - Row 2 */}
//         <View style={styles.tabsRow}>
//           <TouchableOpacity
//             style={[styles.tabButton, activeTab === 'passbook' && styles.activeTab]}
//             onPress={() => setActiveTab('passbook')}>
//             <Text style={[styles.tabText, activeTab === 'passbook' && styles.activeTabText]}>Cancel Cheque or Passbook</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Dynamic Scrollable Content */}
//         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
//           <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={handleDocumentUpload}>
//             <Image source={require('../../../assets/images/kycscreens/Upload card icon container.png')} style={styles.cardIcon} />
//             <Text style={styles.cardTitle}>
//               {activeTab === 'aadhaar' ? 'Upload Aadhar Card' : activeTab === 'pan' ? 'Upload PAN Card' : 'Upload Cancel Cheque or Passbook'}
//             </Text>
//             <Text style={styles.cardSub}>JPG, PNG or PDF • Max 5MB</Text>

//             {activeTab === 'aadhaar' && aadhaarFile && <Text style={styles.fileName}>✓ {aadhaarFile.name}</Text>}
//             {activeTab === 'pan' && panFile && <Text style={styles.fileName}>✓ {panFile.name}</Text>}
//             {activeTab === 'passbook' && passbookFile && <Text style={styles.fileName}>✓ {passbookFile.name}</Text>}
//           </TouchableOpacity>

//           {/* Selfie Box */}
//           {activeTab === 'aadhaar' && (
//             <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={handleFaceUpload}>
//               <Image source={require('../../../assets/images/kycscreens/Selfie camera icon container.png')} style={styles.cardIcon} />
//               <Text style={styles.cardTitle}>Capture selfie</Text>
//               <Text style={styles.cardSub}>• Ensure good lighting   • Clear photo of your face</Text>
//               {faceFile && <Text style={styles.fileName}>✓ Selfie Captured successfully</Text>}

//               <View style={styles.instructions}>
//                 <View style={styles.pointRow}><Text style={styles.bulletSuccess}>✓</Text><Text style={styles.instructionText}>Take a selfie of yourself with a neutral expression</Text></View>
//                 <View style={styles.pointRow}><Text style={styles.bulletSuccess}>✓</Text><Text style={styles.instructionText}>Make sure your whole face is visible, centered, and your eyes are open</Text></View>
//                 <View style={styles.pointRow}><Text style={styles.bulletDanger}>✕</Text><Text style={styles.instructionText}>Do not crop your ID or screenshots of your ID</Text></View>
//                 <View style={styles.pointRow}><Text style={styles.bulletDanger}>✕</Text><Text style={styles.instructionText}>Do not hide or alter parts of your face (No hats/ beauty images/ filters/ headgear)</Text></View>
//               </View>
//             </TouchableOpacity>
//           )}

//           {/* Consent Checkbox for PAN and Passbook */}
//           {(activeTab === 'pan' || activeTab === 'passbook') && (
//             <TouchableOpacity 
//               style={styles.checkboxContainer} 
//               activeOpacity={0.8}
//               onPress={() => activeTab === 'pan' ? setIsConsentCheckedPan(!isConsentCheckedPan) : setIsConsentCheckedPassbook(!isConsentCheckedPassbook)}
//             >
//               <View style={[styles.checkbox, (activeTab === 'pan' ? isConsentCheckedPan : isConsentCheckedPassbook) && styles.checkboxChecked]}>
//                 {(activeTab === 'pan' ? isConsentCheckedPan : isConsentCheckedPassbook) && <Icon name="check" size={14} color="#fff" />}
//               </View>
//               <Text style={styles.checkboxText}>
//                 This information is used for identity verification only, and will be kept secure by Payo
//               </Text>
//             </TouchableOpacity>
//           )}

//         </ScrollView>

//         {/* Footer Area */}
//         <View style={styles.bottomContainer}>
//           <TouchableOpacity 
//             style={[styles.submitBtn, !isContinueEnabled() && styles.submitBtnDisabled]} 
//             onPress={handleContinue} 
//             disabled={!isContinueEnabled()}>
//             <Text style={styles.submitBtnText}>Continue</Text>
//             <Icon name="arrow-right" size={20} color="#fff" />
//           </TouchableOpacity>

//           <View style={styles.secureBadge}>
//             <Image source={require('../../../assets/images/kycscreens/shield-check.png')} style={styles.secureIcon} />
//             <Text style={styles.secureText}>100% Secure & Encrypted</Text>
//           </View>
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// }





import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  PermissionsAndroid,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { NativeModules } from 'react-native';
import styles from './KYCVerificationStyles';
import ImageCropPicker from 'react-native-image-crop-picker';
import { pick } from '@react-native-documents/picker';
import RNFS from 'react-native-fs'; // Assuming you have this imported based on your usage
import api from '../../api/axios'; // Ensuring api is imported correctly

export default function KYCVerification({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const existingFiles = route?.params?.existingFiles || {};
  
  const [activeTab, setActiveTab] = useState(route.params?.replaceTab || 'aadhaar');

  const [aadhaarFile, setAadhaarFile] = useState(existingFiles.aadhaarFile || null);
  const [faceFile, setFaceFile] = useState(existingFiles.faceFile || null);
  const [panFile, setPanFile] = useState(existingFiles.panFile || null);
  const [passbookFile, setPassbookFile] = useState(existingFiles.passbookFile || null);
  
  const [isConsentCheckedPan, setIsConsentCheckedPan] = useState(false);
  const [isConsentCheckedPassbook, setIsConsentCheckedPassbook] = useState(false);

  const handleDocumentUpload = () => {
    Alert.alert('Upload Document', 'Choose file type', [
      { text: 'Image', onPress: openImagePicker },
      { text: 'PDF', onPress: openPdfPicker },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const saveSelectedFile = file => {
    if (activeTab === 'aadhaar') {
      setAadhaarFile(file);
    } else if (activeTab === 'pan') {
      setPanFile(file);
    } else if (activeTab === 'passbook') {
      setPassbookFile(file);
    }
  };

  const openImagePicker = async () => {
    try {
      const image = await ImageCropPicker.openPicker({ mediaType: 'photo', cropping: false });
      const file = { name: image.filename || `image_${Date.now()}.jpg`, type: image.mime, uri: image.path, size: image.size };
      saveSelectedFile(file);
    } catch (err) {
      if (err.code !== 'E_PICKER_CANCELLED') Alert.alert('Error', 'Failed to pick image');
    }
  };

  const openPdfPicker = async () => {
    try {
      const result = await pick({ type: ['application/pdf'] });
      if (result && result.length > 0) {
        saveSelectedFile({ name: result[0].name, type: result[0].type, uri: result[0].uri, size: result[0].size });
      }
    } catch (err) { console.log(err); }
  };

  const handleFaceUpload = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImageCropPicker.openCamera({ width: 800, height: 800, cropping: false, useFrontCamera: true, mediaType: 'photo' })
        .then(image => {
          setFaceFile({ uri: image.path, type: image.mime, name: image.filename || `selfie_${Date.now()}.jpg`, size: image.size });
        }).catch(err => {
          if (err.message !== 'User cancelled image selection') Alert.alert('Error', 'Failed to open camera');
        });
      } else {
        Alert.alert("Permission Denied", "Camera access is required for selfie.");
      }
    } catch (err) { console.warn(err); }
  };

  const uploadAadhar = async () => {
    try {
      const aadharBase64 = await RNFS.readFile(aadhaarFile?.uri, 'base64');
      const selfieBase64 = await RNFS.readFile(faceFile?.uri, 'base64');
      const panBase64 = await RNFS.readFile(panFile?.uri, 'base64');
      const passbookBase64 = await RNFS.readFile(passbookFile?.uri, 'base64');

      const payload = {
         "documents": [
           { "documentType": "AADHAAR", "frontImage": `data:${aadhaarFile?.type};base64,${aadharBase64}`, "backImage": "" },
           { "documentType": "PAN", "frontImage": `data:${panFile?.type};base64,${panBase64}`, "backImage": "" },
           { "documentType": "BANK", "frontImage": `data:${passbookFile?.type};base64,${passbookBase64}`, "backImage": "" },
           { "documentType": "SELFIE", "frontImage": `data:${faceFile.type};base64,${selfieBase64}`, "backImage": "" },
        ]
      }
      const response = await api.post('/api/kyc/upload-document', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const isContinueEnabled = () => {
    if (activeTab === 'aadhaar') return aadhaarFile !== null && faceFile !== null;
    if (activeTab === 'pan') return panFile !== null && isConsentCheckedPan;
    if (activeTab === 'passbook') return passbookFile !== null && isConsentCheckedPassbook;
    return false;
  };

  const handleContinue = () => {
    if (activeTab === 'aadhaar') setActiveTab('pan');
    else if (activeTab === 'pan') setActiveTab('passbook');
    else if (activeTab === 'passbook') {
      navigation.navigate('KycFilesReview', { existingFiles: { aadhaarFile, faceFile, panFile, passbookFile } });
    }
  };

  // ✅ UPDATED: Removed undefined 'token' variable. Assuming axios interceptors pass it correctly.
  const submitForReview = async () => {
    const response = await api.post('/api/kyc/submit-for-review', {});
    return response.data;
  };

  const handleSubmit = async () => {
    if (!aadhaarFile) { Alert.alert('Aadhaar Required', 'Please upload your Aadhaar card'); return; }
    if (!panFile) { Alert.alert('PAN Card Required', 'Please upload your PAN card'); return; }
    if (!passbookFile) { Alert.alert('Passbook Required', 'Please upload your Bank Passbook'); return; }
    if (!faceFile) { Alert.alert('Selfie Required', 'Please capture your selfie'); return; }
    
    setIsLoading(true);

    try {
      await uploadAadhar();
      await submitForReview();

      Alert.alert(
        'Success',
        'All documents uploaded successfully',
        [
          {
            text: 'OK',
            // ✅ UPDATED: Changed from navigation.reset to navigation.navigate to prevent unmounting the App Stack
            onPress: () => navigation.navigate('KycUnderReview'),
          },
        ],
      );
    } catch (error) {
      Alert.alert('Upload Failed', error.message || 'Failed to upload documents. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <Text style={styles.heading}>Verify Your Identity</Text>
            <Text style={styles.subText}>
              Upload your documents to unlock full wallet features. KYC is reviewed within 5 minutes.
            </Text>
          </View>
          <TouchableOpacity>
            <Image source={require('../../../assets/images/kycscreens/Help Icon.png')} style={styles.helpIcon} />
          </TouchableOpacity>
        </View>

        {/* Progress Bar (UPDATED TO 3 SEGMENTS) */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressSegment, styles.progressActive]} />
          <View style={[styles.progressSegment, (activeTab === 'pan' || activeTab === 'passbook') && styles.progressActive]} />
          <View style={[styles.progressSegment, activeTab === 'passbook' && styles.progressActive]} />
        </View>

        {/* Tabs - Row 1 */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabButton, styles.tabMarginRight, activeTab === 'aadhaar' && styles.activeTab]}
            onPress={() => setActiveTab('aadhaar')}>
            <Text style={[styles.tabText, activeTab === 'aadhaar' && styles.activeTabText]}>Aadhar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'pan' && styles.activeTab]}
            onPress={() => setActiveTab('pan')}>
            <Text style={[styles.tabText, activeTab === 'pan' && styles.activeTabText]}>PAN Card</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs - Row 2 */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'passbook' && styles.activeTab]}
            onPress={() => setActiveTab('passbook')}>
            <Text style={[styles.tabText, activeTab === 'passbook' && styles.activeTabText]}>Cancel Cheque or Passbook</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Scrollable Content */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={handleDocumentUpload}>
            <Image source={require('../../../assets/images/kycscreens/Upload card icon container.png')} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>
              {activeTab === 'aadhaar' ? 'Upload Aadhar Card' : activeTab === 'pan' ? 'Upload PAN Card' : 'Upload Cancel Cheque or Passbook'}
            </Text>
            <Text style={styles.cardSub}>JPG, PNG or PDF • Max 5MB</Text>

            {activeTab === 'aadhaar' && aadhaarFile && <Text style={styles.fileName}>✓ {aadhaarFile.name}</Text>}
            {activeTab === 'pan' && panFile && <Text style={styles.fileName}>✓ {panFile.name}</Text>}
            {activeTab === 'passbook' && passbookFile && <Text style={styles.fileName}>✓ {passbookFile.name}</Text>}
          </TouchableOpacity>

          {/* Selfie Box */}
          {activeTab === 'aadhaar' && (
            <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={handleFaceUpload}>
              <Image source={require('../../../assets/images/kycscreens/Selfie camera icon container.png')} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>Capture selfie</Text>
              <Text style={styles.cardSub}>• Ensure good lighting   • Clear photo of your face</Text>
              {faceFile && <Text style={styles.fileName}>✓ Selfie Captured successfully</Text>}

              <View style={styles.instructions}>
                <View style={styles.pointRow}><Text style={styles.bulletSuccess}>✓</Text><Text style={styles.instructionText}>Take a selfie of yourself with a neutral expression</Text></View>
                <View style={styles.pointRow}><Text style={styles.bulletSuccess}>✓</Text><Text style={styles.instructionText}>Make sure your whole face is visible, centered, and your eyes are open</Text></View>
                <View style={styles.pointRow}><Text style={styles.bulletDanger}>✕</Text><Text style={styles.instructionText}>Do not crop your ID or screenshots of your ID</Text></View>
                <View style={styles.pointRow}><Text style={styles.bulletDanger}>✕</Text><Text style={styles.instructionText}>Do not hide or alter parts of your face (No hats/ beauty images/ filters/ headgear)</Text></View>
              </View>
            </TouchableOpacity>
          )}

          {/* Consent Checkbox for PAN and Passbook */}
          {(activeTab === 'pan' || activeTab === 'passbook') && (
            <TouchableOpacity 
              style={styles.checkboxContainer} 
              activeOpacity={0.8}
              onPress={() => activeTab === 'pan' ? setIsConsentCheckedPan(!isConsentCheckedPan) : setIsConsentCheckedPassbook(!isConsentCheckedPassbook)}
            >
              <View style={[styles.checkbox, (activeTab === 'pan' ? isConsentCheckedPan : isConsentCheckedPassbook) && styles.checkboxChecked]}>
                {(activeTab === 'pan' ? isConsentCheckedPan : isConsentCheckedPassbook) && <Icon name="check" size={14} color="#fff" />}
              </View>
              <Text style={styles.checkboxText}>
                This information is used for identity verification only, and will be kept secure by Payo
              </Text>
            </TouchableOpacity>
          )}

        </ScrollView>

        {/* Footer Area */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={[styles.submitBtn, !isContinueEnabled() && styles.submitBtnDisabled]} 
            onPress={handleContinue} 
            disabled={!isContinueEnabled()}>
            <Text style={styles.submitBtnText}>Continue</Text>
            <Icon name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>

          <View style={styles.secureBadge}>
            <Image source={require('../../../assets/images/kycscreens/shield-check.png')} style={styles.secureIcon} />
            <Text style={styles.secureText}>100% Secure & Encrypted</Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}