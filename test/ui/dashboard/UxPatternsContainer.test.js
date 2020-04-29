import 'test/enzyme-init';

import { mapStateToProps, mapDispatchToProps } from 'ui/dashboard/UxPatternsContainer';
import { fetchWidgetsTotal } from 'state/widgets/actions';
import { fetchPageTemplatesTotal } from 'state/page-templates/actions';

const TEST_STATE = {
  widgets: { total: 5 },
  pageTemplates: { total: 2 },
};

jest.mock('state/widgets/actions', () => ({
  fetchWidgetsTotal: jest.fn(),
}));

jest.mock('state/page-templates/actions', () => ({
  fetchPageTemplatesTotal: jest.fn(),
}));

describe('UxPatternsContainer', () => {
  it('maps widgets and pageTemplates properties', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({
      widgets: 5,
      pageTemplates: 2,
    });
  });

  describe('mapDispatchToProps', () => {
    let props;

    beforeEach(() => {
      props = mapDispatchToProps(jest.fn());
    });

    it('should map the correct function properties', () => {
      expect(props).toHaveProperty('onWillMount');
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount({});
      expect(fetchWidgetsTotal).toHaveBeenCalled();
      expect(fetchPageTemplatesTotal).toHaveBeenCalled();
    });
  });
});
