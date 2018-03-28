import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/labels/list/LanguageFormContainer';
import { LANGUAGES_NORMALIZED } from 'test/mocks/languages';
import { getLanguagesOptions, getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { fetchLanguages, activateLanguage, deactivateLanguage } from 'state/languages/actions';

const dispatchMock = jest.fn();
const TEST_STATE = {
  languages: { ...LANGUAGES_NORMALIZED },
};

jest.mock('state/languages/actions', () => ({
  fetchLanguages: jest.fn(),
  activateLanguage: jest.fn(),
  deactivateLanguage: jest.fn(),
}));

describe('LanguageFormContainer', () => {
  it('maps languages property state in LanguageForm', () => {
    expect(mapStateToProps(TEST_STATE))
      .toHaveProperty('languages', getLanguagesOptions(TEST_STATE));
    expect(mapStateToProps(TEST_STATE))
      .toHaveProperty('activeLanguages', getActiveLanguages(TEST_STATE));
    expect(mapStateToProps(TEST_STATE))
      .toHaveProperty('defaultLanguage', getDefaultLanguage(TEST_STATE));
  });
});

describe('mapDispatchToProps', () => {
  let props;
  beforeEach(() => {
    props = mapDispatchToProps(dispatchMock);
  });

  it('should map the correct function properties', () => {
    expect(props.onWillMount).toBeDefined();
    expect(props.onSubmit).toBeDefined();
    expect(props.onDeactivateLang).toBeDefined();
  });

  it('should dispatch an action if onWillMount is called', () => {
    props.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
    expect(fetchLanguages).toHaveBeenCalled();
  });

  it('should dispatch an action if onSubmit is called', () => {
    props.onSubmit({ language: 'it' });
    expect(dispatchMock).toHaveBeenCalled();
    expect(activateLanguage).toHaveBeenCalledWith('it');
  });

  it('should dispatch an action if onDeactivateLang is called', () => {
    props.onDeactivateLang('en');
    expect(dispatchMock).toHaveBeenCalled();
    expect(deactivateLanguage).toHaveBeenCalledWith('en');
  });
});
