import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/data-types/attributes/DeleteAttributeModalContainer';

import { MODAL_VISIBILITY, MODAL_INFO } from 'test/mocks/modal';

const TEST_STATE = {
  modal: {
    visibleModal: MODAL_VISIBILITY.visibleModal,
    info: MODAL_INFO,
  },
};

const dispatchMock = jest.fn();

describe('DeleteAttributeModalContainer', () => {
  describe('mapStateToProps', () => {
    it('maps info property from state', () => {
      expect(mapStateToProps(TEST_STATE))
        .toHaveProperty('info', MODAL_INFO);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should map the correct function properties', () => {
      const props = mapDispatchToProps(dispatchMock);
      expect(props.onConfirmDelete).toBeDefined();
      props.onConfirmDelete();
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
