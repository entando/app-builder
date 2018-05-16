import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/labels/common/DeleteLabelAndLanguagesModalContainer';
import { deactivateLanguage } from 'state/languages/actions';
import { removeLabel } from 'state/labels/actions';

const dispatchMock = jest.fn();

jest.mock('state/modal/selectors', () => ({
  getInfo: jest.fn().mockReturnValue('getInfo_result'),
}));

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn().mockReturnValue('setVisibleModal_result'),
}));

jest.mock('state/labels/actions', () => ({
  removeLabel: jest.fn(),
}));

jest.mock('state/languages/actions', () => ({
  deactivateLanguage: jest.fn(),
}));

describe('DeleteLabelAndLanguagesModalContainer', () => {
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
      expect(props.onConfirmDelete).toBeDefined();
    });

    it('should dispatch deactivateLanguage "onConfirmDelete" is called', () => {
      props.onConfirmDelete({
        type: 'language',
        langCode: 'it',
      });
      expect(dispatchMock).toHaveBeenCalled();
      expect(deactivateLanguage).toHaveBeenCalledWith('it');
    });

    it('should dispatch removeLabel "onConfirmDelete" is called', () => {
      props.onConfirmDelete({
        type: 'label',
        code: 'code',
      });
      expect(dispatchMock).toHaveBeenCalled();
      expect(removeLabel).toHaveBeenCalledWith('code');
    });
  });
});
