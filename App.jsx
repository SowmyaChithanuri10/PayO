// import React from 'react';
// import AppNavigator from './src/navigation/AppNavigator';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { AuthProvider } from './src/context/AuthContext';
// import { Provider } from 'react-redux';
// import { store } from './src/redux/store';  

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <AuthProvider>
//           <AppNavigator />
//         </AuthProvider>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// }

///////////////////////////////////////////////

import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import NetInfo from '@react-native-community/netinfo';
import { navigate } from './src/navigation/navigationRef';


export default function App() {
  useEffect(() => {
    // Listen for internet connection drops globally
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected === false) {
        navigate('NotFound',
           { errorType: 'OFFLINE' }
          ); 
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
 