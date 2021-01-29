import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { history } from 'app-init/router';
import PageTemplateListMenuActions from 'ui/page-templates/list/PageTemplateListMenuActions';

global.console.error = jest.fn();
const onClickDelete = jest.fn();
const PAGE_TEMPLATE_CODE = 'page_model_code';

history.push = jest.fn();

beforeEach(jest.clearAllMocks);
describe('PageTemplateListMenuActions', () => {
  let component;

  describe('with no code', () => {
    beforeEach(() => {
      component = shallow(<PageTemplateListMenuActions />);
    });

    it('logs an error', () => {
      expect(global.console.error).toHaveBeenCalled();
    });
  });

  describe('basic rendering', () => {
    beforeEach(() => {
      component = shallow((
        <PageTemplateListMenuActions
          code={PAGE_TEMPLATE_CODE}
          onClickDelete={onClickDelete}
        />
      ));
    });

    it('renders without crashing', () => {
      expect(component.exists()).toEqual(true);
    });

    it('has a dropdown with kebab button', () => {
      expect(component.find('DropdownKebab')).toHaveLength(1);
    });

    it('when clicking on the edit button, goes to the edit page template page', () => {
      const onClick = component.find('.PageTemplateListMenuActions__menu-item-edit').prop('onClick');
      onClick();
      expect(history.push).toHaveBeenCalledWith('/page-template/edit/page_model_code');
    });

    it('when clicking on the clone button, goes to the clone page template page', () => {
      const onClick = component.find('.PageTemplateListMenuActions__menu-item-clone').prop('onClick');
      onClick();
      expect(history.push).toHaveBeenCalledWith('/page-template/clone/page_model_code');
    });

    it('when clicking on the details button, goes to the page template details page', () => {
      const onClick = component.find('.PageTemplateListMenuActions__menu-item-details').prop('onClick');
      onClick();
      expect(history.push).toHaveBeenCalledWith('/page-template/view/page_model_code');
    });

    it('when clicking on the delete button, calls the onClickDelete function', () => {
      const onClick = component.find('.PageTemplateListMenuActions__menu-item-delete').prop('onClick');
      onClick();
      expect(onClickDelete).toHaveBeenCalled();
    });
  });
});
