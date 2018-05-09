import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { SET_DATABASE_DUMPS } from 'state/database/types';
import { getDatabaseDumpReportList } from 'api/database';

export const setDatabaseDumps = database => ({
  type: SET_DATABASE_DUMPS,
  payload: {
    database,
  },
});

// thunk
// eslint-disable-next-line
export const fetchDatabaseDumpReport = (page = { page: 1, pageSize: 10 }, params = '') => async (dispatch) => {
  const response = await getDatabaseDumpReportList(page, params);
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
