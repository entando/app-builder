import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/pages/common/PageSettingsFormContainer';
import { FREE_PAGES_PAYLOAD as OPTIONS } from 'test/mocks/pages';

const TEST_STATE = {
  locale: 'en',
  pages: {
    map: {},
    childrenMap: {},
    titlesMap: {},
    freePages: OPTIONS,
  },
};

describe('PageSettingsFormContainer', () => {
  it('maps options property state in PageSettingsForm', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ options: OPTIONS });
  });

  it('verify that onWillMount is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
  });
  it('verify that onSubmit is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onSubmit).toBeDefined();
    result.onWillMount();
    result.onSubmit();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
