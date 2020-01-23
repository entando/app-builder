import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ErrorsAlert from 'ui/common/form/ErrorsAlert';

const MESSAGES = [
  'Error message 1',
  'Error message 2',
];

const handleDismiss = jest.fn();

jest.mock('react-intl');

describe('ErrorsAlert', () => {
  describe('with empty messages array', () => {
    let component;
    beforeEach(() => {
      component = shallow(<ErrorsAlert messages={[]} onDismiss={handleDismiss} />);
    });
    it('render component without crash', () => {
      expect(component.exists()).toBe(true);
    });
    it('does not render an Alert', () => {
      expect(component.find('Alert').exists()).toBe(false);
    });
  });

  describe('with populated messages array', () => {
    let component;
    let alertComponent;
    beforeEach(() => {
      component = shallow(<ErrorsAlert messages={MESSAGES} onDismiss={handleDismiss} />);
      alertComponent = component.find('Alert');
    });
    it('does render an Alert', () => {
      expect(alertComponent.exists()).toBe(true);
    });
    it('passes the onDismiss prop to the Alert', () => {
      expect(alertComponent.prop('toggle')).toBe(handleDismiss);
    });
    it('renders a li for each message', () => {
      expect(component.find('li')).toHaveLength(MESSAGES.length);
    });
  });
});
