import React from 'react';

import 'test/enzyme-init';
import { shallowWithIntl } from 'test/testUtils';
import ContentPages from 'ui/pages/config/ContentPages';

describe('ContentWidget', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallowWithIntl(<ContentPages />).dive();
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has the PageConfigPage class', () => {
    expect(component.hasClass('ContentPages')).toBe(true);
  });

  it('has the PageTreeCompact component', () => {
    expect(component.find('PageTreeCompact')).toHaveLength(1);
  });

  describe('props', () => {
    it('will call onWillMount on componentWillMount', () => {
      const onWillMount = jest.fn();
      component = shallowWithIntl(<ContentPages onWillMount={onWillMount} />).dive();
      expect(onWillMount).toHaveBeenCalled();
    });
  });
});
