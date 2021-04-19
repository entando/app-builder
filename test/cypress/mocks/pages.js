export const PAGE_WITH_SEO_DATA = {
  code: 'page_seo',
  displayedInMenu: true,
  pageModel: '1-2-column',
  charset: 'utf-8',
  contentType: 'text/html',
  parentPage: 'My Homepage',
  seo: true,
  titles: {
    en: 'My Test Page',
    it: 'La mia Pagina di test',
  },
  ownerGroup: 'Administrators',
  joinGroups: ['free'],
  seoData: {
    useExtraDescriptions: true,
    useExtraTitles: true,
    seoDataByLang: {
      en: {
        description: 'Description test',
        keywords: 'entando',
        friendlyCode: 'test_page_eng',
        metaTags: [
          {
            key: 'author',
            type: 'name',
            value: 'entando',
            useDefaultLang: false,
          },
          {
            key: 'refresh',
            type: 'http-equiv',
            value: '120',
            useDefaultLang: false,
          },
          {
            key: 'robots',
            type: 'name',
            value: 'noindex,nofollow',
            useDefaultLang: false,
          },
        ],
        inheritDescriptionFromDefaultLang: false,
        inheritKeywordsFromDefaultLang: false,
        inheritFriendlyCodeFromDefaultLang: false,
      },
      it: {
        description: 'Descrizione test',
        keywords: 'entando',
        friendlyCode: 'test_page_ita',
        metaTags: [
          {
            key: 'author',
            type: 'name',
            value: 'entando',
            useDefaultLang: false,
          },
          {
            key: 'refresh',
            type: 'http-equiv',
            value: '120',
            useDefaultLang: false,
          },
          {
            key: 'robots',
            type: 'name',
            value: 'noindex,nofollow',
            useDefaultLang: false,
          },
        ],
        inheritDescriptionFromDefaultLang: false,
        inheritKeywordsFromDefaultLang: false,
        inheritFriendlyCodeFromDefaultLang: false,
      },
    },
  },
};
export const PAGE_WITHOUT_SEO_DATA = {
  code: 'page_no_seo',
  displayedInMenu: true,
  pageModel: '1-2-column',
  charset: 'utf-8',
  contentType: 'text/html',
  parentPage: 'My Homepage',
  seo: true,
  titles: {
    en: 'Test Page',
    it: 'Pagina di test',
  },
  ownerGroup: 'Administrators',
  joinGroups: ['free'],
};

export const PAGE_FREE_OWNER_GROUP = {
  code: 'page_free',
  displayedInMenu: true,
  pageModel: '1-2-column',
  charset: 'utf-8',
  contentType: 'text/html',
  parentPage: 'Home',
  seo: true,
  titles: {
    en: 'Page Free Owner',
    it: 'Pagina Free Owner',
  },
  ownerGroup: 'Free Access',
  joinGroups: ['free'],
};
export const PAGE_ALREADY_EXIST = {
  code: 'my_homepage',
  displayedInMenu: true,
  pageModel: '1-2-column',
  charset: 'utf-8',
  contentType: 'text/html',
  parentPage: 'Home',
  seo: true,
  titles: {
    en: 'My HomePage ',
    it: 'La mia HomePage ',
  },
  ownerGroup: 'Administrators',
  joinGroups: ['free'],
};
