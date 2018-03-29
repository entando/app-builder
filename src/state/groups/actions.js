import { initialize } from 'redux-form';

import {
  getGroups,
  postGroup,
  getGroup,
  putGroup,
  deleteGroup,
  getPageReferences,
  getUserReferences,
  getWidgetTypeReferences,
  getContentReferences,
  getResourceReferences,
} from 'api/groups';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { toggleLoading } from 'state/loading/actions';
import { getParams, gotoRoute } from 'frontend-common-components';

import {
  SET_GROUPS,
  SET_SELECTED_GROUP,
  SET_SELECTED_GROUP_PAGE_REFERENCES,
  SET_SELECTED_GROUP_USER_REFERENCES,
  SET_SELECTED_GROUP_WIDGETTYPE_REFERENCES,
  SET_SELECTED_GROUP_CONTENT_REFERENCES,
  SET_SELECTED_GROUP_RESOURCE_REFERENCES,
  REMOVE_GROUP,
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

export const removeGroupSync = groupCode => ({
  type: REMOVE_GROUP,
  payload: {
    groupCode,
  },
});

// thunk

export const fetchGroups = (page = { page: 1, pageSize: 10 }, params = '') => dispatch =>
  new Promise((resolve) => {
    getGroups(page, params).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setGroups(data.payload));
          dispatch(setPage(data.metaData));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  });

export const fetchGroup = groupCode => dispatch =>
  new Promise((resolve) => {
    getGroup(groupCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(initialize('group', data.payload));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
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

export const sendDeleteGroup = groupCode => dispatch =>
  new Promise((resolve) => {
    deleteGroup(groupCode).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(removeGroupSync(groupCode));
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  });

export const fetchCurrentPageGroupDetail = () => (dispatch, getState) =>
  new Promise((resolve) => {
    const { groupname } = getParams(getState());
    getGroup(groupname).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedGroup(json.payload));
          resolve();
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  });

const fetchCurrentReference = (getApiCall, setActionCreator) =>
  (page = { page: 1, pageSize: 10 }) => (dispatch, getState) =>
    new Promise((resolve) => {
      const { groupname } = getParams(getState());
      dispatch(toggleLoading('references'));
      getApiCall(page, groupname).then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(setActionCreator(json.payload));
            dispatch(toggleLoading('references'));
            dispatch(setPage(json.metaData));
            resolve();
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
            dispatch(toggleLoading('references'));
            resolve();
          }
        });
      });
    });

export const fetchCurrentReferencePages =
  fetchCurrentReference(getPageReferences, setSelectedGroupPageReferences);

export const fetchCurrentReferenceUsers =
    fetchCurrentReference(getUserReferences, setSelectedGroupUserReferences);

export const fetchCurrentReferenceWidgetTypes =
        fetchCurrentReference(getWidgetTypeReferences, setSelectedGroupWidgetTypeReferences);

export const fetchCurrentReferenceContents =
        fetchCurrentReference(getContentReferences, setSelectedGroupContentReferences);

export const fetchCurrentReferenceResources =
        fetchCurrentReference(getResourceReferences, setSelectedGroupResourceReferences);
