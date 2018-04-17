import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, Paginator, Spinner } from 'patternfly-react';
import { Table, Row, Col, Alert } from 'react-bootstrap';
import { formattedText } from '@entando/utils';

import { LinkMenuItem } from 'frontend-common-components';
import { ROUTE_PAGE, ROUTE_PAGE_CONFIG } from 'app-init/router';

class GroupDetailTabPages extends React.Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  renderRows() {
    const goTo = formattedText('group.action.goto');
    const pageConfiguration = formattedText('group.action.pageConfiguration');
    return this.props.pageReferences.map(item => (
      <tr key={item.code}>
        <td>{item.name}</td>
        <td >
          <DropdownKebab id={`kebab-${item.code}`}>
            <LinkMenuItem
              id={`goto-${item.code}`}
              route={ROUTE_PAGE}
              params={{ page: item.code }}
              label={`${goTo} ${item.name}`}
              className="GroupDetailTabPages__menu-item-edit"
            />
            <LinkMenuItem
              id={`page-configuration-${item.code}`}
              route={ROUTE_PAGE_CONFIG}
              params={{ pageCode: item.code }}
              label={`${pageConfiguration} ${item.name}`}
              className="GroupDetailTabPages__menu-item-edit"
            />
          </DropdownKebab>
        </td>
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
          <Table className="GroupDetailTabPages__table" striped bordered condensed hover >
            <thead>
              <tr>
                <th><FormattedMessage id="app.pages" /></th>
                <th width={30}><FormattedMessage id="app.actions" /></th>
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

export default GroupDetailTabPages;
