

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles from './BankAccInitStyles';

const BankAccInit = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButtonCircle} onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Bank Account</Text>
          <View style={styles.helpIcon}>
            <Icon name="help-circle-outline" size={22} color="#5B4BFF" />
          </View>
        </View>

        <Text style={styles.subText}>
          Securely link your bank account to send and receive money
        </Text>

        {/* Illustration */}
        <Image
          source={require('../../../assets/images/addBankdetails/Bank 1.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Features - horizontal row with gray circle behind icon */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconWrapper}>
              <Image
                source={require('../../../assets/images/addBankdetails/Secure Icon.png')}
                style={styles.featureIcon}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.featureTitle}>100% Secure</Text>
              <Text style={styles.featureDesc}>Your data is safe with us</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconWrapper}>
              <Image
                source={require('../../../assets/images/addBankdetails/Verification Icon.png')}
                style={styles.featureIcon}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.featureTitle}>Instant Verification</Text>
              <Text style={styles.featureDesc}>Quick account verification</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconWrapper}>
              <Image
                source={require('../../../assets/images/addBankdetails/wallet (1).png')}
                style={styles.featureIcon}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.featureTitle}>Easy Payments</Text>
              <Text style={styles.featureDesc}>Send & receive money instantly</Text>
            </View>
          </View>
        </View>

        {/* Security Info */}
        <View style={styles.securityContainer}>
          <View style={styles.securityLeft}>
            <Image
              source={require('../../../assets/images/addBankdetails/Secure Icon.png')}
              style={styles.securityIcon}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.securityTitle}>Secure & Trusted</Text>
              <Text style={styles.securityDesc}>Your account is protected with bank‑grade security.</Text>
            </View>
          </View>
          <Image
            source={require('../../../assets/images/addBankdetails/Create pin 1.png')}
            style={styles.securityIconRight}
            resizeMode="contain"
          />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddBankDetails')}>
          <Text style={styles.buttonText}>Add New Bank Account →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankAccInit;