import 'test/enzyme-init';

import { mapStateToProps } from 'ui/locale/IntlProviderContainer';

const TEST_STATE = { locale: 'en' };

it('maps locale property with state.locale', () => {
  expect(mapStateToProps(TEST_STATE)).toEqual({ locale: 'en' });
});
