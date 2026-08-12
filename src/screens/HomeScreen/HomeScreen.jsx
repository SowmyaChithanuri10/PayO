

// import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   StatusBar,
//   FlatList,
//   Linking,
//   Alert,
//   BackHandler,
//   StyleSheet,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather';
// import { useFocusEffect } from '@react-navigation/native';
// import api, { getToken } from '../../api/axios';
// import styles from './homeStyling';
// import { moderateScale, scale } from '../../utils/responsive';
// import Header from '../components/header';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { setDashboardStats, setProfileData, setWalletData } from '../../redux/features/depositSlice';
// import { PAYO_EXCHANGE_RATE } from '../../api/mainValuables';
// //import Chats from '../chats/Chats';

// const getCoinColor = (symbol) => {
//   const sym = symbol?.toUpperCase();
//   if (sym === 'BTC') return { bg: '#fff7ed', text: '#ea580c' };
//   if (sym === 'ETH') return { bg: '#eff6ff', text: '#2563eb' };
//   if (sym === 'BNB') return { bg: '#fef3c7', text: '#d97706' };
//   if (sym === 'SOL') return { bg: '#f3e8ff', text: '#9333ea' };
//   return { bg: '#f3e8ff', text: '#7c3aed' }; 
// };

// const getTimeAgo = (dateStr) => {
//   const time = new Date(dateStr).getTime();
//   const now = new Date().getTime();
//   const diff = Math.floor((now - time) / 60000);
//   if (diff < 1) return 'Just now';
//   if (diff < 60) return `${diff} min ago`;
//   const hours = Math.floor(diff / 60);
//   return `${hours} hour${hours > 1 ? 's' : ''} ago`;
// };

// export default function HomeScreen({ navigation }) {

//   const [balanceVisible, setBalanceVisible] = useState(true);
//   const [available, setAvailable] = useState('');
//   const [avbRuppee, setAvbRuppee] = useState('0.00');
//   const [expertCoins, setExpertCoins] = useState([]);
//   const [marketNews, setMarketNews] = useState([]);
//   const [newsCount, setNewsCount] = useState(10);
//   const [activeBanner, setActiveBanner] = useState(0);
//   const scrollRef = useRef(null);
//   const flatListRef = useRef(null);
//   const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;
//   const newsSectionRef = useRef(null);
//   const newsItemRefs = useRef({});
//   const dispatch = useAppDispatch();
//   const dashboardStats = useAppSelector((state) => state.deposit.dashboardStats);
//     const walletData = useAppSelector((state) => state.deposit.walletData);
//   const bannerData = useMemo(() => [
//     { id: '1', image: require('../../../assets/images/banner1.png') },
//     { id: '2', image: require('../../../assets/images/banner2.png') },
//     { id: '3', image: require('../../../assets/images/banner3.png') },
//     { id: '4', image: require('../../../assets/images/banner4.png') },
//   ], []);

//   const totalTransactions = dashboardStats?.totalTransactions ?? 0;
//   const successfulTransactions = dashboardStats?.successfulTransactions ?? 0;

//   const isRestricted = useMemo(() => {
//     return !(totalTransactions > 0 && successfulTransactions > 0 && (walletData?.Transaction_Amount ?? 0) >= 100);
//   }, [totalTransactions, successfulTransactions]);

//   const isPendingApproval = useMemo(() => {
//     return totalTransactions > 0 && successfulTransactions === 0;
//   }, [totalTransactions, successfulTransactions,walletData]);

//   const showAccessRestrictedAlert = useCallback(() => {
//     if (isPendingApproval) {
//       Alert.alert(
//         'Account Pending Verification',
//         'Your transaction has been received. Please wait for approval from the administrator to unlock full feature access.',
//         [{ text: 'okay', style: 'default' }]
//       );
//     } else {
//       Alert.alert(
//         'Access Restricted',
//         'You need an active deposit to access this feature. Please complete a deposit into your wallet.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
//         ]
//       );
//     }
//   }, [isPendingApproval, navigation]);

//   const onViewableItemsChanged = useCallback(({ viewableItems }) => {
//     if (viewableItems?.length > 0 && viewableItems[0].index !== null) {
//       setActiveBanner(viewableItems[0].index);
//     }
//   }, []);

