import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formattedText } from '@entando/utils';
import { InputGroup, Button, Label } from 'patternfly-react';


class MultiFilterSelectRenderer extends Component {
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
      selectedValues, fields, allMode,
    } = this.props;

    const allBool = allMode && this.select.value === 'all';

    if (allBool) {
      fields.removeAll();
    }

    if (this.select.value && !selectedValues.includes(this.select.value) && !allBool) {
      fields.push(this.select.value);
    }
  }

  renderTags() {
    const {
      selectedValues, fields, labelKey, valueKey, options,
    } = this.props;
    return selectedValues.map((value, i) => {
      const elem = options.length ? options.find(opt => opt[valueKey] === value) : null;
      return (
        <Label key={value} bsStyle="primary" className="MultiSelectRenderer__tag">
          {elem ? elem[labelKey] : ''}
          <Button
            bsStyle="link"
            className="MultiSelectRenderer__remove-tag-btn"
            onClick={() => fields.remove(i)}
          >
            <i className="fa fa-times" />
          </Button>
        </Label>
      );
    });
  }

  render() {
    const {
      options, selectedValues, labelKey, valueKey, emptyOptionTextId, allMode,
    } = this.props;

    const filteredOptions = options
      .filter(opt => !selectedValues.includes(opt[valueKey]) || allMode)
      .map(item => (
        <option key={`opt-${item[valueKey]}`} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ));

    if (emptyOptionTextId) {
      const emptyOptionText = formattedText(emptyOptionTextId);
      filteredOptions.unshift((
        <option key={emptyOptionText} value="">
          {emptyOptionText}
        </option>
      ));
    }

    return (
      <div className="MultiSelectRenderer">
        <InputGroup>
          <select
            className="form-control"
            ref={(select) => { this.select = select; }}
          >
            {filteredOptions}
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


MultiFilterSelectRenderer.propTypes = {
  fields: PropTypes.shape({
    removeAll: PropTypes.func,
    push: PropTypes.func,
    remove: PropTypes.func,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  emptyOptionTextId: PropTypes.string,
  allMode: PropTypes.bool,
};

MultiFilterSelectRenderer.defaultProps = {
  selectedValues: [],
  valueKey: 'value',
  labelKey: 'label',
  emptyOptionTextId: '',
  allMode: false,
};

export default MultiFilterSelectRenderer;
