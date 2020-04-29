import {takeLatest, call, put, all} from 'redux-saga/effects';
import {Alert} from 'react-native';

import {synchronizeAnnotationRequest} from './actions';

import api from '../../../service/api';

export function* synchronizeAnnotation({payload}) {
  try {
    const {annotation, latitude, longitude, datetime} = payload;

    const data = {
      annotation,
      latitude,
      longitude,
      datetime,
    };

    const response = yield call(api.post, null, data, {
      params: {
        email_key: 'carlossamuel.rodrigues@gmail.com',
      },
    });

    console.tron.log('data', response.data);
  } catch (erro) {
    Alert.alert('Ops!', 'Não foi possível sinconnizar no momento');
  }
}

export default all([
  takeLatest(
    '@annotation/SYNCHRONIZE_ANNOTATION_REQUEST',
    synchronizeAnnotation,
  ),
]);
