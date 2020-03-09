import 'test/enzyme-init';
import { mapStateToProps } from 'ui/app/AppContainer';

const TEST_STATE = {
  currentUser: { username: 'admin' },
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
      });
    });
  });
});
