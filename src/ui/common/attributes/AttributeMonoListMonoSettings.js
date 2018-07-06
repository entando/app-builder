import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import { required } from '@entando/utils';
import { Field, FormSection } from 'redux-form';

import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import {
  TYPE_LIST,
  TYPE_COMPOSITE,
  TYPE_HYPERTEXT,
  TYPE_LONGTEXT,
  TYPE_MONOLIST,
  TYPE_TEXT,
} from 'state/data-types/const';

const NO_ATTRIBUTE_FOR_TYPE_LIST =
  [TYPE_LIST, TYPE_COMPOSITE, TYPE_HYPERTEXT, TYPE_LONGTEXT, TYPE_MONOLIST, TYPE_TEXT];

const AttributeMonoListMonoSettings = ({ attributeType, attributesList }) => {
  let list = attributesList;
  if (attributeType === TYPE_LIST) {
    list = list.filter(f => !NO_ATTRIBUTE_FOR_TYPE_LIST.includes(f));
  } else {
    list = list.filter(f => f !== TYPE_LIST && f !== TYPE_MONOLIST);
  }
  const selectAttribute = list.map(item => ({
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
            <Field
              component={RenderSelectInput}
              options={selectAttribute}
              defaultOptionId="app.chooseAnOption"
              label={
                <FormLabel labelId="app.list" required />
              }
              name="type"
              validate={[required]}
            />
          </FormSection>
        </fieldset>
      </Col>
    </Row>
  );
};

AttributeMonoListMonoSettings.propTypes = {
  attributeType: PropTypes.oneOf([TYPE_LIST, TYPE_MONOLIST]).isRequired,
  attributesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AttributeMonoListMonoSettings;