//   const fetchExpertCoins = useCallback(async () => {
//     try {
//       const res = await api.get('/api/market/overview');
//       setExpertCoins(res?.data?.data?.slice(0, 5) || []);
//     } catch (error) {
//       console.log('Expert coins error:', error?.message);
//       setExpertCoins([
//         { symbol: 'BTC', name: 'Bitcoin', price: 9250000, priceChangePercentage24h: 2.8 },
//         { symbol: 'ETH', name: 'Ethereum', price: 245000, priceChangePercentage24h: -0.8 },
//         { symbol: 'BNB', name: 'BNB', price: 68000, priceChangePercentage24h: 1.2 },
//         { symbol: 'SOL', name: 'Solana', price: 15400, priceChangePercentage24h: 6.5 },
//         { symbol: 'PAYO', name: 'PAYO', price: 70.12, priceChangePercentage24h: 4.2 },
//       ]);
//     }
//   }, []);

//   const fetchMarketNews = useCallback(async () => {
//     try {
//       const res = await api.get('/api/news/news');
//       setMarketNews(res?.data?.Data?.Articles || []);
//     } catch (error) {
//       console.log('News error:', error?.message);
//       setMarketNews([
//         { Title: 'Bitcoin crosses new resistance level', PublishedAt: new Date().toISOString(), symbol: 'BTC' },
//         { Title: 'Ethereum ETF attracts record inflows', PublishedAt: new Date(Date.now() - 600000).toISOString(), symbol: 'ETH' },
//         { Title: 'PAYO announces new wallet features', PublishedAt: new Date(Date.now() - 3600000).toISOString(), symbol: 'PAYO' },
//       ]);
//     }
//   }, []);

//   const fetchDashBoardData = useCallback(async () => {
//     try {
//       const res = await api.get('/api/auth/dashboard');
//       const dashboardData = res?.data?.Data;

//       if (dashboardData) {
//         if (dashboardData.Profile) {
//           dispatch(setProfileData(dashboardData.Profile));
//         }

//         if (dashboardData.Wallet) {
//           dispatch(setWalletData(dashboardData.Wallet));
//           setAvbRuppee(dashboardData.Wallet.Available_Balance ?? 0);
//         }

//         dispatch(
//           setDashboardStats({
//             successfulTransactions: dashboardData.Successful_Transactions,
//             totalTransactions: dashboardData.Total_Transactions,
//             kycStatus: dashboardData.KYC_Status,
//           })
//         );
//       }
//     } catch (err) {
//       console.log('Dashboard API error:', err?.response || err.message);
//     }
//   }, [dispatch]);

//   const handleViewMore = () => {
//     const targetIndex = newsCount;
//     setNewsCount((prev) => prev + 15);

//     setTimeout(() => {
//       const targetElement = newsItemRefs.current[targetIndex];
//       const containerElement = newsSectionRef.current;

//       if (targetElement && containerElement && scrollRef.current) {
//         targetElement.measureLayout(
//           containerElement,
//           (x, y) => {
//             scrollRef.current.scrollTo({
//               y: y,
//               animated: true,
//             });
//           },
//           (error) => console.log('Measure failed:', error)
//         );
//       }
//     }, 100);
//   };

//   useEffect(() => {
//     const rupees = parseFloat(avbRuppee) || 0;
//     const payo = rupees * PAYO_EXCHANGE_RATE;
//     setAvailable(payo.toFixed(3));
//   }, [avbRuppee]);

//   useEffect(() => {
//     if (!bannerData || bannerData.length === 0) return;
    
//     const interval = setInterval(() => {
//       setActiveBanner((prev) => {
//         const nextIndex = (prev + 1) % bannerData.length;
//         try {
//           flatListRef.current?.scrollToIndex({
//             index: nextIndex,
//             animated: true,
//           });
//         } catch (error) {
//           // Silent catch
//         }
//         return nextIndex;
//       });
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [bannerData]);

//   useFocusEffect(
//     useCallback(() => {
//       const checkToken = async () => {
//         await getToken();
//       };
//       checkToken();

//       fetchExpertCoins();
//       fetchMarketNews();
//       fetchDashBoardData();

//       navigation.setOptions({ gestureEnabled: false });

//       const onBackPress = () => {
//         BackHandler.exitApp();
//         return true; 
//       };

//       const backHandler = BackHandler.addEventListener(
//         'hardwareBackPress',
//         onBackPress
//       );

//       return () => backHandler.remove();
//     }, [navigation, fetchExpertCoins, fetchMarketNews, fetchDashBoardData])
//   );

//   const handleQuickAction = (route, params) => {
//     if (isRestricted) {
//       showAccessRestrictedAlert();
//     } else {
//       navigation.navigate(route, params);
//     }
//   };

//   const handleViewWallet = () => {
//     if (isRestricted) {
//       showAccessRestrictedAlert();
//     } else {
//       navigation.navigate('WalletScreen');
//     }
//   };

//   return (
//     <>
//       <SafeAreaView style={styles.container}>
//         <StatusBar backgroundColor="#f4f6f9" barStyle="dark-content" />

//         <Header />

