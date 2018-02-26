import { getApiGroups } from 'api/groups';
import { ADD_GROUPS } from './types';

export const addGroups = groups => ({
  type: ADD_GROUPS,
  payload: {
    groups,
  },
});

// thunk
export const fetchGroups = () => (dispatch) => {
  getApiGroups().then((data) => {
    dispatch(addGroups(data.payload));
  });
};
