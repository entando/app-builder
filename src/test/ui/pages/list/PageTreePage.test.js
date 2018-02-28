import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTreePage from 'ui/pages/list/PageTreePage';


describe('PageTreePage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<PageTreePage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('has the PageTreePage class', () => {
    expect(component.hasClass('PageTreePage')).toBe(true);
  });

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    shallow(<PageTreePage onWillMount={onWillMount} />);
    expect(onWillMount).toHaveBeenCalled();
  });
});
