import 'test/enzyme-init';

import { getDataModels } from 'api/dataModels';
import {
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

describe('getDataModels', () => {
  it('get success response', () => {
    getDataModels(PAGE_MODEL_ID).then((response) => {
      expect(response).toEqual(DATA_MODELS_P1);
    });
  });

  it('returns a promise', () => {
    const filledInput = getDataModels(PAGE_MODEL_ID);
    expect(typeof filledInput.then === 'function').toBeDefined();
  });

  it('verifies success on loading PageModels', () => {
    getDataModels().then((response) => {
      expect(response).toEqual(DATA_MODELS_P1);
    });
  });
  it('get error response', () => {
    getDataModels().then(() => {}, (error) => {
      expect(error).toEqual(ERROR);
    });
  });
  it('get PageModels page 1 by default', () => {
    getDataModels().then((response) => {
      expect(response).toEqual(DATA_MODELS_P1);
    });
  });
  it('get PageModels page 2 by default', () => {
    getDataModels(2).then((response) => {
      expect(response).toEqual(DATA_MODELS_P2);
    });
  });
  it('get PageModels page 3 by default', () => {
    getDataModels(3).then((response) => {
      expect(response).toEqual(DATA_MODELS_P3);
    });
  });
});
