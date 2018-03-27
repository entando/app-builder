
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Paginator } from 'patternfly-react';
import { Table, Row, Col, Alert } from 'react-bootstrap';

class GroupDetailTabWidgetTypes extends React.Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  renderRows() {
    return this.props.pageReferences.map(item => (
      <tr key={item.code}>
        <td>{item.title}</td>
        <td>{item.code}</td>
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
          <Table className="GroupDetailTabWidgetTypes__table" striped bordered condensed hover >
            <thead>
              <tr>
                <th><FormattedMessage id="app.title" /></th>
                <th><FormattedMessage id="app.code" /></th>
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
            <strong><FormattedMessage id="group.widget.references.empty" /></strong>
          </Alert>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div className="GroupDetailTabWidgetTypes">
        {this.renderTable()}
      </div>
    );
  }
}

GroupDetailTabWidgetTypes.propTypes = {
  onWillMount: PropTypes.func,
  pageReferences: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    title: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

GroupDetailTabWidgetTypes.defaultProps = {
  onWillMount: () => {},
  pageReferences: [],
};

export default GroupDetailTabWidgetTypes;
