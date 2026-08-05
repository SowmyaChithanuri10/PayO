
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

export default function DashboardScreen({ navigation }) {

    useEffect(() => {
      navigation.setOptions({
        gestureEnabled: false,
      });

      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type === 'GO_BACK') {
          e.preventDefault(); 
        }
      });
  
      return unsubscribe;
    }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F9FBF9" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/LogoContainer.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.heroContainer}>
          <Image
            source={require('../../../assets/images/Header Image (2).png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.welcomeTitle}>
          Welcome to <Text style={styles.brandAccent}>PAYO !</Text>
        </Text>
        
        <Text style={styles.welcomeSubtitle}>
          Your account has been created successfully and your wallet is ready to use.
        </Text>

        <View style={styles.featuresRow}>
          <View style={styles.featureCard}>
            <View style={styles.featureIconWrapper}>
              <Image 
                source={require('../../../assets/images/Wallet Icon.png')} 
                style={styles.featureIcon} 
                resizeMode="contain" 
              />
            </View>
            <Text style={styles.featureTitle}>Instant Payments</Text>
            <Text style={styles.featureDesc}>Send & receive money in seconds</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconWrapper}>
              <Image 
                source={require('../../../assets/images/shield-check.png')} 
                style={styles.featureIcon} 
                resizeMode="contain" 
              />
            </View>
            <Text style={styles.featureTitle}>Bank Grade Security</Text>
            <Text style={styles.featureDesc}>Your money and data are 100% secure</Text>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconWrapper}>
              <Image 
                source={require('../../../assets/images/Reward Icon.png')} 
                style={styles.featureIcon} 
                resizeMode="contain" 
              />
            </View>
            <Text style={styles.featureTitle}>Exciting Rewards</Text>
            <Text style={styles.featureDesc}>Earn rewards on every transaction</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.exploreButton}
          onPress={() =>
             navigation.replace('Main')
            // navigation.navigate('WalletScreen')
          }
        >
          <Text style={styles.exploreButtonText}>Start Exploring PAYO</Text>
          <Icon name="arrow-right" size={moderateScale(16)} color="#FFFFFF" style={styles.buttonArrow} />
        </TouchableOpacity>

        <View style={styles.actionPanelCard}>
          <Text style={styles.panelTitle}>What you can do now</Text>
          
          <View style={styles.actionsGridRow}>
            <TouchableOpacity style={styles.actionGridItem}>
              <Image 
                source={require('../../../assets/images/Scan Icon.png')} 
                style={styles.panelActionIcon} 
                resizeMode="contain" 
              />
              <Text style={styles.panelActionLabel}>Scan & Pay</Text>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            <TouchableOpacity style={styles.actionGridItem}>
              <Image 
                source={require('../../../assets/images/Send Icon.png')} 
                style={styles.panelActionIcon} 
                resizeMode="contain" 
              />
              <Text style={styles.panelActionLabel}>Send Money</Text>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            <TouchableOpacity style={styles.actionGridItem}>
              <Image 
                source={require('../../../assets/images/Create Account Icon Background.png')} 
                style={styles.panelActionIcon} 
                resizeMode="contain" 
              />
              <Text style={styles.panelActionLabel}>Receive Money</Text>
            </TouchableOpacity>

            <View style={styles.verticalDivider} />

            <TouchableOpacity style={styles.actionGridItem}>
              <Image 
                source={require('../../../assets/images/Recharge Icon.png')} 
                style={styles.panelActionIcon} 
                resizeMode="contain" 
              />
              <Text style={styles.panelActionLabel}>Recharge & Bills</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.securityFooterBadge}>
          <Image 
            source={require('../../../assets/images/Security Icon.png')} 
            style={styles.footerShieldIcon} 
            resizeMode="contain" 
          />
          <View style={styles.footerTextContent}>
            <Text style={styles.footerSecureTitle}>Your Account is protected</Text>
            <Text style={styles.footerSecureSubtitle}>We'll keep your money safe</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fffffff7',
  },
  scrollContent: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('4%'),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: hp('1%'),
    // marginBottom: hp('1.5%'),
  },
  logoImage: {
    width: wp('40%'),
    height: hp('5%'),
  },
  heroContainer: {
    width: wp('90%'),
    height: hp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp('1%'),
  },
  heroImage: {
    width: '87%',
    height: '80%',
  },
  welcomeTitle: {
    textAlign: 'center',
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#05070D',
    // marginTop: hp('1%'),
  },
  brandAccent: {
    color: '#6366F1',
  },
  welcomeSubtitle: {
    textAlign: 'center',
    color: '#414141',
    fontSize: moderateScale(13.5),
    lineHeight: moderateScale(20),
    paddingHorizontal: wp('6%'),
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
    gap: wp('2%'),
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(16),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  featureIconWrapper: {
    width: moderateScale(30),
    height: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
  },
  featureIcon: {
    width: '90%',
    height: '90%',
  },
  featureTitle: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    
    color: '#414141',
    textAlign: 'center',
    marginBottom: hp('0.5%'),
  },
  featureDesc: {
    fontSize: moderateScale(9),
    color: '#414141',
    textAlign: 'center',
    lineHeight: moderateScale(12),
  },
  exploreButton: {
    flexDirection: 'row',
    backgroundColor: '#4F46E5',
    height: hp('6.5%'),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('3.5%'),
    position: 'relative',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: moderateScale(15),
  },
  buttonArrow: {
    position: 'absolute',
    right: wp('5%'),
  },
  actionPanelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(14),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: hp('3.5%'),
  },
  panelTitle: {
    fontSize: moderateScale(12.5),
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: hp('2%'),
    marginLeft: wp('1%'),
  },
  actionsGridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionGridItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelActionIcon: {
    width: moderateScale(26),
    height: moderateScale(26),
    marginBottom: hp('0.8%'),
  },
  panelActionLabel: {
    fontSize: moderateScale(10),
    fontWeight: '600',
    color: '#4B5563',
    textAlign: 'center',
  },
  verticalDivider: {
    width: 1,
    height: hp('4.5%'),
    backgroundColor: '#E5E7EB',
  },
  securityFooterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(24),
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('5%'),
    gap: wp('3%'),
  },
  footerShieldIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  footerTextContent: {
    flexDirection: 'column',
  },
  footerSecureTitle: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: '#374151',
  },
  footerSecureSubtitle: {
    fontSize: moderateScale(10),
    color: '#6B7280',
    fontWeight: '500',
  },
});