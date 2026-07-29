// // UploadScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
// import { pick, types } from '@react-native-documents/picker'; // ✅ correct import

// // ---------- API Configuration ----------
// const API_BASE_URL = 'http://192.168.1.27:3000';
// const UPLOAD_ENDPOINT = '/api/receipts/upload';

// // ---------- Helper: validate response ----------
// const validateReceiptResponse = (data = {}) => {
//   const receipt = data.data || data;
//   return {
//     success: receipt.success ?? data.success ?? true,
//     transactionId: receipt.transactionId ?? receipt.transactionid,
//     merchantName: receipt.merchantName ?? receipt.merchantname,
//     invoiceNumber: receipt.invoiceNumber ?? receipt.invoicenumber,
//     invoiceDate: receipt.invoiceDate ?? receipt.invoicedate,
//     receiptType: receipt.receiptType ?? receipt.receipttype,
//     currency: receipt.currency,
//     subtotal: receipt.subtotal,
//     tax: receipt.tax ?? receipt.taxamount,
//     discount: receipt.discount ?? receipt.discountamount,
//     total: receipt.total ?? receipt.totalamount,
//     paymentMethod: receipt.paymentMethod ?? receipt.paymentmethod,
//     rawText: receipt.rawText ?? receipt.rawocrtext,
//     ocrConfidence: receipt.ocrConfidence ?? receipt.ocrconfidence,
//     filename: receipt.filename,
//     fileType: receipt.fileType ?? receipt.filetype,
//     fileSize: receipt.fileSize ?? receipt.filesize,
//     status: receipt.status,
//     createdAt: receipt.createdAt ?? receipt.createdat,
//   };
// };

// // ---------- API function: uploadReceipt (using fetch) ----------
// const uploadReceipt = async (file) => {
//   if (!file) throw new Error('File is required');

//   const formData = new FormData();
//   formData.append('receipt', {
//     uri: file.uri,
//     type: file.type,
//     name: file.name,
//   });

//   try {
//     console.log('========== BEFORE API ==========');
//     console.log('Selected File:', file);
//     console.log('Uploading to:', API_BASE_URL + UPLOAD_ENDPOINT);

//     const response = await fetch(API_BASE_URL + UPLOAD_ENDPOINT, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       body: formData,
//     });

//     const json = await response.json();

//     console.log('========== AFTER API ==========');
//     console.log('Response Status:', response.status);
//     console.log('Response Data:', json);

//     if (response.ok) {
//       return validateReceiptResponse(json);
//     } else {
//       throw new Error(json.message || 'Upload failed');
//     }
//   } catch (error) {
//     console.error('Upload Error:', error.message || error);
//     throw new Error(error.message || 'Network request failed');
//   }
// };

// // ---------- UI Component ----------
// const UploadScreen = () => {
//   const [loading, setLoading] = useState(false);
//   const [responseData, setResponseData] = useState(null);

//   const handleUpload = async (file) => {
//     if (!file) return;
//     setLoading(true);
//     setResponseData(null);
//     try {
//       const result = await uploadReceipt(file);
//       setResponseData(result);
//       Alert.alert('Success', 'Receipt uploaded successfully!');
//     } catch (error) {
//       Alert.alert('Error', error.message || 'Upload failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const pickImage = () => {
//     launchImageLibrary(
//       { mediaType: 'photo', quality: 0.8 },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.error) {
//           console.log('ImagePicker Error: ', response.error);
//         } else if (response.assets && response.assets[0]) {
//           const asset = response.assets[0];
//           handleUpload({
//             uri: asset.uri,
//             name: asset.fileName || 'image.jpg',
//             type: asset.type || 'image/jpeg',
//           });
//         }
//       }
//     );
//   };

//   const takePhoto = () => {
//     launchCamera(
//       { mediaType: 'photo', quality: 0.8, saveToPhotos: true },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled camera');
//         } else if (response.error) {
//           console.log('Camera Error: ', response.error);
//         } else if (response.assets && response.assets[0]) {
//           const asset = response.assets[0];
//           handleUpload({
//             uri: asset.uri,
//             name: asset.fileName || 'photo.jpg',
//             type: asset.type || 'image/jpeg',
//           });
//         }
//       }
//     );
//   };

//   const pickPDF = async () => {
//     try {
//       const result = await pick({
//         type: [types.pdf],
//       });
//       if (result) {
//         handleUpload({
//           uri: result.uri,
//           name: result.name,
//           type: result.type || 'application/pdf',
//         });
//       }
//     } catch (err) {
//       if (!err.canceled) {
//         console.error('DocumentPicker Error: ', err);
//         Alert.alert('Error', 'Failed to pick PDF');
//       }
//     }
//   };

//   const renderResponse = () => {
//     if (!responseData) return null;
//     return (
//       <View style={styles.responseContainer}>
//         <Text style={styles.responseTitle}>📄 Receipt Details</Text>
//         {Object.entries(responseData).map(([key, value]) => (
//           <View key={key} style={styles.responseRow}>
//             <Text style={styles.responseKey}>{key}:</Text>
//             <Text style={styles.responseValue}>
//               {value !== null && value !== undefined ? String(value) : 'N/A'}
//             </Text>
//           </View>
//         ))}
//       </View>
//     );
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Upload Receipt</Text>

//       <View style={styles.buttonGroup}>
//         <Button title="📷 Pick from Gallery" onPress={pickImage} disabled={loading} />
//         <View style={styles.spacer} />
//         <Button title="📸 Take Photo" onPress={takePhoto} disabled={loading} />
//         <View style={styles.spacer} />
//         <Button title="📄 Pick PDF" onPress={pickPDF} disabled={loading} />
//       </View>

//       {loading && (
//         <View style={styles.loader}>
//           <ActivityIndicator size="large" color="#2563EB" />
//           <Text style={styles.loadingText}>Uploading...</Text>
//         </View>
//       )}

//       {renderResponse()}
//     </ScrollView>
//   );
// };

// // ---------- Styles ----------
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#F5F7FB',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20,
//     color: '#111827',
//   },
//   buttonGroup: {
//     width: '100%',
//     maxWidth: 300,
//     marginBottom: 30,
//   },
//   spacer: {
//     height: 16,
//   },
//   loader: {
//     marginVertical: 30,
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#2563EB',
//   },
//   responseContainer: {
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     marginTop: 10,
//   },
//   responseTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 12,
//     color: '#1E293B',
//   },
//   responseRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 4,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#E2E8F0',
//   },
//   responseKey: {
//     fontWeight: '500',
//     color: '#475569',
//     flex: 0.4,
//   },
//   responseValue: {
//     color: '#0F172A',
//     flex: 0.6,
//     textAlign: 'right',
//   },
// });

// export default UploadScreen;