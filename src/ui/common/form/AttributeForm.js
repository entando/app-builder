import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FormSection } from 'redux-form';
import { FormattedMessage, intlShape } from 'react-intl';
import { Button, Row, Col, Alert } from 'patternfly-react';
import AttributeInfo from 'ui/common/attributes/AttributeInfo';
import AttributeInfoComposite from 'ui/common/attributes/AttributeInfoComposite';
import AttributeRole from 'ui/common/attributes/AttributeRole';
import AttributeOgnlValidation from 'ui/common/attributes/AttributeOgnlValidation';
import AttributeHypeLongMonoTextSettings from 'ui/common/attributes/AttributeHypeLongMonoTextSettings';
import AttributeEnumSettings from 'ui/common/attributes/AttributeEnumSettings';
import AttributeEnumMapSettings from 'ui/common/attributes/AttributeEnumMapSettings';
import AttributeMonoListMonoSettings from 'ui/common/attributes/AttributeMonoListMonoSettings';
import AttributesNumber from 'ui/common/attributes/AttributesNumber';
import AttributesDateSettings from 'ui/common/attributes/AttributesDateSettings';
import AttributeListTableComposite from 'ui/common/attributes/AttributeListTableComposite';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';

import {
  MODE_ADD_COMPOSITE, MODE_EDIT_COMPOSITE,
  MODE_ADD_ATTRIBUTE_COMPOSITE,
  TYPE_COMPOSITE,
  TYPE_BOOLEAN,
  TYPE_CHECKBOX,
  TYPE_DATE,
  TYPE_ENUMERATOR,
  TYPE_ENUMERATOR_MAP,
  TYPE_MONOLIST,
  TYPE_LIST,
  TYPE_NUMBER,
  TYPE_THREESTATE,
  TYPE_TIMESTAMP,
} from 'state/profile-types/const';

export class AttributeFormBody extends Component {
  componentDidMount() {
    this.props.onDidMount();
  }

