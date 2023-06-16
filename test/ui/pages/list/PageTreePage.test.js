import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { PageTreePageBody } from 'ui/pages/list/PageTreePage';
import { shallowWithIntl } from 'test/legacyTestUtils';

const props = {
  onWillMount: jest.fn(),
  onClear: jest.fn(),
  search: [],
};

describe('PageTreePage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallowWithIntl(<PageTreePageBody {...props} />);
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
    shallow(<PageTreePageBody {...props} onWillMount={onWillMount} />);
    expect(onWillMount).toHaveBeenCalled();
  });
});
