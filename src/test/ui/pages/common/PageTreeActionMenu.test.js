
import React from 'react';

import 'test/enzyme-init';
import { shallow } from 'enzyme';
import PageTreeActionMenu from 'ui/pages/common/PageTreeActionMenu';

const EVENT = { preventDefault: jest.fn() };

const onClickAdd = jest.fn();
const onClickEdit = jest.fn();
const onClickConfigure = jest.fn();
const onClickDetails = jest.fn();
const onClickClone = jest.fn();
const onClickDelete = jest.fn();
const onClickPublish = jest.fn();
const onClickUnpublish = jest.fn();

const PUBLISHED_PAGE = {
  code: 'publishedpage',
  status: 'published',
};
const UNPUBLISHED_PAGE = {
  code: 'unpublishedpage',
  status: 'unpublished',
};
const DRAFT_PAGE = {
  code: 'draftpage',
  status: 'draft',
};

describe('PageTreeActionMenu', () => {
  beforeEach(jest.clearAllMocks);

  it('renders without crashing', () => {
    const component = shallow(<PageTreeActionMenu page={DRAFT_PAGE} />);
    expect(component.exists()).toEqual(true);
  });

  it('does nothing if an event handler is not passed', () => {
    const component = shallow(<PageTreeActionMenu page={DRAFT_PAGE} />);
    component.find('.PageTreeActionMenuButton__menu-item-add').simulate('click', EVENT);
    expect(onClickAdd).not.toHaveBeenCalled();
  });

  describe('when page status is draft', () => {
    let component;
    beforeEach(() => {
      component = shallow(<PageTreeActionMenu page={DRAFT_PAGE} />);
    });
    it('renders the Publish menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-publish').exists()).toBe(true);
    });
    it('does not render the Unpublish menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-unpublish').exists()).toBe(false);
    });
  });

  describe('when page status is unpublished', () => {
    let component;
    beforeEach(() => {
      component = shallow(<PageTreeActionMenu page={UNPUBLISHED_PAGE} />);
    });
    it('renders the Publish menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-publish').exists()).toBe(true);
    });
    it('does not render the Unpublish menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-unpublish').exists()).toBe(false);
    });
  });

  describe('when page status is published', () => {
    let component;
    beforeEach(() => {
      component = shallow(<PageTreeActionMenu page={PUBLISHED_PAGE} />);
    });
    it('renders the Unpublish menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-unpublish').exists()).toBe(true);
    });
    it('does not render the Publish menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-publish').exists()).toBe(false);
    });
  });

  describe('on click menu items', () => {
    let component;
    beforeEach(() => {
      component = shallow((
        <PageTreeActionMenu
          page={DRAFT_PAGE}
          onClickAdd={onClickAdd}
          onClickEdit={onClickEdit}
          onClickConfigure={onClickConfigure}
          onClickDetails={onClickDetails}
          onClickClone={onClickClone}
          onClickDelete={onClickDelete}
          onClickPublish={onClickPublish}
        />
      ));
    });
    it('Add calls onClickAdd', () => {
      component.find('.PageTreeActionMenuButton__menu-item-add').simulate('click', EVENT);
      expect(onClickAdd).toHaveBeenCalled();
    });
    it('Edit calls onClickEdit', () => {
      component.find('.PageTreeActionMenuButton__menu-item-edit').simulate('click', EVENT);
      expect(onClickEdit).toHaveBeenCalled();
    });
    it('Configure calls onClickConfigure', () => {
      component.find('.PageTreeActionMenuButton__menu-item-configure').simulate('click', EVENT);
      expect(onClickConfigure).toHaveBeenCalled();
    });
    it('Details calls onClickDetails', () => {
      component.find('.PageTreeActionMenuButton__menu-item-details').simulate('click', EVENT);
      expect(onClickDetails).toHaveBeenCalled();
    });
    it('Clone calls onClickClone', () => {
      component.find('.PageTreeActionMenuButton__menu-item-clone').simulate('click', EVENT);
      expect(onClickClone).toHaveBeenCalled();
    });
    it('Delete calls onClickDelete', () => {
      component.find('.PageTreeActionMenuButton__menu-item-delete').simulate('click', EVENT);
      expect(onClickDelete).toHaveBeenCalled();
    });
    it('Publish calls onClickPublish', () => {
      component.find('.PageTreeActionMenuButton__menu-item-publish').simulate('click', EVENT);
      expect(onClickPublish).toHaveBeenCalled();
    });

    it('Unpublish calls onClickUnpublish', () => {
      component = shallow((
        <PageTreeActionMenu page={PUBLISHED_PAGE} onClickUnpublish={onClickUnpublish} />
      ));
      component.find('.PageTreeActionMenuButton__menu-item-unpublish').simulate('click', EVENT);
      expect(onClickUnpublish).toHaveBeenCalled();
    });
  });
});
