import { DATA_TYPES, ERROR } from 'test/mocks/dataTypes';
import throttle from 'util/throttle';


export const getDataTypes = type => (
  new Promise((resolve, reject) => {
    if (type.errors) {
      throttle(() => resolve(DATA_TYPES.payload));
    } else {
      reject(ERROR);
    }
  })
);

export default getDataTypes;
