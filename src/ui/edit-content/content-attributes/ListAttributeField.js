import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldArrayFieldsPropTypes,
  fieldArrayMetaPropTypes,
} from 'redux-form';

import ListField from 'ui/common/form/RenderCMSListField';
import attributeShape from './attributeShape';

const ListAttributeField = ({
  fields,
  label,
  meta,
  attribute,
  ...rest
}) => (
  <ListField
    label={label}
    fields={fields}
    meta={meta}
    attribute={attribute.nestedAttribute}
    {...rest}
  />
);

ListAttributeField.propTypes = {
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
  label: PropTypes.node.isRequired,
  meta: PropTypes.shape(fieldArrayMetaPropTypes).isRequired,
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default ListAttributeField;
