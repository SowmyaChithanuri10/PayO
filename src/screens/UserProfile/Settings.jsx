// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Switch,
//   Image,
//   StatusBar,
//   ImageBackground
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Feather';
// import * as Keychain from 'react-native-keychain';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import styles from './SettingsStyles';
// import { theme } from '../../MainTheme/theme';

// export default function Settings({ navigation }) {
//   const [pushEnabled, setPushEnabled] = useState(true);
//   const [emailEnabled, setEmailEnabled] = useState(true);
//   const [smsEnabled, setSmsEnabled] = useState(false);
//   const [marketingEnabled, setMarketingEnabled] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // Logout Function Added Here
//   const handleLogout = async () => {
//     try {
//       await Keychain.resetGenericPassword();
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Login' }],
//       });
//     } catch (error) {
//       console.log('Logout error:', error);
//     }
//   };

//   const SectionHeader = ({ icon, imageSource, title }) => (
//     <View style={styles.sectionHeader}>
//       {imageSource ? (
//         <Image 
//           source={imageSource} 
//           style={{ width: 18, height: 18, resizeMode: 'contain' }} 
//         />
//       ) : (
//         <Icon name={icon} size={18} color={theme.colors.textMain} />
//       )}
//       <Text style={styles.sectionTitle}>{title}</Text>
//     </View>
//   );

//   const ListItem = ({ title, subtitle }) => (
//     <TouchableOpacity style={styles.listItem}>
//       <View style={styles.listTextContainer}>
//         <Text style={styles.listTitle}>{title}</Text>
//         {subtitle && <Text style={styles.listSubtitle}>{subtitle}</Text>}
//       </View>
//       <Icon name="chevron-right" size={18} color="#9CA3AF" />
//     </TouchableOpacity>
//   );

//   const ToggleItem = ({ title, subtitle, value, onValueChange }) => (
//     <View style={styles.listItem}>
//       <View style={styles.listTextContainer}>
//         <Text style={styles.listTitle}>{title}</Text>
//         <Text style={styles.listSubtitle}>{subtitle}</Text>
//       </View>
//       <Switch
//         trackColor={{ false: '#D1D5DB', true: '#10B981' }}
//         thumbColor={'#ffffff'}
//         onValueChange={onValueChange}
//         value={value}
//         style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
//       />
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         {/* HEADER */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Icon name="chevron-left" size={20} color="#285CE0" />
//           </TouchableOpacity>
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.title}>Settings</Text>
//             <Text style={styles.subtitle}>Manage your account and preferences</Text>
//           </View>
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           <ImageBackground
//             source={require('../../../assets/images/profile/backbgdImage.png')} 
//             style={styles.profileCard}
//             imageStyle={styles.profileCardBg}
//           >
//             <View style={styles.profileImageContainer}>
//                 <View style={styles.profileArcBorder} />
//                 <View style={styles.profileCircle}>
//                   <Text style={styles.profileAvatarText}>👤</Text>
//                 </View>
//                 <View style={styles.editIconBadge}>
//                 <Icon name="edit-2" size={12} color={theme.colors.primaryBlue} />
//               </View>
//             </View>
            
//             <View style={styles.profileInfo}>
//               <Text style={styles.profileName}>User 1</Text>
//               <Text style={styles.profilePhone}>+91 1324 567 890</Text>
//               <View style={styles.kycBadge}>
//                 <Text style={styles.kycText}>• KYC VERIFIED</Text>
//               </View>
//             </View>
//           </ImageBackground>

//           <View style={styles.card}>
//             <Text style={styles.inputLabel}>Your Email</Text>
//             <View style={styles.inputContainer}>
//               <Image 
//                 source={require('../../../assets/images/settings/mail-01.png')} 
//                 style={[styles.inputIcon, { width: 18, height: 18, resizeMode: 'contain' }]} 
//               />
//               <TextInput 
//                 style={styles.input} 
//                 value="xxx@gmail.com" 
//                 editable={false}
//               />
//             </View>

//             {/* <Text style={styles.inputLabel}>Password</Text>
//             <View style={styles.inputContainer}>
//               <Image 
//                 source={require('../../../assets/images/settings/circle-lock-01.png')} 
//                 style={[styles.inputIcon, { width: 18, height: 18, resizeMode: 'contain' }]} 
//               />
//               <TextInput 
//                 style={styles.input} 
//                 value="xxx@gmail.com" 
//                 secureTextEntry={!showPassword}
//                 editable={false}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Icon name={showPassword ? "eye" : "eye-off"} size={18} color="#4B5563" />
//               </TouchableOpacity>
//             </View> */}

