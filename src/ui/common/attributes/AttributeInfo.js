import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import { required, maxLength } from '@entando/utils';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

const AttributeInfo = ({ isSearchable, isIndexable }) => {
  const renderSearchable = () => {
    if (isSearchable) {
      return (
        <FormGroup>
          <label htmlFor="filterList" className="col-xs-2 control-label">
            <FormLabel labelId="app.indexable" />
          </label>
          <Col xs={4}>
            <Field component={SwitchRenderer} name="listFilter" />
          </Col>
        </FormGroup>
      );
    }
    return '';
  };

  const renderIndexable = () => {
    if (isIndexable) {
      return (
        <FormGroup>
          <label htmlFor="filterList" className="col-xs-2 control-label">
            <FormLabel labelId="app.filterList" />
          </label>
          <Col xs={4}>
            <Field component={SwitchRenderer} name="indexable" />
          </Col>
        </FormGroup>
      );
    }
    return '';
  };

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
            validate={[required, maxLength(10)]}
          />
          <Field
            component={RenderTextInput}
            name="name"
            label={
              <FormLabel labelId="app.name" helpId="app.help.name" />
          }
            validate={[maxLength(50)]}
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
  isSearchable: PropTypes.bool,
  isIndexable: PropTypes.bool,
};

AttributeInfo.defaultProps = {
  isSearchable: false,
  isIndexable: false,
};
