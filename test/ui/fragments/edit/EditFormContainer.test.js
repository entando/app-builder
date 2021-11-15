import 'test/enzyme-init';

import { FORM_MODE_EDIT } from 'state/fragments/const';
import { getFragmentSelected } from 'state/fragments/selectors';
import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/edit/EditFormContainer';

jest.mock('state/fragments/selectors', () => ({
  getFragmentSelected: jest.fn(),
}));

const TEST_STATE = {
  initialValues: 'initialValues',
  mode: FORM_MODE_EDIT,
};

describe('EditFormContainer', () => {
  it('verify that mode is set to edit', () => {
    getFragmentSelected.mockReturnValueOnce(TEST_STATE.initialValues);
    expect(mapStateToProps()).toEqual(TEST_STATE);
  });

  it('verify that  onSubmit is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock, {});
    expect(result.onSubmit).toBeDefined();
  });
});
