

// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
// // React Native CLI specific imports:
// import LinearGradient from 'react-native-linear-gradient';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { theme } from '../../../MainTheme/theme';
// import { styles } from './RewardsOverviewStyles';
// import MainHeader from '../../components/MainHeader';
// import axios from 'axios';
// import api from '../../../api/axios';

// const RewardsOverview = ({ navigation }) => {
//   const steps = [
//     { id: '1', title: 'Partner', amount: '₹10L', status: 'completed' },
//     { id: '2', title: 'Senior', amount: '₹15L', status: 'completed' },
//     { id: '3', title: 'Silver', amount: '₹25L', status: 'active' },
//     { id: '4', title: 'Gold', amount: '₹50L', status: 'locked' },
//     { id: '5', title: 'Platinum', amount: '₹1Cr', status: 'locked' },
//   ];

//   const [milestones, setMilestones] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchMilestones = async () => {
//   try {
//     setLoading(true);
//     setError(null);

//      const response = await api.get('/api/reward/partner-reward-milestones');
//     // const response = await axios.get(
//     //   'http://localhost:3001/api/reward/partner-reward-milestones'
//     // );

//     console.log('Partner Reward Milestones Response:', response.data);

//     setMilestones(response.data.Data || []);
//   } catch (error) {
//     console.error(
//       'Partner Reward Milestones API Error:',
//       error.response?.data || error.message
//     );

