import React from 'react';
import PropTypes from 'prop-types';
// import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
// import FormLabel from 'ui/common/form/FormLabel';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';

const AttributeRole = {
  render() {
    const selectAllowedOptions = this.props.attributes.map(item => ({
      value: item.code,
      text: item.descr,
    }));
    return (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <FormattedMessage id="app.role" />
            </legend>
            <RenderSelectInput
              options={selectAllowedOptions}
              labelId="DataType.type"
              fieldName="attributeRoleName"
              mandatory
            />
          </fieldset>
        </Col>
      </Row>
    );
  },
};

AttributeRole.propTypes = {
  onWillMount: PropTypes.func,
  attributes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })).isRequired,
};

AttributeRole.defaultProps = {
  onWillMount: () => {},
};


export default AttributeRole;
