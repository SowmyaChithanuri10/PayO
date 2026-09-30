// import React from 'react';
// import { View, Text, ScrollView, StatusBar } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { theme } from '../../../MainTheme/theme'; // <-- Adjust this path
// import { styles } from './RewardStrucStyles'; // <-- Adjust this path
// import MainHeader from '../../components/MainHeader'; // <-- Adjust this path

// const RewardStruc = () => {
//   // Data for the table matching the screenshot
//   const tableData = [
//     { id: '1', milestone: 'Partner', slab: '₹ 0 – 10L', rate: '3%', bonus: '—', reward: '₹ 1,000\nScratch Card', active: false },
//     { id: '2', milestone: 'Senior\nPartner', slab: '₹ 10 – 15L', rate: '6%', bonus: '3% on\nfirst 10L', reward: '₹ 5,000\nScratch Card', active: false },
//     { id: '3', milestone: 'Silver\nPartner', slab: '₹ 15 – 25L', rate: '7%', bonus: '4% on\nfirst 15L', reward: 'Silver\nCoin', active: true }, // Highlighted row
//     { id: '4', milestone: 'Gold\nPartner', slab: '₹ 25 – 50L', rate: '8%', bonus: '5% on\nfirst 25L', reward: 'Gold\nCoin', active: false },
//     { id: '5', milestone: 'Platinum\nPartner', slab: '₹ 50L – 1Cr', rate: '10%', bonus: '5% on\nfirst 50L', reward: 'iPhone', active: false },
//     { id: '6', milestone: 'Strategic\nPartner', slab: '₹ 1 – 2Cr', rate: '12%', bonus: '7% on\nfirst 1Cr', reward: 'Bike', active: false },
//     { id: '7', milestone: 'Elite Strategic\nPartner', slab: '₹ 2 – 5Cr', rate: '15%', bonus: '8% on\nfirst 5Cr', reward: '—', active: false },
//     { id: '8', milestone: '₹ 10 Crore+', slab: '₹ 5 – 10Cr', rate: '20%', bonus: 'Special\nBenefits', reward: 'Car', active: false },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bgApp} />

//       <MainHeader 
//         title="Reward Structure" 
//         onHelpPress={() => console.log('Help pressed')} 
//       />

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
//         {/* Table View */}
//         <View style={styles.tableContainer}>
//           {/* Table Header */}
//           <View style={styles.tableHeaderRow}>
//             <View style={styles.col1}>
//               <Text style={styles.headerText}>Milestone</Text>
//             </View>
//             <View style={styles.col2}>
//               <Text style={styles.headerText}>Business{'\n'}Slab</Text>
//             </View>
//             <View style={styles.col3}>
//               <Text style={styles.headerText}>Rate</Text>
//             </View>
//             <View style={styles.col4}>
//               <Text style={styles.headerText}>Completion{'\n'}Bonus</Text>
//             </View>
//             <View style={styles.col5}>
//               <Text style={styles.headerText}>Reward</Text>
//             </View>
//           </View>

//           {/* Table Data Rows */}
//           {tableData.map((row, index) => {
//             const isLast = index === tableData.length - 1;
//             return (
//               <View 
//                 key={row.id} 
//                 style={[
//                   styles.tableRow, 
//                   row.active && styles.activeRow,
//                   isLast && { borderBottomWidth: 0 } // Removes the bottom border from the very last item in the box
//                 ]}
//               >
//                 <View style={styles.col1}>
//                   <Text style={[styles.cellText, row.active && styles.activeCellText]}>{row.milestone}</Text>
//                 </View>
//                 <View style={styles.col2}>
//                   <Text style={[styles.cellText, row.active && styles.activeCellText]}>{row.slab}</Text>
//                 </View>
//                 <View style={styles.col3}>
//                   <Text style={[styles.cellText, row.active && styles.activeCellText]}>{row.rate}</Text>
//                 </View>
//                 <View style={styles.col4}>
//                   <Text style={[styles.cellText, row.active && styles.activeCellText]}>{row.bonus}</Text>
//                 </View>
//                 <View style={styles.col5}>
//                   <Text style={[styles.cellText, row.active && styles.activeCellText]}>{row.reward}</Text>
//                 </View>
//               </View>
//             );
//           })}
//         </View>

//         {/* Info Card at bottom */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoIconContainer}>
//             <Feather name="info" size={18} color={theme.colors.white} />
//           </View>
//           <Text style={styles.infoText}>
//             The higher rate applies only to the business generated in that slab.
//           </Text>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default RewardStruc;

///////////////////////////////////////////////

// import React from 'react';
// import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { theme } from '../../../MainTheme/theme'; // <-- Adjust this path
// import { styles } from './RewardStrucStyles'; // <-- Adjust this path
// import MainHeader from '../../components/MainHeader'; // <-- Adjust this path

