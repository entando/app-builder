import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageModelAddPage from 'ui/page-models/add/PageModelAddPage';


describe('PageModelAddPage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<PageModelAddPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('has the PageModelAddPage class', () => {
    expect(component.hasClass('PageModelAddPage')).toBe(true);
  });

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    shallow(<PageModelAddPage onWillMount={onWillMount} />);
    expect(onWillMount).toHaveBeenCalled();
  });
});
