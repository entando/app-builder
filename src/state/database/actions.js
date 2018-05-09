import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { SET_DATABASE_DUMPS, SET_DATABASE_INIT_BACKUP } from 'state/database/types';
import { getDatabaseDumpReportList, getDatabaseInitBackup } from 'api/database';

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
export const fetchDatabaseInitBackup = () => async (dispatch) => {
  const response = await getDatabaseInitBackup();
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const json = await response.json();
    if (response.ok) {
      dispatch(setDatabaseInitBackup(json.payload));
      return json;
    }
    dispatch(addErrors(json.errors.map(e => e.message)));
    throw json;
  }
  throw new TypeError('No JSON content-type in response headers');
};

export const fetchDatabaseDumpReport = (page = { page: 1, pageSize: 10 }) => async (dispatch) => {
  const response = await getDatabaseDumpReportList(page);
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const json = await response.json();
    if (response.ok) {
      dispatch(setDatabaseDumps(json.payload));
      dispatch(setPage(json.metaData));
      return json;
    }
    dispatch(addErrors(json.errors.map(e => e.message)));
    throw json;
  }
  throw new TypeError('No JSON content-type in response headers');
};
