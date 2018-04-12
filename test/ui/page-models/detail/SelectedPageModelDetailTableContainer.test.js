import 'test/enzyme-init';

import
SelectedPageModelDetailTableContainer,
{ mapDispatchToProps, mapStateToProps } from 'ui/page-models/detail/SelectedPageModelDetailTableContainer';
import { getSelectedPageModel, getSelectedPageModelCellMap } from 'state/page-models/selectors';
import { getLoading } from 'state/loading/selectors';
import { loadSelectedPageModel } from 'state/page-models/actions';
import { PAYLOAD, CELL_MAP } from 'test/mocks/page-models/singleCell';

const dispatchMock = jest.fn();
const LOAD_SELECTED_PAGE_MODEL_ACTION = {
  type: 'load-selected-page-model',
};

jest.mock('state/page-models/selectors', () =>
  jest.genMockFromModule('state/page-models/selectors'));

jest.mock('state/page-models/actions', () =>
  jest.genMockFromModule('state/page-models/actions'));

jest.mock('state/loading/selectors', () =>
  jest.genMockFromModule('state/loading/selectors'));


describe('SelectedPageModelDetailTableContainer', () => {
  it('has the right display name', () => {
    expect(SelectedPageModelDetailTableContainer)
      .toHaveProperty('displayName', 'SelectedPageModelDetailTableContainer');
  });

  let props;
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      loadSelectedPageModel.mockReturnValue(LOAD_SELECTED_PAGE_MODEL_ACTION);
      props = mapDispatchToProps(dispatchMock);
    });

    it('should dispatch an action if onWillMount is called', () => {
      expect(props.onWillMount).toBeInstanceOf(Function);
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalledWith(LOAD_SELECTED_PAGE_MODEL_ACTION);
      expect(loadSelectedPageModel).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      getLoading.mockReturnValue({});
      getSelectedPageModel.mockReturnValue(PAYLOAD);
      getSelectedPageModelCellMap.mockReturnValue(CELL_MAP);
      props = mapStateToProps();
    });

    it('maps prop cellMap', () => {
      expect(CELL_MAP).toBeDefined();
      expect(props).toHaveProperty('cellMap', CELL_MAP);
    });

    it('maps prop pageModel', () => {
      expect(PAYLOAD).toBeDefined();
      expect(props).toHaveProperty('pageModel', PAYLOAD);
    });

    it('maps prop loading', () => {
      expect(props).toHaveProperty('loading', false);
    });
  });
});
