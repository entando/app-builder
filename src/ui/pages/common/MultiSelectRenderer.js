import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { InputGroup, Button, Label } from 'patternfly-react';


export class MultiSelectRendererBody extends Component {
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
  }

  render() {
    const {
      intl, options, selectedValues, labelKey, valueKey, emptyOptionTextId, disabled,
    } = this.props;

    const filteredOptions = options
      .filter(opt => !selectedValues.includes(opt[valueKey]))
      .map(item => (
        <option key={`opt-${item[valueKey]}`} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ));

    if (emptyOptionTextId) {
      const msgs = defineMessages({
        emptyOptionText: {
          id: emptyOptionTextId,
        },
      });
      const emptyOptionText = intl.formatMessage(msgs.emptyOptionText);
      filteredOptions.unshift((
        <option key={emptyOptionText} value="">
          {emptyOptionText}
        </option>
      ));
    }

    return (
      <div className="MultiSelectRenderer" data-testid="multi-select">
        <InputGroup>
          <select
            className="form-control"
            ref={(select) => { this.select = select; }}
            disabled={disabled}
          >
            {filteredOptions}
          </select>
          <span className="input-group-btn">
            <Button
              className="MultiSelectRenderer__add-btn"
              bsStyle="primary"
              onClick={this.pushField}
              disabled={disabled}
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


MultiSelectRendererBody.propTypes = {
  intl: intlShape.isRequired,
  fields: PropTypes.shape({
    push: PropTypes.func,
    remove: PropTypes.func,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  emptyOptionTextId: PropTypes.string,
  disabled: PropTypes.bool,
};

MultiSelectRendererBody.defaultProps = {
  selectedValues: [],
  valueKey: 'value',
  labelKey: 'label',
  emptyOptionTextId: '',
  disabled: false,
};

export default injectIntl(MultiSelectRendererBody);
