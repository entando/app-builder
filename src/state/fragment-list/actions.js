import { getFragments } from 'api/fragments';
import { SET_FRAGMENTS } from 'state/fragment-list/types';
import { setPage } from 'state/pagination/actions';

// eslinter-disable-next-line
export const setFragments = fragments => ({
  type: SET_FRAGMENTS,
  payload: {
    fragments,
  },
});

export const fetchFragments = (page = 1) => dispatch => getFragments(page).then((data) => {
  dispatch(setFragments(data.payload));
  dispatch(setPage(data.metaData));
});
