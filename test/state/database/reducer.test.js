import reducer from 'state/database/reducer';
import {
  setDatabaseDumps,
  setDatabaseInitBackup,
  setStatusBackup,
} from 'state/database/actions';
import {
  DATABASE_DUMP_REPORT_LIST,
  DATABASE_INIT_BACKUP,
  DATABASE_LIST,
  DATABASE_MAP,
} from 'test/mocks/database';

describe('database/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(state).toBeInstanceOf(Object);
  });

  describe('after action SET_DATABASE_DUMPS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setDatabaseDumps(DATABASE_DUMP_REPORT_LIST));
    });
    it('list reducer', () => {
      expect(newState).toHaveProperty('list');
      expect(newState.list).toBeInstanceOf(Array);
      expect(newState.list).toEqual(expect.objectContaining(DATABASE_LIST));
    });
    it('map reducer', () => {
      expect(newState).toHaveProperty('map');
      expect(newState.map).toBeInstanceOf(Object);
      expect(newState.map).toEqual(expect.objectContaining(DATABASE_MAP));
    });
  });

  describe('after action SET_DATABASE_INIT_BACKUP', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setDatabaseInitBackup(DATABASE_INIT_BACKUP));
    });
    it('init reducer', () => {
      expect(newState).toHaveProperty('init');
      expect(newState.init).toBeInstanceOf(Array);
      expect(newState.init).toEqual(expect.objectContaining(DATABASE_INIT_BACKUP));
    });
  });

  describe('after action SET_DATABASE_STATUS_BACKUP', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setStatusBackup(0));
    });
    it('status reducer', () => {
      expect(newState).toHaveProperty('status', 0);
    });
  });
});
