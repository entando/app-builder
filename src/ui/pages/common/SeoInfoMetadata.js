import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Icon, ControlLabel } from 'patternfly-react';
import { Field, useFormikContext } from 'formik';

import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import RenderSelectInput from 'ui/common/formik-field/SelectInput';
import SwitchRenderer from 'ui/common/formik-field/SwitchInput';
import FormLabel from 'ui/common/form/FormLabel';
import SeoMetadataForm from 'ui/pages/common/SeoMetadataForm';
import { METATAG_TYPE_OPTIONS } from 'ui/pages/common/const';

const SeoInfoMetadata = ({
  value,
  langIdx,
  readOnly,
  lang,
  languages,
}) => {
  const formik = useFormikContext();
  const onPushMetadata = (metadata) => {
    const { metakey, metatype, metavalue } = metadata;
    const newMetadata = {
      key: metakey,
      type: metatype,
      value: metavalue,
      useDefaultLang: false,
    };
    languages.forEach((language) => {
      formik.setFieldValue(`seoData.seoDataByLang.${language.code}.metaTags`, [
        ...value,
        newMetadata,
      ]);
    });
  };

  const onRemoveMetadata = (idx) => {
    languages.forEach((language) => {
      formik.setFieldValue(`seoData.seoDataByLang.${language.code}.metaTags`, [
        ...value.slice(0, idx),
        ...value.slice(idx + 1),
      ]);
    });
  };


  const fieldTables = value.map((metas, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={`${metas.key}-${idx}`} className="form-group SeoInfo__metadata--itemgroup">
      <Col sm={2}>
        <div className="text-right SeoInfo__metadata--itemgroup">
          <ControlLabel htmlFor={`seoData.seoDataByLang.${lang.code}.metaTags.${idx}.type`}>
            <span>{metas.key}</span>
          </ControlLabel>
        </div>
      </Col>
      <Col sm={langIdx ? 3 : 4}>
        <Field
          component={RenderSelectInput}
          options={METATAG_TYPE_OPTIONS}
          name={`seoData.seoDataByLang.${lang.code}.metaTags.${idx}.type`}
          labelSize={0}
          inputSize={12}
          disabled={metas.useDefaultLang || readOnly}
          hasLabel={false}
        />
      </Col>
      <Col sm={langIdx ? 3 : 4}>
        <Field
          component={RenderTextInput}
          name={`seoData.seoDataByLang.${lang.code}.metaTags.${idx}.value`}
          labelSize={0}
          inputSize={12}
          disabled={metas.useDefaultLang || readOnly}
        />
      </Col>
      <Col sm={langIdx ? 3 : 1} className="text-right">
        {langIdx > 0 ? (
          <Field
            component={SwitchRenderer}
            name={`seoData.seoDataByLang.${lang.code}.metaTags.${idx}.useDefaultLang`}
            label={<FormLabel labelId="app.seo.inheritLangLabel" />}
            labelSize={7}
            disabled={readOnly}
          />
      ) : (
        <Button bsStyle="danger" onClick={() => onRemoveMetadata(idx)} disabled={readOnly}>
          <Icon name="trash" />
        </Button>
      )}
      </Col>
    </div>
  ));

  return (
    <Fragment>
      {fieldTables}
      {langIdx === 0 ? <SeoMetadataForm
        key={value ? value.length : 0}
        onSubmit={onPushMetadata}
        readOnly={readOnly}
      /> : null}
    </Fragment>
  );
};

SeoInfoMetadata.propTypes = {
  value: PropTypes.arrayOf(PropTypes.shape({})),
  langIdx: PropTypes.number.isRequired,
  readOnly: PropTypes.bool,
  lang: PropTypes.shape({
    code: PropTypes.string.isRequired,
  }).isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
  })).isRequired,
};

SeoInfoMetadata.defaultProps = {
  value: [],
  readOnly: false,
};

export default SeoInfoMetadata;
