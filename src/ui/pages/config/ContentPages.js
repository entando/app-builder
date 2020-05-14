import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { ROUTE_PAGE_ADD } from 'app-init/router';
import { Icon, Spinner } from 'patternfly-react';
import PageTreeCompact from 'ui/pages/common/PageTreeCompact';
import DeletePageModalContainer from 'ui/pages/common/DeletePageModalContainer';
import PublishPageModalContainer from 'ui/pages/common/PublishPageModalContainer';
import UnpublishPageModalContainer from 'ui/pages/common/UnpublishPageModalContainer';


class ContentPages extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const {
      loading, onExpandAll, onCollapseAll, onExpandPage, pages,
    } = this.props;
    return (
      <div className="ContentPages">
        <div className="ContentPages__content-action">
          <Link
            to={ROUTE_PAGE_ADD}
            className="ContentPages__add-button btn btn-lg btn-primary btn-block"
          >
            <Icon name="plus" className="ContentPages__icon-add-button" />
            <FormattedMessage id="app.add" />
          </Link>
        </div>
        <div className="ContentPages__pagetree-actions">
          <div
            onClick={onExpandAll}
            onKeyDown={onExpandAll}
            role="button"
            tabIndex={-1}
            className="ContentPages__toggler"
          >
            <span className="icon fa fa-plus-square" />
            <FormattedMessage id="pageTree.expand" />
          </div>
          <div
            onClick={onCollapseAll}
            onKeyDown={onCollapseAll}
            role="button"
            tabIndex={-2}
            className="ContentPages__toggler"
          >
            <span className="icon fa fa-minus-square" />
            <FormattedMessage id="pageTree.collapse" />
          </div>
        </div>
        <Spinner loading={!!loading}>
          <PageTreeCompact
            {...this.props}
            pages={pages}
            onExpandPage={onExpandPage}
          />
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
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
};
ContentPages.defaultProps = {
  onWillMount: () => {},
  onExpandPage: () => {},
  onExpandAll: () => {},
  onCollapseAll: () => {},
  pages: [],
  loading: false,
};

export default ContentPages;
