import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { Button, Spinner } from 'patternfly-react';
import { PermissionCheck } from '@entando/utils';
import ContentsFilter from 'ui/contents/ContentsFilter';
import ContentsTable from 'ui/contents/ContentsTable';
import ContentsTabs from 'ui/contents/ContentsTabs';
import { withPermissionValues } from 'ui/auth/withPermissions';
import { VALIDATE_CONTENTS_PERMISSION } from 'state/permissions/const';

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
  firstEditor: {
    id: 'cms.contents.firstEditor',
    defaultMessage: 'Created by',
  },
  mainGroup: {
    id: 'cms.contents.mainGroup',
    defaultMessage: 'Owner Group',
  },
  groups: {
    id: 'cms.contents.groups',
    defaultMessage: 'Join Groups',
  },
  onLine: {
    id: 'cms.contents.onLine',
    defaultMessage: 'Status',
  },
  restriction: {
    id: 'cms.contents.restriction',
    defaultMessage: 'Restrictions',
  },
  code: {
    id: 'cms.contents.code',
    defaultMessage: 'Code',
  },
  actions: {
    id: 'cms.contents.actions',
    defaultMessage: 'Actions',
  },
});

const AVAILABLE_COLUMN_CODES = [
  'description', 'firstEditor', 'lastModified',
  'typeCode', 'created', 'mainGroup', 'groups',
  'onLine', 'restriction', 'code',
];

