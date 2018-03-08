import { initialize } from 'redux-form';

import { getFragment, getFragments } from 'api/fragments';
import { SET_SELECTED, SET_FRAGMENTS } from 'state/fragments/types';
import { setPage } from 'state/pagination/actions';

export const setSelectedFragment = fragment => ({
  type: SET_SELECTED,
  payload: {
    fragment,
  },
});

export const setFragments = fragments => ({
  type: SET_FRAGMENTS,
  payload: {
    fragments,
  },
});

// thunks
export const fetchFragment = fragmentCode => dispatch => (
  getFragment(fragmentCode).then((response) => {
    dispatch(initialize('fragment', response.payload));
  })
);

export const fetchFragmentDetail = fragmentCode => dispatch => (
  getFragment(fragmentCode).then((response) => {
    dispatch(setSelectedFragment(response.payload));
  })
);

export const fetchFragments = (page = 1) => dispatch => getFragments(page).then((data) => {
  dispatch(setFragments(data.payload));
  dispatch(setPage(data.metaData));
});
