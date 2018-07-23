import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import RenderListField from 'ui/common/form/RenderListField';

const ATTRIBUTE_TYPE = 'Number';
const FIELDS = Object.create(['a', 'b', 'c']); // fields must be an array-like object (not an array)
const OPTIONS = [{ value: '1', displayName: 'One' }, { value: '2', displayName: 'Two' }];
const OPTION_VALUE = 'value';
const OPTION_DISPLAY_NAME = 'displayName';
const LABEL = 'My label';


FIELDS.swap = jest.fn();
FIELDS.push = jest.fn();
FIELDS.remove = jest.fn();


describe('RenderListField', () => {
  beforeEach(jest.clearAllMocks);

  let component;
  beforeEach(() => {
    component = shallow((
      <RenderListField
        attributeType={ATTRIBUTE_TYPE}
        fields={FIELDS}
        options={OPTIONS}
        optionValue={OPTION_VALUE}
        optionDisplayName={OPTION_DISPLAY_NAME}
        label={LABEL}
      />
    ));
  });

  it('renders without crashing', () => {
    expect(component).toExist();
  });

  it('renders the label', () => {
    expect(component.contains(<div>{LABEL}</div>)).toBe(true);
  });

  it('renders a Field for each field', () => {
    FIELDS.forEach((name) => {
      expect(component.find(`Field[name="${name}"]`)).toExist();
    });
  });

  it('clicking "Add" button calls fields.push', () => {
    component.find('Button[title="Add"]').simulate('click');
    expect(FIELDS.push).toHaveBeenCalled();
  });

  describe('item headings', () => {
    let headings;
    beforeEach(() => {
      headings = component.find('PanelHeading');
    });

    it(`should be ${FIELDS.length}`, () => {
      expect(headings).toHaveLength(FIELDS.length);
    });

    it('the first has a "go down" and "delete" buttons', () => {
      const buttons = headings.first().find('Button');
      expect(buttons.find('i[className="fa fa-sort-desc"]')).toExist();
      expect(buttons.find('i[className="fa fa-sort-asc"]')).not.toExist();
      expect(buttons.find('[id="app.delete"]')).toExist();
    });

    it('the last has a "go up" and "delete" buttons', () => {
      const buttons = headings.last().find('Button');
      expect(buttons.find('i[className="fa fa-sort-desc"]')).not.toExist();
      expect(buttons.find('i[className="fa fa-sort-asc"]')).toExist();
      expect(buttons.find('[id="app.delete"]')).toExist();
    });

    it('the middle ones have a "go up", "go down" and "delete" buttons', () => {
      const buttons = headings.at(1).find('Button');
      expect(buttons.find('i[className="fa fa-sort-desc"]')).toExist();
      expect(buttons.find('i[className="fa fa-sort-asc"]')).toExist();
      expect(buttons.find('[id="app.delete"]')).toExist();
    });

    it('clicking "go up" calls fields.swap', () => {
      headings
        .at(1)
        .find('Button')
        .find('i[className="fa fa-sort-asc"]')
        .parent()
        .simulate('click');
      expect(FIELDS.swap).toHaveBeenCalledWith(1, 0);
    });

    it('clicking "go down" calls fields.swap', () => {
      headings
        .at(1)
        .find('Button')
        .find('i[className="fa fa-sort-desc"]')
        .parent()
        .simulate('click');
      expect(FIELDS.swap).toHaveBeenCalledWith(1, 2);
    });

    it('clicking "delete" calls fields.remove', () => {
      headings
        .at(1)
        .find('Button')
        .find('[id="app.delete"]')
        .parent()
        .simulate('click');
      expect(FIELDS.remove).toHaveBeenCalledWith(1);
    });
  });
});
