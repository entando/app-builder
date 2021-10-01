import React from 'react';
import {
  TabContainer, Nav, NavItem, TabContent, TabPane,
  DropdownButton,
} from 'patternfly-react';
import { intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import MultiSelectMenuItem from 'ui/common/form/MultiSelectMenuItem';

const ContentFilterTabs = ({
  intl, availableColumns, messages, currentColumnsShow, currentAuthorShow,
  currentStatusShow, onSetCurrentColumnsShow, onSetCurrentStatusShow, onSetCurrentAuthorShow,
  currentUsername, inModal,
}) => {
  const onClickColumnItem = (code) => {
    if (code === 'name') return;
    let newColumns = currentColumnsShow.slice(0);
    if (newColumns.includes(code)) {
      newColumns = newColumns.filter(c => c !== code);
    } else {
      newColumns.push(code);
    }
    onSetCurrentColumnsShow(newColumns);
  };
  const navItems = (
    <div>
      {
        !inModal && (
          <Nav bsClass="nav nav-tabs nav-tabs-pf nav-tabs-pf-secondary Contents__main-tab-bar" onSelect={null} style={{ fontSize: '14px' }}>
            <NavItem eventKey="all">
              <FormattedMessage id="cms.assets.list.all" defaultMessage="All" />
            </NavItem>
            <NavItem eventKey="draft">
              <FormattedMessage id="cms.contents.pendingChanges" defaultMessage="Pending Changes" />
            </NavItem>
            <NavItem eventKey="ready">
              <FormattedMessage id="cms.contents.ready" defaultMessage="Ready for approval" />
            </NavItem>
            <NavItem eventKey="published">
              <FormattedMessage id="cms.contents.published" defaultMessage="Published" />
            </NavItem>
          </Nav>
        )
      }

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

ContentFilterTabs.propTypes = {
  intl: intlShape.isRequired,
  availableColumns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  messages: PropTypes.shape({
    addContent: PropTypes.shape({}),
    downloadButton: PropTypes.shape({}),
    columns: PropTypes.shape({}),
  }).isRequired,
  currentColumnsShow: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentAuthorShow: PropTypes.string.isRequired,
  currentStatusShow: PropTypes.string.isRequired,
  onSetCurrentAuthorShow: PropTypes.func.isRequired,
  onSetCurrentStatusShow: PropTypes.func.isRequired,
  onSetCurrentColumnsShow: PropTypes.func.isRequired,
  currentUsername: PropTypes.string.isRequired,
  inModal: PropTypes.bool,
};

ContentFilterTabs.defaultProps = {
  inModal: false,
};

export default ContentFilterTabs;
