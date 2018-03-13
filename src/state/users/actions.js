import { SET_USERS } from 'state/users/types';
import { getUsers } from 'api/users';
import { setPage } from 'state/pagination/actions';


export const setUsers = users => ({
  type: SET_USERS,
  payload: {
    users,
  },
});

// thunk
export const fetchUsers = (page = 1, params) => dispatch =>
  getUsers(page, params).then((data) => {
    dispatch(setUsers(data.payload));
    dispatch(setPage(data.metaData));
  });
