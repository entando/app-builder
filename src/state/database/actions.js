import { gotoRoute } from '@entando/router';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';

import {
  SET_DATABASE_DUMPS,
  SET_DATABASE_INIT_BACKUP,
  SET_DATABASE_STATUS_BACKUP,
} from 'state/database/types';
import {
  getDatabaseDumpReportList,
  getDatabaseInitBackup,
  deleteDatabaseBackup,
  postStartBackup,
  getStatusBackup,
} from 'api/database';

import { ROUTE_DATABASE_LIST } from 'app-init/router';

import { getDatabaseStatusBackup } from 'state/database/selectors';

export const setDatabaseDumps = database => ({
  type: SET_DATABASE_DUMPS,
  payload: {
    database,
  },
});

export const setDatabaseInitBackup = init => ({
  type: SET_DATABASE_INIT_BACKUP,
  payload: {
    init,
  },
});

export const setStatusBackup = status => ({
  type: SET_DATABASE_STATUS_BACKUP,
  payload: {
    status,
  },
});

// thunk
export const fetchDatabaseStatusBackup = () => dispatch => (
  new Promise((resolve) => {
    getStatusBackup().then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setStatusBackup(json.payload.status));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
        }
        resolve();
      });
    });
  })
);

export const sendPostDatabaseStartBackup = () => dispatch => (
  new Promise((resolve) => {
    postStartBackup().then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setStatusBackup(json.payload.status));
          gotoRoute(ROUTE_DATABASE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
        }
        resolve();
      });
    });
  })
);

export const fetchDatabaseInitBackup = () => dispatch => (
  new Promise((resolve) => {
    getDatabaseInitBackup().then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setDatabaseInitBackup(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
        }
        resolve();
      });
    });
  }));

export const fetchDatabaseDumpReport = (page = { page: 1, pageSize: 10 }) =>
  (dispatch, getState) => new Promise((resolve) => {
    getDatabaseDumpReportList(page).then((response) => {
      dispatch(toggleLoading('database'));
      response.json().then((json) => {
        if (response.ok) {
          if (getDatabaseStatusBackup(getState()) === 0) {
            dispatch(setDatabaseDumps(json.payload));
            dispatch(setPage(json.metaData));
          } else {
            dispatch(fetchDatabaseStatusBackup());
            dispatch(fetchDatabaseDumpReport());
          }
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
        }
        dispatch(toggleLoading('database'));
        resolve();
      });
    });
  });

export const sendDeleteDatabaseBackup = code => dispatch => (
  new Promise((resolve) => {
    deleteDatabaseBackup(code).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(fetchDatabaseDumpReport());
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
        }
        resolve();
      });
    });
  }));
