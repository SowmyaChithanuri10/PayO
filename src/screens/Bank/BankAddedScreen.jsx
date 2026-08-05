
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const BankAddedScreen = ({navigation}) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await AsyncStorage.getItem('bankDetails');
        if (data) {
          setDetails(JSON.parse(data));
        }
      } catch (error) {
        console.log('Error loading bank details:', error);
      }
    };
    loadDetails();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bank Added Successfully!</Text>

      <Image
        source={require('../../../assets/images/addBankdetails/Bank added 1.png')}
        style={styles.bankImage}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Your Bank Account has been added and verified successfully.
      </Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Image
            source={require('../../../assets/images/addBankdetails/Bank Logos (Small).png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.bankDetails}>
            <Text style={styles.bankName}>
              {details?.bank || 'Bank Name'}
            </Text>
            <Text style={styles.accountNumber}>
              {details?.account || 'XXXX XXXX XXXX'}
            </Text>
          </View>
          <View style={styles.primaryBadge}>
            <Text style={styles.primaryText}>Primary</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={()=>navigation.navigate('UserProfile')} style={styles.doneButton}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('AddBankDetails')} style={styles.addButton}>
        <Text style={styles.addText}>Add Another Bank</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginTop: 40,
  },
  bankImage: {
    width: 220,
    height: 180,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 15,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 25,
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  bankDetails: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  accountNumber: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  primaryBadge: {
    backgroundColor: '#DFFFE0',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  primaryText: {
    fontSize: 12,
    color: '#00A651',
    fontWeight: '600',
  },
  doneButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 15,
  },
  doneText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#6C63FF',
    borderRadius: 10,
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
  },
  addText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BankAddedScreen;
