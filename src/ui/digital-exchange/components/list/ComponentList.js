import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';

import ComponentListGridView from 'ui/digital-exchange/components/list/ComponentListGridView';
import ComponentListListView from 'ui/digital-exchange/components/list/ComponentListListView';
import ExtraTabBarFilterContainer from 'ui/digital-exchange/ExtraTabBarFilterContainer';


import { DE_COMPONENTS_GRID_VIEW } from 'state/digital-exchange/components/const';
import { componentType } from 'models/digital-exchange/components';


class ComponentList extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const {
      loading,
      viewMode,
      digitalExchangeComponents,
    } = this.props;

    return (
      <div className="ComponentList">
        <ExtraTabBarFilterContainer />
        <Spinner loading={!!loading} >
          {
            (viewMode === DE_COMPONENTS_GRID_VIEW)
              ? <ComponentListGridView components={digitalExchangeComponents} />
              : <ComponentListListView components={digitalExchangeComponents} />
          }
        </Spinner>
      </div>
    );
  }
}

ComponentList.propTypes = {
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  viewMode: PropTypes.string,
  digitalExchangeComponents: PropTypes.arrayOf(componentType),
};

ComponentList.defaultProps = {
  onWillMount: () => {},
  loading: false,
  digitalExchangeComponents: [],
  viewMode: DE_COMPONENTS_GRID_VIEW,
};

export default ComponentList;
