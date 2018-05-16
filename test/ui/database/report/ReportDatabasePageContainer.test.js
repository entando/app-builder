import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/database/report/ReportDatabasePageContainer';

import { getLoading } from 'state/loading/selectors';
import { DATABASE_DUMP_REPORT_LIST } from 'test/mocks/database';
import { getDatabaseReportBackup } from 'state/database/selectors';
import { fetchDatabaseReportBackup } from 'state/database/actions';

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));
getLoading.mockReturnValue({ database: false });

jest.mock('state/database/selectors', () => ({
  getDatabaseReportBackup: jest.fn(),
}));
getDatabaseReportBackup.mockReturnValue(DATABASE_DUMP_REPORT_LIST[0]);

jest.mock('state/database/actions', () => ({
  fetchDatabaseReportBackup: jest.fn(),
}));

const dispatchMock = jest.fn();

describe('ui/database/report/ReportDatabasePageContainer', () => {
  let props;
  describe('mapstateToProps', () => {
    it('has databases props', () => {
      props = mapStateToProps({});
      expect(props).toHaveProperty('report', DATABASE_DUMP_REPORT_LIST[0]);
      expect(props).toHaveProperty('loading', false);
    });
  });
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDatabaseReportBackup).toHaveBeenCalled();
    });
  });
});
