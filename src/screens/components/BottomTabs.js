
//////////////////////////////////////////////////////////////////////

// import React, { useMemo } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Text,
//   useColorScheme,
//   StatusBar,
// } from 'react-native';
// import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
// import Icon from 'react-native-vector-icons/Feather';
// import { moderateScale } from 'react-native-size-matters';

// import HomeScreen from '../HomeScreen/HomeScreen';
// import SendScreen from './sendScreen';
// import TransactionHistory from '../HomeScreen/TransactionHistory';
// import WalletScreen from '../HomeScreen/WalletScreen';
// import ProfileScreen from '../UserProfile/UserProfile';

// import { getThemeColors, styles } from './BottomTabStyling';

// export default function CurvedTabs() {
//   const isDarkMode = useColorScheme() === 'dark';
//   const colors = useMemo(() => getThemeColors(isDarkMode), [isDarkMode]);

//   // Unified icon selector helper
//   const getIconName = (routeName) => {
//     switch (routeName) {
//       case 'Home': return 'home';
//       case 'Wallets': return 'credit-card';
//       case 'Transactions': return 'repeat';
//       case 'Profile': return 'user';
//       default: return 'help-circle';
//     }
//   };

//   // Unified label selector helper
//   const getLabelText = (routeName) => {
//     const labels = {
//       Home: 'Home',
//       Wallets: 'Wallets',
//       Transactions: 'Transactions',
//       Profile: 'Profile',
//     };
//     return labels[routeName] || routeName;
//   };

//   // Customs individual tab items
//   const renderCustomTabBarButton = ({ routeName, selectedTab, navigate }) => {
//     const isFocused = routeName === selectedTab;
//     const iconName = getIconName(routeName);
//     const label = getLabelText(routeName);

//     return (
//       <TouchableOpacity
//         onPress={() => navigate(routeName)}
//         style={styles.tabBarButton}
//         activeOpacity={0.7}
//       >
//         <View
//           style={[
//             isFocused ? styles.navActiveBg : styles.navInactiveIconContainer,
//             isFocused && { backgroundColor: colors.activeTabBg }
//           ]}
//         >
//           <Icon
//             name={iconName}
//             size={moderateScale(20)}
//             color={isFocused ? '#FFFFFF' : colors.inactiveText}
//           />
//         </View>

//         <Text
//           style={[
//             styles.navLabel,
//             { 
//               color: isFocused ? colors.activeText : colors.inactiveText,
//               fontWeight: isFocused ? '700' : '500'
//             },
//           ]}
//         >
//           {label}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: colors.screenBackground }]}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={colors.navBackground}
//       />

//       <CurvedBottomBar.Navigator
//         style={styles.bottomBar}
//         strokeColor={colors.navBackground}
//         circleBackgroundColor={colors.screenBackground}
//         height={moderateScale(75)} 
//         circleWidth={moderateScale(60)}
//         maxWidth={moderateScale(360)}
//         borderTopLeftRadius={moderateScale(32)}
//         borderTopRightRadius={moderateScale(32)}
//         type="DOWN"
//         bgColor={colors.navBackground}
//         initialRouteName="Home"
        
//         // REMOVES THE TOP HEADER BAR NATIVELY
//         screenOptions={{ headerShown: false }}
        
//         tabBar={renderCustomTabBarButton}
        
//         renderCircle={({ navigate }) => (
//           <TouchableOpacity
//             style={[
//               styles.btnCircle, 
//               { 
//                 borderColor: isDarkMode ? '#10B981' : '#00A859',
//                 backgroundColor: colors.screenBackground 
//               }
//             ]}
//             activeOpacity={0.85}
//             onPress={() => navigate('Send', { tab: 'scan' })}
//           >
//             <Icon 
//               name="maximize" 
//               size={moderateScale(24)} 
//               color={isDarkMode ? '#10B981' : '#00A859'} 
//             />
//           </TouchableOpacity>
//         )}
//       >
//         <CurvedBottomBar.Screen name="Home" position="LEFT" component={HomeScreen} />
//         <CurvedBottomBar.Screen name="Wallets" position="LEFT" component={WalletScreen} />
//         <CurvedBottomBar.Screen name="Send" position="CENTER" component={SendScreen} />
//         <CurvedBottomBar.Screen name="Transactions" position="RIGHT" component={TransactionHistory} />
//         <CurvedBottomBar.Screen name="Profile" position="RIGHT" component={ProfileScreen} />
//       </CurvedBottomBar.Navigator>
//     </View>
//   );
// }


