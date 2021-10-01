import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button, Modal } from 'patternfly-react';
import { FormattedMessage, FormattedHTMLMessage, intlShape, defineMessages } from 'react-intl';
import { required, maxLength } from '@entando/utils';

import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';
import RenderContentTemplateInput from 'ui/common/form/RenderContentTemplateInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import DraggableDialog from 'ui/common/DraggableDialog';

import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const max10Digits = value => (
  value && /^[0-9]{1,10}$/.test(value)
    ? undefined
    : (
      <FormattedMessage
        id="validateForm.code.max10digits"
      />
    )
);
const maxLength50 = maxLength(50);

const messages = defineMessages({
  chooseContentType: {
    id: 'cms.label.select',
    defaultMessage: 'Please select',
  },
  htmlModelAppend: {
    id: 'cms.contenttemplate.form.presscontext',
    defaultMessage: 'CTRL + Space',
  },
});

class AddContentTemplateFormBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: false,
    };
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  componentWillUnmount() {
    const { onDidUnmount } = this.props;
    onDidUnmount();
  }

  handleModalOpen() {
    this.setState({ modalOpened: true });
  }

  handleModalClose() {
    this.setState({ modalOpened: false });
  }

  render() {
    const {
      handleSubmit, invalid, submitting, intl, mode, contentTypes,
      dirty,
      onCancel,
      onDiscard,
      onSave,
      dictionary,
      onChangeContentType,
    } = this.props;
    const { modalOpened } = this.state;

    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <Modal
          dialogComponentClass={DraggableDialog}
          className="AddContentTemplateForm__editassistmodal"
          show={modalOpened}
          onHide={this.handleModalClose}
          backdrop={false}
          enforceFocus={false}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              <FormattedMessage
                id="cms.contenttemplate.form.editassistant"
                defaultMessage="Help Assistant"
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormattedHTMLMessage id="cms.contenttemplate.form.editassist.dialog" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalClose}>
              <FormattedMessage id="cms.label.close" defaultMessage="close" />
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <div className="AddContentTemplateForm__required-fields text-right">
                  * <FormattedMessage id="cms.label.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                name="id"
                label={
                  <FormLabel labelId="cms.contenttemplate.form.code" helpId="cms.contenttemplate.form.codeHelp" required />
                }
                validate={[required, max10Digits]}
                disabled={mode === EDIT_MODE}
              />
              <Field
                component={RenderTextInput}
                name="descr"
                label={<FormLabel labelId="cms.label.name" helpId="cms.contenttemplate.form.nameHelp" required />}
                validate={[required, maxLength50]}
              />
              <Field
                component={RenderDropdownTypeaheadInput}
                name="contentType"
                label={(
                  <FormLabel
                    labelId="cms.contenttemplate.list.contentTypeHeader"
                    helpId="cms.contenttemplate.form.contentTypeHelp"
                    required
                  />
                )}
                options={contentTypes}
                labelKey="name"
                valueKey="code"
                onChange={onChangeContentType}
                placeholder={intl.formatMessage(messages.chooseContentType)}
                validate={[required]}
              />
            </fieldset>
          </Col>
          <Col xs={12}>
            <Field
              name="contentShape"
              label={(
                <FormLabel
                  labelId="cms.contenttemplate.form.htmlmodel"
                  helpId="cms.contenttemplate.form.htmlmodelHelp"
                  required
                />
              )}
              prepend={(
                <Fragment>
                  <Button
                    className="AddContentTemplateForm__editassistbtn"
                    onClick={this.handleModalOpen}
                  >
                    <FormattedMessage
                      id="cms.contenttemplate.form.editassistant"
                      defaultMessage="Help Assistant"
                    />
                  </Button>
                  <p>
                    <FormattedHTMLMessage id="cms.contenttemplate.form.htmlmodel.statusassist" />
                    <br />
                    <FormattedHTMLMessage id="cms.contenttemplate.form.htmlmodel.statusattrhelp" />
                    <br />
                    <FormattedMessage id="cms.contenttemplate.form.htmlmodel.statusadminconf" />
                  </p>
                </Fragment>
              )}
              component={RenderContentTemplateInput}
              cols="50"
              rows="8"
              dictionary={dictionary}
              className="form-control"
              append={intl.formatMessage(messages.htmlModelAppend)}
              validate={[required]}
            />
          </Col>
          <Col xs={12}>
            <Field
              component={RenderTextInput}
              name="stylesheet"
              label={(
                <FormLabel
                  labelId="cms.contenttemplate.form.stylesheet"
                  helpId="cms.contenttemplate.form.stylesheetHelp"
                />
              )}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <Button
              type="submit"
              bsStyle="primary"
              className="pull-right AddContentTypeFormBody__save--btn"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="cms.label.save" />
            </Button>
            <Button
              className="pull-right AddContentTypeFormBody__cancel--btn"
              bsStyle="default"
              onClick={handleCancelClick}
            >
              <FormattedMessage id="cms.label.cancel" />
            </Button>
            <ConfirmCancelModalContainer
              contentText={intl.formatMessage({ id: 'cms.label.modal.confirmCancel' })}
              invalid={invalid}
              submitting={submitting}
              onSave={onSave}
              onDiscard={onDiscard}
            />
          </Col>
        </Row>
      </form>
    );
  }
}

AddContentTemplateFormBody.propTypes = {
  intl: intlShape.isRequired,
  dictionary: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChangeContentType: PropTypes.func.isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  invalid: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
  onDidUnmount: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

AddContentTemplateFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: NEW_MODE,
  dirty: false,
};

const AddContentTemplateForm = reduxForm({
  form: 'contenttemplateform',
})(AddContentTemplateFormBody);

export default AddContentTemplateForm;
