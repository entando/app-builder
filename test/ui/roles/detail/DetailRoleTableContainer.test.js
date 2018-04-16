import 'test/enzyme-init';
import { getParams } from 'frontend-common-components';
import { mapStateToProps, mapDispatchToProps } from 'ui/roles/detail/DetailRoleTableContainer';
import { getLoading } from 'state/loading/selectors';

const TEST_STATE = { roleCode: 'role_code' };

getParams.mockReturnValue(TEST_STATE);

jest.mock('state/roles/actions', () => ({
  fetchRoleDetail: jest.fn().mockReturnValue('fetchRoleDetail_result'),
}));

jest.mock('state/permissions/actions', () => ({
  fetchPermissions: jest.fn().mockReturnValue('fetchPermissions_result'),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

getLoading.mockReturnValue(false);
getParams.mockReturnValue({ roleCode: 'role_code' });

jest.mock('state/roles/selectors', () => ({
  getSelectedRole: jest.fn().mockReturnValue('getSelectedRole_result'),
}));

describe('DetailRoleTableContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({});
    });

    it('maps the properties', () => {
      expect(props).toHaveProperty('role', 'getSelectedRole_result');
      expect(props).toHaveProperty('roleCode', 'role_code');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onWillMount" prop a fetchPermissions dispatch', () => {
      expect(props.onWillMount).toBeDefined();
      props.onWillMount('role_code');
      expect(dispatchMock).toHaveBeenCalledWith('fetchPermissions_result');
      expect(dispatchMock).toHaveBeenCalledWith('fetchRoleDetail_result');
    });
  });
});
