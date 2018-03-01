import { PAGESETTINGS } from 'test/mocks/pageSettings';

// eslint-disable-next-line
export const getPageSettingsListAPI = () => (
  new Promise((resolve) => {
    resolve(PAGESETTINGS);
  })
);

export default getPageSettingsListAPI;
