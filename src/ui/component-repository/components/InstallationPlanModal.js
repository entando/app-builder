import React, { useState } from 'react';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { Button, Modal, DropdownButton, MenuItem, ButtonGroup } from 'patternfly-react';
import { Table } from 'react-bootstrap';

import { getInstallPlan, getComponent, getComponentVersion } from 'state/component-repository/components/selectors';
import { updateInstallPlan, updateAllInstallPlan, installECRComponent, setInstallUninstallProgress } from 'state/component-repository/components/actions';
import { setVisibleModal } from 'state/modal/actions';

export const MODAL_ID = 'InstallationPlanModal';
const IGNORED_KEYS = ['version', 'conflictStrategy', 'hasConflicts'];
const ACTIONS = {
  SKIP: 'skip',
  OVERRIDE: 'update',
  CREATE: 'install',
};

const InstallationPlanModal = ({
  intl,
}) => {
  const installPlan = useSelector(getInstallPlan);
  const selectedComponent = useSelector(getComponent);
  const version = useSelector(getComponentVersion);
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState('all');
  const [requiredList, setRequiredList] = useState([]);

  const componentList = [];

  if (installPlan) {
    Object.keys(installPlan)
      .filter(key => !IGNORED_KEYS.includes(key))
      .forEach(category => Object.keys(installPlan[category])
        .forEach((component) => {
          componentList.push({
            category,
            component,
            status: installPlan[category][component].status,
            action: installPlan[category][component].action,
          });
        }));
  }

  const filteredList = filterType === 'conflicts' ? componentList.filter(comp => comp.status !== 'NEW') : componentList;

  const handleSelect = (category, component, action) => {
    dispatch(updateInstallPlan(category, component, action));
  };

  const handleSave = () => {
    // check for completed install plan
    const newList = [];
    componentList.forEach((item) => {
      if (!item.action) {
        newList.push(item.component);
      }
    });

    setRequiredList(newList);

    if (newList.length === 0) {
      dispatch(installECRComponent(
        selectedComponent, version,
        progress => dispatch(setInstallUninstallProgress(progress)),
        installPlan,
      ));
      dispatch(setVisibleModal(''));
    }
  };

  const buttons = [
    <Button bsStyle="primary" id="InstallationPlanModal__button-ok" onClick={handleSave}>
      <FormattedMessage id="app.ok" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="componentRepository.installationPlan" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} modalClassName="InstallationPlanModal">
      <h2 className="InstallationPlanModal__title">{selectedComponent.title}</h2>
      <div>
        <div className="InstallationPlanModal__filters-wrapper">
          <div>
            <FormattedMessage id="componentRepository.activeFilters" />:
            {' '}
            <ButtonGroup>
              <Button
                onClick={() => { setFilterType('all'); }}
                className={filterType === 'all' && 'active'}
              >
                <FormattedMessage id="componentRepository.filterAll" />
              </Button>
              <Button
                onClick={() => { setFilterType('conflicts'); }}
                className={filterType === 'conflicts' && 'active'}
              >
                <FormattedMessage id="componentRepository.filterConflicts" />
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <ul className="InstallationPlanModal__bulk-actions">
              <li>{filteredList.length} <FormattedMessage id="componentRepository.categories.component" /></li>
              <li>
                <Button
                  onClick={() => { dispatch(updateAllInstallPlan('OVERRIDE')); }}
                >
                  <FormattedMessage id="componentRepository.updateAll" />
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => { dispatch(updateAllInstallPlan('SKIP')); }}
                >
                  <FormattedMessage id="componentRepository.skipAll" />
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <Table className="InstallationPlanModal__table" striped bordered condensed hover >
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
              filteredList &&
              filteredList.map(({
                component,
                category,
                status,
                action,
                }) => (
                  <tr key={component} className={cx(requiredList.includes(component) && 'InstallationPlanModal__is-required')}>
                    <td>{category}</td>
                    <td>{component}</td>
                    <td style={{ textAlign: 'center' }}>
                      {status === 'NEW'
                        ? <i className="fa fa-check-circle InstallationPlanModal__ok" />
                        : <i className="fa fa-exclamation-circle InstallationPlanModal__warning" />}
                    </td>
                    <td>
                      <DropdownButton
                        id="InstallationPlanModal__dropdown-button"
                        onSelect={(key) => {
                          handleSelect(category, component, key);
                        }}
                        title={ACTIONS[action] ? intl.formatMessage({ id: `componentRepository.${ACTIONS[action]}` }) : 'Select'}
                        className="InstallationPlanModal__dropdown-button"
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
                    </td>
                  </tr>))
            }
          </tbody>
        </Table>
      </div>
    </GenericModalContainer>
  );
};

InstallationPlanModal.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(InstallationPlanModal);
