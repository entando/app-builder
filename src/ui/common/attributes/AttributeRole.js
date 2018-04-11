import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'patternfly-react';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
// import { FieldArray } from 'redux-form';
// import MultiSelectRenderer from 'ui/pages/common/MultiSelectRenderer';

class AttributeRole extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }
  render() {
    const selectAllowedOptions = this.props.allowedRoles.map(item => (
      {
        value: item.code,
        text: item.descr,
      }
    ));
    return (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <FormattedMessage id="app.role" />
            </legend>
            <RenderSelectInput
              options={selectAllowedOptions}
              name="allowedRoles"
              labelId="DataType.attributeRoleName"
              fieldName="attributeRoleName"
            />
            {/* <FieldArray
              component={MultiSelectRenderer}
              name="allowedRoles"
              options={selectAllowedOptions}
              selectedValues={selectedJoinAllowedOtions}
              labelKey="name"
              valueKey="code"
              emptyOptionTextId="app.chooseAnOption"
            /> */}
          </fieldset>
        </Col>
      </Row>
    );
  }
}

AttributeRole.propTypes = {
  onWillMount: PropTypes.func,
  allowedRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })).isRequired,
};

AttributeRole.defaultProps = {
  onWillMount: () => {},
};


export default AttributeRole;
