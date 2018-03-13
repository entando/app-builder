import 'test/enzyme-init';
import { getDataTypes } from 'api/dataTypes';
import {
  DATA_TYPES_OK_PAGE_1,
  DATA_TYPES_OK_PAGE_2,
} from 'test/mocks/dataTypes';


jest.unmock('api/dataTypes');

describe('api/dataTypes', () => {
  describe('getDataTypes', () => {
    it('returns a promise', () => {
      const filledInput = getDataTypes();
      expect(typeof filledInput.then === 'function').toBeDefined();
    });

    it('get data type page 1 as first page', () => {
      getDataTypes().then((response) => {
        expect(response).toEqual(DATA_TYPES_OK_PAGE_1);
      });
    });

    it('get data type page 2', () => {
      getDataTypes(2).then((response) => {
        expect(response).toEqual(DATA_TYPES_OK_PAGE_2);
      });
    });

    it('get data type page 1 by default', () => {
      getDataTypes('nopage').then((response) => {
        expect(response).toEqual(DATA_TYPES_OK_PAGE_1);
      });
    });
  });
});
