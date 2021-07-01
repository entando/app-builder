import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { DropdownButton, MenuItem } from 'patternfly-react';
import { Table } from 'react-bootstrap';

import { updateInstallPlan } from 'state/component-repository/components/actions';

const ACTIONS = {
  SKIP: 'skip',
  OVERRIDE: 'update',
  CREATE: 'install',
};

const InstallationPlanTable = ({
  intl,
  tableRows = [],
  requiredList,
  readOnly,
}) => {
  const dispatch = useDispatch();

  const handleSelect = (category, component, action) => {
    dispatch(updateInstallPlan(category, component, action));
  };

  return (
    <div className="InstallationPlanTable">
      <Table className="InstallationPlanTable__table" striped bordered condensed hover >
        <thead>
          <tr>
            <th><FormattedMessage id="componentRepository.category" /></th>
            <th><FormattedMessage id="componentRepository.componentName" /></th>
            <th><FormattedMessage id="componentRepository.status" /></th>
            <th style={{ width: '110px' }}><FormattedMessage id="componentRepository.actions" /></th>
          </tr>
        </thead>
        <tbody>
          {
            tableRows.map(({
            component,
            category,
            status,
            action,
            }) => (
              <tr key={`${category}-${component}`} className={cx(requiredList.includes(component) && 'InstallationPlanTable__is-required')}>
                <td>{category}</td>
                <td>{component}</td>
                <td style={{ textAlign: 'center' }}>
                  {status === 'NEW'
                    ? <i className="fa fa-check-circle InstallationPlanTable__ok" />
                    : <i className="fa fa-exclamation-circle InstallationPlanTable__warning" />}
                </td>
                <td>
                  {
                    readOnly
                    ? action || ''
                    :
                    <DropdownButton
                      id="InstallationPlanTable__dropdown-button"
                      onSelect={(key) => {
                        handleSelect(category, component, key);
                      }}
                      title={ACTIONS[action] ? intl.formatMessage({ id: `componentRepository.${ACTIONS[action]}` }) : 'Select'}
                      className="InstallationPlanTable__dropdown-button"
                      disabled={status === 'NEW'}
                    >
                      {
                            Object.keys(ACTIONS)
                            .filter(act => act !== 'CREATE')
                            .map(act => (
                              <MenuItem key={act} eventKey={act}>
                                <FormattedMessage id={`componentRepository.${ACTIONS[act]}`} />
                              </MenuItem>
                            ))
                        }
                    </DropdownButton>
                  }

                </td>
              </tr>))
        }
        </tbody>
      </Table>
    </div>
  );
};

InstallationPlanTable.propTypes = {
  intl: intlShape.isRequired,
  tableRows: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.string,
    category: PropTypes.string,
    status: PropTypes.string,
    action: PropTypes.string,
  })),
  requiredList: PropTypes.arrayOf(PropTypes.string),
  readOnly: PropTypes.bool,
};

InstallationPlanTable.defaultProps = {
  tableRows: [],
  requiredList: [],
  readOnly: false,
};

export default injectIntl(InstallationPlanTable);
