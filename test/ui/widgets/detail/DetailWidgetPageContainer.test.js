import { mapStateToProps, mapDispatchToProps } from 'ui/widgets/detail/DetailWidgetPageContainer';

import { fetchWidgetInfo } from 'state/widgets/actions';
import { fetchLanguages } from 'state/languages/actions';

jest.mock('state/widgets/actions', () => ({
  fetchWidgetInfo: jest.fn(),
}));

jest.mock('state/languages/actions', () => ({
  fetchLanguages: jest.fn(),
}));

jest.mock('state/widgets/selectors', () => ({
  getWidgetInfo: jest.fn(),
}));

jest.mock('state/languages/selectors', () => ({
  getDefaultLanguage: jest.fn().mockReturnValue('en'),
}));

const ownProps = {
  match: {
    params: {
      widgetCode: 'widgetCode',
    },
  },
};

const dispatchMock = jest.fn();
describe('ui/widgets/detail/DetailWidgetPageContainer', () => {
  let props;
  describe('mapDispatchToProps', () => {
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock, ownProps);
    });
    it('verify that onWillMount is defined', () => {
      expect(props.onWillMount).toBeDefined();
    });

    it('should dispatch an action if onWillMount is called', () => {
      props.onWillMount();
      expect(dispatchMock).toHaveBeenCalled();
      expect(fetchWidgetInfo).toHaveBeenCalled();
      expect(fetchLanguages).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = mapStateToProps({});
    });

    it('maps widgetList property from state', () => {
      expect(props).toHaveProperty('widgetInfo');
      expect(props).toHaveProperty('defaultLanguage', 'en');
    });
  });
});
