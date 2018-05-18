import 'test/enzyme-init';
import { mapDispatchToProps } from 'ui/database/report/ReportDatabaseDataSourceContainer';
import { setDumpTable } from 'state/database/actions';

jest.mock('state/database/actions', () => ({
  setDumpTable: jest.fn(),
}));

const dispatchMock = jest.fn();

describe('ui/database/report/ReportDatabaseDataSourceContainer', () => {
  let props;
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('should map the correct function properties', () => {
      expect(props.onClickDump).toBeDefined();
    });

    it('should dispatch an action if onClickDump is called', () => {
      props.onClickDump({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(setDumpTable).toHaveBeenCalled();
    });
  });
});
