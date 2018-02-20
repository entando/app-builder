import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import NotificationList from 'ui/activity-stream/NotificationList';


const NOTIFICATION_LIST_MOCK = (
  <NotificationList
    notifications={[{
      id: 3,
      author: {
        username: 'Admin',
        fullName: 'Gianni Moi',
      },
      notification: {
        it: 'ha creato una pagina',
        en: 'created a page',
      },
      targetType: 'content',
      target: {
        name: 'Page',
        pageCode: 'psdf',
        frame: 0,
      },
      modificationDate: '2017-08-02 12:02:34',
      like: 0,
    }]}
    onClickUsername={() => jest.fn()}
    onClickTargetName={() => jest.fn()}
    onClickLike={() => jest.fn()}
  />
);

let component;
describe('ui/activity-stream/NotifcationList', () => {
  beforeEach(() => {
    component = shallow(NOTIFICATION_LIST_MOCK);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
