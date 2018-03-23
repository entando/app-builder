import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';


const PageInfoTable = ({ page }) => {
  if (!page) {
    return null;
  }
  const renderBool = value => (
    value ?
      <i className="fa fa-check-square-o" /> :
      <i className="fa fa-square-o" />
  );
  return (
    <table className="table PageInfoTable">
      <tbody>
        <tr>
          <th><FormattedMessage id="app.code" /></th>
          <td>{page.code}</td>
        </tr>
        <tr>
          <th><FormattedMessage id="app.title" /></th>
          <td>(en) {page.titles.en}, (it) {page.titles.it}</td>
        </tr>
        <tr>
          <th><FormattedMessage id="pages.pageForm.ownerGroup" /></th>
          <td>{page.ownerGroup}</td>
        </tr>
        <tr>
          <th><FormattedMessage id="pages.pageForm.pageModel" /></th>
          <td>{page.pageModel}</td>
        </tr>
        <tr>
          <th><FormattedMessage id="pageTree.displayedInMenu" /></th>
          <td>{renderBool(page.displayedInMenu)}</td>
        </tr>
        <tr>
          <th><FormattedMessage id="pages.seoDescr" /></th>
          <td>{renderBool(page.seo)}</td>
        </tr>
      </tbody>
    </table>
  );
};

PageInfoTable.propTypes = {
  page: PropTypes.shape({
    code: PropTypes.string.isRequired,
    titles: PropTypes.shape({
      en: PropTypes.string.isRequired,
      it: PropTypes.string.isRequired,
    }).isRequired,
    ownerGroup: PropTypes.string.isRequired,
    pageModel: PropTypes.string.isRequired,
    displayedInMenu: PropTypes.bool.isRequired,
    seo: PropTypes.bool.isRequired,
  }),
};

PageInfoTable.defaultProps = {
  page: null,
};


export default PageInfoTable;
