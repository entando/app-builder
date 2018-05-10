import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/database/add/AddDatabaseListTableContainer';
import { getDatabaseInit } from 'state/database/selectors';
import { sendPostDatabaseStartBackup } from 'state/database/actions';

jest.mock('state/database/selectors', () => ({
  getDatabaseInit: jest.fn(),
}));
getDatabaseInit.mockReturnValueOnce([]);

jest.mock('state/database/actions', () => ({
  sendPostDatabaseStartBackup: jest.fn(),
}));
const dispatchMock = jest.fn();

describe('ui/database/add/AddDatabasePageContainer', () => {
  let props;
  describe('mapStateToProps', () => {
    it('has tables props', () => {
      props = mapStateToProps({});
      expect(props).toHaveProperty('tables');
    });
  });
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('should map the correct function properties', () => {
      expect(props.onClickStartBackup).toBeDefined();
    });

    it('should dispatch an action if onClickStartBackup is called', () => {
      props.onClickStartBackup({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(sendPostDatabaseStartBackup).toHaveBeenCalled();
    });
  });
});
