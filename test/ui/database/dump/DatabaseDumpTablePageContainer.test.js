import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/database/dump/DatabaseDumpTablePageContainer';
import { getTableDumpData } from 'state/database/selectors';
import { fetchDatabaseDumpTable } from 'state/database/actions';
import { getVisibleModal } from 'state/modal/selectors';

jest.mock('state/database/selectors', () => ({
  getTableDumpData: jest.fn(),
}));

jest.mock('state/modal/selectors', () => ({
  getVisibleModal: jest.fn(),
}));

getTableDumpData.mockReturnValueOnce('');
getVisibleModal.mockReturnValueOnce('');

jest.mock('state/database/actions', () => ({
  fetchDatabaseDumpTable: jest.fn(),
}));


const dispatchMock = jest.fn();

describe('ui/database/dump/DatabaseDumpTablePageContainer', () => {
  let props;
  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = mapStateToProps({});
    });

    it('has dumpData props', () => {
      expect(props).toHaveProperty('dumpData', '');
    });
  });
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock, { match: { params: { dumpCode: 'dumpCode', datasource: 'datasource', tableName: 'tableName' } } });
    });
    it('should map the correct function properties', () => {
      expect(props.fetchDumpTable).toBeDefined();
    });

    it('should dispatch an action if fetchDumpTable is called', () => {
      props.fetchDumpTable({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDatabaseDumpTable).toHaveBeenCalled();
    });
  });
});
