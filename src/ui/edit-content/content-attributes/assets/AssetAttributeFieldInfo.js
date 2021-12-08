import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  InputGroup,
  FormControl,
  Button,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const AssetAttributeFieldInfo = ({
  fields,
  assetInfo,
  onUpdateValue,
  onRemoveValue,
}) => {
  const { metadata } = assetInfo;

  const onFieldChangeEvent = (e) => {
    const { name, value } = e.target;
    onUpdateValue(name, value);
  };

  const previewRender = assetInfo.type === 'image' ? (
    <img src={assetInfo.previewUrl} alt="Preview" className="img-thumbnail AssetAttributeField__img-preview" />
  ) : (
    <div className="fa fa-file-text img-thumbnail AssetAttributeField__attach-preview" />
  );

  const {
    name: nameField,
    metadata: metaFields,
  } = fields;

  return (
    <Grid fluid className="AssetAttributeField__selected-info">
      <Row>
        <Col xs={12} sm={5} md={4} className="text-center">
          {previewRender}
        </Col>
        <Col xs={12} sm={7} md={8}>
          <Grid fluid>
            <Row>
              <Col xs={2} className="AssetAttributeField__lbl"><FormattedMessage id="cms.assets.form.name" /></Col>
              <Col xs={10} className="AssetAttributeField__inf">{assetInfo.description}</Col>
            </Row>
            <Row className="form-group">
              <Col xs={2} className="AssetAttributeField__lbl"><FormattedMessage id="cms.assets.form.filename" /></Col>
              <Col xs={10} className="AssetAttributeField__inf">{get(metadata, 'filename', '')}</Col>
            </Row>
            {nameField && (
              <Row>
                <Col xs={4} className="AssetAttributeField__lbl text-right">{nameField.label}</Col>
                <Col xs={8}>
                  <FormGroup className="AssetAttributeField__input">
                    <InputGroup className="AssetAttributeField__input">
                      <FormControl
                        type="text"
                        name={nameField.name}
                        onChange={onFieldChangeEvent}
                        defaultValue={nameField.value || ''}
                        value={nameField.value}
                        className="AssetAttributeField__input--inner"
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            )}
            {metaFields && metaFields.map(tf => (
              <Row key={tf.name}>
                <Col xs={4} className="AssetAttributeField__lbl text-right">{tf.label}</Col>
                <Col xs={8}>
                  <FormGroup className="AssetAttributeField__input">
                    <InputGroup className="AssetAttributeField__input">
                      <FormControl
                        type="text"
                        name={tf.name}
                        onChange={onFieldChangeEvent}
                        defaultValue={tf.value || ''}
                        value={tf.value}
                        className="AssetAttributeField__input--inner"
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            ))}
            <Row>
              <Col xs={12} className="AssetAttributeField__input text-right">
                <Button bsStyle="danger" onClick={onRemoveValue}>
                  <FormattedMessage id="cms.label.delete" defaultValue="Remove" />
                </Button>
              </Col>
            </Row>
          </Grid>
        </Col>
      </Row>
    </Grid>
  );
};

AssetAttributeFieldInfo.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
    metadata: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  assetInfo: PropTypes.shape({
    type: PropTypes.string,
    previewUrl: PropTypes.string,
    description: PropTypes.string,
    metadata: PropTypes.shape({
      filename: PropTypes.string,
    }),
  }),
  onUpdateValue: PropTypes.func.isRequired,
  onRemoveValue: PropTypes.func.isRequired,
};

AssetAttributeFieldInfo.defaultProps = {
  fields: {},
  assetInfo: {},
};

export default AssetAttributeFieldInfo;
