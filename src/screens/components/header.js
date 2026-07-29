// // Header.js

// import React from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import { moderateScale } from 'react-native-size-matters';
// import styles from '../HomeScreen/homeStyling';

// export default function Header({
//   type = 'default',
//   title,
//   id,
// }) {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.header}>
//       {type === 'wallet' ? (
//         <View style={localStyles.walletBlock}>
//           <Text style={localStyles.walletTitle}>
//             {title || 'Wallet'}
//           </Text>

//           <Text style={styles.walletNumber}>
//             {id}
//           </Text>
//         </View>
//       ) : (
//         <View style={localStyles.emptyLeft} />
//       )}

//       <View style={styles.headerRight}>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={localStyles.notificationBtn}
//           onPress={() =>
//             navigation.navigate('Notifications')
//           }>
//           <Icon
//             name="bell"
//             size={moderateScale(20)}
//             color="#fff"
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.profileIcon}
//           onPress={() =>
//             navigation.navigate('UserProfile')
//           }>
//           <Icon
//             name="user"
//             size={moderateScale(16)}
//             color="#000"
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const localStyles = {
//   walletBlock: {
//     justifyContent: 'center',
//   },

//   walletTitle: {
//     color: '#fff',
//     fontSize: moderateScale(17),
//     fontWeight: '700',
//     marginBottom: hp('0.3%'),
//   },

//   notificationBtn: {
//     padding: wp('1.2%'),
//   },

//   emptyLeft: {
//     width: wp('15%'),
//   },
// };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import styles from '../HomeScreen/homeStyling'; // Points to your existing styles configuration

// export default function Header({ 
 
//  }) {
//   return (
//     <View style={styles.header}>
//       {/* Left Menu Trigger */}
//       <TouchableOpacity style={styles.iconButton} onPress={onMenuPress} activeOpacity={0.7}>
//         <Icon name="menu" size={24} color="#1f2937" />
//       </TouchableOpacity>
      
//       {/* Brand Logo Alignment Zone */}
//       <Image 
//         source={require('../../../assets/images/LogoContainer.png')} 
//         style={styles.logo} 
//         resizeMode="contain" 
//       />
      
//       {/* Right Operations Cluster */}
//       <View style={styles.headerRight}>
//         {/* Notification Alert Target */}
//         <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress} activeOpacity={0.7}>
//           <Image 
//             source={require('../../../assets/images/Icon (4).png')} 
//             style={styles.headerNotificationIcon} 
//             resizeMode="contain"
//           />
//           {notificationCount > 0 && (
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>{notificationCount}</Text>
//             </View>
//           )}
//         </TouchableOpacity>

//         {/* Profile Anchor View */}
//         <TouchableOpacity style={styles.profileIconContainer} onPress={onProfilePress} activeOpacity={0.7}>
//           <Image 
//             source={require('../../../assets/images/Profile Icon.png')} 
//             style={styles.headerProfileImg} 
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
//   TouchableWithoutFeedback,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import styles from '../HomeScreen/homeStyling'; 

// const { width, height } = Dimensions.get('window');

// export default function Header() {
//   const navigation = useNavigation();
//   const [sidebarVisible, setSidebarVisible] = useState(false);
  
//   const notificationCount = 3; 

//   const menuItems = [
//     { label: 'Dashboard', icon: 'home', route: 'HomeScreen' },
//     { label: 'Wallet', icon: 'credit-card', route: 'WalletScreen' },
//     { label: 'Markets', icon: 'trending-up', route: 'MarketScreen' },
//     { label: 'Portfolio', icon: 'bar-chart-2', route: 'PortfolioScreen' },
//     { label: 'Transactions', icon: 'refresh-cw', route: 'TransactionsScreen' },
//     { label: 'Rewards', icon: 'gift', route: 'RewardsScreen' },
//     { label: 'Referrals', icon: 'users', route: 'ReferralsScreen' },
//   ];

//   const bottomMenuItems = [
//     { label: 'Settings', icon: 'settings', route: 'SettingsScreen' },
//     { label: 'Support', icon: 'help-circle', route: 'SupportScreen' },
//     { label: 'Logout', icon: 'log-out', route: 'LoginScreen', isLogout: true },
//   ];

//   const handleNavigation = (routeName) => {
//     setSidebarVisible(false);
//     if (routeName) {
//       navigation.navigate(routeName);
//     }
//   };

//   return (
//     <>
//       <View style={styles.header}>
//         {/* Left Menu Trigger */}
//         <TouchableOpacity 
//           style={styles.iconButton} 
//           onPress={() => setSidebarVisible(true)} 
//           activeOpacity={0.7}
//         >
//           <Icon name="menu" size={24} color="#1f2937" />
//         </TouchableOpacity>
        
//         {/* Brand Logo */}
//         <Image 
//           source={require('../../../assets/images/LogoContainer.png')} 
//           style={styles.logo} 
//           resizeMode="contain" 
//         />
        
//         {/* Right Operations Cluster */}
//         <View style={styles.headerRight}>
//           <TouchableOpacity 
//             style={styles.iconButton} 
//             onPress={() => navigation.navigate('Notifications')} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Icon (4).png')} 
//               style={styles.headerNotificationIcon} 
//               resizeMode="contain"
//             />
//             {notificationCount > 0 && (
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{notificationCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.profileIconContainer} 
//             onPress={() => navigation.navigate('UserProfile')} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Profile Icon.png')} 
//               style={styles.headerProfileImg} 
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Inline Sidebar Overlay Drawer */}
//       {sidebarVisible && (
//         <View style={sidebarStyles.overlay}>
//           {/* Absolute backdrop position catches taps anywhere outside the menu container */}
//           <TouchableWithoutFeedback onPress={() => setSidebarVisible(false)}>
//             <View style={sidebarStyles.backdropTouch} />
//           </TouchableWithoutFeedback>

//           {/* Drawer Body content Container */}
//           <View style={sidebarStyles.drawerContainer}>
//             <SafeAreaView style={sidebarStyles.safeAreaContainer}>
              
//               {/* Profile Header Block */}
//               <View style={sidebarStyles.profileHeader}>
//                 <View style={sidebarStyles.userInfoRow}>
//                   <View style={sidebarStyles.avatarCircle}>
//                     <Icon name="user" size={22} color="#2b5ce0" />
//                   </View>
//                   <View style={sidebarStyles.nameContainer}>
//                     <Text style={sidebarStyles.usernameText}>Username 1</Text>
//                     <Text style={sidebarStyles.payoIdText}>PAYO-9831</Text>
//                   </View>
//                 </View>
//                 <TouchableOpacity onPress={() => setSidebarVisible(false)} style={sidebarStyles.closeBtn}>
//                   <Icon name="x" size={20} color="#fff" />
//                 </TouchableOpacity>
//               </View>

//               {/* Main Scrolling Navigation Menu Rows */}
//               <ScrollView 
//                 style={sidebarStyles.menuList}
//                 contentContainerStyle={sidebarStyles.scrollContent} // Added internal padding here
//                 showsVerticalScrollIndicator={false}
//               >
//                 {menuItems?.map((item, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={sidebarStyles.menuItem}
//                     onPress={() => handleNavigation(item.route)}
//                   >
//                     <View style={sidebarStyles.iconWrapper}>
//                       <Icon name={item.icon} size={18} color="#2b5ce0" />
//                     </View>
//                     <Text style={sidebarStyles.menuItemLabel}>{item.label}</Text>
//                   </TouchableOpacity>
//                 ))}

//                 <View style={sidebarStyles.horizontalDivider} />

//                 {/* Bottom Settings & Logout Area */}
//                 {bottomMenuItems.map((item, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={sidebarStyles.menuItem}
//                     onPress={() => handleNavigation(item.route)}
//                   >
//                     <View style={[sidebarStyles.iconWrapper, item.isLogout && sidebarStyles.logoutIconWrapper]}>
//                       <Icon name={item.icon} size={18} color={item.isLogout ? '#ef4444' : '#2b5ce0'} />
//                     </View>
//                     <Text style={[sidebarStyles.menuItemLabel, item.isLogout && sidebarStyles.logoutText]}>
//                       {item.label}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>

//             </SafeAreaView>
//           </View>
//         </View>
//       )}
//     </>
//   );
// }

