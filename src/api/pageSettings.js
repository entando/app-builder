import { PAGESETTINGS, SELECTOPTIONS_OK } from 'test/mocks/pageSettings';

// eslint-disable-next-line
export const getPageSettingsListAPI = () => (
  new Promise((resolve) => {
    resolve(PAGESETTINGS);
  })
);

export const getSelectOptionsAPI = () => (
  new Promise((resolve) => {
    resolve(SELECTOPTIONS_OK);
  })
);
