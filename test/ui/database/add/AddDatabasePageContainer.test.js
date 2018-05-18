import 'test/enzyme-init';
import { mapDispatchToProps } from 'ui/database/add/AddDatabasePageContainer';
import { fetchDatabaseInitBackup } from 'state/database/actions';

jest.mock('state/database/actions', () => ({
  fetchDatabaseInitBackup: jest.fn(),
}));
const dispatchMock = jest.fn();

describe('ui/database/add/AddDatabasePageContainer', () => {
  let props;
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onClickStartBackup is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchDatabaseInitBackup).toHaveBeenCalled();
    });
  });
});
