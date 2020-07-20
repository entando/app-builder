import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Paginator, Spinner } from 'patternfly-react';
import { Table, Row, Col, Alert } from 'react-bootstrap';
import paginatorMessages from 'ui/paginatorMessages';

class GroupDetailTabResources extends React.Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount(this.props.page);
  }

  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.onWillMount({ page: 1, pageSize });
  }

  renderRows() {
    return this.props.resourceReferences.map(item => (
      <tr key={item.id}>
        <td>{item.description}</td>
        <td>{item.typeCode}</td>
      </tr>
    ));
  }

  renderTable() {
    const {
      resourceReferences, page, pageSize, intl,
    } = this.props;

    if (resourceReferences.length > 0) {
      const pagination = {
        page,
        perPage: pageSize,
        perPageOptions: [5, 10, 15, 25, 50],
      };

      const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
        { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
      ), {});

      return (
        <div>
          <Table className="GroupDetailTabResources__table" striped bordered condensed hover >
            <thead>
              <tr>
                <th><FormattedMessage id="app.name" /></th>
                <th><FormattedMessage id="app.type" /></th>
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
            messages={messages}
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
        <Spinner loading={this.props.loading} >
          {this.renderTable()}
        </Spinner>
      </div>
    );
  }
}

GroupDetailTabResources.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  resourceReferences: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

GroupDetailTabResources.defaultProps = {
  onWillMount: () => {},
  loading: false,
  resourceReferences: [],
};

export default injectIntl(GroupDetailTabResources);
