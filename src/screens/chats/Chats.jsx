// // // ChatButton.js - A floating chat button component
// // /////////////////////////////////
// // import React, { useState, useRef, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   FlatList,
// //   ActivityIndicator,
// //   Animated,
// //   Dimensions,
// //   Platform,
// //   Alert,
// //   Modal,
// //   TextInput,
// // } from 'react-native';
// // import axios from 'axios';
// // import DocumentPicker, { types } from 'react-native-document-picker';
// // import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// // import RNFS from 'react-native-fs';

// // const { width, height } = Dimensions.get('window');

// // // ==========================================
// // // 1. API CONFIGURATION
// // // ==========================================

// // // BACKEND SERVER IP
// // const BACKEND_IP = '192.168.0.132';
// // const API_BASE_URL = `http://${BACKEND_IP}:3000/api`;

// // // ==========================================
// // // 2. API CLIENT
// // // ==========================================
// // const apiClient = axios.create({
// //   baseURL: API_BASE_URL,
// //   timeout: 120000,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // apiClient.interceptors.request.use(
// //   async (config) => {
// //     if (config.data instanceof FormData) {
// //       delete config.headers['Content-Type'];
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // apiClient.interceptors.response.use(
// //   (response) => {
// //     return response;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // // ==========================================
// // // 3. MAIN COMPONENT
// // // ==========================================
// // const Chats = ({ navigation }) => {
// //   const [isChatOpen, setIsChatOpen] = useState(false);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [statusMessage, setStatusMessage] = useState('');
// //   const [showOptions, setShowOptions] = useState(false);
// //   const [manualTransactionId, setManualTransactionId] = useState('');
// //   const [isConnected, setIsConnected] = useState(true);
// //   const [unreadCount, setUnreadCount] = useState(0);

// //   const fadeAnim = useRef(new Animated.Value(0)).current;
// //   const slideAnim = useRef(new Animated.Value(300)).current;
// //   const flatListRef = useRef(null);

// //   const [messages, setMessages] = useState([
// //     {
// //       id: '1',
// //       sender: 'bot',
// //       text: '👋 Welcome to PAYO AI Receipt Assistant!',
// //       timestamp: getFormattedTime(),
// //       type: 'text',
// //     },
// //     {
// //       id: '2',
// //       sender: 'bot',
// //       text: 'Upload a receipt image or PDF, or enter a Transaction ID to fetch details.',
// //       timestamp: getFormattedTime(),
// //       type: 'text',
// //     },
// //   ]);

// //   function getFormattedTime() {
// //     const date = new Date();
// //     let hours = date.getHours();
// //     let minutes = date.getMinutes();
// //     const ampm = hours >= 12 ? 'PM' : 'AM';
// //     hours = hours % 12 || 12;
// //     minutes = minutes < 10 ? '0' + minutes : minutes;
// //     return `${hours}:${minutes} ${ampm}`;
// //   }

// //   useEffect(() => {
// //     if (isChatOpen && flatListRef.current && messages.length > 0) {
// //       setTimeout(() => {
// //         flatListRef.current?.scrollToEnd({ animated: true });
// //       }, 100);
// //       setUnreadCount(0);
// //     }
// //   }, [messages, isProcessing, isChatOpen]);

// //   useEffect(() => {
// //     checkServerConnection();
// //   }, []);

// //   // ==========================================
// //   // 4. CHECK SERVER CONNECTION (FIXED)
// //   // ==========================================
// //   const checkServerConnection = async () => {
// //     try {
// //       // Try to fetch a receipt to check connection
// //       const response = await apiClient.get('/receipts', { timeout: 5000 });
// //       if (response.status === 200 || response.status === 304) {
// //         setIsConnected(true);
// //       } else {
// //         setIsConnected(false);
// //       }
// //     } catch (error) {
// //       // If /receipts/1 fails, try the base URL
// //       try {
// //         const response = await fetch(`${API_BASE_URL}/receipts/upload`, {
// //           method: 'HEAD',
// //         });
// //         setIsConnected(response.ok);
// //       } catch (fallbackError) {
// //         setIsConnected(false);
// //       }
// //     }
// //   };

// //   // ==========================================
// //   // 5. FILE PICKER FUNCTIONS
// //   // ==========================================
// //   const normalizeUri = (uri) => {
// //     if (!uri) return '';
// //     if (Platform.OS === 'android' && uri.startsWith('file://')) {
// //       return uri.replace('file://', '');
// //     }
// //     return uri.replace('file://', '');
// //   };

// //   const pickImageFromGallery = async () => {
// //     try {
// //       const result = await launchImageLibrary({
// //         mediaType: 'photo',
// //         quality: 0.8,
// //         includeBase64: false,
// //       });

// //       if (result.assets && result.assets.length > 0) {
// //         const asset = result.assets[0];
// //         const file = {
// //           uri: normalizeUri(asset.uri),
// //           name: asset.fileName || 'image.jpg',
// //           type: asset.type || 'image/jpeg',
// //         };
// //         return file;
// //       }
// //       return null;
// //     } catch (error) {
// //       throw new Error('Failed to select image from gallery: ' + error.message);
// //     }
// //   };

// //   const pickImageFromCamera = async () => {
// //     try {
// //       const result = await launchCamera({
// //         mediaType: 'photo',
// //         quality: 0.8,
// //         includeBase64: false,
// //       });

// //       if (result.assets && result.assets.length > 0) {
// //         const asset = result.assets[0];
// //         const file = {
// //           uri: normalizeUri(asset.uri),
// //           name: asset.fileName || 'camera_photo.jpg',
// //           type: asset.type || 'image/jpeg',
// //         };
// //         return file;
// //       }
// //       return null;
// //     } catch (error) {
// //       throw new Error('Failed to capture image with camera: ' + error.message);
// //     }
// //   };

// //   const pickPdfFile = async () => {
// //     try {
// //       const res = await DocumentPicker.pickSingle({
// //         type: [types.pdf],
// //       });

// //       if (res) {
// //         const file = {
// //           uri: normalizeUri(res.uri),
// //           name: res.name || 'document.pdf',
// //           type: res.type || 'application/pdf',
// //         };
// //         return file;
// //       }
// //       return null;
// //     } catch (error) {
// //       if (DocumentPicker.isCancel(error)) {
// //         return null;
// //       }
// //       throw new Error('Failed to pick PDF file: ' + error.message);
// //     }
// //   };

// //   // ==========================================
// //   // 6. CHAT FUNCTIONS
// //   // ==========================================
// //   const toggleChat = (open) => {
// //     if (open) {
// //       setIsChatOpen(true);
// //       Animated.parallel([
// //         Animated.timing(fadeAnim, {
// //           toValue: 1,
// //           duration: 200,
// //           useNativeDriver: true,
// //         }),
// //         Animated.timing(slideAnim, {
// //           toValue: 0,
// //           duration: 250,
// //           useNativeDriver: true,
// //         }),
// //       ]).start();
// //     } else {
// //       Animated.parallel([
// //         Animated.timing(fadeAnim, {
// //           toValue: 0,
// //           duration: 180,
// //           useNativeDriver: true,
// //         }),
// //         Animated.timing(slideAnim, {
// //           toValue: 300,
// //           duration: 200,
// //           useNativeDriver: true,
// //         }),
// //       ]).start(() => {
// //         setIsChatOpen(false);
// //         setShowOptions(false);
// //       });
// //     }
// //   };

// //   const addMessage = (msgObj) => {
// //     const newMsg = {
// //       id: Date.now().toString() + Math.random().toString(),
// //       timestamp: getFormattedTime(),
// //       ...msgObj,
// //     };
// //     setMessages((prev) => [...prev, newMsg]);
    
// //     if (!isChatOpen && msgObj.sender === 'bot') {
// //       setUnreadCount(prev => prev + 1);
// //     }
    
// //     setTimeout(() => {
// //       flatListRef.current?.scrollToEnd({ animated: true });
// //     }, 100);
// //   };

// //   const setLoadingMessage = (text) => {
// //     setStatusMessage(text);
// //     addMessage({
// //       sender: 'bot',
// //       text: `⏳ ${text}...`,
// //       type: 'text',
// //     });
// //   };

// //   // ==========================================
// //   // 7. MANUAL FETCH BY TRANSACTION ID
// //   // ==========================================
// //   const fetchReceiptById = async () => {
// //     if (!manualTransactionId.trim()) {
// //       Alert.alert('Error', 'Please enter a Transaction ID');
// //       return;
// //     }

// //     setIsProcessing(true);
// //     setStatusMessage('Fetching receipt...');

// //     try {
// //       addMessage({
// //         sender: 'user',
// //         text: `🔍 Fetching transaction #${manualTransactionId}`,
// //         type: 'text',
// //       });

// //       const response = await apiClient.get(`/receipts/${manualTransactionId.trim()}`);

// //       if (response.data && response.data.success) {
// //         const receipt = response.data.data || response.data;
// //         addMessage({
// //           sender: 'bot',
// //           type: 'receipt_card',
// //           data: {
// //             cardTitle: '📄 Fetched Receipt',
// //             transactionId: receipt.transactionid || receipt.transactionId || manualTransactionId,
// //             merchantName: receipt.merchantname || receipt.merchantName,
// //             invoiceNumber: receipt.invoicenumber || receipt.invoiceNumber,
// //             invoiceDate: receipt.invoicedate || receipt.invoiceDate,
// //             currency: receipt.currency,
// //             subtotal: receipt.subtotal,
// //             tax: receipt.taxamount || receipt.tax,
// //             discount: receipt.discountamount || receipt.discount,
// //             total: receipt.totalamount || receipt.total,
// //             status: receipt.status,
// //             ocrConfidence: receipt.ocrconfidence || receipt.ocrConfidence,
// //             filename: receipt.filename,
// //           },
// //         });
// //         addMessage({
// //           sender: 'bot',
// //           text: '✅ Receipt fetched successfully!',
// //           type: 'text',
// //         });
// //       } else {
// //         throw new Error('Receipt not found');
// //       }
// //     } catch (error) {
// //       let errorMsg = error.response?.data?.message || error.message || 'Failed to fetch receipt';
      
// //       if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
// //         errorMsg = 'Cannot connect to server. Please check your connection.';
// //         Alert.alert('Connection Error', errorMsg);
// //       }
      
// //       addMessage({
// //         sender: 'bot',
// //         text: `❌ ${errorMsg}`,
// //         type: 'text',
// //       });
// //     } finally {
// //       setIsProcessing(false);
// //       setStatusMessage('');
// //       setManualTransactionId('');
// //     }
// //   };

// //   // ==========================================
// //   // 8. RECEIPT PROCESSING
// //   // ==========================================
  
// //   const uploadFileWithRNFS = (file) => {
// //     return new Promise((resolve, reject) => {
// //       const filePath = file.uri.startsWith('file://') ? file.uri.replace('file://', '') : file.uri;
      
// //       RNFS.exists(filePath)
// //         .then((exists) => {
// //           if (!exists) {
// //             reject(new Error('File not found at path: ' + filePath));
// //             return;
// //           }
// //           return RNFS.stat(filePath);
// //         })
// //         .then((stat) => {
// //           const uploadUrl = `${API_BASE_URL}/receipts/upload`;
          
// //           const uploadOptions = {
// //             toUrl: uploadUrl,
// //             files: [
// //               {
// //                 name: 'receipt',
// //                 filename: file.name,
// //                 filepath: filePath,
// //                 filetype: file.type || 'image/jpeg',
// //               },
// //             ],
// //             method: 'POST',
// //             headers: {
// //               'Accept': 'application/json',
// //             },
// //             begin: (response) => {
// //               // Upload started
// //             },
// //             progress: (response) => {
// //               // Upload progress
// //             },
// //           };
          
// //           const uploadTask = RNFS.uploadFiles(uploadOptions);
          
// //           const timeoutId = setTimeout(() => {
// //             if (uploadTask.abort) {
// //               uploadTask.abort();
// //             }
// //             reject(new Error('Upload timeout - server took too long to respond'));
// //           }, 120000);
          
// //           uploadTask.promise
// //             .then((uploadResult) => {
// //               clearTimeout(timeoutId);
              
// //               if (uploadResult.statusCode >= 200 && uploadResult.statusCode < 300) {
// //                 try {
// //                   const data = JSON.parse(uploadResult.body);
// //                   resolve({ data, status: uploadResult.statusCode });
// //                 } catch (parseError) {
// //                   reject(new Error('Failed to parse server response'));
// //                 }
// //               } else {
// //                 reject(new Error(`Upload failed with status ${uploadResult.statusCode}`));
// //               }
// //             })
// //             .catch((error) => {
// //               clearTimeout(timeoutId);
// //               reject(new Error('Upload failed: ' + (error.message || 'Unknown error')));
// //             });
// //         })
// //         .catch((error) => {
// //           reject(new Error('File access error: ' + (error.message || 'Unknown error')));
// //         });
// //     });
// //   };

// //   const processReceipt = async (file) => {
// //     if (!file) return;

// //     setIsProcessing(true);
// //     setShowOptions(false);

// //     try {
// //       setLoadingMessage('Uploading receipt');

// //       const uploadResponse = await uploadFileWithRNFS(file);
// //       const receiptData = uploadResponse.data.data || uploadResponse.data;

// //       addMessage({
// //         sender: 'bot',
// //         type: 'receipt_card',
// //         data: {
// //           cardTitle: '🧾 OCR Extracted Data',
// //           merchantName: receiptData.merchantName,
// //           invoiceNumber: receiptData.invoiceNumber || 'N/A',
// //           invoiceDate: receiptData.invoiceDate || 'N/A',
// //           currency: receiptData.currency,
// //           subtotal: receiptData.subtotal,
// //           tax: receiptData.tax,
// //           discount: receiptData.discount,
// //           total: receiptData.total,
// //           ocrConfidence: receiptData.ocrConfidence,
// //           filename: receiptData.filename,
// //         },
// //       });

// //       addMessage({
// //         sender: 'bot',
// //         text: '📊 Receipt processed successfully! Saving...',
// //         type: 'text',
// //       });

// //       setLoadingMessage('Saving receipt');

// //       const saveData = {
// //         merchantName: receiptData.merchantName,
// //         invoiceNumber: receiptData.invoiceNumber || 'N/A',
// //         invoiceDate: receiptData.invoiceDate || 'N/A',
// //         receiptType: receiptData.receiptType || 'purchase',
// //         currency: receiptData.currency || 'INR',
// //         subtotal: parseFloat(receiptData.subtotal) || 0,
// //         tax: parseFloat(receiptData.tax) || 0,
// //         discount: parseFloat(receiptData.discount) || 0,
// //         total: parseFloat(receiptData.total) || 0,
// //         paymentMethod: receiptData.paymentMethod || 'unknown',
// //         rawText: receiptData.rawText || '',
// //         ocrConfidence: parseFloat(receiptData.ocrConfidence) || 0,
// //         filename: receiptData.filename,
// //         userId: '1',
// //       };

// //       const saveResponse = await apiClient.post('/receipts', saveData);

// //       if (!saveResponse.data || !saveResponse.data.success) {
// //         throw new Error(saveResponse.data?.message || 'Save failed');
// //       }

// //       const savedData = saveResponse.data;

// //       addMessage({
// //         sender: 'bot',
// //         type: 'receipt_card',
// //         data: {
// //           cardTitle: '💾 Saved Receipt',
// //           transactionId: savedData.transactionId || savedData.id,
// //           merchantName: savedData.merchantName || receiptData.merchantName,
// //           invoiceNumber: savedData.invoiceNumber || receiptData.invoiceNumber,
// //           invoiceDate: savedData.invoiceDate || receiptData.invoiceDate,
// //           currency: savedData.currency || receiptData.currency,
// //           subtotal: savedData.subtotal || receiptData.subtotal,
// //           tax: savedData.tax || receiptData.tax,
// //           discount: savedData.discount || receiptData.discount,
// //           total: savedData.total || receiptData.total,
// //           status: savedData.status || 'Saved',
// //           ocrConfidence: savedData.ocrConfidence || receiptData.ocrConfidence,
// //           filename: savedData.filename || receiptData.filename,
// //         },
// //       });

// //       const transactionId = savedData.transactionId || savedData.id;

// //       if (transactionId && transactionId !== 'N/A' && transactionId !== 'null' && transactionId !== null) {
// //         setLoadingMessage('Fetching full details');

// //         const detailsResponse = await apiClient.get(`/receipts/${transactionId}`);

// //         if (detailsResponse.data && detailsResponse.data.success) {
// //           const details = detailsResponse.data.data || detailsResponse.data;
          
// //           addMessage({
// //             sender: 'bot',
// //             type: 'receipt_card',
// //             data: {
// //               cardTitle: '🔄 Refreshed Details',
// //               transactionId: details.transactionid || details.transactionId || transactionId,
// //               merchantName: details.merchantname || details.merchantName,
// //               invoiceNumber: details.invoicenumber || details.invoiceNumber,
// //               invoiceDate: details.invoicedate || details.invoiceDate,
// //               currency: details.currency,
// //               subtotal: details.subtotal,
// //               tax: details.taxamount || details.tax,
// //               discount: details.discountamount || details.discount,
// //               total: details.totalamount || details.total,
// //               status: details.status,
// //               ocrConfidence: details.ocrconfidence || details.ocrConfidence,
// //               filename: details.filename,
// //             },
// //           });

// //           addMessage({
// //             sender: 'bot',
// //             text: '✨ Receipt saved and fetched successfully! 🎉',
// //             type: 'text',
// //           });
// //         } else {
// //           addMessage({
// //             sender: 'bot',
// //             text: '✨ Receipt saved successfully! 🎉',
// //             type: 'text',
// //           });
// //         }
// //       } else {
// //         addMessage({
// //           sender: 'bot',
// //           text: '✨ Receipt saved successfully! 🎉',
// //           type: 'text',
// //         });
// //       }

// //     } catch (error) {
// //       let errorMessage = 'Something went wrong';
      
// //       if (error.response) {
// //         errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
// //       } else if (error.request) {
// //         errorMessage = 'No response from server. Please check your connection.';
// //       } else {
// //         errorMessage = error.message || 'An unexpected error occurred';
// //       }
      
// //       addMessage({
// //         sender: 'bot',
// //         text: `❌ ${errorMessage}`,
// //         type: 'text',
// //       });
// //     } finally {
// //       setIsProcessing(false);
// //       setStatusMessage('');
// //     }
// //   };

// //   // ==========================================
// //   // 9. UI HANDLERS
// //   // ==========================================
// //   const handlePickImage = async () => {
// //     try {
// //       const file = await pickImageFromGallery();
// //       if (file) {
// //         addMessage({
// //           sender: 'user',
// //           text: `📂 Selected: ${file.name}`,
// //           type: 'text',
// //         });
// //         await processReceipt(file);
// //       }
// //     } catch (err) {
// //       Alert.alert('Error', err.message || 'Failed to select image');
// //     }
// //   };

// //   const handleOpenCamera = async () => {
// //     try {
// //       const file = await pickImageFromCamera();
// //       if (file) {
// //         addMessage({
// //           sender: 'user',
// //           text: '📸 Captured photo',
// //           type: 'text',
// //         });
// //         await processReceipt(file);
// //       }
// //     } catch (err) {
// //       Alert.alert('Error', err.message || 'Failed to capture image');
// //     }
// //   };

// //   const handlePickPDF = async () => {
// //     try {
// //       const file = await pickPdfFile();
// //       if (file) {
// //         addMessage({
// //           sender: 'user',
// //           text: `📄 Selected: ${file.name}`,
// //           type: 'text',
// //         });
// //         await processReceipt(file);
// //       }
// //     } catch (err) {
// //       Alert.alert('Error', err.message || 'Failed to select PDF');
// //     }
// //   };

// //   // ==========================================
// //   // 10. RENDER FUNCTIONS
// //   // ==========================================
// //   const renderReceiptCard = (data) => {
// //     const r = data.data || data;
// //     const title = data.cardTitle || '🧾 Receipt Details';
    
// //     return (
// //       <View style={styles.card}>
// //         <View style={styles.cardHeader}>
// //           <Text style={styles.cardTitle}>{title}</Text>
// //           {r.transactionId && r.transactionId !== 'N/A' && (
// //             <Text style={styles.cardBadge}>#{r.transactionId}</Text>
// //           )}
// //         </View>
// //         <View style={styles.divider} />
// //         {r.merchantName && (
// //           <View style={styles.cardRow}>
// //             <Text style={styles.label}>🏪 Merchant</Text>
// //             <Text style={styles.value}>{r.merchantName}</Text>
// //           </View>
// //         )}
// //         {r.invoiceNumber && r.invoiceNumber !== 'N/A' && (
// //           <View style={styles.cardRow}>
// //             <Text style={styles.label}>📋 Invoice #</Text>
// //             <Text style={styles.value}>{r.invoiceNumber}</Text>
// //           </View>
// //         )}
// //         {r.invoiceDate && r.invoiceDate !== 'N/A' && (
// //           <View style={styles.cardRow}>
// //             <Text style={styles.label}>📅 Date</Text>
// //             <Text style={styles.value}>{r.invoiceDate}</Text>
// //           </View>
// //         )}
// //         {r.currency && (
// //           <>
// //             <View style={styles.cardRow}>
// //               <Text style={styles.label}>💰 Subtotal</Text>
// //               <Text style={styles.value}>{r.currency} {(r.subtotal || 0).toFixed(2)}</Text>
// //             </View>
// //             {r.tax !== undefined && r.tax > 0 && (
// //               <View style={styles.cardRow}>
// //                 <Text style={styles.label}>🧾 Tax</Text>
// //                 <Text style={styles.value}>{r.currency} {(r.tax || 0).toFixed(2)}</Text>
// //               </View>
// //             )}
// //             {r.discount !== undefined && r.discount > 0 && (
// //               <View style={styles.cardRow}>
// //                 <Text style={styles.label}>🏷️ Discount</Text>
// //                 <Text style={styles.value}>{r.currency} {(r.discount || 0).toFixed(2)}</Text>
// //               </View>
// //             )}
// //             <View style={styles.cardRow}>
// //               <Text style={styles.label}>💵 Total</Text>
// //               <Text style={styles.totalValue}>{r.currency} {(r.total || 0).toFixed(2)}</Text>
// //             </View>
// //           </>
// //         )}
// //         {r.ocrConfidence !== undefined && (
// //           <View style={styles.cardRow}>
// //             <Text style={styles.label}>📊 OCR Confidence</Text>
// //             <Text style={styles.value}>{r.ocrConfidence}%</Text>
// //           </View>
// //         )}
// //         {r.status && (
// //           <View style={styles.cardRow}>
// //             <Text style={styles.label}>📁 Status</Text>
// //             <Text style={[styles.value, styles.statusSuccess]}>{r.status}</Text>
// //           </View>
// //         )}
// //         {r.filename && (
// //           <View style={styles.cardRow}>
// //             <Text style={styles.label}>📎 File</Text>
// //             <Text style={styles.value}>{r.filename}</Text>
// //           </View>
// //         )}
// //       </View>
// //     );
// //   };

// //   const renderChatItem = ({ item }) => {
// //     const isBot = item.sender === 'bot';

// //     return (
// //       <View style={[styles.msgRow, isBot ? styles.msgLeft : styles.msgRight]}>
// //         {isBot && (
// //           <View style={styles.avatar}>
// //             <Text style={styles.avatarText}>🤖</Text>
// //           </View>
// //         )}
// //         <View style={[styles.bubble, isBot ? styles.botBubble : styles.userBubble]}>
// //           {item.type === 'text' && (
// //             <Text style={isBot ? styles.botText : styles.userText}>{item.text}</Text>
// //           )}
// //           {item.type === 'receipt_card' && renderReceiptCard(item.data)}
// //           <Text style={styles.timestamp}>{item.timestamp}</Text>
// //         </View>
// //       </View>
// //     );
// //   };

// //   // ==========================================
// //   // 11. MAIN RENDER
// //   // ==========================================
// //   return (
// //     <>
// //       {/* Floating Button */}
// //       <TouchableOpacity
// //         style={styles.floatingButton}
// //         activeOpacity={0.85}
// //         onPress={() => toggleChat(true)}
// //       >
// //         <Text style={styles.floatingIcon}>💬</Text>
// //         {unreadCount > 0 && (
// //           <View style={styles.badge}>
// //             <Text style={styles.badgeText}>{unreadCount}</Text>
// //           </View>
// //         )}
// //       </TouchableOpacity>

// //       {/* Chat Modal */}
// //       {isChatOpen && (
// //         <View style={styles.overlayContainer}>
// //           <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
// //             <TouchableOpacity
// //               style={StyleSheet.absoluteFillObject}
// //               activeOpacity={1}
// //               onPress={() => toggleChat(false)}
// //             />
// //           </Animated.View>

// //           <Animated.View
// //             style={[
// //               styles.chatSheet,
// //               { transform: [{ translateY: slideAnim }] },
// //             ]}
// //           >
// //             {/* Header */}
// //             <View style={styles.sheetHeader}>
// //               <View style={styles.handleBar} />
// //               <View style={styles.headerRow}>
// //                 <View style={styles.headerLeft}>
// //                   <View style={styles.headerAvatar}>
// //                     <Text style={styles.headerAvatarText}>🤖</Text>
// //                   </View>
// //                   <View>
// //                     <Text style={styles.headerTitle}>PAYO AI Assistant</Text>
// //                     <View style={styles.statusRow}>
// //                       <View style={[styles.statusDot, { backgroundColor: isConnected ? '#4ADE80' : '#EF4444' }]} />
// //                       <Text style={[styles.statusText, { color: isConnected ? '#4ADE80' : '#EF4444' }]}>
// //                         {isConnected ? 'Online' : 'Offline'}
// //                       </Text>
// //                     </View>
// //                   </View>
// //                 </View>
// //                 <TouchableOpacity style={styles.closeBtn} onPress={() => toggleChat(false)}>
// //                   <Text style={styles.closeBtnText}>✕</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             </View>

// //             {/* Messages */}
// //             <FlatList
// //               ref={flatListRef}
// //               data={messages}
// //               keyExtractor={(item) => item.id}
// //               renderItem={renderChatItem}
// //               contentContainerStyle={styles.chatList}
// //               showsVerticalScrollIndicator={false}
// //             />

// //             {/* Manual Fetch Input */}
// //             <View style={styles.fetchContainer}>
// //               <TextInput
// //                 style={styles.fetchInput}
// //                 placeholder="Enter Transaction ID"
// //                 placeholderTextColor="#9CA3AF"
// //                 value={manualTransactionId}
// //                 onChangeText={setManualTransactionId}
// //                 keyboardType="numeric"
// //                 editable={!isProcessing}
// //               />
// //               <TouchableOpacity
// //                 style={[styles.fetchButton, (isProcessing || !manualTransactionId.trim()) && styles.fetchButtonDisabled]}
// //                 onPress={fetchReceiptById}
// //                 disabled={isProcessing || !manualTransactionId.trim()}
// //               >
// //                 <Text style={styles.fetchButtonText}>Fetch</Text>
// //               </TouchableOpacity>
// //             </View>

// //             {/* Loading Indicator */}
// //             {isProcessing && (
// //               <View style={styles.loadingContainer}>
// //                 <ActivityIndicator size="small" color="#6366F1" />
// //                 <Text style={styles.loadingText}>{statusMessage}...</Text>
// //               </View>
// //             )}

// //             {/* Quick Actions */}
// //             <View style={styles.actionsFooter}>
// //               <TouchableOpacity
// //                 style={[styles.actionBtn, isProcessing && styles.actionBtnDisabled]}
// //                 disabled={isProcessing}
// //                 onPress={() => setShowOptions(true)}
// //               >
// //                 <Text style={styles.actionIcon}>📎</Text>
// //                 <Text style={styles.actionText}>Upload</Text>
// //               </TouchableOpacity>

// //               <TouchableOpacity
// //                 style={[styles.actionBtn, isProcessing && styles.actionBtnDisabled]}
// //                 disabled={isProcessing}
// //                 onPress={handleOpenCamera}
// //               >
// //                 <Text style={styles.actionIcon}>📸</Text>
// //                 <Text style={styles.actionText}>Camera</Text>
// //               </TouchableOpacity>

