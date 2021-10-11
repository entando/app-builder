import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import RatioInput from 'ui/content-settings/ContentSettingsCropRatioInput';

const propTypes = {
  cropRatios: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

const ContentSettingsCropRatios = ({
  cropRatios, onAdd, onDelete, onUpdate, onError,
}) => (
  <div className="ContentSettingsCropRatios">
    <h3
      data-test-id="content-settings-crop-ratios-heading"
      className="ContentSettingsCropRatios__heading"
    >
      <FormattedMessage
        id="cms.contentsettings.cropratios.heading"
        defaultMessage="Settings Image Crop Dimensions"
      />
    </h3>
    <hr />
    <Row>
      <Col>
        <h5
          data-test-id="content-settings-crop-ratios-form-title"
          className="ContentSettingsCropRatios__form-title"
        >
          <FormattedMessage
            id="cms.contentsettings.cropratios.form.title"
            defaultMessage="Add Crop Dimension"
          />
        </h5>
      </Col>
    </Row>
    {cropRatios.map(cropRatio => (
      <Row key={cropRatio} className="ContentSettingsCropRatios__row">
        <Col xs={12} sm={5} smOffset={2}>
          <RatioInput
            data-test-id="content-settings-crop-ratios-form-input"
            value={cropRatio}
            onDelete={() => onDelete(cropRatio)}
            onSave={newValue => onUpdate(cropRatio, newValue)}
            onError={onError}
          />
        </Col>
      </Row>
    ))}
    <Row>
      <Col xs={12} sm={5} smOffset={2}>
        <RatioInput
          data-test-id="content-settings-crop-ratios-form-input"
          isNew
          onAdd={onAdd}
          onError={onError}
        />
      </Col>
    </Row>
  </div>
);

ContentSettingsCropRatios.propTypes = propTypes;

export default ContentSettingsCropRatios;
