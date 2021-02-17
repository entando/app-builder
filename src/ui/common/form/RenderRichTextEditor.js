import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';

import RichTextEditor from 'ui/common/rich-text-editor/RichTextEditor';

const RenderRichTextEditor = ({
  meta: { touched, error }, hasLabel, labelSize, alignClass,
  input, label, help, append, langCode, placeholder, disabled,
  attribute, mainGroup, joinGroups, extraOptions,
}) => (
  <div className={`RenderRichTextEditor ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
    {hasLabel && (
      <Col xs={labelSize} className={`RenderRichTextEditor__label ${alignClass}`}>
        <ControlLabel htmlFor={input.name}>
          {label} {help}
        </ControlLabel>
      </Col>
    )}
    <Col xs={12 - labelSize} className="RenderRichTextEditor__content">
      <RichTextEditor
        input={input}
        attrCode={attribute.code}
        langCode={langCode}
        placeholder={placeholder}
        mainGroup={mainGroup}
        disabled={disabled}
        joinGroups={joinGroups}
        extraOptions={extraOptions}
      />
      {append && <span className="AppendedLabel">{append}</span>}
      {touched && ((error && <span className="help-block">{error}</span>))}
    </Col>
  </div>
);

RenderRichTextEditor.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  attribute: PropTypes.shape({
    code: PropTypes.string,
  }),
  langCode: PropTypes.string,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  labelSize: PropTypes.number,
  append: PropTypes.string,
  alignClass: PropTypes.string,
  hasLabel: PropTypes.bool,
  mainGroup: PropTypes.string,
  joinGroups: PropTypes.arrayOf(PropTypes.string),
  extraOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RenderRichTextEditor.defaultProps = {
  label: '',
  placeholder: '',
  meta: {},
  help: null,
  disabled: false,
  labelSize: 2,
  append: '',
  alignClass: 'text-right',
  hasLabel: true,
  attribute: {},
  langCode: 'en',
  mainGroup: '',
  joinGroups: [],
  extraOptions: null,
};

export default RenderRichTextEditor;
