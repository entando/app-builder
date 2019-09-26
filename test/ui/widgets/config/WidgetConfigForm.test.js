import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetConfigForm from 'ui/widgets/config/WidgetConfigForm';
import { WIDGET_WITH_CONFIG_FORM } from 'test/mocks/widgets';

const props = {
  widgetConfig: WIDGET_WITH_CONFIG_FORM.config,
  onSubmit: () => {},
};

describe('WidgetConfigForm', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    component = shallow((
      <WidgetConfigForm
        {...props}
      />
    ));
    expect(component).toExist();
  });
});
