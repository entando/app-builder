
import { getOptions } from 'state/settings-form/selectors';

const TEST_STATE = {
  options: [],
};

it('verify getOptions selector', () => {
  expect(getOptions(TEST_STATE)).toBeDefined();
});
