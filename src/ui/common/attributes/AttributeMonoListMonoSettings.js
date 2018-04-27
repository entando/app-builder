import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import { Row, Col } from 'patternfly-react';
import { required } from '@entando/utils';
import { FormSection } from 'redux-form';

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
            <RenderSelectInput
              options={selectAttribute}
              defaultOptionId="app.chooseAnOption"
              labelId="app.list"
              fieldName="type"
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
