import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';

import UserAuthorityPageForm, { UserAuthorityPageFormBody } from 'ui/users/authority/UserAuthorityPageForm';

const ON_WILL_MOUNT = jest.fn();
const ON_SUBMIT = jest.fn();
const HANDLE_SUBMIT = jest.fn();


describe('UserListPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<UserAuthorityPageForm />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });
});

describe('with onWillMount callback', () => {
  beforeEach(() => {
    shallow((
      <UserAuthorityPageFormBody
        onSubmit={ON_SUBMIT}
        handleSubmit={HANDLE_SUBMIT}
        onWillMount={ON_WILL_MOUNT}
      />
    ));
  });

  it('calls onWillMount', () => {
    expect(ON_WILL_MOUNT).toHaveBeenCalled();
  });
});
