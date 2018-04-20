import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, FormGroup } from 'patternfly-react';
import { FieldArray } from 'redux-form';
import RoleSelectRenderer from 'ui/common/form/RoleSelectRenderer';

class AttributeRole extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }
  render() {
    const { JoinAllowedOptions, allowedRoles } = this.props;

    const selectAllowedOptions = allowedRoles.map(item => (
      {
        value: item.code,
        text: item.descr,
      }
    ));

    const roleWrapper = (allowedRoles.lenght > 0 ?
      (
        <FormGroup>
          <label htmlFor="attrRole" className="col-xs-2 control-label">
            <FormattedMessage id="app.role" />
          </label>
          <Col xs={10}>
            <FieldArray
              component={RoleSelectRenderer}
              name="joinRoles"
              options={selectAllowedOptions}
              selectedValues={JoinAllowedOptions}
              labelKey="text"
              valueKey="value"
              emptyOptionTextId="app.chooseARole"
            />
          </Col>
        </FormGroup>
      )
      : <div><FormattedMessage id="app.no.roles" /><br /><br /></div>
    );

    return (
      <Row>
        <Col xs={12}>
          <fieldset className="no-padding">
            <legend>
              <FormattedMessage id="app.roles" />
            </legend>
            {roleWrapper}
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
  })),
  JoinAllowedOptions: PropTypes.arrayOf(PropTypes.string),
};

AttributeRole.defaultProps = {
  onWillMount: () => {},
  allowedRoles: [],
  JoinAllowedOptions: [],
};


export default AttributeRole;
