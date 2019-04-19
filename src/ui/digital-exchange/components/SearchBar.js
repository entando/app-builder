import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import SearchTextInput from 'ui/digital-exchange/components/SearchTextInput';

class SearchBarBody extends Component {
  constructor(props) {
    super(props);
    this.clearSearch = this.clearSearch.bind(this);
  }

  clearSearch() {
    const { reset, submit, searchTerm } = this.props;
    reset();
    if (searchTerm !== '') setTimeout(submit, 10);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="SearchBar__container" onSubmit={handleSubmit}>
        <Field
          name="keyword"
          component={SearchTextInput}
          onClear={this.clearSearch}
        />
        <Button
          className="SearchBar__button"
          type="submit"
        >
          <Icon name="search" />
        </Button>
      </form>
    );
  }
}

SearchBarBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  submit: PropTypes.func.isRequired,
};

SearchBarBody.defaultProps = {
  searchTerm: '',
};

const SearchBar = reduxForm({
  form: 'searchBar',
})(SearchBarBody);

export default SearchBar;