//             <Text style={styles.inputLabel}>Phone Number</Text>
//             <View style={styles.inputContainer}>
//               <Image 
//                 source={require('../../../assets/images/settings/call.png')} 
//                 style={[styles.inputIcon, { width: 18, height: 18, resizeMode: 'contain' }]} 
//               />
//               <TextInput 
//                 style={styles.input} 
//                 value="+93123135" 
//                 editable={false}
//               />
//             </View>
//           </View>

//           <View style={styles.card}>
//             <SectionHeader 
//               imageSource={require('../../../assets/images/settings/Card Icon.png')} 
//               title="Account Limits" 
//             />
            
//             <View style={styles.limitRow}>
//               <Text style={styles.limitLabel}>Daily send limit</Text>
//               <Text style={styles.limitValue}>$150 / $5,000 USD</Text>
//             </View>
//             <View style={styles.progressBarBg}>
//               <View style={[styles.progressBarFill, { width: '15%' }]} />
//             </View>

//             <View style={styles.limitRow}>
//               <Text style={styles.limitLabel}>Monthly send limit</Text>
//               <Text style={styles.limitValue}>$3,200 / $50,000 USD</Text>
//             </View>
//             <View style={styles.progressBarBg}>
//               <View style={[styles.progressBarFill, { width: '40%' }]} />
//             </View>

//             <View style={styles.limitRow}>
//               <Text style={styles.limitLabel}>Annual send limit</Text>
//               <Text style={styles.limitValue}>$25,000 / $500,000 USD</Text>
//             </View>
//             <View style={styles.progressBarBg}>
//               <View style={[styles.progressBarFill, { width: '10%' }]} />
//             </View>

//             <TouchableOpacity style={styles.primaryBtn}>
//               <Text style={styles.primaryBtnText}>Request Limit Increase</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.card}>
//             <SectionHeader icon="shield" title="Security" />
//             <ListItem title="Two-factor authentication" subtitle="Add an extra layer of security" />
//             <ListItem title="Trusted devices" subtitle="Manage your devices" />
//             <ListItem title="Login history" subtitle="View recent activity" />
//           </View>

//           <View style={styles.card}>
//             <SectionHeader icon="bell" title="Notifications" />
//             <ToggleItem 
//               title="Push notifications" 
//               subtitle="Get notified about transactions" 
//               value={pushEnabled} 
//               onValueChange={setPushEnabled} 
//             />
//             <ToggleItem 
//               title="Email notifications" 
//               subtitle="Receive email updates" 
//               value={emailEnabled} 
//               onValueChange={setEmailEnabled} 
//             />
//             <ToggleItem 
//               title="SMS notifications" 
//               subtitle="Text message alerts" 
//               value={smsEnabled} 
//               onValueChange={setSmsEnabled} 
//             />
//             <ToggleItem 
//               title="Marketing emails" 
//               subtitle="Product updates and offers" 
//               value={marketingEnabled} 
//               onValueChange={setMarketingEnabled} 
//             />
//           </View>

//           <View style={styles.card}>
//             <SectionHeader icon="settings" title="Preferences" />
            
//             <View style={styles.listItem}>
//               <View style={styles.listTextContainer}>
//                 <Text style={styles.listTitle}>Appearance</Text>
//                 <Text style={styles.listSubtitle}>Dark</Text>
//               </View>
//               <TouchableOpacity style={styles.dropdownBtn}>
//                 <Icon name="moon" size={14} color={theme.colors.textMain} style={{marginRight: 6}} />
//                 <Text style={styles.dropdownText}>Dark</Text>
//                 <Icon name="chevron-down" size={14} color={theme.colors.textMain} style={{marginLeft: 6}} />
//               </TouchableOpacity>
//             </View>

//             <ListItem title="Base currency" subtitle="USD" />
//             <ListItem title="Language" subtitle="English" />
//           </View>

