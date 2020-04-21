import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';

const PageInfoTable = ({ page }) => {
  if (isEmpty(page)) {
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
          <th><FormattedMessage id="pages.pageForm.pageTemplate" /></th>
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
    code: PropTypes.string,
    titles: PropTypes.shape({
      en: PropTypes.string.isRequired,
      it: PropTypes.string.isRequired,
    }),
    ownerGroup: PropTypes.string,
    pageModel: PropTypes.string,
    displayedInMenu: PropTypes.bool,
    seo: PropTypes.bool,
  }),
};

PageInfoTable.defaultProps = {
  page: {
    code: '',
    titles: { en: '', it: '' },
    ownerGroup: '',
    pageModel: '',
    displayedInMenu: false,
    seo: false,
  },
};


export default PageInfoTable;
