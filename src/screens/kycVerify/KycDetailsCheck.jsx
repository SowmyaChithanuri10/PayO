// import React, { useState, useEffect } from 'react';

// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   Alert,
//   RefreshControl,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Feather';
// import { launchImageLibrary } from 'react-native-image-picker';

// import { theme } from '../../MainTheme/theme';
// import { scale, verticalScale, moderateScale } from '../../utils/responsive';
// import api from '../../api/axios';

// export default function KycDetailsCheck({ navigation }) {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [kycRecords, setKycRecords] = useState([]);
//   const [reuploadingId, setReuploadingId] = useState(null);

//   // Helper to extract image URL from string or nested object safely
//   const getImageUri = (imgSource) => {
//     if (!imgSource) return null;

//     let urlString = '';
//     if (typeof imgSource === 'object' && imgSource?.data) {
//       urlString = imgSource.data;
//     } else if (typeof imgSource === 'string') {
//       urlString = imgSource;
//     }

//     if (urlString && urlString !== 'N.A.' && urlString.startsWith('http')) {
//       return urlString;
//     }

//     return null;
//   };

//   const fetchKYCDetails = async () => {
//     try {
//       const response = await api.get('/api/kyc/details');
//       const status = response?.data?.Status;
//       const records = response?.data?.Data?.Records;

//       if ((status === 200 || status === '200') && Array.isArray(records)) {
//         setKycRecords(records);
//       } else {
//         setKycRecords([]);
//       }
//     } catch (error) {
//       Alert.alert('Error', error?.message || 'Failed to fetch KYC details.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchKYCDetails();
//   };

//   const handleReupload = (record) => {
    
//     const options = {
//       mediaType: 'photo',
//       quality: 0.8,
//       includeBase64: false,
//     };

//     launchImageLibrary(options, async (response) => {
//       if (response.didCancel) return;
//       if (response.errorCode) {
//         Alert.alert('Error', response.errorMessage || 'Image selection failed.');
//         return;
//       }

//       const asset = response.assets?.[0];
//       if (!asset) return;

//       try {
//         setReuploadingId(record.KYC_doc_id);

//         const formData = new FormData();
//         formData.append('document_type', record.document_type);
//         formData.append('KYC_doc_id', record.KYC_doc_id);
//         formData.append('file', {
//           uri: asset.uri,
//           type: asset.type || 'image/jpeg',
//           name: asset.fileName || `reupload_${record.document_type}.jpg`,
//         });

//         await api.post('/api/kyc/reupload', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });

//         Alert.alert('Success', `${record.document_type} re-uploaded successfully.`);
//         fetchKYCDetails();
//       } catch (err) {
//         Alert.alert(
//           'Upload Failed',
//           err?.response?.data?.message || err?.message || 'Failed to re-upload image.'
//         );
//       } finally {
//         setReuploadingId(null);
//       }
//     });
//   };

//   const renderStatusBadge = (statusStr) => {
//     const lowerStatus = (statusStr || '').toLowerCase();
//     let badgeColor = '#EAB308';
//     let bgColor = '#FEF9C3';
//     let iconName = 'clock';

//     if (lowerStatus.includes('approved') || lowerStatus.includes('verified')) {
//       badgeColor = '#10B981';
//       bgColor = '#D1FAE5';
//       iconName = 'check-circle';
//     } else if (lowerStatus.includes('reject') || lowerStatus.includes('failed')) {
//       badgeColor = '#EF4444';
//       bgColor = '#FEE2E2';
//       iconName = 'x-circle';
//     }

//     return (
//       <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
//         <Icon
//           name={iconName}
//           size={moderateScale(12)}
//           color={badgeColor}
//           style={{ marginRight: scale(4) }}
//         />
//         <Text style={[styles.statusBadgeText, { color: badgeColor }]}>
//           {statusStr || 'Under Review'}
//         </Text>
//       </View>
//     );
//   };

//   const formatDocType = (typeStr) => {
//     switch (typeStr) {
//       case 'AADHAAR':
//         return 'Aadhaar Card';
//       case 'PAN':
//         return 'PAN Card';
//       case 'BANK':
//         return 'Bank Details';
//       case 'SELFIE':
//         return 'Selfie Verification';
//       default:
//         return typeStr;
//     }
//   };

//   const getTabKeyForDocument = (documentType) => {
//   switch (documentType) {
//     case 'AADHAAR':
//       return 'aadhaar';
//     case 'PAN':
//       return 'pan';
//     case 'BANK':
//       return 'passbook';
//     case 'SELFIE':
//       return 'aadhaar'; // Defaulting SELFIE back to the Aadhaar/Selfie tab
//     default:
//       return 'aadhaar';
//   }
// };

//   useEffect(() => {
//     fetchKYCDetails();
//   }, []);


//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
//       <StatusBar backgroundColor="#FAFAFC" barStyle="dark-content" />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.7}
//         >
//           <Icon name="chevron-left" size={moderateScale(22)} color={theme.colors.textMain} />
//         </TouchableOpacity>

//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle}>KYC Verification Status</Text>
//           <Text style={styles.headerSubtitle}>Document Verification Status</Text>
//         </View>

//         <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
//           <Icon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue} />
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color={theme.colors.primaryBlue} />
//           <Text style={styles.loadingText}>Fetching verification status...</Text>
//         </View>
//       ) : (
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={[theme.colors.primaryBlue]}
//             />
//           }
//         >
//           {/* USER INFO SUMMARY CARD */}
//           <View style={styles.summaryCard}>
//             <View style={styles.summaryRow}>
//               <View style={styles.userAvatar}>
//                 <Icon name="user" size={24} color="#FFFFFF" />
//               </View>
//               <View style={styles.summaryTextContainer}>
//                 <Text style={styles.userNameText}>
//                   {kycRecords[0]?.name ? kycRecords[0]?.name.toUpperCase() : 'User Verification'}
//                 </Text>
//                 <Text style={styles.userSubText}>
//                   Country: {kycRecords[0]?.Country || 'India'}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           {/* RECORDS LIST */}
//           <Text style={styles.sectionHeaderTitle}>Submitted Documents ({kycRecords.length})</Text>

//           {kycRecords?.map((item) => {
//             const isRejected = (item.status || '').toLowerCase().includes('reject');
//             const frontImageUri = getImageUri(item.front_image_url) || getImageUri(item.selfie_url);
//             const isUploadingThis = reuploadingId === item.KYC_doc_id;

//             return (
//               <View key={item.KYC_doc_id} style={styles.documentCard}>
//                 {/* CARD TOP ROW */}
//                 <View style={styles.cardHeaderRow}>
//                   <View style={styles.docTypeWrapper}>
//                     <Icon name="file-text" size={moderateScale(18)} color={theme.colors.primaryBlue} />
//                     <Text style={styles.docTypeTitle}>{formatDocType(item.document_type)}</Text>
//                   </View>
//                   {renderStatusBadge(item.status)}
//                 </View>

//                 {/* DOCUMENT PREVIEW CONTAINER */}
//                 <View style={styles.previewContainer}>
//                   {frontImageUri ? (
//                     <Image source={{ uri: frontImageUri }} style={styles.documentPreviewImage} resizeMode="cover" />
//                   ) : (
//                     <View style={styles.placeholderPreview}>
//                       <Icon name="image" size={32} color="#9CA3AF" />
//                       <Text style={styles.placeholderText}>Document Image Uploaded</Text>
//                     </View>
//                   )}
//                 </View>

//                 {/* SUBMISSION TIMESTAMPS */}
//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Submitted On:</Text>
//                   <Text style={styles.detailValue}>
//                     {item.submitted_on ? new Date(item.submitted_on).toLocaleString() : 'N/A'}
//                   </Text>
//                 </View>

