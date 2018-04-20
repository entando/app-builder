import 'test/enzyme-init';
import { getRolesList } from 'state/roles/selectors';
import { getLoading } from 'state/loading/selectors';
import { toggleLoading } from 'state/loading/actions';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { mapStateToProps, mapDispatchToProps } from 'ui/roles/list/RoleListTableContainer';
import { LIST_ROLES_OK, ROLES_NORMALIZED } from 'test/mocks/roles';
import { MODAL_ID } from 'ui/roles/common/DeleteRoleModal';

const dispatchMock = jest.fn();

jest.mock('state/roles/selectors', () => ({
  getRolesList: jest.fn(),
}));

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn(),
  setInfo: jest.fn(),
}));

jest.mock('state/loading/actions', () => ({
  toggleLoading: jest.fn(),
}));

getRolesList.mockReturnValue(LIST_ROLES_OK);

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

getLoading.mockReturnValue(false);

describe('RoleListTableContainer', () => {
  it('maps roles list property state in RolesListTable', () => {
    expect(mapStateToProps(ROLES_NORMALIZED)).toEqual({
      roles: LIST_ROLES_OK,
      page: ROLES_NORMALIZED.pagination.page,
      totalItems: ROLES_NORMALIZED.pagination.totalItems,
      pageSize: ROLES_NORMALIZED.pagination.pageSize,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('should map the correct function properties', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(toggleLoading).toHaveBeenCalledWith('roles');
    });

    it('should dispatch an action if onClickDelete is called', () => {
      expect(props.onClickDelete).toBeDefined();
      props.onClickDelete('role_code');
      expect(dispatchMock).toHaveBeenCalled();
      expect(setVisibleModal).toHaveBeenCalledWith(MODAL_ID);
      expect(setInfo).toHaveBeenCalledWith({ type: 'role', code: 'role_code' });
    });
  });
});
