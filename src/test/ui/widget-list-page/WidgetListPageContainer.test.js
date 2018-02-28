import 'test/enzyme-init';
import { mapDispatchToProps } from 'ui/widget-list-page/WidgetListPageContainer';

describe('ui/widget-list-page/WidgetListPageConatiner', () => {
  const dispatchMock = jest.fn();
  it('verify that onWillMount is defined by mapDispatchToProps', () => {
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onWillMount).toBeDefined();
    result.onWillMount();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
