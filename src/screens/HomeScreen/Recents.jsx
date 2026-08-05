import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../api/axios';
import Icon from 'react-native-vector-icons/Feather';

import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/responsive';

// 2. Importing your theme file
import { theme } from '../../MainTheme/theme'; 

export default function Recents({
  navigation,
  setSelectedUser,
  setActiveTab,
}) {
  const [recents, setRecents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecents = async () => {
    try {
      setLoading(true);
      const res = await api.get('api/wallet/recents-page');

      let data = res.data || [];
      const uniqueMap = new Map();

      data.forEach((item) => {
        uniqueMap.set(item.walletAddress, item);
      });

      let uniqueList = Array.from(uniqueMap.values());

      uniqueList.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const finalList = uniqueList.slice(0, 5);
      setRecents(finalList);
    } catch (err) {
      console.log(
        'Recents error:',
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRecents();
    }, [])
  );

  const formatTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = (now - date) / (1000 * 60 * 60);

    if (diff < 1) return 'Just now';
    if (diff < 24) return `${Math.floor(diff)} hours ago`;
    if (diff < 48) return 'Yesterday';

    return date.toLocaleDateString();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        setSelectedUser({
          name: item.receiverName,
          address: item.walletAddress,
        });
        setActiveTab('amount');
      }}
    >
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Icon
            name="arrow-up-right"
            size={moderateScale(18)}
            color={theme.colors.primaryBlue} // Updated icon color to brand blue
          />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.name} numberOfLines={1}>
            {item.receiverName}
          </Text>
          <Text style={styles.address} numberOfLines={1}>
            {item.walletAddress}
          </Text>
        </View>
      </View>

      <Text style={styles.time} numberOfLines={1}>
        {formatTime(item.createdAt)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.section}>Recent Contacts</Text>

      {loading ? (
        <ActivityIndicator color={theme.colors.primaryBlue} style={styles.loader} />
      ) : recents.length === 0 ? (
        <Text style={styles.empty}>No recent contacts</Text>
      ) : (
        <FlatList
          data={recents}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(12),
    paddingHorizontal: scale(16),
  },

  section: {
    color: theme.colors.textMain,
    fontSize: moderateScale(16),
    marginBottom: verticalScale(16),
    fontWeight: theme.typography.weight.semibold || '600',
  },

  loader: {
    marginTop: verticalScale(40),
  },

  empty: {
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: verticalScale(40),
    fontSize: moderateScale(14),
  },

  listContent: {
    paddingBottom: verticalScale(80), 
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.bgSurface, 
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
    borderRadius: theme.borderRadius.md || 12,
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: '#e5e7eb', 
    ...theme.shadows.sm,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: scale(12),
  },

  iconContainer: {
    backgroundColor: '#eff6ff', 
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },

  userInfo: {
    flex: 1,
  },

  name: {
    color: theme.colors.textMain,
    fontWeight: theme.typography.weight.semibold || '600',
    fontSize: moderateScale(14),
  },

  address: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
  },

  time: {
    color: theme.colors.textMuted,
    fontSize: moderateScale(12),
    textAlign: 'right',
    maxWidth: scale(80),
  },
});