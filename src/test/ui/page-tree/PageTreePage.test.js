
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTreePage from 'ui/page-tree-page/PageTreePage';


describe('ui/page-tree-page/PageTreePage', () => {
  it('renders without crashing', () => {
    const component = shallow(<PageTreePage />);
    expect(component.exists()).toBe(true);
  });
  it('has class PageTreePage', () => {
    const component = shallow(<PageTreePage />);
    expect(component.hasClass('PageTreePage')).toBe(true);
  });

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    const component = shallow(<PageTreePage onWillMount={onWillMount} />);
    expect(onWillMount).toHaveBeenCalled();
  });
});
