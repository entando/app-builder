import { getFragments } from 'api/fragment';
import { SET_FRAGMENTS } from 'state/fragment-list/types';

// eslinter-disable-next-line
export const setFragments = fragments => ({
  type: SET_FRAGMENTS,
  payload: {
    fragments,
  },
});

export const fetchFragments = () => dispatch => getFragments().then((data) => {
  dispatch(setFragments(data.payload));
});
