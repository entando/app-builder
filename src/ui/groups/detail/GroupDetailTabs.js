import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';

import GroupDetailTabPagesContainer from 'ui/groups/detail/GroupDetailTabPagesContainer';
import GroupDetailTabUsersContainer from 'ui/groups/detail/GroupDetailTabUsersContainer';
import GroupDetailTabWidgetTypesContainer from 'ui/groups/detail/GroupDetailTabWidgetsContainer';
import GroupDetailTabContentsContainer from 'ui/groups/detail/GroupDetailTabContentsContainer';

const GroupDetailTabs = () => (
  <div>
    <TabContainer className="GroupDetailTabs__container" id="group-detail-tabs" defaultActiveKey={1}>
      <div>
        <Nav bsClass="nav nav-tabs">
          <NavItem eventKey={1}>
            <FormattedMessage id="app.pages" />
          </NavItem>
          <NavItem eventKey={2}>
            <FormattedMessage id="group.detail.title.users" />
          </NavItem>
          <NavItem eventKey={3}>
            <FormattedMessage id="group.detail.title.widgetTypes" />
          </NavItem>
          <NavItem eventKey={4}>
            <FormattedMessage id="group.detail.title.contents" />
          </NavItem>
          <NavItem eventKey={5}>
            <FormattedMessage id="group.detail.title.resources" />
          </NavItem>
        </Nav>
        <TabContent>
          <TabPane eventKey={1} >
            <GroupDetailTabPagesContainer />
          </TabPane>
          <TabPane eventKey={2} >
            <GroupDetailTabUsersContainer />
          </TabPane>
          <TabPane eventKey={3} >
            <GroupDetailTabWidgetTypesContainer />
          </TabPane>
          <TabPane eventKey={4} >
            <GroupDetailTabContentsContainer />
          </TabPane>
        </TabContent>
      </div>
    </TabContainer>
  </div>

);

export default GroupDetailTabs;
