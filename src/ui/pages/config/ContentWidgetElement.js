import React from 'react';
import PropTypes from 'prop-types';

const ContentWidgetElement = ({ title, description }) => (
  <div className="ContentWidgetElement">
    <div className="list-group list-view-pf ContentWidgetElement__widget-list">

      {
        title &&
        <div className="widget-spacer">
          <h2 className="panel-title ContentWidgetElement__widget-title">  {title}  </h2>
        </div>
      }
      <div
        className="
        list-group-item
        widget-square
        ContentWidgetElement__list-group-item-custom
        pointer"
      >
        <div className=" hidden list-view-pf-left icon-pos">
          <span className="fa fa-default list-view-pf-icon-sm fa-banner-main-left " />
        </div>
        <div className="list-view-pf-main-info">
          <div className="list-view-pf-left">
            <span className="fa fa-default fa-puzzle-piece list-view-pf-icon-sm widget-icon fa-banner-main-left " />
          </div>
          <div className="list-view-pf-body">
            <div className="list-view-pf-description">
              <div
                className="
                ContentWidgetListElement__list-group-item-heading
                widget-name
                widget-name-list "
              >
                <a href="" title={`Configure${{ description }}`}>
                  {description}
                </a>

              </div>
            </div>
            <div className="list-view-pf-additional-info" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

ContentWidgetElement.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

ContentWidgetElement.defaultProps = {
  title: null,
  description: null,
};

export default ContentWidgetElement;
