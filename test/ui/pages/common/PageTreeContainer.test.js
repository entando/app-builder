import { mapStateToProps, mapDispatchToProps } from 'ui/pages/common/PageTreeContainer';
import { getPageTreePages, getSearchPages } from 'state/pages/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import {
  setSelectedPage, handleExpandPage, initPageForm,
  setPageParent, movePageAbove, movePageBelow, clonePage, clearSearchPage,
} from 'state/pages/actions';
import { MODAL_ID } from 'ui/pages/common/DeletePageModal';
import { MODAL_ID as PUBLISH_MODAL_ID } from 'ui/pages/common/PublishPageModal';
import { MODAL_ID as UNPUBLISH_MODAL_ID } from 'ui/pages/common/UnpublishPageModal';
import { history } from 'app-init/router';

jest.mock('app-init/router', () => ({
  history: {
    push: jest.fn(),
  },
}));

jest.mock('state/pages/actions', () => ({
  setSelectedPage: jest.fn(),
  clonePage: jest.fn(),
  unpublishSelectedPage: jest.fn(),
  handleExpandPage: jest.fn(),
  setPageParent: jest.fn(),
  movePageAbove: jest.fn(),
  movePageBelow: jest.fn(),
  clearSearchPage: jest.fn(),
  fetchSearchPages: jest.fn(),
  initPageForm: jest.fn(),
}));

jest.mock('state/pagination/selectors', () => ({
  getCurrentPage: jest.fn(),
  getTotalItems: jest.fn(),
  getPageSize: jest.fn(),
}));

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn(),
  setInfo: jest.fn(),
}));

jest.mock('state/pages/selectors', () => ({
  getPageTreePages: jest.fn(),
  getSearchPages: jest.fn(),
}));

getPageTreePages.mockReturnValue('pages');
getSearchPages.mockReturnValue([]);

const dispatchMock = jest.fn();

describe('PageTreeContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    it('should map the correct properties', () => {
      const props = mapStateToProps({});
      expect(props).toHaveProperty('pages');
      expect(props).toHaveProperty('searchPages');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('onClickAdd');
      expect(props).toHaveProperty('onClickEdit');
      expect(props).toHaveProperty('onClickConfigure');
      expect(props).toHaveProperty('onClickDelete');
      expect(props).toHaveProperty('onClickPublish');
      expect(props).toHaveProperty('onClickUnPublish');
      expect(props).toHaveProperty('onClickDetails');
      expect(props).toHaveProperty('onClickClone');
      expect(props).toHaveProperty('onDropIntoPage');
      expect(props).toHaveProperty('onDropAbovePage');
      expect(props).toHaveProperty('onDropBelowPage');
      expect(props).toHaveProperty('onExpandPage');
    });

    it('should dispatch an action if "onClickAdd" is called', () => {
      props.onClickAdd('pagecode');
      expect(initPageForm).toHaveBeenCalled();
    });

    it('should dispatch "setSelectedPage" then use router if "onClickEdit" is called', () => {
      props.onClickEdit('pagecode');
      expect(setSelectedPage).toHaveBeenCalled();
      expect(clearSearchPage).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalled();
    });

    it('should dispatch "setSelectedPage" then use router if "onClickConfigure" is called', () => {
      props.onClickConfigure('pagecode');
      expect(setSelectedPage).toHaveBeenCalled();
      expect(clearSearchPage).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickDelete is called', () => {
      props.onClickDelete({ code: 'pagecode' });
      expect(setVisibleModal).toHaveBeenCalledWith(MODAL_ID);
      expect(setInfo).toHaveBeenCalledWith({ type: 'page', code: 'pagecode' });
    });

    it('should dispatch an action if onClickClone is called', () => {
      props.onClickClone('pagecode');
      expect(clonePage).toHaveBeenCalled();
    });

    it('should dispatch an action if onClickPublish is called', () => {
      props.onClickPublish({ code: 'pagecode', status: 'publish' });
      expect(setVisibleModal).toHaveBeenCalledWith(PUBLISH_MODAL_ID);
      expect(setInfo).toHaveBeenCalledWith({ type: 'page', code: 'pagecode' });
    });

    it('should dispatch an action if onClickUnPublish is called', () => {
      props.onClickUnPublish({ code: 'pagecode', status: 'unpublish' });
      expect(setVisibleModal).toHaveBeenCalledWith(UNPUBLISH_MODAL_ID);
      expect(setInfo).toHaveBeenCalledWith({ type: 'page', code: 'pagecode' });
    });

    it('should dispatch an action if "onClickDetails" is called', () => {
      props.onClickDetails('pagecode');
      expect(setSelectedPage).toHaveBeenCalled();
      expect(clearSearchPage).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalled();
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
