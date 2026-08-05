import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../api/axios';
import Icon from 'react-native-vector-icons/Feather';
import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';
import { theme } from '../../MainTheme/theme';
import MainHeader from '../../screens/components/MainHeader'; // Adjust the relative path if necessary based on your current folder structure

export default function NotificationScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Today');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const filterData = () => {
    const now = new Date();

    return data.filter((item) => {
      const itemDate = new Date(item.date);

      if (activeTab === 'Today') {
        return itemDate.toDateString() === now.toDateString();
      }

      if (activeTab === 'This Week') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return itemDate >= weekAgo;
      }

      if (activeTab === 'Earlier') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return itemDate < weekAgo;
      }

      return true;
    });
  };

  const removeItem = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  // Helper to determine pill colors and dot color based on notification title
  const getStatusStyles = (title) => {
    const lowerTitle = (title || '').toLowerCase();
    
    if (lowerTitle.includes('fail') || lowerTitle.includes('login') || lowerTitle.includes('suspicious')) {
      return {
        pillBg: '#fee2e2', // Light red bg
        pillText: '#ef4444', // Red text
        dotColor: lowerTitle.includes('suspicious') ? '#ef4444' : theme.colors.textMain,
      };
    }
    
    if (lowerTitle.includes('sent') || lowerTitle.includes('success')) {
      return {
        pillBg: '#dcfce7', // Light green bg
        pillText: '#16a34a', // Green text
        dotColor: theme.colors.textMain,
      };
    }
    
    // Default / Pending styles
    return {
      pillBg: '#f3f4f6', // Light gray bg
      pillText: '#4b5563', // Dark gray text
      dotColor: theme.colors.textMain,
    };
  };

  const renderItem = ({ item }) => {
    const { pillBg, pillText, dotColor } = getStatusStyles(item.title);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            <View style={[styles.dot, { backgroundColor: dotColor }]} />
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
          </View>

          <View style={styles.actionRow}>
            <View style={[styles.timePill, { backgroundColor: pillBg }]}>
              <Text style={[styles.time, { color: pillText }]}>{item.time}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => removeItem(item.id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="x" size={moderateScale(16)} color={theme.colors.textMain} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.subtitle} numberOfLines={2}>
          {item.message}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      
      {/* Updated to use MainHeader component */}
      <MainHeader 
        title="Notifications" 
        subtitle="Manage your notifications" 
        onHelpPress={() => {
          console.log("Help pressed");
        }} 
      />

      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabs}>
          {['Today', 'This Week', 'Earlier'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabBtn,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* List Content */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.primaryBlue}
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={filterData()}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bgApp, // Clean white background
  },

  container: {
    flex: 1,
    paddingHorizontal: scale(16),
  },

  // --- Tabs Layout ---
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#285CE0', // Solid blue pill container matching design
    borderRadius: theme.borderRadius.md || 12,
    marginTop: verticalScale(14), // Slightly adjusted since header is now separate
    marginBottom: verticalScale(20),
    padding: scale(4),
  },

  tabBtn: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.sm || 8,
  },

  activeTab: {
    backgroundColor: '#f3f4f6', // Light gray/white inset active tab
  },

  tabText: {
    color: '#ffffff', // White text for inactive
    fontSize: moderateScale(13),
    fontWeight: theme.typography.weight.medium || '500',
  },

  activeText: {
    color: theme.colors.textMain, // Dark text for active
    fontWeight: theme.typography.weight.semibold || '600',
  },

  loader: {
    marginTop: verticalScale(40),
  },

  listContent: {
    paddingBottom: verticalScale(40),
  },

  // --- Notification Cards ---
  card: {
    backgroundColor: '#fafafa', // Light gray/white background per design
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    borderRadius: theme.borderRadius.md || 12,
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: '#e5e7eb', // Gray subtle border
    ...theme.shadows.sm,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: scale(12),
  },

  dot: {
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    marginRight: scale(8),
  },

  title: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.medium || '500',
    fontSize: moderateScale(15),
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timePill: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: scale(4),
    marginRight: scale(12),
  },

  time: {
    fontSize: moderateScale(11),
    fontWeight: theme.typography.weight.medium || '500',
  },

  closeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  subtitle: {
    color: theme.colors.textMuted || '#4b5563',
    fontSize: moderateScale(12),
    paddingLeft: scale(12), // Aligns with the title (offsetting the 4px dot + 8px margin)
    marginTop: verticalScale(2),
  },
});
