import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col } from 'patternfly-react';
import AttributeInfo from 'ui/common/attributes/AttributeInfo';
import AttributeRole from 'ui/common/attributes/AttributeRole';
import AttributeOgnlValidation from 'ui/common/attributes/AttributeOgnlValidation';
import AttributeMonoListMonoSettings from 'ui/common/attributes/AttributeMonoListMonoSettings';

export class DataAttributeMonoListFormBody extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.props.onWillMount(this.props.dataTypeAttributeCode);
  }

   onSubmit = (ev) => {
     ev.preventDefault();
     this.props.handleSubmit();
   };

   handleClick = () => {
     this.props.onAddAttribute(this.props.attributeCode);
   };

   render() {
     console.log(this.props.dataTypeAttributeCode);
     return (
       <form onSubmit={this.onSubmit} className="form-horizontal">
         <Row>
           <Col xs={12}>
             <fieldset className="no-padding">
               <legend>
                 <FormattedMessage id="app.attribute" />
                 <div className=" DataAttributeMonoListForm__required-fields text-right">
                   * <FormattedMessage id="app.fieldsRequired" />
                 </div>
               </legend>
               <AttributeInfo />
               <AttributeRole {...this.props} />
               <AttributeMonoListMonoSettings {...this.props} />
               <AttributeOgnlValidation />
             </fieldset>
           </Col>
         </Row>
         <br />
         <Row>
           <Col xs={12}>
             <Button
               className="pull-right"
               type="button"
               bsStyle="primary"
               onClick={this.handleClick}
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

DataAttributeMonoListFormBody.propTypes = {
  onWillMount: PropTypes.func,
  onAddAttribute: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  dataTypeAttributeCode: PropTypes.string,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  attributeCode: PropTypes.string,
};

DataAttributeMonoListFormBody.defaultProps = {
  onWillMount: () => {},
  onAddAttribute: null,
  invalid: false,
  submitting: false,
  dataTypeAttributeCode: '',
  attributeCode: '',
};

const DataAttributeMonoListForm = reduxForm({
  form: 'MonoListAttribute',
})(DataAttributeMonoListFormBody);

export default DataAttributeMonoListForm;
