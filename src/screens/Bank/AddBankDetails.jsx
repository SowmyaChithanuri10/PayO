
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './AddBankDetailsStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AddBankDetails = ({ navigation }) => {
  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India',
    'Kotak Mahindra Bank',
    'IndusInd Bank',
    'IDBI Bank',
    'Yes Bank',
    'Central Bank of India',
    'Indian Bank',
    'UCO Bank',
    'Bank of India',
    'Federal Bank',
    'South Indian Bank',
    'RBL Bank',
    'Bandhan Bank',
  ];

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    accountType: 'Savings',
    bank: '',
    account: '',
    confirmAccount: '',
    ifsc: '',
  });
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const Label = ({ text }) => (
    <Text style={styles.label}>
      {text} <Text style={styles.required}>*</Text>
    </Text>
  );

  const validateForm = () => {
    const { name, mobile, bank, account, confirmAccount, ifsc } = form;

    if (!name) {
      Alert.alert('Validation Error', 'Account Holder Name is required.');
      return false;
    }
    if (!mobile || mobile.length !== 10) {
      Alert.alert('Validation Error', 'Mobile number must be 10 digits.');
      return false;
    }
    if (!bank) {
      Alert.alert('Validation Error', 'Please select a bank.');
      return false;
    }
    if (!account) {
      Alert.alert('Validation Error', 'Account number is required.');
      return false;
    }
    if (account !== confirmAccount) {
      Alert.alert('Validation Error', 'Account numbers do not match.');
      return false;
    }
    if (!ifsc || ifsc.length < 11) {
      Alert.alert('Validation Error', 'IFSC code must be at least 11 characters.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      await AsyncStorage.setItem('bankDetails', JSON.stringify(form));
      navigation.navigate('BankAddedScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to save bank details.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // ✅ offset so inputs aren’t hidden
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header }>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation?.goBack?.()}
            >
              <Icon name="chevron-left" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>Add Bank Account</Text>

            <TouchableOpacity style={styles.iconButtonRight}>
              <Icon name="help-circle" size={22} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Securely link your bank account to send and receive money.
          </Text>

          {/* Account Holder Name */}
          <Label text="Account Holder Name" />
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />

          {/* Mobile Number */}
          <Label text="Mobile Number" />
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            keyboardType="numeric"
            value={form.mobile}
            onChangeText={(text) => handleChange('mobile', text)}
          />

          {/* Account Type */}
          <Label text="Account Type" />
          <View style={styles.radioGroup}>
            {['Savings', 'Current'].map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.radioRow}
                onPress={() => handleChange('accountType', type)}
              >
                <View
                  style={[
                    styles.radioOuter,
                    form.accountType === type && styles.radioOuterActive,
                  ]}
                >
                  {form.accountType === type && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioText}>{type} Account</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Select Bank */}
          <Label text="Select Bank" />
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownText}>
              {form.bank || 'Select Bank'}
            </Text>
            <Icon
              name={showDropdown ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#777"
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownList}>
              <FlatList
                data={banks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      handleChange('bank', item);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
                scrollEnabled={true}
                nestedScrollEnabled={true}
              />
            </View>
          )}

          {/* Account Number */}
          <Label text="Account Number" />
          <TextInput
            style={styles.input}
            placeholder="Enter Account Number"
            keyboardType="numeric"
            value={form.account}
            onChangeText={(text) => handleChange('account', text)}
          />

          {/* Confirm Account Number */}
          <Label text="Confirm Account Number" />
          <TextInput
            style={styles.input}
            placeholder="Confirm Account Number"
            keyboardType="numeric"
            value={form.confirmAccount}
            onChangeText={(text) => handleChange('confirmAccount', text)}
          />

          {/* IFSC Code */}
          <Label text="IFSC Code" />
          <TextInput
            style={styles.input}
            placeholder="Enter IFSC Code"
            autoCapitalize="characters"
            value={form.ifsc}
            onChangeText={(text) => handleChange('ifsc', text)}
          />

          {/* Save Button */}
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>
              Save and Continue <Icon name="arrow-right" size={16} color="#fff" />
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddBankDetails;

