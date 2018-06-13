import React from 'react';
import 'test/enzyme-init';
import { getParams } from '@entando/router';

import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/detail/DetailFragmentPageContainer';
import { GET_FRAGMENT_OK } from 'test/mocks/fragments';

const TEST_STATE = {
  fragments: {
    selected: GET_FRAGMENT_OK.payload,
  },
};


const dispatchMock = jest.fn();

getParams.mockReturnValue({ fragmentCode: 'code' });

jest.mock('frontend-common-components', () => ({
  BreadcrumbItem: () => (<span />),
}));


describe('DetailFragmentPageContainer', () => {
  it('maps groups and mode property state in DetailFragmentPage', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ code: 'code', fragment: GET_FRAGMENT_OK.payload });
  });


  it('verify that onWillMount is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount('code');
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('verify that handleEdit is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.handleEdit).toBeDefined();
    result.handleEdit();
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('verify that referencesFragments is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.referencesFragments).toBeDefined();
    result.referencesFragments();
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('verify that referencesPageModels is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.referencesPageModels).toBeDefined();
    result.referencesPageModels();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
