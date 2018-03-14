import {
  DATA_MODELS_P1,
  DATA_MODELS_P2,
  DATA_MODELS_P3,

} from 'test/mocks/dataModels';

export const getDataModelsPaged = (page = 1, params) =>
  new Promise((resolve) => {
    if (params) {
      console.info(`calling API /dataModels${params}`);
    }
    switch (page) {
      case 1:
        resolve(DATA_MODELS_P1);
        break;
      case 2:
        resolve(DATA_MODELS_P2);
        break;
      case 3:
        resolve(DATA_MODELS_P3);
        break;
      default:
        resolve(DATA_MODELS_P1);
    }
  });

export default getDataModelsPaged;
