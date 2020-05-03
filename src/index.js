import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

import './config/ReactotronConfig';

import {store, persistor} from './store';
import Routes from './routes';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyles="ligh-content" backgroundColor="#A7C410" />
        <Routes />
      </PersistGate>
    </Provider>
  );
}
