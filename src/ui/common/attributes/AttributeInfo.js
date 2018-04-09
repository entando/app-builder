import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import { required, maxLength } from 'util/validateForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormLabel from 'ui/common/form/FormLabel';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

const AttributeInfo = {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <FormattedMessage id="app.info" />
            </legend>
            <Field
              component={RenderTextInput}
              name="type"
              label={
                <FormLabel labelId="app.type" />
                }
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
                <FormLabel labelId="app.name" helpId="app.help.name" required />
                }
              validate={[required, maxLength(50)]}
            />
            <FormGroup>
              <label htmlFor="mandatory" className="col-xs-2 control-label">
                <FormLabel labelId="app.mandatory" />
              </label>
              <Col xs={4}>
                <Field component={SwitchRenderer} name="mandatory" />
              </Col>
            </FormGroup>
            <FormGroup>
              <label htmlFor="filterList" className="col-xs-2 control-label">
                <FormLabel labelId="app.indexable" />
              </label>
              <Col xs={4}>
                <Field component={SwitchRenderer} name="indexable" />
              </Col>
            </FormGroup>
            <FormGroup>
              <label htmlFor="filterList" className="col-xs-2 control-label">
                <FormLabel labelId="app.filterList" />
              </label>
              <Col xs={4}>
                <Field component={SwitchRenderer} name="filterList" />
              </Col>
            </FormGroup>
          </fieldset>
        </Col>
      </Row>
    );
  },
};

AttributeInfo.propTypes = {
  onWillMount: PropTypes.func,
  // dataTypes: PropTypes.arrayOf(PropTypes.shape({
  //   code: PropTypes.string,
  //   name: PropTypes.string,
  // })),
};

AttributeInfo.defaultProps = {
  onWillMount: () => {},
  // dataTypes: [],
};


export default AttributeInfo;
