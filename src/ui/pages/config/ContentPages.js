import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { ROUTE_PAGE_ADD } from 'app-init/router';
import { Icon } from 'patternfly-react';
import PageTreeCompact from 'ui/pages/common/PageTreeCompact';
import DeletePageModalContainer from 'ui/pages/common/DeletePageModalContainer';
import PublishPageModalContainer from 'ui/pages/common/PublishPageModalContainer';
import UnpublishPageModalContainer from 'ui/pages/common/UnpublishPageModalContainer';


class ContentPages extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
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
        <PageTreeCompact
          {...this.props}
          pages={this.props.pages}
          onExpandPage={this.props.onExpandPage}
        />
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
  pages: PropTypes.arrayOf(PropTypes.shape({})),
};
ContentPages.defaultProps = {
  onWillMount: () => {},
  onExpandPage: () => {},
  pages: [],
};

export default ContentPages;
