import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, defineMessages } from 'react-intl';
import ContentSearch from 'ui/common/content/ContentSearch';
import ContentList from 'ui/common/content/ContentList';

const messages = defineMessages({
  description: {
    id: 'cms.contents.description',
    defaultMessage: 'Name',
  },
  lastModified: {
    id: 'cms.contents.lastModified',
    defaultMessage: 'Last Edited',
  },
  typeCode: {
    id: 'cms.contents.typeCode',
    defaultMessage: 'Type',
  },
  created: {
    id: 'cms.contents.created',
    defaultMessage: 'Created date',
  },
  downloadButton: {
    id: 'cms.contents.downloadAs',
    defaultMessage: 'Download As',
  },
  addContent: {
    id: 'cms.contents.addContent',
    defaultMessage: 'Add Content',
  },
  columns: {
    id: 'cms.contents.columns',
    defaultMessage: 'Columns',
  },
  selectedContents: {
    id: 'cms.contents.selectedContents',
    defaultMessage: 'You have selected {number} content(s), you can',
  },
});

const AVAILABLE_COLUMN_CODES = [
  'description', 'lastModified',
  'typeCode', 'created',
];

class Contents extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  render() {
    const {
      page, totalItems, pageSize, contents, lastPage, currentQuickFilter,
      onSetQuickFilter, onFilteredSearch, intl, onSetCurrentColumnsShow,
      contentTypes, currentColumnsShow, onSetContentType, sortingColumns,
      onSetSort, selectedRows, onAdvancedFilterSearch, onContentSelect,
      selectedContent,
    } = this.props;

    const availableColumns = AVAILABLE_COLUMN_CODES.map(code => ({
      name: intl.formatMessage(messages[code]),
      code,
    }));

    return (
      <div>
        <ContentSearch
          intl={intl}
          currentQuickFilter={currentQuickFilter}
          onSetQuickFilter={onSetQuickFilter}
          contentTypes={contentTypes}
          onSetContentType={onSetContentType}
          onAdvancedFilterSearch={onAdvancedFilterSearch}
        />
        <div className="Contents__body">
          <ContentList
            intl={intl}
            page={page}
            lastPage={lastPage}
            totalItems={totalItems}
            pageSize={pageSize}
            contents={contents}
            sortingColumns={sortingColumns}
            activeColumns={currentColumnsShow}
            onSetSort={onSetSort}
            onSetCurrentColumnsShow={onSetCurrentColumnsShow}
            selectedRows={selectedRows}
            onFilteredSearch={onFilteredSearch}
            availableColumns={availableColumns}
            onContentSelect={onContentSelect}
            onAdvancedFilterSearch={onAdvancedFilterSearch}
            selectedContent={selectedContent}
          />
        </div>
      </div>
    );
  }
}

Contents.propTypes = {
  intl: intlShape.isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onDidMount: PropTypes.func.isRequired,
  currentQuickFilter: PropTypes.shape({}).isRequired,
  onSetQuickFilter: PropTypes.func.isRequired,
  onFilteredSearch: PropTypes.func.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentColumnsShow: PropTypes.arrayOf(PropTypes.string),
  onSetCurrentColumnsShow: PropTypes.func,
  onSetContentType: PropTypes.func.isRequired,
  sortingColumns: PropTypes.shape({}).isRequired,
  onSetSort: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAdvancedFilterSearch: PropTypes.func.isRequired,
  onContentSelect: PropTypes.func.isRequired,
  selectedContent: PropTypes.string,
};

Contents.defaultProps = {
  currentColumnsShow: ['description', 'typeCode', 'lastModified', 'created'],
  onSetCurrentColumnsShow: () => {},
  selectedContent: '',
};

export default Contents;
