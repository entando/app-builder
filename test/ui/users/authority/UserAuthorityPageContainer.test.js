import 'test/enzyme-init';

import { mapStateToProps } from 'ui/users/authority/UserAuthorityPageContainer';

const ownProps = {
  match: {
    params: {
      username: 'username',
    },
  },
};

describe('UserAuthorityPageFormContainer', () => {
  it('maps params state in UserAuthorityPageContainer', () => {
    expect(mapStateToProps({}, ownProps)).toEqual({ username: 'username' });
  });
});
