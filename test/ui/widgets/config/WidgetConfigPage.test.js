import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetConfigPage from 'ui/widgets/config/WidgetConfigPage';


const WIDGET_CODE = 'widget_code';
const PAGE_CODE = 'page_code';
const FRAME_POS = 0;
const FRAME_NAME = 'Top Bar 1';

const intlMock = {
  formatMessage: jest.fn(),
};


describe('WidgetConfigPage', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow((
      <WidgetConfigPage
        widgetId={WIDGET_CODE}
        pageCode={PAGE_CODE}
        framePos={FRAME_POS}
        frameName={FRAME_NAME}
        onSubmit={() => {}}
        intl={intlMock}
      />
    ));
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('has the WidgetConfigPage class', () => {
    expect(component.hasClass('WidgetConfigPage')).toBe(true);
  });

  it('has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toHaveLength(1);
  });

  it('will call onDidMount on componentWillMount', () => {
    const onDidMount = jest.fn();
    component = shallow((
      <WidgetConfigPage
        widgetId={WIDGET_CODE}
        pageCode={PAGE_CODE}
        framePos={FRAME_POS}
        frameName={FRAME_NAME}
        onSubmit={() => {}}
        onDidMount={onDidMount}
        intl={intlMock}
      />
    ));
    expect(onDidMount).toHaveBeenCalled();
    component.unmount();
    onDidMount.mockClear();
    expect(onDidMount).not.toHaveBeenCalled();
  });

  it('will call onWillUnmount on componentWillUnmount', () => {
    const onWillUnmount = jest.fn();
    component = shallow((
      <WidgetConfigPage
        widgetId={WIDGET_CODE}
        pageCode={PAGE_CODE}
        framePos={FRAME_POS}
        frameName={FRAME_NAME}
        onSubmit={() => {}}
        onWillUnmount={onWillUnmount}
        intl={intlMock}
      />
    ));
    expect(onWillUnmount).not.toHaveBeenCalled();
    component.unmount();
    expect(onWillUnmount).toHaveBeenCalled();
  });

  it('will toggle info table on click info button', () => {
    component = shallow((
      <WidgetConfigPage
        widgetId={WIDGET_CODE}
        pageCode={PAGE_CODE}
        framePos={FRAME_POS}
        frameName={FRAME_NAME}
        onSubmit={() => {}}
        intl={intlMock}
      />
    ));
    expect(component.state('infoTableOpen')).toBe(false);
    component.find('.WidgetConfigPage__info-btn').simulate('click');
    expect(component.state('infoTableOpen')).toBe(true);
  });
});
