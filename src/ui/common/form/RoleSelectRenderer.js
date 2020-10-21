import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Button, Col } from 'patternfly-react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

class RoleSelectRenderer extends Component {
  constructor(props) {
    super(props);
    this.pushField = this.pushField.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.getLabel = this.getLabel.bind(this);
    this.select = null;
  }

  getLabel(role) {
    const { labelFn, labelKey } = this.props;
    return labelFn ? labelFn(role) : role[labelKey];
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
      selectedValues, fields, valueKey, options,
    } = this.props;
    return selectedValues.map((value, i) => (
      <div key={value} className="clearfix">
        { i === 0 && <h3><FormattedMessage id="app.assigned.roles" /></h3>}
        <hr />
        <Col xs={4}>
          <p>
            {this.getLabel(options.find(opt => opt[valueKey] === value))}
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
      options, selectedValues, valueKey, emptyOptionTextId, intl,
    } = this.props;

    const filteredOptions = options
      .filter(opt => !selectedValues.includes(opt[valueKey]))
      .map(item => (
        <option key={`opt-${item[valueKey]}`} value={item[valueKey]}>
          {this.getLabel(item)}
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
  labelFn: PropTypes.func,
  emptyOptionTextId: PropTypes.string,
  intl: intlShape.isRequired,
};

RoleSelectRenderer.defaultProps = {
  selectedValues: [],
  valueKey: 'value',
  labelKey: 'label',
  labelFn: null,
  emptyOptionTextId: '',
};

export default injectIntl(RoleSelectRenderer);
