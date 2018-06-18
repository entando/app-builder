import React from 'react';
import 'test/enzyme-init';
import { getParams } from '@entando/router';

import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/edit/EditFragmentPageContainer';
import { GET_FRAGMENT_OK } from 'test/mocks/fragments';

const TEST_STATE = {
  router: {
    params: {
      fragmentCode: 'code',
    },
  },
  mode: 'edit',
  fragmentForm: GET_FRAGMENT_OK.payload,
};

getParams.mockReturnValue({ fragmentCode: 'code' });

const dispatchMock = jest.fn();

describe('EditFragmentPageContainer', () => {
  it('maps fragmentCode property state in EditFragmentPage', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ fragmentCode: 'code' });
  });

  it('verify that onWillMount and toBeDefined is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount({ fragmentCode: 'code' });
    expect(dispatchMock).toHaveBeenCalled();
  });
});
