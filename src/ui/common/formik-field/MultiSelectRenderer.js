import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
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

    const { arrayHelpers, name } = this.props;
    const { form } = arrayHelpers;
    const { values } = form;

    const myValues = (values || {})[name] || [];

    if (this.select.value && !myValues.includes(this.select.value)) {
      arrayHelpers.push(this.select.value);
    }
  }

  render() {
    const {
      allOptions,
      labelKey,
      valueKey,
      emptyOptionTextId,
      intl,
      arrayHelpers,
      name,
      ...other
    } = this.props;

    const { form } = arrayHelpers;
    const { values } = form;
    const myValues = (values || {})[name] || [];

    const filteredOptions = allOptions
      .filter(opt => !myValues.includes(opt[valueKey]))
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
      filteredOptions.unshift((
        <option key={messages.emptyOption.id} value="">
          {intl.formatMessage(messages.emptyOption)}
        </option>
      ));
    }

    const renderedTags = myValues.map((value, i) => (
      <Label key={value} bsStyle="primary" className="MultiSelectRenderer__tag">
        {allOptions.length ? allOptions.find(opt => opt[valueKey] === value)[labelKey] : ''}
        <Button
          bsStyle="link"
          className="MultiSelectRenderer__remove-tag-btn"
          onClick={() => arrayHelpers.remove(i)}
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
            {...other}
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
  allOptions: PropTypes.arrayOf(PropTypes.shape({})),
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  emptyOptionTextId: PropTypes.string,
  intl: intlShape,
  arrayHelpers: PropTypes.shape({
    push: PropTypes.func,
    remove: PropTypes.func,
    form: PropTypes.shape({
      values: PropTypes.shape({}),
    }),
  }).isRequired,
  name: PropTypes.string,
};

MultiSelectRenderer.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
  emptyOptionTextId: '',
  intl: {},
  allOptions: [],
  name: '',
};

export default injectIntl(MultiSelectRenderer);
