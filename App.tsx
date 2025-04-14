/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';



import "./global.css"
import Login from './src/screens/auth/login';
import Scan from './src/screens/scan';


function App(): React.JSX.Element {


  return (
    <View className=' flex-1' >

      <View className="flex-1">
        <Scan />
      </View>
    </View>
  );
}



export default App;