// const RewardStruc = ({ navigation }) => {
//   // Data for the table matching the screenshot
//   const tableData = [
//     { id: '1', milestone: 'Partner', slab: '₹ 0 – 10L', rate: '3%', bonus: '—', reward: '₹ 1,000\nScratch Card', active: false },
//     { id: '2', milestone: 'Senior\nPartner', slab: '₹ 10 – 15L', rate: '6%', bonus: '3% on\nfirst 10L', reward: '₹ 5,000\nScratch Card', active: false },
//     { id: '3', milestone: 'Silver\nPartner', slab: '₹ 15 – 25L', rate: '7%', bonus: '4% on\nfirst 15L', reward: 'Silver\nCoin', active: true }, // Highlighted row
//     { id: '4', milestone: 'Gold\nPartner', slab: '₹ 25 – 50L', rate: '8%', bonus: '5% on\nfirst 25L', reward: 'Gold\nCoin', active: false },
//     { id: '5', milestone: 'Platinum\nPartner', slab: '₹ 50L – 1Cr', rate: '10%', bonus: '5% on\nfirst 50L', reward: 'iPhone', active: false },
//     { id: '6', milestone: 'Strategic\nPartner', slab: '₹ 1 – 2Cr', rate: '12%', bonus: '7% on\nfirst 1Cr', reward: 'Bike', active: false },
//     { id: '7', milestone: 'Elite Strategic\nPartner', slab: '₹ 2 – 5Cr', rate: '15%', bonus: '8% on\nfirst 5Cr', reward: '—', active: false },
//     { id: '8', milestone: '₹ 10 Crore+', slab: '₹ 5 – 10Cr', rate: '20%', bonus: 'Special\nBenefits', reward: 'Car', active: false },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bgApp} />

//       <MainHeader 
//         title="Reward Structure" 
//         onHelpPress={() => console.log('Help pressed')} 
//       />

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
//         {/* Table View */}
//         <View style={styles.tableContainer}>
//           {/* Table Header */}
//           <View style={styles.tableHeaderRow}>
//             <View style={styles.col1}>
//               <Text style={styles.headerText}>Milestone</Text>
//             </View>
//             <View style={styles.col2}>
//               <Text style={styles.headerText}>Business{'\n'}Slab</Text>
//             </View>
//             <View style={styles.col3}>
//               <Text style={styles.headerText}>Rate</Text>
//             </View>
//             <View style={styles.col4}>
//               <Text style={styles.headerText}>Completion{'\n'}Bonus</Text>
//             </View>
//             <View style={styles.col5}>
//               <Text style={styles.headerText}>Reward</Text>
//             </View>
//           </View>

//           {/* Table Data Rows */}
//           {tableData.map((row, index) => {
//             const isLast = index === tableData.length - 1;
//             return (
//               <TouchableOpacity 
//                 key={row.id} 
//                 activeOpacity={0.7}
//                 onPress={() => navigation.navigate('MileStoneDetail')}
//                 style={[
//                   styles.tableRow, 
//                   row.active && styles.activeRow,
//                   isLast && { borderBottomWidth: 0 } // Removes the bottom border from the very last item in the box
//                 ]}
//               >
//                 <View style={styles.col1}>
//                   <Text style={[styles.cellText, row.active && styles.activeCellText]}>{row.milestone}</Text>
//                 </View>
//                 <View style={styles.col2}>
//                   <Text style={[styles.cellText, row.active && styles.activeCellText]}>{row.slab}</Text>
//                 </View>
//                 <View style={styles.col3}>
//                   <Text style={[styles.cellText, row.active && styles.activeCellText]}>{row.rate}</Text>
//                 </View>
//                 <View style={styles.col4}>
//                   <Text style={[styles.cellText, row.active && styles.activeCellText]}>{row.bonus}</Text>
//                 </View>
//                 <View style={styles.col5}>
//                   <Text style={[styles.cellText, row.active && styles.activeCellText]}>{row.reward}</Text>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         {/* Info Card at bottom */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoIconContainer}>
//             <Feather name="info" size={18} color={theme.colors.white} />
//           </View>
//           <Text style={styles.infoText}>
//             The higher rate applies only to the business generated in that slab.
//           </Text>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default RewardStruc;


///////////////////////////////////// dynamic///////////////////////////

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../../MainTheme/theme';
import { styles } from './RewardStrucStyles';
import MainHeader from '../../components/MainHeader';
import api from '../../../api/axios';

const RewardStruc = ({ navigation, route }) => {
  const [milestones, setMilestones] = useState(
    route.params?.milestones || []
  );
  const [loading, setLoading] = useState(!route.params?.milestones);
  const [error, setError] = useState(null);

  // Business amount matching current user progress (e.g. ₹18,75,000 for Silver Partner)
  const currentBusinessAmount = route.params?.currentBusinessAmount || 1875000;

  const fetchMilestones = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/reward/partner-reward-milestones');

      if (response.data?.Status === '200') {
        setMilestones(response.data.Data || []);
      } else {
        setError(response.data?.Message || 'Failed to load milestones');
      }
    } catch (err) {
      setError(
        err.response?.data?.Message ||
          err.response?.data?.message ||
          'Failed to load milestones'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!milestones.length) {
      fetchMilestones();
    }
  }, []);

  // Parse Indian currency string amounts to numeric figures
  const parseMilestoneAmount = (value) => {
    if (!value) return 0;
    const text = value.toString().toLowerCase().replace(/,/g, '').trim();
    const number = parseFloat(text);

    if (text.includes('crore') || text.includes('cr')) return number * 10000000;
    if (text.includes('lakh') || text.includes('l')) return number * 100000;
    return number;
  };

  // Find index of currently active tier
