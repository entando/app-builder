import { DATA_MODELS, ERROR } from 'test/mocks/dataModels';
import throttle from 'util/throttle';


const getDataModels = type => (
  new Promise((resolve, reject) => {
    if (type.error) {
      throttle(() => resolve(DATA_MODELS.payload));
    } else {
      reject(ERROR);
    }
  })
);

export default getDataModels;