// //               <TouchableOpacity
// //                 style={[styles.actionBtn, isProcessing && styles.actionBtnDisabled]}
// //                 disabled={isProcessing}
// //                 onPress={handlePickPDF}
// //               >
// //                 <Text style={styles.actionIcon}>📄</Text>
// //                 <Text style={styles.actionText}>PDF</Text>
// //               </TouchableOpacity>
// //             </View>

// //             {/* Upload Options Modal */}
// //             <Modal
// //               visible={showOptions}
// //               transparent
// //               animationType="slide"
// //               onRequestClose={() => setShowOptions(false)}
// //             >
// //               <TouchableOpacity
// //                 style={styles.modalOverlay}
// //                 activeOpacity={1}
// //                 onPress={() => setShowOptions(false)}
// //               >
// //                 <View style={styles.optionsSheet}>
// //                   <View style={styles.optionsHandle} />
// //                   <Text style={styles.optionsTitle}>Upload Receipt</Text>
// //                   <Text style={styles.optionsSubtitle}>Choose a source</Text>

// //                   <TouchableOpacity
// //                     style={styles.optionItem}
// //                     onPress={handlePickImage}
// //                     disabled={isProcessing}
// //                   >
// //                     <View style={styles.optionIconContainer}>
// //                       <Text style={styles.optionIcon}>🖼️</Text>
// //                     </View>
// //                     <View style={styles.optionTextContainer}>
// //                       <Text style={styles.optionTitle}>Gallery</Text>
// //                       <Text style={styles.optionDescription}>Choose from photos</Text>
// //                     </View>
// //                     <Text style={styles.optionArrow}>→</Text>
// //                   </TouchableOpacity>

// //                   <TouchableOpacity
// //                     style={styles.optionItem}
// //                     onPress={handleOpenCamera}
// //                     disabled={isProcessing}
// //                   >
// //                     <View style={styles.optionIconContainer}>
// //                       <Text style={styles.optionIcon}>📸</Text>
// //                     </View>
// //                     <View style={styles.optionTextContainer}>
// //                       <Text style={styles.optionTitle}>Camera</Text>
// //                       <Text style={styles.optionDescription}>Take a photo</Text>
// //                     </View>
// //                     <Text style={styles.optionArrow}>→</Text>
// //                   </TouchableOpacity>

// //                   <TouchableOpacity
// //                     style={styles.optionItem}
// //                     onPress={handlePickPDF}
// //                     disabled={isProcessing}
// //                   >
// //                     <View style={styles.optionIconContainer}>
// //                       <Text style={styles.optionIcon}>📄</Text>
// //                     </View>
// //                     <View style={styles.optionTextContainer}>
// //                       <Text style={styles.optionTitle}>PDF</Text>
// //                       <Text style={styles.optionDescription}>Upload PDF file</Text>
// //                     </View>
// //                     <Text style={styles.optionArrow}>→</Text>
// //                   </TouchableOpacity>

// //                   <TouchableOpacity
// //                     style={styles.cancelOption}
// //                     onPress={() => setShowOptions(false)}
// //                   >
// //                     <Text style={styles.cancelOptionText}>Cancel</Text>
// //                   </TouchableOpacity>
// //                 </View>
// //               </TouchableOpacity>
// //             </Modal>
// //           </Animated.View>
// //         </View>
// //       )}
// //     </>
// //   );
// // };


// /////////////////////////////////////////////////

// // ChatButton.js - Full solution with fixes
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   Animated,
//   Dimensions,
//   Platform,
//   Alert,
//   Modal,
//   TextInput,
// } from 'react-native';
// import axios from 'axios';
// //import DocumentPicker, { types } from 'react-native-document-picker';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import RNFS from 'react-native-fs';

// const { width, height } = Dimensions.get('window');

// // ==========================================
// // 1. API CONFIGURATION
// // ==========================================
// const BACKEND_IP = '192.168.0.132';
// const API_BASE_URL = `http://${BACKEND_IP}:3000/api`;

// // ==========================================
// // 2. API CLIENT
// // ==========================================
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 120000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// apiClient.interceptors.request.use(
//   async (config) => {
//     if (config.data instanceof FormData) {
//       delete config.headers['Content-Type'];
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

// // ==========================================
// // 3. MAIN COMPONENT
// // ==========================================
// const Chats = ({ navigation }) => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [statusMessage, setStatusMessage] = useState('');
//   const [showOptions, setShowOptions] = useState(false);
//   const [manualTransactionId, setManualTransactionId] = useState('');
//   const [isConnected, setIsConnected] = useState(true);
//   const [unreadCount, setUnreadCount] = useState(0);

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(300)).current;
//   const flatListRef = useRef(null);

//   const [messages, setMessages] = useState([
//     {
//       id: '1',
//       sender: 'bot',
//       text: '👋 Welcome to PAYO AI Receipt Assistant!',
//       timestamp: getFormattedTime(),
//       type: 'text',
//     },
//     {
//       id: '2',
//       sender: 'bot',
//       text: 'Upload a receipt image or PDF, or enter a Transaction ID to fetch details.',
//       timestamp: getFormattedTime(),
//       type: 'text',
//     },
//   ]);

//   function getFormattedTime() {
//     const date = new Date();
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12 || 12;
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     return `${hours}:${minutes} ${ampm}`;
//   }

//   useEffect(() => {
//     if (isChatOpen && flatListRef.current && messages.length > 0) {
//       setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
//       setUnreadCount(0);
//     }
//   }, [messages, isProcessing, isChatOpen]);

//   useEffect(() => {
//     checkServerConnection();
//   }, []);

//   // ==========================================
//   // 4. CHECK SERVER CONNECTION
//   // ==========================================
//   const checkServerConnection = async () => {
//     try {
//       const response = await apiClient.get('/receipts', { timeout: 5000 });
//       setIsConnected(response.status === 200 || response.status === 304);
//     } catch (error) {
//       try {
//         const response = await fetch(`${API_BASE_URL}/receipts/upload`, { method: 'HEAD' });
//         setIsConnected(response.ok);
//       } catch (_) {
//         setIsConnected(false);
//       }
//     }
//   };

//   // ==========================================
//   // 5. FILE PICKER FUNCTIONS (FIXED PDF)
//   // ==========================================
//   const normalizeUri = (uri) => {
//     if (!uri) return '';
//     if (Platform.OS === 'android' && uri.startsWith('file://')) {
//       return uri.replace('file://', '');
//     }
//     return uri.replace('file://', '');
//   };

//   const pickImageFromGallery = async () => {
//     try {
//       const result = await launchImageLibrary({
//         mediaType: 'photo',
//         quality: 0.8,
//         includeBase64: false,
//       });
//       if (result.assets && result.assets.length > 0) {
//         const asset = result.assets[0];
//         return {
//           uri: normalizeUri(asset.uri),
//           name: asset.fileName || 'image.jpg',
//           type: asset.type || 'image/jpeg',
//         };
//       }
//       return null;
//     } catch (error) {
//       throw new Error('Failed to select image from gallery: ' + error.message);
//     }
//   };

//   const pickImageFromCamera = async () => {
//     try {
//       const result = await launchCamera({
//         mediaType: 'photo',
//         quality: 0.8,
//         includeBase64: false,
//       });
//       if (result.assets && result.assets.length > 0) {
//         const asset = result.assets[0];
//         return {
//           uri: normalizeUri(asset.uri),
//           name: asset.fileName || 'camera_photo.jpg',
//           type: asset.type || 'image/jpeg',
//         };
//       }
//       return null;
//     } catch (error) {
//       throw new Error('Failed to capture image with camera: ' + error.message);
//     }
//   };

//   // ---------- FIXED PDF PICKER ----------
//   const pickPdfFile = async () => {
//     try {
//       const res = await DocumentPicker.pickSingle({
//         type: [types.pdf],
//         copyTo: 'cachesDirectory', // ✅ CORRECT – copies to a local path
//       });

//       if (res) {
//         // Use fileCopyUri (local path) if available, else fallback to uri
//         const localPath = res.fileCopyUri || res.uri;
//         return {
//           uri: normalizeUri(localPath),
//           name: res.name || 'document.pdf',
//           type: res.type || 'application/pdf',
//         };
//       }
//       return null;
//     } catch (error) {
//       if (DocumentPicker.isCancel(error)) return null;
//       throw new Error('Failed to pick PDF file: ' + error.message);
//     }
//   };
//   // ---------- END FIX ----------

//   // ==========================================
//   // 6. CHAT FUNCTIONS
//   // ==========================================
//   const toggleChat = (open) => {
//     if (open) {
//       setIsChatOpen(true);
//       Animated.parallel([
//         Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
//         Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
//       ]).start();
//     } else {
//       Animated.parallel([
//         Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
//         Animated.timing(slideAnim, { toValue: 300, duration: 200, useNativeDriver: true }),
//       ]).start(() => {
//         setIsChatOpen(false);
//         setShowOptions(false);
//       });
//     }
//   };

//   const addMessage = (msgObj) => {
//     const newMsg = {
//       id: Date.now().toString() + Math.random().toString(),
//       timestamp: getFormattedTime(),
//       ...msgObj,
//     };
//     setMessages((prev) => [...prev, newMsg]);
//     if (!isChatOpen && msgObj.sender === 'bot') {
//       setUnreadCount((prev) => prev + 1);
//     }
//     setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
//   };

//   const setLoadingMessage = (text) => {
//     setStatusMessage(text);
//     addMessage({ sender: 'bot', text: `⏳ ${text}...`, type: 'text' });
//   };

//   // ==========================================
//   // 7. MANUAL FETCH BY TRANSACTION ID
//   // ==========================================
//   const fetchReceiptById = async () => {
//     if (!manualTransactionId.trim()) {
//       Alert.alert('Error', 'Please enter a Transaction ID');
//       return;
//     }
//     setIsProcessing(true);
//     setStatusMessage('Fetching receipt...');
//     try {
//       addMessage({
//         sender: 'user',
//         text: `🔍 Fetching transaction #${manualTransactionId}`,
//         type: 'text',
//       });
//       const response = await apiClient.get(`/receipts/${manualTransactionId.trim()}`);
//       if (response.data && response.data.success) {
//         const receipt = response.data.data || response.data;
//         addMessage({
//           sender: 'bot',
//           type: 'receipt_card',
//           data: {
//             cardTitle: '📄 Fetched Receipt',
//             transactionId: receipt.transactionid || receipt.transactionId || manualTransactionId,
//             merchantName: receipt.merchantname || receipt.merchantName,
//             invoiceNumber: receipt.invoicenumber || receipt.invoiceNumber,
//             invoiceDate: receipt.invoicedate || receipt.invoiceDate,
//             currency: receipt.currency,
//             subtotal: receipt.subtotal,
//             tax: receipt.taxamount || receipt.tax,
//             discount: receipt.discountamount || receipt.discount,
//             total: receipt.totalamount || receipt.total,
//             status: receipt.status,
//             ocrConfidence: receipt.ocrconfidence || receipt.ocrConfidence,
//             filename: receipt.filename,
//             utrNumber: receipt.utrNumber || receipt.utr,
//             createdAt: receipt.createdAt,
//           },
//         });
//         addMessage({
//           sender: 'bot',
//           text: '✅ Receipt fetched successfully!',
//           type: 'text',
//         });
//       } else {
//         throw new Error('Receipt not found');
//       }
//     } catch (error) {
//       let errorMsg = error.response?.data?.message || error.message || 'Failed to fetch receipt';
//       if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
//         errorMsg = 'Cannot connect to server. Please check your connection.';
//         Alert.alert('Connection Error', errorMsg);
//       }
//       addMessage({ sender: 'bot', text: `❌ ${errorMsg}`, type: 'text' });
//     } finally {
//       setIsProcessing(false);
//       setStatusMessage('');
//       setManualTransactionId('');
//     }
//   };

//   // ==========================================
//   // 8. RECEIPT PROCESSING (unchanged)
//   // ==========================================
//   const uploadFileWithRNFS = (file) => {
//     return new Promise((resolve, reject) => {
//       const filePath = file.uri.startsWith('file://') ? file.uri.replace('file://', '') : file.uri;
//       RNFS.exists(filePath)
//         .then((exists) => {
//           if (!exists) {
//             reject(new Error('File not found at path: ' + filePath));
//             return;
//           }
//           return RNFS.stat(filePath);
//         })
//         .then(() => {
//           const uploadOptions = {
//             toUrl: `${API_BASE_URL}/receipts/upload`,
//             files: [
//               {
//                 name: 'receipt',
//                 filename: file.name,
//                 filepath: filePath,
//                 filetype: file.type || 'image/jpeg',
//               },
//             ],
//             method: 'POST',
//             headers: { Accept: 'application/json' },
//           };
//           const uploadTask = RNFS.uploadFiles(uploadOptions);
//           const timeoutId = setTimeout(() => {
//             if (uploadTask.abort) uploadTask.abort();
//             reject(new Error('Upload timeout - server took too long to respond'));
//           }, 120000);
//           uploadTask.promise
//             .then((uploadResult) => {
//               clearTimeout(timeoutId);
//               if (uploadResult.statusCode >= 200 && uploadResult.statusCode < 300) {
//                 try {
//                   const data = JSON.parse(uploadResult.body);
//                   resolve({ data, status: uploadResult.statusCode });
//                 } catch (_) {
//                   reject(new Error('Failed to parse server response'));
//                 }
//               } else {
//                 reject(new Error(`Upload failed with status ${uploadResult.statusCode}`));
//               }
//             })
//             .catch((error) => {
//               clearTimeout(timeoutId);
//               reject(new Error('Upload failed: ' + (error.message || 'Unknown error')));
//             });
//         })
//         .catch((error) => reject(new Error('File access error: ' + (error.message || 'Unknown error'))));
//     });
//   };

//   const processReceipt = async (file) => {
//     if (!file) return;
//     setIsProcessing(true);
//     setShowOptions(false);
//     try {
//       setLoadingMessage('Uploading receipt');
//       const uploadResponse = await uploadFileWithRNFS(file);
//       const receiptData = uploadResponse.data.data || uploadResponse.data;

