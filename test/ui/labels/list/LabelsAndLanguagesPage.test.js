import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl } from 'test/legacyTestUtils';
import LabelsAndLanguagesPage from 'ui/labels/list/LabelsAndLanguagesPage';

const onWillMount = jest.fn();
const onClickTab = jest.fn();

describe('LabelsAndLanguagesPage', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const props = {
    page: 1,
    pageSize: 10,
    totalItems: 10,
    onClickTab,
  };

  describe('basic rendering', () => {
    beforeEach(() => {
      component =
        shallowWithIntl(<LabelsAndLanguagesPage {...props} onWillMount={onWillMount} />).dive();
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

    it('verify click on header tab labels', () => {
      component.find('.LabelsAndLanguagesPage__header-tab-labels').simulate('click');
      expect(onClickTab).toHaveBeenCalledWith('labels');
    });
    it('verify click on header tab languages', () => {
      component.find('.LabelsAndLanguagesPage__header-tab-languages').simulate('click');
      expect(onClickTab).toHaveBeenCalledWith('languages');
    });
  });


  it('it calls onWillMount at rendering', () => {
    const onWillMountMock = jest.fn();
    shallowWithIntl(<LabelsAndLanguagesPage {...props} onWillMount={onWillMountMock} />).dive();
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
