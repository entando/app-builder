import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import WidgetConfigWrapper from 'ui/widgets/config/WidgetConfigWrapper';
import { WIDGET_WITH_CONFIG_FORM } from 'test/mocks/widgets';

const props = {
  widgetConfig: WIDGET_WITH_CONFIG_FORM.config,
  onSubmit: () => {},
};

describe('WidgetConfigWrapper', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    component = shallow((
      <WidgetConfigWrapper
        {...props}
      />
    ));
    expect(component).toExist();
  });
});
