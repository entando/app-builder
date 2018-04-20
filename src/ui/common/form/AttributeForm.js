import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FormSection } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col } from 'patternfly-react';
import AttributeInfo from 'ui/common/attributes/AttributeInfo';
import AttributeRole from 'ui/common/attributes/AttributeRole';
import AttributeOgnlValidation from 'ui/common/attributes/AttributeOgnlValidation';
import AttributeHypeLongMonoTextSettings from 'ui/common/attributes/AttributeHypeLongMonoTextSettings';
import AttributeEnumMapSettings from 'ui/common/attributes/AttributeEnumMapSettings';
import AttributeMonoListMonoSettings from 'ui/common/attributes/AttributeMonoListMonoSettings';
import AttributesNumber from 'ui/common/attributes/AttributesNumber';
import AttributesDateSettings from 'ui/common/attributes/AttributesDateSettings';
import AttributeEnumSettings from 'ui/common/attributes/AttributeEnumSettings';


export class AttributeFormBody extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    this.props.onWillMount(this.props.dataTypeAttributeCode);
  }

   onSubmit = (ev) => {
     ev.preventDefault();
     this.props.handleSubmit();
   };

   render() {
     const { selectedAttributeType } = this.props;

     const renderMonolistConf = () => {
       if (selectedAttributeType.listAttribute) {
         return (
           <AttributeMonoListMonoSettings {...this.props} />
         );
       }
       return '';
     };

     const renderNumberConf = () => {
       if (selectedAttributeType.numberFilterSupported) {
         return (
           <AttributesNumber {...this.props} />
         );
       }
       return '';
     };

     const renderDateConf = () => {
       if (selectedAttributeType.dateFilterSupported) {
         return (
           <AttributesDateSettings {...this.props} />
         );
       }
       return '';
     };

     const renderTextConf = () => {
       if (selectedAttributeType.textFilterSupported) {
         return (
           <AttributeHypeLongMonoTextSettings {...this.props} />
         );
       }
       return '';
     };

     const renderEnumConf = () => {
       if (selectedAttributeType.enumeratorOptionsSupported) {
         return (
           <AttributeEnumSettings {...this.props} />
         );
       }
       return '';
     };

     const renderEnumMapConf = () => {
       if (selectedAttributeType.enumeratorMapOptionsSupported) {
         return (
           <AttributeEnumMapSettings {...this.props} />
         );
       }
       return '';
     };

     return (
       <form onSubmit={this.onSubmit} className="form-horizontal">
         <Row>
           <Col xs={12}>
             <fieldset className="no-padding">
               <legend>
                 <FormattedMessage id="app.attribute" />
                 <div className="AttributeForm__required-fields text-right">
                   * <FormattedMessage id="app.fieldsRequired" />
                 </div>
               </legend>
               <AttributeInfo {...this.props} />
               <AttributeRole {...this.props} />
               {renderMonolistConf()}
               {renderNumberConf()}
               {renderDateConf()}
               {renderTextConf()}
               {renderEnumConf()}
               {renderEnumMapConf()}
               <FormSection name="validationRules">
                 <AttributeOgnlValidation />
               </FormSection>
             </fieldset>
           </Col>
         </Row>
         <br />
         <Row>
           <Col xs={12}>
             <Button
               className="pull-right"
               type="submit"
               bsStyle="primary"
               disabled={this.props.invalid || this.props.submitting}
             >
               <FormattedMessage id="app.continue" />
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
  dataTypeAttributeCode: PropTypes.string,
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
    enumeratorExtractorBeans: PropTypes.arrayOf(PropTypes.shape({})),
    enumeratorMapExtractorBeans: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

AttributeFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  dataTypeAttributeCode: '',
  initialValues: {},
  selectedAttributeType: {
    enumeratorExtractorBean: [],
    enumeratorMapExtractorBeans: [],
  },
};

const AttributeForm = reduxForm({
  form: 'attribute',
})(AttributeFormBody);

export default AttributeForm;
