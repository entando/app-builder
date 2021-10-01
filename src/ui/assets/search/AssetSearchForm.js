import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Icon } from 'patternfly-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderSearchFormInput from 'ui/common/form/RenderSearchFormInput';

class AssetSearchFormBody extends Component {
  constructor(props) {
    super(props);
    this.clearSearch = this.clearSearch.bind(this);
    this.messages = defineMessages({
      filterPlaceholder: {
        id: 'cms.assets.list.filterBy',
        defaultMessage: 'Filter by',
      },
    });
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  clearSearch() {
    const { reset, submit, searchTerm } = this.props;
    reset();
    if (searchTerm !== '') setTimeout(submit, 10);
  }

  render() {
    const { intl, handleSubmit } = this.props;

    return (
      <form className="AssetsList__filter-container" onSubmit={handleSubmit}>
        <Field
          name="keyword"
          component={RenderSearchFormInput}
          onClear={this.clearSearch}
          placeholder={intl.formatMessage(this.messages.filterPlaceholder)}
        />
        <Button className="SearchForm__button" type="submit">
          <Icon name="search" />
        </Button>
      </form>

    );
  }
}

AssetSearchFormBody.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  submit: PropTypes.func.isRequired,
};

AssetSearchFormBody.defaultProps = {
  searchTerm: '',
};

const AssetSearchForm = reduxForm({
  form: 'assetSearchForm',
})(AssetSearchFormBody);

export default injectIntl(AssetSearchForm);
