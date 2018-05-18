import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/database/list/DatabaseListTableContainer';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/database/common/DeleteDatabaseModal';
import { getLoading } from 'state/loading/selectors';
import { DATABASE_DUMP_REPORT_LIST } from 'test/mocks/database';
import { getDatabaseDumpList, getDatabaseStatusBackup } from 'state/database/selectors';
import { fetchDatabaseDumpReport } from 'state/database/actions';

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));
getLoading.mockReturnValue(false);

jest.mock('state/database/selectors', () => ({
  getDatabaseDumpList: jest.fn(),
  getDatabaseStatusBackup: jest.fn(),
}));
getDatabaseDumpList.mockReturnValue(DATABASE_DUMP_REPORT_LIST);
getDatabaseStatusBackup.mockReturnValue(0);

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn(),
  setInfo: jest.fn(),
}));

jest.mock('state/database/actions', () => ({
  fetchDatabaseDumpReport: jest.fn(),
}));

const dispatchMock = jest.fn();

describe('ui/database/list/DatabaseListTableContainer', () => {
  let props;
  describe('mapstateToProps', () => {
    it('has databases props', () => {
      props = mapStateToProps({});
      expect(props).toHaveProperty('databases', DATABASE_DUMP_REPORT_LIST);
      expect(props).toHaveProperty('loading');
      expect(props).toHaveProperty('status', 0);
    });
  });
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
      expect(props.onClickDelete).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDatabaseDumpReport).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickDelete is called', () => {
      props.onClickDelete({ code: 'develop' });
      expect(dispatchMock).toHaveBeenCalled();
      expect(setVisibleModal).toHaveBeenCalledWith(MODAL_ID);
      expect(setInfo).toHaveBeenCalledWith({ type: 'database', code: 'develop' });
    });
  });
});
