import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { WIDGET_LIST, PAGES } from 'state/page-config/const';

import ToolbarPageConfig from 'ui/pages/config/ToolbarPageConfig';

global.console.error = jest.fn();
const changeContentMock = jest.fn();

describe('ToolbarPageConfig', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow(<ToolbarPageConfig />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('has two ToolbarContentIcon', () => {
    expect(component.find('ToolbarContentIcon')).toHaveLength(2);
  });

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    shallow(<ToolbarPageConfig onWillMount={onWillMount} />);
    expect(onWillMount).toHaveBeenCalled();
  });

  it('when click will call changeContent ', () => {
    component = shallow(<ToolbarPageConfig changeContent={changeContentMock} />);
    component.find('.ToolbarPageConfig__drawer-pf-title').simulate('click');
    expect(changeContentMock).toHaveBeenCalled();
  });

  describe('ToolbarPageConfig with props', () => {
    it('erros with prop content wrong ', () => {
      component = shallow(<ToolbarPageConfig content="test" />);
      expect(console.error).toHaveBeenCalled();
    });

    it('verify with prop content WIDGET_LIST', () => {
      component = shallow(<ToolbarPageConfig content={WIDGET_LIST} />);
      expect(console.error).not.toHaveBeenCalled();
      expect(component.exists()).toBe(true);
      expect(component.instance().props.content).toEqual('widgets');
    });

    it('verify with prop content PAGES', () => {
      component = shallow(<ToolbarPageConfig content={PAGES} />);
      expect(console.error).not.toHaveBeenCalled();
      expect(component.exists()).toBe(true);
      expect(component.instance().props.content).toEqual('pages');
    });

    it('verify with prop toolbarExpanded', () => {
      component = shallow(<ToolbarPageConfig toolbarExpanded />);
      expect(component.exists()).toBe(true);
      expect(component.instance().props.toolbarExpanded).toBe(true);
      expect(component.find('div').first().hasClass('ToolbarPageConfig__drawer-pf-sidebar-right-expanded')).toBeTruthy();
    });
  });
});
