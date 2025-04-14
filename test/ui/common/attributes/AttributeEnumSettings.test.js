import React from 'react';
import AttributeEnumSettings from 'ui/common/attributes/AttributeEnumSettings';
import { renderWithIntl } from 'test/testUtils';
import '@testing-library/jest-dom/extend-expect';
import { Formik } from 'formik';

jest.unmock('react-redux');

describe('AttributeEnumSettings', () => {
  let component;
  let container;
  beforeEach(() => {
    component = renderWithIntl(<Formik><AttributeEnumSettings /></Formik>);
    ({ container } = component);
  });

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  it('has one Row', () => {
    expect(container.querySelector('.row')).toBeTruthy();
    expect(container.querySelectorAll('.row')).toHaveLength(1);
  });

  it('has a enumeratorStaticItems text field', () => {
    const element = container.querySelector('[name="enumeratorStaticItems"]');
    expect(element).toBeTruthy();
    expect(element.className).toContain('RenderTextInput');
  });

  it('has a enumeratorExtractorBean select field', () => {
    const element = container.querySelector('[name="enumeratorExtractorBean"]');
    expect(element).toBeTruthy();
    expect(element.className).toContain('SelectInput');
  });

  it('has a enumeratorStaticItemsSeparator text field', () => {
    const element = container.querySelector('[name="enumeratorStaticItemsSeparator"]');
    expect(element).toBeTruthy();
    expect(element.className).toContain('RenderTextInput');
  });
});
