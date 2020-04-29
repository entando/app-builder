import 'test/enzyme-init';

import { getInfo } from 'state/modal/selectors';
import { mapStateToProps, mapDispatchToProps } from 'ui/page-templates/common/PageTemplateDeleteModalContainer';
import { MODAL_INFO } from 'test/mocks/modal';

const dispatchMock = jest.fn();

jest.mock('state/modal/selectors', () => ({
  getInfo: jest.fn(),
}));


describe('PageTemplateDeleteModalContainer', () => {
  describe('mapStateToProps', () => {
    beforeEach(() => {
      getInfo.mockReturnValue(MODAL_INFO);
    });

    it('maps info property from state', () => {
      expect(mapStateToProps())
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
