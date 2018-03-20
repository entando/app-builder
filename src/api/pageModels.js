import throttle from 'util/throttle';

import {
  GET_LIST_RESPONSE, COMPLEX_RESPONSE, SINGLE_CELL_RESPONSE, SIDEBAR_HOLES_RESPONSE,
  OVERLAPPING_FRAMES_RESPONSE, MISSING_SKETCH_RESPONSE,
} from 'test/mocks/pageModels';


export const getPageModels = () => (
  new Promise((resolve) => {
    throttle(() => {
      resolve(GET_LIST_RESPONSE.payload);
    });
  })
);

const pageModelMap = {
  [COMPLEX_RESPONSE.payload.code]: COMPLEX_RESPONSE,
  [SINGLE_CELL_RESPONSE.payload.code]: SINGLE_CELL_RESPONSE,
  [SIDEBAR_HOLES_RESPONSE.payload.code]: SIDEBAR_HOLES_RESPONSE,
  [OVERLAPPING_FRAMES_RESPONSE.payload.code]: OVERLAPPING_FRAMES_RESPONSE,
  [MISSING_SKETCH_RESPONSE.payload.code]: MISSING_SKETCH_RESPONSE,
};

export const getPageModel = code => (
  // call GET /pagemodels/<code>
  new Promise((resolve) => {
    const response = pageModelMap[code];
    throttle(() => {
      if (response) {
        resolve(response);
      } else {
        resolve({
          errors: [{
            code: 1,
            message: `Page model "${code}" not found`,
          }],
        });
      }
    });
  })
);
