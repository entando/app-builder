
import { getLocale } from 'state/locale/selectors';

const TEST_STATE = { locale: 'en' };

it('verify getLocale selector', () => {
  expect(getLocale(TEST_STATE)).toBeDefined();
});
