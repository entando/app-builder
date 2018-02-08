
import 'test/enzyme-init';
import { login } from 'api/login';

it('returns a promise', () => {
  const filledInput = login('gianni', 'moi');
  expect(typeof filledInput.then === 'function').toBeDefined();
});
