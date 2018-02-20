
import { getLoginErrorMessage } from 'state/login-form/selectors';

const TEST_STATE = {
  form: { loginErrorMessage: 'ERROR' },
};

it('verify getLoginErrorMessage selector', () => {
  expect(getLoginErrorMessage(TEST_STATE)).toBeDefined();
});
