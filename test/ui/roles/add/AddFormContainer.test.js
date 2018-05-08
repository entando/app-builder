import 'test/enzyme-init';
import { change } from 'redux-form';
import { mapStateToProps, mapDispatchToProps } from 'ui/roles/add/AddFormContainer';
import { PERMISSIONS_NORMALIZED } from 'test/mocks/permissions';

jest.mock('state/roles/actions', () => ({
  sendPostRole: jest.fn().mockReturnValue('sendPostRole_result'),
}));

jest.mock('state/permissions/actions', () => ({
  fetchPermissions: jest.fn().mockReturnValue('fetchPermissions_result'),
}));

jest.mock('state/loading/actions', () => ({
  toggleLoading: jest.fn(),
}));

describe('AddFormContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(PERMISSIONS_NORMALIZED);
    });

    it('maps permissions and loading property', () => {
      expect(props.permissions).toBeDefined();
      expect(props.permissions).toHaveLength(PERMISSIONS_NORMALIZED.permissions.list.length);
      expect(props).toHaveProperty('loading', false);
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onWillMount" prop a fetchPermissions dispatch', () => {
      expect(props.onWillMount).toBeDefined();
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalledWith('fetchPermissions_result');
    });

    it('maps the "onSubmit" prop a sendPostRole dispatch', () => {
      expect(props.onSubmit).toBeDefined();
      props.onSubmit();
      expect(dispatchMock).toHaveBeenCalledWith('sendPostRole_result');
    });

    it('verify that onChangeName is defined by mapDispatchToProps', () => {
      expect(props.onChangeName).toBeDefined();
      props.onChangeName('Role Name');
      expect(change).toHaveBeenCalledWith('role', 'code', 'role_name');
    });
  });
});
