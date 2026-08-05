
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: wp('6%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('5%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    left: 0,
    padding: wp('2%'),
    backgroundColor:'#e8e8e8',
    borderRadius:50,
    elevation:3,
   

  },
  iconButtonRight: {
    position: 'absolute',
    right: 0,
    padding: wp('2%'),
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
  },
  subtitle: {
    textAlign: 'center',
    color: '#444',
    fontSize: 14,
    marginBottom: hp('2%'),
    lineHeight: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: hp('0.8%'),
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('1.5%'),
    fontSize: 15,
    backgroundColor: '#fff',
    color: '#000',
    elevation: 1, // reduced shadow
    shadowColor: '#000',
    shadowOpacity: 0.02, // softer
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1.5,
  },
  radioGroup: {
    marginBottom: hp('1.5%'),
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.8%'),
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
  },
  radioOuterActive: {
    borderColor: '#285CE0',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#285CE0',
  },
  radioText: {
    fontSize: 15,
    color: '#000',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('1.5%'),
    backgroundColor: '#fff',
    elevation: 1, // reduced shadow
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1.5,
  },
  dropdownText: {
    fontSize: 15,
    color: '#333',
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    maxHeight: hp('25%'),
    marginBottom: hp('1.5%'),
    backgroundColor: '#fff', // clean white theme
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  dropdownItem: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#000',
  },
  button: {
    backgroundColor: '#7B2FF7',
    borderRadius: 10,
    paddingVertical: hp('1.8%'),
    alignItems: 'center',
    marginTop: hp('2%'),
    shadowColor: '#285CE0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, // reduced shadow
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
