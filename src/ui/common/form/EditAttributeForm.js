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


export class EditAttributeFormBody extends Component {
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
     const { selectedAttributeType } = this.props;

     const renderMonolistConf = () => {
       if (selectedAttributeType === 'Monolist' || selectedAttributeType === 'List') {
         return (
           <AttributeMonoListMonoSettings {...this.props} />
         );
       }
       return '';
     };

     const renderNumberConf = () => {
       if (selectedAttributeType === 'Number') {
         return (
           <FormSection name="validationRules">
             <AttributesNumber {...this.props} />
           </FormSection>
         );
       }
       return '';
     };

     const renderDateConf = () => {
       if (selectedAttributeType === 'Date') {
         return (
           <FormSection name="validationRules">
             <AttributesDateSettings {...this.props} />
           </FormSection>
         );
       }
       return '';
     };

     const renderTextConf = () => {
       if (selectedAttributeType === 'Hypertext' ||
       selectedAttributeType === 'Monotext' ||
       selectedAttributeType === 'Longtext' ||
       selectedAttributeType === 'Text') {
         return (
           <FormSection name="validationRules">
             <AttributeHypeLongMonoTextSettings {...this.props} />
           </FormSection>
         );
       }
       return '';
     };

     const renderEnumConf = () => {
       if (selectedAttributeType === 'Enumerator') {
         return (
           <AttributeEnumSettings {...this.props} />
         );
       }
       return '';
     };

     const renderEnumMapConf = () => {
       if (selectedAttributeType === 'EnumeratorMap') {
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
               <AttributeInfo {...this.props} />
               <AttributeRole {...this.props} />
               {renderMonolistConf()}
               {renderTextConf()}
               {renderEnumConf()}
               {renderEnumMapConf()}
               <FormSection name="validationRules">
                 {renderNumberConf()}
                 {renderDateConf()}
                 <AttributeOgnlValidation />
               </FormSection>
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
               <FormattedMessage id="app.continue" />
             </Button>
           </Col>
         </Row>
       </form>
     );
   }
}

EditAttributeFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  dataTypeAttributeCode: PropTypes.string,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  selectedAttributeType: PropTypes.string,
};

EditAttributeFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  dataTypeAttributeCode: '',
  selectedAttributeType: '',
};

const EditAttributeForm = reduxForm({
  form: 'attribute',
})(EditAttributeFormBody);

export default EditAttributeForm;
