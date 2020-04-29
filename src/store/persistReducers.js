import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'checkplant',
      storage: AsyncStorage,
      whitelist: ['annotation'],
    },
    reducers,
  );
  return persistedReducer;
};
