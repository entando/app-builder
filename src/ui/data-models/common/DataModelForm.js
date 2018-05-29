import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col, Form } from 'patternfly-react';
import { required, maxLength, isNumber } from '@entando/utils';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';

export class DataModelFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const selectOptions = this.props.dataTypes.map(item => ({
      value: item.code,
      text: item.name,
    }));

    return (
      <Form onSubmit={this.props.handleSubmit} horizontal>
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <Field
                component={RenderSelectInput}
                options={selectOptions}
                defaultOptionId="app.chooseAnOption"
                label={
                  <FormLabel labelId="dataModel.type" required />
                }
                name="type"
                validate={required}
              />

              <Field
                component={RenderTextInput}
                name="modelId"
                label={
                  <FormLabel labelId="app.code" helpId="app.help.code" required />
                 }
                validate={[required, isNumber, maxLength(255)]}
              />
              <Field
                component={RenderTextInput}
                name="descr"
                label={
                  <FormLabel labelId="app.description" required />
                 }
                validate={[required, maxLength(255)]}
              />
              <div className="form-group">
                <Col xs={2} className="text-right">
                  <label htmlFor="model" className="control-label">
                    <FormLabel labelId="dataModel.model" required />
                  </label>
                </Col>
                <Col xs={10}>
                  <Field
                    name="model"
                    component="textarea"
                    cols="50"
                    rows="8"
                    className="form-control"
                    validate={[required]}
                  />
                </Col>
              </div>


              <Field
                component={RenderTextInput}
                name="stylesheet"
                label={
                  <FormLabel labelId="dataModel.stylesheet" />
                 }
                validate={[maxLength(255)]}
              />
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
      </Form>
    );
  }
}

DataModelFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  dataTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })),
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

DataModelFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  dataTypes: [],
};

const DataModelForm = reduxForm({
  form: 'dataModel',
})(DataModelFormBody);

export default DataModelForm;
