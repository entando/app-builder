import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Alert } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import ComponentListGridView from 'ui/component-repository/components/list/ComponentListGridView';
import ComponentListListView from 'ui/component-repository/components/list/ComponentListListView';

import { ECR_COMPONENTS_GRID_VIEW } from 'state/component-repository/components/const';
import { componentType } from 'models/component-repository/components';


class ComponentList extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const {
      loading,
      viewMode,
      componentRepositoryComponents,
    } = this.props;

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

    return (
      <div className="ComponentList">
        <Spinner loading={!!loading} >
          {components}
        </Spinner>
      </div>
    );
  }
}

ComponentList.propTypes = {
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  viewMode: PropTypes.string,
  componentRepositoryComponents: PropTypes.arrayOf(componentType),
};

ComponentList.defaultProps = {
  onWillMount: () => {},
  loading: false,
  componentRepositoryComponents: [],
  viewMode: ECR_COMPONENTS_GRID_VIEW,
};

export default ComponentList;
