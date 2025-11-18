import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import ReloadConfirm from 'ui/reload-configuration/ReloadConfirm';

const SUCCESS_STATUS = 'success';
const WAITING_STATUS = 'waiting';
const FAIL_STATUS = 'fail';
const PROGRESS_STATUS = 'progress';

describe('ReloadConfirm', () => {
  let component;

  it('renders without crashing', () => {
    component = shallow(<ReloadConfirm />);
    expect(component).toExist();
  });

  describe('if "status" prop is not defined', () => {
    it('renders an Alert of type "info"', () => {
      component = shallow(<ReloadConfirm />);
      const alert = component.find('Alert');
      expect(alert.prop('type')).toEqual('info');
    });
  });

  describe('if "status" prop is defined', () => {
    it('renders an Alert of type "success" if status is "success"', () => {
      component = shallow(<ReloadConfirm status={SUCCESS_STATUS} />);
      const alert = component.find('Alert');
      expect(alert.prop('type')).toEqual('success');
    });

    it('renders an Alert of type "warning" if status is "waiting"', () => {
      component = shallow(<ReloadConfirm status={WAITING_STATUS} />);
      const alert = component.find('Alert');
      expect(alert.prop('type')).toEqual('warning');
    });

    it('renders an Alert of type "danger" if status is "fail"', () => {
      component = shallow(<ReloadConfirm status={FAIL_STATUS} />);
      const alert = component.find('Alert');
      expect(alert.prop('type')).toEqual('danger');
    });

    it('renders an Alert of type "info" if status is "progress"', () => {
      component = shallow(<ReloadConfirm status={PROGRESS_STATUS} />);
      const alert = component.find('Alert');
      expect(alert.prop('type')).toEqual('info');
    });
  });
});
