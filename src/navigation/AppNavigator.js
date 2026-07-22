// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// /* AUTH */
// import SplashScreen from '../screens/SplashScreen';
// import AnimationScreen from '../screens/AnimationScreen';
// //import WelcomeScreen from '../screens/WelcomeScreen';
// import Onboarding1 from '../screens/Onboarding1';
// import Onboarding2 from '../screens/Onboarding2';
// import Onboarding3 from '../screens/Onboarding3';
// //import Onboarding4 from '../screens/Onboarding4';

// import LoginScreen from '../screens/LoginScreen';
// import RegisterMobileScreen from '../screens/RegisterMobileScreen';
// import OtpVerificationScreen from '../screens/OtpVerificationScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import TransactionPinScreen from '../screens/TransactionPinScreen';
// import EnterAmountScreen from '../screens/HomeScreen/EnterAmountScreen';
// import SendPinScreen from '../screens/HomeScreen/SendPinScreen';
// import ReviewTransferScreen from '../screens/HomeScreen/ReviewTransferScreen';
// import ReferEarn from '../screens/HomeScreen/ReferEarn';
// import TransactionDetailScreen from '../screens/HomeScreen/TransactionDetailScreen';
// import NotificationScreen from '../screens/HomeScreen/NotificationScreen';
// import ForgotPassword from '../screens/ForgotPasswordScreen';




// /* ✅ IMPORT BOTTOM TABS */
// import BottomTabs from '../screens/components/BottomTabs';

// /* SCAN + RECEIVE */
// import ScanQRScreen from '../screens/ScanQRScreen';
// import Receive from '../screens/Receive';

// /* PAYMENT FLOW */
// import EnterAddressScreen from '../screens/HomeScreen/enterAddress';


// import PaymentLoading from '../screens/HomeScreen/loadingScreen';
// import PaymentSuccess from '../screens/HomeScreen/successTokenScreen';
// import SendScreen from '../screens/components/sendScreen';
// import BottomNav from '../screens/components/bottomNav';
// import HomeScreen from '../screens/HomeScreen/HomeScreen';

// import Recents from '../screens/HomeScreen/Recents';

// // import AccountDetails from "../screens/Bank/AccountDetails";
// // import AccountNumber from "../screens/Bank/AccountNumber";
// // import UpiPin from "../screens/Bank/UpiPin";
// // import SuccessScreen from "../screens/Bank/SuccessScreen";
// import UserProfile from '../screens/UserProfile/UserProfile';
// import TransactionHistory from '../screens/HomeScreen/TransactionHistory';
// import TnsHistorySingleUser from '../screens/HomeScreen/TnsHistorySingleUser';
// import WalletScreen from '../screens/HomeScreen/WalletScreen';
// import MarketScreen from '../screens/Market/market';
// import CoinDetailsScreen from '../screens/Market/singleMarket';

// import BankAccInit from '../screens/Bank/BankAccInit';
// import AddBankDetails from '../screens/Bank/AddBankDetails';
// import TpinScreen from '../screens/Bank/TpinScreen';
// import BankAddedScreen from '../screens/Bank/BankAddedScreen';
// import KYCVerification from '../screens/kycVerify/KYCVerification';
// import KycUnderReview from '../screens/kycVerify/KycUnderReview';
// import KycComplete from '../screens/kycVerify/KycComplete';
// import KycFail from '../screens/kycVerify/KycFail';
// import KycNotStarted from '../screens/kycVerify/KycnotStartedYet';
// import HelpCenterScreen from '../screens/helpCenter/HelpCenterScreen.jsx';



// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>

//         {/* AUTH */}
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Animation" component={AnimationScreen} />
//         {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
//         <Stack.Screen name="Onboarding1" component={Onboarding1} />
//         <Stack.Screen name="Onboarding2" component={Onboarding2} />
//         <Stack.Screen name="Onboarding3" component={Onboarding3} />
//         {/* <Stack.Screen name="Onboarding4" component={Onboarding4} /> */}
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="RegisterMobile" component={RegisterMobileScreen} />
//         <Stack.Screen name="OTP" component={OtpVerificationScreen} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//         <Stack.Screen name="TransactionPin" component={TransactionPinScreen} />

//         <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />


//         {/* /// KYC VERIFICATION //////// */}

//         <Stack.Screen name="KYCVerification" component={KYCVerification} />
//         <Stack.Screen name="KycUnderReview" component={KycUnderReview} />
//         <Stack.Screen name="KycComplete" component={KycComplete} />
//         <Stack.Screen name="KycFail" component={KycFail} />
//         <Stack.Screen name="KycNotStarted" component={KycNotStarted} />

//         {/* ✅ MAIN APP WITH BOTTOM TABS */}
//         <Stack.Screen name="Main" component={BottomTabs} />
//         <Stack.Screen name="Buttom" component={BottomNav} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="UserProfile" component={UserProfile} />
//         <Stack.Screen name="WalletScreen" component={WalletScreen} />
//         <Stack.Screen name="MarketScreen" component={MarketScreen} />
//         <Stack.Screen name="CoinDetailsScreen" component={CoinDetailsScreen} />
//         <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />




