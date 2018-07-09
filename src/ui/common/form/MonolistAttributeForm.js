import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FormSection, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col, FormGroup, Alert } from 'patternfly-react';
import AttributeOgnlValidation from 'ui/common/attributes/AttributeOgnlValidation';
import AttributeHypeLongMonoTextSettings from 'ui/common/attributes/AttributeHypeLongMonoTextSettings';
import AttributeEnumMapSettings from 'ui/common/attributes/AttributeEnumMapSettings';
import AttributesNumber from 'ui/common/attributes/AttributesNumber';
import AttributesDateSettings from 'ui/common/attributes/AttributesDateSettings';
import AttributeEnumSettings from 'ui/common/attributes/AttributeEnumSettings';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import FormLabel from 'ui/common/form/FormLabel';
import AttributeListTableComposite from 'ui/common/attributes/AttributeListTableComposite';
import AttributeInfoComposite from 'ui/common/attributes/AttributeInfoComposite';

import {
  TYPE_BOOLEAN,
  TYPE_CHECKBOX,
  TYPE_THREESTATE,
  TYPE_NUMBER,
  TYPE_DATE,
  TYPE_ENUMERATOR,
  TYPE_ENUMERATOR_MAP,
  TYPE_TEXT,
  TYPE_COMPOSITE,
  TYPE_MONOLIST,
  MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE,
} from 'state/data-types/const';

const NO_INFO_ATTRIBUTE = [
  TYPE_BOOLEAN,
  TYPE_CHECKBOX,
  TYPE_THREESTATE,
];

export class MonolistAttributeFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }
  render() {
    const {
      attributeCode, selectedAttributeType, isIndexable, type, invalid,
      submitting, onSubmit, mode, attributesList, onAddAttribute, onClickDelete, onMove,
    } = this.props;

    const isAddMonoListComposite = mode === MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE;

    console.log('MonolistAttributeFormBody Props', this.props);
    console.log('isAddMonoListComposite', isAddMonoListComposite);
    console.log('mode', mode);
    const attributeType = isAddMonoListComposite ? TYPE_COMPOSITE : type;
    console.log('attributeType', attributeType);

    const renderIndexable = () => {
      if (isIndexable) {
        return (
          <FormGroup>
            <label htmlFor="filterList" className="col-xs-2 control-label">
              <FormLabel labelId="app.indexable" />
            </label>
            <Col xs={4}>
              <Field component={SwitchRenderer} name="indexable" />
            </Col>
          </FormGroup>
        );
      }
      return '';
    };

    const renderAttributeInfo = () => {
      if (isAddMonoListComposite) {
        return <AttributeInfoComposite />;
      }

      return (!NO_INFO_ATTRIBUTE.includes(type) ?
        <fieldset className="no-padding">
          <legend>
            <FormattedMessage id="app.info" />
            <div className="MonolistAttributeForm__required-fields text-right">
               * <FormattedMessage id="app.fieldsRequired" />
            </div>
          </legend>
          <Field
            component={RenderTextInput}
            name="type"
            label={<FormLabel labelId="app.type" />}
            disabled
          />
          {renderIndexable()}
        </fieldset>
        : null);
    };

    const renderSelectedAttribute = () => {
      switch (attributeType) {
        case TYPE_TEXT: return (
          <FormSection name="validationRules">
            <AttributeHypeLongMonoTextSettings {...this.props} />
          </FormSection>
        );
        case TYPE_NUMBER: return (
          <FormSection name="validationRules">
            <AttributesNumber {...this.props} />
          </FormSection>
        );
        case TYPE_DATE: return (
          <FormSection name="validationRules">
            <AttributesDateSettings {...this.props} />
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
          return isAddMonoListComposite ?
            <AttributeListTableComposite
              {...this.props}
              attributesList={attributesList}
              onAddAttribute={onAddAttribute}
              onClickDelete={onClickDelete}
              onMove={onMove}

            /> : null;
        }
        default: return null;
      }
    };

    const renderOgnlValidation = () => (
      !isAddMonoListComposite ?
        <FormSection name="validationRules">
          <AttributeOgnlValidation />
        </FormSection> : null
    );


    return (
      <div className="MonoListAttributeForm">
        <Alert type="info">
          <FormattedMessage id="app.working" />
          {type},&nbsp;
          <FormattedMessage id="app.element.of" />&nbsp;
          {attributeCode}&nbsp;
           ({isAddMonoListComposite ? TYPE_MONOLIST : selectedAttributeType}).
        </Alert>
        <form onSubmit={this.props.handleSubmit(onSubmit)} className="form-horizontal">
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <FormSection name="nestedAttribute">
                  {renderAttributeInfo()}
                  {renderSelectedAttribute()}
                  {renderOgnlValidation()}
                </FormSection>
              </fieldset>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12}>
              <Button
                className="pull-right MonolistAttributeForm__continue--btn"
                type="submit"
                bsStyle="primary"
                disabled={invalid || submitting}
              >
                <FormattedMessage id="app.continue" />
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

MonolistAttributeFormBody.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAddAttribute: PropTypes.func,
  onClickDelete: PropTypes.func,
  onMove: PropTypes.func,
  type: PropTypes.string,
  attributeCode: PropTypes.string,
  selectedAttributeType: PropTypes.string,
  mode: PropTypes.string,
  attributesList: PropTypes.arrayOf(PropTypes.string),
  isIndexable: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

MonolistAttributeFormBody.defaultProps = {
  onAddAttribute: null,
  onClickDelete: null,
  onMove: null,
  invalid: false,
  submitting: false,
  isIndexable: false,
  type: '',
  attributeCode: '',
  selectedAttributeType: TYPE_MONOLIST,
  mode: '',
  attributesList: [],
};

const MonolistAttributeForm = reduxForm({
  form: 'monoListAttribute',
})(MonolistAttributeFormBody);

export default MonolistAttributeForm;
