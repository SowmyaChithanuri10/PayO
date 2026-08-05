
import React, { useMemo, useCallback } from 'react';
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

import HomeScreen from '../HomeScreen/HomeScreen';
import SendScreen from './sendScreen';
import TransactionHistory from '../HomeScreen/TransactionHistory';
import WalletScreen from '../HomeScreen/WalletScreen';
import ProfileScreen from '../UserProfile/UserProfile';

import { getThemeColors, styles } from './BottomTabStyling';
import { useAppSelector } from '../../redux/hooks';

export default function CurvedTabs({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const dashboardStats = useAppSelector((state) => state.deposit.dashboardStats);

  const colors = useMemo(() => getThemeColors(isDarkMode), [isDarkMode]);
  const walletData = useAppSelector((state) => state.deposit.walletData);
  const totalTransactions = dashboardStats?.totalTransactions ?? 0;
  const successfulTransactions = dashboardStats?.successfulTransactions ?? 0;

  const checkIsRouteRestricted = useCallback(
    (routeName) => {
      if (routeName === 'Home') {
        return false; 
      }

      if (routeName === 'Transactions') {
        return totalTransactions === 0;
      }

      if (routeName === 'Wallets' || routeName === 'Profile' || routeName === 'Send') {
        return !(totalTransactions > 0 && successfulTransactions > 0 && (walletData?.Transaction_Amount ?? 0) >= 100);
      }

      return false;
    },
    [totalTransactions, successfulTransactions]
  );

  const getIconName = (routeName) => {
    switch (routeName) {
      case 'Home':
        return 'home';
      case 'Wallets':
        return 'credit-card';
      case 'Transactions':
        return 'repeat';
      case 'Profile':
        return 'user';
      default:
        return 'help-circle';
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

  const handleTabNavigation = (routeName, tabNavigate) => {
    const isRestricted = checkIsRouteRestricted(routeName);

    if (isRestricted) {
      const isPendingApproval = totalTransactions > 0 && successfulTransactions === 0;

      if (isPendingApproval) {
        Alert.alert(
          'Account Pending Verification',
          'Your transaction has been received. Please wait for approval from the administrator to unlock this feature.',
          [{ text: 'okay', style: 'default' }]
        );
      } else {
        Alert.alert(
          'Access Restricted',
          'You need an active deposit to access this feature. Please complete a deposit into your wallet.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Add Money',
              onPress: () => navigation.navigate('AddMoneytoWallet'),
            },
          ],
          { cancelable: true }
        );
      }
    } else {
      tabNavigate(routeName);
    }
  };

  const renderCustomTabBarButton = ({ routeName, selectedTab, navigate }) => {
    const isFocused = routeName === selectedTab;
    const iconName = getIconName(routeName);
    const label = getLabelText(routeName);
    const isTabRestricted = checkIsRouteRestricted(routeName);

    return (
      <TouchableOpacity
        onPress={() => handleTabNavigation(routeName, navigate)}
        style={[styles.tabBarButton, isTabRestricted && { opacity: 0.4 }]}
        activeOpacity={0.7}
      >
        <View
          style={[
            isFocused ? styles.navActiveBg : styles.navInactiveIconContainer,
            isFocused && { backgroundColor: colors.activeTabBg },
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
              fontWeight: isFocused ? '700' : '500',
            },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const isCenterButtonRestricted = checkIsRouteRestricted('Send');

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
                  backgroundColor: colors.screenBackground,
                },
                isCenterButtonRestricted && { opacity: 0.4, backgroundColor: '#E5E7EB' },
              ]}
              activeOpacity={0.85}
              onPress={() => handleTabNavigation('Send', navigate)}
            >
              <Icon
                name="maximize"
                size={moderateScale(24)}
                color={isCenterButtonRestricted ? '#9CA3AF' : isDarkMode ? '#10B981' : '#00A859'}
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