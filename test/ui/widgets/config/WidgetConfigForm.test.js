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

  it('if widgetId is coming from a plugin', () => {
    component = shallow((
      <WidgetConfigFormBody
        {...PROPS}
        widgetId="plugin-widget"
      />
    ));
    expect(component.find('[widgetId="plugin-widget"]')).toExist();
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
