import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  ControlLabel,
  Button,
} from 'patternfly-react';
import AssetAttributeFieldInfoContainer from 'ui/edit-content/content-attributes/assets/AssetAttributeFieldInfoContainer';
import UploadTriggerButton from 'ui/common/button/UploadTriggerButton';
import AssetsUploadContainer from 'ui/assets/AssetsUploadContainer';
import AssetBrowserModal from 'ui/edit-content/content-attributes/assets/AssetBrowserModal';

const AttachAttributeField = ({
  input,
  meta: { touched, error },
  label,
  labelSize,
  inputSize,
  hasLabel,
  alignClass,
  help,
  onClickAdd,
  assetListBegin,
  mainGroup,
  langCode,
  langCodes,
  defaultLang,
  joinGroups,
}) => {
  const handleAssetSelected = (info) => {
    input.onChange({
      ...input.value,
      ...(langCodes.reduce((acc, curr) => ({
        ...acc,
        [curr]: info,
      }), {})),
    });
  };

  const containerClasses = touched && error ? 'form-group has-error' : 'form-group';

  const renderChoose = () => {
    const errorBox = touched && error ? <span className="help-block">{error}</span> : null;
    return (
      <Fragment>
        <Button
          bsStyle="primary"
          style={{ marginRight: 10 }}
          onClick={() => onClickAdd(`${input.name}.${langCode}`)}
        >
          <FormattedMessage id="cms.label.browse" defaultMessage="Browse" />
        </Button>
        {errorBox}
        <AssetsUploadContainer
          customTriggerComponent={UploadTriggerButton}
          customClassName="UploadAsset--button-version"
          customDropzoneProps={{ noClick: true }}
          onAssetSelected={handleAssetSelected}
          name={`${input.name}.${langCode}`}
          ownerGroup={mainGroup}
        />
        <AssetBrowserModal
          assetType="file"
          ownerGroup={mainGroup}
          name={`${input.name}.${langCode}`}
          onModalOpened={assetListBegin}
          onAssetSelected={handleAssetSelected}
          joinGroups={joinGroups}
        />
      </Fragment>
    );
  };

  const renderAssetSelected = () => (
    <AssetAttributeFieldInfoContainer input={input} langCode={langCode} />
  );

  const hasValue = get(input, `value.${langCode}`, false);

  if (!hasValue && defaultLang !== langCode) {
    const hasDefLangValue = get(input, `value.${defaultLang}`, false);
    if (hasDefLangValue) {
      handleAssetSelected({ ...hasDefLangValue });
    }
  }

  return (
    <div className={containerClasses}>
      {hasLabel && (
        <Col xs={labelSize} className={alignClass}>
          <ControlLabel>
            {label} {help}
          </ControlLabel>
        </Col>
      )}
      <Col xs={inputSize || 12 - labelSize}>
        {hasValue ? renderAssetSelected() : renderChoose()}
      </Col>
    </div>
  );
};

AttachAttributeField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.string,
    ]),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }),
  labelSize: PropTypes.number,
  alignClass: PropTypes.string,
  help: PropTypes.node,
  inputSize: PropTypes.number,
  hasLabel: PropTypes.bool,
  label: PropTypes.node.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  onClickAdd: PropTypes.func.isRequired,
  assetListBegin: PropTypes.func.isRequired,
  mainGroup: PropTypes.string.isRequired,
  langCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  langCode: PropTypes.string.isRequired,
  defaultLang: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string),
};

AttachAttributeField.defaultProps = {
  input: {},
  meta: {
    touched: false,
    error: {},
  },
  labelSize: 2,
  hasLabel: true,
  alignClass: 'text-right',
  help: null,
  inputSize: null,
  joinGroups: [],
};

export default AttachAttributeField;
