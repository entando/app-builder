import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTitle from 'ui/internal-page/PageTitle';
import { omit } from 'lodash';

const props = {
  titleId: 'app.edit',
  helpId: 'widget.help',
};

describe('ui/internal-page/PageTitle', () => {
  let component;
  beforeEach(() => {
    component = shallow(<PageTitle {...props} />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
  it('root component has class PageTitle', () => {
    expect(component.hasClass('PageTitle')).toEqual(true);
  });
  it('renders title into <h1> DOM element with class PageTitle__title', () => {
    expect(component.find('h1.PageTitle__title').exists()).toEqual(true);
  });
  it('renders icon if helpId is in props', () => {
    expect(component.find('.PageTitle__icon').exists()).toEqual(true);
  });
  it('OverlayTrigger component does not render if helpId prop is null', () => {
    component = shallow(<PageTitle {...omit(props, ['helpId'])} />);
    expect(component.find('OverlayTrigger').exists()).toEqual(false);
  });
});
