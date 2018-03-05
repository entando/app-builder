import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col } from 'patternfly-react';

import { required, maxLength } from 'util/validateForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

export class DataModelFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }


  render() {
    const onSubmit = (ev) => {
      ev.preventDefault();
      this.props.handleSubmit();
    };
    return (
      <form onSubmit={onSubmit} className="form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">

              <div className="form-group">
                <label htmlFor="mainGroup" className="col-xs-2 control-label">
                  <FormattedMessage id="dataModel.type" />
                </label>
                <Col xs={10}>
                  <Field name="type" component="select" className="form-control">
                    {this.props.dataModels.map(gr => (
                      <option
                        key={gr.code}
                        value={gr.code}
                      > {gr.name}
                      </option>))}
                  </Field>
                </Col>
              </div>

              <Field
                component={RenderTextInput}
                name="modelId"
                label={
                  <FormLabel labelId="app.code" required />
                }
                validate={[required, maxLength(255)]}
              />
              <Field
                component={RenderTextInput}
                name="name"
                label={
                  <FormLabel labelId="app.name" required />
                }
                validate={[required, maxLength(255)]}
              />

            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">

              <div className="form-group">
                <label htmlFor="mainGroup" className="col-xs-2 control-label">
                  <FormattedMessage id="dataModel.model" />
                </label>
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
                  <FormLabel labelId="dataModel.stylesheet" required />
                }
                validate={[required, maxLength(255)]}
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
      </form>

    );
  }
}

DataModelFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  dataModels: PropTypes.arrayOf(PropTypes.shape({
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
  dataModels: [{
    code: '',
    name: '',
  }],
};

const DataModelForm = reduxForm({
  form: 'dataModel',
})(DataModelFormBody);

export default DataModelForm;
