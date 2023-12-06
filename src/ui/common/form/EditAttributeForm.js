import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form } from 'formik';
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
import { cloneDeep } from 'lodash';

import {
  MODE_ADD_COMPOSITE,
  MODE_EDIT_COMPOSITE,
  MODE_ADD_ATTRIBUTE_COMPOSITE,
  MODE_EDIT,
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
import { selectedAttributeSectionFieldsAndOgnlValidation } from 'ui/common/attributes/AttributeFormUtils';

export class EditAttributeFormBody extends Component {
  componentDidMount() {
    this.props.onDidMount(this.props);
  }

  render() {
    const {
      selectedAttributeType, selectedAttributeTypeForAddComposite, attributeCode, mode,
      nestedAttributeComposite, isSearchable, isIndexable, handleSubmit, onCancel, onDiscard,
      onSave, dirty, submitting, intl, invalid, profileTypeAttributeCode,
    } = this.props;
    const isComposite = mode === MODE_EDIT_COMPOSITE || mode === MODE_ADD_COMPOSITE;
    const isModeAddAttributeComposite = mode === MODE_ADD_ATTRIBUTE_COMPOSITE;
    const attributeType = isModeAddAttributeComposite ?
      selectedAttributeTypeForAddComposite.code : selectedAttributeType;

    const renderAttributeInfo = () => (
      isComposite ?
        <AttributeInfoComposite /> :
        <AttributeInfo
          isSearchable={isSearchable}
          isIndexable={isIndexable}
          mode={mode}
        />
    );

    const handleCancelClick = () => {
      if (dirty) {
        onCancel();
      } else {
        onDiscard(mode);
      }
    };

    const renderSelectedAttribute = () => {
      switch (attributeType) {
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
              attributesList={this.props.attributesList}
            />;
        case TYPE_NUMBER: return (
          <div name="validationRules">
            <AttributesNumber {...this.props} />
          </div>
        );
        case TYPE_DATE: return (
          <div name="validationRules">
            <AttributesDateSettings />
          </div>
        );
        case TYPE_ENUMERATOR: return (
          <AttributeEnumSettings mode={MODE_EDIT} />
        );
        case TYPE_ENUMERATOR_MAP: return (
          <AttributeEnumMapSettings />
        );
        case TYPE_COMPOSITE: {
          return isComposite ?
            <AttributeListTableComposite
              entityCode={profileTypeAttributeCode}
              {...this.props}
            /> : null;
        }
        default: return <AttributeHypeLongMonoTextSettings {...this.props} />;
      }
    };

    const renderAttributeRole = () => (
      !isComposite ? <AttributeRole {...this.props} /> : null
    );

    const renderOgnlValidation = () => (
      !isComposite ? <AttributeOgnlValidation /> : null
    );

    const header = () => {
      switch (attributeType) {
        case TYPE_COMPOSITE:
          return (
            <Alert type="info">
              <FormattedMessage id="app.working" /> {attributeCode}
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
                { isComposite ? attributeCode : nestedAttributeComposite }&nbsp;
                ({attributeType})
              </Alert>
              : null);
        default: return null;
      }
    };

    return (
      <Form
        onSubmit={handleSubmit}
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
              className="pull-right EditAttributeForm__continue--btn"
              type="submit"
              bsStyle="primary"
              disabled={this.props.invalid || this.props.submitting}
            >
              {
              !isComposite ? <FormattedMessage id="app.continue" /> : <FormattedMessage id="app.save" />
              }
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
      </Form>
    );
  }
}

EditAttributeFormBody.propTypes = {
  intl: intlShape.isRequired,
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dataTypeAttributeCode: PropTypes.string,
  profileTypeAttributeCode: PropTypes.string,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  selectedAttributeType: PropTypes.string,
  selectedAttributeTypeForAddComposite: PropTypes.PropTypes.shape({
    code: PropTypes.string,
  }),
  attributeCode: PropTypes.string.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
  mode: PropTypes.string.isRequired,
  attributesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  nestedAttributeComposite: PropTypes.string,
  isSearchable: PropTypes.bool,
  isIndexable: PropTypes.bool,
  onDiscard: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  dirty: PropTypes.bool,
  fetchAttributeDetails: PropTypes.func,
};

EditAttributeFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  dataTypeAttributeCode: '',
  profileTypeAttributeCode: '',
  selectedAttributeType: '',
  selectedAttributeTypeForAddComposite: '',
  allowedRoles: [],
  isSearchable: false,
  isIndexable: false,
  dirty: false,
  fetchAttributeDetails: () => {},
  nestedAttributeComposite: '',
};

const EditAttributeForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({
    initialValues, isIndexable, isSearchable,
    selectedAttributeType, mode, selectedAttributeTypeForAddComposite,
  }) => {
    const isComposite = mode === MODE_EDIT_COMPOSITE || mode === MODE_ADD_COMPOSITE;
    const isModeAddAttributeComposite = mode === MODE_ADD_ATTRIBUTE_COMPOSITE;

    return ({
      ...initialValues,
      type: isModeAddAttributeComposite ? selectedAttributeTypeForAddComposite.code : (initialValues && initialValues.type) || '',
      // AttributeInfo
      code: !isModeAddAttributeComposite ? (initialValues && initialValues.code) || '' : '',
      name: !isModeAddAttributeComposite ? (initialValues && initialValues.name) || '' : '',
      mandatory: !isModeAddAttributeComposite
        ? (initialValues && initialValues.mandatory) || false : false,
      ...(isIndexable ?
        {
          indexable:
          !isModeAddAttributeComposite ? initialValues && initialValues.indexable : false,
        } : {}),
      ...(isSearchable ?
        {
          listFilter:
          !isModeAddAttributeComposite ? initialValues && initialValues.listFilter : false,
        } : {}),
      ...(isComposite ?
        {
          compositeAttributeType:
          !isModeAddAttributeComposite ? (initialValues && initialValues.type) || '' : '',
        } : {}),
      // Roles
      joinRoles: initialValues && initialValues.roles && initialValues.roles.map(role => role.code),
      // selectedAttributeType
      ...(initialValues && selectedAttributeType &&
        selectedAttributeSectionFieldsAndOgnlValidation(
          selectedAttributeType,
          initialValues,
          mode,
          isComposite,
        )),

    });
  },
  handleSubmit: (values, { props: { onSubmit, allowedRoles, mode } }) => {
    onSubmit(cloneDeep(values), allowedRoles, mode);
  },
})(EditAttributeFormBody);

export default EditAttributeForm;
