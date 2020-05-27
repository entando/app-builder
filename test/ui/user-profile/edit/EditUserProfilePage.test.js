import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { EditUserProfilePageBody } from 'ui/user-profile/edit/EditUserProfilePage';


describe('EditUserProfilePage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<EditUserProfilePageBody />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('has the EditUserProfilePage class', () => {
    expect(component.hasClass('EditUserProfilePage')).toBe(true);
  });

  describe('breadcrumbs', () => {
    let breadcrumb;
    beforeEach(() => {
      breadcrumb = component.find('Breadcrumb');
    });

    it('are defined', () => {
      expect(breadcrumb).toExist();
    });

    it('are 3', () => {
      expect(breadcrumb.children()).toHaveLength(3);
    });

    it('are showing the correct translated message', () => {
      const messageIds = ['menu.userManagement', 'menu.users', 'userprofile.edit'];

      breadcrumb.children().forEach((breadcrumbItem, i) => {
        const message = breadcrumbItem.children().first();
        expect(message).toExist();
        expect(message.prop('id')).toBe(messageIds[i]);
      });
    });

    it('the second is a link to the userList', () => {
      const secondItem = breadcrumb.children().at(1);
      expect(secondItem.prop('to')).toBe('/user');
    });

    it('the last item should be active', () => {
      const lastItem = breadcrumb.children().last();
      expect(lastItem.prop('active')).toBe(true);
    });
  });

  describe('page title', () => {
    let pageTitle;
    beforeEach(() => {
      pageTitle = component.find('PageTitle');
    });

    it('does exist', () => {
      expect(pageTitle).toExist();
    });

    it('has the right title text', () => {
      expect(pageTitle.prop('titleId')).toBe('app.edit');
    });

    it('has the right help text', () => {
      expect(pageTitle.prop('helpId')).toBe('user.help');
    });
  });

  it('contains EditUserProfileFormContainer', () => {
    expect(component.find('EditUserProfileFormContainer')).toExist();
  });
});
