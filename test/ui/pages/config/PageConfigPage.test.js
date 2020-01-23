import React from 'react';

import 'test/enzyme-init';
import PageConfigPage from 'ui/pages/config/PageConfigPage';
import { shallowWithIntl } from 'test/testUtils';

jest.unmock('react-redux');
jest.unmock('redux-form');

jest.spyOn(global, 'addEventListener');
jest.spyOn(global, 'removeEventListener');

describe('PageConfigPage', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallowWithIntl(<PageConfigPage />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('is a wrapped InternalPage', () => {
    expect(component.first().dive().is('InternalPage')).toBe(true);
  });

  it('has the PageConfigPage class', () => {
    expect(component.first().dive().hasClass('PageConfigPage')).toBe(true);
  });

  it('has a breadcrumb', () => {
    expect(component.dive().find('Breadcrumb')).toHaveLength(1);
  });

  it('will call onWillMount on componentWillMount', () => {
    const onWillMount = jest.fn();
    shallowWithIntl(<PageConfigPage onWillMount={onWillMount} />).dive();
    expect(onWillMount).toHaveBeenCalled();
    component.unmount();
    onWillMount.mockClear();
    expect(onWillMount).not.toHaveBeenCalled();
  });

  it('will add a window scroll event listener on componentDidMount', () => {
    const { winScrollListener } = component.dive().instance();
    expect(global.addEventListener).toHaveBeenCalledWith('scroll', winScrollListener);
  });

  it('will remove the window scroll event listener on componentWillUnmount', () => {
    component.dive().unmount();
    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('will call onWillUnmount on componentWillUnmount', () => {
    const onWillUnmount = jest.fn();
    component = shallowWithIntl(<PageConfigPage onWillUnmount={onWillUnmount} />).dive();
    expect(onWillUnmount).not.toHaveBeenCalled();
    component.unmount();
    expect(onWillUnmount).toHaveBeenCalled();
  });

  it('will call setSelectedPageOnTheFly(true) on click on-the-fly YES button', () => {
    const setSelectedPageOnTheFly = jest.fn();
    component = shallowWithIntl(<PageConfigPage
      setSelectedPageOnTheFly={setSelectedPageOnTheFly}
    />).dive();
    expect(setSelectedPageOnTheFly).not.toHaveBeenCalled();
    component.find('.PageConfigPage__on-the-fly-yes').simulate('click');
    expect(setSelectedPageOnTheFly).toHaveBeenCalledWith(true);
  });

  it('will call setSelectedPageOnTheFly(false) on click on-the-fly NO button', () => {
    const setSelectedPageOnTheFly = jest.fn();
    component = shallowWithIntl(<PageConfigPage
      setSelectedPageOnTheFly={setSelectedPageOnTheFly}
    />).dive();
    expect(setSelectedPageOnTheFly).not.toHaveBeenCalled();
    component.find('.PageConfigPage__on-the-fly-no').simulate('click');
    expect(setSelectedPageOnTheFly).toHaveBeenCalledWith(false);
  });

  it('will toggle info table on click info button', () => {
    component = shallowWithIntl(<PageConfigPage />).dive();
    expect(component.state('infoTableOpen')).toBe(false);
    component.find('.PageConfigPage__info-btn').simulate('click');
    expect(component.state('infoTableOpen')).toBe(true);
  });

  describe('window scroll handler', () => {
    beforeEach(() => {
      document.querySelector = jest.fn().mockReturnValueOnce({
        parentElement: { offsetTop: 75 },
      });
    });

    it('it is throttled', () => {
      jest.spyOn(document, 'querySelector'); // called internally
      const { winScrollListener } = component.dive().instance();
      winScrollListener();
      winScrollListener();
      winScrollListener();
      expect(document.querySelector).toHaveBeenCalledTimes(1);
    });

    it('when the window scroll is above the sidewidget component, it should not be sticky', () => {
      window.scrollY = 0;
      const { winScrollListener } = component.dive().instance();

      winScrollListener();

      expect(component.dive().state('sticky')).toBeFalsy();
    });
  });

  describe('if page config does not match default', () => {
    beforeEach(() => {
      component = shallowWithIntl(<PageConfigPage pageConfigMatchesDefault={false} />).dive();
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
      component = shallowWithIntl(<PageConfigPage pageConfigMatchesDefault />).dive();
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
      component = shallowWithIntl(<PageConfigPage pageIsPublished />).dive();
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
      component = shallowWithIntl(<PageConfigPage pageIsPublished={false} />).dive();
    });

    it('publish button should be enabled', () => {
      expect(component.find('.PageConfigPage__publish-btn').prop('disabled')).toBe(false);
    });

    it('unpublish button should be disabled', () => {
      expect(component.find('.PageConfigPage__unpublish-btn').prop('disabled')).toBe(true);
    });
  });
});
