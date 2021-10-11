import React from 'react';
import {
  TabContainer, Nav, NavItem, TabContent, TabPane,
  DropdownButton, MenuItem,
} from 'patternfly-react';
import { CSVLink } from 'react-csv';
import Workbook from 'react-excel-workbook';
import { intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import MultiSelectMenuItem from 'ui/common/form/MultiSelectMenuItem';

const ContentTabs = ({
  intl, availableColumns, messages, contentTypes, currentColumnsShow, currentAuthorShow,
  currentStatusShow, onSetCurrentColumnsShow, onSetCurrentStatusShow, onSetCurrentAuthorShow,
  onClickAddContent, contents, currentUsername,
}) => {
  const filteredAvailableColumns = availableColumns.filter(column => (
    currentColumnsShow.includes(column.code)
  ));
  const csvHeaders = filteredAvailableColumns.map(column => (
    Object.assign({}, { label: column.name, key: column.code })
  ));
  const onClickColumnItem = (code) => {
    if (code === 'name') return;
    let newColumns = [...currentColumnsShow];
    if (newColumns.includes(code)) {
      newColumns = newColumns.filter(c => c !== code);
    } else {
      newColumns = [...newColumns, code];
    }
    onSetCurrentColumnsShow(newColumns);
  };
  const navItems = (
    <div>
      <Nav bsClass="nav nav-tabs nav-tabs-pf nav-tabs-pf-secondary Contents__main-tab-bar" onSelect={null} style={{ fontSize: '14px' }}>
        <NavItem eventKey="all">
          <FormattedMessage id="cms.contents.list.all" defaultMessage="All" />
        </NavItem>
        <NavItem eventKey="draft">
          <FormattedMessage id="cms.contents.pendingChanges" defaultMessage="Pending Changes" />
        </NavItem>
        <NavItem eventKey="ready">
          <FormattedMessage id="cms.contents.readyPl" defaultMessage="Ready for approval" />
        </NavItem>
        <NavItem eventKey="published">
          <FormattedMessage id="cms.contents.publishedPl" defaultMessage="Published" />
        </NavItem>
      </Nav>
      <div className="Contents__main-action-button">
        <DropdownButton
          bsStyle="primary"
          title={intl.formatMessage(messages.addContent)}
          id="addContent"
        >
          {
            contentTypes.map(contentType => (
              <MenuItem
                eventKey={contentType.code}
                key={contentType.code}
                onClick={() => (
                  onClickAddContent({
                    typeCode: contentType.code, typeDescription: contentType.name,
                  })
                )}
              >
                {contentType.name}
              </MenuItem>
            ))
          }
        </DropdownButton>
      </div>
      <div className="Contents__main-action-button">
        <DropdownButton
          bsStyle="default"
          title={intl.formatMessage(messages.downloadButton)}
          id="downloadAs"
          onClick={null}
        >
          <li>
            <CSVLink data={contents} headers={csvHeaders}><span>CSV</span></CSVLink>
          </li>
          <MenuItem eventKey="xls">
            <Workbook filename="contents.xlsx" element={<div>XLS</div>}>
              <Workbook.Sheet data={contents} name="contentsSheet">
                {filteredAvailableColumns.map(column => (
                  <Workbook.Column
                    key={column.code}
                    label={column.name}
                    value={column.code}
                  />
                ))}
              </Workbook.Sheet>
            </Workbook>
          </MenuItem>
        </DropdownButton>
      </div>
      <div className="Contents__main-action-button">
        <DropdownButton
          bsStyle="default"
          title={intl.formatMessage(messages.columns)}
          id="columns"
          onClick={null}
        >
          {availableColumns.map(({ name, code }, i) => (
            <MultiSelectMenuItem
              name={name}
              i={i}
              code={code}
              key={code}
              active={currentColumnsShow.includes(code)}
              onItemClicked={onClickColumnItem}
            />
          ))}
        </DropdownButton>
      </div>
    </div>
  );
  return (
    <TabContainer
      id="secondary-tabs"
      activeKey={currentAuthorShow}
      onSelect={author => onSetCurrentAuthorShow(author, currentStatusShow)}
    >
      <div>
        <Nav bsStyle="tabs">
          <NavItem eventKey="all" title="All Contents">
            <FormattedMessage id="cms.contents.allContents" defaultMessage="All Contents" />
          </NavItem>
          <NavItem eventKey={currentUsername} title="Only Mine">
            <FormattedMessage id="cms.contents.onlyMine" defaultMessage="Only Mine" />
          </NavItem>
        </Nav>
        <TabContent>
          <TabPane eventKey="all">
            <TabContainer
              id="secondary-tabs-1"
              activeKey={currentStatusShow}
              onSelect={status => onSetCurrentStatusShow(status, currentAuthorShow)}
            >
              {navItems}
            </TabContainer>
          </TabPane>
          <TabPane eventKey={currentUsername}>
            <TabContainer
              id="secondary-tabs-2"
              activeKey={currentStatusShow}
              onSelect={status => onSetCurrentStatusShow(status, currentAuthorShow)}
            >
              {navItems}
            </TabContainer>
          </TabPane>
        </TabContent>
      </div>
    </TabContainer>
  );
};

ContentTabs.propTypes = {
  intl: intlShape.isRequired,
  availableColumns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  messages: PropTypes.shape({
    addContent: PropTypes.shape({}),
    downloadButton: PropTypes.shape({}),
    columns: PropTypes.shape({}),
  }).isRequired,
  contentTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentColumnsShow: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentAuthorShow: PropTypes.string.isRequired,
  currentStatusShow: PropTypes.string.isRequired,
  onSetCurrentAuthorShow: PropTypes.func.isRequired,
  onSetCurrentStatusShow: PropTypes.func.isRequired,
  onSetCurrentColumnsShow: PropTypes.func.isRequired,
  onClickAddContent: PropTypes.func.isRequired,
  currentUsername: PropTypes.string.isRequired,
};

export default ContentTabs;
