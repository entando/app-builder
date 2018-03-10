import {
  getApi,
  useMocks,
  getDomain,
} from 'state/api/selectors';

const api = {
  useMocks: false,
  domain: '//mydomain.com',
};

const STATE = { api };

describe('api selectors', () => {
  it('verify getApi selector', () => {
    expect(getApi(STATE)).toEqual(api);
  });

  it('verify useMocks selector', () => {
    expect(useMocks(STATE)).toEqual(api.useMocks);
  });

  it('verify getDomain selector', () => {
    expect(getDomain(STATE)).toEqual(api.domain);
  });
});