// const sidebarStyles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: width,
//     height: height,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     zIndex: 1000, 
//   },
//   backdropTouch: {
//     ...StyleSheet.absoluteFillObject, 
//   },
//   drawerContainer: {
//     width: width * 0.76,
//     height: '100%',
//     backgroundColor: '#E5E7EB', 
//   },
//   safeAreaContainer: {
//     flex: 1,
//   },
//   profileHeader: {
//     backgroundColor: '#3B60C4', 
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(20),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   userInfoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatarCircle: {
//     width: scale(40),
//     height: scale(40),
//     borderRadius: scale(20),
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   nameContainer: {
//     marginLeft: scale(12),
//   },
//   usernameText: {
//     color: '#fff',
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//   },
//   payoIdText: {
//     color: '#E0E7FF',
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
//     paddingBottom: verticalScale(65), // Creates safety padding at the bottom of list items
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: verticalScale(12),
//     marginBottom: verticalScale(4),
//   },
//   iconWrapper: {
//     width: scale(32),
//     height: scale(32),
//     borderRadius: scale(16),
//     backgroundColor: '#D1D5DB', 
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoutIconWrapper: {
//     backgroundColor: '#FEE2E2',
//   },
//   menuItemLabel: {
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//     color: '#1F2937',
//     marginLeft: scale(16),
//   },
//   logoutText: {
//     color: '#ef4444',
//   },
//   horizontalDivider: {
//     height: 1,
//     backgroundColor: '#D1D5DB',
//     marginVertical: verticalScale(16),
//   },
// });

// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
//   TouchableWithoutFeedback,
//   SafeAreaView,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import * as Keychain from 'react-native-keychain'; // Imported to handle auth token drops
// import api from '../../api/axios';
// import styles from '../HomeScreen/homeStyling'; 

// const { width, height } = Dimensions.get('window');

// export default function Header() {
//   // 1. ALL HOOKS DECLARATIONS (TOP LEVEL UNCONDITIONAL)
//   const navigation = useNavigation();
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [walletBalance, setWalletBalance] = useState(1000);

//   const isRestricted = useMemo(() => {
//     return walletBalance < 100;
//   }, [walletBalance]);

//   useEffect(() => {
//     const checkSidebarBalance = async () => {
//       try {
//         const response = await api.get('/api/wallet/balance');
//         const parsedBalance = parseFloat(String(response?.data?.balance || '0').replace(/[^\d.]/g, ''));
//         setWalletBalance(isNaN(parsedBalance) ? 0 : parsedBalance);
//       } catch (error) {
//         console.log('Sidebar wallet balance sync check failed:', error);
//       }
//     };
    
//     if (sidebarVisible) {
//       checkSidebarBalance();
//     }
//   }, [sidebarVisible]);

//   // 2. STATIC CONFIGURATIONS
//   const notificationCount = 3; 

//   const menuItems = [
//     { label: 'Dashboard', icon: 'home', route: 'HomeScreen', requiresAccess: false },
//     { label: 'Wallet', icon: 'credit-card', route: 'WalletScreen', requiresAccess: false },
//     { label: 'Markets', icon: 'trending-up', route: 'MarketScreen', requiresAccess: true },
//     { label: 'Portfolio', icon: 'bar-chart-2', route: 'PortfolioScreen', requiresAccess: true },
//     { label: 'Transactions', icon: 'refresh-cw', route: 'TransactionsScreen', requiresAccess: true },
//     { label: 'Rewards', icon: 'gift', route: 'RewardsScreen', requiresAccess: true },
//     { label: 'Referrals', icon: 'users', route: 'ReferralsScreen', requiresAccess: true },
//   ];

//   const bottomMenuItems = [
//     { label: 'Settings', icon: 'settings', route: 'SettingsScreen', requiresAccess: false },
//     { label: 'Support', icon: 'help-circle', route: 'SupportScreen', requiresAccess: false },
//     { label: 'Logout', icon: 'log-out', route: 'Login', isLogout: true, requiresAccess: false },
//   ];

//   // 3. ACTION HANDLERS
//   const handleLogout = async () => {
//     try {
//       setSidebarVisible(false);
//       await Keychain.resetGenericPassword();
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Login' }],
//       });
//     } catch (error) {
//       console.log('Logout error:', error);
//     }
//   };

//   const handleNavigation = (item) => {
//     // Intercept explicitly for logout request processing
//     if (item.isLogout) {
//       handleLogout();
//       return;
//     }

//     if (isRestricted && item.requiresAccess) {
//       setSidebarVisible(false); 
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.',
//         [
//           {
//             text: 'OK',
//             style: 'cancel',
//           },
//           {
//             text: 'Add Money',
//             onPress: () => navigation.navigate('AddMoneytoWallet'),
//           },
//         ]
//       );
//       return;
//     }
    
//     setSidebarVisible(false);
//     if (item.route) {
//       navigation.navigate(item.route);
//     }
//   };

//   const handleTopProfilePress = () => {
//     if (isRestricted) {
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.',
//         [
//           {
//             text: 'OK',
//             style: 'cancel',
//           },
//           {
//             text: 'Add Money',
//             onPress: () => navigation.navigate('AddMoneytoWallet'),
//           },
//         ]
//       );
//     } else {
//       navigation.navigate('UserProfile');
//     }
//   };

//   return (
//     <>
//       <View style={styles.header}>
//         {/* Left Menu Trigger */}
//         <TouchableOpacity 
//           style={styles.iconButton} 
//           onPress={() => setSidebarVisible(true)} 
//           activeOpacity={0.7}
//         >
//           <Icon name="menu" size={24} color="#1f2937" />
//         </TouchableOpacity>
        
//         {/* Brand Logo */}
//         <Image 
//           source={require('../../../assets/images/LogoContainer.png')} 
//           style={styles.logo} 
//           resizeMode="contain" 
//         />
        
//         {/* Right Operations Cluster */}
//         <View style={styles.headerRight}>
//           <TouchableOpacity 
//             style={styles.iconButton} 
//             onPress={() => navigation.navigate('Notifications')} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Icon (4).png')} 
//               style={styles.headerNotificationIcon} 
//               resizeMode="contain"
//             />
//             {notificationCount > 0 && (
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{notificationCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.profileIconContainer} 
//             onPress={handleTopProfilePress} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Profile Icon.png')} 
//               style={[styles.headerProfileImg, isRestricted && { opacity: 0.5 }]} 
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Inline Sidebar Overlay Drawer */}
//       {sidebarVisible && (
//         <View style={sidebarStyles.overlay}>
//           <TouchableWithoutFeedback onPress={() => setSidebarVisible(false)}>
//             <View style={sidebarStyles.backdropTouch} />
//           </TouchableWithoutFeedback>

//           <View style={sidebarStyles.drawerContainer}>
//             <SafeAreaView style={sidebarStyles.safeAreaContainer}>
              
//               {/* Profile Header Block */}
//               <View style={sidebarStyles.profileHeader}>
//                 <View style={sidebarStyles.userInfoRow}>
//                   <View style={sidebarStyles.avatarCircle}>
//                     <Icon name="user" size={22} color="#2b5ce0" />
//                   </View>
//                   <View style={sidebarStyles.nameContainer}>
//                     <Text style={sidebarStyles.usernameText}>Username 1</Text>
//                     <Text style={sidebarStyles.payoIdText}>PAYO-9831</Text>
//                   </View>
//                 </View>
//                 <TouchableOpacity onPress={() => setSidebarVisible(false)} style={sidebarStyles.closeBtn}>
//                   <Icon name="x" size={20} color="#fff" />
//                 </TouchableOpacity>
//               </View>

//               {/* Main Scrolling Navigation Menu Rows */}
//               <ScrollView 
//                 style={sidebarStyles.menuList}
//                 contentContainerStyle={sidebarStyles.scrollContent}
//                 showsVerticalScrollIndicator={false}
//               >
//                 {menuItems?.map((item, index) => {
//                   const itemLocked = isRestricted && item.requiresAccess;
//                   return (
//                     <TouchableOpacity
//                       key={index}
//                       style={[sidebarStyles.menuItem, itemLocked && { opacity: 0.4 }]}
//                       onPress={() => handleNavigation(item)}
//                       activeOpacity={itemLocked ? 0.9 : 0.7}
//                     >
//                       <View style={sidebarStyles.menuItemLeftSection}>
//                         <View style={sidebarStyles.iconWrapper}>
//                           <Icon name={item.icon} size={18} color="#2b5ce0" />
//                         </View>
//                         <Text style={sidebarStyles.menuItemLabel}>{item.label}</Text>
//                       </View>
//                       {itemLocked && (
//                         <Icon name="lock" size={14} color="#6B7280" style={sidebarStyles.lockMargin} />
//                       )}
//                     </TouchableOpacity>
//                   );
//                 })}

//                 <View style={sidebarStyles.horizontalDivider} />

//                 {/* Bottom Settings & Logout Area */}
//                 {bottomMenuItems.map((item, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={sidebarStyles.menuItem}
//                     onPress={() => handleNavigation(item)}
//                   >
//                     <View style={sidebarStyles.menuItemLeftSection}>
//                       <View style={[sidebarStyles.iconWrapper, item.isLogout && sidebarStyles.logoutIconWrapper]}>
//                         <Icon name={item.icon} size={18} color={item.isLogout ? '#ef4444' : '#2b5ce0'} />
//                       </View>
//                       <Text style={[sidebarStyles.menuItemLabel, item.isLogout && sidebarStyles.logoutText]}>
//                         {item.label}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>

//             </SafeAreaView>
//           </View>
//         </View>
//       )}
//     </>
//   );
// }

// const sidebarStyles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: width,
//     height: height,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     zIndex: 1000, 
//   },
//   backdropTouch: {
//     ...StyleSheet.absoluteFillObject, 
//   },
//   drawerContainer: {
//     width: width * 0.76,
//     height: '100%',
//     backgroundColor: '#E5E7EB', 
//   },
//   safeAreaContainer: {
//     flex: 1,
//   },
//   profileHeader: {
//     backgroundColor: '#3B60C4', 
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(20),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   userInfoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatarCircle: {
//     width: scale(40),
//     height: scale(40),
//     borderRadius: scale(20),
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   nameContainer: {
//     marginLeft: scale(12),
//   },
//   usernameText: {
//     color: '#fff',
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//   },
//   payoIdText: {
//     color: '#E0E7FF',
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
//     paddingBottom: verticalScale(65),
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
//     backgroundColor: '#D1D5DB', 
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoutIconWrapper: {
//     backgroundColor: '#FEE2E2',
//   },
//   menuItemLabel: {
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//     color: '#1F2937',
//     marginLeft: scale(16),
//   },
//   lockMargin: {
//     marginRight: scale(4),
//   },
//   logoutText: {
//     color: '#ef4444',
//   },
//   horizontalDivider: {
//     height: 1,
//     backgroundColor: '#D1D5DB',
//     marginVertical: verticalScale(16),
//   },
// });
///////////////////////////////////////////////////////////
//updated sidebar (rajesh)




import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  BackHandler,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import api from '../../api/axios';
import styles from '../HomeScreen/homeStyling'; 
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Custom Theme & Responsiveness Imports ---
import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { theme } from '../../MainTheme/theme';
import { useAppSelector } from '../../redux/hooks';

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.76;


export default function Header() {
  const navigation = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [kycRecords, setKycRecords] = useState([]);

  const walletData = useAppSelector((state) => state.deposit.walletData);
  const tabWalletBalance = walletData?.Available_Balance || 0;

  // Fetch transaction history to check total records count
  const fetchTransactions = async () => {
    try {
      const res = await api.get('/api/wallet/deposit-history');
      const rawList = res?.data?.Transactions || [];
      const recordsCount = res?.data?.TotalRecords || 0;

      setTransactions(rawList);
      setTotalRecords(recordsCount);
    } catch (err) {
      console.log('Header transaction fetch error:', err.message);
    }
  };
   const fetchKYCDetails = async () => {
    try {
      const response = await api.get('/api/kyc/details');
      if (response?.data?.status === '200' || response?.data?.Data) {
        setKycRecords(response?.data?.Data?.Total_Count);
      }
    } catch (error) {
      Alert.alert('Error', error?.message || 'Failed to fetch KYC details.');
    } finally {
     
    }
  };
  console.log(kycRecords,"kycRecords")

   const isRestricted = useMemo(() => {
    const hasTransactions = totalRecords > 0;

    // Restricted ONLY if user has 0 records
    return !hasTransactions;
  }, [totalRecords]);

  // Animation values for smooth swiping
  const panX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const isDrawerOpen = useRef(false);

  const openDrawer = () => {
    panX.flattenOffset();
    setSidebarVisible(true);
    Animated.timing(panX, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      isDrawerOpen.current = true;
    });
  };

  const closeDrawer = () => {
    panX.flattenOffset();
    Animated.timing(panX, {
      toValue: -DRAWER_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setSidebarVisible(false);
      isDrawerOpen.current = false;
    });
  };

  // Unified PanResponder for both Opening and Closing
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
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
      onPanResponderMove: (evt, gestureState) => {
        panX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (evt, gestureState) => {
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
    fetchTransactions();
    fetchKYCDetails();
  }, []);

  useEffect(() => {
    if (sidebarVisible) {
      fetchTransactions();
    }
  }, [sidebarVisible]);

  // Safe Hardware Back Interception
  useEffect(() => {
    const handleBackButton = () => {
      if (sidebarVisible) {
        closeDrawer();
        return true; 
      }
      return false; 
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      subscription.remove();
    };
  }, [sidebarVisible]);

  const notificationCount = 0; 

  const menuItems = [
    { label: 'Dashboard', icon: 'home', route: 'HomeScreen', requiresAccess: false },
    { label: 'Wallet', icon: 'credit-card', route: 'WalletScreen', requiresAccess: false },
    { label: 'Markets', icon: 'trending-up', route: 'MarketScreen', requiresAccess: true },
    { label: 'Portfolio', icon: 'bar-chart-2', route: 'PortfolioScreen', requiresAccess: true },
    { label: 'Transactions', icon: 'refresh-cw', route: 'TransactionHistory', requiresAccess: true },
    { label: 'Rewards', icon: 'gift', route: 'ReferEarn', requiresAccess: true },
    { label: 'Referrals', icon: 'users', route: 'ReferEarn', requiresAccess: true },
    { label: 'Verify KYC', icon: 'file', route: kycRecords ==0 ? "KYCVerification":'KycDetailsCheck', requiresAccess: true },
  ];

  const bottomMenuItems = [
    { label: 'Settings', icon: 'settings', route: 'SettingsScreen', requiresAccess: false },
    { label: 'Support', icon: 'help-circle', route: 'SupportScreen', requiresAccess: false },
    { label: 'Logout', icon: 'log-out', route: 'Login', isLogout: true, requiresAccess: false },
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

  const handleNavigation = (item) => {
    if (item.isLogout) {
      handleLogout();
      return;
    }

    if (isRestricted && item.requiresAccess) {
      closeDrawer(); 
      Alert.alert(
        'Access Restricted',
        'You are unable to access this. Please add money to your wallet.',
        [
          { text: 'OK', style: 'cancel' },
          { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
        ]
      );
      return;
    }
    
    closeDrawer();
    if (item.route) {
      navigation.navigate(item.route);
    }
  };

  const handleTopProfilePress = () => {
    if (isRestricted) {
      Alert.alert(
        'Access Restricted',
        'You are unable to access this. Please add money to your wallet.',
        [
          { text: 'OK', style: 'cancel' },
          { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
        ]
      );
    } else {
      navigation.navigate('UserProfile');
    }
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={openDrawer} 
          activeOpacity={0.7}
        >
          <Icon name="menu" size={24} color={theme.colors.textMain} />
        </TouchableOpacity>
        
        <Image 
          source={require('../../../assets/images/LogoContainer.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.navigate('Notifications')} 
            activeOpacity={0.7}
          >
            <Image 
              source={require('../../../assets/images/Icon (4).png')} 
              style={styles.headerNotificationIcon} 
              resizeMode="contain"
            />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.profileIconContainer} 
            onPress={handleTopProfilePress} 
            activeOpacity={0.7}
          >
            <Image 
              source={require('../../../assets/images/Profile Icon.png')} 
              style={[styles.headerProfileImg, isRestricted && { opacity: 0.5 }]} 
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Invisible Left Edge Swipe Detector for Opening Sidebar */}
      <View 
        style={sidebarStyles.leftEdgeDetector} 
        {...panResponder.panHandlers} 
        pointerEvents={sidebarVisible ? 'none' : 'auto'}
      />

      {/* Inline Sidebar Overlay Drawer */}
      {sidebarVisible && (
        <View style={sidebarStyles.overlay}>
          {/* Touch-to-Close Dark Backdrop Layer */}
          <TouchableWithoutFeedback onPress={closeDrawer}>
            <Animated.View style={[sidebarStyles.backdropTouch, { opacity: overlayOpacity }]} />
          </TouchableWithoutFeedback>

          <Animated.View 
            style={[
              sidebarStyles.drawerContainer,
              { transform: [{ translateX: clampedTranslationX }] }
            ]} 
            {...panResponder.panHandlers}
          >
            <View style={sidebarStyles.headerBackground}>
              <SafeAreaView>
                <View style={sidebarStyles.profileHeader}>
                  <View style={sidebarStyles.userInfoRow}>
                    <View style={sidebarStyles.avatarCircle}>
                      <Icon name="user" size={22} color={theme.colors.primaryBlue} />
                    </View>
                    <View style={sidebarStyles.nameContainer}>
                      <Text style={sidebarStyles.usernameText}>Username 1</Text>
                      <Text style={sidebarStyles.payoIdText}>PAYO-9831</Text>
                    </View>
                  </View>

                  <TouchableOpacity onPress={closeDrawer} style={sidebarStyles.closeBtn} activeOpacity={0.7}>
                    <Icon name="x" size={22} color={theme.colors.bgSurface} />
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </View>

            <ScrollView 
              style={sidebarStyles.menuList}
              contentContainerStyle={sidebarStyles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {menuItems?.map((item, index) => {
                const itemLocked = isRestricted && item.requiresAccess;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[sidebarStyles.menuItem, itemLocked && { opacity: 0.4 }]}
                    onPress={() => handleNavigation(item)}
                    activeOpacity={itemLocked ? 0.9 : 0.7}
                  >
                    <View style={sidebarStyles.menuItemLeftSection}>
                      <View style={sidebarStyles.iconWrapper}>
                        <Icon name={item.icon} size={18} color={theme.colors.primaryBlue} />
                      </View>
                      <Text style={sidebarStyles.menuItemLabel}>{item.label}</Text>
                    </View>
                    {itemLocked && (
                      <Icon name="lock" size={14} color={theme.colors.grey} style={sidebarStyles.lockMargin} />
                    )}
                  </TouchableOpacity>
                );
              })}

              <View style={sidebarStyles.horizontalDivider} />

              {bottomMenuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={sidebarStyles.menuItem}
                  onPress={() => handleNavigation(item)}
                >
                  <View style={sidebarStyles.menuItemLeftSection}>
                    <View style={[sidebarStyles.iconWrapper, item.isLogout && sidebarStyles.logoutIconWrapper]}>
                      <Icon name={item.icon} size={18} color={item.isLogout ? theme.colors.statusDanger : theme.colors.primaryBlue} />
                    </View>
                    <Text style={[sidebarStyles.menuItemLabel, item.isLogout && sidebarStyles.logoutText]}>
                      {item.label}
                    </Text>
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

// export default function Header() {
//   const navigation = useNavigation();
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   // const [walletBalance, setWalletBalance] = useState(1000);
//   const walletData = useAppSelector((state) => state.deposit.walletData);
    
//     const tabWalletBalance = walletData?.Available_Balance

//   const isRestricted = useMemo(() => {
//     return tabWalletBalance < 100;
//   }, [tabWalletBalance]);

//   // Animation values for smooth swiping
//   const panX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
//   const isDrawerOpen = useRef(false);

//   const openDrawer = () => {
//     panX.flattenOffset();
//     setSidebarVisible(true);
//     Animated.timing(panX, {
//       toValue: 0,
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => {
//       isDrawerOpen.current = true;
//     });
//   };

//   const closeDrawer = () => {
//     panX.flattenOffset();
//     Animated.timing(panX, {
//       toValue: -DRAWER_WIDTH,
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => {
//       setSidebarVisible(false);
//       isDrawerOpen.current = false;
//     });
//   };

//   // Unified PanResponder for both Opening and Closing
//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: (evt, gestureState) => {
//         // Prevent vertical scrolling from triggering the drawer
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
//       onPanResponderMove: (evt, gestureState) => {
//         panX.setValue(gestureState.dx);
//       },
//       onPanResponderRelease: (evt, gestureState) => {
//         panX.flattenOffset();
//         const { vx, dx } = gestureState;

//         // Decide whether to open or close based on velocity and swipe distance
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

//   // Interpolate values to constrain movement limits and fade background
//   const clampedTranslationX = panX.interpolate({
//     inputRange: [-DRAWER_WIDTH, 0],
//     outputRange: [-DRAWER_WIDTH, 0],
//     extrapolate: 'clamp',
//   });

//   // Controls the dark background fading in and out
//   const overlayOpacity = panX.interpolate({
//     inputRange: [-DRAWER_WIDTH, 0],
//     outputRange: [0, 0.75], 
//     extrapolate: 'clamp',
//   });

//   // Handle Wallet Balance Fetching
//   useEffect(() => {
//     const checkSidebarBalance = async () => {
//       try {
//         const response = await api.get('/api/wallet/balance');
//         const parsedBalance = parseFloat(String(response?.data?.balance || '0').replace(/[^\d.]/g, ''));
//         setWalletBalance(isNaN(parsedBalance) ? 0 : parsedBalance);
//       } catch (error) {
//         console.log('Sidebar wallet balance sync check failed:', error);
//       }
//     };
    
//     if (sidebarVisible) {
//       checkSidebarBalance();
//     }
//   }, [sidebarVisible]);

//   // Safe Hardware Back Interception
//   useEffect(() => {
//     const handleBackButton = () => {
//       if (sidebarVisible) {
//         closeDrawer();
//         return true; 
//       }
//       return false; 
//     };

//     const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
//     return () => {
//       subscription.remove();
//     };
//   }, [sidebarVisible]);

//   // Configurations
//   const notificationCount = 3; 

//   const menuItems = [
//     { label: 'Dashboard', icon: 'home', route: 'HomeScreen', requiresAccess: false },
//     { label: 'Wallet', icon: 'credit-card', route: 'WalletScreen', requiresAccess: false },
//     { label: 'Markets', icon: 'trending-up', route: 'MarketScreen', requiresAccess: true },
//     { label: 'Portfolio', icon: 'bar-chart-2', route: 'PortfolioScreen', requiresAccess: true },
//     { label: 'Transactions', icon: 'refresh-cw', route: 'TransactionHistory', requiresAccess: true },
//     { label: 'Rewards', icon: 'gift', route: 'ReferEarn', requiresAccess: true },
//     { label: 'Referrals', icon: 'users', route: 'ReferEarn', requiresAccess: true },
//     { label: 'Verify KYC', icon: 'file', route: 'KYCVerification', requiresAccess: true },
//   ];

//   const bottomMenuItems = [
//     { label: 'Settings', icon: 'settings', route: 'SettingsScreen', requiresAccess: false },
//     { label: 'Support', icon: 'help-circle', route: 'SupportScreen', requiresAccess: false },
//     { label: 'Logout', icon: 'log-out', route: 'Login', isLogout: true, requiresAccess: false },
//   ];

//   // Action Handlers
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

//   const handleNavigation = (item) => {
//     if (item.isLogout) {
//       handleLogout();
//       return;
//     }

//     if (isRestricted && item.requiresAccess) {
//       closeDrawer(); 
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.',
//         [
//           { text: 'OK', style: 'cancel' },
//           { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
//         ]
//       );
//       return;
//     }
    
//     closeDrawer();
//     if (item.route) {
//       navigation.navigate(item.route);
//     }
//   };

//   const handleTopProfilePress = () => {
//     if (isRestricted) {
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.',
//         [
//           { text: 'OK', style: 'cancel' },
//           { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
//         ]
//       );
//     } else {
//       navigation.navigate('UserProfile');
//     }
//   };

//   return (
//     <>
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.iconButton} 
//           onPress={openDrawer} 
//           activeOpacity={0.7}
//         >
//           <Icon name="menu" size={24} color={theme.colors.textMain} />
//         </TouchableOpacity>
        
//         <Image 
//           source={require('../../../assets/images/LogoContainer.png')} 
//           style={styles.logo} 
//           resizeMode="contain" 
//         />
        
//         <View style={styles.headerRight}>
//           <TouchableOpacity 
//             style={styles.iconButton} 
//             onPress={() => navigation.navigate('Notifications')} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Icon (4).png')} 
//               style={styles.headerNotificationIcon} 
//               resizeMode="contain"
//             />
//             {notificationCount > 0 && (
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{notificationCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.profileIconContainer} 
//             onPress={handleTopProfilePress} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Profile Icon.png')} 
//               style={[styles.headerProfileImg, isRestricted && { opacity: 0.5 }]} 
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Invisible Left Edge Swipe Detector for Opening Sidebar */}
//       <View 
//         style={sidebarStyles.leftEdgeDetector} 
//         {...panResponder.panHandlers} 
//         pointerEvents={sidebarVisible ? 'none' : 'auto'}
//       />

//       {/* Inline Sidebar Overlay Drawer */}
//       {sidebarVisible && (
//         <View style={sidebarStyles.overlay}>
//           {/* Touch-to-Close Dark Backdrop Layer */}
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
//             {/* Dynamic Status Bar Fix implemented here inside headerBackground */}
//             <View style={sidebarStyles.headerBackground}>
//               <SafeAreaView>
//                 <View style={sidebarStyles.profileHeader}>
//                   <View style={sidebarStyles.userInfoRow}>
//                     <View style={sidebarStyles.avatarCircle}>
//                       <Icon name="user" size={22} color={theme.colors.primaryBlue} />
//                     </View>
//                     <View style={sidebarStyles.nameContainer}>
//                       <Text style={sidebarStyles.usernameText}>Username 1</Text>
//                       <Text style={sidebarStyles.payoIdText}>PAYO-9831</Text>
//                     </View>
//                   </View>

//                   {/* Added "X" Close Button */}
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
//                 const itemLocked = isRestricted && item.requiresAccess;
//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     style={[sidebarStyles.menuItem, itemLocked && { opacity: 0.4 }]}
//                     onPress={() => handleNavigation(item)}
//                     activeOpacity={itemLocked ? 0.9 : 0.7}
//                   >
//                     <View style={sidebarStyles.menuItemLeftSection}>
//                       <View style={sidebarStyles.iconWrapper}>
//                         <Icon name={item.icon} size={18} color={theme.colors.primaryBlue} />
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
//                       <Icon name={item.icon} size={18} color={item.isLogout ? theme.colors.statusDanger : theme.colors.primaryBlue} />
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

// export default function Header() {
//   const navigation = useNavigation();
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [transactions, setTransactions] = useState([]);

//   const walletData = useAppSelector((state) => state.deposit.walletData);
//   const tabWalletBalance = walletData?.Available_Balance || 0;

//   // Fetch transaction history to check count criteria
//   const fetchTransactions = async () => {
//     try {
//       const res = await api.get('/api/wallet/deposit-history');
//       const rawList = res?.data?.Transactions || [];
//       setTransactions(rawList);
//     } catch (err) {
//       console.log('Header transaction fetch error:', err.message);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   // Unrestrict access if transactions > 1 OR balance >= 100
//   const isRestricted = useMemo(() => {
//     const hasMultipleTransactions = transactions?.length > 1;
//     // const hasSufficientBalance = tabWalletBalance >= 100;

//     return 
//     // !hasSufficientBalance && 
//     !hasMultipleTransactions;
//   }, [tabWalletBalance, transactions]);

//   // Animation values for smooth swiping
//   const panX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
//   const isDrawerOpen = useRef(false);

//   const openDrawer = () => {
//     panX.flattenOffset();
//     setSidebarVisible(true);
//     Animated.timing(panX, {
//       toValue: 0,
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => {
//       isDrawerOpen.current = true;
//     });
//   };

//   const closeDrawer = () => {
//     panX.flattenOffset();
//     Animated.timing(panX, {
//       toValue: -DRAWER_WIDTH,
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => {
//       setSidebarVisible(false);
//       isDrawerOpen.current = false;
//     });
//   };

//   // Unified PanResponder for both Opening and Closing
//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: (evt, gestureState) => {
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
//       onPanResponderMove: (evt, gestureState) => {
//         panX.setValue(gestureState.dx);
//       },
//       onPanResponderRelease: (evt, gestureState) => {
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

//   // Re-fetch transactions on sidebar open to keep data fresh
//   useEffect(() => {
//     if (sidebarVisible) {
//       fetchTransactions();
//     }
//   }, [sidebarVisible]);

//   // Safe Hardware Back Interception
//   useEffect(() => {
//     const handleBackButton = () => {
//       if (sidebarVisible) {
//         closeDrawer();
//         return true; 
//       }
//       return false; 
//     };

//     const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
//     return () => {
//       subscription.remove();
//     };
//   }, [sidebarVisible]);

//   const notificationCount = 3; 

//   const menuItems = [
//     { label: 'Dashboard', icon: 'home', route: 'HomeScreen', requiresAccess: false },
//     { label: 'Wallet', icon: 'credit-card', route: 'WalletScreen', requiresAccess: false },
//     { label: 'Markets', icon: 'trending-up', route: 'MarketScreen', requiresAccess: true },
//     { label: 'Portfolio', icon: 'bar-chart-2', route: 'PortfolioScreen', requiresAccess: true },
//     { label: 'Transactions', icon: 'refresh-cw', route: 'TransactionHistory', requiresAccess: true },
//     { label: 'Rewards', icon: 'gift', route: 'ReferEarn', requiresAccess: true },
//     { label: 'Referrals', icon: 'users', route: 'ReferEarn', requiresAccess: true },
//     { label: 'Verify KYC', icon: 'file', route: 'KYCVerification', requiresAccess: true },
//   ];

//   const bottomMenuItems = [
//     { label: 'Settings', icon: 'settings', route: 'SettingsScreen', requiresAccess: false },
//     { label: 'Support', icon: 'help-circle', route: 'SupportScreen', requiresAccess: false },
//     { label: 'Logout', icon: 'log-out', route: 'Login', isLogout: true, requiresAccess: false },
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

//   const handleNavigation = (item) => {
//     if (item.isLogout) {
//       handleLogout();
//       return;
//     }

//     if (isRestricted && item.requiresAccess) {
//       closeDrawer(); 
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.',
//         [
//           { text: 'OK', style: 'cancel' },
//           { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
//         ]
//       );
//       return;
//     }
    
//     closeDrawer();
//     if (item.route) {
//       navigation.navigate(item.route);
//     }
//   };

//   const handleTopProfilePress = () => {
//     if (isRestricted) {
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.',
//         [
//           { text: 'OK', style: 'cancel' },
//           { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
//         ]
//       );
//     } else {
//       navigation.navigate('UserProfile');
//     }
//   };

//   return (
//     <>
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.iconButton} 
//           onPress={openDrawer} 
//           activeOpacity={0.7}
//         >
//           <Icon name="menu" size={24} color={theme.colors.textMain} />
//         </TouchableOpacity>
        
//         <Image 
//           source={require('../../../assets/images/LogoContainer.png')} 
//           style={styles.logo} 
//           resizeMode="contain" 
//         />
        
//         <View style={styles.headerRight}>
//           <TouchableOpacity 
//             style={styles.iconButton} 
//             onPress={() => navigation.navigate('Notifications')} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Icon (4).png')} 
//               style={styles.headerNotificationIcon} 
//               resizeMode="contain"
//             />
//             {notificationCount > 0 && (
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{notificationCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.profileIconContainer} 
//             onPress={handleTopProfilePress} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Profile Icon.png')} 
//               style={[styles.headerProfileImg, isRestricted && { opacity: 0.5 }]} 
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Invisible Left Edge Swipe Detector for Opening Sidebar */}
//       <View 
//         style={sidebarStyles.leftEdgeDetector} 
//         {...panResponder.panHandlers} 
//         pointerEvents={sidebarVisible ? 'none' : 'auto'}
//       />

//       {/* Inline Sidebar Overlay Drawer */}
//       {sidebarVisible && (
//         <View style={sidebarStyles.overlay}>
//           {/* Touch-to-Close Dark Backdrop Layer */}
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
//               <SafeAreaView>
//                 <View style={sidebarStyles.profileHeader}>
//                   <View style={sidebarStyles.userInfoRow}>
//                     <View style={sidebarStyles.avatarCircle}>
//                       <Icon name="user" size={22} color={theme.colors.primaryBlue} />
//                     </View>
//                     <View style={sidebarStyles.nameContainer}>
//                       <Text style={sidebarStyles.usernameText}>Username 1</Text>
//                       <Text style={sidebarStyles.payoIdText}>PAYO-9831</Text>
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
//                 const itemLocked = isRestricted && item.requiresAccess;
//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     style={[sidebarStyles.menuItem, itemLocked && { opacity: 0.4 }]}
//                     onPress={() => handleNavigation(item)}
//                     activeOpacity={itemLocked ? 0.9 : 0.7}
//                   >
//                     <View style={sidebarStyles.menuItemLeftSection}>
//                       <View style={sidebarStyles.iconWrapper}>
//                         <Icon name={item.icon} size={18} color={theme.colors.primaryBlue} />
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
//                       <Icon name={item.icon} size={18} color={item.isLogout ? theme.colors.statusDanger : theme.colors.primaryBlue} />
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
    justifyContent: 'space-between', // Changed to properly align profile info on the left and the close button on the right
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: theme.colors.bgSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    marginLeft: scale(12),
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
    paddingBottom: verticalScale(100), // Increased padding significantly so scroll clears the bottom navigation
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
////////////////////////////////////
//v1
// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
//   ScrollView,
//   Alert,
//   BackHandler,
//   PanResponder,
//   Animated,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import * as Keychain from 'react-native-keychain';
// import api from '../../api/axios';
// import styles from '../HomeScreen/homeStyling'; 

// const { width, height } = Dimensions.get('window');
// const DRAWER_WIDTH = width * 0.76;

// export default function Header() {
//   const navigation = useNavigation();
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [walletBalance, setWalletBalance] = useState(1000);

//   const isRestricted = useMemo(() => {
//     return walletBalance < 100;
//   }, [walletBalance]);

//   // Animation values for smooth swiping
//   const panX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
//   const isDrawerOpen = useRef(false);

//   const openDrawer = () => {
//     panX.flattenOffset();
//     setSidebarVisible(true);
//     Animated.timing(panX, {
//       toValue: 0,
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => {
//       isDrawerOpen.current = true;
//     });
//   };

//   const closeDrawer = () => {
//     panX.flattenOffset();
//     Animated.timing(panX, {
//       toValue: -DRAWER_WIDTH,
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => {
//       setSidebarVisible(false);
//       isDrawerOpen.current = false;
//     });
//   };

//   // Unified PanResponder for both Opening and Closing
//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: (evt, gestureState) => {
//         // Prevent vertical scrolling from triggering the drawer
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
//       onPanResponderMove: (evt, gestureState) => {
//         panX.setValue(gestureState.dx);
//       },
//       onPanResponderRelease: (evt, gestureState) => {
//         panX.flattenOffset();
//         const { vx, dx } = gestureState;

//         // Decide whether to open or close based on velocity and swipe distance
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

//   // Interpolate values to constrain movement limits and fade background
//   const clampedTranslationX = panX.interpolate({
//     inputRange: [-DRAWER_WIDTH, 0],
//     outputRange: [-DRAWER_WIDTH, 0],
//     extrapolate: 'clamp',
//   });

//   // Controls the dark background fading in and out
//   const overlayOpacity = panX.interpolate({
//     inputRange: [-DRAWER_WIDTH, 0],
//     outputRange: [0, 0.6], // 0.6 makes the background slightly dark when open, 0 is normal homescreen
//     extrapolate: 'clamp',
//   });

//   // Handle Wallet Balance Fetching
//   useEffect(() => {
//     const checkSidebarBalance = async () => {
//       try {
//         const response = await api.get('/api/wallet/balance');
//         const parsedBalance = parseFloat(String(response?.data?.balance || '0').replace(/[^\d.]/g, ''));
//         setWalletBalance(isNaN(parsedBalance) ? 0 : parsedBalance);
//       } catch (error) {
//         console.log('Sidebar wallet balance sync check failed:', error);
//       }
//     };
    
//     if (sidebarVisible) {
//       checkSidebarBalance();
//     }
//   }, [sidebarVisible]);

//   // Safe Hardware Back Interception
//   useEffect(() => {
//     const handleBackButton = () => {
//       if (sidebarVisible) {
//         closeDrawer();
//         return true; 
//       }
//       return false; 
//     };

//     const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
//     return () => {
//       subscription.remove();
//     };
//   }, [sidebarVisible]);

//   // Configurations
//   const notificationCount = 3; 

//   const menuItems = [
//     { label: 'Dashboard', icon: 'home', route: 'HomeScreen', requiresAccess: false },
//     { label: 'Wallet', icon: 'credit-card', route: 'WalletScreen', requiresAccess: false },
//     { label: 'Markets', icon: 'trending-up', route: 'MarketScreen', requiresAccess: true },
//     { label: 'Portfolio', icon: 'bar-chart-2', route: 'PortfolioScreen', requiresAccess: true },
//     { label: 'Transactions', icon: 'refresh-cw', route: 'TransactionHistory', requiresAccess: true },
//     { label: 'Rewards', icon: 'gift', route: 'ReferEarn', requiresAccess: true },
//     { label: 'Referrals', icon: 'users', route: 'ReferEarn', requiresAccess: true },
//     { label: 'Verify KYC', icon: 'file', route: 'KYCVerification', requiresAccess: true },
//   ];

//   const bottomMenuItems = [
//     { label: 'Settings', icon: 'settings', route: 'SettingsScreen', requiresAccess: false },
//     { label: 'Support', icon: 'help-circle', route: 'SupportScreen', requiresAccess: false },
//     { label: 'Logout', icon: 'log-out', route: 'Login', isLogout: true, requiresAccess: false },
//   ];

//   // Action Handlers
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

//   const handleNavigation = (item) => {
//     if (item.isLogout) {
//       handleLogout();
//       return;
//     }

//     if (isRestricted && item.requiresAccess) {
//       closeDrawer(); 
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.',
//         [
//           { text: 'OK', style: 'cancel' },
//           { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
//         ]
//       );
//       return;
//     }
    
//     closeDrawer();
//     if (item.route) {
//       navigation.navigate(item.route);
//     }
//   };

//   const handleTopProfilePress = () => {
//     if (isRestricted) {
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.',
//         [
//           { text: 'OK', style: 'cancel' },
//           { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
//         ]
//       );
//     } else {
//       navigation.navigate('UserProfile');
//     }
//   };

//   return (
//     <>
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.iconButton} 
//           onPress={openDrawer} 
//           activeOpacity={0.7}
//         >
//           <Icon name="menu" size={24} color="#1f2937" />
//         </TouchableOpacity>
        
//         <Image 
//           source={require('../../../assets/images/LogoContainer.png')} 
//           style={styles.logo} 
//           resizeMode="contain" 
//         />
        
//         <View style={styles.headerRight}>
//           <TouchableOpacity 
//             style={styles.iconButton} 
//             onPress={() => navigation.navigate('Notifications')} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Icon (4).png')} 
//               style={styles.headerNotificationIcon} 
//               resizeMode="contain"
//             />
//             {notificationCount > 0 && (
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{notificationCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.profileIconContainer} 
//             onPress={handleTopProfilePress} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Profile Icon.png')} 
//               style={[styles.headerProfileImg, isRestricted && { opacity: 0.5 }]} 
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Invisible Left Edge Swipe Detector for Opening Sidebar */}
//       <View 
//         style={sidebarStyles.leftEdgeDetector} 
//         {...panResponder.panHandlers} 
//         pointerEvents={sidebarVisible ? 'none' : 'auto'}
//       />

//       {/* Inline Sidebar Overlay Drawer */}
//       {sidebarVisible && (
//         <View style={sidebarStyles.overlay}>
//           {/* Touch-to-Close Dark Backdrop Layer */}
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
//             <SafeAreaView style={sidebarStyles.safeAreaContainer}>
              
//               <View style={sidebarStyles.profileHeader}>
//                 <View style={sidebarStyles.userInfoRow}>
//                   <View style={sidebarStyles.avatarCircle}>
//                     <Icon name="user" size={22} color="#2b5ce0" />
//                   </View>
//                   <View style={sidebarStyles.nameContainer}>
//                     <Text style={sidebarStyles.usernameText}>Username 1</Text>
//                     <Text style={sidebarStyles.payoIdText}>PAYO-9831</Text>
//                   </View>
//                 </View>
//               </View>

//               <ScrollView 
//                 style={sidebarStyles.menuList}
//                 contentContainerStyle={sidebarStyles.scrollContent}
//                 showsVerticalScrollIndicator={false}
//               >
//                 {menuItems?.map((item, index) => {
//                   const itemLocked = isRestricted && item.requiresAccess;
//                   return (
//                     <TouchableOpacity
//                       key={index}
//                       style={[sidebarStyles.menuItem, itemLocked && { opacity: 0.4 }]}
//                       onPress={() => handleNavigation(item)}
//                       activeOpacity={itemLocked ? 0.9 : 0.7}
//                     >
//                       <View style={sidebarStyles.menuItemLeftSection}>
//                         <View style={sidebarStyles.iconWrapper}>
//                           <Icon name={item.icon} size={18} color="#2b5ce0" />
//                         </View>
//                         <Text style={sidebarStyles.menuItemLabel}>{item.label}</Text>
//                       </View>
//                       {itemLocked && (
//                         <Icon name="lock" size={14} color="#6B7280" style={sidebarStyles.lockMargin} />
//                       )}
//                     </TouchableOpacity>
//                   );
//                 })}

//                 <View style={sidebarStyles.horizontalDivider} />

//                 {bottomMenuItems.map((item, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={sidebarStyles.menuItem}
//                     onPress={() => handleNavigation(item)}
//                   >
//                     <View style={sidebarStyles.menuItemLeftSection}>
//                       <View style={[sidebarStyles.iconWrapper, item.isLogout && sidebarStyles.logoutIconWrapper]}>
//                         <Icon name={item.icon} size={18} color={item.isLogout ? '#ef4444' : '#2b5ce0'} />
//                       </View>
//                       <Text style={[sidebarStyles.menuItemLabel, item.isLogout && sidebarStyles.logoutText]}>
//                         {item.label}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>

//             </SafeAreaView>
//           </Animated.View>
//         </View>
//       )}
//     </>
//   );
// }

// const sidebarStyles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: width,
//     height: height,
//     zIndex: 1000,
//     elevation: 100, // Forces the overlay completely over homescreen content on Android
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
//     backgroundColor: '#E5E7EB', 
//     borderTopRightRadius: scale(20), 
//     borderBottomRightRadius: scale(20),
//     overflow: 'hidden', 
//     zIndex: 1001,
//     elevation: 101, // Forces drawer ABOVE the dark background
//   },
//   safeAreaContainer: {
//     flex: 1,
//   },
//   profileHeader: {
//     backgroundColor: '#3B60C4', 
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(20),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   userInfoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatarCircle: {
//     width: scale(40),
//     height: scale(40),
//     borderRadius: scale(20),
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   nameContainer: {
//     marginLeft: scale(12),
//   },
//   usernameText: {
//     color: '#fff',
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//   },
//   payoIdText: {
//     color: '#E0E7FF',
//     fontSize: moderateScale(12),
//     marginTop: verticalScale(1),
//   },
//   menuList: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingTop: verticalScale(16),
//     paddingHorizontal: scale(16),
//     paddingBottom: verticalScale(65),
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
//     backgroundColor: '#D1D5DB', 
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoutIconWrapper: {
//     backgroundColor: '#FEE2E2',
//   },
//   menuItemLabel: {
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//     color: '#1F2937',
//     marginLeft: scale(16),
//   },
//   lockMargin: {
//     marginRight: scale(4),
//   },
//   logoutText: {
//     color: '#ef4444',
//   },
//   horizontalDivider: {
//     height: 1,
//     backgroundColor: '#D1D5DB',
//     marginVertical: verticalScale(16),
//   },
// });


/////////////////////////////////////////////////
//v0
// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
//   ScrollView,
//   Alert,
//   BackHandler,
//   PanResponder,
//   Animated,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import * as Keychain from 'react-native-keychain';
// import api from '../../api/axios';
// import styles from '../HomeScreen/homeStyling'; 

// const { width, height } = Dimensions.get('window');
// const DRAWER_WIDTH = width * 0.76;

// export default function Header() {
//   const navigation = useNavigation();
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [walletBalance, setWalletBalance] = useState(1000);

//   const isRestricted = useMemo(() => {
//     return walletBalance < 100;
//   }, [walletBalance]);

//   // Animation values for smooth swiping
//   const panX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
//   const isDrawerOpen = useRef(false);

//   const openDrawer = () => {
//     panX.flattenOffset();
//     setSidebarVisible(true);
//     Animated.timing(panX, {
//       toValue: 0,
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => {
//       isDrawerOpen.current = true;
//     });
//   };

//   const closeDrawer = () => {
//     panX.flattenOffset();
//     Animated.timing(panX, {
//       toValue: -DRAWER_WIDTH,
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => {
//       setSidebarVisible(false);
//       isDrawerOpen.current = false;
//     });
//   };

//   // Unified PanResponder for both Opening and Closing
//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: (evt, gestureState) => {
//         // Prevent vertical scrolling from triggering the drawer
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
//       onPanResponderMove: (evt, gestureState) => {
//         panX.setValue(gestureState.dx);
//       },
//       onPanResponderRelease: (evt, gestureState) => {
//         panX.flattenOffset();
//         const { vx, dx } = gestureState;

//         // Decide whether to open or close based on velocity and swipe distance
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

//   // Interpolate values to constrain movement limits and fade background
//   const clampedTranslationX = panX.interpolate({
//     inputRange: [-DRAWER_WIDTH, 0],
//     outputRange: [-DRAWER_WIDTH, 0],
//     extrapolate: 'clamp',
//   });

//   const overlayOpacity = panX.interpolate({
//     inputRange: [-DRAWER_WIDTH, 0],
//     outputRange: [0, 0.4],
//     extrapolate: 'clamp',
//   });

//   // Handle Wallet Balance Fetching
//   useEffect(() => {
//     const checkSidebarBalance = async () => {
//       try {
//         const response = await api.get('/api/wallet/balance');
//         const parsedBalance = parseFloat(String(response?.data?.balance || '0').replace(/[^\d.]/g, ''));
//         setWalletBalance(isNaN(parsedBalance) ? 0 : parsedBalance);
//       } catch (error) {
//         console.log('Sidebar wallet balance sync check failed:', error);
//       }
//     };
    
//     if (sidebarVisible) {
//       checkSidebarBalance();
//     }
//   }, [sidebarVisible]);

//   // Safe Hardware Back Interception
//   useEffect(() => {
//     const handleBackButton = () => {
//       if (sidebarVisible) {
//         closeDrawer();
//         return true; 
//       }
//       return false; 
//     };

//     const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
//     return () => {
//       subscription.remove();
//     };
//   }, [sidebarVisible]);

//   // Configurations
//   const notificationCount = 3; 

//   const menuItems = [
//     { label: 'Dashboard', icon: 'home', route: 'HomeScreen', requiresAccess: false },
//     { label: 'Wallet', icon: 'credit-card', route: 'WalletScreen', requiresAccess: false },
//     { label: 'Markets', icon: 'trending-up', route: 'MarketScreen', requiresAccess: true },
//     { label: 'Portfolio', icon: 'bar-chart-2', route: 'PortfolioScreen', requiresAccess: true },
//     { label: 'Transactions', icon: 'refresh-cw', route: 'TransactionHistory', requiresAccess: true },
//     { label: 'Rewards', icon: 'gift', route: 'ReferEarn', requiresAccess: true },
//     { label: 'Referrals', icon: 'users', route: 'ReferEarn', requiresAccess: true },
//     { label: 'Verify KYC', icon: 'file', route: 'KYCVerification', requiresAccess: true },
//   ];

//   const bottomMenuItems = [
//     { label: 'Settings', icon: 'settings', route: 'SettingsScreen', requiresAccess: false },
//     { label: 'Support', icon: 'help-circle', route: 'SupportScreen', requiresAccess: false },
//     { label: 'Logout', icon: 'log-out', route: 'Login', isLogout: true, requiresAccess: false },
//   ];

//   // Action Handlers
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

//   const handleNavigation = (item) => {
//     if (item.isLogout) {
//       handleLogout();
//       return;
//     }

//     if (isRestricted && item.requiresAccess) {
//       closeDrawer(); 
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.',
//         [
//           { text: 'OK', style: 'cancel' },
//           { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
//         ]
//       );
//       return;
//     }
    
//     closeDrawer();
//     if (item.route) {
//       navigation.navigate(item.route);
//     }
//   };

//   const handleTopProfilePress = () => {
//     if (isRestricted) {
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.',
//         [
//           { text: 'OK', style: 'cancel' },
//           { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
//         ]
//       );
//     } else {
//       navigation.navigate('UserProfile');
//     }
//   };

//   return (
//     <>
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.iconButton} 
//           onPress={openDrawer} 
//           activeOpacity={0.7}
//         >
//           <Icon name="menu" size={24} color="#1f2937" />
//         </TouchableOpacity>
        
//         <Image 
//           source={require('../../../assets/images/LogoContainer.png')} 
//           style={styles.logo} 
//           resizeMode="contain" 
//         />
        
//         <View style={styles.headerRight}>
//           <TouchableOpacity 
//             style={styles.iconButton} 
//             onPress={() => navigation.navigate('Notifications')} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Icon (4).png')} 
//               style={styles.headerNotificationIcon} 
//               resizeMode="contain"
//             />
//             {notificationCount > 0 && (
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{notificationCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.profileIconContainer} 
//             onPress={handleTopProfilePress} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Profile Icon.png')} 
//               style={[styles.headerProfileImg, isRestricted && { opacity: 0.5 }]} 
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Invisible Left Edge Swipe Detector for Opening Sidebar */}
//       <View 
//         style={sidebarStyles.leftEdgeDetector} 
//         {...panResponder.panHandlers} 
//         pointerEvents={sidebarVisible ? 'none' : 'auto'}
//       />

//       {/* Inline Sidebar Overlay Drawer */}
//       {sidebarVisible && (
//         <View style={sidebarStyles.overlay}>
//           {/* Touch-to-Close Backdrop Layer */}
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
//             <SafeAreaView style={sidebarStyles.safeAreaContainer}>
              
//               <View style={sidebarStyles.profileHeader}>
//                 <View style={sidebarStyles.userInfoRow}>
//                   <View style={sidebarStyles.avatarCircle}>
//                     <Icon name="user" size={22} color="#2b5ce0" />
//                   </View>
//                   <View style={sidebarStyles.nameContainer}>
//                     <Text style={sidebarStyles.usernameText}>Username 1</Text>
//                     <Text style={sidebarStyles.payoIdText}>PAYO-9831</Text>
//                   </View>
//                 </View>
//               </View>

//               <ScrollView 
//                 style={sidebarStyles.menuList}
//                 contentContainerStyle={sidebarStyles.scrollContent}
//                 showsVerticalScrollIndicator={false}
//               >
//                 {menuItems?.map((item, index) => {
//                   const itemLocked = isRestricted && item.requiresAccess;
//                   return (
//                     <TouchableOpacity
//                       key={index}
//                       style={[sidebarStyles.menuItem, itemLocked && { opacity: 0.4 }]}
//                       onPress={() => handleNavigation(item)}
//                       activeOpacity={itemLocked ? 0.9 : 0.7}
//                     >
//                       <View style={sidebarStyles.menuItemLeftSection}>
//                         <View style={sidebarStyles.iconWrapper}>
//                           <Icon name={item.icon} size={18} color="#2b5ce0" />
//                         </View>
//                         <Text style={sidebarStyles.menuItemLabel}>{item.label}</Text>
//                       </View>
//                       {itemLocked && (
//                         <Icon name="lock" size={14} color="#6B7280" style={sidebarStyles.lockMargin} />
//                       )}
//                     </TouchableOpacity>
//                   );
//                 })}

//                 <View style={sidebarStyles.horizontalDivider} />

//                 {bottomMenuItems.map((item, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={sidebarStyles.menuItem}
//                     onPress={() => handleNavigation(item)}
//                   >
//                     <View style={sidebarStyles.menuItemLeftSection}>
//                       <View style={[sidebarStyles.iconWrapper, item.isLogout && sidebarStyles.logoutIconWrapper]}>
//                         <Icon name={item.icon} size={18} color={item.isLogout ? '#ef4444' : '#2b5ce0'} />
//                       </View>
//                       <Text style={[sidebarStyles.menuItemLabel, item.isLogout && sidebarStyles.logoutText]}>
//                         {item.label}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>

//             </SafeAreaView>
//           </Animated.View>
//         </View>
//       )}
//     </>
//   );
// }

// const sidebarStyles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: width,
//     height: height,
//     zIndex: 1000, 
//   },
//   backdropTouch: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#000', 
//   },
//   leftEdgeDetector: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: scale(25), // Increased width slightly to grab easier
//     height: height,
//     zIndex: 999,
//   },
//   drawerContainer: {
//     width: DRAWER_WIDTH,
//     height: '100%',
//     backgroundColor: '#E5E7EB', 
//     borderTopRightRadius: scale(20), 
//     borderBottomRightRadius: scale(20),
//     overflow: 'hidden', 
//   },
//   safeAreaContainer: {
//     flex: 1,
//   },
//   profileHeader: {
//     backgroundColor: '#3B60C4', 
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(20),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   userInfoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatarCircle: {
//     width: scale(40),
//     height: scale(40),
//     borderRadius: scale(20),
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   nameContainer: {
//     marginLeft: scale(12),
//   },
//   usernameText: {
//     color: '#fff',
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//   },
//   payoIdText: {
//     color: '#E0E7FF',
//     fontSize: moderateScale(12),
//     marginTop: verticalScale(1),
//   },
//   menuList: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingTop: verticalScale(16),
//     paddingHorizontal: scale(16),
//     paddingBottom: verticalScale(65),
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
//     backgroundColor: '#D1D5DB', 
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoutIconWrapper: {
//     backgroundColor: '#FEE2E2',
//   },
//   menuItemLabel: {
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//     color: '#1F2937',
//     marginLeft: scale(16),
//   },
//   lockMargin: {
//     marginRight: scale(4),
//   },
//   logoutText: {
//     color: '#ef4444',
//   },
//   horizontalDivider: {
//     height: 1,
//     backgroundColor: '#D1D5DB',
//     marginVertical: verticalScale(16),
//   },
// });



//////////////////////////////////////////////////////////
//new code
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
//   TouchableWithoutFeedback,
//   SafeAreaView,
//   ScrollView,
//   Alert,
//   BackHandler, 
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import * as Keychain from 'react-native-keychain';
// import api from '../../api/axios';
// import styles from '../HomeScreen/homeStyling'; 

// const { width, height } = Dimensions.get('window');

// export default function Header() {
//   // 1. ALL HOOKS DECLARATIONS (TOP LEVEL UNCONDITIONAL)
//   const navigation = useNavigation();
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   const [walletBalance, setWalletBalance] = useState(1000);

//   const isRestricted = useMemo(() => {
//     return walletBalance < 100;
//   }, [walletBalance]);

//   // Hook 1: Handle Wallet Balance Fetching
//   useEffect(() => {
//     const checkSidebarBalance = async () => {
//       try {
//         const response = await api.get('/api/wallet/balance');
//         const parsedBalance = parseFloat(String(response?.data?.balance || '0').replace(/[^\d.]/g, ''));
//         setWalletBalance(isNaN(parsedBalance) ? 0 : parsedBalance);
//       } catch (error) {
//         console.log('Sidebar wallet balance sync check failed:', error);
//       }
//     };
    
//     if (sidebarVisible) {
//       checkSidebarBalance();
//     }
//   }, [sidebarVisible]);

//   // Hook 2: Safe Hardware Back Interception with updated React Native subscription API
//   useEffect(() => {
//     const handleBackButton = () => {
//       if (sidebarVisible) {
//         setSidebarVisible(false);
//         return true; // Stop event bubbling, close sidebar smoothly
//       }
//       return false; // Propagate normal navigation back behavior if closed
//     };

//     // Modern subscription setup
//     const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

//     // Fixed clean up function using modern subscription removal model
//     return () => {
//       subscription.remove();
//     };
//   }, [sidebarVisible]);

//   // 2. STATIC CONFIGURATIONS
//   const notificationCount = 3; 

//   const menuItems = [
//     { label: 'Dashboard', icon: 'home', route: 'HomeScreen', requiresAccess: false },
//     { label: 'Wallet', icon: 'credit-card', route: 'WalletScreen', requiresAccess: false },
//     { label: 'Markets', icon: 'trending-up', route: 'MarketScreen', requiresAccess: true },
//     { label: 'Portfolio', icon: 'bar-chart-2', route: 'PortfolioScreen', requiresAccess: true },
//     { label: 'Transactions', icon: 'refresh-cw', route: 'TransactionHistory', requiresAccess: true },
//     { label: 'Rewards', icon: 'gift', route: 'ReferEarn', requiresAccess: true },
//     { label: 'Referrals', icon: 'users', route: 'ReferEarn', requiresAccess: true },
//     { label: 'Verify KYC', icon: 'file', route: 'KYCVerification', requiresAccess: true },
//   ];

//   const bottomMenuItems = [
//     { label: 'Settings', icon: 'settings', route: 'SettingsScreen', requiresAccess: false },
//     { label: 'Support', icon: 'help-circle', route: 'SupportScreen', requiresAccess: false },
//     { label: 'Logout', icon: 'log-out', route: 'Login', isLogout: true, requiresAccess: false },
//   ];

//   // 3. ACTION HANDLERS
//   const handleLogout = async () => {
//     try {
//       setSidebarVisible(false);
//       await Keychain.resetGenericPassword();
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Login' }],
//       });
//     } catch (error) {
//       console.log('Logout error:', error);
//     }
//   };

//   const handleNavigation = (item) => {
//     if (item.isLogout) {
//       handleLogout();
//       return;
//     }

//     if (isRestricted && item.requiresAccess) {
//       setSidebarVisible(false); 
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.',
//         [
//           {
//             text: 'OK',
//             style: 'cancel',
//           },
//           {
//             text: 'Add Money',
//             onPress: () => navigation.navigate('AddMoneytoWallet'),
//           },
//         ]
//       );
//       return;
//     }
    
//     setSidebarVisible(false);
//     if (item.route) {
//       navigation.navigate(item.route);
//     }
//   };

//   const handleTopProfilePress = () => {
//     if (isRestricted) {
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.',
//         [
//           {
//             text: 'OK',
//             style: 'cancel',
//           },
//           {
//             text: 'Add Money',
//             onPress: () => navigation.navigate('AddMoneytoWallet'),
//           },
//         ]
//       );
//     } else {
//       navigation.navigate('UserProfile');
//     }
//   };

//   return (
//     <>
//       <View style={styles.header}>
//         {/* Left Menu Trigger */}
//         <TouchableOpacity 
//           style={styles.iconButton} 
//           onPress={() => setSidebarVisible(true)} 
//           activeOpacity={0.7}
//         >
//           <Icon name="menu" size={24} color="#1f2937" />
//         </TouchableOpacity>
        
//         {/* Brand Logo */}
//         <Image 
//           source={require('../../../assets/images/LogoContainer.png')} 
//           style={styles.logo} 
//           resizeMode="contain" 
//         />
        
//         {/* Right Operations Cluster */}
//         <View style={styles.headerRight}>
//           <TouchableOpacity 
//             style={styles.iconButton} 
//             onPress={() => navigation.navigate('Notifications')} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Icon (4).png')} 
//               style={styles.headerNotificationIcon} 
//               resizeMode="contain"
//             />
//             {notificationCount > 0 && (
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{notificationCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.profileIconContainer} 
//             onPress={handleTopProfilePress} 
//             activeOpacity={0.7}
//           >
//             <Image 
//               source={require('../../../assets/images/Profile Icon.png')} 
//               style={[styles.headerProfileImg, isRestricted && { opacity: 0.5 }]} 
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Inline Sidebar Overlay Drawer */}
//       {sidebarVisible && (
//         <View style={sidebarStyles.overlay}>
//           <TouchableWithoutFeedback onPress={() => setSidebarVisible(false)}>
//             <View style={sidebarStyles.backdropTouch} />
//           </TouchableWithoutFeedback>

//           <View style={sidebarStyles.drawerContainer}>
//             <SafeAreaView style={sidebarStyles.safeAreaContainer}>
              
//               {/* Profile Header Block */}
//               <View style={sidebarStyles.profileHeader}>
//                 <View style={sidebarStyles.userInfoRow}>
//                   <View style={sidebarStyles.avatarCircle}>
//                     <Icon name="user" size={22} color="#2b5ce0" />
//                   </View>
//                   <View style={sidebarStyles.nameContainer}>
//                     <Text style={sidebarStyles.usernameText}>Username 1</Text>
//                     <Text style={sidebarStyles.payoIdText}>PAYO-9831</Text>
//                   </View>
//                 </View>
//                 <TouchableOpacity onPress={() => setSidebarVisible(false)} style={sidebarStyles.closeBtn}>
//                   <Icon name="x" size={20} color="#fff" />
//                 </TouchableOpacity>
//               </View>

//               {/* Main Navigation Items */}
//               <ScrollView 
//                 style={sidebarStyles.menuList}
//                 contentContainerStyle={sidebarStyles.scrollContent}
//                 showsVerticalScrollIndicator={false}
//               >
//                 {menuItems?.map((item, index) => {
//                   const itemLocked = isRestricted && item.requiresAccess;
//                   return (
//                     <TouchableOpacity
//                       key={index}
//                       style={[sidebarStyles.menuItem, itemLocked && { opacity: 0.4 }]}
//                       onPress={() => handleNavigation(item)}
//                       activeOpacity={itemLocked ? 0.9 : 0.7}
//                     >
//                       <View style={sidebarStyles.menuItemLeftSection}>
//                         <View style={sidebarStyles.iconWrapper}>
//                           <Icon name={item.icon} size={18} color="#2b5ce0" />
//                         </View>
//                         <Text style={sidebarStyles.menuItemLabel}>{item.label}</Text>
//                       </View>
//                       {itemLocked && (
//                         <Icon name="lock" size={14} color="#6B7280" style={sidebarStyles.lockMargin} />
//                       )}
//                     </TouchableOpacity>
//                   );
//                 })}

//                 <View style={sidebarStyles.horizontalDivider} />

//                 {/* Bottom Settings & Logout */}
//                 {bottomMenuItems.map((item, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     style={sidebarStyles.menuItem}
//                     onPress={() => handleNavigation(item)}
//                   >
//                     <View style={sidebarStyles.menuItemLeftSection}>
//                       <View style={[sidebarStyles.iconWrapper, item.isLogout && sidebarStyles.logoutIconWrapper]}>
//                         <Icon name={item.icon} size={18} color={item.isLogout ? '#ef4444' : '#2b5ce0'} />
//                       </View>
//                       <Text style={[sidebarStyles.menuItemLabel, item.isLogout && sidebarStyles.logoutText]}>
//                         {item.label}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>

//             </SafeAreaView>
//           </View>
//         </View>
//       )}
//     </>
//   );
// }

// const sidebarStyles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: width,
//     height: height,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     zIndex: 1000, 
//   },
//   backdropTouch: {
//     ...StyleSheet.absoluteFillObject, 
//   },
//   drawerContainer: {
//     width: width * 0.76,
//     height: '100%',
//     backgroundColor: '#E5E7EB', 
//   },
//   safeAreaContainer: {
//     flex: 1,
//   },
//   profileHeader: {
//     backgroundColor: '#3B60C4', 
//     paddingHorizontal: scale(16),
//     paddingVertical: verticalScale(20),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   userInfoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatarCircle: {
//     width: scale(40),
//     height: scale(40),
//     borderRadius: scale(20),
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   nameContainer: {
//     marginLeft: scale(12),
//   },
//   usernameText: {
//     color: '#fff',
//     fontSize: moderateScale(15),
//     fontWeight: '600',
//   },
//   payoIdText: {
//     color: '#E0E7FF',
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
//     paddingBottom: verticalScale(65),
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
//     backgroundColor: '#D1D5DB', 
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoutIconWrapper: {
//     backgroundColor: '#FEE2E2',
//   },
//   menuItemLabel: {
//     fontSize: moderateScale(14),
//     fontWeight: '500',
//     color: '#1F2937',
//     marginLeft: scale(16),
//   },
//   lockMargin: {
//     marginRight: scale(4),
//   },
//   logoutText: {
//     color: '#ef4444',
//   },
//   horizontalDivider: {
//     height: 1,
//     backgroundColor: '#D1D5DB',
//     marginVertical: verticalScale(16),
//   },
// });