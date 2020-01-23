import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col, ControlLabel, Icon } from 'patternfly-react';
import { required, maxLength } from '@entando/utils';
import { Link } from 'react-router-dom';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextAreaInput from 'ui/common/form/RenderTextAreaInput';
import FormLabel from 'ui/common/form/FormLabel';
import { ROUTE_FILE_BROWSER } from 'app-init/router';

export const maxLength50 = maxLength(50);

const msgs = defineMessages({
  textFileContent: {
    id: 'fileBrowser.textFile.content',
    defaultMessage: 'File Content',
  },
  textFilePlaceholder: {
    id: 'fileBrowser.textFile.placeholder',
    defaultMessage: 'File Placeholder',
  },
});

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


export class CreateTextFileFormBody extends Component {
  componentWillMount() {
    const { filename, onWillMount } = this.props;
    onWillMount(filename);
  }
  render() {
    const {
      intl, invalid, submitting, handleSubmit, mode, filename, onClickDownload,
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className="CreateTextFileForm form-horizontal">
        <Row>
          <Col xs={2} className="text-right">
            <ControlLabel htmlFor="name">
              <FormLabel labelId="app.name" />
            </ControlLabel>
          </Col>
          <Col xs={7}>
            { mode !== 'edit' ?
              <Field
                component={RenderTextInput}
                name="name"
                label={<FormLabel labelId="app.name" />}
                validate={[required, maxLength50]}
              /> :
              <div className="CreateTextFileForm__download-filename">{filename}

                <a
                  className="CreateTextFileForm__link-download"
                  role="presentation"
                  download
                  onClick={() => onClickDownload({ name: filename })}
                >
                  <Icon className="CreateTextFileForm__download-filename-icon" size="lg" name="download" />
                </a>
              </div>
            }

          </Col>
          {
                mode !== 'edit' ?
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
              : null
            }
        </Row>
        <Row>
          <Col xs={12}>

            <Field
              component={RenderTextAreaInput}
              cols={50}
              rows={20}
              name="content"
              label={intl.formatMessage(msgs.textFileContent)}
              placeholder={intl.formatMessage(msgs.textFilePlaceholder)}
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
              to={ROUTE_FILE_BROWSER}
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
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  onClickDownload: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  mode: PropTypes.string,
  filename: PropTypes.string,
};

CreateTextFileFormBody.defaultProps = {
  onWillMount: () => {},
  onClickDownload: () => {},
  mode: '',
  filename: '',
};

const CreateTextFileForm = reduxForm({
  form: 'CreateTextFileForm',
})(CreateTextFileFormBody);

export default injectIntl(CreateTextFileForm);
