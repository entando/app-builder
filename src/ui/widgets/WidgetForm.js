import React from 'react';
import PropTypes from 'prop-types';
import { FieldLevelHelp } from 'patternfly-react';
import { formattedText } from 'frontend-common-components';
import { Field, reduxForm } from 'redux-form';
import { required, widgetCode } from 'util/validateForm';
import RenderTextInput from 'ui/form/RenderTextInput';

const fetchGroups = () => {
  const groups = [1, 2, 3];
  return groups.map(group => (<option key={group} value={group}>{group}</option>));
};

const WidgetFormBody = (props) => {
  const {
    handleSubmit, invalid,
  } = props;
  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log('submitted');
    handleSubmit();
  };
  return (
    <form onSubmit={onSubmit} className="form-horizontal">

      <fieldset className="col-xs-12 no-padding">
        <legend>Info
          <div className="required-fields text-right">* Required Fields</div>
        </legend>

        <Field
          component={RenderTextInput}
          name="showletTypeCode"
          label={<span>Code <i className="fa fa-asterisk required-icon" /></span>}
          placeholder="Code"
          help={<FieldLevelHelp content={formattedText('widget.help.code')} />}

          validate={[required, widgetCode]}

        />

        {/* <FieldisRequired
          component={RenderTextInput}
          type="text"
          name="englishTitle"
          label={
            <span>
          <span className="label label-info">en</span>&nbsp;
          Title <i className="fa fa-asterisk required-icon" />
            </span>
          }
          placeholder="English title"
          validate={[required, widgetCode]}
          />

          <Field
          component={RenderTextInput}
          type="text"
          name="italianTitle"
          label={
            <span>
          <span className="label label-info">it</span>
          Title <i className="fa fa-asterisk required-icon" />
            </span>
          }
          placeholder="Italian title"
          validate={[required, widgetCode]}
        /> */}
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

        <div className="col-xs-12">isRequired
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
                <div className="tab-pane isRequiredfade" id="widget-default-gui" />
              </div>
            </div>
          </div>
        </div>

      </fieldset>
      <br />

      <div className="row">
        <div className="form-group col-md-12">

          <div className="form-group pull-right ">
            <button type="submit" className="btn btn-primary" disabled={invalid}>
              Save
            </button>

          </div>

        </div>
      </div>isRequired
    </form>
  );
};

WidgetFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,

};

WidgetFormBody.defaultProps = {
  invalid: false,
};


const WidgetForm = reduxForm({
  form: 'widget',
})(WidgetFormBody);

export default WidgetForm;
