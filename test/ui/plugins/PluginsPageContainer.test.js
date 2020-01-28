import 'test/enzyme-init';
import { mapStateToProps } from 'ui/plugins/PluginsPageContainer';

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

describe('PluginsPageContainer', () => {
  describe('mapStateToProps', () => {
    it('properly works', () => {
      const props = mapStateToProps(TEST_STATE);
      expect(props).toHaveProperty('plugins');
      expect(props.plugins).toHaveLength(1);
      expect(props.plugins[0]).toHaveProperty('id', '1');
    });
  });
});
