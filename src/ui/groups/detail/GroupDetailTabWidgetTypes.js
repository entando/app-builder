
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Paginator, Spinner } from 'patternfly-react';
import { Table, Row, Col, Alert } from 'react-bootstrap';
import paginatorMessages from 'ui/paginatorMessages';

class GroupDetailTabWidgetTypes extends React.Component {
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
    return this.props.widgetReferences.map(item => (
      <tr key={item.code}>
        <td>{item.title}</td>
        <td>{item.code}</td>
      </tr>
    ));
  }

  renderTable() {
    const {
      widgetReferences, page, pageSize, intl,
    } = this.props;

    if (widgetReferences.length > 0) {
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
            messages={messages}
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
        <Spinner loading={this.props.loading} >
          {this.renderTable()}
        </Spinner>
      </div>
    );
  }
}

GroupDetailTabWidgetTypes.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  widgetReferences: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    title: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

GroupDetailTabWidgetTypes.defaultProps = {
  onWillMount: () => {},
  loading: false,
  widgetReferences: [],
};

export default injectIntl(GroupDetailTabWidgetTypes);
