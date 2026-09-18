// // RewardHistory.jsx
// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity,  StatusBar } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { theme } from '../../../MainTheme/theme'; 
// import { styles } from './RewardHistoryStyles'; 
// import MainHeader from '../../components/MainHeader'; // Adjust path if necessary

// const RewardHistory = () => {
//   const [activeTab, setActiveTab] = useState('Earned');

//   const earnedRewards = [
//     {
//       id: '1',
//       title: 'Silver Coin',
//       subtitle: 'Silver Partner',
//       date: '12 Sep 2026',
//       type: 'coin',
//       status: 'Received'
//     },
//     {
//       id: '2',
//       title: '₹ 5,000 Scratch Card',
//       subtitle: 'Senior Partner',
//       date: '05 Aug 2026',
//       type: 'scratch_pink',
//       status: 'Received'
//     },
//     {
//       id: '3',
//       title: '₹ 1,000 Scratch Card',
//       subtitle: 'Partner',
//       date: '10 Jun 2026',
//       type: 'scratch_blue',
//       status: 'Received'
//     }
//   ];

//   const renderIcon = (type) => {
//     switch (type) {
//       case 'coin':
//         return (
//           <View style={[styles.iconWrapper, styles.coinIcon]}>
//             <Text style={styles.coinText}>S</Text>
//           </View>
//         );
//       case 'scratch_pink':
//         return (
//           <View style={[styles.iconWrapper, styles.scratchPink]}>
//             <View style={styles.scratchPinkInner}>
//               <Feather name="gift" size={18} color="#FFFFFF" />
//             </View>
//           </View>
//         );
//       case 'scratch_blue':
//         return (
//           <View style={[styles.iconWrapper, styles.scratchBlue]}>
//             <View style={styles.scratchBlueInner}>
//               <Feather name="gift" size={18} color="#FFFFFF" />
//             </View>
//           </View>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bgApp} />

//       <MainHeader 
//         title="My Rewards" 
//         onHelpPress={() => console.log('Help pressed')} 
//       />

//       {/* Tabs */}
//       <View style={styles.tabsContainer}>
//         <TouchableOpacity 
//           style={[styles.tabButton, activeTab === 'Earned' && styles.activeTab]}
//           onPress={() => setActiveTab('Earned')}
//           activeOpacity={0.7}
//         >
//           <Text style={[styles.tabText, activeTab === 'Earned' && styles.activeTabText]}>
//             Earned
//           </Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[styles.tabButton, activeTab === 'InProgress' && styles.activeTab]}
//           onPress={() => setActiveTab('InProgress')}
//           activeOpacity={0.7}
//         >
//           <Text style={[styles.tabText, activeTab === 'InProgress' && styles.activeTabText]}>
//             In Progress
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Content Area */}
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        
//         {activeTab === 'Earned' ? (
//           earnedRewards.map((reward) => (
//             <View key={reward.id} style={styles.rewardCard}>
//               {renderIcon(reward.type)}
              
//               <View style={styles.textContainer}>
//                 <Text style={styles.rewardTitle}>{reward.title}</Text>
//                 <Text style={styles.rewardSubtitle}>{reward.subtitle}</Text>
//                 <Text style={styles.rewardDate}>{reward.date}</Text>
//               </View>

//               <View style={styles.statusPill}>
//                 <Text style={styles.statusText}>{reward.status}</Text>
//               </View>
//             </View>
//           ))
//         ) : (
//           <View style={styles.emptyContainer}>
//             <View style={styles.emptyIconContainer}>
//                <Feather name="clock" size={32} color={theme.colors.primaryBlue} />
//             </View>
//             <Text style={styles.emptyText}>No pending rewards</Text>
//           </View>
//         )}

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default RewardHistory;







// RewardHistory.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../../MainTheme/theme'; 
import { styles } from './RewardHistoryStyles'; 
import MainHeader from '../../components/MainHeader'; // Adjust path if necessary

const RewardHistory = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Earned');

  const earnedRewards = [
    {
      id: '1',
      title: 'Silver Coin',
      subtitle: 'Silver Partner',
      date: '12 Sep 2026',
      type: 'coin',
      status: 'Received'
    },
    {
      id: '2',
      title: '₹ 5,000 Scratch Card',
      subtitle: 'Senior Partner',
      date: '05 Aug 2026',
      type: 'scratch_pink',
      status: 'Received'
    },
    {
      id: '3',
      title: '₹ 1,000 Scratch Card',
      subtitle: 'Partner',
      date: '10 Jun 2026',
      type: 'scratch_blue',
      status: 'Received'
    }
  ];

  const renderIcon = (type) => {
    switch (type) {
      case 'coin':
        return (
          <View style={[styles.iconWrapper, styles.coinIcon]}>
            <Text style={styles.coinText}>S</Text>
          </View>
        );
      case 'scratch_pink':
        return (
          <View style={[styles.iconWrapper, styles.scratchPink]}>
            <View style={styles.scratchPinkInner}>
              <Feather name="gift" size={18} color="#FFFFFF" />
            </View>
          </View>
        );
      case 'scratch_blue':
        return (
          <View style={[styles.iconWrapper, styles.scratchBlue]}>
            <View style={styles.scratchBlueInner}>
              <Feather name="gift" size={18} color="#FFFFFF" />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bgApp} />

      <MainHeader 
        title="My Rewards" 
        onHelpPress={() => console.log('Help pressed')} 
      />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Earned' && styles.activeTab]}
          onPress={() => setActiveTab('Earned')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'Earned' && styles.activeTabText]}>
            Earned
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'InProgress' && styles.activeTab]}
          onPress={() => setActiveTab('InProgress')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'InProgress' && styles.activeTabText]}>
            In Progress
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        
        {activeTab === 'Earned' ? (
          earnedRewards.map((reward) => (
            <TouchableOpacity 
              key={reward.id} 
              style={styles.rewardCard}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('RewardDetails')}
            >
              {renderIcon(reward.type)}
              
              <View style={styles.textContainer}>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardSubtitle}>{reward.subtitle}</Text>
                <Text style={styles.rewardDate}>{reward.date}</Text>
              </View>

              <View style={styles.statusPill}>
                <Text style={styles.statusText}>{reward.status}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
               <Feather name="clock" size={32} color={theme.colors.primaryBlue} />
            </View>
            <Text style={styles.emptyText}>No pending rewards</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardHistory;