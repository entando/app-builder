import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/database/dump/DatabaseDumpTablePageContainer';
import { getTableDumpData } from 'state/database/selectors';
import { fetchDatabaseDumpTable } from 'state/database/actions';

jest.mock('state/database/selectors', () => ({
  getTableDumpData: jest.fn(),
}));
getTableDumpData.mockReturnValueOnce('');

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
      props = mapDispatchToProps(dispatchMock);
    });
    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDatabaseDumpTable).toHaveBeenCalled();
    });
  });
});
