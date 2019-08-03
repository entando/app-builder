import { getReferencesFromSelectedPage } from 'state/pages/selectors';
import { loadSelectedPage, setReferenceSelectedPage } from 'state/pages/actions';
import { mapStateToProps, mapDispatchToProps } from 'ui/pages/detail/PagesDetailPageContainer';

jest.mock('state/pages/selectors', () => ({
  getReferencesFromSelectedPage: jest.fn(),
}));
getReferencesFromSelectedPage.mockReturnValue([]);

jest.mock('state/pages/actions', () => ({
  loadSelectedPage: jest.fn(() => Promise.resolve({})),
  setReferenceSelectedPage: jest.fn(() => Promise.resolve({})),
}));

const ownProps = {
  match: {
    params: {
      pageCode: 'pageCode',
    },
  },
};

describe('ui/pages/detail/PagesDetailPageContainer', () => {
  let props;
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = mapStateToProps({}, ownProps);
    });
    it('maps the properties', () => {
      expect(props).toHaveProperty('pageCode');
      expect(props).toHaveProperty('references');
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn(args => args);
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('maps the properties', () => {
      expect(props).toHaveProperty('onWillMount');
    });
    it('call onWillMount dispatch loadSelectedPage and setReferenceSelectedPage ', (done) => {
      const PAGE_CODE = { pageCode: 'pageCode' };
      props.onWillMount(PAGE_CODE).then(() => {
        expect(loadSelectedPage).toHaveBeenCalledWith(PAGE_CODE.pageCode);
        expect(setReferenceSelectedPage).toHaveBeenCalled();
        done();
      });
    });
  });
});
