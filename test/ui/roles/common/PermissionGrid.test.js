import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PermissionGrid from 'ui/roles/common/PermissionGrid';
import { LIST_PERMISSIONS_OK } from 'test/mocks/permissions';

describe('PermissionGrid', () => {
  describe('with permissions array not empty', () => {
    let permissionGrid;
    beforeEach(() => {
      permissionGrid = shallow(<PermissionGrid permissions={LIST_PERMISSIONS_OK} />);
    });

    it('root component renders without crashing', () => {
      expect(permissionGrid.exists()).toEqual(true);
    });

    it('renderds correct number of permission field', () => {
      const permissionFields = permissionGrid.find('Field');
      expect(permissionFields).toHaveLength(LIST_PERMISSIONS_OK.length);
    });
  });

  describe('with permissions array empty', () => {
    let permissionGrid;
    beforeEach(() => {
      permissionGrid = shallow(<PermissionGrid />);
    });

    it('renderds an Alert', () => {
      expect(permissionGrid.find('Alert')).toHaveLength(1);
    });
  });
});
