import {all} from 'redux-saga/effects';

import annotation from './annotation/sagas';

export default function* rootSaga() {
  return yield all([annotation]);
}
