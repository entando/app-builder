import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Row, Col } from 'patternfly-react';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';


const SettingsFragmentFormBody = () => (
  <Row>
    <Col xs={12}>
      <fieldset>
        <Field
          component={SwitchRenderer}
          name="editEmptyFragmentEnabled"
        />
      </fieldset>
    </Col>
  </Row>

);


const SettingsFragmentForm = reduxForm({
  form: 'fragmentSettings',
})(SettingsFragmentFormBody);

export default SettingsFragmentForm;
