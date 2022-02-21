import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { InputGroup, Button, Row, Col } from 'patternfly-react';

import { required, maxLength } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import AttributeListTable from 'ui/common/attributes/AttributeListTable';
import DeleteAttributeModalContainer from 'ui/profile-types/attributes/DeleteAttributeModalContainer';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';

const uppercaseThreeLetters = value =>
  (value && !/^[A-Z]{1,3}$/i.test(value)
    ? <FormattedMessage id="validateForm.element.code" /> : undefined);

const maxLength50 = maxLength(50);


export class ProfileTypeFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }
  render() {
    const {
      attributesType, mode, handleSubmit,
      onAddAttribute, invalid, submitting,
      profileTypeCode, attributeCode, intl,
      dirty, onCancel, onDiscard, onSave,
    } = this.props;

    const isEdit = mode === 'edit';

    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard();
      }
    };

    const selectOptions = attributesType.map(item => ({
      value: item,
      text: item,
    }));

    const renderAttributeTable = () => {
      if (isEdit) {
        return (
          <Row>
            <AttributeListTable
              {...this.props}
              entityCode={profileTypeCode}
            />
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
              <FormattedMessage id="app.attributes" />
            </legend>
            <InputGroup>
              <Field
                component={RenderSelectInput}
                options={selectOptions}
                defaultOptionId="app.chooseAnOption"
                label={
                  <FormLabel labelId="ProfileType.type" required />
                }
                name="type"
              />
              <span className="ProfileTypeForm__input-group-btn input-group-btn">
                <Button
                  type="button"
                  className="pull-right ProfileTypeForm__add"
                  bsStyle="primary"
                  onClick={() => onAddAttribute(this.props)}
                  disabled={invalid || submitting || !attributeCode}
                >
                  <FormattedMessage
                    id="app.add"
                  />
                </Button>
              </span>
            </InputGroup>
          </div>
        );
      }
      return '';
    };

    return (
      <form onSubmit={handleSubmit} className="form-horizontal ProfileTypeForm">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <FormattedMessage id="app.info" />
                <div className="ProfileTypeForm__required-fields text-right">
                  * <FormattedMessage id="app.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                className="ProfileTypeForm__input-code"
                name="code"
                label={
                  <FormLabel labelId="app.code" helpId="app.add.attribute.code" required />
                }
                validate={[required, uppercaseThreeLetters]}
                disabled={isEdit}
              />
              <Field
                component={RenderTextInput}
                name="name"
                label={
                  <FormLabel labelId="app.name" helpId="app.help.name" required />
                 }
                validate={[required, maxLength50]}
              />
              {renderSelectOption()}
              {renderAttributeTable()}
            </fieldset>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <ConfirmCancelModalContainer
              contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
              invalid={invalid}
              submitting={submitting}
              onSave={onSave}
              onDiscard={onDiscard}
            />
            <Button
              className="pull-right ProfileTypeForm__save-btn"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
            <Button
              className="pull-right UserForm__action-button"
              bsStyle="default"
              onClick={handleCancelClick}
            >
              <FormattedMessage id="app.cancel" />
            </Button>
          </Col>
        </Row>
      </form>

    );
  }
}

ProfileTypeFormBody.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onAddAttribute: PropTypes.func,
  attributesType: PropTypes.arrayOf(PropTypes.string).isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  profileTypeCode: PropTypes.string,
  attributeCode: PropTypes.string,
  dirty: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ProfileTypeFormBody.defaultProps = {
  onWillMount: () => {},
  onAddAttribute: () => {},
  invalid: false,
  submitting: false,
  mode: 'add',
  profileTypeCode: '',
  attributeCode: '',
  dirty: false,
};

const ProfileTypeForm = injectIntl(reduxForm({
  form: 'ProfileType',
})(ProfileTypeFormBody));

export default ProfileTypeForm;
