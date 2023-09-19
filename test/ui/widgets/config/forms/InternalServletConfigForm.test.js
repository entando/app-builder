import React from 'react';
import { act } from 'react-dom/test-utils';
import 'test/enzyme-init';
import { mount } from 'enzyme';
import InternalServletConfigForm from 'ui/widgets/config/forms/InternalServletConfigForm';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';

const handleSubmit = jest.fn();
const EVENT = { preventDefault: jest.fn() };

jest.unmock('react-redux');
jest.unmock('formik');

describe('InternalServletConfigForm', () => {
  let component;
  beforeEach(() => {
    component = mount(mockRenderWithIntlAndStore(<InternalServletConfigForm
      widgetId="formAction"
      onSubmit={handleSubmit}
    />));
  });

  it('it is a form', () => {
    expect(component.find('form').exists()).toBe(true);
  });

  it('has class InternalServletConfigForm', () => {
    expect(component.find('form').hasClass('InternalServletConfigForm')).toBe(true);
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
