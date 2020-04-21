import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Alert, Paginator } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import ComponentListGridView from 'ui/digital-exchange/components/list/ComponentListGridView';
import ComponentListListView from 'ui/digital-exchange/components/list/ComponentListListView';
import ExtraTabBarFilterContainer from 'ui/digital-exchange/ExtraTabBarFilterContainer';

import { DE_COMPONENTS_GRID_VIEW } from 'state/digital-exchange/components/const';
import { componentType } from 'models/digital-exchange/components';


class ComponentList extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  changePage(page) {
    this.props.fetchDEComponentsFiltered({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.fetchDEComponentsFiltered({ page: 1, pageSize });
  }

  render() {
    const {
      loading,
      viewMode,
      digitalExchangeComponents,
    } = this.props;

    const pagination = {
      page: this.props.page,
      perPage: this.props.pageSize,
      perPageOptions: [1, 5, 10, 15, 25, 50],
    };

    const renderComponents = (viewMode === DE_COMPONENTS_GRID_VIEW)
      ? <ComponentListGridView components={digitalExchangeComponents} />
      : <ComponentListListView components={digitalExchangeComponents} />;

    const components = (!digitalExchangeComponents
      || digitalExchangeComponents.length === 0)
      ?
      (
        <Alert type="info">
          <FormattedMessage id="digitalExchange.components.notFound" />
        </Alert>)
      : renderComponents;

    return (
      <div className="ComponentList">
        <ExtraTabBarFilterContainer />
        <Paginator
          pagination={pagination}
          viewType="table"
          itemCount={this.props.totalItems}
          onPageSet={this.changePage}
          onPerPageSelect={this.changePageSize}
        />
        <Spinner loading={!!loading} >
          {components}
        </Spinner>
      </div>
    );
  }
}

ComponentList.propTypes = {
  onWillMount: PropTypes.func,
  fetchDEComponentsFiltered: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  viewMode: PropTypes.string,
  digitalExchangeComponents: PropTypes.arrayOf(componentType),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

ComponentList.defaultProps = {
  onWillMount: () => {},
  loading: false,
  digitalExchangeComponents: [],
  viewMode: DE_COMPONENTS_GRID_VIEW,
};

export default ComponentList;
