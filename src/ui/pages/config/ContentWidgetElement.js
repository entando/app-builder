import React from 'react';
import PropTypes from 'prop-types';

const ContentWidgetElement = ({ description }) => (

  <div className="ContentWidgetElement list-group-item">
    <div className="ContentWidgetElement__main list-view-pf-main-info">
      <div className="ContentWidgetElement__icon list-view-pf-left">
        <span className="
          fa fa-default
          fa-puzzle-piece
          list-view-pf-icon-sm
          ContentWidgetElement__widget-icon
          fa-banner-main-left"
        />
      </div>
      <div className="list-view-pf-body">
        <div className="list-view-pf-description">
          <div className="ContentWidgetElement__description">
            <a href="" title={description} onClick={ev => ev.preventDefault()}>
              {description}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ContentWidgetElement.propTypes = {
  description: PropTypes.string,
};

ContentWidgetElement.defaultProps = {
  description: null,
};

export default ContentWidgetElement;
