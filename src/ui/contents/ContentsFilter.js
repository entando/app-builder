import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { FormattedMessage, intlShape, defineMessages } from 'react-intl';
import { Filter, FormControl, Col, ControlLabel, Button, Icon } from 'patternfly-react';
import { Checkbox } from 'react-bootstrap';
import FormLabel from 'ui/common/form/FormLabel';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import CategoryTypeaheadFilterContainer from 'ui/categories/filter/CategoryTypeaheadFilterContainer';
import RenderDropdownTypeaheadInput from 'ui/common/form/RenderDropdownTypeaheadInput';

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

const PUBLISHED = 'published';
const READY = 'ready';
const UNPUBLISHED = 'draft';
const OPEN = 'free';
const RESTRICTED = 'restricted';
const ALL = 'all';

class ContentsFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvancedFilters: false,
    };
    this.clearSearch = this.clearSearch.bind(this);
  }

  onChangeQuickFilter(e) {
    const { currentQuickFilter, onSetQuickFilter } = this.props;
    onSetQuickFilter({
      ...currentQuickFilter,
      id: e.id,
      title: e.title,
    });
  }

  onChangeQuickFilterSearchText(e) {
    e.preventDefault();
    const { currentQuickFilter, onSetQuickFilter } = this.props;
    onSetQuickFilter({
      ...currentQuickFilter,
      value: e.target.value,
    });
  }

  onValueKeyPress(keyEvent) {
    const { currentQuickFilter, onAdvancedFilterSearch } = this.props;
    const { id, value: currentValue } = currentQuickFilter;

    if (keyEvent.key === 'Enter' && currentValue && currentValue.length > 0) {
      keyEvent.stopPropagation();
      keyEvent.preventDefault();
      const formValues = {
        [id]: currentValue,
      };
      const operators = {
        [id]: FILTER_OPERATORS.LIKE,
      };
      const query = convertToQueryString({ formValues, operators }).slice(1);
      onAdvancedFilterSearch(query);
    }
  }

  onToggleAdvancedFilters() {
    const { showAdvancedFilters } = this.state;
    this.setState({
      showAdvancedFilters: !showAdvancedFilters,
    });
  }

  clearSearch() {
    const { onAdvancedFilterSearch, currentQuickFilter, onSetQuickFilter } = this.props;

    onSetQuickFilter({
      ...currentQuickFilter,
      value: '',
    });
    setTimeout(onAdvancedFilterSearch, 10);
  }


  render() {
    const {
      currentQuickFilter, intl, contentTypes, groups, language, filteringCategories, groupFilter,
      statusChecked, onCheckStatus, accessChecked, onCheckAccess, authorChecked, onCheckAuthor,
      onSetContentType, onSetGroup, currentUsername, onAdvancedFilterSearch, users, inModal,
    } = this.props;

    const { showAdvancedFilters } = this.state;
    const advancedFilterIcon = (
      <i
        className={`fa ${!showAdvancedFilters
          ? 'fa-angle-right'
          : 'fa-angle-down'
        } ContentsFilter__advanced-icon`}
      />
    );

    const renderedUsers = users
      .filter(({ username }) => username !== currentUsername)
      .map(({ username }, i) => (
        <Checkbox
          key={username}
          className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
          role="button"
          tabIndex={-9 - i}
          readOnly
          checked={authorChecked === username}
          onClick={() => onCheckAuthor(username)}
          onKeyDown={() => onCheckAuthor(username)}
        >
          {username}
        </Checkbox>
      ));


    const renderedContentsStatusFilter = !inModal && (
      <div className="row form-group">
        <Col xs={12} sm={2} className="text-right mobile-left">
          <ControlLabel>
            <FormLabel labelId="cms.contents.statusMain" />
          </ControlLabel>
        </Col>
        <Col xs={12} sm={10}>
          <Checkbox
            className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
            role="button"
            tabIndex={-4}
            readOnly
            checked={statusChecked === UNPUBLISHED}
            onClick={() => onCheckStatus(UNPUBLISHED)}
            onKeyDown={() => onCheckStatus(UNPUBLISHED)}
          >
            <FormattedMessage id="cms.contents.pendingChanges" defaultMessage="Pending changes" />
          </Checkbox>
          <Checkbox
            className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
            role="button"
            tabIndex={-3}
            readOnly
            checked={statusChecked === READY}
            onClick={() => onCheckStatus(READY)}
            onKeyDown={() => onCheckStatus(READY)}
          >
            <FormattedMessage id="cms.contents.ready" defaultMessage="Ready for approval" />
          </Checkbox>
          <Checkbox
            className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
            role="button"
            tabIndex={-2}
            readOnly
            checked={statusChecked === PUBLISHED}
            onClick={() => onCheckStatus(PUBLISHED)}
            onKeyDown={() => onCheckStatus(PUBLISHED)}
          >
            <FormattedMessage id="cms.contents.published" defaultMessage="Published" />
          </Checkbox>
        </Col>
      </div>
    );

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
      <div className="ContentsFilter well">
        <Filter className="clearfix col-xs-12">
          <Col xs={6} sm={2} className="ContentsFilter__left-column">
            <Filter.TypeSelector
              className="ContentsFilter__quick-filter-type"
              filterTypes={QUICK_FILTERS}
              currentFilterType={localizedCurrentQuickFilter}
              onFilterTypeSelected={e => this.onChangeQuickFilter(e)}
            />
          </Col>
          <Col xs={10} sm={9} className="no-padding ContentsFilter__right-column" style={{ display: 'flex' }}>
            <FormControl
              style={{ zIndex: '1' }}
              type={localizedCurrentQuickFilter.filterType}
              value={currentQuickFilter.value}
              placeholder={intl.formatMessage(messages.searchContent)}
              onChange={e => this.onChangeQuickFilterSearchText(e)}
              onKeyPress={e => this.onValueKeyPress(e)}
            />
            <Button
              className="btn-transparent SearchForm__button-close"
              onClick={this.clearSearch}
            >
              <Icon name="close" />
            </Button>
          </Col>
        </Filter>
        <Col xs={12} xsOffset={0} sm={10} smOffset={2} className="ContentsFilter__right-column">
          <div
            className="ContentsFilter__advanced-filters-text"
            role="button"
            onClick={() => this.onToggleAdvancedFilters()}
            onKeyDown={() => this.onToggleAdvancedFilters()}
            tabIndex={-1}
          >
            {advancedFilterIcon} <FormattedMessage id="cms.contents.advancedFilters" defaultMessage="Advanced Filters" />
          </div>
        </Col>
        {showAdvancedFilters && (
          <Fragment>
            <div className="row form-group">
              <RenderSelectInput
                inputSize={9}
                labelSize={2}
                label={<FormLabel labelId="cms.contents.contentType" defaultMessage="Content Type" />}
                alignClass="text-right"
                options={contentTypes}
                optionValue="code"
                optionDisplayName="name"
                defaultOptionId="cms.contents.selectContentType"
                input={{ onChange: e => onSetContentType(e.target.value) }}
              />
            </div>
            <div className="row form-group">
              <RenderDropdownTypeaheadInput
                input={{ name: 'group', value: groupFilter, onChange: groupcode => onSetGroup(groupcode) }}
                label={<FormLabel labelId="cms.contents.group" defaultMessage="Group" />}
                inputSize={9}
                labelSize={2}
                options={groups}
                alignClass="text-right"
                labelKey="name"
                valueKey="code"
                placeholder={intl.formatMessage({ id: 'cms.contents.selectGroup' })}
              />
            </div>
            <div className="row form-group">
              <CategoryTypeaheadFilterContainer
                language={language}
                filteredCategories={filteringCategories}
                filterSubject="content"
                minimal
              />
            </div>
            { renderedContentsStatusFilter }
            <div className="row form-group">
              <Col xs={12} sm={2} className="text-right mobile-left">
                <ControlLabel>
                  <FormLabel labelId="cms.contents.restriction" defaultMessage="Restrictions" />
                </ControlLabel>
              </Col>
              <Col xs={12} sm={10}>
                <Checkbox
                  className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
                  role="button"
                  tabIndex={-5}
                  readOnly
                  checked={accessChecked === OPEN}
                  onClick={() => onCheckAccess(OPEN)}
                  onKeyDown={() => onCheckAccess(OPEN)}
                >
                  <i className="fa fa-unlock ContentsFilter__access-icon" />
                  <FormattedMessage id="cms.contents.open" defaultMessage="Open" />
                </Checkbox>
                <Checkbox
                  className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
                  role="button"
                  tabIndex={-5}
                  readOnly
                  checked={accessChecked === RESTRICTED}
                  onClick={() => onCheckAccess(RESTRICTED)}
                  onKeyDown={() => onCheckAccess(RESTRICTED)}
                >
                  <i className="fa fa-lock ContentsFilter__access-icon" />
                  <FormattedMessage id="cms.contents.restricted" defaultMessage="Restricted" />
                </Checkbox>
              </Col>
            </div>
            <div className="row form-group">
              <Col xs={12} sm={2} className="text-right mobile-left">
                <ControlLabel>
                  <FormLabel labelId="cms.contents.showMe" defaultMessage="Show me" />
                </ControlLabel>
              </Col>
              <Col xs={12} sm={10} className="ContentsFilter__users-wrapper">
                <Checkbox
                  className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
                  role="button"
                  tabIndex={-7}
                  readOnly
                  checked={authorChecked === ALL}
                  onClick={() => onCheckAuthor(ALL)}
                  onKeyDown={() => onCheckAuthor(ALL)}
                >
                  <FormattedMessage id="cms.contents.allContents" defaultMessage="All Contents" />
                </Checkbox>
                <Checkbox
                  className="ContentsFilter__item-cb ContentsFilter__item-cb--responsive"
                  role="button"
                  tabIndex={-8}
                  readOnly
                  checked={authorChecked === currentUsername}
                  onClick={() => onCheckAuthor(currentUsername)}
                  onKeyDown={() => onCheckAuthor(currentUsername)}
                >
                  <FormattedMessage id="cms.contents.onlyMine" defaultMessage="Only Mine" />
                </Checkbox>
                {renderedUsers}
              </Col>
            </div>
          </Fragment>
        )}
        <div className="form-group">
          <Col xs={12} sm={2} smOffset={9} className="text-right mobile-center">
            <Button
              bsStyle="primary"
              className="ContentsFilter__search-button"
              onClick={() => onAdvancedFilterSearch()}
            >
              <FormattedMessage id="cms.contents.search" defaultMessage="Search" />
            </Button>
          </Col>
        </div>
      </div>
    );
  }
}

ContentsFilter.propTypes = {
  intl: intlShape.isRequired,
  language: PropTypes.string.isRequired,
  currentQuickFilter: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    filterType: PropTypes.string,
  }).isRequired,
  onSetQuickFilter: PropTypes.func.isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filteringCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  statusChecked: PropTypes.string.isRequired,
  onCheckStatus: PropTypes.func.isRequired,
  accessChecked: PropTypes.string.isRequired,
  onCheckAccess: PropTypes.func.isRequired,
  authorChecked: PropTypes.string.isRequired,
  onCheckAuthor: PropTypes.func.isRequired,
  onSetContentType: PropTypes.func.isRequired,
  onSetGroup: PropTypes.func.isRequired,
  groupFilter: PropTypes.string,
  currentUsername: PropTypes.string.isRequired,
  onAdvancedFilterSearch: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  inModal: PropTypes.bool,
};

ContentsFilter.defaultProps = {
  inModal: false,
  groupFilter: '',
};

export default ContentsFilter;
