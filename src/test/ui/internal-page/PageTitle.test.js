
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTitle from 'ui/internal-page/PageTitle';

describe('PageTitle', () => {
  it('renders without crashing', () => {
    const component = shallow(<PageTitle titleId="app.title" />);
    expect(component.exists()).toBe(true);
  });

  it('renders the help icon if helpId is provided', () => {
    const component = shallow(<PageTitle titleId="app.title" helpId="help.id" />);
    expect(component.find('OverlayTrigger').exists()).toBe(true);
  });

  it('does not render the help icon if helpId is not provided', () => {
    const component = shallow(<PageTitle titleId="app.title" />);
    expect(component.find('OverlayTrigger').exists()).toBe(false);
  });
});
