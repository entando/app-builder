
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import RowSpinner from 'ui/pages/common/RowSpinner';

describe('RowSpinner', () => {
  it('when not loading renders no spinner', () => {
    const component = shallow(<RowSpinner loading={false} />);
    expect(component.find('.spinner').exists()).toBe(false);
  });
  it('when loading renders a spinner', () => {
    const component = shallow(<RowSpinner loading />);
    expect(component.find('.spinner').exists()).toBe(true);
  });
});
