import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const componentType = PropTypes.shape({
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  thumbnail: PropTypes.string,
  componentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  installedJob: PropTypes.shape({
    id: PropTypes.string,
    componentId: PropTypes.string,
    componentName: PropTypes.string,
    componentVersion: PropTypes.string,
    startedAt: PropTypes.string,
    finishedAt: PropTypes.string,
    status: PropTypes.string,
    componentJobs: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  lastJob: PropTypes.shape({
    id: PropTypes.string,
    componentId: PropTypes.string,
    componentName: PropTypes.string,
    componentVersion: PropTypes.string,
    startedAt: PropTypes.string,
    finishedAt: PropTypes.string,
    status: PropTypes.string,
    componentJobs: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  versions: PropTypes.arrayOf(PropTypes.shape({ version: PropTypes.string })),
  latestVersion: PropTypes.shape({ version: PropTypes.string }).isRequired,
  installed: PropTypes.bool,
});
