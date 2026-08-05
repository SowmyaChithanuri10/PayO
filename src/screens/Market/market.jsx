import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../api/axios';
import MainSideHeader from '../components/MainSideHeader';
import { theme } from '../../MainTheme/theme'; 
import { scale, verticalScale, moderateScale } from '../../utils/responsive'; 

const MarketScreen = ({ navigation }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchExpertCoins();

      // const interval = setInterval(() => {
      //   fetchExpertCoins();
      // }, 1000);

      // return () => clearInterval(interval);
    }, []),
  );

  const fetchExpertCoins = async () => {
    try {
      setLoading(true);

      const res = await api.get('/api/market/overview');

      console.log(res.data, 'data');

      setCoins(res?.data?.data?.slice(0, 50));
      setLoading(false);
    } catch (error) {
      console.log('Expert picks error:', error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const isLong = item?.priceChangePercentage24h >= 0;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('CoinDetailsScreen', {
            coin: item,
          })
        }>
        <View style={styles.topRow}>
          <View style={styles.coinInfo}>
            <Image
              source={{
                uri:
                  item?.image ||
                  'https://cdn-icons-png.flaticon.com/512/825/825508.png',
              }}
              style={styles.coinImage}
            />

            <Text style={styles.symbol}>
              {item.symbol?.toUpperCase()}
            </Text>
          </View>

          <View
            style={[
              styles.badge,
              isLong ? styles.longBadge : styles.shortBadge,
            ]}>
            <Text style={styles.badgeText}>
              {isLong ? 'Long 5x' : 'Short 5x'}
            </Text>
          </View>
        </View>

        <Text style={styles.label}>Entry Price</Text>

        <Text style={styles.price}>
          ${item.price?.toLocaleString()}
        </Text>

        <View style={styles.actionRow}>
          <View style={styles.profitBox}>
            <Text style={styles.profitText}>
              {(item.priceChangePercentage24h || 0).toFixed(2)}% Expected profit
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.actionButton,
              isLong ? styles.buyButton : styles.sellButton,
            ]}>
            <Text style={styles.actionText}>
              {isLong ? 'Buy / Long' : 'Sell / Short'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primaryIndigo} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <MainSideHeader 
        title="Market"
        subtitle="Explore the Market"
        onHelpPress={() => console.log('Help Pressed')}
        onNotificationPress={() => navigation.navigate('Notifications')}
        notificationCount={0} // Set to 0 to match your design image which shows no red badge
      />

      <FlatList
        data={coins}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scale(16),
          //paddingTop: verticalScale(10),
          paddingBottom: verticalScale(140),
        }}
      />
    </SafeAreaView>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgSurface, // Changed to white background from theme
  },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: verticalScale(10),
       marginTop: verticalScale(20),
    },
    headerIconBtn: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(20),
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.sm,
    },
    headerActionBtn: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(20),
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.sm,
    },
    customHeaderIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
      resizeMode: 'contain',
    },
    headerTitleContainer: {
      flex: 1,
      marginLeft: scale(12),
    },
    headerTitle: {
      fontSize: theme.typography.size.lg,
      fontWeight: theme.typography.weight.bold,
      color: theme.colors.textMain,
    },
    headerSubtitle: {
      fontSize: theme.typography.size.xs,
      color: theme.colors.textMain,
      marginTop: verticalScale(2),
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.bgSurface, // Matched with container background
  },

  card: {
    backgroundColor: '#F3F4F6', // Applied Light Gray background to differentiate from white screen
    borderRadius: theme.borderRadius.lg,
    padding: scale(16),
    marginBottom: verticalScale(14),
    ...theme.shadows.sm, // Added slight shadow for extra depth from theme
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: scale(8),
  },

  coinImage: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    marginRight: scale(12),
  },

  symbol: {
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },

  badge: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: theme.borderRadius.md,
  },

  longBadge: {
    backgroundColor: '#DCFCE7',
  },

  shortBadge: {
    backgroundColor: '#FEE2E2',
  },

  badgeText: {
    fontSize: theme.typography.size.xs,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.textMain,
  },

  label: {
    marginTop: verticalScale(12),
    color: theme.colors.textMuted, // Used theme muted text color
    fontSize: theme.typography.size.xs,
    fontWeight: theme.typography.weight.medium,
  },

  price: {
    marginTop: verticalScale(4),
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.textMain,
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(14),
    flexWrap: 'wrap',
  },

  profitBox: {
    backgroundColor: '#ECFDF5',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    borderRadius: theme.borderRadius.md,
    marginRight: scale(8),
    flex: 1,
    minWidth: scale(150),
  },

  profitText: {
    color: theme.colors.statusSuccess,
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.xs,
  },

  actionButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(120),
  },

  buyButton: {
    backgroundColor: theme.colors.statusSuccess,
  },

  sellButton: {
    backgroundColor: theme.colors.statusDanger,
  },

  actionText: {
    color: theme.colors.bgSurface,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.bold,
  },
});