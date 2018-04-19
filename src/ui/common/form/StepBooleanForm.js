import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col, FormGroup } from 'patternfly-react';
import AttributeOgnlValidation from 'ui/common/attributes/AttributeOgnlValidation';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';

import SwitchRenderer from 'ui/common/form/SwitchRenderer';

export class StepBooleanFormBody extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    this.props.onWillMount(this.props.attributeCode, this.props.attributeName);
  }

   onSubmit = (ev) => {
     ev.preventDefault();
     this.props.handleSubmit();
   };

   render() {
     console.log('BOOLEAN', this.props.attributeCode);
     console.log('NAME', this.props.attributeName);

     return (
       <form onSubmit={this.onSubmit} className="form-horizontal">
         <Row>
           <Col xs={12}>
             <fieldset className="no-padding">
               <div className="alert alert-info">
                 <span className="pficon pficon-info" />
                 <FormattedMessage id="app.working" />
                 {this.props.attributeCode}&nbsp;
                 <FormattedMessage id="app.element.of" />&nbsp;
                 {this.props.attributeName}&nbsp;{this.props.attributeName}
               </div>

               <legend>
                 <FormattedMessage id="app.attribute" />
                 <div className="StepBooleanForm__required-fields text-right">
                   * <FormattedMessage id="app.fieldsRequired" />
                 </div>
               </legend>
               <Field
                 component={RenderTextInput}
                 name="attributeTypeCode"
                 label={
                   <FormLabel labelId="app.type" />
                 }
                 disabled
               />
               <FormGroup>
                 <label htmlFor="filterList" className="col-xs-2 control-label">
                   <FormLabel labelId="app.indexable" />
                 </label>
                 <Col xs={4}>
                   <Field component={SwitchRenderer} name="indexable" />
                 </Col>
               </FormGroup>
               <AttributeOgnlValidation />
             </fieldset>
           </Col>
         </Row>
         <br />
         <Row>
           <Col xs={12}>
             <Button
               className="pull-right StepBooleanForm__add--btn"
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

StepBooleanFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  attributeCode: PropTypes.string,
  attributeName: PropTypes.string,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

StepBooleanFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  attributeCode: '',
  attributeName: '',
};

const StepBooleanForm = reduxForm({
  form: 'StepBoolean',
})(StepBooleanFormBody);

export default StepBooleanForm;
