
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTreeActionMenuButton from 'ui/page-tree/PageTreeActionMenuButton';

const EVENT = { preventDefault: jest.fn() };

const onClickHandler = jest.fn();

describe('ui/page-tree/PageTreeActionMenuButton', () => {
  beforeEach(jest.clearAllMocks);
  it('renders without crashing', () => {
    const component = shallow(<PageTreeActionMenuButton />);
    expect(component.exists()).toBe(true);
  });

  it('it accepts an onClick prop', () => {
    const component = shallow(<PageTreeActionMenuButton onClick={onClickHandler} />);
    component.simulate('click', EVENT);
    expect(onClickHandler).toHaveBeenCalled();
  });

  it('does nothing if clicked but no handler is provided', () => {
    const component = shallow(<PageTreeActionMenuButton />);
    component.simulate('click', EVENT);
    expect(onClickHandler).not.toHaveBeenCalled();
  });
});
