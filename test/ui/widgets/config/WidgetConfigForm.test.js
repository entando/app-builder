import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { WidgetConfigFormBody } from 'ui/widgets/config/WidgetConfigForm';

const PROPS = {
  handleSubmit: () => {},
  onSubmit: () => {},
};

describe('WidgetConfigForm', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('if widgetId = "formAction", wraps an InternalServletConfigForm', () => {
    component = shallow((
      <WidgetConfigFormBody
        {...PROPS}
        widgetId="formAction"
      />
    ));
    expect(component.is('InternalServletConfigForm')).toBe(true);
    expect(component.props()).toEqual({ ...PROPS, widgetId: 'formAction' });
  });

  it('if widgetId is unsupported, renders an error span', () => {
    component = shallow((
      <WidgetConfigFormBody
        {...PROPS}
        widgetId="something wrong"
      />
    ));
    expect(component.is('span')).toBe(true);
  });
});
