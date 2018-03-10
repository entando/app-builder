import React from 'react';
import PropTypes from 'prop-types';

const ContentWidgetElement = ({ description, viewList }) => {
  console.log(viewList);
  return (
    <div className="ContentWidgetElement">
      <div className="ContentWidgetElement__pointer ContentWidgetElement__list-group-item-custom list-group-item" >
        <div className="list-view-pf-left ContentWidgetElement__icon-pos hidden">
          <span className="
            fa fa-default
            list-view-pf-icon-sm
            fa-banner-main-left "
          />
        </div>
        <div className="list-view-pf-main-info">
          <div className="list-view-pf-left">
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
              <div className="ContentWidgetElement__list-group-item-heading widget-name widget-name-list" >
                <a href="" title={`Configure${{ description }}`}>
                  {description}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ContentWidgetElement.propTypes = {
  description: PropTypes.string,
  viewList: PropTypes.string,
};

ContentWidgetElement.defaultProps = {
  description: null,
  viewList: 'list',
};

export default ContentWidgetElement;
