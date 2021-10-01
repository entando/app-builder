import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';

import CMSPageTitle from 'ui/common/CMSPageTitle';

configEnzymeAdapter();

describe('ui/common/PageTitle', () => {
  it('renders without crashing', () => {
    const component = shallow(<CMSPageTitle titleId="cms.contenttemplate.title" />);
    expect(component.exists()).toBe(true);
  });

  it('renders the help icon if helpId is provided', () => {
    const component = shallow(
      <CMSPageTitle titleId="cms.contenttemplate.title" helpId="cms.contenttemplate.titletip" />,
    );
    expect(component.find('OverlayTrigger').exists()).toBe(true);
  });

  it('does not render the help icon if helpId is not provided', () => {
    const component = shallow(<CMSPageTitle titleId="cms.contenttemplate.title" />);
    expect(component.find('OverlayTrigger').exists()).toBe(false);
  });
});
