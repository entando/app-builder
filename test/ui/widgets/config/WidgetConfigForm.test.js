import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { WidgetConfigFormBody } from 'ui/widgets/config/WidgetConfigForm';


describe('WidgetConfigForm', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('if widgetId = "formAction", wraps an InternalServletConfigForm', () => {
    component = shallow(<WidgetConfigFormBody widgetId="formAction" />);
    expect(component.is('InternalServletConfigForm')).toBe(true);
    expect(component.props()).toEqual({ widgetId: 'formAction' });
  });

  it('if widgetId is unsupported, renders an error span', () => {
    component = shallow(<WidgetConfigFormBody widgetId="something wrong" />);
    expect(component.is('span')).toBe(true);
  });
});
