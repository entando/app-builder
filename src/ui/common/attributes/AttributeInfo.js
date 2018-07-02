import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import { required, maxLength } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

const maxLength10 = maxLength(10);
const maxLength50 = maxLength(50);

const AttributeInfo = ({
  selectedAttributeType, listFilter, indexable, mode,
}) => {
  // const { indexableOptionSupported, searchableOptionSupported } = selectedAttributeType;
  const isSearchable =
    (selectedAttributeType && selectedAttributeType.indexableOptionSupported) || listFilter;
  const isIndexable =
    (selectedAttributeType && selectedAttributeType.searchableOptionSupported) || indexable;
  const renderSearchable = () => (
    isSearchable ?
      <FormGroup>
        <label htmlFor="filterList" className="col-xs-2 control-label">
          <FormLabel labelId="app.indexable" />
        </label>
        <Col xs={4}>
          <Field component={SwitchRenderer} name="indexable" />
        </Col>
      </FormGroup>
      : null);

  const renderIndexable = () => (
    isIndexable ?
      <FormGroup>
        <label htmlFor="filterList" className="col-xs-2 control-label">
          <FormLabel labelId="app.filterList" />
        </label>
        <Col xs={4}>
          <Field component={SwitchRenderer} name="filterList" />
        </Col>
      </FormGroup>
      : null);

  return (
    <Row>
      <Col xs={12}>
        <fieldset className="no-padding">
          <legend>
            <FormattedMessage id="app.info" />
            <div className="DataTypeForm__required-fields text-right">
            * <FormattedMessage id="app.fieldsRequired" />
            </div>
          </legend>
          <Field
            component={RenderTextInput}
            name="type"
            label={
              <FormLabel labelId="app.type" />
            }
            disabled
          />
          <Field
            component={RenderTextInput}
            name="code"
            label={
              <FormLabel labelId="app.code" helpId="app.help.code" required />
          }
            validate={[required, maxLength10]}
            disabled={mode === 'edit'}
          />
          <Field
            component={RenderTextInput}
            name="name"
            label={
              <FormLabel labelId="app.name" helpId="app.help.name" />
          }
            validate={[maxLength50]}
          />
          <FormGroup>
            <label htmlFor="mandatory" className="col-xs-2 control-label">
              <FormLabel labelId="app.mandatory" />
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

export default AttributeInfo;

AttributeInfo.propTypes = {
  selectedAttributeType: PropTypes.shape({
    indexableOptionSupported: PropTypes.bool,
    searchableOptionSupported: PropTypes.bool,
  }),
  indexable: PropTypes.bool,
  listFilter: PropTypes.bool,
  mode: PropTypes.string,
};

AttributeInfo.defaultProps = {
  selectedAttributeType: {},
  indexable: false,
  listFilter: false,

};

AttributeInfo.defaultProps = {
  mode: 'add',
};
