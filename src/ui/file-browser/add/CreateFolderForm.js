import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import { formattedText, required, maxLength } from '@entando/utils';
import { FormattedMessage } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

export const maxLength50 = maxLength(50);

export class CreateFolderFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

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
                <div className="FileBrowserCreateFolder__required-fields text-right">
                * <FormattedMessage id="app.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                name="path"
                label={<FormLabel labelId="fileBrowser.newFolder" helpId="fileBrowser.newFolder.help" required />}
                placeholder={formattedText('fileBrowser.newFolder')}
                validate={[required, maxLength50]}
              />
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

CreateFolderFormBody.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  onWillMount: PropTypes.func,
};

CreateFolderFormBody.defaultProps = {
  handleSubmit: () => {},
  invalid: false,
  submitting: false,
  onWillMount: () => {},
};

const CreateFolderForm = reduxForm({
  form: 'FileBrowserCreateFolder',
})(CreateFolderFormBody);

export default CreateFolderForm;
