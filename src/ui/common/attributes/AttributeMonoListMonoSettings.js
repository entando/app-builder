import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import { Row, Col } from 'patternfly-react';

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
          <RenderSelectInput
            options={selectAttribute}
            defaultOptionId="app.chooseAnOption"
            labelId="DataType.type"
            fieldName="listNestedType"
          />
        </fieldset>
      </Col>
    </Row>
  );
};

AttributeMonoListMonoSettings.propTypes = {
  attributesList: PropTypes.arrayOf(PropTypes.string),
};

AttributeMonoListMonoSettings.defaultProps = {
  attributesList: [],
};


export default AttributeMonoListMonoSettings;
