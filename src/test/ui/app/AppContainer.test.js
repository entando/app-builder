import 'test/enzyme-init';
import 'test/mocks/mockContainers';

import { mapStateToProps } from 'ui/app/AppContainer';

const TEST_STATE = {
  router: { route: 'page' },
};

it('maps route property with state.router.route', () => {
  expect(mapStateToProps(TEST_STATE)).toEqual({ route: 'page' });
});