//         <ScrollView 
//           ref={scrollRef} 
//           showsVerticalScrollIndicator={false} 
//           contentContainerStyle={styles.scrollContent}
//         >
//           <LinearGradient 
//             colors={['#6366f1', '#4f46e5']} 
//             start={{ x: 0, y: 0 }} 
//             end={{ x: 1, y: 1 }} 
//             style={styles.walletCard}
//           >
//             <View style={styles.cardLightHighlight} />
            
//             <View style={styles.walletHeaderRow}>
//               <View style={styles.rowCenter}>
//                 <Text style={styles.walletLabel}>Total Wallet Balance</Text>
//                 <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)} style={{ marginLeft: 20 }}>
//                   <Icon name={balanceVisible ? 'eye-off' : 'eye'} size={18} color="rgba(255,255,255,0.8)" />
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity 
//                 style={[styles.viewWalletBtn, isRestricted && { opacity: 0.5 }]}
//                 activeOpacity={0.8}
//                 onPress={handleViewWallet}
//               >
//                 <Text style={styles.viewWalletText}>View Wallet</Text>
//                 <Icon name="chevron-right" size={14} color="#fff" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.balanceContainer}>
//               <View style={styles.balanceRow}>
//                 <Text style={styles.balanceAmount}>{balanceVisible ? available : '****'}</Text>
//                 <Text style={styles.balanceCurrency}>PAYO</Text>
//               </View>
//               <Text style={styles.fiatAmount}>{balanceVisible ? `₹ ${avbRuppee}` : ' '}</Text>
//             </View>

//             <View style={styles.bottomActionRow}>
//               <TouchableOpacity 
//                 onPress={() => navigation.navigate('AddMoneytoWallet')} 
//                 style={styles.addMoneyBtn}
//                 activeOpacity={0.9}
//               >
//                 <Icon name="plus" size={22} color="#22c55e" style={{ marginRight: 6 }} />
//                 <Text style={styles.addMoneyText}>Add Money</Text>
//               </TouchableOpacity>
//             </View>
//           </LinearGradient>

//           {/* Quick Actions Container */}
//           <View style={[styles.sectionContainer, isRestricted && localStyles.restrictedCardBackground]}>
//             <Text style={[styles.sectionHeading, isRestricted && localStyles.sectionHeadingRestricted]}>
//               Quick Actions
//             </Text>
            
//             <View style={styles.actionsGridCard}>
//               <View style={styles.actionsGrid}>
//                 {[
//                   { id: 'send', image: require('../../../assets/images/Icon_1.png'), label: 'Send', route: 'SendScreen', params: { tab: 'scan' } },
//                   { id: 'receive', image: require('../../../assets/images/Icon_2.png'), label: 'Receive', route: 'Receive' },
//                   { id: 'scan', image: require('../../../assets/images/Icon_3.png'), label: 'Scan QR', route: 'SendScreen', params: { tab: 'scan' } },
//                   { id: 'exchange', image: require('../../../assets/images/Icon_4.png'), label: 'Exchange', route: 'ExchangeScreen' }
//                 ].map((action) => (
//                   <TouchableOpacity 
//                     key={action.id} 
//                     style={styles.actionItem}
//                     activeOpacity={isRestricted ? 0.9 : 0.7}
//                     onPress={() => handleQuickAction(action.route, action.params)}
//                   >
//                     <View style={[
//                       styles.actionIconBtn, 
//                       isRestricted && { backgroundColor: '#E5E7EB', shadowOpacity: 0, elevation: 0 }
//                     ]}>
//                       <Image 
//                         source={action.image} 
//                         style={[styles.actionImageFormat, isRestricted && { tintColor: '#9CA3AF' }]} 
//                         resizeMode="contain"
//                       />
//                     </View>
//                     <Text style={[styles.actionLabel, isRestricted && { color: '#9CA3AF' }]}>{action.label}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               {isRestricted && (
//                 <TouchableOpacity 
//                   style={localStyles.lockOverlay} 
//                   activeOpacity={0.9} 
//                   onPress={showAccessRestrictedAlert}
//                 >
//                   <Icon name="lock" size={15} color="#6B7280" style={localStyles.lockIcon} />
//                   <Text style={localStyles.lockText}>
//                     {isPendingApproval 
//                       ? 'Deposit approval pending verification' 
//                       : 'Unlock by adding 100 rupees money to your Wallet'}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>

//           {/* Banners */}
//           <View style={styles.carouselContainer}>
//             <FlatList
//               ref={flatListRef}
//               data={bannerData}
//               keyExtractor={(item) => item.id}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               snapToInterval={scale(304) + scale(8)}
//               decelerationRate="fast"
//               onViewableItemsChanged={onViewableItemsChanged}
//               viewabilityConfig={viewabilityConfig}
//               renderItem={({ item }) => (
//                 <View style={styles.bannerWrapper}>
//                   <Image
//                     source={item.image}
//                     style={styles.bannerCard}
//                     resizeMode="cover"
//                   />
//                 </View>
//               )}
//             />
            
