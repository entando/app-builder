import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import TextAreaInput from 'ui/common/form/RenderTextAreaInput';
import RenderRichTextEditor from 'ui/common/form/RenderRichTextEditor';
import { getEditorSettings } from 'state/content-settings/selectors';
import CopyTextButton from 'ui/common/button/CopyTextButton';
import DebouncedInput from 'ui/common/form/DebouncedInput';

const HypertextAttributeField = ({
  label,
  input,
  meta,
  isRTE,
  langCode,
  locale,
  ...rest
}) => {
  const { name, value: inputValue, onChange: inputOnChange } = input;

  const attrInput = {
    ...input,
    name,
    value: inputValue.trim() || '',
    onChange: (data) => {
      const value = data.target ? data.target.value : data;
      inputOnChange(value);
    },
  };

  let Component = TextAreaInput;
  const compProps = {
    input: attrInput,
    label,
    meta,
    ...rest,
  };
  const copyOption = <CopyTextButton text={attrInput.value} />;
  const langIsLocale = langCode === locale;

  if (isRTE) {
    Component = RenderRichTextEditor;
    compProps.langCode = langCode;
    if (langIsLocale) {
      compProps.extraOptions = copyOption;
    }
  } else {
    compProps.rows = 3;
    compProps.cols = 50;
    if (langIsLocale) {
      compProps.topBarOptions = copyOption;
    }
  }

  return <DebouncedInput inputComponent={Component} {...compProps} />;
};

HypertextAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  isRTE: PropTypes.bool,
  langCode: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

HypertextAttributeField.defaultProps = {
  isRTE: false,
};

export default connect(state => ({
  isRTE: getEditorSettings(state) && getEditorSettings(state).label !== 'None',
}))(HypertextAttributeField);
