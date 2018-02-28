import { PAGESETTINGS } from 'test/mocks/pageSettings';

// eslint-disable-next-line
export const getApiPageSettingsList = () => (
  new Promise((resolve) => {
    resolve(PAGESETTINGS);
  })
);
