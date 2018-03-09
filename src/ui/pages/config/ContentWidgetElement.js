import React from 'react';
import PropTypes from 'prop-types';

const ContentWidgetElement = ({ title, description, viewList }) => {
  const rootClass = 'ContentWidgetElement';
  const commonA = `${rootClass}__pointer ${rootClass}__list-group-item-custom list-group-item widget-square`;
  const commonB = `list-view-pf-left ${rootClass}__icon-pos`;
  const commonC = `${rootClass}__list-group-item-heading widget-name widget-name-list`;

  const styleList = {
    a: commonA,
    b: `${commonB} hidden`,
    c: `${commonC}`,
  };

  const styleCard = {
    a: `${commonA} ${rootClass}__widget-grid`,
    b: commonB,
    c: `${commonC} ${rootClass}__description-widget-overlay`,
  };

  const style = viewList === 'list' ? styleList : styleCard;

  return (
    <div className={rootClass}>
      {
        title &&
        <div className="ContentWidgetElement__widget-spacer">
          <h2 className="
            panel-title
            ContentWidgetElement__widget-title"
          >  {title}
          </h2>
        </div>
      }
      <div className={style.a} >
        <div className={style.b}>
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
              <div className={style.c} >
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
  );
};

ContentWidgetElement.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  viewList: PropTypes.string,
};

ContentWidgetElement.defaultProps = {
  title: null,
  description: null,
  viewList: 'list',
};

export default ContentWidgetElement;
