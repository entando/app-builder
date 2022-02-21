import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/app/AppContainer';

jest.mock('state/plugins/thunks', () => ({
  fetchPlugins: jest.fn().mockReturnValue('fetchPlugins_result'),
}));

const dispatchMock = jest.fn();

const TEST_STATE = {
  currentUser: { username: 'admin' },
  permissions: { loggedUserPermissionsLoaded: true },
};

const ownProps = {
  location: {
    pathname: 'page',
  },
};

describe('AppContainer', () => {
  describe('mapStateToProps', () => {
    it('maps route property', () => {
      expect(mapStateToProps(TEST_STATE, ownProps)).toEqual({
        username: 'admin',
        currentRoute: 'page',
        loggedUserPrefloading: true,
      });
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('fetchPlugins method dispatches fetchPlugins thunk', () => {
      expect(props.fetchPlugins).toBeDefined();
      props.fetchPlugins();
      expect(dispatchMock).toHaveBeenCalledWith('fetchPlugins_result');
    });
  });
});
