import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/activity-stream/NotificationListContainer';
import { NOTIFICATIONS } from 'test/mocks/activityStream';
import { getNotifications } from 'state/activity-stream/selectors';

import {
  getRouteUserName,
  getRouteTargetName,
  sendPostActivityStreamComment,
  sendDeleteActivityStreamComment,
  sendPostActivityStreamLike,
} from 'state/activity-stream/actions';

jest.mock('state/activity-stream/actions', () => ({
  getRouteUserName: jest.fn(),
  getRouteTargetName: jest.fn(),
  sendPostActivityStreamComment: jest.fn(),
  sendDeleteActivityStreamComment: jest.fn(),
  sendPostActivityStreamLike: jest.fn(),
}));

jest.mock('state/activity-stream/selectors', () => ({
  getNotifications: jest.fn(),

}));

getNotifications.mockReturnValue(NOTIFICATIONS);
const dispatchMock = jest.fn();

describe('NotificationListContainer', () => {
  let props;
  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = mapStateToProps({});
    });
    it('has notifcations property', () => {
      expect(props).toHaveProperty('notifications', NOTIFICATIONS);
    });
  });

  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });
    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('onClickUsername');
      expect(props).toHaveProperty('onClickTargetName');
      expect(props).toHaveProperty('onClickTargetName');
      expect(props).toHaveProperty('onClickTargetName');
      expect(props).toHaveProperty('onClickLike');
      expect(props).toHaveProperty('onSubmitComment');
      expect(props).toHaveProperty('onClickDeleteComment');
    });

    it('dispatch onClickUsername and call getRouteUserName', () => {
      props.onClickUsername();
      expect(dispatchMock).toHaveBeenCalled();
      expect(getRouteUserName).toHaveBeenCalled();
    });
    it('dispatch onClickTargetName and call getRouteTargetName', () => {
      props.onClickTargetName();
      expect(dispatchMock).toHaveBeenCalled();
      expect(getRouteTargetName).toHaveBeenCalled();
    });
    it('dispatch onClickLike and call sendPostActivityStreamLike', () => {
      props.onClickLike();
      expect(dispatchMock).toHaveBeenCalled();
      expect(sendPostActivityStreamLike).toHaveBeenCalled();
    });
    it('dispatch onSubmitComment and call sendPostActivityStreamComment', () => {
      props.onSubmitComment();
      expect(dispatchMock).toHaveBeenCalled();
      expect(sendPostActivityStreamComment).toHaveBeenCalled();
    });
    it('dispatch onClickDeleteComment and call sendDeleteActivityStreamComment', () => {
      props.onClickDeleteComment();
      expect(dispatchMock).toHaveBeenCalled();
      expect(sendDeleteActivityStreamComment).toHaveBeenCalled();
    });
  });
});
