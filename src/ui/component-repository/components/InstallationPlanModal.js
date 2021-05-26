import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { Button, Modal, ButtonGroup } from 'patternfly-react';

import { getInstallPlan, getComponent, getComponentVersion, isReadOnly } from 'state/component-repository/components/selectors';
import { updateAllInstallPlan, installECRComponent, setInstallUninstallProgress } from 'state/component-repository/components/actions';
import { setVisibleModal } from 'state/modal/actions';

import InstallationPlanTable from 'ui/component-repository/components/InstallationPlanTable';

export const MODAL_ID = 'InstallationPlanModal';
const IGNORED_KEYS = ['version', 'conflictStrategy', 'hasConflicts'];

const normalizeList = installPlan =>
  Object.keys(installPlan)
    .filter(key => !IGNORED_KEYS.includes(key))
    .reduce((acc, category) => ([
      ...acc,
      ...Object.keys(installPlan[category])
        .map(component =>
          ({
            category,
            component,
            status: installPlan[category][component].status,
            action: installPlan[category][component].action,
          })),
    ]), []);

const InstallationPlanModal = () => {
  const installPlan = useSelector(getInstallPlan);
  const selectedComponent = useSelector(getComponent);
  const version = useSelector(getComponentVersion);
  const readOnly = useSelector(isReadOnly);
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState('all');
  const [requiredList, setRequiredList] = useState([]);

  const componentList = installPlan ? normalizeList(installPlan) : [];
  const filteredList = filterType === 'conflicts' ? componentList.filter(comp => comp.status !== 'NEW') : componentList;

  const handleSave = () => {
    // check for completed install plan
    const newList = componentList.filter(item => !item.action).map(item => item.component);

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
    <GenericModalContainer modalId={MODAL_ID} buttons={!readOnly && buttons} modalTitle={modalTitle} modalClassName="InstallationPlanModal">
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
          {!readOnly &&
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
          }
        </div>
        <InstallationPlanTable
          tableRows={filteredList}
          requiredList={requiredList}
          readOnly={readOnly}
        />
      </div>
    </GenericModalContainer>
  );
};

export default InstallationPlanModal;
