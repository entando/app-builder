import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { Field } from 'redux-form';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { required, formattedText } from '@entando/utils';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';

const elements = value =>
  (value && !/^(\w+)=([^\s]+)$/i.test(value)
    ? <FormattedMessage id="validateForm.elements" /> : undefined);


const AttributeEnumEnumMapSettings = ({ enumeratorMapExtractorBeans }) => {
  const selectAllowedOptions = enumeratorMapExtractorBeans.map(item => (
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
              <FormLabel labelId="app.enumeratorStaticItems" required />
          }
            validate={[required, elements]}
            placeholder={formattedText('app.enumeratorStaticItemsMap.help')}
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
            fieldName="enumeratorMapExtractorBeans"
          />
        </fieldset>
      </Col>
    </Row>
  );
};
AttributeEnumEnumMapSettings.propTypes = {
  enumeratorMapExtractorBeans: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
};

AttributeEnumEnumMapSettings.defaultProps = {
  enumeratorMapExtractorBeans: [],
};


export default AttributeEnumEnumMapSettings;
