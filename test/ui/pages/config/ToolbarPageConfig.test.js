import React from 'react';
import 'test/enzyme-init';
import { WIDGET_LIST, PAGES } from 'state/page-config/const';

import ToolbarPageConfig from 'ui/pages/config/ToolbarPageConfig';
import { shallowWithIntl } from 'test/legacyTestUtils';

global.console.error = jest.fn();

describe('ToolbarPageConfig', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallowWithIntl(<ToolbarPageConfig />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    shallowWithIntl(<ToolbarPageConfig onWillMount={onWillMount} />);
    expect(onWillMount).toHaveBeenCalled();
  });

  describe('ToolbarPageConfig with props', () => {
    it('verify with prop content WIDGET_LIST', () => {
      component = shallowWithIntl(<ToolbarPageConfig content={WIDGET_LIST} />);
      expect(console.error).not.toHaveBeenCalled();
      expect(component.exists()).toBe(true);
      expect(component.instance().props.content).toEqual('widgets');
    });

    it('verify with prop content PAGES', () => {
      component = shallowWithIntl(<ToolbarPageConfig content={PAGES} />);
      expect(console.error).not.toHaveBeenCalled();
      expect(component.exists()).toBe(true);
      expect(component.instance().props.content).toEqual('pages');
    });

    it('verify with prop toggleExpanded', () => {
      component = shallowWithIntl(<ToolbarPageConfig toggleExpanded />);
      expect(component.exists()).toBe(true);
      expect(component.instance().props.toggleExpanded).toBe(true);
      expect(component.find('div').first().hasClass('ToolbarPageConfig__drawer-pf-sidebar-right-expanded')).toBeTruthy();
    });
  });
});
