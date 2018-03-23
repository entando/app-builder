import { getApiRoles } from 'api/roles';
import { ADD_ROLES } from 'state/roles/types';

export const addRoles = roles => ({
  type: ADD_ROLES,
  payload: {
    roles,
  },
});

// thunk
export const fetchRoles = () => dispatch =>
  getApiRoles().then((data) => {
    dispatch(addRoles(data.payload));
  });
