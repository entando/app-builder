import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/roles/edit/EditFormContainer';
import { fetchRole } from 'state/roles/actions';
import { PERMISSIONS_NORMALIZED } from 'test/mocks/permissions';

jest.mock('state/roles/actions', () => ({
  sendPutRole: jest.fn().mockReturnValue('sendPutRole_result'),
  fetchRole: jest.fn(),
}));

jest.mock('state/permissions/actions', () => ({
  fetchPermissions: jest.fn().mockReturnValue('fetchPermissions_result'),
}));

jest.mock('state/loading/actions', () => ({
  toggleLoading: jest.fn(),
}));

const ownProps = {
  match: {
    params: {
      roleCode: 'role_code',
    },
  },
};

const dispatchProps = {
  history: {},
};

describe('EditFormContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(PERMISSIONS_NORMALIZED, ownProps);
    });

    it('maps the permissions property', () => {
      expect(props).toHaveProperty('mode', 'edit');
      expect(props).toHaveProperty('permissions');
      expect(props.permissions).toHaveLength(PERMISSIONS_NORMALIZED.permissions.list.length);
      expect(props).toHaveProperty('roleCode', 'role_code');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock, dispatchProps);
    });

    it('maps the "onWillMount" prop a fetchPermissions dispatch', () => {
      expect(props.onWillMount).toBeDefined();
      props.onWillMount('role_code');
      expect(dispatchMock).toHaveBeenCalledWith('fetchPermissions_result');
      expect(fetchRole).toHaveBeenCalled();
    });

    it('maps the "onSubmit" prop a sendPostRole dispatch', () => {
      expect(props.onSubmit).toBeDefined();
      props.onSubmit();
      expect(dispatchMock).toHaveBeenCalledWith('sendPutRole_result');
    });
  });
});
