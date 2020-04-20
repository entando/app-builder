import { FILTER_OPERATORS } from '@entando/utils';
import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export const ECR_COMPONENTS_EXTRA_FILTERS = {
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
