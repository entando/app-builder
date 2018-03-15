import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ContentPages from 'ui/pages/config/ContentPages';

describe('ContentWidget', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow(<ContentPages />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has the PageConfigPage class', () => {
    expect(component.hasClass('ContentPages')).toBe(true);
  });

  it('has the ContentPages__content-action class', () => {
    expect(component.find('div').at(1).hasClass('ContentPages__content-action')).toBe(true);
  });

  it('has the PageTreeCompact component', () => {
    expect(component.find('PageTreeCompact')).toHaveLength(1);
  });

  describe('props', () => {
    it('will call onWillMount on componentWillMount', () => {
      const onWillMount = jest.fn();
      component = shallow(<ContentPages onWillMount={onWillMount} />);
      expect(onWillMount).toHaveBeenCalled();
    });
  });
});
