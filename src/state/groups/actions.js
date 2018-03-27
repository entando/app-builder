import { initialize } from 'redux-form';

import { getGroups, postGroup, getGroup, putGroup, deleteGroup } from 'api/groups';
import { setPage } from 'state/pagination/actions';
import { addErrors } from 'state/errors/actions';
import { gotoRoute } from 'frontend-common-components';

import { SET_GROUPS } from 'state/groups/types';
import { ROUTE_GROUP_LIST } from 'app-init/router';

export const setGroups = groups => ({
  type: SET_GROUPS,
  payload: {
    groups,
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
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          resolve();
        }
      });
    });
  });