class Contents extends Component {
  constructor(props) {
    super(props);
    this.messages = defineMessages({
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
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  componentWillUnmount() {
    const { onWillUnmount } = this.props;
    onWillUnmount();
  }

  render() {
    const {
      page, totalItems, pageSize, contents, lastPage, loading,
      currentQuickFilter, onSetQuickFilter, onFilteredSearch, intl,
      contentTypes, groups, language, filteringCategories, statusChecked,
      onCheckStatus, onCheckAccess, accessChecked, onCheckAuthor, authorChecked,
      currentAuthorShow, currentStatusShow, currentColumnsShow,
      onSetCurrentAuthorShow, onSetCurrentStatusShow, onSetCurrentColumnsShow,
      onSetContentType, onSetGroup, sortingColumns, onSetSort, selectedRows,
      onSelectRows, onSelectAllRows, onEditContent, onClickDelete, onClickPublish,
      onClickAddContent, onClickJoinCategories, currentUsername, onClickClone,
      onAdvancedFilterSearch, users, userPermissions, groupFilter,
    } = this.props;

    const availableColumns = AVAILABLE_COLUMN_CODES.map(code => ({
      name: intl.formatMessage(messages[code]),
      code,
    }));

    const { selectedContents } = this.messages;
    const selectedRowsData = contents.filter(c => selectedRows.includes(c.id));
    const renderSelectedRows = selectedRows.length > 0 ? (
      <div className="Contents__selected-contents">
        {intl.formatMessage(selectedContents, { number: selectedRows.length })}
        <Button onClick={() => onClickJoinCategories(selectedRowsData)}>
          <FormattedMessage
            id="cms.contents.categoriesToAdd"
            defaultMessage="Select Categories to add"
          />
        </Button>
        <PermissionCheck
          requiredPermissions={VALIDATE_CONTENTS_PERMISSION}
          userPermissions={userPermissions}
        >
          {currentStatusShow === 'published' ? (
            <Button onClick={() => onClickPublish(selectedRowsData, false)}>
              <FormattedMessage
                id="cms.contents.unpublish"
                defaultMessage="Unpublish"
              />
            </Button>
          ) : (
            <Button onClick={() => onClickPublish(selectedRowsData, true)}>
              <FormattedMessage
                id="cms.contents.publish"
                defaultMessage="Publish"
              />
            </Button>
          )}
        </PermissionCheck>
      </div>
    ) : null;

    return (
      <div>
        <ContentsFilter
          intl={intl}
          language={language}
          currentQuickFilter={currentQuickFilter}
          onSetQuickFilter={onSetQuickFilter}
          contentTypes={contentTypes}
          groups={groups}
          filteringCategories={filteringCategories}
          statusChecked={statusChecked}
          onCheckStatus={onCheckStatus}
          onCheckAccess={onCheckAccess}
          accessChecked={accessChecked}
          onCheckAuthor={onCheckAuthor}
          authorChecked={authorChecked}
          onSetContentType={onSetContentType}
          groupFilter={groupFilter}
          onSetGroup={onSetGroup}
          currentUsername={currentUsername}
          onAdvancedFilterSearch={onAdvancedFilterSearch}
          users={users}
        />
        <div className="Contents__body">
          <ContentsTabs
            intl={intl}
            availableColumns={availableColumns}
            messages={this.messages}
            contents={contents}
            contentTypes={contentTypes}
            currentAuthorShow={currentAuthorShow}
            currentStatusShow={currentStatusShow}
            currentColumnsShow={currentColumnsShow}
            onSetCurrentAuthorShow={onSetCurrentAuthorShow}
            onSetCurrentStatusShow={onSetCurrentStatusShow}
            onSetCurrentColumnsShow={onSetCurrentColumnsShow}
            onClickAddContent={onClickAddContent}
            currentUsername={currentUsername}
          />
          {renderSelectedRows}
          <div>
            <Spinner loading={!!loading}>
              <ContentsTable
                intl={intl}
                page={page}
                lastPage={lastPage}
                totalItems={totalItems}
                pageSize={pageSize}
                contents={contents}
                sortingColumns={sortingColumns}
                activeColumns={currentColumnsShow}
                onSetSort={onSetSort}
                selectedRows={selectedRows}
                onSelectRows={onSelectRows}
                onSelectAllRows={onSelectAllRows}
                onFilteredSearch={onFilteredSearch}
                onSetColumnOrder={onSetCurrentColumnsShow}
                availableColumns={availableColumns}
                onEditContent={onEditContent}
                onClickDelete={onClickDelete}
                onClickPublish={onClickPublish}
                onClickClone={onClickClone}
                groups={groups}
              />
            </Spinner>
          </div>
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
  language: PropTypes.string.isRequired,
  onDidMount: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  currentQuickFilter: PropTypes.shape({}).isRequired,
  onSetQuickFilter: PropTypes.func.isRequired,
  onFilteredSearch: PropTypes.func.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groupFilter: PropTypes.string,
  filteringCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onCheckStatus: PropTypes.func.isRequired,
  statusChecked: PropTypes.string.isRequired,
  accessChecked: PropTypes.string.isRequired,
  onCheckAccess: PropTypes.func.isRequired,
  authorChecked: PropTypes.string.isRequired,
  onCheckAuthor: PropTypes.func.isRequired,
  currentAuthorShow: PropTypes.string.isRequired,
  currentStatusShow: PropTypes.string.isRequired,
  currentColumnsShow: PropTypes.arrayOf(PropTypes.string),
  onSetCurrentAuthorShow: PropTypes.func.isRequired,
  onSetCurrentStatusShow: PropTypes.func.isRequired,
  onSetCurrentColumnsShow: PropTypes.func.isRequired,
  onSetContentType: PropTypes.func.isRequired,
  onSetGroup: PropTypes.func.isRequired,
  sortingColumns: PropTypes.shape({}).isRequired,
  onSetSort: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectRows: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
  onEditContent: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickPublish: PropTypes.func.isRequired,
  onClickAddContent: PropTypes.func.isRequired,
  onClickJoinCategories: PropTypes.func.isRequired,
  currentUsername: PropTypes.string.isRequired,
  onClickClone: PropTypes.func.isRequired,
  onAdvancedFilterSearch: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})),
  onWillUnmount: PropTypes.func.isRequired,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

Contents.defaultProps = {
  loading: false,
  users: [],
  userPermissions: [],
  currentColumnsShow: ['description', 'firstEditor', 'lastModified', 'typeCode', 'created', 'onLine', 'restriction'],
  groupFilter: '',
};

export default withPermissionValues(Contents);
