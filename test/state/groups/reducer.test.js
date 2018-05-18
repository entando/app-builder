import reducer from 'state/groups/reducer';

import {
  setGroups,
  setGroupsTotal,
  setSelectedGroup,
  setReferences,
  removeGroupSync,
} from 'state/groups/actions';

import {
  getGroupsList,
  getSelectedGroup,
} from 'state/groups/selectors';

import {
  LIST_GROUPS_OK,
  BODY_OK,
  PAGE_REFERENCES,
} from 'test/mocks/groups';

const GROUP_CODE = LIST_GROUPS_OK[0].code;

describe('state/groups/reducer', () => {
  const state = reducer();
  describe('default state', () => {
    it('should be an array', () => {
      expect(state).toBeDefined();
    });
  });

  it('should return an object', () => {
    expect(state).toBeInstanceOf(Object);
    expect(state).toHaveProperty('total', 0);
    expect(state).toHaveProperty('list', []);
    expect(state).toHaveProperty('map', {});
    expect(state).toHaveProperty('selected', {});
  });

  describe('after action SET_GROUPS', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setGroups(LIST_GROUPS_OK));
    });

    it('should define the groups payload', () => {
      expect(getGroupsList({ groups: newState })).toMatchObject(LIST_GROUPS_OK);
    });
  });

  describe('after action SET_GROUPS_TOTAL', () => {
    it('should define the groups payload', () => {
      const newState = reducer(state, setGroupsTotal(12));
      expect(newState).toHaveProperty('total', 12);
    });
  });

  describe('after action SET_SELECTED_GROUP', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedGroup(BODY_OK));
    });

    it('should define the selected group payload', () => {
      expect(getSelectedGroup({ groups: newState })).toMatchObject(BODY_OK);
    });
  });

  describe('after action SET_REFERENCES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(
        state,
        setReferences({ PageManager: PAGE_REFERENCES }),
      );
    });

    it('should define the pageReferenced payload', () => {
      expect(newState.selected.referenceMap.PageManager)
        .toMatchObject(PAGE_REFERENCES);
    });
  });

  describe('after action REMOVE_GROUP', () => {
    const newState = reducer(state, setGroups(LIST_GROUPS_OK));

    it('should remove the group from map and list', () => {
      const stateAfterRemove = reducer(newState, removeGroupSync(GROUP_CODE));
      expect(newState.map).not.toEqual(stateAfterRemove.map);
      expect(stateAfterRemove.map[GROUP_CODE]).toBeUndefined();

      expect(newState.list).not.toBe(stateAfterRemove.list);
      expect(stateAfterRemove.list.includes(GROUP_CODE)).toBe(false);
    });
  });
});
