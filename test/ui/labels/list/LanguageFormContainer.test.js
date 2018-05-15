import 'test/enzyme-init';

import { setVisibleModal, setInfo } from 'state/modal/actions';
import { mapStateToProps, mapDispatchToProps } from 'ui/labels/list/LanguageFormContainer';

const dispatchMock = jest.fn();
const TEST_LANG = { language: 'test' };

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn(),
  setInfo: jest.fn(),
}));

jest.mock('state/languages/actions', () => ({
  activateLanguage: jest.fn().mockReturnValue('activateLanguage_result'),
  deactivateLanguage: jest.fn().mockReturnValue('deactivateLanguage_result'),
}));

jest.mock('state/languages/selectors', () => ({
  getLanguagesOptions: jest.fn().mockReturnValue('getLanguagesOptions_result'),
  getActiveLanguages: jest.fn().mockReturnValue('getActiveLanguages_result'),
  getDefaultLanguage: jest.fn().mockReturnValue('getDefaultLanguage_result'),
}));


describe('LanguageFormContainer', () => {
  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({});
    });

    it('maps languages property state in LanguageForm', () => {
      expect(props).toHaveProperty('languages', 'getLanguagesOptions_result');
      expect(props).toHaveProperty('activeLanguages', 'getActiveLanguages_result');
      expect(props).toHaveProperty('defaultLanguage', 'getDefaultLanguage_result');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onSubmit).toBeDefined();
      expect(props.onDeactivateLang).toBeDefined();
    });

    it('should dispatch "activateLanguage" action if "onSubmit" is called', () => {
      props.onSubmit(TEST_LANG);
      expect(dispatchMock).toHaveBeenCalledWith('activateLanguage_result');
    });

    it('should dispatch "deactivateLanguage" action if "onDeactivateLang" is called', () => {
      props.onDeactivateLang();
      expect(dispatchMock).toHaveBeenCalled();
      expect(setVisibleModal).toHaveBeenCalled();
      expect(setInfo).toHaveBeenCalled();
    });
  });
});
