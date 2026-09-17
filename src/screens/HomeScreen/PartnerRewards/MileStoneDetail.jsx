import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // React Native CLI import
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../../MainTheme/theme'; // <-- Adjust this path
import { styles } from './MileStoneDetailStyles'; // <-- Adjust this path
import MainHeader from '../../components/MainHeader'; // <-- Adjust this path

const MileStoneDetail = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bgApp} />

      <MainHeader 
        title="Silver Partner" 
        onHelpPress={() => console.log('Help pressed')} 
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Profile Section */}
        <View style={styles.topSection}>
          <View style={styles.coinPlaceholder}>
            <Text style={styles.coinText}>S</Text>
          </View>
          <Text style={styles.milestoneTitle}>Silver Partner</Text>
          <Text style={styles.milestoneSubtitle}>Achieve ₹ 25,00,000 Business</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <LinearGradient
              colors={[theme.colors.primaryBlue, theme.colors.primaryIndigo]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBarFill, { width: '75%' }]}
            />
          </View>
          <View style={styles.progressLabelsRow}>
            <Text style={styles.progressAmount}>
              ₹ 18,75,000 <Text style={styles.progressTotal}>/ ₹ 25,00,000</Text>
            </Text>
            <Text style={styles.progressPercent}>75%</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Card 1: Slab Rate */}
          <View style={[styles.statCard, styles.statCardMargin]}>
            <View style={styles.statHeader}>
              <View style={styles.iconCircle}>
                <Feather name="percent" size={18} color={theme.colors.primaryPurple} />
              </View>
              <Text style={styles.statLabel}>Current Slab Rate</Text>
            </View>
            <Text style={styles.statValue}>7%</Text>
            <Text style={styles.statSubText}>(₹ 15L – 25L)</Text>
          </View>

          {/* Card 2: Bonus */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <View style={styles.iconCircle}>
                <Feather name="gift" size={18} color={theme.colors.primaryPurple} />
              </View>
              <Text style={styles.statLabel}>Completion Bonus</Text>
            </View>
            <Text style={styles.statValue}>4%</Text>
            <Text style={styles.statSubText}>on first ₹ 15L</Text>
          </View>
        </View>

        {/* Milestone Reward */}
        <TouchableOpacity style={styles.rewardCard}>
          <View style={styles.miniCoin}>
            <Text style={styles.miniCoinText}>S</Text>
          </View>
          <View style={styles.rewardTextCol}>
            <Text style={styles.rewardLabel}>Milestone Reward</Text>
            <Text style={styles.rewardTitle}>Silver Coin</Text>
          </View>
          <Feather name="chevron-right" size={24} color={theme.colors.textMain} />
        </TouchableOpacity>

        {/* How to Earn */}
        <View style={styles.howToEarnSection}>
          <Text style={styles.howToEarnTitle}>How to Earn?</Text>
          
          <View style={styles.listItem}>
            <View style={styles.listNumberCircle}>
              <Text style={styles.listNumberText}>1</Text>
            </View>
            <Text style={styles.listText}>Generate business within ₹15L - 25L to earn 7%.</Text>
          </View>

          <View style={styles.listItem}>
            <View style={styles.listNumberCircle}>
              <Text style={styles.listNumberText}>2</Text>
            </View>
            <Text style={styles.listText}>Complete ₹ 25L to get 4% completion bonus (on first ₹ 15L).</Text>
          </View>

          <View style={styles.listItem}>
            <View style={styles.listNumberCircle}>
              <Text style={styles.listNumberText}>3</Text>
            </View>
            <Text style={styles.listText}>Receive Silver Coin reward (once).</Text>
          </View>
        </View>

      </ScrollView>

      {/* Floating Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity activeOpacity={0.8}
        onPress={() => navigation.navigate('RewardsOverview')}>
          <LinearGradient
            colors={[theme.colors.primaryIndigo, theme.colors.primaryBlue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBtn}
          >
            <Text style={styles.gradientBtnText}>View My Business</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MileStoneDetail;