import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { WIDGET_LIST, PAGES } from 'state/page-config/const';

import ToolbarPageConfig from 'ui/pages/config/ToolbarPageConfig';

describe('ToolbarPageConfig', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow(<ToolbarPageConfig />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    shallow(<ToolbarPageConfig onWillMount={onWillMount} />);
    expect(onWillMount).toHaveBeenCalled();
  });

  describe('ToolbarPageConfig with prop content', () => {
    it('erros with prop content wrong ', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      component = shallow(<ToolbarPageConfig content="test" />);
      expect(consoleError).toHaveBeenCalled();
      consoleError.mockReset();
      consoleError.mockRestore();
    });

    it('verify with prop content WIDGET_LIST ', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      component = shallow(<ToolbarPageConfig content={WIDGET_LIST} />);
      expect(consoleError).not.toHaveBeenCalled();
      expect(component.exists()).toBe(true);
      expect(component.instance().props.content).toEqual('widgets');
      consoleError.mockReset();
      consoleError.mockRestore();
    });

    it('verify with prop content PAGES ', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      component = shallow(<ToolbarPageConfig content={PAGES} />);
      expect(consoleError).not.toHaveBeenCalled();
      expect(component.exists()).toBe(true);
      expect(component.instance().props.content).toEqual('pages');
      consoleError.mockReset();
      consoleError.mockRestore();
    });
  });
});
