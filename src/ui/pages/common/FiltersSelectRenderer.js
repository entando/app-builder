import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formattedText } from '@entando/utils';
import { InputGroup, Button, Label, ControlLabel } from 'patternfly-react';
import { Field } from 'redux-form';
import { Collapse } from 'react-collapse';
import RenderRadioInput from 'ui/common/form/RenderRadioInput';

const ORDER_TYPES = [
  {
    id: 'none',
    label: 'None',
  },
  {
    id: 'ASC',
    label: 'Ascending',
  },
  {
    id: 'DESC',
    label: 'Descending',
  },
];

class FiltersSelectRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsOpened: false,
    };
    this.pushField = this.pushField.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.select = null;
  }

  pushField() {
    if (!this.select || !this.select.value) {
      return;
    }
    const {
      selectedValues, fields, selectedOrderType,
    } = this.props;
    const { value } = this.select;
    const includes = selectedValues.filter(item => item.value === value).length > 0;
    if (value && !includes) {
      fields.push({ value, ...(selectedOrderType && { order: selectedOrderType }) });
    }
  }

  renderTags() {
    const {
      selectedValues, fields, valueKey, options, nameIdKey,
    } = this.props;
    return selectedValues.map(({ value }, i) => (
      <Label key={value} bsStyle="primary" className="FiltersSelectRenderer__tag">
        {options.length ? formattedText(options.find(opt => opt[valueKey] === value)[nameIdKey]) : ''}
        <Button
          bsStyle="link"
          className="FiltersSelectRenderer__remove-tag-btn"
          onClick={() => fields.remove(i)}
        >
          <i className="fa fa-times" />
        </Button>
      </Label>
    ));
  }

  render() {
    const {
      options, selectedValues, valueKey, emptyOptionTextId, nameIdKey,
    } = this.props;

    const filteredOptions = options
      .filter(opt => !selectedValues.includes(opt[valueKey]))
      .map(item => (
        <option key={`opt-${item[valueKey]}`} value={item[valueKey]}>
          {formattedText(item[nameIdKey])}
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

    const { settingsOpened } = this.state;

    const handleCancelClick = () => this.setState({ settingsOpened: false });
    const handleApplyClick = () => this.pushField();

    return (
      <div className="FiltersSelectRenderer">
        <InputGroup>
          <select
            className="form-control"
            ref={(select) => { this.select = select; }}
            disabled={settingsOpened}
          >
            {filteredOptions}
          </select>
          <span className="input-group-btn">
            <Button
              className="FiltersSelectRenderer__add-btn"
              bsStyle="primary"
              onClick={() => this.setState({ settingsOpened: true })}
              disabled={settingsOpened}
            >
              <i className="fa fa-plus" />
            </Button>
          </span>
        </InputGroup>
        <Collapse isOpened={settingsOpened}>
          <div className="FiltersSelectRenderer__settings">
            <ControlLabel className="FiltersSelectRenderer__control-label">
              Order
            </ControlLabel>
            <div>
              <Field
                component={RenderRadioInput}
                toggleElement={ORDER_TYPES}
                name="order"
              />
              <Button bsStyle="success" onClick={handleApplyClick}>Apply</Button>
              <Button bsStyle="danger" onClick={handleCancelClick}>Cancel</Button>
            </div>
          </div>
        </Collapse>
        <br />
        { this.renderTags() }
      </div>
    );
  }
}


FiltersSelectRenderer.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  valueKey: PropTypes.string,
  nameIdKey: PropTypes.string,
  emptyOptionTextId: PropTypes.string,
  selectedOrderType: PropTypes.string,
};

FiltersSelectRenderer.defaultProps = {
  selectedValues: [],
  valueKey: 'value',
  nameIdKey: 'nameId',
  emptyOptionTextId: '',
  selectedOrderType: '',
};

export default FiltersSelectRenderer;
