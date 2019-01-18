import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, FormSection, reduxForm } from 'redux-form';
import { Button, Form, TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';
import { required } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';

export const MODAL_ID = 'SinglePageSettingsModal';

class SinglePageSettingsFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const {
      handleSubmit,
      invalid,
      submitting,
      onReset,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit} horizontal className="PageSettingsForm">
        <TabContainer id="page-settings-tabs" defaultActiveKey={1}>
          <div>
            <Nav bsClass="nav nav-tabs">
              <NavItem eventKey={1}>
                <FormattedMessage id="singlePageSettings.generalSettings" />
              </NavItem>
            </Nav>
            <TabContent>
              <TabPane eventKey={1}>
                <legend>
                  <FormattedMessage id="singlePageSettings.pageTitle" />
                  <span className="PageSettingsModal__required-fields pull-right">
                  * <FormattedMessage id="app.fieldsRequired" />
                  </span>
                </legend>
                <FormSection name="titles">
                  <Field
                    label="ENG (default)*"
                    labelSize={3}
                    component={RenderTextInput}
                    name="en"
                    validate={required}
                    alignClass="text-left"
                  />
                </FormSection>
              </TabPane>
            </TabContent>
          </div>
        </TabContainer>
        <div className="pull-right">
          <Button
            bsStyle="default"
            className="btn-cancel"
            onClick={onReset}
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          <Button
            bsStyle="primary"
            disabled={invalid || submitting}
            type="submit"
          >
            <FormattedMessage id="app.save" />
          </Button>
        </div>
      </Form>
    );
  }
}

SinglePageSettingsFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  onReset: PropTypes.func.isRequired,
  onWillMount: PropTypes.func.isRequired,
};

SinglePageSettingsFormBody.defaultProps = {
  invalid: false,
  submitting: false,
};

export default reduxForm({
  form: 'page-settings',
})(SinglePageSettingsFormBody);
