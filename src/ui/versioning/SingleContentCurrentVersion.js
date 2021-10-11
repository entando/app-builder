import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Spinner } from 'patternfly-react';
import { formatDate } from '@entando/utils';
import { getContentStatusDetails } from 'ui/contents/ContentsTable';
import RestoreContentVersionModalContainer from 'ui/versioning/RestoreContentVersionModalContainer';

class SingleContentCurrentVersion extends Component {
  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  componentWillUnmount() {
    const { onWillUnmount } = this.props;
    onWillUnmount();
  }

  render() {
    const {
      intl,
      content,
      loading,
      groups: allGroups,
    } = this.props;
    const {
      description, lastModified, lastEditor, version, onLine, status, mainGroup, groups = [],
    } = content;
    const mainGroupObj = allGroups.filter(group => group.code === mainGroup)[0] || {};
    const readGroups = allGroups.filter(group => groups.includes(group.code))
      .map(group => group.name);
    const { color, title } = getContentStatusDetails(status, onLine, intl);
    return (
      <div className="SingleContentCurrentVersion__wrap">
        <Spinner loading={!!loading}>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th width="15%">
                  <FormattedMessage id="cms.contents.versioning.name" defaultMessage="Name" />
                </th>
                <th width="15%" className="text-center">
                  <FormattedMessage id="cms.contents.versioning.date" defaultMessage="Date" />
                </th>
                <th width="10%" className="text-center">
                  <FormattedMessage id="cms.contents.versioning.author" defaultMessage="Author" />
                </th>
                <th width="10%" className="text-center">
                  <FormattedMessage id="cms.contents.versioning.version" defaultMessage="Version" />
                </th>
                <th width="10%" className="text-center">
                  <FormattedMessage id="cms.contents.versioning.status" defaultMessage="Status" />
                </th>
                <th width="10%" className="text-center">
                  <FormattedMessage id="cms.contents.versioning.ownerGroup" defaultMessage="Owner Group" />
                </th>
                <th width="15%" className="text-center">
                  <FormattedMessage id="cms.contents.versioning.viewOnlyGroups" defaultMessage="View-Only Groups" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="SingleContentCurrentVersion__description">
                  {description}
                </td>
                <td className="text-center">
                  <code>
                    {formatDate(lastModified)}
                  </code>
                </td>
                <td className="text-center">
                  <code>
                    {lastEditor}
                  </code>
                </td>
                <td className="text-center">
                  <code>
                    {version}
                  </code>
                </td>
                <td className="text-center">
                  <span className={`ContentsFilter__status ContentsFilter__status--${color}`} title={title} />
                </td>
                <td className="text-center">
                  {mainGroupObj.name}
                </td>
                <td className="text-center">
                  {readGroups.join(' ')}
                </td>

              </tr>
            </tbody>
          </table>
        </Spinner>
        <RestoreContentVersionModalContainer />
      </div>
    );
  }
}

SingleContentCurrentVersion.propTypes = {
  intl: intlShape.isRequired,
  content: PropTypes.shape({
    description: PropTypes.string,
    lastModified: PropTypes.string,
    lastEditor: PropTypes.string,
    version: PropTypes.string,
    onLine: PropTypes.bool,
    status: PropTypes.string,
    mainGroup: PropTypes.string,
    groups: PropTypes.arrayOf(PropTypes.string),
  }),
  loading: PropTypes.bool,
  onDidMount: PropTypes.func.isRequired,
  onWillUnmount: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({})),
};

SingleContentCurrentVersion.defaultProps = {
  loading: false,
  content: {
    description: '',
    lastModified: '',
    lastEditor: '',
    version: '',
    onLine: false,
    status: '',
    mainGroup: '',
    groups: [],
  },
  groups: [],
};

export default injectIntl(SingleContentCurrentVersion);
