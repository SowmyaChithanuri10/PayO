import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';

import { theme } from '../../MainTheme/theme';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import api from '../../api/axios';

export default function KycDetailsCheck({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [kycRecords, setKycRecords] = useState([]);
  const [reuploadingId, setReuploadingId] = useState(null);

  // Helper to extract image URL from string or nested object safely
  const getImageUri = (imgSource) => {
    if (!imgSource) return null;

    let urlString = '';
    if (typeof imgSource === 'object' && imgSource?.data) {
      urlString = imgSource.data;
    } else if (typeof imgSource === 'string') {
      urlString = imgSource;
    }

    if (urlString && urlString !== 'N.A.' && urlString.startsWith('http')) {
      return urlString;
    }

    return null;
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

  useEffect(() => {
    fetchKYCDetails();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchKYCDetails();
  };

  const handleReupload = (record) => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Image selection failed.');
        return;
      }

      const asset = response.assets?.[0];
      if (!asset) return;

      try {
        setReuploadingId(record.KYC_doc_id);

        const formData = new FormData();
        formData.append('document_type', record.document_type);
        formData.append('KYC_doc_id', record.KYC_doc_id);
        formData.append('file', {
          uri: asset.uri,
          type: asset.type || 'image/jpeg',
          name: asset.fileName || `reupload_${record.document_type}.jpg`,
        });

        await api.post('/api/kyc/reupload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        Alert.alert('Success', `${record.document_type} re-uploaded successfully.`);
        fetchKYCDetails();
      } catch (err) {
        Alert.alert(
          'Upload Failed',
          err?.response?.data?.message || err?.message || 'Failed to re-upload image.'
        );
      } finally {
        setReuploadingId(null);
      }
    });
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
    } else if (lowerStatus.includes('reject') || lowerStatus.includes('failed')) {
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

  const formatDocType = (typeStr) => {
    switch (typeStr) {
      case 'AADHAAR':
        return 'Aadhaar Card';
      case 'PAN':
        return 'PAN Card';
      case 'BANK':
        return 'Bank Details';
      case 'SELFIE':
        return 'Selfie Verification';
      default:
        return typeStr;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar backgroundColor="#FAFAFC" barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="chevron-left" size={moderateScale(22)} color={theme.colors.textMain} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>KYC Verification Status</Text>
          <Text style={styles.headerSubtitle}>Document Verification Status</Text>
        </View>

        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <Icon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primaryBlue} />
          <Text style={styles.loadingText}>Fetching verification status...</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primaryBlue]}
            />
          }
        >
          {/* USER INFO SUMMARY CARD */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.userAvatar}>
                <Icon name="user" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.summaryTextContainer}>
                <Text style={styles.userNameText}>
                  {kycRecords[0]?.name ? kycRecords[0]?.name.toUpperCase() : 'User Verification'}
                </Text>
                <Text style={styles.userSubText}>
                  Country: {kycRecords[0]?.Country || 'India'}
                </Text>
              </View>
            </View>
          </View>

          {/* RECORDS LIST */}
          <Text style={styles.sectionHeaderTitle}>Submitted Documents ({kycRecords.length})</Text>

          {kycRecords?.map((item) => {
            const isRejected = (item.status || '').toLowerCase().includes('reject');
            const frontImageUri = getImageUri(item.front_image_url) || getImageUri(item.selfie_url);
            const isUploadingThis = reuploadingId === item.KYC_doc_id;

            return (
              <View key={item.KYC_doc_id} style={styles.documentCard}>
                {/* CARD TOP ROW */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.docTypeWrapper}>
                    <Icon name="file-text" size={moderateScale(18)} color={theme.colors.primaryBlue} />
                    <Text style={styles.docTypeTitle}>{formatDocType(item.document_type)}</Text>
                  </View>
                  {renderStatusBadge(item.status)}
                </View>

                {/* DOCUMENT PREVIEW CONTAINER */}
                <View style={styles.previewContainer}>
                  {frontImageUri ? (
                    <Image source={{ uri: frontImageUri }} style={styles.documentPreviewImage} resizeMode="cover" />
                  ) : (
                    <View style={styles.placeholderPreview}>
                      <Icon name="image" size={32} color="#9CA3AF" />
                      <Text style={styles.placeholderText}>Document Image Uploaded</Text>
                    </View>
                  )}
                </View>

                {/* SUBMISSION TIMESTAMPS */}
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Submitted On:</Text>
                  <Text style={styles.detailValue}>
                    {item.submitted_on ? new Date(item.submitted_on).toLocaleString() : 'N/A'}
                  </Text>
                </View>

                {/* REJECTION REASON IF APPLICABLE */}
                {isRejected && (
                  <View style={styles.rejectionBox}>
                    <Icon name="alert-triangle" size={16} color="#EF4444" style={{ marginTop: 2 }} />
                    <View style={{ marginLeft: 8, flex: 1 }}>
                      <Text style={styles.rejectionTitle}>Reason for Rejection:</Text>
                      <Text style={styles.rejectionText}>
                        {item.Rejection_Reason || 'Document illegible or invalid.'}
                      </Text>
                    </View>
                  </View>
                )}

                {/* ACTION BUTTON (REUPLOAD IF REJECTED) */}
                {isRejected && (
                  <TouchableOpacity
                    style={styles.reuploadButton}
                    activeOpacity={0.8}
                    disabled={isUploadingThis}
                    onPress={() => handleReupload(item)}
                  >
                    {isUploadingThis ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <>
                        <Icon name="upload" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                        <Text style={styles.reuploadButtonText}>
                          Re-upload {formatDocType(item.document_type)}
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: '#FAFAFC',
  },
  backButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: theme.borderRadius.full,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(17),
    fontWeight: theme.typography.weight.bold,
    color: '#0D0E11',
  },
  headerSubtitle: {
    fontSize: moderateScale(12),
    color: '#414141',
    marginTop: verticalScale(2),
  },
  infoButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
  },
  summaryCard: {
    backgroundColor: theme.colors.primaryBlue,
    borderRadius: scale(16),
    padding: scale(16),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(16),
    ...theme.shadows.md,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTextContainer: {
    marginLeft: scale(12),
  },
  userNameText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userSubText: {
    fontSize: moderateScale(12),
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: verticalScale(2),
  },
  sectionHeaderTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#374151',
    marginBottom: verticalScale(12),
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: verticalScale(14),
    borderWidth: 1,
    borderColor: '#ECECF2',
    ...theme.shadows.sm,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  docTypeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docTypeTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#111827',
    marginLeft: scale(8),
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
  previewContainer: {
    height: verticalScale(140),
    width: '100%',
    borderRadius: scale(12),
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    marginBottom: verticalScale(12),
  },
  documentPreviewImage: {
    width: '100%',
    height: '100%',
  },
  placeholderPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: moderateScale(12),
    color: '#9CA3AF',
    marginTop: verticalScale(6),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(2),
  },
  detailLabel: {
    fontSize: moderateScale(12),
    color: '#6B7280',
  },
  detailValue: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#374151',
  },
  rejectionBox: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: scale(10),
    padding: scale(10),
    marginTop: verticalScale(10),
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
});