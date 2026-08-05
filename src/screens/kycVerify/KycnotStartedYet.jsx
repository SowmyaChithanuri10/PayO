import React, { useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import styles from './KycNotStartedStyles';
import { theme } from '../../MainTheme/theme';

export default function KycNotStarted({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      navigation.replace('Onboarding3');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={styles.safeArea}
    >
      <StatusBar
        translucent={false}
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.replace('Onboarding3')}
            >
              <Icon
                name="chevron-left"
                size={28}
                color="#05070D" 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.loaderWrapper}>
            <View style={styles.loaderOuter}>
              <View style={styles.loaderInner}>
                <Icon
                  name="file-text"
                  size={24}
                  color={theme.colors.primaryBlue || '#285CE0'} // Blue icon
                />
              </View>
            </View>

            <View style={styles.kycStatusRow}>
              <View style={styles.kycStatusDot} />
              <Text style={styles.kycText}>KYC Not Started</Text>
            </View>
          </View>

          <Text style={styles.title}>
            Complete Your KYC
          </Text>

          <Text style={styles.subTitle}>
            KYC verification has not been started yet.{'\n'}
            Please complete the process and upload{'\n'}
            the required documents.
          </Text>

          <View style={styles.card}>
            
            <View style={styles.row}>
              <View style={styles.leftContent}>
                <View style={styles.listBullet} />
                <Text style={styles.leftText}>Account Created</Text>
              </View>
              <Text style={styles.completedText}>Completed</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.leftContent}>
                <View style={styles.listBullet} />
                <Text style={styles.leftText}>Documents Uploaded</Text>
              </View>
              <Text style={styles.pendingText}>Not Started</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.leftContent}>
                <View style={styles.listBullet} />
                <Text style={styles.leftText}>KYC Verification</Text>
              </View>
              <Text style={styles.pendingText}>Not Started</Text>
            </View>

            <View style={[styles.row, { marginBottom: 0 }]}>
              <View style={styles.leftContent}>
                <View style={styles.listBullet} />
                <Text style={styles.leftText}>Wallet Activated</Text>
              </View>
              <Text style={styles.pendingText}>Pending</Text>
            </View>

          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('KYCVerification')}
          >
            <Text style={styles.buttonText}>
              Complete KYC
            </Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}