import { getFragments } from 'api/fragment';
import { ADD_FRAGMENTS } from 'state/fragment-list/types';

// eslinter-disable-next-line
export const addFragments = fragments => ({
  type: ADD_FRAGMENTS,
  payload: {
    fragments,
  },
});

export const fetchFragments = () => dispatch => getFragments().then((data) => {
  dispatch(addFragments(data.payload));
});
