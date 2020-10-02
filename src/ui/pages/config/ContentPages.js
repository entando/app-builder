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
  constructor() {
    super();

    this.state = {
      expanded: false,
    };

    this.handleExpandCollapse = this.handleExpandCollapse.bind(this);
    this.handleExpanderKeyDown = this.handleExpanderKeyDown.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  handleExpandCollapse() {
    const { onExpandAll, onCollapseAll } = this.props;
    const { expanded } = this.state;
    if (expanded) {
      onCollapseAll();
      this.setState({
        expanded: false,
      });
    } else {
      onExpandAll();
      this.setState({
        expanded: true,
      });
    }
  }

  handleExpanderKeyDown(e) {
    // expand/collapse only upon pressing the "enter" key (keyCode 13) or "space" key (keyCode 32)
    if (e.keyCode === 13 || e.keyCode === 32) this.handleExpandCollapse();
  }

  render() {
    const {
      loading, onExpandPage, pages,
    } = this.props;
    const { expanded } = this.state;

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
