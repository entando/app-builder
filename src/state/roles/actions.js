import { SET_ROLES } from 'state/roles/types';
import { getRoles, postRoles } from 'api/roles';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
// Insert when ROLES LIST section is available
// import { gotoRoute } from 'frontend-common-components';
// import { ROUTE_ROLES_LIST } from 'app-init/router';

export const setRoles = roles => ({
  type: SET_ROLES,
  payload: {
    roles,
  },
});

// thunk
export const fetchRoles = (page = { page: 1, pageSize: 10 }, params = '') => dispatch =>
  new Promise((resolve) => {
    getRoles(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setRoles(data.payload));
          dispatch(toggleLoading('roles'));
          dispatch(setPage(data.metaData));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('roles'));
          resolve();
        }
      });
    });
  });


export const sendPostRole = rolesData => dispatch =>
  new Promise((resolve) => {
    postRoles(rolesData).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setRoles([data]));
          // gotoRoute(ROUTE_ROLES_LIST);
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  });
