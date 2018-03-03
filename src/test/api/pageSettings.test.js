import 'test/enzyme-init';
import { getPageSettingsListAPI, getSelectOptionsAPI } from 'api/pageSettings';
import { PAGE_SETTINGS, SELECT_OPTIONS_OK } from 'test/mocks/pageSettings';

jest.unmock('api/pageSettings');

describe('test pageSettings API', () => {
  it('returns a promise', () => {
    const filledInput = getPageSettingsListAPI();
    expect(typeof filledInput.then === 'function').toBeDefined();
  });
  it('verify success page settings', () => {
    getPageSettingsListAPI().then((response) => {
      expect(response).toEqual(PAGE_SETTINGS);
    });
  });
});

describe('test getSelectOptions API', () => {
  it('returns a promise', () => {
    const filledInput = getSelectOptionsAPI();
    expect(typeof filledInput.then === 'function').toBeDefined();
  });
  it('verify success groups', () => {
    getSelectOptionsAPI().then((response) => {
      expect(response).toEqual(SELECT_OPTIONS_OK);
    });
  });
});
