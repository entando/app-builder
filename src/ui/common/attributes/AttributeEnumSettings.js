import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { Field } from 'redux-form';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { formattedText } from 'frontend-common-components';

const AttributeEnumEnumMapSettings = ({ allowedRoles }) => {
  const selectAllowedOptions = allowedRoles.map(item => (
    {
      value: item.code,
      text: item.descr,
    }
  ));
  return (
    <Row>
      <Col xs={12}>
        <fieldset className="no-padding">
          <legend>
            <FormattedMessage id="app.settings" />
          </legend>
          <Field
            component={RenderTextInput}
            name="enumeratorStaticItems"
            label={
              <FormLabel labelId="app.enumeratorStaticItems" />
            }
            placeholder={formattedText('app.enumeratorStaticItems.help')}
          />
          <Field
            component={RenderTextInput}
            name="enumeratorStaticItemsSeparator"
            label={
              <FormLabel labelId="app.enumeratorStaticItemsSeparator" />
            }
          />
          <RenderSelectInput
            options={selectAllowedOptions}
            defaultOptionId="app.chooseAnOption"
            labelId="app.enumeratorExtractorBean"
            fieldName="enumeratorExtractorBean"
          />
        </fieldset>
      </Col>
    </Row>
  );
};

AttributeEnumEnumMapSettings.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
};

AttributeEnumEnumMapSettings.defaultProps = {
  allowedRoles: [],
};


export default AttributeEnumEnumMapSettings;
