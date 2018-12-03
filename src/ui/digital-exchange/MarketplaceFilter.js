import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import CheckboxGroup from 'ui/digital-exchange/common/CheckboxGroup';

class MarketplaceFilterBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const options = this.props.marketplaces.map(marketplace => (
      { label: marketplace, value: marketplace }
    ));

    return (
      <CheckboxGroup
        name="marketplaces"
        options={options}
        onChange={this.props.onChange}
      />
    );
  }
}

MarketplaceFilterBody.propTypes = {
  marketplaces: PropTypes.arrayOf(PropTypes.string).isRequired,
  onWillMount: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const MarketplaceFilter = reduxForm({
  form: 'marketplaceFilter',
})(MarketplaceFilterBody);

export default MarketplaceFilter;
