import produce from 'immer';

import * as Toast from '../../../components/Toast/index';

const INITIAL_STATE = {
  annotations: [],
  synchronizing: false,
};

export default function annotation(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@annotation/STARTING_SYNCHRONIZATION':
      return produce(state, (draft) => {
        draft.synchronizing = true;
      });

    case '@annotation/END_SYNCHRONIZATION':
      return produce(state, (draft) => {
        draft.synchronizing = false;
      });

    case '@annotation/SYNCHRONIZE_ANNOTATION_SUCCESS':
      return produce(state, (draft) => {
        draft.annotations.map((annotation) => {
          if (annotation.datetime === action.payload.datetime) {
            annotation.post = true;
          }
        });
      });

    case '@annotation/CREATE':
      return produce(state, (draft) => {
        draft.annotations.push(action.payload);
        Toast.successIcon('Criado');
      });
    case '@annotation/DELETE':
      return produce(state, (daft) => {
        daft.annotations = [];
      });
    default:
      return state;
  }
}
