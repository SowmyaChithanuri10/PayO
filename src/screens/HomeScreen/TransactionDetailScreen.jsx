// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   StatusBar,
//   StyleSheet,
//   Dimensions,
//   Alert,
//   Share,
//   Platform,
//   ToastAndroid,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather';
// import Clipboard from '@react-native-clipboard/clipboard';
// import ViewShot from 'react-native-view-shot';
// import RNFS from 'react-native-fs';

// import { theme } from '../../MainTheme/theme';
// import { verticalScale, scale, moderateScale } from '../../utils/responsive';
// import { useAppSelector } from '../../redux/hooks';

// export default function TransactionDetailScreen({ route, navigation }) {
//   const { 
//     amount = '0.00', 
//     recipient = 'Wallet Top-up', 
//     transactionId = 'N/A', 
//     wallet_id = 'N/A',
//     date = 'N/A',
//     // status = 'Completed',
//     status = '',
//     isBonus= true,
//     isFailed = false,
//   } = route.params || {};

//   console.log(route.params)

//   const viewShotRef = useRef();
//   const walletData = useAppSelector((state) => state.deposit.walletData);

//   let statusColor = '#10B981';
//   let statusIcon = 'check-circle';
//   let statusText = status || 'Completed';
//   let bannerStatusTitle =isBonus? 'Bonus Amount' :'Payment Successful';

//   if (isFailed) {
//     statusColor = '#EF4444';
//     statusIcon = 'x-circle';
//     bannerStatusTitle = 'Payment Failed';
//   } else if (!status && !isFailed) {
//     statusColor = '#EAB308';
//     statusIcon = 'clock';
//     bannerStatusTitle = 'Payment In-Progress';
//   }

//   const handleBackToHome = () => {
//     navigation.goBack();
//   };

//   const handleCopy = (text, label) => {
//     if (!text || text === 'N/A') return;
//     Clipboard.setString(text);
//     if (Platform.OS === 'android') {
//       ToastAndroid.show(`${label} copied`, ToastAndroid.SHORT);
//     }
//   };

//   const handleSendAgain = () => {
//     navigation.navigate('EnterAmount', {
//       name: recipient,
//       address: wallet_id,
//       amount: amount,
//       show: true,
//     });
//   };

//   const handleDownload = async () => {
//     try {
//       if (!viewShotRef.current) {
//         Alert.alert('Error', 'Receipt capture not ready');
//         return;
//       }

//       const uri = await viewShotRef.current.capture();
//       const fileName = `receipt_${Date.now()}.png`;
//       const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

//       await RNFS.copyFile(uri, path);
//       Alert.alert('Success', `Receipt saved successfully!\n${path}`);
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `Transaction Receipt\n\nTransaction ID: #${transactionId}\nAmount: ₹${amount}\nStatus: ${statusText}\nDate: ${date}`,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//     const handleHistory = () => {
//     navigation.navigate('TnsHistorySingleUser', {
//       id: transaction?.wallet,
//       name: transaction?.name,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
//       <StatusBar backgroundColor={theme.colors.bgApp} barStyle="dark-content" />

//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.backButton} 
//           onPress={handleBackToHome}
//           activeOpacity={0.7}
//         >
//           <Icon name="chevron-left" size={moderateScale(22)} color={theme.colors.primaryBlue} />
//         </TouchableOpacity>
        
//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle}>Transaction Details</Text>
//           <Text style={styles.headerSubtitle}>View your transaction information</Text>
//         </View>

//         <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
//           <Icon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView 
//         showsVerticalScrollIndicator={false} 
//         contentContainerStyle={styles.scrollContent}
//       >
//         <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
//           <View style={styles.captureCardWrapper}>
//             {/* GRADIENT BANNER CARD */}
//             <LinearGradient
//               colors={['#6366f1', '#4f46e5', '#3b82f6']}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.gradientCard}
//             >
//               <Image 
//                 source={require('../../../assets/images/transactionScreen/Image Container.png')} 
//                 style={styles.bgGlowOverlay}
//                 resizeMode="cover"
//               />

//               <View style={styles.gradientCardContent}>
//                 <Image 
//                   source={require('../../../assets/images/transactionScreen/Wallet Icon Container.png')}
//                   style={styles.statusCheckImage}
//                   resizeMode="contain"
//                 />
                
//                 <View style={styles.statusTextContainer}>
//                   <Text style={styles.paymentStatusText}>{bannerStatusTitle}</Text>
//                   <View style={styles.amountContainer}>
//                     <Text style={styles.amountText}>₹{amount}</Text>
//                   </View>
//                   <Text style={styles.recipientText}>{recipient}</Text>
//                 </View>

//                 <Image 
//                   source={require('../../../assets/images/transactionScreen/Wallet image 1.png')} 
//                   style={styles.walletIllustration}
//                   resizeMode="contain"
//                 />
//               </View>
//             </LinearGradient>

