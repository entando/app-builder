import { mapStateToProps, mapDispatchToProps } from 'ui/pages/common/PageTreeContainer';
import { gotoRoute } from '@entando/router';
import { getPageTreePages } from 'state/pages/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import {
  setSelectedPage, publishSelectedPage, unpublishSelectedPage, handleExpandPage,
  setPageParent, movePageAbove, movePageBelow,
} from 'state/pages/actions';

jest.mock('state/pages/actions', () => ({
  setSelectedPage: jest.fn(),
  publishSelectedPage: jest.fn(),
  unpublishSelectedPage: jest.fn(),
  handleExpandPage: jest.fn(),
  setPageParent: jest.fn(),
  movePageAbove: jest.fn(),
  movePageBelow: jest.fn(),
}));

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn(),
  setInfo: jest.fn(),
}));

jest.mock('state/pages/selectors', () => ({
  getPageTreePages: jest.fn(),
}));

getPageTreePages.mockReturnValue('pages');

const dispatchMock = jest.fn();

describe('PageTreeContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    it('should map the correct properties', () => {
      const props = mapStateToProps({});
      expect(props).toHaveProperty('pages');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('onClickAdd');
      expect(props).toHaveProperty('onClickDelete');
      expect(props).toHaveProperty('onClickPublish');
      expect(props).toHaveProperty('onClickUnPublish');
      expect(props).toHaveProperty('onDropIntoPage');
      expect(props).toHaveProperty('onDropAbovePage');
      expect(props).toHaveProperty('onDropBelowPage');
      expect(props).toHaveProperty('onExpandPage');
    });

    it('should dispatch an action if onClickAdd is called', () => {
      props.onClickAdd('pagecode');
      expect(gotoRoute).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickDelete is called', () => {
      props.onClickDelete('pagecode');
      expect(setVisibleModal).toHaveBeenCalled();
      expect(setInfo).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickPublish is called', () => {
      props.onClickPublish({ code: 'code', status: 'publish' });
      expect(setSelectedPage).toHaveBeenCalled();
      expect(publishSelectedPage).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickUnPublish is called', () => {
      props.onClickUnPublish({ code: 'code', status: 'unpublish' });
      expect(setSelectedPage).toHaveBeenCalled();
      expect(unpublishSelectedPage).toHaveBeenCalled();
    });

    it('should dispatch an action if onExpandPage is called', () => {
      props.onExpandPage('pagecode');
      expect(handleExpandPage).toHaveBeenCalled();
    });

    it('should dispatch an action if onDropIntoPage is called', () => {
      props.onDropIntoPage('a', 'b');
      expect(setPageParent).toHaveBeenCalled();
    });

    it('should dispatch an action if onDropAbovePage is called', () => {
      props.onDropAbovePage('a', 'b');
      expect(movePageAbove).toHaveBeenCalled();
    });

    it('should dispatch an action if onDropBelowPage is called', () => {
      props.onDropBelowPage('a', 'b');
      expect(movePageBelow).toHaveBeenCalled();
    });
  });
});
