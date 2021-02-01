import React from 'react';

import 'test/enzyme-init';
import { mount } from 'enzyme';
import PageSearchForm from 'ui/pages/list/PageSearchForm';
import { mockRenderWithIntlAndStore } from 'test/testUtils';


const handleSubmitMock = jest.fn();
const EVENT = { preventDefault: jest.fn() };

jest.unmock('react-redux');
jest.unmock('redux-form');

describe('PageSearchForm', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = mount(mockRenderWithIntlAndStore(<PageSearchForm
      handleSubmit={handleSubmitMock}
    />));
  });
  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
  it('has the PageSearchForm class', () => {
    expect(component.exists('.PageSearchForm')).toBe(true);
  });
  it('form onSubmit calls handleSubmit', () => {
    component.find('form').prop('onSubmit')(EVENT);
    expect(EVENT.preventDefault).toHaveBeenCalled();
    expect(handleSubmitMock).toHaveBeenCalled();
  });
});
