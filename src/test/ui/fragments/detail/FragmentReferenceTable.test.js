import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import FragmentReferenceTable from 'ui/fragments/detail/FragmentReferenceTable';


const FRAGMENT_MOCK = {
  code: 'fragmentCode',
};

describe('FragmentReferenceTable', () => {
  let component;
  let referencesFragments;


  beforeEach(() => {
    referencesFragments = jest.fn();
  });

  const buildDetailFragmentTable = (fragments) => {
    const props = {
      fragments,
      referencesFragments,
    };
    return shallow(<FragmentReferenceTable {...props} />);
  };

  it('renders without crashing', () => {
    component = buildDetailFragmentTable();
    expect(component.exists()).toEqual(true);
  });

  it('verify return EmptyData if fragments array is empty', () => {
    component = buildDetailFragmentTable();
    expect(component.find('EmptyData').exists()).toEqual(true);
  });

  it('verify return Table with class FragmentReferenceTable if fragments array is not empty', () => {
    const fragments = [FRAGMENT_MOCK];
    component = buildDetailFragmentTable(fragments);
    expect(component.find('Table').hasClass('FragmentReferenceTable')).toEqual(true);
  });

  it('verify click edit button', () => {
    const fragments = [FRAGMENT_MOCK];
    component = buildDetailFragmentTable(fragments);
    const preventDefault = jest.fn();
    component.find('MenuItem').simulate('click', { preventDefault });
    expect(referencesFragments).toHaveBeenCalled();
    expect(referencesFragments).toHaveBeenCalledWith(FRAGMENT_MOCK);
  });
});
