import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import { FILE_BROWSER, FILE_BROWSER_ROOT_FOLDER } from 'test/mocks/fileBrowser';

import FilesListTable from 'ui/file-browser/list/FilesListTable';

jest.mock('state/file-browser/selectors', () => ({
  getFilesList: jest.fn(),
}));

const props = {
  onWillMount: jest.fn(),
  pathInfo: {
    protectedFolder: true,
    prevPath: '/first',
    currentPath: '/first/second',
  },
};

const propsRootFolder = {
  onWillMount: jest.fn(),
  pathInfo: {
    protectedFolder: null,
    prevPath: '',
    currentPath: '',
  },
};

const propsFirstLevelFolder = {
  onWillMount: jest.fn(),
  pathInfo: {
    protectedFolder: true,
    prevPath: '',
    currentPath: '',
  },
};

describe('FilesListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<FilesListTable {...props} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  describe('test table component', () => {
    beforeEach(() => {
      component = shallow(<FilesListTable {...props} />);
    });

    it('has an Alert', () => {
      expect(component.find('Alert')).toHaveLength(1);
    });

    describe('with files', () => {
      beforeEach(() => {
        component.setProps({ files: FILE_BROWSER });
      });

      it('has up link', () => {
        const tbody = component.find('thead');
        const upIcon = component.find('Icon');
        expect(tbody).toHaveLength(1);
        expect(tbody.find('th')).toHaveLength(4);
        expect(tbody.find('.FilesListTable__up-link')).toHaveLength(1);
        expect(tbody.find('Icon')).toHaveLength(1);
        expect(upIcon.find({ name: 'share' })).toHaveLength(1);
      });

      it('has 2 rows if there are 2 files', () => {
        const tbody = component.find('tbody');
        expect(tbody).toHaveLength(1);
        expect(tbody.find('tr')).toHaveLength(2);
        expect(tbody.find('DropdownKebab')).toHaveLength(2);
      });

      it('has correct links for folders and files', () => {
        const tbody = component.find('tbody');
        expect(tbody.find('.FilesListTable__link-dir')).toHaveLength(1);
        expect(tbody.find('.FilesListTable__link-download')).toHaveLength(1);
      });

      it('verify click on dir link', () => {
        const preventDefault = jest.fn();
        component.find('.FilesListTable__link-dir').simulate('click', { preventDefault });
        expect(props.onWillMount).toHaveBeenCalled();
      });
      it('verify click on download link', () => {
        const preventDefault = jest.fn();
        component.find('.FilesListTable__link-download').simulate('click', { preventDefault });
        expect(props.onWillMount).toHaveBeenCalled();
      });
      it('verify click uplink', () => {
        const preventDefault = jest.fn();
        component.find('.FilesListTable__up-link').simulate('click', { preventDefault });
        expect(props.onWillMount).toHaveBeenCalled();
      });
    });
  });

  describe('root folder', () => {
    beforeEach(() => {
      component = shallow(<FilesListTable {...propsRootFolder} />);
      component.setProps({ files: FILE_BROWSER_ROOT_FOLDER });
    });

    it('not has up link', () => {
      const tbody = component.find('thead');
      const upIcon = component.find('Icon');
      expect(tbody).toHaveLength(1);
      expect(tbody.find('th')).toHaveLength(4);
      expect(tbody.find('.FilesListTable__up-link')).toHaveLength(0);
      expect(tbody.find('Icon')).toHaveLength(0);
      expect(upIcon.find({ name: 'share' })).toHaveLength(0);
    });

    it('has 2 rows without actions', () => {
      const tbody = component.find('tbody');
      expect(tbody).toHaveLength(1);
      expect(tbody.find('tr')).toHaveLength(2);
      expect(tbody.find('DropdownKebab')).toHaveLength(0);
    });
  });


  describe('first level folder', () => {
    beforeEach(() => {
      component = shallow(<FilesListTable {...propsFirstLevelFolder} />);
      component.setProps({ files: FILE_BROWSER });
    });

    it('has up link', () => {
      const tbody = component.find('thead');
      const upIcon = component.find('Icon');
      expect(tbody).toHaveLength(1);
      expect(tbody.find('th')).toHaveLength(4);
      expect(tbody.find('.FilesListTable__up-link')).toHaveLength(1);
      expect(tbody.find('Icon')).toHaveLength(1);
      expect(upIcon.find({ name: 'share' })).toHaveLength(1);
    });

    it('has 2 rows if there are 2 files', () => {
      const tbody = component.find('tbody');
      expect(tbody).toHaveLength(1);
      expect(tbody.find('tr')).toHaveLength(2);
      expect(tbody.find('DropdownKebab')).toHaveLength(2);
    });

    it('verify click uplink', () => {
      const preventDefault = jest.fn();
      component.find('.FilesListTable__up-link').simulate('click', { preventDefault });
      expect(props.onWillMount).toHaveBeenCalled();
    });
  });
});
