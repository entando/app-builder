import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/roles/detail/UserRefsTableContainer';
import { getLoading } from 'state/loading/selectors';

jest.mock('state/roles/actions', () => ({
  fetchUserRefs: jest.fn().mockReturnValue('fetchUserRefs_result'),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

getLoading.mockReturnValue(false);

jest.mock('state/roles/selectors', () => ({
  getUserRefs: jest.fn().mockReturnValue('getUserRefs_result'),
}));

const ownProps = {
  match: {
    params: {
      roleCode: 'role_code',
    },
  },
};

describe('UserRefsTableContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({}, ownProps);
    });

    it('maps the properties', () => {
      expect(props).toHaveProperty('userReferences', 'getUserRefs_result');
      expect(props).toHaveProperty('roleCode', 'role_code');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onWillMount" prop a fetchUserRefs dispatch', () => {
      expect(props.onWillMount).toBeDefined();
      props.onWillMount('role_code');
      expect(dispatchMock).toHaveBeenCalledWith('fetchUserRefs_result');
    });
  });
});
