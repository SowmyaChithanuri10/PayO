import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNFS from 'react-native-fs';
import ImageCropPicker from 'react-native-image-crop-picker';
import { pick } from '@react-native-documents/picker';
import api from '../../api/axios';
import { theme } from '../../MainTheme/theme';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';

export default function KYCreloadOption({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);

  // Read which exact document needs re-uploading ('pan', 'passbook', or 'aadhaar')
  const targetDocument = route?.params?.replaceTab || 'pan';

  // Individual Document File States
  const [selectedFile, setSelectedFile] = useState(null);
  const [faceFile, setFaceFile] = useState(null);

  // Consent State
  const [isConsentChecked, setIsConsentChecked] = useState(false);

  // Document picker selector
  const handleDocumentUpload = () => {
    Alert.alert('Upload Document', 'Choose file source', [
      { text: 'Image Gallery', onPress: openImagePicker },
      { text: 'PDF Document', onPress: openPdfPicker },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openImagePicker = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      });

      const file = {
        name: image.filename || `document_${Date.now()}.jpg`,
        type: image.mime,
        uri: image.path,
        size: image.size,
      };

      setSelectedFile(file);
    } catch (err) {
      if (err.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to pick image.');
      }
    }
  };

  const openPdfPicker = async () => {
    try {
      const result = await pick({ type: ['application/pdf'] });
      if (result && result.length > 0) {
        setSelectedFile({
          name: result[0].name,
          type: result[0].type,
          uri: result[0].uri,
          size: result[0].size,
        });
      }
    } catch (err) {
      console.log('PDF Picker Error:', err);
    }
  };

  const handleFaceUpload = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImageCropPicker.openCamera({
          width: 800,
          height: 800,
          cropping: false,
          useFrontCamera: true,
          mediaType: 'photo',
        })
          .then((image) => {
            setFaceFile({
              uri: image.path,
              type: image.mime,
              name: image.filename || `selfie_${Date.now()}.jpg`,
              size: image.size,
            });
          })
          .catch((err) => {
            if (err.message !== 'User cancelled image selection') {
              Alert.alert('Error', 'Failed to open camera.');
            }
          });
      } else {
        Alert.alert('Permission Denied', 'Camera access is required for selfie.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getBase64 = async (file) => {
    const base64Data = await RNFS.readFile(file.uri, 'base64');
    return `data:${file.type};base64,${base64Data}`;
  };

  // Submit Handler: Submits ONLY the active document type
  const handleSubmitDocument = async () => {
    if (!selectedFile) {
      Alert.alert('Document Required', 'Please select a document file to proceed.');
      return;
    }

    if ((targetDocument === 'pan' || targetDocument === 'passbook') && !isConsentChecked) {
      Alert.alert('Consent Required', 'Please check the consent box before submitting.');
      return;
    }

    if (targetDocument === 'aadhaar' && !faceFile) {
      Alert.alert('Selfie Required', 'Please capture a clear selfie photo.');
      return;
    }

    setIsLoading(true);

    try {
      const base64File = await getBase64(selectedFile);
      let payload = { documents: [] };

      if (targetDocument === 'pan') {
        payload.documents.push({
          documentType: 'PAN',
          frontImage: base64File,
          backImage: '',
        });
      } else if (targetDocument === 'passbook') {
        payload.documents.push({
          documentType: 'BANK',
          frontImage: base64File,
          backImage: '',
        });
      } else if (targetDocument === 'aadhaar') {
        const selfieBase64 = await getBase64(faceFile);
        payload.documents.push(
          {
            documentType: 'AADHAAR',
            frontImage: base64File,
            backImage: '',
          },
          {
            documentType: 'SELFIE',
            frontImage: selfieBase64,
            backImage: '',
          }
        );
      }

     const response = await api.post('/api/kyc/upload-document', payload);

// Read lowercase "status" or check HTTP status directly
const resStatus = response?.data?.status || response?.status;

if (resStatus === 200 || resStatus === '200' || response?.data?.success) {
  Alert.alert('Success', 'Document re-uploaded successfully!', [
    {
      text: 'OK',
      onPress: () => {
        // Redirect back to KycDetailsCheck
        navigation.navigate('KycDetailsCheck');
      },
    },
  ]);
} else {
  Alert.alert(
    'Upload Failed',
    response?.data?.message || response?.data?.Message || 'Could not upload document.'
  );
}
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert(
        'Upload Error',
        error?.response?.data?.message || error.message || 'An error occurred while uploading. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getDocTitle = () => {
    switch (targetDocument) {
      case 'pan':
        return 'Re-upload PAN Card';
      case 'passbook':
        return 'Re-upload Bank Details';
      case 'aadhaar':
      default:
        return 'Re-upload Identity Document';
    }
  };

  const isButtonDisabled = () => {
    if (isLoading) return true;
    if (!selectedFile) return true;
    if ((targetDocument === 'pan' || targetDocument === 'passbook') && !isConsentChecked) return true;
    if (targetDocument === 'aadhaar' && !faceFile) return true;
    return false;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FAFAFC" barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={22} color="#111827" />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.heading}>{getDocTitle()}</Text>
            <Text style={styles.subText}>Upload a clear document image/file to complete re-verification.</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Main Document Upload Box */}
          <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={handleDocumentUpload}>
            <Icon name="upload-cloud" size={36} color={theme.colors.primaryBlue} />
            <Text style={styles.cardTitle}>
              {targetDocument === 'pan'
                ? 'Select PAN Card File'
                : targetDocument === 'passbook'
                ? 'Select Bank Passbook or Cheque'
                : 'Select Identity Document'}
            </Text>
            <Text style={styles.cardSub}>JPG, PNG or PDF • Max 5MB</Text>

            {selectedFile && <Text style={styles.fileName}>✓ Selected: {selectedFile.name}</Text>}
          </TouchableOpacity>

          {/* Aadhaar Selfie Box (Only shown if target is Aadhaar) */}
          {targetDocument === 'aadhaar' && (
            <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={handleFaceUpload}>
              <Icon name="camera" size={32} color={theme.colors.primaryBlue} />
              <Text style={styles.cardTitle}>Capture Selfie</Text>
              <Text style={styles.cardSub}>Ensure good lighting and face clearly visible</Text>
              {faceFile && <Text style={styles.fileName}>✓ Selfie captured</Text>}
            </TouchableOpacity>
          )}

          {/* Consent Checkbox for PAN / Bank Details */}
          {(targetDocument === 'pan' || targetDocument === 'passbook') && (
            <TouchableOpacity
              style={styles.checkboxContainer}
              activeOpacity={0.8}
              onPress={() => setIsConsentChecked(!isConsentChecked)}>
              <View style={[styles.checkbox, isConsentChecked && styles.checkboxChecked]}>
                {isConsentChecked && <Icon name="check" size={14} color="#FFF" />}
              </View>
              <Text style={styles.checkboxText}>
                I confirm this document belongs to me and grant authorization for verification.
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* Submit Action Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.submitBtn, isButtonDisabled() && styles.submitBtnDisabled]}
            onPress={handleSubmitDocument}
            disabled={isButtonDisabled()}>
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.submitBtnText}>Submit & Return</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFC' },
  container: { flex: 1, paddingHorizontal: scale(16) },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },
  backButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: scale(19),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  titleWrapper: { marginLeft: scale(12), flex: 1 },
  heading: { fontSize: moderateScale(18), fontWeight: '700', color: '#111827' },
  subText: { fontSize: moderateScale(12), color: '#6B7280', marginTop: verticalScale(2) },

  scrollContent: { paddingBottom: verticalScale(20) },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: scale(12),
    padding: scale(20),
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  cardTitle: { fontSize: moderateScale(15), fontWeight: '600', color: '#111827', marginTop: verticalScale(8) },
  cardSub: { fontSize: moderateScale(12), color: '#9CA3AF', marginTop: verticalScale(4) },
  fileName: { fontSize: moderateScale(12), fontWeight: '700', color: '#10B981', marginTop: verticalScale(10) },

  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(8) },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(4),
    borderWidth: 2,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  checkboxChecked: { backgroundColor: theme.colors.primaryBlue, borderColor: theme.colors.primaryBlue },
  checkboxText: { fontSize: moderateScale(12), color: '#4B5563', flex: 1 },

  bottomContainer: { paddingVertical: verticalScale(16) },
  submitBtn: {
    backgroundColor: theme.colors.primaryBlue,
    borderRadius: scale(12),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
  },
  submitBtnDisabled: { backgroundColor: '#9CA3AF' },
  submitBtnText: { color: '#FFFFFF', fontSize: moderateScale(15), fontWeight: '700' },
});