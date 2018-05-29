
import { mapDispatchToProps } from 'ui/pages/add/PagesAddPageContainer';


jest.mock('state/groups/actions', () => ({
  fetchGroups: jest.fn().mockReturnValue('fetchGroups_result'),
}));
jest.mock('state/page-models/actions', () => ({
  fetchPageModels: jest.fn().mockReturnValue('fetchPageModels_result'),
}));
jest.mock('state/pages/actions', () => ({
  handleExpandPage: jest.fn().mockReturnValue('handleExpandPage_result'),
  clearTree: jest.fn().mockReturnValue('clearTree_result'),
}));


describe('PagesAddPageContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    describe('prop onWillMount', () => {
      beforeEach(() => {
        props.onWillMount();
      });

      it('dispatch clearTree', () => {
        expect(dispatchMock).toHaveBeenCalledWith('clearTree_result');
      });

      it('dispatch fetchGroups', () => {
        expect(dispatchMock).toHaveBeenCalledWith('fetchGroups_result');
      });

      it('dispatch fetchPageModels', () => {
        expect(dispatchMock).toHaveBeenCalledWith('fetchPageModels_result');
      });

      it('dispatch handleExpandPage', () => {
        expect(dispatchMock).toHaveBeenCalledWith('handleExpandPage_result');
      });
    });
  });
});
