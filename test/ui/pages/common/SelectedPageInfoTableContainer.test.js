
import { mapStateToProps } from 'ui/pages/common/SelectedPageInfoTableContainer';
import { getSelectedPage } from 'state/pages/selectors';
import { HOMEPAGE_PAYLOAD } from 'test/mocks/pages';

jest.mock('state/pages/selectors', () => ({
  getSelectedPage: jest.fn(),
}));
const SELECTED_PAGE = HOMEPAGE_PAYLOAD;
getSelectedPage.mockReturnValue(SELECTED_PAGE);


describe('SelectedPageInfoTableContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    it('should map the correct properties', () => {
      const props = mapStateToProps({});
      expect(props.page).toEqual(SELECTED_PAGE);
    });
  });
});
