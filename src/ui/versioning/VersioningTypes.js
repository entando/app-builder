import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, TabContent, TabPane, TabContainer } from 'patternfly-react';
import { hasAccess } from '@entando/utils';
import { FormattedMessage } from 'react-intl';

import VersioningListContainer from 'ui/versioning/VersioningListContainer';
import AttachmentsListContainer from 'ui/versioning/attachments/AttachmentsListContainer';
import ImagesListContainer from 'ui/versioning/images/ImagesListContainer';
import VersioningConfigContainer from 'ui/versioning/VersioningConfigContainer';
import {
  CRUD_CONTENTS_PERMISSION,
  MANAGE_RESOURCES_PERMISSION,
} from 'state/permissions/const';

const VersioningTypes = ({ userPermissions, isSuperuser }) => {
  const hasEditContentsAccess = hasAccess(CRUD_CONTENTS_PERMISSION, userPermissions);
  const hasManageResourcesAccess = hasAccess(MANAGE_RESOURCES_PERMISSION, userPermissions);
  const defaultActiveKey = hasEditContentsAccess || isSuperuser ? 'contents' : 'images';
  return (
    <TabContainer id="basic-tabs" defaultActiveKey={defaultActiveKey}>
      <div>
        <Nav
          bsClass="nav nav-tabs"
          justified
          onSelect={null}
          pullLeft={false}
          pullRight={false}
          stacked={false}
        >
          {hasEditContentsAccess && (
            <NavItem
              active={false}
              disabled={false}
              eventKey="contents"
            >
              <FormattedMessage
                id="cms.versioning.tabLabel.contents"
                defaultMessage="Contents"
              />
            </NavItem>
          )}
          {hasManageResourcesAccess && ([
            <NavItem
              active={false}
              disabled={false}
              eventKey="images"
              key="images"
            >
              <FormattedMessage
                id="cms.versioning.tabLabel.images"
                defaultMessage="Images"
              />
            </NavItem>,
            <NavItem
              active={false}
              disabled={false}
              eventKey="attachments"
              key="attachments"
            >
              <FormattedMessage
                id="cms.versioning.tabLabel.attachments"
                defaultMessage="Attach"
              />
            </NavItem>,
          ])}
          {isSuperuser && (
            <NavItem
              active={false}
              disabled={false}
              eventKey="configuration"
            >
              <FormattedMessage
                id="cms.versioning.tabLabel.config"
                defaultMessage="Config"
              />
            </NavItem>
          )}
        </Nav>
        <TabContent
          animation
          bsClass="tab"
          componentClass="div"
          mountOnEnter
          unmountOnExit
        >
          {hasEditContentsAccess && (
            <TabPane
              bsClass="tab-pane"
              eventKey="contents"
            >
              <VersioningListContainer />
            </TabPane>
          )}
          {hasManageResourcesAccess && ([
            <TabPane
              bsClass="tab-pane"
              eventKey="images"
              key="images"
            >
              <ImagesListContainer />
            </TabPane>,
            <TabPane
              bsClass="tab-pane"
              eventKey="attachments"
              key="attachments"
            >
              <AttachmentsListContainer />
            </TabPane>,
          ])}
          {isSuperuser && (
            <TabPane
              bsClass="tab-pane"
              eventKey="configuration"
            >
              <VersioningConfigContainer />
            </TabPane>
          )}
        </TabContent>
      </div>
    </TabContainer>
  );
};

VersioningTypes.propTypes = {
  userPermissions: PropTypes.arrayOf(PropTypes.string),
  isSuperuser: PropTypes.bool.isRequired,
};

VersioningTypes.defaultProps = {
  userPermissions: [],
};

export default VersioningTypes;
