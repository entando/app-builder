import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/clone/CloneFragmentPageContainer';
import { FORM_MODE_CLONE } from 'state/fragments/const';
import { GET_FRAGMENT_OK } from 'test/mocks/fragments';

const TEST_STATE = {
  mode: FORM_MODE_CLONE,
  fragmentForm: GET_FRAGMENT_OK.payload,
};

const ownProps = {
  match: {
    params: {
      fragmentCode: 'code',
    },
  },
};

const dispatchMock = jest.fn();

describe('CloneFragmentPageContainer', () => {
  it('maps fragmentCode property state in CloneFragmentPage', () => {
    expect(mapStateToProps(TEST_STATE, ownProps)).toEqual({ fragmentCode: 'code' });
  });

  it('verify that onWillMount and toBeDefined is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount({ fragmentCode: 'code' });
    expect(dispatchMock).toHaveBeenCalled();
  });
});
