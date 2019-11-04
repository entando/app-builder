import React from 'react';
import Loadable from 'react-loadable';
import { Spinner } from 'patternfly-react';

const LoadableCodeMirror = Loadable({
  loader: () => Promise.all([
    import('codemirror/mode/htmlembedded/htmlembedded'),
    import('codemirror/mode/javascript/javascript'),
    import('codemirror/addon/selection/active-line'),
    import('codemirror/addon/search/search'),
    import('codemirror/addon/search/searchcursor'),
    import('codemirror/addon/search/jump-to-line'),
    import('codemirror/addon/dialog/dialog'),
    import('react-codemirror2'),
  ]).then(ress => ress[7].UnControlled),
  loading: () => <Spinner loading>loading</Spinner>,
});

export default LoadableCodeMirror;
