import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { DropdownKebab, Paginator, Spinner } from 'patternfly-react';
import { Table, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paginatorMessages from 'ui/paginatorMessages';

import { ROUTE_PAGE_CONFIG } from 'app-init/router';

const msgs = defineMessages({
  pageConfig: {
    id: 'group.action.pageConfiguration',
    defaultMessage: 'Page Configuration',
  },
});

class GroupDetailTabPages extends React.Component {
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
    const { pageReferences, intl } = this.props;

    const pageConfiguration = intl.formatMessage(msgs.pageConfig);
    return pageReferences.map(item => (
      <tr key={item.code}>
        <td>{item.name}</td>
        <td className="text-center">
          <DropdownKebab id={`kebab-${item.code}`} pullRight>
            <Link
              id={`page-configuration-${item.code}`}
              to={ROUTE_PAGE_CONFIG}
              params={{ pageCode: item.code }}
              className="GroupDetailTabPages__menu-item-edit"
            >
              {`${pageConfiguration} ${item.name}`}
            </Link>
          </DropdownKebab>
        </td>
      </tr>
    ));
  }

  renderTable() {
    const {
      pageReferences, page, pageSize, intl,
    } = this.props;

    if (pageReferences.length > 0) {
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
          <Table className="GroupDetailTabPages__table" striped bordered condensed hover >
            <thead>
              <tr>
                <th><FormattedMessage id="app.pages" /></th>
                <th className="text-center" width={30}><FormattedMessage id="app.actions" /></th>
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
            <strong><FormattedMessage id="group.page.references.empty" /></strong>
          </Alert>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div className="GroupDetailTabPages">
        <Spinner loading={this.props.loading} >
          {this.renderTable()}
        </Spinner>
      </div>
    );
  }
}

GroupDetailTabPages.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  pageReferences: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

GroupDetailTabPages.defaultProps = {
  onWillMount: () => {},
  loading: false,
  pageReferences: [],
};

export default injectIntl(GroupDetailTabPages);
