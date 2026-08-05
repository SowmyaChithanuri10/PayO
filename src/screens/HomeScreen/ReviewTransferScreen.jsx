
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../api/axios';
import Icon from 'react-native-vector-icons/Feather';

import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';

import { theme } from '../../MainTheme/theme';

export default function ReviewTransferScreen({
  route,
  navigation,
}) {
  const {
    receiver,
    amount,
    address,
    sender,
    show,
    isRecent,
  } = route.params;

  console.log(amount, "amount");
  console.log(receiver, address, sender, "7676");

  const [save, setSave] = useState(false);
  const [selfUser, setSelfUser] = useState('');

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const res = await api.get('api/wallet/generate-address');
        const data = res.data;
        setSelfUser(data || 'No Address');
      } catch (err) {
        console.log(
          'QR ERROR:',
          err.response?.data || err.message,
        );
        setSelfUser('');
      }
    };

    fetchQr();
  }, []);

  const handleConfirm = async () => {
    try {
      // Save recent receiver if enabled
      if (save) {
        await api.post('/api/wallet/recent-toggle-add', {
          receiverName: receiver?.name,
          walletAddress: address,
        });
      }

      // Fetch transaction history
      const transactionRes = await api.get('/api/wallet/transaction-list');
      const transactions = transactionRes?.data?.transactions || [];

      // Check if user has at least one successful sent transaction
      const hasSuccessfulSentTransaction = transactions.some(
        (txn) => txn?.type === 'sent' && txn?.status === 'success',
      );

      // If no successful sent transaction
      if (!hasSuccessfulSentTransaction) {
        // Check if Transaction PIN is already created
        if (!sender?.transactionPinSet) {
          Alert.alert(
            'Transaction PIN Not Created',
            'Please set your Transaction PIN to continue.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Set PIN',
                onPress: () =>
                  navigation.navigate('TransactionPin', {
                    amount,
                    name: receiver?.name,
                    address,
                    sender,
                  }),
              },
            ],
          );
          return;
        }

        // Transaction PIN exists
        navigation.navigate('TransactionPin', {
          amount,
          name: receiver?.name,
          address,
          sender,
        });
        return;
      }

      // User has already made a successful sent transaction
      navigation.navigate('SendPin', {
        amount,
        name: receiver?.name,
        address,
        sender,
      });
    } catch (error) {
      console.log(
        'Handle confirm error:',
        error?.response?.data || error?.message,
      );

      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          
          {/* HEADER */}
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Icon name="x" size={moderateScale(20)} color={theme.colors.textMain} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Review Your Transfer Details</Text>

            <View style={styles.topProfileIcon}>
              <Image 
                source={require('../../../assets/images/Profile Icon.png')} 
                style={styles.profileImageSmall}
              />
            </View>
          </View>

          {/* AVATAR CENTER */}
          <View style={styles.avatarOuter}>
            <View style={styles.avatarInner}>
              <Image 
                source={require('../../../assets/images/Profile Icon.png')} 
                style={styles.profileImageLarge}
              />
            </View>
          </View>

          {/* TOTAL TOKENS */}
          <Text style={styles.totalTokensLabel}>Total Tokens</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amountValue}>
              {amount || '0.00'}
            </Text>
            <Text style={styles.payoText}>PAYO</Text>
          </View>

          {/* FROM SECTION */}
          <View style={styles.detailsSection}>
            <Text style={styles.detailLabel}>From</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailName} numberOfLines={1}>
                {sender?.name || 'User 1'}
              </Text>
              <Text style={styles.detailWallet} numberOfLines={1}>
                {sender?.wallet || 'PXY37488R'}
              </Text>
            </View>
            <View style={styles.divider} />
          </View>

          {/* TO SECTION */}
          <View style={styles.detailsSection}>
            <Text style={styles.detailLabel}>To</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailName} numberOfLines={1}>
                {receiver?.name || 'User 2'}
              </Text>
              <Text style={styles.detailWallet} numberOfLines={1}>
                {address || 'PXY21209E'}
              </Text>
            </View>
            <View style={styles.divider} />
          </View>

          {/* CONFIRM BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Confirm and send</Text>
            <Icon name="arrow-right" size={moderateScale(18)} color="#ffffff" style={styles.buttonIcon} />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, // Clean white background
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(40),
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
  },

  // --- Header ---
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },

  closeBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: theme.colors.bgSurface,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
    borderWidth: 1,
    borderColor: '#f3f4f6', // Slight border to define the circle
  },

  headerTitle: {
    fontSize: moderateScale(15),
    fontWeight: theme.typography.weight.semibold || '600',
    color: theme.colors.textMain,
  },

  topProfileIcon: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: theme.colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImageSmall: {
    width: scale(18),
    height: scale(18),
    resizeMode: 'contain',
    tintColor: '#ffffff', // Ensures the icon is white
  },

  // --- Avatar ---
  avatarOuter: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    backgroundColor: '#f3f4f6', // Very light gray outer circle
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },

  avatarInner: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: theme.colors.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImageLarge: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
    tintColor: '#ffffff',
  },

  // --- Tokens / Amount ---
  totalTokensLabel: {
    textAlign: 'center',
    color: theme.colors.textMain,
    fontSize: moderateScale(15),
    fontWeight: theme.typography.weight.medium || '500',
    marginBottom: verticalScale(8),
  },

  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: verticalScale(40),
  },

  amountValue: {
    fontSize: moderateScale(34),
    fontWeight: theme.typography.weight.medium || '500',
    color: theme.colors.textMain,
  },

  payoText: {
    fontSize: moderateScale(14),
    color: theme.colors.statusSuccess || '#10b981', // Green text
    fontWeight: theme.typography.weight.semibold || '600',
    marginLeft: scale(8),
    marginBottom: verticalScale(4), // Aligns nicely with the baseline of the large number
  },

  // --- Details Section (From / To) ---
  detailsSection: {
    marginBottom: verticalScale(20),
  },

  detailLabel: {
    color: theme.colors.primaryBlue, // Small blue labels
    fontSize: moderateScale(11),
    fontWeight: theme.typography.weight.semibold || '600',
    marginBottom: verticalScale(8),
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailName: {
    fontSize: moderateScale(15),
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    flex: 1,
  },

  detailWallet: {
    fontSize: moderateScale(14),
    color: theme.colors.textMain,
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.textMuted || '#9ca3af',
    marginTop: verticalScale(12),
    opacity: 0.5, // Makes the line subtle like the design
  },

  // --- Button ---
  button: {
    backgroundColor: theme.colors.primaryIndigo || '#4f46e5', // Slightly purplish blue as per the figma button
    flexDirection: 'row',
    paddingVertical: verticalScale(16),
    borderRadius: theme.borderRadius.sm || 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(40),
  },

  buttonText: {
    color: '#ffffff',
    fontSize: moderateScale(15),
    fontWeight: theme.typography.weight.semibold || '600',
  },

  buttonIcon: {
    marginLeft: scale(12),
  },
});