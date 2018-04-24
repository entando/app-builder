import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import DetailCategoryTable from 'ui/categories/detail/DetailCategoryTable';
import { MYCATEGORY1_PAYLOAD, MOCK_REFERENCES } from 'test/mocks/categories';

const onWillMount = jest.fn();
const REFERENCE_LIST = ['jacmsContentManager', 'jacmsResourceManager'];
const REFERENCE_MAP = {
  [REFERENCE_LIST[0]]: MOCK_REFERENCES[REFERENCE_LIST[0]],
  [REFERENCE_LIST[1]]: MOCK_REFERENCES[REFERENCE_LIST[1]],
};
describe('DetailCategoryTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<DetailCategoryTable
      onWillMount={onWillMount}
      category={MYCATEGORY1_PAYLOAD}
    />);
  });

  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('root element has DetailCategory class', () => {
    expect(component.hasClass('DetailCategory')).toBe(true);
  });

  it('renders a button', () => {
    const button = component.find('.DetailCategory__collapse-trigger');
    expect(button).toHaveLength(1);
  });

  it('renders the detail list', () => {
    const list = component.find('.DetailCategory__detail-list');
    expect(list).toHaveLength(1);
  });

  it('renders the detail list element', () => {
    const listItems = component.find('.DetailCategory__detail-item');
    expect(listItems).toHaveLength(2);
  });

  it('renders the category titles', () => {
    const keys = component.find('.DetailCategory__detail-titles-key');
    expect(keys).toHaveLength(2);
  });

  describe('test no titles', () => {
    beforeEach(() => {
      component = shallow(<DetailCategoryTable
        onWillMount={onWillMount}
        category={{ ...MYCATEGORY1_PAYLOAD, titles: {} }}
      />);
    });

    it('does not render the category titles', () => {
      const keys = component.find('.DetailCategory__detail-titles-key');
      expect(keys).toHaveLength(0);
    });
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallow(<DetailCategoryTable
        onWillMount={onWillMount}
        category={MYCATEGORY1_PAYLOAD}
      />);
    });

    describe('with references', () => {
      beforeEach(() => {
        component.setProps({
          referenceList: REFERENCE_LIST,
          referenceMap: REFERENCE_MAP,
        });
      });

      it('renders references elements', () => {
        const references = component.find('.DetailCategory_reference');
        expect(references).toHaveLength(REFERENCE_LIST.length);
      });
    });
  });
});
