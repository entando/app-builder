import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { InputGroup, Button, Row, Col } from 'patternfly-react';

import { required, maxLength } from 'util/validateForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';

export class DataTypeFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const {
      attributes, mode, handleSubmit, onSubmit, onAddAttribute,
    } = this.props;
    const isEdit = mode === 'edit';
    const selectOptions = attributes.map(item => ({
      value: item,
      text: item,
    }));

    const renderSelectOption = () => {
      if (isEdit) {
        return (
          <div>
            <legend>
              <FormattedMessage id="app.attributes" />
            </legend>
            <InputGroup>
              <RenderSelectInput
                options={selectOptions}
                defaultOptionId="app.chooseAnOption"
                labelId="DataType.type"
                fieldName="type"
                mandatory
              />
              <span className="input-group-btn">
                <Button
                  type="button"
                  className="pull-right DataTypeForm__add"
                  bsStyle="primary"
                  onClick={() => onAddAttribute(this.props)}
                >
                  <FormattedMessage
                    id="app.add"
                  />
                </Button>
              </span>
            </InputGroup>
          </div>
        );
      }
      return '';
    };

    return (
      <form onSubmit={handleSubmit(onSubmit.bind(this))} className="form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <FormattedMessage id="app.info" />
                <div className="DataTypeForm__required-fields text-right">
                   * <FormattedMessage id="app.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                name="code"
                label={
                  <FormLabel labelId="app.code" helpId="app.help.code" required />
                 }
                validate={[required, maxLength(255)]}
                disabled={isEdit}
              />
              <Field
                component={RenderTextInput}
                name="name"
                label={
                  <FormLabel labelId="app.name" helpId="app.help.name" required />
                 }
                validate={[required, maxLength(50)]}
              />

              {renderSelectOption()}
            </fieldset>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
              disabled={this.props.invalid || this.props.submitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
          </Col>
        </Row>
      </form>

    );
  }
}

DataTypeFormBody.propTypes = {
  onWillMount: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onAddAttribute: PropTypes.func.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.string).isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
};

DataTypeFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  mode: 'add',
};

const DataTypeForm = reduxForm({
  form: 'DataType',
})(DataTypeFormBody);

export default DataTypeForm;
