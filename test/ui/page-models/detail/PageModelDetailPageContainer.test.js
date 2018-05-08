import 'test/enzyme-init';

import { getParams } from '@entando/router';
import
PageModelDetailPageContainer, { mapStateToProps } from 'ui/page-models/detail/PageModelDetailPageContainer';

describe('PageModelDetailPageContainer', () => {
  it('has the right display name', () => {
    expect(PageModelDetailPageContainer)
      .toHaveProperty('displayName', 'PageModelDetailPageContainer');
  });

  const PAGE_MODEL_CODE = 'PAGE_MODEL_CODE';
  let props;

  describe('mapStateToProps', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      getParams.mockReturnValue({ pageModelCode: PAGE_MODEL_CODE });
      props = mapStateToProps();
    });

    it('maps prop cellMap', () => {
      expect(props).toHaveProperty('pageModelCode', PAGE_MODEL_CODE);
    });
  });
});
