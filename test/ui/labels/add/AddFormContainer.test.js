import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/labels/add/AddFormContainer';

const dispatchMock = jest.fn();
const TEST_STATE = {
  languages: {},
  labels: {},
};

jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn().mockReturnValue('getActiveLanguages_result'),
  getDefaultLanguage: jest.fn().mockReturnValue('getDefaultLanguage_result'),
}));

jest.mock('state/languages/actions', () => ({
  fetchLanguages: jest.fn().mockReturnValue('fetchLanguages_result'),
}));

jest.mock('state/labels/actions', () => ({
  createLabel: jest.fn().mockReturnValue('createLabel_result'),
}));

jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));

describe('AddFormContainer', () => {
  let props;
  beforeEach(() => {
    props = mapStateToProps(TEST_STATE);
  });

  it('maps languages property state in LabelsForm', () => {
    expect(props).toHaveProperty('locale', 'en');
    expect(props).toHaveProperty('languages', 'getActiveLanguages_result');
    expect(props).toHaveProperty('defaultLanguage', 'getDefaultLanguage_result');
  });
});

describe('mapDispatchToProps', () => {
  let props;
  beforeEach(() => {
    props = mapDispatchToProps(dispatchMock);
  });

  it('maps the "onWillMount" prop a fetchLanguages dispatch', () => {
    expect(props.onWillMount).toBeDefined();
    props.onWillMount();
    expect(dispatchMock).toHaveBeenCalledWith('fetchLanguages_result');
  });

  it('should dispatch an action if onSubmit is called', () => {
    expect(props.onSubmit).toBeDefined();
    props.onSubmit();
    expect(dispatchMock).toHaveBeenCalledWith('createLabel_result');
  });
});
