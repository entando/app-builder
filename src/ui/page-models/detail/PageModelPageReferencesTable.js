import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, Paginator, Spinner } from 'patternfly-react';
import { Table, Alert } from 'react-bootstrap';
import { formattedText } from '@entando/utils';

import { LinkMenuItem } from 'frontend-common-components';
import { ROUTE_PAGE_EDIT, ROUTE_PAGE_CONFIG } from 'app-init/router';

class PageModelPageReferencesTable extends Component {
  componentWillMount() {
    if (this.props.onWillMount) {
      this.props.onWillMount(this.props);
    }
  }

  renderRows() {
    const goTo = formattedText('group.action.goto');
    const pageConfiguration = formattedText('group.action.pageConfiguration');
    return this.props.pageReferences.map(item => (
      <tr key={`ref-${item.code}-${item.lastModified}`}>
        <td>{item.status}</td>
        <td>{item.fullTitle}</td>
        <td className="text-center">
          <DropdownKebab id={`kebab-${item.code}`} pullRight>
            <LinkMenuItem
              id={`goto-${item.code}`}
              route={ROUTE_PAGE_EDIT}
              params={{ pageCode: item.code }}
              label={`${goTo} ${item.title}`}
              className="PageModelPageReferencesTable__menu-item-goto"
            />
            <LinkMenuItem
              id={`page-configuration-${item.code}`}
              route={ROUTE_PAGE_CONFIG}
              params={{ pageCode: item.code }}
              label={`${pageConfiguration} ${item.title}`}
              className="PageModelPageReferencesTable__menu-item-config"
            />
          </DropdownKebab>
        </td>
      </tr>
    ));
  }

  renderTable() {
    const {
      pageReferences, page, pageSize, totalItems,
    } = this.props;
    if (pageReferences && pageReferences.length) {
      const pagination = {
        page,
        perPage: pageSize,
        perPageOptions: [5, 10, 15, 25, 50],
      };
      return (
        <div>
          <Table className="PageModelPageReferencesTable__table" striped bordered condensed hover >
            <thead>
              <tr>
                <th width={200}><FormattedMessage id="app.tag" /></th>
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
            itemCount={totalItems}
            onPageSet={this.changePage}
          />
        </div>
      );
    }
    return (
      <Alert type="warning">
        <strong><FormattedMessage id="group.page.references.empty" /></strong>
      </Alert>
    );
  }

  render() {
    return (
      <div className="PageModelPageReferencesTable">
        <Spinner loading={this.props.loading} >
          {this.renderTable()}
        </Spinner>
      </div>
    );
  }
}

PageModelPageReferencesTable.propTypes = {
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  pageReferences: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    fullTitle: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

PageModelPageReferencesTable.defaultProps = {
  onWillMount: null,
  loading: false,
  pageReferences: [],
};

export default PageModelPageReferencesTable;
