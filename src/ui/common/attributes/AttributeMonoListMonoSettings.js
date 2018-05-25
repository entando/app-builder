import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { required } from '@entando/utils';
import { Field, FormSection } from 'redux-form';

import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';

const AttributeMonoListMonoSettings = ({ attributesList, defaultValue }) => {
  const selectAttribute = attributesList.map(item => ({
    value: item,
    text: item,
  }));

  return (
    <Row>
      <Col xs={12}>
        <fieldset className="no-padding">
          <legend>
            <FormattedMessage id="app.settings" />
          </legend>
          <FormSection name="nestedAttribute">
            <Field
              component={RenderSelectInput}
              options={selectAttribute}
              defaultOptionId="app.chooseAnOption"
              label={
                <FormLabel labelId="app.list" required />
              }
              name="type"
              validate={[required]}
              selectedValue={defaultValue}
            />
          </FormSection>
        </fieldset>
      </Col>
    </Row>
  );
};

AttributeMonoListMonoSettings.propTypes = {
  attributesList: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.string,
};

AttributeMonoListMonoSettings.defaultProps = {
  attributesList: [],
  defaultValue: '',
};


export default AttributeMonoListMonoSettings;