//     setError(error.response?.data?.message || 'Failed to load milestones');
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => {
//   fetchMilestones();
// }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bgApp} />

//       {/* Updated Header using MainHeader Component */}
//       <MainHeader
//         title="Partner Rewards"
//         onHelpPress={() => console.log('Help pressed')}
//       />

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

//         {/* Current Level Gradient Card */}
//         <LinearGradient
//           colors={[theme.colors.primaryBlue, theme.colors.primaryIndigo]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.levelCard}
//         >
//           <View style={styles.levelCardHeader}>
//             <View style={styles.coinIconContainer}>
//               <MaterialCommunityIcons name="shield-star-outline" size={30} color={theme.colors.white} />
//             </View>
//             <View>
//               <Text style={styles.currentLevelLabel}>Your Current Level</Text>
//               <Text style={styles.currentLevelTitle}>Silver Partner</Text>
//             </View>
//           </View>

//           <View style={styles.progressContainer}>
//             <View style={styles.progressBarBg}>
//               <View style={[styles.progressBarFill, { width: '75%' }]} />
//             </View>
//           </View>

//           <View style={styles.progressTextRow}>
//             <Text style={styles.progressAmountText}>₹ 18,75,000 / ₹ 25,00,000</Text>
//             <Text style={styles.progressPercentText}>75%</Text>
//           </View>
//         </LinearGradient>

//         {/* Next Milestone */}
//         <View style={styles.nextMilestoneRow}>
//           <View>
//             <Text style={styles.nextMilestoneLabel}>Next Milestone</Text>
//             <Text style={styles.nextMilestoneAmount}>₹ 25,00,000</Text>
//           </View>
//           <View style={styles.pillButton}>
//             <Text style={styles.pillButtonText}>25% to go</Text>
//           </View>
//         </View>

//         {/* Milestone Journey Stepper */}
//         <View style={styles.journeyHeaderRow}>
//           <Text style={styles.journeyTitle}>Milestone Journey</Text>
//           <TouchableOpacity>
//             <Text style={styles.viewAllText}>View All &gt;</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.stepperContainer}>
//           {steps.map((step, index) => {
//             const isLast = index === steps.length - 1;
//             return (
//               <View key={step.id} style={{ flex: isLast ? 0 : 1 }}>
//                 {/* Connecting Lines */}
//                 {!isLast && (
//                   <View
//                     style={[
//                       styles.stepLine,
//                       step.status === 'completed' && styles.stepLineCompleted
//                     ]}
//                   />
//                 )}

//                 {/* Step Circle */}
//                 <View style={styles.stepWrapper}>
//                   {step.status === 'completed' ? (
//                     <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
//                       <Feather name="check" size={16} color={theme.colors.white} />
//                     </View>
//                   ) : step.status === 'active' ? (
//                     <View style={styles.stepCircleActiveOuter}>
//                       <View style={styles.stepCircleActiveInner} />
//                     </View>
//                   ) : (
//                     <View style={[styles.stepCircle, styles.stepCircleLocked]}>
//                       <Feather name="lock" size={14} color={theme.colors.white} />
//                     </View>
//                   )}

//                   {/* Step Labels */}
//                   <Text style={[styles.stepTitle, step.status === 'active' && styles.stepTitleActive]}>
//                     {step.title}
//                   </Text>
//                   <Text style={[styles.stepAmount, step.status === 'active' && styles.stepAmountActive]}>
//                     {step.amount}
//                   </Text>
//                 </View>
//               </View>
//             );
//           })}
//         </View>

//         {/* Menu Options */}
//         <TouchableOpacity style={styles.menuCard}
//           onPress={() => navigation.navigate('RewardStruct')}>
//           <View style={[styles.menuIconWrapper, { backgroundColor: '#FEE2E2' }]}>
//             <Feather name="gift" size={24} color="#EF4444" />
//           </View>
//           <View style={styles.menuTextContainer}>
//             <Text style={styles.menuTitle}>Reward Structure</Text>
//             <Text style={styles.menuSubtitle}>View all milestones and benefits</Text>
//           </View>
//           <Ionicons name="chevron-forward" size={20} color={theme.colors.grey} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.menuCard}>
//           <View style={[styles.menuIconWrapper, { backgroundColor: '#FEF3C7' }]}>
//             <Ionicons name="trophy-outline" size={24} color="#F59E0B" />
//           </View>
//           <View style={styles.menuTextContainer}>
//             <Text style={styles.menuTitle}>Your Rewards</Text>
//             <Text style={styles.menuSubtitle}>Scratch cards, coins, devices & more</Text>
//           </View>
//           <Ionicons name="chevron-forward" size={20} color={theme.colors.grey} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.menuCard}>
//           <View style={[styles.menuIconWrapper, { backgroundColor: '#F3E8FF' }]}>
//             <Ionicons name="book-outline" size={24} color={theme.colors.primaryPurple} />
//           </View>
//           <View style={styles.menuTextContainer}>
//             <Text style={styles.menuTitle}>How It Works</Text>
//             <Text style={styles.menuSubtitle}>Know about partner rewards</Text>
//           </View>
//           <Ionicons name="chevron-forward" size={20} color={theme.colors.grey} />
//         </TouchableOpacity>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default RewardsOverview;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../../MainTheme/theme';
import { styles } from './RewardsOverviewStyles';
import MainHeader from '../../components/MainHeader';
import api from '../../../api/axios';

const RewardsOverview = ({ navigation }) => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentBusinessAmount = 1875000;
  const fetchMilestones = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(
        '/api/reward/partner-reward-milestones'
      );

      console.log(
        'Partner Reward Milestones Response:',
        response.data
      );

      if (response.data?.Status === '200') {
        setMilestones(response.data.Data || []);
      } else {
        setMilestones([]);
        setError(
          response.data?.Message || 'Failed to load milestones'
        );
      }
    } catch (error) {
      console.error(
        'Partner Reward Milestones API Error:',
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.Message ||
        error.response?.data?.message ||
        'Failed to load milestones'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  const parseMilestoneAmount = value => {
    if (!value) return 0;

    const text = value
      .toString()
      .toLowerCase()
      .replace(/,/g, '')
      .trim();

    const number = parseFloat(text);

    if (text.includes('crore')) {
      return number * 10000000;
    }

    if (text.includes('lakh')) {
      return number * 100000;
    }

    return number;
  };

  const formatCurrency = amount => {
    if (!amount) return '₹ 0';

    return `₹ ${amount.toLocaleString('en-IN')}`;
  };

  const getCurrentMilestoneIndex = () => {
    if (!milestones.length) {
      return -1;
    }

    const silverIndex = milestones.findIndex(
      item =>
        item.PartnerLevel &&
        item.PartnerLevel
          .toLowerCase()
          .includes('silver')
    );

    return silverIndex !== -1 ? silverIndex : -1;
  };

  const currentMilestoneIndex = getCurrentMilestoneIndex();

  const currentLevel =
    currentMilestoneIndex >= 0
      ? milestones[currentMilestoneIndex]
      : null;

  const nextMilestone =
    currentMilestoneIndex + 1 < milestones.length
      ? milestones[currentMilestoneIndex + 1]
      : null;

  const currentMilestoneAmount = currentLevel
    ? parseMilestoneAmount(
      currentLevel.MilestoneAchieved
    )
    : 0;
  let progress = 0;

if (currentMilestoneAmount > 0) {
  progress =
    (currentBusinessAmount / currentMilestoneAmount) * 100;
}

// Keep percentage between 0 and 100
progress = Math.max(0, Math.min(100, progress));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.bgApp}
      />

      <MainHeader
        title="Partner Rewards"
        onHelpPress={() =>
          console.log('Help pressed')
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* --------------------------------------------- */}
        {/* Loading */}
        {/* --------------------------------------------- */}

        {loading && (
          <View
            style={{
              paddingVertical: 20,
              alignItems: 'center',
            }}
          >
            <ActivityIndicator
              size="small"
              color={theme.colors.primaryBlue}
            />

            <Text style={{ marginTop: 8 }}>
              Loading reward milestones...
            </Text>
          </View>
        )}

        {/* --------------------------------------------- */}
        {/* Error */}
        {/* --------------------------------------------- */}

        {!loading && error && (
          <View
            style={{
              padding: 20,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'red',
                textAlign: 'center',
              }}
            >
              {error}
            </Text>

            <TouchableOpacity
              onPress={fetchMilestones}
              style={{
                marginTop: 10,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  color: theme.colors.primaryBlue,
                  fontWeight: '600',
                }}
              >
                Retry
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* --------------------------------------------- */}
        {/* Rewards Content */}
        {/* --------------------------------------------- */}

        {!loading &&
          !error &&
          milestones.length > 0 && (
            <>
              {/* ----------------------------------------- */}
              {/* Current Level Gradient Card */}
              {/* ----------------------------------------- */}

              <LinearGradient
                colors={[
                  theme.colors.primaryBlue,
                  theme.colors.primaryIndigo,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.levelCard}
              >
                <View style={styles.levelCardHeader}>
                  <View style={styles.coinIconContainer}>
                    <MaterialCommunityIcons
                      name="shield-star-outline"
                      size={30}
                      color={theme.colors.white}
                    />
                  </View>

                  <View>
                    <Text
                      style={
                        styles.currentLevelLabel
                      }
                    >
                      Your Current Level
                    </Text>

                    <Text
                      style={
                        styles.currentLevelTitle
                      }
                    >
                      {currentLevel
                        ? currentLevel.PartnerLevel
                        : 'Starting Partner'}
                    </Text>
                  </View>
                </View>

                {/* Progress Bar */}

                <View
                  style={styles.progressContainer}
                >
                  <View
                    style={styles.progressBarBg}
                  >
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${progress}%`,
                        },
                      ]}
                    />
                  </View>
                </View>

                <View
                  style={styles.progressTextRow}
                >
                  <Text
                    style={
                      styles.progressAmountText
                    }
                  >
                    {formatCurrency(
                      currentBusinessAmount
                    )}
                    {' / '}
                    {formatCurrency(
                      currentMilestoneAmount
                    )}
                  </Text>

                  <Text
                    style={
                      styles.progressPercentText
                    }
                  >
                    {Math.round(progress)}%
                  </Text>
                </View>
              </LinearGradient>

              {nextMilestone && (
                <View
                  style={styles.nextMilestoneRow}
                >
                  <View>
                    <Text
                      style={
                        styles.nextMilestoneLabel
                      }
                    >
                      Next Milestone
                    </Text>

                    <Text
                      style={
                        styles.nextMilestoneAmount
                      }
                    >
                      {formatCurrency(
                        currentMilestoneAmount
                      )}
                    </Text>
                  </View>

                  <View
                    style={styles.pillButton}
                  >
                    <Text
                      style={
                        styles.pillButtonText
                      }
                    >
                      {Math.round(
                        100 - progress
                      )}
                      % to go
                    </Text>
                  </View>
                </View>
              )}

              {/* ----------------------------------------- */}
              {/* Milestone Journey */}
              {/* ----------------------------------------- */}

              <View
                style={styles.journeyHeaderRow}
              >
                <Text
                  style={styles.journeyTitle}
                >
                  Milestone Journey
                </Text>

                <TouchableOpacity>
                  <Text
                    style={styles.viewAllText}
                  >
                    View All &gt;
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={styles.stepperContainer}
              >
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={
                    false
                  }
                  contentContainerStyle={
                    styles.stepperScrollContent
                  }
                >
                  {milestones.map(
                    (milestone, index) => {
                      /*
                       * IMPORTANT:
                       *
                       * Previous milestones are completed
                       * based on their position before Silver.
                       *
                       * Silver = CURRENT
                       *
                       * All milestones after Silver are locked.
                       */

                      const isCompleted =
                        index <
                        currentMilestoneIndex;

                      const isActive =
                        index ===
                        currentMilestoneIndex;

                      const isLast =
                        index ===
                        milestones.length - 1;

                      return (
                        <View
                          key={`${milestone.MilestoneAchieved}-${index}`}
                          style={
                            styles.stepItemContainer
                          }
                        >
                          {/* Connecting Line */}

                          {!isLast && (
                            <View
                              style={[
                                styles.stepLine,
                                isCompleted &&
                                styles.stepLineCompleted,
                              ]}
                            />
                          )}

                          <View
                            style={
                              styles.stepWrapper
                            }
                          >
                            {/* Completed */}

                            {isCompleted ? (
                              <View
                                style={[
                                  styles.stepCircle,
                                  styles.stepCircleCompleted,
                                ]}
                              >
                                <Feather
                                  name="check"
                                  size={14}
                                  color={
                                    theme.colors
                                      .white
                                  }
                                />
                              </View>
                            ) : isActive ? (
                              /* Current */

                              <View
                                style={
                                  styles.stepCircleActiveOuter
                                }
                              >
                                <View
                                  style={
                                    styles.stepCircleActiveInner
                                  }
                                />
                              </View>
                            ) : (
                              /* Locked */

                              <View
                                style={[
                                  styles.stepCircle,
                                  styles.stepCircleLocked,
                                ]}
                              >
                                <Feather
                                  name="lock"
                                  size={12}
                                  color={
                                    theme.colors
                                      .white
                                  }
                                />
                              </View>
                            )}

                            {/* Partner Level */}

                            <Text
                              numberOfLines={2}
                              style={[
                                styles.stepTitle,
                                isActive &&
                                styles.stepTitleActive,
                              ]}
                            >
                              {milestone.PartnerLevel}
                            </Text>

                            {/* Milestone */}

                            <Text
                              numberOfLines={1}
                              style={[
                                styles.stepAmount,
                                isActive &&
                                styles.stepAmountActive,
                              ]}
                            >
                              {
                                milestone.MilestoneAchieved
                              }
                            </Text>

                            {/* Last Milestone Label */}

                            {isLast && (
                              <Text
                                style={{
                                  fontSize: 10,
                                  marginTop: 3,
                                  fontWeight: '600',
                                  color:
                                    theme.colors
                                      .grey,
                                }}
                              >
                                LAST
                              </Text>
                            )}
                          </View>
                        </View>
                      );
                    }
                  )}
                </ScrollView>
              </View>

              {/* ----------------------------------------- */}
              {/* Reward Structure */}
              {/* ----------------------------------------- */}

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() =>
                  navigation.navigate(
                    'RewardStruct',
                    {
                      milestones: milestones,
                    }
                  )
                }
              >
                <View
                  style={[
                    styles.menuIconWrapper,
                    {
                      backgroundColor:
                        '#FEE2E2',
                    },
                  ]}
                >
                  <Feather
                    name="gift"
                    size={24}
                    color="#EF4444"
                  />
                </View>

                <View
                  style={
                    styles.menuTextContainer
                  }
                >
                  <Text
                    style={styles.menuTitle}
                  >
                    Reward Structure
                  </Text>

                  <Text
                    style={
                      styles.menuSubtitle
                    }
                  >
                    View all milestones and
                    benefits
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={theme.colors.grey}
                />
              </TouchableOpacity>

              {/* ----------------------------------------- */}
              {/* Your Rewards */}
              {/* ----------------------------------------- */}

              <TouchableOpacity
                style={styles.menuCard}
              >
                <View
                  style={[
                    styles.menuIconWrapper,
                    {
                      backgroundColor:
                        '#FEF3C7',
                    },
                  ]}
                >
                  <Ionicons
                    name="trophy-outline"
                    size={24}
                    color="#F59E0B"
                  />
                </View>

                <View
                  style={
                    styles.menuTextContainer
                  }
                >
                  <Text
                    style={styles.menuTitle}
                  >
                    Your Rewards
                  </Text>

                  <Text
                    style={
                      styles.menuSubtitle
                    }
                  >
                    Scratch cards, coins,
                    devices & more
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={theme.colors.grey}
                />
              </TouchableOpacity>

              {/* ----------------------------------------- */}
              {/* How It Works */}
              {/* ----------------------------------------- */}

              <TouchableOpacity
                style={styles.menuCard}
              >
                <View
                  style={[
                    styles.menuIconWrapper,
                    {
                      backgroundColor:
                        '#F3E8FF',
                    },
                  ]}
                >
                  <Ionicons
                    name="book-outline"
                    size={24}
                    color={
                      theme.colors.primaryPurple
                    }
                  />
                </View>

                <View
                  style={
                    styles.menuTextContainer
                  }
                >
                  <Text
                    style={styles.menuTitle}
                  >
                    How It Works
                  </Text>

                  <Text
                    style={
                      styles.menuSubtitle
                    }
                  >
                    Know about partner rewards
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={theme.colors.grey}
                />
              </TouchableOpacity>
            </>
          )}

        {/* --------------------------------------------- */}
        {/* No Data */}
        {/* --------------------------------------------- */}

        {!loading &&
          !error &&
          milestones.length === 0 && (
            <View
              style={{
                padding: 30,
                alignItems: 'center',
              }}
            >
              <Text>
                No reward milestones available.
              </Text>
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardsOverview;