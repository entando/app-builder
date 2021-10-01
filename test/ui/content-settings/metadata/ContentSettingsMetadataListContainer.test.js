import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/content-settings/metadata/ContentSettingsMetadataListContainer';
import {
  CONTENT_SETTINGS_OK as C_OK,
  CONTENT_SETTINGS_OK_MAPPED as maplist,
  CONTENT_SETTINGS_OK_FORMED as mapform,
} from 'testutils/mocks/contentSettings';
import { MODAL_ID } from 'ui/content-settings/metadata/DeleteContentMetadataModal';
import { setVisibleModal, setInfo } from 'state/modal/actions';

jest.mock('state/modal/actions', () => ({
  setVisibleModal: jest.fn(),
  setInfo: jest.fn(),
}));

const state = {
  loading: {},
  apps: {
    cms: {
      contentSettings: C_OK,
    },
  },
  modal: {},
};
describe('content-settings/metadata/ContentSettingsMetadataListContainer', () => {
  it('maps stateprops property', () => {
    const props = mapStateToProps(state);
    expect(props).toHaveProperty('metadata', maplist);
    expect(props).toHaveProperty('loadings');
    expect(props).toHaveProperty('initialValues', mapform);
  });

  it('maps dispatch property', () => {
    const dispatchMock = jest.fn(r => r);
    const props = mapDispatchToProps(dispatchMock);
    expect(props).toHaveProperty('onSubmit');
    expect(props).toHaveProperty('onPromptDelete');
    const param = 'what';
    props.onPromptDelete(param);
    expect(dispatchMock).toHaveBeenCalled();
    expect(setVisibleModal).toHaveBeenCalledWith(MODAL_ID);
    expect(setInfo).toHaveBeenCalledWith(param);
  });
});
