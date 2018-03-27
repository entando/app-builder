import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paginator } from 'patternfly-react';
import { Table, Row, Col, Alert } from 'react-bootstrap';

class GroupDetailTabContents extends React.Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  renderRows() {
    return this.props.pageReferences.map(item => (
      <tr key={item.code}>
        <td>{item.name}</td>
        <td>{item.code}</td>
        <td>{item.type}</td>
        <td>{item.lastEdit}</td>
      </tr>
    ));
  }

  renderTable() {
    if (this.props.pageReferences.length > 0) {
      const pagination = {
        page: this.props.page,
        perPage: this.props.pageSize,
        perPageOptions: [5, 10, 15, 25, 50],
      };
      return (
        <div>
          <Table className="GroupDetailTabContents__table" striped bordered condensed hover >
            <thead>
              <tr>
                <th><FormattedMessage id="app.title" /></th>
                <th><FormattedMessage id="app.code" /></th>
                <th><FormattedMessage id="app.type" /></th>
                <th><FormattedMessage id="group.content.lastEdit" /></th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </Table>
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={this.props.totalItems}
            onPageSet={this.changePage}
          />
        </div>
      );
    }
    return (
      <Row>
        <Col xs={12}>
          <Alert type="warning">
            <strong><FormattedMessage id="group.content.references.empty" /></strong>
          </Alert>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div className="GroupDetailTabContents">
        {this.renderTable()}
      </div>
    );
  }
}

GroupDetailTabContents.propTypes = {
  onWillMount: PropTypes.func,
  pageReferences: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
    type: PropTypes.string,
    lastEdit: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

GroupDetailTabContents.defaultProps = {
  onWillMount: () => {},
  pageReferences: [],
};

export default GroupDetailTabContents;
