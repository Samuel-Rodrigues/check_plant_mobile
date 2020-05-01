import produce from 'immer';

import * as Toast from '../../../components/Toast/index';

const INITIAL_STATE = {
  annotations: [],
};

export default function annotation(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@annotation/SYNCHRONIZE_ANNOTATION_SUCCESS':
      return produce(state, (draft) => {
        let index = state.annotations.indexOf(action.payload);

        draft.annotations[index].post = true;
      });

    case '@annotation/CREATE':
      return produce(state, (draft) => {
        draft.annotations.push(action.payload);
        Toast.successIcon('Criado');
      });
    /*
    case '@annotation/DELETE':
      return produce(state, (daft) => {
        daft.annotations = [];
      });
      */
    default:
      return state;
  }
}
