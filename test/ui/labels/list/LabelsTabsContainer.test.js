
import { mapStateToProps, mapDispatchToProps } from 'ui/labels/list/LabelsTabsContainer';

import { getLanguagesList } from 'state/languages/selectors';
import { getLabelsList } from 'state/labels/selectors';

import { LANGUAGES_LIST } from 'test/mocks/languages';
import { LABELS_LIST } from 'test/mocks/labels';

jest.mock('state/languages/selectors', () => ({
  getLanguagesList: jest.fn(),
}));

jest.mock('state/labels/selectors', () => ({
  getLabelsList: jest.fn(),
}));

const dispatchMock = jest.fn();

describe('LabelsTabsContainer', () => {
  beforeEach(jest.clearAllMocks);

  describe('mapStateToProps', () => {
    let props;

    beforeEach(() => {
      getLanguagesList.mockReturnValue(LANGUAGES_LIST);
      getLabelsList.mockReturnValue(LABELS_LIST);
      props = mapStateToProps({});
    });

    it('should map the correct languages prop', () => {
      expect(props.languages).toEqual(LANGUAGES_LIST);
    });

    it('should map the correct labels prop', () => {
      expect(props.labels).toEqual(LABELS_LIST);
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onClickDeleteLabel).toBeDefined();
      expect(props.onClickEditLabel).toBeDefined();
    });

    it('should dispatch an action if onClickDeleteLabel is called', () => {
      props.onClickDeleteLabel('');
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should call console.log (TO BE FIXED) if onClickEditLabel is called', () => {
      global.console.log = jest.fn();
      props.onClickEditLabel('');
      expect(console.log).toHaveBeenCalled();
    });
  });
});
