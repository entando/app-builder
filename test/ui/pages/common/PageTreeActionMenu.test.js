
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
const onClickPreview = jest.fn();
const onClickViewPublishedPage = jest.fn();

const domain = 'domain';
const locale = 'en';
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
    const component = shallow((
      <PageTreeActionMenu
        page={DRAFT_PAGE}
        domain={domain}
        locale={locale}
      />));
    expect(component.exists()).toEqual(true);
  });

  it('does nothing if an event handler is not passed', () => {
    const component = shallow((
      <PageTreeActionMenu
        page={DRAFT_PAGE}
        domain={domain}
        locale={locale}
      />));
    component.find('.PageTreeActionMenuButton__menu-item-add').simulate('click', EVENT);
    expect(onClickAdd).not.toHaveBeenCalled();
  });

  describe('when page status is draft', () => {
    let component;
    beforeEach(() => {
      component = shallow((
        <PageTreeActionMenu
          page={DRAFT_PAGE}
          domain={domain}
          locale={locale}
        />));
    });
    it('renders the Publish menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-publish').exists()).toBe(true);
    });
    it('does not render the Unpublish menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-unpublish').exists()).toBe(false);
    });
    it('renders the Preview menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-preview').exists()).toBe(true);
      expect(component.find('.PageTreeActionMenuButton__menu-item-preview')).not.toBeDisabled();
    });
    it('renders the ViewPublishedPage menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-viewPublishedPage').exists()).toBe(true);
      expect(component.find('.PageTreeActionMenuButton__menu-item-viewPublishedPage')).toBeDisabled();
    });
  });

  describe('when page status is unpublished', () => {
    let component;
    beforeEach(() => {
      component = shallow((
        <PageTreeActionMenu
          page={UNPUBLISHED_PAGE}
          domain={domain}
          locale={locale}
        />));
    });
    it('renders the Publish menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-publish').exists()).toBe(true);
    });
    it('does not render the Unpublish menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-unpublish').exists()).toBe(false);
    });
    it('renders the Preview menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-preview').exists()).toBe(true);
      expect(component.find('.PageTreeActionMenuButton__menu-item-preview')).not.toBeDisabled();
    });
    it('renders the ViewPublishedPage menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-viewPublishedPage').exists()).toBe(true);
      expect(component.find('.PageTreeActionMenuButton__menu-item-viewPublishedPage')).toBeDisabled();
    });
  });

  describe('when page status is published', () => {
    let component;

    beforeEach(() => {
      component = shallow((
        <PageTreeActionMenu
          page={PUBLISHED_PAGE}
          domain={domain}
          locale={locale}
        />));
    });
    it('renders the Unpublish menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-unpublish').exists()).toBe(true);
    });
    it('does not render the Publish menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-publish').exists()).toBe(false);
    });
    it('renders the Preview menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-preview').exists()).toBe(true);
      expect(component.find('.PageTreeActionMenuButton__menu-item-preview')).not.toBeDisabled();
    });
    it('renders the ViewPublishedPage menu item', () => {
      expect(component.find('.PageTreeActionMenuButton__menu-item-viewPublishedPage').exists()).toBe(true);
      expect(component.find('.PageTreeActionMenuButton__menu-item-viewPublishedPage')).not.toBeDisabled();
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
          onClickViewPublishedPage={onClickViewPublishedPage}
          onClickPreview={onClickPreview}
          domain={domain}
          locale={locale}
        />
      ));
    });
    it('Add calls onClickAdd', () => {
      component.find('.PageTreeActionMenuButton__menu-item-add').prop('onSelect')();
      expect(onClickAdd).toHaveBeenCalled();
    });
    it('Edit calls onClickEdit', () => {
      component.find('.PageTreeActionMenuButton__menu-item-edit').prop('onSelect')();
      expect(onClickEdit).toHaveBeenCalled();
    });
    it('Configure calls onClickConfigure', () => {
      component.find('.PageTreeActionMenuButton__menu-item-configure').prop('onSelect')();
      expect(onClickConfigure).toHaveBeenCalled();
    });
    it('Details calls onClickDetails', () => {
      component.find('.PageTreeActionMenuButton__menu-item-details').prop('onSelect')();
      expect(onClickDetails).toHaveBeenCalled();
    });
    it('Clone calls onClickClone', () => {
      component.find('.PageTreeActionMenuButton__menu-item-clone').prop('onSelect')();
      expect(onClickClone).toHaveBeenCalled();
    });
    it('Delete calls onClickDelete', () => {
      component.find('.PageTreeActionMenuButton__menu-item-delete').prop('onSelect')();
      expect(onClickDelete).toHaveBeenCalled();
    });
    it('Publish calls onClickPublish', () => {
      component.find('.PageTreeActionMenuButton__menu-item-publish').prop('onSelect')();
      expect(onClickPublish).toHaveBeenCalled();
    });
    it('Preview calls onClickPreview', () => {
      component.find('.PageTreeActionMenuButton__menu-item-preview').prop('onClick')();
      expect(onClickPreview).toHaveBeenCalled();
    });
    it('Unpublish calls onClickUnpublish', () => {
      component = shallow((
        <PageTreeActionMenu
          page={PUBLISHED_PAGE}
          onClickUnpublish={onClickUnpublish}
          domain={domain}
          locale={locale}
        />
      ));
      component.find('.PageTreeActionMenuButton__menu-item-unpublish').prop('onSelect')();
      expect(onClickUnpublish).toHaveBeenCalled();
    });
    it('ViewPublishedPage calls onClickViewPublishedPage', () => {
      component = shallow((
        <PageTreeActionMenu
          page={PUBLISHED_PAGE}
          onClickViewPublishedPage={onClickViewPublishedPage}
          domain={domain}
          locale={locale}
        />
      ));
      component.find('.PageTreeActionMenuButton__menu-item-viewPublishedPage').prop('onClick')();
      expect(onClickViewPublishedPage).toHaveBeenCalled();
    });
  });
});