//             {/* DETAILS CONTAINER CARD */}
//             <View style={styles.detailsCard}>
//               <TouchableOpacity
//                 activeOpacity={0.7}
//                 onPress={() => handleCopy(transactionId, 'Transaction ID')}
//                 style={styles.detailRow}
//               >
//                 <Text style={styles.detailLabel}>Transaction ID</Text>
//                 <Text style={styles.detailValueBold}>#{transactionId}</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 activeOpacity={0.7}
//                 onPress={() => handleCopy(wallet_id, 'Wallet ID')}
//                 style={styles.detailRow}
//               >
//                 <Text style={styles.detailLabel}>Paid via</Text>
//                 <Text style={styles.detailValueBold}>Wallet : {walletData?.Wallet_ID}</Text>
//               </TouchableOpacity>

//               <View style={styles.detailRow}>
//                 <Text style={styles.detailLabel}>Date & Time</Text>
//                 <Text style={styles.detailValueBold}>{date}</Text>
//               </View>

//               <View style={styles.detailRow}>
//                 <Text style={styles.detailLabel}>Status</Text>
//                 <View style={styles.statusPillContainer}>
//                   <Text style={[styles.statusLabelCompleted, { color: statusColor }]}>
//                     {statusText}
//                   </Text>
//                   <Icon name={statusIcon} size={moderateScale(16)} color={statusColor} />
//                 </View>
//               </View>

//               <View style={[styles.detailRow, styles.noBorderRow]}>
//                 <Text style={styles.detailLabel}>Transfer Fee</Text>
//                 <Text style={styles.detailValueBold}>₹0.00</Text>
//               </View>
//             </View>
//           </View>
//         </ViewShot>

//         {/* BOTTOM ACTION BUTTONS ROW */}
//         <View style={styles.actionRow}>
//           <TouchableOpacity style={styles.actionItem} onPress={handleSendAgain} activeOpacity={0.8}>
//             <View style={styles.actionSquare}>
//               <Icon name="send" size={moderateScale(18)} color="#FFFFFF" />
//             </View>
//             <Text style={styles.actionText}>Send Again</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionItem} onPress={handleDownload} activeOpacity={0.8}>
//             <View style={styles.actionSquare}>
//               <Icon name="download" size={moderateScale(18)} color="#FFFFFF" />
//             </View>
//             <Text style={styles.actionText}>Download</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionItem} onPress={handleShare} activeOpacity={0.8}>
//             <View style={styles.actionSquare}>
//               <Icon name="share-2" size={moderateScale(18)} color="#FFFFFF" />
//             </View>
//             <Text style={styles.actionText}>Share Receipt</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionItem} onPress={handleHistory} activeOpacity={0.8}>
//             <View style={styles.actionSquare}>
//               <Icon name="rotate-ccw" size={moderateScale(18)} color="#FFFFFF" />
//             </View>
//             <Text style={styles.actionText}>History</Text>
//           </TouchableOpacity>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }


import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  Alert,
  Share,
  Platform,
  ToastAndroid,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';

import { theme } from '../../MainTheme/theme';
import { verticalScale, scale, moderateScale } from '../../utils/responsive';
import { useAppSelector } from '../../redux/hooks';

