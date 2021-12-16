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
  componentDidMount() {
    const { onDidMount, ...allprops } = this.props;
    onDidMount(allprops);
  }

  componentDidUpdate(prevProps) {
    const { type, onFetchNestedAttribute } = this.props;
    if (type && type !== prevProps.type) {
      onFetchNestedAttribute(this.props);
    }
  }

  render() {
    const {
      attributeCode, selectedAttribute, selectedAttributeType, isIndexable, type, invalid,
      submitting, onSubmit, mode, attributesList, onAddAttribute, onClickDelete, onMove,
      compositeAttributes, handleSubmit,
    } = this.props;
    const isMonoListComposite = mode === MODE_ADD_MONOLIST_ATTRIBUTE_COMPOSITE;
    const attributeType = isMonoListComposite ? TYPE_COMPOSITE : type;
    const renderIndexable = () => {
      if (isIndexable) {
        return (
          <FormGroup>
            <label htmlFor="indexable" className="col-xs-2 control-label">
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
      if (isMonoListComposite) {
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
            enumeratorExtractorBeans={selectedAttribute.enumeratorExtractorBeans}
          />
        );
        case TYPE_ENUMERATOR_MAP: return (
          <AttributeEnumMapSettings
            enumeratorMapExtractorBeans={selectedAttribute.enumeratorMapExtractorBeans}
          />
        );
        case TYPE_COMPOSITE: {
          return isMonoListComposite ?
            <AttributeListTableComposite
              {...this.props}
              attributesList={attributesList}
              compositeAttributes={compositeAttributes}
              onAddAttribute={onAddAttribute}
              onClickDelete={onClickDelete}
              onMove={onMove}
              invalid={invalid}
              submitting={submitting}
            /> : null;
        }
        default: return null;
      }
    };

    const renderOgnlValidation = () => (
      !isMonoListComposite ?
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
          ({isMonoListComposite ? TYPE_MONOLIST : selectedAttributeType}).
        </Alert>
        <form
          onSubmit={handleSubmit(values => onSubmit(values, mode, selectedAttribute))}
          className="form-horizontal"
        >
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
  onDidMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAddAttribute: PropTypes.func,
  onClickDelete: PropTypes.func,
  onMove: PropTypes.func,
  type: PropTypes.string,
  attributeCode: PropTypes.string,
  selectedAttribute: PropTypes.shape({
    enumeratorExtractorBeans: PropTypes.arrayOf(PropTypes.string),
    enumeratorMapExtractorBeans: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      descr: PropTypes.string,
    })),
  }),
  selectedAttributeType: PropTypes.string,
  mode: PropTypes.string,
  attributesList: PropTypes.arrayOf(PropTypes.string),
  isIndexable: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  compositeAttributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onFetchNestedAttribute: PropTypes.func,
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
  selectedAttribute: {},
  selectedAttributeType: TYPE_MONOLIST,
  mode: '',
  attributesList: [],
  onFetchNestedAttribute: () => {},
};

const MonolistAttributeForm = reduxForm({
  form: 'attribute',
})(MonolistAttributeFormBody);

export default MonolistAttributeForm;
