
// //banner at top
// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   StatusBar,
//   Dimensions,
//   FlatList,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import styles from './homeStyling';
// import api from '../../api/axios';
// import Header from '../components/header';
// import Icon from 'react-native-vector-icons/Feather';
// import { useFocusEffect } from '@react-navigation/native';
// import { LineChart } from 'react-native-chart-kit';
// import MarketCardComponent from '../Market/marketCard';
// import AdvancedMarketCard from '../Market/marketCard';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Linking } from 'react-native';


// const screenWidth = Dimensions.get('window').width;

// export default function HomeScreen({ navigation }) {
//   const [balanceVisible, setBalanceVisible] = useState(false);
//   const [transactionsList, setTransactionsList] = useState([]);
//   const [showAll] = useState(false);
//   const [visibleCount] = useState(10);
//   const [currentPage] = useState(1);

//   const [avaliable, setAvaliable] = useState('');
//   const [totalBalance, setTotalBalance] = useState('');
//   const [expertCoins, setExpertCoins] = useState([]);
//   const [marketNews, setMarketNews] = useState([]);
//   const [newsCount, setNewsCount] = useState(10);
//   const [marketCharts, setMarketCharts] = useState({});

//   const itemsPerPage = 5;
//   const scrollRef = useRef(null);
  


//   const displayedTransactions = showAll
//     ? transactionsList.slice(0, visibleCount)
//     : transactionsList.slice(
//       (currentPage - 1) * itemsPerPage,
//       currentPage * itemsPerPage,
//     );

//   const totalPages = Math.ceil(
//     transactionsList.length / itemsPerPage,
//   );

//   // --- Banner Carousel Implementation Start ---
//   const flatListRef = useRef(null);
//   const [activeBanner, setActiveBanner] = useState(0);
//   const bannerData = [
//     { id: '1', image: require('../../../assets/images/banner1.png') },
//     { id: '2', image: require('../../../assets/images/banner2.png') },
//     { id: '3', image: require('../../../assets/images/banner3.png') },
//     { id: '4', image: require('../../../assets/images/banner4.png') },
//     { id: '5', image: require('../../../assets/images/banner5.png') },
//     { id: '6', image: require('../../../assets/images/banner6.png') },
//     { id: '7', image: require('../../../assets/images/banner7.png') },
//     { id: '8', image: require('../../../assets/images/banner8.png') },
//     { id: '9', image: require('../../../assets/images/banner9.png') },
//     { id: '10', image: require('../../../assets/images/banner10.png') },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveBanner((prev) => {
//         const nextIndex = (prev + 1) % bannerData?.length;
//         flatListRef.current?.scrollToIndex({
//           index: nextIndex,
//           animated: true,
//         });
//         return nextIndex;
//       });
//     }, 5000); // 5 seconds timer

//     return () => clearInterval(interval);
//   }, []);

//   const onViewableItemsChanged = useRef(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setActiveBanner(viewableItems[0].index);
//     }
//   }).current;

//   const viewabilityConfig = useRef({
//     itemVisiblePercentThreshold: 50,
//   }).current;
//   // --- Banner Carousel Implementation End ---

//   const getVisiblePages = () => {
//     let pages = [];
//     const visibleCountPages = 5;

//     let startPage = currentPage - 2;
//     let endPage = currentPage + 2;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = visibleCountPages;
//     }

//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = totalPages - visibleCountPages + 1;

//       if (startPage < 1) {
//         startPage = 1;
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     return pages;
//   };

//   const fetchTotalBalance = async () => {
//     try {
//       const res = await api.get('/api/wallet/income-outcome');
//       setTotalBalance(res?.data || []);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchTransactions = async () => {
//     try {
//       const res = await api.get('/api/wallet/transaction-list');
//       const transactions = res?.data?.transactions || [];

//       const filteredTransactions = transactions.filter(
//         (item) =>
//           !(
//             item?.status === 'failed' &&
//             item?.type === 'received'
//           ),
//       );

//       setTransactionsList(filteredTransactions);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const fetchBalance = async () => {
//     try {
//       const response = await api.get('/api/wallet/balance');
//       setAvaliable(response?.data?.balance || '0');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchExpertCoins = async () => {
//     try {
//       // const res = await fetch(
//       //   'http://payo-app.duckdns.org:3001/api/market/overview',
//       // );
//       const res = await api.get('/api/market/overview');



//       setExpertCoins(res?.data?.data?.slice(0, 50));

//       // const result = await res.json();
//       // setExpertCoins(result?.data?.slice(0, 50) || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchMarketNews = async () => {
//     try {
//       // const res = await fetch(
//       //   'http://localhost:3001/api/news/crypto-news',
//       // );
//       const res = await api.get('/api/news/crypto-news');

//       console.log(res.data, 'data');

//    setMarketNews(res?.data?.data || []);

//       // const result = await res.json();
//       // setMarketNews(result?.data?.slice(0, 50) || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//  const formatDate = date => {
//   const d = new Date(date);

//   const formattedDate = d.toLocaleDateString('en-IN', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',
//     timeZone: 'Asia/Kolkata',
//   });

//   const formattedTime = d.toLocaleTimeString('en-IN', {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true,
//     timeZone: 'Asia/Kolkata',
//   });

//   return `${formattedDate} • ${formattedTime}`;
// };
//   useFocusEffect(
//     useCallback(() => {
//       fetchBalance();
//       fetchTotalBalance();
//       fetchExpertCoins();
//       fetchMarketNews();

//       // // auto refresh every 1 second
//       // const interval = setInterval(() => {
//       //   fetchExpertCoins();
//       // }, 1000);

//       // return () => clearInterval(interval);

//     }, []),
//   );
//   console.log(marketNews, "0909")

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         backgroundColor="#3B0A6B"
//         barStyle="light-content"
//       />

//       <Header type="default" />

//       <ScrollView
//   ref={scrollRef}
//   showsVerticalScrollIndicator={false}
//   contentContainerStyle={styles.scrollContent}>
        
//         {/* --- BANNER CAROUSEL UI START (Moved to Top) --- */}
//         <View style={{ marginTop: 10, marginBottom: 0 }}>
//           <FlatList
//             ref={flatListRef}
//             data={bannerData}
//             keyExtractor={(item) => item.id}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onViewableItemsChanged={onViewableItemsChanged}
//             viewabilityConfig={viewabilityConfig}
//             getItemLayout={(data, index) => ({
//               length: screenWidth,
//               offset: screenWidth * index,
//               index,
//             })}
//             renderItem={({ item }) => (
//               <View style={{ width: screenWidth, paddingHorizontal: 20 }}>
//                 <Image
//                   source={item.image}
//                   style={{
//                     width: '100%',
//                     height: 140,
//                     borderRadius: 16,
//                     resizeMode: 'stretch',
//                   }}
//                 />
//               </View>
//             )}
//           />
//           {/* Pagination Dots */}
//           <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
//             {bannerData.map((_, index) => (
//               <View
//                 key={index}
//                 style={{
//                   width: activeBanner === index ? 10 : 4,
//                   height: 5,
//                   borderRadius: 4,
//                   backgroundColor: activeBanner === index ? '#1356db' : '#D3D3D3',
//                   marginHorizontal: 4,
//                 }}
//               />
//             ))}
//           </View>
//         </View>
//         {/* --- BANNER CAROUSEL UI END --- */}

