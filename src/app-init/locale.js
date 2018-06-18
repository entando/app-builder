import pluginArray from 'entando-plugins';

import { addLocaleData } from 'react-intl';
import enLocale from 'locales/en';
import itLocale from 'locales/it';
/* ('en' is included by default) */
import itLocaleData from 'react-intl/locale-data/it';

import { setCurrentLocale } from '@entando/utils';

import { locales as pLocales } from '@entando/pages';
import { locales as mLocales } from '@entando/menu';

addLocaleData(itLocaleData);

enLocale.messages = { ...enLocale.messages, ...pLocales.en.messages, ...mLocales.en.messages };
itLocale.messages = { ...itLocale.messages, ...pLocales.it.messages, ...mLocales.it.messages };

// enrich locales with messages coming from the plugins
pluginArray.forEach((plugin) => {
  if (!plugin.locales) {
    return;
  }
  plugin.locales.forEach((locale) => {
    if (locale.locale === 'it') {
      Object.keys(locale.messages).forEach((key) => {
        itLocale.messages[`plugin.${plugin.id}.${key}`] = locale.messages[key];
      });
    } else {
      Object.keys(locale.messages).forEach((key) => {
        enLocale.messages[`plugin.${plugin.id}.${key}`] = locale.messages[key];
      });
    }
  });
});
setCurrentLocale(enLocale);
export default enLocale;
export { itLocale, enLocale };
