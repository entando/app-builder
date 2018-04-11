import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col } from 'patternfly-react';
import { Link } from 'frontend-common-components';

import { required, maxLength } from 'util/validateForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import { ROUTE_ATTRIBUTE_ADD } from 'app-init/router';

export class DataTypeFormBody extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    this.props.onWillMount();
  }

   onSubmit = (ev) => {
     ev.preventDefault();
     this.props.handleSubmit();
   };

   render() {
     console.log('this.props.attributes', this.props.attributes);
     const selectOptions = this.props.attributes.map(item => ({
       value: item,
       text: item,
     }));

     return (
       <form onSubmit={this.onSubmit} className="form-horizontal">
         <Row>
           <Col xs={12}>
             <fieldset className="no-padding">
               <legend>
                 <FormattedMessage id="app.info" />
                 <div className="DataTypeForm__required-fields text-right">
                   * <FormattedMessage id="app.fieldsRequired" />
                 </div>
               </legend>
               <Field
                 component={RenderTextInput}
                 name="code"
                 label={
                   <FormLabel labelId="app.code" helpId="app.help.code" required />
                 }
                 validate={[required, maxLength(255)]}
               />
               <Field
                 component={RenderTextInput}
                 name="name"
                 label={
                   <FormLabel labelId="app.name" helpId="app.help.name" required />
                 }
                 validate={[required, maxLength(50)]}
               />
               <legend>
                 <FormattedMessage id="app.attributes" />
               </legend>
               <RenderSelectInput
                 options={selectOptions}
                 labelId="DataType.type"
                 fieldName="type"
                 mandatory
               />
               <Link route={ROUTE_ATTRIBUTE_ADD}>
                 <Button
                   type="button"
                   className="pull-right ListFragmentPage__add"
                   bsStyle="primary"
                 >
                   <FormattedMessage
                     id="app.add"
                   />
                 </Button>
               </Link>
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
               <FormattedMessage id="app.save" />
             </Button>
           </Col>
         </Row>
       </form>

     );
   }
}

DataTypeFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.string).isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

DataTypeFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
};

const DataTypeForm = reduxForm({
  form: 'DataType',
})(DataTypeFormBody);

export default DataTypeForm;