//         {/* SEND FLOW */}
//         <Stack.Screen name="SendScreen" component={SendScreen} />
//         <Stack.Screen name="ScanQR" component={ScanQRScreen} />
//         <Stack.Screen name="enterAddress" component={EnterAddressScreen} />
//         <Stack.Screen name="recents" component={Recents} />

//         <Stack.Screen name="EnterAmount" component={EnterAmountScreen} />
//         <Stack.Screen name="review" component={ReviewTransferScreen} />
//         <Stack.Screen name="ReferEarn" component={ReferEarn} />

//         <Stack.Screen name="SendPin" component={SendPinScreen} />
//         <Stack.Screen name="loading" component={PaymentLoading} />
//         <Stack.Screen name="successfullPayment" component={PaymentSuccess} />


//         {/* RECEIVE */}
//         <Stack.Screen name="Receive" component={Receive} />

//         <Stack.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} />
//         <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
//         <Stack.Screen name="TnsHistorySingleUser" component={TnsHistorySingleUser} />


//         {/* BANK DETAILS */}
//         {/* <Stack.Screen name="AddBankHome" component={BankAccInit} /> */}
//         {/* <Stack.Screen name="AccountDetails" component={AccountDetails} />
//         <Stack.Screen name="AccountNumber" component={AccountNumber} />
//         <Stack.Screen name="UpiPin" component={UpiPin} />
//         <Stack.Screen name="SuccessScreen" component={SuccessScreen} /> */}





//         <Stack.Screen name="AddBankHome" component={BankAccInit} />
//         <Stack.Screen name="AddBankDetails" component={AddBankDetails} />
//         <Stack.Screen name="TpinScreen" component={TpinScreen} />
//         <Stack.Screen name="Notifications" component={NotificationScreen} />
//         <Stack.Screen name="BankAddedScreen" component={BankAddedScreen} />




//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }








import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* AUTH */
import SplashScreen from '../screens/SplashScreen';
import AnimationScreen from '../screens/AnimationScreen';
//import WelcomeScreen from '../screens/WelcomeScreen';

// ✅ UPDATED IMPORT PATH FOR NEW MODULAR ONBOARDING 1
import Onboarding1 from '../screens/OnboardingScreens/Onboarding1/index1.js';
import Onboarding2 from '../screens/OnboardingScreens/Onboarding2/index2.js';
import Onboarding3 from '../screens/OnboardingScreens/Onboarding3/index3.js';
//import Onboarding4 from '../screens/Onboarding4';

import LoginScreen from '../screens/LoginScreen';
import RegisterMobileScreen from '../screens/RegisterMobileScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import OtpVerified from '../screens/OtpVerified';
// import ProfileScreen from '../screens/ProfileScreen';
// import TransactionPinScreen from '../screens/TransactionPinScreen';
import EnterAmountScreen from '../screens/HomeScreen/EnterAmountScreen';
import SendPinScreen from '../screens/HomeScreen/SendPinScreen';
import ReviewTransferScreen from '../screens/HomeScreen/ReviewTransferScreen';
import ReferEarn from '../screens/HomeScreen/ReferEarn';
import TransactionDetailScreen from '../screens/HomeScreen/TransactionDetailScreen';
import NotificationScreen from '../screens/HomeScreen/NotificationScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';

/* ✅ IMPORT BOTTOM TABS */
import BottomTabs from '../screens/components/BottomTabs';

/* SCAN + RECEIVE */
import ScanQRScreen from '../screens/ScanQRScreen';
import Receive from '../screens/Receive';

/* PAYMENT FLOW */
import EnterAddressScreen from '../screens/HomeScreen/enterAddress';
import MakePayment from '../screens/MakePayment.jsx';

import PaymentLoading from '../screens/HomeScreen/loadingScreen';
import PaymentSuccess from '../screens/HomeScreen/successTokenScreen';
import SendScreen from '../screens/components/sendScreen';
import BottomNav from '../screens/components/bottomNav';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

import Recents from '../screens/HomeScreen/Recents';

// import AccountDetails from "../screens/Bank/AccountDetails";
// import AccountNumber from "../screens/Bank/AccountNumber";
// import UpiPin from "../screens/Bank/UpiPin";
// import SuccessScreen from "../screens/Bank/SuccessScreen";
import UserProfile from '../screens/UserProfile/UserProfile';
import Settings from '../screens/UserProfile/Settings.jsx';
import TransactionHistory from '../screens/HomeScreen/TransactionHistory';
import TnsHistorySingleUser from '../screens/HomeScreen/TnsHistorySingleUser';

import MarketScreen from '../screens/Market/market';
import CoinDetailsScreen from '../screens/Market/singleMarket';

import BankAccInit from '../screens/Bank/BankAccInit';
import AddBankDetails from '../screens/Bank/AddBankDetails';
import TpinScreen from '../screens/Bank/TpinScreen';
import BankAddedScreen from '../screens/Bank/BankAddedScreen';
import KYCVerification from '../screens/kycVerify/KYCVerification';
import KycFilesReview from '../screens/kycVerify/KycFilesReview.jsx'
import KycUnderReview from '../screens/kycVerify/KycUnderReview';
import KycComplete from '../screens/kycVerify/KycComplete';
import KycFail from '../screens/kycVerify/KycFail';
import KycNotStarted from '../screens/kycVerify/KycnotStartedYet';
import HelpCenterScreen from '../screens/helpCenter/HelpCenterScreen.jsx';

