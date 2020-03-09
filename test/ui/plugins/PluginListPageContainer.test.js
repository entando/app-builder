import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/plugins/PluginListPageContainer';

jest.mock('state/plugins/thunks', () => ({
  fetchPlugins: jest.fn().mockReturnValue('fetchPlugins_result'),
}));

const dispatchMock = jest.fn();

const TEST_STATE = {
  plugins: {
    list: [{
      id: '1',
    }],
  },
  loading: {
    plugins: false,
  },
};

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

describe('PluginListPageContainer', () => {
  describe('mapStateToProps', () => {
    it('properly works', () => {
      const props = mapStateToProps(TEST_STATE);
      expect(props).toHaveProperty('plugins');
      expect(props.plugins).toHaveLength(1);
      expect(props.plugins[0]).toHaveProperty('id', '1');
    });
  });
});
