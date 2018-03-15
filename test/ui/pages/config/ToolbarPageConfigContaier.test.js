import { mapStateToProps, mapDispatchToProps } from 'ui/pages/config/ToolbarPageConfigContainer';
import { WIDGET_LIST, PAGES } from 'state/page-config/const';

jest.mock('state/page-config/selectors', () => ({
  getContent: () => ('widgets'),
  getToolbarExpanded: () => true,
}));

const TEST_STATE = {
  pageConfig: {
    content: WIDGET_LIST,
    toolbarExpanded: true,
  },
};

describe('ToolbarPageConfigContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    describe('prop onWillMount', () => {
      it('should map the correct function properties', () => {
        props.onWillMount();
        expect(props.onWillMount).toBeDefined();
      });

      it('should dispatch an action if onWillMount is called', () => {
        props.onWillMount();
        expect(dispatchMock).toHaveBeenCalled();
      });
    });

    describe('prop changeContent', () => {
      it('should map the correct function properties', () => {
        props.changeContent();
        expect(props.changeContent).toBeDefined();
      });

      it('should not dispatch an action if changeContent have parameter value widgets', () => {
        props.changeContent();
        expect(dispatchMock).not.toHaveBeenCalled();
      });

      it('should dispatch an action if changeContent have parameter value widgets', () => {
        props.changeContent(WIDGET_LIST);
        expect(dispatchMock).toHaveBeenCalled();
      });
    });

    describe('prop expandContentToolbar', () => {
      it('should map the correct function properties', () => {
        props.expandContentToolbar();
        expect(props.expandContentToolbar).toBeDefined();
      });

      it('should not dispatch an action if expandContentToolbar have parameter value pages', () => {
        props.expandContentToolbar();
        expect(dispatchMock).not.toHaveBeenCalled();
      });

      it('should dispatch an action if expandContentToolbar have parameter value pages', () => {
        props.expandContentToolbar(PAGES);
        expect(dispatchMock).toHaveBeenCalled();
      });
    });

    describe('mapStateToProps', () => {
      it('maps content and toolbarExpanded property state', () => {
        expect(mapStateToProps(TEST_STATE)).toEqual({
          content: WIDGET_LIST,
          toolbarExpanded: true,
        });
      });
    });
  });
});
