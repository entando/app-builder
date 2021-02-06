import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Col, ControlLabel } from 'patternfly-react';
import { Typeahead } from 'react-bootstrap-typeahead';

class RenderDropdownTypeaheadInput extends Component {
  constructor(props) {
    super(props);
    this.valueChanged = this.valueChanged.bind(this);
  }

  valueChanged(selected) {
    const { input, onChange, valueKey } = this.props;
    if (!selected.length) return;
    const value = get(selected[0], valueKey, selected[0]);
    input.onChange(value);
    if (onChange) {
      onChange(value);
    }
    // const btn = document.querySelector('.DropdownTypeahead__dropdownbutton');
    // btn.click();
  }

  render() {
    const {
      input,
      meta: { touched, error },
      label,
      help,
      labelSize,
      inputSize,
      labelKey,
      valueKey,
      append,
      alignClass,
      placeholder,
      options,
      onChange,
      ...others
    } = this.props;

    const filterBy = (option, state) => {
      if (state.selected.length) {
        return true;
      }
      return option[labelKey].toLowerCase().indexOf(state.text.toLowerCase()) > -1;
    };

    const ToggleButton = ({ onClick }) => (
      <button
        className="DropdownTypeahead__toggle-button caret"
        onClick={onClick}
        onMouseDown={e => e.preventDefault()}
      />
    );

    return (
      <div
        className={
          touched && error
            ? 'DropdownTypeahead form-group has-error'
            : 'DropdownTypeahead form-group'
        }
      >
        {labelSize > 0 ? (
          <Col xs={labelSize} className={alignClass}>
            <ControlLabel htmlFor={input.name}>
              {label} {help}
            </ControlLabel>
          </Col>
        ) : (
          ''
        )}
        <Col xs={inputSize || 12 - labelSize}>
          <Typeahead
            filterBy={filterBy}
            id={input.name}
            options={options}
            labelKey={labelKey}
            placeholder={placeholder}
            onChange={this.valueChanged}
            disabled={others.disabled}
          >
            {({ isMenuShown, toggleMenu }) => (
              <ToggleButton isOpen={isMenuShown} onClick={() => toggleMenu()} />
            )}
          </Typeahead>
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && (error && <span className="help-block">{error}</span>)}
        </Col>
      </div>
    );
  }
}

RenderDropdownTypeaheadInput.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  }),
  label: PropTypes.node,
  labelSize: PropTypes.number,
  labelKey: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  inputSize: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  placeholder: PropTypes.string,
  append: PropTypes.string,
  alignClass: PropTypes.string,
  onChange: PropTypes.func,
  valueKey: PropTypes.string,
};

RenderDropdownTypeaheadInput.defaultProps = {
  input: {},
  label: <span>Select...</span>,
  labelKey: 'label',
  meta: {},
  placeholder: 'Select...',
  help: null,
  labelSize: 2,
  disabled: false,
  inputSize: null,
  append: '',
  alignClass: 'text-right',
  onChange: null,
  valueKey: '',
};

export default RenderDropdownTypeaheadInput;
