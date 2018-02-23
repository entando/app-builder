import 'test/enzyme-init';
import { getApiGroups } from 'api/groups';
import { GROUPS } from 'test/mocks/groups';

jest.unmock('api/groups');


it('returns a promise', () => {
  const filledInput = getApiGroups();
  expect(typeof filledInput.then === 'function').toBeDefined();
});


it('verify success groups', () => {
  getApiGroups().then((response) => {
    expect(response).toEqual(GROUPS);
  });
});
