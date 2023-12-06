import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Alert } from 'patternfly-react';
import DeleteLabelAndLanguagesModalContainer from 'ui/labels/common/DeleteLabelAndLanguagesModalContainer';

const renderRows = (rows, onDeactivateLang, defaultLanguage) => rows.map(item => (
  <tr key={`activeLang-${item.code}`} className="ActiveLangTable__tr">
    <td className="ActiveLangTable__td">
      <span className="ActiveLangTable__td--capitalized">
        {item.code === defaultLanguage ? `${item.code}*` : item.code}
      </span>
    </td>
    <td className="ActiveLangTable__td">{item.name}</td>
    <td className="ActiveLangTable__td text-center">
      <Button
        id={`ActiveLangTable-delete-${item.code}`}
        bsStyle="link"
        className="ActiveLangTable__delete-tag-btn"
        onClick={() => onDeactivateLang(item.code)}
      >
        <i className="ActiveLangTable__delete-icon fa fa-trash-o fa-lg" />
      </Button>
    </td>
  </tr>
));

const renderTable = (activeLanguages, onDeactivateLang, defaultLanguage) => {
  if (activeLanguages.length > 0) {
    return (
      <table className="ActiveLangTable__table table table-striped table-bordered">
        <thead>
          <tr>
            <th className="ActiveLangTable__th-lg">
              <FormattedMessage id="app.code" />
            </th>
            <th className="ActiveLangTable__th-lg">
              <FormattedMessage id="app.name" />
            </th>
            <th className="text-center ActiveLangTable__th-sm">
              <FormattedMessage id="app.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {renderRows(activeLanguages, onDeactivateLang, defaultLanguage)}
        </tbody>
      </table>
    );
  }
  return (
    <Alert type="warning">
      <strong><FormattedMessage id="language.active.listEmpty" /></strong>
    </Alert>
  );
};

const ActiveLangTable = ({ activeLanguages, onDeactivateLang, defaultLanguage }) => (
  <div className="ActiveLangTable">
    * <FormattedMessage id="labels.default.language" />
    {renderTable(activeLanguages, onDeactivateLang, defaultLanguage)}
    <DeleteLabelAndLanguagesModalContainer />
  </div>
);

ActiveLangTable.propTypes = {
  activeLanguages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })),
  defaultLanguage: PropTypes.string,
  onDeactivateLang: PropTypes.func,
};

ActiveLangTable.defaultProps = {
  activeLanguages: [],
  defaultLanguage: '',
  onDeactivateLang: null,
};

export default ActiveLangTable;
