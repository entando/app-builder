import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

class DatabaseListTable extends Component {
  constructor(props) {
    super(props);
    this.databases = null;
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  renderTableRows() {
    return this.props.databases.map((database, i) => (
      <tr key={database.number}>
        <td className="DatabaseListRow__td">{database.number}</td>
        <td className="DatabaseListRow__td"><code>{database.date}</code></td>
        <td className="DatabaseListRow__td">{database.timeRequired}</td>
        <td className="DatabaseListRow__td text-center">
          <Button
            bsStyle="link"
            className="UserAuthorityTable__delete-tag-btn"
            onClick={() => database.remove(i)}
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
        <Col md={12}>
          <p className="alert alert-info DatabaseListPage__alert">
            <FormattedMessage id="database.noDatabaseYet" />
          </p>
          <hr />
        </Col>
      );
    }
    return (
      <Col xs={12}>
        <table className="databasesListTable__table table table-striped table-bordered">
          <thead>
            <tr>
              <th className="databasesListTable__th-lg"><FormattedMessage id="app.number" /></th>
              <th className="databasesListTable__th-lg"><FormattedMessage id="app.date" /></th>
              <th className="databasesListTable__th-lg"><FormattedMessage id="app.timeRequired" /></th>
              <th className="databasesListTable__th-xs text-center">
                <FormattedMessage id="app.actions" />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      </Col>
    );
  }

  render() {
    return (
      <div className="databasesListTable">
        {this.renderTable()}
      </div>
    );
  }
}

DatabaseListTable.propTypes = {
  onWillMount: PropTypes.func,
  databases: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    timeRequired: PropTypes.string.isRequired,
  })),
};

DatabaseListTable.defaultProps = {
  onWillMount: () => {},
  databases: [],
};

export default DatabaseListTable;
