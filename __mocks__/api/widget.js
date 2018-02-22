import { BODY_OK, BODY_ERROR } from 'test/mocks/widget';

const widgetGET = widgetCode => new Promise((resolve, reject) => {
  if (widgetCode) {
    resolve(BODY_OK);
  } else {
    reject(BODY_ERROR);
  }
});

export default widgetGET;