import ProfileScreen from '../screens/CreateProfile/createProfile.js';
import TransactionPinScreen from '../screens/CreateProfile/transactionPin.js';
import DashboardScreen from '../screens/CreateProfile/welcomeProfile.js';
import Biometric from '../screens/CreateProfile/BiometricScreen.jsx';
import FaceAuthentication from '../screens/CreateProfile/FaceAuthentication.jsx';
import ConfirmDepositeScreen from '../screens/HomeScreen/ConfirmDepositeScreen.jsx';
import WalletScreen from '../screens/HomeScreen/WalletScreen.jsx';
import AddMoneytoWallet from '../screens/HomeScreen/AddMoneytoWallet.jsx';
// import  AddMoneytoWallet from "../screens/components/AddMoneyModal.jsx"
import NotFoundScreen from '../screens/HomeScreen/NotFoundScreen.jsx';
import PaymentCompleteDetails from '../screens/HomeScreen/completeTransaction.jsx';
import { navigationRef } from './navigationRef.js';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer
    //  ref={navigationRef}
     >
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* AUTH */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Animation" component={AnimationScreen} />
        {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
        <Stack.Screen name="Onboarding1" component={Onboarding1} options={{ animation: 'fade' }} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} options={{ animation: 'fade' }} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} options={{ animation: 'fade' }} />
        {/* <Stack.Screen name="Onboarding4" component={Onboarding4} /> */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="RegisterMobile" component={RegisterMobileScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="OTP" component={OtpVerificationScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="OtpVerified" component={OtpVerified} options={{ animation: 'fade' }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />


        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="TransactionPin" component={TransactionPinScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="Biometric" component={Biometric} />
        <Stack.Screen name="FaceAuthentication" component={FaceAuthentication} />
        <Stack.Screen name="WelcomeProfile" component={DashboardScreen} />
        <Stack.Screen name="ConfirmDeposite" component={ConfirmDepositeScreen} />
        <Stack.Screen name="MakePayment" component={MakePayment} />



        {/* <Stack.Screen name="TransactionPin" component={TransactionPinScreen} /> */}

        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />

        {/* /// KYC VERIFICATION //////// */}
        <Stack.Screen name="KYCVerification" component={KYCVerification} />
        <Stack.Screen name="KycFilesReview" component={KycFilesReview} />
        <Stack.Screen name="KycUnderReview" component={KycUnderReview} />
        <Stack.Screen name="KycComplete" component={KycComplete} />
        <Stack.Screen name="KycFail" component={KycFail} />
        <Stack.Screen name="KycNotStarted" component={KycNotStarted} />

        {/* ✅ MAIN APP WITH BOTTOM TABS */}
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Buttom" component={BottomNav} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="WalletScreen" component={WalletScreen} />

        {/* <Stack.Screen name="AddMoneytoWallet" component={AddMoneytoWallet} /> */}
          <Stack.Screen name="AddMoneytoWallet" component={AddMoneytoWallet} />
        <Stack.Screen name="MarketScreen" component={MarketScreen} />
        <Stack.Screen name="CoinDetailsScreen" component={CoinDetailsScreen} />
        <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />

        {/* SEND FLOW */}
        <Stack.Screen name="SendScreen" component={SendScreen} />
        <Stack.Screen name="ScanQR" component={ScanQRScreen} />
        <Stack.Screen name="enterAddress" component={EnterAddressScreen} />
        <Stack.Screen name="recents" component={Recents} />

        <Stack.Screen name="EnterAmount" component={EnterAmountScreen} />
        <Stack.Screen name="review" component={ReviewTransferScreen} />
        <Stack.Screen name="ReferEarn" component={ReferEarn} />

        <Stack.Screen name="SendPin" component={SendPinScreen} />
        <Stack.Screen name="loading" component={PaymentLoading} />
        <Stack.Screen name="successfullPayment" component={PaymentSuccess} />
        <Stack.Screen name="PaymentCompleteDetails" component={PaymentCompleteDetails} />
        

        {/* RECEIVE */}
        <Stack.Screen name="Receive" component={Receive} />

        <Stack.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} />
        <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
        <Stack.Screen name="TnsHistorySingleUser" component={TnsHistorySingleUser} />

        {/* BANK DETAILS */}
        {/* <Stack.Screen name="AddBankHome" component={BankAccInit} /> */}
        {/* <Stack.Screen name="AccountDetails" component={AccountDetails} />
        <Stack.Screen name="AccountNumber" component={AccountNumber} />
        <Stack.Screen name="UpiPin" component={UpiPin} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} /> */}

        <Stack.Screen name="AddBankHome" component={BankAccInit} />
        <Stack.Screen name="AddBankDetails" component={AddBankDetails} />
        <Stack.Screen name="TpinScreen" component={TpinScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="BankAddedScreen" component={BankAddedScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}