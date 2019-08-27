import { mapStateToProps } from 'ui/pages/config/PageConfigGridContainer';

jest.mock('state/page-config/selectors', () => ({
  makeGetPageConfigCellMap: jest
    .fn()
    .mockReturnValue(() => 'makeGetPageConfigCellMap_result'),
}));

const ownProps = {
  match: {
    params: {},
  },
};

describe('PageConfigGridContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({}, ownProps);
    });

    it('maps prop "cellMap" with makeGetPageConfigCellMap(state)', () => {
      expect(props.cellMap).toBe('makeGetPageConfigCellMap_result');
    });
  });
});
