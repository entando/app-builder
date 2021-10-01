import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';

import { BrandMenu } from '@entando/menu';
import CMSShell from 'ui/common/CMSShell';

configEnzymeAdapter();

describe('ui/common/CMSShell', () => {
  const component = shallow(<CMSShell />);

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has class CMSShell', () => {
    expect(component.hasClass('CMSShell')).toBe(true);
  });

  it('Renders BrandMenu', () => {
    expect(component.find(BrandMenu).exists()).toBe(true);
  });
});
