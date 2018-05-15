import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import FileBreadcrumb from 'ui/file-browser/list/FileBreadcrumb';

jest.mock('state/file-browser/selectors', () => ({
  getPathInfo: jest.fn(),
}));

const props = {
  updateFileBrowser: jest.fn(),
  pathInfo: {
    protectedFolder: false,
    prevPath: 'first',
    currentPath: 'first/second',
  },
};

const propsRootFolder = {
  updateFileBrowser: jest.fn(),
  pathInfo: {
    protectedFolder: null,
    prevPath: '',
    currentPath: '',
  },
};

const propsProtectedFolder = {
  updateFileBrowser: jest.fn(),
  pathInfo: {
    protectedFolder: true,
    prevPath: '',
    currentPath: '',
  },
};

describe('FileBreadCrumb', () => {
  let component;
  beforeEach(() => {
    component = shallow(<FileBreadcrumb {...props} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  describe('test breadcrumb component', () => {
    describe('with public folder and 3 folders', () => {
      beforeEach(() => {
        component = shallow(<FileBreadcrumb {...props} />);
      });

      it('has root link', () => {
        const breadcrumb = component.find('Breadcrumb');
        expect(breadcrumb).toHaveLength(1);
        expect(breadcrumb.find('.BreadcrumbItem__root-link')).toHaveLength(1);
      });

      it('has first level (public) folder  link', () => {
        const breadcrumb = component.find('Breadcrumb');
        expect(breadcrumb).toHaveLength(1);
        expect(breadcrumb.find('.BreadcrumbItem__first-level-folder')).toHaveLength(1);
      });

      it('other folder items are links', () => {
        const breadcrumb = component.find('Breadcrumb');
        expect(breadcrumb).toHaveLength(1);
        expect(breadcrumb.find('.BreadcrumbItem__a-item-link')).toHaveLength(1);
      });

      it('current folder is not a link', () => {
        const breadcrumb = component.find('Breadcrumb');
        const current = component.find('.BreadcrumbItem__current-item');
        expect(breadcrumb).toHaveLength(1);
        expect(current.find('a')).toHaveLength(0);
      });

      it('verify click on root link', () => {
        const preventDefault = jest.fn();
        component.find('.BreadcrumbItem__root-link').simulate('click', { preventDefault });
        expect(props.updateFileBrowser).toHaveBeenCalled();
      });

      it('verify click on item link', () => {
        const preventDefault = jest.fn();
        component.find('.BreadcrumbItem__a-item-link').simulate('click', { preventDefault });
        expect(props.updateFileBrowser).toHaveBeenCalled();
      });

      it('verify click on first level folder', () => {
        const preventDefault = jest.fn();
        component.find('.BreadcrumbItem__first-level-folder').simulate('click', { preventDefault });
        expect(props.updateFileBrowser).toHaveBeenCalled();
      });
    });
  });

  describe('only root folder', () => {
    beforeEach(() => {
      component = shallow(<FileBreadcrumb {...propsRootFolder} />);
    });

    it('not has root link', () => {
      const breadcrumb = component.find('Breadcrumb');
      expect(breadcrumb).toHaveLength(1);
      expect(breadcrumb.find('.BreadcrumbItem__root-link')).toHaveLength(0);
    });
  });


  describe('with protected folder', () => {
    beforeEach(() => {
      component = shallow(<FileBreadcrumb {...propsProtectedFolder} />);
    });

    it('has first level (protected) folder  link', () => {
      const breadcrumb = component.find('Breadcrumb');
      expect(breadcrumb).toHaveLength(1);
      expect(breadcrumb.find('.BreadcrumbItem__first-level-folder')).toHaveLength(1);
    });
  });
});
