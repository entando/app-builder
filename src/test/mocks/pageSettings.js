// eslinter-disable-next-line
export const PAGESETTINGS = {
  payload: {
    param: [{
      name: 'urlStyle',
      value: 'breadcrumbs',
    },
    {
      name: 'treeStyle_page',
      value: 'request',
    },
    {
      name: 'startLangFromBrowser',
      value: 'false',
    },
    {
      name: 'baseUrl',
      value: 'static',
    },
    {
      name: 'baseUrlContext',
      value: 'true',
    },
    {
      name: 'useJsessionId',
      value: 'false',
    }, {
      name: 'notFoundPageCode',
      value: 'notfound',
    },
    {
      name: 'homePageCode',
      value: 'homepage',
    },
    {
      name: 'errorPageCode',
      value: 'errorpage',
    },
    {
      name: 'loginPageCode',
      value: 'login',
    },
    ],
  },
  errors: [],
  metaData: {},
};
export default PAGESETTINGS;

// export const PAGESETTINGS_ERROR = {
//   payload: {},
//   errors: [
//     {
//       code: 1,
//       message: 'what went wrong',
//     },
//   ],
//   metaData: {},
// };


export const SELECTOPTIONS_OK = {
  payload: [
    {
      pageCode: 'homepage',
      shortFullTitle: 'Home',
    },
    {
      pageCode: 'service',
      shortFullTitle: '[i].. / Service',
    },
    {
      pageCode: 'notfound',
      shortFullTitle: '.. / .. / Page not found',
    },
    {
      pageCode: 'errorpage',
      shortFullTitle: '.. / .. / Error page',
    },
  ],
  errors: [],
  metaData: {},
};

export const SELECTOPTIONS_ERROR = {

  payload: {},
  errors: [
    {
      code: 1,
      message: 'what went wrong',
    },
  ],
  metaData: {},
};
