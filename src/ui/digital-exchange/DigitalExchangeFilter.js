import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import CheckboxGroup from 'ui/digital-exchange/common/CheckboxGroup';
import SidebarFilter from 'ui/digital-exchange/common/SidebarFilter';

class DigitalExchangeFilterBody extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const { intl, digitalExchanges, onChange } = this.props;
    const formatText = id => intl.formatMessage({ id });

    const options = digitalExchanges.map(digitalExchange => (
      { label: digitalExchange.name, value: digitalExchange.id }
    ));

    return (
      <SidebarFilter title={formatText('digitalExchange.sidebar.digitalExchangeFilterTitle')}>
        <CheckboxGroup
          name="digitalExchanges"
          options={options}
          onChange={onChange}
        />
      </SidebarFilter>
    );
  }
}

DigitalExchangeFilterBody.propTypes = {
  intl: intlShape.isRequired,
  digitalExchanges: PropTypes.arrayOf(PropTypes.object).isRequired,
  onWillMount: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'digitalExchangeFilter',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(injectIntl(DigitalExchangeFilterBody));
