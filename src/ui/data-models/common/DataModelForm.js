import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, Row, Col } from 'patternfly-react';

import { required, maxLength } from 'util/validateForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';

export class DataModelFormBody extends Component {
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
     const selectOptions = this.props.dataTypes.map(item => ({
       value: item.code,
       text: item.name,
     }));

     return (
       <form onSubmit={this.onSubmit} className="form-horizontal">
         <Row>
           <Col xs={12}>
             <fieldset className="no-padding">
               <RenderSelectInput
                 options={selectOptions}
                 labelId="dataModel.type"
                 fieldName="type"
                 mandatory
               />

               <Field
                 component={RenderTextInput}
                 name="modelId"
                 label={
                   <FormLabel labelId="app.code" helpId="app.help.code" required />
                 }
                 validate={[required, maxLength(255)]}
               />
               <Field
                 component={RenderTextInput}
                 name="name"
                 label={
                   <FormLabel labelId="app.name" required />
                 }
                 validate={[required, maxLength(255)]}
               />
               <div className="form-group">
                 <Col xs={2} className="text-right">
                   <label htmlFor="model" className="control-label">
                     <FormLabel labelId="dataModel.model" required />
                   </label>
                 </Col>
                 <Col xs={10}>
                   <Field
                     name="model"
                     component="textarea"
                     cols="50"
                     rows="8"
                     className="form-control"
                     validate={[required]}
                   />
                 </Col>
               </div>


               <Field
                 component={RenderTextInput}
                 name="stylesheet"
                 label={
                   <FormLabel labelId="dataModel.stylesheet" required />
                 }
                 validate={[maxLength(255)]}
               />
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

DataModelFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  dataTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })),
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

DataModelFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  dataTypes: [],
};

const DataModelForm = reduxForm({
  form: 'dataModel',
})(DataModelFormBody);

export default DataModelForm;