//           <View style={styles.card}>
//             <SectionHeader icon="help-circle" title="Help & Legal" />
//             <ListItem title="Help center" subtitle="Get support and find answers" />
//             <ListItem title="Contact us" subtitle="Chat or call our support team" />
//             <ListItem title="Terms & conditions" subtitle="Legal agreements" />
//             <ListItem title="Privacy policy" subtitle="How we handle your data" />
//           </View>

//           <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//             <Icon name="log-out" size={18} color="#fff" style={styles.logoutIcon} />
//             <Text style={styles.logoutText}>Logout</Text>
//           </TouchableOpacity>

//           <View style={styles.securityBanner}>
//             <Image source={require('../../../assets/images/Security-Icon.png')} style={styles.bannerIcon} />
//             <View style={styles.bannerTextContainer}>
//               <Text style={styles.bannerTitle}>Secure & Trusted</Text>
//               <Text style={styles.bannerSub}>Your account is protected with bank-grade security.</Text>
//             </View>
//             <Image source={require('../../../assets/images/locksecure.png')} style={styles.watermarkIcon} />
//           </View>
          
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }








import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Image,
  StatusBar,
  ImageBackground
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import * as Keychain from 'react-native-keychain';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './SettingsStyles';
import { theme } from '../../MainTheme/theme';

// Added Redux hooks and mainValuables import
import { useAppSelector } from '../../redux/hooks';
import { capitalizeFirstLetter } from '../../api/mainValuables';

