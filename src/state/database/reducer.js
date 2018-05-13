import { combineReducers } from 'redux';
import {
  SET_DATABASE_DUMPS,
  SET_DATABASE_INIT_BACKUP,
  SET_DATABASE_STATUS_BACKUP,
  SET_DATABASE_REPORT_BACKUP,
  SET_DATABASE_DUMP_TABLE,
  SET_DATABASE_DUMP_TABLE_DATA,

} from 'state/database/types';

export const list = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATABASE_DUMPS: {
      return action.payload.database.map(item => item.code);
    }
    default: return state;
  }
};

export const map = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_DATABASE_DUMPS: {
      return action.payload.database.reduce((acc, item) => {
        acc[item.code] = item;
        return acc;
      }, {});
    }
    default: return state;
  }
};

export const init = (state = [], action = {}) => {
  switch (action.type) {
    case SET_DATABASE_INIT_BACKUP: {
      return action.payload.init;
    }
    default: return state;
  }
};

export const status = (state = 0, action = {}) => {
  switch (action.type) {
    case SET_DATABASE_STATUS_BACKUP: {
      return parseInt(action.payload.status, 10);
    }
    default: return state;
  }
};

export const report = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_DATABASE_REPORT_BACKUP: {
      return action.payload.report;
    }
    default: return state;
  }
};

export const dump = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_DATABASE_DUMP_TABLE: {
      return action.payload.dump;
    }
    case SET_DATABASE_DUMP_TABLE_DATA: {
      return { ...state, data: action.payload.data };
    }
    default: return state;
  }
};

export default combineReducers({
  list,
  map,
  init,
  status,
  report,
  dump,
});