//       addMessage({
//         sender: 'bot',
//         type: 'receipt_card',
//         data: {
//           cardTitle: '🧾 OCR Extracted Data',
//           merchantName: receiptData.merchantName,
//           invoiceNumber: receiptData.invoiceNumber || 'N/A',
//           invoiceDate: receiptData.invoiceDate || 'N/A',
//           currency: receiptData.currency,
//           subtotal: receiptData.subtotal,
//           tax: receiptData.tax,
//           discount: receiptData.discount,
//           total: receiptData.total,
//           ocrConfidence: receiptData.ocrConfidence,
//           filename: receiptData.filename,
//           utrNumber: receiptData.utrNumber || receiptData.utr,
//           createdAt: receiptData.createdAt,
//         },
//       });

//       addMessage({
//         sender: 'bot',
//         text: '📊 Receipt processed successfully! Saving...',
//         type: 'text',
//       });

//       setLoadingMessage('Saving receipt');
//       const saveData = {
//         merchantName: receiptData.merchantName,
//         invoiceNumber: receiptData.invoiceNumber || 'N/A',
//         invoiceDate: receiptData.invoiceDate || 'N/A',
//         receiptType: receiptData.receiptType || 'purchase',
//         currency: receiptData.currency || 'INR',
//         subtotal: parseFloat(receiptData.subtotal) || 0,
//         tax: parseFloat(receiptData.tax) || 0,
//         discount: parseFloat(receiptData.discount) || 0,
//         total: parseFloat(receiptData.total) || 0,
//         paymentMethod: receiptData.paymentMethod || 'unknown',
//         rawText: receiptData.rawText || '',
//         ocrConfidence: parseFloat(receiptData.ocrConfidence) || 0,
//         filename: receiptData.filename,
//         userId: '1',
//       };

//       const saveResponse = await apiClient.post('/receipts', saveData);
//       if (!saveResponse.data || !saveResponse.data.success) {
//         throw new Error(saveResponse.data?.message || 'Save failed');
//       }
//       const savedData = saveResponse.data;

//       addMessage({
//         sender: 'bot',
//         type: 'receipt_card',
//         data: {
//           cardTitle: '💾 Saved Receipt',
//           transactionId: savedData.transactionId || savedData.id || savedData._id,
//           merchantName: savedData.merchantName || receiptData.merchantName,
//           invoiceNumber: savedData.invoiceNumber || receiptData.invoiceNumber,
//           invoiceDate: savedData.invoiceDate || receiptData.invoiceDate,
//           currency: savedData.currency || receiptData.currency,
//           subtotal: savedData.subtotal || receiptData.subtotal,
//           tax: savedData.tax || receiptData.tax,
//           discount: savedData.discount || receiptData.discount,
//           total: savedData.total || receiptData.total,
//           status: savedData.status || 'Saved',
//           ocrConfidence: savedData.ocrConfidence || receiptData.ocrConfidence,
//           filename: savedData.filename || receiptData.filename,
//           utrNumber: savedData.utrNumber || savedData.utr,
//           createdAt: savedData.createdAt,
//         },
//       });

//       const transactionId = savedData.transactionId || savedData.id || savedData._id;
//       if (transactionId && transactionId !== 'N/A' && transactionId !== 'null' && transactionId !== null) {
//         setLoadingMessage('Fetching full details');
//         const detailsResponse = await apiClient.get(`/receipts/${transactionId}`);
//         if (detailsResponse.data && detailsResponse.data.success) {
//           const details = detailsResponse.data.data || detailsResponse.data;
//           addMessage({
//             sender: 'bot',
//             type: 'receipt_card',
//             data: {
//               cardTitle: '🔄 Refreshed Details',
//               transactionId: details.transactionid || details.transactionId || transactionId,
//               merchantName: details.merchantname || details.merchantName,
//               invoiceNumber: details.invoicenumber || details.invoiceNumber,
//               invoiceDate: details.invoicedate || details.invoiceDate,
//               currency: details.currency,
//               subtotal: details.subtotal,
//               tax: details.taxamount || details.tax,
//               discount: details.discountamount || details.discount,
//               total: details.totalamount || details.total,
//               status: details.status,
//               ocrConfidence: details.ocrconfidence || details.ocrConfidence,
//               filename: details.filename,
//               utrNumber: details.utrNumber || details.utr,
//               createdAt: details.createdAt,
//             },
//           });
//           addMessage({
//             sender: 'bot',
//             text: '✨ Receipt saved and fetched successfully! 🎉',
//             type: 'text',
//           });
//         } else {
//           addMessage({
//             sender: 'bot',
//             text: '✨ Receipt saved successfully! 🎉',
//             type: 'text',
//           });
//         }
//       } else {
//         addMessage({
//           sender: 'bot',
//           text: '✨ Receipt saved successfully! 🎉',
//           type: 'text',
//         });
//       }
//     } catch (error) {
//       let errorMessage = 'Something went wrong';
//       if (error.response) {
//         errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
//       } else if (error.request) {
//         errorMessage = 'No response from server. Please check your connection.';
//       } else {
//         errorMessage = error.message || 'An unexpected error occurred';
//       }
//       addMessage({ sender: 'bot', text: `❌ ${errorMessage}`, type: 'text' });
//     } finally {
//       setIsProcessing(false);
//       setStatusMessage('');
//     }
//   };

//   // ==========================================
//   // 9. UI HANDLERS
//   // ==========================================
//   const handlePickImage = async () => {
//     try {
//       const file = await pickImageFromGallery();
//       if (file) {
//         addMessage({ sender: 'user', text: `📂 Selected: ${file.name}`, type: 'text' });
//         await processReceipt(file);
//       }
//     } catch (err) {
//       Alert.alert('Error', err.message || 'Failed to select image');
//     }
//   };

//   const handleOpenCamera = async () => {
//     try {
//       const file = await pickImageFromCamera();
//       if (file) {
//         addMessage({ sender: 'user', text: '📸 Captured photo', type: 'text' });
//         await processReceipt(file);
//       }
//     } catch (err) {
//       Alert.alert('Error', err.message || 'Failed to capture image');
//     }
//   };

//   const handlePickPDF = async () => {
//     try {
//       const file = await pickPdfFile();
//       if (file) {
//         addMessage({ sender: 'user', text: `📄 Selected: ${file.name}`, type: 'text' });
//         await processReceipt(file);
//       }
//     } catch (err) {
//       Alert.alert('Error', err.message || 'Failed to select PDF');
//     }
//   };

//   // ==========================================
//   // 10. RENDER FUNCTIONS (UPDATED CARD)
//   // ==========================================
//   const renderReceiptCard = (data) => {
//     const r = data.data || data;
//     const title = data.cardTitle || '🧾 Receipt Details';

//     const formatNumber = (val) => {
//       if (val === undefined || val === null || isNaN(val)) return '0.00';
//       return parseFloat(val).toFixed(2);
//     };

//     const renderField = (label, value, isTotal = false) => {
//       if (value === undefined || value === null || value === '') return null;
//       return (
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>{label}</Text>
//           <Text style={isTotal ? styles.totalValue : styles.value}>
//             {typeof value === 'string' ? value : String(value)}
//           </Text>
//         </View>
//       );
//     };

//     return (
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Text style={styles.cardTitle}>{title}</Text>
//           {(r.transactionId || r.id) && (
//             <Text style={styles.cardBadge}>#{r.transactionId || r.id}</Text>
//           )}
//         </View>
//         <View style={styles.divider} />

//         {r.merchantName && renderField('🏪 Merchant', r.merchantName)}
//         {r.invoiceNumber && r.invoiceNumber !== 'N/A' && renderField('📋 Invoice #', r.invoiceNumber)}
//         {r.invoiceDate && r.invoiceDate !== 'N/A' && renderField('📅 Date', r.invoiceDate)}

//         {r.currency && (
//           <>
//             {renderField('💰 Subtotal', `${r.currency} ${formatNumber(r.subtotal)}`)}
//             {r.tax !== undefined && r.tax !== null && r.tax !== 0 &&
//               renderField('🧾 Tax', `${r.currency} ${formatNumber(r.tax)}`)}
//             {r.discount !== undefined && r.discount !== null && r.discount !== 0 &&
//               renderField('🏷️ Discount', `${r.currency} ${formatNumber(r.discount)}`)}
//             {renderField('💵 Total', `${r.currency} ${formatNumber(r.total)}`, true)}
//           </>
//         )}

//         {r.utrNumber && renderField('🔢 UTR Number', r.utrNumber)}
//         {r.status && renderField('📁 Status', r.status)}
//         {r.ocrConfidence !== undefined && r.ocrConfidence !== null &&
//           renderField('📊 OCR Confidence', `${r.ocrConfidence}%`)}
//         {r.filename && renderField('📎 File', r.filename)}
//         {r.createdAt && renderField('🕒 Created At', new Date(r.createdAt).toLocaleString())}
//       </View>
//     );
//   };

//   const renderChatItem = ({ item }) => {
//     const isBot = item.sender === 'bot';
//     return (
//       <View style={[styles.msgRow, isBot ? styles.msgLeft : styles.msgRight]}>
//         {isBot && (
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>🤖</Text>
//           </View>
//         )}
//         <View style={[styles.bubble, isBot ? styles.botBubble : styles.userBubble]}>
//           {item.type === 'text' && (
//             <Text style={isBot ? styles.botText : styles.userText}>{item.text}</Text>
//           )}
//           {item.type === 'receipt_card' && renderReceiptCard(item.data)}
//           <Text style={styles.timestamp}>{item.timestamp}</Text>
//         </View>
//       </View>
//     );
//   };

//   // ==========================================
//   // 11. MAIN RENDER
//   // ==========================================
//   return (
//     <>
//       <TouchableOpacity
//         style={styles.floatingButton}
//         activeOpacity={0.85}
//         onPress={() => toggleChat(true)}
//       >
//         <Text style={styles.floatingIcon}>💬</Text>
//         {unreadCount > 0 && (
//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>{unreadCount}</Text>
//           </View>
//         )}
//       </TouchableOpacity>

//       {isChatOpen && (
//         <View style={styles.overlayContainer}>
//           <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
//             <TouchableOpacity
//               style={StyleSheet.absoluteFillObject}
//               activeOpacity={1}
//               onPress={() => toggleChat(false)}
//             />
//           </Animated.View>

//           <Animated.View
//             style={[styles.chatSheet, { transform: [{ translateY: slideAnim }] }]}
//           >
//             {/* Header */}
//             <View style={styles.sheetHeader}>
//               <View style={styles.handleBar} />
//               <View style={styles.headerRow}>
//                 <View style={styles.headerLeft}>
//                   <View style={styles.headerAvatar}>
//                     <Text style={styles.headerAvatarText}>🤖</Text>
//                   </View>
//                   <View>
//                     <Text style={styles.headerTitle}>PAYO AI Assistant</Text>
//                     <View style={styles.statusRow}>
//                       <View style={[styles.statusDot, { backgroundColor: isConnected ?  '#EF4444' :'#4ADE80'  }]} />
//                       <Text style={[styles.statusText, { color: isConnected ?  '#EF4444' : '#4ADE80'  }]}>
//                         {isConnected ?  'Offline' : 'Online' }
//                       </Text>
//                     </View>
//                   </View>

//                 </View>
//                 <TouchableOpacity style={styles.closeBtn} onPress={() => toggleChat(false)}>
//                   <Text style={styles.closeBtnText}>✕</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Messages */}
//             <FlatList
//               ref={flatListRef}
//               data={messages}
//               keyExtractor={(item) => item.id}
//               renderItem={renderChatItem}
//               contentContainerStyle={styles.chatList}
//               showsVerticalScrollIndicator={false}
//             />

//             {/* Manual Fetch Input */}
//             <View style={styles.fetchContainer}>
//               <TextInput
//                 style={styles.fetchInput}
//                 placeholder="Enter Transaction ID"
//                 placeholderTextColor="#9CA3AF"
//                 value={manualTransactionId}
//                 onChangeText={setManualTransactionId}
//                 keyboardType="numeric"
//                 editable={!isProcessing}
//               />
//               <TouchableOpacity
//                 style={[styles.fetchButton, (isProcessing || !manualTransactionId.trim()) && styles.fetchButtonDisabled]}
//                 onPress={fetchReceiptById}
//                 disabled={isProcessing || !manualTransactionId.trim()}
//               >
//                 <Text style={styles.fetchButtonText}>Fetch</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Loading Indicator */}
//             {isProcessing && (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#6366F1" />
//                 <Text style={styles.loadingText}>{statusMessage}...</Text>
//               </View>
//             )}

//             {/* Quick Actions */}
//             <View style={styles.actionsFooter}>
//               <TouchableOpacity
//                 style={[styles.actionBtn, isProcessing && styles.actionBtnDisabled]}
//                 disabled={isProcessing}
//                 onPress={() => setShowOptions(true)}
//               >
//                 <Text style={styles.actionIcon}>📎</Text>
//                 <Text style={styles.actionText}>Upload</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.actionBtn, isProcessing && styles.actionBtnDisabled]}
//                 disabled={isProcessing}
//                 onPress={handleOpenCamera}
//               >
//                 <Text style={styles.actionIcon}>📸</Text>
//                 <Text style={styles.actionText}>Camera</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.actionBtn, isProcessing && styles.actionBtnDisabled]}
//                 disabled={isProcessing}
//                 onPress={handlePickPDF}
//               >
//                 <Text style={styles.actionIcon}>📄</Text>
//                 <Text style={styles.actionText}>PDF</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Upload Options Modal */}
//             <Modal
//               visible={showOptions}
//               transparent
//               animationType="slide"
//               onRequestClose={() => setShowOptions(false)}
//             >
//               <TouchableOpacity
//                 style={styles.modalOverlay}
//                 activeOpacity={1}
//                 onPress={() => setShowOptions(false)}
//               >
//                 <View style={styles.optionsSheet}>
//                   <View style={styles.optionsHandle} />
//                   <Text style={styles.optionsTitle}>Upload Receipt</Text>
//                   <Text style={styles.optionsSubtitle}>Choose a source</Text>

