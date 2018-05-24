import { mapStateToProps, mapDispatchToProps } from 'ui/users/my-profile/PasswordFormContainer';

const dispatchMock = jest.fn();

describe('PasswordFormContainer', () => {
  it('maps username', () => {
    expect(mapStateToProps({
      currentUser: { username: 'admin' },
    })).toEqual({
      username: 'admin',
    });
  });

  it('verify that onSubmit is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onSubmit).toBeDefined();
    result.onSubmit({});
    expect(dispatchMock).toHaveBeenCalled();
  });
});
