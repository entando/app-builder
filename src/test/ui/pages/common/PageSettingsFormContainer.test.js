import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/pages/common/PageSettingsFormContainer';
import { SELECT_OPTIONS_OK } from 'test/mocks/pageSettings';

const OPTIONS = SELECT_OPTIONS_OK.payload;
const TEST_STATE = {
  options: OPTIONS,
};


describe('PageSettingsFormContainer', () => {
  it('maps options property state in PageSettingsForm', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ options: OPTIONS });
  });

  it('verify that onWillMount and onSubmit is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    expect(result.onSubmit).toBeDefined();
    result.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
    result.onSubmit();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
