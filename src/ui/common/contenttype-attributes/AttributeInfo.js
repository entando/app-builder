import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { isUndefined } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import { required, maxLength } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import { MODE_EDIT, MODE_ADD } from 'state/content-type/const';

const maxLength10 = maxLength(10);
const maxLength50 = maxLength(50);

const AttributeInfo = ({
  isSearchable, isIndexable, mode, languages,
}) => {
  const renderSearchable = () => {
    const html = (
      <FormGroup>
        <label htmlFor="indexable" className="col-xs-2 control-label">
          <FormLabel labelId="cms.label.indexable" />
        </label>
        <Col xs={4}>
          <Field component={SwitchRenderer} name="indexable" />
        </Col>
      </FormGroup>
    );
    return isSearchable ? html : null;
  };

  const renderIndexable = () => {
    const html = (
      <FormGroup>
        <label htmlFor="listFilter" className="col-xs-2 control-label">
          <FormLabel labelId="cms.contenttype.form.filterList" />
        </label>
        <Col xs={4}>
          <Field component={SwitchRenderer} name="listFilter" />
        </Col>
      </FormGroup>
    );
    return isIndexable ? html : null;
  };

  const normalizedLanguages = languages ? languages.map(lang => lang.code) : [];
  const renderNameFields = !isUndefined(normalizedLanguages) ? normalizedLanguages
    .map(langCode => (
      <Field
        key={langCode}
        component={RenderTextInput}
        name={`names.${langCode}`}
        label={(
          <FormLabel
            langLabelText={langCode}
            labelId="cms.contenttype.form.name"
            helpId="validateForm.name.help"
          />
        )}
        validate={[maxLength50]}
      />
    )) : null;

  return (
    <Row>
      <Col xs={12}>
        <fieldset className="no-padding">
          <legend>
            <FormattedMessage id="cms.label.info" />
            <div className="ContentTypeForm__required-fields text-right">
              * <FormattedMessage id="cms.label.fieldsRequired" />
            </div>
          </legend>
          <Field
            component={RenderTextInput}
            name="type"
            label={<FormLabel labelId="cms.contenttype.form.type" />}
            disabled
          />
          <Field
            component={RenderTextInput}
            name="code"
            label={(
              <FormLabel
                labelId="cms.contenttype.form.code"
                helpId="cms.contenttype.form.codeHelp"
                required
              />
)}
            validate={[required, maxLength10]}
            disabled={mode === MODE_EDIT}
          />
          {renderNameFields}
          <FormGroup>
            <label htmlFor="mandatory" className="col-xs-2 control-label">
              <FormLabel labelId="cms.label.mandatory" />
            </label>
            <Col xs={4}>
              <Field component={SwitchRenderer} name="mandatory" />
            </Col>
          </FormGroup>
          {renderSearchable()}
          {renderIndexable()}
        </fieldset>
      </Col>
    </Row>
  );
};

AttributeInfo.propTypes = {
  isSearchable: PropTypes.bool,
  isIndexable: PropTypes.bool,
  mode: PropTypes.string,
  languages: PropTypes.arrayOf(PropTypes.shape({})),
};

AttributeInfo.defaultProps = {
  isSearchable: false,
  isIndexable: false,
  languages: [],
};

AttributeInfo.defaultProps = {
  mode: MODE_ADD,
};

export default AttributeInfo;
