import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape, defineMessages } from 'react-intl';
import { ROUTE_PAGE_ADD } from 'app-init/router';
import { Spinner, Button } from 'patternfly-react';

import PageTreeCompact from 'ui/pages/common/PageTreeCompact';
import DeletePageModalContainer from 'ui/pages/common/DeletePageModalContainer';
import PublishPageModalContainer from 'ui/pages/common/PublishPageModalContainer';
import UnpublishPageModalContainer from 'ui/pages/common/UnpublishPageModalContainer';
import PageListSearchTable from 'ui/pages/list/PageListSearchTable';

const msgs = defineMessages({
  searchPlaceholder: {
    id: 'pageTree.searchForm.code',
    defaultMessage: 'Page code',
  },
});

const ENTER_KEY = 13;
const SPACE_KEY = 32;

class ContentPages extends Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
      searchValue: '',
    };

    this.handleExpandCollapse = this.handleExpandCollapse.bind(this);
    this.handleExpanderKeyDown = this.handleExpanderKeyDown.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchInputKeyDown = this.handleSearchInputKeyDown.bind(this);
    this.handlePageSelect = this.handlePageSelect.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  handleExpandCollapse() {
    const { onExpandAll, onCollapseAll, selectedPage } = this.props;
    const { expanded } = this.state;
    if (expanded) {
      onCollapseAll();
      this.setState({
        expanded: false,
      });
    } else {
      onExpandAll(selectedPage);
      this.setState({
        expanded: true,
      });
    }
  }

  handleExpanderKeyDown(e) {
    if (e.keyCode === ENTER_KEY || e.keyCode === SPACE_KEY) this.handleExpandCollapse();
  }

  handleSearchInputChange(e) {
    this.setState({ searchValue: e.target.value });
  }

  handleSearchSubmit() {
    const { onPageSearch } = this.props;
    const { searchValue } = this.state;
    onPageSearch(searchValue);
  }

  handleSearchInputKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.handleSearchSubmit();
    }
  }

  handleClearSearchKeyDown(e) {
    const { onClear } = this.props;
    if (e.keyCode === ENTER_KEY || e.keyCode === SPACE_KEY) onClear();
  }

  handlePageSelect(page) {
    const { loadOnPageSelect, onLoadPage } = this.props;
    if (loadOnPageSelect) {
      onLoadPage(page);
    }
  }

  render() {
    const {
      loading, onExpandPage, pages, intl, searchPages, selectedPage, onClear,
    } = this.props;
    const { expanded } = this.state;

    return (
      <div className="ContentPages">
        <div className="ContentPages__pagetree-actions">
          <div className="ContentPages__pagetree-searchbar">
            <input
              className="form-control"
              placeholder={intl.formatMessage(msgs.searchPlaceholder)}
              onChange={this.handleSearchInputChange}
              onKeyDown={this.handleSearchInputKeyDown}
            />
            <Button
              className="ContentPages__pagetree-searchbtn"
              onClick={this.handleSearchSubmit}
            >
              <span className="icon fa fa-search" />
            </Button>
          </div>
          <Link to={ROUTE_PAGE_ADD} className="pull-right">
            <Button className="ContentPages__pagetree-addbtn">
              <FormattedMessage id="app.add" />
            </Button>
          </Link>
        </div>
        {searchPages && searchPages.length ? (
          <div
            className="ContentPages__pagetree-expander"
            onClick={onClear}
            onKeyDown={this.handleClearSearchKeyDown}
            role="button"
            tabIndex="0"
          >
            <FormattedMessage id="pageTree.action.clear" />
            <span className="icon fa fa-close" />
          </div>
        ) : (
          <div
            className="ContentPages__pagetree-expander"
            onClick={this.handleExpandCollapse}
            onKeyDown={this.handleExpanderKeyDown}
            role="button"
            tabIndex="0"
          >
            <FormattedMessage id={expanded ? 'pageTree.collapseAll' : 'pageTree.expandAll'} />
            <span className={`icon fa fa-chevron-${expanded ? 'down' : 'right'}`} />
          </div>
        )}
        <Spinner loading={!!loading}>
          {searchPages && searchPages.length ? (
            <PageListSearchTable
              {...this.props}
              className="ContentPages__search-table"
              striped={false}
              onWillMount={() => {}}
              onRowClick={this.handlePageSelect}
            />
          ) : (
            <PageTreeCompact
              {...this.props}
              pages={pages}
              selectedPage={selectedPage}
              onExpandPage={onExpandPage}
              onRowClick={this.handlePageSelect}
            />
          )}
        </Spinner>
        <DeletePageModalContainer />
        <PublishPageModalContainer />
        <UnpublishPageModalContainer />
      </div>
    );
  }
}

ContentPages.propTypes = {
  onWillMount: PropTypes.func,
  onExpandPage: PropTypes.func,
  onExpandAll: PropTypes.func,
  onCollapseAll: PropTypes.func,
  onPageSearch: PropTypes.func,
  onClear: PropTypes.func,
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  intl: intlShape.isRequired,
  searchPages: PropTypes.arrayOf(PropTypes.shape({})),
  selectedPage: PropTypes.shape({}),
  loadOnPageSelect: PropTypes.bool,
  onLoadPage: PropTypes.func,
};
ContentPages.defaultProps = {
  onWillMount: () => {},
  onExpandPage: () => {},
  onExpandAll: () => {},
  onCollapseAll: () => {},
  onPageSearch: () => {},
  onClear: () => {},
  pages: [],
  loading: false,
  searchPages: null,
  selectedPage: {},
  loadOnPageSelect: true,
  onLoadPage: () => {},
};

export default injectIntl(ContentPages);
