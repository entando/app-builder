import { mapStateToProps, mapDispatchToProps } from 'ui/labels/list/LabelsAndLanguagesPageContainer';

const dispatchMock = jest.fn();

jest.mock('state/pagination/selectors', () => ({
  getCurrentPage: jest.fn().mockReturnValue('getCurrentPage_result'),
  getTotalItems: jest.fn().mockReturnValue('getTotalItems_result'),
  getPageSize: jest.fn().mockReturnValue('pageSize_result'),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn().mockReturnValue({
    systemLabels: 'loadingLabels_result',
    languages: 'languages_result',
  }),
}));

jest.mock('state/labels/selectors', () => ({
  getActiveTab: jest.fn().mockReturnValue({
    activeTab: 'labels',
  }),
}));


describe('LabelsAndLanguagesPageContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({});
    });

    it('maps correct property state in LabelsTabsContainer', () => {
      expect(props).toHaveProperty('page', 'getCurrentPage_result');
      expect(props).toHaveProperty('totalItems', 'getTotalItems_result');
      expect(props).toHaveProperty('pageSize', 'pageSize_result');
      expect(props).toHaveProperty('loadingLabels', 'loadingLabels_result');
      expect(props).toHaveProperty('loadingLangs', 'languages_result');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalledTimes(2);
    });
  });
});
