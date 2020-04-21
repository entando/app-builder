import 'test/enzyme-init';
import { mapStateToProps } from 'ui/page-templates/detail/PageTemplateDetailPageContainer';

describe('PageTemplateDetailPageContainer', () => {
  const PAGE_TEMPLATE_CODE = 'PAGE_TEMPLATE_CODE';
  const ownProps = {
    match: {
      params: {
        pageTemplateCode: PAGE_TEMPLATE_CODE,
      },
    },
  };
  let props;

  describe('mapStateToProps', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      props = mapStateToProps({}, ownProps);
    });

    it('maps prop cellMap', () => {
      expect(props).toHaveProperty('pageTemplateCode', PAGE_TEMPLATE_CODE);
    });
  });
});
