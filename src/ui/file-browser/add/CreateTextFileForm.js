import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col, ControlLabel } from 'patternfly-react';
import { formattedText, required, maxLength } from '@entando/utils';
import { Link } from '@entando/router';
import { FormattedMessage } from 'react-intl';
import RenderTextAreaInput from 'ui/common/form/RenderTextAreaInput';
import FormLabel from 'ui/common/form/FormLabel';
import { ROUTE_FILE_BROWSER } from 'app-init/router';

export const maxLength50 = maxLength(50);

const RenderTextInput = (field) => {
  const {
    input, append, meta: { touched, error }, disabled,
  } = field;
  return (
    <div className={`CreateTextFileForm__input ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
      <input
        {...input}
        type="text"
        id={input.name}
        className="form-control CreateTextFileForm__input-text"
        disabled={disabled}
      />
      {append && <span className="AppendedLabel">{append}</span>}
      {touched && ((error && <span className="help-block">{error}</span>))}
    </div>
  );
};


export const CreateTextFileFormBody = ({ invalid, submitting, handleSubmit }) => {
  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit} className="CreateTextFileForm form-horizontal">
      <Row>
        <Col xs={2} className="text-right">
          <ControlLabel htmlFor="name">
            <FormLabel labelId="app.name" />
          </ControlLabel>
        </Col>
        <Col xs={7}>
          <Field
            component={RenderTextInput}
            name="name"
            label={<FormLabel labelId="app.name" />}
            validate={[required, maxLength50]}
          />
        </Col>
        <Col xs={3}>
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

        </Col>

      </Row>
      <Row>
        <Col xs={12}>

          <Field
            component={RenderTextAreaInput}
            cols={50}
            rows={20}
            name="content"
            label={formattedText('fileBrowser.textFile.content')}
            placeholder={formattedText('fileBrowser.textFile.placeholder')}
            validate={[required]}
          />

        </Col>
      </Row>
      <Row>
        <Col xs={12} >
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
};

CreateTextFileFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const CreateTextFileForm = reduxForm({
  form: 'CreateTextFileForm',
})(CreateTextFileFormBody);

export default CreateTextFileForm;
