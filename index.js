/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import {store, persistor} from './src/store';
import {Provider} from 'react-redux';
import {Text} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';

export default function Main() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
