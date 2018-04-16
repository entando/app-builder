import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import UserRefsTableContainer from 'ui/roles/detail/UserRefsTableContainer';
import { Spinner } from 'patternfly-react';

class DetailRoleTable extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const { role } = this.props;

    const permissionList = (permissions) => {
      if (permissions.length > 0) {
        return (
          <ul className="DetailRole__permission-list">
            {permissions.map(permission => (
              <li key={permission}>{permission}</li>
              ))}
          </ul>
        );
      }
      return <FormattedMessage id="role.detail.noPermissions" />;
    };

    return (
      <div className="DetailRole">
        <dl className="DetailRole__detail-list">
          <dt className="col-xs-2 text-right"><FormattedMessage id="app.code" /></dt>
          <dd className="col-xs-10 DetailRole__detail-item">{role.code}</dd>
          <dt className="col-xs-2 text-right"><FormattedMessage id="app.name" /></dt>
          <dd className="col-xs-10 DetailRole__detail-item">{role.name}</dd>
          <dt className="col-xs-2 text-right"><FormattedMessage id="app.permissions" /></dt>
          <dd className="col-xs-10 DetailRole__detail-item">
            <Spinner loading={this.props.loading} >
              {permissionList(role.permissions)}
            </Spinner>
          </dd>
          <dt className="col-xs-2 text-right">
            <FormattedMessage id="role.detail.referencedUsers" />
          </dt>
          <dd className="col-xs-10 DetailRole__detail-item">
            <UserRefsTableContainer />
          </dd>
        </dl>
      </div>
    );
  }
}

DetailRoleTable.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  role: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
    permissions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  loading: PropTypes.bool,
};

DetailRoleTable.defaultProps = {
  loading: false,
};

export default DetailRoleTable;
