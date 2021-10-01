import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/content-settings/ContentSettingsGeneralContainer';
import { CONTENT_SETTINGS_OK as C_OK } from 'testutils/mocks/contentSettings';

const state = {
  loading: {},
  apps: {
    cms: {
      contentSettings: C_OK,
    },
  },
};

describe('content-settings/ContentSettingsGeneralContainer', () => {
  it('maps stateprops property', () => {
    const props = mapStateToProps(state);
    expect(props).toHaveProperty('indexesLastReloadDate');
    expect(props).toHaveProperty('indexesLastReloadResult');
    expect(props).toHaveProperty('indexesStatus', C_OK.indexesStatus);
    expect(props).toHaveProperty('referenceStatus', C_OK.referencesStatus);
    expect(props).toHaveProperty('editorSettings', C_OK.editor);
    expect(props).toHaveProperty('isReloadingReferences');
    expect(props).toHaveProperty('isReloadingIndexes');
    expect(props).toHaveProperty('isEditorChanging');
    expect(props).toHaveProperty('loading');
  });

  it('maps dispatch property', () => {
    const dispatchMock = jest.fn();
    const props = mapDispatchToProps(dispatchMock);
    expect(props).toHaveProperty('onDidMount');
    expect(props).toHaveProperty('onReloadReferences');
    expect(props).toHaveProperty('onReloadIndexes');
    expect(props).toHaveProperty('onEditorChange');
    props.onDidMount();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
