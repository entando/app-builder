import getFragmentAPI from 'api/fragment';
import { initialize } from 'redux-form';

import { SET_FRAGMENT } from './types';

// eslint-disable-next-line
export const setFragment = (fragmentValues) => ({
  type: SET_FRAGMENT,
  payload: {
    fragmentValues,
  },
});

// thunks
export const fetchFragment = fragmentCode => dispatch => (
  getFragmentAPI(fragmentCode).then((response) => {
    dispatch(setFragment(response.payload));
    dispatch(initialize('fragment', response.payload));
  })
);
