import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/labels/edit/EditFormContainer';

const dispatchMock = jest.fn();
const languageList = [{ code: 'a' }, { code: 'b' }];

jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn().mockReturnValue([{ code: 'a' }, { code: 'b' }]),
  getDefaultLanguage: jest.fn().mockReturnValue('getDefaultLanguage_result'),
}));

jest.mock('state/languages/actions', () => ({
  fetchLanguages: jest.fn().mockReturnValue('fetchLanguages_result'),
}));

jest.mock('state/labels/actions', () => ({
  fetchLabel: jest.fn().mockReturnValue('fetchLabel_result'),
  updateLabel: jest.fn().mockReturnValue('updateLabel_result'),
}));

jest.mock('state/labels/selectors', () => ({
  getSelectedLabel: jest.fn().mockReturnValue({
    key: 'MOMO',
    titles: {
      a: 'momo a',
      b: 'momo b',
    },
  }),
}));

jest.mock('state/locale/selectors', () => ({ getLocale: jest.fn().mockReturnValue('en') }));

const ownProps = {
  match: {
    params: {
      labelCode: 'getParams_result',
    },
  },
};

describe('EditFormContainer', () => {
  let props;
  beforeEach(() => {
    props = mapStateToProps({}, ownProps);
  });

  it('maps languages property state in LabelsForm', () => {
    expect(props).toHaveProperty('mode', 'edit');
    expect(props).toHaveProperty('locale', 'en');
    expect(props).toHaveProperty('languages', languageList);
    expect(props).toHaveProperty('defaultLanguage', 'getDefaultLanguage_result');
    expect(props).toHaveProperty('labelCode', 'getParams_result');
  });
});

describe('mapDispatchToProps', () => {
  let props;
  beforeEach(() => {
    props = mapDispatchToProps(dispatchMock);
  });

  it('maps the "onDidMount" prop a "fetchLanguages" and "fetchLabel" dispatch', () => {
    expect(props.onDidMount).toBeDefined();
    props.onDidMount();
    expect(dispatchMock).toHaveBeenCalledWith('fetchLanguages_result');
    expect(dispatchMock).toHaveBeenCalledWith('fetchLabel_result');
  });

  it('should dispatch "updateLabel" action if onSubmit is called', () => {
    expect(props.onSubmit).toBeDefined();
    props.onSubmit();
    expect(dispatchMock).toHaveBeenCalledWith('updateLabel_result');
  });
});
