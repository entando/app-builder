import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/pages/common/DeletePageModalContainer';
import { getInfo } from 'state/modal/selectors';
import { getPagesMap } from 'state/pages/selectors';
import { MODAL_INFO } from 'test/mocks/modal';

jest.mock('state/modal/selectors', () => ({
  getInfo: jest.fn(),
}));
getInfo.mockReturnValue(MODAL_INFO);

jest.mock('state/pages/selectors', () => ({
  getPagesMap: jest.fn(),
}));

getPagesMap.mockReturnValue('map');

const dispatchMock = jest.fn();

describe('DeletePageModalContainer', () => {
  let props;
  describe('mapStateToProps', () => {
    it('maps info and page property from state', () => {
      props = mapStateToProps({});
      expect(props).toHaveProperty('info', MODAL_INFO);
      expect(props).toHaveProperty('page');
    });
  });

  describe('mapDispatchToProps', () => {
    it('should map the correct function properties', () => {
      props = mapDispatchToProps(dispatchMock);
      expect(props.onConfirmDelete).toBeDefined();
      props.onConfirmDelete();
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
