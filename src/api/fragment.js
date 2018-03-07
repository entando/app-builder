import { BODY_OK, BODY_ERROR, WIDGET_TYPES_PAYLOAD, PLUGINS_PAYLOAD } from 'test/mocks/fragment';

const throttle = (func) => {
  setTimeout(func, (Math.floor(Math.random() * 700) + 300));
};

export const getFragment = fragmentCode => new Promise((resolve, reject) => {
  if (fragmentCode) {
    resolve(BODY_OK);
  } else {
    reject(BODY_ERROR);
  }
});

export const getWidgetTypes = () => new Promise((resolve) => {
  throttle(resolve(WIDGET_TYPES_PAYLOAD));
});

export const getPlugins = () => new Promise((resolve) => {
  throttle(resolve(PLUGINS_PAYLOAD));
});
