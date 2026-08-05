import React, { useState, useEffect, useRef } from 'react';
import {
  StatusBar,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  PanResponder,
  Animated,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Defs, LinearGradient, Stop, Circle, Line as SvgLine } from 'react-native-svg';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { theme, globalStyles } from '../../MainTheme/theme';
import { scale, verticalScale, moderateScale, windowWidth, windowHeight } from '../../utils/responsive';

import api from '../../api/axios';

export default function CoinDetailsScreen({ route, navigation }) {
  const [selectedTF, setSelectedTF] = useState("1D");
  const [chartType, setChartType] = useState("line");
  const [loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [candleData, setCandleData] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipValue, setTooltipValue] = useState(null);
  const [visibleIndices, setVisibleIndices] = useState({ start: 0, end: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const lastScale = useRef(1);
  const translateX = useRef(new Animated.Value(0)).current;
  const lastTranslateX = useRef(0);
  const maxTranslateX = useRef(0);
  const minTranslateX = useRef(0);
  const symbol = `${route?.params?.coin?.symbol?.toUpperCase()}USDT`;
  const chartHeight = windowHeight * 0.34;
  const chartWidth = windowWidth * 0.78;
  const isBuyDisabled = true;  
  const isSellDisabled = true;  

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    fetchCoinData();
    fetchMarketData();
  }, [symbol]);

  useEffect(() => {
    if (coinData && selectedTF) {
      updateChartData();
      generateCandleData();
    }
  }, [selectedTF, coinData]);

  useEffect(() => {
    if (chartData.length > 0) {
      updateVisibleRange(lastScale.current, lastTranslateX.current);
    }
  }, [chartData]);

  const fetchCoinData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/trading/market/${symbol}`);
      const result = response.data;
      if (result.success) {
        setCoinData(result.data);
        updateChartData(result.data, selectedTF);
        generateCandleData(result.data, selectedTF);
      }
    } catch (error) {
      console.error('Error fetching coin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketData = async () => {
    try {
      const response = await api.get(`/api/trading/coin/${symbol}`);
      const result = response.data;
      if (result.success) {
        setMarketData(result?.data);
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const updateChartData = (data = coinData, timeframe = selectedTF) => {
    if (!data) return;

    let actualTimeframe = timeframe.toLowerCase();
    
    if (timeframe === "1D") {
      actualTimeframe = "1h";
    } else if (timeframe === "1W" || timeframe === "1M") {
      actualTimeframe = "1d";
    }

    const timeframeData = data.timeframes[actualTimeframe];
    if (!timeframeData) return;

    const ma7Data = timeframeData.movingAverages.MA7;
    
    const formattedData = ma7Data?.map((item) => ({
      timestamp: item.time,
      value: item.value,
      date: new Date(item.time),
    }));

    setChartData(formattedData);
    resetZoomAndPan();
  };

  const generateCandleData = (data = coinData, timeframe = selectedTF) => {
    if (!data) return;

    let actualTimeframe = timeframe.toLowerCase();
    
    if (timeframe === "1D") {
      actualTimeframe = "1h";
    } else if (timeframe === "1W" || timeframe === "1M") {
      actualTimeframe = "1d";
    }

    const timeframeData = data.timeframes[actualTimeframe];
    if (!timeframeData) return;

    const ma7Data = timeframeData.movingAverages.MA7;
    const high = timeframeData.high;
    const low = timeframeData.low;
    
    const candles = [];
    for (let i = 0; i < ma7Data.length; i++) {
      const currentClose = ma7Data[i].value;
      const prevClose = i > 0 ? ma7Data[i - 1].value : currentClose * 0.998;
      
      const open = prevClose;
      const close = currentClose;
      const volatility = (high - low) * 0.15;
      const highPrice = Math.max(open, close) + (Math.random() * volatility);
      const lowPrice = Math.min(open, close) - (Math.random() * volatility);
      
      candles.push({
        timestamp: ma7Data[i].time,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(Math.min(highPrice, high).toFixed(2)),
        low: parseFloat(Math.max(lowPrice, low).toFixed(2)),
        close: parseFloat(close.toFixed(2)),
      });
    }
    
    setCandleData(candles);
    resetZoomAndPan();
  };

  const updateVisibleRange = (currentScale, currentTranslate) => {
    const dataLength = chartData.length;
    if (dataLength === 0) return;

    const scaledWidth = chartWidth * currentScale;
    const leftOffset = (scaledWidth - chartWidth) / 2 - currentTranslate;
    
    let pStart = leftOffset / scaledWidth;
    let pEnd = (leftOffset + chartWidth) / scaledWidth;

    let startIdx = Math.max(0, Math.floor(pStart * dataLength));
    let endIdx = Math.min(dataLength - 1, Math.ceil(pEnd * dataLength));

    setVisibleIndices({ start: startIdx, end: endIdx });
  };

  const resetZoomAndPan = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
      Animated.spring(translateX, { toValue: 0, useNativeDriver: true })
    ]).start();

    lastScale.current = 1;
    lastTranslateX.current = 0;
    maxTranslateX.current = 0;
    minTranslateX.current = 0;
    setZoomLevel(1);
    updateVisibleRange(1, 0);
  };

  const handleChartTouch = (event, index, point) => {
    const { locationX, locationY } = event.nativeEvent;
    setTooltipVisible(true);
    setTooltipPosition({ x: locationX, y: locationY - verticalScale(40) });
    setTooltipValue(point);
    setSelectedPoint(index);
    
    setTimeout(() => {
      setTooltipVisible(false);
      setSelectedPoint(null);
    }, 3000);
  };

  const onPinchEvent = (event) => {
    let newScale = lastScale.current * event.nativeEvent.scale;
    if (newScale < 1) newScale = 1;
    if (newScale > 10) newScale = 10;
    
    scaleAnim.setValue(newScale);

    const maxPanX = (chartWidth * (newScale - 1)) / 2;
    maxTranslateX.current = maxPanX;
    minTranslateX.current = -maxPanX;

    let currentTx = lastTranslateX.current;
    if (currentTx > maxPanX) currentTx = maxPanX;
    if (currentTx < -maxPanX) currentTx = -maxPanX;
    translateX.setValue(currentTx);
  };

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let newScale = lastScale.current * event.nativeEvent.scale;
      if (newScale < 1) newScale = 1;
      if (newScale > 10) newScale = 10;
      
      lastScale.current = newScale;
      setZoomLevel(newScale);

      const maxPanX = (chartWidth * (newScale - 1)) / 2;
      maxTranslateX.current = maxPanX;
      minTranslateX.current = -maxPanX;

      if (lastTranslateX.current > maxPanX) lastTranslateX.current = maxPanX;
      if (lastTranslateX.current < -maxPanX) lastTranslateX.current = -maxPanX;

      translateX.setOffset(0);
      translateX.setValue(lastTranslateX.current);

      Animated.spring(scaleAnim, {
        toValue: newScale,
        useNativeDriver: true,
        tension: 40,
        friction: 7,
      }).start();

      updateVisibleRange(newScale, lastTranslateX.current);
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => lastScale.current > 1,
    onPanResponderGrant: () => {
      translateX.setOffset(lastTranslateX.current);
      translateX.setValue(0);
    },
    onPanResponderMove: (evt, gestureState) => {
      if (lastScale.current > 1) {
        let newDx = gestureState.dx;
        let totalTx = lastTranslateX.current + newDx;

        // Apply smooth boundaries check to pan action
        if (totalTx > maxTranslateX.current) {
          newDx = maxTranslateX.current - lastTranslateX.current;
        } else if (totalTx < minTranslateX.current) {
          newDx = minTranslateX.current - lastTranslateX.current;
        }

        translateX.setValue(newDx);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      translateX.flattenOffset();
      lastTranslateX.current += gestureState.dx;

      if (lastTranslateX.current > maxTranslateX.current) lastTranslateX.current = maxTranslateX.current;
      if (lastTranslateX.current < minTranslateX.current) lastTranslateX.current = minTranslateX.current;

      Animated.spring(translateX, {
        toValue: lastTranslateX.current,
        useNativeDriver: true,
      }).start();

      updateVisibleRange(lastScale.current, lastTranslateX.current);
    },
  });

  const getCubicBezierPath = (points, minValue, maxValue, graphHeight, graphWidth) => {
    if (points.length < 2) return '';
    
    const valueRange = maxValue - minValue;
    
    const getX = (index) => (index / (points.length - 1)) * graphWidth;
    const getY = (value) => graphHeight - ((value - minValue) / valueRange) * graphHeight;
    
    let path = `M ${getX(0)} ${getY(points[0].value)}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      
      const x0 = getX(i - 1);
      const y0 = getY(prev.value);
      const x1 = getX(i);
      const y1 = getY(curr.value);
      
      const cp1x = x0 + (x1 - x0) * 0.4;
      const cp1y = y0;
      const cp2x = x1 - (x1 - x0) * 0.4;
      const cp2y = y1;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x1} ${y1}`;
    }
    
    return path;
  };

  const formatXAxis = (timestamp) => {
    const date = new Date(timestamp);
    if (selectedTF === "1H") return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    if (selectedTF === "4H") return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
    if (selectedTF === "1D") {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return minutes === 0 ? `${hour12}${ampm}` : `${hour12}:${minutes.toString().padStart(2, '0')}${ampm}`;
    }
    if (selectedTF === "1W") return date.getDate().toString();
    if (selectedTF === "1M") {
      const dayOfMonth = date.getDate();
      return (dayOfMonth <= 3 || dayOfMonth >= 28) ? date.toLocaleString("en-US", { month: "short" }) : dayOfMonth.toString();
    }
    return "";
  };

  const getXAxisLabels = () => {
    if (!chartData.length) return [];
    
    const { start, end } = visibleIndices;
    const visibleData = chartData.slice(start, end + 1);
    const dataLength = visibleData.length;
    
    if (dataLength === 0) return [];
    
    const labels = [];
    const targetCount = selectedTF === "1H" ? 6 : 5;
    const step = Math.max(1, Math.floor(dataLength / (targetCount - 1)));
    
    for (let i = 0; i < targetCount; i++) {
      const index = Math.min(i * step, dataLength - 1);
      if (visibleData[index]) {
        labels.push(visibleData[index]);
      }
    }
    return labels;
  };

  const renderSmoothLineChart = () => {
    if (!chartData.length) return null;

    const graphHeight = chartHeight - verticalScale(20);
    const graphWidth = chartWidth; 
    const visibleWidth = chartWidth;

    const values = chartData.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const isProfit = chartData[chartData.length - 1].value > chartData[0].value;
    const lineColor = isProfit ? theme.colors.statusSuccess : theme.colors.statusDanger;

    const smoothPath = getCubicBezierPath(chartData, minValue, maxValue, graphHeight, graphWidth);
    const firstX = 0;
    const lastX = graphWidth;
    const bottomY = graphHeight;
    const fillPath = `${smoothPath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;

    const step = (maxValue - minValue) / 4;
    const yAxisValues = [
      maxValue.toFixed(0),
      (maxValue - step).toFixed(0),
      (maxValue - step * 2).toFixed(0),
      (maxValue - step * 3).toFixed(0),
      minValue.toFixed(0),
    ];

    const xAxisLabels = getXAxisLabels();

    return (
      <View style={styles.chartWrapper}>
        <View style={styles.flexRow}>
          <View style={styles.yAxisContainer}>
            {yAxisValues.map((price, index) => (
              <Text key={index} style={styles.yAxisText}>
                ${price}
              </Text>
            ))}
          </View>

          <View style={styles.chartContainer}>
            <PinchGestureHandler
              onGestureEvent={onPinchEvent}
              onHandlerStateChange={onPinchStateChange}
            >
              <Animated.View
                {...(zoomLevel > 1 ? panResponder.panHandlers : {})}
                style={{
                  transform: [
                    { translateX: translateX },
                    { scaleX: scaleAnim }, // Zoom only horizontally to keep height fixed
                  ],
                }}
              >
                <Svg
                  height={chartHeight}
                  width={graphWidth}
                  onTouchStart={(e) => {
                    const touchX = (e.nativeEvent.locationX - lastTranslateX.current) / lastScale.current;
                    const pointIndex = Math.floor((touchX / chartWidth) * chartData.length);

                    if (pointIndex >= 0 && pointIndex < chartData.length) {
                      handleChartTouch(e, pointIndex, chartData[pointIndex]);
                    }
                  }}
                >
                  <Defs>
                    <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
                      <Stop offset="100%" stopColor={lineColor} stopOpacity="0.0" />
                    </LinearGradient>
                  </Defs>

                  {/* Grid lines */}
                  {yAxisValues.map((_, index) => {
                    const y = (index / 4) * graphHeight;
                    return (
                      <SvgLine
                        key={`grid-${index}`}
                        x1={0}
                        y1={y}
                        x2={graphWidth}
                        y2={y}
                        stroke={theme.colors.borderLight}
                        strokeWidth={1}
                        strokeDasharray="5,5"
                        vectorEffect="non-scaling-stroke"
                      />
                    );
                  })}

                  <Path d={fillPath} fill="url(#gradient)" />
                  
                  <Path
                    d={smoothPath}
                    stroke={lineColor}
                    strokeWidth={moderateScale(3)}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke" 
                  />

                  {chartData.map((point, index) => {
                    if (selectedPoint === index && tooltipVisible) {
                      const valueRange = maxValue - minValue;
                      const x = (index / (chartData.length - 1)) * graphWidth;
                      const y = graphHeight - ((point.value - minValue) / valueRange) * graphHeight;
                      
                      return (
                        <Circle
                          key={`point-${index}`}
                          cx={x}
                          cy={y}
                          r={moderateScale(6)}
                          fill={theme.colors.primaryBlue}
                          stroke={lineColor}
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                        />
                      );
                    }
                    return null;
                  })}
                </Svg>
              </Animated.View>
            </PinchGestureHandler>

            {tooltipVisible && tooltipValue && (
              <View
                style={[
                  styles.tooltip,
                  {
                    left: Math.max(10, Math.min(tooltipPosition.x - 50, visibleWidth - 110)),
                    top: tooltipPosition.y,
                  },
                ]}
              >
                <Text style={styles.tooltipText}>
                  ${tooltipValue?.value?.toLocaleString()}
                </Text>
                <Text style={styles.tooltipSubtext}>
                  {formatXAxis(tooltipValue.timestamp)}
                </Text>
                <View style={styles.tooltipArrow} />
              </View>
            )}

            {zoomLevel > 1 && (
              <>
                <View style={styles.zoomIndicator}>
                  <Text style={styles.zoomIndicatorText}>
                    Zoom: {zoomLevel.toFixed(1)}x
                  </Text>
                </View>
                <TouchableOpacity style={styles.resetZoomBtn} onPress={resetZoomAndPan}>
                  <Text style={styles.resetZoomText}>Reset</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <View style={styles.xAxisContainer}>
          {xAxisLabels.map((item, index) => {
            const labelText = formatXAxis(item.timestamp);
            const isMonthName = selectedTF === "1M" && (labelText.length <= 3);
            
            return (
              <Text
                key={index}
                style={[
                  isMonthName ? styles.xAxisLabelMonth : styles.xAxisLabel,
                  { fontSize: selectedTF === "1D" ? moderateScale(10) : moderateScale(11) }
                ]}
                numberOfLines={1}
              >
                {labelText}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };

  const renderCandlestickChart = () => {
    if (!candleData.length) return null;

    const graphHeight = chartHeight - verticalScale(20);
    const graphWidth = chartWidth; 
    const visibleWidth = chartWidth;

    const allValues = candleData.flatMap(d => [d.high, d.low]);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const valueRange = maxValue - minValue;

    const getYCoordinate = (value) => graphHeight - ((value - minValue) / valueRange) * graphHeight;

    const getXCoordinate = (index, totalWidth) => {
      const candleWidth = (totalWidth / candleData.length) * 0.7;
      const candleSpacing = (totalWidth / candleData.length) * 0.3;
      return (index * (candleWidth + candleSpacing)) + (candleSpacing / 2);
    };

    const step = (maxValue - minValue) / 4;
    const yAxisValues = [
      maxValue.toFixed(0),
      (maxValue - step).toFixed(0),
      (maxValue - step * 2).toFixed(0),
      (maxValue - step * 3).toFixed(0),
      minValue.toFixed(0),
    ];

    const xAxisLabels = getXAxisLabels();

    return (
      <View style={styles.chartWrapper}>
        <View style={styles.flexRow}>
          <View style={styles.yAxisContainer}>
            {yAxisValues.map((price, index) => (
              <Text key={index} style={styles.yAxisText}>
                ${price}
              </Text>
            ))}
          </View>

          <View style={styles.chartContainer}>
            <PinchGestureHandler
              onGestureEvent={onPinchEvent}
              onHandlerStateChange={onPinchStateChange}
            >
              <Animated.View
                {...(zoomLevel > 1 ? panResponder.panHandlers : {})}
                style={{
                  transform: [
                    { translateX: translateX },
                    { scaleX: scaleAnim }, // Zooms only horizontally
                  ],
                }}
              >
                <Svg
                  height={chartHeight}
                  width={graphWidth}
                  onTouchStart={(e) => {
                    const touchX = (e.nativeEvent.locationX - lastTranslateX.current) / lastScale.current;
                    const candleIndex = Math.floor((touchX / chartWidth) * candleData.length);

                    if (candleIndex >= 0 && candleIndex < candleData.length) {
                      handleChartTouch(e, candleIndex, candleData[candleIndex]);
                    }
                  }}
                >
                  {yAxisValues.map((_, index) => {
                    const y = (index / 4) * graphHeight;
                    return (
                      <SvgLine
                        key={`grid-${index}`}
                        x1={0}
                        y1={y}
                        x2={graphWidth}
                        y2={y}
                        stroke={theme.colors.borderLight}
                        strokeWidth={1}
                        strokeDasharray="5,5"
                        vectorEffect="non-scaling-stroke"
                      />
                    );
                  })}

                  {candleData.map((candle, index) => {
                    const x = getXCoordinate(index, graphWidth);
                    const candleWidth = (graphWidth / candleData.length) * 0.7;
                    const yHigh = getYCoordinate(candle.high);
                    const yLow = getYCoordinate(candle.low);
                    const yOpen = getYCoordinate(candle.open);
                    const yClose = getYCoordinate(candle.close);

                    const isPositive = candle.close >= candle.open;
                    const bodyTop = isPositive ? yClose : yOpen;
                    const bodyHeight = Math.abs(yClose - yOpen);
                    const color = isPositive ? theme.colors.statusSuccess : theme.colors.statusDanger;

                    return (
                      <React.Fragment key={`candle-${index}`}>
                        <SvgLine
                          x1={x + candleWidth / 2}
                          y1={yHigh}
                          x2={x + candleWidth / 2}
                          y2={yLow}
                          stroke={color}
                          strokeWidth={1.5}
                          vectorEffect="non-scaling-stroke"
                        />
                        <SvgLine
                          x1={x}
                          y1={bodyTop}
                          x2={x + candleWidth}
                          y2={bodyTop}
                          stroke={color}
                          strokeWidth={Math.max(1, bodyHeight)}
                          vectorEffect="non-scaling-stroke"
                        />
                      </React.Fragment>
                    );
                  })}
                </Svg>
              </Animated.View>
            </PinchGestureHandler>

            {tooltipVisible && tooltipValue && (
              <View
                style={[
                  styles.tooltip,
                  {
                    left: Math.max(10, Math.min(tooltipPosition.x - 60, visibleWidth - 130)),
                    top: tooltipPosition.y,
                  },
                ]}
              >
                <Text style={styles.tooltipText}>
                  Open: ${tooltipValue.open}
                </Text>
                <Text style={styles.tooltipSubtext}>
                  Close: ${tooltipValue.close}
                </Text>
                <Text style={styles.tooltipSubtext}>
                  {formatXAxis(tooltipValue.timestamp)}
                </Text>
                <View style={styles.tooltipArrow} />
              </View>
            )}

            {zoomLevel > 1 && (
              <>
                <View style={styles.zoomIndicator}>
                  <Text style={styles.zoomIndicatorText}>
                    Zoom: {zoomLevel.toFixed(1)}x
                  </Text>
                </View>
                <TouchableOpacity style={styles.resetZoomBtn} onPress={resetZoomAndPan}>
                  <Text style={styles.resetZoomText}>Reset</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <View style={styles.xAxisContainer}>
          {xAxisLabels.map((item, index) => {
            const labelText = formatXAxis(item.timestamp);
            const isMonthName = selectedTF === "1M" && (labelText.length <= 3);
            
            return (
              <Text
                key={index}
                style={[
                  isMonthName ? styles.xAxisLabelMonth : styles.xAxisLabel,
                  { fontSize: selectedTF === "1D" ? moderateScale(10) : moderateScale(11) }
                ]}
                numberOfLines={1}
              >
                {labelText}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };

  const getCurrentPrice = () => {
    if (!coinData) return 0;
    return coinData.currentPrice;
  };

  const getPriceChange = () => {
    if (!coinData) return 0;
    return coinData.priceChangePercent24h;
  };

  const getHigh24h = () => {
    if (!coinData) return 0;
    return coinData.high24h;
  };

  const getLow24h = () => {
    if (!coinData) return 0;
    return coinData.low24h;
  };

  const getVolume = () => {
    if (!coinData) return '0';
    const volume = coinData.volume24h;
    if (volume > 1000000) return `${(volume / 1000000).toFixed(2)}M`;
    if (volume > 1000) return `${(volume / 1000).toFixed(2)}K`;
    return volume.toString();
  };

  const getOpenPrice = () => {
    if (!coinData) return '0';
    const timeframeKey = selectedTF === "1D" ? "1h" : (selectedTF === "1W" || selectedTF === "1M" ? "1d" : selectedTF.toLowerCase());
    const timeframeData = coinData.timeframes[timeframeKey];
    if (timeframeData && timeframeData.movingAverages?.MA7?.length > 0) {
      return timeframeData.movingAverages.MA7[0].value.toFixed(2);
    }
    return '0';
  };

  const getPrevClose = () => {
    if (!coinData) return '0';
    const timeframeKey = selectedTF === "1D" ? "1h" : (selectedTF === "1W" || selectedTF === "1M" ? "1d" : selectedTF.toLowerCase());
    const timeframeData = coinData.timeframes[timeframeKey];
    if (timeframeData && timeframeData.movingAverages?.MA7?.length > 1) {
      return timeframeData.movingAverages.MA7[
        timeframeData.movingAverages.MA7.length - 2
      ].value.toFixed(2);
    }
    return '0';
  };

  const getDayRange = () => {
    if (!coinData) return '0 - 0';
    const timeframeKey = selectedTF === "1D" ? "1h" : (selectedTF === "1W" || selectedTF === "1M" ? "1d" : selectedTF.toLowerCase());
    const timeframeData = coinData.timeframes[timeframeKey];
    if (timeframeData) {
      return `${timeframeData.low.toFixed(2)} - ${timeframeData.high.toFixed(2)}`;
    }
    return '0 - 0';
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={theme.colors.primaryBlue} />
      </SafeAreaView>
    );
  }

  if (!coinData) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Failed to load data</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.coinRow}>
            <Image
              source={{ uri: route?.params?.coin?.image || `https://assets.coingecko.com/coins/images/1/large/bitcoin.png` }}
              style={styles.coinImage}
            />
            <View>
              <Text style={styles.coinSymbol}>{coinData.symbol}/USDT</Text>
              <Text style={styles.coinName}>{coinData.symbol}</Text>
            </View>
          </View>

          <View style={styles.tradeButtons}>
            <TouchableOpacity
              style={[styles.buyBtn, isBuyDisabled && styles.disabledBtn]}
              disabled={isBuyDisabled}
            >
              <Text style={[styles.tradeText, isBuyDisabled && styles.disabledTradeText]}>Buy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sellBtn, isSellDisabled && styles.disabledBtn]}
              disabled={isSellDisabled}
            >
              <Text style={[styles.tradeText, isSellDisabled && styles.disabledTradeText]}>Sell</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.price}>
          ${getCurrentPrice()?.toLocaleString()}
        </Text>

        <Text
          style={[
            styles.change,
            { color: getPriceChange() < 0 ? theme.colors.statusDanger : theme.colors.statusSuccess },
          ]}
        >
          {getPriceChange() > 0 ? '+' : ''}{getPriceChange().toFixed(2)}%
        </Text>

        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statLabel}>24h High</Text>
            <Text style={styles.statValue}>${getHigh24h()?.toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>24h Low</Text>
            <Text style={styles.statValue}>${getLow24h()?.toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.statLabel}>Volume</Text>
            <Text style={styles.statValue}>{getVolume()}</Text>
          </View>
        </View>

        <View style={styles.timeframeContainer}>
          {["1D", "1W", "1M"]?.map((tf) => (
            <TouchableOpacity
              key={tf}
              onPress={() => {
                setSelectedTF(tf);
                setTooltipVisible(false);
                setSelectedPoint(null);
              }}
              style={[
                styles.timeframeButton,
                selectedTF === tf && styles.timeframeButtonActive
              ]}
            >
              <Text style={[
                styles.timeframeText,
                selectedTF === tf && styles.timeframeTextActive
              ]}>{tf}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {chartType === "line" ? renderSmoothLineChart() : renderCandlestickChart()}

         <View style={styles.chartTypeContainer}>
          <TouchableOpacity onPress={() => setChartType("line")}>
            <Text style={[styles.chartTypeText, chartType === "line" && styles.chartTypeTextActive]}>Line Chart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChartType("candle")}>
            <Text style={[styles.chartTypeText, chartType === "candle" && styles.chartTypeTextActive]}>Candlestick</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dataCard}>
          <Text style={styles.dataTitle}>Key Data Points</Text>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Previous Close</Text>
            <Text style={styles.dataValue}>${getPrevClose()}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Open</Text>
            <Text style={styles.dataValue}>${getOpenPrice()}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Day Range</Text>
            <Text style={styles.dataValue}>${getDayRange()}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Volume</Text>
            <Text style={styles.dataValue}>{getVolume()} BTC</Text>
          </View>
        </View>

        <View style={styles.historyCard}>
          <Text style={styles.dataTitle}>Trading History</Text>
          <View style={styles.historyRow}>
            <Text style={styles.historyType}>BUY</Text>
            <Text style={styles.historyAmount}>0.25 BTC</Text>
            <Text style={styles.historyPrice}>${getCurrentPrice()?.toLocaleString()}</Text>
          </View>
          <View style={styles.historyRow}>
            <Text style={[styles.historyType, { color: theme.colors.statusDanger }]}>SELL</Text>
            <Text style={styles.historyAmount}>0.10 BTC</Text>
            <Text style={styles.historyPrice}>${(getCurrentPrice() * 0.95)?.toLocaleString()}</Text>
          </View>
          <View style={styles.historyRow}>
            <Text style={styles.historyType}>BUY</Text>
            <Text style={styles.historyAmount}>0.30 BTC</Text>
            <Text style={styles.historyPrice}>${(getCurrentPrice() * 0.92)?.toLocaleString()}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.dataTitleDescription}>About {coinData.symbol}</Text>
          <Text style={styles.descriptionText}>
            {marketData?.description
              ? marketData.description
              : `${coinData.symbol} is a cryptocurrency that operates on blockchain technology, enabling secure, decentralized, and fast digital transactions across the world.`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgApp,
    paddingHorizontal: scale(15),
    paddingBottom: verticalScale(30),
    paddingTop: verticalScale(20),
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.statusDanger,
    fontSize: theme.typography.size.base,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(12),
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinImage: {
    width: scale(38),
    height: scale(38),
    marginRight: scale(12),
    borderRadius: theme.borderRadius.xl,
  },
  coinSymbol: {
    color: theme.colors.textMain,
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
  },
  coinName: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.size.sm,
  },
  tradeButtons: {
    flexDirection: 'row',
    gap: scale(8),
  },
  buyBtn: {
    backgroundColor: theme.colors.statusSuccess,
    paddingHorizontal: scale(19),
    paddingVertical: verticalScale(8),
    borderRadius: theme.borderRadius.sm,
  },
  sellBtn: {
    backgroundColor: theme.colors.statusDanger,
    paddingHorizontal: scale(19),
    paddingVertical: verticalScale(8),
    borderRadius: theme.borderRadius.sm,
  },
  tradeText: {
    color: theme.colors.white,
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.sm,
  },
  disabledBtn: {
    backgroundColor: '#E5E7EB',
    elevation: 0,
    shadowOpacity: 0,
  },
  disabledTradeText: {
    color: '#9CA3AF',
  },
  price: {
    color: theme.colors.textMain,
    fontSize: theme.typography.size.xxxl,
    fontWeight: theme.typography.weight.bold,
    marginTop: verticalScale(16),
  },
  change: {
    fontSize: theme.typography.size.base,
    marginTop: verticalScale(4),
    fontWeight: theme.typography.weight.semibold,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
    paddingVertical: verticalScale(16),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.size.xs,
    marginBottom: verticalScale(4),
  },
  statValue: {
    color: theme.colors.textMain,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.bold,
  },
  timeframeContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(16),
    flexWrap: 'wrap',
    gap: scale(8),
  },
  timeframeButton: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(8),
    backgroundColor: theme.colors.bgLightPurple,
    borderRadius: theme.borderRadius.sm,
  },
  timeframeButtonActive: {
    backgroundColor: theme.colors.primaryBlue,
  },
  timeframeText: {
    color: theme.colors.textMuted,
    fontWeight: theme.typography.weight.semibold,
    fontSize: theme.typography.size.xs,
  },
  timeframeTextActive: {
    color: theme.colors.white,
  },
  chartWrapper: {
    marginTop: verticalScale(12),
  },
  flexRow: {
    flexDirection: 'row',
  },
  yAxisContainer: {
    justifyContent: 'space-between',
    height: windowHeight * 0.34,
    marginRight: scale(8),
    width: windowWidth * 0.12,
  },
  yAxisText: {
    color: theme.colors.grey,
    fontSize: theme.typography.size.xs,
    textAlign: 'right',
  },
  chartContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  chartTypeContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(16),
    gap: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTypeText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.size.base,
  },
  chartTypeTextActive: {
    color: theme.colors.primaryBlue,
    fontWeight: theme.typography.weight.semibold,
  },
  xAxisContainer: {
    marginLeft: windowWidth * 0.10,
    marginTop: verticalScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 0,
  },
  xAxisLabel: {
    color: theme.colors.grey,
    textAlign: 'center',
    flex: 1,
  },
  xAxisLabelMonth: {
    color: theme.colors.primaryBlue,
    fontWeight: theme.typography.weight.semibold,
    textAlign: 'center',
    flex: 1,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: theme.colors.bgSurface,
    borderRadius: theme.borderRadius.sm,
    padding: scale(8),
    minWidth: windowWidth * 0.25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primaryBlue,
    ...theme.shadows.md,
  },
  tooltipText: {
    color: theme.colors.primaryBlue,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.bold,
  },
  tooltipSubtext: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.size.xs,
    marginTop: verticalScale(2),
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -6,
    left: '50%',
    marginLeft: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: theme.colors.primaryBlue,
  },
  zoomIndicator: {
    position: 'absolute',
    bottom: verticalScale(16),
    left: scale(8),
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    borderRadius: theme.borderRadius.sm,
  },
  zoomIndicatorText: {
    color: theme.colors.white,
    fontSize: theme.typography.size.xs,
    fontWeight: theme.typography.weight.bold,
  },
  resetZoomBtn: {
    position: 'absolute',
    bottom: verticalScale(16),
    right: scale(8),
    backgroundColor: theme.colors.bgSurface,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.primaryBlue,
  },
  resetZoomText: {
    color: theme.colors.primaryBlue,
    fontSize: theme.typography.size.xs,
    fontWeight: 'bold',
  },
  dataCard: {
    ...globalStyles.card,
    marginTop: verticalScale(24),
  },
  dataTitle: {
    color: theme.colors.textMain,
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
    marginBottom: verticalScale(16),
  },
  dataTitleDescription: {
    color: theme.colors.textMain,
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    marginBottom: verticalScale(16),
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  dataLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.size.sm,
  },
  dataValue: {
    color: theme.colors.textMain,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
  },
  historyCard: {
    ...globalStyles.card,
    marginTop: verticalScale(16),
    marginBottom: verticalScale(32),
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  historyType: {
    color: theme.colors.statusSuccess,
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.sm,
  },
  historyAmount: {
    color: theme.colors.textMain,
    fontSize: theme.typography.size.sm,
  },
  historyPrice: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.size.sm,
  },
  descriptionText: {
    color: theme.colors.grey,
    fontSize: theme.typography.size.sm,
    lineHeight: moderateScale(22),
  },
});
