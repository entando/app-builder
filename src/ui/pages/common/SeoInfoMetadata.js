import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Icon, ControlLabel } from 'patternfly-react';
import { Field, fieldArrayFieldsPropTypes } from 'redux-form';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import FormLabel from 'ui/common/form/FormLabel';
import SeoMetadataForm from 'ui/pages/common/SeoMetadataForm';

const SeoInfoMetadata = ({ fields, langIdx }) => {
  const metaTypeOptions = [
    {
      value: 'name',
      text: 'name',
    },
    {
      value: 'http-equiv',
      text: 'http-equiv',
    },
    {
      value: 'property',
      text: 'property',
    },
  ];

  const onPushMetadata = ({ metakey, metavalue }) => fields.push({
    key: metakey,
    type: 'name',
    value: metavalue,
    useDefaultLang: false,
  });

  const fieldTables = fields.map((name, idx) => {
    const metas = fields.get(idx);
    return (
      <div key={name} className="form-group SeoInfo__metadata--itemgroup">
        <Col sm={2}>
          <div className="text-right SeoInfo__metadata--itemgroup">
            <ControlLabel htmlFor={`${name}.type`}>
              <span>{metas.key}</span>
            </ControlLabel>
          </div>
        </Col>
        <Col sm={langIdx ? 3 : 4}>
          <Field
            component={RenderSelectInput}
            options={metaTypeOptions}
            name={`${name}.type`}
            labelSize={0}
            inputSize={12}
          />
        </Col>
        <Col sm={langIdx ? 3 : 4}>
          <Field
            component={RenderTextInput}
            name={`${name}.value`}
            labelSize={0}
            inputSize={12}
          />
        </Col>
        <Col sm={langIdx ? 3 : 1} className="text-right">
          {langIdx > 0 ? (
            <Field
              component={SwitchRenderer}
              name={`${name}.useDefaultLang`}
              label={<FormLabel labelId="app.seo.inheritLangLabel" />}
              labelSize={7}
            />
          ) : (
            <Button bsStyle="danger" onClick={() => fields.remove(idx)}>
              <Icon name="trash" />
            </Button>
          )}
        </Col>
      </div>
    );
  });

  return (
    <Fragment>
      {fieldTables}
      {langIdx === 0 && <SeoMetadataForm onSubmit={onPushMetadata} />}
    </Fragment>
  );
};

SeoInfoMetadata.propTypes = {
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
  langIdx: PropTypes.number.isRequired,
};

export default SeoInfoMetadata;
