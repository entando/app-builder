import 'test/enzyme-init';

import { FORM_MODE_CLONE, DEFAULT_FORM_VALUES } from 'state/fragments/const';
import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/clone/CloneFormContainer';

const TEST_STATE = {
  mode: FORM_MODE_CLONE,
  initialValues: DEFAULT_FORM_VALUES,
};

describe('CloneFormContainer', () => {
  it('verify that mode is set to clone', () => {
    expect(mapStateToProps()).toEqual(TEST_STATE);
  });

  it('verify that  onSubmit is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock, {});
    expect(result.onSubmit).toBeDefined();
  });
});