export default function Settings({ navigation }) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Added dynamic data fetching from Redux
  const profileDataRedux = useAppSelector((state) => state.deposit.profileData);
  const dashboardStats = useAppSelector((state) => state.deposit.dashboardStats);

  const kycStatusText = dashboardStats?.kycStatus || 'KYC Pending';
  const isKycCompleted = kycStatusText === 'KYC Completed';

  // Logout Function Added Here
  const handleLogout = async () => {
    try {
      await Keychain.resetGenericPassword();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const SectionHeader = ({ icon, imageSource, title }) => (
    <View style={styles.sectionHeader}>
      {imageSource ? (
        <Image 
          source={imageSource} 
          style={{ width: 18, height: 18, resizeMode: 'contain' }} 
        />
      ) : (
        <Icon name={icon} size={18} color={theme.colors.textMain} />
      )}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  const ListItem = ({ title, subtitle }) => (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listTextContainer}>
        <Text style={styles.listTitle}>{title}</Text>
        {subtitle && <Text style={styles.listSubtitle}>{subtitle}</Text>}
      </View>
      <Icon name="chevron-right" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );

  const ToggleItem = ({ title, subtitle, value, onValueChange }) => (
    <View style={styles.listItem}>
      <View style={styles.listTextContainer}>
        <Text style={styles.listTitle}>{title}</Text>
        <Text style={styles.listSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        trackColor={{ false: '#D1D5DB', true: '#10B981' }}
        thumbColor={'#ffffff'}
        onValueChange={onValueChange}
        value={value}
        style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={20} color="#285CE0" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Manage your account and preferences</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ImageBackground
            source={require('../../../assets/images/profile/backbgdImage.png')} 
            style={styles.profileCard}
            imageStyle={styles.profileCardBg}
          >
            <View style={styles.profileImageContainer}>
                <View style={styles.profileArcBorder} />
                <View style={styles.profileCircle}>
                  <Text style={styles.profileAvatarText}>👤</Text>
                </View>
                <View style={styles.editIconBadge}>
                <Icon name="edit-2" size={12} color={theme.colors.primaryBlue} />
              </View>
            </View>
            
            <View style={styles.profileInfo}>
              {/* Dynamic Name */}
              <Text style={styles.profileName}>
                {profileDataRedux?.Full_Name ? capitalizeFirstLetter(profileDataRedux.Full_Name) : 'User'}
              </Text>
              
              {/* Dynamic Phone Number */}
              <Text style={styles.profilePhone}>
                {profileDataRedux?.Mobile_Number ? `${profileDataRedux.Mobile_Number}` : 'Add Phone Number'}
              </Text>
              
              {/* Dynamic KYC Badge */}
              <View style={[styles.kycBadge, isKycCompleted ? styles.kycBadgeSuccess : styles.kycBadgeDanger]}>
                <Text style={[styles.kycText, isKycCompleted ? styles.kycTextSuccess : styles.kycTextDanger]}>
                  • {kycStatusText.toUpperCase()}
                </Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Your Email</Text>
            <View style={styles.inputContainer}>
              <Image 
                source={require('../../../assets/images/settings/mail-01.png')} 
                style={[styles.inputIcon, { width: 18, height: 18, resizeMode: 'contain' }]} 
              />
              <TextInput 
                style={styles.input} 
                value={profileDataRedux?.Email_Address || 'Add Email'} 
                editable={false}
              />
            </View>

            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <Image 
                source={require('../../../assets/images/settings/call.png')} 
                style={[styles.inputIcon, { width: 18, height: 18, resizeMode: 'contain' }]} 
              />
              <TextInput 
                style={styles.input} 
                value={profileDataRedux?.Mobile_Number || 'Add Phone Number'} 
                editable={false}
              />
            </View>
          </View>

          <View style={styles.card}>
            <SectionHeader 
              imageSource={require('../../../assets/images/settings/Card Icon.png')} 
              title="Account Limits" 
            />
            
            <View style={styles.limitRow}>
              <Text style={styles.limitLabel}>Daily send limit</Text>
              <Text style={styles.limitValue}>$150 / $5,000 USD</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '15%' }]} />
            </View>

            <View style={styles.limitRow}>
              <Text style={styles.limitLabel}>Monthly send limit</Text>
              <Text style={styles.limitValue}>$3,200 / $50,000 USD</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '40%' }]} />
            </View>

            <View style={styles.limitRow}>
              <Text style={styles.limitLabel}>Annual send limit</Text>
              <Text style={styles.limitValue}>$25,000 / $500,000 USD</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '10%' }]} />
            </View>

            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Request Limit Increase</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <SectionHeader icon="shield" title="Security" />
            <ListItem title="Two-factor authentication" subtitle="Add an extra layer of security" />
            <ListItem title="Trusted devices" subtitle="Manage your devices" />
            <ListItem title="Login history" subtitle="View recent activity" />
          </View>

          <View style={styles.card}>
            <SectionHeader icon="bell" title="Notifications" />
            <ToggleItem 
              title="Push notifications" 
              subtitle="Get notified about transactions" 
              value={pushEnabled} 
              onValueChange={setPushEnabled} 
            />
            <ToggleItem 
              title="Email notifications" 
              subtitle="Receive email updates" 
              value={emailEnabled} 
              onValueChange={setEmailEnabled} 
            />
            <ToggleItem 
              title="SMS notifications" 
              subtitle="Text message alerts" 
              value={smsEnabled} 
              onValueChange={setSmsEnabled} 
            />
            <ToggleItem 
              title="Marketing emails" 
              subtitle="Product updates and offers" 
              value={marketingEnabled} 
              onValueChange={setMarketingEnabled} 
            />
          </View>

          <View style={styles.card}>
            <SectionHeader icon="settings" title="Preferences" />
            
            <View style={styles.listItem}>
              <View style={styles.listTextContainer}>
                <Text style={styles.listTitle}>Appearance</Text>
                <Text style={styles.listSubtitle}>Dark</Text>
              </View>
              <TouchableOpacity style={styles.dropdownBtn}>
                <Icon name="moon" size={14} color={theme.colors.textMain} style={{marginRight: 6}} />
                <Text style={styles.dropdownText}>Dark</Text>
                <Icon name="chevron-down" size={14} color={theme.colors.textMain} style={{marginLeft: 6}} />
              </TouchableOpacity>
            </View>

            <ListItem title="Base currency" subtitle="USD" />
            <ListItem title="Language" subtitle="English" />
          </View>

          <View style={styles.card}>
            <SectionHeader icon="help-circle" title="Help & Legal" />
            <ListItem title="Help center" subtitle="Get support and find answers" />
            <ListItem title="Contact us" subtitle="Chat or call our support team" />
            <ListItem title="Terms & conditions" subtitle="Legal agreements" />
            <ListItem title="Privacy policy" subtitle="How we handle your data" />
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Icon name="log-out" size={18} color="#fff" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <View style={styles.securityBanner}>
            <Image source={require('../../../assets/images/Security-Icon.png')} style={styles.bannerIcon} />
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>Secure & Trusted</Text>
              <Text style={styles.bannerSub}>Your account is protected with bank-grade security.</Text>
            </View>
            <Image source={require('../../../assets/images/locksecure.png')} style={styles.watermarkIcon} />
          </View>
          
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}