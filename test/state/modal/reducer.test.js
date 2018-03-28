import reducer from 'state/modal/reducer';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { getVisibleModal, getInfo } from 'state/modal/selectors';

import { MODAL_INFO, MODAL_VISIBILITY } from 'test/mocks/modal';

describe('state/modal/reducer', () => {
  const state = reducer();

  describe('default state', () => {
    it('should be an array', () => {
      expect(state).toBeDefined();
    });
  });

  it('should return an object', () => {
    expect(typeof state).toBe('object');
  });

  describe('after action SET_VISIBLE_MODAL', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setVisibleModal(MODAL_VISIBILITY));
    });

    it('should define the modal payload', () => {
      expect(getVisibleModal({ modal: newState })).toHaveProperty('visibleModal', 'modalId');
    });
  });

  describe('after action SET_INFO', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setInfo(MODAL_INFO));
    });

    it('should define the modal payload', () => {
      expect(getInfo({ modal: newState })).toHaveProperty('code', 'entity_code');
    });
  });
});
