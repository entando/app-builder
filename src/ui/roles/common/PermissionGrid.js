import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Col, Alert, Spinner } from 'patternfly-react';
import SwitchInput from 'ui/common/formik-field/SwitchInput';

const PermissionGrid = ({
  permissions,
  loading,
  onToggleSuperuser,
  superuserToggled,
}) => {
  const renderGrid = () => {
    if (permissions.length > 0) {
      return (
        <Col xs={12}>
          {permissions.map((permission) => {
            const isSuperuser = permission.code === 'superuser';
            const extraProps = isSuperuser ? { onToggleValue: onToggleSuperuser } : {};
            return (
              <Col xs={4} key={permission.code}>
                <label className="control-label col-xs-8">
                  {permission.descr}
                </label>
                <Col xs={1}>
                  <Field
                    component={SwitchInput}
                    name={`permissions.${permission.code}`}
                    disabled={superuserToggled && !isSuperuser}
                    {...extraProps}
                  />
                </Col>
              </Col>
            );
          })}
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
      <Spinner loading={loading}>
        {renderGrid()}
      </Spinner>
    </div>
  );
};

PermissionGrid.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    descr: PropTypes.string.isRequired,
  })),
  onToggleSuperuser: PropTypes.func.isRequired,
  superuserToggled: PropTypes.bool,
  loading: PropTypes.bool,
};

PermissionGrid.defaultProps = {
  permissions: [],
  loading: false,
  superuserToggled: false,
};

export default PermissionGrid;
