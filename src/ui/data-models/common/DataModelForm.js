import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col, Form } from 'patternfly-react';
import { required, maxLength, isNumber } from '@entando/utils';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';

const maxLength10 = maxLength(10);
const maxLength50 = maxLength(50);

export class DataModelFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props.dataModelId);
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
                disabled={!!this.props.dataModelId}
                label={
                  <FormLabel labelId="app.code" helpId="dataModel.help.code" required />
                 }
                validate={[required, isNumber, maxLength10]}
              />
              <Field
                component={RenderTextInput}
                name="descr"
                label={
                  <FormLabel labelId="app.name" required />
                 }
                validate={[maxLength50]}
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
                validate={[maxLength50]}
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
  dataModelId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

DataModelFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  dataTypes: [],
  dataModelId: null,
};

const DataModelForm = reduxForm({
  form: 'dataModel',
})(DataModelFormBody);

export default DataModelForm;
