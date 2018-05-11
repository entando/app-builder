import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import LabelsAndLanguagesPage from 'ui/labels/list/LabelsAndLanguagesPage';

const onWillMount = jest.fn();

describe('LabelsAndLanguagesPage', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const props = {
    page: 1,
    pageSize: 10,
    totalItems: 10,
  };

  describe('basic rendering', () => {
    beforeEach(() => {
      component = shallow(<LabelsAndLanguagesPage {...props} onWillMount={onWillMount} />);
    });

    it('renders without crashing', () => {
      expect(component.exists()).toEqual(true);
    });

    it('verify if exist InternalPage with class LabelsAndLanguagesPage', () => {
      expect(component.find('InternalPage').hasClass('LabelsAndLanguagesPage')).toBe(true);
    });

    it('verify if has a breadcrumb', () => {
      expect(component.find('Breadcrumb').exists()).toBe(true);
    });

    it('verify if has a page title', () => {
      expect(component.find('PageTitle').exists()).toBe(true);
    });

    it('when clicking on Languages tab, it should render the languages', () => {
      const onClick = component.find('.LabelsAndLanguagesPage__header-tab').at(0).prop('onClick');
      onClick();
      expect(component.state('activeTab')).toBe('languages');
    });

    it('when clicking on Labels tab, it should render the labels', () => {
      const onClick = component.find('.LabelsAndLanguagesPage__header-tab').at(1).prop('onClick');
      onClick();
      expect(component.state('activeTab')).toBe('labels');
    });
  });

  it('it calls onWillMount at rendering', () => {
    const onWillMountMock = jest.fn();
    shallow(<LabelsAndLanguagesPage {...props} onWillMount={onWillMountMock} />);
    expect(onWillMountMock).toHaveBeenCalled();
  });

  it('on change page, it calls onWillMount with new page data', () => {
    onWillMount.mockClear();
    component.instance().changePage(3);
    expect(onWillMount).toHaveBeenCalledWith({
      page: 3,
      pageSize: props.pageSize,
    });
  });

  it('on change page size, it calls onWillMount with new page data', () => {
    onWillMount.mockClear();
    component.instance().changePageSize(20);
    expect(onWillMount).toHaveBeenCalledWith({
      page: props.page,
      pageSize: 20,
    });
  });
});
