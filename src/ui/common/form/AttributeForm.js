import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FormSection } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col } from 'patternfly-react';
import AttributeInfo from 'ui/common/attributes/AttributeInfo';
import AttributeOgnlValidation from 'ui/common/attributes/AttributeOgnlValidation';
import AttributeRole from 'ui/common/attributes/AttributeRole';


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
               <FormSection name="attributeInfo">
                 {/* si porta le props del tipo di attributo */}
                 <AttributeInfo />
               </FormSection>
               <FormSection name="attributeRole">
                 <AttributeRole />
               </FormSection>
               <FormSection name="attributeOgnlValidation">
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
  dataTypeAttributeCode: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

AttributeFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
};

const AttributeForm = reduxForm({
  form: 'Attribute',
})(AttributeFormBody);

export default AttributeForm;
