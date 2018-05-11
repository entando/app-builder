import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Alert, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from '@entando/router';
import { ROUTE_DATABASE_REPORT } from 'app-init/router';
import DeleteDatabaseModalContainer from 'ui/database/common/DeleteDatabaseModalContainer';

class DatabaseListTable extends Component {
  constructor(props) {
    super(props);
    this.databases = null;
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  onClickDelete(database) {
    this.props.onClickDelete(database);
  }

  renderTableRows() {
    return this.props.databases.map((database, i) => (
      <tr key={`${database.code}-${database.date}`}>
        <td className="DatabaseListRow__td">{database.code}</td>
        <td className="DatabaseListRow__td">
          <Link route={ROUTE_DATABASE_REPORT} params={{ dumpCode: database.code }}>
            <code>{database.date}</code>
          </Link>
        </td>
        <td className="DatabaseListRow__td">
          {database.requiredTime}&nbsp;<FormattedMessage id="app.milliseconds" />
        </td>
        <td className="DatabaseListRow__td text-center">
          <Button
            bsStyle="link"
            className="UserAuthorityTable__delete-tag-btn"
            onClick={() => this.onClickDelete(database)}
          >
            <i className="fa fa-trash-o" />
          </Button>
        </td>
      </tr>
    ));
  }

  renderTable() {
    if (this.props.databases.length === 0) {
      return (
        <Col xs={12}>
          <Alert type="info" className="DatabaseListPage__alert">
            <strong><FormattedMessage id="database.noDatabaseYet" /></strong>
          </Alert>
          <hr />
        </Col>
      );
    }
    return (

      <table className="DatabaseListTable__table table table-striped table-bordered">
        <thead>
          <tr>
            <th className="databasesListTable__th-lg"><FormattedMessage id="app.code" /></th>
            <th className="databasesListTable__th-lg"><FormattedMessage id="app.date" /></th>
            <th className="databasesListTable__th-lg"><FormattedMessage id="app.requiredTime" /></th>
            <th className="databasesListTable__th-xs text-center">
              <FormattedMessage id="app.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </table>

    );
  }

  render() {
    return (
      <div className="DatabaseListTable">
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}
          <DeleteDatabaseModalContainer />
        </Spinner>
      </div>
    );
  }
}

DatabaseListTable.propTypes = {
  onWillMount: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  databases: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    requiredTime: PropTypes.number.isRequired,
  })),
  loading: PropTypes.bool,
};

DatabaseListTable.defaultProps = {
  databases: [],
  loading: false,
};

export default DatabaseListTable;
