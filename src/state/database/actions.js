import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import {
  getDatabaseDumpReportList,
  getDatabaseInitBackup,
  deleteDatabaseBackup,
  postStartBackup,
  getStatusBackup,
  getReportBackup,
  getDatabaseTableDump,
} from 'api/database';
import { getDatabaseReportBackupCode, getDataSourceDump, getTableDump } from 'state/database/selectors';
import {
  SET_DATABASE_DUMPS,
  SET_DATABASE_INIT_BACKUP,
  SET_DATABASE_STATUS_BACKUP,
  SET_DATABASE_REPORT_BACKUP,
  SET_DATABASE_DUMP_TABLE,
  SET_DATABASE_DUMP_TABLE_DATA,
} from 'state/database/types';
import { history, ROUTE_DATABASE_LIST } from 'app-init/router';


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
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setDumpTableData(json.payload.base64));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchDatabaseReportBackup = dumpCode => dispatch => (
  new Promise((resolve) => {
    dispatch(toggleLoading('database'));
    getReportBackup(dumpCode).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setReportBackup(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading('database'));
        resolve();
      });
    }).catch(() => {});
  })
);

const intervalStatusBackup = () => (dispatch) => {
  const interval = setInterval(() => {
    getStatusBackup().then((response) => {
      response.json().then((json) => {
        const status = parseInt(json.payload.status, 10);
        if (status === 0) {
          clearInterval(interval);
          dispatch(setStatusBackup(json.payload.status));
          getDatabaseDumpReportList({ page: 1, pageSize: 0 }).then((resp) => {
            resp.json().then((backup) => {
              if (resp.ok) {
                dispatch(setDatabaseDumps(backup.payload));
                dispatch(setPage(backup.metaData));
              } else {
                dispatch(addErrors(backup.errors.map(e => e.message)));
                backup.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
              }
            });
          }).catch(() => {});
        }
      });
    }).catch(() => {});
  }, 500);
};

export const fetchDatabaseDumpReport = (page = { page: 1, pageSize: 10 }) =>
  dispatch => new Promise((resolve) => {
    dispatch(toggleLoading('database'));
    getDatabaseDumpReportList(page).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(intervalStatusBackup());
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        dispatch(toggleLoading('database'));
        resolve();
      });
    }).catch(() => {});
  });

export const sendPostDatabaseStartBackup = () => dispatch => (
  new Promise((resolve) => {
    postStartBackup().then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setStatusBackup(json.payload.status));
          history.push(ROUTE_DATABASE_LIST);
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
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
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  }));

export const sendDeleteDatabaseBackup = code => dispatch => (
  new Promise((resolve) => {
    deleteDatabaseBackup(code).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(fetchDatabaseDumpReport());
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  }));
