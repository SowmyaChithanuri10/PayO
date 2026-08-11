import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
  RefreshControl,
  Modal,
  Dimensions,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { theme } from '../../MainTheme/theme';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import api from '../../api/axios';
import Pdf from 'react-native-pdf';
import { WebView } from 'react-native-webview';

const { width: windowWidth } = Dimensions.get('window');

const SafePdfViewer = ({ uri, style, disabled = false, onPress }) => {
  if (!uri) return null;

  let targetUri = uri;
  if (targetUri.startsWith('http://') && targetUri.includes('ngrok')) {
    targetUri = targetUri.replace('http://', 'https://');
  }

  // Google Docs Viewer URL format for Android WebView compatibility
  const webViewUrl = Platform.OS === 'android' 
    ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(targetUri)}`
    : targetUri;

  return (
    <TouchableOpacity
      style={[styles.pdfContainer, style]}
      onPress={onPress}
      activeOpacity={disabled ? 1 : 0.85}
      disabled={disabled}
    >
      <View style={{ flex: 1, pointerEvents: 'none' }}>
        <WebView
          source={{ uri: webViewUrl }}
          style={styles.webView}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={false}
        />
      </View>
    </TouchableOpacity>
  );
};

export default function KycDetailsCheck({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [kycRecords, setKycRecords] = useState([]);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState({ uri: '', isPdf: false, name: '' });

  const getFileData = (item) => {
    let urlString = '';

    if (typeof item?.front_image_url === 'object' && item?.front_image_url?.data) {
      urlString = item.front_image_url.data;
    } else if (typeof item?.front_image_url === 'string') {
      urlString = item.front_image_url;
    }

    if ((!urlString || urlString === 'N.A.') && item?.selfie_url && item?.selfie_url !== 'N.A.') {
      if (typeof item.selfie_url === 'object' && item.selfie_url?.data) {
        urlString = item.selfie_url.data;
      } else if (typeof item.selfie_url === 'string') {
        urlString = item.selfie_url;
      }
    }

    if (urlString && urlString !== 'N.A.' && (urlString.startsWith('http') || urlString.startsWith('file'))) {
      if (urlString.startsWith('http://') && urlString.includes('ngrok')) {
        urlString = urlString.replace('http://', 'https://');
      }

      const cleanUrl = urlString.split('?')[0];
      const isPdf = cleanUrl.toLowerCase().endsWith('.pdf') || cleanUrl.toLowerCase().includes('.pdf');
      const fileName = cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1) || 'document';

      return { url: urlString, isPdf, fileName };
    }

    return { url: null, isPdf: false, fileName: '' };
  };

  const fetchKYCDetails = async () => {
    try {
      const response = await api.get('/api/kyc/details');
      const status = response?.data?.Status;
      const records = response?.data?.Data?.Records;

      if ((status === 200 || status === '200') && Array.isArray(records)) {
        setKycRecords(records);
      } else {
        setKycRecords([]);
      }
    } catch (error) {
      Alert.alert('Error', error?.message || 'Failed to fetch KYC details.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchKYCDetails();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchKYCDetails();
  };

  const getTabKeyForDocument = (documentType) => {
    switch (documentType) {
      case 'AADHAAR':
        return 'aadhaar';
      case 'PAN':
        return 'pan';
      case 'BANK':
        return 'passbook';
      case 'SELFIE':
        return 'aadhaar';
      default:
        return 'aadhaar';
    }
  };

  const handleReplace = (record) => {
    const targetTab = getTabKeyForDocument(record.document_type);
    navigation.navigate('KYCreloadOption', { replaceTab: targetTab });
  };

  const formatDocTypeLabel = (typeStr) => {
    switch (typeStr) {
      case 'AADHAAR':
        return 'Aadhaar Details';
      case 'PAN':
        return 'PAN Details';
      case 'BANK':
        return 'Cancel Cheque or Passbook Details';
      case 'SELFIE':
        return 'Selfie Details';
      default:
        return `${typeStr} Details`;
    }
  };

  const renderStatusBadge = (statusStr) => {
    const lowerStatus = (statusStr || '').toLowerCase();
    let badgeColor = '#EAB308';
    let bgColor = '#FEF9C3';
    let iconName = 'clock';

    if (lowerStatus.includes('approved') || lowerStatus.includes('verified')) {
      badgeColor = '#10B981';
      bgColor = '#D1FAE5';
      iconName = 'check-circle';
    } else if (lowerStatus.includes('reject') || lowerStatus.includes('fail') || lowerStatus.includes('decline')) {
      badgeColor = '#EF4444';
      bgColor = '#FEE2E2';
      iconName = 'x-circle';
    }

    return (
      <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
        <Icon
          name={iconName}
          size={moderateScale(12)}
          color={badgeColor}
          style={{ marginRight: scale(4) }}
        />
        <Text style={[styles.statusBadgeText, { color: badgeColor }]}>
          {statusStr || 'Under Review'}
        </Text>
      </View>
    );
  };

  const handleOpenPreview = (fileData, docType) => {
    if (!fileData.url) {
      Alert.alert('Preview Unavailable', 'Document file URL is missing.');
      return;
    }

    if (fileData.isPdf) {
      Linking.openURL(fileData.url).catch(() => {
        Alert.alert('Error', 'Unable to open PDF file.');
      });
      return;
    }

    setPreviewFile({
      uri: fileData.url,
      isPdf: false,
      name: formatDocTypeLabel(docType),
    });
    setPreviewVisible(true);
  };

  const renderDocumentPreview = (item, fileData, isApproved) => {
    if (!fileData.url) {
      return (
        <View style={styles.placeholderPreview}>
          <Icon name="file" size={32} color="#9CA3AF" />
          <Text style={styles.placeholderText}>No Document Uploaded</Text>
        </View>
      );
    }

    if (fileData.isPdf) {
      return (
        <SafePdfViewer 
          uri={fileData.url} 
          title={fileData.fileName || formatDocTypeLabel(item.document_type)} 
          disabled={isApproved}
        />
      );
    }

    return (
      <TouchableOpacity
        style={styles.thumbnailWrapper}
        activeOpacity={isApproved ? 1 : 0.9}
        disabled={isApproved}
        onPress={() => handleOpenPreview(fileData, item.document_type)}>
        <Image
          source={{
            uri: fileData.url,
            headers: {
              'ngrok-skip-browser-warning': '69420',
            },
          }}
          style={styles.documentPreviewImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  // --- DYNAMIC FOOTER LOGIC ---
  const hasRejectedDocs = kycRecords.some(item => {
    const statusLower = (item.status || '').toLowerCase();
    return statusLower.includes('reject') || statusLower.includes('fail') || statusLower.includes('decline');
  });

  const handleFooterAction = () => {
    if (hasRejectedDocs) {
      // If there's a rejection, prompt them to use the local replace buttons
      // Alert.alert('Action Required', 'Please tap on "Re-upload" for the rejected documents listed above.');
      navigation.navigate('Main');

    } else {
      // If everything is under review or approved, take them to the Home Page
      // (Make sure 'Home' matches the exact route name defined in your navigator)
      navigation.navigate('Main');
    }
  };
  // ----------------------------

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <Icon name="chevron-left" size={moderateScale(22)} color="#1F2937" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Review Your Information</Text>
          <Text style={styles.headerSubtitle}>
            Please review all the information before submitting your KYC application.
          </Text>
        </View>

        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <Icon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue || '#4F46E5'} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primaryBlue || '#4F46E5'} />
          <Text style={styles.loadingText}>Fetching documents...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[theme.colors.primaryBlue || '#4F46E5']}
              />
            }>
            {kycRecords.map((item) => {
              const fileData = getFileData(item);
              const statusLower = (item.status || '').toLowerCase();
              const isRejected = statusLower.includes('reject') || statusLower.includes('fail') || statusLower.includes('decline');
              const isApproved = statusLower.includes('approved') || statusLower.includes('verified');

              return (
                <View key={item.KYC_doc_id || item.document_type} style={styles.sectionContainer}>
                  <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>
                      • {formatDocTypeLabel(item.document_type)}
                    </Text>
                    {renderStatusBadge(item.status)}
                  </View>

                  <View style={styles.cardContainer}>
                    <View style={styles.previewBox}>
                      {renderDocumentPreview(item, fileData, isApproved)}
                    </View>

                    {fileData.fileName ? (
                      <View style={styles.fileActionContainer}>
                        <Text style={styles.fileNameText} numberOfLines={1}>
                          {fileData.fileName}
                        </Text>
                        
                        {isRejected ? (
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => handleReplace(item)}>
                            <Text style={styles.clickToActionText}>Click to replace</Text>
                          </TouchableOpacity>
                        ) : !isApproved ? (
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => handleOpenPreview(fileData, item.document_type)}>
                            <Text style={styles.clickToActionText}>Click to View</Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    ) : null}

                    {isRejected && (
                      <View style={styles.rejectionBox}>
                        <Icon name="alert-triangle" size={16} color="#EF4444" style={{ marginTop: 2 }} />
                        <View style={{ marginLeft: 8, flex: 1 }}>
                          <Text style={styles.rejectionTitle}>Reason for Rejection:</Text>
                          <Text style={styles.rejectionText}>
                            {item.Rejection_Reason || item.rejection_reason || 'Document illegible or invalid.'}
                          </Text>
                        </View>
                      </View>
                    )}

                    {isRejected && (
                      <TouchableOpacity
                        style={styles.reuploadButton}
                        activeOpacity={0.8}
                        onPress={() => handleReplace(item)}>
                        <Icon name="upload" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                        <Text style={styles.reuploadButtonText}>
                          Re-upload {formatDocTypeLabel(item.document_type)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* DYNAMIC FOOTER RENDER */}
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: hasRejectedDocs ? '#4F46E5' : (theme.colors.primaryBlue || '#4F46E5') }
              ]}
              activeOpacity={0.8}
              onPress={handleFooterAction}>
              
              <Text style={styles.submitButtonText}>
                {hasRejectedDocs ? 'Go to Home' : 'Go to Home'}
              </Text>
              
              {/* <Icon 
                name={hasRejectedDocs ? 'upload' : 'home'} 
                size={20} 
                color="#FFFFFF" 
                style={{ marginLeft: scale(8) }} 
              /> */}
            </TouchableOpacity>

            <View style={styles.secureBadge}>
              <Icon name="shield" size={14} color="#4F46E5" style={{ marginRight: scale(6) }} />
              <Text style={styles.secureBadgeText}>100% Secure & Encrypted</Text>
            </View>
          </View>
        </View>
      )}

      <Modal
        visible={previewVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPreviewVisible(false)}>
        <SafeAreaView style={styles.modalBackground}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle} numberOfLines={1}>
              {previewFile.name}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPreviewVisible(false)}>
              <Icon name="x" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContentContainer}>
            {previewFile.uri ? (
              <Image
                source={{
                  uri: previewFile.uri,
                  headers: {
                    'ngrok-skip-browser-warning': '69420',
                  },
                }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            ) : (
              <ActivityIndicator size="large" color="#FFF" />
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
 pdfContainer: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  pdfView: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: verticalScale(12),
    fontSize: moderateScale(13),
    color: '#6B7280',
  },
  header: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(16),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scale(12),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: moderateScale(12),
    color: '#6B7280',
    textAlign: 'center',
    marginTop: verticalScale(6),
    lineHeight: moderateScale(16),
  },
  infoButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
  },
  sectionContainer: {
    marginBottom: verticalScale(20),
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#111827',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(12),
  },
  statusBadgeText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  cardContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: scale(16),
    padding: scale(16),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  previewBox: {
    width: '100%',
    minHeight: verticalScale(100),
    borderRadius: scale(12),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  thumbnailWrapper: {
    width: '100%',
    height: verticalScale(150),
  },
  documentPreviewImage: {
    width: '100%',
    height: '100%',
  },
  pdfPreviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: scale(12),
    width: '100%',
    borderRadius: scale(8),
  },
  pdfIconCircle: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  pdfInfoContainer: {
    flex: 1,
  },
  pdfTitleText: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#991B1B',
  },
  pdfSubText: {
    fontSize: moderateScale(11),
    color: '#B91C1C',
    marginTop: verticalScale(2),
  },
  placeholderPreview: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(20),
  },
  placeholderText: {
    fontSize: moderateScale(12),
    color: '#9CA3AF',
    marginTop: verticalScale(6),
  },
  fileActionContainer: {
    alignItems: 'center',
    marginTop: verticalScale(12),
  },
  fileNameText: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: verticalScale(2),
  },
  clickToActionText: {
    fontSize: moderateScale(12),
    color: '#4F46E5',
    fontWeight: '600',
  },
  rejectionBox: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: scale(10),
    padding: scale(10),
    marginTop: verticalScale(12),
  },
  rejectionTitle: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#991B1B',
  },
  rejectionText: {
    fontSize: moderateScale(11),
    color: '#B91C1C',
    marginTop: verticalScale(2),
  },
  reuploadButton: {
    width: '100%',
    backgroundColor: '#EF4444',
    borderRadius: scale(12),
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(12),
  },
  reuploadButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(13),
    fontWeight: '600',
  },
  footerContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(20),
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    borderRadius: scale(14),
    paddingVertical: verticalScale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: scale(20),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    alignSelf: 'center',
    marginTop: verticalScale(12),
  },
  secureBadgeText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#334155',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
    flex: 1,
  },
  closeButton: {
    padding: scale(4),
  },
  modalContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: windowWidth,
    height: '100%',
  },
});