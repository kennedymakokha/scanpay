/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext1';

const Root = () => (
  <NavigationContainer>
    <AuthProvider>
      <App />
    </AuthProvider>
  </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => Root);