/////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useMemo } from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Text,
//   useColorScheme,
//   StatusBar,
// } from 'react-native';
// import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
// import Icon from 'react-native-vector-icons/Feather';
// import { moderateScale } from 'react-native-size-matters';

// import HomeScreen from '../HomeScreen/HomeScreen';
// import SendScreen from './sendScreen';
// import TransactionHistory from '../HomeScreen/TransactionHistory';
// import WalletScreen from '../HomeScreen/WalletScreen';
// import MarketScreen from '../Market/market';
// //import AddMoneytoWallet from '../HomeScreen/AddMoneytoWallet';
// import ProfileScreen from '../UserProfile/UserProfile';

// import { getThemeColors, styles } from './BottomTabStyling';

// export default function CurvedTabs() {
//   const isDarkMode = useColorScheme() === 'dark';
//   const colors = useMemo(() => getThemeColors(isDarkMode), [isDarkMode]);

//   const getIconName = (routeName) => {
//     switch (routeName) {
//       case 'Home': return 'home';
//       case 'Wallets': return 'credit-card';
//       case 'Transactions': return 'repeat';
//       case 'Profile': return 'user';
//       default: return 'help-circle';
//     }
//   };

//   const getLabelText = (routeName) => {
//     const labels = {
//       Home: 'Home',
//       Wallets: 'Wallets',
//       Transactions: 'Transactions',
//       Profile: 'Profile',
//     };
//     return labels[routeName] || routeName;
//   };

//   const renderCustomTabBarButton = ({ routeName, selectedTab, navigate }) => {
//     const isFocused = routeName === selectedTab;
//     const iconName = getIconName(routeName);
//     const label = getLabelText(routeName);

//     return (
//       <TouchableOpacity
//         onPress={() => navigate(routeName)}
//         style={styles.tabBarButton}
//         activeOpacity={0.7}
//       >
//         <View
//           style={[
//             isFocused ? styles.navActiveBg : styles.navInactiveIconContainer,
//             isFocused && { backgroundColor: colors.activeTabBg }
//           ]}
//         >
//           <Icon
//             name={iconName}
//             size={moderateScale(20)}
//             color={isFocused ? '#FFFFFF' : colors.inactiveText}
//           />
//         </View>

//         <Text
//           style={[
//             styles.navLabel,
//             { 
//               color: isFocused ? colors.activeText : colors.inactiveText,
//               fontWeight: isFocused ? '700' : '500'
//             },
//           ]}
//         >
//           {label}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: colors.screenBackground }]}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={colors.navBackground}
//       />

//       <CurvedBottomBar.Navigator
//         style={styles.bottomBar}
//         strokeColor={colors.navBackground}
//         circleBackgroundColor={colors.navBackground}
//         height={moderateScale(80)} 
//         circleWidth={moderateScale(60)}
//         maxWidth={moderateScale(360)}
//         borderTopLeftRadius={moderateScale(32)}
//         borderTopRightRadius={moderateScale(32)}
//         type="DOWN"
//         bgColor={colors.navBackground}
//         initialRouteName="Home"
//         screenOptions={{ headerShown: false }}
//         tabBar={renderCustomTabBarButton}
        
//         renderCircle={({ navigate }) => (
//           <View style={styles.circleContainer}>
//             {/* SOLID BACKGROUND SHIELD: Blocks any background content from showing through the curve space */}
//             <View style={[styles.circleBackgroundPatch, { backgroundColor: colors.navBackground }]} />
            
