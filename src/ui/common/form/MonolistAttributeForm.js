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

const NO_INFO_ATTRIBUTE = [
  'Boolean',
  'Checkbox',
  'Threestate',
];

export class MonolistAttributeFormBody extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

   onSubmit = (ev) => {
     ev.preventDefault();
     this.props.handleSubmit();
   };

   render() {
     const {
       attributeCode,
       selectedAttributeType,
       isIndexable,
       type,
       invalid,
       submitting,
     } = this.props;

     console.log('selectedAttributeType MONOLIST', type);
     const renderNumberConf = () => {
       if (type === 'Number') {
         return (
           <FormSection name="validationRules">
             <AttributesNumber {...this.props} />
           </FormSection>
         );
       }
       return '';
     };

     const renderDateConf = () => {
       if (type === 'Date') {
         return (
           <FormSection name="validationRules">
             <AttributesDateSettings {...this.props} />
           </FormSection>
         );
       }
       return '';
     };

     const renderTextConf = () => {
       if (selectedAttributeType.textFilterSupported) {
         return (
           <FormSection name="validationRules">
             <AttributeHypeLongMonoTextSettings {...this.props} />
           </FormSection>
         );
       }
       return '';
     };

     const renderEnumConf = () => {
       if (type === 'Enumerator') {
         return (
           <AttributeEnumSettings {...this.props} />
         );
       }
       return '';
     };

     const renderEnumMapConf = () => {
       if (type === 'EnumeratorMap') {
         return (
           <AttributeEnumMapSettings {...this.props} />
         );
       }
       return '';
     };

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
       if (NO_INFO_ATTRIBUTE.includes(type)) {
         return '';
       }

       return (
         <fieldset className="no-padding">
           <legend>
             <FormattedMessage id="app.info" />
             <div className="DataTypeForm__required-fields text-right">
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
       );
     };

     return (
       <div className="MonoListAttributeForm">
         <Alert type="info">
           <FormattedMessage id="app.working" />
           {type}&nbsp;
           <FormattedMessage id="app.element.of" />&nbsp;
           {attributeCode}&nbsp;
           <FormattedMessage id="app.monolist" />
         </Alert>
         <form onSubmit={this.onSubmit} className="form-horizontal">
           <Row>
             <Col xs={12}>
               <fieldset className="no-padding">
                 <FormSection name="nestedAttribute">
                   {renderAttributeInfo()}
                   {renderNumberConf()}
                   {renderDateConf()}
                   {renderTextConf()}
                   {renderEnumConf()}
                   {renderEnumMapConf()}
                   <FormSection name="validationRules">
                     <AttributeOgnlValidation />
                   </FormSection>
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
  type: PropTypes.string,
  attributeCode: PropTypes.string,
  isIndexable: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
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
    enumeratorExtractorBeans: PropTypes.arrayOf(PropTypes.shape({})),
    enumeratorMapExtractorBeans: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

MonolistAttributeFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  isIndexable: false,
  type: '',
  attributeCode: '',
  selectedAttributeType: {
    enumeratorExtractorBean: [],
    enumeratorMapExtractorBeans: [],
  },
};

const MonolistAttributeForm = reduxForm({
  form: 'attribute',
})(MonolistAttributeFormBody);

export default MonolistAttributeForm;
