import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import NotificationList from 'ui/activity-stream/NotificationList';


const NOTIFICATION_LIST_MOCK = (
  <NotificationList
    notifications={[]}
    onClickUsername={() => jest.fn()}
    onClickTargetName={() => jest.fn()}
    onClickLike={() => jest.fn()}
  />
);

let component;
describe('NotifcationList', () => {
  beforeEach(() => {
    component = shallow(NOTIFICATION_LIST_MOCK);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
