import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import api from '../api/axios';
import {
  scale,
  verticalScale,
  moderateScale,
} from '../utils/responsive';
import { theme } from '../MainTheme/theme'; 

export default function ScanQRScreen({
  setSelectedUser,
  setActiveTab,
}) {
  const device = useCameraDevice('back');
  const [hasPermission, setHasPermission] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [torch, setTorch] = useState('off');
  const [isProcessingScan, setIsProcessingScan] = useState(false);
  const scanLine = useRef(new Animated.Value(0)).current;
  const scannerSize = scale(250) < 280 ? scale(250) : 280;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, {
          toValue: scannerSize - 20,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(scanLine, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scannerSize]);

  useEffect(() => {
    const getPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    };

    getPermission();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setScannedData(null);
      setIsProcessingScan(false);
    }, []),
  );

  const handleQR = async (value) => {
    if (scannedData || isProcessingScan) return;
    setIsProcessingScan(true);
    try {
      const res = await api.post('api/wallet/scan-qr', {
        qrData: value,
      });

      const user = {
        name: res?.data?.name,
        address: res?.data?.walletAddress,
      };

      setScannedData(user);
      setSelectedUser(user);
      setActiveTab('amount');
    } catch (err) {
      Alert.alert(
        'Invalid QR',
        'The scanned QR code is invalid.',
        [
          {
            text: 'OK',
            onPress: () => setIsProcessingScan(false),
          },
        ],
      );
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && !scannedData) {
        handleQR(codes[0].value);
      }
    },
  });

  if (!device || !hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>
          No Camera Permission
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.scanWrapper,
          {
            width: scannerSize,
            height: scannerSize,
          },
        ]}>
        {!scannedData && (
          <>
            <Camera
              style={styles.camera}
              device={device}
              isActive
              torch={torch}
              codeScanner={codeScanner}
            />

            <View style={styles.cameraOverlay} />

            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [
                    {
                      translateY: scanLine,
                    },
                  ],
                },
              ]}
            />
          </>
        )}

        {/* White corner targets for the scanner UI */}
        <View style={styles.cornerTL} />
        <View style={styles.cornerTR} />
        <View style={styles.cornerBL} />
        <View style={styles.cornerBR} />
      </View>

      <Text style={styles.scanText}>
        Scanning QR code...
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.smallBtn}
          activeOpacity={0.8}
          onPress={async () => {
            const res = await launchImageLibrary({
              mediaType: 'photo',
            });

            if (res.assets?.length) {
              handleQR('uploaded-image');
            }
          }}>
          <Text style={styles.smallText}>Upload QR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smallBtn}
          activeOpacity={0.8}
          onPress={() =>{
            setTorch(torch === 'off' ? 'on' : 'off')
            // setActiveTab('amount');
          }}>
          <Text style={styles.smallText}>Torch</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.infoText}>
          Point your camera at a QR code to continue.
        </Text>

        <Text style={styles.infoSubText}>
          Hold steady for faster scanning
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },

  scanWrapper: {
    backgroundColor: '#000000', // Black background to contrast the white corners
    borderRadius: theme.borderRadius.lg || 16,
    overflow: 'hidden',
    marginTop: verticalScale(20),
  },

  camera: {
    width: '100%',
    height: '100%',
  },

  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent', // Ensure this doesn't hide the camera
  },

  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: theme.colors.primaryBlue, // Blue scanner line
  },

  // Scanner corners
  cornerTL: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#ffffff',
  },
  cornerTR: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#ffffff',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#ffffff',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#ffffff',
  },

  scanText: {
    color: theme.colors.textMuted, // Muted text for the white background
    marginTop: verticalScale(16),
    fontSize: theme.typography.size.sm || moderateScale(14),
  },

  row: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
    justifyContent: 'center',
    gap: scale(15), // Spacing between buttons
  },

  // FIXED: Solid Blue Buttons so text is visible!
  smallBtn: {
    backgroundColor: theme.colors.primaryBlue,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(24),
    borderRadius: theme.borderRadius.full || 25,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  smallText: {
    color: '#ffffff', // White text stands out on blue background
    fontSize: moderateScale(14),
    fontWeight: theme.typography.weight.semibold || '600',
  },

  textContainer: {
    marginTop: verticalScale(40),
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },

  infoText: {
    color: theme.colors.textMain, // Dark text for readability on white background
    textAlign: 'center',
    fontSize: moderateScale(14),
  },

  infoSubText: {
    color: theme.colors.textMuted, // Muted gray text
    marginTop: verticalScale(8),
    textAlign: 'center',
    fontSize: moderateScale(12),
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  permissionText: {
    color: theme.colors.textMain,
    fontSize: moderateScale(14),
  },
});