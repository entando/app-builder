import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
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
    const {
      input,
      onChange,
      multiple,
      valueKey,
    } = this.props;
    const value = multiple ? selected.map(({ code }) => code) : get(selected, `0.${valueKey}`, '');
    input.onChange(value);
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const {
      input,
      meta: { touched, error },
      intl,
      multiple,
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
      if (!multiple && state.selected.length) {
        return true;
      }
      return option[valueKey].toLowerCase().indexOf(state.text.toLowerCase()) > -1;
    };

    const choices = multiple ? options.filter(option => (
      !input.value.includes(get(option, valueKey, option))
    )) : options;

    const selected = options.filter((option) => {
      const optionValue = get(option, valueKey, option);
      if (multiple) {
        return input.value.includes(optionValue);
      }
      return optionValue === input.value;
    });

    const renderToggleButton = ({ isMenuShown, onClick }) => (
      <button
        className={`DropdownTypeahead__toggle-button fa fa-angle-${isMenuShown ? 'up' : 'down'}`}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
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
            multiple={multiple}
            options={choices}
            emptyLabel={intl.formatMessage({ id: options.length === selected.length ? 'app.noOptions' : 'app.noMatchOptions' })}
            labelKey={labelKey}
            placeholder={placeholder}
            selected={selected}
            onChange={this.valueChanged}
            disabled={others.disabled}
          >
            {({ isMenuShown, toggleMenu }) => (
              renderToggleButton({ isMenuShown, onClick: toggleMenu })
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
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  }),
  intl: intlShape.isRequired,
  multiple: PropTypes.bool,
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
  multiple: false,
};

export default injectIntl(RenderDropdownTypeaheadInput);
