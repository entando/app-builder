import { mapStateToProps, mapDispatchToProps } from 'ui/users/my-profile/AccountFormContainer';

jest.unmock('redux-form');

const dispatchMock = jest.fn();

describe('AccountFormContainer', () => {
  it('maps username', () => {
    expect(mapStateToProps({
      currentUser: { username: 'admin' },
    })).toEqual({
      username: 'admin',
    });
  });

  beforeEach(() => {
    dispatchMock.mockClear();
  });

  it('verify that mapDispatchToProps result has onSubmit', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onSubmit).toBeDefined();
    result.onSubmit({});
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('verify that mapDispatchToProps result has onEdit', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onEdit).toBeDefined();
    result.onEdit();
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('verify that mapDispatchToProps result has onModalFormSubmit', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onModalFormSubmit).toBeDefined();
    result.onModalFormSubmit();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
