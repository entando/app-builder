import reducer from 'state/edit-content/reducer';
import {
  setWorkMode,
  setOwnerGroupDisable,
  setContentEntry,
  setJoinedCategories,
  clearEditContentForm,
  setNewContentsType,
  setMissingTranslations,
  setSaveType,
} from 'state/edit-content/actions';
import { WORK_MODE_ADD, WORK_MODE_EDIT } from 'state/edit-content/types';
import { onJoinCategory, onUnjoinCategory } from 'state/categories/actions';

const content = { contentType: 'NEWS', code: 'AwesomeContent' };

const defaultState = {
  ownerGroupDisabled: {
    disabled: false,
  },
  workMode: WORK_MODE_EDIT,
  contentType: '',
  groups: [],
  joinedCategories: [],
  missingTranslations: [],
  saveType: '',
};

describe('state/edit-content/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });
  describe('after action setNewContentsType', () => {
    let state;
    beforeEach(() => {
      state = reducer({ workMode: null }, setNewContentsType({ typeCode: 'NEWS', typeDescription: 'News' }));
    });
    it('setNewContentsType should add a content type', () => {
      expect(state).toHaveProperty('contentType');
      expect(state.contentType).toEqual({ typeCode: 'NEWS', typeDescription: 'News' });
    });
  });
  describe('after action clearEditContentForm', () => {
    let state;
    beforeEach(() => {
      state = reducer({ workMode: null }, clearEditContentForm());
    });
    it('clearEditContentForm should reset editcontent state', () => {
      expect(state).toEqual(defaultState);
    });
  });
  describe('after action setJoinedCategories', () => {
    let state;
    beforeEach(() => {
      state = reducer({ joinedCategories: [] }, setJoinedCategories(['home']));
    });
    it('joined categories should be changed', () => {
      expect(state).toHaveProperty('joinedCategories');
      expect(state.joinedCategories).toEqual(['home']);
    });
  });
  describe('after action setJoinedCategories with undefined value', () => {
    let state;
    beforeEach(() => {
      state = reducer({ joinedCategories: [] }, setJoinedCategories());
    });
    it('joined categories should be changed', () => {
      expect(state).toHaveProperty('joinedCategories');
      expect(state.joinedCategories).toEqual([]);
    });
  });
  describe('after action SET_WORK_MODE', () => {
    let state;
    beforeEach(() => {
      state = reducer({ workMode: null }, setWorkMode(WORK_MODE_ADD));
    });
    it('workMode should be ADD', () => {
      expect(state).toHaveProperty('workMode');
      expect(state.workMode).toEqual(WORK_MODE_ADD);
    });
  });
  describe('after action setOwnerGroupDisable', () => {
    let state;
    beforeEach(() => {
      state = reducer({ ownerGroupDisabled: false }, setOwnerGroupDisable(true));
    });
    it('owner group should become disabled', () => {
      expect(state).toHaveProperty('ownerGroupDisabled');
      expect(state.ownerGroupDisabled).toEqual({ disabled: true });
    });
  });
  describe('after action setContentEntry', () => {
    let state;
    beforeEach(() => {
      state = reducer({ content: {} }, setContentEntry(content));
    });
    it('Content should be changed', () => {
      expect(state).toHaveProperty('content');
      expect(state.content).toEqual(content);
    });
  });
  describe('after action JOIN_CATEGORY', () => {
    let state;
    beforeEach(() => {
      state = reducer({ joinedCategories: ['OFFICE'] }, onJoinCategory('NEWS'));
    });
    it('Joined categories array should be changed', () => {
      expect(state).toHaveProperty('joinedCategories');
      expect(state.joinedCategories).toEqual(['OFFICE', 'NEWS']);
    });
    it('Should not add already added category', () => {
      state = reducer({ joinedCategories: ['OFFICE'] }, onJoinCategory('OFFICE'));
      expect(state).toHaveProperty('joinedCategories');
      expect(state.joinedCategories).toEqual(['OFFICE']);
    });
  });
  describe('after action UNJOIN_CATEGORY', () => {
    let state;
    beforeEach(() => {
      state = reducer({ joinedCategories: ['NEWS', 'OFFICE'] }, onUnjoinCategory('NEWS'));
    });
    it('Joined categories array should be changed', () => {
      expect(state).toHaveProperty('joinedCategories');
      expect(state.joinedCategories).toEqual(['OFFICE']);
    });
  });
  describe('after action setMissingTranslations', () => {
    let state;
    beforeEach(() => {
      state = reducer({ missingTranslations: [] }, setMissingTranslations(['test1', 'test2']));
    });
    it('missingTranslations should be changed', () => {
      expect(state).toHaveProperty('missingTranslations');
      expect(state.missingTranslations).toEqual(['test1', 'test2']);
    });
  });
  describe('after action setSaveType', () => {
    let state;
    beforeEach(() => {
      state = reducer({ saveType: '' }, setSaveType('test'));
    });
    it('missingTranslations should be changed', () => {
      expect(state).toHaveProperty('saveType');
      expect(state.saveType).toEqual('test');
    });
  });
});