//         <View style={styles.cardContainer}>
          
//           <View style={styles.card}>
         
//             <View style={styles.topRightCurve} />
//             <View style={styles.bottomLeftCurve} />

//             <View>
//               <Text style={styles.balanceLabel}>
//                 Total Balance
//               </Text>

//               <View style={styles.balanceRow}>
//                 <Text style={styles.balanceAmount}>
//                   {balanceVisible
//                     ? `${avaliable}`
//                     : '* * * *'}
//                 </Text>

//                 <Text
//   style={styles.payoLabel}
// >
// {balanceVisible
//                     ? "PAYO"
//                     : ""}
// </Text>
//               </View>
//             </View>

//             <View style={styles.cardRight}>
//               <TouchableOpacity
//                 onPress={() =>
//                   setBalanceVisible(!balanceVisible)
//                 }
//                   hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
//                 <Icon
//                   name={balanceVisible ? 'eye' : 'eye-off'}
//                   size={20}
//                   color="#fff"
//                   width
//                 />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.walletRow}
//                 onPress={() =>
//                   navigation.navigate('Wallets')
//                 }>
//                 <Text style={styles.walletText}>
//                   My Wallet
//                 </Text>

//                 <View style={styles.arrowCircle}>
//                   <Icon
//                     name="arrow-right"
//                     size={16}
//                     color="#000"
//                   />
//                 </View>
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity
//               style={styles.addBankButton}
//               onPress={() =>
//                 navigation.navigate('AddBankHome')
//               }>
//               <Icon
//                 name="plus-circle"
//                 size={18}
//                 color="#000"
//                 style={styles.bankIcon}
//               />

//               <Text style={styles.addBankText}>
//                 Add Bank
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//        <View>
//          <View style={styles.actionsContainer}>

//                     <View style={styles.actionHeader}>
//            <Text style={styles.actionTitle}>
//  ⚡ Quick Actions
// </Text>

//           </View>
//           <View style={styles.actions}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() =>
//                 navigation.navigate('SendScreen', {
//                   tab: 'scan',
//                 })
//               }>
//               <View style={styles.iconCircle}>
//                 <Icon
//                   name="arrow-up-right"
//                   size={16}
//                   color="#fff"
//                 />
//               </View>
//               <Text style={styles.label}>Send</Text>
//             </TouchableOpacity>

//             <View style={styles.connector} />

//             <TouchableOpacity
//               style={styles.button}
//               onPress={() =>
//                 navigation.navigate('Receive')
//               }>
//               <View style={styles.iconCircle}>
//                 <Icon
//                   name="arrow-down-left"
//                   size={16}
//                   color="#fff"
//                 />
//               </View>
//               <Text style={styles.label}>Receive</Text>
//             </TouchableOpacity>

//             <View style={styles.connector} />

//             <TouchableOpacity
//               style={styles.button}
//               onPress={() =>
//                 navigation.navigate('ReferEarn')
//               }>
//               <View style={styles.iconCircle}>
//                 <Icon
//                   name="arrow-up-right"
//                   size={16}
//                   color="#fff"
//                 />
//               </View>
//               <Text style={styles.label}>Refer</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* <View style={styles.statsContainer}>
//           <View style={styles.statsCard}>
//             <View style={styles.statItem}>
//               <Icon
//                 name="arrow-down"
//                 size={24}
//                 color="#53D258"
//               />
//               <View style={styles.textBlock}>
//                 <Text style={styles.statLabel}>
//                   Income
//                 </Text>
//                 <View style={styles.amountRow}>
//                   <Text style={styles.statValue}>
//                     {totalBalance?.income}
//                   </Text>
//                   <Text style={styles.unit}>
//                     PAYO
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.divider} />

//             <View style={styles.statItem}>
//               <Icon
//                 name="arrow-up"
//                 size={24}
//                 color="#FF6B6B"
//               />
//               <View style={styles.textBlock}>
//                 <Text style={styles.statLabel}>
//                   Outcome
//                 </Text>
//                 <View style={styles.amountRow}>
//                   <Text style={styles.statValue}>
//                     {totalBalance?.outcome}
//                   </Text>
//                   <Text style={styles.unit}>
//                     PAYO
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View> */}
//        </View>


//        {/* <View style={styles.quickSummaryCard}>

//   <View style={styles.actionHeader}>
//     <Text style={styles.actionTitle}>⚡ Quick Actions</Text>
//   </View>

 
//  <View style={styles.actions}>

//   <TouchableOpacity
//     style={styles.actionButton}
//     onPress={() =>
//       navigation.navigate('SendScreen', { tab: 'scan' })
//     }>
//     <View style={styles.actionIcon}>
//       <Icon
//         name="arrow-up-right"
//         size={18}
//         color="#fff"
//       />
//     </View>

//     <Text style={styles.actionText}>Send</Text>
//   </TouchableOpacity>

//   <View style={styles.actionConnector} />

//   <TouchableOpacity
//     style={styles.actionButton}
//     onPress={() => navigation.navigate('Receive')}>
//     <View style={styles.actionIcon}>
//       <Icon
//         name="arrow-down-left"
//         size={18}
//         color="#fff"
//       />
//     </View>

//     <Text style={styles.actionText}>Receive</Text>
//   </TouchableOpacity>

//   <View style={styles.actionConnector} />

//   <TouchableOpacity
//     style={styles.actionButton}
//     onPress={() => navigation.navigate('ReferEarn')}>
//     <View style={styles.actionIcon}>
//       <Icon
//         name="arrow-up-right"
//         size={18}
//         color="#fff"
//       />
//     </View>

//     <Text style={styles.actionText}>Refer</Text>
//   </TouchableOpacity>

// </View>


//   <View style={styles.summaryDivider} />

 
//   <View style={styles.summaryRow}>

//     <View style={styles.summaryItem}>
//       <View style={styles.summaryIconGreen}>
//         <Icon
//           name="arrow-down"
//           size={22}
//           color="#53D258"
//         />
//       </View>

//       <View>
//         <Text style={styles.summaryLabel}>
//           Income
//         </Text>

//         <View style={styles.amountRow}>
//           <Text style={styles.summaryValue}>
//             {totalBalance?.income || 0}
//           </Text>

//           <Text style={styles.summaryUnit}>
//             PAYO
//           </Text>
//         </View>
//       </View>
//     </View>

//     <View style={styles.verticalDivider} />

//     <View style={styles.summaryItem}>
//       <View style={styles.summaryIconRed}>
//         <Icon
//           name="arrow-up"
//           size={22}
//           color="#FF6B6B"
//         />
//       </View>

//       <View>
//         <Text style={styles.summaryLabel}>
//           Outcome
//         </Text>

//         <View style={styles.amountRow}>
//           <Text style={styles.summaryValue}>
//             {totalBalance?.outcome || 0}
//           </Text>

//           <Text style={styles.summaryUnit}>
//             PAYO
//           </Text>
//         </View>
//       </View>
//     </View>

//   </View>

// </View> */}

//         <View style={styles.expertContainer}>
//           <View style={styles.expertHeader}>
//            <Text style={styles.expertTitle}>
//   📈   Expert Picks
// </Text>

