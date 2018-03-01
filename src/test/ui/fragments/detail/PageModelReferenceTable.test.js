import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageModelReferenceTable from 'ui/fragments/detail/PageModelReferenceTable';

const PAGE_MODEL_MOCK = {
  code: 'pageModelCode',
  name: 'My Page Model',
};

describe('PageModelReferenceTable', () => {
  let component;
  let referencesPageModels;


  beforeEach(() => {
    referencesPageModels = jest.fn();
  });

  const buildPageModelReferenceTable = (pageModel) => {
    const props = {
      pageModel,
      referencesPageModels,
    };
    return shallow(<PageModelReferenceTable {...props} />);
  };

  it('renders without crashing', () => {
    component = buildPageModelReferenceTable();
    expect(component.exists()).toEqual(true);
  });

  it('verify return EmptyData if pageModels array is empty', () => {
    component = buildPageModelReferenceTable();
    expect(component.find('EmptyData').exists()).toEqual(true);
  });

  it('verify return Table with class PageModelReferenceTable if fragments array is not empty', () => {
    const pageModel = [PAGE_MODEL_MOCK];
    component = buildPageModelReferenceTable(pageModel);
    expect(component.find('Table').hasClass('PageModelReferenceTable')).toEqual(true);
  });

  it('verify click edit button', () => {
    const pageModel = [PAGE_MODEL_MOCK];
    component = buildPageModelReferenceTable(pageModel);
    const preventDefault = jest.fn();
    component.find('MenuItem').simulate('click', { preventDefault });
    expect(referencesPageModels).toHaveBeenCalled();
    expect(referencesPageModels).toHaveBeenCalledWith(PAGE_MODEL_MOCK);
  });
});
