import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageModelEditPage from 'ui/page-models/edit/PageModelEditPage';


describe('PageModelEditPage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<PageModelEditPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('has the PageModelEditPage class', () => {
    expect(component.hasClass('PageModelEditPage')).toBe(true);
  });

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    shallow(<PageModelEditPage onWillMount={onWillMount} />);
    expect(onWillMount).toHaveBeenCalled();
  });
});
