import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/plugins/PluginConfigPageContainer';

jest.mock('state/plugins/thunks', () => ({
  fetchSelectedPluginIfNotCached: jest.fn().mockReturnValue('fetchSelectedPluginIfNotCached_result'),
  savePluginConfig: jest.fn().mockReturnValue('savePluginConfig_result'),
}));

const dispatchMock = jest.fn();

const TEST_STATE = {
  plugins: {
    selected: {
      id: '1',
    },
  },
};

describe('PluginConfigPageContainer', () => {
  describe('mapStateToProps', () => {
    it('properly works', () => {
      expect(mapStateToProps(TEST_STATE)).toHaveProperty('plugin.id', '1');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('fetchSelectedPluginIfNotCached method dispatches fetchSelectedPluginIfNotCached thunk', () => {
      expect(props.fetchSelectedPluginIfNotCached).toBeDefined();
      props.fetchSelectedPluginIfNotCached();
      expect(dispatchMock).toHaveBeenCalledWith('fetchSelectedPluginIfNotCached_result');
    });

    it('savePluginConfig method dispatches savePluginConfig thunk', () => {
      expect(props.savePluginConfig).toBeDefined();
      props.savePluginConfig({});
      expect(dispatchMock).toHaveBeenCalledWith('savePluginConfig_result');
    });
  });
});
