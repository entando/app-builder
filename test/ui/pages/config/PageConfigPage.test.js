import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageConfigPage from 'ui/pages/config/PageConfigPage';


describe('PageConfigPage', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow(<PageConfigPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is an InternalPage', () => {
    expect(component.is('InternalPage')).toBe(true);
  });

  it('has the PageConfigPage class', () => {
    expect(component.hasClass('PageConfigPage')).toBe(true);
  });

  it('has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toHaveLength(1);
  });

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    shallow(<PageConfigPage onWillMount={onWillMount} />);
    expect(onWillMount).toHaveBeenCalled();
    component.unmount();
    onWillMount.mockClear();
    expect(onWillMount).not.toHaveBeenCalled();
  });

  it('will call onWillUnmount on componentWillUnmount', () => {
    const onWillUnmount = jest.fn();
    component = shallow(<PageConfigPage onWillUnmount={onWillUnmount} />);
    expect(onWillUnmount).not.toHaveBeenCalled();
    component.unmount();
    expect(onWillUnmount).toHaveBeenCalled();
  });

  it('will call setSelectedPageOnTheFly(true) on click on-the-fly YES button', () => {
    const setSelectedPageOnTheFly = jest.fn();
    component = shallow(<PageConfigPage setSelectedPageOnTheFly={setSelectedPageOnTheFly} />);
    expect(setSelectedPageOnTheFly).not.toHaveBeenCalled();
    component.find('.PageConfigPage__on-the-fly-yes').simulate('click');
    expect(setSelectedPageOnTheFly).toHaveBeenCalledWith(true);
  });

  it('will call setSelectedPageOnTheFly(false) on click on-the-fly NO button', () => {
    const setSelectedPageOnTheFly = jest.fn();
    component = shallow(<PageConfigPage setSelectedPageOnTheFly={setSelectedPageOnTheFly} />);
    expect(setSelectedPageOnTheFly).not.toHaveBeenCalled();
    component.find('.PageConfigPage__on-the-fly-no').simulate('click');
    expect(setSelectedPageOnTheFly).toHaveBeenCalledWith(false);
  });

  it('will toggle info table on click info button', () => {
    component = shallow(<PageConfigPage />);
    expect(component.state('infoTableOpen')).toBe(false);
    component.find('.PageConfigPage__info-btn').simulate('click');
    expect(component.state('infoTableOpen')).toBe(true);
  });

  describe('if page config does not match default', () => {
    beforeEach(() => {
      component = shallow(<PageConfigPage pageConfigMatchesDefault={false} />);
    });

    it('renders "Apply default widgets" button', () => {
      expect(component.find('.PageConfigPage__apply-default-btn').exists()).toBe(true);
    });

    it('does not render "Default widgets applied" label', () => {
      expect(component.find('.PageConfigPage__default-applied-label').exists()).toBe(false);
    });
  });

  describe('if page config matches default', () => {
    beforeEach(() => {
      component = shallow(<PageConfigPage pageConfigMatchesDefault />);
    });

    it('does not render "Apply default widgets" button', () => {
      expect(component.find('.PageConfigPage__apply-default-btn').exists()).toBe(false);
    });

    it('renders "Default widgets applied" label', () => {
      expect(component.find('.PageConfigPage__default-applied-label').exists()).toBe(true);
    });
  });

  describe('if page is published', () => {
    beforeEach(() => {
      component = shallow(<PageConfigPage pageIsPublished />);
    });

    it('publish button should be disabled', () => {
      expect(component.find('.PageConfigPage__publish-btn').prop('disabled')).toBe(true);
    });

    it('unpublish button should be enabled', () => {
      expect(component.find('.PageConfigPage__unpublish-btn').prop('disabled')).toBe(false);
    });
  });

  describe('if page is not published', () => {
    beforeEach(() => {
      component = shallow(<PageConfigPage pageIsPublished={false} />);
    });

    it('publish button should be enabled', () => {
      expect(component.find('.PageConfigPage__publish-btn').prop('disabled')).toBe(false);
    });

    it('unpublish button should be disabled', () => {
      expect(component.find('.PageConfigPage__unpublish-btn').prop('disabled')).toBe(true);
    });
  });
});