//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('MarketScreen')
//               }>
//               <Text style={styles.viewAllText}>
//                 View All
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{
//               paddingRight: 20,
//             }}>
//             {expertCoins.map((coin, index) => {
//               const isLong =
//                 coin?.priceChangePercentage24h >= 0;

//               return (
//                 <TouchableOpacity
//                   key={index}
//                   style={styles.expertCard}
//                   activeOpacity={0.8}
//                   onPress={() =>
//                     navigation.navigate(
//                       'CoinDetailsScreen',
//                       { coin },
//                     )
//                   }>
//                   <View style={styles.expertTopRow}>
//                     <View style={styles.coinInfo}>
//                       <Image
//                         source={{
//                           uri:
//                             coin?.image ||
//                             'https://cdn-icons-png.flaticon.com/512/825/825508.png',
//                         }}
//                         style={styles.coinImage}
//                       />
//                       <Text style={styles.coinSymbol}>
//                         {coin.symbol?.toUpperCase()}
//                       </Text>
//                     </View>

//                     <View
//                       style={[
//                         styles.badge,
//                         isLong
//                           ? styles.longBadge
//                           : styles.shortBadge,
//                       ]}>
//                       <Text style={styles.badgeText}>
//                         {isLong
//                           ? 'Long 5x'
//                           : 'Short 5x'}
//                       </Text>
//                     </View>
//                   </View>

//                   <Text style={styles.entryLabel}>
//                     Entry
//                   </Text>

//                   <Text style={styles.entryPrice}>
//                     ${coin.price?.toLocaleString()}
//                   </Text>

//                   <View style={styles.profitBox}>
//                     <Text style={styles.profitText}>
//                       {(
//                         coin.priceChangePercentage24h || 0
//                       ).toFixed(2)}
//                       % Expected profit
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               );
//             })}
//           </ScrollView>
//         </View>

//         {/* <View
//           style={[
//             styles.marketCardsContainer,
//             { marginBottom: 30 },
//           ]}>
//           {expertCoins?.slice(0, 1).map(
//             (coin, index) => {
//               const isNegative =
//                 coin?.priceChangePercentage24h < 0;

//               const graphData = [
//                 coin.price + 1200,
//                 coin.price + 900,
//                 coin.price + 700,
//                 coin.price + 300,
//                 coin.price - 100,
//                 coin.price + 200,
//                 coin.price - 400,
//                 coin.price - 250,
//               ];

//               return (
//                 <View
//                   key={index}
//                   style={styles.marketCard}>
//                   <View style={styles.marketHeader}>
//                     <View
//                       style={styles.marketCoinRow}>
//                       <Image
//                         source={{
//                           uri:
//                             coin.image ||
//                             'https://cdn-icons-png.flaticon.com/512/825/825508.png',
//                         }}
//                         style={
//                           styles.marketCoinImage
//                         }
//                       />

//                       <View>
//                         <Text
//                           style={
//                             styles.marketCoinName
//                           }>
//                           {coin.name}
//                         </Text>

//                         <Text
//                           style={
//                             styles.marketCoinSymbol
//                           }>
//                           {coin.symbol?.toUpperCase()}
//                         </Text>
//                       </View>
//                     </View>

//                     <View
//                       style={[
//                         styles.marketBadge,
//                         {
//                           backgroundColor:
//                             isNegative
//                               ? '#FFE5EA'
//                               : '#E7FFF1',
//                         },
//                       ]}>
//                       <Text
//                         style={{
//                           color: isNegative
//                             ? '#FF4D6D'
//                             : '#00C853',
//                           fontWeight: '700',
//                         }}>
//                         {isNegative
//                           ? 'Bearish'
//                           : 'Bullish'}
//                       </Text>
//                     </View>
//                   </View>

//                   <View style={styles.priceSection}>
//                     <Text style={styles.marketPrice}>
//                       $
//                       {coin?.price?.toLocaleString()}
//                     </Text>

//                     <Text
//                       style={[
//                         styles.marketChange,
//                         {
//                           color: isNegative
//                             ? '#FF4D6D'
//                             : '#00C853',
//                         },
//                       ]}>
//                       {isNegative ? '▼' : '▲'}{' '}
//                       {Math.abs(
//                         coin.priceChangePercentage24h ||
//                           0,
//                       ).toFixed(2)}
//                       %
//                     </Text>
//                   </View>

//                   <LineChart
//                     data={{
//                       datasets: [
//                         {
//                           data: graphData,
//                         },
//                       ],
//                     }}
//                     width={screenWidth * 0.78}
//                     height={100}
//                     withDots={false}
//                     withInnerLines={false}
//                     withOuterLines={false}
//                     withHorizontalLabels={false}
//                     withVerticalLabels={false}
//                     withShadow={false}
//                     transparent
//                     bezier
//                     chartConfig={{
//                       backgroundGradientFrom:
//                         '#fff',
//                       backgroundGradientTo:
//                         '#fff',
//                       decimalPlaces: 0,
//                       color: () =>
//                         isNegative
//                           ? '#FF4D6D'
//                           : '#00C853',
//                       strokeWidth: 3,
//                       propsForBackgroundLines: {
//                         stroke: 'transparent',
//                       },
//                     }}
//                     style={styles.chartStyle}
//                   />
//                 </View>
//               );
//             },
//           )}
//         </View> */}

//         {/* ////////////////////////////////////////////////////////////////////

// <View style={[styles.marketCardsContainer, { marginBottom: 30 }]}>
//   {expertCoins?.slice(0, 1).map((coin, index) => (
//     <AdvancedMarketCard
//       key={index}
//       coin={coin}
//       onPress={() => navigation.navigate('CoinDetailsScreen', { coin })}
//     />
//   ))}
// </View>

// ///////////////////////////////////////////////////////////////////////////////// */}

//         <View style={styles.newsContainer}>
//           <View style={styles.newsHeader}>
//             <Text style={styles.newsTitle}>📰   Crypto News</Text>

//          {newsCount < marketNews?.length && (
//   <TouchableOpacity
// //   onPress={() => {
// //     // setNewsCount(prev => prev + 15);

// //     // setTimeout(() => {
// //     //   scrollRef.current?.scrollToEnd({ animated: true });
// //     // }, 200);
// //     setNewsCount(prev => prev + 15);

// // requestAnimationFrame(() => {
// //   setTimeout(() => {
// //     scrollRef.current?.scrollToEnd({
// //       animated: true,
// //     });
// //   }, 300);
// // });
// //   }}

// onPress={() => {
//   setNewsCount(prev => prev + 15);

//   requestAnimationFrame(() => {
//     setTimeout(() => {
//       scrollRef.current?.scrollTo({
//         y: 2200, // change this value
//         animated: true,
//       });
//     }, 300);
//   });
// }}
//   >
//     <Text style={styles.viewAllText}>View More</Text>
//   </TouchableOpacity>
// )}
//           </View>

//      {marketNews?.slice(0, newsCount)?.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.newsCard}
//               activeOpacity={0.8}
//               onPress={() =>
//                 Linking.openURL(item.url)
//               }>
//               <View style={styles.newsLeft}>
//                 <Text style={styles.newsSource}>
//                   {item.source}
//                 </Text>

//                 <Text
//                   style={styles.newsHeadline}
//                   numberOfLines={2}>
//                   {item.title}
//                 </Text>

//                 <Text style={styles.newsDate}>
//                   {formatDate(item.publishedAt)}
//                 </Text>
//               </View>

