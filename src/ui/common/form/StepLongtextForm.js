import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col, FormGroup } from 'patternfly-react';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

import AttributeOgnlValidation from 'ui/common/attributes/AttributeOgnlValidation';
import AttributeHypeLongMonoTextSettings from 'ui/common/attributes/AttributeHypeLongMonoTextSettings';

export class StepLongtextFormBody extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    this.props.onWillMount(this.props.attributeCode);
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
                 <div className="StepLongtextForm__required-fields text-right">
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
               <AttributeHypeLongMonoTextSettings />
               <AttributeOgnlValidation />
             </fieldset>
           </Col>
         </Row>
         <br />
         <Row>
           <Col xs={12}>
             <Button
               className="pull-right StepLongtextForm__add--btn"
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

StepLongtextFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  attributeCode: PropTypes.string,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

StepLongtextFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  attributeCode: '',
};

const StepLongtextForm = reduxForm({
  form: 'StepLongtext',
})(StepLongtextFormBody);

export default StepLongtextForm;
