import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { InternalServletConfigFormBody } from 'ui/widgets/config/forms/InternalServletConfigForm';

const handleSubmit = jest.fn();
const EVENT = { preventDefault: jest.fn() };

describe('InternalServletConfigForm', () => {
  let component;
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow((
      <InternalServletConfigFormBody
        widgetId="formAction"
        handleSubmit={handleSubmit}
      />
    ));
  });

  it('it is a form', () => {
    expect(component.is('form')).toBe(true);
  });

  it('has class InternalServletConfigForm', () => {
    expect(component.hasClass('InternalServletConfigForm')).toBe(true);
  });

  it('on form submit, calls ev.preventDefault()', () => {
    component.find('form').simulate('submit', EVENT);
    expect(EVENT.preventDefault).toHaveBeenCalled();
  });

  it('on form submit, calls handleSubmit', () => {
    component.find('form').simulate('submit', EVENT);
    expect(handleSubmit).toHaveBeenCalled();
  });
});