//             <View style={styles.bannerPagination}>
//               {bannerData.map((_, i) => (
//                 <View 
//                   key={i} 
//                   style={[styles.dot, activeBanner === i && styles.dotActive]} 
//                 />
//               ))}
//             </View>
//           </View>

//           {/* Crypto Market */}
//           <View style={styles.sectionContainer}>
//             <View style={styles.sectionHeaderRow}>
//               <Text style={styles.sectionHeading}>Crypto Market</Text>
//               <TouchableOpacity onPress={() => navigation.navigate('MarketScreen')}>
//                 <Text style={styles.viewAllText}>View All {">"}</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.card}>
//               <View style={styles.tableHeader}>
//                 <Text style={[styles.tableHeaderText, {flex: 2}]}>COIN</Text>
//                 <Text style={[styles.tableHeaderText, {flex: 2, textAlign: 'right'}]}>PRICE</Text>
//                 <Text style={[styles.tableHeaderText, {flex: 1.5, textAlign: 'right'}]}>24H</Text>
//               </View>

//               {expertCoins.map((coin, index) => {
//                 const isPositive = coin.priceChangePercentage24h >= 0;
//                 const coinColors = getCoinColor(coin.symbol);
//                 return (
//                   <TouchableOpacity 
//                     key={index} 
//                     style={styles.tableRow}
//                     onPress={() => navigation.navigate('CoinDetailsScreen', { coin })}
//                   >
//                     <View style={[styles.tableCell, {flex: 2, flexDirection: 'row', alignItems: 'center'}]}>
//                       <View style={[styles.coinIcon, {backgroundColor: coinColors.text}]}>
//                         <Text style={styles.coinIconText}>{coin.symbol?.charAt(0)}</Text>
//                       </View>
//                       <View>
//                         <Text style={styles.coinSymbol}>{coin.symbol?.toUpperCase()}</Text>
//                         <Text style={styles.coinName}>{coin.name || coin.symbol}</Text>
//                       </View>
//                     </View>
//                     <Text style={[styles.tableCell, styles.coinPrice, {flex: 2, textAlign: 'right'}]}>
//                       ${coin.price?.toLocaleString()}
//                     </Text>
//                     <Text style={[styles.tableCell, {flex: 1.5, textAlign: 'right', color: isPositive ? '#10b981' : '#ef4444', fontWeight: '600'}]}>
//                       {isPositive ? '▲' : '▼'} {Math.abs(coin.priceChangePercentage24h).toFixed(1)}%
//                     </Text>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>

//           {/* Crypto News */}
//           <View ref={newsSectionRef} style={styles.sectionContainer}>
//             <View style={styles.sectionHeaderRow}>
//               <Text style={styles.sectionHeading}>Crypto News</Text>
//               {marketNews?.length > newsCount && (
//                 <TouchableOpacity onPress={handleViewMore}>
//                   <Text style={styles.viewAllText}>View More {">"}</Text>
//                 </TouchableOpacity>
//               )}
//             </View>

//             {marketNews?.slice(0, newsCount)?.map((item, index) => {
//               const detectSymbol = (title = '') => {
//                 const upper = title.toUpperCase();
//                 if (upper.includes('BTC') || upper.includes('BITCOIN')) return 'BTC';
//                 if (upper.includes('ETH') || upper.includes('ETHEREUM')) return 'ETH';
//                 if (upper.includes('BNB') || upper.includes('BINANCE')) return 'BNB';
//                 if (upper.includes('SOL') || upper.includes('SOLANA')) return 'SOL';
//                 return item.symbol || 'CRYPTO';
//               };

//               const currentSymbol = detectSymbol(item.Title);
//               const coinColors = getCoinColor(currentSymbol);

//               return (
//                 <TouchableOpacity 
//                   key={index} 
//                   ref={(el) => (newsItemRefs.current[index] = el)}
//                   style={[styles.card, styles.newsCard]} 
//                   onPress={() => Linking.openURL(item.Url || 'https://google.com')}
//                 >
//                   <Image 
//                     source={{ uri: item.UrlToImage || 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=200' }} 
//                     style={styles.newsImage} 
//                   />
//                   <View style={styles.newsContent}>
//                     <Text style={styles.newsHeadline} numberOfLines={2}>
//                       {item.Title}
//                     </Text>
//                     <View style={styles.newsMetaRow}>
//                       <Text style={styles.newsTime}>{getTimeAgo(item.PublishedAt)}</Text>
//                       <View style={[styles.tagPill, { backgroundColor: coinColors.bg }]}>
//                         <Text style={[styles.tagText, { color: coinColors.text }]}>
//                           {currentSymbol}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//       {/* <Chats /> */}
//     </>
//   );
// }

