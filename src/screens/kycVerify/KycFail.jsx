import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './KycFailStyles';

export default function KycFail({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={styles.mainWrapper}>
        <Image 
          source={require('../../../assets/images/waves.png')} 
          style={styles.wavesBg} 
        />

        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <Image 
              source={require('../../../assets/images/kycscreens/Warning Icon.png')} 
              style={styles.warningIcon} 
            />
            <Text style={styles.title}>
              Oops! Verification Didn’t Go{'\n'}Through
            </Text>
            <Text style={styles.subTitle}>
              Your verification was unsuccessful.
            </Text>
            <Text style={styles.instructions}>
              Please ensure:{'\n'}
              • Aadhaar & PAN details match exactly{'\n'}
              • Images are clear and not cropped
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.retryBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('KYCVerification')}
            >
              <Text style={styles.retryBtnText}>
                Retry
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.supportBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.supportBtnText}>
                Contact Support
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}