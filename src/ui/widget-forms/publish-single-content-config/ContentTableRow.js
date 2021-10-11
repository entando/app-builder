import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { getContentStatusDetails } from 'ui/contents/ContentsTable';

const ContentTableRow = ({ content, intl }) => {
  const {
    description, firstEditor, lastModified, typeDescription, created, onLine, status, mainGroup,
  } = content;
  const { color, title } = getContentStatusDetails(status, onLine, intl);

  return (
    <tr>
      <td>{description}</td>
      <td>{firstEditor}</td>
      <td>{lastModified}</td>
      <td>{typeDescription}</td>
      <td>{created}</td>
      <td className="text-center">
        <span className={`ContentsFilter__status ContentsFilter__status--${color}`} title={title} />
      </td>
      <td className="text-center">
        <span className={`fa fa-${mainGroup === 'free' ? 'unlock' : 'lock'}`} />
      </td>
    </tr>
  );
};

ContentTableRow.propTypes = {
  content: PropTypes.shape({
    description: PropTypes.string,
    firstEditor: PropTypes.string,
    lastModified: PropTypes.string,
    typeDescription: PropTypes.string,
    created: PropTypes.string,
    onLine: PropTypes.bool,
    status: PropTypes.string,
    mainGroup: PropTypes.string,
  }).isRequired,
  intl: intlShape.isRequired,
};

export default ContentTableRow;
