import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { formattedText } from '@entando/utils';
import { Row, Col, FormGroup, Button } from 'patternfly-react';


export const renderSelectOptgroup = options => (
  options.map(item => (
    <optgroup key={item.optgroup} label={item.optgroup}>
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
  componentWillMount() {
    this.props.onWillMount();
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleSubmit();
  };

  render() {
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
                placeholder={formattedText('fragment.code.placeholder')}
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
                <option>{formattedText('app.all')}</option>
                {renderSelectOptgroup(this.props.widgetTypes)}
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
                placeholder={formattedText('fragment.form.edit.plugin')}
              >
                <option value={formattedText('app.all')}>{formattedText('app.all')}</option>
                {this.props.plugins.map(plugin =>
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

export default FragmentSearchForm;
