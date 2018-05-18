import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
import FileButtonsGroup from 'ui/file-browser/common/FileButtonsGroup';

jest.mock('state/file-browser/selectors', () => ({
  getPathInfo: jest.fn(),
}));

const props = {
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

describe('FileButtonsGroup', () => {
  let component;
  beforeEach(() => {
    component = shallow(<FileButtonsGroup {...props} />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  describe('test file buttons group component', () => {
    describe('with public folder and 3 folders path', () => {
      beforeEach(() => {
        component = shallow(<FileButtonsGroup {...props} />);
      });

      it('verify buttons', () => {
        expect(component.find('Button')).toHaveLength(3);
      });

      it('verify if button upload exist', () => {
        expect(component.find('.FilesButtonGroup__uploadFile')).toHaveLength(1);
      });

      it('verify if button create folder exist', () => {
        expect(component.find('.FilesButtonGroup__createFolder')).toHaveLength(1);
      });

      it('verify if button create text file exist', () => {
        expect(component.find('.FilesButtonGroup__createTextFile')).toHaveLength(1);
      });

      it('verify if FileButtonsGroup exist ', () => {
        expect(component.find('.FileButtonsGroup').exists()).toBe(true);
      });
    });
  });

  describe('only root folder', () => {
    beforeEach(() => {
      component = shallow(<FileButtonsGroup {...propsRootFolder} />);
    });

    it('verify if buttons are not visible', () => {
      expect(component.find('Button')).toHaveLength(0);
    });

    it('verify if button upload not exist', () => {
      expect(component.find('.FilesButtonGroup__uploadFile')).toHaveLength(0);
    });

    it('verify if button create folder not exist', () => {
      expect(component.find('.FilesButtonGroup__createFolder')).toHaveLength(0);
    });

    it('verify if button create text file not exist', () => {
      expect(component.find('.FilesButtonGroup__createTextFile')).toHaveLength(0);
    });
  });


  describe('with protected folder', () => {
    beforeEach(() => {
      component = shallow(<FileButtonsGroup {...propsProtectedFolder} />);
    });

    it('verify buttons', () => {
      expect(component.find('Button')).toHaveLength(3);
    });

    it('verify if button upload exist', () => {
      expect(component.find('.FilesButtonGroup__uploadFile')).toHaveLength(1);
    });

    it('verify if button create folder exist', () => {
      expect(component.find('.FilesButtonGroup__createFolder')).toHaveLength(1);
    });

    it('verify if button create text file exist', () => {
      expect(component.find('.FilesButtonGroup__createTextFile')).toHaveLength(1);
    });

    it('verify if FileButtonsGroup exist ', () => {
      expect(component.find('.FileButtonsGroup').exists()).toBe(true);
    });
  });
});
