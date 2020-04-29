import 'test/enzyme-init';

import
SelectedPageTemplateDetailTableContainer,
{ mapDispatchToProps, mapStateToProps } from 'ui/page-templates/detail/SelectedPageTemplateDetailTableContainer';
import { getSelectedPageTemplate, getSelectedPageTemplateCellMap } from 'state/page-templates/selectors';
import { getLoading } from 'state/loading/selectors';
import { loadSelectedPageTemplate } from 'state/page-templates/actions';
import { PAYLOAD, CELL_MAP } from 'test/mocks/page-templates/singleCell';

const dispatchMock = jest.fn();
const LOAD_SELECTED_PAGE_TEMPLATE_ACTION = {
  type: 'load-selected-page-template',
};

jest.mock('state/page-templates/selectors', () =>
  jest.genMockFromModule('state/page-templates/selectors'));

jest.mock('state/page-templates/actions', () =>
  jest.genMockFromModule('state/page-templates/actions'));

jest.mock('state/loading/selectors', () =>
  jest.genMockFromModule('state/loading/selectors'));

const ownProps = {
  match: {
    params: {
      pageTemplateCode: 'pageTemplateCode',
    },
  },
};

describe('SelectedPageTemplateDetailTableContainer', () => {
  let props;
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      loadSelectedPageTemplate.mockReturnValue(LOAD_SELECTED_PAGE_TEMPLATE_ACTION);
      props = mapDispatchToProps(dispatchMock, ownProps);
    });

    it('should dispatch an action if onWillMount is called', () => {
      expect(props.onWillMount).toBeInstanceOf(Function);
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalledWith(LOAD_SELECTED_PAGE_TEMPLATE_ACTION);
      expect(loadSelectedPageTemplate).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      getLoading.mockReturnValue({});
      getSelectedPageTemplate.mockReturnValue(PAYLOAD);
      getSelectedPageTemplateCellMap.mockReturnValue(CELL_MAP);
      props = mapStateToProps();
    });

    it('maps prop cellMap', () => {
      expect(CELL_MAP).toBeDefined();
      expect(props).toHaveProperty('cellMap', CELL_MAP);
    });

    it('maps prop pageTemplate', () => {
      expect(PAYLOAD).toBeDefined();
      expect(props).toHaveProperty('pageTemplate', PAYLOAD);
    });

    it('maps prop loading', () => {
      expect(props).toHaveProperty('loading', false);
    });
  });
});