export default function TransactionDetailScreen({ route, navigation }) {
  const { 
    amount = '0.00', 
    recipient = 'Wallet Top-up', 
    transactionId = 'N/A', 
    wallet_id = 'N/A',
    date = 'N/A',
    status = '',
    isBonus = false,
    isFailed = false,
    isInProgress = false,
  } = route.params || {};

  console.log(route.params)

  const viewShotRef = useRef();
  const walletData = useAppSelector((state) => state.deposit.walletData);

  let statusColor = '#10B981';
  let statusIcon = 'check-circle';
  let statusText = status || 'Completed';
  let bannerStatusTitle = isBonus ? 'Bonus Amount' : 'Payment Successful';

  if (isFailed) {
    statusColor = '#EF4444';
    statusIcon = 'x-circle';
    bannerStatusTitle = 'Payment Failed';
  } else if (isInProgress || status === 'Payment Verification In-Progress') {
    statusColor = '#EAB308';
    statusIcon = 'clock';
    bannerStatusTitle = 'Payment In-Progress';
  }

  const handleBackToHome = () => {
    navigation.goBack();
  };

  const handleCopy = (text, label) => {
    if (!text || text === 'N/A') return;
    Clipboard.setString(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show(`${label} copied`, ToastAndroid.SHORT);
    }
  };

  const handleSendAgain = () => {
    navigation.navigate('EnterAmount', {
      name: recipient,
      address: wallet_id,
      amount: amount,
      show: true,
    });
  };

  const handleDownload = async () => {
    try {
      if (!viewShotRef.current) {
        Alert.alert('Error', 'Receipt capture not ready');
        return;
      }

      const uri = await viewShotRef.current.capture();
      const fileName = `receipt_${Date.now()}.png`;
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      await RNFS.copyFile(uri, path);
      Alert.alert('Success', `Receipt saved successfully!\n${path}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Transaction Receipt\n\nTransaction ID: #${transactionId}\nAmount: ₹${amount}\nStatus: ${statusText}\nDate: ${date}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleHistory = () => {
    navigation.navigate('TnsHistorySingleUser', {
      id: wallet_id,
      name: recipient,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar backgroundColor={theme.colors.bgApp} barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackToHome}
          activeOpacity={0.7}
        >
          <Icon name="chevron-left" size={moderateScale(22)} color={theme.colors.primaryBlue} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Transaction Details</Text>
          <Text style={styles.headerSubtitle}>View your transaction information</Text>
        </View>

        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <Icon name="help-circle" size={moderateScale(22)} color={theme.colors.primaryBlue} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
          <View style={styles.captureCardWrapper}>
            {/* GRADIENT BANNER CARD */}
            <LinearGradient
              colors={['#6366f1', '#4f46e5', '#3b82f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientCard}
            >
              <Image 
                source={require('../../../assets/images/transactionScreen/Image Container.png')} 
                style={styles.bgGlowOverlay}
                resizeMode="cover"
              />

              <View style={styles.gradientCardContent}>
                <Image 
                  source={require('../../../assets/images/transactionScreen/Wallet Icon Container.png')}
                  style={styles.statusCheckImage}
                  resizeMode="contain"
                />
                
                <View style={styles.statusTextContainer}>
                  <Text style={styles.paymentStatusText}>{bannerStatusTitle}</Text>
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>₹{amount}</Text>
                  </View>
                  <Text style={styles.recipientText}>{recipient}</Text>
                </View>

                <Image 
                  source={require('../../../assets/images/transactionScreen/Wallet image 1.png')} 
                  style={styles.walletIllustration}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>

            {/* DETAILS CONTAINER CARD */}
            <View style={styles.detailsCard}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleCopy(transactionId, 'Transaction ID')}
                style={styles.detailRow}
              >
                <Text style={styles.detailLabel}>Transaction ID</Text>
                <Text style={styles.detailValueBold}>#{transactionId}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleCopy(wallet_id, 'Wallet ID')}
                style={styles.detailRow}
              >
                <Text style={styles.detailLabel}>Paid via</Text>
                <Text style={styles.detailValueBold}>Wallet : {walletData?.Wallet_ID}</Text>
              </TouchableOpacity>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValueBold}>{date}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status</Text>
                <View style={styles.statusPillContainer}>
                  <Text style={[styles.statusLabelCompleted, { color: statusColor }]}>
                    {statusText}
                  </Text>
                  <Icon name={statusIcon} size={moderateScale(16)} color={statusColor} />
                </View>
              </View>

              <View style={[styles.detailRow, styles.noBorderRow]}>
                <Text style={styles.detailLabel}>Transfer Fee</Text>
                <Text style={styles.detailValueBold}>₹0.00</Text>
              </View>
            </View>
          </View>
        </ViewShot>

        {/* BOTTOM ACTION BUTTONS ROW */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionItem} onPress={handleSendAgain} activeOpacity={0.8}>
            <View style={styles.actionSquare}>
              <Icon name="send" size={moderateScale(18)} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Send Again</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleDownload} activeOpacity={0.8}>
            <View style={styles.actionSquare}>
              <Icon name="download" size={moderateScale(18)} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleShare} activeOpacity={0.8}>
            <View style={styles.actionSquare}>
              <Icon name="share-2" size={moderateScale(18)} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Share Receipt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleHistory} activeOpacity={0.8}>
            <View style={styles.actionSquare}>
              <Icon name="rotate-ccw" size={moderateScale(18)} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
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
    justifyContent: 'center',
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
  captureCardWrapper: {
    backgroundColor: '#FAFAFC',
  },
  gradientCard: {
    borderRadius: scale(20),
    marginTop: verticalScale(12),
    marginBottom: verticalScale(16),
    height: verticalScale(125),
    position: 'relative',
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  bgGlowOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.15,
  },
  gradientCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    height: '100%',
  },
  statusCheckImage: {
    width: scale(58),
    height: scale(58),
  },
  statusTextContainer: {
    flex: 1,
    marginLeft: scale(16),
    justifyContent: 'center',
  },
  paymentStatusText: {
    fontSize: moderateScale(13.5),
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: verticalScale(1),
  },
  amountText: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#ffffff',
  },
  recipientText: {
    fontSize: moderateScale(12),
    color: 'rgba(255, 255, 255, 0.85)',
  },
  walletIllustration: {
    width: scale(75),
    height: scale(75),
  },
  detailsCard: {
    backgroundColor: '#F2F4F4',
    borderRadius: scale(20),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(4),
    borderWidth: 1,
    borderColor: '#ECECF2',
    marginBottom: verticalScale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#9EA1A8',
  },
  noBorderRow: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: moderateScale(13),
    color: '#6B7280',
    fontWeight: '500',
  },
  detailValueBold: {
    fontSize: moderateScale(13),
    color: '#111827',
    fontWeight: '700',
  },
  statusPillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabelCompleted: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    marginRight: scale(4),
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionSquare: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(14),
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(6),
    ...theme.shadows.sm,
  },
  actionText: {
    color: '#374151',
    fontSize: moderateScale(11),
    textAlign: 'center',
    fontWeight: '500',
  },
});