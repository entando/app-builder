
import { MODAL_VISIBILITY, MODAL_INFO } from 'test/mocks/modal';

import {
  getModal,
  getVisibleModal,
  getInfo,
} from 'state/modal/selectors';


const TEST_STATE = {
  modal: {
    info: MODAL_INFO,
    visibleModal: MODAL_VISIBILITY.visibleModal,
  },
};

describe('state/modal/selectors', () => {
  it('getModal(state) returns the modal object', () => {
    const selected = getModal(TEST_STATE);
    expect(selected).toEqual(TEST_STATE.modal);
  });

  it('verify getVisibleModal selector', () => {
    const selected = getVisibleModal(TEST_STATE);
    expect(selected).toEqual('modalId');
  });

  it('verify getInfo selector', () => {
    const selected = getInfo(TEST_STATE);
    expect(selected).toHaveProperty('code', 'entity_code');
  });
});
