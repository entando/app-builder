import reducer from 'state/mfe/reducer';

import { setMfeConfigList, addMfeConfig, updateMfeConfig } from 'state/mfe/actions';
import { LIST_MFE_RESPONSE_OK } from 'test/mocks/mfe';


const exampleMfeConfig = { id: '1' };

describe('mfe/reducer', () => {
  const state = reducer();

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action setMfeConfigList', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setMfeConfigList(LIST_MFE_RESPONSE_OK));
    });

    it('should define the selected payload', () => {
      expect(newState).toHaveProperty('mfeList', LIST_MFE_RESPONSE_OK);
    });
  });

  describe('after action addMfeConfig', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, addMfeConfig(exampleMfeConfig));
    });

    it('should define the bundles payload', () => {
      expect(newState).toHaveProperty('mfeList', [exampleMfeConfig]);
    });
  });

  describe('after action updateMfeConfig', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, updateMfeConfig(exampleMfeConfig));
    });

    it('should define the registries payload', () => {
      expect(newState).toHaveProperty('mfeList', [exampleMfeConfig]);
    });
  });

  describe('after action updateMfeConfig', () => {
    let newState;
    const existingMfe = { id: 'layout-core-bundle:app-builder-header' };
    beforeEach(() => {
      newState = reducer(state, setMfeConfigList(LIST_MFE_RESPONSE_OK));
      newState = reducer(newState, updateMfeConfig(existingMfe));
    });

    it('should define verify mfeList items and their order', () => {
      expect(newState).toHaveProperty('mfeList', [LIST_MFE_RESPONSE_OK[1], LIST_MFE_RESPONSE_OK[2], LIST_MFE_RESPONSE_OK[3], LIST_MFE_RESPONSE_OK[4],
        existingMfe]);
    });
  });
});
