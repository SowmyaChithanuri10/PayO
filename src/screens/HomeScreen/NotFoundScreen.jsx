import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../../utils/responsive';

const { width, height } = Dimensions.get('window');

const NotFoundScreen = () => {
  const navigation = useNavigation();

  const goBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.container}>
        {/* Text Content */}
        <Text style={styles.oopsText}>Oops....</Text>
        <Text style={styles.titleText}>Page not found</Text>
        <Text style={styles.messageText}>
          The page you were looking for does not exist!{'\n'}
          We suggest you go back to Login.
        </Text>

        <Image
          source={require('../../../assets/images/biomatric/Ilustration.png')}
          style={styles.errorImage}
          resizeMode="contain"
        />

        {/* Button with Linear Gradient */}
        <TouchableOpacity style={styles.buttonContainer} onPress={goBackToHome}>
          <LinearGradient 
            colors={['#7B2FF7', '#285CE0']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Icon name="arrow-left" size={moderateScale(18)} color="#ffffff" style={styles.icon} />
            <Text style={styles.buttonText}>Back To Home</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  errorImage: {
    width: width * 0.78,
    height: width * 0.78,
    marginBottom: 20,
  },
  oopsText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#7B2FF7',
    marginBottom: 8,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  messageText: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row', // ✅ Places Icon and Text side-by-side
    alignItems: 'center', // ✅ Centers Icon and Text vertically
    justifyContent: 'center', // ✅ Centers content inside button
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginTop:10
  },
  icon: {
    marginRight: 8, // ✅ Adds space between icon and text
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotFoundScreen;