import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PagesAddPage from 'ui/pages/add/PagesAddPage';


describe('PagesAddPage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<PagesAddPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('has the PagesAddPage class', () => {
    expect(component.hasClass('PagesAddPage')).toBe(true);
  });

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    shallow(<PagesAddPage onWillMount={onWillMount} />);
    expect(onWillMount).toHaveBeenCalled();
  });
});
