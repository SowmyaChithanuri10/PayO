
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';

import api from '../../api/axios';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';

import { theme } from '../../MainTheme/theme';

export default function EnterAmountScreen({
  navigation,
  name,
  address,
  setActiveTab,
  show,
}) {
  const [amount, setAmount] = useState('');
  const [available, setAvailable] = useState('');
  const [senderData, setSenderData] = useState({});
  const [message, setMessage] = useState('');
  const route = useRoute();
  const Transname = route?.params?.name;
  const Transaddress = route?.params?.address;
  const TransrouteAmount = route?.params?.amount;
  const TransShow = route?.params?.show;

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await api.get('/api/wallet/balance');
        setAvailable(response?.data?.balance || '0');
      } catch (error) {
        console.log('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await api.get('/api/wallet/profile');
        setSenderData(res?.data?.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProfileData();
  }, [navigation]);

  const handleContinue = async () => {
    const data = address || Transaddress;

    if (!data) {
      Alert.alert('Error', 'Enter valid wallet address');
      return;
    }

    try {
      await api.post('/api/wallet/transfer/preview', {
        toAddress: data,
        amount,
      });
      const transactionRes = await api.get('/api/wallet/transaction-list');
      const transactions = transactionRes?.data?.transactions || [];
      const hasSentTransaction = transactions.some(
        (txn) => txn?.type === 'sent' && txn?.status === 'success'
      );

      if (!hasSentTransaction) {
        if (!senderData?.transactionPinSet) {
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
                    amount: TransShow ? TransrouteAmount : amount,
                    name: TransShow ? Transname : name,
                    address: TransShow ? Transaddress : address,
                    senderData,
                  }),
              },
            ],
            { cancelable: false }
          );
          return;
        }

        navigation.navigate('TransactionPin', {
          amount: TransShow ? TransrouteAmount : amount,
          name: TransShow ? Transname : name,
          address: TransShow ? Transaddress : address,
          senderData,
        });
        return;
      }
      navigation.navigate('SendPin', {
        amount: TransShow ? TransrouteAmount : amount,
        name: TransShow ? Transname : name,
        address: TransShow ? Transaddress : address,
        senderData,
      });
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Something went wrong');
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

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Total TokensTransfer Details</Text>
          <View style={styles.amountCard}>
            <View style={styles.amountRow}>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9.]/g, '');
                  setAmount(cleaned);
                  setMessage('');
                }}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor={theme.colors.textMuted}
                cursorColor={theme.colors.primaryBlue}
                maxLength={8}
              />
              <Text style={styles.currency}>PAYO</Text>
            </View>
          </View>
          <Text style={styles.toText}>
            To - {name || Transname}
          </Text>
          <Text style={styles.address} numberOfLines={1}>
            {address || Transaddress}
          </Text>

          {message ? <Text style={styles.errorText}>{message}</Text> : null}

          <View style={styles.row}>
            {['100', '300', '500', '700'].map((val) => (
              <TouchableOpacity
                key={val}
                style={styles.quickBtn}
                activeOpacity={0.7}
                onPress={() => {
                  setAmount(val);
                  setMessage('');
                }}
              >
                <Text style={styles.quickText}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.balanceBox}>
            <Text style={styles.balanceText}>Available balance</Text>
            <Text style={styles.balanceAmount}>{available} PAYO</Text>
          </View>

          <TouchableOpacity
            style={styles.continueBtn}
            activeOpacity={0.8}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, 
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(40),
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
  },

  cancel: {
    color: theme.colors.textMuted || '#6b7280',
    fontSize: moderateScale(15),
    marginBottom: verticalScale(16),
  },
  
  title: {
    color: theme.colors.textMain,
    textAlign: 'center',
    fontSize: moderateScale(18),
    fontWeight: theme.typography.weight.medium || '500',
    marginBottom: verticalScale(24),
  },

  amountCard: {
    backgroundColor: '#e0f2fe', 
    borderColor: theme.colors.primaryBlue, 
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl || 24,
    paddingVertical: verticalScale(30),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(20), 
    marginBottom: verticalScale(32),
    ...theme.shadows.sm, 
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountInput: {
    fontSize: moderateScale(36),
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    textAlign: 'center',
    minWidth: scale(100),
    padding: 0, 
  },
  currency: {
    fontSize: moderateScale(16),
    color: theme.colors.statusSuccess || '#10b981',
    fontWeight: theme.typography.weight.semibold || '600',
    marginLeft: scale(8),
    marginTop: verticalScale(8), 
  },

  toText: {
    color: theme.colors.textMain,
    textAlign: 'center',
    marginBottom: verticalScale(8),
    fontSize: moderateScale(16),
    fontWeight: theme.typography.weight.medium || '500',
  },
  address: {
    color: theme.colors.textMuted || '#6b7280',
    textAlign: 'center',
    fontSize: moderateScale(14),
    marginBottom: verticalScale(32), 
  },

  errorText: {
    color: theme.colors.statusDanger || '#ef4444',
    textAlign: 'center',
    marginBottom: verticalScale(16),
    fontSize: moderateScale(13),
    marginTop: verticalScale(-16),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(32),
  },
  quickBtn: {
    backgroundColor: '#e5e7eb',
    paddingVertical: verticalScale(12),
    flex: 1,
    marginHorizontal: scale(4),
    borderRadius: theme.borderRadius.sm || 8,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  quickText: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    fontSize: moderateScale(14),
  },

  balanceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(8),
    marginBottom: verticalScale(24),
  },
  balanceText: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(14),
  },
  balanceAmount: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    fontSize: moderateScale(14),
  },

  continueBtn: {
    backgroundColor: theme.colors.primaryBlue,
    paddingVertical: verticalScale(16),
    borderRadius: theme.borderRadius.sm || 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    color: '#ffffff',
    fontWeight: theme.typography.weight.semibold || '600',
    fontSize: moderateScale(16),
  },
});