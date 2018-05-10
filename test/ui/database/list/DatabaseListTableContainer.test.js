import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/database/list/DatabaseListTableContainer';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/database/common/DeleteDatabaseModal';

import { DATABASE_DUMP_REPORT_LIST } from 'test/mocks/database';
import { getDatabaseDumpList } from 'state/database/selectors';
import { fetchDatabaseDumpReport } from 'state/database/actions';


jest.mock('state/database/selectors', () => ({
  getDatabaseDumpList: jest.fn(),
}));
getDatabaseDumpList.mockReturnValue(DATABASE_DUMP_REPORT_LIST);

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