//                   <TouchableOpacity
//                     style={styles.optionItem}
//                     onPress={handlePickImage}
//                     disabled={isProcessing}
//                   >
//                     <View style={styles.optionIconContainer}>
//                       <Text style={styles.optionIcon}>🖼️</Text>
//                     </View>
//                     <View style={styles.optionTextContainer}>
//                       <Text style={styles.optionTitle}>Gallery</Text>
//                       <Text style={styles.optionDescription}>Choose from photos</Text>
//                     </View>
//                     <Text style={styles.optionArrow}>→</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.optionItem}
//                     onPress={handleOpenCamera}
//                     disabled={isProcessing}
//                   >
//                     <View style={styles.optionIconContainer}>
//                       <Text style={styles.optionIcon}>📸</Text>
//                     </View>
//                     <View style={styles.optionTextContainer}>
//                       <Text style={styles.optionTitle}>Camera</Text>
//                       <Text style={styles.optionDescription}>Take a photo</Text>
//                     </View>
//                     <Text style={styles.optionArrow}>→</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.optionItem}
//                     onPress={handlePickPDF}
//                     disabled={isProcessing}
//                   >
//                     <View style={styles.optionIconContainer}>
//                       <Text style={styles.optionIcon}>📄</Text>
//                     </View>
//                     <View style={styles.optionTextContainer}>
//                       <Text style={styles.optionTitle}>PDF</Text>
//                       <Text style={styles.optionDescription}>Upload PDF file</Text>
//                     </View>
//                     <Text style={styles.optionArrow}>→</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.cancelOption}
//                     onPress={() => setShowOptions(false)}
//                   >
//                     <Text style={styles.cancelOptionText}>Cancel</Text>
//                   </TouchableOpacity>
//                 </View>
//               </TouchableOpacity>
//             </Modal>
//           </Animated.View>
//         </View>
//       )}
//     </>
//   );
// };



// // ==========================================
// // 11. STYLES (UPDATED FOR WHITE THEME)
// // ==========================================
// const styles = StyleSheet.create({
//   floatingButton: {
//     position: 'absolute',
//     bottom: 60,
//     right: 24,
//     width: 55,
//     height: 55,
//     borderRadius: 32,
//     backgroundColor: '#6366F1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 8,
//     shadowColor: '#6366F1',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 12,
//     // zIndex: 10,
//     zIndex: 100,

//   },
//   floatingIcon: {
//     fontSize: 22,
//     zIndex: 100,

//   },
//   badge: {
//     position: 'absolute',
//     top: -4,
//     right: -4,
//     backgroundColor: '#EF4444',
//     borderRadius: 10,
//     minWidth: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//     paddingHorizontal: 4,
//     zIndex: 100,

//   },
//   badgeText: {
//     color: '#FFFFFF',
//     fontSize: 10,
//     fontWeight: '700',
//     zIndex: 100,

