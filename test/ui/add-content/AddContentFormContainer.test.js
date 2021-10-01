import { configEnzymeAdapter } from 'test/testUtils';

import { mapStateToProps, mapDispatchToProps } from 'ui/add-content/AddContentFormContainer';
import { ADD_CONTENT_OPENED_OK } from 'test/mocks/editContent';

jest.mock('state/user-preferences/selectors', () => ({
  getUserPreferences: jest.fn(() => ({})),
  getTranslationWarning: jest.fn(() => true),
}));

jest.mock('state/permissions/selectors', () => ({
  getMyGroupPermissions: jest.fn(() => ([{ group: 'free', permissions: [] }])),
}));

const TEST_STATE = {
  apps: {
    cms: {
      editContent: {
        ownerGroupDisabled: {
          disabled: false,
        },
        workMode: 'work-mode-add',
        content: {
          contentType: 'NEWS',
          version: '0.0',
        },
        selectedCategories: undefined,
        selectedJoinGroups: undefined,
      },
      contentType: {
        selected: 'ART',
      },
    },
  },
  groups: {
    list: ['adminstrators', 'freeAccess'],
    map: {
      adminstrators: { code: 'adminstrators', name: 'Administrators' },
      freeAccess: { code: 'freeAccess', name: 'Free Access' },
    },
  },
  currentUser: { username: 'admin' },
  userPreferences: {
    wizard: true,
    translationWarning: true,
    loadOnPageSelect: true,
  },
};

configEnzymeAdapter();

describe('AddContentFormContainer connection to redux', () => {
  it('maps editContent properties from state to AddContentForm', () => {
    expect(mapStateToProps(TEST_STATE, { match: {} })).toEqual(ADD_CONTENT_OPENED_OK);
  });

  it('verify that onDidMount and onSetOwnerGroupDisable are defined and called in mapDispatchToProps', () => {
    const dispatchMock = jest.fn(() => ({ catch: jest.fn() }));
    const result = mapDispatchToProps(dispatchMock, { intl: {}, history: {}, match: { params: 'test' } });
    expect(result.onSetOwnerGroupDisable).toBeDefined();
    result.onSetOwnerGroupDisable();
    expect(dispatchMock).toHaveBeenCalled();
    expect(result.onDidMount).toBeDefined();
    result.onDidMount();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
