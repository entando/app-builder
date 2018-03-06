import 'test/enzyme-init';
import { getApiNotifications } from 'api/notification';
import { NOTIFICATION } from 'test/mocks/notification';

jest.unmock('api/groups');


it('returns a promise', () => {
  const filledInput = getApiNotifications();
  expect(typeof filledInput.then === 'function').toBeDefined();
});


it('verify success groups', () => {
  getApiNotifications().then((response) => {
    expect(response).toEqual(NOTIFICATION);
  });
});
