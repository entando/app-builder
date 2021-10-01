import React from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { Field } from 'redux-form';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { required } from '@entando/utils';

export const elements = value => (value && !/^([\w\s#/-]+=[\w\s#/-]+)([^\w\s#/-]{1}([\w\s#/-]+=[\w\s#/-]+)*)*$/i.test(value) ? (
  <FormattedMessage id="validateForm.elements" />
) : (
  undefined
));

const AttributeEnumEnumMapSettings = ({ intl }) => {
  const msgs = defineMessages({
    enumStaticItemsMapHelp: {
      id: 'cms.contenttype.enumeratorStaticItemsMap.help',
      defaultMessage: 'Help',
    },
  });

  return (
    <Row>
      <Col xs={12}>
        <fieldset className="no-padding">
          <legend>
            <FormattedMessage id="cms.label.settings" />
          </legend>
          <Field
            component={RenderTextInput}
            name="enumeratorStaticItems"
            label={<FormLabel labelId="cms.contenttype.enumeratorStaticItems" required />}
            validate={[required, elements]}
            placeholder={intl.formatMessage(msgs.enumStaticItemsMapHelp)}
          />
          <Field
            component={RenderTextInput}
            name="enumeratorStaticItemsSeparator"
            label={<FormLabel labelId="cms.contenttype.enumeratorStaticItemsSeparator" />}
          />
        </fieldset>
      </Col>
    </Row>
  );
};
AttributeEnumEnumMapSettings.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AttributeEnumEnumMapSettings);
