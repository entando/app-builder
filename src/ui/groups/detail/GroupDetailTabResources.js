import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paginator } from 'patternfly-react';
import { Table, Row, Col, Alert } from 'react-bootstrap';

class GroupDetailTabResources extends React.Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  renderRows() {
    return this.props.pageReferences.map(item => (
      <tr key={item.code}>
        <td>{item.name}</td>
        <td>{item.type}</td>
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
          <Table className="GroupDetailTabResources__table" striped bordered condensed hover >
            <thead>
              <tr>
                <th> <FormattedMessage id="app.name" /></th>
                <th> <FormattedMessage id="app.type" /></th>
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
            <strong><FormattedMessage id="group.resource.references.empty" /></strong>
          </Alert>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div className="GroupDetailTabResources">
        {this.renderTable()}
      </div>
    );
  }
}

GroupDetailTabResources.propTypes = {
  onWillMount: PropTypes.func,
  pageReferences: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

GroupDetailTabResources.defaultProps = {
  onWillMount: () => {},
  pageReferences: [],
};

export default GroupDetailTabResources;
