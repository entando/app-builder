import { makeRequest } from '@entando/apimanager';
import {
  getDEComponent,
  postDEComponentInstall,
  getDEComponentInstall,
  postDEComponentUninstall,
  getDEComponentUninstall,
} from 'api/digital-exchange/components';

jest.mock('@entando/apimanager', () => ({
  makeRequest: jest.fn(() => new Promise(resolve => resolve({}))),
  METHODS: require.requireActual('@entando/apimanager').METHODS,
}));

const componentIdWithSlash = 'org/company/component';

describe('api/digital-exchange/components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getDEComponent encodes component ids with slashes', () => {
    getDEComponent(componentIdWithSlash);
    expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
      uri: '/components/org%2Fcompany%2Fcomponent',
    }));
  });

  it('postDEComponentInstall encodes component ids with slashes', () => {
    postDEComponentInstall({ id: componentIdWithSlash });
    expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
      uri: '/components/install/org%2Fcompany%2Fcomponent',
    }));
  });

  it('getDEComponentInstall encodes component ids with slashes', () => {
    getDEComponentInstall(componentIdWithSlash);
    expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
      uri: '/components/install/org%2Fcompany%2Fcomponent',
    }));
  });

  it('postDEComponentUninstall encodes component ids with slashes', () => {
    postDEComponentUninstall(componentIdWithSlash);
    expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
      uri: '/components/uninstall/org%2Fcompany%2Fcomponent',
    }));
  });

  it('getDEComponentUninstall encodes component ids with slashes', () => {
    getDEComponentUninstall(componentIdWithSlash);
    expect(makeRequest).toHaveBeenCalledWith(expect.objectContaining({
      uri: '/components/uninstall/org%2Fcompany%2Fcomponent',
    }));
  });
});
