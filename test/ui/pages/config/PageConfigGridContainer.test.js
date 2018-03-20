
import { mapStateToProps } from 'ui/pages/config/PageConfigGridContainer';


jest.mock('state/page-config/selectors', () => ({
  getPageConfigCellMap: jest.fn().mockReturnValue('getPageConfigCellMap_result'),
}));


describe('PageConfigGridContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({});
    });

    it('maps prop "cellMap" with getPageConfigCellMap(state)', () => {
      expect(props.cellMap).toBe('getPageConfigCellMap_result');
    });
  });
});
