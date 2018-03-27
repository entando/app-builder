import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/common/modal/GenericModalContainer';

import { MODAL_VISIBILITY, MODAL_INFO } from 'test/mocks/modal';

const TEST_STATE = {
  modal: {
    visibleModal: MODAL_VISIBILITY.visibleModal,
    info: MODAL_INFO,
  },
};

const dispatchMock = jest.fn();

describe('GenericModalContainer', () => {
  describe('mapStateToProps', () => {
    it('maps visibleModal property from state', () => {
      expect(mapStateToProps(TEST_STATE))
        .toHaveProperty('visibleModal', MODAL_VISIBILITY.visibleModal);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should map the correct function properties', () => {
      const props = mapDispatchToProps(dispatchMock);
      expect(props.onCloseModal).toBeDefined();
      props.onCloseModal();
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
