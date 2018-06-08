import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { gotoRoute } from '@entando/router';
import { ADD_ERRORS } from '@entando/messages';

import { mockApi } from 'test/testUtils';
import { TOGGLE_LOADING } from 'state/loading/types';
import { ROUTE_HOME, ROUTE_PAGE_EDIT, ROUTE_USER_DETAIL } from 'app-init/router';

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

const ADD_NOTIFICATION_MOCK_INITIAL_STATE = {
  hidden: true,
};

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
  getNotifications.mockReturnValueOnce(NOTIFICATIONS);
  store.dispatch(getRouteUserName(1));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith(
    ROUTE_USER_DETAIL,
    { username: NOTIFICATIONS[0].username },
  );
});

it('test getRouteTargetName with ROUTE_PAGE_EDIT route', () => {
  getNotifications.mockReturnValueOnce(NOTIFICATIONS);
  store.dispatch(getRouteTargetName(1));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith(ROUTE_PAGE_EDIT, { pageCode: 'page' });
});

it('test getRouteTargetName with default route ROUTE_HOME', () => {
  getNotifications.mockReturnValueOnce([...NOTIFICATIONS], NOTIFICATIONS[0].namespace = 'api/content');
  store.dispatch(getRouteTargetName(1));
  expect(gotoRoute).toHaveBeenCalled();
  expect(gotoRoute).toHaveBeenCalledWith(ROUTE_HOME);
});

describe('thunk', () => {
  beforeEach(() => {
    store = mockStore(ADD_NOTIFICATION_MOCK_INITIAL_STATE);
  });

  it('test fetchNotifications calls addNotifications', (done) => {
    store.dispatch(fetchNotifications()).then(() => {
      expect(getActivityStream).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', ADD_NOTIFICATIONS);
      expect(actions[1]).toHaveProperty('payload.notifications', NOTIFICATIONS);
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
  });

  it('if API response is not ok, dispatch ADD_ERRORS', (done) => {
    getActivityStream.mockImplementationOnce(mockApi({ errors: true }));
    store.dispatch(fetchNotifications()).then(() => {
      expect(getActivityStream).toHaveBeenCalled();
      const actions = store.getActions();
      expect(actions).toHaveLength(3);
      expect(actions[0]).toHaveProperty('type', TOGGLE_LOADING);
      expect(actions[1]).toHaveProperty('type', ADD_ERRORS);
      expect(actions[2]).toHaveProperty('type', TOGGLE_LOADING);
      done();
    }).catch(done.fail);
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
