import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../../MainTheme/theme'; // <-- Adjust this path
import { styles } from './RewardDetailsStyles'; // <-- Adjust this path
import MainHeader from '../../components/MainHeader'; // <-- Adjust this path

const RewardDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bgApp} />

      {/* Main Header Component */}
      <MainHeader 
        title="Reward Details" 
        onHelpPress={() => console.log('Help pressed')} 
      />

      <View style={styles.contentWrapper}>
        
        {/* Top Profile/Coin Section */}
        <View style={styles.headerSection}>
          <View style={styles.coinContainer}>
            <Text style={styles.coinText}>S</Text>
          </View>
          <Text style={styles.rewardTitle}>Silver Coin</Text>
          <Text style={styles.rewardSubtitle}>Silver Partner</Text>
        </View>

        {/* Details Table */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Milestone Amount</Text>
            <Text style={styles.detailValue}>₹ 25,00,000</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Completion Date</Text>
            <Text style={styles.detailValue}>12 Sep 2026</Text>
          </View>

          {/* Remove bottom border for the last row */}
          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>Received</Text>
            </View>
          </View>
        </View>

        {/* Flexible spacer that pushes the element below it to the bottom */}
        <View style={styles.spacer} />

        {/* Bottom Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconWrapper}>
            <View style={styles.infoIconInner}>
              <Feather name="info" size={14} color={theme.colors.primaryBlue} />
            </View>
          </View>
          <Text style={styles.infoText}>
            This reward is awarded only once upon milestone completion.
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default RewardDetails;