//                 {/* REJECTION REASON IF APPLICABLE */}
//                 {isRejected && (
//                   <View style={styles.rejectionBox}>
//                     <Icon name="alert-triangle" size={16} color="#EF4444" style={{ marginTop: 2 }} />
//                     <View style={{ marginLeft: 8, flex: 1 }}>
//                       <Text style={styles.rejectionTitle}>Reason for Rejection:</Text>
//                       <Text style={styles.rejectionText}>
//                         {item.Rejection_Reason || 'Document illegible or invalid.'}
//                       </Text>
//                     </View>
//                   </View>
//                 )}

//                 {/* ACTION BUTTON (REUPLOAD IF REJECTED) */}
//                 {isRejected && (
//                   <TouchableOpacity
//                     style={styles.reuploadButton}
//                     activeOpacity={0.8}
//                     disabled={isUploadingThis}
//                     onPress={() => handleReupload(item)}
//                   >
//                     {isUploadingThis ? (
//                       <ActivityIndicator size="small" color="#FFFFFF" />
//                     ) : (
//                       <>
//                         <Icon name="upload" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
//                         <Text style={styles.reuploadButtonText}>
//                           Re-upload {formatDocType(item.document_type)}
//                         </Text>
//                       </>
//                     )}
//                   </TouchableOpacity>
//                 )}
//               </View>
//             );
//           })}
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFC',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: verticalScale(12),
//     fontSize: moderateScale(13),
//     color: '#6B7280',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(12),
//     backgroundColor: '#FAFAFC',
//   },
//   backButton: {
//     width: moderateScale(38),
//     height: moderateScale(38),
//     borderRadius: theme.borderRadius.full,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     ...theme.shadows.sm,
//   },
//   headerTitleContainer: {
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: moderateScale(17),
//     fontWeight: theme.typography.weight.bold,
//     color: '#0D0E11',
//   },
//   headerSubtitle: {
//     fontSize: moderateScale(12),
//     color: '#414141',
//     marginTop: verticalScale(2),
//   },
//   infoButton: {
//     width: moderateScale(38),
//     height: moderateScale(38),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   scrollContent: {
//     paddingHorizontal: scale(16),
//     paddingBottom: verticalScale(32),
//   },
//   summaryCard: {
//     backgroundColor: theme.colors.primaryBlue,
//     borderRadius: scale(16),
//     padding: scale(16),
//     marginTop: verticalScale(8),
//     marginBottom: verticalScale(16),
//     ...theme.shadows.md,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   userAvatar: {
//     width: scale(46),
//     height: scale(46),
//     borderRadius: scale(23),
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   summaryTextContainer: {
//     marginLeft: scale(12),
//   },
//   userNameText: {
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//     color: '#FFFFFF',
//   },
//   userSubText: {
//     fontSize: moderateScale(12),
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginTop: verticalScale(2),
//   },
//   sectionHeaderTitle: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     color: '#374151',
//     marginBottom: verticalScale(12),
//   },
//   documentCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: scale(16),
//     padding: scale(16),
//     marginBottom: verticalScale(14),
//     borderWidth: 1,
//     borderColor: '#ECECF2',
//     ...theme.shadows.sm,
//   },
//   cardHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: verticalScale(12),
//   },
//   docTypeWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   docTypeTitle: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     color: '#111827',
//     marginLeft: scale(8),
//   },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: scale(8),
//     paddingVertical: verticalScale(4),
//     borderRadius: scale(12),
//   },
//   statusBadgeText: {
//     fontSize: moderateScale(11),
//     fontWeight: '600',
//   },
//   previewContainer: {
//     height: verticalScale(140),
//     width: '100%',
//     borderRadius: scale(12),
//     overflow: 'hidden',
//     backgroundColor: '#F3F4F6',
//     marginBottom: verticalScale(12),
//   },
//   documentPreviewImage: {
//     width: '100%',
//     height: '100%',
//   },
//   placeholderPreview: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   placeholderText: {
//     fontSize: moderateScale(12),
//     color: '#9CA3AF',
//     marginTop: verticalScale(6),
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: verticalScale(2),
//   },
//   detailLabel: {
//     fontSize: moderateScale(12),
//     color: '#6B7280',
//   },
//   detailValue: {
//     fontSize: moderateScale(12),
//     fontWeight: '600',
//     color: '#374151',
//   },
//   rejectionBox: {
//     flexDirection: 'row',
//     backgroundColor: '#FEF2F2',
//     borderWidth: 1,
//     borderColor: '#FCA5A5',
//     borderRadius: scale(10),
//     padding: scale(10),
//     marginTop: verticalScale(10),
//   },
//   rejectionTitle: {
//     fontSize: moderateScale(12),
//     fontWeight: '700',
//     color: '#991B1B',
//   },
//   rejectionText: {
//     fontSize: moderateScale(11),
//     color: '#B91C1C',
//     marginTop: verticalScale(2),
//   },
//   reuploadButton: {
//     backgroundColor: '#EF4444',
//     borderRadius: scale(12),
//     paddingVertical: verticalScale(10),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: verticalScale(12),
//   },
//   reuploadButtonText: {
//     color: '#FFFFFF',
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//   },
// });


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   Alert,
//   RefreshControl,
//   Linking,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Feather';

// import { theme } from '../../MainTheme/theme';
// import { scale, verticalScale, moderateScale } from '../../utils/responsive';
// import api from '../../api/axios';

// export default function KycDetailsCheck({ navigation }) {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [kycRecords, setKycRecords] = useState([]);

//   // Helper to extract file details safely
//   const getFileData = (imgSource) => {
//     if (!imgSource) return { url: null, isPdf: false };

//     let urlString = '';
//     if (typeof imgSource === 'object' && imgSource?.data) {
//       urlString = imgSource.data;
//     } else if (typeof imgSource === 'string') {
//       urlString = imgSource;
//     }

//     if (urlString && urlString !== 'N.A.' && urlString.startsWith('http')) {
//       const isPdf = urlString.toLowerCase().includes('.pdf');
//       return { url: urlString, isPdf };
//     }

//     return { url: null, isPdf: false };
//   };

//   const fetchKYCDetails = async () => {
//     try {
//       const response = await api.get('/api/kyc/details');
//       const status = response?.data?.Status;
//       const records = response?.data?.Data?.Records;

//       if ((status === 200 || status === '200') && Array.isArray(records)) {
//         setKycRecords(records);
//       } else {
//         setKycRecords([]);
//       }
//     } catch (error) {
//       Alert.alert('Error', error?.message || 'Failed to fetch KYC details.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchKYCDetails();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchKYCDetails();
//   };

//   const getTabKeyForDocument = (documentType) => {
//     switch (documentType) {
//       case 'AADHAAR':
//         return 'aadhaar';
//       case 'PAN':
//         return 'pan';
//       case 'BANK':
//         return 'passbook';
//       case 'SELFIE':
//         return 'aadhaar';
//       default:
//         return 'aadhaar';
//     }
//   };

//   const handleReupload = (record) => {
//     const targetTab = getTabKeyForDocument(record.document_type);

//     navigation.navigate('KYCreloadOption', {
//       replaceTab: targetTab,
//     });
//   };

//   const renderStatusBadge = (statusStr) => {
//     const lowerStatus = (statusStr || '').toLowerCase();
//     let badgeColor = '#EAB308';
//     let bgColor = '#FEF9C3';
//     let iconName = 'clock';

//     if (lowerStatus.includes('approved') || lowerStatus.includes('verified')) {
//       badgeColor = '#10B981';
//       bgColor = '#D1FAE5';
//       iconName = 'check-circle';
//     } else if (lowerStatus.includes('reject') || lowerStatus.includes('failed')) {
//       badgeColor = '#EF4444';
//       bgColor = '#FEE2E2';
//       iconName = 'x-circle';
//     }

//     return (
//       <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
//         <Icon
//           name={iconName}
//           size={moderateScale(12)}
//           color={badgeColor}
//           style={{ marginRight: scale(4) }}
//         />
//         <Text style={[styles.statusBadgeText, { color: badgeColor }]}>
//           {statusStr || 'Under Review'}
//         </Text>
//       </View>
//     );
//   };

//   const formatDocType = (typeStr) => {
//     switch (typeStr) {
//       case 'AADHAAR':
//         return 'Identity Document';
//       case 'PAN':
//         return 'PAN Card';
//       case 'BANK':
//         return 'Bank Details';
//       case 'SELFIE':
//         return 'Selfie Verification';
//       default:
//         return typeStr;
//     }
//   };

//   const renderDocumentPreview = (item) => {
//     const fileData = getFileData(item.front_image_url) || getFileData(item.selfie_url);

//     if (!fileData.url) {
//       return (
//         <View style={styles.placeholderPreview}>
//           <Icon name="file" size={32} color="#9CA3AF" />
//           <Text style={styles.placeholderText}>No Document Available</Text>
//         </View>
//       );
//     }

//     if (fileData.isPdf) {
//       return (
//         <TouchableOpacity
//           style={styles.pdfCardContainer}
//           activeOpacity={0.8}
//           onPress={() => Linking.openURL(fileData.url)}>
//           <View style={styles.pdfIconContainer}>
//             <Icon name="file-text" size={36} color="#EF4444" />
//           </View>
//           <Text style={styles.pdfTitleText}>PDF Document Attached</Text>
//           <View style={styles.openPdfBtn}>
//             <Text style={styles.openPdfBtnText}>Tap to View / Download PDF ↗</Text>
//           </View>
//         </TouchableOpacity>
//       );
//     }

//     return (
//       <Image
//         source={{ uri: fileData.url }}
//         style={styles.documentPreviewImage}
//         resizeMode="cover"
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
//       <StatusBar backgroundColor="#FAFAFC" barStyle="dark-content" />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.7}>
//           <Icon name="chevron-left" size={moderateScale(22)} color={theme.colors.textMain} />
//         </TouchableOpacity>

//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle}>KYC Verification Status</Text>
//           <Text style={styles.headerSubtitle}>Document Verification Status</Text>
//         </View>

//         <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
//           <Icon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue} />
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color={theme.colors.primaryBlue} />
//           <Text style={styles.loadingText}>Fetching verification status...</Text>
//         </View>
//       ) : (
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={[theme.colors.primaryBlue]}
//             />
//           }>
//           {/* USER INFO SUMMARY CARD */}
//           <View style={styles.summaryCard}>
//             <View style={styles.summaryRow}>
//               <View style={styles.userAvatar}>
//                 <Icon name="user" size={24} color="#FFFFFF" />
//               </View>
//               <View style={styles.summaryTextContainer}>
//                 <Text style={styles.userNameText}>
//                   {kycRecords[0]?.name ? kycRecords[0]?.name.toUpperCase() : 'User Verification'}
//                 </Text>
//                 <Text style={styles.userSubText}>
//                   Country: {kycRecords[0]?.Country || 'India'}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           {/* RECORDS LIST */}
//           <Text style={styles.sectionHeaderTitle}>Submitted Documents ({kycRecords.length})</Text>

//           {kycRecords?.map((item) => {
//             const isRejected = (item.status || '').toLowerCase().includes('reject');

//             return (
//               <View key={item.KYC_doc_id} style={styles.documentCard}>
//                 <View style={styles.cardHeaderRow}>
//                   <View style={styles.docTypeWrapper}>
//                     <Icon name="file-text" size={moderateScale(18)} color={theme.colors.primaryBlue} />
//                     <Text style={styles.docTypeTitle}>{formatDocType(item.document_type)}</Text>
//                   </View>
//                   {renderStatusBadge(item.status)}
//                 </View>

//                 {/* DOCUMENT / PDF PREVIEW CONTAINER */}
//                 <View style={styles.previewContainer}>
//                   {renderDocumentPreview(item)}
//                 </View>

//                 {/* SUBMISSION TIMESTAMPS */}
//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Submitted On:</Text>
//                   <Text style={styles.detailValue}>
//                     {item.submitted_on ? new Date(item.submitted_on).toLocaleString() : 'N/A'}
//                   </Text>
//                 </View>

//                 {/* REJECTION REASON IF APPLICABLE */}
//                 {isRejected && (
//                   <View style={styles.rejectionBox}>
//                     <Icon name="alert-triangle" size={16} color="#EF4444" style={{ marginTop: 2 }} />
//                     <View style={{ marginLeft: 8, flex: 1 }}>
//                       <Text style={styles.rejectionTitle}>Reason for Rejection:</Text>
//                       <Text style={styles.rejectionText}>
//                         {item.Rejection_Reason || 'Document illegible or invalid.'}
//                       </Text>
//                     </View>
//                   </View>
//                 )}

//                 {/* RE-UPLOAD ACTION BUTTON */}
//                 {isRejected && (
//                   <TouchableOpacity
//                     style={styles.reuploadButton}
//                     activeOpacity={0.8}
//                     onPress={() => handleReupload(item)}>
//                     <Icon name="upload" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
//                     <Text style={styles.reuploadButtonText}>
//                       Re-upload {formatDocType(item.document_type)}
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             );
//           })}
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#FAFAFC' },
//   loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   loadingText: { marginTop: verticalScale(12), fontSize: moderateScale(13), color: '#6B7280' },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(12),
//     backgroundColor: '#FAFAFC',
//   },
//   backButton: {
//     width: moderateScale(38),
//     height: moderateScale(38),
//     borderRadius: theme.borderRadius.full,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     ...theme.shadows.sm,
//   },
//   headerTitleContainer: { alignItems: 'center' },
//   headerTitle: { fontSize: moderateScale(17), fontWeight: theme.typography.weight.bold, color: '#0D0E11' },
//   headerSubtitle: { fontSize: moderateScale(12), color: '#414141', marginTop: verticalScale(2) },
//   infoButton: { width: moderateScale(38), height: moderateScale(38), alignItems: 'center', justifyContent: 'center' },
//   scrollContent: { paddingHorizontal: scale(16), paddingBottom: verticalScale(32) },
//   summaryCard: {
//     backgroundColor: theme.colors.primaryBlue,
//     borderRadius: scale(16),
//     padding: scale(16),
//     marginTop: verticalScale(8),
//     marginBottom: verticalScale(16),
//     ...theme.shadows.md,
//   },
//   summaryRow: { flexDirection: 'row', alignItems: 'center' },
//   userAvatar: {
//     width: scale(46),
//     height: scale(46),
//     borderRadius: scale(23),
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   summaryTextContainer: { marginLeft: scale(12) },
//   userNameText: { fontSize: moderateScale(16), fontWeight: '700', color: '#FFFFFF' },
//   userSubText: { fontSize: moderateScale(12), color: 'rgba(255, 255, 255, 0.8)', marginTop: verticalScale(2) },
//   sectionHeaderTitle: { fontSize: moderateScale(14), fontWeight: '700', color: '#374151', marginBottom: verticalScale(12) },
//   documentCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: scale(16),
//     padding: scale(16),
//     marginBottom: verticalScale(14),
//     borderWidth: 1,
//     borderColor: '#ECECF2',
//     ...theme.shadows.sm,
//   },
//   cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: verticalScale(12) },
//   docTypeWrapper: { flexDirection: 'row', alignItems: 'center' },
//   docTypeTitle: { fontSize: moderateScale(14), fontWeight: '700', color: '#111827', marginLeft: scale(8) },
//   statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: scale(8), paddingVertical: verticalScale(4), borderRadius: scale(12) },
//   statusBadgeText: { fontSize: moderateScale(11), fontWeight: '600' },
//   previewContainer: {
//     height: verticalScale(150),
//     width: '100%',
//     borderRadius: scale(12),
//     overflow: 'hidden',
//     backgroundColor: '#F3F4F6',
//     marginBottom: verticalScale(12),
//   },
//   documentPreviewImage: { width: '100%', height: '100%' },
//   pdfCardContainer: {
//     flex: 1,
//     backgroundColor: '#EFF6FF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: scale(12),
//   },
//   pdfIconContainer: {
//     width: scale(50),
//     height: scale(50),
//     borderRadius: scale(25),
//     backgroundColor: '#FEE2E2',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: verticalScale(6),
//   },
//   pdfTitleText: {
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//     color: '#1F2937',
//     marginBottom: verticalScale(4),
//   },
//   openPdfBtn: {
//     backgroundColor: theme.colors.primaryBlue,
//     paddingVertical: verticalScale(6),
//     paddingHorizontal: scale(12),
//     borderRadius: scale(6),
//     marginTop: verticalScale(4),
//   },
//   openPdfBtnText: { fontSize: moderateScale(11), color: '#FFFFFF', fontWeight: '600' },
//   placeholderPreview: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   placeholderText: { fontSize: moderateScale(12), color: '#9CA3AF', marginTop: verticalScale(6) },
//   detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: verticalScale(2) },
//   detailLabel: { fontSize: moderateScale(12), color: '#6B7280' },
//   detailValue: { fontSize: moderateScale(12), fontWeight: '600', color: '#374151' },
//   rejectionBox: {
//     flexDirection: 'row',
//     backgroundColor: '#FEF2F2',
//     borderWidth: 1,
//     borderColor: '#FCA5A5',
//     borderRadius: scale(10),
//     padding: scale(10),
//     marginTop: verticalScale(10),
//   },
//   rejectionTitle: { fontSize: moderateScale(12), fontWeight: '700', color: '#991B1B' },
//   rejectionText: { fontSize: moderateScale(11), color: '#B91C1C', marginTop: verticalScale(2) },
//   reuploadButton: {
//     backgroundColor: '#EF4444',
//     borderRadius: scale(12),
//     paddingVertical: verticalScale(10),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: verticalScale(12),
//   },
//   reuploadButtonText: { color: '#FFFFFF', fontSize: moderateScale(13), fontWeight: '600' },
// });

