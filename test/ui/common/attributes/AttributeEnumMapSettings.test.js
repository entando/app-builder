import React from 'react';
import AttributeEnumMapSettings from 'ui/common/attributes/AttributeEnumMapSettings';
import { renderWithIntl } from 'test/testUtils';
import '@testing-library/jest-dom/extend-expect';
import { Formik } from 'formik';

const DATA = { code: 'code', descr: 'descr' };

jest.unmock('react-redux');

describe('AttributeEnumMapSettings', () => {
  let component;
  let container;
  beforeEach(() => {
    component = renderWithIntl(<Formik>
      <AttributeEnumMapSettings enumeratorMapExtractorBeans={[DATA]} />
      {/* eslint-disable-next-line react/jsx-indent */}
                               </Formik>);

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

  it('has a enumeratorMapExtractorBeans select field', () => {
    const element = container.querySelector('[name="enumeratorMapExtractorBeans"]');
    expect(element).toBeTruthy();

    expect(element.className).toContain('SelectInput');
  });

  it('has a enumeratorStaticItemsSeparator text field', () => {
    const element = container.querySelector('[name="enumeratorStaticItemsSeparator"]');
    expect(element).toBeTruthy();
    expect(element.className).toContain('RenderTextInput');
  });
});
