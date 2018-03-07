import 'test/enzyme-init';

import { getDataModels } from 'api/dataModels';
import { DATA_MODELS } from 'test/mocks/dataModels';

jest.unmock('api/dataModels');

it('returns a promise', () => {
  const promise = getDataModels();
  expect(typeof promise.then === 'function').toBeDefined();
});
it('verifies success on loading PageModels', () => {
  getDataModels().then((response) => {
    expect(response).toEqual(DATA_MODELS);
  });
});
