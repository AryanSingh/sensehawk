/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';

export default function Main() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