// import React, { useState, useCallback, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   Alert,
//   RefreshControl,
//   Modal,
//   Dimensions,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useFocusEffect } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Feather';
// import Pdf from 'react-native-pdf';
// import ReactNativeBlobUtil from 'react-native-blob-util';

// import { theme } from '../../MainTheme/theme';
// import { scale, verticalScale, moderateScale } from '../../utils/responsive';
// import api from '../../api/axios';

// const { width: windowWidth } = Dimensions.get('window');

// // Custom component to safely fetch and render PDF files locally
// const SafePdfViewer = ({ uri, style, isModal = false }) => {
//   const [localPath, setLocalPath] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);

//   useEffect(() => {
//     let isMounted = true;

//     const loadPdf = async () => {
//       if (!uri) return;

//       if (uri.startsWith('file://') || uri.startsWith('/')) {
//         if (isMounted) {
//           setLocalPath(uri);
//           setLoading(false);
//         }
//         return;
//       }

//       // try {
//       //   setLoading(true);
//       //   setHasError(false);

//       //   // Standardize protocol to HTTPS if ngrok is used
//       //   let targetUri = uri;
//       //   if (targetUri.startsWith('http://') && targetUri.includes('ngrok')) {
//       //     targetUri = targetUri.replace('http://', 'https://');
//       //   }

