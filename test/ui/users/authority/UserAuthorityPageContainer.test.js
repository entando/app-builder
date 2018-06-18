import React from 'react';
import 'test/enzyme-init';
import { getParams } from '@entando/router';

import { mapStateToProps } from 'ui/users/authority/UserAuthorityPageContainer';

const TEST_STATE = {
  router: {
    params: {
      username: 'username',
    },
  },
};

getParams.mockReturnValue({ username: 'username' });

describe('UserAuthorityPageFormContainer', () => {
  it('maps params state in UserAuthorityPageContainer', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ username: 'username' });
  });
});
