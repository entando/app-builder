import React from 'react';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { Field } from 'redux-form';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import { required } from '@entando/utils';

export const element = value => (value && !/^([\w\s#/-]+)([^\w\s#/-]{1}([\w\s#/-]+)*)*$/i.test(value) ? (
  <FormattedMessage id="validateForm.element" />
) : (
  undefined
));

const AttributeEnumSettings = ({ intl }) => {
  const msgs = defineMessages({
    enumStaticItemsHelp: {
      id: 'cms.contenttype.enumeratorStaticItems.help',
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
            placeholder={intl.formatMessage(msgs.enumStaticItemsHelp)}
            validate={[required, element]}
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

AttributeEnumSettings.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AttributeEnumSettings);
