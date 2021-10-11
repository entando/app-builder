import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, defineMessages } from 'react-intl';
import { Filter, FormControl, Col, Button } from 'patternfly-react';
import FormLabel from 'ui/common/form/FormLabel';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';

const messages = defineMessages({
  searchContent: {
    id: 'cms.contents.quickSearchPlaceHolder',
    defaultValue: 'Search Content',
  },
  code: {
    id: 'cms.label.code',
    defaultValue: 'Code',
  },
  name: {
    id: 'cms.label.name',
    defaultValue: 'Name',
  },
});

class ContentSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvancedFilters: false,
    };
  }

  onChangeQuickFilter(e) {
    const { currentQuickFilter, onSetQuickFilter } = this.props;
    currentQuickFilter.id = e.id;
    currentQuickFilter.title = e.title;
    onSetQuickFilter(currentQuickFilter);
  }

  onChangeQuickFilterSearchText(e) {
    e.preventDefault();
    const { currentQuickFilter, onSetQuickFilter } = this.props;
    currentQuickFilter.value = e.target.value;
    onSetQuickFilter(currentQuickFilter);
  }

  onValueKeyPress(keyEvent) {
    const { currentQuickFilter, onAdvancedFilterSearch } = this.props;
    const { value: currentValue } = currentQuickFilter;

    if (keyEvent.key === 'Enter' && currentValue && currentValue.length > 0) {
      keyEvent.stopPropagation();
      keyEvent.preventDefault();
      onAdvancedFilterSearch();
    }
  }

  onToggleAdvancedFilters() {
    const { showAdvancedFilters } = this.state;
    this.setState({
      showAdvancedFilters: !showAdvancedFilters,
    });
  }


  render() {
    const {
      currentQuickFilter, intl, contentTypes,
      onSetContentType, onAdvancedFilterSearch,
    } = this.props;

    const QUICK_FILTERS = [
      {
        id: 'description',
        title: intl.formatMessage(messages.name),
        filterType: 'text',
      },
      {
        id: 'id',
        title: intl.formatMessage(messages.code),
        filterType: 'text',
      },
    ];

    // WORKAROUND to prevent showing untranslated info coming from state at first render
    const localizedCurrentQuickFilter = currentQuickFilter.title ? currentQuickFilter
      : QUICK_FILTERS.filter(quickFilter => quickFilter.id === currentQuickFilter.id)[0];

    return (
      <div className="ContentSearch">
        <Filter className="clearfix col-xs-12">
          <Col xs={6} sm={3} className="ContentSearch__left-column">
            <Filter.TypeSelector
              className="ContentSearch__quick-filter-type"
              filterTypes={QUICK_FILTERS}
              currentFilterType={localizedCurrentQuickFilter}
              onFilterTypeSelected={e => this.onChangeQuickFilter(e)}
            />
          </Col>
          <Col xs={10} sm={9} className="no-padding ContentSearch__right-column">
            <FormControl
              style={{ zIndex: '1' }}
              type={localizedCurrentQuickFilter.filterType}
              value={localizedCurrentQuickFilter.value}
              placeholder={intl.formatMessage(messages.searchContent)}
              onChange={e => this.onChangeQuickFilterSearchText(e)}
              onKeyPress={e => this.onValueKeyPress(e)}
            />
          </Col>
        </Filter>
        <div className="ContentSearch__advanced-filter">
          <RenderSelectInput
            inputSize={9}
            labelSize={3}
            label={<FormLabel labelId="cms.contents.contentType" defaultMessage="Content Type" />}
            alignClass="text-right"
            options={contentTypes}
            optionValue="code"
            optionDisplayName="name"
            defaultOptionId="cms.contents.selectContentType"
            input={{ onChange: e => onSetContentType(e.target.value) }}
          />
        </div>
        <Col xs={12} sm={3} smOffset={9} className="text-right mobile-center">
          <Button
            className="ContentsFilter__search-button"
            bsStyle="primary"
            onClick={() => onAdvancedFilterSearch()}
          >
            <FormattedMessage id="cms.contents.search" defaultMessage="Search" />
          </Button>
        </Col>
      </div>
    );
  }
}

ContentSearch.propTypes = {
  intl: intlShape.isRequired,
  currentQuickFilter: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    filterType: PropTypes.string,
  }).isRequired,
  onSetQuickFilter: PropTypes.func.isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSetContentType: PropTypes.func.isRequired,
  onAdvancedFilterSearch: PropTypes.func.isRequired,
};

export default ContentSearch;
