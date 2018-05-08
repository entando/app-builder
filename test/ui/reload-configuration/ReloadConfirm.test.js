import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ReloadConfirm from 'ui/reload-configuration/ReloadConfirm';

const SUCCESS_STATUS = 'success';
const ERROR_STATUS = 'error';

describe('ReloadConfirm', () => {
  let component;

  it('renders without crashing', () => {
    component = shallow(<ReloadConfirm />);
    expect(component).toExist();
  });

  describe('if "status" prop is not defined', () => {
    it('renders an Alert of type "danger"', () => {
      component = shallow(<ReloadConfirm />);
      const alert = component.find('Alert');
      expect(alert.prop('type')).toEqual('danger');
    });
  });

  describe('if "status" prop is defined', () => {
    it('renders an Alert of type "success" if status is "success"', () => {
      component = shallow(<ReloadConfirm status={SUCCESS_STATUS} />);
      const alert = component.find('Alert');
      expect(alert.prop('type')).toEqual('success');
    });

    it('renders an Alert of type "danger" if status is not "success"', () => {
      component = shallow(<ReloadConfirm status={ERROR_STATUS} />);
      const alert = component.find('Alert');
      expect(alert.prop('type')).toEqual('danger');
    });
  });
});
