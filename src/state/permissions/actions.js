import { SET_PERMISSIONS } from 'state/permissions/types';
import { getPermissions } from 'api/permissions';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';

export const setPermissions = permissions => ({
  type: SET_PERMISSIONS,
  payload: {
    permissions,
  },
});

// thunk
export const fetchPermissions = (page = { page: 1, pageSize: 10 }, params = '') => dispatch =>
  new Promise((resolve) => {
    getPermissions(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setPermissions(data.payload));
          dispatch(toggleLoading('permissions'));
          dispatch(setPage(data.metaData));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          dispatch(toggleLoading('permissions'));
          resolve();
        }
      });
    });
  });
