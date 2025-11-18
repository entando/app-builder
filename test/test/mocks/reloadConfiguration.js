export const SUCCESS = {
  status: 'progress',
  percentage: 0,
  info: null,
};

export const ERROR = {
  status: 'fail',
  percentage: null,
  info: {
    RELOAD_THREAD: 'Error starting reload thread',
  },
};

export const STATUS_RESPONSE = {
  status: 'success',
  percentage: null,
  info: null,
};

export const STATUS_IN_PROGRESS = {
  status: 'progress',
  percentage: 50,
  info: {
    'DataSourceManager': '',
    'ConfigManager': '',
    'PageManager': '',
  },
};

export const STATUS_SUCCESS = {
  status: 'success',
  percentage: null,
  info: null,
};

export const STATUS_WARNING = {
  status: 'waiting',
  percentage: null,
  info: {
    'DataSourceManager': '',
    'ConfigManager': 'Error reloading configuration',
    'PageManager': '',
  },
};
