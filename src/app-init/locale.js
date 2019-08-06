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

// TODO enrich locales with messages coming from the plugins

setCurrentLocale(enLocale);
export default enLocale;
export { itLocale, enLocale };
