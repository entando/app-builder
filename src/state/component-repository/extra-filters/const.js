import { FILTER_OPERATORS } from '@entando/utils';

// eslint-disable-next-line import/prefer-default-export
export const ECR_COMPONENTS_EXTRA_FILTERS = {
  explore: {
    formValues: {},
    operators: {},
  },
  installed: {
    formValues: { installed: [true] },
    operators: { installed: FILTER_OPERATORS.EQUAL },
  },
};
