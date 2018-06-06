import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { InputGroup, Button, Row, Col } from 'patternfly-react';

import { required, maxLength } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import AttributeListTable from 'ui/common/attributes/AttributeListTable';
import DeleteAttributeModalContainer from 'ui/profile-types/attributes/DeleteAttributeModalContainer';

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
      profileTypeCode,
    } = this.props;

    const isEdit = mode === 'edit';

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
              <span className="input-group-btn">
                <Button
                  type="button"
                  className="pull-right ProfileTypeForm__add"
                  bsStyle="primary"
                  onClick={() => onAddAttribute(this.props)}
                  disabled={invalid || submitting}
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
            <Button
              className="pull-right ProfileTypeFormBody__save--btn"
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

ProfileTypeFormBody.propTypes = {
  onWillMount: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onAddAttribute: PropTypes.func,
  attributesType: PropTypes.arrayOf(PropTypes.string).isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  profileTypeCode: PropTypes.string,
};

ProfileTypeFormBody.defaultProps = {
  onWillMount: () => {},
  onAddAttribute: () => {},
  invalid: false,
  submitting: false,
  mode: 'add',
  profileTypeCode: '',
};

const ProfileTypeForm = reduxForm({
  form: 'ProfileType',
})(ProfileTypeFormBody);

export default ProfileTypeForm;