//   },
//   overlayContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     zIndex: 100,
//   },
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   chatSheet: {
//     height: '97%',
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     elevation: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//   },
//   sheetHeader: {
//     paddingHorizontal: 20,
//     paddingTop: 12,
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//   },
//   handleBar: {
//     width: 36,
//     height: 4,
//     backgroundColor: '#D1D5DB',
//     borderRadius: 2,
//     alignSelf: 'center',
//     marginBottom: 12,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   headerAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(99, 102, 241, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   headerAvatarText: {
//     fontSize: 20,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   statusRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 2,
//   },
//   statusDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     marginRight: 6,
//   },
//   statusText: {
//     fontSize: 11,
//     fontWeight: '500',
//   },
//   closeBtn: {
//     padding: 6,
//   },
//   closeBtnText: {
//     fontSize: 18,
//     color: '#6B7280',
//     fontWeight: '600',
//   },
//   chatList: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     flexGrow: 1,
//   },
//   msgRow: {
//     flexDirection: 'row',
//     marginVertical: 4,
//     alignItems: 'flex-end',
//   },
//   msgLeft: {
//     justifyContent: 'flex-start',
//   },
//   msgRight: {
//     justifyContent: 'flex-end',
//   },
//   avatar: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: 'rgba(99, 102, 241, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 6,
//   },
//   avatarText: {
//     fontSize: 14,
//   },
//   bubble: {
//     maxWidth: width * 0.8,
//     borderRadius: 16,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//   },
//   botBubble: {
//     backgroundColor: '#F3F4F6',
//     borderBottomLeftRadius: 4,
//   },
//   userBubble: {
//     backgroundColor: '#6366F1',
//     borderBottomRightRadius: 4,
//   },
//   botText: {
//     color: '#111827',
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   userText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   timestamp: {
//     fontSize: 10,
//     color: '#9CA3AF',
//     alignSelf: 'flex-end',
//     marginTop: 4,
//   },
//   card: {
//     backgroundColor: '#F9FAFB',
//     borderRadius: 12,
//     padding: 12,
//     marginTop: 4,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     minWidth: width * 0.6,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cardTitle: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   cardBadge: {
//     fontSize: 11,
//     fontWeight: 'bold',
//     color: '#4338CA',
//     backgroundColor: '#E0E7FF',
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#E5E7EB',
//     marginVertical: 6,
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 2,
//   },
//   label: {
//     fontSize: 11,
//     color: '#6B7280',
//   },
//   value: {
//     fontSize: 11,
//     fontWeight: '600',
//     color: '#111827',
//     flex: 1,
//     textAlign: 'right',
//     marginLeft: 8,
//   },
//   totalValue: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#059669',
//   },
//   statusSuccess: {
//     color: '#059669',
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     backgroundColor: '#F9FAFB',
//   },
//   loadingText: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginLeft: 8,
//   },
//   fetchContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: '#F9FAFB',
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//   },
//   fetchInput: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     color: '#111827',
//     fontSize: 14,
//     marginRight: 8,
//   },
//   fetchButton: {
//     backgroundColor: '#6366F1',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     justifyContent: 'center',
//   },
//   fetchButtonDisabled: {
//     opacity: 0.5,
//   },
//   fetchButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   actionsFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//     backgroundColor: '#F9FAFB',
//   },
//   actionBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//     borderRadius: 20,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//   },
//   actionBtnDisabled: {
//     opacity: 0.5,
//   },
//   actionIcon: {
//     fontSize: 16,
//     marginRight: 6,
//   },
//   actionText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#374151',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'flex-end',
//   },
//   optionsSheet: {
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingHorizontal: 24,
//     paddingTop: 16,
//     paddingBottom: Platform.OS === 'ios' ? 40 : 24,
//   },
//   optionsHandle: {
//     width: 40,
//     height: 4,
//     backgroundColor: '#D1D5DB',
//     borderRadius: 2,
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   optionsTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   optionsSubtitle: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 24,
//   },
//   optionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F9FAFB',
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   optionIconContainer: {
//     width: 44,
//     height: 44,
//     borderRadius: 12,
//     backgroundColor: 'rgba(99, 102, 241, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 14,
//   },
//   optionIcon: {
//     fontSize: 22,
//   },
//   optionTextContainer: {
//     flex: 1,
//   },
//   optionTitle: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   optionDescription: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   optionArrow: {
//     fontSize: 18,
//     color: '#6366F1',
//   },
//   cancelOption: {
//     marginTop: 8,
//     paddingVertical: 14,
//     borderRadius: 12,
//     backgroundColor: '#F3F4F6',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   cancelOptionText: {
//     color: '#6B7280',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });



// export default Chats;



///////////////////////////////////////////


// ChatButton.js - Updated with wallet integration after save
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   Animated,
//   Dimensions,
//   Platform,
//   Alert,
//   Modal,
//   TextInput,
//   ScrollView,
// } from 'react-native';
// import axios from 'axios';
// import DocumentPicker, { types } from 'react-native-document-picker';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import RNFS from 'react-native-fs';
// import { useAppSelector } from '../../redux/hooks';
// import api from '../../api/axios';
// import { useSelector } from 'react-redux';



// const { width, height } = Dimensions.get('window');

// // ==========================================
// // 1. API CONFIGURATION
// // ==========================================
// const API_BASE_URL = `https://footboard-shadiness-landmass.ngrok-free.dev/api`;

// // ==========================================
// // 2. API CLIENT
// // ==========================================
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 120000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// apiClient.interceptors.request.use(
//   async (config) => {
//     if (config.data instanceof FormData) {
//       delete config.headers['Content-Type'];
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

// // ==========================================
// // 3. MAIN COMPONENT
// // ==========================================
// const Chats = () => {
  
//   const walletData = useAppSelector((state) => state.deposit.walletData);
//   const reduxAmount = useSelector((state) => state.deposit.amount);
//   const reduxCurrency = useSelector((state) => state.deposit.currency) || 'INR';

//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [statusMessage, setStatusMessage] = useState('');
//   const [showOptions, setShowOptions] = useState(false);
//   const [manualTransactionId, setManualTransactionId] = useState('');
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [editableData, setEditableData] = useState(null);
//   const [originalUploadData, setOriginalUploadData] = useState(null);
//   const [uploadTimestamp, setUploadTimestamp] = useState(null);
//   const [saveTimestamp, setSaveTimestamp] = useState(null);
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(300)).current;
//   const flatListRef = useRef(null);

//   const [messages, setMessages] = useState([
//     {
//       id: '1',
//       sender: 'bot',
//       text: '👋 Welcome to PAYO AI Receipt Assistant!',
//       timestamp: getFormattedTime(),
//       type: 'text',
//     },
//     {
//       id: '2',
//       sender: 'bot',
//       text: 'Upload a receipt image or PDF, or enter a Transaction ID to fetch details.',
//       timestamp: getFormattedTime(),
//       type: 'text',
//     },
//   ]);

//   function getFormattedTime() {
//     const date = new Date();
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12 || 12;
//     minutes = minutes < 10 ? '0' + minutes : minutes;
//     return `${hours}:${minutes} ${ampm}`;
//   }

//   function getCurrentTimestamp() {
//     return new Date().toISOString();
//   }

//   function formatDateDisplay(dateStr) {
//     if (!dateStr) return 'N/A';
//     try {
//       const date = new Date(dateStr);
//       return date.toLocaleString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: true
//       });
//     } catch (_) {
//       return dateStr;
//     }
//   }

//   useEffect(() => {
//     if (isChatOpen && flatListRef.current && messages.length > 0) {
//       setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
//       setUnreadCount(0);
//     }


//   }, [messages, isProcessing, isChatOpen]);

//   // ==========================================
//   // 4. FILE PICKER FUNCTIONS
//   // ==========================================
//   const normalizeUri = (uri) => {
//     if (!uri) return '';
//     if (Platform.OS === 'android' && uri.startsWith('file://')) {
//       return uri.replace('file://', '');
//     }
//     return uri.replace('file://', '');
//   };

//   const pickImageFromGallery = async () => {
//     try {
//       const result = await launchImageLibrary({
//         mediaType: 'photo',
//         quality: 0.8,
//         includeBase64: false,
//       });
//       if (result.assets && result.assets.length > 0) {
//         const asset = result.assets[0];
//         return {
//           uri: normalizeUri(asset.uri),
//           name: asset.fileName || 'image.jpg',
//           type: asset.type || 'image/jpeg',
//         };
//       }
//       return null;
//     } catch (error) {
//       throw new Error('Failed to select image from gallery: ' + error.message);
//     }
//   };

  
//   const pickImageFromCamera = async () => {
//     try {
//       const result = await launchCamera({
//         mediaType: 'photo',
//         quality: 0.8,
//         includeBase64: false,
//       });
//       if (result.assets && result.assets.length > 0) {
//         const asset = result.assets[0];
//         return {
//           uri: normalizeUri(asset.uri),
//           name: asset.fileName || 'camera_photo.jpg',
//           type: asset.type || 'image/jpeg',
//         };
//       }
//       return null;
//     } catch (error) {
//       throw new Error('Failed to capture image with camera: ' + error.message);
//     }
//   };

//   const pickPdfFile = async () => {
//     try {
//       const res = await DocumentPicker.pickSingle({
//         type: [types.pdf],
//         copyTo: 'cachesDirectory',
//       });

//       if (res) {
//         const localPath = res.fileCopyUri || res.uri;
//         return {
//           uri: normalizeUri(localPath),
//           name: res.name || 'document.pdf',
//           type: res.type || 'application/pdf',
//         };
//       }
//       return null;
//     } catch (error) {
//       if (DocumentPicker.isCancel(error)) return null;
//       throw new Error('Failed to pick PDF file: ' + error.message);
//     }
//   };

//   // ==========================================
//   // 5. CHAT FUNCTIONS
//   // ==========================================
//   const toggleChat = (open) => {
//     if (open) {
//       setIsChatOpen(true);
//       Animated.parallel([
//         Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
//         Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
//       ]).start();
//     } else {
//       Animated.parallel([
//         Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
//         Animated.timing(slideAnim, { toValue: 300, duration: 200, useNativeDriver: true }),
//       ]).start(() => {
//         setIsChatOpen(false);
//         setShowOptions(false);
//       });
//     }
//   };

//   const addMessage = (msgObj) => {
//     const newMsg = {
//       id: Date.now().toString() + Math.random().toString(),
//       timestamp: getFormattedTime(),
//       ...msgObj,
//     };
//     setMessages((prev) => [...prev, newMsg]);
//     if (!isChatOpen && msgObj.sender === 'bot') {
//       setUnreadCount((prev) => prev + 1);
//     }
//     setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
//   };

//   const setLoadingMessage = (text) => {
//     setStatusMessage(text);
//     addMessage({ sender: 'bot', text: `⏳ ${text}...`, type: 'text' });
//   };

//   // ==========================================
//   // 6. MANUAL FETCH BY TRANSACTION ID
//   // ==========================================
//   const fetchReceiptById = async () => {
//     if (!manualTransactionId.trim()) {
//       Alert.alert('Error', 'Please enter a Transaction ID');
//       return;
//     }
//     setIsProcessing(true);
//     setStatusMessage('Fetching receipt...');
//     try {
//       addMessage({
//         sender: 'user',
//         text: `🔍 Fetching transaction #${manualTransactionId}`,
//         type: 'text',
//       });
//       const response = await apiClient.get(`/receipts/${manualTransactionId.trim()}`);
//       if (response.data && response.data.success) {
//         const receipt = response.data.data || response.data;
//         addMessage({
//           sender: 'bot',
//           type: 'receipt_card',
//           data: {
//             cardTitle: '📄 Fetched Receipt',
//             transactionId: receipt.transactionid || receipt.transactionId || manualTransactionId,
//             merchantName: receipt.merchantname || receipt.merchantName,
//             invoiceNumber: receipt.invoicenumber || receipt.invoiceNumber,
//             invoiceDate: receipt.invoicedate || receipt.invoiceDate,
//             currency: receipt.currency,
//             subtotal: receipt.subtotal,
//             tax: receipt.taxamount || receipt.tax,
//             discount: receipt.discountamount || receipt.discount,
//             total: receipt.totalamount || receipt.total,
//             status: receipt.status,
//             ocrConfidence: receipt.ocrconfidence || receipt.ocrConfidence,
//             filename: receipt.filename,
//             utrNumber: receipt.utrNumber || receipt.utr,
//             createdAt: receipt.createdAt,
//           },
//         });
//         addMessage({
//           sender: 'bot',
//           text: '✅ Receipt fetched successfully!',
//           type: 'text',
//         });
//       } else {
//         throw new Error('Receipt not found');
//       }
//     } catch (error) {
//       let errorMsg = error.response?.data?.message || error.message || 'Failed to fetch receipt';
//       if (error.message === 'Network Error' || error.code === 'ECONNABORTED') {
//         errorMsg = 'Cannot connect to server. Please check your connection.';
//         Alert.alert('Connection Error', errorMsg);
//       }
//       addMessage({ sender: 'bot', text: `❌ ${errorMsg}`, type: 'text' });
//     } finally {
//       setIsProcessing(false);
//       setStatusMessage('');
//       setManualTransactionId('');
//     }
//   };

//   // ==========================================
//   // 7. RECEIPT PROCESSING WITH EDIT
//   // ==========================================
//   const uploadFileWithRNFS = (file) => {
//     return new Promise((resolve, reject) => {
//       const filePath = file.uri.startsWith('file://') ? file.uri.replace('file://', '') : file.uri;
//       RNFS.exists(filePath)
//         .then((exists) => {
//           if (!exists) {
//             reject(new Error('File not found at path: ' + filePath));
//             return;
//           }
//           return RNFS.stat(filePath);
//         })
//         .then(() => {
//           const uploadOptions = {
//             toUrl: `${API_BASE_URL}/receipts/upload`,
//             files: [
//               {
//                 name: 'receipt',
//                 filename: file.name,
//                 filepath: filePath,
//                 filetype: file.type || 'image/jpeg',
//               },
//             ],
//             method: 'POST',
//             headers: { Accept: 'application/json' },
//           };
//           const uploadTask = RNFS.uploadFiles(uploadOptions);
//           const timeoutId = setTimeout(() => {
//             if (uploadTask.abort) uploadTask.abort();
//             reject(new Error('Upload timeout - server took too long to respond'));
//           }, 120000);
//           uploadTask.promise
//             .then((uploadResult) => {
//               clearTimeout(timeoutId);
//               if (uploadResult.statusCode >= 200 && uploadResult.statusCode < 300) {
//                 try {
//                   const data = JSON.parse(uploadResult.body);
//                   resolve({ data, status: uploadResult.statusCode });
//                 } catch (_) {
//                   reject(new Error('Failed to parse server response'));
//                 }
//               } else {
//                 reject(new Error(`Upload failed with status ${uploadResult.statusCode}`));
//               }
//             })
//             .catch((error) => {
//               clearTimeout(timeoutId);
//               reject(new Error('Upload failed: ' + (error.message || 'Unknown error')));
//             });
//         })
//         .catch((error) => reject(new Error('File access error: ' + (error.message || 'Unknown error'))));
//     });
//   };

//   const showEditModal = (data) => {
//     setOriginalUploadData(data);
//     setUploadTimestamp(getCurrentTimestamp());
//     setEditableData({
//       merchantName: data.merchantName || '',
//       transactionid: data.transactionid || data.transactionId || '',
//       utrnumber: data.utrnumber || data.utrNumber || data.utr || '',
//       currency: data.currency || 'INR',
//       total: data.total || data.totalAmount || '',
//       createdAt: data.createdAt || getCurrentTimestamp(),
//       invoiceNumber: data.invoiceNumber || '',
//       invoiceDate: data.invoiceDate || '',
//       receiptType: data.receiptType || 'purchase',
//       subtotal: data.subtotal ? String(data.subtotal) : '0',
//       tax: data.tax || data.taxAmount || '0',
//       discount: data.discount || data.discountAmount || '0',
//       paymentMethod: data.paymentMethod || 'unknown',
//       rawText: data.rawText || data.rawOCRText || '',
//       ocrConfidence: data.ocrConfidence || 0,
//       filename: data.filename || data.fileName || '',
//       filePath: data.filePath || '',
//       fileType: data.fileType || '',
//       fileSize: data.fileSize || 0,
//       status: data.status || 'pending',
//       errorMessage: data.errorMessage || '',
//       userId: data.userId || '1',
//     });
//     setEditModalVisible(true);
//   };

//   // ==========================================
//   // 8. SEND DATA TO WALLET API
//   // ==========================================
//   const sendToWalletApi = async (amount, transactionId) => {
//     if (isProcessingPayment) return;
    
//     setIsProcessingPayment(true);
    
//     try {
//       // Get wallet data from Redux
//       // const walletId = walletData?.Wallet_ID || 'Payo_9059729791';
      
//       const requestData = {
//         amount: amount.toString(),
//         transactionId: transactionId,
//         paymentMode: 'UPI',
//         gatewayName: 'Payo_Client',
//         userWallet: walletData,
//       };

//       console.log('📤 Sending to /api/wallet/add-money:', requestData);

//       const response = await api.post('api/wallet/add-money', requestData);

//       if (response.status === 200 || response.status === 201) {
//         addMessage({
//           sender: 'bot',
//           text: `✅ Payment of ₹${amount} initiated successfully! Transaction ID: ${transactionId}`,
//           type: 'text',
//         });
        
//         // Navigate to loading screen
//         navigation.navigate('loadingtemp', {
//           transactionId: transactionId,
//           amount: amount.toString(),
//           wallet_id: walletId
//         });
//         return true;
//       } else {
//         Alert.alert('Payment Failed', 'Something went wrong. Please try again.');
//         return false;
//       }
//     } catch (error) {
//       console.log('Add Money Error:', error.response?.data || error.message);
//       Alert.alert(
//         'Payment Failed',
//         `${error.response?.data?.Message || 'Failed to process payment. Please try again.'}`
//       );
//       addMessage({
//         sender: 'bot',
//         text: `❌ Payment failed: ${error.response?.data?.Message || 'Please try again'}`,
//         type: 'text',
//       });
//       return false;
//     } finally {
//       setIsProcessingPayment(false);
//     }
//   };

//   // ==========================================
//   // 9. HANDLE SAVE EDITED DATA
//   // ==========================================
//   const handleSaveEditedData = async () => {
//     if (!editableData) return;
    
//     if (!editableData.merchantName.trim()) {
//       Alert.alert('Error', 'Merchant Name is required');
//       return;
//     }

//     setIsProcessing(true);
//     setEditModalVisible(false);
//     setSaveTimestamp(getCurrentTimestamp());

//     try {
//       const saveData = {
//         merchantName: editableData.merchantName.trim(),
//         transactionid: editableData.transactionid.trim() || originalUploadData?.transactionid || originalUploadData?.transactionId || '',
//         utrnumber: editableData.utrnumber.trim() || originalUploadData?.utrnumber || originalUploadData?.utrNumber || originalUploadData?.utr || '',
//         currency: editableData.currency || originalUploadData?.currency || 'INR',
//         total: parseFloat(editableData.total) || parseFloat(originalUploadData?.total) || parseFloat(originalUploadData?.totalAmount) || 0,
//         createdAt: editableData.createdAt || originalUploadData?.createdAt || getCurrentTimestamp(),
//         invoiceNumber: originalUploadData?.invoiceNumber || editableData.invoiceNumber || 'N/A',
//         invoiceDate: originalUploadData?.invoiceDate || editableData.invoiceDate || 'N/A',
//         receiptType: originalUploadData?.receiptType || editableData.receiptType || 'purchase',
//         subtotal: parseFloat(originalUploadData?.subtotal) || parseFloat(editableData.subtotal) || 0,
//         tax: parseFloat(originalUploadData?.tax) || parseFloat(originalUploadData?.taxAmount) || parseFloat(editableData.tax) || 0,
//         discount: parseFloat(originalUploadData?.discount) || parseFloat(originalUploadData?.discountAmount) || parseFloat(editableData.discount) || 0,
//         paymentMethod: originalUploadData?.paymentMethod || editableData.paymentMethod || 'unknown',
//         rawText: originalUploadData?.rawText || originalUploadData?.rawOCRText || editableData.rawText || '',
//         ocrConfidence: parseFloat(originalUploadData?.ocrConfidence) || parseFloat(editableData.ocrConfidence) || 0,
//         filename: originalUploadData?.filename || originalUploadData?.fileName || editableData.filename || '',
//         filePath: originalUploadData?.filePath || editableData.filePath || '',
//         fileType: originalUploadData?.fileType || editableData.fileType || '',
//         fileSize: parseInt(originalUploadData?.fileSize) || parseInt(editableData.fileSize) || 0,
//         status: originalUploadData?.status || 'completed',
//         errorMessage: originalUploadData?.errorMessage || editableData.errorMessage || '',
//         userId: originalUploadData?.userId || editableData.userId || '1',
//       };

//       setLoadingMessage('Saving receipt');
      
//       const saveResponse = await apiClient.post('/receipts', saveData);
      
//       if (!saveResponse.data || !saveResponse.data.success) {
//         if (saveResponse.data?.errors) {
//           const errorMessages = saveResponse.data.errors.join('\n');
//           Alert.alert('Validation Error', errorMessages);
//           throw new Error(saveResponse.data.message || 'Validation failed');
//         }
//         throw new Error(saveResponse.data?.message || 'Save failed');
//       }
      
//       const savedData = saveResponse.data;

//       // Extract amount and transaction ID from saved data
//       const amount = savedData.total || savedData.totalAmount || saveData.total || editableData.total || 0;
//       const transactionId = savedData.transactionid || savedData.transactionId || savedData.id || saveData.transactionid || editableData.transactionid;

//       const successMsg = {
//         sender: 'bot',
//         type: 'success_message',
//         data: {
//           merchantName: savedData.merchantName || saveData.merchantName || editableData.merchantName,
//           transactionId: transactionId,
//           utrNumber: savedData.utrnumber || savedData.utrNumber || savedData.utr || saveData.utrnumber || editableData.utrnumber,
//           currency: savedData.currency || saveData.currency || editableData.currency,
//           total: amount,
//           uploadTime: uploadTimestamp || 'N/A',
//           savedTime: saveTimestamp || getCurrentTimestamp(),
//         }
//       };
//       addMessage(successMsg);
      
//       addMessage({
//         sender: 'bot',
//         text: '✅ Receipt saved successfully! 🎉',
//         type: 'text',
//       });

//       // ==========================================
//       // AFTER SAVE: Send data to wallet API
//       // ==========================================
//       if (amount > 0 && transactionId) {
//         addMessage({
//           sender: 'bot',
//           text: `⏳ Initiating payment of ₹${amount}...`,
//           type: 'text',
//         });
        
//         const paymentSuccess = await sendToWalletApi(amount, transactionId);
        
//         if (paymentSuccess) {
//           addMessage({
//             sender: 'bot',
//             text: '✅ Payment processed successfully! 🎉',
//             type: 'text',
//           });
//         } else {
//           addMessage({
//             sender: 'bot',
//             text: '❌ Payment failed. Please try again.',
//             type: 'text',
//           });
//         }
//       } else {
//         addMessage({
//           sender: 'bot',
//           text: '⚠️ No valid amount or transaction ID found for payment.',
//           type: 'text',
//         });
//       }

//       // Fetch full details if transaction ID is available
//       if (transactionId && transactionId !== 'N/A' && transactionId !== 'null' && transactionId !== null) {
//         try {
//           // const detailsResponse = await apiClient.get(`/receipts/${transactionId}`);
//           if (detailsResponse.data && detailsResponse.data.success) {
//             const details = detailsResponse.data.data || detailsResponse.data;
//             addMessage({
//               sender: 'bot',
//               type: 'receipt_card',
//               data: {
//                 cardTitle: '🔄 Refreshed Details',
//                 transactionId: details.transactionid || details.transactionId || transactionId,
//                 merchantName: details.merchantname || details.merchantName,
//                 invoiceNumber: details.invoicenumber || details.invoiceNumber,
//                 invoiceDate: details.invoicedate || details.invoiceDate,
//                 currency: details.currency,
//                 subtotal: details.subtotal,
//                 tax: details.taxamount || details.tax,
//                 discount: details.discountamount || details.discount,
//                 total: details.totalamount || details.total,
//                 status: details.status,
//                 ocrConfidence: details.ocrconfidence || details.ocrConfidence,
//                 filename: details.filename,
//                 utrNumber: details.utrNumber || details.utr,
//                 createdAt: details.createdAt,
//               },
//             });
//           }
//         } catch (_) {}
//       }

//     } catch (error) {
//       let errorMessage = 'Something went wrong';
//       if (error.response) {
//         errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
//         if (error.response.data?.errors) {
//           errorMessage = error.response.data.errors.join('\n');
//         }
//       } else if (error.request) {
//         errorMessage = 'No response from server. Please check your connection.';
//       } else {
//         errorMessage = error.message || 'An unexpected error occurred';
//       }
//       addMessage({ sender: 'bot', text: `❌ ${errorMessage}`, type: 'text' });
//     } finally {
//       setIsProcessing(false);
//       setStatusMessage('');
//       setOriginalUploadData(null);
//       setEditableData(null);
//     }
//   };

//   const processReceipt = async (file) => {
//     if (!file) return;
//     setIsProcessing(true);
//     setShowOptions(false);
//     setUploadTimestamp(getCurrentTimestamp());
    
//     try {
//       setLoadingMessage('Uploading receipt');
//       const uploadResponse = await uploadFileWithRNFS(file);
//       const receiptData = uploadResponse.data.data || uploadResponse.data;

//       setOriginalUploadData(receiptData);

//       // Show ONLY editable fields in frontend
//       addMessage({
//         sender: 'bot',
//         type: 'editable_fields',
//         data: {
//           merchantName: receiptData.merchantName || '',
//           transactionid: receiptData.transactionid ?? receiptData.transactionId ?? '',
//           utrnumber: receiptData.utrnumber ?? receiptData.utrNumber ?? receiptData.utr ?? '',
//           currency: receiptData.currency || 'INR',
//           total: receiptData.total || receiptData.totalAmount || '',
//           uploadTime: uploadTimestamp || getCurrentTimestamp(),
//           createdAt: receiptData.createdAt || getCurrentTimestamp(),
//         },
//       });

//       addMessage({
//         sender: 'bot',
//         text: '📊 Receipt processed! You can edit the fields below before saving:',
//         type: 'text',
//       });

//       addMessage({
//         sender: 'bot',
//         type: 'edit_button',
//         data: receiptData,
//       });

//     } catch (error) {
//       let errorMessage = 'Something went wrong';
//       if (error.response) {
//         errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
//       } else if (error.request) {
//         errorMessage = 'No response from server. Please check your connection.';
//       } else {
//         errorMessage = error.message || 'An unexpected error occurred';
//       }
//       addMessage({ sender: 'bot', text: `❌ ${errorMessage}`, type: 'text' });
//     } finally {
//       setIsProcessing(false);
//       setStatusMessage('');
//     }
//   };

//   // ==========================================
//   // 10. UI HANDLERS
//   // ==========================================
//   const handlePickImage = async () => {
//     try {
//       const file = await pickImageFromGallery();
//       if (file) {
//         addMessage({ sender: 'user', text: `📂 Selected: ${file.name}`, type: 'text' });
//         await processReceipt(file);
//       }
//     } catch (err) {
//       Alert.alert('Error', err.message || 'Failed to select image');
//     }
//   };

//   const handleOpenCamera = async () => {
//     try {
//       const file = await pickImageFromCamera();
//       if (file) {
//         addMessage({ sender: 'user', text: '📸 Captured photo', type: 'text' });
//         await processReceipt(file);
//       }
//     } catch (err) {
//       Alert.alert('Error', err.message || 'Failed to capture image');
//     }
//   };

//   const handlePickPDF = async () => {
//     try {
//       const file = await pickPdfFile();
//       if (file) {
//         addMessage({ sender: 'user', text: `📄 Selected: ${file.name}`, type: 'text' });
//         await processReceipt(file);
//       }
//     } catch (err) {
//       Alert.alert('Error', err.message || 'Failed to select PDF');
//     }
//   };

//   const handleEditPress = (data) => {
//     showEditModal(data);
//   };

//   // ==========================================
//   // 11. RENDER FUNCTIONS
//   // ==========================================
//   const renderEditableFields = (data) => {
//     const d = data.data || data;

//     return (
//       <View style={styles.editableCard}>
//         <Text style={styles.editableCardTitle}>📝 Editable Fields</Text>
//         <View style={styles.divider} />
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>🏪 Merchant Name</Text>
//           <Text style={styles.value}>{d.merchantName || 'N/A'}</Text>
//         </View>
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>🆔 Transaction ID</Text>
//           <Text style={styles.value}>{d.transactionid || 'N/A'}</Text>
//         </View>
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>🔢 UTR Number</Text>
//           <Text style={styles.value}>{d.utrnumber || 'N/A'}</Text>
//         </View>
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>💰 Currency</Text>
//           <Text style={styles.value}>{d.currency || 'N/A'}</Text>
//         </View>
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>💵 Total Amount</Text>
//           <Text style={styles.totalValue}>{d.currency || '₹'} {parseFloat(d.total || 0).toFixed(2)}</Text>
//         </View>
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>⏰ Uploaded At</Text>
//           <Text style={styles.value}>{formatDateDisplay(d.uploadTime || d.createdAt)}</Text>
//         </View>
//       </View>
//     );
//   };

//   const renderSuccessMessage = (data) => {
//     const d = data.data || data;

//     return (
//       <View style={styles.successCard}>
//         <Text style={styles.successTitle}>✅ Payment Success!</Text>
//         <View style={styles.divider} />
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>🏪 Merchant</Text>
//           <Text style={styles.value}>{d.merchantName || 'N/A'}</Text>
//         </View>
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>🆔 Transaction ID</Text>
//           <Text style={styles.value}>{d.transactionId || 'N/A'}</Text>
//         </View>
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>🔢 UTR Number</Text>
//           <Text style={styles.value}>{d.utrNumber || 'N/A'}</Text>
//         </View>
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>💰 Currency</Text>
//           <Text style={styles.value}>{d.currency || 'N/A'}</Text>
//         </View>
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>💵 Total Amount</Text>
//           <Text style={styles.totalValue}>{d.currency || '₹'} {parseFloat(d.total || 0).toFixed(2)}</Text>
//         </View>
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>⏰ Uploaded At</Text>
//           <Text style={styles.value}>{formatDateDisplay(d.uploadTime)}</Text>
//         </View>
        
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>⏰ Saved At</Text>
//           <Text style={styles.value}>{formatDateDisplay(d.savedTime)}</Text>
//         </View>
//       </View>
//     );
//   };

//   const renderEditButton = (data) => {
//     return (
//       <View style={styles.editButtonContainer}>
//         <TouchableOpacity
//           style={styles.editButton}
//           onPress={() => handleEditPress(data)}
//           disabled={isProcessing}
//         >
//           <Text style={styles.editButtonText}>✏️ Edit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.editButton, styles.skipButton]}
//           onPress={() => {
//             if (originalUploadData) {
//               const saveData = {
//                 merchantName: originalUploadData.merchantName || '',
//                 transactionid: originalUploadData.transactionid || originalUploadData.transactionId || '',
//                 utrnumber: originalUploadData.utrnumber || originalUploadData.utrNumber || originalUploadData.utr || '',
//                 currency: originalUploadData.currency || 'INR',
//                 total: originalUploadData.total || originalUploadData.totalAmount || '',
//                 createdAt: originalUploadData.createdAt || getCurrentTimestamp(),
//                 invoiceNumber: originalUploadData.invoiceNumber || 'N/A',
//                 invoiceDate: originalUploadData.invoiceDate || 'N/A',
//                 receiptType: originalUploadData.receiptType || 'purchase',
//                 subtotal: originalUploadData.subtotal || 0,
//                 tax: originalUploadData.tax || originalUploadData.taxAmount || 0,
//                 discount: originalUploadData.discount || originalUploadData.discountAmount || 0,
//                 paymentMethod: originalUploadData.paymentMethod || 'unknown',
//                 rawText: originalUploadData.rawText || originalUploadData.rawOCRText || '',
//                 ocrConfidence: originalUploadData.ocrConfidence || 0,
//                 filename: originalUploadData.filename || originalUploadData.fileName || '',
//                 filePath: originalUploadData.filePath || '',
//                 fileType: originalUploadData.fileType || '',
//                 fileSize: originalUploadData.fileSize || 0,
//                 status: originalUploadData.status || 'pending',
//                 errorMessage: originalUploadData.errorMessage || '',
//                 userId: originalUploadData.userId || '1',
//               };
//               setEditableData(saveData);
//               handleSaveEditedData();
//             }
//           }}
//         >
//           <Text style={styles.editButtonText}>💾 Save</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const renderReceiptCard = (data) => {
//     const r = data.data || data;
//     const title = data.cardTitle || '🧾 Receipt Details';

//     const formatNumber = (val) => {
//       if (val === undefined || val === null || isNaN(val)) return '0.00';
//       return parseFloat(val).toFixed(2);
//     };

//     const renderField = (label, value, isTotal = false) => {
//       if (value === undefined || value === null || value === '') return null;
//       return (
//         <View style={styles.cardRow}>
//           <Text style={styles.label}>{label}</Text>
//           <Text style={isTotal ? styles.totalValue : styles.value}>
//             {typeof value === 'string' ? value : String(value)}
//           </Text>
//         </View>
//       );
//     };

//     return (
//       <View style={styles.card}>
//         <View style={styles.cardHeader}>
//           <Text style={styles.cardTitle}>{title}</Text>
//           {(r.transactionId || r.id) && (
//             <Text style={styles.cardBadge}>#{r.transactionId || r.id}</Text>
//           )}
//         </View>
//         <View style={styles.divider} />

//         {r.merchantName && renderField('🏪 Merchant', r.merchantName)}
//         {r.invoiceNumber && r.invoiceNumber !== 'N/A' && renderField('📋 Invoice #', r.invoiceNumber)}
//         {r.invoiceDate && r.invoiceDate !== 'N/A' && renderField('📅 Date', r.invoiceDate)}

//         {r.currency && (
//           <>
//             {renderField('💰 Subtotal', `${r.currency} ${formatNumber(r.subtotal)}`)}
//             {r.tax !== undefined && r.tax !== null && r.tax !== 0 &&
//               renderField('🧾 Tax', `${r.currency} ${formatNumber(r.tax)}`)}
//             {r.discount !== undefined && r.discount !== null && r.discount !== 0 &&
//               renderField('🏷️ Discount', `${r.currency} ${formatNumber(r.discount)}`)}
//             {renderField('💵 Total', `${r.currency} ${formatNumber(r.total)}`, true)}
//           </>
//         )}

//         {r.utrNumber && renderField('🔢 UTR Number', r.utrNumber)}
//         {r.paymentMethod && renderField('💳 Payment Method', r.paymentMethod)}
//         {r.status && renderField('📁 Status', r.status)}
//         {r.ocrConfidence !== undefined && r.ocrConfidence !== null &&
//           renderField('📊 OCR Confidence', `${r.ocrConfidence}%`)}
//         {r.filename && renderField('📎 File', r.filename)}
//         {r.createdAt && renderField('🕒 Created At', new Date(r.createdAt).toLocaleString())}
//       </View>
//     );
//   };

//   const renderChatItem = ({ item }) => {
//     const isBot = item.sender === 'bot';
    
//     if (item.type === 'edit_button') {
//       return (
//         <View style={[styles.msgRow, styles.msgLeft]}>
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>🤖</Text>
//           </View>
//           <View style={[styles.bubble, styles.botBubble]}>
//             {renderEditButton(item.data)}
//             <Text style={styles.timestamp}>{item.timestamp}</Text>
//           </View>
//         </View>
//       );
//     }

//     if (item.type === 'editable_fields') {
//       return (
//         <View style={[styles.msgRow, styles.msgLeft]}>
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>🤖</Text>
//           </View>
//           <View style={[styles.bubble, styles.botBubble]}>
//             {renderEditableFields(item.data)}
//             <Text style={styles.timestamp}>{item.timestamp}</Text>
//           </View>
//         </View>
//       );
//     }

//     if (item.type === 'success_message') {
//       return (
//         <View style={[styles.msgRow, styles.msgLeft]}>
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>🤖</Text>
//           </View>
//           <View style={[styles.bubble, styles.botBubble]}>
//             {renderSuccessMessage(item.data)}
//             <Text style={styles.timestamp}>{item.timestamp}</Text>
//           </View>
//         </View>
//       );
//     }

//     return (
//       <View style={[styles.msgRow, isBot ? styles.msgLeft : styles.msgRight]}>
//         {isBot && (
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>🤖</Text>
//           </View>
//         )}
//         <View style={[styles.bubble, isBot ? styles.botBubble : styles.userBubble]}>
//           {item.type === 'text' && (
//             <Text style={isBot ? styles.botText : styles.userText}>{item.text}</Text>
//           )}
//           {item.type === 'receipt_card' && renderReceiptCard(item.data)}
//           <Text style={styles.timestamp}>{item.timestamp}</Text>
//         </View>
//       </View>
//     );
//   };

//   // ==========================================
//   // 12. EDIT MODAL
//   // ==========================================
//   const renderEditModal = () => (
//     <Modal
//       visible={editModalVisible}
//       transparent
//       animationType="slide"
//       onRequestClose={() => setEditModalVisible(false)}
//     >
//       <View style={styles.editModalOverlay}>
//         <View style={styles.editModalContent}>
//           <View style={styles.editModalHeader}>
//             <Text style={styles.editModalTitle}>✏️ Edit Receipt Data</Text>
//             <TouchableOpacity onPress={() => setEditModalVisible(false)}>
//               <Text style={styles.editModalClose}>✕</Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView showsVerticalScrollIndicator={false}>
//             <View style={styles.editField}>
//               <Text style={styles.editLabel}>Merchant Name *</Text>
//               <TextInput
//                 style={styles.editInput}
//                 value={editableData?.merchantName}
//                 onChangeText={(text) => setEditableData({...editableData, merchantName: text})}
//                 placeholder="Enter merchant name"
//                 placeholderTextColor="#9CA3AF"
//               />
//             </View>

//             <View style={styles.editField}>
//               <Text style={styles.editLabel}>Transaction ID</Text>
//               <TextInput
//                 style={styles.editInput}
//                 value={editableData?.transactionid}
//                 onChangeText={(text) => setEditableData({...editableData, transactionid: text})}
//                 placeholder="Enter transaction ID"
//                 placeholderTextColor="#9CA3AF"
//               />
//             </View>

//             <View style={styles.editField}>
//               <Text style={styles.editLabel}>UTR Number</Text>
//               <TextInput
//                 style={styles.editInput}
//                 value={editableData?.utrnumber}
//                 onChangeText={(text) => setEditableData({...editableData, utrnumber: text})}
//                 placeholder="Enter UTR number"
//                 placeholderTextColor="#9CA3AF"
//               />
//             </View>

//             <View style={styles.editField}>
//               <Text style={styles.editLabel}>Currency</Text>
//               <TextInput
//                 style={styles.editInput}
//                 value={editableData?.currency}
//                 onChangeText={(text) => setEditableData({...editableData, currency: text})}
//                 placeholder="Enter currency (e.g., INR, USD)"
//                 placeholderTextColor="#9CA3AF"
//               />
//             </View>

//             <View style={styles.editField}>
//               <Text style={styles.editLabel}>Total Amount</Text>
//               <TextInput
//                 style={styles.editInput}
//                 value={editableData?.total ? String(editableData.total) : ''}
//                 onChangeText={(text) => setEditableData({...editableData, total: text})}
//                 placeholder="0.00"
//                 placeholderTextColor="#9CA3AF"
//                 keyboardType="numeric"
//               />
//             </View>

//             <View style={styles.editField}>
//               <Text style={styles.editLabel}>Uploaded At</Text>
//               <TextInput
//                 style={[styles.editInput, styles.disabledInput]}
//                 value={uploadTimestamp ? formatDateDisplay(uploadTimestamp) : 'N/A'}
//                 editable={false}
//                 placeholderTextColor="#9CA3AF"
//               />
//             </View>

//             <View style={styles.editModalButtons}>
//               <TouchableOpacity
//                 style={[styles.editModalButton, styles.editCancelButton]}
//                 onPress={() => setEditModalVisible(false)}
//               >
//                 <Text style={styles.editCancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.editModalButton, styles.editSaveButton]}
//                 onPress={handleSaveEditedData}
//                 disabled={isProcessing}
//               >
//                 <Text style={styles.editSaveButtonText}>
//                   {isProcessing ? 'Saving...' : '💾 Save'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </View>
//       </View>
//     </Modal>
//   );

//   // ==========================================
//   // 13. MAIN RENDER
//   // ==========================================
//   return (
//     <>
//       <TouchableOpacity
//         style={styles.floatingButton}
//         activeOpacity={0.85}
//         onPress={() => toggleChat(true)}
//       >
//         <Text style={styles.floatingIcon}>💬</Text>
//         {unreadCount > 0 && (
//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>{unreadCount}</Text>
//           </View>
//         )}
//       </TouchableOpacity>

//       {isChatOpen && (
//         <View style={styles.overlayContainer}>
//           <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
//             <TouchableOpacity
//               style={StyleSheet.absoluteFillObject}
//               activeOpacity={1}
//               onPress={() => toggleChat(false)}
//             />
//           </Animated.View>

//           <Animated.View
//             style={[styles.chatSheet, { transform: [{ translateY: slideAnim }] }]}
//           >
//             {/* Header */}
//             <View style={styles.sheetHeader}>
//               <View style={styles.handleBar} />
//               <View style={styles.headerRow}>
//                 <View style={styles.headerLeft}>
//                   <View style={styles.headerAvatar}>
//                     <Text style={styles.headerAvatarText}>🤖</Text>
//                   </View>
//                   <View>
//                     <Text style={styles.headerTitle}>PAYO AI Assistant</Text>
//                   </View>
//                 </View>
//                 <TouchableOpacity style={styles.closeBtn} onPress={() => toggleChat(false)}>
//                   <Text style={styles.closeBtnText}>✕</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Messages */}
//             <FlatList
//               ref={flatListRef}
//               data={messages}
//               keyExtractor={(item) => item.id}
//               renderItem={renderChatItem}
//               contentContainerStyle={styles.chatList}
//               showsVerticalScrollIndicator={false}
//             />

//             {/* Manual Fetch Input */}
//             <View style={styles.fetchContainer}>
//               <TextInput
//                 style={styles.fetchInput}
//                 placeholder="Enter Transaction ID"
//                 placeholderTextColor="#9CA3AF"
//                 value={manualTransactionId}
//                 onChangeText={setManualTransactionId}
//                 keyboardType="numeric"
//                 editable={!isProcessing}
//               />
//               <TouchableOpacity
//                 style={[styles.fetchButton, (isProcessing || !manualTransactionId.trim()) && styles.fetchButtonDisabled]}
//                 onPress={fetchReceiptById}
//                 disabled={isProcessing || !manualTransactionId.trim()}
//               >
//                 <Text style={styles.fetchButtonText}>Fetch</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Loading Indicator */}
//             {isProcessing && (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#6366F1" />
//                 <Text style={styles.loadingText}>{statusMessage}...</Text>
//               </View>
//             )}

//             {/* Quick Actions */}
//             <View style={styles.actionsFooter}>
//               <TouchableOpacity
//                 style={[styles.actionBtn, isProcessing && styles.actionBtnDisabled]}
//                 disabled={isProcessing}
//                 onPress={() => setShowOptions(true)}
//               >
//                 <Text style={styles.actionIcon}>📎</Text>
//                 <Text style={styles.actionText}>Upload</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.actionBtn, isProcessing && styles.actionBtnDisabled]}
//                 disabled={isProcessing}
//                 onPress={handleOpenCamera}
//               >
//                 <Text style={styles.actionIcon}>📸</Text>
//                 <Text style={styles.actionText}>Camera</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.actionBtn, isProcessing && styles.actionBtnDisabled]}
//                 disabled={isProcessing}
//                 onPress={handlePickPDF}
//               >
//                 <Text style={styles.actionIcon}>📄</Text>
//                 <Text style={styles.actionText}>PDF</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Upload Options Modal */}
//             <Modal
//               visible={showOptions}
//               transparent
//               animationType="slide"
//               onRequestClose={() => setShowOptions(false)}
//             >
//               <TouchableOpacity
//                 style={styles.modalOverlay}
//                 activeOpacity={1}
//                 onPress={() => setShowOptions(false)}
//               >
//                 <View style={styles.optionsSheet}>
//                   <View style={styles.optionsHandle} />
//                   <Text style={styles.optionsTitle}>Upload Receipt</Text>
//                   <Text style={styles.optionsSubtitle}>Choose a source</Text>

//                   <TouchableOpacity
//                     style={styles.optionItem}
//                     onPress={handlePickImage}
//                     disabled={isProcessing}
//                   >
//                     <View style={styles.optionIconContainer}>
//                       <Text style={styles.optionIcon}>🖼️</Text>
//                     </View>
//                     <View style={styles.optionTextContainer}>
//                       <Text style={styles.optionTitle}>Gallery</Text>
//                       <Text style={styles.optionDescription}>Choose from photos</Text>
//                     </View>
//                     <Text style={styles.optionArrow}>→</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.optionItem}
//                     onPress={handleOpenCamera}
//                     disabled={isProcessing}
//                   >
//                     <View style={styles.optionIconContainer}>
//                       <Text style={styles.optionIcon}>📸</Text>
//                     </View>
//                     <View style={styles.optionTextContainer}>
//                       <Text style={styles.optionTitle}>Camera</Text>
//                       <Text style={styles.optionDescription}>Take a photo</Text>
//                     </View>
//                     <Text style={styles.optionArrow}>→</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.optionItem}
//                     onPress={handlePickPDF}
//                     disabled={isProcessing}
//                   >
//                     <View style={styles.optionIconContainer}>
//                       <Text style={styles.optionIcon}>📄</Text>
//                     </View>
//                     <View style={styles.optionTextContainer}>
//                       <Text style={styles.optionTitle}>PDF</Text>
//                       <Text style={styles.optionDescription}>Upload PDF file</Text>
//                     </View>
//                     <Text style={styles.optionArrow}>→</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.cancelOption}
//                     onPress={() => setShowOptions(false)}
//                   >
//                     <Text style={styles.cancelOptionText}>Cancel</Text>
//                   </TouchableOpacity>
//                 </View>
//               </TouchableOpacity>
//             </Modal>
//           </Animated.View>
//         </View>
//       )}

//       {/* Edit Modal */}
//       {renderEditModal()}
//     </>
//   );
// };


// // ==========================================
// // 12. STYLES
// // ==========================================
// const styles = StyleSheet.create({
//   floatingButton: {
//     position: 'absolute',
//     bottom: 110,
//     right: 25,
//     width: 65,
//     height: 65,
//     borderRadius: 32,
//     backgroundColor: '#000000b9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 8,
//     shadowColor: '#6366F1',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 12,
//     zIndex: 100,
//   },
//   floatingIcon: {
//     fontSize: 22,
//     zIndex: 100,
//   },
//   badge: {
//     position: 'absolute',
//     top: -4,
//     right: -4,
//     backgroundColor: '#EF4444',
//     borderRadius: 10,
//     minWidth: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//     paddingHorizontal: 4,
//     zIndex: 100,
//   },
//   badgeText: {
//     color: '#FFFFFF',
//     fontSize: 10,
//     fontWeight: '700',
//     zIndex: 100,
//   },
//   overlayContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'flex-end',
//     zIndex: 100,
//   },
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   chatSheet: {
//     height: '97%',
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     elevation: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     paddingBottom:120
//   },
//   sheetHeader: {
//     paddingHorizontal: 20,
//     paddingTop: 12,
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//   },
//   handleBar: {
//     width: 36,
//     height: 4,
//     backgroundColor: '#D1D5DB',
//     borderRadius: 2,
//     alignSelf: 'center',
//     marginBottom: 12,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   headerAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(99, 102, 241, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   headerAvatarText: {
//     fontSize: 20,
//   },
//   headerTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   closeBtn: {
//     padding: 6,
//   },
//   closeBtnText: {
//     fontSize: 18,
//     color: '#6B7280',
//     fontWeight: '600',
//   },
//   chatList: {
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     flexGrow: 1,
//   },
//   msgRow: {
//     flexDirection: 'row',
//     marginVertical: 4,
//     alignItems: 'flex-end',
//   },
//   msgLeft: {
//     justifyContent: 'flex-start',
//   },
//   msgRight: {
//     justifyContent: 'flex-end',
//   },
//   avatar: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     backgroundColor: 'rgba(99, 102, 241, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 6,
//   },
//   avatarText: {
//     fontSize: 14,
//   },
//   bubble: {
//     maxWidth: width * 0.8,
//     borderRadius: 16,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//   },
//   botBubble: {
//     backgroundColor: '#F3F4F6',
//     borderBottomLeftRadius: 4,
//   },
//   userBubble: {
//     backgroundColor: '#6366F1',
//     borderBottomRightRadius: 4,
//   },
//   botText: {
//     color: '#111827',
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   userText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   timestamp: {
//     fontSize: 10,
//     color: '#9CA3AF',
//     alignSelf: 'flex-end',
//     marginTop: 4,
//   },
//   card: {
//     backgroundColor: '#F9FAFB',
//     borderRadius: 12,
//     padding: 12,
//     marginTop: 4,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     minWidth: width * 0.6,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   cardTitle: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   cardBadge: {
//     fontSize: 11,
//     fontWeight: 'bold',
//     color: '#4338CA',
//     backgroundColor: '#E0E7FF',
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#E5E7EB',
//     marginVertical: 6,
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 2,
//   },
//   label: {
//     fontSize: 11,
//     color: '#6B7280',
//   },
//   value: {
//     fontSize: 11,
//     fontWeight: '600',
//     color: '#111827',
//     flex: 1,
//     textAlign: 'right',
//     marginLeft: 8,
//   },
//   totalValue: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#059669',
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     backgroundColor: '#F9FAFB',
//   },
//   loadingText: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginLeft: 8,
//   },
//   fetchContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: '#F9FAFB',
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//   },
//   fetchInput: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     color: '#111827',
//     fontSize: 14,
//     marginRight: 8,
//   },
//   fetchButton: {
//     backgroundColor: '#6366F1',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     justifyContent: 'center',
//   },
//   fetchButtonDisabled: {
//     opacity: 0.5,
//   },
//   fetchButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   actionsFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//     backgroundColor: '#F9FAFB',
//   },
//   actionBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//     borderRadius: 20,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//   },
//   actionBtnDisabled: {
//     opacity: 0.5,
//   },
//   actionIcon: {
//     fontSize: 16,
//     marginRight: 6,
//   },
//   actionText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#374151',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'flex-end',
//   },
//   optionsSheet: {
//     backgroundColor: '#FFFFFF',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingHorizontal: 24,
//     paddingTop: 16,
//     paddingBottom: Platform.OS === 'ios' ? 40 : 24,
//   },
//   optionsHandle: {
//     width: 40,
//     height: 4,
//     backgroundColor: '#D1D5DB',
//     borderRadius: 2,
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   optionsTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   optionsSubtitle: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 24,
//   },
//   optionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F9FAFB',
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   optionIconContainer: {
//     width: 44,
//     height: 44,
//     borderRadius: 12,
//     backgroundColor: 'rgba(99, 102, 241, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 14,
//   },
//   optionIcon: {
//     fontSize: 22,
//   },
//   optionTextContainer: {
//     flex: 1,
//   },
//   optionTitle: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   optionDescription: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   optionArrow: {
//     fontSize: 18,
//     color: '#6366F1',
//   },
//   cancelOption: {
//     marginTop: 8,
//     paddingVertical: 14,
//     borderRadius: 12,
//     backgroundColor: '#F3F4F6',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   cancelOptionText: {
//     color: '#6B7280',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   editButtonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     paddingVertical: 2,
//   },
//   editButton: {
//     backgroundColor: '#6366F1',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//     marginHorizontal: 3,
//     minWidth: 60,
//     alignItems: 'center',
//   },
//   skipButton: {
//     backgroundColor: '#10B981',
//   },
//   editButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//     fontSize: 12,
//   },
//   editableCard: {
//     backgroundColor: '#EFF6FF',
//     borderRadius: 12,
//     padding: 12,
//     marginTop: 4,
//     borderWidth: 1,
//     borderColor: '#93C5FD',
//     minWidth: width * 0.6,
//   },
//   editableCardTitle: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#1E40AF',
//   },
//   successCard: {
//     backgroundColor: '#ECFDF5',
//     borderRadius: 12,
//     padding: 12,
//     marginTop: 4,
//     borderWidth: 1,
//     borderColor: '#10B981',
//     minWidth: width * 0.6,
//   },
//   successTitle: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#059669',
//     textAlign: 'center',
//     marginBottom: 4,
//   },
//   editModalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   editModalContent: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 24,
//     width: '100%',
//     maxHeight: '90%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   editModalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingBottom: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   editModalTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   editModalClose: {
//     fontSize: 24,
//     color: '#6B7280',
//     fontWeight: '600',
//     padding: 4,
//   },
//   editField: {
//     marginBottom: 16,
//   },
//   editLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#374151',
//     marginBottom: 6,
//   },
//   editInput: {
//     backgroundColor: '#F9FAFB',
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     fontSize: 14,
//     color: '#111827',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   disabledInput: {
//     backgroundColor: '#F3F4F6',
//     color: '#6B7280',
//   },
//   editModalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//     marginBottom: 4,
//   },
//   editModalButton: {
//     flex: 1,
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginHorizontal: 6,
//   },
//   editCancelButton: {
//     backgroundColor: '#F3F4F6',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   editCancelButtonText: {
//     color: '#6B7280',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   editSaveButton: {
//     backgroundColor: '#6366F1',
//   },
//   editSaveButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//     fontSize: 16,
//   },

// });


// export default Chats;