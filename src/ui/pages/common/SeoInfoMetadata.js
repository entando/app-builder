import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Icon, ControlLabel } from 'patternfly-react';
import { Field, fieldArrayFieldsPropTypes } from 'redux-form';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import FormLabel from 'ui/common/form/FormLabel';
import SeoMetadataForm from 'ui/pages/common/SeoMetadataForm';
import { METATAG_TYPE_OPTIONS } from 'ui/pages/common/const';

const SeoInfoMetadata = ({
  fields,
  langIdx,
  onPushMetadata,
  onRemoveMetadata,
  readOnly,
}) => {
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
            options={METATAG_TYPE_OPTIONS}
            name={`${name}.type`}
            labelSize={0}
            inputSize={12}
            disabled={metas.useDefaultLang || readOnly}
          />
        </Col>
        <Col sm={langIdx ? 3 : 4}>
          <Field
            component={RenderTextInput}
            name={`${name}.value`}
            labelSize={0}
            inputSize={12}
            disabled={metas.useDefaultLang || readOnly}
          />
        </Col>
        <Col sm={langIdx ? 3 : 1} className="text-right">
          {langIdx > 0 ? (
            <Field
              component={SwitchRenderer}
              name={`${name}.useDefaultLang`}
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
    );
  });

  return (
    <Fragment>
      {fieldTables}
      {langIdx === 0 && <SeoMetadataForm onSubmit={onPushMetadata} readOnly={readOnly} />}
    </Fragment>
  );
};

SeoInfoMetadata.propTypes = {
  fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired,
  langIdx: PropTypes.number.isRequired,
  onPushMetadata: PropTypes.func.isRequired,
  onRemoveMetadata: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

SeoInfoMetadata.defaultProps = {
  readOnly: false,
};

export default SeoInfoMetadata;
