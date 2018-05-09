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

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn().mockReturnValue('setVisibleModal_result'),
  setInfo: jest.fn().mockReturnValue('setInfo_result'),
}));

const dispatchMock = jest.fn();

describe('LabelsTabsContainer', () => {
  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({});
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

    it('should dispatch "setVisibleModal" and "setInfo" action if "onClickDelete" is called', () => {
      expect(props.onClickDelete).toBeDefined();
      props.onClickDelete();
      expect(dispatchMock).toHaveBeenCalledWith('setVisibleModal_result');
      expect(dispatchMock).toHaveBeenCalledWith('setInfo_result');
    });
  });
});
