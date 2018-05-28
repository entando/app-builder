import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';

import FilesListMenuActions from 'ui/file-browser/list/FilesListMenuActions';

const propsFile = {
  onClickDeleteFile: jest.fn(),
  onClickDeleteFolder: jest.fn(),
  file: ({
    name: 'test',
    lastModifiedTime: '',
    size: 4096,
    directory: false,
    path: 'test',
  }),
};

const propsFirstLevelFolder = {
  onClickDeleteFile: jest.fn(),
  onClickDeleteFolder: jest.fn(),
  file: ({
    name: 'public',
    lastModifiedTime: '',
    size: 4096,
    directory: true,
    path: 'public',
  }),
};

const propsFolder = {
  onClickDeleteFile: jest.fn(),
  onClickDeleteFolder: jest.fn(),
  file: ({
    name: 'test',
    lastModifiedTime: '',
    size: 4096,
    directory: true,
    path: 'test',
  }),
};

describe('FilesListMenuActions', () => {
  let component;
  beforeEach(() => {
    component = shallow(<FilesListMenuActions {...propsFolder} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  describe('test list component actions', () => {
    beforeEach(() => {
      component = shallow(<FilesListMenuActions {...propsFolder} />);
    });

    describe('with a folder', () => {
      it('has delete action', () => {
        const dropdownKebab = component.find('DropdownKebab');
        expect(dropdownKebab).toHaveLength(1);
        expect(dropdownKebab.find('.FilesListMenuAction__delete')).toHaveLength(1);
      });
      it('verify click delete', () => {
        const preventDefault = jest.fn();
        component.find('.FilesListMenuAction__delete').simulate('click', { preventDefault });
        expect(propsFolder.onClickDeleteFolder).toHaveBeenCalled();
      });
    });
  });

  describe('with a file', () => {
    beforeEach(() => {
      component = shallow(<FilesListMenuActions {...propsFile} />);
    });

    it('has download and delete actions', () => {
      const dropdownKebab = component.find('DropdownKebab');
      expect(dropdownKebab).toHaveLength(1);
      expect(dropdownKebab.find('.FilesListMenuAction__download')).toHaveLength(1);
      expect(dropdownKebab.find('.FilesListMenuAction__delete')).toHaveLength(1);
    });
    it('verify click delete', () => {
      const preventDefault = jest.fn();
      component.find('.FilesListMenuAction__delete').simulate('click', { preventDefault });
      expect(propsFile.onClickDeleteFile).toHaveBeenCalled();
    });
  });

  describe('first level folder', () => {
    beforeEach(() => {
      component = shallow(<FilesListMenuActions {...propsFirstLevelFolder} />);
    });

    it('has no actions', () => {
      const dropdownKebab = component.find('DropdownKebab');
      expect(dropdownKebab).toHaveLength(0);
      expect(dropdownKebab.find('MenuItem')).toHaveLength(0);
    });
  });
});
