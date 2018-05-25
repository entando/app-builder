import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup, Button } from 'patternfly-react';

import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';

export class DataModelSearchFormBody extends Component {
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
       <form onSubmit={this.onSubmit} className="DataModelSearchForm form-horizontal well">
         <h3><FormattedMessage id="app.search" /></h3>
         <FormGroup>
           <Row>
             <Col sm={10}>
               <Field
                 component={RenderSelectInput}
                 options={selectOptions}
                 name="type"
                 label={
                   <FormLabel labelId="dataModel.type" required />
                 }
               />
             </Col>
           </Row>
         </FormGroup>
         <FormGroup>
           <Row>
             <Col xs={11}>
               <Button type="submit" bsStyle="primary" className="pull-right" >
                 <FormattedMessage id="app.search" />
               </Button>
             </Col>
           </Row>
         </FormGroup>
       </form>
     );
   }
}

DataModelSearchFormBody.defaultProps = {
  onWillMount: () => {},
  dataTypes: [],
};

DataModelSearchFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  dataTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })),
};

const DataModelSearchForm = reduxForm({
  form: 'dataModelSearch',
})(DataModelSearchFormBody);

export default DataModelSearchForm;
