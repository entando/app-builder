import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FormSection } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col } from 'patternfly-react';
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

export class AttributeFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const { selectedAttributeType, dataTypeAttributeCode, mode } = this.props;
    const isComposite = mode === MODE_ADD_COMPOSITE;
    const isEditComposite = mode === MODE_EDIT_COMPOSITE;
    const isAddAttributeComposite = mode === MODE_ADD_ATTRIBUTE_COMPOSITE;

    const renderAttributeInfo = () => (
      isComposite ?
        <AttributeInfoComposite /> :
        <AttributeInfo
          isSearchable={selectedAttributeType.searchableOptionSupported}
          isIndexable={selectedAttributeType.indexableOptionSupported}
        />
    );

    const renderAttributeRole = () => (
      !isComposite ? <AttributeRole {...this.props} /> : null
    );

    const renderSelectedAttribute = () => {
      switch (selectedAttributeType.code) {
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
              entityCode={dataTypeAttributeCode}
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

    return (
      <form
        onSubmit={this.props.handleSubmit(values => (
            this.props.onSubmit(values, this.props.allowedRoles)
          ))}
        className="form-horizontal"
      >
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
              disabled={this.props.invalid || this.props.submitting}
            >
              {
                isEditComposite || isAddAttributeComposite ? <FormattedMessage id="app.save" /> : <FormattedMessage id="app.continue" />
              }
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

AttributeFormBody.propTypes = {
  onWillMount: PropTypes.func,
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

};

AttributeFormBody.defaultProps = {
  onWillMount: () => {},
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
  compositeAttributes: [],
};

const AttributeForm = reduxForm({
  form: 'addAttribute',
})(AttributeFormBody);

export default AttributeForm;
