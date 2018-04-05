import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { gotoRoute } from 'frontend-common-components';
import { ROUTE_PAGE_MODEL_EDIT, ROUTE_PAGE_MODEL_DETAIL } from 'app-init/router';


import PageModelListMenuActions from 'ui/page-models/list/PageModelListMenuActions';

global.console.error = jest.fn();
const onClickDelete = jest.fn();
const PAGE_MODEL_CODE = 'page_model_code';

beforeEach(jest.clearAllMocks);
describe('PageModelListMenuActions', () => {
  let component;

  describe('with no code', () => {
    beforeEach(() => {
      component = shallow(<PageModelListMenuActions />);
    });

    it('logs an error', () => {
      expect(global.console.error).toHaveBeenCalled();
    });
  });

  describe('basic rendering', () => {
    beforeEach(() => {
      component = shallow((
        <PageModelListMenuActions
          code={PAGE_MODEL_CODE}
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

    it('when clicking on the edit button, goes to the edit page model page', () => {
      const onClick = component.find('.PageModelListMenuActions__menu-item-edit').prop('onClick');
      onClick();
      expect(gotoRoute).toHaveBeenCalledWith(
        ROUTE_PAGE_MODEL_EDIT,
        { pageModelCode: PAGE_MODEL_CODE },
      );
    });

    it('when clicking on the details button, goes to the page model details page', () => {
      const onClick = component.find('.PageModelListMenuActions__menu-item-details').prop('onClick');
      onClick();
      expect(gotoRoute).toHaveBeenCalledWith(
        ROUTE_PAGE_MODEL_DETAIL,
        { pageModelCode: PAGE_MODEL_CODE },
      );
    });

    it('when clicking on the delete button, calls the onClickDelete function', () => {
      const onClick = component.find('.PageModelListMenuActions__menu-item-delete').prop('onClick');
      onClick();
      expect(onClickDelete).toHaveBeenCalled();
    });
  });
});
