import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import RenderSearchFormInput from 'ui/common/form/RenderSearchFormInput';

class SearchFormBody extends Component {
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
      <form className="SearchForm__container" onSubmit={handleSubmit}>
        <Field
          name="keyword"
          component={RenderSearchFormInput}
          onClear={this.clearSearch}
        />
        <Button
          className="SearchForm__button"
          type="submit"
        >
          <Icon name="search" />
        </Button>
      </form>
    );
  }
}

SearchFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  submit: PropTypes.func.isRequired,
};

SearchFormBody.defaultProps = {
  searchTerm: '',
};

const SearchForm = reduxForm({
  form: 'searchForm',
})(SearchFormBody);

export default SearchForm;
