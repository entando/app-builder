import { PAGE_SETTINGS, SELECT_OPTIONS_OK } from 'test/mocks/pageSettings';

export const getPageSettingsListAPI = () => (
  new Promise((resolve) => {
    resolve(PAGE_SETTINGS);
  })
);

export const getSelectOptionsAPI = () => (
  new Promise((resolve) => {
    resolve(SELECT_OPTIONS_OK);
  })
);
