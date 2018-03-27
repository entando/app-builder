import { SET_VISIBLE_MODAL, SET_INFO } from 'state/modal/types';

export const setVisibleModal = visibleModal => ({
  type: SET_VISIBLE_MODAL,
  payload: {
    visibleModal,
  },
});

export const setInfo = info => ({
  type: SET_INFO,
  payload: {
    info,
  },
});

export default setVisibleModal;
