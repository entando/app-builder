import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const msgs = defineMessages({
  codePlaceholder: {
    id: 'fragment.code.placeholder',
    defaultMessage: 'Code',
  },
  appAll: {
    id: 'app.all',
    defaultMessage: 'All Apps',
  },
  editPlugin: {
    id: 'fragment.form.edit.plugin',
    defaultMessage: 'Edit Plugin',
  },
  widgetPlaceholder: {
    id: 'fragment.form.edit.widgetType"',
    defaultMessage: 'Widget type',
  },
  pluginPlaceholder: {
    id: 'fragment.form.edit.plugin',
    defaultMessage: 'Plugin',
  },
});

const widgetCategoryMsgs = defineMessages({
  cms: {
    id: 'widget.list.section.cms',
    defaultMessage: 'CMS',
  },
  navigation: {
    id: 'widget.list.section.navigation',
    defaultMessage: 'Navigation',
  },
  system: {
    id: 'widget.list.section.system',
    defaultMessage: 'System',
  },
  seo: {
    id: 'widget.list.section.seo',
    defaultMessage: 'SEO',
  },
  page: {
    id: 'widget.list.section.page',
    defaultMessage: 'Page',
  },
  user: {
    id: 'widget.list.section.user',
    defaultMessage: 'User',
  },
  custom: {
    id: 'widget.list.section.custom',
    defaultMessage: 'Custom',
  },
});

const renderSelectOptgroup = (options, intl) => (
  options.map((item) => {
    const groupName = widgetCategoryMsgs[item.optgroup];
    const label = groupName && groupName.id ? intl.formatMessage(groupName) : item.optgroup;
    return (
      <optgroup key={item.optgroup} label={label}>
        {item.options.map(option =>
        (
          <option
            key={option.code}
            value={option.code}
          >
            {option.title}
          </option>
        ))}
      </optgroup>
    );
  })
);
export class FragmentSearchFormBody extends Component {
  componentDidMount() {
    this.props.onWillMount();
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    const { intl, widgetTypes, plugins } = this.props;
    return (
      <form onSubmit={this.onSubmit} className="FragmentSearchForm">
        <Field
          id="fragmentcode"
          component="input"
          className="form-control"
          name="code"
          placeholder={intl.formatMessage(msgs.codePlaceholder)}
        />
        <Field
          component="select"
          className="form-control"
          name="widgetType"
        >
          <option
            value={intl.formatMessage(msgs.appAll)}
            label={intl.formatMessage(msgs.widgetPlaceholder)}
            className="FragmentSearchForm__select-default-value"
          />
          {renderSelectOptgroup(widgetTypes, intl)}
        </Field>
        <Field
          component="select"
          className="form-control"
          name="pluginCode"
          placeholder={intl.formatMessage(msgs.editPlugin)}
        >
          <option
            value={intl.formatMessage(msgs.appAll)}
            label={intl.formatMessage(msgs.pluginPlaceholder)}
            className="FragmentSearchForm__select-default-value"
          />
          {plugins.map(plugin =>
            <option key={plugin.code} value={plugin.code}>{plugin.title}</option>)}
        </Field>
      </form>
    );
  }
}

FragmentSearchFormBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onWillMount: PropTypes.func,
  widgetTypes: PropTypes.arrayOf(PropTypes.shape({})),
  plugins: PropTypes.arrayOf(PropTypes.shape({})),
};

FragmentSearchFormBody.defaultProps = {
  onWillMount: () => { },
  widgetTypes: [],
  plugins: [],
};

const FragmentSearchForm = reduxForm({
  form: 'fragmentSearch',
})(FragmentSearchFormBody);

export default injectIntl(FragmentSearchForm);
