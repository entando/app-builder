import 'test/enzyme-init';

import { FORM_MODE_EDIT } from 'state/fragments/const';
import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/edit/EditFormContainer';

const TEST_STATE = {
  mode: FORM_MODE_EDIT,
};

describe('EditFormContainer', () => {
  it('verify that mode is set to edit', () => {
    expect(mapStateToProps()).toEqual(TEST_STATE);
  });

  it('verify that  onSubmit is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock, {});
    expect(result.onSubmit).toBeDefined();
  });
});
