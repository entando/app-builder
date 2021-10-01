import {
  mapStateToProps,
  mapDispatchToProps,
} from 'ui/content-settings/metadata/AddContentSettingsMetadataContainer';
import { CONTENT_SETTINGS_OK as C_OK } from 'testutils/mocks/contentSettings';
import { sendPostMetadataMap } from 'state/content-settings/actions';

jest.mock('state/content-settings/actions', () => ({
  sendPostMetadataMap: jest.fn(a => new Promise(resolve => resolve(a))),
}));

const state = {
  loading: {},
  apps: {
    cms: {
      contentSettings: C_OK,
    },
  },
};

describe('content-settings/metadata/AddContentSettingsMetadataContainer', () => {
  it('maps stateprops property', () => {
    const props = mapStateToProps(state);
    expect(props).toHaveProperty('loading');
  });

  it('maps dispatch property', () => {
    const dispatchMock = jest.fn(r => r);
    const intl = {
      formatMessage: jest.fn(),
    };
    const props = mapDispatchToProps(dispatchMock, { intl });
    expect(props).toHaveProperty('onSubmit');
    const param = { key: 1, mapping: 1 };
    props.onSubmit(param);
    expect(dispatchMock).toHaveBeenCalled();
    expect(sendPostMetadataMap).toHaveBeenCalledWith(param.key, param.mapping);
  });
});
