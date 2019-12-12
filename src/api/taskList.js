import { makeRequest, METHODS } from '@entando/apimanager';
import { CONNECTIONS, PROCESS, GROUPS, COLUMNS } from 'test/mocks/taskList';

// const PDA_DOMAIN = 'http://localhost:8082';

export const getConnections = () =>
  makeRequest({
    // domain: PDA_DOMAIN,
    uri: 'pda/connections',
    method: METHODS.GET,
    mockResponse: CONNECTIONS,
    withCredentials: false,
  });

export const getProcess = connection =>
  makeRequest({
    // domain: PDA_DOMAIN,
    uri: `pda/connections/${connection}/processes/definitions`,
    method: METHODS.GET,
    mockResponse: PROCESS,
  });

export const getGroups = connection =>
  makeRequest({
    // domain: PDA_DOMAIN,
    uri: `pda/connections/${connection}/groups`,
    method: METHODS.GET,
    mockResponse: GROUPS,
  });

export const getColumns = connection =>
  makeRequest({
    // domain: PDA_DOMAIN,
    uri: `pda/connections/${connection}/tasks/columns`,
    method: METHODS.GET,
    mockResponse: COLUMNS,
  });
