import React from 'react';
import 'test/enzyme-init';

import { shallow } from 'enzyme';
import { UserAuthorityPageFormBody } from 'ui/users/common/UserAuthorityPageForm';

const props = {
  handleSubmit: jest.fn(),
  onSubmit: jest.fn(),
  onWillMount: jest.fn(),
};

describe('UserAuthorityPageForm', () => {
  let component;
  beforeEach(() => {
    component = shallow(<UserAuthorityPageFormBody {...props} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
});

describe('with onWillMount callback', () => {
  beforeEach(() => {
    shallow((
      <UserAuthorityPageFormBody {...props} />
    ));
  });

  it('calls onWillMount', () => {
    expect(props.onWillMount).toHaveBeenCalled();
  });
});
