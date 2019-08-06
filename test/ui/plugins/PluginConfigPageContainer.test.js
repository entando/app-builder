import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/plugins/PluginConfigPageContainer';

jest.mock('state/plugins/thunks', () => ({
  getOrFetchPlugin: jest.fn().mockReturnValue('getOrFetchPlugin_result'),
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

const ownProps = {
  match: {
    params: {
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
      props = mapDispatchToProps(dispatchMock, ownProps);
    });

    it('getOrFetchPlugin method dispatches getOrFetchPlugin thunk', () => {
      expect(props.getOrFetchPlugin).toBeDefined();
      props.getOrFetchPlugin();
      expect(dispatchMock).toHaveBeenCalledWith('getOrFetchPlugin_result');
    });

    it('savePluginConfig method dispatches savePluginConfig thunk', () => {
      expect(props.savePluginConfig).toBeDefined();
      props.savePluginConfig({});
      expect(dispatchMock).toHaveBeenCalledWith('savePluginConfig_result');
    });
  });
});
