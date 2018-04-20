import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formattedText } from '@entando/utils';
import { InputGroup, Button, Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

class RoleSelectRenderer extends Component {
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
      <div>
        <h3><FormattedMessage id="app.assigned.roles" /></h3>
        <hr />
        <Col xs={4}>
          <p key={value}>
            {options.find(opt => opt[valueKey] === value)[labelKey]}
          </p>
        </Col>
        <Col xs={8}>
          <Button
            bsStyle="danger"
            className="btn btn-danger RoleSelectRenderer__remove--btn"
            onClick={() => fields.remove(i)}
          >
            <FormattedMessage id="app.delete" />
          </Button>
        </Col>
      </div>
    ));
  }

  render() {
    const {
      options, selectedValues, labelKey, valueKey, emptyOptionTextId,
    } = this.props;

    const filteredOptions = options
      .filter(opt => !selectedValues.includes(opt[valueKey]))
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
      <div className="RoleSelectRenderer">
        <InputGroup>
          <select className="form-control" ref={(select) => { this.select = select; }} >
            {filteredOptions}
          </select>
          <span className="input-group-btn">
            <Button
              className="RoleSelectRenderer__add-btn"
              bsStyle="primary"
              onClick={this.pushField}
            >
              <FormattedMessage id="app.add" />
            </Button>
          </span>
        </InputGroup>
        <br />
        { this.renderTags() }
      </div>
    );
  }
}


RoleSelectRenderer.propTypes = {
  fields: PropTypes.shape({}).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  emptyOptionTextId: PropTypes.string,
};

RoleSelectRenderer.defaultProps = {
  selectedValues: [],
  valueKey: 'value',
  labelKey: 'label',
  emptyOptionTextId: '',
};

export default RoleSelectRenderer;
