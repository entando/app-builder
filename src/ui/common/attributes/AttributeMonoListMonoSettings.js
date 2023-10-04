import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { required } from '@entando/utils';
import { Field } from 'formik';
import { convertReduxValidationsToFormikValidations } from 'helpers/formikUtils';
import RenderSelectInput from 'ui/common/formik-field/SelectInput';
import FormLabel from 'ui/common/form/FormLabel';

const AttributeMonoListMonoSettings = ({ attributesList }) => {
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
          <Field
            component={RenderSelectInput}
            options={selectAttribute}
            defaultOptionId="app.chooseAnOption"
            label={
              <FormLabel labelId="app.list" required />
              }
            name="nestedAttribute.type"
            validate={value => convertReduxValidationsToFormikValidations(value, [required])}
          />
        </fieldset>
      </Col>
    </Row>
  );
};

AttributeMonoListMonoSettings.propTypes = {
  attributesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AttributeMonoListMonoSettings;
