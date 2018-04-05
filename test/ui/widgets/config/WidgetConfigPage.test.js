import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetConfigPage from 'ui/widgets/config/WidgetConfigPage';


const WIDGET_CODE = 'widget_code';
const PAGE_CODE = 'page_code';
const FRAME_POS = 0;
const FRAME_NAME = 'Top Bar 1';


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

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    component = shallow((
      <WidgetConfigPage
        widgetId={WIDGET_CODE}
        pageCode={PAGE_CODE}
        framePos={FRAME_POS}
        frameName={FRAME_NAME}
        onSubmit={() => {}}
        onWillMount={onWillMount}
      />
    ));
    expect(onWillMount).toHaveBeenCalled();
    component.unmount();
    onWillMount.mockClear();
    expect(onWillMount).not.toHaveBeenCalled();
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
      />
    ));
    expect(component.state('infoTableOpen')).toBe(false);
    component.find('.WidgetConfigPage__info-btn').simulate('click');
    expect(component.state('infoTableOpen')).toBe(true);
  });
});
