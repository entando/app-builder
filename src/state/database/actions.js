import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { SET_DATABASE_DUMPS, SET_DATABASE_INIT_BACKUP } from 'state/database/types';
import {
  getDatabaseDumpReportList,
  getDatabaseInitBackup,
  deleteDatabaseBackup,
} from 'api/database';

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

// thunk
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

export const fetchDatabaseDumpReport = (page = { page: 1, pageSize: 10 }) => dispatch => (
  new Promise((resolve) => {
    getDatabaseDumpReportList(page).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setDatabaseDumps(json.payload));
          dispatch(setPage(json.metaData));
        } else { dispatch(addErrors(json.errors.map(e => e.message))); }
        resolve();
      });
    });
  }));

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
