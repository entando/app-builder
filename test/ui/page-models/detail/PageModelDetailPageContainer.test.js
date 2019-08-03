import 'test/enzyme-init';
import { mapStateToProps } from 'ui/page-models/detail/PageModelDetailPageContainer';

describe('PageModelDetailPageContainer', () => {
  const PAGE_MODEL_CODE = 'PAGE_MODEL_CODE';
  const ownProps = {
    match: {
      params: {
        pageModelCode: PAGE_MODEL_CODE,
      },
    },
  };
  let props;

  describe('mapStateToProps', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      props = mapStateToProps(ownProps);
    });

    it('maps prop cellMap', () => {
      expect(props).toHaveProperty('pageModelCode', PAGE_MODEL_CODE);
    });
  });
});
