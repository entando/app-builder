import React from 'react';
import { shallow } from 'enzyme';

import RatioInput from 'ui/content-settings/ContentSettingsCropRatioInput';
import { enzymeHelperFindByTestId, configEnzymeAdapter } from 'testutils/helpers';

configEnzymeAdapter();

describe('ContentSettingsCropRatioInput', () => {
  const inputTestId = 'content-settings-crop-ratio-input-field';
  const addBtnTestId = 'content-settings-crop-ratio-input-add';
  const deleteBtnTestId = 'content-settings-crop-ratio-input-delete';

  it('should have an input field', () => {
    const wrapper = shallow(<RatioInput />);
    expect(enzymeHelperFindByTestId(wrapper, inputTestId).length).toBe(1);
  });

  describe('when new', () => {
    const mockOnAddCallback = jest.fn();

    afterEach(() => {
      mockOnAddCallback.mockClear();
    });

    const wrapper = shallow(<RatioInput isNew onAdd={mockOnAddCallback} />);

    it('should have an add button', () => {
      expect(enzymeHelperFindByTestId(wrapper, addBtnTestId).length).toBe(1);
    });

    it('should not have a delete button', () => {
      expect(enzymeHelperFindByTestId(wrapper, deleteBtnTestId).length).toBe(0);
    });

    it('should call onAdd prop with valid inputted value after clicking the add button', () => {
      const value = '4:9';
      const changeEvent = {
        target: {
          value,
        },
      };
      const inputField = enzymeHelperFindByTestId(wrapper, inputTestId);
      inputField.simulate('change', changeEvent);

      const addBtn = enzymeHelperFindByTestId(wrapper, addBtnTestId);
      addBtn.simulate('click');

      expect(mockOnAddCallback).toHaveBeenCalledWith(value);
    });

    it('should not call onAdd prop with invalid value after clicking the add button', () => {
      const value = 'this is an invalid value';
      const changeEvent = {
        target: {
          value,
        },
      };
      const inputField = enzymeHelperFindByTestId(wrapper, inputTestId);
      inputField.simulate('change', changeEvent);

      const addBtn = enzymeHelperFindByTestId(wrapper, addBtnTestId);
      addBtn.simulate('click');

      expect(mockOnAddCallback).toHaveBeenCalledTimes(0);
    });
  });

  describe('when not new', () => {
    const mockOnDeleteCallback = jest.fn();
    const mockOnSaveCallback = jest.fn();
    const value = '4:9';
    const wrapper = shallow(
      <RatioInput value={value} onDelete={mockOnDeleteCallback} onSave={mockOnSaveCallback} />,
    );

    it('should have a value derived from props', () => {
      expect(enzymeHelperFindByTestId(wrapper, inputTestId).props().value).toBe(value);
    });

    it('should have a delete button', () => {
      expect(enzymeHelperFindByTestId(wrapper, deleteBtnTestId).length).toBe(1);
    });

    it('should not have an add button', () => {
      expect(enzymeHelperFindByTestId(wrapper, addBtnTestId).length).toBe(0);
    });

    it('should call onDelete prop after clicking the delete button', () => {
      const deleteBtn = enzymeHelperFindByTestId(wrapper, deleteBtnTestId);
      deleteBtn.simulate('click');

      expect(mockOnDeleteCallback).toHaveBeenCalled();
    });

    it('should call onSave prop with new value when input loses focus', () => {
      const newValue = '16:9';
      const changeEvent = {
        target: {
          value: newValue,
        },
      };
      const inputField = enzymeHelperFindByTestId(wrapper, inputTestId);
      inputField.simulate('change', changeEvent);
      inputField.simulate('blur');

      expect(mockOnSaveCallback).toHaveBeenCalledWith(newValue);
    });
  });
});
