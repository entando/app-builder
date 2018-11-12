import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import NotificationList from 'ui/activity-stream/NotificationList';
import { NOTIFICATIONS } from 'test/mocks/activityStream';


const NOTIFICATION_LIST_MOCK = (
  <NotificationList
    notifications={NOTIFICATIONS}
    onClickUsername={() => jest.fn()}
    onClickTargetName={() => jest.fn()}
    onClickLike={() => jest.fn()}
    onClickDeleteComment={() => jest.fn()}
    onSubmitComment={() => jest.fn()}
  />
);

let component;
describe('NotificationList', () => {
  beforeEach(() => {
    component = shallow(NOTIFICATION_LIST_MOCK);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
});
