import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/app/AppContainer';

jest.mock('state/plugins/thunks', () => ({
  fetchPlugins: jest.fn().mockReturnValue('fetchPlugins_result'),
}));

const dispatchMock = jest.fn();

const TEST_STATE = {
  router: { route: 'page' },
  currentUser: { username: 'admin' },
};

describe('AppContainer', () => {
  describe('mapStateToProps', () => {
    it('maps route property with state.router.route', () => {
      expect(mapStateToProps(TEST_STATE)).toEqual({
        route: 'page',
        username: 'admin',
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
