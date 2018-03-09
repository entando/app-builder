import 'test/enzyme-init';

import { getDataModels, getDataModelsPaged } from 'api/dataModels';
import {
  DATA_MODELS,
  DATA_MODELS_P1,
  DATA_MODELS_P2,
  DATA_MODELS_P3,
  ERROR,
} from 'test/mocks/dataModels';

jest.unmock('api/dataModels');

const PAGE_MODEL_ID = 'modelId';
const PAGE_KEY_BAD = 'Gianni';

describe('getDataModels', () => {
  it('returns a promise', () => {
    const promise = getDataModels();
    expect(typeof promise.then === 'function').toBeDefined();
  });

  it('get an error response with a not existing KEY', () => {
    getDataModels(PAGE_KEY_BAD).then(() => {}, (error) => {
      expect(error).toEqual(ERROR);
    });
  });
});

describe('getDataModelsPaged', () => {
  it('get success response', () => {
    getDataModelsPaged(PAGE_MODEL_ID).then((response) => {
      expect(response).toEqual(DATA_MODELS);
    });
  });

  it('returns a promise', () => {
    const filledInput = getDataModelsPaged(PAGE_MODEL_ID);
    expect(typeof filledInput.then === 'function').toBeDefined();
  });

  it('verifies success on loading PageModels', () => {
    getDataModels().then((response) => {
      expect(response).toEqual(DATA_MODELS_P1);
    });
  });
  it('get error response', () => {
    getDataModelsPaged().then(() => {}, (error) => {
      expect(error).toEqual(ERROR);
    });
  });
  it('get PageModels page 1 by default', () => {
    getDataModelsPaged().then((response) => {
      expect(response).toEqual(DATA_MODELS_P1);
    });
  });
  it('get PageModels page 2 by default', () => {
    getDataModelsPaged(2).then((response) => {
      expect(response).toEqual(DATA_MODELS_P2);
    });
  });
  it('get PageModels page 3 by default', () => {
    getDataModelsPaged(3).then((response) => {
      expect(response).toEqual(DATA_MODELS_P3);
    });
  });
});
