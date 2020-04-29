import React, { Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Alert } from 'patternfly-react';
import CheckboxGroup from 'ui/component-repository/common/CheckboxGroup';
import SidebarFilter from 'ui/component-repository/common/SidebarFilter';

class ComponentRepositoryFilterBody extends Component {
  componentDidMount() {
    this.props.onDidMount();
  }

  render() {
    const { intl, componentRepositories, onChange } = this.props;
    const formatText = id => intl.formatMessage({ id });

    const options = componentRepositories.map(componentRepository => ({
      label: componentRepository.name,
      value: componentRepository.id,
    }));

    const renderECRCheckBox = (!componentRepositories || componentRepositories.length === 0)
      ?
      (
        <Alert type="info">
          <FormattedMessage id="componentRepository.des.notFound" />
        </Alert>) : (<CheckboxGroup
          name="componentRepositories"
          options={options}
          onChange={onChange}
        />);

    return (
      <SidebarFilter
        title={formatText('componentRepository.sidebar.componentRepositoryFilterTitle')}
      >
        {renderECRCheckBox}
      </SidebarFilter>
    );
  }
}

ComponentRepositoryFilterBody.propTypes = {
  intl: intlShape.isRequired,
  componentRepositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDidMount: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'componentRepositoryFilter',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(injectIntl(ComponentRepositoryFilterBody));
