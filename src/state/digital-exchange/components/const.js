import { FILTER_OPERATORS } from '@entando/utils';
import moment from 'moment';

export const DE_COMPONENTS_GRID_VIEW = 'grid-view';
export const DE_COMPONENTS_LIST_VIEW = 'list-view';

export const DE_COMPONENTS_EXTRA_FILTERS = {
  explore: {
    formValues: {},
    operators: {},
  },
  popular: {
    formValues: { rating: [0] },
    operators: { rating: FILTER_OPERATORS.GREATER_THAN },
  },
  new: {
    formValues: { lastUpdate: [moment().subtract(1, 'months').format('YYYY-MM-DD hh:mm:ss')] },
    operators: { lastUpdate: FILTER_OPERATORS.GREATER_THAN },
  },
  installed: {
    formValues: { installed: [true] },
    operators: { installed: FILTER_OPERATORS.EQUAL },
  },

};


export const DE_COMPONENT_INSTALLATION_STATUS_CREATED = 'CREATED';
export const DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS = 'IN_PROGRESS';
export const DE_COMPONENT_INSTALLATION_STATUS_COMPLETED = 'COMPLETED';
export const DE_COMPONENT_INSTALLATION_STATUS_ERROR = 'ERROR';
