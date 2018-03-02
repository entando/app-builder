import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formattedText } from 'frontend-common-components';
import { InputGroup, Button, Label } from 'patternfly-react';


class MultiSelectRenderer extends Component {
  constructor(props) {
    super(props);
    this.pushField = this.pushField.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.select = null;
  }

  pushField() {
    if (!this.select || !this.select.value) {
      return;
    }
    const {
      selectedValues, fields,
    } = this.props;

    if (this.select.value && !selectedValues.includes(this.select.value)) {
      fields.push(this.select.value);
    }
  }

  renderTags() {
    const {
      selectedValues, fields, labelKey, valueKey, options,
    } = this.props;
    return selectedValues.map((value, i) => (
      <Label key={value} bsStyle="primary" className="MultiSelectRenderer__tag">
        {options.find(opt => opt[valueKey] === value)[labelKey]}
        <Button
          bsStyle="link"
          className="MultiSelectRenderer__remove-tag-btn"
          onClick={() => fields.remove(i)}
        >
          <i className="fa fa-times" />
        </Button>
      </Label>
    ));
  }

  render() {
    const {
      options, selectedValues, labelKey, valueKey, emptyOptionTextId,
    } = this.props;

    const filteredOptions = options.filter(opt => !selectedValues.includes(opt[valueKey]));

    if (emptyOptionTextId) {
      const emptyOption = {};
      emptyOption[labelKey] = formattedText(emptyOptionTextId);
      filteredOptions.unshift(emptyOption);
    }

    return (
      <div className="MultiSelectRenderer">
        <InputGroup>
          <select
            className="form-control"
            ref={(select) => { this.select = select; }}
          >
            {
              filteredOptions.map(item => (
                <option
                  key={`opt-${item[valueKey]}`}
                  value={item[valueKey]}
                >
                  {item[labelKey]}
                </option>))
            }
          </select>
          <span className="input-group-btn">
            <Button
              className="MultiSelectRenderer__add-btn"
              bsStyle="primary"
              onClick={this.pushField}
            >
              <i className="fa fa-plus" />
            </Button>
          </span>
        </InputGroup>
        <br />
        { this.renderTags() }
      </div>
    );
  }
}


MultiSelectRenderer.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  emptyOptionTextId: PropTypes.string,
};

MultiSelectRenderer.defaultProps = {
  selectedValues: [],
  valueKey: 'value',
  labelKey: 'label',
  emptyOptionTextId: '',
};

export default MultiSelectRenderer;
