import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/labels/common/DeleteLabelModalContainer';

const dispatchMock = jest.fn();

jest.mock('state/modal/selectors', () => ({
  getInfo: jest.fn().mockReturnValue('getInfo_result'),
}));

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn().mockReturnValue('setVisibleModal_result'),
}));

jest.mock('state/labels/actions', () => ({
  removeLabel: jest.fn().mockReturnValue('removeLabel_result'),
}));

describe('DeleteLabelModalContainer', () => {
  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({});
    });

    it('maps info property from state', () => {
      expect(props).toHaveProperty('info', 'getInfo_result');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('onConfirmDelete');
      props.onConfirmDelete();
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should dispatch "removeLabel" and "setVisibleModal" if "onConfirmDelete" is called', () => {
      expect(props.onConfirmDelete).toBeDefined();
      props.onConfirmDelete();
      expect(dispatchMock).toHaveBeenCalledWith('removeLabel_result');
      expect(dispatchMock).toHaveBeenCalledWith('setVisibleModal_result');
    });
  });
});
