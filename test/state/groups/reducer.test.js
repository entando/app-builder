import reducer from 'state/groups/reducer';

import {
  setGroups,
  setSelectedGroup,
  setSelectedGroupPageReferences,
  setSelectedGroupUserReferences,
  setSelectedGroupWidgetTypeReferences,
  setSelectedGroupContentReferences,
  setSelectedGroupResourceReferences,
} from 'state/groups/actions';

import {
  getGroupsList,
  getSelectedGroup,
  getSelectedGroupPageReferences,
  getSelectedGroupUserReferences,
  getSelectedGroupWidgetTypeReferences,
  getSelectedGroupContentReferences,
  getSelectedGroupResourceReferences,
} from 'state/groups/selectors';

import {
  LIST_GROUPS_OK,
  BODY_OK,
  PAGE_REFERENCES,
  USER_REFERENCES,
  WIDGETTYPE_REFERENCES,
  GROUP_CONTENT_REFERENCES,
  RESOURCE_REFERENCES,
} from 'test/mocks/groups';

describe('state/groups/reducer', () => {
  const state = reducer();
  describe('default state', () => {
    it('should be an array', () => {
      expect(state).toBeDefined();
    });
  });

  it('should return an object', () => {
    expect(state).toBeInstanceOf(Object);
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
  describe('after action SET_SELECTED_GROUP', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(state, setSelectedGroup(BODY_OK));
    });

    it('should define the selected group payload', () => {
      expect(getSelectedGroup({ groups: newState })).toMatchObject(BODY_OK);
    });
  });
  describe('after action SET_SELECTED_GROUP_PAGE_REFERENCES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(
        state,
        setSelectedGroupPageReferences(PAGE_REFERENCES.administrators.list),
      );
    });

    it('should define the pageReferenced payload', () => {
      expect(getSelectedGroupPageReferences({ groups: newState }))
        .toMatchObject(PAGE_REFERENCES.administrators.list);
    });
  });

  describe('after action SET_SELECTED_GROUP_USER_REFERENCES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(
        state,
        setSelectedGroupUserReferences(USER_REFERENCES.administrators.list),
      );
    });

    it('should define the userReferenced payload', () => {
      expect(getSelectedGroupUserReferences({ groups: newState }))
        .toMatchObject(USER_REFERENCES.administrators.list);
    });
  });

  describe('after action SET_SELECTED_GROUP_WIDGETTYPE_REFERENCES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(
        state,
        setSelectedGroupWidgetTypeReferences(WIDGETTYPE_REFERENCES.administrators.list),
      );
    });

    it('should define the widgetTypeReferenced payload', () => {
      expect(getSelectedGroupWidgetTypeReferences({ groups: newState }))
        .toMatchObject(WIDGETTYPE_REFERENCES.administrators.list);
    });
  });

  describe('after action SET_SELECTED_GROUP_CONTENT_REFERENCES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(
        state,
        setSelectedGroupContentReferences(GROUP_CONTENT_REFERENCES.administrators.list),
      );
    });

    it('should define the contentReferenced payload', () => {
      expect(getSelectedGroupContentReferences({ groups: newState }))
        .toMatchObject(GROUP_CONTENT_REFERENCES.administrators.list);
    });
  });

  describe('after action SET_SELECTED_GROUP_RESOURCE_REFERENCES', () => {
    let newState;
    beforeEach(() => {
      newState = reducer(
        state,
        setSelectedGroupResourceReferences(RESOURCE_REFERENCES.administrators.list),
      );
    });

    it('should define the userReferenced payload', () => {
      expect(getSelectedGroupResourceReferences({ groups: newState }))
        .toMatchObject(RESOURCE_REFERENCES.administrators.list);
    });
  });
});
