import { initialize } from 'redux-form';
import { addErrors } from '@entando/messages';

import {
  getGroups,
  postGroup,
  getGroup,
  putGroup,
  deleteGroup,
  getReferences,
} from 'api/groups';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { getReferenceKeyList, getSelectedRefs } from 'state/groups/selectors';
import { getParams, gotoRoute } from '@entando/router';
import {
  SET_GROUPS,
  SET_SELECTED_GROUP,
  SET_REFERENCES,
  REMOVE_GROUP,
  SET_GROUPS_TOTAL,
} from 'state/groups/types';
import { ROUTE_GROUP_LIST } from 'app-init/router';


export const setGroups = groups => ({
  type: SET_GROUPS,
  payload: {
    groups,
  },
});

export const setGroupsTotal = groupsTotal => ({
  type: SET_GROUPS_TOTAL,
  payload: {
    groupsTotal,
  },
});

export const setSelectedGroup = group => ({
  type: SET_SELECTED_GROUP,
  payload: {
    group,
  },
});

export const removeGroupSync = groupCode => ({
  type: REMOVE_GROUP,
  payload: {
    groupCode,
  },
});

// thunk

export const fetchGroups = (page = { page: 1, pageSize: 10 }, params = '') => dispatch => new Promise((resolve) => {
  dispatch(toggleLoading('groups'));
  getGroups(page, params).then((response) => {
    response.json().then((data) => {
      if (response.ok) {
        dispatch(setGroups(data.payload));
        dispatch(toggleLoading('groups'));
        dispatch(setPage(data.metaData));
        resolve();
      } else {
        dispatch(addErrors(data.errors.map(err => err.message)));
        dispatch(toggleLoading('groups'));
        resolve();
      }
    });
  });
});

export const fetchGroupsTotal = () => dispatch => (
  new Promise((resolve) => {
    getGroups({ page: 1, pageSize: 1 }).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setGroupsTotal(data.metaData.totalItems));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);

export const fetchGroup = groupCode => dispatch => (
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
  })
);

export const sendPutGroup = groupData => dispatch => (
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
  })
);

export const sendPostGroup = groupData => dispatch => (
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
  })
);

export const sendDeleteGroup = groupCode => dispatch => (
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
  })
);

export const setReferences = references => ({
  type: SET_REFERENCES,
  payload: {
    references,
  },
});

export const fetchReferences = (referenceKey, page = { page: 1, pageSize: 10 }) =>
  (dispatch, getState) => (
    new Promise((resolve) => {
      const { groupname } = getParams(getState());
      dispatch(toggleLoading('references'));
      getReferences(page, groupname, referenceKey).then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(setReferences({
              [referenceKey]: json.payload,
            }));
            dispatch(setPage(json.metaData));
          } else {
            dispatch(addErrors(json.errors.map(err => err.message)));
          }
          dispatch(toggleLoading('references'));
          resolve();
        });
      });
    })
  );

export const fetchCurrentPageGroupDetail = () => (dispatch, getState) => (
  new Promise((resolve) => {
    const { groupname } = getParams(getState());
    getGroup(groupname).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedGroup(json.payload));
          const references = getReferenceKeyList(getState());
          references.forEach((referenceKey) => {
            if (getSelectedRefs(getState())[referenceKey]) {
              dispatch(fetchReferences(referenceKey));
            } else {
              setReferences({
                [referenceKey]: [],
              });
            }
          });
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
        }
        resolve();
      });
    });
  })
);
