import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/labels/add/AddLabelsPageContainer';
import { LANGUAGES_NORMALIZED } from 'test/mocks/languages';
import { getActiveLanguages, getDefaultLanguage } from 'state/languages/selectors';
import { getLocale } from 'state/locale/selectors';
import { fetchLanguages } from 'state/languages/actions';
import { createLabel } from 'state/labels/actions';


const dispatchMock = jest.fn();
const TEST_STATE = {
  languages: { ...LANGUAGES_NORMALIZED },
};

jest.mock('state/languages/actions', () => ({
  fetchLanguages: jest.fn(),
  deactivateLanguage: jest.fn(),
}));


describe('LanguageFormContainer', () => {
  it('maps languages property state in AddLabelsForm', () => {
    expect(mapStateToProps(TEST_STATE))
      .toHaveProperty('locale', getLocale(TEST_STATE));
    expect(mapStateToProps(TEST_STATE))
      .toHaveProperty('languages', getActiveLanguages(TEST_STATE));
    expect(mapStateToProps(TEST_STATE))
      .toHaveProperty('defaultLanguage', getDefaultLanguage(TEST_STATE));
  });
});

const LABEL_KEY = 'TEST LABELS';
const LABEL_MOCK = {
  key: LABEL_KEY,
  titles: {
    it: 'test it',
    en: 'test en',
  },
};

jest.mock('state/labels/actions', () => ({
  createLabel: jest.fn(),
}));


describe('mapDispatchToProps', () => {
  let props;
  beforeEach(() => {
    props = mapDispatchToProps(dispatchMock);
  });

  it('should map the correct function properties', () => {
    expect(props.onWillMount).toBeDefined();
    expect(props.onSubmit).toBeDefined();
  });

  it('should dispatch an action if onWillMount is called', () => {
    props.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
    expect(fetchLanguages).toHaveBeenCalled();
  });

  it('should dispatch an action if onSubmit is called', () => {
    props.onSubmit(LABEL_MOCK);
    expect(dispatchMock).toHaveBeenCalled();
    expect(createLabel).toHaveBeenCalledWith(LABEL_MOCK);
  });
});
