
import { mapDispatchToProps, mapStateToProps } from 'ui/widgets/config/WidgetConfigPageContainer';

// mocked
import { getParams } from 'frontend-common-components';

import { getWidgetConfigFrameName } from 'state/widget-config/selectors';
import { updateConfiguredPageWidget, initWidgetConfigPage } from 'state/widget-config/actions';


const FRAME_NAME = 'Frame name';
const FRAME_POS = '0';
const WIDGET_CODE = 'widget_code';
const PAGE_CODE = 'page_code';
const WIDGET_CONFIG = { type: 'widget_code' };

jest.mock('state/widget-config/selectors', () => ({
  getWidgetConfigFrameName: jest.fn(),
}));

jest.mock('state/widget-config/actions', () => ({
  updateConfiguredPageWidget: jest.fn().mockReturnValue('updateConfiguredPageWidget_result'),
  initWidgetConfigPage: jest.fn().mockReturnValue('initWidgetConfigPage_result'),
}));


describe('PageConfigPageContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getWidgetConfigFrameName.mockReturnValue(FRAME_NAME);
    getParams.mockReturnValue({
      pageCode: PAGE_CODE,
      widgetCode: WIDGET_CODE,
      framePos: FRAME_POS,
    });
  });

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({});
    });

    it('defines widgetId', () => {
      expect(props.widgetId).toBe(WIDGET_CODE);
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
      props = mapDispatchToProps(dispatchMock);
    });

    describe('prop onWillMount', () => {
      beforeEach(() => {
        props.onWillMount();
      });
      it('dispatch initWidgetConfigPage', () => {
        expect(dispatchMock).toHaveBeenCalledWith('initWidgetConfigPage_result');
        expect(initWidgetConfigPage).toHaveBeenCalled();
      });
    });

    describe('prop onSubmit', () => {
      beforeEach(() => {
        props.onSubmit(WIDGET_CONFIG);
      });
      it('dispatch updateConfiguredPageWidget()', () => {
        expect(dispatchMock).toHaveBeenCalledWith('updateConfiguredPageWidget_result');
        expect(updateConfiguredPageWidget).toHaveBeenCalledWith(WIDGET_CONFIG);
      });
    });
  });
});
