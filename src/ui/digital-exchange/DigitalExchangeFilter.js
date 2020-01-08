import React, { Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Alert } from 'patternfly-react';
import CheckboxGroup from 'ui/digital-exchange/common/CheckboxGroup';
import SidebarFilter from 'ui/digital-exchange/common/SidebarFilter';

class DigitalExchangeFilterBody extends Component {
  componentDidMount() {
    this.props.onDidMount();
  }

  render() {
    const { intl, digitalExchanges, onChange } = this.props;
    const formatText = id => intl.formatMessage({ id });

    const options = digitalExchanges.map(digitalExchange => ({
      label: digitalExchange.name,
      value: digitalExchange.id,
    }));

    const renderDECheckBox = (!digitalExchanges || digitalExchanges.length === 0)
      ?
      (
        <Alert type="info">
          <FormattedMessage id="digitalExchange.des.notFound" />
        </Alert>) : (<CheckboxGroup
          name="digitalExchanges"
          options={options}
          onChange={onChange}
        />);

    return (
      <SidebarFilter
        title={formatText('digitalExchange.sidebar.digitalExchangeFilterTitle')}
      >
        {renderDECheckBox}
      </SidebarFilter>
    );
  }
}

DigitalExchangeFilterBody.propTypes = {
  intl: intlShape.isRequired,
  digitalExchanges: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDidMount: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'digitalExchangeFilter',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(injectIntl(DigitalExchangeFilterBody));
