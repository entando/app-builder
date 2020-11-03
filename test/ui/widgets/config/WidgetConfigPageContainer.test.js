
import { mapDispatchToProps, mapStateToProps } from 'ui/widgets/config/WidgetConfigPageContainer';

// mocked

import { makeGetWidgetConfigFrameName } from 'state/widget-config/selectors';
import { updateConfiguredPageWidget, initWidgetConfigPage, initWidgetConfigPageWithConfigData } from 'state/widget-config/actions';


const FRAME_NAME = 'Frame name';
const FRAME_POS = '0';
const WIDGET_CODE = 'widget_code';
const PAGE_CODE = 'page_code';
const WIDGET_CONFIG = { type: 'widget_code' };

jest.mock('state/widget-config/selectors', () => ({
  makeGetWidgetConfigFrameName: jest.fn(),
}));

jest.mock('state/widget-config/actions', () => ({
  updateConfiguredPageWidget: jest.fn().mockReturnValue('updateConfiguredPageWidget_result'),
  initWidgetConfigPage: jest.fn().mockReturnValue('initWidgetConfigPage_result'),
  initWidgetConfigPageWithConfigData: jest.fn().mockReturnValue('initWidgetConfigPageWithConfigData_result'),
}));

const TEST_STATE = {
  widgets: {
    selected: {
      config: {},
    },
  },
  pageConfig: {
    configMap: {},
  },
  appTour: {},
};

const ownProps = {
  match: {
    params: {
      pageCode: PAGE_CODE,
      widgetCode: WIDGET_CODE,
      framePos: FRAME_POS,
    },
  },
};

describe('WidgetConfigPageContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    makeGetWidgetConfigFrameName.mockReturnValue(() => FRAME_NAME);
  });

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps(TEST_STATE, ownProps);
    });

    it('defines widgetCode', () => {
      expect(props.widgetCode).toBe(WIDGET_CODE);
    });

    it('defines framePos', () => {
      expect(props.framePos).toBe(parseInt(FRAME_POS, 10));
    });

    it('defines pageCode', () => {
      expect(props.pageCode).toBe(PAGE_CODE);
    });

    it('defines frameName', () => {
      expect(props.frameName).toBe(FRAME_NAME);
    });
  });


  describe('mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock, ownProps);
    });

    describe('prop onDidMount', () => {
      beforeEach(() => {
        props.onDidMount({
          widgetConfig: {},
        });
      });
      it('dispatch initWidgetConfigPage', () => {
        expect(dispatchMock).toHaveBeenCalledWith('initWidgetConfigPage_result');
        expect(initWidgetConfigPage).toHaveBeenCalled();
      });
    });

    describe('prop onDidMount with null widgetConfig', () => {
      beforeEach(() => {
        props.onDidMount({});
      });
      it('dispatch initWidgetConfigPage', () => {
        expect(dispatchMock).toHaveBeenCalledWith('initWidgetConfigPageWithConfigData_result');
        expect(initWidgetConfigPageWithConfigData).toHaveBeenCalled();
      });
    });

    describe('prop onSubmit', () => {
      beforeEach(() => {
        props.onSubmit({ widgetConfig: WIDGET_CONFIG });
      });
      it('dispatch updateConfiguredPageWidget()', () => {
        expect(dispatchMock).toHaveBeenCalledWith('updateConfiguredPageWidget_result');
        expect(updateConfiguredPageWidget).toHaveBeenCalledWith(WIDGET_CONFIG, {
          pageCode: PAGE_CODE,
          widgetCode: WIDGET_CODE,
          framePos: FRAME_POS,
        });
      });
    });
  });
});
