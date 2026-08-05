import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import styles from './KycCompleteStyles'; 

export default function KycComplete({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F9FFFB" barStyle="dark-content" />
      <View style={styles.mainWrapper}>
        <Image 
          source={require('../../../assets/images/waves.png')} 
          style={styles.wavesBg} 
        />

        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-left" size={28} color="#05070D" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>
            KYC Submitted Successfully!
          </Text>
          <Image 
            source={require('../../../assets/images/kycscreens/Bank added 1.png')} 
            style={styles.illustration} 
          />
          <Text style={styles.subTitle}>
            Thank you for submitting your{"\n"}document we'll verify it and complete{"\n"}your KYC as soon as possible
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.homeBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Main')}
            >
              <Text style={styles.homeBtnText}>
                Go Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('KYCVerification')}
            >
              <Text style={styles.backBtnText}>
                Back to Start
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}