//       //   // Fix: Added unique random suffix to prevent concurrent file cache overwrites
//       //   const rawFileName = targetUri.split('/').pop() || 'document.pdf';
//       //   const safeFileName = rawFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
//       //   const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
//       //   const destPath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${uniqueId}_${safeFileName}`;

//       //   const res = await ReactNativeBlobUtil.config({
//       //     path: destPath,
//       //     fileCache: true,
//       //     overwrite: true,
//       //     timeout: 25000,
//       //   }).fetch('GET', targetUri, {
//       //     'ngrok-skip-browser-warning': 'true',
//       //     'User-Agent': 'Mozilla/5.0',
//       //     'Accept': 'application/pdf',
//       //   });

//       //   const status = res.info().status;

//       //   if (status === 200 && isMounted) {
//       //     setLocalPath(`file://${res.path()}`);
//       //   } else {
//       //     if (isMounted) setHasError(true);
//       //   }
//       // } catch (err) {
//       //   console.warn('PDF Cache Error:', err);
//       //   if (isMounted) setHasError(true);
//       // } finally {
//       //   if (isMounted) setLoading(false);
//       // }

//       try {
//   setLoading(true);
//   setHasError(false);

//   let targetUri = uri;
//   if (targetUri.startsWith('http://') && targetUri.includes('ngrok')) {
//     targetUri = targetUri.replace('http://', 'https://');
//   }

//   const rawFileName = targetUri.split('/').pop() || 'document.pdf';
//   const safeFileName = rawFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
//   const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
//   const destPath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${uniqueId}_${safeFileName}`;

//   console.log('DEBUG: Fetching PDF from:', targetUri);

//   const res = await ReactNativeBlobUtil.config({
//     path: destPath,
//     fileCache: true,
//     overwrite: true,
//     timeout: 25000,
//   }).fetch('GET', targetUri, {
//     'ngrok-skip-browser-warning': 'true',
//     'User-Agent': 'Mozilla/5.0',
//     'Accept': 'application/pdf',
//   });

//   const status = res.info().status;
//   const contentType = res.info().headers['content-type'] || res.info().headers['Content-Type'];
  
//   console.log('DEBUG Status:', status);
//   console.log('DEBUG Content-Type:', contentType);

//   // Read the first 100 characters to check if ngrok served HTML instead of binary PDF
//   const fileContent = await ReactNativeBlobUtil.fs.readFile(res.path(), 'utf8');
//   console.log('DEBUG File Preview:', fileContent.substring(0, 100));

//   if (status === 200 && isMounted) {
//     if (fileContent.includes('<!DOCTYPE html>') || fileContent.includes('<html')) {
//       console.error('ERROR: ngrok returned HTML warning page, not PDF binary!');
//       if (isMounted) setHasError(true);
//     } else {
//       setLocalPath(`file://${res.path()}`);
//     }
//   } else {
//     if (isMounted) setHasError(true);
//   }
// } catch (err) {
//   console.error('PDF Cache Catch Error:', err);
//   if (isMounted) setHasError(true);
// } finally {
//   if (isMounted) setLoading(false);
// }
//     };

//     loadPdf();

//     return () => {
//       isMounted = false;
//     };
//   }, [uri]);

//   if (loading) {
//     return (
//       <View style={styles.pdfLoaderContainer}>
//         <ActivityIndicator size={isModal ? 'large' : 'small'} color={isModal ? '#FFFFFF' : '#4F46E5'} />
//       </View>
//     );
//   }

//   if (hasError || !localPath) {
//     return (
//       <View style={styles.pdfErrorContainer}>
//         <Icon name="alert-circle" size={24} color="#EF4444" />
//         <Text style={styles.pdfErrorText}>Unable to load document</Text>
//       </View>
//     );
//   }

//   return (
//     <Pdf
//       source={{ uri: localPath, cache: true }}
//       page={1}
//       singlePage={!isModal}
//       scale={1.0}
//       fitPolicy={0}
//       style={style}
//       onError={(error) => console.log('Pdf Render Error:', error)}
//     />
//   );
// };

// export default function KycDetailsCheck({ navigation }) {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [kycRecords, setKycRecords] = useState([]);

//   // Full-screen preview modal state
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewFile, setPreviewFile] = useState({ uri: '', isPdf: false, name: '' });

//   // Safely extract document URL, type, and file extension
//   const getFileData = (item) => {
//     let urlString = '';

//     if (typeof item?.front_image_url === 'object' && item?.front_image_url?.data) {
//       urlString = item.front_image_url.data;
//     } else if (typeof item?.front_image_url === 'string') {
//       urlString = item.front_image_url;
//     }

//     if ((!urlString || urlString === 'N.A.') && item?.selfie_url && item?.selfie_url !== 'N.A.') {
//       if (typeof item.selfie_url === 'object' && item.selfie_url?.data) {
//         urlString = item.selfie_url.data;
//       } else if (typeof item.selfie_url === 'string') {
//         urlString = item.selfie_url;
//       }
//     }

//     if (urlString && urlString !== 'N.A.' && (urlString.startsWith('http') || urlString.startsWith('file'))) {
//       // Standardize protocol to HTTPS
//       if (urlString.startsWith('http://') && urlString.includes('ngrok')) {
//         urlString = urlString.replace('http://', 'https://');
//       }

//       const cleanUrl = urlString.split('?')[0];
//       const isPdf = cleanUrl.toLowerCase().endsWith('.pdf') || cleanUrl.toLowerCase().includes('.pdf');
//       const fileName = cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1) || 'document';

//       return { url: urlString, isPdf, fileName };
//     }

//     return { url: null, isPdf: false, fileName: '' };
//   };

//   const fetchKYCDetails = async () => {
//     try {
//       const response = await api.get('/api/kyc/details');
//       const status = response?.data?.Status;
//       const records = response?.data?.Data?.Records;

//       if ((status === 200 || status === '200') && Array.isArray(records)) {
//         setKycRecords(records);
//       } else {
//         setKycRecords([]);
//       }
//     } catch (error) {
//       Alert.alert('Error', error?.message || 'Failed to fetch KYC details.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   // Re-fetch KYC details every time the screen is focused / opened
//   useFocusEffect(
//     useCallback(() => {
//       fetchKYCDetails();
//     }, [])
//   );

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchKYCDetails();
//   };

//   const getTabKeyForDocument = (documentType) => {
//     switch (documentType) {
//       case 'AADHAAR':
//         return 'aadhaar';
//       case 'PAN':
//         return 'pan';
//       case 'BANK':
//         return 'passbook';
//       case 'SELFIE':
//         return 'aadhaar';
//       default:
//         return 'aadhaar';
//     }
//   };

//   const handleReplace = (record) => {
//     const targetTab = getTabKeyForDocument(record.document_type);
//     navigation.navigate('KYCreloadOption', { replaceTab: targetTab });
//   };

//   const formatDocTypeLabel = (typeStr) => {
//     switch (typeStr) {
//       case 'AADHAAR':
//         return 'Aadhaar Details';
//       case 'PAN':
//         return 'PAN Details';
//       case 'BANK':
//         return 'Cancel Cheque or Passbook Details';
//       case 'SELFIE':
//         return 'Selfie Details';
//       default:
//         return `${typeStr} Details`;
//     }
//   };

//   const handleOpenPreview = (fileData, docType) => {
//     if (!fileData.url) {
//       Alert.alert('Preview Unavailable', 'Document file URL is missing.');
//       return;
//     }

//     setPreviewFile({
//       uri: fileData.url,
//       isPdf: fileData.isPdf,
//       name: formatDocTypeLabel(docType),
//     });
//     setPreviewVisible(true);
//   };

//   const handleSubmitKyc = () => {
//     Alert.alert('Success', 'Your KYC Application has been submitted.');
//   };

//   const renderDocumentPreview = (item, fileData) => {
//     if (!fileData.url) {
//       return (
//         <View style={styles.placeholderPreview}>
//           <Icon name="file" size={32} color="#9CA3AF" />
//           <Text style={styles.placeholderText}>No Document Uploaded</Text>
//         </View>
//       );
//     }

//     if (fileData.isPdf) {
//       return (
//         <TouchableOpacity
//           style={styles.pdfThumbnailContainer}
//           activeOpacity={0.9}
//           onPress={() => handleOpenPreview(fileData, item.document_type)}>
//           <View style={styles.pdfBadge}>
//             <Text style={styles.pdfBadgeText}>PDF</Text>
//           </View>
//           <View pointerEvents="none" style={styles.pdfWrapper}>
//             <SafePdfViewer uri={fileData.url} style={styles.pdfView} isModal={false} />
//           </View>
//         </TouchableOpacity>
//       );
//     }

//     return (
//       <TouchableOpacity
//         style={styles.thumbnailWrapper}
//         activeOpacity={0.9}
//         onPress={() => handleOpenPreview(fileData, item.document_type)}>
//         <Image
//           source={{
//             uri: fileData.url,
//             headers: {
//               'ngrok-skip-browser-warning': 'true',
//             },
//           }}
//           style={styles.documentPreviewImage}
//           resizeMode="cover"
//         />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.7}>
//           <Icon name="chevron-left" size={moderateScale(22)} color="#1F2937" />
//         </TouchableOpacity>

//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle}>Review Your Information</Text>
//           <Text style={styles.headerSubtitle}>
//             Please review all the information before submitting your KYC application.
//           </Text>
//         </View>

//         <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
//           <Icon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue || '#4F46E5'} />
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color={theme.colors.primaryBlue || '#4F46E5'} />
//           <Text style={styles.loadingText}>Fetching documents...</Text>
//         </View>
//       ) : (
//         <View style={{ flex: 1 }}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scrollContent}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 colors={[theme.colors.primaryBlue || '#4F46E5']}
//               />
//             }>
//             {kycRecords.map((item) => {
//               const fileData = getFileData(item);

//               return (
//                 <View key={item.KYC_doc_id || item.document_type} style={styles.sectionContainer}>
//                   <Text style={styles.sectionTitle}>
//                     • {formatDocTypeLabel(item.document_type)}
//                   </Text>

//                   <View style={styles.cardContainer}>
//                     <View style={styles.previewBox}>
//                       {renderDocumentPreview(item, fileData)}
//                     </View>

//                     {fileData.fileName ? (
//                       <View style={styles.fileActionContainer}>
//                         <Text style={styles.fileNameText} numberOfLines={1}>
//                           {fileData.fileName}
//                         </Text>
//                         <TouchableOpacity
//                           activeOpacity={0.7}
//                           onPress={() => handleReplace(item)}>
//                           <Text style={styles.clickToReplaceText}>Click to replace</Text>
//                         </TouchableOpacity>
//                       </View>
//                     ) : null}
//                   </View>
//                 </View>
//               );
//             })}
//           </ScrollView>

//           <View style={styles.footerContainer}>
//             <TouchableOpacity
//               style={styles.submitButton}
//               activeOpacity={0.8}
//               onPress={handleSubmitKyc}>
//               <Text style={styles.submitButtonText}>Submit KYC</Text>
//               <Icon name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: scale(8) }} />
//             </TouchableOpacity>

