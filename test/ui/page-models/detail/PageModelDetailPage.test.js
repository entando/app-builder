import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageModelDetailPage from 'ui/page-models/detail/PageModelDetailPage';

const PAGE_MODEL_CODE = 'page_model_code';

describe('PageModelDetailPage', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow(<PageModelDetailPage pageModelCode={PAGE_MODEL_CODE} />);
  });

  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('is a wrapped InternalPage', () => {
    expect(component.first().is('InternalPage')).toBe(true);
  });

  it('has the PageModelDetailPage class', () => {
    expect(component.first()).toHaveClassName('PageModelDetailPage');
  });

  it('has a breadcrumb', () => {
    expect(component.find('Breadcrumb')).toExist();
  });

  it('has a page title', () => {
    expect(component.find('PageTitle')).toExist();
  });

  it('has the edit button', () => {
    expect(component.find('.PageModelDetailPage__edit-btn')).toExist();
  });

  it('has the selected page model info table', () => {
    expect(component.find('SelectedPageModelDetailTableContainer')).toExist();
  });

  it('has the selected page model page references table', () => {
    expect(component.find('PageModelPageReferencesTableContainer')).toExist();
  });
});
