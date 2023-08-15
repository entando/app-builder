import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ComponentDependenciesTable from './ComponentDependenciesTable';

const UninstallInProgressOrFinished = (props) => {
  const { lastInstallApiResponse } = props;
  const errorComponents = lastInstallApiResponse && lastInstallApiResponse.errorComponents;
  const showErrorTable = errorComponents && errorComponents.length > 0;
  return (
    <div>
      <div className="BundlePreview__divider" />
      <div className="ComponentUninstallProcessState__in-progress-body">
        <p className="ComponentUninstallProcessState__in-progress-body-progress-bar-text">
          <FormattedMessage
            id="componentRepository.components.uninstalling"
            values={{
        version: props.name,
      }}
          />
        </p>
        <div className="ComponentUninstallProcessState__in-progress-body-progress-bar">
          <div
            // eslint-disable-next-line no-nested-ternary
            className={`ComponentUninstallProcessState__current-progress ${showErrorTable ? 'ComponentUninstallProcessState__current-progress--partial-error' :
            (props.progress === 1 ?
              'ComponentUninstallProcessState__current-progress--finished' : '')}`}
            style={{
            width: `${Math.floor(props.progress * 100)}%`,
          }}
          />
        </div>
        <div className="ComponentUninstallProcessState__in-progress-body-progress-footer-wrapper">
          <span className="ComponentUninstallProcessState__in-progress-body-progress-bar-text">
            {/* {Math.floor(props.progress * 100)}%
            {props.progress === 1 ? <FormattedMessage id="hub.bundle.uninstalled" /> : null} */}
            {`${Math.floor(props.progress * 100)}%`}
          </span>
          {/* <p className="ComponentUninstallProcessState__in-progress-body-progress-bar-text">
            <span className="ComponentUninstallProcessState__in-progress-body-progress-bar-number">
              {props.current}/{props.total}
            </span>
            <FormattedMessage
              id="componentRepository.components.elementsUninstalled"
            />

          </p> */}
        </div>
      </div>
      {
        showErrorTable ? (
          <div>
            <div className="BundlePreview__error-wrapper">
              <p className="BundlePreview__error-message">
                <FormattedMessage
                  id="componentRepository.components.someNotUninstalled"
                />
              </p>
              <div className="BundlePreview__divider" />
            </div>
            <ComponentDependenciesTable
              dependencies={errorComponents}
            />
          </div>
          ) : null
      }
    </div>
  );
};

UninstallInProgressOrFinished.propTypes = {
  name: PropTypes.string.isRequired,
  progress: PropTypes.number,
  // current: PropTypes.number,
  // total: PropTypes.number,
  lastInstallApiResponse: PropTypes.shape({
    errorComponents: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      type: PropTypes.string,
      status: PropTypes.string,
    })),
  }).isRequired,
};

UninstallInProgressOrFinished.defaultProps = {
  progress: 0,
  // current: 5,
  // total: 6,
};

const ComponentUninstallProcessState = (props) => {
  const {
    progress, lastInstallApiResponse, name,
  } = props;
  return (<UninstallInProgressOrFinished
    progress={progress}
    name={name}
    lastInstallApiResponse={lastInstallApiResponse}
  />);
};

ComponentUninstallProcessState.propTypes = {
  // componentUninstallStatus: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  lastInstallApiResponse: PropTypes.shape({}).isRequired,
};

export default ComponentUninstallProcessState;
