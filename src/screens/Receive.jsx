import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Share,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';
import { moderateScale, verticalScale, windowWidth } from '../utils/responsive';

export default function Receive({ navigation }) {
  const walletAddress = 'PX7KW78983CFHD02';
  const [timer, setTimer] = useState(1800); // 30:00 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 1800));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} sec`;
  };

  const handleCopy = () => {
    Clipboard.setString(walletAddress);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `My PAYO Wallet Address: ${walletAddress}`,
      });
    } catch (error) {
      console.log('Share error:', error.message);
    }
  };

  const handleRegenerate = () => {
    setTimer(1800); // Reset countdown
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F4F8F6" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backBtn} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="chevron-left" size={moderateScale(24)} color="#285CE0" />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Receive PAYO</Text>
            <Text style={styles.headerSubtitle}>Receive tokens instantly</Text>
          </View>

          <TouchableOpacity style={styles.profileBtn} activeOpacity={0.7}>
            <Icon name="user" size={moderateScale(20)} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.qrSectionContainer}>
          <View style={styles.scannerTarget}>
            {/* Corner Brackets */}
            <View style={[styles.bracket, styles.topLeftBracket]} />
            <View style={[styles.bracket, styles.topRightBracket]} />
            <View style={[styles.bracket, styles.bottomLeftBracket]} />
            <View style={[styles.bracket, styles.bottomRightBracket]} />

            {/* Glowing Laser Scan Indicator */}
            <View style={styles.scanLaser} />

            {/* QR Card */}
            <View style={styles.qrCard}>
              <Image
                source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${walletAddress}` }}
                style={styles.qrCodeImage}
              />
            </View>
          </View>
        </View>

        {/* Wallet Address Information Card */}
        <View style={styles.addressContainer}>
          <View style={styles.walletIconContainer}>
            <Icon name="credit-card" size={moderateScale(22)} color="#7F3DFF" />
          </View>
          <View style={styles.addressTextColumn}>
            <Text style={styles.addressLabel}>Wallet Address</Text>
            <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="middle">
              {walletAddress}
            </Text>
          </View>
        </View>

        {/* Dynamic Action Buttons */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleCopy} activeOpacity={0.8}>
            <Text style={styles.actionBtnText}>Copy address</Text>
            <Icon name="copy" size={moderateScale(16)} color="#333" style={styles.actionBtnIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={handleShare} activeOpacity={0.8}>
            <Text style={styles.actionBtnText}>Share address</Text>
            <Icon name="external-link" size={moderateScale(16)} color="#333" style={styles.actionBtnIcon} />
          </TouchableOpacity>
        </View>

        {/* Expiry Countdown & Action */}
        <View style={styles.expiryContainer}>
          <Text style={styles.expiryText}>
            QR expires in <Text style={styles.expiryTimer}>{formatTime(timer)}</Text>
          </Text>
          <TouchableOpacity onPress={handleRegenerate} activeOpacity={0.7}>
            <Text style={styles.regenerateText}>Regenerate</Text>
          </TouchableOpacity>
        </View>

        {/* Secure Disclaimer Card */}
        <View style={styles.disclaimerCard}>
          <Icon name="info" size={moderateScale(20)} color="#7F3DFF" />
          <Text style={styles.disclaimerText}>
            The PAYO amount you receive may vary slightly due to market fluctuations
          </Text>
          <Image
            source={require('../../assets/images/biomatric/Wallet image 1.png')} // Fallback placeholder if wallet asset isn't ready
            style={styles.disclaimerImg}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F8F6', // Off-white/Minty hue background
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(30),
  },

  // Header Setup
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(70),
    marginTop: verticalScale(10),
  },
  backBtn: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(21),
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#1A1D21',
  },
  headerSubtitle: {
    fontSize: moderateScale(12),
    color: '#848D9A',
    marginTop: verticalScale(2),
  },
  profileBtn: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(21),
    backgroundColor: '#285CE0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // QR Design Frame Setup
  qrSectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(40),
  },
  scannerTarget: {
    width: moderateScale(220),
    height: moderateScale(220),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bracket: {
    position: 'absolute',
    width: moderateScale(30),
    height: moderateScale(30),
    borderColor: '#333',
  },
  topLeftBracket: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: moderateScale(8),
  },
  topRightBracket: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: moderateScale(8),
  },
  bottomLeftBracket: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: moderateScale(8),
  },
  bottomRightBracket: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: moderateScale(8),
  },
  scanLaser: {
    position: 'absolute',
    top: '50%',
    left: -moderateScale(15),
    right: -moderateScale(15),
    height: 1.5,
    backgroundColor: '#D1C4E9',
  },
  qrCard: {
    backgroundColor: '#FFF',
    padding: moderateScale(15),
    borderRadius: moderateScale(16),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  qrCodeImage: {
    width: moderateScale(140),
    height: moderateScale(140),
    resizeMode: 'contain',
  },

  // Wallet Address Component Details
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#c4c4c4',
    borderStyle: 'dashed',
    borderRadius: moderateScale(16),
    padding: moderateScale(14),
    marginBottom: verticalScale(15),
  },
  walletIconContainer: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(12),
    backgroundColor: '#E8DBFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  addressTextColumn: {
    flex: 1,
  },
  addressLabel: {
    fontSize: moderateScale(12),
    color: '#7F3DFF',
    fontWeight: '600',
  },
  addressText: {
    fontSize: moderateScale(14),
    color: '#1A1D21',
    fontWeight: '700',
    marginTop: verticalScale(4),
  },

  // Action Button Bar
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(22),
  },
  actionBtn: {
    width: '48%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E4E8EE',
    borderRadius: moderateScale(12),
    height: verticalScale(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  actionBtnText: {
    fontSize: moderateScale(13),
    color: '#333333',
    fontWeight: '600',
  },
  actionBtnIcon: {
    marginLeft: moderateScale(8),
  },

  // Expiring Information Box
  expiryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(28),
  },
  expiryText: {
    fontSize: moderateScale(13),
    color: '#555A60',
    fontWeight: '500',
  },
  expiryTimer: {
    fontWeight: '700',
    color: '#1A1D21',
  },
  regenerateText: {
    fontSize: moderateScale(13),
    color: '#7F3DFF',
    fontWeight: '700',
    marginTop: verticalScale(8),
    textDecorationLine: 'none',
  },

  // Disclaimer Layout
  disclaimerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEBFF',
    borderWidth: 1,
    borderColor: '#D4C9FF',
    borderRadius: moderateScale(16),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
  },
  disclaimerText: {
    flex: 1,
    fontSize: moderateScale(11),
    color: '#5E34BA',
    fontWeight: '500',
    lineHeight: moderateScale(16),
    marginHorizontal: moderateScale(12),
  },
  disclaimerImg: {
    width: moderateScale(70),
    height: moderateScale(40),
    resizeMode: 'contain',
    opacity:0.5
  },
});