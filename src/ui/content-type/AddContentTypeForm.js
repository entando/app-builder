import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, intlShape } from 'react-intl';
import { InputGroup, Button, Row, Col } from 'patternfly-react';

import { required, maxLength } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import AttributeListTable from 'ui/common/contenttype-attributes/AttributeListTable';
import DeleteAttributeModalContainer from 'ui/content-type/attributes/DeleteAttributeModalContainer';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';

const uppercaseThreeLetters = value => (value && !/[A-Z]$/g.test(value) ? <FormattedMessage id="validateForm.element.code" /> : undefined);

const maxLength3 = maxLength(3);

const maxLength50 = maxLength(50);

export class AddContentTypeFormBody extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount(this.props);
  }

  render() {
    const {
      attributesType,
      mode,
      handleSubmit,
      onAddAttribute,
      invalid,
      submitting,
      contentTypeCode,
      viewPages,
      contentTemplates,
      dirty,
      intl,
      onCancel,
      onDiscard,
      onSave,
      locale,
    } = this.props;
    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    const isEdit = mode === 'edit';

    const selectOptions = attributesType.map(item => ({
      value: item,
      text: item,
    }));

    const renderAttributeTable = () => {
      if (isEdit) {
        return (
          <Row>
            <AttributeListTable entityCode={contentTypeCode} {...this.props} locale={locale} />
            <DeleteAttributeModalContainer />
          </Row>
        );
      }
      return '';
    };

    const renderSelectOption = () => {
      if (isEdit) {
        return (
          <div>
            <legend>
              <FormattedMessage id="cms.contenttype.attributes.label" />
            </legend>
            <InputGroup>
              <Field
                component={RenderSelectInput}
                options={selectOptions}
                defaultOptionId="cms.label.select"
                label={<FormLabel labelId="cms.contenttype.form.type" required />}
                name="type"
              />
              <span className="input-group-btn">
                <Button
                  type="button"
                  className="pull-right ContentTypeForm__add"
                  bsStyle="primary"
                  onClick={() => onAddAttribute(this.props)}
                  disabled={invalid || submitting}
                >
                  <FormattedMessage id="cms.label.add" />
                </Button>
              </span>
            </InputGroup>
          </div>
        );
      }
      return '';
    };

    const renderMetadataSection = () => {
      if (isEdit) {
        const selectViewPageOptions = [{ value: '', text: 'None' }]
          .concat(viewPages.map(({ code }) => ({
            value: code,
            text: code,
          })));

        const selectContentTemplateOptions = [{ value: '', text: 'No template' }]
          .concat(contentTemplates.map(({ id, descr }) => ({
            value: id,
            text: descr,
          })));

        return (
          <div>
            <legend>
              <FormattedMessage id="cms.label.metadata" />
            </legend>
            <Field
              component={RenderSelectInput}
              options={selectViewPageOptions}
              label={
                <FormLabel labelId="cms.contenttype.form.metadata.viewPage" />
              }
              name="viewPage"
            />
            <Field
              component={RenderSelectInput}
              options={selectContentTemplateOptions}
              label={
                <FormLabel labelId="cms.contenttype.form.metadata.defaultContentTemplate" />
              }
              name="defaultContentModel"
            />
            <Field
              component={RenderSelectInput}
              options={selectContentTemplateOptions}
              label={
                <FormLabel labelId="cms.contenttype.form.metadata.defaultContentTemplateLists" />
              }
              name="defaultContentModelList"
            />
          </div>
        );
      }
      return '';
    };

    return (
      <form onSubmit={handleSubmit} className="form-horizontal ContentTypeForm">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <FormattedMessage id="cms.label.info" />
                <div className="ContentTypeForm__required-fields text-right">
                  * <FormattedMessage id="cms.label.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                className="ContentTypeForm__input-code"
                name="code"
                label={(
                  <FormLabel
                    labelId="cms.contenttype.form.code"
                    helpId="validateForm.element.code"
                    required
                  />
)}
                validate={[required, uppercaseThreeLetters, maxLength3]}
                disabled={isEdit}
              />
              <Field
                component={RenderTextInput}
                name="name"
                label={(
                  <FormLabel
                    labelId="cms.contenttype.form.name"
                    helpId="validateForm.name.help"
                    required
                  />
)}
                validate={[required, maxLength50]}
              />
              {renderMetadataSection()}
              {renderSelectOption()}
              {renderAttributeTable()}
            </fieldset>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right AddContentTypeFormBody__save--btn"
              type="submit"
              bsStyle="primary"
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

AddContentTypeFormBody.propTypes = {
  onDidMount: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onAddAttribute: PropTypes.func,
  attributesType: PropTypes.arrayOf(PropTypes.string).isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  contentTypeCode: PropTypes.string,
  viewPages: PropTypes.arrayOf(PropTypes.object),
  contentTemplates: PropTypes.arrayOf(PropTypes.object),
  intl: intlShape.isRequired,
  dirty: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  locale: PropTypes.string,
};

AddContentTypeFormBody.defaultProps = {
  onDidMount: () => {},
  onAddAttribute: () => {},
  invalid: false,
  submitting: false,
  mode: 'add',
  contentTypeCode: '',
  viewPages: [],
  contentTemplates: [],
  dirty: false,
  locale: '',
};

const AddContentTypeForm = reduxForm({
  form: 'ContentType',
})(AddContentTypeFormBody);

export default AddContentTypeForm;
