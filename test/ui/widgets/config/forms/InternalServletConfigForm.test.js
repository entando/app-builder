import React from 'react';

import { shallow, mount } from 'enzyme';
import InternalServletConfigForm from 'ui/widgets/config/forms/InternalServletConfigForm';
// import { shallowWithIntl, mockRenderWithIntl } from '../../../../test/testUtils';

import { mockRenderWithIntl, configEnzymeAdapter } from './help';

configEnzymeAdapter();

// console.log('\n\n\n\n\nobject', InternalServletConfigForm);

const handleSubmit = jest.fn();
const EVENT = { preventDefault: jest.fn() };


describe('InternalServletConfigForm', () => {
  const component = mount(mockRenderWithIntl(<InternalServletConfigForm
    widgetId="formAction"
    handleSubmit={handleSubmit}
  />));
  // beforeEach(() => {
  //   // jest.clearAllMocks();
  //   // component = shallow(mockRenderWithIntl(<InternalServletConfigFormBody
  //   //   widgetId="formAction"
  //   //   handleSubmit={handleSubmit}
  //   // />));
  // });

  // it('it is a form', () => {
  //   expect(component.is('form')).toBe(true);
  // });

  // it('has class InternalServletConfigForm', () => {
  //   expect(component.hasClass('InternalServletConfigForm')).toBe(true);
  // });

  // it('on form submit, calls ev.preventDefault()', () => {
  //   component.find('form').simulate('submit', EVENT);
  //   expect(EVENT.preventDefault).toHaveBeenCalled();
  // });

  // it('on form submit, calls handleSubmit', () => {
  //   component.find('form').simulate('submit', EVENT);
  //   expect(handleSubmit).toHaveBeenCalled();
  // });
});
