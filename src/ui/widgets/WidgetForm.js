import React from 'react';
import PropTypes from 'prop-types';
import { FieldLevelHelp } from 'patternfly-react';
import formattedText from 'frontend-common-components';
import { Field, reduxForm } from 'redux-form';


console.log('frontend-common-components: ', formattedText);

const fetchGroups = () => {
  const groups = [1, 2, 3];
  return groups.map(group => (<option key={group} value={group}>{group}</option>));
};
const WidgetFormBody = ({ handleSubmit }) => (

  <form onSubmit={handleSubmit} className="form-horizontal">

    <fieldset className="col-xs-12 no-padding">
      <legend>Info
        <div className="required-fields text-right">* Required Fields</div>
      </legend>

      <div className="form-group">

        <label htmlFor="showletTypeCode" className="col-sm-2 control-label">
          Code <i className="fa fa-asterisk required-icon" />&nbsp;
          <FieldLevelHelp content={formattedText('widget.help.code')} />
        </label>
        <div className="col-sm-10">
          <Field
            component="input"
            type="text"
            // validate={[validateForm.required, validateForm.widgetCode]}
            name="showletTypeCode"
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="englishTitle" className="col-sm-2 control-label">
          <span className="label label-info">en
          </span> Title <i className="fa fa-asterisk required-icon" />
        </label>
        <div className="col-sm-10">
          <Field component="input" type="text" name="englishTitle" className="form-control" />
        </div>
      </div>

      <div className="form-group">

        <label
          htmlFor="italianTitle"
          className="col-sm-2 control-label"
        >
          <code
            className="label label-info"
          >it
          </code> Title <i className="fa fa-asterisk required-icon" />
        </label>
        <div className="col-sm-10">
          <Field component="input" type="text" name="italianTitle" className="form-control" />
        </div>
      </div>

      <div className="form-group">

        <label htmlFor="mainGroup" className="col-sm-2 control-label">Group</label>
        <div className="col-sm-10">

          <Field name="mainGroup" component="select" className="form-control">
            {fetchGroups()}
          </Field>


        </div>
      </div>
    </fieldset>
    <fieldset className="col-xs-12 col-md-12 no-padding">

      <div className="col-xs-12">
        <div className="form-group">
          <span className="control-label col-sm-2" />
          <div className=" col-sm-10">
            <ul className="nav nav-tabs">
              <li className="active">
                <a href=" " data-toggle="tab">Custom <span title="User Interface">UI</span></a>
              </li>

            </ul>
            <div className="tab-content margin-large-bottom ">
              <div className="tab-pane fade in active" id="widget-gui">
                <Field
                  name="gui"
                  component="textarea"
                  cols="50"
                  rows="8"
                  className="form-control"
                />
              </div>
              <div className="tab-pane fade" id="widget-default-gui" />
            </div>
          </div>
        </div>
      </div>

    </fieldset>
    <br />

    <div className="row">
      <div className="form-group col-md-12">

        <div className="form-group pull-right ">
          <button type="submit" className="btn btn-primary">
            Save
          </button>

        </div>

      </div>
    </div>
  </form>

);

WidgetFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const WidgetForm = reduxForm({
  form: 'widget',
})(WidgetFormBody);

export default WidgetForm;
