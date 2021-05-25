import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/widgets/common/WidgetFormContainer';
import { getGroupsList } from 'state/groups/selectors';


const GROUP = {
  code: '1',
  name: 'test',
};
const TEST_STATE = {
  groups: [
    GROUP,
  ],
};

jest.mock('state/groups/selectors', () => ({
  getGroupsList: jest.fn(),
}));

jest.mock('state/users/selectors', () => ({
  getSelectedUserAuthoritiesList: jest.fn().mockReturnValue([]),
}));

jest.mock('state/user-preferences/selectors', () => ({
  getUserPreferences: jest.fn().mockReturnValue({}),
}));

jest.mock('state/permissions/selectors', () => ({
  getMyGroupPermissions: jest.fn(() => ([{ group: 'free', permissions: [] }])),
}));

getGroupsList.mockReturnValue([GROUP]);


describe('WidgetFormContainer', () => {
  let props;
  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = mapStateToProps(TEST_STATE);
    });

    it('maps groups property state in WidgetForm', () => {
      expect(props).toHaveProperty('groups', [GROUP]);
      expect(props).not.toHaveProperty('languages');
    });
  });

  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(TEST_STATE, {});
    });

    it('verify that onWillMount and onSubmit is defined by mapDispatchToProps', () => {
      const dispatchMock = jest.fn();
      const result = mapDispatchToProps(dispatchMock, {});
      expect(result.onWillMount).toBeDefined();
      result.onWillMount({});
      expect(dispatchMock).toHaveBeenCalled();
      expect(result.onSubmit).toBeDefined();
    });
  });
});
