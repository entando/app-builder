import { gotoRoute, getParams } from '@entando/router';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';

import {
  SET_DATABASE_DUMPS,
  SET_DATABASE_INIT_BACKUP,
  SET_DATABASE_STATUS_BACKUP,
  SET_DATABASE_REPORT_BACKUP,
  SET_DATABASE_DUMP_TABLE,
  SET_DATABASE_DUMP_TABLE_DATA,
} from 'state/database/types';
import {
  getDatabaseDumpReportList,
  getDatabaseInitBackup,
  deleteDatabaseBackup,
  postStartBackup,
  getStatusBackup,
  getReportBackup,
  getDatabaseTableDump,
} from 'api/database';

import { ROUTE_DATABASE_LIST } from 'app-init/router';

import { getDatabaseReportBackupCode, getDataSourceDump, getTableDump } from 'state/database/selectors';

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

export const setReportBackup = report => ({
  type: SET_DATABASE_REPORT_BACKUP,
  payload: {
    report,
  },
});

export const setDumpTable = dump => ({
  type: SET_DATABASE_DUMP_TABLE,
  payload: {
    dump,
  },
});

export const setDumpTableData = data => ({
  type: SET_DATABASE_DUMP_TABLE_DATA,
  payload: {
    data,
  },
});

// thunk

export const fetchDatabaseDumpTable = () => (dispatch, getState) => (
  new Promise((resolve) => {
    const dumpCode = getDatabaseReportBackupCode(getState());
    const datasource = getDataSourceDump(getState());
    const tableName = getTableDump(getState());
    getDatabaseTableDump(dumpCode, datasource, tableName).then((response) => {
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          response.json().then((json) => {
            if (response.ok) {
              dispatch(setDumpTableData(json.payload.base64));
            } else {
              dispatch(addErrors(json.errors.map(e => e.message)));
            }
            resolve();
          });
        }
      } catch (error) {
        throw new TypeError('No JSON content-type in response headers', error);
      }
    });
  })
);

export const fetchDatabaseReportBackup = () => (dispatch, getState) => (
  new Promise((resolve) => {
    const { dumpCode } = getParams(getState());
    dispatch(toggleLoading('database'));
    getReportBackup(dumpCode).then((response) => {
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          response.json().then((json) => {
            if (response.ok) {
              dispatch(setReportBackup(json.payload));
            } else {
              dispatch(addErrors(json.errors.map(e => e.message)));
            }
            dispatch(toggleLoading('database'));
            resolve();
          });
        }
      } catch (error) {
        throw new TypeError('No JSON content-type in response headers', error);
      }
    });
  })
);

const isJsonContentType = (headers) => {
  const contentType = headers.get('content-type');
  return !!(contentType && contentType.includes('application/json'));
};

const intervalStatusBackup = () => (dispatch) => {
  const interval = setInterval(() => {
    getStatusBackup().then((response) => {
      if (isJsonContentType(response.headers)) {
        response.json().then((json) => {
          const status = parseInt(json.payload.status, 10);
          if (status === 0) {
            clearInterval(interval);
            dispatch(setStatusBackup(json.payload.status));
            getDatabaseDumpReportList({ page: 1, pageSize: 0 }).then((resp) => {
              if (isJsonContentType(resp.headers)) {
                resp.json().then((backup) => {
                  if (resp.ok) {
                    dispatch(setDatabaseDumps(backup.payload));
                    dispatch(setPage(backup.metaData));
                  } else {
                    dispatch(addErrors(backup.errors.map(e => e.message)));
                  }
                });
              }
            });
          }
        });
      }
    });
  }, 500);
};

export const fetchDatabaseDumpReport = (page = { page: 1, pageSize: 10 }) =>
  dispatch => new Promise((resolve) => {
    dispatch(toggleLoading('database'));
    getDatabaseDumpReportList(page).then((response) => {
      try {
        if (isJsonContentType(response.headers)) {
          response.json().then((json) => {
            if (response.ok) {
              dispatch(intervalStatusBackup());
            } else {
              dispatch(addErrors(json.errors.map(e => e.message)));
            }
            dispatch(toggleLoading('database'));
            resolve();
          });
        }
      } catch (error) {
        throw new TypeError('No JSON content-type in response headers', error);
      }
    });
  });

export const sendPostDatabaseStartBackup = () => dispatch => (
  new Promise((resolve) => {
    postStartBackup().then((response) => {
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          response.json().then((json) => {
            if (response.ok) {
              dispatch(setStatusBackup(json.payload.status));
              gotoRoute(ROUTE_DATABASE_LIST);
            } else {
              dispatch(addErrors(json.errors.map(e => e.message)));
            }
            resolve();
          });
        }
      } catch (error) {
        throw new TypeError('No JSON content-type in response headers', error);
      }
    });
  })
);

export const fetchDatabaseInitBackup = () => dispatch => (
  new Promise((resolve) => {
    getDatabaseInitBackup().then((response) => {
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          response.json().then((json) => {
            if (response.ok) {
              dispatch(setDatabaseInitBackup(json.payload));
            } else {
              dispatch(addErrors(json.errors.map(e => e.message)));
            }
            resolve();
          });
        }
      } catch (error) {
        throw new TypeError('No JSON content-type in response headers', error);
      }
    });
  }));

export const sendDeleteDatabaseBackup = code => dispatch => (
  new Promise((resolve) => {
    deleteDatabaseBackup(code).then((response) => {
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          response.json().then((json) => {
            if (response.ok) {
              dispatch(fetchDatabaseDumpReport());
            } else {
              dispatch(addErrors(json.errors.map(e => e.message)));
            }
            resolve();
          });
        }
      } catch (error) {
        throw new TypeError('No JSON content-type in response headers', error);
      }
    });
  }));
