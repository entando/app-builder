import React from 'react';
import 'test/enzyme-init';
import { shallowWithIntl } from 'test/legacyTestUtils';
import { EmptyState } from 'patternfly-react';
import ReloadConfig from 'ui/reload-configuration/ReloadConfig';


describe('ReloadConfig', () => {
  let component;
  const onReload = jest.fn();
  beforeEach(() => {
    component = shallowWithIntl(<ReloadConfig onReload={onReload} />);
  });
  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('root component is a EmptyState component', () => {
    expect(component.type()).toBe(EmptyState);
  });

  it('contains an icon', () => {
    expect(component.find('.ReloadConfig__icon')).toExist();
  });

  it('contains a title', () => {
    expect(component.find('.ReloadConfig__title')).toExist();
  });

  it('contains an info section', () => {
    expect(component.find('.ReloadConfig__info')).toExist();
  });

  it('contains the reload button', () => {
    expect(component.find('.ReloadConfig__reload-button')).toExist();
  });

  describe('reload configuration', () => {
    it('clicking on reload button calls "onReload" function', () => {
      const button = component.find('.ReloadConfig__reload-button');
      button.simulate('click');
      expect(onReload).toHaveBeenCalled();
    });
  });
});