// const localStyles = StyleSheet.create({
//   restrictedCardBackground: {
//     backgroundColor: '#F3F4F6',
//     borderColor: '#E5E7EB',
//     borderWidth: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     marginHorizontal: 20,
//     marginVertical: 20,
//     borderRadius: 16,
//   },
//   sectionHeadingRestricted: {
//     opacity: 0.4,
//     fontSize: moderateScale(18),
//     fontWeight: '700',
//   },
//   lockOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(243, 244, 246, 0.85)',
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   lockIcon: {
//     marginRight: 8,
//     marginTop: 12,
//   },
//   lockText: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#000102',
//     marginTop: 13,
//   },
// });




import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  FlatList,
  Linking,
  Alert,
  BackHandler,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import api, { getToken } from '../../api/axios';
import styles from './homeStyling';
import { moderateScale, scale } from '../../utils/responsive';
import Header from '../components/header';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setDashboardStats, setProfileData, setWalletData } from '../../redux/features/depositSlice';
import { PAYO_EXCHANGE_RATE } from '../../api/mainValuables';
//import Chats from '../chats/Chats';

const getCoinColor = (symbol) => {
  const sym = symbol?.toUpperCase();
  if (sym === 'BTC') return { bg: '#fff7ed', text: '#ea580c' };
  if (sym === 'ETH') return { bg: '#eff6ff', text: '#2563eb' };
  if (sym === 'BNB') return { bg: '#fef3c7', text: '#d97706' };
  if (sym === 'SOL') return { bg: '#f3e8ff', text: '#9333ea' };
  return { bg: '#f3e8ff', text: '#7c3aed' }; 
};

const getTimeAgo = (dateStr) => {
  const time = new Date(dateStr).getTime();
  const now = new Date().getTime();
  const diff = Math.floor((now - time) / 60000);
  if (diff < 1) return 'Just now';
  if (diff < 60) return `${diff} min ago`;
  const hours = Math.floor(diff / 60);
  return `${hours} hour${hours > 1 ? 's' : ''} ago`;
};

