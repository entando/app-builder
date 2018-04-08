import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Col, Alert } from 'patternfly-react';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

const PermissionGrid = ({ permissions }) => {
  const renderGrid = () => {
    if (permissions.length > 0) {
      return (
        <Col xs={12}>
          {permissions.map(permission => (
            <Col xs={4} key={permission.code}>
              <label className="control-label col-xs-8">
                {permission.descr}
              </label>
              <Col xs={1}>
                <Field
                  component={SwitchRenderer}
                  name={`permissions.${permission.code}`}
                />
              </Col>
            </Col>
          ))}
        </Col>
      );
    }
    return (
      <Col xs={12}>
        <Alert type="warning">
          <strong><FormattedMessage id="permission.listEmpty" /></strong>
        </Alert>
      </Col>
    );
  };

  return (
    <div className="PermissionGrid">
      {renderGrid()}
    </div>
  );
};

PermissionGrid.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.shape({})),
};

PermissionGrid.defaultProps = {
  permissions: [],
};

export default PermissionGrid;
