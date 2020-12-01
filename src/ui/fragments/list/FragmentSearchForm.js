import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col, FormGroup, Button } from 'patternfly-react';

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
  options.map(item => (
    <optgroup key={item.optgroup} label={intl.formatMessage(widgetCategoryMsgs[item.optgroup])}>
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
  ))
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
      <form onSubmit={this.onSubmit} className="FragmentSearchForm form-horizontal well">
        <h3><FormattedMessage id="app.search" /></h3>
        <FormGroup>
          <Row>
            <label className="control-label col-sm-2" htmlFor="code">
              <FormattedMessage id="fragment.code" />
            </label>
            <Col sm={9}>
              <Field
                id="fragmentcode"
                component="input"
                className="form-control"
                name="code"
                placeholder={intl.formatMessage(msgs.codePlaceholder)}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <label className="control-label col-sm-2" htmlFor="widgetType">
              <FormattedMessage id="fragment.form.edit.widgetType" />
            </label>
            <Col sm={9}>
              <Field
                component="select"
                className="form-control"
                name="widgetType"
              >
                <option>{intl.formatMessage(msgs.appAll)}</option>
                {renderSelectOptgroup(widgetTypes, intl)}
              </Field>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <label className="control-label col-sm-2" htmlFor="plugin">
              <FormattedMessage id="fragment.form.edit.plugin" />
            </label>
            <Col sm={9}>
              <Field
                component="select"
                className="form-control"
                name="pluginCode"
                placeholder={intl.formatMessage(msgs.editPlugin)}
              >
                <option value={intl.formatMessage(msgs.appAll)}>
                  {intl.formatMessage(msgs.appAll)}
                </option>
                {plugins.map(plugin =>
                  <option key={plugin.code} value={plugin.code}>{plugin.title}</option>)}
              </Field>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs={11}>
              <Button
                type="submit"
                bsStyle="primary"
                className="pull-right"
              >
                <FormattedMessage id="app.search" />
              </Button>
            </Col>
          </Row>
        </FormGroup>
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
  onWillMount: () => {},
  widgetTypes: [],
  plugins: [],
};

const FragmentSearchForm = reduxForm({
  form: 'fragmentSearch',
})(FragmentSearchFormBody);

export default injectIntl(FragmentSearchForm);
