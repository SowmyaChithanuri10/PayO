

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

// Imports
import ScanQRScreen from '../ScanQRScreen';
import EnterAddressScreen from '../HomeScreen/enterAddress';
import EnterAmountScreen from '../HomeScreen/EnterAmountScreen';
import Recents from '../HomeScreen/Recents';
import SendTabs from './SendTabs';

import { scale, verticalScale, moderateScale } from '../../utils/responsive';
import { theme } from '../../MainTheme/theme';

export default function SendScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('scan');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (route?.params?.tab) {
      setActiveTab(route.params.tab);
    }
  }, [route]);

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'scan': return 'Scan QR';
      case 'address': return 'Enter Address';
      case 'recents': return 'Recent Transactions';
      default: return 'Send tokens';
    }
  };

  const getHeaderSubtitle = () => {
    switch (activeTab) {
      case 'scan': return 'Send tokens instantly';
      case 'address': return 'Send tokens';
      case 'recents': return 'Send tokens to recent contacts';
      default: return '';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'scan': return <ScanQRScreen setSelectedUser={setSelectedUser} setActiveTab={setActiveTab} />;
      case 'address': return <EnterAddressScreen navigation={navigation} />;
      case 'amount': return <EnterAmountScreen name={selectedUser?.name} address={selectedUser?.address} setActiveTab={setActiveTab} navigation={navigation} />;
      case 'recents': return <Recents navigation={navigation} setSelectedUser={setSelectedUser} setActiveTab={setActiveTab} />;
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {activeTab !== 'amount' && (
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <View style={styles.backBtnCircle}>
               <Icon name="chevron-left" size={24} color="#285CE0" />
            </View>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>{getHeaderTitle()}</Text>
            <Text style={styles.headerSubtitle}>{getHeaderSubtitle()}</Text>
          </View>
          <View style={styles.profileContainer}>
             <Image 
                source={require('../../../assets/images/Profile Icon.png')} 
                style={styles.profileIcon}
              />
          </View>
        </View>
      )}

      {activeTab !== 'amount' && (
        <SendTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>{renderContent()}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
  },
  flex: { flex: 1 },
  content: { flex: 1 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  backBtnCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(20),
    backgroundColor: theme.colors.bgSurface,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    color: theme.colors.textMain,
    fontSize: moderateScale(18),
    fontWeight: theme.typography.weight.bold,
  },
  headerSubtitle: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
  },
  profileContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(20),
    backgroundColor: theme.colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: '#ffffff',
    resizeMode: 'contain',
  },
});
