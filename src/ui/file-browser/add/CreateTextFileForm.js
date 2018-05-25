import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import { formattedText, required, maxLength } from '@entando/utils';
import { Link } from '@entando/router';
import { FormattedMessage } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderTextAreaInput from 'ui/common/form/RenderTextAreaInput';
import FormLabel from 'ui/common/form/FormLabel';
import { ROUTE_FILE_BROWSER } from 'app-init/router';

export const maxLength50 = maxLength(50);

export class CreateTextFileFormBody extends Component {
  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    const {
      invalid, submitting,
    } = this.props;

    return (
      <form onSubmit={this.onSubmit} className="CreateTextFileForm form-horizontal">
        <Row>
          <Col xs={8}>
            <fieldset className="no-padding">
              <Field
                component={RenderTextInput}
                name="path"
                label={<FormLabel labelId="app.name" />}
                validate={[required, maxLength50]}
              />
            </fieldset>
          </Col>
          <Col xs={4}>
            <fieldset className="no-padding">
              <label htmlFor="file-extension" className="sr-only">Extension</label>
              <Field
                component="select"
                name="extension"
                validate={[required]}
                className="CreateTextFileForm__select-extension form-control"
              >
                <option value=".txt">txt</option>
                <option value=".css">css</option>
              </Field>
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <Field
                component={RenderTextAreaInput}
                cols={50}
                rows={20}
                label="Content"
                name="content"
                placeholder={formattedText('fileBroswer.textFile.placeholder')}
                validate={[required]}
              />
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right CreateTextFileForm__btn-submit"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
            <Button
              className="pull-right CreateTextFileForm__btn-cancel"
              componentClass={Link}
              route={ROUTE_FILE_BROWSER}
            >
              <FormattedMessage id="app.cancel" />
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

CreateTextFileFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const CreateTextFileForm = reduxForm({
  form: 'CreateTextFileForm',
})(CreateTextFileFormBody);

export default CreateTextFileForm;
