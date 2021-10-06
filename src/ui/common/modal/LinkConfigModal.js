import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Tabs,
  Tab,
  Icon,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import GenericModal from 'ui/common/modal/GenericModal';
import LinkConfigPageFormContainer from 'ui/common/link-config/LinkConfigPageFormContainer';
import LinkConfigContentFormContainer from 'ui/common/link-config/LinkConfigContentFormContainer';
import LinkConfigResourceFormContainer from '../link-config/LinkConfigResourceFormContainer';
import LinkConfigUrlFormContainer from '../link-config/LinkConfigUrlFormContainer';

const getLinkUrl = (type, value) => `#!${type};${value}!#`;

const ID = 'LinkConfigModal';

const LinkConfigModal = ({
  isVisible, hasResourceTab, onClose, onSave, mainGroup, joinGroups, parameters,
}) => {
  const parametesForTab = { ...parameters };

  const handleSubmit = (values) => {
    const linkObj = { ...values.attributes };
    if (values.url) {
      linkObj.url = getLinkUrl('U', values.url);
      linkObj.destType = 1;
    } else if (values.page) {
      linkObj.url = getLinkUrl('P', values.page);
      linkObj.destType = 2;
    } else if (values.content) {
      linkObj.url = getLinkUrl('C', values.content);
      linkObj.destType = 3;
      linkObj.contentDest = values.content;
    } else if (values.resource) {
      linkObj.url = getLinkUrl('R', values.resource);
      linkObj.destType = 5;
    } else {
      return;
    }
    onSave(linkObj);
  };

  const renderedModalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.linkconfig.title" />
    </Modal.Title>
  );

  const renderedUrlTabTitle = (
    <Fragment>
      <Icon name="globe" />&nbsp;
      <span>Link to an URL</span>
    </Fragment>
  );

  const renderedPageTabTitle = (
    <Fragment>
      <Icon name="folder" />&nbsp;
      <span>Link to a page</span>
    </Fragment>
  );

  const renderedContentTabTitle = (
    <Fragment>
      <Icon name="file-text-o" />&nbsp;
      <span>Link to a content</span>
    </Fragment>
  );

  const renderedResourceTabTitle = (
    <Fragment>
      <Icon name="book" />&nbsp;
      <span>Link to a resource</span>
    </Fragment>
  );

  let defaultActiveKey;
  switch (parameters.destType) {
    case 1:
      defaultActiveKey = 'url';
      delete parametesForTab.pageDest;
      delete parametesForTab.contentDest;
      break;

    case 2:
      defaultActiveKey = 'page';
      delete parametesForTab.dest;
      delete parametesForTab.contentDest;
      break;

    case 3:
    case 4:
      defaultActiveKey = 'content';
      delete parametesForTab.pageDest;
      delete parametesForTab.dest;
      break;

    case 5:
      defaultActiveKey = 'resource';
      break;

    default:
      defaultActiveKey = 'url';
      delete parametesForTab.pageDest;
      delete parametesForTab.contentDest;
      break;
  }

  return (
    <GenericModal
      modalClassName="LinkConfigModal"
      visibleModal={isVisible ? ID : null}
      modalId={ID}
      modalTitle={renderedModalTitle}
      modalFooter={<Fragment />}
      onCloseModal={onClose}
    >
      <Tabs
        defaultActiveKey={defaultActiveKey}
        id="LinkConfigModal-Tabs"
        animation={false}
        mountOnEnter
      >
        <Tab eventKey="url" title={renderedUrlTabTitle}>
          <LinkConfigUrlFormContainer
            onSubmit={handleSubmit}
            onCancel={onClose}
            parameters={parametesForTab}
          />
        </Tab>
        <Tab eventKey="page" title={renderedPageTabTitle}>
          <LinkConfigPageFormContainer
            mainGroup={mainGroup}
            joinGroups={joinGroups}
            onSubmit={handleSubmit}
            onCancel={onClose}
            parameters={parametesForTab}
          />
        </Tab>
        <Tab eventKey="content" title={renderedContentTabTitle}>
          <LinkConfigContentFormContainer
            mainGroup={mainGroup}
            joinGroups={joinGroups}
            onSubmit={handleSubmit}
            onCancel={onClose}
            parameters={parametesForTab}
          />
        </Tab>
        {hasResourceTab && (
          <Tab eventKey="resource" title={renderedResourceTabTitle}>
            <LinkConfigResourceFormContainer
              onSubmit={handleSubmit}
              joinGroups={joinGroups}
              onCancel={onClose}
              mainGroup={mainGroup}
              parameters={parametesForTab}
            />
          </Tab>
        )}
      </Tabs>
    </GenericModal>
  );
};

LinkConfigModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  hasResourceTab: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  mainGroup: PropTypes.string.isRequired,
  joinGroups: PropTypes.arrayOf(PropTypes.string),
  parameters: PropTypes.shape({
    destType: PropTypes.number,
    dest: PropTypes.string,
    rel: PropTypes.string,
    target: PropTypes.string,
    hreflang: PropTypes.string,
  }),
};

LinkConfigModal.defaultProps = {
  hasResourceTab: false,
  joinGroups: [],
  parameters: {},
};

export default LinkConfigModal;
