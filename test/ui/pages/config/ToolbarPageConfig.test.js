import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import ToolbarPageConfig from 'ui/pages/config/ToolbarPageConfig';

describe('ToolbarPageConfig', () => {
  let component;
  beforeEach(() => {
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
    it('with WIDGET_LIST', () => {
      component = shallow(<ToolbarPageConfig content="WIDGET_LIST" />);
      expect(component.exists()).toEqual(true);
    });
  });
});
