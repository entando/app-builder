import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { required } from '@entando/utils';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import { METATAG_TYPE_OPTIONS } from 'ui/pages/common/const';

const SeoMetadataFormBody = ({ handleSubmit, invalid, readOnly }) => (
  <div className="SeoInfo__addmetadata">
    <legend className="SeoInfo__addmetadata--head">
      <FormLabel helpId="app.seo.addMetatagHelp" labelId="app.seo.addMetatag" />
    </legend>
    <Row>
      <Col sm={12} className="no-padding">
        <Col sm={4}>
          <Field
            component={RenderTextInput}
            name="metakey"
            label={<FormLabel labelId="app.seo.addMetatagKey" />}
            validate={[required]}
            disabled={readOnly}
          />
        </Col>
        <Col sm={3}>
          <Field
            component={RenderSelectInput}
            options={METATAG_TYPE_OPTIONS}
            name="metatype"
            label={<FormLabel labelId="app.seo.addMetatagType" />}
            validate={[required]}
            disabled={readOnly}
          />
        </Col>
        <Col sm={4}>
          <Field
            component={RenderTextInput}
            name="metavalue"
            label={<FormLabel labelId="app.seo.addMetatagValue" />}
            validate={[required]}
            disabled={readOnly}
          />
        </Col>
        <Col sm={1}>
          <Button
            className="pull-right"
            type="submit"
            bsStyle="primary"
            disabled={invalid || readOnly}
            onClick={handleSubmit}
          >
            <FormattedMessage id="app.add" />
          </Button>
        </Col>
      </Col>
    </Row>
  </div>
);

SeoMetadataFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  readOnly: PropTypes.bool,
};

SeoMetadataFormBody.defaultProps = {
  invalid: false,
  readOnly: false,
};

const SeoMetadataForm = reduxForm({
  form: 'SeoMetadataForm',
  initialValues: {
    metatype: get(METATAG_TYPE_OPTIONS, '0.value', ''),
  },
})(SeoMetadataFormBody);

export default SeoMetadataForm;
