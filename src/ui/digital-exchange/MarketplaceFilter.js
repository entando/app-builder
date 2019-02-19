import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import CheckboxGroup from 'ui/digital-exchange/common/CheckboxGroup';
import SidebarFilter from 'ui/digital-exchange/common/SidebarFilter';

class MarketplaceFilterBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const formatText = id => this.props.intl.formatMessage({ id });

    const options = this.props.digitalExchangeMarketplaces.map(marketplace => (
      { label: marketplace.name, value: marketplace.id }
    ));

    return (
      <SidebarFilter title={formatText('digitalExchange.sidebar.digitalExchangeFilterTitle')}>
        <CheckboxGroup
          name="marketplaces"
          options={options}
          onChange={this.props.onChange}
        />
      </SidebarFilter>
    );
  }
}

MarketplaceFilterBody.propTypes = {
  intl: intlShape.isRequired,
  digitalExchangeMarketplaces: PropTypes.arrayOf(PropTypes.object).isRequired,
  onWillMount: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'marketplaceFilter',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(injectIntl(MarketplaceFilterBody));