  render() {
    const {
      selectedAttributeType,
      profileTypeAttributeCode,
      nestedAttributeComposite,
      mode,
      isSearchable,
      isIndexable,
      attributesList,
      handleSubmit,
      onCancel,
      onSubmit,
      allowedRoles,
      invalid,
      submitting,
      intl,
      onDiscard,
      onSave,
      dirty,
    } = this.props;
    const isComposite = mode === MODE_ADD_COMPOSITE;
    const isEditComposite = mode === MODE_EDIT_COMPOSITE;
    const isAddAttributeComposite = mode === MODE_ADD_ATTRIBUTE_COMPOSITE;
    const labelsubmit = isEditComposite || isAddAttributeComposite ? 'cms.label.save' : 'cms.label.continue';

    const renderAttributeInfo = () => (
      isComposite ?
        <AttributeInfoComposite /> :
        <AttributeInfo
          isSearchable={isSearchable}
          isIndexable={isIndexable}
          mode={mode}
        />
    );

    const renderAttributeRole = () => (
      !isComposite ? <AttributeRole {...this.props} /> : null
    );

    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard(mode);
      }
    };

    const renderSelectedAttribute = () => {
      switch (selectedAttributeType.code) {
        case TYPE_BOOLEAN: return null;
        case TYPE_CHECKBOX: return null;
        case TYPE_THREESTATE: return null;
        case TYPE_TIMESTAMP: return null;
        case TYPE_MONOLIST:
        case TYPE_LIST:
          return isComposite ?
            <AttributeListTableComposite {...this.props} /> :
            <AttributeMonoListMonoSettings
              {...this.props}
              attributeType={selectedAttributeType}
              attributesList={attributesList}
            />;
        case TYPE_NUMBER: return (
          <FormSection name="validationRules">
            <AttributesNumber {...this.props} />
          </FormSection>
        );
        case TYPE_DATE: return (
          <FormSection name="validationRules">
            <AttributesDateSettings />
          </FormSection>
        );
        case TYPE_ENUMERATOR: return (
          <AttributeEnumSettings
            enumeratorExtractorBeans={selectedAttributeType.enumeratorExtractorBeans}
          />
        );
        case TYPE_ENUMERATOR_MAP: return (
          <AttributeEnumMapSettings
            enumeratorMapExtractorBeans={selectedAttributeType.enumeratorMapExtractorBeans}
          />
        );
        case TYPE_COMPOSITE: {
          return isComposite ?
            <AttributeListTableComposite
              entityCode={profileTypeAttributeCode}
              {...this.props}
            /> : null;
        }
        default: return (
          <FormSection name="validationRules">
            <AttributeHypeLongMonoTextSettings {...this.props} />
          </FormSection>
        );
      }
    };

    const renderOgnlValidation = () => (
      !isComposite ?
        <FormSection name="validationRules">
          <AttributeOgnlValidation />
        </FormSection> : null
    );

    const header = () => {
      switch (selectedAttributeType) {
        case TYPE_COMPOSITE:
          return (
            <Alert type="info">
              <FormattedMessage id="app.working" /> {profileTypeAttributeCode}
            </Alert>
          );
        case TYPE_MONOLIST:
        case TYPE_LIST:
          return (
            mode === MODE_EDIT_COMPOSITE ?
              <Alert type="info">
                <FormattedMessage id="app.working" />
                {TYPE_COMPOSITE},&nbsp;
                <FormattedMessage id="app.element.of" />&nbsp;
                { isComposite ? profileTypeAttributeCode : nestedAttributeComposite }&nbsp;
                ({TYPE_MONOLIST})
              </Alert>
              : null);
        default: return null;
      }
    };

    return (
      <form
        onSubmit={handleSubmit(values => (
            onSubmit(values, allowedRoles, mode)
          ))}
        className="form-horizontal"
      >
        <Row>
          <Col xs={12}>
            {header()}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              {renderAttributeInfo()}
              {renderAttributeRole()}
              {renderSelectedAttribute()}
              {renderOgnlValidation()}
            </fieldset>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <Button
              className="pull-right AttributeForm__continue--btn"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id={labelsubmit} />
            </Button>
            <Button
              onClick={handleCancelClick}
              className="pull-right ContentTypeAttributeForm__cancel-btn"
              type="reset"
              disabled={submitting}
            >
              <FormattedMessage id="cms.label.cancel" />
            </Button>
            <ConfirmCancelModalContainer
              contentText={intl.formatMessage({ id: 'cms.label.modal.confirmCancel' })}
              invalid={invalid}
              submitting={submitting}
              onSave={onSave}
              onDiscard={() => onDiscard(mode)}
            />
          </Col>
        </Row>
      </form>
    );
  }
}

AttributeFormBody.propTypes = {
  intl: intlShape.isRequired,
  onDidMount: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dataTypeAttributeCode: PropTypes.string,
  profileTypeAttributeCode: PropTypes.string,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  initialValues: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }),
  selectedAttributeType: PropTypes.shape({
    simple: PropTypes.bool,
    searchableOptionSupported: PropTypes.bool,
    indexableOptionSupported: PropTypes.bool,
    textFilterSupported: PropTypes.bool,
    dateFilterSupported: PropTypes.bool,
    numberFilterSupported: PropTypes.bool,
    enumeratorOptionsSupported: PropTypes.bool,
    enumeratorMapOptionsSupported: PropTypes.bool,
    listAttribute: PropTypes.bool,
    enumeratorExtractorBeans: PropTypes.arrayOf(PropTypes.string),
    enumeratorMapExtractorBeans: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  validation: PropTypes.shape({
    minLength: PropTypes.string,
    maxLength: PropTypes.string,
    regex: PropTypes.string,
  }),
  allowedRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
  mode: PropTypes.string.isRequired,
  compositeAttributes: PropTypes.arrayOf(PropTypes.shape({})),
  attributesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  nestedAttributeComposite: PropTypes.string.isRequired,
  isSearchable: PropTypes.bool,
  isIndexable: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  dirty: PropTypes.bool,
};

AttributeFormBody.defaultProps = {
  onDidMount: () => {},
  invalid: false,
  submitting: false,
  dataTypeAttributeCode: '',
  profileTypeAttributeCode: '',
  initialValues: {},
  validation: ({
    minLength: '',
    maxLength: '',
    regex: '',
  }),
  allowedRoles: [],
  isSearchable: false,
  isIndexable: false,
  compositeAttributes: [],
  dirty: false,
};

const AttributeForm = reduxForm({
  form: 'addAttribute',
})(AttributeFormBody);

export default AttributeForm;
