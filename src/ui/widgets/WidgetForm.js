import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Tabs, Tab, Row, Col, Alert } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
import { formattedText } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { required, widgetCode, maxLength } from 'util/validateForm';
import RenderTextInput from 'ui/form/RenderTextInput';
import FormLabel from 'ui/form/FormLabel';
import FormSectionTitle from 'ui/form/FormSectionTitle';

const MODE_NEW = 'new';

export const renderDefaultUIField = (field) => {
  const { input } = field;
  if (!input.value) {
    return (
      <Alert type="info">
        <FormattedMessage id="widget.page.alert.notAvaible" />
      </Alert>
    );
  }
  return (
    <Panel>
      <Panel.Body><pre>{input.value}</pre></Panel.Body>
    </Panel>
  );
};

export class WidgetFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const onSubmit = (ev) => {
      ev.preventDefault();
      this.props.handleSubmit();
    };

    let codeField = (
      <Field
        component={RenderTextInput}
        name="code"
        label={
          <FormLabel labelId="widget.page.create.code" helpId="widget.help.code" required />
        }
        placeholder={formattedText('widget.page.create.code.placeholder')}
        validate={[required, widgetCode]}
      />
    );

    const defaultUIField = (
      <Field
        name="defaultUi"
        component={renderDefaultUIField}
      />
    );

    let defaultUITab = (
      <Tab eventKey={2} title={formattedText('widget.page.tab.defaultUi')} >
        {defaultUIField}
      </Tab>
    );

    if (this.props.mode === 'edit') {
      codeField = null;
    } else {
      defaultUITab = null;
    }

    return (
      <form onSubmit={onSubmit} className="form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <FormSectionTitle titleId="widget.page.create.pageTitle" />
              {codeField}
              <Field
                component={RenderTextInput}
                name="titles.en"
                label={
                  <FormLabel labelId="widget.page.create.title" langLabelId="app.en" required />
                }
                placeholder={formattedText('widget.page.create.title.en.placeholder')}
                validate={[required, maxLength(255)]}
              />
              <Field
                component={RenderTextInput}
                name="titles.it"
                label={
                  <FormLabel labelId="widget.page.create.title" langLabelId="app.it" required />
                }
                placeholder={formattedText('widget.page.create.title.it.placeholder')}
                validate={[required, maxLength(255)]}
              />
              <div className="form-group">
                <label htmlFor="mainGroup" className="col-xs-2 control-label">
                  <FormattedMessage id="widget.page.create.group" />
                </label>
                <Col xs={10}>
                  <Field name="group" component="select" className="form-control">
                    {this.props.groups.map(gr => (
                      <option
                        key={gr.code}
                        value={gr.code}
                      > {gr.name}
                      </option>))}
                  </Field>
                </Col>
              </div>
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <Col xs={12}>
                <div className="form-group">
                  <span className="control-label col-xs-2" />
                  <Col xs={10}>
                    <Tabs id="basic-tabs" defaultActiveKey={1}>
                      <Tab eventKey={1} title={formattedText('widget.page.tab.customUi')} >
                        <Field
                          name="customUi"
                          component="textarea"
                          cols="50"
                          rows="8"
                          className="form-control"
                          validate={[required]}
                        />
                      </Tab>
                      {defaultUITab}
                    </Tabs>
                  </Col>
                </div>
              </Col>
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

WidgetFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  mode: PropTypes.string,
};

WidgetFormBody.defaultProps = {
  onWillMount: () => {},
  invalid: false,
  submitting: false,
  groups: [{
    name: '',
    code: '',
  }],
  mode: MODE_NEW,
};

const WidgetForm = reduxForm({
  form: 'widget',
})(WidgetFormBody);

export default WidgetForm;