//               <Image
//                 source={{
//                   uri:
//                     item.image || "",
//                     // 'https://cdn-icons-png.flaticon.com/512/833/833472.png',
//                 }}
//                 style={styles.newsImage}
//               />
//             </TouchableOpacity>
//           ))}
//         </View>


//       </ScrollView>
//     </SafeAreaView>
//   );
// }




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
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather'; // Retained for common arrows/eye icons if needed
// import { useFocusEffect } from '@react-navigation/native';
// import api from '../../api/axios';
// import styles from './homeStyling';
// import { windowWidth } from '../../utils/responsive';
// import HomeHeader from '../components/header';
// import Header from '../components/header';

// export default function HomeScreen({ navigation }) {
//   const [balanceVisible, setBalanceVisible] = useState(true);
//   const [available, setAvailable] = useState('0.0');
//   const [avbRuppee, setAvbRuppee] = useState('10');
//   const [expertCoins, setExpertCoins] = useState([]);
//   const [marketNews, setMarketNews] = useState([]);
//   const [newsCount, setNewsCount] = useState(3);
  
//   const scrollRef = useRef(null);
//   const flatListRef = useRef(null);
//   const [activeBanner, setActiveBanner] = useState(0);
//   // const isRestricted = avbRuppee < 100;

//   const isRestricted = useMemo(() => {
//     const numericValue = parseFloat(String(avbRuppee).replace(/[^\d.]/g, ''));
//     if (isNaN(numericValue)) return true; 
//     return numericValue < 100;
//   }, [avbRuppee]);

//   console.log (isRestricted,"isRestricted",avbRuppee)
  

//   // References the local banner assets
//   const bannerData = [
//     { id: '1', image: require('../../../assets/images/banner1.png') },
//     { id: '2', image: require('../../../assets/images/banner2.png') },
//     { id: '3', image: require('../../../assets/images/banner3.png') },
//     { id: '4', image: require('../../../assets/images/banner4.png') },
//   ];

//   useEffect(() => {
//     if (bannerData?.length === 0) return;
    
//     const interval = setInterval(() => {
//       setActiveBanner((prev) => {
//         const nextIndex = (prev + 1) % bannerData.length;
//         flatListRef.current?.scrollToIndex({
//           index: nextIndex,
//           animated: true,
//         });
//         return nextIndex;
//       });
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [bannerData.length]);

//   const onViewableItemsChanged = useRef(({ viewableItems }) => {
//     if (viewableItems.length > 0 && viewableItems[0].index !== null) {
//       setActiveBanner(viewableItems[0].index);
//     }
//   }).current;

//   const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

