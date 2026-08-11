// import React, { useState, useEffect, useMemo, useRef, useCallback, memo } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ScrollView,
//   Alert,
//   BackHandler,
//   PanResponder,
//   Animated,
//   TouchableWithoutFeedback,
//   ActivityIndicator,
//   StyleSheet,
//   Platform,
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';
// import * as Keychain from 'react-native-keychain';
// import api from '../../api/axios';
// import headerStyles from '../HomeScreen/homeStyling'; 
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { theme } from '../../MainTheme/theme';
// import { scale, verticalScale, moderateScale } from '../../utils/responsive';
// import { useAppSelector } from '../../redux/hooks';
// import { capitalizeFirstLetter } from '../../api/mainValuables';

// const { width, height } = Dimensions.get('window');
// const DRAWER_WIDTH = width * 0.76;

// function Header() {
//   const navigation = useNavigation();
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [kycLoading, setKycLoading] = useState(false);

//   const profileData = useAppSelector((state) => state.deposit.profileData);
//   const walletData = useAppSelector((state) => state.deposit.walletData);
//   const dashboardStats = useAppSelector((state) => state.deposit.dashboardStats);
//    console.log(dashboardStats,walletData,profileData,"09345")
//   const totalTransactions = dashboardStats?.totalTransactions ?? 0;
//   const successfulTransactions = dashboardStats?.successfulTransactions ?? 0;

//   const checkIsItemLocked = useCallback((accessLevel) => {
//     if (accessLevel === 'always') return false;

//     if (accessLevel === 'partial') {
//       return totalTransactions === 0;
//     }

//     if (accessLevel === 'full') {
//       return !(totalTransactions > 0 && successfulTransactions > 0 && (walletData?.Transaction_Amount ?? 0) >= 100);
//     }

//     return false;
//   }, [totalTransactions, successfulTransactions]);

//   const isProfileRestricted = useMemo(() => {
//     return !(totalTransactions > 0 && successfulTransactions > 0);
//   }, [totalTransactions, successfulTransactions]);

//   const panX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
//   const isDrawerOpen = useRef(false);

//   const openDrawer = useCallback(() => {
//     setSidebarVisible(true);
//     Animated.timing(panX, {
//       toValue: 0,
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => {
//       isDrawerOpen.current = true;
//     });
//   }, [panX]);

//   const closeDrawer = useCallback(() => {
//     panX.flattenOffset();
//     Animated.timing(panX, {
//       toValue: -DRAWER_WIDTH,
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => {
//       setSidebarVisible(false);
//       isDrawerOpen.current = false;
//     });
//   }, [panX]);

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: (_, gestureState) => {
//         if (Math.abs(gestureState.dy) > Math.abs(gestureState.dx)) return false;

//         const isLeftEdgeSwipe = !isDrawerOpen.current && gestureState.x0 < 30 && gestureState.dx > 10;
//         const isClosingSwipe = isDrawerOpen.current && gestureState.dx < -10;
        
//         return isLeftEdgeSwipe || isClosingSwipe;
//       },
//       onPanResponderGrant: () => {
//         panX.extractOffset();
//         if (!isDrawerOpen.current) {
//           setSidebarVisible(true); 
//         }
//       },
//       onPanResponderMove: (_, gestureState) => {
//         panX.setValue(gestureState.dx);
//       },
//       onPanResponderRelease: (_, gestureState) => {
//         panX.flattenOffset();
//         const { vx, dx } = gestureState;

//         let toOpen = isDrawerOpen.current;
//         if (vx > 0.5 || dx > DRAWER_WIDTH / 3) {
//           toOpen = true;
//         } else if (vx < -0.5 || dx < -DRAWER_WIDTH / 3) {
//           toOpen = false;
//         }

//         if (toOpen) {
//           openDrawer();
//         } else {
//           closeDrawer();
//         }
//       },
//     })
//   ).current;

//   const clampedTranslationX = panX.interpolate({
//     inputRange: [-DRAWER_WIDTH, 0],
//     outputRange: [-DRAWER_WIDTH, 0],
//     extrapolate: 'clamp',
//   });

//   const overlayOpacity = panX.interpolate({
//     inputRange: [-DRAWER_WIDTH, 0],
//     outputRange: [0, 0.75], 
//     extrapolate: 'clamp',
//   });

//   useEffect(() => {
//     const handleBackButton = () => {
//       if (isDrawerOpen.current) {
//         closeDrawer();
//         return true; 
//       }
//       return false; 
//     };

//     const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
//     return () => {
//       subscription.remove();
//     };
//   }, [closeDrawer]);

//   const notificationCount = 0; 

//   const menuItems = [
//     { label: 'Dashboard', icon: 'home', route: 'HomeScreen', accessLevel: 'always' },
//     { label: 'Wallet', icon: 'credit-card', route: 'WalletScreen', accessLevel: 'full' },
//     { label: 'Transactions', icon: 'refresh-cw', route: 'TransactionHistory', accessLevel: 'partial' },
//     { label: 'Markets', icon: 'trending-up', route: 'MarketScreen', accessLevel: 'full' },
//     { label: 'Rewards', icon: 'gift', route: 'ReferEarn', accessLevel: 'full' },
//     { label: 'Referrals', icon: 'users', route: 'ReferEarn', accessLevel: 'full' },
//     { label: 'Verify KYC', icon: 'file', isKycAction: true, accessLevel: 'full' },
//   ];

//   const bottomMenuItems = [
//     { label: 'Settings', icon: 'settings', route: 'SettingsScreen', accessLevel: 'always' },
//     { label: 'Support', icon: 'help-circle', route: 'SupportScreen', accessLevel: 'always' },
//     { label: 'Logout', icon: 'log-out', isLogout: true, accessLevel: 'always' },
//   ];

//   const handleLogout = async () => {
//     try {
//       closeDrawer();
//       await Keychain.resetGenericPassword();
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Login' }],
//       });
//     } catch (error) {
//       console.log('Logout error:', error);
//     }
//   };

//   const handleKycPress = async () => {
//     if (kycLoading) return;

//     try {
//       setKycLoading(true);
//       const response = await api.get('/api/kyc/details');
//       const recordsCount = response?.data?.Data?.Total_Count ?? 0;
      
//       closeDrawer();
//       const targetRoute = recordsCount === 0 ? 'KYCVerification' : 'KycDetailsCheck';
//       navigation.navigate(targetRoute);
//     } catch (error) {
//       console.log('Header KYC fetch error on click:', error?.message);
//       closeDrawer();
//       navigation.navigate('KYCVerification');
//     } finally {
//       setKycLoading(false);
//     }
//   };

//   const showAccessRestrictedAlert = useCallback(() => {
//     const isPendingApproval = totalTransactions > 0 && successfulTransactions === 0;

//     if (isPendingApproval) {
//       Alert.alert(
//         'Account Pending Verification',
//         'Your transaction has been received. Please wait for approval from the administrator to unlock full feature access.',
//         [{ text: 'okay', style: 'default' }]
//       );
//     } else {
//       Alert.alert(
//         'Access Restricted',
//         'You need an active deposit to access this feature. Please complete a deposit into your wallet.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
//         ]
//       );
//     }
//   }, [totalTransactions, successfulTransactions, navigation]);

//   const handleNavigation = (item) => {
//     if (item.isLogout) {
//       handleLogout();
//       return;
//     }

//     const isLocked = checkIsItemLocked(item.accessLevel);

//     if (isLocked) {
//       closeDrawer(); 
//       showAccessRestrictedAlert();
//       return;
//     }
    
//     if (item.isKycAction) {
//       handleKycPress();
//       return;
//     }

//     closeDrawer();
//     if (item.route) {
//       navigation.navigate(item.route);
//     }
//   };

//   const handleTopProfilePress = () => {
//     if (isProfileRestricted) {
//       showAccessRestrictedAlert();
//     } else {
//       navigation.navigate('UserProfile');
//     }
//   };

//   return (
//     <>
//       <View style={headerStyles.header}>
//         <TouchableOpacity 
//           style={headerStyles.iconButton} 
//           onPress={openDrawer} 
//           activeOpacity={0.7}
//         >
//           <Icon name="menu" size={24} color={theme.colors.textMain} />
//         </TouchableOpacity>
        
//         <Image 
//           source={require('../../../assets/images/LogoContainer.png')} 
//           style={headerStyles.logo} 
//           resizeMode="contain" 
//         />
        
//         <View style={headerStyles.headerRight}>
//           <TouchableOpacity 
//             style={headerStyles.iconButton} 
//             onPress={() => navigation.navigate('Notifications')} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Icon (4).png')} 
//               style={headerStyles.headerNotificationIcon} 
//               resizeMode="contain"
//             />
//             {notificationCount > 0 && (
//               <View style={headerStyles.badge}>
//                 <Text style={headerStyles.badgeText}>{notificationCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={headerStyles.profileIconContainer} 
//             onPress={handleTopProfilePress} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Profile Icon.png')} 
//               style={[headerStyles.headerProfileImg, isProfileRestricted && { opacity: 0.5 }]} 
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View 
//         style={sidebarStyles.leftEdgeDetector} 
//         {...panResponder.panHandlers} 
//         pointerEvents={sidebarVisible ? 'none' : 'auto'}
//       />
//       {sidebarVisible && (
//         <View style={sidebarStyles.overlay}>
//           <TouchableWithoutFeedback onPress={closeDrawer}>
//             <Animated.View style={[sidebarStyles.backdropTouch, { opacity: overlayOpacity }]} />
//           </TouchableWithoutFeedback>

//           <Animated.View 
//             style={[
//               sidebarStyles.drawerContainer,
//               { transform: [{ translateX: clampedTranslationX }] }
//             ]} 
//             {...panResponder.panHandlers}
//           >
//             <View style={sidebarStyles.headerBackground}>
//               <SafeAreaView edges={['top']}>
//                 <View style={sidebarStyles.profileHeader}>
//                   <View style={sidebarStyles.userInfoRow}>
//                     <View style={sidebarStyles.avatarCircle}>
//                       <Icon name="user" size={22} color={theme.colors.primaryBlue} />
//                     </View>
//                     <View style={sidebarStyles.nameContainer}>
//                       <Text style={sidebarStyles.usernameText} numberOfLines={1}>
//                         {capitalizeFirstLetter(profileData?.Full_Name)}
//                       </Text>
//                       <Text style={sidebarStyles.payoIdText} numberOfLines={1}>
//                         {walletData?.Wallet_ID}
//                       </Text>
//                     </View>
//                   </View>

//                   <TouchableOpacity onPress={closeDrawer} style={sidebarStyles.closeBtn} activeOpacity={0.7}>
//                     <Icon name="x" size={22} color={theme.colors.bgSurface} />
//                   </TouchableOpacity>
//                 </View>
//               </SafeAreaView>
//             </View>

//             <ScrollView 
//               style={sidebarStyles.menuList}
//               contentContainerStyle={sidebarStyles.scrollContent}
//               showsVerticalScrollIndicator={false}
//             >
//               {menuItems?.map((item, index) => {
//                 const itemLocked = checkIsItemLocked(item.accessLevel);
//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     style={[sidebarStyles.menuItem, itemLocked && { opacity: 0.4 }]}
//                     onPress={() => handleNavigation(item)}
//                     activeOpacity={itemLocked ? 0.9 : 0.7}
//                     disabled={item.isKycAction && kycLoading}
//                   >
//                     <View style={sidebarStyles.menuItemLeftSection}>
//                       <View style={sidebarStyles.iconWrapper}>
//                         {item.isKycAction && kycLoading ? (
//                           <ActivityIndicator size="small" color={theme.colors.primaryBlue} />
//                         ) : (
//                           <Icon name={item.icon} size={18} color={theme.colors.primaryBlue} />
//                         )}
//                       </View>
//                       <Text style={sidebarStyles.menuItemLabel}>{item.label}</Text>
//                     </View>
//                     {itemLocked && (
//                       <Icon name="lock" size={14} color={theme.colors.grey} style={sidebarStyles.lockMargin} />
//                     )}
//                   </TouchableOpacity>
//                 );
//               })}

//               <View style={sidebarStyles.horizontalDivider} />

//               {bottomMenuItems.map((item, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={sidebarStyles.menuItem}
//                   onPress={() => handleNavigation(item)}
//                 >
//                   <View style={sidebarStyles.menuItemLeftSection}>
//                     <View style={[sidebarStyles.iconWrapper, item.isLogout && sidebarStyles.logoutIconWrapper]}>
//                       <Icon 
//                         name={item.icon} 
//                         size={18} 
//                         color={item.isLogout ? theme.colors.statusDanger : theme.colors.primaryBlue} 
//                       />
//                     </View>
//                     <Text style={[sidebarStyles.menuItemLabel, item.isLogout && sidebarStyles.logoutText]}>
//                       {item.label}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>

//           </Animated.View>
//         </View>
//       )}
//     </>
//   );
// }

// export default memo(Header);

// const sidebarStyles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: width,
//     height: height,
//     zIndex: 1000,
//     elevation: 100, 
//   },
//   backdropTouch: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#000', 
//   },
//   leftEdgeDetector: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: scale(25), 
//     height: height,
//     zIndex: 999,
//   },
//   drawerContainer: {
//     width: DRAWER_WIDTH,
//     height: '100%',
//     backgroundColor: theme.colors.bgApp, 
//     borderTopRightRadius: scale(20), 
//     borderBottomRightRadius: scale(20),
//     zIndex: 1001,
//     elevation: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 5, height: 0 },
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//   },
//   headerBackground: {
//     backgroundColor: theme.colors.primaryBlue, 
//     borderTopRightRadius: scale(20),
//     overflow: 'hidden',
//   },
//   profileHeader: {
//     paddingHorizontal: scale(16),
//     paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + verticalScale(1) : verticalScale(2),
//     paddingBottom: verticalScale(24),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   userInfoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     marginRight: scale(10),
//   },
//   nameContainer: {
//     marginLeft: scale(12),
//     flex: 1,
//   },
//   avatarCircle: {
//     width: scale(40),
//     height: scale(40),
//     borderRadius: scale(20),
//     backgroundColor: theme.colors.bgSurface,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   usernameText: {
//     color: theme.colors.bgSurface,
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//   },
//   payoIdText: {
//     color: theme.colors.bgLightPurple, 
//     fontSize: moderateScale(12),
//     marginTop: verticalScale(1),
//   },
//   closeBtn: {
//     padding: scale(4),
//   },
//   menuList: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingTop: verticalScale(16),
//     paddingHorizontal: scale(16),
//     paddingBottom: verticalScale(100),
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: verticalScale(12),
//     marginBottom: verticalScale(4),
//   },
//   menuItemLeftSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   iconWrapper: {
//     width: scale(32),
//     height: scale(32),
//     borderRadius: scale(16),
//     backgroundColor: theme.colors.borderLight, 
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoutIconWrapper: {
//     backgroundColor: '#FEE2E2', 
//   },
//   menuItemLabel: {
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//     color: theme.colors.textMain, 
//     marginLeft: scale(16),
//   },
//   lockMargin: {
//     marginRight: scale(4),
//   },
//   logoutText: {
//     color: theme.colors.statusDanger, 
//   },
//   horizontalDivider: {
//     height: 1,
//     backgroundColor: theme.colors.borderLight, 
//     marginVertical: verticalScale(16),
//   },
// });




import React, { useState, useEffect, useMemo, useRef, useCallback, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  BackHandler,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import api from '../../api/axios';
import headerStyles from '../HomeScreen/homeStyling'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../MainTheme/theme';
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { useAppSelector } from '../../redux/hooks';
import { capitalizeFirstLetter } from '../../api/mainValuables';

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.76;

function Header() {
  const navigation = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [kycLoading, setKycLoading] = useState(false);

  const profileData = useAppSelector((state) => state.deposit.profileData);
  const walletData = useAppSelector((state) => state.deposit.walletData);
  const dashboardStats = useAppSelector((state) => state.deposit.dashboardStats);
  const totalTransactions = dashboardStats?.totalTransactions ?? 0;
  const successfulTransactions = dashboardStats?.successfulTransactions ?? 0;

  const checkIsItemLocked = useCallback((accessLevel) => {
    if (accessLevel === 'always') return false;
    if (accessLevel === 'partial') return totalTransactions === 0;
    if (accessLevel === 'full') {
      return !(totalTransactions > 0 && successfulTransactions > 0 && (walletData?.Transaction_Amount ?? 0) >= 100);
    }
    return false;
  }, [totalTransactions, successfulTransactions, walletData]);

  const isProfileRestricted = useMemo(() => {
    return !(totalTransactions > 0 && successfulTransactions > 0);
  }, [totalTransactions, successfulTransactions]);

  const panX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const isDrawerOpen = useRef(false);

  const openDrawer = useCallback(() => {
    setSidebarVisible(true);
    Animated.timing(panX, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      isDrawerOpen.current = true;
    });
  }, [panX]);

  const closeDrawer = useCallback(() => {
    panX.flattenOffset();
    Animated.timing(panX, {
      toValue: -DRAWER_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setSidebarVisible(false);
      isDrawerOpen.current = false;
    });
  }, [panX]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (Math.abs(gestureState.dy) > Math.abs(gestureState.dx)) return false;
        const isLeftEdgeSwipe = !isDrawerOpen.current && gestureState.x0 < 30 && gestureState.dx > 10;
        const isClosingSwipe = isDrawerOpen.current && gestureState.dx < -10;
        return isLeftEdgeSwipe || isClosingSwipe;
      },
      onPanResponderGrant: () => {
        panX.extractOffset();
        if (!isDrawerOpen.current) {
          setSidebarVisible(true); 
        }
      },
      onPanResponderMove: (_, gestureState) => {
        panX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        panX.flattenOffset();
        const { vx, dx } = gestureState;
        let toOpen = isDrawerOpen.current;
        if (vx > 0.5 || dx > DRAWER_WIDTH / 3) {
          toOpen = true;
        } else if (vx < -0.5 || dx < -DRAWER_WIDTH / 3) {
          toOpen = false;
        }
        if (toOpen) {
          openDrawer();
        } else {
          closeDrawer();
        }
      },
    })
  ).current;

  const clampedTranslationX = panX.interpolate({
    inputRange: [-DRAWER_WIDTH, 0],
    outputRange: [-DRAWER_WIDTH, 0],
    extrapolate: 'clamp',
  });

  const overlayOpacity = panX.interpolate({
    inputRange: [-DRAWER_WIDTH, 0],
    outputRange: [0, 0.75], 
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const handleBackButton = () => {
      if (isDrawerOpen.current) {
        closeDrawer();
        return true; 
      }
      return false; 
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => subscription.remove();
  }, [closeDrawer]);

  const notificationCount = 0; 

  const menuItems = [
    { label: 'Dashboard', icon: 'home', route: 'HomeScreen', accessLevel: 'always' },
    { label: 'Wallet', icon: 'credit-card', route: 'WalletScreen', accessLevel: 'full' },
    { label: 'Transactions', icon: 'refresh-cw', route: 'TransactionHistory', accessLevel: 'partial' },
    { label: 'Markets', icon: 'trending-up', route: 'MarketScreen', accessLevel: 'full' },
    { label: 'Rewards', icon: 'gift', route: 'ReferEarn', accessLevel: 'full' },
    { label: 'Referrals', icon: 'users', route: 'ReferEarn', accessLevel: 'full' },
    { label: 'Verify KYC', icon: 'file', isKycAction: true, accessLevel: 'full' },
  ];

  const bottomMenuItems = [
    { label: 'Settings', icon: 'settings', route: 'SettingsScreen', accessLevel: 'always' },
    { label: 'Support', icon: 'help-circle', route: 'SupportScreen', accessLevel: 'always' },
    { label: 'Logout', icon: 'log-out', isLogout: true, accessLevel: 'always' },
  ];

  const handleLogout = async () => {
    try {
      closeDrawer();
      await Keychain.resetGenericPassword();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  // ✅ UPDATED: Added conditions to intercept the "Under Review / Pending" status
  const handleKycPress = async () => {
    if (kycLoading) return;

    try {
      setKycLoading(true);
      const response = await api.get('/api/kyc/details');
      
      const kycData = response?.data?.Data || response?.data || {};
      const recordsCount = kycData?.Total_Count ?? 0;
      
      // Extract status safely, handle null/undefined
      const status = (kycData?.kycStatus || kycData?.status || kycData?.kyc_status || '').toLowerCase();
      
      closeDrawer();
      
      let targetRoute = 'KYCVerification';
      
      if (recordsCount > 0) {
        // Route to KycUnderReview if pending admin approval
        if (status === 'pending' || status === 'under review' || status === 'under_review') {
          targetRoute = 'KycUnderReview';
        } else {
          // Otherwise, proceed to details check (usually for approved/rejected state logic)
          targetRoute = 'KycDetailsCheck';
        }
      }
      
      navigation.navigate(targetRoute);
    } catch (error) {
      console.log('Header KYC fetch error on click:', error?.message);
      closeDrawer();
      navigation.navigate('KYCVerification');
    } finally {
      setKycLoading(false);
    }
  };

  const showAccessRestrictedAlert = useCallback(() => {
    const isPendingApproval = totalTransactions > 0 && successfulTransactions === 0;

    if (isPendingApproval) {
      Alert.alert(
        'Account Pending Verification',
        'Your transaction has been received. Please wait for approval from the administrator to unlock full feature access.',
        [{ text: 'okay', style: 'default' }]
      );
    } else {
      Alert.alert(
        'Access Restricted',
        'You need an active deposit to access this feature. Please complete a deposit into your wallet.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
        ]
      );
    }
  }, [totalTransactions, successfulTransactions, navigation]);

  const handleNavigation = (item) => {
    if (item.isLogout) {
      handleLogout();
      return;
    }
    const isLocked = checkIsItemLocked(item.accessLevel);
    if (isLocked) {
      closeDrawer(); 
      showAccessRestrictedAlert();
      return;
    }
    if (item.isKycAction) {
      handleKycPress();
      return;
    }

    closeDrawer();
    if (item.route) {
      navigation.navigate(item.route);
    }
  };

  const handleTopProfilePress = () => {
    if (isProfileRestricted) {
      showAccessRestrictedAlert();
    } else {
      navigation.navigate('UserProfile');
    }
  };

  return (
    <>
      <View style={headerStyles.header}>
        <TouchableOpacity style={headerStyles.iconButton} onPress={openDrawer} activeOpacity={0.7}>
          <Icon name="menu" size={24} color={theme.colors.textMain} />
        </TouchableOpacity>
        
        <Image source={require('../../../assets/images/LogoContainer.png')} style={headerStyles.logo} resizeMode="contain" />
        
        <View style={headerStyles.headerRight}>
          <TouchableOpacity style={headerStyles.iconButton} onPress={() => navigation.navigate('Notifications')} activeOpacity={0.7}>
            <Image source={require('../../../assets/images/Icon (4).png')} style={headerStyles.headerNotificationIcon} resizeMode="contain" />
            {notificationCount > 0 && (
              <View style={headerStyles.badge}>
                <Text style={headerStyles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={headerStyles.profileIconContainer} onPress={handleTopProfilePress} activeOpacity={0.7}>
            <Image source={require('../../../assets/images/Profile Icon.png')} style={[headerStyles.headerProfileImg, isProfileRestricted && { opacity: 0.5 }]} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={sidebarStyles.leftEdgeDetector} {...panResponder.panHandlers} pointerEvents={sidebarVisible ? 'none' : 'auto'} />
      
      {sidebarVisible && (
        <View style={sidebarStyles.overlay}>
          <TouchableWithoutFeedback onPress={closeDrawer}>
            <Animated.View style={[sidebarStyles.backdropTouch, { opacity: overlayOpacity }]} />
          </TouchableWithoutFeedback>

          <Animated.View style={[sidebarStyles.drawerContainer, { transform: [{ translateX: clampedTranslationX }] }]} {...panResponder.panHandlers}>
            <View style={sidebarStyles.headerBackground}>
              <SafeAreaView edges={['top']}>
                <View style={sidebarStyles.profileHeader}>
                  <View style={sidebarStyles.userInfoRow}>
                    <View style={sidebarStyles.avatarCircle}>
                      <Icon name="user" size={22} color={theme.colors.primaryBlue} />
                    </View>
                    <View style={sidebarStyles.nameContainer}>
                      <Text style={sidebarStyles.usernameText} numberOfLines={1}>{capitalizeFirstLetter(profileData?.Full_Name)}</Text>
                      <Text style={sidebarStyles.payoIdText} numberOfLines={1}>{walletData?.Wallet_ID}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={closeDrawer} style={sidebarStyles.closeBtn} activeOpacity={0.7}>
                    <Icon name="x" size={22} color={theme.colors.bgSurface} />
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </View>

            <ScrollView style={sidebarStyles.menuList} contentContainerStyle={sidebarStyles.scrollContent} showsVerticalScrollIndicator={false}>
              {menuItems?.map((item, index) => {
                const itemLocked = checkIsItemLocked(item.accessLevel);
                return (
                  <TouchableOpacity key={index} style={[sidebarStyles.menuItem, itemLocked && { opacity: 0.4 }]} onPress={() => handleNavigation(item)} activeOpacity={itemLocked ? 0.9 : 0.7} disabled={item.isKycAction && kycLoading}>
                    <View style={sidebarStyles.menuItemLeftSection}>
                      <View style={sidebarStyles.iconWrapper}>
                        {item.isKycAction && kycLoading ? (
                          <ActivityIndicator size="small" color={theme.colors.primaryBlue} />
                        ) : (
                          <Icon name={item.icon} size={18} color={theme.colors.primaryBlue} />
                        )}
                      </View>
                      <Text style={sidebarStyles.menuItemLabel}>{item.label}</Text>
                    </View>
                    {itemLocked && <Icon name="lock" size={14} color={theme.colors.grey} style={sidebarStyles.lockMargin} />}
                  </TouchableOpacity>
                );
              })}
              <View style={sidebarStyles.horizontalDivider} />
              {bottomMenuItems.map((item, index) => (
                <TouchableOpacity key={index} style={sidebarStyles.menuItem} onPress={() => handleNavigation(item)}>
                  <View style={sidebarStyles.menuItemLeftSection}>
                    <View style={[sidebarStyles.iconWrapper, item.isLogout && sidebarStyles.logoutIconWrapper]}>
                      <Icon name={item.icon} size={18} color={item.isLogout ? theme.colors.statusDanger : theme.colors.primaryBlue} />
                    </View>
                    <Text style={[sidebarStyles.menuItemLabel, item.isLogout && sidebarStyles.logoutText]}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      )}
    </>
  );
}

export default memo(Header);

const sidebarStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 1000,
    elevation: 100, 
  },
  backdropTouch: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000', 
  },
  leftEdgeDetector: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: scale(25), 
    height: height,
    zIndex: 999,
  },
  drawerContainer: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: theme.colors.bgApp, 
    borderTopRightRadius: scale(20), 
    borderBottomRightRadius: scale(20),
    zIndex: 1001,
    elevation: 30,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  headerBackground: {
    backgroundColor: theme.colors.primaryBlue, 
    borderTopRightRadius: scale(20),
    overflow: 'hidden',
  },
  profileHeader: {
    paddingHorizontal: scale(16),
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + verticalScale(1) : verticalScale(2),
    paddingBottom: verticalScale(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: scale(10),
  },
  nameContainer: {
    marginLeft: scale(12),
    flex: 1,
  },
  avatarCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: theme.colors.bgSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameText: {
    color: theme.colors.bgSurface,
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
  payoIdText: {
    color: theme.colors.bgLightPurple, 
    fontSize: moderateScale(12),
    marginTop: verticalScale(1),
  },
  closeBtn: {
    padding: scale(4),
  },
  menuList: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: verticalScale(16),
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(100),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(4),
  },
  menuItemLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: theme.colors.borderLight, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIconWrapper: {
    backgroundColor: '#FEE2E2', 
  },
  menuItemLabel: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: theme.colors.textMain, 
    marginLeft: scale(16),
  },
  lockMargin: {
    marginRight: scale(4),
  },
  logoutText: {
    color: theme.colors.statusDanger, 
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: theme.colors.borderLight, 
    marginVertical: verticalScale(16),
  },
});