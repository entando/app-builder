import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'patternfly-react';
import { formattedText, required } from '@entando/utils';
import { FormattedMessage } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderTextAreaInput from 'ui/common/form/RenderTextAreaInput';


const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

export class LabelsFormBody extends Component {
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
 renderFieldKey = () => (
   <div>
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
       disabled={this.props.mode === EDIT_MODE}
     />
   </div>
 )


 render() {
   return (
     <form onSubmit={this.onSubmit} className="form-horizontal AddLabelsPageForm">
       <Row>
         <Col xs={12}>
           <fieldset className="no-padding">
             <div className="text-right">
               * <FormattedMessage id="labels.default.language" />
             </div>
             {this.renderFieldKey()}
           </fieldset>
         </Col>
       </Row>

       <Row>
         <Col xs={12}>
           <fieldset className="no-padding">
             <div className="tab-content margin-large-bottom ">
               {this.renderField(this.props.defaultLanguage)}
             </div>
           </fieldset>
         </Col>
       </Row>
       <br />
       <Row>
         <Col xs={12}>
           <Button
             className="pull-right AddLabelsPageForm__save-btn"
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

LabelsFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    isActive: PropTypes.bool,
    isDefault: PropTypes.bool,
  })),
  defaultLanguage: PropTypes.string,
  mode: PropTypes.string,
};

LabelsFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: '',
    isActive: '',
    isDefault: '',
  })),
  defaultLanguage: '',
  mode: NEW_MODE,
};

const LabelsForm = reduxForm({
  form: 'label',
})(LabelsFormBody);

export default LabelsForm;
