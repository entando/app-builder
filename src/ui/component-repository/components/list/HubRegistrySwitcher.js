import React, { useEffect } from 'react';
import { Row, Col, DropdownKebab, MenuItem, Icon } from 'patternfly-react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { fetchRegistries, setActiveRegistry } from 'state/component-repository/hub/actions';
import { getRegistries, getSelectedRegistry } from 'state/component-repository/hub/selectors';
import { ECR_LOCAL_REGISTRY_NAME } from 'state/component-repository/hub/reducer';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { ADD_NEW_REGISTRY_MODAL_ID } from 'ui/component-repository/components/list/AddNewRegistryModal';
import { DELETE_REGISTRY_MODAL_ID } from 'ui/component-repository/components/list/DeleteRegistryModal';

const HubRegistrySwitcher = () => {
  const activeRegistry = useSelector(getSelectedRegistry);
  const registries = useSelector(getRegistries);
  const dispatch = useDispatch();

  const handleRegistryChange = ((registry) => {
    if (registry.name !== activeRegistry.name) {
      dispatch(setActiveRegistry(registry));
    }
  });

  const handleNewRegistryClick = () => {
    dispatch(setVisibleModal(ADD_NEW_REGISTRY_MODAL_ID));
    dispatch(setInfo({ type: 'Registry' }));
  };

  const handleDeleteRegistry = (registryName) => {
    if (activeRegistry.name === registryName) return;
    dispatch(setVisibleModal(DELETE_REGISTRY_MODAL_ID));
    dispatch(setInfo({ type: 'Registry', code: registryName }));
  };

  useEffect(() => { dispatch(fetchRegistries()); }, [dispatch]);
  return (
    <Row className="HubRegistrySwitcher">
      <Col md={12}>
        <div className="HubRegistrySwitcher__body">
          <div className="HubRegistrySwitcher__data">
            <div className="HubRegistrySwitcher__title">
              {activeRegistry.name}
            </div>
            <div className="HubRegistrySwitcher__description">
              {activeRegistry.url}
            </div>
          </div>
          <div className="HubRegistrySwitcher__switcher">
            <div className="HubRegistrySwitcher__switcher-label">
              <FormattedMessage id="hub.selectRegistry" />
            </div>
            <div className="HubRegistrySwitcher__switcher-dropdown">
              <DropdownKebab pullRight id="hub-registry-switcher">
                {
                  registries.map(reg => (
                    <MenuItem
                      id={reg.name}
                      key={reg.name}
                      className="HubRegistrySwitcher__kebab-menu-item"
                      onClick={() => handleRegistryChange(reg)}
                      disabled={reg.name === activeRegistry.name}
                    >
                      <div className="HubRegistrySwitcher__action-label">
                        {reg.name}
                      </div>
                      {
                        reg.name !== ECR_LOCAL_REGISTRY_NAME && (
                          <div
                            role="button"
                            tabIndex={-1}
                            className="HubRegistrySwitcher__trash"
                            onClick={() => handleDeleteRegistry(reg.name)}
                            onKeyDown={() => handleDeleteRegistry(reg.name)}
                          >
                            <Icon size="lg" name="trash" />
                          </div>
                        )
                      }
                    </MenuItem>
                  ))
                }
                <MenuItem
                  id="addNewRegistry"
                  className="HubRegistrySwitcher__kebab-menu-item--new"
                  onClick={handleNewRegistryClick}
                >
                  <div className="HubRegistrySwitcher__action-label--new">
                    <FormattedMessage id="hub.newRegistry" />
                  </div>
                </MenuItem>
              </DropdownKebab>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default HubRegistrySwitcher;
