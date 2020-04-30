import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { getGroupsMap } from 'state/groups/selectors';
import { getRolesMap } from 'state/roles/selectors';

export const getCurrentUserAuth = state => state.currentUserAuth;

export const getCurrentUserAuthGroupRolesCombo =
  createSelector(
    [getCurrentUserAuth, getGroupsMap, getRolesMap],
    (currentUserAuth, groups, roles) => {
      if (!isEmpty(currentUserAuth) && !isEmpty(groups) && !isEmpty(roles)) {
        return currentUserAuth.map(item => ({
          group: item.group ? { code: item.group, name: groups[item.group].name } : {},
          role: item.role ? { code: item.role, name: roles[item.role].name } : {},
        }));
      }
      return [];
    },
  );
