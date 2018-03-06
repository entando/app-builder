import 'test/enzyme-init';

import { mapDispatchToProps } from 'ui/activity-stream/ActivityStreamMenuContainer';

jest.unmock('ui/activity-stream/ActivityStreamMenuContainer');

describe('ActivityStreamMenuContainer', () => {
  it('verifies that onClickToggle is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onClickToggle).toBeDefined();
  });

  it('verify that onClickToggle call dispatch', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    result.onClickToggle();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