// Find index where PartnerLevel contains "Silver Partner"
  const getCurrentMilestoneIndex = () => {
    if (!milestones.length) return -1;

    // Search by level name
    const silverIndex = milestones.findIndex(
      (item) => item.PartnerLevel && item.PartnerLevel.toLowerCase().includes('silver')
    );

    // Return the Silver Partner index if found; fallback to -1
    return silverIndex !== -1 ? silverIndex : -1;
  };

  const currentActiveIndex = getCurrentMilestoneIndex();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bgApp} />

      <MainHeader
        title="Reward Structure"
        onHelpPress={() => console.log('Help pressed')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Loading Indicator */}
        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="small" color={theme.colors.primaryIndigo} />
            <Text style={styles.loadingText}>Loading reward structure...</Text>
          </View>
        )}

        {/* Error Container */}
        {!loading && error && (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={fetchMilestones} style={{ marginTop: 10 }}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Main Table Structure */}
        {!loading && !error && milestones.length > 0 && (
          <>
            <View style={styles.tableContainer}>
              {/* Header Row */}
              {/* <View style={styles.tableHeaderRow}>
                <View style={styles.col1}>
                  <Text style={styles.headerText}>Milestone</Text>
                </View>
                <View style={styles.col2}>
                  <Text style={styles.headerText}>Business{'\n'}Slab</Text>
                </View>
                <View style={styles.col3}>
                  <Text style={styles.headerText}>Rate</Text>
                </View>
                <View style={styles.col4}>
                  <Text style={styles.headerText}>Completion{'\n'}Bonus</Text>
                </View>
                <View style={styles.col5}>
                  <Text style={styles.headerText}>Reward</Text>
                </View>
              </View> */}

<View style={styles.tableHeaderRow}>
  <View style={[styles.colBase, styles.col1]}>
    <Text style={styles.headerText}>Milestone</Text>
  </View>
  <View style={[styles.colBase, styles.col2]}>
    <Text style={styles.headerText}>Business{'\n'}Slab</Text>
  </View>
  <View style={[styles.colBase, styles.col3]}>
    <Text style={styles.headerText}>Rate</Text>
  </View>
  <View style={[styles.colBase, styles.col4]}>
    <Text style={styles.headerText}>Completion{'\n'}Bonus</Text>
  </View>
  <View style={[styles.colBase, styles.col5]}>
    <Text style={styles.headerText}>Reward</Text>
  </View>
</View>


{milestones?.map((row, index) => {
  const isActive = index === currentActiveIndex;
  const isLast = index === milestones?.length - 1;

  return (
    <TouchableOpacity
      key={`${row.MilestoneAchieved}-${index}`}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('MileStoneDetail', {
          milestone: row,
          currentBusinessAmount,
        })
      }
      style={[
        styles.tableRow,
        isActive && styles.activeRow,
        isLast && { borderBottomWidth: 0 },
      ]}
    >
      <View style={[styles.colBase, styles.col1]}>
        <View style={styles.milestoneNameWrapper}>
          <Text
            style={[
              styles.cellText,
              styles.milestoneTitle,
              isActive && styles.activeCellText,
            ]}
          >
            {row.PartnerLevel ? row.PartnerLevel.replace(/\\n/g, '\n') : '—'}
          </Text>
          {isActive && (
            // <Feather
            //   name="check-circle"
            //   size={12}
            //   color={theme.colors.primaryIndigo}
            //   style={{ marginLeft: 4, marginTop: 2 }}
            // />
            
            <>
            </>
          )}
        </View>
      </View>

      <View style={[styles.colBase, styles.col2]}>
        <Text style={[styles.cellText, isActive && styles.activeCellText]}>
          {row.Slab || row.MilestoneAchieved || '—'}
        </Text>
      </View>

      <View style={[styles.colBase, styles.col3]}>
        <Text style={[styles.cellText, styles.centerText, isActive && styles.activeCellText]}>
          {row.SlabRate || row.CommissionRate || row.Rate || '—'}
        </Text>
      </View>

      <View style={[styles.colBase, styles.col4]}>
        <Text style={[styles.cellText, isActive && styles.activeCellText]}>
          {row.CompletionBonus ? row.CompletionBonus.replace(/\\n/g, '\n') : '—'}
        </Text>
      </View>

      <View style={[styles.colBase, styles.col5]}>
        <Text style={[styles.cellText, isActive && styles.activeCellText]}>
          {row.MilestoneReward || row.RewardType || row.Reward || '—'}
        </Text>
      </View>
    </TouchableOpacity>
  );
})}

            </View>

            {/* Bottom Info Card */}
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Feather name="info" size={16} color={theme.colors.primaryIndigo} />
              </View>
              <Text style={styles.infoText}>
                The higher rate applies only to the business generated in that slab.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardStruc;