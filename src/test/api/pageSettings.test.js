import 'test/enzyme-init';
import { getPageSettingsListAPI } from 'api/pageSettings';
import { getFreePages } from 'api/pages';
import { PAGE_SETTINGS } from 'test/mocks/pageSettings';
import { FREE_PAGES_PAYLOAD } from 'test/mocks/pages';

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

describe('test getFreePages API', () => {
  it('returns a promise', () => {
    const filledInput = getFreePages();
    expect(typeof filledInput.then === 'function').toBeDefined();
  });
  it('verify success groups', () => {
    getFreePages().then((response) => {
      expect(response).toEqual(FREE_PAGES_PAYLOAD);
    });
  });
});
