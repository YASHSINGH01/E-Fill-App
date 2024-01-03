/**
 * @format
 */
 import React from 'react';
 import {AppRegistry} from 'react-native';

 import { Provider } from 'react-redux';
 import { createStore } from 'redux';
 import reducer from './src/Redux/Reducers/Reducers';

 const Store = createStore(reducer);

 import App from './App';
 import {name as appName} from './app.json';

const AppContainer = () => (
    <Provider store={Store}>
        <App/>
    </Provider>
);

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return <AppContainer />;
}
 
 AppRegistry.registerComponent(appName, () => HeadlessCheck);
 