//   const fetchBalance = async () => {
//     try {
//       const response = await api.get('/api/wallet/balance');
//       setAvailable(response?.data?.balance || '0.0'); 
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchExpertCoins = async () => {
//     try {
//       const res = await api.get('/api/market/overview');
//       setExpertCoins(res?.data?.data?.slice(0, 5) || []);
//     } catch (error) {
//       console.log(error);
//       setExpertCoins([
//         { symbol: 'BTC', name: 'Bitcoin', price: 9250000, priceChangePercentage24h: 2.8 },
//         { symbol: 'ETH', name: 'Ethereum', price: 245000, priceChangePercentage24h: -0.8 },
//         { symbol: 'BNB', name: 'BNB', price: 68000, priceChangePercentage24h: 1.2 },
//         { symbol: 'SOL', name: 'Solana', price: 15400, priceChangePercentage24h: 6.5 },
//         { symbol: 'PAYO', name: 'PAYO', price: 70.12, priceChangePercentage24h: 4.2 },
//       ]);
//     }
//   };

//   const fetchMarketNews = async () => {
//     try {
//       const res = await api.get('/api/news/crypto-news');
//       setMarketNews(res?.data?.data || []);
//     } catch (error) {
//       console.log(error);
//       setMarketNews([
//         { title: 'Bitcoin crosses new resistance level', publishedAt: new Date(), symbol: 'BTC' },
//         { title: 'Ethereum ETF attracts record inflows', publishedAt: new Date(Date.now() - 600000), symbol: 'ETH' },
//         { title: 'PAYO announces new wallet features', publishedAt: new Date(Date.now() - 3600000), symbol: 'PAYO' },
//       ]);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchBalance();
//       fetchExpertCoins();
//       fetchMarketNews();
//     }, []),
//   );

//   const getCoinColor = (symbol) => {
//     const sym = symbol?.toUpperCase();
//     if (sym === 'BTC') return { bg: '#fff7ed', text: '#ea580c' };
//     if (sym === 'ETH') return { bg: '#eff6ff', text: '#2563eb' };
//     if (sym === 'BNB') return { bg: '#fef3c7', text: '#d97706' };
//     if (sym === 'SOL') return { bg: '#f3e8ff', text: '#9333ea' };
//     return { bg: '#f3e8ff', text: '#7c3aed' }; 
//   };

//   const getTimeAgo = (dateStr) => {
//     const time = new Date(dateStr).getTime();
//     const now = new Date().getTime();
//     const diff = Math.floor((now - time) / 60000);
//     if (diff < 60) return `${diff} min ago`;
//     const hours = Math.floor(diff / 60);
//     return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//   };

//   const handleQuickAction = (route, params) => {
//     if (isRestricted) {
//       Alert.alert(
//         'Access Restricted',
//         'You are unable to access this. Please add money to your wallet.'
//       );
//     } else {
//       navigation.navigate(route, params);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#f4f6f9" barStyle="dark-content" />


//       <Header />

//       <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      
//      <LinearGradient 
//           colors={['#6366f1', '#4f46e5']} 
//           start={{ x: 0, y: 0 }} 
//           end={{ x: 1, y: 1 }} 
//           style={styles.walletCard}
//         >
//           <View style={styles.cardLightHighlight} />
          

//           {/* TOP ROW: Title & Eye Icon + View Wallet Button */}
//           <View style={styles.walletHeaderRow}>
//             <View style={styles.rowCenter}>
//               <Text style={styles.walletLabel}>Total Wallet Balance</Text>
//               <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)} style={{ marginLeft: 8 }}>
//                 <Icon name={balanceVisible ? 'eye-off' : 'eye'} size={18} color="rgba(255,255,255,0.8)" />
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity 
//               style={styles.viewWalletBtn}
//               activeOpacity={0.8}
//               onPress={() => navigation.navigate('WalletScreen')}
//             >
//               <Text style={styles.viewWalletText}>View Wallet</Text>
//               <Icon name="chevron-right" size={14} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           {/* MIDDLE ROW: Main Balance Text */}
//           <View style={styles.balanceContainer}>
//             <View style={styles.balanceRow}>
//               <Text style={styles.balanceAmount}>{balanceVisible ? available : '****'}</Text>
//               <Text style={styles.balanceCurrency}>PAYO</Text>
//             </View>
            
//             <Text style={styles.fiatAmount}>{balanceVisible ? `₹ ${avbRuppee}` : ''}</Text>
//           </View>

//           {/* BOTTOM ROW: Add Money Button aligned perfectly to the bottom-right corner */}
//           <View style={styles.bottomActionRow}>
//             <TouchableOpacity 
//               onPress={() => navigation.navigate('AddMoneytoWallet')} 
//               style={styles.addMoneyBtn}
//               activeOpacity={0.9}
//             >
//               <Icon name="plus" size={22} color="#22c55e" style={{ marginRight: 6 }} />
//               <Text style={styles.addMoneyText}>Add Money</Text>
//             </TouchableOpacity>
//           </View>
//         </LinearGradient>

//         {/* Quick Actions */}
//        {/* <View style={styles.sectionContainer}>
//           <Text style={styles.sectionHeading}>Quick Actions</Text>
         
//           <View style={styles.actionsGrid}>
//             {[
//               { id: 'send', image: require('../../../assets/images/Icon.png'), label: 'Send', route: 'SendScreen', params: { tab: 'scan' } },
//               { id: 'receive', image: require('../../../assets/images/Icon (1).png'), label: 'Receive', route: 'Receive' },
//               { id: 'scan', image: require('../../../assets/images/Icon (2).png'), label: 'Scan QR', route: 'SendScreen', params: { tab: 'scan' } },
//               { id: 'exchange', image: require('../../../assets/images/Icon (3).png'), label: 'Exchange', route: 'ExchangeScreen' }
//             ].map((action) => (
//               <TouchableOpacity 
//                 key={action.id} 
//                 // 1. Disable the button completely when restricted
//                 disabled={isRestricted}
//                 // 2. Reduce opacity to 40% when inactive to make it look faded/disabled
//                 style={[styles.actionItem, isRestricted && { opacity: 0.4 }]}
//                 activeOpacity={0.7}
//                 onPress={() => navigation.navigate(action.route, action.params)}
//               >
//                 <View style={styles.actionIconBtn}>
//                   <Image 
//                     source={action.image} 
//                     style={styles.actionImageFormat} 
//                     resizeMode="contain"
//                   />
//                 </View>
//                 <Text style={styles.actionLabel}>{action.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View> */}

//         <View style={styles.sectionContainer
//         ,
//          isRestricted && { 
//                 backgroundColor: '#e0e1e1', 
//                 borderRadius: 16, 
//                 paddingVertical: 15,
//                 paddingHorizontal:15,
//                 marginHorizontal: 15,
//                 marginTop:15,
//                 opacity: 0.7 
//               }
//                }>
//           <Text style={styles.sectionHeading}>Quick Actions</Text>
         
//           <View 
//             style={[
//               styles.actionsGrid
//               // , 
//               // isRestricted && { 
//               //   backgroundColor: '#F3F4F6', 
//               //   borderRadius: 16, 
//               //   paddingVertical: 15,
//               //   opacity: 0.7 
//               // }
//             ]}
//           >
//             {[
//               { id: 'send', image: require('../../../assets/images/Icon.png'), label: 'Send', route: 'SendScreen', params: { tab: 'scan' } },
//               { id: 'receive', image: require('../../../assets/images/Icon (1).png'), label: 'Receive', route: 'Receive' },
//               { id: 'scan', image: require('../../../assets/images/Icon (2).png'), label: 'Scan QR', route: 'SendScreen', params: { tab: 'scan' } },
//               { id: 'exchange', image: require('../../../assets/images/Icon (3).png'), label: 'Exchange', route: 'ExchangeScreen' }
//             ].map((action) => (
//               <TouchableOpacity 
//                 key={action.id} 
//                 style={styles.actionItem}
//                 activeOpacity={0.7}
//                 onPress={() => handleQuickAction(action.route, action.params)}
//               >
//                 <View style={[styles.actionIconBtn, isRestricted && { backgroundColor: '#9CA3AF', shadowOpacity: 0, elevation: 0 }]}>
//                   <Image 
//                     source={action.image} 
//                     style={styles.actionImageFormat} 
//                     resizeMode="contain"
//                   />
//                 </View>
//                 <Text style={styles.actionLabel}>{action.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Image Banner Section with Edge-Clipping & Custom Dots Overlay */}
// <View style={styles.carouselContainer}>
//   <FlatList
//     ref={flatListRef}
//     data={bannerData}
//     keyExtractor={(item) => item.id}
//     horizontal
//     showsHorizontalScrollIndicator={false}
//     snapToInterval={(windowWidth * 0.78) + 16} 
//     decelerationRate="fast"
//     onViewableItemsChanged={onViewableItemsChanged}
//     viewabilityConfig={viewabilityConfig}
//     renderItem={({ item }) => (
//       <View style={styles.bannerWrapper}>
//         <Image
//           source={item.image}
//           style={styles.bannerCard}
//           resizeMode="stretch" // <-- Change this from "stretch" to "cover"
//         />
//       </View>
//     )}
//   />
  
//   <View style={styles.bannerPagination}>
//     {bannerData.map((_, i) => (
//       <View 
//         key={i} 
//         style={[styles.dot, activeBanner === i && styles.dotActive]} 
//       />
//     ))}
//   </View>
// </View>

//         {/* Crypto Market Table */}
//         <View style={styles.sectionContainer}>
//           <View style={styles.sectionHeaderRow}>
//             <Text style={styles.sectionHeading}>Crypto Market</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('MarketScreen')}>
//               <Text style={styles.viewAllText}>View All {">"}</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.card}>
//             <View style={styles.tableHeader}>
//               <Text style={[styles.tableHeaderText, {flex: 2}]}>COIN</Text>
//               <Text style={[styles.tableHeaderText, {flex: 2, textAlign: 'right'}]}>PRICE</Text>
//               <Text style={[styles.tableHeaderText, {flex: 1.5, textAlign: 'right'}]}>24H</Text>
//             </View>

//             {expertCoins.map((coin, index) => {
//               const isPositive = coin.priceChangePercentage24h >= 0;
//               const coinColors = getCoinColor(coin.symbol);
//               return (
//                 <TouchableOpacity 
//                   key={index} 
//                   style={styles.tableRow}
//                   onPress={() => navigation.navigate('CoinDetailsScreen', { coin })}
//                 >
//                   <View style={[styles.tableCell, {flex: 2, flexDirection: 'row', alignItems: 'center'}]}>
//                     <View style={[styles.coinIcon, {backgroundColor: coinColors.text}]}>
//                       <Text style={styles.coinIconText}>{coin.symbol?.charAt(0)}</Text>
//                     </View>
//                     <View>
//                       <Text style={styles.coinSymbol}>{coin.symbol?.toUpperCase()}</Text>
//                       <Text style={styles.coinName}>{coin.name || coin.symbol}</Text>
//                     </View>
//                   </View>
//                   <Text style={[styles.tableCell, styles.coinPrice, {flex: 2, textAlign: 'right'}]}>
//                     ₹{coin.price?.toLocaleString()}
//                   </Text>
//                   <Text style={[styles.tableCell, {flex: 1.5, textAlign: 'right', color: isPositive ? '#10b981' : '#ef4444', fontWeight: '600'}]}>
//                     {isPositive ? '▲' : '▼'} {Math.abs(coin.priceChangePercentage24h).toFixed(1)}%
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         </View>
//  <TouchableOpacity onPress={()=>{
//            navigation.replace(
//           'successfullPayment',
//           {
//             amount:"999",
//             name:"sowmya",
//           },
//         );
//           }}>
//   <Text>success</Text>
// </TouchableOpacity>
//         {/* Crypto News */}
//         <View style={styles.sectionContainer}>
//           <View style={styles.sectionHeaderRow}>
//             <Text style={styles.sectionHeading}>Crypto News</Text>
//             <TouchableOpacity onPress={() => setNewsCount(prev => prev + 3)}>
//               <Text style={styles.viewAllText}>View More {">"}</Text>
//             </TouchableOpacity>
//           </View>

//           {marketNews?.slice(0, newsCount)?.map((item, index) => {
//             const coinColors = getCoinColor(item.symbol || 'BTC');
//             return (
//               <TouchableOpacity 
//                 key={index} 
//                 style={[styles.card, styles.newsCard]} 
//                 onPress={() => Linking.openURL(item.url || 'https://google.com')}
//               >
//                 <Image 
//                   source={{ uri: item.image || 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=200' }} 
//                   style={styles.newsImage} 
//                 />
//                 <View style={styles.newsContent}>
//                   <Text style={styles.newsHeadline} numberOfLines={2}>{item.title}</Text>
//                   <View style={styles.newsMetaRow}>
//                     <Text style={styles.newsTime}>{getTimeAgo(item.publishedAt)}</Text>
//                     <View style={[styles.tagPill, {backgroundColor: coinColors.bg}]}>
//                       <Text style={[styles.tagText, {color: coinColors.text}]}>{item.symbol || 'BTC'}</Text>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }

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
  StyleSheet,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../api/axios';
import styles from './homeStyling';
import { moderateScale, windowWidth } from '../../utils/responsive';
import Header from '../components/header';

export default function HomeScreen({ navigation }) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [available, setAvailable] = useState('0');
  const [avbRuppee, setAvbRuppee] = useState('0');
  const [expertCoins, setExpertCoins] = useState([]);
  const [marketNews, setMarketNews] = useState([]);
  const [newsCount, setNewsCount] = useState(3);
  
  const scrollRef = useRef(null);
  const flatListRef = useRef(null);
  const [activeBanner, setActiveBanner] = useState(0);

  const isRestricted = useMemo(() => {
    const numericValue = parseFloat(String(avbRuppee).replace(/[^\d.]/g, ''));
    if (isNaN(numericValue)) return true; 
    return numericValue < 100;
  }, [avbRuppee]);

  const bannerData = [
    { id: '1', image: require('../../../assets/images/banner1.png') },
    { id: '2', image: require('../../../assets/images/banner2.png') },
    { id: '3', image: require('../../../assets/images/banner3.png') },
    { id: '4', image: require('../../../assets/images/banner4.png') },
  ];

  useEffect(() => {
    if (bannerData?.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveBanner((prev) => {
        const nextIndex = (prev + 1) % bannerData.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerData.length]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveBanner(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const fetchBalance = async () => {
    try {
      const response = await api.get('/api/wallet/balance');
      setAvailable(response?.data?.balance || '0.0'); 
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpertCoins = async () => {
    try {
      const res = await api.get('/api/market/overview');
      setExpertCoins(res?.data?.data?.slice(0, 5) || []);
    } catch (error) {
      console.log(error);
      setExpertCoins([
        { symbol: 'BTC', name: 'Bitcoin', price: 9250000, priceChangePercentage24h: 2.8 },
        { symbol: 'ETH', name: 'Ethereum', price: 245000, priceChangePercentage24h: -0.8 },
        { symbol: 'BNB', name: 'BNB', price: 68000, priceChangePercentage24h: 1.2 },
        { symbol: 'SOL', name: 'Solana', price: 15400, priceChangePercentage24h: 6.5 },
        { symbol: 'PAYO', name: 'PAYO', price: 70.12, priceChangePercentage24h: 4.2 },
      ]);
    }
  };

  const fetchMarketNews = async () => {
    try {
      const res = await api.get('/api/news/crypto-news');
      setMarketNews(res?.data?.data || []);
    } catch (error) {
      console.log(error);
      setMarketNews([
        { title: 'Bitcoin crosses new resistance level', publishedAt: new Date(), symbol: 'BTC' },
        { title: 'Ethereum ETF attracts record inflows', publishedAt: new Date(Date.now() - 600000), symbol: 'ETH' },
        { title: 'PAYO announces new wallet features', publishedAt: new Date(Date.now() - 3600000), symbol: 'PAYO' },
      ]);
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchBalance();
  //     fetchExpertCoins();
  //     fetchMarketNews();
  //   }, []),
  // );
useFocusEffect(
    useCallback(() => {
      // 1. Fetch dashboard data
      fetchBalance();
      fetchExpertCoins();
      fetchMarketNews();

      // 2. Disable iOS swipe-to-go-back gesture
      navigation.setOptions({
        gestureEnabled: false,
      });

      // 3. Intercept Android Hardware Back Press and close the app
      const onBackPress = () => {
        BackHandler.exitApp(); // Closes the app completely
        return true; // Prevents default navigation action
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      // Cleanup listener when HomeScreen loses focus
      return () => backHandler.remove();
    }, [navigation])
  );

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
    if (diff < 60) return `${diff} min ago`;
    const hours = Math.floor(diff / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  const handleQuickAction = (route, params) => {
    if (isRestricted) {
      Alert.alert(
        'Access Restricted',
        'You are unable to access this. Please add money to your wallet.',
        [
          {
            text: 'OK',
            style: 'cancel', // Keeps it subtle on the left
            onPress: () => console.log('OK Pressed'),
          },
          {
            text: 'Add Money',
            onPress: () => navigation.navigate('AddMoneytoWallet'),
          },
        ],
        { cancelable: true }
      );
    } else {
      navigation.navigate(route, params);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#f4f6f9" barStyle="dark-content" />

      <Header />

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Gradient Wallet Card */}
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
              <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)} style={{ marginLeft: 8 }}>
                <Icon name={balanceVisible ? 'eye-off' : 'eye'} size={18} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.viewWalletBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('WalletScreen')}
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
            <Text style={styles.fiatAmount}>{balanceVisible ? `₹ ${avbRuppee}` : ''}</Text>
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
        <View style={[styles.sectionContainer,isRestricted && localStyles.restrictedCardBackground]}>
          <Text style={[styles.sectionHeading, isRestricted && localStyles.Text ]}>Quick Actions</Text>
         
          <View style={[styles.actionsGridCard, 
            // isRestricted && localStyles.restrictedCardBackground
            ]}>
            <View style={styles.actionsGrid}>
              {[
                { id: 'send', image: require('../../../assets/images/Icon.png'), label: 'Send', route: 'SendScreen', params: { tab: 'scan' } },
                { id: 'receive', image: require('../../../assets/images/Icon (1).png'), label: 'Receive', route: 'Receive' },
                { id: 'scan', image: require('../../../assets/images/Icon (2).png'), label: 'Scan QR', route: 'SendScreen', params: { tab: 'scan' } },
                { id: 'exchange', image: require('../../../assets/images/Icon (3).png'), label: 'Exchange', route: 'ExchangeScreen' }
              ].map((action) => (
                <TouchableOpacity 
                  key={action.id} 
                  style={styles.actionItem}
                  activeOpacity={isRestricted ? 1 : 0.7}
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

            {/* Glass-Style Lock Overlay for a high-quality UI */}
            {isRestricted && (
              <View style={localStyles.lockOverlay}>
                <Icon name="lock" size={15} color="#6B7280" style={localStyles.lockIcon} />
                <Text style={localStyles.lockText}>Unlock by adding ₹100 or more to your Wallet</Text>
              </View>
            )}
          </View>
        </View>

        {/* Banners */}
        {/* <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={bannerData}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={(windowWidth * 0.78) + 16} 
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
        </View> */}

        <View style={styles.carouselContainer}>
  <FlatList
    ref={flatListRef}
    data={bannerData}
    keyExtractor={(item) => item.id}
    horizontal
    showsHorizontalScrollIndicator={false}
    snapToInterval={(windowWidth * 0.78) + 16} 
    decelerationRate="fast"
    onViewableItemsChanged={onViewableItemsChanged}
    viewabilityConfig={viewabilityConfig}
    renderItem={({ item }) => (
      <View style={styles.bannerWrapper}>
        <Image
          source={item.image}
          style={styles.bannerCard}
          resizeMode="stretch" // <-- Change this from "stretch" to "cover"
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
                    ₹{coin.price?.toLocaleString()}
                  </Text>
                  <Text style={[styles.tableCell, {flex: 1.5, textAlign: 'right', color: isPositive ? '#10b981' : '#ef4444', fontWeight: '600'}]}>
                    {isPositive ? '▲' : '▼'} {Math.abs(coin.priceChangePercentage24h).toFixed(1)}%
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* <TouchableOpacity onPress={() => {
          navigation.replace('successfullPayment', { amount: "999", name: "sowmya" });
        }}>
          <Text style={{ textAlign: 'center', marginVertical: 10, color: '#4f46e5' }}>success</Text>
        </TouchableOpacity> */}

        {/* Crypto News */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Crypto News</Text>
            <TouchableOpacity onPress={() => setNewsCount(prev => prev + 3)}>
              <Text style={styles.viewAllText}>View More {">"}</Text>
            </TouchableOpacity>
          </View>

          {marketNews?.slice(0, newsCount)?.map((item, index) => {
            const coinColors = getCoinColor(item.symbol || 'BTC');
            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.card, styles.newsCard]} 
                onPress={() => Linking.openURL(item.url || 'https://google.com')}
              >
                <Image 
                  source={{ uri: item.image || 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=200' }} 
                  style={styles.newsImage} 
                />
                <View style={styles.newsContent}>
                  <Text style={styles.newsHeadline} numberOfLines={2}>{item.title}</Text>
                  <View style={styles.newsMetaRow}>
                    <Text style={styles.newsTime}>{getTimeAgo(item.publishedAt)}</Text>
                    <View style={[styles.tagPill, {backgroundColor: coinColors.bg}]}>
                      <Text style={[styles.tagText, {color: coinColors.text}]}>{item.symbol || 'BTC'}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  restrictedCardBackground: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    paddingHorizontal:20,
    paddingVertical:20,
    marginHorizontal:20,
    marginVertical:20,
    borderRadius: 16,
  },
  Text:{
opacity:0.4,
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
    marginTop:10
  },
  lockIcon: {
    marginRight: 8,
    marginTop:12
  },
  lockText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000102',
    marginTop:13

  },
});



// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   StatusBar,
//   FlatList,
//   Linking,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather';
// import { useFocusEffect } from '@react-navigation/native';
// import api from '../../api/axios';
// import styles from './homeStyling';
// import { windowWidth } from '../../utils/responsive';

// export default function HomeScreen({ navigation }) {
//   const [balanceVisible, setBalanceVisible] = useState(true);
//   const [available, setAvailable] = useState('12,450');
//   const [expertCoins, setExpertCoins] = useState([]);
//   const [marketNews, setMarketNews] = useState([]);
//   const [newsCount, setNewsCount] = useState(3);
  
//   const scrollRef = useRef(null);
//   const flatListRef = useRef(null);
//   const [activeBanner, setActiveBanner] = useState(0);

//   // Updated banner data referencing the 10 local assets
//   const bannerData = [
//     { id: '1', image: require('../../../assets/images/banner1.png') },
//     { id: '2', image: require('../../../assets/images/banner2.png') },
//     { id: '3', image: require('../../../assets/images/banner3.png') },
//     { id: '4', image: require('../../../assets/images/banner4.png') },
//     { id: '5', image: require('../../../assets/images/banner5.png') },
//   ];

//   useEffect(() => {
//     if (bannerData.length === 0) return;
    
//     const interval = setInterval(() => {
//       setActiveBanner((prev) => {
//         const nextIndex = (prev + 1) % bannerData.length;
//         flatListRef.current?.scrollToIndex({
//           index: nextIndex,
//           animated: true,
//         });
//         return nextIndex;
//       });
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [bannerData.length]);

//   const onViewableItemsChanged = useRef(({ viewableItems }) => {
//     if (viewableItems.length > 0 && viewableItems[0].index !== null) {
//       setActiveBanner(viewableItems[0].index);
//     }
//   }).current;

//   const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

//   const fetchBalance = async () => {
//     try {
//       const response = await api.get('/api/wallet/balance');
//       setAvailable(response?.data?.balance || '12,450'); 
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchExpertCoins = async () => {
//     try {
//       const res = await api.get('/api/market/overview');
//       setExpertCoins(res?.data?.data?.slice(0, 5) || []);
//     } catch (error) {
//       console.log(error);
//       setExpertCoins([
//         { symbol: 'BTC', name: 'Bitcoin', price: 9250000, priceChangePercentage24h: 2.8 },
//         { symbol: 'ETH', name: 'Ethereum', price: 245000, priceChangePercentage24h: -0.8 },
//         { symbol: 'BNB', name: 'BNB', price: 68000, priceChangePercentage24h: 1.2 },
//         { symbol: 'SOL', name: 'Solana', price: 15400, priceChangePercentage24h: 6.5 },
//         { symbol: 'PAYO', name: 'PAYO', price: 70.12, priceChangePercentage24h: 4.2 },
//       ]);
//     }
//   };

//   const fetchMarketNews = async () => {
//     try {
//       const res = await api.get('/api/news/crypto-news');
//       setMarketNews(res?.data?.data || []);
//     } catch (error) {
//       console.log(error);
//       setMarketNews([
//         { title: 'Bitcoin crosses new resistance level', publishedAt: new Date(), symbol: 'BTC' },
//         { title: 'Ethereum ETF attracts record inflows', publishedAt: new Date(Date.now() - 600000), symbol: 'ETH' },
//         { title: 'PAYO announces new wallet features', publishedAt: new Date(Date.now() - 3600000), symbol: 'PAYO' },
//       ]);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchBalance();
//       fetchExpertCoins();
//       fetchMarketNews();
//     }, []),
//   );

//   const getCoinColor = (symbol) => {
//     const sym = symbol?.toUpperCase();
//     if (sym === 'BTC') return { bg: '#fff7ed', text: '#ea580c' };
//     if (sym === 'ETH') return { bg: '#eff6ff', text: '#2563eb' };
//     if (sym === 'BNB') return { bg: '#fef3c7', text: '#d97706' };
//     if (sym === 'SOL') return { bg: '#f3e8ff', text: '#9333ea' };
//     return { bg: '#f3e8ff', text: '#7c3aed' }; 
//   };

//   const getTimeAgo = (dateStr) => {
//     const time = new Date(dateStr).getTime();
//     const now = new Date().getTime();
//     const diff = Math.floor((now - time) / 60000);
//     if (diff < 60) return `${diff} min ago`;
//     const hours = Math.floor(diff / 60);
//     return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#f4f6f9" barStyle="dark-content" />

//       {/* Custom Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.iconButton}>
//           <Icon name="menu" size={24} color="#1f2937" />
//         </TouchableOpacity>
        
//         <Image 
//           source={require('../../../assets/images/LogoContainer.png')} 
//           style={styles.logo} 
//           resizeMode="contain" 
//         />
        
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.iconButton}>
//             <Icon name="bell" size={24} color="#1f2937" />
//             {/* <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View> */}
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.profileIcon}>
//             <Icon name="user" size={18} color="#fff" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
//         {/* Gradient Wallet Card */}
//         <LinearGradient 
//           colors={['#7c3aed', '#3b82f6']} 
//           start={{ x: 0, y: 0 }} 
//           end={{ x: 1, y: 1 }} 
//           style={styles.walletCard}
//         >
//           <View style={styles.walletHeaderRow}>
//             <View style={styles.rowCenter}>
//               <Text style={styles.walletLabel}>Total Wallet Balance</Text>
//               <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)} style={{marginLeft: 8}}>
//                 <Icon name={balanceVisible ? 'eye-off' : 'eye'} size={16} color="rgba(255,255,255,0.8)" />
//               </TouchableOpacity>
//             </View>
//             <TouchableOpacity style={styles.viewWalletBtn}>
//               <Text style={styles.viewWalletText}>View Wallet</Text>
//               <Icon name="chevron-right" size={14} color="#fff" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.balanceRow}>
//             <Text style={styles.balanceAmount}>{balanceVisible ? available : '****'}</Text>
//             <Text style={styles.balanceCurrency}>PAYO</Text>
//           </View>
//           <Text style={styles.fiatAmount}>{balanceVisible ? '≈ ₹8,71,500' : '≈ ₹***'}</Text>

//           <TouchableOpacity style={styles.addMoneyBtn}>
//             <Icon name="plus" size={18} color="#10b981" />
//             <Text style={styles.addMoneyText}>Add Money</Text>
//           </TouchableOpacity>
//         </LinearGradient>

//         {/* Quick Actions */}
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionHeading}>Quick Actions</Text>
//           <View style={styles.actionsGrid}>
//             {[
//               { id: 'send', icon: 'send', label: 'Send', route: 'SendScreen', params: { tab: 'scan' } },
//               { id: 'receive', icon: 'download', label: 'Receive', route: 'Receive' },
//               { id: 'scan', icon: 'maximize', label: 'Scan QR', route: 'SendScreen', params: { tab: 'scan' } },
//               { id: 'exchange', icon: 'refresh-cw', label: 'Exchange', route: 'ExchangeScreen' }
//             ].map((action) => (
//               <TouchableOpacity 
//                 key={action.id} 
//                 style={styles.actionItem}
//                 onPress={() => navigation.navigate(action.route, action.params)}
//               >
//                 <View style={styles.actionIconBtn}>
//                   <Icon name={action.icon} size={20} color="#fff" />
//                 </View>
//                 <Text style={styles.actionLabel}>{action.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Updated Image Banner Section */}
//         <View style={styles.carouselContainer}>
//           <FlatList
//             ref={flatListRef}
//             data={bannerData}
//             keyExtractor={(item) => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             // Snaps perfectly to the new banner width + the right margin gap
//             snapToInterval={(windowWidth * 0.78) + 16} 
//             decelerationRate="fast"
//             // NO contentContainerStyle padding needed here anymore
//             onViewableItemsChanged={onViewableItemsChanged}
//             viewabilityConfig={viewabilityConfig}
//             renderItem={({ item }) => (
//               <View style={styles.bannerWrapper}>
//                 <Image
//                   source={item.image}
//                   style={styles.bannerCard}
//                   resizeMode="stretch" 
//                 />
//               </View>
//             )}
//           />
          
//           {/* Pagination overlaid on top of the images */}
//           <View style={styles.bannerPagination}>
//             {bannerData.map((_, i) => (
//               <View 
//                 key={i} 
//                 style={[styles.dot, activeBanner === i && styles.dotActive]} 
//               />
//             ))}
//           </View>
//         </View>

//         {/* Crypto Market Table */}
//         <View style={styles.sectionContainer}>
//           <View style={styles.sectionHeaderRow}>
//             <Text style={styles.sectionHeading}>Crypto Market</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('MarketScreen')}>
//               <Text style={styles.viewAllText}>View All</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.card}>
//             <View style={styles.tableHeader}>
//               <Text style={[styles.tableHeaderText, {flex: 2}]}>COIN</Text>
//               <Text style={[styles.tableHeaderText, {flex: 2, textAlign: 'right'}]}>PRICE</Text>
//               <Text style={[styles.tableHeaderText, {flex: 1.5, textAlign: 'right'}]}>24H</Text>
//             </View>

//             {expertCoins.map((coin, index) => {
//               const isPositive = coin.priceChangePercentage24h >= 0;
//               const coinColors = getCoinColor(coin.symbol);
//               return (
//                 <TouchableOpacity 
//                   key={index} 
//                   style={styles.tableRow}
//                   onPress={() => navigation.navigate('CoinDetailsScreen', { coin })}
//                 >
//                   <View style={[styles.tableCell, {flex: 2, flexDirection: 'row', alignItems: 'center'}]}>
//                     <View style={[styles.coinIcon, {backgroundColor: coinColors.text}]}>
//                       <Text style={styles.coinIconText}>{coin.symbol?.charAt(0)}</Text>
//                     </View>
//                     <View>
//                       <Text style={styles.coinSymbol}>{coin.symbol?.toUpperCase()}</Text>
//                       <Text style={styles.coinName}>{coin.name || coin.symbol}</Text>
//                     </View>
//                   </View>
//                   <Text style={[styles.tableCell, styles.coinPrice, {flex: 2, textAlign: 'right'}]}>
//                     ₹{coin.price?.toLocaleString()}
//                   </Text>
//                   <Text style={[styles.tableCell, {flex: 1.5, textAlign: 'right', color: isPositive ? '#10b981' : '#ef4444', fontWeight: '600'}]}>
//                     {isPositive ? '▲' : '▼'} {Math.abs(coin.priceChangePercentage24h).toFixed(1)}%
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         </View>

//         {/* Crypto News */}
//         <View style={styles.sectionContainer}>
//           <View style={styles.sectionHeaderRow}>
//             <Text style={styles.sectionHeading}>Crypto News</Text>
//             <TouchableOpacity onPress={() => setNewsCount(prev => prev + 3)}>
//               <Text style={styles.viewAllText}>View More</Text>
//             </TouchableOpacity>
//           </View>

//           {marketNews?.slice(0, newsCount)?.map((item, index) => {
//             const coinColors = getCoinColor(item.symbol || 'BTC');
//             return (
//               <TouchableOpacity 
//                 key={index} 
//                 style={[styles.card, styles.newsCard]} 
//                 onPress={() => Linking.openURL(item.url || 'https://google.com')}
//               >
//                 <Image 
//                   source={{ uri: item.image || 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=200' }} 
//                   style={styles.newsImage} 
//                 />
//                 <View style={styles.newsContent}>
//                   <Text style={styles.newsHeadline} numberOfLines={2}>{item.title}</Text>
//                   <View style={styles.newsMetaRow}>
//                     <Text style={styles.newsTime}>{getTimeAgo(item.publishedAt)}</Text>
//                     <View style={[styles.tagPill, {backgroundColor: coinColors.bg}]}>
//                       <Text style={[styles.tagText, {color: coinColors.text}]}>{item.symbol || 'BTC'}</Text>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }
