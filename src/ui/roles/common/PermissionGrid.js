import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Col, Alert, Spinner } from 'patternfly-react';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';

const PermissionGrid = ({ permissions, loading }) => {
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
  loading: PropTypes.bool,
};

PermissionGrid.defaultProps = {
  permissions: [],
  loading: false,
};

export default PermissionGrid;
