

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
// React Native CLI specific imports:
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../../MainTheme/theme'; // Adjust import path
import { styles } from './RewardsOverviewStyles'; // Adjust import path
import MainHeader from '../../components/MainHeader'; // <-- ADJUST THIS PATH to where your MainHeader is saved

const RewardsOverview = ({ navigation }) => {
  const steps = [
    { id: '1', title: 'Partner', amount: '₹10L', status: 'completed' },
    { id: '2', title: 'Senior', amount: '₹15L', status: 'completed' },
    { id: '3', title: 'Silver', amount: '₹25L', status: 'active' },
    { id: '4', title: 'Gold', amount: '₹50L', status: 'locked' },
    { id: '5', title: 'Platinum', amount: '₹1Cr', status: 'locked' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bgApp} />
      
      {/* Updated Header using MainHeader Component */}
      <MainHeader 
        title="Partner Rewards" 
        onHelpPress={() => console.log('Help pressed')} 
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Current Level Gradient Card */}
        <LinearGradient
          colors={[theme.colors.primaryBlue, theme.colors.primaryIndigo]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.levelCard}
        >
          <View style={styles.levelCardHeader}>
            <View style={styles.coinIconContainer}>
              <MaterialCommunityIcons name="shield-star-outline" size={30} color={theme.colors.white} />
            </View>
            <View>
              <Text style={styles.currentLevelLabel}>Your Current Level</Text>
              <Text style={styles.currentLevelTitle}>Silver Partner</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '75%' }]} />
            </View>
          </View>

          <View style={styles.progressTextRow}>
            <Text style={styles.progressAmountText}>₹ 18,75,000 / ₹ 25,00,000</Text>
            <Text style={styles.progressPercentText}>75%</Text>
          </View>
        </LinearGradient>

        {/* Next Milestone */}
        <View style={styles.nextMilestoneRow}>
          <View>
            <Text style={styles.nextMilestoneLabel}>Next Milestone</Text>
            <Text style={styles.nextMilestoneAmount}>₹ 25,00,000</Text>
          </View>
          <View style={styles.pillButton}>
            <Text style={styles.pillButtonText}>25% to go</Text>
          </View>
        </View>

        {/* Milestone Journey Stepper */}
        <View style={styles.journeyHeaderRow}>
          <Text style={styles.journeyTitle}>Milestone Journey</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All &gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepperContainer}>
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <View key={step.id} style={{ flex: isLast ? 0 : 1 }}>
                {/* Connecting Lines */}
                {!isLast && (
                  <View 
                    style={[
                      styles.stepLine, 
                      step.status === 'completed' && styles.stepLineCompleted
                    ]} 
                  />
                )}
                
                {/* Step Circle */}
                <View style={styles.stepWrapper}>
                  {step.status === 'completed' ? (
                    <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
                      <Feather name="check" size={16} color={theme.colors.white} />
                    </View>
                  ) : step.status === 'active' ? (
                    <View style={styles.stepCircleActiveOuter}>
                      <View style={styles.stepCircleActiveInner} />
                    </View>
                  ) : (
                    <View style={[styles.stepCircle, styles.stepCircleLocked]}>
                      <Feather name="lock" size={14} color={theme.colors.white} />
                    </View>
                  )}
                  
                  {/* Step Labels */}
                  <Text style={[styles.stepTitle, step.status === 'active' && styles.stepTitleActive]}>
                    {step.title}
                  </Text>
                  <Text style={[styles.stepAmount, step.status === 'active' && styles.stepAmountActive]}>
                    {step.amount}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Menu Options */}
        <TouchableOpacity style={styles.menuCard} 
        onPress={() => navigation.navigate('RewardStruct')}>
          <View style={[styles.menuIconWrapper, { backgroundColor: '#FEE2E2' }]}>
             <Feather name="gift" size={24} color="#EF4444" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Reward Structure</Text>
            <Text style={styles.menuSubtitle}>View all milestones and benefits</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.grey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard}
        onPress={() => navigation.navigate('RewardHistory')}>
          <View style={[styles.menuIconWrapper, { backgroundColor: '#FEF3C7' }]}>
             <Ionicons name="trophy-outline" size={24} color="#F59E0B" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Your Rewards</Text>
            <Text style={styles.menuSubtitle}>Scratch cards, coins, devices & more</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.grey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard}>
          <View style={[styles.menuIconWrapper, { backgroundColor: '#F3E8FF' }]}>
             <Ionicons name="book-outline" size={24} color={theme.colors.primaryPurple} />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>How It Works</Text>
            <Text style={styles.menuSubtitle}>Know about partner rewards</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.grey} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardsOverview;