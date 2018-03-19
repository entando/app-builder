import {
  GET_FRAGMENT_OK,
  LIST_FRAGMENTS_OK_PAGE_1,
  LIST_FRAGMENTS_OK_PAGE_2,
  LIST_FRAGMENTS_OK_PAGE_3,
  BODY_ERROR, WIDGET_TYPES_OK,
  PLUGINS_OK,
} from 'test/mocks/fragments';

import { throttle } from 'util';

export const getFragment = fragmentCode => new Promise((resolve, reject) => {
  if (fragmentCode === GET_FRAGMENT_OK.payload.code) {
    resolve(GET_FRAGMENT_OK);
  } else {
    reject(BODY_ERROR);
  }
});

// will call http://confluence.entando.org/display/E5/Fragments+List
// e.g. /fragments?filters[0][attribute]=code&filters[0][operator]=eq
//      &filters[0][value]=fragment_code
export const getFragments = (page = 1, params) => new Promise((resolve) => {
  if (params) {
    // eslint-disable-next-line no-console
    console.info(`calling API /fragments${params}`);
  }
  switch (page) {
    case 1:
      resolve(LIST_FRAGMENTS_OK_PAGE_1);
      break;
    case 2:
      resolve(LIST_FRAGMENTS_OK_PAGE_2);
      break;
    case 3:
      resolve(LIST_FRAGMENTS_OK_PAGE_3);
      break;
    default:
      resolve(LIST_FRAGMENTS_OK_PAGE_1);
  }
});

export const getWidgetTypes = () => new Promise((resolve) => {
  throttle(resolve(WIDGET_TYPES_OK));
});

export const getPlugins = () => new Promise((resolve) => {
  throttle(resolve(PLUGINS_OK));
});
