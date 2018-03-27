import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/login/LoginFormContainer';

// Using real react component and not LoginFormContainer in __mocks__/ui/login
jest.unmock('ui/login/LoginFormContainer');

const TEST_STATE = {
  loginForm: { loginErrorMessage: 'test' },
  locale: 'en',
};

// declare a mock empty function
const dispatchMock = jest.fn();


it('maps login error message property with state.form.loginErrorMessage', () => {
  const mappedProps = mapStateToProps(TEST_STATE);
  expect(mappedProps).toHaveProperty('loginErrorMessage', 'test');
  expect(mappedProps).toHaveProperty('currentLanguage', 'en');
});


it('verify that performLogin is defined from mapDispatchToProps', () => {
  const result = mapDispatchToProps(dispatchMock);
  expect(result.performLogin).toBeDefined();
  expect(result.setLanguage).toBeDefined();
});

it('verify that performLogin is called from mapDispatchToProps', () => {
  const result = mapDispatchToProps(dispatchMock);
  result.performLogin('gianni', 'moi');
  expect(dispatchMock).toHaveBeenCalled();
  result.setLanguage('it');
  expect(dispatchMock).toHaveBeenCalled();
});
