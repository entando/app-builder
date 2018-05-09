import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/labels/edit/EditFormContainer';
import { getParams } from '@entando/router';

const dispatchMock = jest.fn();
getParams.mockReturnValue({ labelCode: 'getParams_result' });

jest.mock('state/languages/selectors', () => ({
  getActiveLanguages: jest.fn().mockReturnValue('getActiveLanguages_result'),
  getDefaultLanguage: jest.fn().mockReturnValue('getDefaultLanguage_result'),
}));

jest.mock('state/languages/actions', () => ({
  fetchLanguages: jest.fn().mockReturnValue('fetchLanguages_result'),
}));

jest.mock('state/labels/actions', () => ({
  fetchLabel: jest.fn().mockReturnValue('fetchLabel_result'),
  updateLabel: jest.fn().mockReturnValue('updateLabel_result'),
}));

jest.mock('state/locale/selectors', () => ({ getLocale: () => ('en') }));

describe('EditFormContainer', () => {
  let props;
  beforeEach(() => {
    props = mapStateToProps({});
  });

  it('maps languages property state in LabelsForm', () => {
    expect(props).toHaveProperty('mode', 'edit');
    expect(props).toHaveProperty('locale', 'en');
    expect(props).toHaveProperty('languages', 'getActiveLanguages_result');
    expect(props).toHaveProperty('defaultLanguage', 'getDefaultLanguage_result');
    expect(props).toHaveProperty('labelCode', 'getParams_result');
  });
});

describe('mapDispatchToProps', () => {
  let props;
  beforeEach(() => {
    props = mapDispatchToProps(dispatchMock);
  });

  it('maps the "onWillMount" prop a "fetchLanguages" and "fetchLabel" dispatch', () => {
    expect(props.onWillMount).toBeDefined();
    props.onWillMount();
    expect(dispatchMock).toHaveBeenCalledWith('fetchLanguages_result');
    expect(dispatchMock).toHaveBeenCalledWith('fetchLabel_result');
  });

  it('should dispatch "updateLabel" action if onSubmit is called', () => {
    expect(props.onSubmit).toBeDefined();
    props.onSubmit();
    expect(dispatchMock).toHaveBeenCalledWith('updateLabel_result');
  });
});
