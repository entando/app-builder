import { initialize } from 'redux-form';
import { SET_USERS } from 'state/users/types';
import { getUsers } from 'api/users';
import { getUser } from 'api/user';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';


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


export const fetchUserForm = username => dispatch =>
  getUser(username).then((response) => {
    if (response.errors && response.errors.length) {
      dispatch(addErrors(response.errors.map(err => err.message)));
    } else {
      dispatch(initialize('user', response.payload));
    }
  });
