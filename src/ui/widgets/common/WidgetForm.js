import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Button, Tabs, Tab, Row, Col, Alert } from 'patternfly-react';
import { Panel } from 'react-bootstrap';
import { formattedText, required, widgetCode, maxLength } from '@entando/utils';
import { isUndefined } from 'lodash';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';

const MODE_NEW = 'new';
const maxLength30 = maxLength(30);
const maxLength70 = maxLength(70);

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
    if (this.props.onWillMount) this.props.onWillMount(this.props);
  }

  renderActiveLanguages() {
    const { languages, onChangeDefaultTitle } = this.props;
    if (!isUndefined(languages)) {
      return languages
        .sort(a => (a.isDefault ? -1 : 1))
        .map(lang => (
          <Field
            key={lang.code}
            component={RenderTextInput}
            name={`titles.${lang.code}`}
            label={<FormLabel langLabelText={lang.code} labelId="app.title" required />}
            placeholder={formattedText(`app.${lang.code}Title`)}
            validate={[required, maxLength70]}
            onChange={(ev) => {
              if (onChangeDefaultTitle && lang.isDefault) {
                onChangeDefaultTitle(ev.currentTarget.value);
              }
            }}
          />
        ));
    }
    return null;
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
          <FormLabel labelId="widget.page.create.code" helpId="app.help.code" required />
        }
        placeholder={formattedText('widget.page.create.code.placeholder')}
        validate={[required, widgetCode, maxLength30]}
      />
    );

    let defaultUITab = (
      <Tab eventKey={2} title={formattedText('widget.page.tab.defaultUi')} >
        {
          this.props.defaultUIField ? this.props.defaultUIField :
          <Alert type="info">
            <FormattedMessage id="widget.page.alert.notAvaible" />
          </Alert>
        }
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
              {this.renderActiveLanguages()}
              <Field
                component={RenderSelectInput}
                name="group"
                label={
                  <FormLabel labelId="widget.page.create.group" required />
                }
                validate={required}
                options={this.props.groups}
                optionValue="code"
                optionDisplayName="name"
              />
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
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isDefault: PropTypes.bool,
  })).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  mode: PropTypes.string,
  defaultUIField: PropTypes.string,
  onChangeDefaultTitle: PropTypes.func,
};

WidgetFormBody.defaultProps = {
  onWillMount: null,
  invalid: false,
  submitting: false,
  groups: [{
    name: '',
    code: '',
  }],
  mode: MODE_NEW,
  defaultUIField: '',
  onChangeDefaultTitle: null,
};

const WidgetForm = reduxForm({
  form: 'widget',
})(WidgetFormBody);

export default WidgetForm;
