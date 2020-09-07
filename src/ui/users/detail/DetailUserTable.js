import React from 'react';
import PropTypes from 'prop-types';
import { isUndefined } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';

import { history, ROUTE_USER_LIST } from 'app-init/router';

class DetailUserTable extends React.Component {
  componentWillMount() {
    this.props.onWillMount();
  }
  render() {
    const { user } = this.props;
    if (isUndefined(user.profileAttributes)) {
      user.profileAttributes = {
        fullname: '',
        email: '',
      };
    }
    const { profileAttributes } = user;
    const profileType = user.profileType || {};
    const renderProfileTypeAttributes = Object.keys(profileAttributes || {}).map(attr => (
      <tr key={attr}>
        <th>
          <FormattedMessage id={`user.table.${attr}`} defaultMessage={attr} />
        </th>
        <td>
          {`${profileAttributes[attr]}`}
        </td>
      </tr>
    ));
    return (
      <div className="DetailUserTable">
        <table className="table table-striped table-bordered" >
          <tbody>
            <tr>
              <th width="10%">
                <FormattedMessage id="user.table.username" />
              </th>
              <td>
                {user.username}
              </td>
            </tr>
            {renderProfileTypeAttributes}
            <tr>
              <th>
                <FormattedMessage id="user.table.profileType" />
              </th>
              <td>
                {profileType.typeDescription}{' '}<code>{profileType.typeCode}</code>
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          className="pull-right"
          type="button"
          onClick={() => { history.push(ROUTE_USER_LIST); }}
          bsStyle="primary"
        >
          <FormattedMessage id="app.back" />
        </Button>
      </div>);
  }
}

const profileAttributesType = {
  fullname: PropTypes.string,
  email: PropTypes.string,
};

DetailUserTable.propTypes = {
  onWillMount: PropTypes.func,
  user: PropTypes.shape({
    username: PropTypes.string,
    profileAttributes: PropTypes.shape(profileAttributesType),
    profileType: PropTypes.shape({
      typeCode: PropTypes.string.isRequired,
      typeDescription: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};


DetailUserTable.defaultProps = {
  onWillMount: () => {},
};

export default DetailUserTable;
