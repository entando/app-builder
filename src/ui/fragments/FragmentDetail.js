import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from 'patternfly-react';
import { Table } from 'react-bootstrap';

class FragmentDetail extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const onEdit = (ev) => {
      ev.preventDefault();
      this.props.handleEdit();
    };
    return (
      <div>
        <Table bordered >
          <tbody>
            <tr>
              <th className="td-pagetree-width" width="10%">
                <FormattedMessage id="fragment.detail.widgetName" />
              </th>
              <td>
                {this.props.widgetName}
              </td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="fragment.detail.widgetType" />
              </th>
              <td>
                {this.props.widgetType}
              </td>
            </tr>
            <tr>
              <th>
                <FormattedMessage id="fragment.detail.pluginCode" />
              </th>
              <td >
                {this.props.pluginCode}
              </td>
            </tr>
          </tbody>
        </Table>
        <Button
          className="pull-right"
          type="button"
          onClick={onEdit}
          bsStyle="primary"
        >
          <FormattedMessage id="app.edit" />
        </Button>
        <br />
        <hr />
      </div>
    );
  }
}

FragmentDetail.propTypes = {
  onWillMount: PropTypes.func,
  handleEdit: PropTypes.func,
  widgetName: PropTypes.string,
  widgetType: PropTypes.string,
  pluginCode: PropTypes.string,
};

FragmentDetail.defaultProps = {
  onWillMount: () => {},
  handleEdit: () => {},
  widgetName: '',
  widgetType: '',
  pluginCode: '',
};
export default FragmentDetail;
