import 'test/enzyme-init';
import { getDataTypes } from 'api/dataTypes';
import {
  DATA_TYPES_OK_PAGE_1,
  DATA_TYPES_OK_PAGE_2,
} from 'test/mocks/dataTypes';

jest.unmock('api/dataTypes');
jest.useFakeTimers();

describe('api/dataTypes', () => {
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  describe('getDataTypes', () => {
    it('returns a promise', () => {
      const filledInput = getDataTypes();
      expect(typeof filledInput.then === 'function').toBeDefined();
    });

    it('get data type page 1 as first page', () => {
      expect(getDataTypes()).resolves.toEqual(DATA_TYPES_OK_PAGE_1);
    });

    it('get data type page 2', () => {
      expect(getDataTypes(2)).resolves.toEqual(DATA_TYPES_OK_PAGE_2);
    });

    it('get data type page 1 by default', () => {
      expect(getDataTypes('nopage')).resolves.toEqual(DATA_TYPES_OK_PAGE_1);
    });
  });
});
