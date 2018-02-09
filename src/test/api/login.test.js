
import 'test/enzyme-init';
import { login } from 'api/login';
import { BODY_OK, BODY_ERROR } from 'test/mocks/login';

jest.unmock('api/login');


it('returns a promise', () => {
  const filledInput = login('gianni', 'moi');
  expect(typeof filledInput.then === 'function').toBeDefined();
});


it('verify success login', () => {
  login('gianni', 'moi').then((response) => {
    expect(response).toEqual(BODY_OK);
  });
});

it('verify success error', () => {
  login('gianni', '').then(() => {}, (error) => {
    expect(error).toEqual(BODY_ERROR);
  });
});
