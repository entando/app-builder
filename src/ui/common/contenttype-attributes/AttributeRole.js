import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import { FieldArray } from 'redux-form';
import RoleSelectRenderer from 'ui/common/form/RoleSelectRenderer';

class AttributeRole extends Component {
  componentDidMount() {
    const { onDidMount, ...allprops } = this.props;
    onDidMount(allprops);
  }

  render() {
    const { joinAllowedOptions, allowedRoles, allRoles } = this.props;

    const selectAllowedOptions = allowedRoles.map(item => ({
      value: item.code,
      text: item.descr,
    }));

    const allOptions = allRoles.map(item => (
      {
        value: item.code,
        text: item.descr,
      }
    ));

    const roleWrapper = () => {
      if (isEmpty(allowedRoles) && isEmpty(joinAllowedOptions)) {
        return (
          <FormGroup>
            <Col xs={10}>
              <FormattedMessage id="cms.contenttype.labelrole.noroles" />
            </Col>
          </FormGroup>
        );
      }

      const getAttributeRoleLabel = item => `${item.value} - ${item.text}`;

      return (
        <FormGroup>
          <label htmlFor="attrRole" className="col-xs-2 control-label">
            <FormattedMessage id="cms.contenttype.form.role" />
          </label>
          <Col xs={10}>
            <FieldArray
              component={RoleSelectRenderer}
              name="joinRoles"
              options={selectAllowedOptions}
              allRoles={allOptions}
              selectedValues={joinAllowedOptions}
              labelKey="text"
              labelFn={getAttributeRoleLabel}
              valueKey="value"
              emptyOptionTextId="cms.contenttype.labelrole.choose"
            />
          </Col>
        </FormGroup>
      );
    };

    return (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <FormattedMessage id="cms.contenttype.form.roles" />
            </legend>
            {roleWrapper()}
          </fieldset>
        </Col>
      </Row>
    );
  }
}

AttributeRole.propTypes = {
  onDidMount: PropTypes.func,
  allowedRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
  allRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    descr: PropTypes.string,
  })),
  joinAllowedOptions: PropTypes.arrayOf(PropTypes.string),
};

AttributeRole.defaultProps = {
  onDidMount: () => {},
  allowedRoles: [],
  allRoles: [],
  joinAllowedOptions: [],
};

export default AttributeRole;
