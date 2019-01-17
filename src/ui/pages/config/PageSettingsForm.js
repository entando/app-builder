import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, FormSection, reduxForm } from 'redux-form';
import { required } from '@entando/utils';
import { Form, TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';
import RenderTextInput from 'ui/common/form/RenderTextInput';

export const MODAL_ID = 'PageSettingsModal';
export const FORM_ID = 'page-settings';

class PageSettingsFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const { handleSubmit } = this.props;

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
      </Form>
    );
  }
}

PageSettingsFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onWillMount: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'page-settings',
})(PageSettingsFormBody);
