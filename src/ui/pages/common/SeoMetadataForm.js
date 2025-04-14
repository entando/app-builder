import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Field, withFormik } from 'formik';
import { Row, Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import * as Yup from 'yup';

import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import RenderSelectInput from 'ui/common/formik-field/SelectInput';
import { METATAG_TYPE_OPTIONS } from 'ui/pages/common/const';

const SeoMetadataFormBody = ({ handleSubmit, isValid, readOnly }) => (
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
            disabled={readOnly}
          />
        </Col>
        <Col sm={3}>
          <Field
            component={RenderSelectInput}
            options={METATAG_TYPE_OPTIONS}
            name="metatype"
            label={<FormLabel labelId="app.seo.addMetatagType" />}
            disabled={readOnly}
          />
        </Col>
        <Col sm={4}>
          <Field
            component={RenderTextInput}
            name="metavalue"
            label={<FormLabel labelId="app.seo.addMetatagValue" />}
            disabled={readOnly}
          />
        </Col>
        <Col sm={1}>
          <Button
            className="pull-right"
            type="submit"
            bsStyle="primary"
            disabled={!isValid || readOnly}
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
  isValid: PropTypes.bool,
  readOnly: PropTypes.bool,
};

SeoMetadataFormBody.defaultProps = {
  isValid: false,
  readOnly: false,
};

const SeoMetadataForm = withFormik({
  mapPropsToValues: ({ initialValues }) => ({
    ...initialValues, metatype: get(METATAG_TYPE_OPTIONS, '0.value', ''), metakey: '', metavalue: '',
  }),
  validateOnMount: true,
  validationSchema: () => (
    Yup.object().shape({
      metakey: Yup.string().required(<FormattedMessage id="validateForm.required" />),
      metatype: Yup.string().required(<FormattedMessage id="validateForm.required" />),
      metavalue: Yup.string().required(<FormattedMessage id="validateForm.required" />),
    })),
  handleSubmit: (
    values,
    {
      props: { onSubmit },
    },
  ) => {
    onSubmit(values);
  },
  displayName: 'SeoMetadataForm',
})(SeoMetadataFormBody);

export default SeoMetadataForm;
