import { initialize } from 'redux-form';
import { addToast, addErrors, TOAST_ERROR } from '@entando/messages';

import {
  getGroups,
  postGroup,
  getGroup,
  putGroup,
  deleteGroup,
  getReferences,
} from 'api/groups';
import { getMyGroupPermissions } from 'api/permissions';
import { setPage } from 'state/pagination/actions';
import { toggleLoading } from 'state/loading/actions';
import { getReferenceKeyList, getSelectedRefs } from 'state/groups/selectors';
import {
  SET_GROUPS,
  SET_SELECTED_GROUP,
  SET_REFERENCES,
  REMOVE_GROUP,
  SET_GROUPS_TOTAL,
  SET_CURRENT_USER_GROUPS,
} from 'state/groups/types';
import { history, ROUTE_GROUP_LIST } from 'app-init/router';
import { FREE_ACCESS_GROUP } from './const';


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

export const setCurrentUserGroups = groups => ({
  type: SET_CURRENT_USER_GROUPS,
  payload: {
    groups,
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
        data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        dispatch(toggleLoading('groups'));
        resolve();
      }
    });
  }).catch(() => {});
});

export const fetchGroupsTotal = () => dispatch => (
  new Promise((resolve) => {
    getGroups({ page: 1, pageSize: 1 }).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          dispatch(setGroupsTotal(data.metaData.totalItems));
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
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
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    }).catch(() => {});
  })
);

export const sendPutGroup = groupData => dispatch => (
  new Promise((resolve) => {
    putGroup(groupData).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          history.push(ROUTE_GROUP_LIST);
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    }).catch(() => {});
  })
);

export const sendPostGroup = groupData => dispatch => (
  new Promise((resolve) => {
    postGroup(groupData).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          history.push(ROUTE_GROUP_LIST);
          resolve();
        } else {
          dispatch(addErrors(data.errors.map(err => err.message)));
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    }).catch(() => {});
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
          data.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          resolve();
        }
      });
    }).catch(() => {});
  })
);

export const setReferences = references => ({
  type: SET_REFERENCES,
  payload: {
    references,
  },
});

export const fetchReferences = (referenceKey, groupname, page = { page: 1, pageSize: 10 }) =>
  dispatch => (
    new Promise((resolve) => {
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
            json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
          }
          dispatch(toggleLoading('references'));
          resolve();
        });
      }).catch(() => {});
    })
  );

export const fetchCurrentPageGroupDetail = groupname => (dispatch, getState) => (
  new Promise((resolve) => {
    getGroup(groupname).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          dispatch(setSelectedGroup(json.payload));
          const references = getReferenceKeyList(getState());
          references.forEach((referenceKey) => {
            if (getSelectedRefs(getState())[referenceKey]) {
              dispatch(fetchReferences(referenceKey, groupname));
            } else {
              setReferences({
                [referenceKey]: [],
              });
            }
          });
        } else {
          dispatch(addErrors(json.errors.map(err => err.message)));
          json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
        }
        resolve();
      });
    }).catch(() => {});
  })
);

export const fetchCurrentUserGroups = () => async (dispatch) => {
  try {
    const response = await getGroups({ page: 1, pageSize: 0 });
    const json = await response.json();
    if (response.ok) {
      const groups = json.payload;
      const myGroupPermissionsResponse = await getMyGroupPermissions();
      const myGroupPermissionsJson = await myGroupPermissionsResponse.json();
      if (myGroupPermissionsResponse.ok) {
        const myGroupPermissions = myGroupPermissionsJson.payload;
        const groupsMap = groups.reduce((acc, group) => ({
          ...acc,
          [group.code]: group,
        }), {});
        const hasFreeAccessGroupPermissions = myGroupPermissions.some(({ group: groupCode }) => (
          groupCode === FREE_ACCESS_GROUP.code
        ));
        const currentUserGroups = myGroupPermissions
          .map(({ group: groupCode, permissions }) => ({
            ...groupsMap[groupCode],
            permissions,
          }));
        if (!hasFreeAccessGroupPermissions) {
          currentUserGroups.push(FREE_ACCESS_GROUP);
        }
        dispatch(setCurrentUserGroups(currentUserGroups));
      } else {
        dispatch(addErrors(json.errors.map(e => e.message)));
        json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
      }
    } else {
      dispatch(addErrors(json.errors.map(e => e.message)));
      json.errors.forEach(err => dispatch(addToast(err.message, TOAST_ERROR)));
    }
  } catch (e) {
    // do nothing
  }
};
