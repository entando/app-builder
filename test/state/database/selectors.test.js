import {
  DATABASE_DUMP_REPORT_LIST,
  DATABASE_LIST,
  DATABASE_MAP,
  DATABASE_INIT_BACKUP,
} from 'test/mocks/database';

import {
  getDatabaseInit,
  getDatabaseStatusBackup,
  getDatabaseReportBackup,
  getDatabaseReportBackupCode,
  getDataSourceDump,
  getTableDump,
  getTableDumpData,
  getDatabaseDumpList,
} from 'state/database/selectors';

const TEST_STATE = {
  database: {
    list: DATABASE_LIST,
    map: DATABASE_MAP,
    init: DATABASE_INIT_BACKUP,
    status: 0,
    report: { code: 'dumpCode' },
    dump: {
      datasource: 'datasource',
      tableName: 'tableName',
      data: '',
    },
  },
};

describe('state/database/selectors', () => {
  it('getDatabaseInit selector', () => {
    expect(getDatabaseInit(TEST_STATE)).toMatchObject(DATABASE_INIT_BACKUP);
  });

  it('getDatabaseStatusBackup selector', () => {
    expect(getDatabaseStatusBackup(TEST_STATE)).toBe(0);
  });

  it('getDatabaseReportBackup selector', () => {
    expect(getDatabaseReportBackup(TEST_STATE)).toEqual(expect.any(Object));
  });

  it('getDatabaseReportBackupCode selector', () => {
    expect(getDatabaseReportBackupCode(TEST_STATE)).toBe('dumpCode');
  });

  it('getDataSourceDump selector', () => {
    expect(getDataSourceDump(TEST_STATE)).toBe('datasource');
  });

  it('getTableDump selector', () => {
    expect(getTableDump(TEST_STATE)).toBe('tableName');
  });

  it('getTableDumpData selector', () => {
    expect(getTableDumpData(TEST_STATE)).toEqual(expect.any(String));
  });

  it('getDatabaseDumpList selector', () => {
    expect(getDatabaseDumpList(TEST_STATE)).toMatchObject(DATABASE_DUMP_REPORT_LIST);
  });
});