//             <TouchableOpacity
//               style={[
//                 styles.btnCircle, 
//                 { 
//                   borderColor: isDarkMode ? '#10B981' : '#00A859',
//                   backgroundColor: colors.screenBackground 
//                 }
//               ]}
//               activeOpacity={0.85}
//               onPress={() => navigate('Send', { tab: 'scan' })}
//             >
//               <Icon 
//                 name="maximize" 
//                 size={moderateScale(24)} 
//                 color={isDarkMode ? '#10B981' : '#00A859'} 
//               />
//             </TouchableOpacity>
//           </View>
//         )}
//       >
//         <CurvedBottomBar.Screen name="Home" position="LEFT" component={HomeScreen} />
//         <CurvedBottomBar.Screen name="Wallets" position="LEFT" component={WalletScreen} />
//         <CurvedBottomBar.Screen name="Send" position="CENTER" component={SendScreen} />
//         <CurvedBottomBar.Screen name="Transactions" position="RIGHT" component={TransactionHistory} />
//         <CurvedBottomBar.Screen name="Profile" position="RIGHT" component={ProfileScreen} />
//       </CurvedBottomBar.Navigator>
//     </View>
//   );
// }

import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  useColorScheme,
  StatusBar,
  Alert,
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Icon from 'react-native-vector-icons/Feather';
import { moderateScale } from 'react-native-size-matters';

import api from '../../api/axios';
import HomeScreen from '../HomeScreen/HomeScreen';
import SendScreen from './sendScreen';
import TransactionHistory from '../HomeScreen/TransactionHistory';
import WalletScreen from '../HomeScreen/WalletScreen';
import ProfileScreen from '../UserProfile/UserProfile';

import { getThemeColors, styles } from './BottomTabStyling';
import { useAppSelector } from '../../redux/hooks';

