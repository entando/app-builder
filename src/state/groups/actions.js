import { SET_GROUPS } from 'state/groups/types';
import { getApiGroups } from 'api/groups';
import { setPage } from 'state/pagination/actions';

export const setGroups = groups => ({
  type: SET_GROUPS,
  payload: {
    groups,
  },
});

// thunk
export const fetchGroups = (page = 1, params) => dispatch =>
  getApiGroups(page, params).then((data) => {
    dispatch(setGroups(data.payload));
    dispatch(setPage(data.metaData));
  });
