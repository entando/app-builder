import React from 'react';
import Loadable from 'react-loadable';
import { Spinner } from 'patternfly-react';

const LoadableCodeMirror = Loadable({
  loader: () => Promise.all([
    import('codemirror/mode/htmlembedded/htmlembedded'),
    import('codemirror/mode/javascript/javascript'),
    import('codemirror/addon/selection/active-line'),
    import('react-codemirror2'),
  ]).then(ress => ress[3].UnControlled),
  loading: () => <Spinner loading>loading</Spinner>,
});

export default LoadableCodeMirror;
