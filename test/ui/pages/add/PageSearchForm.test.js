import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { PageSearchFormBody } from 'ui/pages/list/PageSearchForm';
import { shallowWithIntl } from '../../../test/testUtils';


const handleSubmitMock = jest.fn();
const EVENT = { preventDefault: jest.fn() };

describe('PageSearchForm', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallowWithIntl(<PageSearchFormBody handleSubmit={handleSubmitMock} />);
  });
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
  it('has the PageSearchForm class', () => {
    expect(component.hasClass('PageSearchForm')).toBe(true);
  });
  it('form onSubmit calls handleSubmit', () => {
    component.find('form').prop('onSubmit')(EVENT);
    expect(EVENT.preventDefault).toHaveBeenCalled();
    expect(handleSubmitMock).toHaveBeenCalled();
  });
});
