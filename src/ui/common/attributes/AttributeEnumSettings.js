import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { Field } from 'redux-form';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { required, formattedText } from '@entando/utils';

const element = value =>
  (value && !/^[a-zA-Z0-9_]+(,[a-zA-Z0-9_]+)*$/i.test(value)
    ? <FormattedMessage id="validateForm.element" /> : undefined);


const AttributeEnumEnumMapSettings = ({ enumeratorExtractorBeans }) => {
  const selectAllowedOptions = enumeratorExtractorBeans.map(item => (
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
            placeholder={formattedText('app.enumeratorStaticItems.help')}
            validate={[required, element]}
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
  enumeratorExtractorBeans: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
};

AttributeEnumEnumMapSettings.defaultProps = {
  enumeratorExtractorBeans: [],
};


export default AttributeEnumEnumMapSettings;
