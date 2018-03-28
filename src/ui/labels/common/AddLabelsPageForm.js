import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import { formattedText } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';
import { required } from 'util/validateForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderTextAreaInput from 'ui/common/form/RenderTextAreaInput';


class AddLabelsPageFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

 onSubmit = (ev) => {
   ev.preventDefault();
   this.props.handleSubmit();
 };

 renderField(defaultLanguage) {
   return this.props.languages.map((language) => {
     const titles = `titles.${language.code}`;

     return (
       <div key={language.code}>
         <Field
           name={titles}
           component={RenderTextAreaInput}
           label={
             <span>
               <span className="label label-info">
                 {language.code === defaultLanguage ? `${language.code} *` : language.code}
               </span>
               &nbsp;<FormattedMessage id="app.name" />
             </span>
           }
           cols="50"
           rows="2"
           className="form-control"
           validate={[required]}
         />
       </div>
     );
   });
 }
 render() {
   return (
     <form onSubmit={this.onSubmit} className="form-horizontal">
       <Row>
         <Col xs={12}>
           <fieldset className="no-padding">
             <div className="text-right">
               * <FormattedMessage id="labels.default.language" />
             </div>
             <Field
               component={RenderTextInput}
               name="key"
               label={
                 <span>
                   <FormattedMessage id="app.code" />
                 </span>
               }
               placeholder={formattedText('labels.code.placeholder')}
               validate={[required]}
             />
           </fieldset>
         </Col>
       </Row>

       <Row>
         <Col xs={12}>
           <fieldset className="no-padding">
             <div className="tab-content margin-large-bottom ">
               <div>
                 {this.renderField(this.props.defaultLanguage)}
               </div>
             </div>
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

AddLabelsPageFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    isActive: PropTypes.string,
    isDefault: PropTypes.string,
  })),
  defaultLanguage: PropTypes.string,
};

AddLabelsPageFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: '',
    isActive: '',
    isDefault: '',
  })),
  defaultLanguage: '',
};

const AddLabelsPageForm = reduxForm({
  form: 'label',
})(AddLabelsPageFormBody);

export default AddLabelsPageForm;
