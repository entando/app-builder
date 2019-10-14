import { addLocaleData } from 'react-intl';
import enLocale from 'locales/en';
import itLocale from 'locales/it';
/* ('en' is included by default) */
import itLocaleData from 'react-intl/locale-data/it';

import { setCurrentLocale } from '@entando/utils';

import { locales as pLocales } from '@entando/pages';
import { locales as mLocales } from '@entando/menu';
import apps from 'entando-apps';

addLocaleData(itLocaleData);

enLocale.messages = { ...enLocale.messages, ...pLocales.en.messages, ...mLocales.en.messages };
itLocale.messages = { ...itLocale.messages, ...pLocales.it.messages, ...mLocales.it.messages };

enLocale.messages = apps.reduce((messages, app) => (
  {
    ...messages,
    ...app.locales.en.messages,
  }
), enLocale.messages);

itLocale.messages = apps.reduce((messages, app) => (
  {
    ...messages,
    ...app.locales.it.messages,
  }
), itLocale.messages);

setCurrentLocale(enLocale);
export default enLocale;
export { itLocale, enLocale };