export default function CurvedTabs() {
  const isDarkMode = useColorScheme() === 'dark';
  const walletData = useAppSelector((state) => state.deposit.walletData);
  
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  const tabWalletBalance = walletData?.Available_Balance || 0;

  // Fetch transactions history to evaluate account access criteria
  const fetchTransactions = async () => {
    setLoadingTransactions(true);
    try {
      const res = await api.get('/api/wallet/deposit-history');
      const rawList = res?.data?.Transactions || [];

      const formattedData = rawList.map((item) => {
        const isApproved = item.Payment_Status === 'Payment Approved';
        const isFailed = item.Payment_Status === 'Payment Failed';

        let type = 'received';
        if (isFailed) type = 'failed';

        return {
          id: item.Transaction_UID,
          gatewayOrderId: item.Gateway_Order_ID,
          depositUid: item.Deposit_UID,
          amount: parseFloat(item.Requested_Amount || 0),
          status: item.Payment_Status,
          createdAt: item.Payment_Date,
          name: item.Gateway_Order_ID || item.Transaction_UID,
          type: type,
          isApproved,
          isFailed,
        };
      });

      setTransactions(formattedData);
    } catch (err) {
      console.log('Transaction fetch error in CurvedTabs:', err.message);
    } finally {
      setLoadingTransactions(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const colors = useMemo(() => getThemeColors(isDarkMode), [isDarkMode]);

  // Unrestrict access if transactions > 1 OR balance >= 100
  const isRestricted = useMemo(() => {
    const hasMultipleTransactions = transactions?.length > 1;
    // const hasSufficientBalance = tabWalletBalance >= 100;

    // Restricted ONLY if balance is low AND transaction count is 1 or fewer
    return 
    // !hasSufficientBalance 
    // && 
    !hasMultipleTransactions;
  }, [tabWalletBalance, transactions]);

  const getIconName = (routeName) => {
    switch (routeName) {
      case 'Home': return 'home';
      case 'Wallets': return 'credit-card';
      case 'Transactions': return 'repeat';
      case 'Profile': return 'user';
      default: return 'help-circle';
    }
  };

  const getLabelText = (routeName) => {
    const labels = {
      Home: 'Home',
      Wallets: 'Wallets',
      Transactions: 'Transactions',
      Profile: 'Profile',
    };
    return labels[routeName] || routeName;
  };

  const handleTabNavigation = (routeName, navigate) => {
    const restrictedRoutes = ['Transactions', 'Profile', 'Send'];
    
    if (isRestricted && restrictedRoutes.includes(routeName)) {
      Alert.alert(
        'Access Restricted',
        'You are unable to access this feature. Please add money to your wallet.',
        [
          {
            text: 'OK',
            style: 'cancel',
            onPress: () => console.log('OK Pressed'),
          },
          {
            text: 'Add Money',
            onPress: () => navigate('Home'),
          },
        ],
        { cancelable: true }
      );
    } else {
      navigate(routeName);
    }
  };

  const renderCustomTabBarButton = ({ routeName, selectedTab, navigate }) => {
    const isFocused = routeName === selectedTab;
    const iconName = getIconName(routeName);
    const label = getLabelText(routeName);
    const isTabRestricted = isRestricted && ['Transactions', 'Profile'].includes(routeName);

    return (
      <TouchableOpacity
        onPress={() => handleTabNavigation(routeName, navigate)}
        style={[styles.tabBarButton, isTabRestricted && { opacity: 0.5 }]}
        activeOpacity={0.7}
      >
        <View
          style={[
            isFocused ? styles.navActiveBg : styles.navInactiveIconContainer,
            isFocused && { backgroundColor: colors.activeTabBg }
          ]}
        >
          <Icon
            name={iconName}
            size={moderateScale(20)}
            color={isFocused ? '#FFFFFF' : colors.inactiveText}
          />
        </View>

        <Text
          style={[
            styles.navLabel,
            { 
              color: isFocused ? colors.activeText : colors.inactiveText,
              fontWeight: isFocused ? '700' : '500'
            },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.screenBackground }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.navBackground}
      />

      <CurvedBottomBar.Navigator
        style={styles.bottomBar}
        strokeColor={colors.navBackground}
        circleBackgroundColor={colors.navBackground}
        height={moderateScale(80)} 
        circleWidth={moderateScale(60)}
        maxWidth={moderateScale(360)}
        borderTopLeftRadius={moderateScale(32)}
        borderTopRightRadius={moderateScale(32)}
        type="DOWN"
        bgColor={colors.navBackground}
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
        tabBar={renderCustomTabBarButton}
        
        renderCircle={({ navigate }) => (
          <View style={styles.circleContainer}>
            <View style={[styles.circleBackgroundPatch, { backgroundColor: colors.navBackground }]} />
            
            <TouchableOpacity
              style={[
                styles.btnCircle, 
                { 
                  borderColor: isDarkMode ? '#10B981' : '#00A859',
                  backgroundColor: colors.screenBackground 
                },
                isRestricted && { opacity: 0.5, backgroundColor: '#E5E7EB' }
              ]}
              activeOpacity={0.85}
              onPress={() => handleTabNavigation('Send', navigate)}
            >
              <Icon 
                name="maximize" 
                size={moderateScale(24)} 
                color={isRestricted ? '#9CA3AF' : (isDarkMode ? '#10B981' : '#00A859')} 
              />
            </TouchableOpacity>
          </View>
        )}
      >
        <CurvedBottomBar.Screen name="Home" position="LEFT" component={HomeScreen} />
        <CurvedBottomBar.Screen name="Wallets" position="LEFT" component={WalletScreen} />
        <CurvedBottomBar.Screen name="Send" position="CENTER" component={SendScreen} />
        <CurvedBottomBar.Screen name="Transactions" position="RIGHT" component={TransactionHistory} />
        <CurvedBottomBar.Screen 
          name="Profile" 
          position="RIGHT" 
          component={(props) => <ProfileScreen {...props} isEditable={true} />}
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
}