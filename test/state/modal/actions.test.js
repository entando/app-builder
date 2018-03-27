import { setVisibleModal, setInfo } from 'state/modal/actions';
import { SET_VISIBLE_MODAL, SET_INFO } from 'state/modal/types';
import { MODAL_INFO, MODAL_VISIBILITY } from 'test/mocks/modal';

describe('state/modal/actions', () => {
  describe('setVisibleModal', () => {
    it('test setVisibleModal action sets the correct type', () => {
      const action = setVisibleModal('modalId');
      expect(action).toHaveProperty('type', SET_VISIBLE_MODAL);
      expect(action).toHaveProperty('payload', MODAL_VISIBILITY);
    });
  });
  describe('setInfo', () => {
    it('test setInfo action sets the correct type', () => {
      const action = setInfo({ code: 'entity_code' });
      expect(action).toHaveProperty('type', SET_INFO);
      expect(action).toHaveProperty('payload', { info: MODAL_INFO });
    });
  });
});
