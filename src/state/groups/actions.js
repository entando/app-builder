import { initialize } from 'redux-form';

import {
  getGroups,
  postGroup,
  getGroup,
  putGroup,
  getPageReferences,
  getUserReferences,
  getWidgetTypeReferences,
  getContentReferences,
  getResourceReferences,
} from 'api/groups';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { getParams, gotoRoute } from 'frontend-common-components';

import {
  SET_GROUPS,
  SET_SELECTED_GROUP,
  SET_SELECTED_GROUP_PAGE_REFERENCES,
  SET_SELECTED_GROUP_USER_REFERENCES,
  SET_SELECTED_GROUP_WIDGETTYPE_REFERENCES,
  SET_SELECTED_GROUP_CONTENT_REFERENCES,
  SET_SELECTED_GROUP_RESOURCE_REFERENCES,
} from 'state/groups/types';

import { ROUTE_GROUP_LIST } from 'app-init/router';

export const setGroups = groups => ({
  type: SET_GROUPS,
  payload: {
    groups,
  },
});

export const setSelectedGroup = group => ({
  type: SET_SELECTED_GROUP,
  payload: {
    group,
  },
});

export const setSelectedGroupPageReferences = references => ({
  type: SET_SELECTED_GROUP_PAGE_REFERENCES,
  payload: {
    references,
  },
});

export const setSelectedGroupUserReferences = references => ({
  type: SET_SELECTED_GROUP_USER_REFERENCES,
  payload: {
    references,
  },
});

export const setSelectedGroupWidgetTypeReferences = references => ({
  type: SET_SELECTED_GROUP_WIDGETTYPE_REFERENCES,
  payload: {
    references,
  },
});

export const setSelectedGroupContentReferences = references => ({
  type: SET_SELECTED_GROUP_CONTENT_REFERENCES,
  payload: {
    references,
  },
});

export const setSelectedGroupResourceReferences = references => ({
  type: SET_SELECTED_GROUP_RESOURCE_REFERENCES,
  payload: {
    references,
  },
});


// thunk
export const fetchGroups = (page = { page: 1, pageSize: 10 }, params = '') => dispatch =>
  new Promise((resolve) => {
    getGroups(page, params).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          dispatch(setGroups(data.payload));
          dispatch(setPage(data.metaData));
          resolve();
        });
      } else {
        resolve();
      }
    });
  });

export const fetchCurrentPageGroupDetail = () => (dispatch, getState) =>
  new Promise((resolve) => {
    const { groupname } = getParams(getState());
    getGroup(groupname).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          dispatch(setSelectedGroup(json.payload));
          resolve();
        });
      } else {
        resolve();
      }
    });
  });

export const fetchGroup = groupCode => dispatch =>
  new Promise((resolve) => {
    getGroup(groupCode).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          dispatch(initialize('group', data.payload));
          resolve();
        });
      } else {
        resolve();
      }
    });
  });

export const sendPutGroup = groupData => dispatch =>
  new Promise((resolve) => {
    putGroup(groupData).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          gotoRoute(ROUTE_GROUP_LIST);
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  });

export const sendPostGroup = groupData => dispatch =>
  new Promise((resolve) => {
    postGroup(groupData).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          gotoRoute(ROUTE_GROUP_LIST);
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  });

export const fetchCurrentReferencePages =
  (page = { page: 1, pageSize: 10 }) => (dispatch, getState) =>
    new Promise((resolve) => {
      const { groupname } = getParams(getState());
      getPageReferences(page, groupname).then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            dispatch(setSelectedGroupPageReferences(json.payload));
            dispatch(setPage(json.metaData));
            resolve();
          });
        } else {
          resolve();
        }
      });
    });

export const fetchCurrentReferenceUsers =
      (page = { page: 1, pageSize: 10 }) => (dispatch, getState) =>
        new Promise((resolve) => {
          const { groupname } = getParams(getState());
          getUserReferences(page, groupname).then((response) => {
            if (response.ok) {
              response.json().then((json) => {
                dispatch(setSelectedGroupUserReferences(json.payload));
                dispatch(setPage(json.metaData));
                resolve();
              });
            } else {
              resolve();
            }
          });
        });

export const fetchCurrentReferenceWidgetTypes =
      (page = { page: 1, pageSize: 10 }) => (dispatch, getState) =>
        new Promise((resolve) => {
          const { groupname } = getParams(getState());
          getWidgetTypeReferences(page, groupname).then((response) => {
            if (response.ok) {
              response.json().then((json) => {
                dispatch(setSelectedGroupWidgetTypeReferences(json.payload));
                dispatch(setPage(json.metaData));
                resolve();
              });
            } else {
              resolve();
            }
          });
        });

export const fetchCurrentReferenceContents =
      (page = { page: 1, pageSize: 10 }) => (dispatch, getState) =>
        new Promise((resolve) => {
          const { groupname } = getParams(getState());
          getContentReferences(page, groupname).then((response) => {
            if (response.ok) {
              response.json().then((json) => {
                dispatch(setSelectedGroupContentReferences(json.payload));
                dispatch(setPage(json.metaData));
                resolve();
              });
            } else {
              resolve();
            }
          });
        });

export const fetchCurrentReferenceResources =
      (page = { page: 1, pageSize: 10 }) => (dispatch, getState) =>
        new Promise((resolve) => {
          const { groupname } = getParams(getState());
          getResourceReferences(page, groupname).then((response) => {
            if (response.ok) {
              response.json().then((json) => {
                dispatch(setSelectedGroupResourceReferences(json.payload));
                dispatch(setPage(json.metaData));
                resolve();
              });
            } else {
              resolve();
            }
          });
        });
