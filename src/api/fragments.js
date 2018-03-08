import {
  GET_FRAGMENT_OK,
  LIST_FRAGMENTS_OK_PAGE_1,
  LIST_FRAGMENTS_OK_PAGE_2,
  LIST_FRAGMENTS_OK_PAGE_3,
  BODY_ERROR, WIDGET_TYPES_OK,
  PLUGINS_OK,
} from 'test/mocks/fragments';

import { throttle } from 'util';

const WIDGET_TYPES_PAYLOAD = WIDGET_TYPES_OK.payload;
const PLUGINS_PAYLOAD = PLUGINS_OK.payload;

export const getFragment = fragmentCode => new Promise((resolve, reject) => {
  if (fragmentCode === GET_FRAGMENT_OK.payload.code) {
    resolve(GET_FRAGMENT_OK);
  } else {
    reject(BODY_ERROR);
  }
});

export const getFragments = (page = 1, params) => new Promise((resolve) => {
  console.log(params);
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
  throttle(resolve(WIDGET_TYPES_PAYLOAD));
});

export const getPlugins = () => new Promise((resolve) => {
  throttle(resolve(PLUGINS_PAYLOAD));
});
