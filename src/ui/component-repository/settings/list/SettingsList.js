import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, CardGrid, Card, CardBody, DropdownKebab, Spinner, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter } from '@entando/utils';
import { FormattedMessage } from 'react-intl';

import DeleteSettingsModalContainer from 'ui/component-repository/settings/list/DeleteSettingsModalContainer';
import { ROUTE_ECR_CONFIG_EDIT } from 'app-init/router';

class SettingsList extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const activeIcon = active => <i className={!active ? 'pficon-error-circle-o' : 'fa fa-check'} />;

    const cards = this.props.marketplaces.map(marketplace => (
      <Col md={4} key={`marketplace-${marketplace.id}`}>
        <Card>
          <DropdownKebab className="pull-right" pullRight id={`${marketplace.id}-actions`}>
            <LinkMenuItem
              id={`edit-${marketplace.id}`}
              to={routeConverter(ROUTE_ECR_CONFIG_EDIT, { server: marketplace.id })}
              label={<FormattedMessage id="app.edit" />}
            />
            <MenuItem
              onClick={() => { this.props.onClickDelete(marketplace); }}
            >
              <FormattedMessage id="app.delete" />
            </MenuItem>
          </DropdownKebab>
          <div className="ServerIcon">
            <span>
              <i className="fa pficon-cluster" />
            </span>
            <br />
          </div>
          <p className="ServerName">
            {marketplace.name}
          </p>
          <CardBody>
            <strong><FormattedMessage id="componentRepository.settings.active" /></strong>: {activeIcon(marketplace.active)}
            <br />
            <strong><FormattedMessage id="componentRepository.settings.address" /></strong>: {marketplace.url}
          </CardBody>
        </Card>
      </Col>
    ));

    return (
      <Spinner loading={!!this.props.loading}>
        <CardGrid className="SettingsListContainer" matchHeight>
          {cards}
        </CardGrid>
        <DeleteSettingsModalContainer />
      </Spinner>
    );
  }
}

SettingsList.propTypes = {
  marketplaces: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
  loading: PropTypes.bool,
  onWillMount: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

SettingsList.defaultProps = {
  marketplaces: [],
  loading: false,
};

export default SettingsList;
