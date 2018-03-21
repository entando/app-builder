import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';

import { gotoRoute } from 'frontend-common-components';
import { ROUTE_USER_LIST } from 'app-init/router';

class DetailUserTable extends React.Component {
  componentWillMount() {
    this.props.onWillMount(this.props.username);
  }
  render() {
    const { user } = this.props;
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
            <tr>
              <th>
                <FormattedMessage id="user.table.fullName" />
              </th>
              <td>
                {user.fullName || ''}
              </td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="user.table.email" />
              </th>
              <td>
                {user.email}
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          className="pull-right"
          type="button"
          onClick={() => { gotoRoute(ROUTE_USER_LIST); }}
          bsStyle="primary"
        >
          <FormattedMessage id="app.back" />
        </Button>
      </div>);
  }
}

DetailUserTable.propTypes = {
  onWillMount: PropTypes.func,
  username: PropTypes.string.isRequired,
  user: PropTypes.shape({}).isRequired,
};

DetailUserTable.defaultProps = {
  onWillMount: () => {},
};

export default DetailUserTable;
