import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/activity-stream/ActivityStreamContainer';

jest.unmock('ui/activity-stream/ActivityStreamContainer');

const TEST_STATE = {
  activityStream: {
    hidden: true,
  },
};

describe('ActivityStreamContainer', () => {
  it('maps hidden property state with activistream.hidden', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ hidden: true });
  });

  it('verify that closeDrawer is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.closeDrawer).toBeDefined();
  });

  it('verify that closeDrawer call dispatch', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    result.closeDrawer();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
