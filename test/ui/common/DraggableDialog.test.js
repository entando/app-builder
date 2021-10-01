import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';

import DraggableDialog from 'ui/common/DraggableDialog';

configEnzymeAdapter();

describe('ui/common/DraggableDialog', () => {
  const component = shallow(<DraggableDialog className="classy" />);
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('find ModalDialog and check className and bsClass prop', () => {
    const childDialog = component.find('ModalDialog');
    expect(childDialog.exists()).toBe(true);
    expect(childDialog.hasClass('classy')).toBe(true);
    const props = childDialog.props();
    expect(props).toHaveProperty('bsClass', 'modal');
  });
});
