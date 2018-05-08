import { mapStateToProps, mapDispatchToProps } from 'ui/labels/list/LabelsTabsContainer';

jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn().mockReturnValue('getActiveLanguages_result'),
}));

jest.mock('state/labels/selectors', () => ({
  getLabelsList: jest.fn().mockReturnValue('getLabelsList_result'),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn().mockReturnValue({ systemLabels: false }),
}));

jest.mock('state/labels/actions', () => ({
  removeLabel: jest.fn().mockReturnValue('removeLabel_result'),
}));

const dispatchMock = jest.fn();
const TEST_STATE = {
  languages: {},
  labels: {},
};

describe('LabelsTabsContainer', () => {
  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(TEST_STATE);
    });

    it('maps correct property state in LabelsTabsContainer', () => {
      expect(props).toHaveProperty('languages', 'getActiveLanguages_result');
      expect(props).toHaveProperty('labels', 'getLabelsList_result');
      expect(props).toHaveProperty('loading', false);
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should dispatch "removeLabel" action if "onClickDeleteLabel" is called', () => {
      expect(props.onClickDeleteLabel).toBeDefined();
      props.onClickDeleteLabel();
      expect(dispatchMock).toHaveBeenCalledWith('removeLabel_result');
    });
  });
});
