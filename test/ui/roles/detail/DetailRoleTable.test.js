import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DetailRoleTable from 'ui/roles/detail/DetailRoleTable';

const onWillMount = jest.fn();
const role = {
  name: 'content Editing',
  code: 'contentEditing',
  permissions: {
    editContents: true,
    enterBackend: false,
    manageCategories: true,
    managePages: true,
    manageResources: true,
    superuser: false,
    validateContents: true,
  },
};

const rolePermissions = [
  'content Editing',
  'access To Admin',
  'manage Categories',
  'manage Pages',
];

describe('DetailRoleTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DetailRoleTable
      role={role}
      onWillMount={onWillMount}
    />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('has class DetailRole', () => {
    expect(component.hasClass('DetailRole')).toEqual(true);
  });

  describe('test detail component', () => {
    beforeEach(() => {
      component = shallow(<DetailRoleTable
        role={role}
        rolePermissions={rolePermissions}
        onWillMount={onWillMount}
      />);
    });

    it('has 4 items', () => {
      const items = component.find('.DetailRole__detail-item');
      expect(items).toHaveLength(4);
    });

    it('has permission list element', () => {
      const permissionList = component.find('.DetailRole__permission-list');
      expect(permissionList).toHaveLength(1);
      expect(permissionList.find('li')).toHaveLength(rolePermissions.length);
    });

    it('if role has no permissions, does not render the list', () => {
      component = shallow(<DetailRoleTable
        role={{ ...role, rolePermissions: [] }}
        onWillMount={onWillMount}
      />);
      const permissionList = component.find('.DetailRole__permission-list');
      expect(permissionList).toHaveLength(0);
    });
  });
});