//             <View style={styles.secureBadge}>
//               <Icon name="shield" size={14} color="#4F46E5" style={{ marginRight: scale(6) }} />
//               <Text style={styles.secureBadgeText}>100% Secure & Encrypted</Text>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* FULLSCREEN PREVIEW MODAL */}
//       <Modal
//         visible={previewVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setPreviewVisible(false)}>
//         <SafeAreaView style={styles.modalBackground}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle} numberOfLines={1}>
//               {previewFile.name}
//             </Text>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setPreviewVisible(false)}>
//               <Icon name="x" size={24} color="#FFF" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.modalContentContainer}>
//             {previewFile.uri ? (
//               previewFile.isPdf ? (
//                 <SafePdfViewer uri={previewFile.uri} style={styles.fullScreenPdf} isModal={true} />
//               ) : (
//                 <Image
//                   source={{
//                     uri: previewFile.uri,
//                     headers: {
//                       'ngrok-skip-browser-warning': 'true',
//                     },
//                   }}
//                   style={styles.fullScreenImage}
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: verticalScale(12),
//     fontSize: moderateScale(13),
//     color: '#6B7280',
//   },
//   header: {
//     paddingHorizontal: scale(20),
//     paddingTop: verticalScale(12),
//     paddingBottom: verticalScale(16),
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     backgroundColor: '#FFFFFF',
//   },
//   backButton: {
//     width: moderateScale(36),
//     height: moderateScale(36),
//     borderRadius: moderateScale(18),
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   headerTitleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: scale(12),
//   },
//   headerTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     color: '#111827',
//     textAlign: 'center',
//   },
//   headerSubtitle: {
//     fontSize: moderateScale(12),
//     color: '#6B7280',
//     textAlign: 'center',
//     marginTop: verticalScale(6),
//     lineHeight: moderateScale(16),
//   },
//   infoButton: {
//     width: moderateScale(36),
//     height: moderateScale(36),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   scrollContent: {
//     paddingHorizontal: scale(20),
//     paddingBottom: verticalScale(20),
//   },
//   sectionContainer: {
//     marginBottom: verticalScale(20),
//   },
//   sectionTitle: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     color: '#111827',
//     marginBottom: verticalScale(10),
//   },
//   cardContainer: {
//     backgroundColor: '#F8FAFC',
//     borderRadius: scale(16),
//     padding: scale(16),
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#F1F5F9',
//   },
//   previewBox: {
//     width: '100%',
//     height: verticalScale(150),
//     borderRadius: scale(12),
//     backgroundColor: '#FFFFFF',
//     overflow: 'hidden',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//   },
//   thumbnailWrapper: {
//     width: '100%',
//     height: '100%',
//   },
//   documentPreviewImage: {
//     width: '100%',
//     height: '100%',
//   },
//   pdfThumbnailContainer: {
//     width: '100%',
//     height: '100%',
//     position: 'relative',
//     backgroundColor: '#FFFFFF',
//   },
//   pdfBadge: {
//     position: 'absolute',
//     top: scale(10),
//     left: scale(10),
//     backgroundColor: '#EF4444',
//     paddingHorizontal: scale(8),
//     paddingVertical: verticalScale(3),
//     borderRadius: scale(4),
//     zIndex: 10,
//   },
//   pdfBadgeText: {
//     color: '#FFFFFF',
//     fontSize: moderateScale(10),
//     fontWeight: '700',
//   },
//   pdfWrapper: {
//     width: '100%',
//     height: '100%',
//   },
//   pdfView: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#FFFFFF',
//   },
//   pdfLoaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pdfErrorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: scale(8),
//   },
//   pdfErrorText: {
//     fontSize: moderateScale(11),
//     color: '#EF4444',
//     marginTop: verticalScale(4),
//   },
//   placeholderPreview: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   placeholderText: {
//     fontSize: moderateScale(12),
//     color: '#9CA3AF',
//     marginTop: verticalScale(6),
//   },
//   fileActionContainer: {
//     alignItems: 'center',
//     marginTop: verticalScale(12),
//   },
//   fileNameText: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: verticalScale(2),
//   },
//   clickToReplaceText: {
//     fontSize: moderateScale(12),
//     color: '#64748B',
//   },
//   footerContainer: {
//     paddingHorizontal: scale(20),
//     paddingTop: verticalScale(12),
//     paddingBottom: verticalScale(20),
//     backgroundColor: '#FFFFFF',
//   },
//   submitButton: {
//     backgroundColor: '#4F46E5',
//     borderRadius: scale(14),
//     paddingVertical: verticalScale(14),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   submitButtonText: {
//     color: '#FFFFFF',
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//   },
//   secureBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F1F5F9',
//     borderRadius: scale(20),
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: scale(16),
//     alignSelf: 'center',
//     marginTop: verticalScale(12),
//   },
//   secureBadgeText: {
//     fontSize: moderateScale(12),
//     fontWeight: '600',
//     color: '#334155',
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.95)',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(12),
//   },
//   modalTitle: {
//     color: '#FFFFFF',
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//     flex: 1,
//   },
//   closeButton: {
//     padding: scale(4),
//   },
//   modalContentContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fullScreenPdf: {
//     width: windowWidth,
//     height: '100%',
//     backgroundColor: 'transparent',
//   },
//   fullScreenImage: {
//     width: '100%',
//     height: '100%',
//   },
// });

////////////////////////////////////////////////////////////////// new code ///////////////////////////

// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   StatusBar,
//   Alert,
//   RefreshControl,
//   Modal,
//   Dimensions,
//   Linking,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useFocusEffect } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Feather';

// import { theme } from '../../MainTheme/theme';
// import { scale, verticalScale, moderateScale } from '../../utils/responsive';
// import api from '../../api/axios';
// import Pdf from 'react-native-pdf';

// const { width: windowWidth } = Dimensions.get('window');

// const SafePdfViewer = ({ uri, style, disabled = false, onPress }) => {
//   if (!uri) return null;

//   let targetUri = uri;
//   if (targetUri.startsWith('http://') && targetUri.includes('ngrok')) {
//     targetUri = targetUri.replace('http://', 'https://');
//   }

//   const source = { uri: targetUri, cache: true };

//   return (
//     <TouchableOpacity
//       style={[styles.pdfContainer, style]}
//       onPress={onPress}
//       activeOpacity={disabled ? 1 : 0.85}
//       disabled={disabled}
//     >
//       <Pdf
//         trustAllCerts={false}
//         source={source}
//         page={1} // Renders only the first page as a thumbnail
//         singlePage={true}
//         scale={1.0}
//         minScale={1.0}
//         maxScale={1.0}
//         fitWidth={true}
//         style={styles.pdfView}
//         pointerEvents="none" // Allows touch events to pass to parent TouchableOpacity
//         onError={(error) => {
//           console.warn('PDF Preview Error:', error);
//         }}
//       />
//     </TouchableOpacity>
//   );
// };

// export default function KycDetailsCheck({ navigation }) {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [kycRecords, setKycRecords] = useState([]);

//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewFile, setPreviewFile] = useState({ uri: '', isPdf: false, name: '' });

//   const getFileData = (item) => {
//     let urlString = '';

//     if (typeof item?.front_image_url === 'object' && item?.front_image_url?.data) {
//       urlString = item.front_image_url.data;
//     } else if (typeof item?.front_image_url === 'string') {
//       urlString = item.front_image_url;
//     }

//     if ((!urlString || urlString === 'N.A.') && item?.selfie_url && item?.selfie_url !== 'N.A.') {
//       if (typeof item.selfie_url === 'object' && item.selfie_url?.data) {
//         urlString = item.selfie_url.data;
//       } else if (typeof item.selfie_url === 'string') {
//         urlString = item.selfie_url;
//       }
//     }

//     if (urlString && urlString !== 'N.A.' && (urlString.startsWith('http') || urlString.startsWith('file'))) {
//       if (urlString.startsWith('http://') && urlString.includes('ngrok')) {
//         urlString = urlString.replace('http://', 'https://');
//       }

//       const cleanUrl = urlString.split('?')[0];
//       const isPdf = cleanUrl.toLowerCase().endsWith('.pdf') || cleanUrl.toLowerCase().includes('.pdf');
//       const fileName = cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1) || 'document';

//       return { url: urlString, isPdf, fileName };
//     }

//     return { url: null, isPdf: false, fileName: '' };
//   };

//   const fetchKYCDetails = async () => {
//     try {
//       const response = await api.get('/api/kyc/details');
//       const status = response?.data?.Status;
//       const records = response?.data?.Data?.Records;

