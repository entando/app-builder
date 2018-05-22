import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { gotoRoute } from '@entando/router';
import { ROUTE_USER_DETAIL } from 'app-init/router';

import { mockApi } from 'test/testUtils';
import { ADD_ERRORS } from 'state/errors/types';

import {
  getActivityStream,
  postActivityStreamComment,
  deleteActivityStreamComment,
  postActivityStreamLike,
  deleteActivityStreamLike,
} from 'api/activityStream';
import {
  toggleNotificationDrawer,
  addNotifications,
  fetchNotifications,
  toggleNotificationList,
  getRouteUserName,
  getRouteTargetName,
  sendPostActivityStreamComment,
  sendDeleteActivityStreamComment,
  sendPostActivityStreamLike,
  sendDeleteActivityStreamLike,
} from 'state/activity-stream/actions';

import { NOTIFICATIONS } from 'test/mocks/activityStream';
import { TOGGLE_NOTIFICATION_DRAWER, ADD_NOTIFICATIONS, UPDATE_NOTIFCATION } from 'state/activity-stream/types';
import { getHidden, getNotifications } from 'state/activity-stream/selectors';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


jest.mock('state/activity-stream/selectors', () => ({
  getNotifications: jest.fn(),
  getHidden: jest.fn(),
}));

getNotifications.mockReturnValue(NOTIFICATIONS);

const ADD_NOTIFICATION_MOCK_INITIAL_STATE = {
  hidden: true,
};

const WIDGET_NOTIFICATION_ID = 2;
const PAGE_NOTIFICATION_ID = 1;
const DEFAULT_NOTIFICATION_ID = 0;

let store;

const wrapErrorTest = done => (actionCall, apiCall) => (...args) => {
  apiCall.mockImplementationOnce(mockApi({ errors: true }));
  store.dispatch(actionCall(...args)).then(() => {
    expect(apiCall).toHaveBeenCalled();
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toHaveProperty('type', ADD_ERRORS);
    done();
  }).catch(done.fail);
};

const wrapActionActivityStreamTest = done => (actionCall, apiCall) => (...args) => {
  store.dispatch(actionCall(...args)).then(() => {
    expect(apiCall).toHaveBeenCalled();
    const actions = store.getActions();
    expect(actions[0]).toHaveProperty('type', UPDATE_NOTIFCATION);
    expect(actions[0]).toHaveProperty('payload.notifcation', NOTIFICATIONS[0]);
    done();
  }).catch(done.fail);
};


describe('activity-stream actions', () => {
  beforeEach(() => {
    store = mockStore(ADD_NOTIFICATION_MOCK_INITIAL_STATE);
  });
  it('test toggleNotificationDrawer action', () => {
    expect(toggleNotificationDrawer()).toEqual({ type: TOGGLE_NOTIFICATION_DRAWER });
  });

  it('test addNotifications action', () => {
    store.dispatch(addNotifications(NOTIFICATIONS));
    const actions = store.getActions();
    expect(actions[0]).toHaveProperty('type', ADD_NOTIFICATIONS);
    expect(actions[0]).toHaveProperty('payload.notifications', NOTIFICATIONS);
  });

  it('test if toggleNotificationList is hidden', () => {
    getHidden.mockReturnValue(true);
    store.dispatch(toggleNotificationList());
    const actions = store.getActions();
    expect(actions[0]).toHaveProperty('type', TOGGLE_NOTIFICATION_DRAWER);
    expect(getHidden(store.getState())).toBe(true);
  });

  it('test if toggleNotificationList is visible and calls addNotification', () => {
    getHidden.mockReturnValue(false);
    store.dispatch(toggleNotificationList());
    const actions = store.getActions();
    expect(actions[0]).toHaveProperty('type', TOGGLE_NOTIFICATION_DRAWER);
    expect(getHidden(store.getState())).toBe(false);
  });
});

it('test getRouteUserName', () => {
  store.dispatch(getRouteUserName(1));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith(
    ROUTE_USER_DETAIL,
    { username: NOTIFICATIONS[0].username },
  );
});

xit('test getRouteTargetName with targetType content', () => {
  store.dispatch(getRouteTargetName(1));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith('content', { content: 'psdf', frame: 0 });
});

xit('test getRouteTargetName with targetType widget', () => {
  store.dispatch(getRouteTargetName(WIDGET_NOTIFICATION_ID));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith('widget', { widget: 'widgetId' });
});

xit('test getRouteTargetName with targetType page', () => {
  store.dispatch(getRouteTargetName(PAGE_NOTIFICATION_ID));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith('page', { page: 'testdsf' });
});

xit('test getRouteTargetName with default route', () => {
  store.dispatch(getRouteTargetName(DEFAULT_NOTIFICATION_ID));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith('dashboard');
});

describe('thunk', () => {
  beforeEach(() => {
    store = mockStore(ADD_NOTIFICATION_MOCK_INITIAL_STATE);
  });

  it('test fetchNotifications calls addNotifications', (done) => {
    store.dispatch(fetchNotifications()).then(() => {
      expect(getActivityStream).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', ADD_NOTIFICATIONS);
      expect(actions[0]).toHaveProperty('payload.notifications', NOTIFICATIONS);
      done();
    }).catch(done.fail);
  });

  it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
    wrapErrorTest(done)(fetchNotifications, getActivityStream)();
  });

  it('test sendPostActivityStreamComment calls UPDATE_NOTIFCATION_COMMENT', (done) => {
    wrapActionActivityStreamTest(done)(sendPostActivityStreamComment, postActivityStreamComment)({ recordId: 1, comment: 'test comment' });
  });

  it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
    wrapErrorTest(done)(sendPostActivityStreamComment, postActivityStreamComment)({ recordId: 1, comment: 'test comment' });
  });

  it('test sendDeleteActivityStreamComment calls UPDATE_NOTIFCATION_COMMENT', (done) => {
    wrapActionActivityStreamTest(done)(sendDeleteActivityStreamComment, deleteActivityStreamComment)({ recordId: 1, comment: 'test comment' });
  });

  it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
    wrapErrorTest(done)(sendDeleteActivityStreamComment, deleteActivityStreamComment)({ recordId: 1, comment: 'test comment' });
  });

  it('test sendPostActivityStreamLike calls UPDATE_NOTIFCATION_COMMENT', (done) => {
    wrapActionActivityStreamTest(done)(sendPostActivityStreamLike, postActivityStreamLike)(1);
  });

  it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
    wrapErrorTest(done)(sendPostActivityStreamLike, postActivityStreamLike)(1);
  });

  it('test sendDeleteActivityStreamLike calls UPDATE_NOTIFCATION_COMMENT', (done) => {
    wrapActionActivityStreamTest(done)(sendDeleteActivityStreamLike, deleteActivityStreamLike)(1);
  });

  it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
    wrapErrorTest(done)(sendDeleteActivityStreamLike, deleteActivityStreamLike)(1);
  });
});
