import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Button, DropdownKebab, MenuItem } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter } from '@entando/utils';

import { ROUTE_EMAIL_CONFIG_SENDERS_ADD, ROUTE_EMAIL_CONFIG_SENDERS_EDIT } from 'app-init/router';
import DeleteSenderModalContainer from 'ui/email-config/DeleteSenderModalContainer';

const EmailConfigSenderMgmt = ({ senders, onDeleteClick }) => {
  const renderSenderRow = sender => (
    <tr key={sender.code}>
      <td>{sender.code}</td>
      <td>{sender.email}</td>
      <td className="text-center">
        <DropdownKebab id={`sender-actions-${sender.code}`} pullRight>
          <LinkMenuItem
            id={`sender-edit-link-${sender.code}`}
            to={routeConverter(ROUTE_EMAIL_CONFIG_SENDERS_EDIT, { code: sender.code })}
            label={<FormattedMessage id="app.edit" />}
          />
          <MenuItem
            onClick={() => onDeleteClick(sender)}
          >
            <FormattedMessage id="app.delete" />
          </MenuItem>
        </DropdownKebab>
      </td>
    </tr>
  );

  return (
    <div className="EmailConfigSenderMgmt">
      <Button
        bsStyle="primary"
        className="pull-right EmailConfigSenderMgmt__add-btn"
        componentClass={Link}
        to={ROUTE_EMAIL_CONFIG_SENDERS_ADD}
      >
        <FormattedMessage id="app.add" />
      </Button>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th><FormattedMessage id="app.code" /></th>
            <th><FormattedMessage id="emailConfig.senderMgmt.email" /></th>
            <th width="10%"><FormattedMessage id="app.actions" /></th>
          </tr>
        </thead>
        <tbody>
          {senders.map(renderSenderRow)}
        </tbody>
      </Table>
      <DeleteSenderModalContainer />
    </div>
  );
};

EmailConfigSenderMgmt.propTypes = {
  senders: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default EmailConfigSenderMgmt;