//       if ((status === 200 || status === '200') && Array.isArray(records)) {
//         setKycRecords(records);
//       } else {
//         setKycRecords([]);
//       }
//     } catch (error) {
//       Alert.alert('Error', error?.message || 'Failed to fetch KYC details.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchKYCDetails();
//     }, [])
//   );

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchKYCDetails();
//   };

//   const getTabKeyForDocument = (documentType) => {
//     switch (documentType) {
//       case 'AADHAAR':
//         return 'aadhaar';
//       case 'PAN':
//         return 'pan';
//       case 'BANK':
//         return 'passbook';
//       case 'SELFIE':
//         return 'aadhaar';
//       default:
//         return 'aadhaar';
//     }
//   };

//   const handleReplace = (record) => {
//     const targetTab = getTabKeyForDocument(record.document_type);
//     navigation.navigate('KYCreloadOption', { replaceTab: targetTab });
//   };

//   const formatDocTypeLabel = (typeStr) => {
//     switch (typeStr) {
//       case 'AADHAAR':
//         return 'Aadhaar Details';
//       case 'PAN':
//         return 'PAN Details';
//       case 'BANK':
//         return 'Cancel Cheque or Passbook Details';
//       case 'SELFIE':
//         return 'Selfie Details';
//       default:
//         return `${typeStr} Details`;
//     }
//   };

//   const renderStatusBadge = (statusStr) => {
//     const lowerStatus = (statusStr || '').toLowerCase();
//     let badgeColor = '#EAB308';
//     let bgColor = '#FEF9C3';
//     let iconName = 'clock';

//     if (lowerStatus.includes('approved') || lowerStatus.includes('verified')) {
//       badgeColor = '#10B981';
//       bgColor = '#D1FAE5';
//       iconName = 'check-circle';
//     } else if (lowerStatus.includes('reject') || lowerStatus.includes('fail') || lowerStatus.includes('decline')) {
//       badgeColor = '#EF4444';
//       bgColor = '#FEE2E2';
//       iconName = 'x-circle';
//     }

//     return (
//       <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
//         <Icon
//           name={iconName}
//           size={moderateScale(12)}
//           color={badgeColor}
//           style={{ marginRight: scale(4) }}
//         />
//         <Text style={[styles.statusBadgeText, { color: badgeColor }]}>
//           {statusStr || 'Under Review'}
//         </Text>
//       </View>
//     );
//   };

//   const handleOpenPreview = (fileData, docType) => {
//     if (!fileData.url) {
//       Alert.alert('Preview Unavailable', 'Document file URL is missing.');
//       return;
//     }

//     if (fileData.isPdf) {
//       Linking.openURL(fileData.url).catch(() => {
//         Alert.alert('Error', 'Unable to open PDF file.');
//       });
//       return;
//     }

//     setPreviewFile({
//       uri: fileData.url,
//       isPdf: false,
//       name: formatDocTypeLabel(docType),
//     });
//     setPreviewVisible(true);
//   };

//   const handleSubmitKyc = () => {
//     Alert.alert('Success', 'Your KYC Application has been submitted.');
//   };

//   const renderDocumentPreview = (item, fileData, isApproved) => {
//     if (!fileData.url) {
//       return (
//         <View style={styles.placeholderPreview}>
//           <Icon name="file" size={32} color="#9CA3AF" />
//           <Text style={styles.placeholderText}>No Document Uploaded</Text>
//         </View>
//       );
//     }

//     if (fileData.isPdf) {
//       return (
//         <SafePdfViewer 
//           uri={fileData.url} 
//           title={fileData.fileName || formatDocTypeLabel(item.document_type)} 
//           disabled={isApproved}
//         />
//       );
//     }

//     return (
//       <TouchableOpacity
//         style={styles.thumbnailWrapper}
//         activeOpacity={isApproved ? 1 : 0.9}
//         disabled={isApproved}
//         onPress={() => handleOpenPreview(fileData, item.document_type)}>
//         <Image
//           source={{
//             uri: fileData.url,
//             headers: {
//               'ngrok-skip-browser-warning': '69420',
//             },
//           }}
//           style={styles.documentPreviewImage}
//           resizeMode="cover"
//         />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
//       <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.7}>
//           <Icon name="chevron-left" size={moderateScale(22)} color="#1F2937" />
//         </TouchableOpacity>

//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle}>Review Your Information</Text>
//           <Text style={styles.headerSubtitle}>
//             Please review all the information before submitting your KYC application.
//           </Text>
//         </View>

//         <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
//           <Icon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue || '#4F46E5'} />
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color={theme.colors.primaryBlue || '#4F46E5'} />
//           <Text style={styles.loadingText}>Fetching documents...</Text>
//         </View>
//       ) : (
//         <View style={{ flex: 1 }}>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scrollContent}
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 colors={[theme.colors.primaryBlue || '#4F46E5']}
//               />
//             }>
//             {kycRecords.map((item) => {
//               const fileData = getFileData(item);
//               const statusLower = (item.status || '').toLowerCase();
//               const isRejected = statusLower.includes('reject') || statusLower.includes('fail') || statusLower.includes('decline');
//               const isApproved = statusLower.includes('approved') || statusLower.includes('verified');

//               return (
//                 <View key={item.KYC_doc_id || item.document_type} style={styles.sectionContainer}>
//                   <View style={styles.sectionHeaderRow}>
//                     <Text style={styles.sectionTitle}>
//                       • {formatDocTypeLabel(item.document_type)}
//                     </Text>
//                     {renderStatusBadge(item.status)}
//                   </View>

//                   <View style={styles.cardContainer}>
//                     <View style={styles.previewBox}>
//                       {renderDocumentPreview(item, fileData, isApproved)}
//                     </View>

//                     {fileData.fileName ? (
//                       <View style={styles.fileActionContainer}>
//                         <Text style={styles.fileNameText} numberOfLines={1}>
//                           {fileData.fileName}
//                         </Text>
                        
//                         {/* Action Link Logic */}
//                         {isRejected ? (
//                           <TouchableOpacity
//                             activeOpacity={0.7}
//                             onPress={() => handleReplace(item)}>
//                             <Text style={styles.clickToActionText}>Click to replace</Text>
//                           </TouchableOpacity>
//                         ) : !isApproved ? (
//                           <TouchableOpacity
//                             activeOpacity={0.7}
//                             onPress={() => handleOpenPreview(fileData, item.document_type)}>
//                             <Text style={styles.clickToActionText}>Click to View</Text>
//                           </TouchableOpacity>
//                         ) : null}
//                       </View>
//                     ) : null}

//                     {/* REJECTION REASON BOX */}
//                     {isRejected && (
//                       <View style={styles.rejectionBox}>
//                         <Icon name="alert-triangle" size={16} color="#EF4444" style={{ marginTop: 2 }} />
//                         <View style={{ marginLeft: 8, flex: 1 }}>
//                           <Text style={styles.rejectionTitle}>Reason for Rejection:</Text>
//                           <Text style={styles.rejectionText}>
//                             {item.Rejection_Reason || item.rejection_reason || 'Document illegible or invalid.'}
//                           </Text>
//                         </View>
//                       </View>
//                     )}

//                     {/* RE-UPLOAD BUTTON FOR REJECTED DOCS */}
//                     {isRejected && (
//                       <TouchableOpacity
//                         style={styles.reuploadButton}
//                         activeOpacity={0.8}
//                         onPress={() => handleReplace(item)}>
//                         <Icon name="upload" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
//                         <Text style={styles.reuploadButtonText}>
//                           Re-upload {formatDocTypeLabel(item.document_type)}
//                         </Text>
//                       </TouchableOpacity>
//                     )}
//                   </View>
//                 </View>
//               );
//             })}
//           </ScrollView>

//           <View style={styles.footerContainer}>
//             <TouchableOpacity
//               style={styles.submitButton}
//               activeOpacity={0.8}
//               onPress={handleSubmitKyc}>
//               <Text style={styles.submitButtonText}>Submit KYC</Text>
//               <Icon name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: scale(8) }} />
//             </TouchableOpacity>

