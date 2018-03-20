import { SET_GROUPS } from 'state/groups/types';
import { getGroups } from 'api/groups';
import { setPage } from 'state/pagination/actions';

export const setGroups = groups => ({
  type: SET_GROUPS,
  payload: {
    groups,
  },
});

// thunk
export const fetchGroups = (page = 1, params) => dispatch =>
  getGroups(page, params).then((data) => {
    dispatch(setGroups(data.payload));
    dispatch(setPage(data.metaData));
  });
