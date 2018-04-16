import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col } from 'patternfly-react';

import { required, maxLength } from 'util/validateForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import AttributeListTable from 'ui/common/attributes/AttributeListTable';

export class DataTypeFormBody extends Component {
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
     // da cambiare con lista attributi
     const selectOptions = this.props.dataTypes.map(item => ({
       value: item.code,
       text: item.name,
     }));

     const renderAttributes = (attributes) => {
       if (attributes.length) {
         return (
           <Row>
             <label htmlFor="attributes" className="col-xs-2 control-label text-right">
               <FormLabel labelId="app.attributes" />
             </label>
             <Col xs={10}>
               <AttributeListTable attributes={attributes} />
             </Col>
           </Row>
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
             </fieldset>
           </Col>
         </Row>
         {this.props.dataType.attributes ? renderAttributes(this.props.dataType.attributes) : ''}
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
  dataTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })),
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  dataType: PropTypes.shape({
    attributes: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

DataTypeFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  dataTypes: [],
  dataType: {},
};

const DataTypeForm = reduxForm({
  form: 'dataType',
})(DataTypeFormBody);

export default DataTypeForm;