//             <View style={styles.secureBadge}>
//               <Icon name="shield" size={14} color="#4F46E5" style={{ marginRight: scale(6) }} />
//               <Text style={styles.secureBadgeText}>100% Secure & Encrypted</Text>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* FULLSCREEN IMAGE PREVIEW MODAL */}
//       <Modal
//         visible={previewVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setPreviewVisible(false)}>
//         <SafeAreaView style={styles.modalBackground}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle} numberOfLines={1}>
//               {previewFile.name}
//             </Text>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setPreviewVisible(false)}>
//               <Icon name="x" size={24} color="#FFF" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.modalContentContainer}>
//             {previewFile.uri ? (
//               <Image
//                 source={{
//                   uri: previewFile.uri,
//                   headers: {
//                     'ngrok-skip-browser-warning': '69420',
//                   },
//                 }}
//                 style={styles.fullScreenImage}
//                 resizeMode="contain"
//               />
//             ) : (
//               <ActivityIndicator size="large" color="#FFF" />
//             )}
//           </View>
//         </SafeAreaView>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   pdfContainer: {
//     width: '100%',
//     height: 180,
//     borderRadius: 12,
//     overflow: 'hidden',
//     backgroundColor: '#F8FAFC',
//   },
//   pdfView: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#FFFFFF',
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: verticalScale(12),
//     fontSize: moderateScale(13),
//     color: '#6B7280',
//   },
//   header: {
//     paddingHorizontal: scale(20),
//     paddingTop: verticalScale(12),
//     paddingBottom: verticalScale(16),
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     backgroundColor: '#FFFFFF',
//   },
//   backButton: {
//     width: moderateScale(36),
//     height: moderateScale(36),
//     borderRadius: moderateScale(18),
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   headerTitleContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: scale(12),
//   },
//   headerTitle: {
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//     color: '#111827',
//     textAlign: 'center',
//   },
//   headerSubtitle: {
//     fontSize: moderateScale(12),
//     color: '#6B7280',
//     textAlign: 'center',
//     marginTop: verticalScale(6),
//     lineHeight: moderateScale(16),
//   },
//   infoButton: {
//     width: moderateScale(36),
//     height: moderateScale(36),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   scrollContent: {
//     paddingHorizontal: scale(20),
//     paddingBottom: verticalScale(20),
//   },
//   sectionContainer: {
//     marginBottom: verticalScale(20),
//   },
//   sectionHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: verticalScale(10),
//   },
//   sectionTitle: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     color: '#111827',
//   },
//   statusBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: scale(8),
//     paddingVertical: verticalScale(4),
//     borderRadius: scale(12),
//   },
//   statusBadgeText: {
//     fontSize: moderateScale(11),
//     fontWeight: '600',
//   },
//   cardContainer: {
//     backgroundColor: '#F8FAFC',
//     borderRadius: scale(16),
//     padding: scale(16),
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#F1F5F9',
//   },
//   previewBox: {
//     width: '100%',
//     minHeight: verticalScale(100),
//     borderRadius: scale(12),
//     backgroundColor: '#FFFFFF',
//     overflow: 'hidden',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//   },
//   thumbnailWrapper: {
//     width: '100%',
//     height: verticalScale(150),
//   },
//   documentPreviewImage: {
//     width: '100%',
//     height: '100%',
//   },
//   pdfPreviewCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FEF2F2',
//     padding: scale(12),
//     width: '100%',
//     borderRadius: scale(8),
//   },
//   pdfIconCircle: {
//     width: moderateScale(44),
//     height: moderateScale(44),
//     borderRadius: moderateScale(22),
//     backgroundColor: '#FEE2E2',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: scale(12),
//   },
//   pdfInfoContainer: {
//     flex: 1,
//   },
//   pdfTitleText: {
//     fontSize: moderateScale(13),
//     fontWeight: '700',
//     color: '#991B1B',
//   },
//   pdfSubText: {
//     fontSize: moderateScale(11),
//     color: '#B91C1C',
//     marginTop: verticalScale(2),
//   },
//   placeholderPreview: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: verticalScale(20),
//   },
//   placeholderText: {
//     fontSize: moderateScale(12),
//     color: '#9CA3AF',
//     marginTop: verticalScale(6),
//   },
//   fileActionContainer: {
//     alignItems: 'center',
//     marginTop: verticalScale(12),
//   },
//   fileNameText: {
//     fontSize: moderateScale(14),
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: verticalScale(2),
//   },
//   clickToActionText: {
//     fontSize: moderateScale(12),
//     color: '#4F46E5',
//     fontWeight: '600',
//   },
//   rejectionBox: {
//     flexDirection: 'row',
//     width: '100%',
//     backgroundColor: '#FEF2F2',
//     borderWidth: 1,
//     borderColor: '#FCA5A5',
//     borderRadius: scale(10),
//     padding: scale(10),
//     marginTop: verticalScale(12),
//   },
//   rejectionTitle: {
//     fontSize: moderateScale(12),
//     fontWeight: '700',
//     color: '#991B1B',
//   },
//   rejectionText: {
//     fontSize: moderateScale(11),
//     color: '#B91C1C',
//     marginTop: verticalScale(2),
//   },
//   reuploadButton: {
//     width: '100%',
//     backgroundColor: '#EF4444',
//     borderRadius: scale(12),
//     paddingVertical: verticalScale(10),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: verticalScale(12),
//   },
//   reuploadButtonText: {
//     color: '#FFFFFF',
//     fontSize: moderateScale(13),
//     fontWeight: '600',
//   },
//   footerContainer: {
//     paddingHorizontal: scale(20),
//     paddingTop: verticalScale(12),
//     paddingBottom: verticalScale(20),
//     backgroundColor: '#FFFFFF',
//   },
//   submitButton: {
//     backgroundColor: '#4F46E5',
//     borderRadius: scale(14),
//     paddingVertical: verticalScale(14),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   submitButtonText: {
//     color: '#FFFFFF',
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//   },
//   secureBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F1F5F9',
//     borderRadius: scale(20),
//     paddingVertical: verticalScale(8),
//     paddingHorizontal: scale(16),
//     alignSelf: 'center',
//     marginTop: verticalScale(12),
//   },
//   secureBadgeText: {
//     fontSize: moderateScale(12),
//     fontWeight: '600',
//     color: '#334155',
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.95)',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(12),
//   },
//   modalTitle: {
//     color: '#FFFFFF',
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//     flex: 1,
//   },
//   closeButton: {
//     padding: scale(4),
//   },
//   modalContentContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fullScreenImage: {
//     width: windowWidth,
//     height: '100%',
//   },
// });


///////////////////////////////////////////////////////////////////////////////////////////////////


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
//import Pdf from 'react-native-pdf';
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

  const handleSubmitKyc = () => {
    Alert.alert('Success', 'Your KYC Application has been submitted.');
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
                        
                        {/* Action Link Logic */}
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

                    {/* REJECTION REASON BOX */}
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

                    {/* RE-UPLOAD BUTTON FOR REJECTED DOCS */}
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

          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.8}
              onPress={handleSubmitKyc}>
              <Text style={styles.submitButtonText}>Submit KYC</Text>
              <Icon name="arrow-right" size={20} color="#FFFFFF" style={{ marginLeft: scale(8) }} />
            </TouchableOpacity>

            <View style={styles.secureBadge}>
              <Icon name="shield" size={14} color="#4F46E5" style={{ marginRight: scale(6) }} />
              <Text style={styles.secureBadgeText}>100% Secure & Encrypted</Text>
            </View>
          </View>
        </View>
      )}

      {/* FULLSCREEN IMAGE PREVIEW MODAL */}
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