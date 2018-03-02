
import {
  toggleNotificationDrawer,
  addNotifications,
  fetchNotifications,
  toggleNotificationList,
  getRouteUserName,
  getRouteTargetName,
} from 'state/activity-stream/actions';
import { NOTIFICATION } from 'test/mocks/notification';
import { TOGGLE_NOTIFICATION_DRAWER, ADD_NOTIFICATIONS } from 'state/activity-stream/types';
import { getHidden } from 'state/activity-stream/selectors';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { gotoRoute } from 'frontend-common-components';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const NOTIFICATION_PAYLOAD = NOTIFICATION.payload;

const ADD_NOTIFICATION_MOCK_INITIAL_STATE = {
  type: ADD_NOTIFICATIONS,
  payload: {
    hidden: true,
    notifications: [],
  },
};

const TOGGLE_NOTIFICATION_LIST_HIDDEN = {
  activityStream: {
    hidden: true,
  },
};

const TOGGLE_NOTIFICATION_LIST_VISIBLE = {
  activityStream: {
    hidden: false,
    notifications: [],
  },
};

const GET_ROUTE_USER_NAME = {
  activityStream: {
    hidden: true,
    notifications: NOTIFICATION_PAYLOAD.notifications,
  },
};

const GET_ROUTE_TARGET_NAME_DEFAULT_ROUTE = {
  activityStream: {
    hidden: true,
    notifications: [{
      id: 0,
      targetType: 'notarget',
    }],
  },
};

const CONTENT_NOTIFICATION_ID = 3;
const WIDGET_NOTIFICATION_ID = 2;
const PAGE_NOTIFICATION_ID = 1;
const DEFAULT_NOTIFICATION_ID = 0;

describe('activity-stream actions', () => {
  const store = mockStore(ADD_NOTIFICATION_MOCK_INITIAL_STATE);
  it('test toggleNotificationDrawer action', () => {
    expect(toggleNotificationDrawer()).toEqual({ type: TOGGLE_NOTIFICATION_DRAWER });
  });
  it('test addNotifications action', () => {
    store.dispatch(addNotifications(NOTIFICATION_PAYLOAD.notifications));
    const actions = store.getActions();
    expect(actions[0].type).toEqual(ADD_NOTIFICATIONS);
    expect(actions[0].payload.notifications).toBeDefined();
    expect(actions[0].payload).toEqual(NOTIFICATION_PAYLOAD);
  });

  it('test fetchNotifications calls addNotifications', (done) => {
    store.dispatch(fetchNotifications()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(ADD_NOTIFICATIONS);
      expect(actions[0].payload.notifications).toBeDefined();
      expect(actions[0].payload).toEqual(NOTIFICATION_PAYLOAD);
      done();
    });
  });
});

describe('activity-stream actions', () => {
  let store = mockStore(TOGGLE_NOTIFICATION_LIST_HIDDEN);
  it('test if toggleNotificationList is hidden', () => {
    store.dispatch(toggleNotificationList());
    const actions = store.getActions();
    expect(actions[0].type).toEqual(TOGGLE_NOTIFICATION_DRAWER);
    expect(getHidden(store.getState())).toEqual(true);
  });
  it('test if toggleNotificationList is visible and calls addNotification', () => {
    store = mockStore(TOGGLE_NOTIFICATION_LIST_VISIBLE);
    store.dispatch(toggleNotificationList());
    const actions = store.getActions();
    expect(actions[0].type).toEqual(TOGGLE_NOTIFICATION_DRAWER);
    expect(getHidden(store.getState())).toEqual(false);
  });
});
it('test getRouteUserName', () => {
  const store = mockStore(GET_ROUTE_USER_NAME);
  store.dispatch(getRouteUserName(CONTENT_NOTIFICATION_ID));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith('userprofile', { username: 'Admin' });
});
it('test getRouteTargetName with targetType content', () => {
  const store = mockStore(GET_ROUTE_USER_NAME);
  store.dispatch(getRouteTargetName(CONTENT_NOTIFICATION_ID));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith('content', { content: 'psdf', frame: 0 });
});
it('test getRouteTargetName with targetType widget', () => {
  const store = mockStore(GET_ROUTE_USER_NAME);
  store.dispatch(getRouteTargetName(WIDGET_NOTIFICATION_ID));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith('widget', { widget: 'widgetId' });
});
it('test getRouteTargetName with targetType page', () => {
  const store = mockStore(GET_ROUTE_USER_NAME);
  store.dispatch(getRouteTargetName(PAGE_NOTIFICATION_ID));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith('page', { page: 'testdsf' });
});
it('test getRouteTargetName with default route', () => {
  const store = mockStore(GET_ROUTE_TARGET_NAME_DEFAULT_ROUTE);
  store.dispatch(getRouteTargetName(DEFAULT_NOTIFICATION_ID));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith('dashboard');
});
