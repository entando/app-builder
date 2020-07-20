import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Alert, Paginator } from 'patternfly-react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import ComponentListGridView from 'ui/component-repository/components/list/ComponentListGridView';
import ComponentListListView from 'ui/component-repository/components/list/ComponentListListView';
import ExtraTabBarFilterContainer from 'ui/component-repository/ExtraTabBarFilterContainer';

import { ECR_COMPONENTS_GRID_VIEW } from 'state/component-repository/components/const';
import { componentType } from 'models/component-repository/components';
import paginatorMessages from 'ui/paginatorMessages';

class ComponentList extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    this.props.onDidMount();
  }

  changePage(page) {
    this.props.fetchECRComponentsFiltered({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.fetchECRComponentsFiltered({ page: 1, pageSize });
  }


  render() {
    const {
      loading,
      viewMode,
      page,
      pageSize: perPage,
      totalItems,
      componentRepositoryComponents,
      intl,
    } = this.props;

    const pagination = {
      page,
      perPage,
      perPageOptions: [5, 10, 15, 25, 50],
    };

    const renderComponents = (viewMode === ECR_COMPONENTS_GRID_VIEW)
      ? <ComponentListGridView components={componentRepositoryComponents} />
      : <ComponentListListView components={componentRepositoryComponents} />;

    const components = (!componentRepositoryComponents
      || componentRepositoryComponents.length === 0)
      ?
      (
        <Alert type="info">
          <FormattedMessage id="componentRepository.components.notFound" />
        </Alert>)
      : renderComponents;


    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    return (
      <div className="ComponentList">
        <ExtraTabBarFilterContainer />
        <Spinner loading={!!loading} >
          {components}
          <Paginator
            pagination={pagination}
            viewType="table"
            itemCount={totalItems}
            onPageSet={this.changePage}
            onPerPageSelect={this.changePageSize}
            messages={messages}
          />
        </Spinner>
      </div>
    );
  }
}

ComponentList.propTypes = {
  intl: intlShape.isRequired,
  onDidMount: PropTypes.func,
  fetchECRComponentsFiltered: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  viewMode: PropTypes.string,
  componentRepositoryComponents: PropTypes.arrayOf(componentType),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

ComponentList.defaultProps = {
  onDidMount: () => {},
  loading: false,
  componentRepositoryComponents: [],
  viewMode: ECR_COMPONENTS_GRID_VIEW,
};

export default injectIntl(ComponentList);
