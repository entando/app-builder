import 'test/enzyme-init';

import { mapDispatchToProps, mapStateToProps } from 'ui/groups/detail/GroupDetailTabPagesContainer';

const dispatchMock = jest.fn();

jest.mock('state/groups/selectors', () => ({
  getPageReferences: jest.fn().mockReturnValue('getPageReferences_result'),
}));

jest.mock('state/pagination/selectors', () => ({
  getCurrentPage: jest.fn().mockReturnValue('getCurrentPage_result'),
  getTotalItems: jest.fn().mockReturnValue('getTotalItems_result'),
  getPageSize: jest.fn().mockReturnValue('getPageSize_result'),
}));

jest.mock('state/groups/actions', () => ({
  fetchReferences: jest.fn().mockReturnValue('fetchReferences_result'),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn().mockReturnValue({ references: false }),
}));

describe('GroupDetailTabPagesContainer', () => {
  let props;
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalledWith('fetchReferences_result');
    });
  });

  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = mapStateToProps({});
    });

    it('verify props are defined and properly valued', () => {
      expect(props).toHaveProperty('pageReferences', 'getPageReferences_result');
      expect(props).toHaveProperty('loading', false);
      expect(props).toHaveProperty('page', 'getCurrentPage_result');
      expect(props).toHaveProperty('totalItems', 'getTotalItems_result');
      expect(props).toHaveProperty('pageSize', 'getPageSize_result');
    });
  });
});
