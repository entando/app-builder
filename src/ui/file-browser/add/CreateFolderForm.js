import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import { formattedText, required, maxLength } from '@entando/utils';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { ROUTE_FILE_BROWSER } from 'app-init/router';

export const maxLength50 = maxLength(50);

export class CreateFolderFormBody extends Component {
  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    const {
      invalid, submitting,
    } = this.props;

    return (
      <form onSubmit={this.onSubmit} className="FileBrowserCreateFolder form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <div className="FileBrowserCreateFolderForm__required-fields text-right">
                * <FormattedMessage id="app.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                name="path"
                label={<FormLabel labelId="fileBrowser.newFolder" required />}
                placeholder={formattedText('fileBrowser.newFolder')}
                validate={[required, maxLength50]}
              />
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right FileBrowserCreateFolderForm__btn-submit"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
            <Button
              className="pull-right FileBrowserCreateFolderForm__btn-cancel"
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

CreateFolderFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const CreateFolderForm = reduxForm({
  form: 'FileBrowserCreateFolder',
})(CreateFolderFormBody);

export default CreateFolderForm;
