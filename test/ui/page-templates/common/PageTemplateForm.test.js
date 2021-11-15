
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, within, queryByAttribute } from '@testing-library/react';

import PageTemplateForm from 'ui/page-templates/common/PageTemplateForm';
import { FORM_MODE_ADD, FORM_MODE_EDIT, DEFAULT_FORM_VALUES } from 'state/page-templates/const';
import { mockRenderWithIntlAndStore } from 'test/legacyTestUtils';


const getById = queryByAttribute.bind(null, 'id');

jest.unmock('react-redux');

const props = {
  onDidMount: jest.fn(),
  onWillUnmount: jest.fn(),
  onSubmit: jest.fn(),
  initialValues: DEFAULT_FORM_VALUES,
  mode: FORM_MODE_ADD,
  onHideCancelModal: jest.fn(),
  onDiscard: jest.fn(),
  onCancel: jest.fn(),
};

describe('PageTemplateForm', () => {
  let container;

  const renderForm = (formValues = {}, addProps = {}) => {
    const initialValues = { ...DEFAULT_FORM_VALUES, ...formValues };
    const formProps = { ...props, ...addProps, initialValues };
    const result = render(mockRenderWithIntlAndStore(
      <PageTemplateForm {...formProps} />,
      { modal: { visibleModal: '', info: {} } },
    ));
    // eslint-disable-next-line prefer-destructuring
    container = result.container;

    // for codemirror
    document.createRange = () => {
      const range = new Range();
      range.getBoundingClientRect = jest.fn();
      range.getClientRects = () => ({
        item: () => null,
        length: 0,
        [Symbol.iterator]: jest.fn(),
      });
      return range;
    };
  };

  beforeEach(() => jest.clearAllMocks);

  describe('basic rendering', () => {
    beforeEach(renderForm);
    it('has class PageTemplateForm', () => {
      expect(screen.getByTestId('common_PageTemplateForm_Form')).toBeInTheDocument();
    });

    it('renders the "code" Field', () => {
      const codeInput = screen.getByPlaceholderText('Code');
      expect(codeInput).toBeInTheDocument();
      expect(codeInput.getAttribute('name')).toEqual('code');
    });

    it('renders the "descr" Field', () => {
      const descrInput = screen.getByPlaceholderText('Name');
      expect(descrInput).toBeInTheDocument();
      expect(descrInput.getAttribute('name')).toEqual('descr');
    });

    it('renders the "configuration" Field', () => {
      const configLabel = screen.getByText('JSON configuration');
      expect(configLabel).toBeInTheDocument();
      const codeLines = within(configLabel.closest('.form-group')).queryAllByRole('presentation');
      expect(codeLines.length).toBeGreaterThan(0);
    });

    it('renders the "template" Field', () => {
      const templateLabel = screen.getByText('Template');
      expect(templateLabel).toBeInTheDocument();
      const codeLines = within(templateLabel.closest('.form-group')).queryAllByRole('presentation');
      expect(codeLines.length).toBeGreaterThan(0);
    });

    it('renders a PageConfigGrid to show the template preview', () => {
      expect(screen.getByTestId('config_PageConfigGrid_div')).toBeInTheDocument();
    });
  });

  describe('with onDidMount callback', () => {
    it('calls onDidMount', () => {
      renderForm();
      expect(props.onDidMount).toHaveBeenCalled();
    });
  });

  describe('if form is invalid', () => {
    it('Save buttons are disabled', () => {
      renderForm();
      const regularSaveButton = getById(container, 'regularSaveButton').closest('li');
      expect(regularSaveButton).toHaveClass('disabled');
      const continueSaveButton = getById(container, 'continueSaveButton').closest('li');
      expect(continueSaveButton).toHaveClass('disabled');
    });
  });

  describe('if form is valid can submit', () => {
    it('Save buttons are enabled', () => {
      renderForm({ code: 'abc', descr: 'def', template: '<h1>olleh</h1>' }, { mode: FORM_MODE_EDIT });
      const regularSaveButton = getById(container, 'regularSaveButton').closest('li');
      expect(regularSaveButton).not.toHaveClass('disabled');
      const continueSaveButton = getById(container, 'continueSaveButton').closest('li');
      expect(continueSaveButton).not.toHaveClass('disabled');
    });
  });
});
