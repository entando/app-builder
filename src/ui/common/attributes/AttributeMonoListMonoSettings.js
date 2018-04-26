import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import { Row, Col } from 'patternfly-react';
import { required } from '@entando/utils';

const AttributeMonoListMonoSettings = ({ attributesList }) => {
  const selectAttribute = attributesList.map(item => ({
    value: item,
    text: item,
  }));

  // const optionValue = (
  //   listNestedType === undefined ?
  //     <FormattedMessage id="app.chooseAnOption" /> : listNestedType
  // );
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
            labelId="app.list"
            fieldName="listNestedType"
            validate={[required]}

          />
        </fieldset>
      </Col>
    </Row>
  );
};

AttributeMonoListMonoSettings.propTypes = {
  attributesList: PropTypes.arrayOf(PropTypes.string),
  // listNestedType: PropTypes.string,
};

AttributeMonoListMonoSettings.defaultProps = {
  attributesList: [],
  // listNestedType: '',
};


export default AttributeMonoListMonoSettings;
