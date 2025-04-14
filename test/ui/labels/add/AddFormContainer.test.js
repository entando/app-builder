import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/labels/add/AddFormContainer';

const dispatchMock = jest.fn();
const languageList = [{ code: 'a' }, { code: 'b' }];

jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn().mockReturnValue([{ code: 'a' }, { code: 'b' }]),
  getDefaultLanguage: jest.fn().mockReturnValue('getDefaultLanguage_result'),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn().mockReturnValue({
    systemLabels: 'loadingLabels_result',
    languages: 'languages_result',
  }),
}));

jest.mock('state/languages/actions', () => ({
  fetchLanguages: jest.fn().mockReturnValue('fetchLanguages_result'),
}));

jest.mock('state/labels/actions', () => ({
  createLabel: jest.fn().mockReturnValue('createLabel_result'),
}));

jest.mock('state/locale/selectors', () => ({ getLocale: jest.fn().mockReturnValue('en') }));

describe('AddFormContainer', () => {
  let props;
  beforeEach(() => {
    props = mapStateToProps({});
  });

  it('maps languages property state in LabelsForm', () => {
    expect(props).toHaveProperty('locale', 'en');
    expect(props).toHaveProperty('languages', languageList);
    expect(props).toHaveProperty('defaultLanguage', 'getDefaultLanguage_result');
  });
});

describe('mapDispatchToProps', () => {
  let props;
  beforeEach(() => {
    props = mapDispatchToProps(dispatchMock);
  });

  it('maps the "onDidMount" prop a fetchLanguages dispatch', () => {
    expect(props.onDidMount).toBeDefined();
    props.onDidMount();
    expect(dispatchMock).toHaveBeenCalledWith('fetchLanguages_result');
  });

  it('should dispatch an action if onSubmit is called', () => {
    expect(props.onSubmit).toBeDefined();
    props.onSubmit();
    expect(dispatchMock).toHaveBeenCalledWith('createLabel_result');
  });
});
