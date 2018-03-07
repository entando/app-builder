import { getFragment } from 'api/fragments';
import { initialize } from 'redux-form';
import { SET_SELECTED } from 'state/fragments/types';

export const setSelectedFragment = fragment => ({
  type: SET_SELECTED,
  payload: {
    fragment,
  },
});

// thunks
// eslint-disable-next-line
export const fetchFragment = fragmentCode => dispatch => (
  getFragment(fragmentCode).then((response) => {
    dispatch(initialize('fragment', response.payload));
  })
);

// thunks
export const fetchFragmentDetail = fragmentCode => dispatch => (
  getFragment(fragmentCode).then((response) => {
    dispatch(setSelectedFragment(response.payload));
  })
);
