const publicUrl = process.env.PUBLIC_URL;

export const SEO_DATA_BLANK = {
  useExtraDescriptions: false,
  seoDataByLang: {},
};

export const SEO_LANGDATA_BLANK = {
  description: '',
  keywords: '',
  friendlyCode: '',
  metaTags: [],
  inheritDescriptionFromDefaultLang: false,
  inheritKeywordsFromDefaultLang: false,
  inheritFriendlyCodeFromDefaultLang: false,
};

export const PAGE_INIT_VALUES = {
  seo: false,
  displayedInMenu: true,
  charset: 'utf-8',
  contentType: 'text/html',
};

export const METATAG_TYPE_OPTIONS = [
  {
    value: 'name',
    text: 'name',
  },
  {
    value: 'http-equiv',
    text: 'http-equiv',
  },
  {
    value: 'property',
    text: 'property',
  },
];

export const TEMPLATE_THUMBNAIL = {
  '1-2-column': `${publicUrl}/images/1-2-column.svg`,
  '1-2x2-1-column': `${publicUrl}/images/1-2x2-1-column.svg`,
  '1-2x4-1-column': `${publicUrl}/images/1-2x4-1-column.svg`,
  '1-column': `${publicUrl}/images/1-column.svg`,
  custom: `${publicUrl}/images/custom-template.svg`,
};

export const NEXT_PAGE_TYPE = 'NX';
export const NEXT_PAGE_TEMPLATE = 'nx-page-template';
