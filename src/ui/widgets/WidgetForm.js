import React from 'react';
import PropTypes from 'prop-types';
import { FieldLevelHelp } from 'patternfly-react';
import { formattedText } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { required, widgetCode, maxLength } from 'util/validateForm';
import RenderTextInput from 'ui/form/RenderTextInput';

const fetchGroups = () => {
  const groups = [1, 2, 3];
  return groups.map(group => (<option key={group} value={group}>{group}</option>));
};

const noFunc = (ev) => {
  ev.preventDefault();
};
export const WidgetFormBody = (props) => {
  const {
    handleSubmit, invalid, submitting,
  } = props;
  const onSubmit = (ev) => {
    ev.preventDefault();
    handleSubmit();
  };
  return (
    <form onSubmit={onSubmit} className="form-horizontal">
      <fieldset className="col-xs-12 no-padding">
        <legend><FormattedMessage id="widget.page.create.pageTitle" />
          <div className="required-fields text-right">* Required Fields</div>
        </legend>

        <Field
          component={RenderTextInput}
          name="showletTypeCode"
          label={
            <span>
              <FormattedMessage id="widget.page.create.code" />
              <i className="fa fa-asterisk required-icon" />
            </span>
          }
          placeholder={formattedText('widget.page.create.code.placeholder')}
          help={<FieldLevelHelp content={formattedText('widget.help.code')} />}
          validate={[required, widgetCode]}
        />
        <Field
          component={RenderTextInput}
          name="englishTitle"
          label={
            <span>
              <span className="label label-info">
                <FormattedMessage id="widget.page.create.en" />
              </span>&nbsp;
              <FormattedMessage id="widget.page.create.title" />
              <i className="fa fa-asterisk required-icon" />
            </span>
          }
          placeholder={formattedText('widget.page.create.title.en.placeholder')}
          validate={[required, maxLength(255)]}
        />
        <Field
          component={RenderTextInput}
          name="italianTitle"
          label={
            <span>
              <span className="label label-info">
                <FormattedMessage id="widget.page.create.it" />
              </span>&nbsp;
              <FormattedMessage id="widget.page.create.title" />
              <i className="fa fa-asterisk required-icon" />
            </span>
          }
          placeholder={formattedText('widget.page.create.title.it.placeholder')}
          validate={[required, maxLength(255)]}
        />
        <div className="form-group">
          <label htmlFor="mainGroup" className="col-sm-2 control-label">&nbsp;
            <FormattedMessage id="widget.page.create.group" />
          </label>
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
                  <a
                    href=" "
                    onClick={noFunc}
                    data-toggle="tab"
                  >
                    Custom <span title="User Interface">UI</span>
                  </a>
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
                    validate={[required]}
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
            <button type="submit" className="btn btn-primary" disabled={invalid || submitting}>
              <FormattedMessage id="widget.page.create.save" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

WidgetFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

WidgetFormBody.defaultProps = {
  invalid: false,
  submitting: false,
};


const WidgetForm = reduxForm({
  form: 'widget',
})(WidgetFormBody);

export default WidgetForm;