export default function HomeScreen({ navigation }) {

  const [balanceVisible, setBalanceVisible] = useState(true);
  const [available, setAvailable] = useState('');
  const [avbRuppee, setAvbRuppee] = useState('0.00');
  const [expertCoins, setExpertCoins] = useState([]);
  const [marketNews, setMarketNews] = useState([]);
  const [newsCount, setNewsCount] = useState(10);
  const [activeBanner, setActiveBanner] = useState(0);
  
  // State for controlling the KYC Reminder visibility for the current session
  const [showKycReminder, setShowKycReminder] = useState(true);

  const scrollRef = useRef(null);
  const flatListRef = useRef(null);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;
  const newsSectionRef = useRef(null);
  const newsItemRefs = useRef({});
  const dispatch = useAppDispatch();
  const dashboardStats = useAppSelector((state) => state.deposit.dashboardStats);
  const walletData = useAppSelector((state) => state.deposit.walletData);
  const bannerData = useMemo(() => [
    { id: '1', image: require('../../../assets/images/banner1.png') },
    { id: '2', image: require('../../../assets/images/banner2.png') },
    { id: '3', image: require('../../../assets/images/banner3.png') },
    { id: '4', image: require('../../../assets/images/banner4.png') },
  ], []);

  const totalTransactions = dashboardStats?.totalTransactions ?? 0;
  const successfulTransactions = dashboardStats?.successfulTransactions ?? 0;
  const kycStatus = dashboardStats?.kycStatus;

  // Determine if KYC is completed to permanently hide the reminder
  const isKycVerified = useMemo(() => {
    const status = kycStatus?.toLowerCase() || '';
    return status === 'verified' || 
           status === 'approved' || 
           status.includes('completed'); // This will safely catch "kyc completed"
  }, [kycStatus]);

  const isRestricted = useMemo(() => {
    return !(totalTransactions > 0 && successfulTransactions > 0 && (walletData?.Transaction_Amount ?? 0) >= 100);
  }, [totalTransactions, successfulTransactions]);

  const isPendingApproval = useMemo(() => {
    return totalTransactions > 0 && successfulTransactions === 0;
  }, [totalTransactions, successfulTransactions,walletData]);

  const showAccessRestrictedAlert = useCallback(() => {
    if (isPendingApproval) {
      Alert.alert(
        'Account Pending Verification',
        'Your transaction has been received. Please wait for approval from the administrator to unlock full feature access.',
        [{ text: 'okay', style: 'default' }]
      );
    } else {
      Alert.alert(
        'Access Restricted',
        'You need an active deposit to access this feature. Please complete a deposit into your wallet.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Add Money', onPress: () => navigation.navigate('AddMoneytoWallet') },
        ]
      );
    }
  }, [isPendingApproval, navigation]);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems?.length > 0 && viewableItems[0].index !== null) {
      setActiveBanner(viewableItems[0].index);
    }
  }, []);

  const fetchExpertCoins = useCallback(async () => {
    try {
      const res = await api.get('/api/market/overview');
      setExpertCoins(res?.data?.data?.slice(0, 5) || []);
    } catch (error) {
      console.log('Expert coins error:', error?.message);
      setExpertCoins([
        { symbol: 'BTC', name: 'Bitcoin', price: 9250000, priceChangePercentage24h: 2.8 },
        { symbol: 'ETH', name: 'Ethereum', price: 245000, priceChangePercentage24h: -0.8 },
        { symbol: 'BNB', name: 'BNB', price: 68000, priceChangePercentage24h: 1.2 },
        { symbol: 'SOL', name: 'Solana', price: 15400, priceChangePercentage24h: 6.5 },
        { symbol: 'PAYO', name: 'PAYO', price: 70.12, priceChangePercentage24h: 4.2 },
      ]);
    }
  }, []);

  const fetchMarketNews = useCallback(async () => {
    try {
      const res = await api.get('/api/news/news');
      setMarketNews(res?.data?.Data?.Articles || []);
    } catch (error) {
      console.log('News error:', error?.message);
      setMarketNews([
        { Title: 'Bitcoin crosses new resistance level', PublishedAt: new Date().toISOString(), symbol: 'BTC' },
        { Title: 'Ethereum ETF attracts record inflows', PublishedAt: new Date(Date.now() - 600000).toISOString(), symbol: 'ETH' },
        { Title: 'PAYO announces new wallet features', PublishedAt: new Date(Date.now() - 3600000).toISOString(), symbol: 'PAYO' },
      ]);
    }
  }, []);

  const fetchDashBoardData = useCallback(async () => {
    try {
      const res = await api.get('/api/auth/dashboard');
      const dashboardData = res?.data?.Data;

      if (dashboardData) {
        if (dashboardData.Profile) {
          dispatch(setProfileData(dashboardData.Profile));
        }

        if (dashboardData.Wallet) {
          dispatch(setWalletData(dashboardData.Wallet));
          setAvbRuppee(dashboardData.Wallet.Available_Balance ?? 0);
        }

        dispatch(
          setDashboardStats({
            successfulTransactions: dashboardData.Successful_Transactions,
            totalTransactions: dashboardData.Total_Transactions,
            kycStatus: dashboardData.KYC_Status,
          })
        );
      }
    } catch (err) {
      console.log('Dashboard API error:', err?.response || err.message);
    }
  }, [dispatch]);

  const handleViewMore = () => {
    const targetIndex = newsCount;
    setNewsCount((prev) => prev + 15);

    setTimeout(() => {
      const targetElement = newsItemRefs.current[targetIndex];
      const containerElement = newsSectionRef.current;

      if (targetElement && containerElement && scrollRef.current) {
        targetElement.measureLayout(
          containerElement,
          (x, y) => {
            scrollRef.current.scrollTo({
              y: y,
              animated: true,
            });
          },
          (error) => console.log('Measure failed:', error)
        );
      }
    }, 100);
  };

  useEffect(() => {
    const rupees = parseFloat(avbRuppee) || 0;
    const payo = rupees * PAYO_EXCHANGE_RATE;
    setAvailable(payo.toFixed(3));
  }, [avbRuppee]);

  useEffect(() => {
    if (!bannerData || bannerData.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveBanner((prev) => {
        const nextIndex = (prev + 1) % bannerData.length;
        try {
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        } catch (error) {
          // Silent catch
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData]);

  useFocusEffect(
    useCallback(() => {
      const checkToken = async () => {
        await getToken();
      };
      checkToken();

      fetchExpertCoins();
      fetchMarketNews();
      fetchDashBoardData();

      navigation.setOptions({ gestureEnabled: false });

      const onBackPress = () => {
        BackHandler.exitApp();
        return true; 
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => backHandler.remove();
    }, [navigation, fetchExpertCoins, fetchMarketNews, fetchDashBoardData])
  );

  const handleQuickAction = (route, params) => {
    if (isRestricted) {
      showAccessRestrictedAlert();
    } else {
      navigation.navigate(route, params);
    }
  };

  const handleViewWallet = () => {
    if (isRestricted) {
      showAccessRestrictedAlert();
    } else {
      navigation.navigate('WalletScreen');
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#f4f6f9" barStyle="dark-content" />

        <Header />

        <ScrollView 
          ref={scrollRef} 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >

          {/* KYC Reminder Box */}
          {!isKycVerified && showKycReminder && (
            <View style={styles.kycReminderContainer}>
              <Text style={styles.kycReminderText}>
                Please complete your KYC details
              </Text>
              <View style={styles.kycButtonsRow}>
                <TouchableOpacity 
                  style={styles.kycOkBtn}
                  onPress={() => {
                    navigation.navigate('KYCVerification'); 
                  }}
                >
                  <Text style={styles.kycBtnTextProceed}>Proceed</Text>
                </TouchableOpacity>
                {/* Updated Close Button with X Icon */}
  <TouchableOpacity 
    style={styles.kycCloseBtn}
    onPress={() => setShowKycReminder(false)}
  >
    <Icon name="x" size={18} color="#000000" />
  </TouchableOpacity>
              </View>
            </View>
          )}

          <LinearGradient 
            colors={['#6366f1', '#4f46e5']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }} 
            style={styles.walletCard}
          >
            <View style={styles.cardLightHighlight} />
            
            <View style={styles.walletHeaderRow}>
              <View style={styles.rowCenter}>
                <Text style={styles.walletLabel}>Total Wallet Balance</Text>
                <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)} style={{ marginLeft: 20 }}>
                  <Icon name={balanceVisible ? 'eye-off' : 'eye'} size={18} color="rgba(255,255,255,0.8)" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={[styles.viewWalletBtn, isRestricted && { opacity: 0.5 }]}
                activeOpacity={0.8}
                onPress={handleViewWallet}
              >
                <Text style={styles.viewWalletText}>View Wallet</Text>
                <Icon name="chevron-right" size={14} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.balanceContainer}>
              <View style={styles.balanceRow}>
                <Text style={styles.balanceAmount}>{balanceVisible ? available : '****'}</Text>
                <Text style={styles.balanceCurrency}>PAYO</Text>
              </View>
              <Text style={styles.fiatAmount}>{balanceVisible ? `₹ ${avbRuppee}` : ' '}</Text>
            </View>

            <View style={styles.bottomActionRow}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('AddMoneytoWallet')} 
                style={styles.addMoneyBtn}
                activeOpacity={0.9}
              >
                <Icon name="plus" size={22} color="#22c55e" style={{ marginRight: 6 }} />
                <Text style={styles.addMoneyText}>Add Money</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Quick Actions Container */}
          <View style={[styles.sectionContainer, isRestricted && localStyles.restrictedCardBackground]}>
            <Text style={[styles.sectionHeading, isRestricted && localStyles.sectionHeadingRestricted]}>
              Quick Actions
            </Text>
            
            <View style={styles.actionsGridCard}>
              <View style={styles.actionsGrid}>
                {[
                  { id: 'send', image: require('../../../assets/images/Icon_1.png'), label: 'Send', route: 'SendScreen', params: { tab: 'scan' } },
                  { id: 'receive', image: require('../../../assets/images/Icon_2.png'), label: 'Receive', route: 'Receive' },
                  { id: 'scan', image: require('../../../assets/images/Icon_3.png'), label: 'Scan QR', route: 'SendScreen', params: { tab: 'scan' } },
                  { id: 'exchange', image: require('../../../assets/images/Icon_4.png'), label: 'Exchange', route: 'ExchangeScreen' }
                ].map((action) => (
                  <TouchableOpacity 
                    key={action.id} 
                    style={styles.actionItem}
                    activeOpacity={isRestricted ? 0.9 : 0.7}
                    onPress={() => handleQuickAction(action.route, action.params)}
                  >
                    <View style={[
                      styles.actionIconBtn, 
                      isRestricted && { backgroundColor: '#E5E7EB', shadowOpacity: 0, elevation: 0 }
                    ]}>
                      <Image 
                        source={action.image} 
                        style={[styles.actionImageFormat, isRestricted && { tintColor: '#9CA3AF' }]} 
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={[styles.actionLabel, isRestricted && { color: '#9CA3AF' }]}>{action.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {isRestricted && (
                <TouchableOpacity 
                  style={localStyles.lockOverlay} 
                  activeOpacity={0.9} 
                  onPress={showAccessRestrictedAlert}
                >
                  <Icon name="lock" size={15} color="#6B7280" style={localStyles.lockIcon} />
                  <Text style={localStyles.lockText}>
                    {isPendingApproval 
                      ? 'Deposit approval pending verification' 
                      : 'Unlock by adding 100 rupees money to your Wallet'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Banners */}
          <View style={styles.carouselContainer}>
            <FlatList
              ref={flatListRef}
              data={bannerData}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={scale(304) + scale(8)}
              decelerationRate="fast"
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              renderItem={({ item }) => (
                <View style={styles.bannerWrapper}>
                  <Image
                    source={item.image}
                    style={styles.bannerCard}
                    resizeMode="cover"
                  />
                </View>
              )}
            />
            
            <View style={styles.bannerPagination}>
              {bannerData.map((_, i) => (
                <View 
                  key={i} 
                  style={[styles.dot, activeBanner === i && styles.dotActive]} 
                />
              ))}
            </View>
          </View>

          {/* Crypto Market */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Crypto Market</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MarketScreen')}>
                <Text style={styles.viewAllText}>View All {">"}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, {flex: 2}]}>COIN</Text>
                <Text style={[styles.tableHeaderText, {flex: 2, textAlign: 'right'}]}>PRICE</Text>
                <Text style={[styles.tableHeaderText, {flex: 1.5, textAlign: 'right'}]}>24H</Text>
              </View>

              {expertCoins.map((coin, index) => {
                const isPositive = coin.priceChangePercentage24h >= 0;
                const coinColors = getCoinColor(coin.symbol);
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.tableRow}
                    onPress={() => navigation.navigate('CoinDetailsScreen', { coin })}
                  >
                    <View style={[styles.tableCell, {flex: 2, flexDirection: 'row', alignItems: 'center'}]}>
                      <View style={[styles.coinIcon, {backgroundColor: coinColors.text}]}>
                        <Text style={styles.coinIconText}>{coin.symbol?.charAt(0)}</Text>
                      </View>
                      <View>
                        <Text style={styles.coinSymbol}>{coin.symbol?.toUpperCase()}</Text>
                        <Text style={styles.coinName}>{coin.name || coin.symbol}</Text>
                      </View>
                    </View>
                    <Text style={[styles.tableCell, styles.coinPrice, {flex: 2, textAlign: 'right'}]}>
                      ${coin.price?.toLocaleString()}
                    </Text>
                    <Text style={[styles.tableCell, {flex: 1.5, textAlign: 'right', color: isPositive ? '#10b981' : '#ef4444', fontWeight: '600'}]}>
                      {isPositive ? '▲' : '▼'} {Math.abs(coin.priceChangePercentage24h).toFixed(1)}%
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Crypto News */}
          <View ref={newsSectionRef} style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Crypto News</Text>
              {marketNews?.length > newsCount && (
                <TouchableOpacity onPress={handleViewMore}>
                  <Text style={styles.viewAllText}>View More {">"}</Text>
                </TouchableOpacity>
              )}
            </View>

            {marketNews?.slice(0, newsCount)?.map((item, index) => {
              const detectSymbol = (title = '') => {
                const upper = title.toUpperCase();
                if (upper.includes('BTC') || upper.includes('BITCOIN')) return 'BTC';
                if (upper.includes('ETH') || upper.includes('ETHEREUM')) return 'ETH';
                if (upper.includes('BNB') || upper.includes('BINANCE')) return 'BNB';
                if (upper.includes('SOL') || upper.includes('SOLANA')) return 'SOL';
                return item.symbol || 'CRYPTO';
              };

              const currentSymbol = detectSymbol(item.Title);
              const coinColors = getCoinColor(currentSymbol);

              return (
                <TouchableOpacity 
                  key={index} 
                  ref={(el) => (newsItemRefs.current[index] = el)}
                  style={[styles.card, styles.newsCard]} 
                  onPress={() => Linking.openURL(item.Url || 'https://google.com')}
                >
                  <Image 
                    source={{ uri: item.UrlToImage || 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=200' }} 
                    style={styles.newsImage} 
                  />
                  <View style={styles.newsContent}>
                    <Text style={styles.newsHeadline} numberOfLines={2}>
                      {item.Title}
                    </Text>
                    <View style={styles.newsMetaRow}>
                      <Text style={styles.newsTime}>{getTimeAgo(item.PublishedAt)}</Text>
                      <View style={[styles.tagPill, { backgroundColor: coinColors.bg }]}>
                        <Text style={[styles.tagText, { color: coinColors.text }]}>
                          {currentSymbol}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* <Chats /> */}
    </>
  );
}

const localStyles = StyleSheet.create({
  restrictedCardBackground: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 16,
  },
  sectionHeadingRestricted: {
    opacity: 0.4,
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(243, 244, 246, 0.85)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  lockIcon: {
    marginRight: 8,
    marginTop: 12,
  },
  lockText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000102',
    marginTop: 13,
  },
});