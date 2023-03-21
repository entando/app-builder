import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { Field } from 'redux-form';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { required } from '@entando/utils';
import { MODE_EDIT, MODE_ADD } from 'state/data-types/const';

export const element = value =>
  (value && !/^[a-zA-Z0-9_]+(,[a-zA-Z0-9_]+)*$/i.test(value)
    ? <FormattedMessage id="validateForm.element" /> : undefined);

const specialCharRegex = /^[!@#%&_=,:;`]$/;


const specialSymbolValidator = (value) => {
  if (value && !value.match(specialCharRegex)) {
    return <FormattedMessage id="validateForm.specialCharacter" />;
  }
  return undefined;
};


export const separatorValidator = (value, allValues) => {
  if (allValues.enumeratorStaticItemsSeparator && value &&
    allValues.enumeratorStaticItemsSeparator.match(specialCharRegex)) {
    const regexp =
    new
    RegExp(`^([^${allValues.enumeratorStaticItemsSeparator}]+)(${allValues.enumeratorStaticItemsSeparator}([^${allValues.enumeratorStaticItemsSeparator}])+)*$`);
    if (!regexp.test(value)) {
      return <FormattedMessage id="validateForm.element" />;
    }
    return undefined;
  }
  return undefined;
};


const msgs = defineMessages({
  help: {
    id: 'app.enumeratorStaticItems.help',
    defaultMessage: 'Help',
  },
});

const AttributeEnumSettings = ({ intl, enumeratorExtractorBeans, mode }) => {
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
            name="enumeratorStaticItems"
            label={
              <FormLabel labelId="app.enumeratorStaticItems" required />
            }
            placeholder={intl.formatMessage(msgs.help)}
            validate={[required, separatorValidator]}
          />
          <Field
            component={RenderTextInput}
            name="enumeratorStaticItemsSeparator"
            label={
              <FormLabel labelId="app.enumeratorStaticItemsSeparator" />
            }
            validate={[specialSymbolValidator]}
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
                name="enumeratorExtractorBean"
              /> :
              <Field
                component={RenderTextInput}
                name="enumeratorExtractorBean"
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
};

AttributeEnumSettings.defaultProps = {
  enumeratorExtractorBeans: [],
  mode: MODE_ADD,
};

export default injectIntl(AttributeEnumSettings);
