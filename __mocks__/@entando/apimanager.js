const apimanager = jest.genMockFromModule('@entando/apimanager');
const real = require.requireActual('@entando/apimanager');

apimanager.loginUser = real.loginUser;
apimanager.makeMockRequest = real.makeMockRequest;
apimanager.makeRequest = real.makeRequest;
apimanager.api = real.api;
apimanager.currentUser = real.currentUser;
apimanager.getUsername = real.getUsername;
apimanager.config = real.config;

jest.spyOn(apimanager, 'makeMockRequest');
jest.spyOn(apimanager, 'makeRequest');
jest.spyOn(apimanager, 'loginUser');

export const {
  makeRequest,
  makeMockRequest,
  config,
  loginUser,
  api,
  currentUser,
  getUsername,
  METHODS,
} = apimanager;
