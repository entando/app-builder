import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import ErrorsAlertContainer from 'ui/common/form/ErrorsAlertContainer';
import DetailWidgetPage from 'ui/widgets/detail/DetailWidgetPage';
import DetailWidgetElement from 'ui/widgets/detail/DetailWidgetElement';

const props = {
  onWillMount: jest.fn(),
  widgetInfo: {},
};

describe('DetailWidgetPage', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DetailWidgetPage {...props} />);
  });

  it('renders component without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('verify if InternalPage component has class DetailWidgetPage', () => {
    expect(component.find('InternalPage').hasClass('DetailWidgetPage')).toBe(true);
  });

  it('verify if has a breadcrumb', () => {
    expect(component.find('Breadcrumb').exists());
  });

  it('verify if has a page title', () => {
    expect(component.find('PageTitle').exists());
  });

  it('verify if has ErrorsAlertContainer', () => {
    expect(component.find(ErrorsAlertContainer).exists());
  });

  it('verify if has DetailWidgetElement', () => {
    expect(component.find(DetailWidgetElement).exists());
  });
});
