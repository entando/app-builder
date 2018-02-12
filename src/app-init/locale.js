import pluginArray from 'entando-plugins';

import { addLocaleData } from 'react-intl';
import enLocale from 'locales/en';
import itLocale from 'locales/it';
/* ('en' is included by default) */
import itLocaleData from 'react-intl/locale-data/it';

import { locales, setCurrentLocale } from 'frontend-common-components';

addLocaleData(itLocaleData);

enLocale.messages = { ...enLocale.messages, ...locales.en.messages };
itLocale.messages = { ...itLocale.messages, ...locales.it.messages };

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


// FIXME this will be handled with user selection (and maybe localStorage)
const i18nConfig = window.location.href.match('lang=ita') ? itLocale : enLocale;
setCurrentLocale(i18nConfig);

export default i18nConfig;
