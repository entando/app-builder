import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { Field } from 'formik';
import RenderSelectInput from 'ui/common/formik-field/SelectInput';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { required } from '@entando/utils';
import { MODE_EDIT, MODE_ADD } from 'state/data-types/const';
import { convertReduxValidationsToFormikValidations } from 'helpers/formikUtils';

export const element = value =>
  (value && !/^[a-zA-Z0-9_]+(,[a-zA-Z0-9_]+)*$/i.test(value)
    ? <FormattedMessage id="validateForm.element" /> : undefined);

const msgs = defineMessages({
  help: {
    id: 'app.enumeratorStaticItems.help',
    defaultMessage: 'Help',
  },
});

const AttributeEnumSettings = ({
  intl, enumeratorExtractorBeans, mode, prefixName,
}) => {
  const selectAllowedOptions = enumeratorExtractorBeans.map(item => (
    {
      value: item,
      text: item,
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
            name={`${prefixName}enumeratorStaticItems`}
            label={
              <FormLabel labelId="app.enumeratorStaticItems" required />
            }
            placeholder={intl.formatMessage(msgs.help)}
            validate={value =>
              convertReduxValidationsToFormikValidations(value, [required, element])}
          />
          <Field
            component={RenderTextInput}
            name={`${prefixName}enumeratorStaticItemsSeparator`}
            label={
              <FormLabel labelId="app.enumeratorStaticItemsSeparator" />
            }
          />
          {
            mode === MODE_ADD ?
              <Field
                component={RenderSelectInput}
                options={selectAllowedOptions}
                defaultOptionId="app.chooseAnOption"
                label={
                  <FormLabel labelId="app.enumeratorExtractorBean" />
              }
                name={`${prefixName}enumeratorExtractorBean`}
              /> :
              <Field
                component={RenderTextInput}
                name={`${prefixName}enumeratorExtractorBean`}
                label={
                  <FormLabel labelId="app.enumeratorExtractorBean" />
                }
                disabled
              />
          }

        </fieldset>
      </Col>
    </Row>
  );
};

AttributeEnumSettings.propTypes = {
  enumeratorExtractorBeans: PropTypes.arrayOf(PropTypes.string),
  mode: PropTypes.oneOf([MODE_ADD, MODE_EDIT]),
  intl: intlShape.isRequired,
  prefixName: PropTypes.string,
};

AttributeEnumSettings.defaultProps = {
  enumeratorExtractorBeans: [],
  mode: MODE_ADD,
  prefixName: '',
};

export default injectIntl(AttributeEnumSettings);
