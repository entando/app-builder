import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class DetailRole extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }
  render() {
    const { role } = this.props;

    const permissionList = () => {
      if (role.permissions) {
        return (
          <ul className="DetailRole__permission-list">
            {role.permissions.map(permission => (
              <li key={permission.code}>{permission.descr}</li>
              ))}
          </ul>
        );
      }
      return <FormattedMessage id="roles.noPermissions" />;
    };

    return (
      <div className="DetailRole">
        <dl className="DetailRole__detail-list">
          <dt className="col-xs-2 text-right"><FormattedMessage id="app.code" /></dt>
          <dd className="col-xs-10">{role.code}</dd>
          <dt className="col-xs-2 text-right"><FormattedMessage id="app.name" /></dt>
          <dd className="col-xs-10">{role.name}</dd>
          <dt className="col-xs-2 text-right"><FormattedMessage id="app.permissions" /></dt>
          <dd className="col-xs-10">
            {permissionList}
          </dd>
        </dl>
      </div>);
  }
}

DetailRole.propTypes = {
  onWillMount: PropTypes.func,
  role: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    permissions: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      descr: PropTypes.string,
    })),
  }),
};

DetailRole.defaultProps = {
  onWillMount: null,
  role: {},
};

export default DetailRole;
