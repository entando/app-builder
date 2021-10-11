import React from 'react';
import { shallow } from 'enzyme';
import { configEnzymeAdapter, enzymeHelperFindByTestId } from 'test/legacyTestUtils';
import ContentSettingsCropRatios from 'ui/content-settings/ContentSettingsCropRatios';

configEnzymeAdapter();

jest.unmock('react-redux');

const cropRatios = ['4:3', '16:9'];

describe('ContentSettingsCropRatios', () => {
  const mockOnAddCallback = jest.fn();
  const mockOnDeleteCallback = jest.fn();
  const mockOnUpdateCallback = jest.fn();
  const wrapper = shallow(
    <ContentSettingsCropRatios
      cropRatios={cropRatios}
      onAdd={mockOnAddCallback}
      onDelete={mockOnDeleteCallback}
      onUpdate={mockOnUpdateCallback}
    />,
  );

  const ratioInputTestId = 'content-settings-crop-ratios-form-input';

  it('should have a heading', () => {
    const testId = 'content-settings-crop-ratios-heading';
    expect(enzymeHelperFindByTestId(wrapper, testId).length).toBe(1);
  });

  describe('form', () => {
    it('should have a title', () => {
      const testId = 'content-settings-crop-ratios-form-title';
      expect(enzymeHelperFindByTestId(wrapper, testId).length).toBe(1);
    });

    it('should render crop ratio inputs based on length of cropRatios prop', () => {
      expect(enzymeHelperFindByTestId(wrapper, ratioInputTestId).length)
        .toBe(cropRatios.length + 1);
    });

    it("should call onAdd prop when crop ratio input's onAdd is called", () => {
      const ratioInputs = enzymeHelperFindByTestId(wrapper, ratioInputTestId);
      const newRatioInput = ratioInputs.last();
      newRatioInput.props().onAdd();

      expect(mockOnAddCallback).toHaveBeenCalled();
    });

    it("should call onDelete prop when crop ratio input's onDelete is called", () => {
      const ratioInput = enzymeHelperFindByTestId(wrapper, ratioInputTestId).at(0);
      ratioInput.props().onDelete();

      expect(mockOnDeleteCallback).toHaveBeenCalled();
    });

    it("should call onUpdate prop when crop ratio input's onSave is called", () => {
      const ratioInput = enzymeHelperFindByTestId(wrapper, ratioInputTestId).at(0);
      ratioInput.props().onSave();

      expect(mockOnUpdateCallback).toHaveBeenCalled();
    });
  });
});
