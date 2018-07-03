import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FormSection } from 'redux-form';
import { FormattedMessage } from 'react-intl';
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

import {
  MODE_ADD_COMPOSITE, MODE_EDIT_COMPOSITE, MODE_ADD_ATTRIBUTE_COMPOSITE,
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
} from 'state/data-types/const';

export class EditAttributeFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const {
      selectedAttributeType, selectedAttributeTypeForAddComposite, attributeCode, mode,
    } = this.props;
    const isComposite = mode === MODE_EDIT_COMPOSITE || mode === MODE_ADD_COMPOSITE;
    const isModeAddAttributeComposite = mode === MODE_ADD_ATTRIBUTE_COMPOSITE;
    const attributeType = isModeAddAttributeComposite ?
      selectedAttributeTypeForAddComposite.code : selectedAttributeType;

    const renderAttributeInfo = () => (
      isComposite ?
        <AttributeInfoComposite /> :
        <AttributeInfo
          {...this.props}
          mode={mode}
        />
    );

    const renderSelectedAttribute = () => {
      switch (attributeType) {
        case TYPE_BOOLEAN: return null;
        case TYPE_CHECKBOX: return null;
        case TYPE_THREESTATE: return null;
        case TYPE_TIMESTAMP: return null;
        case TYPE_MONOLIST: return <AttributeMonoListMonoSettings {...this.props} />;
        case TYPE_LIST: return <AttributeMonoListMonoSettings {...this.props} />;
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
          <AttributeEnumSettings mode={MODE_EDIT} />
        );
        case TYPE_ENUMERATOR_MAP: return (
          <AttributeEnumMapSettings />
        );
        case TYPE_COMPOSITE:
          return isComposite ? <AttributeListTableComposite {...this.props} /> : null;

        default: return (
          <FormSection name="validationRules">
            <AttributeHypeLongMonoTextSettings {...this.props} />
          </FormSection>
        );
      }
    };

    const renderAttributeRole = () => (
      !isComposite ? <AttributeRole {...this.props} /> : null
    );

    const renderOgnlValidation = () => (
      !isComposite ?
        <FormSection name="validationRules">
          <AttributeOgnlValidation />
        </FormSection> : null
    );

    return (
      <form
        onSubmit={this.props.handleSubmit(values => (
           this.props.onSubmit(values, this.props.allowedRoles, mode)
         ))}
        className="form-horizontal"
      >
        <Row>
          <Col xs={12}>
            {
              selectedAttributeType === TYPE_COMPOSITE ?
                <Alert type="info">
                  <FormattedMessage id="app.working" /> {attributeCode}
                </Alert> : null
            }
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
          </Col>
        </Row>
      </form>
    );
  }
}

EditAttributeFormBody.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dataTypeAttributeCode: PropTypes.string,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  selectedAttributeType: PropTypes.string,
  selectedAttributeTypeForAddComposite: PropTypes.PropTypes.shape({}),
  attributeCode: PropTypes.string.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
  indexable: PropTypes.bool,
  listFilter: PropTypes.bool,
  mode: PropTypes.string.isRequired,
};

EditAttributeFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  dataTypeAttributeCode: '',
  selectedAttributeType: '',
  selectedAttributeTypeForAddComposite: '',
  indexable: false,
  listFilter: false,
  allowedRoles: [],
};

const EditAttributeForm = reduxForm({
  form: 'attribute',
})(EditAttributeFormBody);

export default EditAttributeForm;
