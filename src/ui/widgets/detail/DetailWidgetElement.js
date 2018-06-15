import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Icon, DropdownKebab } from 'patternfly-react';
import { LinkMenuItem } from 'frontend-common-components';
import { ROUTE_PAGE_DETAIL, ROUTE_PAGE_CONFIG } from 'app-init/router';

const DetailWidgetElement = ({ widgetInfo }) => {
  const renderWidgetInfo = () => {
    const { data } = widgetInfo;
    if (data) {
      return Object.keys(widgetInfo.data)
        .sort((a, b) => (a > b ? 1 : -1))
        .map(info => (
          <tr key={info}>
            <td className="DetailWidgetElement__td">{info}</td>
            <td className="DetailWidgetElement__td">{data[info].pageFullPath}</td>
            <td className="DetailWidgetElement__td text-center">
              <Icon
                type="fa"
                name={data[info].publish ? 'check' : 'close'}
              />
            </td>
            <td className="DetailWidgetElement__td text-center">{data[info].framePublish}</td>
            <td className="DetailWidgetElement__td text-center">
              <Icon
                type="fa"
                name={data[info].draft ? 'check' : 'close'}
              />
            </td>
            <td className="DetailWidgetElement__td text-center">{data[info].frameDraft}</td>
            <td className="DetailWidgetElement__td text-center">
              <DropdownKebab pullRight id="DetailWidgetElement-dropown">
                <LinkMenuItem
                  id={`go-page-detail-${info}`}
                  route={ROUTE_PAGE_CONFIG}
                  label={<FormattedMessage id="widget.detail.table.action.pageConfig" />}
                  params={{ pageCode: info }}
                  className="DetailWidgetElement__menu-item-page-detail"
                />
                <LinkMenuItem
                  id={`go-page-configuration-${info}`}
                  route={ROUTE_PAGE_DETAIL}
                  label={<FormattedMessage id="widget.detail.table.action.pageDetails" />}
                  params={{ pageCode: info }}
                  className="DetailWidgetElement__menu-item-page-configure"
                />
              </DropdownKebab>
            </td>
          </tr>
        ));
    }
    return null;
  };

  return (
    <Fragment>
      <legend>
        <FormattedMessage id="widget.detail.subtitle" />
      </legend>
      <table className="DetailWidgetElement__table table table-striped table-bordered">
        <thead>
          <tr>
            <th><FormattedMessage id="widget.detail.table.pageCode" /></th>
            <th width="40%"><FormattedMessage id="widget.detail.table.pagePath" /></th>
            <th width="10%"><FormattedMessage id="widget.detail.table.publicVersion" /></th>
            <th width="10%"><FormattedMessage id="widget.detail.table.framePosition" /></th>
            <th width="10%"><FormattedMessage id="widget.detail.table.draftVersion" /></th>
            <th width="10%"><FormattedMessage id="widget.detail.table.framePosition" /></th>
            <th className="text-center" width="10%">
              <FormattedMessage id="app.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {renderWidgetInfo()}
        </tbody>
      </table>
    </Fragment>
  );
};

DetailWidgetElement.propTypes = {
  widgetInfo: PropTypes.shape({}).isRequired,
};


export default DetailWidgetElement;
