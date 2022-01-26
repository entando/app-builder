import 'test/enzyme-init';

import { FORM_MODE_CLONE } from 'state/fragments/const';
import { mapStateToProps, mapDispatchToProps } from 'ui/fragments/clone/CloneFormContainer';

const TEST_STATE = {
  initialValues: { code: '', defaultGuiCode: '', guiCode: '' },
  mode: FORM_MODE_CLONE,
  initialValues: { code: '', defaultGuiCode: '', guiCode: '' },
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
