import { formValueSelector } from 'redux-form';
import { mapStateToProps, mapDispatchToProps } from 'ui/users/restrictions/RestrictionsFormContainer';

const dispatchMock = jest.fn();

jest.unmock('react-intl');

jest.mock('redux-form', () => ({
  formValueSelector: jest.fn(() => jest.fn(() => false)),
  reduxForm: jest.fn(() => jest.fn(ui => ui)),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn().mockReturnValue({}),
}));

describe('RestrictionsFormContainer', () => {
  it('maps passwordActive', () => {
    expect(mapStateToProps({})).toEqual({
      passwordActive: false,
    });
    expect(formValueSelector).toHaveBeenCalledWith('user-restrictions');
  });

  it('verify that onWillMount is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('verify that onSubmit is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onSubmit).toBeDefined();
    result.onSubmit({});
    expect(dispatchMock).toHaveBeenCalled();
  });
});
