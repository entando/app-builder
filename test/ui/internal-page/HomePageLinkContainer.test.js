import 'test/enzyme-init';

import { mapStateToProps } from 'ui/internal-page/HomePageLinkContainer';

const TEST_STATE = {
  link: 'getDomain_result',
};

describe('HomePageLinkContainer', () => {
  it('maps the link property', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      link: TEST_STATE.link,
    });
  });
});
