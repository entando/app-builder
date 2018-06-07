import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { ToastNotificationList } from 'patternfly-react';

import Toasts from 'ui/app/Toasts';

const component = shallow(<Toasts onDismiss={() => {}} />);


describe('Toasts', () => {
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify it is a ToastNotificationList', () => {
    expect(component.type()).toBe(ToastNotificationList);
  });
});
