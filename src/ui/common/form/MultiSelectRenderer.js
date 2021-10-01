import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape } from 'react-intl';
import { InputGroup, Button, Label } from 'patternfly-react';

class MultiSelectRenderer extends Component {
  constructor(props) {
    super(props);
    this.pushField = this.pushField.bind(this);
    this.select = null;
  }

  pushField() {
    if (!this.select || !this.select.value) {
      return;
    }
    const { selectedValues, fields } = this.props;

    if (this.select.value && !selectedValues.includes(this.select.value)) {
      fields.push(this.select.value);
    }
  }

  render() {
    const {
      options,
      selectedValues,
      labelKey,
      valueKey,
      emptyOptionTextId,
      intl,
      fields,
    } = this.props;
    const filteredOptions = options
      .filter(opt => !selectedValues.includes(opt[valueKey]))
      .map(item => (
        <option key={`opt-${item[valueKey]}`} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ));
    const messages = defineMessages({
      emptyOption: {
        id: 'cms.chooseAnOption',
        defaultMessage: 'Choose Option',
      },
    });

    if (emptyOptionTextId) {
      filteredOptions.unshift(
        <option key={messages.emptyOption.id} value="">
          {intl.formatMessage(messages.emptyOption)}
        </option>,
      );
    }

    const renderedTags = selectedValues.map((value, i) => (
      <Label key={value} bsStyle="primary" className="MultiSelectRenderer__tag">
        {options.length ? options.find(opt => opt[valueKey] === value)[labelKey] : ''}
        <Button
          bsStyle="link"
          className="MultiSelectRenderer__remove-tag-btn"
          onClick={() => fields.remove(i)}
        >
          <i className="fa fa-times" />
        </Button>
      </Label>
    ));

    return (
      <div className="MultiSelectRenderer">
        <InputGroup>
          <select
            className="form-control"
            ref={(select) => {
              this.select = select;
            }}
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
        {renderedTags}
      </div>
    );
  }
}

MultiSelectRenderer.propTypes = {
  fields: PropTypes.shape({
    push: PropTypes.func,
    remove: PropTypes.func,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  emptyOptionTextId: PropTypes.string,
  intl: intlShape,
};

MultiSelectRenderer.defaultProps = {
  selectedValues: [],
  valueKey: 'value',
  labelKey: 'label',
  emptyOptionTextId: '',
  intl: {},
};

export default MultiSelectRenderer;
